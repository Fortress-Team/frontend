import { useState, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { ResetPassword as ResetPasswordApi } from '../../lib/api'
import { Check } from 'lucide-react'

const ResetPassword = () => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const token = searchParams.get('token')

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!token) {
            setError('Invalid or missing reset token.')
        }
    }, [token])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!token) {
            setError('Invalid reset token.')
            return
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match')
            return
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters')
            return
        }

        setError('')
        setLoading(true)

        try {
            await ResetPasswordApi({ token, newPassword: password })
            setSuccess(true)
            setTimeout(() => {
                navigate('/login')
            }, 3000)
        } catch (error: any) {
            setError(error.message || "Failed to reset password. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    if (success) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center p-6 font-sans">
                <div className="max-w-md w-full bg-white border-2 border-neutral-200 rounded-3xl p-8 shadow-sm">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-200">
                            <Check className="w-8 h-8 text-green-600" />
                        </div>
                        <h1 className="text-2xl font-bold text-neutral-900 mb-2">
                            Password Reset!
                        </h1>
                        <p className="text-neutral-600 mb-8">
                            Your password has been successfully reset. You will be redirected to login shortly.
                        </p>
                        <Link to="/login" className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-600/30">
                            Login Now
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-6 font-sans">
            <div className="max-w-md w-full bg-white border-2 border-neutral-200 rounded-3xl p-6 md:p-8 shadow-sm">
                <div className="text-center mb-6 md:mb-8">
                    <Link to="/" className="text-2xl font-bold tracking-tighter flex items-center justify-center gap-2 mb-6 text-blue-600">
                        <div className="w-3 h-3 bg-blue-600 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.5)]"></div>
                        SPOTLIGHT
                    </Link>
                    <h1 className="text-2xl font-bold text-neutral-900 mb-2">
                        Reset Password
                    </h1>
                    <p className="text-neutral-600">Enter a new secure password</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-2">
                            New Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-white border-2 border-neutral-200 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-blue-500 transition-colors"
                            placeholder="Enter new password"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-neutral-700 mb-2">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-white border-2 border-neutral-200 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-blue-500 transition-colors"
                            placeholder="Confirm new password"
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
                        disabled={loading || !token}
                        className="w-full py-3 md:py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-600/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                    >
                        {loading ? 'Resetting...' : 'Set New Password'}
                    </button>
                </form>

                <div className="mt-8 text-center text-sm text-neutral-600">
                    <Link to="/login" className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
                        Back to Login
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword
