import { ipcMain } from 'electron';
import { IpcListnerObj } from 'ipcListners';
import getTemplateNames from './getTemplateNames';
import openFileDialog from './openFileDialog';
import playbookExecuter from './playbookExecuter.new';
import playbookValidator from './playbookValidator';

const listenerObjs: IpcListnerObj[] = [
  openFileDialog,
  playbookValidator,
  getTemplateNames,
  playbookExecuter,
];

const initListeners = () => {
  listenerObjs.forEach((listenerObj) => {
    const { chanel, listener } = listenerObj;
    ipcMain.on(chanel, listener);
  });
};

export default initListeners;
