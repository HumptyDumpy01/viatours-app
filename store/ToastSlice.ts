import { createSlice } from '@reduxjs/toolkit';

const ToastSlice = createSlice({
  name: `toast-slice`,
  initialState: {
    showNotification: false

  },
  reducers: {
    showNotification(state) {
      state.showNotification = true;
    },
    hideNotification(state) {
      state.showNotification = false;
    }
  }
});

// here you should export the actions in order for dispatch function to use it
export const ToastSliceActions
  = ToastSlice.actions;
export default ToastSlice.reducer;
