import { Route, Routes } from "react-router-dom";
import SignUp from "./Pages/SignUpPage/SignUp";
import SignInPage from "./Pages/SignInPage/SignInPage";
import Home from "./Pages/HomePage/Home";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/SignIn" element={<SignInPage />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
