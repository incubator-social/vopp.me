import { createSlice } from '@reduxjs/toolkit';
import { RequestStatus } from '@/src/shared/types/common';
import { authApi } from '@/src/features/auth/api';

const appSlice = createSlice({
  name: 'app',
  initialState: {
    status: 'idle' as RequestStatus,
    error: null as { type: 'error' | 'success'; message: string } | null,
    isAuthenticated: false
  },
  selectors: {
    selectAppStatus: (state) => state.status,
    selectAppError: (state) => state.error,
    selectIsAuthenticated: (state) => state.isAuthenticated
  },
  reducers: (create) => ({
    setAppStatus: create.reducer<{ status: RequestStatus }>((state, action) => {
      state.status = action.payload.status;
    }),
    setAppError: create.reducer<{ type: 'error' | 'success'; message: string } | null>((state, action) => {
      state.error = action.payload;
    }),
    clearAppError: create.reducer((state) => {
      state.error = null;
    }),
    setAuthenticated: create.reducer<boolean>((state, action) => {
      state.isAuthenticated = action.payload;
    })
  }),
  extraReducers: (builder) => {
    builder.addMatcher(authApi.endpoints.getMe.matchFulfilled, (state) => {
      state.isAuthenticated = true;
    });
    builder.addMatcher(authApi.endpoints.getMe.matchRejected, (state) => {
      state.isAuthenticated = false;
    });
  }
});

export const { selectAppStatus, selectAppError, selectIsAuthenticated } = appSlice.selectors;

export const { setAppStatus, setAppError, clearAppError, setAuthenticated } = appSlice.actions;

export const appReducer = appSlice.reducer;
