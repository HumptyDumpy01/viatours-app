'use client';

import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useCartDispatch, useCartSelector } from '@/store/hooks';
import { backdropSliceActions } from '@/store/backdropSlice';

export default function BackdropMUI() {
  const backdropOpen = useCartSelector((state) => state.backdrop.backdropOpen);
  const dispatch = useCartDispatch();

  const handleClose = () => {
    alert('We are performing some actions in the background, please wait a moment..');
    dispatch(backdropSliceActions.setBackdropOpen(false));
  };

  return (
    <Backdrop
      sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
      open={backdropOpen}
      onClick={handleClose}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}