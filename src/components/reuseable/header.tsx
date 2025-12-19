import { useState, useRef, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, X, ChevronDown, User, LogOut } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'

const Header = () => {
    const navigate = useNavigate()
    const { user, isAuthenticated, logout } = useAuthStore()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleLogout = () => {
        logout()
        setIsDropdownOpen(false)
        navigate('/')
    }

    return (
        <section>
            {/* Navbar */}
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="fixed w-full z-50 bg-white/90 backdrop-blur-sm border-b border-neutral-200 "
            >
                <div className="max-w-8xl mx-auto px-6 py-4 md:py-6 flex items-center justify-between">

                    <Link to="/" className="text-2xl font-bold tracking-tighter flex items-center gap-2 text-blue-600 z-50 relative">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="w-3 h-3 bg-blue-600 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.5)]"
                        ></motion.div>
                        SPOTLIGHT
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex gap-8 items-center">
                        <Link to="/explore" className="text-sm font-medium text-neutral-600 hover:text-blue-600 transition-colors">
                            Explore
                        </Link>

                        {isAuthenticated && user ? (
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="flex items-center gap-2 p-1.5 hover:bg-neutral-50 rounded-xl transition-colors group"
                                >
                                    <div className="h-9 w-9 rounded-full bg-blue-600 border-2 border-blue-100 flex items-center justify-center text-sm font-bold text-white shadow-sm">
                                        {user.fullName.charAt(0).toUpperCase()}
                                    </div>
                                    <ChevronDown
                                        size={18}
                                        className={`text-neutral-400 group-hover:text-neutral-600 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                                    />
                                </button>

                                <AnimatePresence>
                                    {isDropdownOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            transition={{ duration: 0.15, ease: "easeOut" }}
                                            className="absolute right-0 mt-2 w-56 bg-white border border-neutral-200 rounded-2xl shadow-xl py-2 z-50"
                                        >
                                            <div className="px-4 py-3 border-b border-neutral-100 mb-2">
                                                <p className="text-sm font-bold text-neutral-900 truncate">{user.fullName}</p>
                                                <p className="text-xs text-neutral-500 truncate">{user.email}</p>
                                            </div>

                                            <Link
                                                to="/profile"
                                                onClick={() => setIsDropdownOpen(false)}
                                                className="flex items-center gap-3 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-blue-600 transition-colors"
                                            >
                                                <User size={18} />
                                                View Profile
                                            </Link>

                                            <button
                                                onClick={handleLogout}
                                                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors mt-2 border-t border-neutral-100 pt-3"
                                            >
                                                <LogOut size={18} />
                                                Logout
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <>
                                <Link to="/login" className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">
                                    Log In
                                </Link>
                                <Link to="/signup" className="px-6 py-2 bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors rounded-lg">
                                    Get Started
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden z-50 p-2 text-neutral-900"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>

                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-0 bg-white z-100 flex flex-col md:hidden"
                    >
                        <div className="flex items-center justify-between px-6 py-6 border-b border-neutral-100">
                            <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-2xl font-bold tracking-tighter flex items-center gap-2 text-blue-600">
                                <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                                SPOTLIGHT
                            </Link>
                            <button onClick={() => setIsMenuOpen(false)} className="p-2 text-neutral-900">
                                <X size={24} />
                            </button>
                        </div>
                        <div className="flex flex-col gap-8 p-12 text-2xl font-bold">
                            <Link
                                to="/explore"
                                onClick={() => setIsMenuOpen(false)}
                                className="text-neutral-900 hover:text-blue-600 transition-colors"
                            >
                                Explore
                            </Link>

                            {isAuthenticated && user ? (
                                <>
                                    <Link
                                        to="/profile"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="text-neutral-900 hover:text-blue-600 transition-colors"
                                    >
                                        My Profile
                                    </Link>
                                    <button
                                        onClick={() => {
                                            handleLogout()
                                            setIsMenuOpen(false)
                                        }}
                                        className="text-left text-red-600 hover:text-red-700 transition-colors"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to="/login"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="text-neutral-900 hover:text-blue-600 transition-colors"
                                    >
                                        Log In
                                    </Link>
                                    <Link
                                        to="/signup"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="text-neutral-900 hover:text-blue-600 transition-colors"
                                    >
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}

export default Header
