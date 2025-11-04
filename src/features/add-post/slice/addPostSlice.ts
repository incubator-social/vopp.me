import { AddPostState, Steps } from '@/src/features/add-post/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: AddPostState = {
  previewURL: null,
  currentStep: null
};

const addPostSlice = createSlice({
  name: 'addPost',
  initialState,
  reducers: {
    setPreviewURL: (state, action: PayloadAction<string | null>) => {
      state.previewURL = action.payload;
    },
    setCurrentStep: (state, action: PayloadAction<Steps>) => {
      state.currentStep = action.payload;
    }
  }
});

export const { setPreviewURL, setCurrentStep } = addPostSlice.actions;
export const addPostReducer = addPostSlice.reducer;
