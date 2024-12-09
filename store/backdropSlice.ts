import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const backdropSlice = createSlice({
  name: `backdrop-slice`,
  initialState: {
    backdropOpen: true
  },
  // here, by using createSlice method,
  // in reducers we specify the functions that would be
  // accessible, We do nt need to write boilerplate if checks code
  reducers: {
    setBackdropOpen(state, action: PayloadAction<boolean>) {
      state.backdropOpen = action.payload;
    }
  }
});

// here you should export the actions in order for dispatch function to use it
export const backdropSliceActions
  = backdropSlice.actions;
export default backdropSlice.reducer;
