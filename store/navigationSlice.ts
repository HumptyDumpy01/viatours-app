import { createSlice } from '@reduxjs/toolkit';

const navigationSlice = createSlice({
  name: `navigation`,
  initialState: {
    // define some initial values for your app
    // e.g. counter: 0,
    navIsOpen: false,
    sideNavIsOpen: false
  },
  reducers: {
    // create a function that will open the navigation
    toggleNavigation(state, action) {
      if (action.payload === `close`) {
        state.navIsOpen = false;
      }
      if (action.payload === `open`) {
        state.navIsOpen = true;
      }
    },
    toggleSideNavigation(state, action) {
      if (action.payload === `close`) {
        state.sideNavIsOpen = false;
      }
      if (action.payload === `open`) {
        state.sideNavIsOpen = true;
      }
    }
  }
});

// here you should export the actions in order for dispatch function to use it
export const navigationSliceActions
  = navigationSlice.actions;
export default navigationSlice.reducer;
