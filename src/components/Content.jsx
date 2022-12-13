import { Masonry } from "@mui/lab";
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import NoteContext from "../NoteContext";
import PopupContext from "../PopupContext";
import { useContext } from "react";
import { motion, LayoutGroup } from "framer-motion";

export default function Content() {
  const { searchParams, filteredNotes, deleteNote } = useContext(NoteContext);
  const { handleEdit } = useContext(PopupContext);

  const handleDelete = (id) => {
    deleteNote(id);
  };
  const highlightedContent = (noteContent) => {
    if (searchParams === "") {
      return noteContent;
    } else {
      const searchLength = searchParams.length;
      const startPosition = noteContent.search(searchParams);
      const contentBefore = noteContent.slice(0, startPosition);
      const contentAfter = noteContent.slice(
        startPosition + searchLength,
        noteContent.length
      );
      const highlightContent = noteContent.slice(
        startPosition,
        startPosition + searchLength
      );
      return (
        <span>
          {contentBefore}
          <b>{highlightContent}</b>
          {contentAfter}
        </span>
      );
    }
  };

  return (
    <>
      <Box display="flex" justifyContent="center">
        <Box
          sx={{
            width: {
              xs: 1,
              sm: 9.8 / 10,
              md: 9.8 / 10,
              lg: 9.9 / 10,
              xl: 9.9 / 10,
            },
            padding: "0 0 0 1rem",
          }}
        >
          <LayoutGroup>
            <Masonry
              columns={{ xs: 2, sm: 2, md: 3, lg: 3, xl: 4 }}
              spacing={2}
            >
              {filteredNotes.map((note) => {
                return (
                  <motion.div key={note.id} layout>
                    <Box
                      sx={{
                        minWidth: {
                          xs: 150,
                          sm: 150,
                          md: 200,
                          lg: 250,
                          xl: 300,
                        },
                      }}
                    >
                      <Card elevation={3}>
                        <CardContent sx={{ paddingBottom: 0 }}>
                          <Typography
                            gutterBottom
                            variant="caption"
                            color="gray"
                          >
                            {note.publishedTime}
                          </Typography>
                          <Typography variant="body1">
                            {highlightedContent(note.content)}
                          </Typography>
                        </CardContent>
                        <CardActions
                          sx={{ display: "flex", flexDirection: "row-reverse" }}
                        >
                          <Tooltip title="Delete note" arrow>
                            <IconButton
                              color="warning"
                              size="small"
                              onClick={(e) => {
                                handleDelete(note.id);
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Edit note" arrow>
                            <IconButton
                              onClick={(e) => {
                                handleEdit(note.id, note.title, note.content);
                              }}
                              color="warning"
                              size="small"
                            >
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                        </CardActions>
                      </Card>
                    </Box>
                  </motion.div>
                );
              })}
            </Masonry>
          </LayoutGroup>
        </Box>
      </Box>
    </>
  );
}
