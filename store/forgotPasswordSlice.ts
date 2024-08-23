import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const forgotPasswordSlice = createSlice({
  name: `forgit-password-slice`,
  initialState: {
    forgotPasswordStage: 1,
    userEmail: ``
  },
  reducers: {
    setForgotPasswordStage(state, action: PayloadAction<number>) {
      state.forgotPasswordStage = action.payload;
    },
    setUserEmail(state, action: PayloadAction<string>) {
      state.userEmail = action.payload;
    }
  }
});

// here you should export the actions in order for dispatch function to use it
export const forgotPasswordSliceActions
  = forgotPasswordSlice.actions;
export default forgotPasswordSlice.reducer;
