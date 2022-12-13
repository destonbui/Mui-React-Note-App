import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { Box } from "@mui/material";
import { useState, useContext, useEffect } from "react";
import NoteContext from "../NoteContext";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.04),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.06),
  },
  width: "auto",
  // [theme.breakpoints.down("sm")]: {
  //   width: 100%,
  // },
  marginRight: theme.spacing(1),
  marginLeft: theme.spacing(1),
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "15ch",
      "&:focus": {
        width: "25ch",
      },
    },
    [theme.breakpoints.down("sm")]: {
      width: "0ch",
      "&:focus": {
        width: "10ch",
      },
    },
  },
}));

export default function SearchField() {
  const [searchParams, setSearchParams] = useState("");
  const { notes, filterNotes } = useContext(NoteContext);

  useEffect(() => {
    setSearchParams("");
    filterNotes("");
  }, [notes]);
  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <Box display={{ xs: false, sm: true, md: true, lg: true, xl: true }}>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{
            "aria-label": "search",
            value: searchParams,
            onChange: (e) => {
              setSearchParams(e.target.value);
              filterNotes(e.target.value);
            },
          }}
        />
      </Box>
    </Search>
  );
}
