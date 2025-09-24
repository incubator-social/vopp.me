import { createSlice } from '@reduxjs/toolkit';
import { RequestStatus } from '@/src/shared/types/common';

const appSlice = createSlice({
  name: 'app',
  initialState: {
    status: 'idle' as RequestStatus,
    error: null as string | null
  },
  selectors: {
    selectAppStatus: (state) => state.status,
    selectAppError: (state) => state.error
  },
  reducers: (create) => ({
    setAppStatus: create.reducer<{ status: RequestStatus }>((state, action) => {
      state.status = action.payload.status;
    }),
    setAppError: create.reducer<{ error: string | null }>((state, action) => {
      state.error = action.payload.error;
    }),
    clearAppError: create.reducer((state) => {
      state.error = null;
    })
  })
});

export const { selectAppStatus, selectAppError } = appSlice.selectors;
export const { setAppStatus, setAppError, clearAppError } = appSlice.actions;
export const appReducer = appSlice.reducer;
