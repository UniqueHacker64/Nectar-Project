/* eslint-disable @typescript-eslint/no-explicit-any */
const validatePlaybook = (content: string) => {
  return new Promise((resolve, reject) => {
    window.electron.ipcRenderer.sendMessage('validate-ansible-playbook', {
      content,
    });

    window.electron.ipcRenderer.once(
      'validate-ansible-playbook',
      (args: any) => {
        if (!args) {
          reject(args);
        } else if (args.error) {
          reject(args.error);
        } else {
          resolve(args.result);
        }
      }
    );
  });
};

export default validatePlaybook;
