import { Box, Typography, TextField } from '@mui/material';
import { useEffect, useState } from 'react';

const ROWS = 3;

const ResultBox = ({ results }: { results: string | null }) => {
  const [output, setOutput] = useState('');

  const noErrors = results === null || results.trim() === '';

  useEffect(() => {
    if (results === null) {
      setOutput('Click Validate to see the results');
    } else if (results.trim() === '') {
      setOutput('No errors found');
    } else {
      setOutput(results);
    }
  }, [results]);

  return (
    <Box>
      <Typography>Result</Typography>

      <TextField
        fullWidth
        multiline
        minRows={ROWS}
        maxRows={ROWS}
        value={output}
        sx={{
          '& .MuiInputBase-input': {
            color: noErrors ? 'black' : 'red',
          },
        }}
      />
    </Box>
  );
};

export default ResultBox;
