import { LoginUser, RegisterUser, VerifyOTP } from "../lib/api";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "../types";

// interface User {
//     fullName: string;
//     email: string;
//     id: string;
// }

interface AuthState {
    user : User | null;
    token : string | null;
    isAuthenticated : boolean ;
    login : (email : string , password : string) =>Promise<void>;
    register : (fullName : string , email : string , password : string) =>Promise<void>;
    logout : () => void;
    verifyOTP : (otp : string) => Promise<void>;
      setUser: (user: User | null) => void;
  getUser: () => User | null;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      setUser: (user) => {
        set({ user, isAuthenticated: !!user });
      },

      getUser: () => {
        return get().user;
      },

            login : async (email : string , password : string) => {
                try {
                    const response = await LoginUser({email , password});
                    set({  
                        user : response.user || null , 
                        token: response.token || "", 
                        isAuthenticated : true
                    });
                } catch (error : any) {
                    const message = error?.message || error?.data?.message || "Login failed";
                    throw new Error(message);
                }
            },
            register : async (fullName : string , email : string , password : string) => {
                try {
                    const response = await RegisterUser({fullName , email , password});
                    set({ 
                        user : response.user || null , 
                        token: response.token || "", 
                        isAuthenticated : true
                    });
                } catch (error : any) {
                 
                    const message = error?.errors?.[0] || error?.message || "Registration failed";
                    const err = new Error(message) as any;
                    err.data = error;
                    throw err;
                }
            },
            logout : () => {
                set({ user : null , token: null, isAuthenticated : false});
            },
            verifyOTP : async (otp : string) => {
                try {
                    const response = await VerifyOTP(otp);
                    set({
                        user : response.user || null , 
                        token: response.token || "", 
                        isAuthenticated : true
                    });
                } catch (error : unknown) {
                    throw new Error(error instanceof Error ? error.message : "OTP verification failed");
                }
            }
        }),
        {
            name : "auth-storage-v2",
        }
    )
)