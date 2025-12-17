import { useState } from 'react'
import { Link } from 'react-router-dom'

const EditProfile = () => {
    const [basicInfo, setBasicInfo] = useState({
        name: 'Alex Morgan',
        role: 'Senior Frontend Developer',
        location: 'San Francisco, CA',
        bio: 'Passionate developer with 5+ years of experience building scalable web applications. I love React, Tailwind CSS, and exploring new UI/UX trends. Always learning.',
    })

    const [socialLinks, setSocialLinks] = useState({
        github: '',
        linkedin: '',
        twitter: '',
        portfolio: ''
    })

    const handleSocialLinksChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSocialLinks({ ...socialLinks, [e.target.name]: e.target.value })
    }

    const [skills, setSkills] = useState(['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Next.js'])
    const [newSkill, setNewSkill] = useState('')

    // Experience State
    const [experiences, setExperiences] = useState([
        { id: 1, role: 'Senior Frontend Engineer', company: 'TechCorp', period: '2021 - Present', description: 'Leading the frontend team, migrating legacy code to React, and improving performance by 40%.' },
        { id: 2, role: 'Software Developer', company: 'StartupInc', period: '2019 - 2021', description: 'Built and launched the MVP, implemented real-time chat features, and handled deployment pipelines.' }
    ])
    const [isAddingExperience, setIsAddingExperience] = useState(false)
    const [newExperience, setNewExperience] = useState({ role: '', company: '', period: '', description: '' })

    // Projects State
    const [projects, setProjects] = useState([
        { id: 1, title: 'E-commerce Dashboard', tech: 'React, Redux, Chart.js', link: 'github.com/alex/dashboard', description: 'A comprehensive analytics dashboard for online retailers.' },
        { id: 2, title: 'Task Manager App', tech: 'Vue, Firebase', link: 'taskmgr.app', description: 'Real-time collaborative task management tool with drag-and-drop interface.' }
    ])
    const [isAddingProject, setIsAddingProject] = useState(false)
    const [newProject, setNewProject] = useState({ title: '', tech: '', link: '', description: '' })

    const handleBasicInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setBasicInfo({ ...basicInfo, [e.target.name]: e.target.value })
    }

    const handleAddSkill = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && newSkill.trim()) {
            e.preventDefault()
            if (!skills.includes(newSkill.trim())) {
                setSkills([...skills, newSkill.trim()])
            }
            setNewSkill('')
        }
    }

    const removeSkill = (skillToRemove: string) => {
        setSkills(skills.filter(skill => skill !== skillToRemove))
    }

    // Experience Handlers
    const handleAddExperience = () => {
        if (newExperience.role && newExperience.company) {
            setExperiences([...experiences, { ...newExperience, id: Date.now() }])
            setNewExperience({ role: '', company: '', period: '', description: '' })
            setIsAddingExperience(false)
        }
    }

    const removeExperience = (id: number) => {
        setExperiences(experiences.filter(exp => exp.id !== id))
    }

    // Project Handlers
    const handleAddProject = () => {
        if (newProject.title && newProject.tech) {
            setProjects([...projects, { ...newProject, id: Date.now() }])
            setNewProject({ title: '', tech: '', link: '', description: '' })
            setIsAddingProject(false)
        }
    }

    const removeProject = (id: number) => {
        setProjects(projects.filter(proj => proj.id !== id))
    }

    const handleSave = () => {
        console.log('Saving profile...', { basicInfo, socialLinks, skills, experiences, projects })
        // TODO: Implement actual save logic
        alert('Profile saved! (Mock)')
    }

    return (
        <div className="min-h-screen bg-neutral-950 text-white font-sans selection:bg-blue-500/30 pb-20">
            {/* Navbar */}
            <nav className="fixed w-full z-50 bg-neutral-950/80 backdrop-blur-md border-b border-neutral-900">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link to="/" className="text-2xl font-bold tracking-tighter flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-600 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.5)]"></div>
                        SPOTLIGHT
                    </Link>
                    <div className="flex gap-4">
                        <div className="h-10 w-10 rounded-full bg-blue-600 border-2 border-neutral-800"></div>
                    </div>
                </div>
            </nav>

            <div className="pt-32 max-w-4xl mx-auto px-6">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-white">Edit Profile</h1>
                    <div className="flex gap-4">
                        <Link to="/profile" className="px-6 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white font-semibold rounded-full transition-all border border-neutral-800">
                            Cancel
                        </Link>
                        <button onClick={handleSave} className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-full transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)]">
                            Save Changes
                        </button>
                    </div>
                </div>

                <div className="space-y-8">
                    {/* Basic Info */}
                    <section className="p-8 rounded-3xl bg-neutral-900 border border-neutral-800 shadow-xl">
                        <h2 className="text-xl font-bold mb-6 text-white border-b border-neutral-800 pb-4">Basic Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2 flex items-center gap-6 mb-4">
                                <div className="h-24 w-24 rounded-full bg-neutral-800 flex items-center justify-center text-4xl border-4 border-neutral-950 shadow-xl relative group cursor-pointer">
                                    👤
                                    <div className="absolute inset-0 bg-blue-600/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span className="text-xs font-medium text-white">Change</span>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-medium text-white">Profile Photo</h3>
                                    <p className="text-sm text-neutral-400">Recommended: 400x400px</p>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-neutral-400 mb-2">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={basicInfo.name}
                                    onChange={handleBasicInfoChange}
                                    className="w-full px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-neutral-400 mb-2">Professional Role</label>
                                <input
                                    type="text"
                                    name="role"
                                    value={basicInfo.role}
                                    onChange={handleBasicInfoChange}
                                    className="w-full px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-neutral-400 mb-2">Location</label>
                                <input
                                    type="text"
                                    name="location"
                                    value={basicInfo.location}
                                    onChange={handleBasicInfoChange}
                                    className="w-full px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-neutral-400 mb-2">Bio</label>
                                <textarea
                                    name="bio"
                                    value={basicInfo.bio}
                                    onChange={handleBasicInfoChange}
                                    rows={4}
                                    className="w-full px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all resize-none"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Social Links */}
                    <section className="p-8 rounded-3xl bg-neutral-900 border border-neutral-800 shadow-xl">
                        <h2 className="text-xl font-bold mb-6 text-white border-b border-neutral-800 pb-4">Social Links</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-neutral-400 mb-2">GitHub</label>
                                <input
                                    type="url"
                                    name="github"
                                    value={socialLinks.github}
                                    onChange={handleSocialLinksChange}
                                    className="w-full px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                                    placeholder="https://github.com/username"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-neutral-400 mb-2">LinkedIn</label>
                                <input
                                    type="url"
                                    name="linkedin"
                                    value={socialLinks.linkedin}
                                    onChange={handleSocialLinksChange}
                                    className="w-full px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                                    placeholder="https://linkedin.com/in/username"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-neutral-400 mb-2">Twitter</label>
                                <input
                                    type="url"
                                    name="twitter"
                                    value={socialLinks.twitter}
                                    onChange={handleSocialLinksChange}
                                    className="w-full px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                                    placeholder="https://twitter.com/username"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-neutral-400 mb-2">Portfolio / Website</label>
                                <input
                                    type="url"
                                    name="portfolio"
                                    value={socialLinks.portfolio}
                                    onChange={handleSocialLinksChange}
                                    className="w-full px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                                    placeholder="https://yourwebsite.com"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Skills */}
                    <section className="p-8 rounded-3xl bg-neutral-900 border border-neutral-800 shadow-xl">
                        <h2 className="text-xl font-bold mb-6 text-white border-b border-neutral-800 pb-4">Skills</h2>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-neutral-400 mb-2">Add a skill (Press Enter)</label>
                            <input
                                type="text"
                                value={newSkill}
                                onChange={(e) => setNewSkill(e.target.value)}
                                onKeyDown={handleAddSkill}
                                className="w-full px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                                placeholder="e.g. React, UX Design..."
                            />
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {skills.map((skill) => (
                                <div key={skill} className="px-3 py-1 bg-neutral-800 border border-neutral-700 rounded-full text-sm font-medium text-neutral-200 flex items-center gap-2">
                                    {skill}
                                    <button onClick={() => removeSkill(skill)} className="hover:text-red-400 transition-colors">×</button>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Experience Section */}
                    <section className="p-8 rounded-3xl bg-neutral-900 border border-neutral-800 shadow-xl">
                        <div className="flex justify-between items-center mb-6 border-b border-neutral-800 pb-4">
                            <h2 className="text-xl font-bold text-white">Experience</h2>
                            <button
                                onClick={() => setIsAddingExperience(!isAddingExperience)}
                                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors shadow-[0_0_15px_rgba(37,99,235,0.3)]"
                            >
                                {isAddingExperience ? 'Cancel' : 'Add Experience'}
                            </button>
                        </div>

                        {/* Add Experience Form */}
                        {isAddingExperience && (
                            <div className="mb-8 p-6 bg-neutral-800 rounded-2xl border border-neutral-700">
                                <h3 className="font-semibold text-lg mb-4 text-white">Add New Experience</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-neutral-400 mb-1">Company Name</label>
                                        <input
                                            type="text"
                                            value={newExperience.company}
                                            onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
                                            className="w-full px-4 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
                                            placeholder="e.g. Acme Corp"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-400 mb-1">Role / Job Title</label>
                                        <input
                                            type="text"
                                            value={newExperience.role}
                                            onChange={(e) => setNewExperience({ ...newExperience, role: e.target.value })}
                                            className="w-full px-4 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
                                            placeholder="e.g. Senior Developer"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-400 mb-1">Period</label>
                                        <input
                                            type="text"
                                            value={newExperience.period}
                                            onChange={(e) => setNewExperience({ ...newExperience, period: e.target.value })}
                                            className="w-full px-4 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
                                            placeholder="e.g. Jan 2020 - Present"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-neutral-400 mb-1">Description</label>
                                        <textarea
                                            rows={3}
                                            value={newExperience.description}
                                            onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
                                            className="w-full px-4 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white focus:ring-2 focus:ring-blue-600 focus:outline-none resize-none"
                                            placeholder="Describe your responsibilities and achievements..."
                                        />
                                    </div>
                                    <div className="md:col-span-2 flex justify-end gap-3 mt-2">
                                        <button
                                            onClick={() => setIsAddingExperience(false)}
                                            className="px-4 py-2 text-sm font-medium text-neutral-400 hover:text-white"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleAddExperience}
                                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-500 shadow-md"
                                        >
                                            Add Position
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="space-y-4">
                            {experiences.map((exp) => (
                                <div key={exp.id} className="p-6 rounded-2xl border border-neutral-800 bg-neutral-800/50 hover:border-neutral-700 transition-colors group relative">
                                    <button
                                        onClick={() => removeExperience(exp.id)}
                                        className="absolute top-4 right-4 p-2 text-neutral-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all bg-neutral-900 rounded-full shadow-sm border border-neutral-700"
                                        title="Remove Experience"
                                    >
                                        🗑️
                                    </button>
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h3 className="font-bold text-lg text-white">{exp.role}</h3>
                                            <p className="font-medium text-neutral-300">{exp.company}</p>
                                        </div>
                                        <span className="text-sm font-medium text-neutral-400 bg-neutral-900 px-3 py-1 rounded-full border border-neutral-700">
                                            {exp.period}
                                        </span>
                                    </div>
                                    <p className="text-neutral-400 text-sm leading-relaxed">{exp.description}</p>
                                </div>
                            ))}
                            {experiences.length === 0 && (
                                <div className="text-center py-8 text-neutral-500 bg-neutral-800/50 rounded-2xl border border-dashed border-neutral-700">
                                    No experience added yet.
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Projects Section */}
                    <section className="p-8 rounded-3xl bg-neutral-900 border border-neutral-800 shadow-xl">
                        <div className="flex justify-between items-center mb-6 border-b border-neutral-800 pb-4">
                            <h2 className="text-xl font-bold text-white">Projects</h2>
                            <button
                                onClick={() => setIsAddingProject(!isAddingProject)}
                                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors shadow-[0_0_15px_rgba(37,99,235,0.3)]"
                            >
                                {isAddingProject ? 'Cancel' : 'Add Project'}
                            </button>
                        </div>

                        {/* Add Project Form */}
                        {isAddingProject && (
                            <div className="mb-8 p-6 bg-neutral-800 rounded-2xl border border-neutral-700">
                                <h3 className="font-semibold text-lg mb-4 text-white">Add New Project</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-neutral-400 mb-1">Project Title</label>
                                        <input
                                            type="text"
                                            value={newProject.title}
                                            onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                                            className="w-full px-4 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
                                            placeholder="e.g. Portfolio Website"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-400 mb-1">Technologies Used</label>
                                        <input
                                            type="text"
                                            value={newProject.tech}
                                            onChange={(e) => setNewProject({ ...newProject, tech: e.target.value })}
                                            className="w-full px-4 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
                                            placeholder="e.g. React, Node.js"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-400 mb-1">Project Link</label>
                                        <input
                                            type="text"
                                            value={newProject.link}
                                            onChange={(e) => setNewProject({ ...newProject, link: e.target.value })}
                                            className="w-full px-4 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
                                            placeholder="e.g. github.com/user/project"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-neutral-400 mb-1">Description</label>
                                        <textarea
                                            rows={3}
                                            value={newProject.description}
                                            onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                                            className="w-full px-4 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white focus:ring-2 focus:ring-blue-600 focus:outline-none resize-none"
                                            placeholder="Brief description of the project..."
                                        />
                                    </div>
                                    <div className="md:col-span-2 flex justify-end gap-3 mt-2">
                                        <button
                                            onClick={() => setIsAddingProject(false)}
                                            className="px-4 py-2 text-sm font-medium text-neutral-400 hover:text-white"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleAddProject}
                                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-500 shadow-md"
                                        >
                                            Add Project
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {projects.map((proj) => (
                                <div key={proj.id} className="p-6 rounded-2xl border border-neutral-800 bg-neutral-800/50 hover:border-neutral-700 transition-colors group relative flex flex-col h-full">
                                    <button
                                        onClick={() => removeProject(proj.id)}
                                        className="absolute top-4 right-4 p-2 text-neutral-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all bg-neutral-900 rounded-full shadow-sm border border-neutral-700"
                                        title="Remove Project"
                                    >
                                        🗑️
                                    </button>
                                    <h3 className="font-bold text-lg text-white mb-1">{proj.title}</h3>
                                    <div className="text-sm text-neutral-400 mb-4 font-mono">{proj.tech}</div>
                                    <p className="text-neutral-400 text-sm leading-relaxed mb-4 grow">{proj.description}</p>
                                    {proj.link && (
                                        <a href={`https://${proj.link}`} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-blue-400 hover:text-blue-300 inline-flex items-center gap-1 self-start">
                                            View Project ↗
                                        </a>
                                    )}
                                </div>
                            ))}
                        </div>
                        {projects.length === 0 && (
                            <div className="text-center py-8 text-neutral-500 bg-neutral-800/50 rounded-2xl border border-dashed border-neutral-700">
                                No projects added yet.
                            </div>
                        )}
                    </section>
                </div>
            </div>
        </div>
    )
}

export default EditProfile
