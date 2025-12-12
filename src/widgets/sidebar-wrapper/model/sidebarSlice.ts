import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SidebarState = {
  activeButton: string | undefined;
  isOpenAddPost: boolean;
  previousActiveButton: string | undefined;
};

const initialState: SidebarState = {
  activeButton: undefined,
  isOpenAddPost: false,
  previousActiveButton: undefined
};

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    setActiveButton: (state, action: PayloadAction<string | undefined>) => {
      state.activeButton = action.payload;
    },
    setPreviousActiveButton: (state, action: PayloadAction<string | undefined>) => {
      state.previousActiveButton = action.payload;
    },
    openAddPost: (state) => {
      state.isOpenAddPost = true;
    },
    closeAddPost: (state) => {
      state.isOpenAddPost = false;
    }
  }
});

export const { setActiveButton, setPreviousActiveButton, openAddPost, closeAddPost } = sidebarSlice.actions;
export const sidebarReducer = sidebarSlice.reducer;
