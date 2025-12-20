import { useState, useMemo, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, X, Menu, Compass, ChevronDown, LogOut } from 'lucide-react'
import { useTalentStore } from '../../../store/talentStore'
import Pagination from './pagination'
import Card from './card'
import type { Project } from '../../../types'
import type { Skill } from '../../../types/skill.type'
import { useAuthStore } from '../../../store/authStore'

// Mock talent data


const ExploreTalents = () => {


    const {talents, fetchAllTalents, totalPage,loading, searchTalents} = useTalentStore()
 const { user, logout } = useAuthStore()
    const navigate = useNavigate()
  const [page,setPage] = useState<number>(1)
   const totalPages = totalPage ?? 1
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedSkills, setSelectedSkills] = useState<string[]>([])
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
        const dropdownRef = useRef<HTMLDivElement>(null)

    const ALL_SKILLS = Array.from(new Set(talents.flatMap(t => t.skills?.filter((s): s is string => typeof s === 'string') ?? []))).sort()

 useEffect(() => {
  fetchAllTalents(page, 5)
}, [page])

const getInitials = (name: string) =>
  name
    ?.split(" ")
    .map(n => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()



    // console.log('All talents:', talents)

    const filteredTalents = useMemo(() => {
        return talents.filter(talent => {
            const matchesSearch = talent.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                talent.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (talent.skills?.some(s => typeof s === 'string' && s.toLowerCase().includes(searchQuery.toLowerCase())) ?? false)

            const matchesSkills = selectedSkills.length === 0 ||
                (talent.skills?.every(s => typeof s === 'string' && selectedSkills.includes(s)) ?? false)

            return matchesSearch && matchesSkills
        })
    }, [searchQuery, selectedSkills, talents])

    const toggleSkill = (skill: string) => {
        setSelectedSkills(prev =>
            prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
        )
    }



 const handleSearch = async () => {
  if (!searchQuery.trim()) return; // do nothing if empty

  // Call the Zustand action
  await searchTalents(searchQuery);

  // Optionally update the URL
  navigate(`/explore/${encodeURIComponent(searchQuery)}`);
};

useEffect(() => {
  const delayDebounce = setTimeout(() => {
    if (searchQuery.trim()) searchTalents(searchQuery);
  }, 300); // debounce 300ms

  return () => clearTimeout(delayDebounce);
}, [searchQuery]);


const handleLogout = () => {
        logout()
        navigate('/')
    }

    //     useEffect(() => {
    //     if (!isAuthenticated) {
    //         navigate('/login')
    //     }
    // }, [isAuthenticated, navigate])

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
                    
          { !user ?            <Link to="/login" className="px-5 py-2.5 bg-neutral-900 text-white rounded-xl hover:bg-neutral-800 transition-colors">Log In</Link>
:
     <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="flex items-center gap-2 p-1.5 hover:bg-neutral-50 rounded-xl transition-colors group"
                            >
                                <div className="h-9 w-9 rounded-full bg-blue-600 border-2 border-blue-100 flex items-center justify-center text-sm font-bold text-white shadow-sm">
                                    {user && user.fullName.charAt(0).toUpperCase()}
                                </div>
                                <ChevronDown
                                    size={18}
                                    className={`text-neutral-400 group-hover:text-neutral-600 
                                      transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
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
                                            <p className="text-sm font-bold text-neutral-900 truncate">{user?.fullName ?? ''}</p>
                                            <p className="text-xs text-neutral-500 truncate">{user?.email ?? ''}</p>
                                        </div>


                                        <Link
                                            to="/explore"
                                            onClick={() => setIsDropdownOpen(false)}
                                            className="flex items-center gap-3 px-4 py-2 
                                            text-sm text-neutral-700 hover:bg-neutral-50
                                             hover:text-blue-600 transition-colors md:hidden"
                                        >
                                            <Compass size={18} />
                                            Explore
                                        </Link>


                                           <Link
                                            to="/profile"
                                            onClick={() => setIsDropdownOpen(false)}
                                            className="flex items-center gap-3 px-4 py-2 
                                            text-sm text-neutral-700 hover:bg-neutral-50
                                             hover:text-blue-600 transition-colors "
                                        >
                                            <Compass size={18} />
                                            Profile
                                        </Link>

                                            {/* <Link to="/profile" className="text-neutral-500 hover:text-neutral-900 transition-colors">Profile</Link> */}

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

                        }
                        
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

                    <form
  onSubmit={(e) => {
    e.preventDefault(); // prevent page reload
    handleSearch();      // call your search function
  }}
  className="flex flex-col lg:flex-row gap-6 mb-12"
>
  <div className="relative flex-1 group">
    <Search
      className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-blue-600 transition-colors"
      size={20}
    />
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
      {ALL_SKILLS.slice(0, 5).map((skill) => (
        <button
          type="button" // important so it doesn't submit the form
          key={skill}
          onClick={() => toggleSkill(skill)}
          className={`px-4 py-4 rounded-2xl border-2 text-sm font-bold transition-all whitespace-nowrap ${
            selectedSkills.includes(skill)
              ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/30'
              : 'bg-white border-neutral-200 text-neutral-600 hover:border-neutral-300'
          }`}
        >
          {skill}
        </button>
      ))}
    </div>
  </div>
</form>


                    {/* Stats */}
                    <div className="flex items-center justify-between mb-8 pb-4 border-b border-neutral-100">
                        <p className="text-sm font-medium text-neutral-500">
                            Showing <span className="text-neutral-900">{filteredTalents.length}</span> results
                        </p>
                    </div>

                    
               {/* Talent Grid */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

  {/* LOADING SKELETON  STATE */}
  {loading &&
    Array.from({ length: 3 }).map((_, index) => (
      <div
        key={index}
        className="bg-white border-2 border-neutral-200 rounded-3xl p-6 animate-pulse"
      >
        <div className="flex items-start gap-4 mb-6">
          <div className="h-20 w-20 rounded-2xl bg-neutral-200" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-neutral-200 rounded w-3/4" />
            <div className="h-3 bg-neutral-200 rounded w-1/2" />
          </div>
        </div>

        <div className="space-y-3 mb-8">
          <div className="h-3 bg-neutral-200 rounded w-1/2" />
          <div className="h-3 bg-neutral-200 rounded w-full" />
          <div className="h-3 bg-neutral-200 rounded w-5/6" />
        </div>

        <div className="flex gap-2 mb-8">
          <div className="h-6 w-16 bg-neutral-200 rounded-lg" />
          <div className="h-6 w-16 bg-neutral-200 rounded-lg" />
          <div className="h-6 w-16 bg-neutral-200 rounded-lg" />
        </div>

        <div className="flex justify-between pt-6 border-t border-neutral-100">
          <div className="h-4 bg-neutral-200 rounded w-20" />
          <div className="h-4 bg-neutral-200 rounded w-16" />
        </div>
      </div>
    ))}

  {/* DATA STATE */}

{!loading &&
  filteredTalents.map((talent, index) => {
    const skillObjects = talent.skills?.filter((s): s is Skill => typeof s !== "string");
    const projectObjects = talent.projects?.filter((p): p is Project => typeof p !== "string");

    return (
      <Card
        key={talent._id}
        talent={{ ...talent, skills: skillObjects, projects: projectObjects }}
        index={index}
        getInitials={getInitials}
      />
    );
  }) 
}



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



                    {/* Pagination */}

                    <div>
                        <Pagination       
                   currentPage={page}
                    totalPages={totalPages}
                    onPageChange={ (newPage) => setPage(newPage)}

/>
                    </div>
                </div>


            </main>

        </div>
    )
}

export default ExploreTalents


