/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
import { IpcListener, IpcListnerObj } from 'ipcListners';
import { Channels } from 'main/preload';
import { ChildProcessWithoutNullStreams, spawn } from 'child_process';
import { app } from 'electron';
import path from 'path';
import fs from 'fs';
import { getAssetPath } from '../main/tools';

const disableAllPlaybook = getAssetPath('templates', 'disable-all.yml');

class Playbook {
  onError: (error: string) => void = () => {};

  onStdout: (data: string) => void = () => {};

  onClose: () => void = () => {};

  constructor(
    private readonly playbookFile: string,
    private readonly hostsFile: string,
    private readonly password: string
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  applyPassword(data: any, process: ChildProcessWithoutNullStreams): boolean {
    const str = data.toString().trim().toLowerCase();

    if (str.includes('password')) {
      process.stdin.write(this.password);
      process.stdin.end();
      return true;
    }

    return false;
  }

  execute() {
    const child = spawn('ansible-playbook', [
      this.playbookFile,
      '-i',
      this.hostsFile,
      '-K',
    ]);

    child.stdout.on('data', (data) => {
      if (!this.applyPassword(data, child)) {
        this.onStdout(data.toString());
      }
    });

    child.stderr.on('data', (data) => {
      if (!this.applyPassword(data, child)) {
        this.onError(data.toString());
      }
    });

    child.on('close', () => {
      this.onClose();
    });
  }
}

const chanel: Channels = 'execute-ansible-playbook';

const executePlaybook = (
  playbookFile: string,
  hostsFile: string,
  password: string,
  event: Electron.IpcMainEvent,
  playbookName = ''
) => {
  return new Promise((resolve) => {
    const playbook = new Playbook(playbookFile, hostsFile, password);

    playbook.onError = (error) => {
      event.reply(chanel, { message: error });
    };

    playbook.onStdout = (data) => {
      event.reply(chanel, { message: data });
    };

    playbook.onClose = () => {
      event.reply(chanel, { message: 'done\n' });
      resolve(null);
    };

    event.reply(chanel, { message: `Executing playbook: ${playbookName}\n` });
    playbook.execute();
  });
};

const createHostsFile = (hostsFileContent: string) => {
  const hostsFilePath = path.join(app.getPath('temp'), 'hosts');
  fs.writeFileSync(hostsFilePath, hostsFileContent);
  return hostsFilePath;
};

const createPlaybookFile = (playbookContent: string) => {
  const playbookPath = path.join(app.getPath('temp'), 'playbook.yml');
  fs.writeFileSync(playbookPath, playbookContent);
  return playbookPath;
};

const getTemplatePath = (playbookName: string, enabled: boolean) => {
  const templatesPathPath = getAssetPath(
    'templates',
    enabled ? 'enable-templates' : 'disable-templates'
  );
  return path.join(templatesPathPath, `${playbookName}.yml`);
};

const executePlaybooks = async (
  playbooks: string[],
  hostFile: string,
  password: string,
  event: Electron.IpcMainEvent
) => {
  // run disable all playbook
  await executePlaybook(
    disableAllPlaybook,
    hostFile,
    password,
    event,
    'disable all playbook'
  );

  for (let i = 0; i < playbooks.length; i++) {
    const playbookFile = getTemplatePath(playbooks[i], true);
    await executePlaybook(
      playbookFile,
      hostFile,
      password,
      event,
      playbooks[i]
    );
  }
};

const playbookExecuterListener: IpcListener = async (event, args) => {
  const {
    playbook: playbookContent,
    playbooks,
    hosts: hostsFileContent,
    password,
  } = args;

  const hostsFile = createHostsFile(hostsFileContent);

  if (playbookContent) {
    const playbookFile = createPlaybookFile(playbookContent);
    await executePlaybook(
      playbookFile,
      hostsFile,
      password,
      event,
      'custom playbook'
    );
  }

  if (playbooks) {
    await executePlaybooks(playbooks, hostsFile, password, event);
  }

  event.reply(chanel, { finished: true });
};

const playbookExecuter: IpcListnerObj = {
  chanel,
  listener: async (event, args) => {
    try {
      await (playbookExecuterListener(event, args) as unknown as Promise<void>);
    } catch (error) {
      event.reply(chanel, { error });
    }
  },
};

export default playbookExecuter;
