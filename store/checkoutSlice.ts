import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const checkoutSlice = createSlice({
  name: `checkout-slice`,
  initialState: {
    // define some initial values for your app
    // e.g. counter: 0,
    contactDetails: null,
    activityDetails: null,
    openActivityDetails: false,
    openPaymentDetails: false

  },
  // here, by using createSlice method,
  // in reducers we specify the functions that would be
  // accessible, We do nt need to write boilerplate if checks code
  reducers: {
    // we can perform such operations easily, because
    // immer redux package would ensure the correct
    // work of updating the state

    // INFO: You pass type and data in payload
    pushData(state, action: PayloadAction<{ type: `contact` | `activity`, data: any }>) {
      if (action.payload.type === 'contact') {
        state.contactDetails = action.payload.data;
        console.log('state.contactDetails', state.contactDetails);
      }
      if (action.payload.type === 'activity') {
        state.activityDetails = action.payload.data;
        console.log('state.activityDetails', state.activityDetails);
      }
    },

    clearCheckoutForms(state) {
      state.contactDetails = null;
      state.activityDetails = null;
    },

    setOpenActivityDetails(state, action: PayloadAction<boolean>) {
      state.openActivityDetails = action.payload;
    },
    setOpenPaymentDetails(state, action: PayloadAction<boolean>) {
      state.openPaymentDetails = action.payload;
    }

    // increment(state) {
    //     state.counter++;
    // },

    // each Reducer function receives two arguments: old state and dispatched action
    // incrementHandler(state, action) {
    //     state.counter = state.counter + action.payload;
    // }

  }
});

// here you should export the actions in order for dispatch function to use it
export const checkoutSliceActions
  = checkoutSlice.actions;
export default checkoutSlice.reducer;
