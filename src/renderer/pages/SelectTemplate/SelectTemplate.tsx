/* eslint-disable no-console */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/prefer-default-export */
import { Search as SearchIcon } from '@mui/icons-material';
import {
  Box,
  Checkbox,
  Container,
  FormControlLabel,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageCommandButtons } from 'renderer/components/PageCommandButtons.tsx/PageCommandButtons';
import { playbookActions } from 'renderer/redux/slices/playbook.slice';
import { useAppDispatch } from 'renderer/redux/store';
import getTemplateNames from './template-names';

const SelectTemplatePage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [templates, setTemplates] = useState<string[]>([]);
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [selectedTemps, setSelectedTemps] = useState<string[]>([]);

  useEffect(() => {
    getTemplateNames()
      .then((names) => {
        setTemplates(names);
        return null;
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const results = searchText
      ? templates.filter((t) =>
          t.toLowerCase().includes(searchText.toLowerCase())
        )
      : templates;
    setSearchResults(results);
  }, [searchText, templates]);

  const onCheck = useCallback((name: string) => {
    setSelectedTemps((prev) => {
      if (prev.includes(name)) {
        return prev.filter((t) => t !== name);
      }
      return [...prev, name];
    });
  }, []);

  const handleClick = () => {
    dispatch(playbookActions.setPlaybooks(selectedTemps));
    navigate('/end');
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        my: 6,
      }}
    >
      <Typography variant="h5">What Firewall Services do you want?</Typography>

      <Box
        sx={{
          my: 5,
        }}
      >
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          fullWidth
          placeholder="Search templates"
          variant="standard"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </Box>

      <Box
        sx={{
          my: 2,
          height: 385,
          overflowY: 'scroll',
          display: 'grid',
          alignItems: 'start',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 2,
        }}
      >
        {searchResults.map((t) => (
          <FormControlLabel
            key={t}
            control={
              <Checkbox
                checked={selectedTemps.includes(t)}
                onChange={() => onCheck(t)}
              />
            }
            label={t}
          />
        ))}
      </Box>

      <PageCommandButtons
        mainButton={{
          text: 'Start',
          show: true,
          onClick: handleClick,
        }}
      />
    </Container>
  );
};

export default SelectTemplatePage;
