import toast from "react-hot-toast";
import supabase from "./supabase";

export async function getNotes() {
  const { data: notes, error } = await supabase.from("note").select("*");

  if (error) {
    throw new Error(error);
  }

  return notes;
}

export async function getNote(id) {
  const { data: note, error } = await supabase
    .from("note")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    toast.error("Could not load note");

    throw new Error(error);
  }

  return note;
}

export async function deleteNote(id) {
  const { error } = await supabase.from("note").delete().eq("id", id);

  if (error) {
    throw new Error(error);
  }
}

export async function addNote(note) {
  const { error } = await supabase.from("note").insert([
    {
      title: note.title,
      content: note.content,
    },
  ]);

  if (error) {
    toast.error("Could not add note");

    throw new Error(error);
  }
  toast.success("Note added successfully");
}
