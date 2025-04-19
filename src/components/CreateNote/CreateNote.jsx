import React, { useState, useEffect } from "react";
import {
  FaEllipsisH,
  FaMarkdown,
  FaUpload,
  FaThumbtack,
  FaInfoCircle,
  FaListAlt,
  FaTrash,
} from "react-icons/fa";
import { addNote, updateNote } from "../../services/apiNote";
import toast from "react-hot-toast";
import DropdownMenu from "../DropdownMenu/DropdownMenu";

const CreateNote = ({ userId }) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [noteContent, setNoteContent] = useState("");
  const [createdAt, setCreatedAt] = useState(null);
  const [modifiedAt, setModifiedAt] = useState(null);
  const [lastSyncedAt, setLastSyncedAt] = useState(null);
  const [tags, setTags] = useState([]);
  const [noteId, setNoteId] = useState(null);
  const [title, setTitle] = useState("Untitled");

  const handleMarkdownToggle = () => console.log("Toggled Markdown");
  const handlePublish = () => console.log("Published");
  const handleInfo = () => setShowInfo(true);
  const handleInsertChecklist = () => toggleChecklistItem();
  const handleMoveToTrash = () => console.log("Moved to Trash");

  useEffect(() => {
    if (!createdAt) {
      const now = new Date();
      setCreatedAt(now);
      setModifiedAt(now);
    }
  }, [createdAt]);
  useEffect(() => {
    if (noteContent !== "") {
      setModifiedAt(new Date());

      const words = noteContent.trim().split(/\s+/).slice(0, 4).join(" ");
      setTitle(words || "Untitled");
    }
  }, [noteContent]);

  useEffect(() => {
    if (noteContent !== "") {
      setModifiedAt(new Date());
    }
  }, [noteContent]);

  useEffect(() => {
    if (noteContent.trim() !== "") {
      const timeout = setTimeout(() => {
        const noteData = {
          id: noteId,
          title: title,
          content: noteContent,
          userId,
        };
        saveNote(noteData);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [noteContent, tags, title]);
  // console.log(title);

  const saveNote = async (noteData) => {
    try {
      if (noteData.id) {
        const updated = await updateNote(noteData);
        setNoteId(updated.id);
        toast.success("Note updated");
      } else {
        const added = await addNote(noteData);
        setNoteId(added.id);
        toast.success("Note saved");
      }
      setLastSyncedAt(new Date());
    } catch (error) {
      console.error("Error saving note:", error.message);
    }
  };

  const wordCount = noteContent
    ? noteContent.split(/\s+/).filter(Boolean).length
    : 0;
  const characterCount = noteContent.length;

  const documentInfo = {
    lastSynced: lastSyncedAt ? lastSyncedAt.toLocaleString() : "Not synced yet",
    modified: modifiedAt ? modifiedAt.toLocaleString() : "Not modified yet",
    created: createdAt ? createdAt.toLocaleString() : "Not created yet",
    words: wordCount,
    characters: characterCount,
  };

  const toggleInfo = () => setShowInfo(!showInfo);

  const toggleChecklistItem = () => {
    const checklistItemUnchecked = "[ ]\n";
    const checklistItemChecked = "[x]\n";
    if (noteContent.includes(checklistItemUnchecked)) {
      setNoteContent(
        noteContent.replace(checklistItemUnchecked, checklistItemChecked)
      );
    } else if (noteContent.includes(checklistItemChecked)) {
      setNoteContent(
        noteContent.replace(checklistItemChecked, checklistItemUnchecked)
      );
    } else {
      setNoteContent(checklistItemUnchecked + noteContent);
    }
  };

  const handleTagInput = (e) => {
    const input = e.target.value;
    if (input && input.trim() !== "") {
      setTags((prevTags) => [...prevTags, input.trim()]);
      e.target.value = "";
    }
  };

  return (
    <div className="relative flex flex-col h-screen">
      {/* Dropdown */}
      <div className="absolute -right-170 -top-6.5 ">
        <DropdownMenu
          onMarkdownToggle={handleMarkdownToggle}
          onPublish={handlePublish}
          onInfo={handleInfo}
          onInsertChecklist={handleInsertChecklist}
          onMoveToTrash={handleMoveToTrash}
        />
      </div>

      {/* Icons */}
      <button
        onClick={toggleInfo}
        className="absolute -right-160 -top-8 text-gray-700 hover:text-blue-500 p-2 rounded-full"
        title="Document Info"
      >
        <FaInfoCircle className="text-2xl" />
      </button>

      <button
        className="absolute -right-148 -top-8 text-gray-700 hover:text-green-500 p-2 rounded-full"
        title="Insert/Remove Checklist"
        onClick={toggleChecklistItem}
      >
        <FaListAlt className="text-2xl" />
      </button>

      {/* Textarea */}
      <textarea
        value={noteContent}
        onChange={(e) => setNoteContent(e.target.value)}
        placeholder="Write your note here..."
        className="w-full h-60 p-4 rounded-md mt-4 focus:outline-none"
      />

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-auto p-4 border-t border-gray-300">
        <input
          type="text"
          onKeyDown={(e) => e.key === "Enter" && handleTagInput(e)}
          placeholder="Enter tags (press Enter to add)"
          className="w-full p-2 border-none focus:outline-none rounded-md"
        />
        <div className="flex gap-2 mt-2 flex-wrap">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-200 text-gray-800 p-2 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Info Modal */}
      {showInfo && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md w-1/3">
            <h3 className="text-xl font-bold mb-4">Document Info</h3>
            <p>
              <strong>Last synced:</strong> {documentInfo.lastSynced}
            </p>
            <p>
              <strong>Modified:</strong> {documentInfo.modified}
            </p>
            <p>
              <strong>Created:</strong> {documentInfo.created}
            </p>
            <p>
              <strong>Words:</strong> {documentInfo.words}
            </p>
            <p>
              <strong>Characters:</strong> {documentInfo.characters}
            </p>
            <button
              onClick={toggleInfo}
              className="mt-4 text-blue-500 hover:text-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateNote