import { createContext, useState } from "react";

const PopupContext = createContext();

export function PopupProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("Untitled");
  const [content, setContent] = useState("");
  const [type, setType] = useState("");
  const [action, setAction] = useState("");
  const [editId, setEditId] = useState(null);

  const handleEdit = (id, title, content) => {
    setOpen(true);
    setTitle(title);
    setContent(content);
    setType("Edit Note");
    setAction("Confirm Edit");
    setEditId(id);
  };
  const handleClick = () => {
    setOpen(true);
    setTitle("Untitled");
    setContent("");
    setType("New Note");
    setAction("Add");
    setEditId(null);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (e) => {
    const target = e.target.id;
    const value = e.target.value;
    if (target === "noteTitle") {
      setTitle(value);
    }
    if (target === "noteContent") {
      setContent(value);
    }
  };
  return (
    <PopupContext.Provider
      value={{
        open,
        title,
        content,
        handleClick,
        handleClose,
        handleChange,
        handleEdit,
        type,
        action,
        editId,
      }}
    >
      {children}
    </PopupContext.Provider>
  );
}

export default PopupContext;
