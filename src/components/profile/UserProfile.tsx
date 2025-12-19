import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { useEffect, useState, useRef } from 'react'
import { ChevronDown, LogOut, Compass } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const UserProfile = () => {
    const navigate = useNavigate()
    const { user, isAuthenticated, logout } = useAuthStore()
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login')
        }
    }, [isAuthenticated, navigate])

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
        navigate('/')
    }


    if (!user && isAuthenticated) {
        return (
            <div className="min-h-screen bg-white text-neutral-900 flex items-center justify-center">
                <div className="text-neutral-400">Loading profile...</div>
            </div>
        )
    }


    if (!user) {
        return null
    }

    return (
        <div className="min-h-screen bg-white text-neutral-900 font-sans pb-20">
            {/* Navbar */}
            <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-sm border-b border-neutral-200">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link to="/" className="text-2xl font-bold flex items-center gap-2 text-blue-600">
                        <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                        SpotLight
                    </Link>

                    <div className="flex items-center gap-8">
                        <Link to="/explore" className="hidden md:block text-sm font-medium text-neutral-500 hover:text-blue-600 transition-colors">
                            Explore
                        </Link>

                        {/* Profile Dropdown */}
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
                                            to="/explore"
                                            onClick={() => setIsDropdownOpen(false)}
                                            className="flex items-center gap-3 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-blue-600 transition-colors md:hidden"
                                        >
                                            <Compass size={18} />
                                            Explore
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
                    </div>
                </div>
            </nav>

            {/* Header Profile Section */}
            <div className="pt-20">
                <div className="h-60 w-full bg-linear-to-br from-blue-50 to-white border-b border-neutral-200 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(37,99,235,0.1),transparent_50%)]"></div>
                </div>

                <div className="max-w-7xl mx-auto px-6 -mt-20 relative z-10">
                    <div className="flex flex-col md:flex-row gap-6 items-center md:items-end">
                        <div className="h-40 w-40 rounded-full bg-white border-4 border-white shadow-xl">
                            <div className="h-full w-full rounded-full bg-blue-100 flex items-center justify-center text-5xl overflow-hidden border-2 border-blue-200">
                                <span className="text-blue-600 font-bold">{user.fullName.charAt(0).toUpperCase()}</span>
                            </div>
                        </div>
                        <div className="mb-4 flex-1 text-center md:text-left">
                            <h1 className="text-4xl font-bold text-neutral-900 mb-1">{user.fullName}</h1>
                            <p className="text-neutral-700 font-medium text-lg">Developer</p>
                            <p className="text-neutral-500 text-sm">{user.email} • Joined Dec 2025</p>
                        </div>
                        <div className="mb-6 flex gap-3">
                            <button className="px-5 py-2 md:px-6 md:py-2.5 text-sm md:text-base bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-600/30">
                                Connect
                            </button>
                            <Link to="/profile/edit" className="px-5 py-2 md:px-6 md:py-2.5 text-sm md:text-base bg-white hover:bg-neutral-50 border-2 border-neutral-200 text-neutral-900 font-semibold rounded-xl transition-all block text-center">
                                Edit Profile
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">

                <div className="lg:col-span-1 space-y-8">

                    <div className="p-6 rounded-2xl bg-white border-2 border-neutral-200 shadow-sm">
                        <h3 className="text-xl font-bold mb-4 text-neutral-900">About</h3>
                        <p className="text-neutral-600 leading-relaxed text-sm">
                            Passionate developer with 5+ years of experience building scalable web applications. I love React, Tailwind CSS, and exploring new UI/UX trends. Always learning.
                        </p>

                        <div className="mt-6 flex flex-wrap gap-4 text-neutral-600">
                            <a href="#" className="hover:text-blue-600 transition-colors flex items-center gap-2 text-sm font-medium">
                                Github
                            </a>
                            <a href="#" className="hover:text-blue-600 transition-colors flex items-center gap-2 text-sm font-medium">
                                LinkedIn
                            </a>
                            <a href="#" className="hover:text-blue-600 transition-colors flex items-center gap-2 text-sm font-medium">
                                Twitter
                            </a>
                        </div>
                    </div>


                    <div className="p-6 rounded-2xl bg-white border-2 border-neutral-200 shadow-sm">
                        <h3 className="text-xl font-bold mb-4 text-neutral-900">Skills</h3>
                        <div className="flex flex-wrap gap-2">
                            {['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Next.js', 'PostgreSQL', 'Figma', 'GraphQL'].map((skill) => (
                                <span key={skill} className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg text-xs font-medium text-blue-700 transition-colors cursor-default">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>


                <div className="lg:col-span-2 space-y-8">

                    <div>
                        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-neutral-900">
                            Featured Projects
                            <span className="text-neutral-400 text-sm font-normal">(3)</span>
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            <div className="group p-5 rounded-2xl bg-white border-2 border-neutral-200 hover:border-blue-300 transition-all hover:shadow-lg">
                                <div className="h-40 w-full rounded-xl bg-neutral-100 mb-4 overflow-hidden relative border border-neutral-200">
                                    <div className="absolute bottom-3 left-3 px-3 py-1 bg-white rounded-lg text-xs font-medium border border-neutral-200 shadow-sm text-neutral-700">
                                        Open Source
                                    </div>
                                </div>
                                <h4 className="text-lg font-bold mb-2 text-neutral-900 group-hover:text-blue-600 transition-colors">E-Commerce Dashboard</h4>
                                <p className="text-neutral-600 text-sm mb-4 line-clamp-2">
                                    A fully functional admin dashboard with real-time analytics, inventory management.
                                </p>
                                <div className="flex items-center justify-between text-xs text-neutral-500">
                                    <div className="flex gap-3">
                                        <span className="flex items-center gap-1 font-medium text-neutral-700">⭐ 142</span>
                                        <span className="flex items-center gap-1 font-medium text-neutral-700">🔱 23</span>
                                    </div>
                                    <span>TypeScript • React</span>
                                </div>
                            </div>


                            <div className="group p-5 rounded-2xl bg-white border-2 border-neutral-200 hover:border-blue-300 transition-all hover:shadow-lg">
                                <div className="h-40 w-full rounded-xl bg-neutral-100 mb-4 overflow-hidden relative border border-neutral-200">
                                    <div className="absolute bottom-3 left-3 px-3 py-1 bg-white rounded-lg text-xs font-medium border border-neutral-200 shadow-sm text-neutral-700">
                                        SaaS
                                    </div>
                                </div>
                                <h4 className="text-lg font-bold mb-2 text-neutral-900 group-hover:text-blue-600 transition-colors">TaskMaster Pro</h4>
                                <p className="text-neutral-600 text-sm mb-4 line-clamp-2">
                                    Collaborative task management tool for remote teams with video integration.
                                </p>
                                <div className="flex items-center justify-between text-xs text-neutral-500">
                                    <div className="flex gap-3">
                                        <span className="flex items-center gap-1 font-medium text-neutral-700">⭐ 89</span>
                                        <span className="flex items-center gap-1 font-medium text-neutral-700">🔱 12</span>
                                    </div>
                                    <span>Next.js • Prisma</span>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div>
                        <h3 className="text-2xl font-bold mb-6 text-neutral-900">Experience</h3>
                        <div className="space-y-6">

                            <div className="p-6 rounded-2xl bg-white border-2 border-neutral-200 hover:border-neutral-300 transition-colors shadow-sm">
                                <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                                    <h4 className="text-lg font-bold text-neutral-900">Senior Frontend Engineer</h4>
                                    <span className="text-sm text-neutral-500 font-medium">2023 - Present</span>
                                </div>
                                <div className="text-neutral-700 text-sm font-medium mb-4">TechCorp Inc.</div>
                                <p className="text-neutral-600 text-sm leading-relaxed">
                                    Leading the frontend team in migrating legacy codebase to Next.js. Improved site performance by 40% and established a new design system.
                                </p>
                            </div>


                            <div className="p-6 rounded-2xl bg-white border-2 border-neutral-200 hover:border-neutral-300 transition-colors shadow-sm">
                                <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                                    <h4 className="text-lg font-bold text-neutral-900">Frontend Developer</h4>
                                    <span className="text-sm text-neutral-500 font-medium">2021 - 2023</span>
                                </div>
                                <div className="text-neutral-700 text-sm font-medium mb-4">Creative Agency</div>
                                <p className="text-neutral-600 text-sm leading-relaxed">
                                    Built responsive websites for high-profile clients. Collaborated closely with designers to implement pixel-perfect UIs with complex animations.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfile
