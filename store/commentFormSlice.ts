import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export type FormCommentResultsType = {
  user: string;
  rating: number;
  title: string;
  images: string[];
  text: string;
  addedAt: string;
}


const commentFormSlice = createSlice({
  name: `comment-form-slice`,
  initialState: {
    optimisticallyAddedComment: false,
    newComments: [] as FormCommentResultsType[]
  },
  reducers: {
    toggleOptimisticallyAddedComment(state, action: PayloadAction<boolean>) {
      state.optimisticallyAddedComment = action.payload;
    },
    pushComment(state, action: PayloadAction<FormCommentResultsType>) {
      state.newComments.push(action.payload);
    }

  }
});

// here you should export the actions in order for dispatch function to use it
export const commentFormSliceActions
  = commentFormSlice.actions;
export default commentFormSlice.reducer;
