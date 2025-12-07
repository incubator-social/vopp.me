import { OptionId } from '@/src/widgets/Sidebar/data';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SidebarState = {
  activeButton: OptionId | null;
  isOpenAddPost: boolean;
  previousActiveButton: OptionId | null;
};

const initialState: SidebarState = {
  activeButton: null,
  isOpenAddPost: false,
  previousActiveButton: null
};

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    setActiveButton: (state, action: PayloadAction<OptionId | null>) => {
      state.activeButton = action.payload;
    },
    setPreviousActiveButton: (state, action: PayloadAction<OptionId | null>) => {
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
