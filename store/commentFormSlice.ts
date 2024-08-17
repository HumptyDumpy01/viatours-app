import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const commentFormSlice = createSlice({
  name: `comment-form-slice`,
  initialState: {
    optimisticallyAddedComment: false
  },
  reducers: {
    toggleOptimisticallyAddedComment(state, action: PayloadAction<boolean>) {
      state.optimisticallyAddedComment = action.payload;
    }

  }
});

// here you should export the actions in order for dispatch function to use it
export const commentFormSliceActions
  = commentFormSlice.actions;
export default commentFormSlice.reducer;
