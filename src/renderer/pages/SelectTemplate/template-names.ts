/* eslint-disable @typescript-eslint/no-explicit-any */
const getTemplateNames = () => {
  return new Promise<string[]>((resolve, reject) => {
    window.electron.ipcRenderer.sendMessage('get-template-names', {});

    window.electron.ipcRenderer.once('get-template-names', (args: any) => {
      if (!args) {
        reject(args);
      } else if (args.error) {
        reject(args.error);
      } else {
        resolve(args);
      }
    });
  });
};

export default getTemplateNames;
