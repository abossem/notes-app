import { X } from "lucide-react";

function AddTask({ setIsOpen }) {
  return (
    <div className="absolute top-0 w-full ">
      <div
        className="w-full min-h-screen flex items-center justify-center bg-black/50"
        onClick={() => setIsOpen(false)}
      />
      <div onClick={() => setIsOpen(false)} className="absolute top-5 right-5">
        <X size={30} color="#fff" className="cursor-pointer" />
      </div>

      <form className="flex absolute top-[50%] -translate-y-[50%] left-[50%] translate-x-[-50%] flex-column justify-content-center items-center gap-4 bg-green-100 rounded-2xl p-5  mx-auto  shadow-lg">
        <input type="text" placeholder="Add your task" />

        <button className="bg-green-800 px-5 py-3 text-center font-semibold rounded-2xl text-green-200 hover:-translate-y-1 hover:shadow-xl cursor-pointer transition-all duration-300 ease-in-out">
          Add Task
        </button>
      </form>
    </div>
  );
}

export default AddTask;
