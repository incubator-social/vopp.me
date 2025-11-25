import { createSlice } from '@reduxjs/toolkit';
import { AlertType, RequestStatus } from '@/src/shared/types/common';

type AlertState = {
  type: AlertType;
  message: string;
  duration?: number;
} | null;

const appSlice = createSlice({
  name: 'app',
  initialState: {
    status: 'idle' as RequestStatus,
    alert: null as AlertState
  },
  selectors: {
    selectAppStatus: (state) => state.status,
    selectAppAlert: (state) => state.alert
  },
  reducers: (create) => ({
    setAppStatus: create.reducer<{ status: RequestStatus }>((state, action) => {
      state.status = action.payload.status;
    }),
    setAppAlert: create.reducer<AlertState>((state, action) => {
      state.alert = action.payload;
    }),
    clearAppAlert: create.reducer((state) => {
      state.alert = null;
    })
  })
});

export const { selectAppStatus, selectAppAlert } = appSlice.selectors;
export const { setAppStatus, setAppAlert, clearAppAlert } = appSlice.actions;
export const appReducer = appSlice.reducer;
