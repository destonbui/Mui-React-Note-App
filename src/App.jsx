import Navbar from "./components/Navbar";
import Content from "./components/Content";
import Popup from "./components/Popup";
import { NoteProvider } from "./NoteContext";
import { PopupProvider } from "./PopupContext";
import { CssBaseline } from "@mui/material";

export default function App() {
  return (
    <>
      <CssBaseline />
      <div className="App">
        <NoteProvider>
          <PopupProvider>
            <Navbar />
            <Content />
            <Popup />
          </PopupProvider>
        </NoteProvider>
      </div>
    </>
  );
}
