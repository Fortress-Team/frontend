import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, ArrowRight, Star, MapPin, Briefcase, X, Menu } from 'lucide-react'

// Mock talent data
const TALENTS = [
    {
        id: '1',
        fullName: 'Adewale Ramadan',
        role: 'Junior Frontend Developer',
        location: 'Lagos, Nigeria',
        skills: ['React', 'TypeScript', 'Tailwind', 'Next.js'],
        about: 'Building pixel-perfect user interfaces with a focus on performance and accessibility.',
        avatar: 'AR',
        featured: true,
        stars: 124
    },
    {
        id: '2',
        fullName: 'Sarah Chen',
        role: 'UX Designer',
        location: 'San Francisco, CA',
        skills: ['Figma', 'User Research', 'Prototyping', 'Design Systems'],
        about: 'Passionate about creating intuitive digital experiences that solve real human problems.',
        avatar: 'SC',
        featured: false,
        stars: 89
    },
    {
        id: '3',
        fullName: 'Marcus Rodriguez',
        role: 'Full-Stack Developer',
        location: 'Madrid, Spain',
        skills: ['Node.js', 'PostgreSQL', 'React', 'AWS'],
        about: 'Specialized in building scalable backend systems and high-performance web applications.',
        avatar: 'MR',
        featured: true,
        stars: 210
    },
    {
        id: '4',
        fullName: 'Teitei Wisdom',
        role: 'Backend Engineer',
        location: 'Accra, Ghana',
        skills: ['Python', 'Django', 'Redis', 'Docker'],
        about: 'Optimizing database performance and architecting secure API infrastructures.',
        avatar: 'TW',
        featured: false,
        stars: 156
    },
    {
        id: '5',
        fullName: 'Big Anny',
        role: 'Content Designer',
        location: 'London, UK',
        skills: ['Copywriting', 'SEO', 'Brand Strategy', 'Product Marketing'],
        about: 'Crafting compelling narratives that help brands connect with their audience effectively.',
        avatar: 'BA',
        featured: false,
        stars: 92
    },
    {
        id: '6',
        fullName: 'Florence May',
        role: 'Product Manager',
        location: 'Berlin, Germany',
        skills: ['Agile', 'Roadmapping', 'User Feedback', 'Analytics'],
        about: 'Bridging the gap between business goals and technical execution to deliver value.',
        avatar: 'FM',
        featured: true,
        stars: 178
    }
]

const ALL_SKILLS = Array.from(new Set(TALENTS.flatMap(t => t.skills))).sort()

const ExploreTalents = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedSkills, setSelectedSkills] = useState<string[]>([])
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const filteredTalents = useMemo(() => {
        return TALENTS.filter(talent => {
            const matchesSearch = talent.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                talent.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                talent.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))

            const matchesSkills = selectedSkills.length === 0 ||
                selectedSkills.every(s => talent.skills.includes(s))

            return matchesSearch && matchesSkills
        })
    }, [searchQuery, selectedSkills])

    const toggleSkill = (skill: string) => {
        setSelectedSkills(prev =>
            prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
        )
    }

    return (
        <div className="min-h-screen bg-white text-neutral-900 font-sans">
            {/* Navbar */}
            <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-sm border-b border-neutral-200">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link to="/" className="text-2xl font-bold flex items-center gap-2 text-blue-600">
                        <div className="w-3 h-3 bg-blue-600 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.4)]"></div>
                        SPOTLIGHT
                    </Link>

                    <div className="hidden md:flex gap-8 items-center text-sm font-medium">
                        <Link to="/" className="text-neutral-500 hover:text-neutral-900 transition-colors">Home</Link>
                        <Link to="/explore" className="text-blue-600">Explore</Link>
                        <Link to="/profile" className="text-neutral-500 hover:text-neutral-900 transition-colors">Profile</Link>
                        <Link to="/login" className="px-5 py-2.5 bg-neutral-900 text-white rounded-xl hover:bg-neutral-800 transition-colors">Log In</Link>
                    </div>

                    <button onClick={() => setIsMenuOpen(true)} className="md:hidden p-2 text-neutral-900">
                        <Menu size={24} />
                    </button>
                </div>
            </nav>

            {/* Mobile Nav Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        className="fixed inset-0 bg-white z-60 flex flex-col md:hidden"
                    >
                        <div className="flex items-center justify-between px-6 py-6 border-b border-neutral-100">
                            <span className="text-2xl font-bold text-blue-600">SPOTLIGHT</span>
                            <button onClick={() => setIsMenuOpen(false)} className="p-2 text-neutral-900">
                                <X size={24} />
                            </button>
                        </div>
                        <div className="flex flex-col gap-8 p-12 text-2xl font-bold">
                            <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
                            <Link to="/explore" onClick={() => setIsMenuOpen(false)} className="text-blue-600">Explore</Link>
                            <Link to="/profile" onClick={() => setIsMenuOpen(false)}>Profile</Link>
                            <Link to="/login" onClick={() => setIsMenuOpen(false)}>Log In</Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <main className="pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Header Section */}
                    <div className="mb-12">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-6xl font-bold mb-4 tracking-tight"
                        >
                            Explore <span className="text-blue-600">Talent</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-lg text-neutral-500 max-w-2xl"
                        >
                            Connect with the world's most creative and talented professionals. Find your next collaborator or hire.
                        </motion.p>
                    </div>

                    {/* Search and Filter Bar */}
                    <div className="flex flex-col lg:flex-row gap-6 mb-12">
                        <div className="relative flex-1 group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                            <input
                                type="text"
                                placeholder="Search by name, role, or skill..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 bg-white border-2 border-neutral-200 rounded-2xl focus:border-blue-600 outline-none transition-all shadow-sm focus:shadow-blue-600/10 placeholder:text-neutral-400"
                            />
                        </div>
                        <div className="flex gap-4 overflow-x-auto pb-2 -mx-2 px-2 lg:mx-0 lg:px-0 lg:overflow-visible no-scrollbar">
                            <div className="flex items-center gap-2 px-4 py-4 bg-neutral-50 border-2 border-neutral-200 rounded-2xl text-sm font-bold whitespace-nowrap">
                                <Filter size={18} className="text-neutral-500" />
                                <span>Filter</span>
                            </div>
                            <div className="flex gap-2">
                                {ALL_SKILLS.slice(0, 5).map(skill => (
                                    <button
                                        key={skill}
                                        onClick={() => toggleSkill(skill)}
                                        className={`px-4 py-4 rounded-2xl border-2 text-sm font-bold transition-all whitespace-nowrap ${selectedSkills.includes(skill)
                                            ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/30'
                                            : 'bg-white border-neutral-200 text-neutral-600 hover:border-neutral-300'
                                            }`}
                                    >
                                        {skill}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between mb-8 pb-4 border-b border-neutral-100">
                        <p className="text-sm font-medium text-neutral-500">
                            Showing <span className="text-neutral-900">{filteredTalents.length}</span> results
                        </p>
                    </div>

                    {/* Talent Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredTalents.map((talent, index) => (
                            <motion.div
                                key={talent.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="group bg-white border-2 border-neutral-200 rounded-3xl p-6 hover:border-blue-300 transition-all hover:shadow-xl hover:shadow-blue-600/5 relative overflow-hidden"
                            >
                                {talent.featured && (
                                    <div className="absolute top-0 right-0 p-4">
                                        <div className="bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-tighter">
                                            Featured
                                        </div>
                                    </div>
                                )}

                                <div className="flex items-start gap-4 mb-6">
                                    <div className="h-20 w-20 rounded-2xl bg-blue-100 border-2 border-blue-200 flex items-center justify-center text-2xl font-bold text-blue-600 shadow-inner group-hover:scale-110 transition-transform">
                                        {talent.avatar}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-neutral-900 mb-1 group-hover:text-blue-600 transition-colors">{talent.fullName}</h3>
                                        <p className="text-blue-600 text-sm font-semibold">{talent.role}</p>
                                    </div>
                                </div>

                                <div className="space-y-4 mb-8">
                                    <div className="flex items-center gap-2 text-neutral-500 text-xs">
                                        <MapPin size={14} />
                                        {talent.location}
                                    </div>
                                    <p className="text-sm text-neutral-600 line-clamp-2 leading-relaxed">
                                        {talent.about}
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-2 mb-8">
                                    {talent.skills.map(skill => (
                                        <span key={skill} className="px-3 py-1 bg-neutral-50 border border-neutral-200 rounded-lg text-[10px] font-bold text-neutral-500 transition-colors group-hover:bg-blue-50 group-hover:border-blue-100 group-hover:text-blue-700">
                                            {skill}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex items-center justify-between pt-6 border-t border-neutral-100">
                                    <div className="flex gap-3">
                                        <div className="flex items-center gap-1 text-xs font-bold text-neutral-400">
                                            <Star size={14} className="text-yellow-400 fill-yellow-400" />
                                            <span className="text-neutral-900">{talent.stars}</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-xs font-bold text-neutral-400">
                                            <Briefcase size={14} />
                                            <span className="text-neutral-900">12 Projects</span>
                                        </div>
                                    </div>
                                    <Link
                                        to={`/profile`}
                                        className="flex items-center gap-1 text-sm font-bold text-blue-600 hover:gap-2 transition-all"
                                    >
                                        Profile <ArrowRight size={16} />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {filteredTalents.length === 0 && (
                        <div className="text-center py-20 bg-neutral-50 rounded-3xl border-2 border-dashed border-neutral-200">
                            <div className="text-neutral-400 mb-4">No talents found matching your criteria.</div>
                            <button
                                onClick={() => { setSearchQuery(''); setSelectedSkills([]) }}
                                className="text-blue-600 font-bold hover:underline"
                            >
                                Clear all filters
                            </button>
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}

export default ExploreTalents
