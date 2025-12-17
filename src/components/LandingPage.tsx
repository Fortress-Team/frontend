import { Link } from 'react-router-dom'

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-neutral-950 text-white font-sans selection:bg-blue-500/30">
            {/* Navbar - Minimal */}
            <nav className="fixed w-full z-50 bg-neutral-950/90 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
                    <Link to="/" className="text-2xl font-bold tracking-tighter flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-600 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.5)]"></div>
                        SPOTLIGHT
                    </Link>
                    <div className="flex gap-6 items-center">
                        <Link to="/login" className="text-sm text-neutral-400 hover:text-white transition-colors">
                            Log In
                        </Link>
                        <Link to="/signup" className="px-6 py-2 bg-blue-600 text-white text-sm font-medium hover:bg-blue-500 transition-colors">
                            Get Started
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero - Bold & Asymmetric */}
            <main className="pt-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[70vh]">
                        <div>
                            <div className="inline-block px-3 py-1 bg-blue-600/10 border border-blue-600/20 text-blue-400 text-xs font-medium mb-6 uppercase tracking-wider">
                                For Professionals
                            </div>
                            <h1 className="text-6xl md:text-8xl font-bold leading-none mb-8">
                                Your work<br />
                                <span className="text-blue-500">deserves</span><br />
                                the spotlight
                            </h1>
                            <p className="text-xl text-neutral-400 mb-10 max-w-lg leading-relaxed">
                                Whether you're a designer, developer, writer, or visionary. Spotlight is the stage to showcase your work and connect with opportunities.
                            </p>
                            <div className="flex gap-4">
                                <Link to="/signup" className="px-8 py-4 bg-blue-600 text-white font-medium hover:bg-blue-500 transition-colors">
                                    Create Profile
                                </Link>
                                <Link to="/profile" className="px-8 py-4 border border-neutral-800 text-white font-medium hover:border-neutral-700 transition-colors">
                                    View Example
                                </Link>
                            </div>
                        </div>
                        <div className="relative hidden lg:block">
                            <div className="aspect-square bg-neutral-900 border border-neutral-800 relative overflow-hidden">
                                {/* Profile Header */}
                                <div className="p-8 border-b border-neutral-800">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-2xl">
                                            👤
                                        </div>
                                        <div>
                                            <div className="font-bold text-lg">Alex Morgan</div>
                                            <div className="text-sm text-neutral-400">Senior Frontend Developer</div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <span className="px-2 py-1 bg-neutral-800 text-xs text-neutral-300">React</span>
                                        <span className="px-2 py-1 bg-neutral-800 text-xs text-neutral-300">TypeScript</span>
                                        <span className="px-2 py-1 bg-neutral-800 text-xs text-neutral-300">Node.js</span>
                                    </div>
                                </div>
                                {/* Projects Preview */}
                                <div className="p-8 space-y-4">
                                    <div className="text-sm font-medium text-neutral-400 mb-4">Featured Projects</div>
                                    <div className="bg-neutral-800 p-4 border border-neutral-700">
                                        <div className="font-medium mb-1">E-Commerce Dashboard</div>
                                        <div className="text-xs text-neutral-500">React • Redux • Chart.js</div>
                                    </div>
                                    <div className="bg-neutral-800 p-4 border border-neutral-700">
                                        <div className="font-medium mb-1">Task Manager App</div>
                                        <div className="text-xs text-neutral-500">Vue • Firebase</div>
                                    </div>
                                </div>
                                <div className="absolute top-4 right-4 px-3 py-1 bg-blue-600 text-xs font-medium">
                                    LIVE PREVIEW
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features - Magazine Style */}
                <div className="max-w-7xl mx-auto mt-40 mb-32">
                    <div className="space-y-24">
                        {/* Feature 1 - Portfolio Showcase with Large Visual */}
                        <div className="grid lg:grid-cols-2 gap-16">
                            <div className="flex flex-col justify-center">
                                <div className="text-blue-500 text-sm font-medium mb-4 uppercase tracking-wider">Portfolio</div>
                                <h3 className="text-5xl font-bold mb-6 leading-tight">Showcase your best work</h3>
                                <p className="text-lg text-neutral-400 leading-relaxed mb-8">
                                    Create a stunning portfolio with your projects, case studies, and achievements. Add images, links, and detailed descriptions that tell your story.
                                </p>
                                <div className="space-y-3 text-sm">
                                    <div className="flex items-center gap-3">
                                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                                        <span className="text-neutral-300">Rich media support for images and videos</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                                        <span className="text-neutral-300">Direct links to live projects and repositories</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                                        <span className="text-neutral-300">Highlight your tech stack and achievements</span>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-neutral-900 border border-neutral-800 p-8">
                                <div className="space-y-4">
                                    {/* Large Featured Project */}
                                    <div className="bg-neutral-800 border border-neutral-700 p-6 h-48 flex flex-col justify-between relative overflow-hidden group">
                                        <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        <div className="relative z-10">
                                            <div className="text-xs text-neutral-500 mb-2">FEATURED PROJECT</div>
                                            <div className="text-2xl font-bold mb-2">E-Commerce Platform</div>
                                            <div className="text-sm text-neutral-400">Full-stack marketplace with real-time inventory</div>
                                        </div>
                                        <div className="relative z-10 flex items-center justify-between">
                                            <div className="text-xs text-neutral-500">React • Node.js • PostgreSQL</div>
                                            <div className="flex items-center gap-2 text-sm">
                                                <span>⭐ 234</span>
                                                <span className="text-neutral-600">•</span>
                                                <span>🔱 45</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Grid of smaller projects */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-neutral-800 border border-neutral-700 p-4 h-32 flex flex-col justify-between hover:border-blue-600/50 transition-colors">
                                            <div>
                                                <div className="text-xs text-neutral-500 mb-1">PROJECT</div>
                                                <div className="font-medium text-sm">Dashboard UI</div>
                                            </div>
                                            <div className="text-xs text-neutral-500">⭐ 142</div>
                                        </div>
                                        <div className="bg-neutral-800 border border-neutral-700 p-4 h-32 flex flex-col justify-between hover:border-blue-600/50 transition-colors">
                                            <div>
                                                <div className="text-xs text-neutral-500 mb-1">PROJECT</div>
                                                <div className="font-medium text-sm">Mobile App</div>
                                            </div>
                                            <div className="text-xs text-neutral-500">⭐ 89</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Feature 2 - Large Right */}
                        <div className="grid lg:grid-cols-5 gap-12 items-center">
                            <div className="lg:col-span-3 bg-neutral-900 border border-neutral-800 relative overflow-hidden order-2 lg:order-1">
                                <div className="p-12">
                                    {/* Large Featured Stat */}
                                    <div className="mb-8 pb-8 border-b border-neutral-800">
                                        <div className="text-sm text-blue-500 font-medium mb-2 uppercase tracking-wider">Your Reach</div>
                                        <div className="flex items-end gap-4">
                                            <div className="text-7xl font-bold text-blue-500">1.2K</div>
                                            <div className="text-2xl text-neutral-400 mb-2">views this month</div>
                                        </div>
                                    </div>

                                    {/* Grid of smaller stats */}
                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <div className="text-3xl font-bold mb-1">89</div>
                                            <div className="text-sm text-neutral-400">Connection Requests</div>
                                        </div>
                                        <div>
                                            <div className="text-3xl font-bold mb-1">23</div>
                                            <div className="text-sm text-neutral-400">Job Opportunities</div>
                                        </div>
                                        <div>
                                            <div className="text-3xl font-bold mb-1">156</div>
                                            <div className="text-sm text-neutral-400">Profile Shares</div>
                                        </div>
                                        <div>
                                            <div className="text-3xl font-bold mb-1">12</div>
                                            <div className="text-sm text-neutral-400">Active Conversations</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="lg:col-span-2 order-1 lg:order-2">
                                <div className="text-blue-500 text-sm font-medium mb-4 uppercase tracking-wider">Career</div>
                                <h3 className="text-4xl font-bold mb-6">Get discovered</h3>
                                <p className="text-lg text-neutral-400 leading-relaxed">
                                    Make your profile visible to recruiters and clients. Share your unique URL and let opportunities find you.
                                </p>
                            </div>
                        </div>

                        {/* Feature 3 - Full Width */}
                        <div className="bg-neutral-900 border border-neutral-800 p-12 lg:p-16">
                            <div className="max-w-3xl">
                                <div className="text-blue-500 text-sm font-medium mb-4 uppercase tracking-wider">Simple Setup</div>
                                <h3 className="text-4xl font-bold mb-6">Start in minutes</h3>
                                <p className="text-lg text-neutral-400 leading-relaxed mb-8">
                                    No complex setup. Just sign up, add your information, and you're live. Update anytime, anywhere.
                                </p>
                                <div className="flex gap-8 text-sm">
                                    <div>
                                        <div className="text-3xl font-bold text-blue-500 mb-2">1.</div>
                                        <div className="text-neutral-400">Create account</div>
                                    </div>
                                    <div>
                                        <div className="text-3xl font-bold text-blue-500 mb-2">2.</div>
                                        <div className="text-neutral-400">Add projects</div>
                                    </div>
                                    <div>
                                        <div className="text-3xl font-bold text-blue-500 mb-2">3.</div>
                                        <div className="text-neutral-400">Share profile</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Testimonials - Minimal Cards */}
                <div className="max-w-7xl mx-auto mb-32">
                    <h2 className="text-5xl md:text-6xl font-bold mb-16">What people say</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="border-l-2 border-blue-600 pl-6">
                            <p className="text-lg text-neutral-300 mb-6 leading-relaxed">
                                "Landed my dream job thanks to my Spotlight profile. Clean, professional, effective."
                            </p>
                            <div className="text-sm">
                                <div className="font-medium">Sarah Chen</div>
                                <div className="text-neutral-500">UX Designer</div>
                            </div>
                        </div>
                        <div className="border-l-2 border-blue-600 pl-6">
                            <p className="text-lg text-neutral-300 mb-6 leading-relaxed">
                                "Best platform for showcasing dev work. Simple, fast, and it just works."
                            </p>
                            <div className="text-sm">
                                <div className="font-medium">Marcus Rodriguez</div>
                                <div className="text-neutral-500">Full-Stack Developer</div>
                            </div>
                        </div>
                        <div className="border-l-2 border-blue-600 pl-6">
                            <p className="text-lg text-neutral-300 mb-6 leading-relaxed">
                                "My profile looks incredible. Got multiple client inquiries in the first week."
                            </p>
                            <div className="text-sm">
                                <div className="font-medium">Emily Watson</div>
                                <div className="text-neutral-500">Content Writer</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA - Bold */}
                <div className="max-w-7xl mx-auto mb-32">
                    <div className="bg-blue-600 p-16 lg:p-24">
                        <div className="max-w-3xl">
                            <h2 className="text-5xl md:text-6xl font-bold mb-6">Ready to get started?</h2>
                            <p className="text-xl text-blue-100 mb-10">
                                Join professionals who are already using Spotlight to grow their careers.
                            </p>
                            <Link to="/signup" className="inline-block px-10 py-4 bg-white text-blue-600 font-medium hover:bg-neutral-100 transition-colors">
                                Create Your Profile
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Footer - Minimal */}
                <footer className="max-w-7xl mx-auto pb-16 pt-16 border-t border-neutral-900">
                    <div className="grid md:grid-cols-2 gap-12 mb-12">
                        <div>
                            <div className="text-2xl font-bold mb-4">SPOTLIGHT</div>
                            <p className="text-neutral-500 text-sm max-w-sm">
                                The professional network for everyone. Showcase your work, connect with opportunities.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-8 text-sm">
                            <div>
                                <div className="font-medium mb-4">Product</div>
                                <ul className="space-y-2 text-neutral-500">
                                    <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                                    <li><a href="#" className="hover:text-white transition-colors">How It Works</a></li>
                                </ul>
                            </div>
                            <div>
                                <div className="font-medium mb-4">Legal</div>
                                <ul className="space-y-2 text-neutral-500">
                                    <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                                    <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between items-center text-sm text-neutral-500 pt-8 border-t border-neutral-900">
                        <p>© 2025 Spotlight. All rights reserved.</p>
                        <div className="flex gap-6 mt-4 md:mt-0">
                            <a href="#" className="hover:text-white transition-colors">Twitter</a>
                            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
                            <a href="#" className="hover:text-white transition-colors">GitHub</a>
                        </div>
                    </div>
                </footer>
            </main>
        </div>
    )
}

export default LandingPage
