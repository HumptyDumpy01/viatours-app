import { createSlice } from '@reduxjs/toolkit';

const sliceArticleDescr = createSlice({
  name: `slice-article-description`,
  initialState: {
    articleCommentAdded: false
  },
  reducers: {
    setArticleCommentAdded(state, action) {
      state.articleCommentAdded = action.payload;
    }
  }
});

// here you should export the actions in order for dispatch function to use it
export const sliceArticleDescrActions
  = sliceArticleDescr.actions;
export default sliceArticleDescr.reducer;
