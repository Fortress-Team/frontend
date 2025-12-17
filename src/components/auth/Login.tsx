import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Login attempt:', { email, password })
        // TODO: Implement actual login logic
        // After successful login, redirect to profile
        navigate('/profile')
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
                        Welcome Back
                    </h1>
                    <p className="text-neutral-400">Sign in to continue to Spotlight</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-neutral-400 mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                            placeholder="you@example.com"
                            required
                        />
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label htmlFor="password" className="block text-sm font-medium text-neutral-400">
                                Password
                            </label>
                            <Link to="/forgot-password" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                                Forgot?
                            </Link>
                        </div>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] transform hover:scale-[1.02]"
                    >
                        Sign In
                    </button>
                </form>

                <div className="mt-8 text-center text-sm text-neutral-500">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-blue-400 font-semibold hover:text-blue-300 transition-colors">
                        Create an account
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Login
