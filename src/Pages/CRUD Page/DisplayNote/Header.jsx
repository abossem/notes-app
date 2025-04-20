import { useNavigate } from "react-router-dom";
import { logout } from "../../../services/apiAuth";

function Header({ name }) {
  const navigate = useNavigate();

  async function HandleLogOut() {
    await logout();
    navigate("/SignIn");
  }

  return (
    <div className="flex items-center justify-between px-4 mt-4">
      <span className="text-xl font-medium text-[#2C3338]">
        Hello <span className="text-[#3361cc] font-semibold">{name}</span>
      </span>

      <button
        className="bg-red-500 text-[16px] font-semibold rounded-[5px] cursor-pointer px-6 py-3 text-white"
        onClick={HandleLogOut}
      >
        Log out
      </button>
    </div>
  );
}

export default Header;
