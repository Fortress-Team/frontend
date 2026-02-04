import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { FcGoogle } from 'react-icons/fc'
import { Eye, EyeOff } from 'lucide-react'
import { useAuth, useSignIn } from '@clerk/clerk-react'


const SignUp = () => {
    const navigate = useNavigate()
    const register = useAuthStore((state) => state.register)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [showPass, setShowPass] = useState(false)
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()


        setError('')
        setLoading(true)
        try {
            await register(formData.fullName, formData.email, formData.password)
            navigate('/verify-otp')
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : "Registration failed. Please try again."
            setError(errorMessage)
        } finally {
            setLoading(false)
        }
    }

    // const handleSocialLogin = (provider: string) => {
    //     alert(`${provider} login coming soon!`)
    // }


const { signIn, isLoaded } = useSignIn();
const {isSignedIn} = useAuth()

const signUpWithGoogle = async () => {
  console.log("Clicked");

  if (!isLoaded || !signIn) return;

   if (isSignedIn) {
      navigate("/profile");
      return;
    }

  await signIn.authenticateWithRedirect({
    strategy: "oauth_google",
    redirectUrl: "/sso-callback",
    redirectUrlComplete: "/profile",
  });
};
  
    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-6 font-sans">
            <div className="max-w-2xl w-full">

                <Link to="/" className="inline-block mb-12">
                    <div className="text-3xl font-bold text-blue-600 flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                        SPOTLIGHT
                    </div>
                </Link>


                <div className="text-center mb-8 md:mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-3">
                        Create your account
                    </h1>
                    <p className="text-neutral-600 text-base md:text-lg">
                        Join thousands of professionals getting discovered
                    </p>
                </div>

<div id="clerk-captcha"></div>
                <div 
                 className="space-y-3 mb-8">
                    <button
                        type="button"
                        onClick={signUpWithGoogle}
                        className="w-full px-6 py-3 md:py-3.5 bg-white border-2 cursor-pointer
                         border-neutral-200 rounded-xl text-neutral-700 font-medium hover:border-neutral-300 hover:bg-neutral-50 transition-all flex items-center justify-center gap-3"
                    >
                        <FcGoogle className="w-5 h-5" />
                        Continue with Google
                    </button>


                </div>


                <div className="relative mb-8">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-neutral-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-white text-neutral-500">Or sign up with email</span>
                    </div>
                </div>


                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
                    <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-neutral-700 mb-2">
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            className="w-full px-4 py-3 md:py-3.5 rounded-xl bg-white border-2 border-neutral-200 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-blue-500 transition-colors"
                            placeholder="Enter your full name"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 md:py-3.5 rounded-xl bg-white border-2 border-neutral-200 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-blue-500 transition-colors"
                            placeholder="Enter your email address"
                            required
                        />
                    </div>

                    {/* Password */}

                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label htmlFor="password" className="block text-sm font-medium text-neutral-700">
                                Password
                            </label>
                            <Link
                                to="/forgot-password"
                                className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors hidden"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        {/* Input wrapper */}
                        <div className="relative">
                            <input
                                type={showPass ? "text" : "password"}
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-4 py-3.5 pr-12 rounded-xl bg-white border-2 border-neutral-200 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-blue-500 transition-colors"
                                placeholder="Enter your password"
                                required
                            />

                            {/* Eye toggle */}
                            <button
                                type="button"
                                onClick={() => setShowPass(!showPass)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-700 transition-colors"
                            >
                                {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>




                    {error && (
                        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm font-medium">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 md:py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-600/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none mt-6"
                    >
                        {loading ? 'Creating Account...' : 'Sign up'}
                    </button>
                </form>


                <div className="mt-8 text-center text-sm text-neutral-600">
                    Already have an account?{' '}
                    <Link to="/login" className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
                        Sign in
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default SignUp
