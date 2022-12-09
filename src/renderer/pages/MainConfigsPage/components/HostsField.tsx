/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/require-default-props */
import { UploadFile } from '@mui/icons-material';
import { Box, TextField, Typography, IconButton } from '@mui/material';
import { useCallback } from 'react';
import useFileToTextField from 'renderer/hooks/file-to-textfield.hook';

type HostsFieldProps = {
  textFieldProps?: Record<string, unknown>;
};

const hostFileFilters = [{ name: 'All Files', extensions: ['*'] }];

const HostsField = ({ textFieldProps }: HostsFieldProps) => {
  const { openFile } = useFileToTextField(textFieldProps);

  const openHostsFile = useCallback(() => {
    openFile(hostFileFilters);
  }, [openFile]);

  return (
    <Box>
      <TextField
        label="Hosts"
        fullWidth
        multiline
        rows={5}
        {...textFieldProps}
      />

      <Box
        sx={{
          mt: 2,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Typography variant="h6" mr={2}>
          Import Hosts from a file
        </Typography>

        <IconButton color="primary" onClick={openHostsFile}>
          <UploadFile />
        </IconButton>
      </Box>
    </Box>
  );
};

export default HostsField;
