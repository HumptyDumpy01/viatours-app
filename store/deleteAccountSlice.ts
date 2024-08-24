import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const deleteAccountSlice = createSlice({
  name: `delete-account`,
  initialState: {
    deleteAccountStage: 1,
    userEmail: ``
  },
  reducers: {
    setDeleteAccountStage(state, action: PayloadAction<1 | 2>) {
      state.deleteAccountStage = action.payload;
    },
    setUserEmail(state, action: PayloadAction<string>) {
      state.userEmail = action.payload;
    }
  }
});

// here you should export the actions in order for dispatch function to use it
export const deleteAccountSliceActions
  = deleteAccountSlice.actions;
export default deleteAccountSlice.reducer;
