import toast from "react-hot-toast";
import supabase from "./supabase";

export async function getTasks() {
  const { data: tasks, error } = await supabase.from("task").select("*");

  if (error) {
    toast.error("Error fetching tasks: " + error.message);
    throw new Error(error.message);
  }

  return tasks;
}

export async function addTask(task) {
  const { data, error } = await supabase.from("task").insert([task]);

  if (error) {
    toast.error("Error adding task: " + error.message);
    throw new Error(error.message);
  }

  toast.success("Task added successfully!");
  return data;
}

export async function updateTask(task) {
  const { data, error } = await supabase
    .from("task")
    .update("task", task.task)
    .eq("id", task.id);

  if (error) {
    toast.error("Error updating task: " + error.message);
    throw new Error(error.message);
  }

  toast.success("Task updated successfully!");
  return data;
}

export async function deleteTask(id) {
  const { data, error } = await supabase.from("task").delete().eq("id", id);

  if (error) {
    toast.error("Error deleting task: " + error.message);
    throw new Error(error.message);
  }

  toast.success("Task deleted successfully!");
  return data;
}
