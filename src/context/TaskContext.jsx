import { createContext, useContext, useEffect, useState } from "react";
import supabase from "../services/supabase";
import toast from "react-hot-toast";

const TaskContext = createContext();

export function TaskProvider({ children }) {
  return <TaskContext.Provider value={{}}>{children}</TaskContext.Provider>;
}

export function useTaskContext() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
}
