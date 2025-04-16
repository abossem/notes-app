import React from "react";

function Footer() {
  return (
    <footer className="bg-[#E6ECFF] text-gray-700 text-center text-sm py-3 mt-auto shadow-inner font-inter">
      <p>
        © 2025 Notes App. Built with{" "}
        <span className="font-semibold">React</span> &{" "}
        <span className="font-semibold">TailwindCSS</span>
      </p>
      <p className="mt-2 text-xs font-medium">
        Made with <span className="text-red-500">❤</span> by:
      </p>
      <p className="mt-1 text-xs font-medium">
        Abdelrahmen Assem, Mohamed Samir, Hassna Nageh, Dina Reda, Batool
        Elgohary, Ahmed Adel
      </p>
    </footer>
  );
}

export default Footer;
