import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { ResendOTP } from '../../lib/api'
import { RotateCcw, Timer } from 'lucide-react'
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "../ui/input-otp"

const VerifyOTP = () => {
    const navigate = useNavigate()
    const verifyOTP = useAuthStore((state) => state.verifyOTP)
    const user = useAuthStore((state) => state.user)
    const [otp, setOtp] = useState("")
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [resendTimer, setResendTimer] = useState(300)
    const [canResend, setCanResend] = useState(false)

    useEffect(() => {
        if (resendTimer > 0) {
            const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000)
            return () => clearTimeout(timer)
        } else {
            setCanResend(true)
        }
    }, [resendTimer])


    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (otp.length !== 6) {
            setError('Please enter all 6 digits')
            return
        }

        setError('')
        setLoading(true)
        try {
            await verifyOTP(otp)
            navigate('/profile/edit')
        } catch (error: any) {
            setError(error.message || "OTP verification failed. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    const handleResend = async () => {
        if (!canResend) return

        setError('')
        try {
            // Get email from user state or localStorage
            const email = user?.email || localStorage.getItem('pendingEmail')
            if (!email) {
                setError('Email not found. Please sign up again.')
                return
            }

            await ResendOTP(email)
            setResendTimer(300)
            setCanResend(false)
            setOtp("")
        } catch (error: any) {
            setError(error.message || 'Failed to resend code. Please try again.')
        }
    }

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-6 font-sans">
            <div className="max-w-xl w-full">

                <Link to="/" className="inline-block mb-12">
                    <div className="text-3xl font-bold text-blue-600 flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                        SpotLight
                    </div>
                </Link>


                <div className="bg-white border-2 border-neutral-200 rounded-3xl p-6 md:p-12 shadow-sm">

                    <div className="text-center mb-8 md:mb-10">
                        <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-3">
                            Verify your email
                        </h1>
                        <p className="text-neutral-600">
                            Enter the six digit code sent to your mail
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8 flex flex-col items-center">

                        <InputOTP
                            maxLength={6}
                            value={otp}
                            onChange={(value) => setOtp(value)}
                        >
                            <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                            </InputOTPGroup>
                        </InputOTP>

                        {error && (
                            <div className="w-full p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm text-center">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading || otp.length !== 6}
                            className="w-full py-3 md:py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-600/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                        >
                            {loading ? 'Verifying...' : 'Verify Email'}
                        </button>


                        <div className="text-center">
                            {canResend ? (
                                <button
                                    type="button"
                                    onClick={handleResend}
                                    className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors inline-flex items-center gap-2"
                                >
                                    <RotateCcw className="w-4 h-4" />
                                    Resend Code
                                </button>
                            ) : (
                                <p className="text-sm text-neutral-500 inline-flex items-center gap-2">
                                    <Timer className="w-4 h-4 text-blue-600" />
                                    Resend Code in <span className="text-blue-600 font-semibold">{formatTime(resendTimer)}</span>
                                </p>
                            )}
                        </div>
                    </form>
                </div>


                <div className="mt-8 text-center text-sm text-neutral-600">
                    <Link to="/login" className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
                        ← Back to Sign In
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default VerifyOTP
