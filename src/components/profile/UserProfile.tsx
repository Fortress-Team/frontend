import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { useEffect, useState, useRef } from 'react'
import { ChevronDown, LogOut, Compass, GraduationCap, Github, Linkedin, Twitter, Globe } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    getEducations, getExperiences, getProjects, getSkills, getUserLinks, getUserProfile
} from '../../lib/api'
import type { Education, Experience, Project, Skill, UserLinks, UserProfileData } from '../../lib/api'
import type { User } from '../../types'
import Loader from '../reuseable/loader'
import { useUser } from '@clerk/clerk-react'

const UserProfile = () => {
    const navigate = useNavigate()


const { user: clerkUser } = useUser();


const { user, isAuthenticated, logout } = useAuthStore();



    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    const [experiences, setExperiences] = useState<Experience[]>([])
    const [educations, setEducations] = useState<Education[]>([])
    const [projects, setProjects] = useState<Project[]>([])
    const [skills, setSkills] = useState<Skill[]>([])
    const [links, setLinks] = useState<UserLinks>({})
    const [profile, setProfile] = useState<UserProfileData | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login')
        }
    }, [isAuthenticated, navigate])


    const currentUser = clerkUser || user;

    console.log("Clerk user:", clerkUser?.firstName);
console.log("Store user:", user?.email);
   console.log("Current user:", clerkUser?.firstName);
   console.log('Current user:', currentUser)


    


    useEffect(() => {
        const fetchData = async () => {
            if (!isAuthenticated) return
            try {
                const [expData, eduData, projData, skillData, linksData] = await Promise.all([
                    getExperiences(),
                    getEducations(),
                    getProjects(),
                    getSkills(),
                    getUserLinks()
                ])
                setExperiences(expData)
                setEducations(eduData)
                setProjects(projData)
                setSkills(skillData)
                setLinks(linksData)

                const userId = (user as User)?._id || user?._id || (user as User)?._id
                if (userId) {
                    const profileData = await getUserProfile(userId)
                    setProfile(profileData)
                }
            } catch (error) {
                console.error("Error fetching profile data:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [isAuthenticated, user])

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


    if (loading && isAuthenticated) {
        return (

            <>
                <Loader />
            </>
            // <div className="min-h-screen bg-white text-neutral-900 flex items-center justify-center">
            //     <div className="flex flex-col items-center gap-4">
            //         <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            //         <div className="text-neutral-400 font-medium animate-pulse">Loading Spotlight Profile...</div>
            //     </div>
            // </div>
        )
    }


    if (!user) {
        return null
    }

    return (
        <div className="min-h-screen bg-white text-neutral-900 font-sans pb-20">
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
                        <div className="h-40 w-40 rounded-full bg-white border-4 border-white shadow-xl overflow-hidden">
                            <div className="h-full w-full rounded-full bg-blue-100 flex items-center justify-center text-5xl border-2  border-blue-200">
                                {profile?.avatar ? (
                                    <img src={profile.avatar} alt={profile.fullName} className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-blue-600 font-bold">{user.fullName.charAt(0).toUpperCase()}</span>
                                )}
                            </div>
                        </div>
                        <div className="mb-4 md:mb-1 flex-1 text-center md:text-left">
                            <h1 className="text-4xl font-bold text-neutral-900 mb-1">{profile?.fullName || user.fullName}</h1>
                            {profile?.profRole && <p className="text-neutral-700 font-medium text-lg">{profile.profRole}</p>}
                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-3 gap-y-1">
                                <p className="text-neutral-500 text-sm">{profile?.email || user.email}</p>
                                {profile?.location && (
                                    <>
                                        <span className="text-neutral-300 hidden md:block">•</span>
                                        <p className="text-neutral-500 text-sm">{profile.location}</p>
                                    </>
                                )}
                                <span className="text-neutral-300 hidden md:block">•</span>
                                <p className="text-neutral-500 text-sm">Joined Dec 2025</p>
                            </div>
                        </div>
                        <div className="mb-6 flex gap-3">
                            <Link to="/profile/edit" className="px-5 py-2 md:px-6 md:py-2.5 text-sm md:text-base bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-600/30 block text-center">
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
                        <p className="text-neutral-600 leading-relaxed text-sm whitespace-pre-wrap">
                            {profile?.bio || (isAuthenticated && ((user as User)?._id === profile?.id || user?._id === profile?.id || (user as User)?._id === (profile as any)?.id) ? "No bio added yet. Tell us about yourself!" : "")}
                        </p>

                        <div className="mt-6 flex flex-wrap gap-4 text-neutral-400">
                            {links.github && (
                                <a href={links.github} target="_blank" rel="noopener noreferrer" title="GitHub" className="hover:text-blue-600 transition-colors p-2 rounded-lg bg-neutral-50 border border-neutral-200">
                                    <Github size={18} />
                                </a>
                            )}
                            {links.linkedin && (
                                <a href={links.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn" className="hover:text-blue-600 transition-all p-2 rounded-lg bg-neutral-50 border border-neutral-200">
                                    <Linkedin size={18} />
                                </a>
                            )}
                            {links.X && (
                                <a href={links.X} target="_blank" rel="noopener noreferrer" title="Twitter / X" className="hover:text-blue-600 transition-all p-2 rounded-lg bg-neutral-50 border border-neutral-200">
                                    <Twitter size={18} />
                                </a>
                            )}
                            {links.portfolio && (
                                <a href={links.portfolio} target="_blank" rel="noopener noreferrer" title="Portfolio" className="hover:text-blue-600 transition-all p-2 rounded-lg bg-neutral-50 border border-neutral-200">
                                    <Globe size={18} />
                                </a>
                            )}
                        </div>
                    </div>


                    <div className="p-6 rounded-2xl bg-white border-2 border-neutral-200 shadow-sm">
                        <h3 className="text-xl font-bold mb-4 text-neutral-900">Skills</h3>
                        <div className="flex flex-wrap gap-2">
                            {skills.length > 0 ? skills.map((skill) => (
                                <span key={skill._id} className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg text-xs font-medium text-blue-700 transition-colors cursor-default">
                                    {skill.title}
                                </span>
                            )) : (
                                <p className="text-sm text-neutral-400">No skills added yet.</p>
                            )}
                        </div>
                    </div>

                    <div className="p-6 rounded-2xl bg-white border-2 border-neutral-200 shadow-sm">
                        <h3 className="text-xl font-bold mb-4 text-neutral-900">Education</h3>
                        <div className="space-y-4">
                            {educations.length > 0 ? educations.map((edu) => (
                                <div key={edu._id} className="flex gap-4">
                                    <div className="h-10 w-10 shrink-0 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100">
                                        <GraduationCap size={20} />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-neutral-900">{edu.course}</h4>
                                        <p className="text-xs text-neutral-600 font-medium">{edu.school}</p>
                                        <p className="text-[10px] text-neutral-400 mt-0.5">{edu.date}</p>
                                    </div>
                                </div>
                            )) : (
                                <p className="text-sm text-neutral-400 italic">Education info not updated.</p>
                            )}
                        </div>
                    </div>
                </div>


                <div className="lg:col-span-2 space-y-8">

                    <div>
                        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-neutral-900">
                            Featured Projects
                            <span className="text-neutral-400 text-sm font-normal">({projects.length})</span>
                        </h3>
                        {projects.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {projects.map((proj) => (
                                    <div key={proj._id} className="group p-6 rounded-2xl bg-white border-2 border-neutral-200 hover:border-blue-300 transition-all hover:shadow-lg flex flex-col">
                                        {proj.projectImg && (
                                            <div className="h-40 w-full rounded-xl bg-neutral-100 mb-4 overflow-hidden border border-neutral-200">
                                                {proj.link ? (
                                                    <a href={proj.link} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                                                        <img src={proj.projectImg} alt={proj.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                                    </a>
                                                ) : (
                                                    <img src={proj.projectImg} alt={proj.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                                )}
                                            </div>
                                        )}
                                        {proj.link ? (
                                            <a href={proj.link} target="_blank" rel="noopener noreferrer" className="block group/link">
                                                <h4 className="text-lg font-bold mb-2 text-neutral-900 group-hover:text-blue-600 transition-colors inline-block relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 group-hover/link:after:w-full after:transition-all">
                                                    {proj.title}
                                                </h4>
                                            </a>
                                        ) : (
                                            <h4 className="text-lg font-bold mb-2 text-neutral-900 group-hover:text-blue-600 transition-colors">
                                                {proj.title}
                                            </h4>
                                        )}
                                        <div className="flex gap-2 mb-3 items-center">
                                            {proj.date && <span className="text-[10px] bg-neutral-100 text-neutral-500 px-2 py-0.5 rounded font-bold uppercase tracking-wider">{proj.date}</span>}
                                        </div>
                                        <p className="text-neutral-600 text-sm leading-relaxed mb-4 grow">
                                            {proj.desc}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-neutral-50 rounded-2xl border-2 border-dashed border-neutral-200 py-12 text-center text-neutral-400">
                                No projects featured yet.
                            </div>
                        )}
                    </div>


                    <div>
                        <h3 className="text-2xl font-bold mb-6 text-neutral-900">Experience</h3>
                        <div className="space-y-6">
                            {experiences.length > 0 ? experiences.map((exp) => (
                                <div key={exp._id} className="p-6 rounded-2xl bg-white border-2 border-neutral-200 hover:border-neutral-300 transition-colors shadow-sm relative group">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h3 className="font-bold text-lg text-neutral-900">{exp.position}</h3>
                                            <p className="font-medium text-neutral-700">{exp.title}</p>
                                        </div>
                                        <span className="text-sm font-medium text-neutral-500 bg-neutral-100 px-3 py-1 rounded-lg border border-neutral-200">
                                            {exp.date}
                                        </span>
                                    </div>
                                    <p className="text-neutral-600 text-sm leading-relaxed mt-2">
                                        {exp.desc}
                                    </p>
                                </div>
                            )) : (
                                <div className="bg-neutral-50 rounded-2xl border-2 border-dashed border-neutral-200 py-12 text-center text-neutral-400">
                                    No professional experience listed.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfile
