import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { DialogTitle } from "@mui/material";

export default function EditDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        sx={{
          borderRadius: "20px",
          margin: "20px 20px",
        }}
        size="large"
      >
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to change the word of this gesture?
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Word"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
