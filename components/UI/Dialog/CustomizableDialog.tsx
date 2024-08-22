import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper, { PaperProps } from '@mui/material/Paper';
import Draggable from 'react-draggable';

function PaperComponent(props: PaperProps) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

type CustomizableDialogType = {
  dialogContentText: string;
  dialogContentTitle: string;
  btnSubmitLabel: string;
  btnCancelLabel: string;
  open: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
}

export default function
  CustomizableDialog({
                       dialogContentText,
                       dialogContentTitle,
                       btnSubmitLabel,
                       handleConfirm,
                       btnCancelLabel, open, handleClose
                     }: CustomizableDialogType) {

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          {dialogContentTitle}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {dialogContentText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            {btnCancelLabel}
          </Button>
          <Button onClick={handleConfirm}>
            {btnSubmitLabel}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}