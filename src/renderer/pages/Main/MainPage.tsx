import { Box, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import logo from '../../resources/logo.jpg';

const LOGO_DIM = 400;

const TopPart = () => {
  return (
    <Box
      sx={{
        display: 'flex',
      }}
    >
      <Box
        component="img"
        src={logo}
        sx={{
          border: '1px solid',
          mr: 5,
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
          width: LOGO_DIM,
          height: LOGO_DIM,
        }}
      />

      <Box>
        <Typography
          sx={{
            textIndent: 50,
          }}
        >
          NECTARY is a network automated tool designed for users who are lack knowledge with programming languages. This tool provides graphical user interface for users. Using this tool, they can Harding network with firewall available in Linux distributions as well each device in the network remotely without knowing any coding. Nectary project provides free templates for users to enable and disable the services in the Linux environment through firewall. Apart from that, it has graphical text editor which embedded to the tool provides flexibility for users who are wishing to execute their own activities through ansible and users are able to check there YAML code errors while writing code through this application.
        </Typography>
      </Box>
    </Box>
  );
};

const BottomPart = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-evenly',
      }}
    >
      <Button
        variant="contained"
        size="large"
        sx={{
          width: 270,
        }}
        onClick={() => navigate('/main_configs/new')}
      >
        Start New Project
      </Button>
      <Button
        variant="contained"
        size="large"
        sx={{
          width: 270,
        }}
        onClick={() => navigate('/main_configs/template')}
      >
        Start With a Template
      </Button>
    </Box>
  );
};

const MainPage = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <TopPart />

      <Box height={100} />

      <BottomPart />
    </Container>
  );
};

export default MainPage;
