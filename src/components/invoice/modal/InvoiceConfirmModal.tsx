import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  onConfirm: () => void;
}

export default function InvoiceConfirmModal({ isOpen, onClose, onConfirm, message }: ConfirmationModalProps) {
  return (
    <React.Fragment>
      <Dialog open={isOpen} onClose={onClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <div className="p-4">
          <div className="text-right">
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </div>
          <div className="px-10">
            <div className="flex justify-center">
              <div className="flex justify-center items-center bg-red-200 rounded-full w-16 h-16">
                <DeleteIcon className="text-red-600 text-[2rem]" />
              </div>
            </div>

            <DialogTitle id="alert-dialog-title " className="text-center">
              Are you sure ?
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description" className="text-center">
                {message}{" "}
              </DialogContentText>
            </DialogContent>
            <DialogActions className="text-center flex justify-center">
              <Button onClick={onClose} className="bg-gray-400 text-gray-50 w-[50%]">
                Cancel
              </Button>
              <Button variant="contained" className="bg-red-500 w-[50%]" onClick={onConfirm} autoFocus>
                Delete
              </Button>
            </DialogActions>
          </div>
        </div>
      </Dialog>
    </React.Fragment>
  );
}
