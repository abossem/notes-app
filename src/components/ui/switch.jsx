import React from "react";

const Switch = ({ enabled, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className={`w-12 h-6 flex items-center rounded-full p-1 duration-300 ease-in-out ${
        enabled ? "bg-blue-600" : "bg-gray-300"
      }`}
    >
      <div
        className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${
          enabled ? "translate-x-6" : ""
        }`}
      ></div>
    </button>
  );
};

export { Switch };
