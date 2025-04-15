import { useEffect, useState } from "react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "./../../Style/Header.module.css";

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

  return (
    <>
      {isLoggedIn ? (
        <div className={style.DivButton}>
          <div>
            <button
              className={style.buttonLink}
              style={{ backgroundColor: "red" }}
              onClick={HandleLogOut}
            >
              Log out
            </button>
          </div>
        </div>
      ) : (
        <div className={style.DivButton}>
          <Link to="/SignIn" className={style.buttonLink}>
            SignIn
          </Link>
          <Link to="/SignUp" className={style.buttonLink}>
            SignUp
          </Link>
        </div>
      )}
      <h1>Hello {name}</h1>
    </>
  );
}
