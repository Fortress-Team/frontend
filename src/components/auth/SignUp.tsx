import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { FcGoogle } from 'react-icons/fc'


const SignUp = () => {
    const navigate = useNavigate()
    const register = useAuthStore((state) => state.register)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
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
        } catch (error: any) {
            console.error("Registration Error Details:", error);
            setError(error.message || "Registration failed. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    const handleSocialLogin = (provider: string) => {
        // TODO: Implement social login when backend is ready
        alert(`${provider} login coming soon!`)
    }

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-6 font-sans">
            <div className="max-w-2xl w-full">
        
                <Link to="/" className="inline-block mb-12">
                    <div className="text-3xl font-bold text-blue-600 flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                        SpotLight
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

              
                <div className="space-y-3 mb-8">
                    <button
                        type="button"
                        onClick={() => handleSocialLogin('Google')}
                        className="w-full px-6 py-3 md:py-3.5 bg-white border-2 border-neutral-200 rounded-xl text-neutral-700 font-medium hover:border-neutral-300 hover:bg-neutral-50 transition-all flex items-center justify-center gap-3"
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
                            placeholder="John Doe"
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
                            placeholder="john@gmail.com"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-3 md:py-3.5 rounded-xl bg-white border-2 border-neutral-200 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-blue-500 transition-colors"
                            placeholder="Create a strong password"
                            required
                        />
                    </div>



                    {error && (
                        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
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
