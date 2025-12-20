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
}


export const  useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user : null,
            token : null,
            isAuthenticated : false,
            login : async (email : string , password : string) => {
                try {
                    const response = await LoginUser({email , password});
                    set({  
                        user : response.user || null , 
                        token: response.token || "", 
                        isAuthenticated : true
                    });
                } catch (error : any) {
                    console.error("[AuthStore] Login Error:", error);
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
                    // Extract the most specific error message possible
                    const backendMsg = error?.errors?.[0] || error?.message || "Registration failed";
                    throw new Error(backendMsg);
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