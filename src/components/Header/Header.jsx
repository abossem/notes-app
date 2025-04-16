import { Menu } from "lucide-react";

function Header() {
  return (
    <header className="container mx-auto p-4 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <img className="w-10" src="/src/assets/images/Logo.png" alt="Logo" />
        <h1 className="text-[30px] font-bold">Note App</h1>
      </div>
      <nav className="flex">
        <ul className="hidden space-x-2 md:flex">
          <li className="text-[18px] text-[#2C3338]">
            <a href="">Home</a>
          </li>
          <li className="text-[18px] text-[#2C3338]">
            <a href="">About</a>
          </li>
          <li className="text-[18px] text-[#2C3338]">
            <a href="">Login</a>
          </li>
          <li className="text-[18px] text-[#2C3338]">
            <a href="">Register</a>
          </li>
        </ul>
      </nav>
      <div className="md:hidden">
        <div
          id="mobile-menu"
          className="absolute flex hidden flex-col items-center py-8 left-6 right-6 top-19 bg-[#E6ECFF] space-y-4"
        >
          <a href="">Home</a>
          <a href="">About</a>
          <a href="">Login</a>
          <a href="">Register</a>
        </div>
      </div>
      <button
        className="md:hidden cursor-pointer"
        onClick={() => {
          document.querySelector("#mobile-menu").classList.toggle("hidden");
        }}
      >
        <Menu />
      </button>
    </header>
  );
}

export default Header;
