import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const HeroSlice = createSlice({
  name: `hero-slice`,
  initialState: {
    calendarIsOpen: false,
    locationIsOpen: false
  },
  reducers: {
    toggleCalendar(state, action: PayloadAction<boolean>) {
      state.calendarIsOpen = action.payload;
    },
    toggleLocation(state, action: PayloadAction<boolean>) {
      state.locationIsOpen = action.payload;
    }
  }
});

// here you should export the actions in order for dispatch function to use it
export const HeroSliceActions
  = HeroSlice.actions;
export default HeroSlice.reducer;
