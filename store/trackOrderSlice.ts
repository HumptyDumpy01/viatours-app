import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type OrderDetailsType = {
  _id: string;
  status: string;
  tour: {
    _id: string;
    title: string;
  };
  tickets: number;
  refundAvailable: boolean;
  refundRequested: boolean;
  cancellationAvailable: boolean;
  cancellationRequested: boolean;
  createdAt: string;
  orderMadeBy: string;
  meetingPoint: {
    location: {
      type: `Point`,
      coordinates: [number, number];
    };
  }
}

const trackOrderSlice = createSlice({
  name: `track-order-slice`,
  initialState: {
    orderStage: 1,
    actionsStage: {
      stage: 1,
      type: ``
    },
    orderDetails: {}
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
    },
    setOrderDetails(state, action: PayloadAction<OrderDetailsType>) {
      state.orderDetails = action.payload;
    }
  }
});

// here you should export the actions in order for dispatch function to use it
export const trackOrderSliceActions
  = trackOrderSlice.actions;
export default trackOrderSlice.reducer;
