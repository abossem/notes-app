import { useEffect, useState } from "react";
import { Files, PanelRight, Settings, Trash2, Wifi } from "lucide-react";
import { Pin, X, Search, Menu, SquarePen } from "lucide-react";
import {
  getDeletedNotes,
  getNote,
  getNotes,
  updatePin,
} from "../../services/apiNote.js";
import CreateNote from "../CreateNote/CreateNote.jsx";

const DisplayNote = ({ userId }) => {
  const [open, setOpen] = useState(true);
  const [open2, setOpen2] = useState(true);
  const [searchText, setSearchText] = useState("");
  async function clear() {
    setSearchText("");
    try {
      const data = await getNotes(userId);
      setNotes(data);
    } catch (err) {
      setError(err.message);
    }
  }

  ///////////////////////////////////////
  const handlePinClick = async (index, note) => {
    // Create a shallow copy of the note and toggle pin
    const updatedNote = { ...note, pin: !note.pin };

    try {
      // Update in DB
      const savedNote = await updatePin(updatedNote);

      // Update local state
      setNotes((prevNotes) => {
        const updatedNotes = [...prevNotes];
        updatedNotes.splice(index, 1); // remove current

        if (savedNote.pin) {
          // put pinned notes at top
          return [savedNote, ...updatedNotes];
        } else {
          // move to end if unpinned
          return [...updatedNotes, savedNote];
        }
      });
    } catch (err) {
      setError(err.message);
    }
  };

  const [notes, setNotes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchNotes() {
      try {
        const data = await getNotes(userId);
        setNotes(data);
      } catch (err) {
        setError(err.message);
      }
    }

    fetchNotes();
  }, [userId]);
  console.log(notes);
  const handleSearch = async (text) => {
    try {
      console.log(text);

      const data = await getNote("title", text);
      setNotes(data);
    } catch (err) {
      setError(err.message);
    }
  };

  ///////////////////////////////////////
  const [activeIndex, setActiveIndex] = useState(0);
  const handleClick = (index) => {
    setActiveIndex(index);
    console.log("Clicked index:", index);
  };
  /////////////////////////////////
  const [activeIndexSidebar, setActiveIndexSidebar] = useState(0);

  const menuItems = [
    { icon: <Files color="gray" />, label: "All Notes" },
    { icon: <Trash2 color="gray" />, label: "Trash" },
    { icon: <Settings color="gray" />, label: "Settings" },
  ];

  const handleClickSidebar = (index) => {
    setActiveIndexSidebar(index);
    if (index == 0) {
      async function fetchNotes() {
        try {
          const data = await getNotes(userId);
          setNotes(data);
        } catch (err) {
          setError(err.message);
        }
      }
      fetchNotes();
    } else if (index == 1) {
      async function fetchNotes() {
        try {
          const data = await getDeletedNotes(userId);
          setNotes(data);
        } catch (err) {
          setError(err.message);
        }
      }
      fetchNotes();
    }
    console.log("Clicked index in Sidebar:", index);
  };
  return (
    <div className="flex ">
      <div
        className={` ${
          open2 ? "hidden" : "block "
        } bg-white border w-60 border-indigo-200 h-screen absolute duration-300 z-40 text-gray-800 `}
      >
        <X className="mr-2 cursor-pointer" onClick={() => setOpen2(!open2)} />
        {menuItems.map((item, index) => (
          <div
            key={index}
            onClick={() => handleClickSidebar(index)}
            className={`flex rounded-md pl-5 py-3 cursor-pointer text-md items-center gap-x-4 border-b border-indigo-200 
            hover:bg-indigo-50 ${
              activeIndexSidebar === index
                ? "bg-indigo-100 text-indigo-700 font-medium"
                : ""
            }`}
          >
            {item.icon}
            {item.label}
          </div>
        ))}
        <div className="mt-80 border-t border-indigo-200 p-6 text-gray-500 text-sm">
          <div className="flex gap-1">
            <Wifi />
            Server connection
          </div>
          <p className="py-4">Keyboard Shortcuts</p>
          <p>Help & Support About</p>
        </div>
      </div>
      <div
        className={` ${
          open ? "w-130" : "w-0 "
        } bg-white border-r border-indigo-200 h-fit relative duration-300`}
      >
        <div className="flex gap-x-4 items-center justify-between p-3 ">
          <Menu
            className="cursor-pointer"
            onClick={() => setOpen2(!open2)}
            onMouseUp={() => setOpen2(open2)}
          />

          <p
            className={`font-semibold origin-left duration-200 ${
              !open && "scale-0"
            }`}
          >
            All Notes
          </p>
          <SquarePen className="cursor-pointer" />
        </div>
        <div
          className={`${
            !open && "hidden"
          } flex gap-x-4 items-center justify-between border-b border-t border-indigo-200`}
        >
          <Search className="w-5 h-5 absolute ml-3" color="gray" />
          <input
            type="text"
            name="search"
            placeholder="Search all notes and tags"
            className="w-80 pl-10 py-3 font-normal 
             placeholder-gray-500 text-black border-none outline-0"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              handleSearch(e.target.value);
            }}
          />
          {searchText && (
            <X className="mr-2 cursor-pointer" onClick={() => clear()} />
          )}
        </div>
        <ul className={`${!open && "hidden"}`}>
          {notes.map((note, index) => (
            <div
              className={`${!open && "hidden"}group origin-left duration-200`}
              key={index}
            >
              <li
                onClick={() => handleClick(index)}
                style={{
                  padding: "-10px",
                  backgroundColor:
                    activeIndex === index ? "#dbeafe" : "#f9fafb",
                }}
                key={index}
                className="flex group  p-3 cursor-pointer hover:bg-indigo-50 text-sm items-center gap-x-4 border-b border-indigo-200"
              >
                {note.pin ? (
                  <Pin
                    className="-mr-7.5 mb-5 rotate-[50deg] cursor-pointer group-hover:block"
                    size={14}
                    strokeWidth={3}
                    color={note.pin ? "blue" : "gray"}
                    onClick={() => handlePinClick(index, note)}
                  />
                ) : (
                  <Pin
                    className="hidden -mr-7.5 mb-5 rotate-[50deg] cursor-pointer group-hover:block"
                    size={14}
                    strokeWidth={3}
                    color={note.pin ? "blue" : "gray"}
                    onClick={() => handlePinClick(index, note)}
                  />
                )}
                <div className="flex flex-col pl-5 w-full">
                  <span className="truncate w-80 overflow-hidden text-base">
                    {note.title}
                  </span>
                  <span className="truncate w-80 overflow-hidden text-gray-500 text-base">
                    {note.content}
                  </span>
                </div>
              </li>
            </div>
          ))}
        </ul>
      </div>

      <div className="h-[49px] flex p-3 border-b border-indigo-200 w-full">
        {open ? (
          ""
        ) : (
          <div className="border-r border-indigo-200 w-8 h-12 -mt-3">
            <SquarePen className="cursor-pointer mt-3" />
          </div>
        )}
        <div>
          <PanelRight
            className="cursor-pointer  w-7 
          rotate-180 ml-2"
            onClick={() => setOpen(!open)}
          />
          <CreateNote userId={userId} />
        </div>
      </div>
    </div>
  );
};
export default DisplayNote;
