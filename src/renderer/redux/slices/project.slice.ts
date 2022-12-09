import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import HostType from 'enums/host-type.enum';

export type ProjectStateType = {
  name: string;
  hostType: HostType;
  hosts: string;
  password: string;
};

type SetFieldPayloadType = {
  field: keyof ProjectStateType;
  value: string | HostType;
};

const initialState: ProjectStateType = {
  name: '',
  hostType: HostType.Windows,
  hosts: '',
  password: '',
};

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setField: (state, action: PayloadAction<SetFieldPayloadType>) => {
      const { field, value } = action.payload;
      state[field] = value as HostType;
    },
    setAllFields: (state, action: PayloadAction<ProjectStateType>) => {
      const { name, hostType, hosts, password } = action.payload;
      state.name = name;
      state.hostType = hostType;
      state.hosts = hosts;
      state.password = password;
    },
    clearAll: (state) => {
      state.name = '';
      state.hostType = HostType.Windows;
      state.hosts = '';
      state.password = '';
    },
  },
});

export default projectSlice;

export const projectActions = projectSlice.actions;
