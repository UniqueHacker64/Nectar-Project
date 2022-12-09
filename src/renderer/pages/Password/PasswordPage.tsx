/* eslint-disable import/prefer-default-export */
import { Box, Button, Container, TextField } from '@mui/material';
import { PageCommandButtons } from 'renderer/components/PageCommandButtons.tsx/PageCommandButtons';

const PasswordPage = () => {
  return (
    <Box height="100vh">
      <Container
        maxWidth="lg"
        sx={{
          py: 6,
          height: '100%',
        }}
      >
        <Box
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            rowGap: '3rem',
          }}
        >
          <TextField type="password" label="Root Password" fullWidth />

          <Button
            size="large"
            variant="contained"
            sx={{
              px: 5,
            }}
          >
            OK
          </Button>
        </Box>

        <PageCommandButtons
          mainButton={{
            show: false,
          }}
        />
      </Container>
    </Box>
  );
};

export default PasswordPage;
