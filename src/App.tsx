import { Routes, Route } from 'react-router-dom'

import { lazy, Suspense } from 'react'
import Loader from './components/reuseable/loader'


const LandingPage = lazy(() => import('./components/LandingPage'))
const Login = lazy(() => import('./components/auth/Login'))
const SignUp = lazy(() => import('./components/auth/SignUp'))
const VerifyOTP = lazy(() => import('./components/auth/VerifyOTP'))
const ForgotPassword = lazy(() => import('./components/auth/ForgotPassword'))
const ResetPassword = lazy(() => import('./components/auth/ResetPassword'))
const UserProfile = lazy(() => import('./components/profile/UserProfile'))
const EditProfile = lazy(() => import('./components/profile/EditProfile'))
const ExploreTalents = lazy(() => import('./components/explore/ExploreTalents'))

function App() {
  return (
    <Suspense fallback={<Loader />}>

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/explore" element={<ExploreTalents />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/profile/edit" element={<EditProfile />} />
      </Routes>

    </Suspense>

  )
}

export default App
