import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import {
    getEducations, addEducation, deleteEducation,
    getExperiences, addExperience, deleteExperience,
    getProjects, addProject, deleteProject,
    getSkills, addSkill, deleteSkill,
    getUserLinks, upsertUserLinks, getUserProfile, updateUserProfile
} from '../../lib/api'
import type { Education, Experience, Project, Skill, UserLinks } from '../../lib/api'
import { Trash2, Plus, Upload, Loader2, Link as LinkIcon } from 'lucide-react'
import { uploadImage } from '../../lib/cloudinary'
import { toast } from 'sonner'

const EditProfile = () => {
    const navigate = useNavigate()
    const { user, isAuthenticated, logout } = useAuthStore()

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login')
        }
    }, [isAuthenticated, navigate])

    const [basicInfo, setBasicInfo] = useState({
        fullName: user?.fullName || '',
        profRole: '',
        location: '',
        bio: '',
        avatar: ''
    })

    const [socialLinks, setSocialLinks] = useState<UserLinks>({
        github: '',
        linkedin: '',
        X: '',
        portfolio: ''
    })

    const [skills, setSkills] = useState<Skill[]>([])
    const [newSkillName, setNewSkillName] = useState('')

    const [experiences, setExperiences] = useState<Experience[]>([])
    const [isAddingExperience, setIsAddingExperience] = useState(false)
    const [newExperience, setNewExperience] = useState({
        title: '',
        position: '',
        date: '',
        desc: ''
    })

    const [projects, setProjects] = useState<Project[]>([])
    const [isAddingProject, setIsAddingProject] = useState(false)
    const [newProject, setNewProject] = useState({
        title: '',
        date: '',
        projectImg: '',
        desc: '',
        link: ''
    })

    const [isUploading, setIsUploading] = useState<{ type: 'avatar' | 'project' | null }>({ type: null })

    const [educations, setEducations] = useState<Education[]>([])
    const [isAddingEducation, setIsAddingEducation] = useState(false)
    const [newEducation, setNewEducation] = useState({
        course: '',
        school: '',
        date: ''
    })

    const [isSubmitting, setIsSubmitting] = useState<{ type: 'experience' | 'project' | 'education' | null }>({ type: null })

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchAllData = async () => {
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
                setSocialLinks(linksData)

                const userId = user?.id || (user as any)?._id
                if (userId) {
                    const profileData = await getUserProfile(userId)
                    setBasicInfo({
                        fullName: profileData.fullName || user?.fullName || '',
                        profRole: profileData.profRole || '',
                        location: profileData.location || '',
                        bio: profileData.bio || '',
                        avatar: profileData.avatar || '',
                    })
                }
            } catch (error) {
                console.error("Error fetching edit profile data:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchAllData()
    }, [isAuthenticated, user])

    const handleSocialLinksChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSocialLinks({ ...socialLinks, [e.target.name]: e.target.value })
    }

    const handleBasicInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setBasicInfo({ ...basicInfo, [e.target.name]: e.target.value })
    }

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'avatar' | 'project') => {
        const file = e.target.files?.[0]
        if (!file) return

        setIsUploading({ type })
        try {
            const url = await uploadImage(file)
            if (type === 'avatar') {
                setBasicInfo(prev => ({ ...prev, avatar: url }))
                toast.success("Profile photo uploaded!")
            } else {
                setNewProject(prev => ({ ...prev, projectImg: url }))
                toast.success("Project image uploaded!")
            }
        } catch (error: any) {
            console.error("Upload failed:", error)
            toast.error(error.message || "Image upload failed. Please try again.")
        } finally {
            setIsUploading({ type: null })
        }
    }

    const handleAddSkill = async (e?: React.KeyboardEvent) => {
        if ((!e || e.key === 'Enter') && newSkillName.trim()) {
            if (e) e.preventDefault()
            try {
                const res = await addSkill({ title: newSkillName.trim() })
                setSkills([...skills, res])
                setNewSkillName('')
            } catch (error) {
                console.error("Failed to add skill:", error)
            }
        }
    }

    const handleRemoveSkill = async (id: string) => {
        try {
            await deleteSkill(id)
            setSkills(skills.filter(skill => skill._id !== id))
        } catch (error) {
            console.error("Failed to delete skill:", error)
        }
    }

    const handleAddExperience = async () => {
        if (newExperience.title && newExperience.position) {
            setIsSubmitting({ type: 'experience' })
            try {
                const res = await addExperience({
                    title: newExperience.title,
                    position: newExperience.position,
                    date: newExperience.date || 'Not specified',
                    desc: newExperience.desc || ''
                })
                setExperiences([...experiences, res])
                setNewExperience({ title: '', position: '', date: '', desc: '' })
                setIsAddingExperience(false)
                toast.success("Experience added!")
            } catch (error) {
                console.error("Failed to add experience:", error)
                toast.error("Failed to add experience")
            } finally {
                setIsSubmitting({ type: null })
            }
        }
    }

    const handleRemoveExperience = async (id: string) => {
        try {
            await deleteExperience(id)
            setExperiences(experiences.filter(exp => exp._id !== id))
        } catch (error) {
            console.error("Failed to delete experience:", error)
        }
    }

    const handleAddProject = async () => {
        if (newProject.title && newProject.desc && newProject.link) {
            setIsSubmitting({ type: 'project' })
            try {
                const res = await addProject({
                    title: newProject.title,
                    date: newProject.date || new Date().toISOString().split('T')[0],
                    projectImg: newProject.projectImg || 'https://via.placeholder.com/150',
                    desc: newProject.desc,
                    link: newProject.link
                })
                setProjects([...projects, res])
                setNewProject({ title: '', date: '', projectImg: '', desc: '', link: '' })
                setIsAddingProject(false)
                toast.success("Project added!")
            } catch (error) {
                console.error("Failed to add project:", error)
                toast.error("Failed to add project")
            } finally {
                setIsSubmitting({ type: null })
            }
        }
    }

    const handleRemoveProject = async (id: string) => {
        try {
            await deleteProject(id)
            setProjects(projects.filter(proj => proj._id !== id))
        } catch (error) {
            console.error("Failed to delete project:", error)
        }
    }

    const handleAddEducation = async () => {
        if (newEducation.course && newEducation.school) {
            setIsSubmitting({ type: 'education' })
            try {
                const res = await addEducation(newEducation)
                setEducations([...educations, res])
                setNewEducation({ course: '', school: '', date: '' })
                setIsAddingEducation(false)
                toast.success("Education added!")
            } catch (error) {
                console.error("Failed to add education:", error)
                toast.error("Failed to add education")
            } finally {
                setIsSubmitting({ type: null })
            }
        }
    }

    const handleRemoveEducation = async (id: string) => {
        try {
            await deleteEducation(id)
            setEducations(educations.filter(edu => edu._id !== id))
        } catch (error) {
            console.error("Failed to delete education:", error)
        }
    }

    const [isSaving, setIsSaving] = useState(false)

    const handleSave = async () => {
        const userId = user?.id || (user as any)?._id
        if (!userId) {
            toast.error("User ID not found. Please log in again.")
            return
        }
        setIsSaving(true)
        try {
            await Promise.all([
                upsertUserLinks(socialLinks),
                updateUserProfile(userId, {
                    fullName: basicInfo.fullName,
                    profRole: basicInfo.profRole,
                    location: basicInfo.location,
                    bio: basicInfo.bio,
                    avatar: basicInfo.avatar
                })
            ])
            toast.success('Profile updated successfully!')
            navigate('/profile')
        } catch (error: any) {
            console.error("Failed to save profile:", error)
            toast.error(error.message || 'Failed to save profile. Please try again.')
        } finally {
            setIsSaving(false)
        }
    }

    if (loading && isAuthenticated) {
        return (
            <div className="min-h-screen bg-white text-neutral-900 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <div className="text-neutral-400 font-medium">Loading your details...</div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-white text-neutral-900 font-sans pb-20">
            <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-sm border-b border-neutral-200">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link to="/" className="text-2xl font-bold flex items-center gap-2 text-blue-600">
                        <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                        SpotLight
                    </Link>
                    <div className="flex gap-4 items-center">
                        <button
                            onClick={() => {
                                logout()
                                navigate('/')
                            }}
                            className="px-4 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
                        >
                            Logout
                        </button>
                        <div className="h-10 w-10 rounded-full bg-blue-600 border-2 border-blue-100 flex items-center justify-center text-sm font-bold text-white">
                            {user?.fullName.charAt(0).toUpperCase()}
                        </div>
                    </div>
                </div>
            </nav>

            <div className="pt-32 max-w-4xl mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 md:gap-0">
                    <h1 className="text-3xl font-bold text-neutral-900">Edit Profile</h1>
                    <div className="flex gap-3 md:gap-4 w-full md:w-auto">
                        <Link to="/profile" className="flex-1 md:flex-none px-6 py-2.5 bg-white hover:bg-neutral-50 text-neutral-900 font-semibold rounded-xl transition-all border-2 border-neutral-200 text-center">
                            Cancel
                        </Link>
                        <button
                            onClick={handleSave}
                            disabled={isSaving}
                            className="flex-1 md:flex-none px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-600/30 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSaving ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </div>

                <div className="space-y-8">
                    <section className="p-8 rounded-2xl bg-white border-2 border-neutral-200 shadow-sm">
                        <h2 className="text-xl font-bold mb-6 text-neutral-900 border-b border-neutral-200 pb-4">Basic Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2 flex items-center gap-6 mb-4">
                                <div className="h-24 w-24 rounded-full bg-blue-100 flex items-center justify-center text-4xl border-4 border-white shadow-lg relative group overflow-hidden">
                                    {basicInfo.avatar ? (
                                        <img src={basicInfo.avatar} alt="Preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-blue-600 font-bold">{user?.fullName.charAt(0).toUpperCase()}</span>
                                    )}
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span className="text-[10px] font-medium text-white uppercase tracking-wider">Preview</span>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-medium text-neutral-900">Profile Photo</h3>
                                    <p className="text-sm text-neutral-500 mb-4">Recommended: 400x400px (Optional)</p>
                                    <div className="flex flex-col gap-3">
                                        <div className="relative group w-fit">
                                            <input
                                                type="text"
                                                name="avatar"
                                                placeholder="Image URL"
                                                value={basicInfo.avatar}
                                                onChange={handleBasicInfoChange}
                                                className="w-full px-4 py-2 rounded-lg bg-white border-2 border-neutral-200 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-blue-500 transition-colors text-sm"
                                            />
                                            <div className="mt-2">
                                                <label className="flex items-center gap-2 px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-lg cursor-pointer transition-colors text-sm font-medium w-fit">
                                                    {isUploading.type === 'avatar' ? (
                                                        <Loader2 size={16} className="animate-spin" />
                                                    ) : (
                                                        <Upload size={16} />
                                                    )}
                                                    {isUploading.type === 'avatar' ? 'Uploading...' : 'Upload Image'}
                                                    <input
                                                        type="file"
                                                        className="hidden"
                                                        accept="image/*"
                                                        onChange={(e) => handleFileUpload(e, 'avatar')}
                                                        disabled={isUploading.type !== null}
                                                    />
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-2">Full Name</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={basicInfo.fullName}
                                    onChange={handleBasicInfoChange}
                                    className="w-full px-4 py-3 rounded-xl bg-white border-2 border-neutral-200 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-blue-500 transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-2">Professional Role</label>
                                <input
                                    type="text"
                                    name="profRole"
                                    value={basicInfo.profRole}
                                    onChange={handleBasicInfoChange}
                                    className="w-full px-4 py-3 rounded-xl bg-white border-2 border-neutral-200 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-blue-500 transition-colors"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-neutral-700 mb-2">Location</label>
                                <input
                                    type="text"
                                    name="location"
                                    value={basicInfo.location}
                                    onChange={handleBasicInfoChange}
                                    className="w-full px-4 py-3 rounded-xl bg-white border-2 border-neutral-200 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-blue-500 transition-colors"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-neutral-700 mb-2">Bio</label>
                                <textarea
                                    name="bio"
                                    value={basicInfo.bio}
                                    onChange={handleBasicInfoChange}
                                    rows={4}
                                    className="w-full px-4 py-3 rounded-xl bg-white border-2 border-neutral-200 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                                />
                            </div>
                        </div>
                    </section>

                    <section className="p-8 rounded-2xl bg-white border-2 border-neutral-200 shadow-sm">
                        <h2 className="text-xl font-bold mb-6 text-neutral-900 border-b border-neutral-200 pb-4">Social Links</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-2">GitHub</label>
                                <input
                                    type="url"
                                    name="github"
                                    value={socialLinks.github}
                                    onChange={handleSocialLinksChange}
                                    className="w-full px-4 py-3 rounded-xl bg-white border-2 border-neutral-200 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-blue-500 transition-colors"
                                    placeholder="https://github.com/username"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-2">LinkedIn</label>
                                <input
                                    type="url"
                                    name="linkedin"
                                    value={socialLinks.linkedin}
                                    onChange={handleSocialLinksChange}
                                    className="w-full px-4 py-3 rounded-xl bg-white border-2 border-neutral-200 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-blue-500 transition-colors"
                                    placeholder="https://linkedin.com/in/username"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-2">Twitter / X</label>
                                <input
                                    type="url"
                                    name="X"
                                    value={socialLinks.X}
                                    onChange={handleSocialLinksChange}
                                    className="w-full px-4 py-3 rounded-xl bg-white border-2 border-neutral-200 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-blue-500 transition-colors"
                                    placeholder="https://x.com/username"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-2">Portfolio / Website</label>
                                <input
                                    type="url"
                                    name="portfolio"
                                    value={socialLinks.portfolio}
                                    onChange={handleSocialLinksChange}
                                    className="w-full px-4 py-3 rounded-xl bg-white border-2 border-neutral-200 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-blue-500 transition-colors"
                                    placeholder="https://yourwebsite.com"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Skills */}
                    <section className="p-8 rounded-2xl bg-white border-2 border-neutral-200 shadow-sm">
                        <h2 className="text-xl font-bold mb-6 text-neutral-900 border-b border-neutral-200 pb-4">Skills</h2>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-neutral-700 mb-2">Add a skill (Press Enter)</label>
                            <input
                                type="text"
                                value={newSkillName}
                                onChange={(e) => setNewSkillName(e.target.value)}
                                onKeyDown={handleAddSkill}
                                className="w-full px-4 py-3 rounded-xl bg-white border-2 border-neutral-200 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-blue-500 transition-colors"
                                placeholder="e.g. React, UX Design..."
                            />
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {skills.map((skill) => (
                                <div key={skill._id} className="px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-lg text-sm font-medium text-blue-700 flex items-center gap-2">
                                    {skill.title}
                                    <button onClick={() => handleRemoveSkill(skill._id)} className="hover:text-red-600 transition-colors font-bold">×</button>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Experience Section */}
                    <section className="p-8 rounded-2xl bg-white border-2 border-neutral-200 shadow-sm">
                        <div className="flex justify-between items-center mb-6 border-b border-neutral-200 pb-4">
                            <h2 className="text-xl font-bold text-neutral-900">Experience</h2>
                            <button
                                onClick={() => setIsAddingExperience(!isAddingExperience)}
                                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30"
                            >
                                {isAddingExperience ? 'Cancel' : 'Add Experience'}
                            </button>
                        </div>

                        {isAddingExperience && (
                            <div className="mb-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
                                <h3 className="font-semibold text-lg mb-4 text-neutral-900">Add New Experience</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-neutral-700 mb-1">Company Name</label>
                                        <input
                                            type="text"
                                            value={newExperience.title}
                                            onChange={(e) => setNewExperience({ ...newExperience, title: e.target.value })}
                                            className="w-full px-4 py-2 rounded-lg bg-white border-2 border-neutral-200 text-neutral-900 focus:border-blue-500 focus:outline-none"
                                            placeholder="e.g. Acme Corp"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-700 mb-1">Role / Job Title</label>
                                        <input
                                            type="text"
                                            value={newExperience.position}
                                            onChange={(e) => setNewExperience({ ...newExperience, position: e.target.value })}
                                            className="w-full px-4 py-2 rounded-lg bg-white border-2 border-neutral-200 text-neutral-900 focus:border-blue-500 focus:outline-none"
                                            placeholder="e.g. Senior Developer"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-700 mb-1">Period</label>
                                        <input
                                            type="text"
                                            value={newExperience.date}
                                            onChange={(e) => setNewExperience({ ...newExperience, date: e.target.value })}
                                            className="w-full px-4 py-2 rounded-lg bg-white border-2 border-neutral-200 text-neutral-900 focus:border-blue-500 focus:outline-none"
                                            placeholder="e.g. Jan 2020 - Present"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-neutral-700 mb-1">Description</label>
                                        <textarea
                                            rows={3}
                                            value={newExperience.desc}
                                            onChange={(e) => setNewExperience({ ...newExperience, desc: e.target.value })}
                                            className="w-full px-4 py-2 rounded-lg bg-white border-2 border-neutral-200 text-neutral-900 focus:border-blue-500 focus:outline-none resize-none"
                                            placeholder="Describe your responsibilities and achievements..."
                                        />
                                    </div>
                                    <div className="md:col-span-2 flex justify-end gap-3 mt-2">
                                        <button
                                            onClick={() => setIsAddingExperience(false)}
                                            className="px-4 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleAddExperience}
                                            disabled={isSubmitting.type === 'experience'}
                                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-md flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                        >
                                            {isSubmitting.type === 'experience' && <Loader2 size={16} className="animate-spin" />}
                                            {isSubmitting.type === 'experience' ? 'Adding...' : 'Add Position'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="space-y-4">
                            {experiences.map((exp) => (
                                <div key={exp._id} className="p-6 rounded-xl border-2 border-neutral-200 bg-white hover:border-neutral-300 transition-colors group relative">
                                    <button
                                        onClick={() => handleRemoveExperience(exp._id)}
                                        className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-all bg-white rounded-full shadow-sm border border-neutral-200"
                                        title="Remove Experience"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h3 className="font-bold text-lg text-neutral-900">{exp.position}</h3>
                                            <p className="font-medium text-neutral-700">{exp.title}</p>
                                        </div>
                                        <span className="text-sm font-medium text-neutral-500 bg-neutral-100 px-3 py-1 rounded-lg border border-neutral-200">
                                            {exp.date}
                                        </span>
                                    </div>
                                    <p className="text-neutral-600 text-sm leading-relaxed">{exp.desc}</p>
                                </div>
                            ))}
                            {experiences.length === 0 && (
                                <div className="text-center py-8 text-neutral-400 bg-neutral-50 rounded-xl border-2 border-dashed border-neutral-200">
                                    No experience added yet.
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Projects Section */}
                    <section className="p-8 rounded-2xl bg-white border-2 border-neutral-200 shadow-sm">
                        <div className="flex justify-between items-center mb-6 border-b border-neutral-200 pb-4">
                            <h2 className="text-xl font-bold text-neutral-900">Projects</h2>
                            <button
                                onClick={() => setIsAddingProject(!isAddingProject)}
                                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30"
                            >
                                {isAddingProject ? 'Cancel' : 'Add Project'}
                            </button>
                        </div>

                        {isAddingProject && (
                            <div className="mb-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
                                <h3 className="font-semibold text-lg mb-4 text-neutral-900">Add New Project</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-neutral-700 mb-1">Project Title</label>
                                        <input
                                            type="text"
                                            value={newProject.title}
                                            onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                                            className="w-full px-4 py-2 rounded-lg bg-white border-2 border-neutral-200 text-neutral-900 focus:border-blue-500 focus:outline-none"
                                            placeholder="e.g. Portfolio Website"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-700 mb-1">Project Date</label>
                                        <input
                                            type="text"
                                            value={newProject.date}
                                            onChange={(e) => setNewProject({ ...newProject, date: e.target.value })}
                                            className="w-full px-4 py-2 rounded-lg bg-white border-2 border-neutral-200 text-neutral-900 focus:border-blue-500 focus:outline-none"
                                            placeholder="e.g. Dec 2025"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-700 mb-2">Project Image</label>
                                        <div className="space-y-3">
                                            <input
                                                type="text"
                                                value={newProject.projectImg}
                                                onChange={(e) => setNewProject({ ...newProject, projectImg: e.target.value })}
                                                placeholder="Image URL"
                                                className="w-full px-4 py-3 rounded-xl bg-white border-2 border-neutral-200 text-neutral-900 focus:outline-none focus:border-blue-500 transition-colors"
                                            />
                                            <label className="flex items-center gap-2 px-4 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-xl cursor-pointer transition-colors text-sm font-bold w-full justify-center border-2 border-dashed border-neutral-300">
                                                {isUploading.type === 'project' ? (
                                                    <Loader2 size={18} className="animate-spin" />
                                                ) : (
                                                    <Upload size={18} />
                                                )}
                                                {isUploading.type === 'project' ? 'Uploading...' : 'Upload from device'}
                                                <input
                                                    type="file"
                                                    className="hidden"
                                                    accept="image/*"
                                                    onChange={(e) => handleFileUpload(e, 'project')}
                                                    disabled={isUploading.type !== null}
                                                />
                                            </label>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-700 mb-2">Project Link (Required)</label>
                                        <div className="relative">
                                            <LinkIcon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
                                            <input
                                                type="url"
                                                value={newProject.link}
                                                onChange={(e) => setNewProject({ ...newProject, link: e.target.value })}
                                                placeholder="https://example.com"
                                                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border-2 border-neutral-200 text-neutral-900 focus:outline-none focus:border-blue-500 transition-colors"
                                            />
                                        </div>
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-neutral-700 mb-1">Description</label>
                                        <textarea
                                            rows={3}
                                            value={newProject.desc}
                                            onChange={(e) => setNewProject({ ...newProject, desc: e.target.value })}
                                            className="w-full px-4 py-2 rounded-lg bg-white border-2 border-neutral-200 text-neutral-900 focus:border-blue-500 focus:outline-none resize-none"
                                            placeholder="Brief description of the project..."
                                        />
                                    </div>
                                    <div className="md:col-span-2 flex justify-end gap-3 mt-2">
                                        <button
                                            onClick={() => setIsAddingProject(false)}
                                            className="px-4 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleAddProject}
                                            disabled={isSubmitting.type === 'project'}
                                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-md flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                        >
                                            {isSubmitting.type === 'project' && <Loader2 size={16} className="animate-spin" />}
                                            {isSubmitting.type === 'project' ? 'Adding...' : 'Add Project'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {projects.map((proj) => (
                                <div key={proj._id} className="p-6 rounded-xl border-2 border-neutral-200 bg-white hover:border-neutral-300 transition-colors group relative flex flex-col h-full">
                                    <button
                                        onClick={() => handleRemoveProject(proj._id)}
                                        className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-all bg-white rounded-full shadow-sm border border-neutral-200"
                                        title="Remove Project"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                    <h3 className="font-bold text-lg text-neutral-900 mb-1">{proj.title}</h3>
                                    <div className="flex gap-2 mb-2 items-center">
                                        {proj.date && <span className="text-[10px] bg-neutral-100 text-neutral-500 px-2 py-0.5 rounded font-bold uppercase tracking-wider">{proj.date}</span>}
                                        {proj.projectImg && <span className="text-[10px] text-blue-600 font-medium">Image Loaded</span>}
                                    </div>
                                    <p className="text-neutral-600 text-sm leading-relaxed mb-4 grow">{proj.desc}</p>
                                </div>
                            ))}
                        </div>
                        {projects.length === 0 && (
                            <div className="text-center py-8 text-neutral-400 bg-neutral-50 rounded-xl border-2 border-dashed border-neutral-200">
                                No projects added yet.
                            </div>
                        )}
                    </section>
                    {/* Education */}
                    <section className="p-8 rounded-2xl bg-white border-2 border-neutral-200 shadow-sm">
                        <div className="flex justify-between items-center mb-6 border-b border-neutral-200 pb-4">
                            <h2 className="text-xl font-bold text-neutral-900">Education</h2>
                            <button
                                onClick={() => setIsAddingEducation(!isAddingEducation)}
                                className="flex items-center gap-2 text-blue-600 font-bold hover:text-blue-700 transition-colors"
                            >
                                <Plus size={20} /> Add Education
                            </button>
                        </div>

                        {isAddingEducation && (
                            <div className="mb-8 p-6 rounded-xl bg-blue-50/50 border-2 border-blue-100 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-neutral-700 mb-1">Degree / Course</label>
                                    <input
                                        type="text"
                                        value={newEducation.course}
                                        onChange={(e) => setNewEducation({ ...newEducation, course: e.target.value })}
                                        className="w-full px-4 py-2 rounded-lg bg-white border-2 border-neutral-200 text-neutral-900 focus:border-blue-500 focus:outline-none"
                                        placeholder="e.g. Bachelor of Computer Science"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-1">School / University</label>
                                    <input
                                        type="text"
                                        value={newEducation.school}
                                        onChange={(e) => setNewEducation({ ...newEducation, school: e.target.value })}
                                        className="w-full px-4 py-2 rounded-lg bg-white border-2 border-neutral-200 text-neutral-900 focus:border-blue-500 focus:outline-none"
                                        placeholder="e.g. Stanford University"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-1">Date / Year</label>
                                    <input
                                        type="text"
                                        value={newEducation.date}
                                        onChange={(e) => setNewEducation({ ...newEducation, date: e.target.value })}
                                        className="w-full px-4 py-2 rounded-lg bg-white border-2 border-neutral-200 text-neutral-900 focus:border-blue-500 focus:outline-none"
                                        placeholder="e.g. 2018 - 2022"
                                    />
                                </div>
                                <div className="md:col-span-2 flex gap-3 mt-2">
                                    <button
                                        onClick={handleAddEducation}
                                        disabled={isSubmitting.type === 'education'}
                                        className="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting.type === 'education' && <Loader2 size={18} className="animate-spin" />}
                                        {isSubmitting.type === 'education' ? 'Saving...' : 'Save Education'}
                                    </button>
                                    <button
                                        onClick={() => setIsAddingEducation(false)}
                                        className="px-6 py-2 bg-white text-neutral-600 font-bold rounded-lg border-2 border-neutral-200 hover:bg-neutral-50 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}

                        <div className="space-y-4">
                            {educations.map((edu) => (
                                <div key={edu._id} className="p-6 rounded-xl border-2 border-neutral-200 bg-white hover:border-neutral-300 transition-colors group relative">
                                    <button
                                        onClick={() => handleRemoveEducation(edu._id)}
                                        className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-all bg-white rounded-full shadow-sm border border-neutral-200"
                                        title="Remove Education"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-bold text-lg text-neutral-900">{edu.course}</h3>
                                            <p className="font-medium text-neutral-700">{edu.school}</p>
                                        </div>
                                        <span className="text-sm font-medium text-neutral-500 bg-neutral-100 px-3 py-1 rounded-lg border border-neutral-200">
                                            {edu.date}
                                        </span>
                                    </div>
                                </div>
                            ))}
                            {educations.length === 0 && !isAddingEducation && (
                                <p className="text-center text-neutral-400 py-8 italic">No education info added yet.</p>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default EditProfile
