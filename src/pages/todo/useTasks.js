import { useState, useEffect } from "react";
import { getTasks } from "../../services/apiTask";
import supabase from "../../services/supabase";

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchTasks() {
      try {
        setIsLoading(true);

        const { data } = await supabase.from("task").select("*");
        if (data.length === 0) {
          console.log("No tasks found");
          return;
        }
        setTasks(data);
      } catch (err) {
        console.error(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTasks();
  }, []);

  return { tasks, isLoading };
}
