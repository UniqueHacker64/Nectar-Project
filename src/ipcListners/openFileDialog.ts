/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-underscore-dangle */
import { IpcListener, IpcListnerObj } from 'ipcListners';
import { dialog } from 'electron';
import fs from 'fs';

const _openFileDialog: IpcListener = (event, options) => {
  const result = dialog.showOpenDialogSync(options);

  if (!result || result.length < 1) return;

  const file = result[0];

  const fileContent = fs.readFileSync(file, 'utf-8');
  event.reply('open-file-dialog', fileContent);
};

const openFileDialog: IpcListnerObj = {
  chanel: 'open-file-dialog',
  listener: _openFileDialog,
};

export default openFileDialog;
