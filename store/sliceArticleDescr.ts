import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormResultsType } from '@/components/article-description/leave-reply/ArticleDescrLeaveReply';

const sliceArticleDescr = createSlice({
  name: `slice-article-description`,
  initialState: {
    articleCommentAdded: false,
    newArticleReviews: [] as FormResultsType[]
  },
  reducers: {
    setArticleCommentAdded(state, action: PayloadAction<boolean>) {
      state.articleCommentAdded = action.payload;
    },
    pushNewArticleReviews(state, action: PayloadAction<FormResultsType>) {
      state.newArticleReviews.push(action.payload);
    }
  }
});

// here you should export the actions in order for the dispatch function to use it
export const sliceArticleDescrActions
  = sliceArticleDescr.actions;
export default sliceArticleDescr.reducer;
