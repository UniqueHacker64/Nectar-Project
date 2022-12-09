import { IpcListener, IpcListnerObj } from 'ipcListners';
import { Channels } from 'main/preload';
import * as tools from '../main/tools';

const CHANEL_NAME: Channels = 'get-template-names';

const getTemplateNamesFunc: IpcListener = (event) => {
  // get file names from folder templates without extensions
  try {
    const fileNames = tools.getTemplateNames();
    event.reply(CHANEL_NAME, fileNames);
  } catch (error) {
    event.reply(CHANEL_NAME, { error });
  }
};

const getTemplateNames: IpcListnerObj = {
  chanel: CHANEL_NAME,
  listener: getTemplateNamesFunc,
};

export default getTemplateNames;
