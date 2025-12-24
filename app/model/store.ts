import { addPostReducer } from '@/src/features/add-post/model';
import { configureStore } from '@reduxjs/toolkit';

import { baseApi } from '@/src/shared/api/baseApi';

import { sidebarReducer } from '@/src/widgets/sidebar-wrapper/model';

import { appReducer } from './appSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      [baseApi.reducerPath]: baseApi.reducer,
      app: appReducer,
      sidebar: sidebarReducer,
      addPost: addPostReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware)
  });
};

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
