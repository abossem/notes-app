import { useContext, useEffect, useState, createContext } from "react";
import toast from "react-hot-toast";
import supabase from "../services/supabase";

const NoteContext = createContext();

export default function NoteProvider({ children }) {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function getNotes() {
    try {
      setIsLoading(true);
      const { data: notes, error } = await supabase.from("note").select("*");

      if (error) {
        toast.error("Could not load notes");
        throw new Error(error.message);
      }

      setNotes(notes);
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getNotes();
  }, []);

  //   USE USE MEMO FOR VALUE
  return (
    <NoteContext.Provider value={{ notes, setNotes, isLoading, getNotes }}>
      {children}
    </NoteContext.Provider>
  );
}

export function useNote() {
  const context = useContext(NoteContext);
  if (!context) {
    throw new Error("useNote must be used within a NoteProvider");
  }
  return context;
}
