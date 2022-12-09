import { Box, Container } from '@mui/material';
import { PageCommandButtons } from 'renderer/components/PageCommandButtons.tsx/PageCommandButtons';
import FormFields from './components/FormFields';
import useForm from './form';

const MainConfigsPage = () => {
  const { form } = useForm();

  return (
    <Box
      onSubmit={form.handleSubmit}
      component="form"
      position="relative"
      height="100vh"
      pt={5}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            rowGap: 3,
          }}
        >
          <FormFields form={form} />

          <PageCommandButtons
            mainButton={{
              disabled: !form.isValid || !form.dirty,
              type: 'submit',
            }}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default MainConfigsPage;
