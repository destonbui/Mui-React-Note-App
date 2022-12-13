import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PopupContext from "../PopupContext";
import { useContext } from "react";

export default function AddNote() {
  const { handleClick } = useContext(PopupContext);
  return (
    <>
      <Button
        onClick={handleClick}
        variant="outlined"
        startIcon={<AddIcon />}
        color="warning"
        sx={{
          fontWeight: 700,
          marginLeft: {
            xs: 0,
            sm: "0.5rem",
            md: "0.5rem",
            lg: "0.5rem",
            xl: "0.5rem",
          },
        }}
        size="large"
      >
        Add
      </Button>
    </>
  );
}
