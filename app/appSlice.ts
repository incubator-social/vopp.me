import { createSlice } from '@reduxjs/toolkit';

type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

const appSlice = createSlice({
  name: 'app',
  initialState: {
    status: 'idle' as RequestStatus,
    error: null as string | null,
    themeMode: 'light' as 'light' | 'dark'
  },
  reducers: (create) => ({
    setAppStatus: create.reducer<{ status: RequestStatus }>((state, action) => {
      state.status = action.payload.status;
    }),
    setAppError: create.reducer<{ error: string | null }>((state, action) => {
      state.error = action.payload.error;
    }),
    setThemeMode: create.reducer<{ themeMode: 'light' | 'dark' }>((state, action) => {
      state.themeMode = action.payload.themeMode;
    })
  })
});

export const { setAppStatus, setAppError, setThemeMode } = appSlice.actions;
export const appReducer = appSlice.reducer;
