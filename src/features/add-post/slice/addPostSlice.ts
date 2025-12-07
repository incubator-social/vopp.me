import { AddPostState, ImageData, Steps } from '@/src/features/add-post/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: AddPostState = {
  images: [],
  currentStep: null
};

const addPostSlice = createSlice({
  name: 'addPost',
  initialState,
  reducers: {
    addImage: (state, action: PayloadAction<ImageData>) => {
      state.images = [...state.images, action.payload];
    },
    removeImages: (state) => {
      state.images = [];
    },
    setCurrentStep: (state, action: PayloadAction<Steps>) => {
      state.currentStep = action.payload;
    }
  }
});

export const { addImage, removeImages, setCurrentStep } = addPostSlice.actions;
export const addPostReducer = addPostSlice.reducer;
