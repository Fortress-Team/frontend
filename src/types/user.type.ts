// src/types/user.type.ts

import type { Experience } from "./experience.type"
import type { Project } from "./project.type"
import type { Skill } from "./skill.type"



export type UserRole = "Talent" | "Recruiter"

export interface UserLinks {
  github?: string
  linkedIn?: string
  x?: string
  portfolio?: string
}

export interface User {
  _id: string
  fullName: string
  email: string;
  isVerified: boolean,
  location: string,
  avatar: string,
  profRole: string,
  bio?: string
  role: UserRole
  lastLogin?: string

  links?: UserLinks[]

  skills?: Skill[] | string[]      
  projects?: Project[] | string[]
  experiences?: Experience[] | string[]

  createdAt?: string
  updatedAt?: string
}
