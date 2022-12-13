import {
  Modal,
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  Divider,
  TextField,
  Button,
} from "@mui/material";
import PopupContext from "../PopupContext";
import NoteContext from "../NoteContext";
import { useContext, useRef, useEffect } from "react";

export default function Popup() {
  const { open, content, handleClose, handleChange, type, action, editId } =
    useContext(PopupContext);
  const { notes, addNote, deleteNote } = useContext(NoteContext);

  const Add = () => {
    if (content === "") {
      return;
    } else {
      handleClose();
      addNote(
        new Intl.DateTimeFormat("en-Us", {
          month: "long",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
        }).format(new Date()),
        content
      );
    }
  };
  const Edit = () => {
    const prevContent = notes.filter((note) => {
      return note.id === editId;
    });
    if (prevContent[0].content !== content) {
      deleteNote(editId);
      addNote(
        new Intl.DateTimeFormat("en-Us", {
          month: "long",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
        }).format(new Date()),
        content
      );
    }
    handleClose();
  };

  const inputElement = useRef(null);
  useEffect(() => {
    setTimeout(() => {
      if (inputElement.current) {
        inputElement.current.focus();
      }
    }, 100);
  }, [open]);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Box sx={{ width: { xs: 300, sm: 450, md: 500, lg: 550, xl: 600 } }}>
          <Card elevation={5}>
            <CardContent>
              <Typography variant="h5" color="orange">
                {type}
              </Typography>
              <Divider />
              <TextField
                value={content}
                onChange={handleChange}
                color="warning"
                id="noteContent"
                label="Content"
                placeholder="Take a note..."
                variant="outlined"
                multiline
                fullWidth
                inputRef={inputElement}
                sx={{ margin: "1rem 0 0 0" }}
              />
            </CardContent>
            <CardActions sx={{ padding: "0 1rem 1rem 1rem" }}>
              <Button
                onClick={
                  action === "Add"
                    ? (e) => {
                        Add();
                      }
                    : action === "Confirm Edit"
                    ? (e) => {
                        Edit();
                      }
                    : () => {
                        console.log("Popup Action Error!");
                      }
                }
                variant="contained"
                color="warning"
                fullWidth
              >
                {action}
              </Button>
            </CardActions>
          </Card>
        </Box>
      </Box>
    </Modal>
  );
}
