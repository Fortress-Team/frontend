import { create } from "zustand";
import type { User } from "../types";





const API_URL = import.meta.env.VITE_API_URL

interface UserState {
  loading: boolean;
  totalPage: number;
  message: string;
  talents: User[];
  talent: User | null;


  userProfile: () => Promise<{ success: boolean; message: string }>;

  fetchAllTalents: ( page?: number , limit?: number) => Promise<{ success: boolean; users?: User[] }>;

  fetchSingleTalent: (id: string) => Promise<{ success: boolean; user?: User }>;

  searchTalents: (search: string) => Promise<User[] | void>;

}

export const useTalentStore = create<UserState>((set) => ({
  loading: false,
  message: "",
  talents: [],
  totalPage: 1,
  talent: null,



  // FETCH PROFILE (logged-in user)
  userProfile: async () => {
    set({ loading: true });

    try {
      const response = await fetch(`${API_URL}/user/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
      
        set({ talent: data, loading: false, message: "Profile fetched" });
        return { success: true, message: "Profile fetched" };
      } else {
        set({
          loading: false,
          message: data?.message || "Failed to fetch profile",
        });
        return { success: false, message: data?.message };
      }
    } catch (error: unknown) {
      console.error("User profile error:", error);
      const errorMessage = error instanceof Error ? error.message : "Error fetching profile";
      set({
        loading: false,
        message: errorMessage,
      });
      return { success: false, message: errorMessage };
    }
  },

 fetchAllTalents: async (page = 1, limit = 10) => {
  set({ loading: true });
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(`${API_URL}/users?page=${page}&limit=${limit}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();
    // console.log("User data:", data);

    if (!response.ok) {
      throw new Error(data?.message || "Failed to fetch users");
    }

    set({
      loading: false,
      talents: Array.isArray(data?.users) ? data.users : [],
      totalPage: data?.totalPage ?? 1,
    });

    return { success: true, users: data.users };
  } catch (error: unknown) {
    console.error("Fetch all users error:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to fetch users";
    set({ loading: false, talents: [], message: errorMessage });
    return { success: false };
  }
},


  // FETCH SINGLE USER
  fetchSingleTalent: async (id) => {
    set({ loading: true });

    try {
      const response = await fetch(`${API_URL}/users/${id}`, {
        method: "GET",
      });

      const data = await response.json();

      if (response.ok) {
        set({ talent: data.user, loading: false });
        return { success: true, user: data };
      } else {
        set({ loading: false, message: data?.message });
        return { success: false };
      }
    } catch (error: unknown) {
      console.error("Fetch single user error:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to fetch user";
      set({ loading: false, message: errorMessage });
      return { success: false };
    }
  },

 searchTalents: async (search: string): Promise<User[] | void> => {
  if (!search.trim()) return;
  set({ loading: true });

  const token = localStorage.getItem('token');

  try {
    const res = await fetch(`${API_URL}/users/search?search=${encodeURIComponent(search)}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();

    if (res.ok) {
      set({ talents: data, loading: false });
      return data; 
    } else {
      console.error('Search failed:', data.message);
      set({ loading: false });
      return; 
    }
  } catch (error: unknown) {
    console.error("Search error:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to fetch users";
    set({ loading: false, message: errorMessage });
    return;
  }
},




}));
