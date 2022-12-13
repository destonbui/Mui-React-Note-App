import { createContext, useState } from "react";

const NoteContext = createContext();

export function NoteProvider({ children }) {
  const [notes, setNotes] = useState([]);
  const [key, setKey] = useState(1);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [searchParams, setSearchParams] = useState("");

  const filterNotes = (params) => {
    setSearchParams(params);
    if (params === "") {
      setFilteredNotes(notes);
    } else {
      setFilteredNotes(() => {
        return notes.filter((note) => {
          return note.content.includes(params);
        });
      });
    }
  };
  const addNote = (time, newNoteContent) => {
    setNotes((prevNotes) => {
      const currentId = key;
      nextKey();
      return [
        {
          id: currentId,
          publishedTime: time,
          content: newNoteContent,
        },
        ...prevNotes,
      ];
    });
  };

  const deleteNote = (deleteId) => {
    setNotes((prevNotes) => {
      return prevNotes.filter((note) => {
        return deleteId !== note.id;
      });
    });
  };

  const nextKey = () => {
    setKey((prevKey) => prevKey + 1);
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        filteredNotes,
        searchParams,
        addNote,
        deleteNote,
        filterNotes,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
}

export default NoteContext;
