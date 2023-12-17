import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Banner } from "./Banners";

interface DeleteIconPopUp {
  open: boolean;
  handleClose: () => void;
  handleDelete: () => void;
}

export default function DeleteIconPopUp({
  open,
  handleClose,
  handleDelete,
}: DeleteIconPopUp) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Delete"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete the entity?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleDelete} autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
