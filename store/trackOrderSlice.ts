import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const trackOrderSlice = createSlice({
  name: `track-order-slice`,
  initialState: {
    orderStage: 1,
    actionsStage: {
      stage: 1,
      type: ``
    }
  },
  reducers: {
    setOrderStage(state, action: PayloadAction<1 | 2>) {
      state.orderStage = action.payload;
    },
    setActionsStage(state, action: PayloadAction<{
      stage: 1 | 2 | 3;
      type: `refund` | `cancellation`;
    }>) {
      state.actionsStage = action.payload;
    }
  }
});

// here you should export the actions in order for dispatch function to use it
export const trackOrderSliceActions
  = trackOrderSlice.actions;
export default trackOrderSlice.reducer;
