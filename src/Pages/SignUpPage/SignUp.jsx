import { useState } from "react";
import styles from "./../../Style/SignUp.module.css";
import { signup } from "./../../services/apiAuth";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [Accept, setAccept] = useState(false);

  const navigate = useNavigate();
  async function SubmitFun(e) {
    e.preventDefault();
    setAccept(true);

    const isValid =
      name.trim().length > 0 && password.length >= 8 && password === rePassword;

    if (!isValid) return;

    try {
      let res = await signup({ name, email, password });
      console.log("Signup successful", res);
      window.localStorage.setItem("name", name);
      window.localStorage.setItem("email", email);
      navigate('/home', { state: { userId: res.user.id } });
    } catch (err) {
      console.error("Signup error", err);
    }
  }

  return (
    <>
      <div className={styles.background}>
        <div className={styles.shape}></div>
        <div className={styles.shape}></div>
      </div>
      <form className={styles.form} onSubmit={SubmitFun}>
        <svg
          style={{ margin: "auto" }}
          className="logo"
          width="96"
          height="96"
          viewBox="0 0 176 176"
        >
          <g fillRule="evenodd" clipRule="evenodd">
            <circle cx="88" cy="88" r="88" fill="transparent"></circle>
            <path
              d="M152.37 87.885c0-34.066-27.182-63.42-59.45-64.854-6.416-.284-12.647 1.432-17.58 5.573-5.002 4.196-8.07 10.09-8.638 16.595C65.43 59.73 78.537 68.618 91.225 72.09c30.69 8.398 48.462 30.086 46.655 56.757 9.057-11.194 14.49-25.442 14.49-40.962zM84.345 97.24c-28.696-7.853-45.817-29.174-43.62-54.317.027-.287.073-.567.102-.852C29.19 53.846 22 70.023 22 87.886c0 34.348 27.955 63.828 60.277 64.933 7.227.248 14.214-1.685 19.766-6.344 5.67-4.757 9.146-11.435 9.79-18.808 1.703-19.463-16.492-27.417-27.488-30.426z"
              fill="#3361cc"
            ></path>
          </g>
        </svg>

        <label htmlFor="username">Username</label>
        <input
          type="text"
          placeholder="UserName"
          id="username"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.input}
          style={{ backgroundColor: "#E8F0FE" }}
        />
        {name.trim().length < 1 && Accept && (
          <p style={{ fontSize: "15px", color: "red", marginLeft: "4px" }}>
            UserName is Required
          </p>
        )}

        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="Email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={styles.input}
          style={{ backgroundColor: "#E8F0FE" }}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
          style={{ backgroundColor: "#E8F0FE" }}
        />
        {password.length < 8 && Accept && (
          <p style={{ fontSize: "15px", color: "red", marginLeft: "4px" }}>
            Password must be more than 8 char
          </p>
        )}

        <label htmlFor="RePassword">Repeat Password</label>
        <input
          type="password"
          placeholder="Repeat Password"
          id="RePassword"
          value={rePassword}
          onChange={(e) => setRePassword(e.target.value)}
          className={styles.input}
          style={{ backgroundColor: "#E8F0FE" }}
        />
        {rePassword !== password && Accept && (
          <p style={{ fontSize: "15px", color: "red", marginLeft: "4px" }}>
            Password is not Match
          </p>
        )}

        <button className={styles.button} type="submit">
          Register
        </button>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "10px",
          }}
        >
          <p>Already have an account </p>
          <Link to="/SignIn" style={{ color: "#3361CC" }}>
            Sign In
          </Link>
        </div>
      </form>
    </>
  );
}
