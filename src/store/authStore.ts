import { LoginUser, RegisterUser, VerifyOTP } from "../lib/api";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
    fullName: string;
    email: string;
    id: string;
}

interface AuthState {
    token : string | null ;
    user : User | null;
    isAuthenticated : boolean ;
    login : (email : string , password : string) =>Promise<void>;
    register : (fullName : string , email : string , password : string) =>Promise<void>;
    logout : () => void;
    verifyOTP : (otp : string) => Promise<void>;
}


export const  useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            token : null,
            user : null,
            isAuthenticated : false,
            login : async (email : string , password : string) => {
                try {
                    const response = await LoginUser({email , password});
                    set({token : response.user?.id || null , user : response.user || null , isAuthenticated : true});
                } catch (error : unknown) {
                    throw new Error(error instanceof Error ? error.message : "Login failed");
                }
            },
            register : async (fullName : string , email : string , password : string) => {
                try {
                    const response = await RegisterUser({fullName , email , password});
                    set({token : response.user?.id || null , user : response.user || null , isAuthenticated : true});
                } catch (error : unknown) {
                    throw new Error( error instanceof Error ? error.message : "Registration failed");
                }
            },
            logout : () => {
                set({token : null , user : null , isAuthenticated : false});
            },
            verifyOTP : async (otp : string) => {
                try {
                    const response = await VerifyOTP(otp);
                    set({token : response.user?.id || null , user : response.user || null , isAuthenticated : true});
                } catch (error : unknown) {
                    throw new Error(error instanceof Error ? error.message : "OTP verification failed");
                }
            }
        }),
        {
            name : "auth-storage",
            
        }
    )
)