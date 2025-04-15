// import toast from "react-hot-toast";
// import { useTaskContext } from "../../context/TaskContext";
// import Loader from "../../ui/Loader";
// import AddTask from "./AddTask";
// import { checkTask } from "./useTasks";

// function Todo() {
//   const { tasks, isLoading, isOpen, setIsOpen } = useTaskContext();
//   console.log("TASK", tasks);

//   async function handleCheck(id) {
//     try {
//       await checkTask(id);
//     } catch (err) {
//       toast.error("Failed to update task");
//       console.error(err);
//     }
//   }

//   return (
//     <div>
//       {isLoading ? (
//         <div className="w-full h-screen flex items-center justify-center">
//           <Loader />
//         </div>
//       ) : (
//         <div className="container mx-auto p-4">
//           <div className="flex items-center justify-between mb-4 border-b py-2">
//             <h1 className="text-2xl font-bold">Todo List</h1>

//             <button
//               onClick={() => setIsOpen((e) => !e)}
//               className="bg-green-800 px-5 py-3 text-center font-semibold rounded-2xl text-green-200 hover:-translate-y-1 hover:shadow-xl cursor-pointer transition-all duration-300 ease-in-out"
//             >
//               Add Task
//             </button>
//           </div>
//           <ul className="list-disc pl-5">
//             {tasks?.map((task) => (
//               <li
//                 key={task.id}
//                 className="flex items-center justify-start gap-2 mb-2"
//               >
//                 <input
//                   type="checkbox"
//                   id={task.id}
//                   className="size-4"
//                   checked={task.status}
//                   onChange={() => handleCheck(task.id)}
//                 />
//                 <label htmlFor={task.id}>{task.task}</label>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {isOpen && <AddTask setIsOpen={setIsOpen} />}
//     </div>
//   );
// }

// export default Todo;
