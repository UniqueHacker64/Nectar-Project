import { Box, TextField } from '@mui/material';
import { FormType } from '../form';

const ROWS = 10;

type PlayBookEditorProps = {
  form: FormType;
};

const PlayBookEditor = ({ form }: PlayBookEditorProps) => {
  const isError = !!form.errors.playbook && !!form.touched.playbook;

  return (
    <Box>
      <TextField
        multiline
        minRows={ROWS}
        maxRows={ROWS}
        fullWidth
        name="playbook"
        value={form.values.playbook}
        onChange={form.handleChange}
        error={isError}
        helperText={isError ? form.errors.playbook : ''}
        style={{
          minWidth: '100%',
          maxWidth: '100%',
        }}
      />
    </Box>
  );
};

export default PlayBookEditor;
