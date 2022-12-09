/* eslint-disable @typescript-eslint/no-explicit-any */

// eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle
const _openFile = (filters: any[]) => {
  window.electron.ipcRenderer.sendMessage('open-file-dialog', {
    filters,
  });
};

const useFileToTextField = (textFieldProps: any) => {
  const openFile = (filters: any[]) => {
    window.electron.ipcRenderer.once('open-file-dialog', (fileContent) => {
      const onChange = textFieldProps?.onChange as any;
      if (onChange)
        onChange({
          target: {
            value: fileContent,
            name: textFieldProps?.name,
          },
        });
    });
    _openFile(filters);
  };

  return {
    openFile,
  };
};

export default useFileToTextField;
