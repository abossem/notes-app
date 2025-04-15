import toast from "react-hot-toast";
import supabase from "../services/supabase";

export async function getUnCheckedTasks() {
  const { data, error } = await supabase
    .from("task")
    .select("*")
    .eq("status", false);

  if (error) {
    toast.error("Error fetching tasks");
    throw new Error(error.message);
  }
  return data;
}

export async function addTask(task) {
  const newTask = {
    task,
    status: false,
    userId: "",
    created_at: new Date(),
  };

  const { data, error } = await supabase
    .from("task")
    .insert([newTask])
    .select();

  if (error) {
    toast.error("Error adding task");
    throw new Error(error.message);
  }

  return data;
}

export async function deleteTask(id) {
  const { data, error } = await supabase.from("task").delete().eq("id", id);

  if (error) {
    toast.error("Error deleting task");
    throw new Error(error.message);
  }

  return data;
}

export async function getCheckedTasks() {
  const { data, error } = await supabase
    .from("task")
    .select("*")
    .eq("status", true);

  if (error) {
    toast.error("Error fetching checked tasks");
    throw new Error(error.message);
  }

  return data;
}

export async function checkTask(id) {
  const { data, error } = await supabase
    .from("task")
    .update({ status: true })
    .eq("id", id)
    .select();
  if (error) {
    toast.error("Error updating task status");
    throw new Error(error.message);
  }

  return data;
}
