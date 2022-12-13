import { AppBar, Toolbar } from "@mui/material";
import AddNote from "./AddNote";
import Brand from "./Brand";
import SearchField from "./SearchField";

const Navbar = () => {
  return (
    <AppBar
      elevation={1}
      position="static"
      color="transparent"
      sx={{ marginBottom: "2rem" }}
    >
      <Toolbar>
        <Brand />
        <SearchField />
        <AddNote />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
