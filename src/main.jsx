import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "react-hot-toast";
import NoteProvider from "./context/NotesContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <NoteProvider>
      <App />
    </NoteProvider>

    <Toaster />
  </StrictMode>
);
