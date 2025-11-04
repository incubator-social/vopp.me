import { OptionId } from '@/src/widgets/Sidebar/data';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SidebarState = {
  activeButton: OptionId;
  isOpenAddPost: boolean;
  previousActiveButton: OptionId;
};

const initialState: SidebarState = {
  activeButton: OptionId.Feed,
  isOpenAddPost: false,
  previousActiveButton: OptionId.Feed
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
