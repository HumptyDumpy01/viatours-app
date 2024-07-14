import { configureStore } from '@reduxjs/toolkit';
import navigationSlice from '@/store/navigationSlice';
import heroSlice from '@/store/heroSlice';
import toastSlice from '@/store/ToastSlice';
import tourSlice from '@/store/tourSlice';

const store = configureStore({
  reducer: {
    // The prop would be used to access your slice. The slice can be
    // imported with the .reducer in the end or without it. If you add
    // .reducer, then type the name of the slice, if not, then YOUR_SLICE.reducer
    navigation: navigationSlice,
    hero: heroSlice,
    notification: toastSlice,
    tour: tourSlice
  }
});

export default store;

// IMPORTANT:
//  In order to use dispatch and useSelector correctly, create hooks.ts file, and inject the snippet
// by invoking "reduxHooks".
// or inject in manually
/*
import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store.ts';

type DispatchFunction = () => AppDispatch;

export const useCartDispatch: DispatchFunction = useDispatch;
export const useCartSelector: TypedUseSelectorHook<RootState> = useSelector;
*/
// INFO: how to use them in a Component: invoke "cuseDispatch" snippet, or inject
// it manually
/*
  const dispatch = useCartDispatch();

  function handleAddToCart() {
    dispatch(cartActions.addToCart({ id, title, price }));
  }

  ...
  const items = useCartSelector((state) => state.cart.items);
*/

// type for accessing useSelector variables
export type RootState = ReturnType<typeof store.getState>;
// type for accessing reducers(action functions) in your store
export type AppDispatch = typeof store.dispatch;
