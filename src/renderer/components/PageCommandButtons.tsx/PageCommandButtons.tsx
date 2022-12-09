/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/destructuring-assignment */
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export type ButtonProps = {
  text?: string;
  show?: boolean;
  [key: string]: unknown;
};

export type PageCommandButtonsProps = {
  mainButton: ButtonProps;
};

export const PageCommandButtons = ({ mainButton }: PageCommandButtonsProps) => {
  const navigate = useNavigate();

  const { show, ...mainButtonProps } = {
    ...mainButton,
  };
  const showMainButton = typeof show === 'undefined' || mainButton.show;

  return (
    <Box
      sx={{
        display: 'flex',
        columnGap: 5,
        position: 'absolute',
        bottom: 30,
        right: 10,
      }}
    >
      <Button color="secondary" variant="outlined" onClick={() => navigate(-1)}>
        Back
      </Button>
      {showMainButton && (
        <Button variant="contained" {...mainButtonProps}>
          {mainButton.text ?? 'Next'}
        </Button>
      )}
    </Box>
  );
};
