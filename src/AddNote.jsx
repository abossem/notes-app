import { useForm } from "react-hook-form";
import { addNote } from "./services/noteApi";

function AddNote() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    console.log(data);

    addNote(data);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-2 p-4 bg-gray-100 rounded-md shadow-md"
    >
      <input
        type="text"
        {...register("title", { required: true })}
        placeholder="Title"
        className={`${
          errors.title ? "border-red-500" : "border-gray-300"
        } border rounded-md p-2`}
      />

      <textarea
        {...register("content", { required: true })}
        placeholder="Content"
        className={`${
          errors.content ? "border-red-500" : "border-gray-300"
        } border rounded-md p-2`}
      ></textarea>

      <button className="bg-blue-500 text-white p-2 rounded-md shadow-md hover:bg-blue-600 transition duration-200">
        Add Note
      </button>
    </form>
  );
}

export default AddNote;
