import toast from "react-hot-toast";
import supabase from "../../services/supabase";

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
