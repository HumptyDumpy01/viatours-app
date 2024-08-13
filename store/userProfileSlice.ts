import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const userProfileSlice = createSlice({
  name: `user-profile`,
  initialState: {
    formSubmitted: false
  },
  reducers: {

    // increment(state) {
    //     state.counter++;
    // },
    toggleFormSubmitted(state, action: PayloadAction<boolean>) {
      state.formSubmitted = action.payload;
    }

    // each Reducer function receives two arguments: old state and dispatched action
    // incrementHandler(state, action) {
    //     state.counter = state.counter + action.payload;
    // }

  }
});

// here you should export the actions in order for dispatch function to use it
export const userProfileSliceActions
  = userProfileSlice.actions;
export default userProfileSlice.reducer;
