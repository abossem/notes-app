import { createContext, useContext, useEffect, useState } from "react";
import supabase from "../services/supabase";
import toast from "react-hot-toast";
import { getCheckedTasks, getUnCheckedTasks } from "../hook/useTasks";

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [checkedTasks, setCheckedTasks] = useState([]);
  const [unCheckedTasks, setUnCheckedTasks] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    async function fetchCheckedTasks() {
      try {
        setIsLoading(true);
        const data = await getCheckedTasks();

        setCheckedTasks(data);
      } catch (error) {
        toast.error("Error fetching checked tasks");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCheckedTasks();
  }, []);

  useEffect(() => {
    async function fetchUnCheckedTasks() {
      try {
        setIsLoading(true);
        const data = await getUnCheckedTasks();

        setUnCheckedTasks(data);
      } catch (error) {
        toast.error("Error fetching checked tasks");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchUnCheckedTasks();
  }, []);

  return (
    <TaskContext.Provider
      value={{
        checkedTasks,
        setCheckedTasks,
        unCheckedTasks,
        setUnCheckedTasks,
        isLoading,
        setIsLoading,
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTaskContext() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
}
