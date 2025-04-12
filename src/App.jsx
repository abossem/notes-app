import AddNote from "./AddNote";
import { useNote } from "./context/NotesContext";

function App() {
  const { notes } = useNote();
  console.log(notes);
  return (
    <div>
      <h1>Notes</h1>

      <div>
        {notes.map((note) => (
          <div key={note?.id}>
            <p>{note.title}</p>
            <p>{note.content}</p>
          </div>
        ))}
      </div>

      <AddNote />
    </div>
  );
}

export default App;
