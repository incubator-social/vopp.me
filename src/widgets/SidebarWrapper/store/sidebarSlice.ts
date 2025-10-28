import { OptionId } from '@/src/shared/ui/Sidebar/data';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SidebarState = {
  activeButton: OptionId;
  previousActiveButton: OptionId | null;
  isOpenAddPost: boolean;
  image: null | string;
};

const initialState: SidebarState = {
  activeButton: OptionId.Feed,
  isOpenAddPost: false,
  image: null
};

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    setActiveButton: (state, action: PayloadAction<OptionId>) => {
      state.activeButton = action.payload;
    },
    setPreviousActiveButton: (state, action: PayloadAction<OptionId>) => {
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
