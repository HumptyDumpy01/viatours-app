import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const trackOrderSlice = createSlice({
  name: `track-order-slice`,
  initialState: {
    currentStage: 2
  },
  reducers: {
    setStage(state, action: PayloadAction<1 | 2>) {
      state.currentStage = action.payload;
    }
  }
});

// here you should export the actions in order for dispatch function to use it
export const trackOrderSliceActions
  = trackOrderSlice.actions;
export default trackOrderSlice.reducer;
