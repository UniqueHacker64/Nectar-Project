/* eslint-disable @typescript-eslint/no-explicit-any */
import { Channels } from 'main/preload';

export type IpcListener = (
  event: Electron.IpcMainEvent,
  ...args: any[]
) => void;

export type IpcListnerObj = {
  chanel: Channels;
  listener: IpcListener;
};
