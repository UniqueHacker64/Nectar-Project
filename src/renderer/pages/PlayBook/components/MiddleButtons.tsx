import { Box, Typography, IconButton, Button } from '@mui/material';
import { Download as DownloadIcon } from '@mui/icons-material';
import useFileToTextField from 'renderer/hooks/file-to-textfield.hook';
import { FormType } from '../form';
import validatePlaybook from '../playbook-validator';

type MiddleButtonsProps = {
  form: FormType;
  onValidated: (results: string) => void;
};

const MiddleButtons = ({ form, onValidated }: MiddleButtonsProps) => {
  const { openFile } = useFileToTextField({
    name: 'playbook',
    onChange: form.handleChange,
  });

  const openPlaybook = () => {
    openFile([
      {
        name: 'YAML Files',
        extensions: ['yml'],
      },
    ]);
  };

  const validate = async () => {
    try {
      const res = await validatePlaybook(form.values.playbook);
      onValidated(res as string);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <Box
        sx={{
          display: 'flex',
          flexFlow: 'row',
          alignItems: 'center',
        }}
      >
        <Typography mr={2}>Import Playbook</Typography>
        <IconButton color="primary" onClick={openPlaybook}>
          <DownloadIcon />
        </IconButton>
      </Box>

      <Button variant="outlined" onClick={validate}>
        Check Errors
      </Button>
    </Box>
  );
};

export default MiddleButtons;
