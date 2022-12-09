/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */

type ExecutePlaybookParams = {
  playbook?: string;
  playbooks?: string[];
  hosts: string;
  password: string;
  onMessage: (message: string) => void;
  onFinished: () => void;
};

const executePlaybook = ({
  playbook,
  playbooks,
  hosts,
  password,
  onMessage,
  onFinished,
}: ExecutePlaybookParams) => {
  window.electron.ipcRenderer.sendMessage('execute-ansible-playbook', {
    playbook,
    playbooks,
    hosts,
    password,
  });

  window.electron.ipcRenderer.on('execute-ansible-playbook', (args: any) => {
    if (args.message) {
      onMessage(args.message);
    } else if (args.finished) {
      onFinished();
      window.electron.ipcRenderer.removeAllListeners(
        'execute-ansible-playbook'
      );
    } else {
      console.error('Error: ', args);
      window.electron.ipcRenderer.removeAllListeners(
        'execute-ansible-playbook'
      );
    }
  });
};

export default executePlaybook;
