import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AddPostStateType, ImageDataType, Steps } from './types';

const initialState: AddPostStateType = {
  images: [],
  currentStep: null
};

const addPostSlice = createSlice({
  name: 'addPost',
  initialState,
  reducers: {
    addImage: (state, action: PayloadAction<ImageDataType>) => {
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
