import { addPostReducer } from '@/src/features/add-post/slice';
import { sidebarReducer } from '@/src/features/sidebar-wrapper/store/sidebarSlice';
import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from '@/src/shared/api/baseApi';
import { appReducer } from '@/app/store/appSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      [baseApi.reducerPath]: baseApi.reducer,
      app: appReducer,
      sidebar: sidebarReducer,
      addPost: addPostReducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        // без этих настроек в Redux файлы не сохранить
        serializableCheck: {
          ignoreActions: true,
          ignoredPaths: ['addPost.images']
        }
      }).concat(baseApi.middleware)
  });
};

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
