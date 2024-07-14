import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const tourSlice = createSlice({
  name: `tour-slice`,
  initialState: {
    // define some initial values for your app
    // e.g. counter: 0,
    gallerySliderVisibility: false
  },
  // here, by using createSlice method,
  // in reducers we specify the functions that would be
  // accessible, We do nt need to write boilerplate if checks code
  reducers: {
    setGallerySliderVisibility(state, action: PayloadAction<boolean>) {
      state.gallerySliderVisibility = action.payload;
    }
  }
});

// here you should export the actions in order for dispatch function to use it
export const tourSliceActions
  = tourSlice.actions;
export default tourSlice.reducer;
