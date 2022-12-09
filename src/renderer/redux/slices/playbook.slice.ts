import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type PlaybookSliceState = {
  playbook?: string;
  playbooks?: string[];
};

const initialState: PlaybookSliceState = {};

const playbookSlice = createSlice({
  name: 'playbook',
  initialState,
  reducers: {
    setPlaybook: (state, action: PayloadAction<string>) => {
      state.playbook = action.payload;
      state.playbooks = undefined;
    },
    setPlaybooks: (state, action: PayloadAction<string[]>) => {
      state.playbooks = action.payload;
      state.playbook = undefined;
    },
    clearAll: (state) => {
      state.playbook = undefined;
      state.playbooks = undefined;
    },
  },
});

export const playbookActions = playbookSlice.actions;

export default playbookSlice;
