/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-underscore-dangle */
import { IpcListener, IpcListnerObj } from 'ipcListners';
import { app } from 'electron';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';
import { Channels } from 'main/preload';
import { getAssetPath } from '../main/tools';

const execute = promisify(exec);

const chanel: Channels = 'execute-ansible-playbook';

const command = 'ansible-playbook {fileName} -i {hostsFile} -K';

const executePlaybookFile = async (
  playbookFile: string,
  hostsFilePath: string
) => {
  const cmd = command
    .replace('{fileName}', playbookFile)
    .replace('{hostsFile}', hostsFilePath);
  const { stderr } = await execute(cmd);
  return stderr;
};

const executePlaybook = async (
  playbookContent: string,
  hostsFilePath: string
): Promise<string> => {
  const playbookPath = path.join(app.getPath('temp'), 'playbook.yml');
  fs.writeFileSync(playbookPath, playbookContent);

  return executePlaybookFile(playbookPath, hostsFilePath);
};

const executePlaybooks = async (
  playbooks: string[],
  hostFile: string
): Promise<string> => {
  const promises = playbooks.map((playbookName) => {
    const playbookFilesPath = getAssetPath('templates');
    const playbookFile = path.join(playbookFilesPath, `${playbookName}.yml`);
    return executePlaybookFile(playbookFile, hostFile);
  });

  const resArr = await Promise.all(promises);
  return resArr.join('\n');
};

const _playbookExecuter: IpcListener = async (event, args) => {
  const {
    playbook: playbookContent,
    hosts: hostsFileContent,
    playbooks,
  } = args;

  try {
    const hostsFilePath = path.join(app.getPath('temp'), 'hosts');
    fs.writeFileSync(hostsFilePath, hostsFileContent);

    let result = '';
    if (playbooks) {
      result = await executePlaybooks(playbooks, hostsFilePath);
    } else {
      result = await executePlaybook(playbookContent, hostsFilePath);
    }

    event.reply(chanel, { result });
  } catch (error) {
    event.reply(chanel, { error });
  }
};

const playbookExecuter: IpcListnerObj = {
  chanel,
  listener: _playbookExecuter,
};

export default playbookExecuter;
