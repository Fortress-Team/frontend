import { useState } from 'react'
import { Link } from 'react-router-dom'

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Password reset request:', email)
        // TODO: Implement actual password reset logic
        setIsSubmitted(true)
    }

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-6 text-white font-sans selection:bg-blue-500/30">
                <div className="max-w-md w-full bg-neutral-900 border border-neutral-800 rounded-3xl p-8 shadow-2xl">
                    <div className="text-center">
                        <Link to="/" className="text-2xl font-bold tracking-tighter flex items-center justify-center gap-2 mb-6">
                            <div className="w-3 h-3 bg-blue-600 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.5)]"></div>
                            SPOTLIGHT
                        </Link>
                        <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-white mb-2">
                            Check Your Email
                        </h1>
                        <p className="text-neutral-400 mb-8">
                            We've sent password reset instructions to <span className="text-white font-medium">{email}</span>
                        </p>
                        <Link to="/login" className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all">
                            Back to Login
                        </Link>
                    </div>
                </div>
            </div>
        )
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
                        Forgot Password?
                    </h1>
                    <p className="text-neutral-400">No worries, we'll send you reset instructions</p>
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

                    <button
                        type="submit"
                        className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] transform hover:scale-[1.02]"
                    >
                        Reset Password
                    </button>
                </form>

                <div className="mt-8 text-center text-sm text-neutral-500">
                    Remember your password?{' '}
                    <Link to="/login" className="text-blue-400 font-semibold hover:text-blue-300 transition-colors">
                        Back to Login
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword
