/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-underscore-dangle */
import { IpcListener, IpcListnerObj } from 'ipcListners';
import { app } from 'electron';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execute = promisify(exec);

const buildErrorMsg = (stderr: string): string => {
  if (stderr.includes(':')) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, ...rest] = stderr.split(':');
    return `Error: ${rest.join(':')}}`;
  }
  return stderr;
};

const _playbookValidator: IpcListener = async (event, args) => {
  const { content } = args;
  const playbookPath = path.join(app.getPath('temp'), 'playbook.yml');
  fs.writeFileSync(playbookPath, content);

  // validate play book
  try {
    const { stderr } = await execute(
      `ansible-playbook ${playbookPath} --syntax-check`
    );

    event.reply('validate-ansible-playbook', { result: buildErrorMsg(stderr) });
  } catch (error: any) {
    if (error.stderr) {
      event.reply('validate-ansible-playbook', {
        result: buildErrorMsg(error.stderr),
      });
    } else {
      event.reply('validate-ansible-playbook', { error });
    }
  }
};

const playbookValidator: IpcListnerObj = {
  chanel: 'validate-ansible-playbook',
  listener: _playbookValidator,
};

export default playbookValidator;
