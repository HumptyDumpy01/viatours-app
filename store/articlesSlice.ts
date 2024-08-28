import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const articlesSlice = createSlice({
  name: `articles-slice`,
  initialState: {
    searchHeroBtnClicked: false,
    searchTerm: ``,
    tag: ``
  },
  reducers: {
    resetArticlesState(state) {
      state.searchHeroBtnClicked = false;
      state.searchTerm = ``;
      state.tag = ``;
    },
    storeSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
    storeTag(state, action) {
      state.tag = action.payload;
    },
    toggleSearchHeroBtnClicked(state, action: PayloadAction<boolean>) {
      state.searchHeroBtnClicked = action.payload;
    }
  }
});

// here you should export the actions in order for dispatch function to use it
export const articlesSliceActions
  = articlesSlice.actions;
export default articlesSlice.reducer;
