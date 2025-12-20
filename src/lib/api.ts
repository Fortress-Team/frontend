import axios, { AxiosError } from "axios";
//  circular dependency
// import { useAuthStore } from "../store/authStore";
import type { User } from "../types";

const api = axios.create({
  baseURL: "/api/v1",
  withCredentials: true, // Re-enabled to send cookies if they are HttpOnly
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

api.interceptors.request.use(
    (config) => {
      // 1. Try to get token from localStorage (Zustand)
      let token = null;
      try {
        const storageData = localStorage.getItem('auth-storage-v2');
        if (storageData) {
          const { state } = JSON.parse(storageData);
          if (state && state.token) {
            token = state.token;
          }
        }
      } catch (e) {
        console.error("Error reading token from storage", e);
      }

      // 2. If no token in storage, try to get it from cookies
      if (!token) {
        try {
            const match = document.cookie.match(new RegExp('(^| )(accessToken|access_token|token)=([^;]+)'));
            if (match) {
                token = match[3];
            }
        } catch (e) {
            console.error("Error reading token from cookie", e);
        }
      }

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      
      return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => Promise.reject(error)
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

export interface Education {
  _id: string;
  course: string;
  school: string;
  date: string;
}

export interface Experience {
  _id: string;
  title: string;
  position: string;
  date: string;
  desc: string;
}

export interface Project {
  _id: string;
  title: string;
  projectImg: string;
  date: string;
  desc: string;
  link?: string;
}

export interface Skill {
  _id: string;
  title: string;
}

export interface UserLinks {
  _id?: string;
  github?: string;
  linkedin?: string;
  X?: string;
  portfolio?: string;
}

export interface UserProfileData {
  fullName: string;
  email: string;
  profRole: string;
  avatar?: string;
  bio?: string;
  location?: string;
  id: string;
}

const handleError = (error: any, defaultMsg: string) => {
  const err = error as AxiosError<ApiError>;
  return err.response?.data || { message: defaultMsg };
};

export const RegisterUser = async (payload: RegisterUser): Promise<AuthResponse> => {
  try {
    const response = await api.post("auth/register", {
      ...payload,
      name: payload.fullName // Send both for backend compatibility
    });
    const data = response.data;
    // Robust extraction for potentially nested data
    const token = data.token || data.data?.token || data.accessToken || data.data?.accessToken;
    const user = data.user || data.data?.user || data.data;
    return { ...data, token, user };
  } catch (error) {
    throw handleError(error, "Registration failed");
  }
};

export const LoginUser = async (
  payload: LoginUser
): Promise<AuthResponse> => {
  try {
    const response = await api.post("auth/login", payload);
    const data = response.data;
    // Robust extraction for potentially nested data
    const token = data.token || data.data?.token || data.accessToken || data.data?.accessToken;
    const user = data.user || data.data?.user || data.data;
    return { ...data, token, user };
  } catch (error) {
    throw handleError(error, "Login failed");
  }
};

export const VerifyOTP = async (otp: string): Promise<AuthResponse> => {
  try {
    const response = await api.post("auth/verify-otp", { OTP: otp });
    const data = response.data;
    // Robust extraction for potentially nested data
    const token = data.token || data.data?.token || data.accessToken || data.data?.accessToken;
    const user = data.user || data.data?.user || data.data;
    return { ...data, token, user };
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
  } catch (error: any) {
    throw error.response?.data || { message: "Server error" };
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


// Educations
export const getEducations = async (): Promise<Education[]> => {
  try {
    const response = await api.get("user/educations");
    return response.data.educations || response.data.data || response.data || [];
  } catch (error: unknown) {
    return []; 
  }
};


export const addEducation = async (payload: Omit<Education, "_id">): Promise<Education> => {
  try {
    const response = await api.post("user/educations", payload);
    const data = response.data.education || response.data.educations || response.data.data || response.data;
    return Array.isArray(data) ? data[0] : data;
  } catch (error) {
    throw handleError(error, "Failed to add education");
  }
};

export const updateEducation = async (id: string, payload: Partial<Education>): Promise<Education> => {
  try {
    const response = await api.put(`user/educations/${id}`, payload);
    return response.data.education || response.data.data || response.data;
  } catch (error) {
    throw handleError(error, "Failed to update education");
  }
};

export const deleteEducation = async (id: string): Promise<void> => {
  try {
    await api.delete(`user/educations/${id}`);
  } catch (error) {
    throw handleError(error, "Failed to delete education");
  }
};

// Experiences
export const getExperiences = async (): Promise<Experience[]> => {
  try {
    const response = await api.get("user/experiences");
    return response.data.experiences || response.data.data || response.data || [];
  } catch (error: unknown) {
    return []; 
  }
};

export const addExperience = async (payload: Omit<Experience, "_id">): Promise<Experience> => {
  try {
    const response = await api.post("user/experiences", payload);
    const data = response.data.experience || response.data.experiences || response.data.data || response.data;
    return Array.isArray(data) ? data[0] : data;
  } catch (error) {
    throw handleError(error, "Failed to add experience");
  }
};

export const updateExperience = async (id: string, payload: Partial<Experience>): Promise<Experience> => {
  try {
    const response = await api.put(`user/experiences/${id}`, payload);
    return response.data.experience || response.data.data || response.data;
  } catch (error) {
    throw handleError(error, "Failed to update experience");
  }
};

export const deleteExperience = async (id: string): Promise<void> => {
  try {
    await api.delete(`user/experiences/${id}`);
  } catch (error) {
    throw handleError(error, "Failed to delete experience");
  }
};

// Projects
export const getProjects = async (): Promise<Project[]> => {
  try {
    const response = await api.get("user/projects");
    return response.data.projects || response.data.data || response.data || [];
  } catch (error: unknown) {
    return []; 
  }
};

export const addProject = async (project: Omit<Project, "_id">): Promise<Project> => {
  try {
    const response = await api.post("user/projects", project);
    const data = response.data.projects || response.data.project || response.data.data || response.data;
    return Array.isArray(data) ? data[0] : data;
  } catch (error) {
    throw handleError(error, "Failed to add project");
  }
};

export const updateProject = async (id: string, payload: Partial<Project>): Promise<Project> => {
  try {
    const response = await api.put(`user/projects/${id}`, payload);
    return response.data.project || response.data.data || response.data;
  } catch (error) {
    throw handleError(error, "Failed to update project");
  }
};

export const deleteProject = async (id: string): Promise<void> => {
  try {
    await api.delete(`user/projects/${id}`);
  } catch (error) {
    throw handleError(error, "Failed to delete project");
  }
};

// Skills
export const getSkills = async (): Promise<Skill[]> => {
  try {
    const response = await api.get("user/skills");
    return response.data.skills || response.data.data || response.data || [];
  } catch (error: unknown) {
    return []; 
  }
  };

export const addSkill = async (payload: Omit<Skill, "_id">): Promise<Skill> => {
  try {
    const response = await api.post("user/skills", payload);
    const data = response.data.skills || response.data.skill || response.data.data || response.data;
    return Array.isArray(data) ? data[0] : data;
  } catch (error) {
    throw handleError(error, "Failed to add skill");
  }
};

export const updateSkill = async (id: string, payload: Partial<Skill>): Promise<Skill> => {
  try {
    const response = await api.put(`user/skills/${id}`, payload);
    return response.data.skill || response.data.data || response.data;
  } catch (error) {
    throw handleError(error, "Failed to update skill");
  }
};

export const deleteSkill = async (id: string): Promise<void> => {
  try {
    await api.delete(`user/skills/${id}`);
  } catch (error) {
    throw handleError(error, "Failed to delete skill");
  }
};

export const getUserLinks = async (): Promise<UserLinks> => {
  try {
    const response = await api.get("user/links");
    // The backend returns an array under 'links' in GET, but an object in PATCH
    let data = response.data.links || response.data.data || response.data;
    
    if (Array.isArray(data) && data.length > 0) {
      data = data[0];
    }

    if (data && typeof data === 'object') {
      return {
        github: data.github || "",
        linkedin: data.linkedin || "",
        X: data.X || "",
        portfolio: data.portfolio || ""
      };
    }
    return { github: "", linkedin: "", X: "", portfolio: "" };
  } catch (error) {
    throw handleError(error, "Failed to fetch links");
  }
};

export const upsertUserLinks = async (payload: UserLinks): Promise<UserLinks> => {
  try {
    const response = await api.patch("user/links/upsert", payload);
    return response.data.links || response.data.data || response.data;
  } catch (error) {
    throw handleError(error, "Failed to update links");
  }
};

export const getUserProfile = async (id: string): Promise<UserProfileData> => {
  try {
    const timestamp = new Date().getTime();
    const response = await api.get(`users/${id}?t=${timestamp}`);
    const data = response.data.user || response.data.data || response.data;
    return Array.isArray(data) ? data[0] : data;
  } catch (error) {
    throw handleError(error, "Failed to fetch user profile");
  }
};

export const updateUserProfile = async (id: string, payload: Partial<UserProfileData>): Promise<UserProfileData> => {
  try {
    const response = await api.put(`users/${id}`, payload);
    const data = response.data.user || response.data.data || response.data;
    return Array.isArray(data) ? data[0] : data;
  } catch (error) {
    throw handleError(error, "Failed to update user profile");
  }
};



export default api;