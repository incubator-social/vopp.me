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
    // updateImage: (state, action: PayloadAction<{ id: number, updateData: ImageData }>) => {
    //   const index = state.images.findIndex(img => img.id === action.payload.id);
    //   state.images[index] = action.payload.updateData;
    // },
    // removeImage: (state, action: PayloadAction<number>) => {
    //   const index = state.images.findIndex(img => img.id === action.payload);
    //   state.images.splice(index, 1);
    // },
    setCurrentStep: (state, action: PayloadAction<Steps>) => {
      state.currentStep = action.payload;
    }
  }
});

export const { addImage, setCurrentStep } = addPostSlice.actions;
export const addPostReducer = addPostSlice.reducer;
