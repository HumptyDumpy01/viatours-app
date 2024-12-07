import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { createPortal } from 'react-dom';

type CustomizedSnackbarType = {
  open: boolean;
  handleClose: () => void;
  label: string;
  severity: 'error' | 'warning' | 'info' | 'success' | string;
  variant?: 'filled' | 'outlined' | 'standard';
};

export default function
  CustomizedSnackbar({
                       open,
                       handleClose,
                       label,
                       severity,
                       variant
                     }: CustomizedSnackbarType) {
  if (typeof document === 'undefined') {
    return null; // Return null if not in a browser environment
  }

  const toasterElement = document.getElementById('toaster');

  if (!toasterElement) {
    return null; // Return null if the target container is not found
  }

  return createPortal(
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        // @ts-ignore
        severity={severity}
        variant={variant || 'filled'}
        sx={{ width: '100%' }}
      >
        {label}
      </Alert>
    </Snackbar>,
    toasterElement
  );
}