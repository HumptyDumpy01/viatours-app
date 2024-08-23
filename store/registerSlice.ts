import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const registerSlice = createSlice({
  name: `register-slice`,
  initialState: {
    // define some initial values for your app
    // e.g. counter: 0,
    finalResults: {}

  },
  // here, by using createSlice method,
  // in reducers we specify the functions that would be
  // accessible, We do nt need to write boilerplate if checks code
  reducers: {
    pushObjectToResults(state, action) {
      state.finalResults = action.payload;
    },
    resetResults(state) {
      state.finalResults = {};
    }
  }
});

// here you should export the actions in order for dispatch function to use it
export const registerSliceActions
  = registerSlice.actions;
export default registerSlice.reducer;
