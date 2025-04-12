import toast from "react-hot-toast";
import supabase from "./supabase";

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    toast.error("Could not login");
    throw new Error(error.message);
  }

  toast.success("Logged in successfully");

  return data;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    toast.error("Could not logout");
    throw new Error(error.message);
  }

  toast.success("Logged out successfully");
}

// This code used for checking if user is logged in or not and use it for protected routes
export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session) {
    toast.error("Could not get session");
    return null;
  }

  const { data, error } = await supabase.auth.getUser();

  console.log(data.user);

  if (error) {
    toast.error("Could not get user");
    throw new Error(error.message);
  }

  return {
    user: data?.user,
    isAuthenticated: data?.user?.role === "authenticated",
  };
}

export async function signup({ email, password }) {
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    toast.error("Could not signup");
    throw new Error(error.message);
  }

  toast.success("Signed up successfully");

  return data;
}
