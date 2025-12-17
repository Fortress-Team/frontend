import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { RegisterUser } from '../../libs/api'

const SignUp = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
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

 const handleSubmit = async (e :React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    try {
         await RegisterUser(formData)
         navigate('/verify-otp')
    } catch (error : any) {
       throw error.message  || "Something went Wrong"
    } finally {
        setLoading(false)
    }
 }


 if (loading) {
    return <div>Loading...</div>
 }

    return (
        <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-6 text-white font-sans selection:bg-blue-500/30">
            <div className="max-w-md w-full bg-neutral-900 border border-neutral-800 rounded-3xl p-8 shadow-2xl">
                <div className="text-center mb-8">
                    <Link to="/" className="text-2xl font-bold tracking-tighter flex items-center justify-center gap-2 mb-6">
                        <div className="w-3 h-3 bg-blue-600 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.5)]"></div>
                        SPOTLIGHT
                    </Link>
                    <h1 className="text-2xl font-bold text-white mb-2">
                        Join Spotlight
                    </h1>
                    <p className="text-neutral-400">Create your account in seconds</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-neutral-400 mb-2">
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.fullName}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                            placeholder="John Doe"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-neutral-400 mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                            placeholder="you@example.com"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-neutral-400 mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                            placeholder="Create a strong password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] transform hover:scale-[1.02] mt-2"
                    >
                        Create Account
                    </button>
                </form>

                <div className="mt-8 text-center text-sm text-neutral-500">
                    Already have an account?{' '}
                    <Link to="/login" className="text-blue-400 font-semibold hover:text-blue-300 transition-colors">
                        Sign In
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default SignUp
