import axios, { AxiosError } from "axios";

const api = axios.create({
    baseURL: "https://fortress-backend-og7k.onrender.com/api/v1",
    headers: {
        "Content-Type": "application/json",
    },
});

api.defaults.timeout = 3000

interface AuthResponse  {
    message : string; 
    status? :  number;
    data? :  {
        token? : string;
        user? : {
            fullName : string;
            email : string;
           id : string;
        }
    }
}

interface ApiError {
    message: string ;
    errors?: string []
}


interface RegisterUserProps {
    fullName: string;
    email: string;
    password: string;
}

interface LoginUserProps {
    email: string;
    password: string;
}
 export const RegisterUser = async ({fullName, email, password} : RegisterUserProps ) : Promise<AuthResponse> => {
    try {
   const response = await api.post("auth/register", {fullName, email, password});
    return response.data;
    } catch (error) {
        const err = error as AxiosError<ApiError>;
        throw err.response?.data || { message: "Registration failed" };
    }
 
}

export const LoginUser = async ({email, password} : LoginUserProps ) : Promise<AuthResponse> => {
    try {
   const response = await api.post("auth/login", {email, password});
    return response.data;
    } catch (error) {
        const err = error as AxiosError<ApiError>;
        throw err.response?.data || { message: "Registration failed" };
    }
 
}




export const VerifyOTP = async (otp : string) : Promise<AuthResponse> => {
    try {
        const response = await api.post("auth/verify-otp", {OTP : otp});
        return response.data;
    } catch (error : any) {
        throw error.response?.data || error.message || "server Error";
    }
}
export default api;