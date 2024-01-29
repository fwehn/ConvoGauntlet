import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { DialogTitle } from "@mui/material";
import { postGesture } from "../rest/rest.tsx";
import { useState } from "react";

export default function EditDialog({label, gesture, sentence, onSaved }: {
    label: string,
    gesture: string,
    sentence: string,
    onSaved: (sentence: string) => void
}) {
    const [open, setOpen] = React.useState(false);
    const [newSentence, setNewSentence] = useState(sentence);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        setOpen(false);

        postGesture(gesture, newSentence)
            .then(() => onSaved(newSentence))
            .catch(console.error);
    };

    return (
        <>
            <Button
                onClick={handleClickOpen}
                variant="contained"
                sx={{
                    borderRadius: "20px",
                    margin: "20px 20px",
                }}
                size="small"
            >
                {label}
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
                        label="Sentence"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={newSentence}
                        onChange={(e) => setNewSentence(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
