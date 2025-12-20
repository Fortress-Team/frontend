import axios, { AxiosError } from "axios";
import { useAuthStore } from "../store/authStore";
import type { User } from "../types";

const api = axios.create({
  baseURL: "https://fortress-backend-og7k.onrender.com/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

 {/* Request Interceptors */}
api.interceptors.request.use(
    (config) => {
        const token = useAuthStore.getState().token;
        
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);


interface AuthResponse {
  message: string;
  status?: number;
  user?: User
  token?: string;
}

interface ApiError {
  message: string;
  errors?: string[];
}

interface RegisterUser {
  fullName: string;
  email: string;
  password: string;
}

interface LoginUser {
  email: string;
  password: string;
}

interface ResetPasswordProps {
  token: string;
  newPassword: string;
}

export const RegisterUser = async (
  payload: RegisterUser
): Promise<AuthResponse> => {
  try {
    const response = await api.post("auth/register", payload);
    return response.data;
  } catch (error) {
    const err = error as AxiosError<ApiError>;
    throw err.response?.data || { message: "Registration failed" };
  }
};

export const LoginUser = async (
  payload: LoginUser
): Promise<AuthResponse> => {
  try {
    const response = await api.post("auth/login", payload);
    return response.data;
  } catch (error) {
    const err = error as AxiosError<ApiError>;
    throw err.response?.data || { message: "Login failed" };
  }
};

export const VerifyOTP = async (otp: string): Promise<AuthResponse> => {
  try {
    const response = await api.post("auth/verify-otp", { OTP: otp });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      // AxiosError type provides the `response` property
      throw error.response?.data || { message: "Server error" };
    }
    throw { message: "Server error" };
  }
};

export const ResendOTP = async (email: string): Promise<AuthResponse> => {
  try {
    const response = await api.post("auth/resend-otp", { email });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || { message: "Server error" };
    }
    throw { message: "Server error" };
  }
};

export const ForgotPassword = async (email: string): Promise<AuthResponse> => {
  try {
    const response = await api.post("auth/forgot-password", { email });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || { message: "Server error" };
    }
    throw { message: "Server error" };
  }
};


export const ResetPassword = async (payload: ResetPasswordProps): Promise<AuthResponse> => {
  try {
    const response = await api.post("auth/reset-password", payload);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || { message: "Server error" };
    }
    throw { message: "Server error" };
  }
};


export default api;