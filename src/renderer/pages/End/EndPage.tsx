/* eslint-disable no-param-reassign */
import './EndPage.scss';
import {
  Box,
  Button,
  LinearProgress,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'renderer/redux/store';
import { useNavigate } from 'react-router-dom';
import { projectActions } from 'renderer/redux/slices/project.slice';
import { playbookActions } from 'renderer/redux/slices/playbook.slice';
import executePlaybook from './playbook-executer';

const AfterExecuting = () => {
  const navigate = useNavigate();

  return (
    <>
      <Typography
        variant="h2"
        sx={{
          fontWeight: 'bold',
          color: 'primary.main',
        }}
      >
        Playbook executed
      </Typography>

      <Box height={80} />

      <Button
        variant="outlined"
        sx={{
          width: 200,
          py: 2,
        }}
        onClick={() => navigate('/')}
      >
        Go Home
      </Button>
    </>
  );
};

const WhileExecuting = () => {
  return (
    <>
      <Typography
        variant="h2"
        sx={{
          fontWeight: 'bold',
          color: 'primary.main',
        }}
      >
        Please hold tight
      </Typography>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 'bold',
          color: 'primary.main',
        }}
      >
        Your playbooks are being cooked
      </Typography>

      <Box height={80} />

      <Box width="100%">
        <LinearProgress />
      </Box>
    </>
  );
};

const EndPage = () => {
  const { playbook, playbooks } = useAppSelector((s) => s.playbook);
  const { hosts, password } = useAppSelector((s) => s.project);
  const [output, setOutput] = useState<string | null>('');
  const [finished, setFinished] = useState(false);
  const dispatch = useAppDispatch();
  const outputTxtRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if ((playbook || playbooks) && hosts && password) {
      executePlaybook({
        playbook,
        playbooks,
        hosts,
        password,
        onFinished: () => {
          setFinished(true);
          dispatch(projectActions.clearAll());
          dispatch(playbookActions.clearAll());
        },
        onMessage: (msg) => {
          setOutput((o) => {
            let str = o ? o + msg : msg;
            if (msg.includes('done')) str += '\n';
            return str;
          });
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hosts, playbook, playbooks, password]);

  useEffect(() => {
    if (outputTxtRef.current) {
      outputTxtRef.current.scrollTop = outputTxtRef.current.scrollHeight;
    }
  }, [output]);

  return (
    <Box
      className={finished ? '' : 'end-page'}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      {finished ? <AfterExecuting /> : <WhileExecuting />}

      <Box height={80} />

      <TextField
        fullWidth
        multiline
        rows={9}
        value={output}
        inputRef={outputTxtRef}
        sx={{
          width: '80%',
          '& .MuiInputBase-input': {
            height: '200px',
          },
        }}
      />
    </Box>
  );
};

export default EndPage;
