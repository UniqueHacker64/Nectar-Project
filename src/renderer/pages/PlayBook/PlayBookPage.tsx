/* eslint-disable import/prefer-default-export */
import { Box, Container, Typography } from '@mui/material';
import { useState } from 'react';
import { useAppSelector } from 'renderer/redux/store';
import { PageCommandButtons } from '../../components/PageCommandButtons.tsx/PageCommandButtons';
import MiddleButtons from './components/MiddleButtons';
import PlayBookEditor from './components/PlayBookEditor';
import ResultBox from './components/ResultBox';
import useForm from './form';

const PlayBookPage = () => {
  const [results, setResults] = useState<string | null>(null);
  const { form } = useForm();
  const projectName = useAppSelector((s) => s.project.name);

  return (
    <Container
      sx={{
        my: 6,
      }}
    >
      <Box component="form" onSubmit={form.handleSubmit}>
        <Typography>{projectName}.yml</Typography>

        <PlayBookEditor form={form} />

        <Box pt={5} />

        <MiddleButtons form={form} onValidated={setResults} />

        <Box pt={5} />

        <ResultBox results={results} />

        <PageCommandButtons
          mainButton={{
            text: 'Start',
            type: 'submit',
          }}
        />
      </Box>
    </Container>
  );
};

export default PlayBookPage;
