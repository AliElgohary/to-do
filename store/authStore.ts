// store/authStore.ts
import { createStore } from "zustand"; 
import { createClient } from "@/utils/supabase/client";

const supabase = createClient(); 

interface AuthState {
  user: any; 
  setUser: (user: any) => void;
  signOut: () => Promise<void>;
}

export const authStore = createStore<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null });
  },
}));

export const useAuthStore = () => authStore.getState();
