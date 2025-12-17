import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const VerifyOTP = () => {
    const navigate = useNavigate()
    const [otp, setOtp] = useState(['', '', '', '', '', ''])

    const handleChange = (index: number, value: string) => {
        if (value.length <= 1 && /^\d*$/.test(value)) {
            const newOtp = [...otp]
            newOtp[index] = value
            setOtp(newOtp)

            // Auto-focus next input
            if (value && index < 5) {
                const nextInput = document.getElementById(`otp-${index + 1}`)
                nextInput?.focus()
            }
        }
    }

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            const prevInput = document.getElementById(`otp-${index - 1}`)
            prevInput?.focus()
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const otpCode = otp.join('')
        console.log('OTP verification:', otpCode)
        // TODO: Implement actual OTP verification logic
        navigate('/profile/edit')
    }

    const handleResend = () => {
        console.log('Resending OTP...')
        // TODO: Implement resend OTP logic
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
                        Verify Your Email
                    </h1>
                    <p className="text-neutral-400">We sent a code to your email address</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-neutral-400 mb-4 text-center">
                            Enter 6-digit code
                        </label>
                        <div className="flex gap-2 justify-center">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    id={`otp-${index}`}
                                    type="text"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    className="w-12 h-14 text-center text-2xl font-bold rounded-xl bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                                    required
                                />
                            ))}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] transform hover:scale-[1.02]"
                    >
                        Verify Email
                    </button>
                </form>

                <div className="mt-8 text-center text-sm text-neutral-500">
                    Didn't receive the code?{' '}
                    <button onClick={handleResend} className="text-blue-400 font-semibold hover:text-blue-300 transition-colors">
                        Resend
                    </button>
                </div>
            </div>
        </div>
    )
}

export default VerifyOTP
