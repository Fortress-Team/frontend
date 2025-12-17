import { Link } from 'react-router-dom'

const UserProfile = () => {
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

            {/* Header Profile Section */}
            <div className="pt-20">
                <div className="h-60 w-full bg-neutral-900 border-b border-neutral-800 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(37,99,235,0.1),transparent_50%)]"></div>
                </div>

                <div className="max-w-7xl mx-auto px-6 -mt-20 relative z-10">
                    <div className="flex flex-col md:flex-row gap-6 items-end">
                        <div className="h-40 w-40 rounded-full bg-neutral-900 border-4 border-neutral-950 p-1 shadow-2xl">
                            <div className="h-full w-full rounded-full bg-neutral-800 flex items-center justify-center text-4xl overflow-hidden border border-neutral-700">
                                👤
                            </div>
                        </div>
                        <div className="mb-4 flex-1">
                            <h1 className="text-4xl font-bold text-white mb-1">Alex Morgan</h1>
                            <p className="text-white font-medium text-lg">Senior Frontend Developer</p>
                            <p className="text-neutral-400 text-sm">San Francisco, CA • Joined Dec 2025</p>
                        </div>
                        <div className="mb-6 flex gap-3">
                            <button className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-full transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)]">
                                Connect
                            </button>
                            <Link to="/profile/edit" className="px-6 py-2.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-white font-semibold rounded-full transition-all block text-center">
                                Edit Profile
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: About & Skills */}
                <div className="lg:col-span-1 space-y-8">
                    {/* About */}
                    <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 shadow-xl">
                        <h3 className="text-xl font-bold mb-4 text-white">About</h3>
                        <p className="text-neutral-300 leading-relaxed text-sm">
                            Passionate developer with 5+ years of experience building scalable web applications. I love React, Tailwind CSS, and exploring new UI/UX trends. Always learning.
                        </p>

                        <div className="mt-6 flex flex-wrap gap-4 text-neutral-400">
                            <a href="#" className="hover:text-blue-400 transition-colors flex items-center gap-2 text-sm font-medium">
                                Github
                            </a>
                            <a href="#" className="hover:text-blue-400 transition-colors flex items-center gap-2 text-sm font-medium">
                                LinkedIn
                            </a>
                            <a href="#" className="hover:text-blue-400 transition-colors flex items-center gap-2 text-sm font-medium">
                                Twitter
                            </a>
                        </div>
                    </div>

                    {/* Skills */}
                    <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 shadow-xl">
                        <h3 className="text-xl font-bold mb-4 text-white">Skills</h3>
                        <div className="flex flex-wrap gap-2">
                            {['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Next.js', 'PostgreSQL', 'Figma', 'GraphQL'].map((skill) => (
                                <span key={skill} className="px-3 py-1 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-full text-xs font-medium text-neutral-200 transition-colors cursor-default">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column: Projects & Experience */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Projects */}
                    <div>
                        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-white">
                            Featured Projects
                            <span className="text-neutral-500 text-sm font-normal">(3)</span>
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Project Card 1 */}
                            <div className="group p-5 rounded-3xl bg-neutral-900 border border-neutral-800 hover:border-blue-600/50 transition-all hover:shadow-[0_0_30px_rgba(37,99,235,0.2)]">
                                <div className="h-40 w-full rounded-2xl bg-neutral-800 mb-4 overflow-hidden relative border border-neutral-700">
                                    <div className="absolute bottom-3 left-3 px-3 py-1 bg-neutral-900 rounded-full text-xs font-medium border border-neutral-700 shadow-sm text-neutral-300">
                                        Open Source
                                    </div>
                                </div>
                                <h4 className="text-lg font-bold mb-2 text-white group-hover:text-blue-400 transition-colors">E-Commerce Dashboard</h4>
                                <p className="text-neutral-400 text-sm mb-4 line-clamp-2">
                                    A fully functional admin dashboard with real-time analytics, inventory management.
                                </p>
                                <div className="flex items-center justify-between text-xs text-neutral-500">
                                    <div className="flex gap-3">
                                        <span className="flex items-center gap-1 font-medium text-neutral-300">⭐ 142</span>
                                        <span className="flex items-center gap-1 font-medium text-neutral-300">🔱 23</span>
                                    </div>
                                    <span>TypeScript • React</span>
                                </div>
                            </div>

                            {/* Project Card 2 */}
                            <div className="group p-5 rounded-3xl bg-neutral-900 border border-neutral-800 hover:border-blue-600/50 transition-all hover:shadow-[0_0_30px_rgba(37,99,235,0.2)]">
                                <div className="h-40 w-full rounded-2xl bg-neutral-800 mb-4 overflow-hidden relative border border-neutral-700">
                                    <div className="absolute bottom-3 left-3 px-3 py-1 bg-neutral-900 rounded-full text-xs font-medium border border-neutral-700 shadow-sm text-neutral-300">
                                        SaaS
                                    </div>
                                </div>
                                <h4 className="text-lg font-bold mb-2 text-white group-hover:text-blue-400 transition-colors">TaskMaster Pro</h4>
                                <p className="text-neutral-400 text-sm mb-4 line-clamp-2">
                                    Collaborative task management tool for remote teams with video integration.
                                </p>
                                <div className="flex items-center justify-between text-xs text-neutral-500">
                                    <div className="flex gap-3">
                                        <span className="flex items-center gap-1 font-medium text-neutral-300">⭐ 89</span>
                                        <span className="flex items-center gap-1 font-medium text-neutral-300">🔱 12</span>
                                    </div>
                                    <span>Next.js • Prisma</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Experience */}
                    <div>
                        <h3 className="text-2xl font-bold mb-6 text-white">Experience</h3>
                        <div className="space-y-6">
                            {/* Job 1 */}
                            <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-colors shadow-xl">
                                <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                                    <h4 className="text-lg font-bold text-white">Senior Frontend Engineer</h4>
                                    <span className="text-sm text-neutral-400 font-medium">2023 - Present</span>
                                </div>
                                <div className="text-neutral-300 text-sm font-medium mb-4">TechCorp Inc.</div>
                                <p className="text-neutral-400 text-sm leading-relaxed">
                                    Leading the frontend team in migrating legacy codebase to Next.js. Improved site performance by 40% and established a new design system.
                                </p>
                            </div>

                            {/* Job 2 */}
                            <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-colors shadow-xl">
                                <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                                    <h4 className="text-lg font-bold text-white">Frontend Developer</h4>
                                    <span className="text-sm text-neutral-400 font-medium">2021 - 2023</span>
                                </div>
                                <div className="text-neutral-300 text-sm font-medium mb-4">Creative Agency</div>
                                <p className="text-neutral-400 text-sm leading-relaxed">
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
