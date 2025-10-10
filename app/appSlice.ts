import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { RequestStatus } from '@/src/shared/types/common';
import { authApi } from '@/src/features/auth/api/authApi';

const appSlice = createSlice({
  name: 'app',
  initialState: {
    status: 'idle' as RequestStatus,
    error: null as { type: 'error' | 'success'; message: string } | null,
    isAuth: null as boolean | null // null — статус ещё не определён
  },
  selectors: {
    selectAppStatus: (state) => state.status,
    selectAppError: (state) => state.error,
    selectIsAuth: (state) => state.isAuth
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
    setIsAuth: create.reducer<{ isAuth: boolean | null }>((state, action) => {
      state.isAuth = action.payload.isAuth;
    })
  }),
  extraReducers: (builder) => {
    builder
      .addMatcher(isAnyOf(authApi.endpoints.login.matchFulfilled, authApi.endpoints.getMe.matchFulfilled), (state) => {
        state.isAuth = true;
      })
      .addMatcher(
        isAnyOf(
          authApi.endpoints.logout.matchFulfilled,
          authApi.endpoints.logout.matchRejected,
          authApi.endpoints.getMe.matchRejected
        ),
        (state) => {
          state.isAuth = false;
        }
      );
  }
});

export const { selectAppStatus, selectAppError, selectIsAuth } = appSlice.selectors;

export const { setAppStatus, setAppError, clearAppError, setIsAuth } = appSlice.actions;

export const appReducer = appSlice.reducer;
