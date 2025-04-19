import { useEffect, useState } from "react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
// import style from "./../../Style/Header.module.css";
import { useLocation } from 'react-router-dom';
import DisplayNote from "../../components/DisplayNote/displayNote.jsx";
export default function Home() {
  const [name, setName] = useState("");

  const navigate = useNavigate();



  function HandleLogOut() {
    window.localStorage.removeItem("email");
    navigate("/SignIn");
  }

  const isLoggedIn = !!window.localStorage.getItem("email");

  useEffect(() => {
    const storedName = window.localStorage.getItem("name");
    setName(storedName || "");
  }, []);
  const location = useLocation();
  const { userId } = location.state || {};
  return (
    <>
      {isLoggedIn ? (
        <div
          // className={style.DivButton}
          className="flex justify-end"
        >
          <div>
            <button
              // className={style.buttonLink}
              className="bg-[#026ec1] border-none text-white px-4 py-2 text-base m-1 cursor-pointer rounded flex justify-end"
              style={{ backgroundColor: "red" }}
              onClick={HandleLogOut}
            >
              Log out
            </button>
          </div>
        </div>
      ) : (
          <div
            // className={style.DivButton}
            className="flex justify-end"
          >
            <Link to="/SignIn"
              // className={style.buttonLink}
              className="bg-[#026ec1] border-none text-white px-4 py-2 text-base m-1 cursor-pointer rounded flex justify-end"
            >
            SignIn
          </Link>
            <Link to="/SignUp"
              // className={style.buttonLink}
              className="bg-[#026ec1] border-none text-white px-4 py-2 text-base m-1 cursor-pointer rounded flex justify-end"
            >
            SignUp
          </Link>
        </div>
      )}
      <h1>Hello {name}</h1>
      {/* <div>User ID: {userId}</div>; */}
      <DisplayNote userId={userId} />
    </>
  );
}
