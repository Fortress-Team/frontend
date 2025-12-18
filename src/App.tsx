import { Routes, Route } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import Login from './components/auth/Login'
import SignUp from './components/auth/SignUp'
import VerifyOTP from './components/auth/VerifyOTP'
import ForgotPassword from './components/auth/ForgotPassword'
import ResetPassword from './components/auth/ResetPassword'
import UserProfile from './components/profile/UserProfile'
import EditProfile from './components/profile/EditProfile'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/verify-otp" element={<VerifyOTP />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/profile/edit" element={<EditProfile />} />
    </Routes>
  )
}

export default App
