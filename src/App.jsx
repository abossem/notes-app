import { useNote } from "./context/NotesContext";

function App() {
  const { notes } = useNote();
  console.log(notes);
  return (
    <div>
      <h1>Notes</h1>

      <div>
        {notes.map((note) => (
          <p key={note?.id}>{note.content}</p>
        ))}
      </div>
    </div>
  );
}

export default App;
