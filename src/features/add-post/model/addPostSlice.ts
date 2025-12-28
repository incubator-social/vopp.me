import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AddPostStateType, CropImageType, ImageDataType, Steps } from './types';

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
    updateCrop: (state, action: PayloadAction<{ id: string; crop: Omit<CropImageType, 'aspect'> }>) => {
      const index = state.images.findIndex((image) => image.id === action.payload.id);
      state.images[index].crop = { ...state.images[index].crop, ...action.payload.crop };
    },
    setImageAspect: (state, action: PayloadAction<{ id: string; aspect: number }>) => {
      const index = state.images.findIndex((image) => image.id === action.payload.id);
      state.images[index].crop.aspect = action.payload.aspect;
    },
    removeImages: (state) => {
      state.images = [];
    },
    setCurrentStep: (state, action: PayloadAction<Steps>) => {
      state.currentStep = action.payload;
    }
  }
});

export const { addImage, updateCrop, removeImages, setCurrentStep, setImageAspect } = addPostSlice.actions;
export const addPostReducer = addPostSlice.reducer;
