# Team Fortress Frontend

A React + TypeScript frontend for the Team Fortress project, featuring profile management, skills, projects, experiences, and seamless integration with backend APIs.

📂 Folder Structure Overview
assets/             # Static assets such as images, icons, and SVGs
components/         # Reusable React components
├─ auth/            # Authentication-related components
├─ landing-page/    # Components for landing/explore pages
├─ profile/         # Profile management components
│  ├─ EditProfile.tsx
│  ├─ UserProfile.tsx
│  ├─ editEducation.tsx
│  ├─ editExperience.tsx
│  ├─ editInfo.tsx
│  ├─ editSkills.tsx
│  ├─ experience.tsx
│  ├─ project.tsx
│  ├─ mockEditProfile.tsx
│  ├─ mockProfile.tsx
│  └─ mocksEditProfile.tsx
├─ reuseable/       # Reusable smaller UI components (Loader, Header, Footer, etc.)
│  ├─ footer.tsx
│  ├─ header.tsx
│  └─ loader.tsx
├─ ui/              # UI components like buttons, cards, modals

lib/                # API calls, utilities, cloudinary config, motion utilities
├─ api.ts           # All API service calls
├─ cloudinary.ts    # Cloudinary upload helpers
├─ data.ts          # Static data
├─ index.ts         # Barrel export for lib
├─ motion.ts        # GSAP / motion utilities
├─ utils.ts         # Utility functions

store/              # Zustand or other state management stores
types/              # TypeScript type definitions

src/
├─ App.tsx          # Root React component
├─ main.tsx         # App entry point
├─ index.css        # Global styles
├─ App.css          # App-specific styles
├─ index.html       # HTML template

.env                # Environment variables
.gitignore          # Git ignore rules
package.json        # npm package configuration
pnpm-lock.yaml      # pnpm lock file (if using pnpm)
tsconfig.json       # TypeScript config
vite.config.ts      # Vite configuration
vercel.json         # Vercel deployment config

⚡  Features

Profile Management
Edit user information, skills, projects, experiences, and social links.

Dynamic Form Handling
Add, edit, and remove experiences, projects, skills, and education.

Image Uploads
Profile avatars and project images uploaded to Cloudinary.

State Management
Uses Zustand for global user and session state.

Loading & Error Handling
Reusable loader components and toast notifications for async operations.

🛠 Tech Stack

React 18 + TypeScript

Vite for fast build and dev server

Zustand for state management

TailwindCSS for styling

Lucide-React for icons

Cloudinary for image uploads

Axios for API calls

Sonner for toast notifications

🚀 Getting Started

Install dependencies

pnpm install
# or
npm install


Set environment variables in .env

VITE_API_URL=https://your-backend-url.com
VITE_CLOUDINARY_CLOUD_NAME=your-cloud-name
VITE_CLOUDINARY_API_KEY=your-api-key
VITE_CLOUDINARY_UPLOAD_PRESET=your-upload-preset


Run the development server

pnpm dev
# or
npm run dev


Build for production

pnpm build
# or
npm run build

🔧 Notes

Separate components by feature for better maintainability.

Each profile sub-component (EditExperience, EditSkills, etc.) manages its own state.

Use User and Project TypeScript types consistently to avoid type mismatches.