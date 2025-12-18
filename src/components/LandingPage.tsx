import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const LandingPage = () => {
    // Animation variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 60 },
        visible: { opacity: 1, y: 0 }
    }

    const fadeIn = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 }
    }

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    }

    const scaleIn = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1 }
    }

    return (
        <div className="min-h-screen bg-white text-neutral-900 font-sans selection:bg-blue-500/30">
            {/* Navbar */}
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="fixed w-full z-50 bg-white/90 backdrop-blur-sm border-b border-neutral-200"
            >
                <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
                    <Link to="/" className="text-2xl font-bold tracking-tighter flex items-center gap-2 text-blue-600">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="w-3 h-3 bg-blue-600 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.5)]"
                        ></motion.div>
                        SPOTLIGHT
                    </Link>
                    <div className="flex gap-6 items-center">
                        <Link to="/login" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">
                            Log In
                        </Link>
                        <Link to="/signup" className="px-6 py-2 bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors rounded-lg">
                            Get Started
                        </Link>
                    </div>
                </div>
            </motion.nav>

            {/* Hero */}
            <main className="pt-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[70vh]">
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={staggerContainer}
                        >
                            <motion.div
                                variants={fadeInUp}
                                transition={{ duration: 0.6 }}
                                className="inline-block px-3 py-1 bg-blue-600/10 border border-blue-600/20 text-blue-600 text-xs font-medium mb-6 uppercase tracking-wider rounded"
                            >
                                For Professionals
                            </motion.div>
                            <motion.h1
                                variants={fadeInUp}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="text-6xl md:text-8xl font-bold leading-none mb-8 text-neutral-900"
                            >
                                Your work<br />
                                <span className="text-blue-600">deserves</span><br />
                                the spotlight
                            </motion.h1>
                            <motion.p
                                variants={fadeInUp}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="text-xl text-neutral-600 mb-10 max-w-lg leading-relaxed"
                            >
                                Whether you're a designer, developer, writer, or visionary. Spotlight is the stage to showcase your work and connect with opportunities.
                            </motion.p>
                            <motion.div
                                variants={fadeInUp}
                                transition={{ duration: 0.6, delay: 0.6 }}
                                className="flex gap-4"
                            >
                                <Link to="/signup" className="px-8 py-4 bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors rounded-lg shadow-lg shadow-blue-600/30">
                                    Create Profile
                                </Link>
                                <Link to="/profile" className="px-8 py-4 border-2 border-neutral-200 text-neutral-900 font-medium hover:border-neutral-300 transition-colors rounded-lg">
                                    View Example
                                </Link>
                            </motion.div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="relative hidden lg:block"
                        >
                            <div className="aspect-square bg-neutral-50 border-2 border-neutral-200 relative overflow-hidden rounded-2xl shadow-xl">
                             
                                <div className="p-8 border-b border-neutral-200">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-2xl text-white">
                                            👤
                                        </div>
                                        <div>
                                            <div className="font-bold text-lg text-neutral-900">Alex Morgan</div>
                                            <div className="text-sm text-neutral-600">Senior Frontend Developer</div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <span className="px-2 py-1 bg-blue-50 text-xs text-blue-700 border border-blue-200 rounded">React</span>
                                        <span className="px-2 py-1 bg-blue-50 text-xs text-blue-700 border border-blue-200 rounded">TypeScript</span>
                                        <span className="px-2 py-1 bg-blue-50 text-xs text-blue-700 border border-blue-200 rounded">Node.js</span>
                                    </div>
                                </div>
   
                                <div className="p-8 space-y-4">
                                    <div className="text-sm font-medium text-neutral-600 mb-4">Featured Projects</div>
                                    <div className="bg-white p-4 border-2 border-neutral-200 rounded-lg">
                                        <div className="font-medium mb-1 text-neutral-900">E-Commerce Dashboard</div>
                                        <div className="text-xs text-neutral-500">React • Redux • Chart.js</div>
                                    </div>
                                    <div className="bg-white p-4 border-2 border-neutral-200 rounded-lg">
                                        <div className="font-medium mb-1 text-neutral-900">Task Manager App</div>
                                        <div className="text-xs text-neutral-500">Vue • Firebase</div>
                                    </div>
                                </div>
                                <motion.div
                                    animate={{ scale: [1, 1.05, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="absolute top-4 right-4 px-3 py-1 bg-blue-600 text-xs font-medium text-white rounded"
                                >
                                    LIVE PREVIEW
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>

         
                <div className="max-w-7xl mx-auto mt-40 mb-32">
                    <div className="space-y-24">
                        {/* Feature 1  */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={staggerContainer}
                            className="grid lg:grid-cols-2 gap-16"
                        >
                            <motion.div
                                variants={fadeInUp}
                                transition={{ duration: 0.6 }}
                                className="flex flex-col justify-center"
                            >
                                <div className="text-blue-600 text-sm font-medium mb-4 uppercase tracking-wider">Portfolio</div>
                                <h3 className="text-5xl font-bold mb-6 leading-tight text-neutral-900">Showcase your best work</h3>
                                <p className="text-lg text-neutral-600 leading-relaxed mb-8">
                                    Create a stunning portfolio with your projects, case studies, and achievements. Add images, links, and detailed descriptions that tell your story.
                                </p>
                                <div className="space-y-3 text-sm">
                                    <div className="flex items-center gap-3">
                                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                                        <span className="text-neutral-700">Rich media support for images and videos</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                                        <span className="text-neutral-700">Direct links to live projects and repositories</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                                        <span className="text-neutral-700">Highlight your tech stack and achievements</span>
                                    </div>
                                </div>
                            </motion.div>
                            <motion.div
                                variants={scaleIn}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="bg-neutral-50 border-2 border-neutral-200 p-8 rounded-2xl shadow-lg"
                            >
                                <div className="space-y-4">
                                
                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        className="bg-white border-2 border-neutral-200 p-6 h-48 flex flex-col justify-between relative overflow-hidden group rounded-xl hover:border-blue-300 transition-colors cursor-pointer"
                                    >
                                        <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        <div className="relative z-10">
                                            <div className="text-xs text-neutral-500 mb-2">FEATURED PROJECT</div>
                                            <div className="text-2xl font-bold mb-2 text-neutral-900">E-Commerce Platform</div>
                                            <div className="text-sm text-neutral-600">Full-stack marketplace with real-time inventory</div>
                                        </div>
                                        <div className="relative z-10 flex items-center justify-between">
                                            <div className="text-xs text-neutral-500">React • Node.js • PostgreSQL</div>
                                            <div className="flex items-center gap-2 text-sm">
                                                <span>⭐ 234</span>
                                                <span className="text-neutral-400">•</span>
                                                <span>🔱 45</span>
                                            </div>
                                        </div>
                                    </motion.div>

                             
                                    <div className="grid grid-cols-2 gap-4">
                                        <motion.div
                                            whileHover={{ scale: 1.05 }}
                                            className="bg-white border-2 border-neutral-200 p-4 h-32 flex flex-col justify-between hover:border-blue-300 transition-colors rounded-xl cursor-pointer"
                                        >
                                            <div>
                                                <div className="text-xs text-neutral-500 mb-1">PROJECT</div>
                                                <div className="font-medium text-sm text-neutral-900">Dashboard UI</div>
                                            </div>
                                            <div className="text-xs text-neutral-500">⭐ 142</div>
                                        </motion.div>
                                        <motion.div
                                            whileHover={{ scale: 1.05 }}
                                            className="bg-white border-2 border-neutral-200 p-4 h-32 flex flex-col justify-between hover:border-blue-300 transition-colors rounded-xl cursor-pointer"
                                        >
                                            <div>
                                                <div className="text-xs text-neutral-500 mb-1">PROJECT</div>
                                                <div className="font-medium text-sm text-neutral-900">Mobile App</div>
                                            </div>
                                            <div className="text-xs text-neutral-500">⭐ 89</div>
                                        </motion.div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Feature 2 */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={staggerContainer}
                            className="grid lg:grid-cols-5 gap-12 items-center"
                        >
                            <motion.div
                                variants={scaleIn}
                                transition={{ duration: 0.6 }}
                                className="lg:col-span-3 bg-neutral-50 border-2 border-neutral-200 relative overflow-hidden order-2 lg:order-1 rounded-2xl shadow-lg"
                            >
                                <div className="p-12">
                               
                                    <div className="mb-8 pb-8 border-b border-neutral-200">
                                        <div className="text-sm text-blue-600 font-medium mb-2 uppercase tracking-wider">Your Reach</div>
                                        <div className="flex items-end gap-4">
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.5 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.8, delay: 0.3 }}
                                                className="text-7xl font-bold text-blue-600"
                                            >
                                                1.2K
                                            </motion.div>
                                            <div className="text-2xl text-neutral-600 mb-2">views this month</div>
                                        </div>
                                    </div>

                                 
                                    <motion.div
                                        variants={staggerContainer}
                                        className="grid grid-cols-2 gap-6"
                                    >
                                        <motion.div variants={fadeIn}>
                                            <div className="text-3xl font-bold mb-1 text-neutral-900">89</div>
                                            <div className="text-sm text-neutral-600">Connection Requests</div>
                                        </motion.div>
                                        <motion.div variants={fadeIn}>
                                            <div className="text-3xl font-bold mb-1 text-neutral-900">23</div>
                                            <div className="text-sm text-neutral-600">Job Opportunities</div>
                                        </motion.div>
                                        <motion.div variants={fadeIn}>
                                            <div className="text-3xl font-bold mb-1 text-neutral-900">156</div>
                                            <div className="text-sm text-neutral-600">Profile Shares</div>
                                        </motion.div>
                                        <motion.div variants={fadeIn}>
                                            <div className="text-3xl font-bold mb-1 text-neutral-900">12</div>
                                            <div className="text-sm text-neutral-600">Active Conversations</div>
                                        </motion.div>
                                    </motion.div>
                                </div>
                            </motion.div>
                            <motion.div
                                variants={fadeInUp}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="lg:col-span-2 order-1 lg:order-2"
                            >
                                <div className="text-blue-600 text-sm font-medium mb-4 uppercase tracking-wider">Career</div>
                                <h3 className="text-4xl font-bold mb-6 text-neutral-900">Get discovered</h3>
                                <p className="text-lg text-neutral-600 leading-relaxed">
                                    Make your profile visible to recruiters and clients. Share your unique URL and let opportunities find you.
                                </p>
                            </motion.div>
                        </motion.div>

                        {/* Feature 3  */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={fadeInUp}
                            transition={{ duration: 0.6 }}
                            className="bg-neutral-50 border-2 border-neutral-200 p-12 lg:p-16 rounded-2xl shadow-lg"
                        >
                            <div className="max-w-3xl">
                                <div className="text-blue-600 text-sm font-medium mb-4 uppercase tracking-wider">Simple Setup</div>
                                <h3 className="text-4xl font-bold mb-6 text-neutral-900">Start in minutes</h3>
                                <p className="text-lg text-neutral-600 leading-relaxed mb-8">
                                    No complex setup. Just sign up, add your information, and you're live. Update anytime, anywhere.
                                </p>
                                <motion.div
                                    variants={staggerContainer}
                                    className="flex gap-8 text-sm"
                                >
                                    <motion.div variants={fadeIn}>
                                        <div className="text-3xl font-bold text-blue-600 mb-2">1.</div>
                                        <div className="text-neutral-600">Create account</div>
                                    </motion.div>
                                    <motion.div variants={fadeIn}>
                                        <div className="text-3xl font-bold text-blue-600 mb-2">2.</div>
                                        <div className="text-neutral-600">Add projects</div>
                                    </motion.div>
                                    <motion.div variants={fadeIn}>
                                        <div className="text-3xl font-bold text-blue-600 mb-2">3.</div>
                                        <div className="text-neutral-600">Share profile</div>
                                    </motion.div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Testimonials */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={staggerContainer}
                    className="max-w-7xl mx-auto mb-32"
                >
                    <motion.h2
                        variants={fadeInUp}
                        transition={{ duration: 0.6 }}
                        className="text-5xl md:text-6xl font-bold mb-16 text-neutral-900"
                    >
                        What people say
                    </motion.h2>
                    <motion.div
                        variants={staggerContainer}
                        className="grid md:grid-cols-3 gap-8"
                    >
                        <motion.div
                            variants={fadeInUp}
                            whileHover={{ x: 5 }}
                            className="border-l-2 border-blue-600 pl-6"
                        >
                            <p className="text-lg text-neutral-700 mb-6 leading-relaxed">
                                "Landed my dream job thanks to my Spotlight profile. Clean, professional, effective."
                            </p>
                            <div className="text-sm">
                                <div className="font-medium text-neutral-900">Sarah Chen</div>
                                <div className="text-neutral-500">UX Designer</div>
                            </div>
                        </motion.div>
                        <motion.div
                            variants={fadeInUp}
                            whileHover={{ x: 5 }}
                            className="border-l-2 border-blue-600 pl-6"
                        >
                            <p className="text-lg text-neutral-700 mb-6 leading-relaxed">
                                "Best platform for showcasing dev work. Simple, fast, and it just works."
                            </p>
                            <div className="text-sm">
                                <div className="font-medium text-neutral-900">Marcus Rodriguez</div>
                                <div className="text-neutral-500">Full-Stack Developer</div>
                            </div>
                        </motion.div>
                        <motion.div
                            variants={fadeInUp}
                            whileHover={{ x: 5 }}
                            className="border-l-2 border-blue-600 pl-6"
                        >
                            <p className="text-lg text-neutral-700 mb-6 leading-relaxed">
                                "My profile looks incredible. Got multiple client inquiries in the first week."
                            </p>
                            <div className="text-sm">
                                <div className="font-medium text-neutral-900">Emily Watson</div>
                                <div className="text-neutral-500">Content Writer</div>
                            </div>
                        </motion.div>
                    </motion.div>
                </motion.div>

               
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={scaleIn}
                    transition={{ duration: 0.6 }}
                    className="max-w-7xl mx-auto mb-32"
                >
                    <div className="bg-blue-600 p-16 lg:p-24 rounded-2xl shadow-2xl">
                        <div className="max-w-3xl">
                            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">Ready to get started?</h2>
                            <p className="text-xl text-blue-100 mb-10">
                                Join professionals who are already using Spotlight to grow their careers.
                            </p>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Link to="/signup" className="inline-block px-10 py-4 bg-white text-blue-600 font-medium hover:bg-neutral-100 transition-colors rounded-lg shadow-lg">
                                    Create Your Profile
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

                {/* Footer  */}
                <motion.footer
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-7xl mx-auto pb-16 pt-16 border-t border-neutral-200"
                >
                    <div className="grid md:grid-cols-2 gap-12 mb-12">
                        <div>
                            <div className="text-2xl font-bold mb-4 text-neutral-900">SPOTLIGHT</div>
                            <p className="text-neutral-500 text-sm max-w-sm">
                                The professional network for everyone. Showcase your work, connect with opportunities.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-8 text-sm">
                            <div>
                                <div className="font-medium mb-4 text-neutral-900">Product</div>
                                <ul className="space-y-2 text-neutral-500">
                                    <li><a href="#" className="hover:text-neutral-900 transition-colors">Features</a></li>
                                    <li><a href="#" className="hover:text-neutral-900 transition-colors">How It Works</a></li>
                                </ul>
                            </div>
                            <div>
                                <div className="font-medium mb-4 text-neutral-900">Legal</div>
                                <ul className="space-y-2 text-neutral-500">
                                    <li><a href="#" className="hover:text-neutral-900 transition-colors">Privacy</a></li>
                                    <li><a href="#" className="hover:text-neutral-900 transition-colors">Terms</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between items-center text-sm text-neutral-500 pt-8 border-t border-neutral-200">
                        <p>© 2025 Spotlight. All rights reserved.</p>
                        <div className="flex gap-6 mt-4 md:mt-0">
                            <a href="#" className="hover:text-neutral-900 transition-colors">Twitter</a>
                            <a href="#" className="hover:text-neutral-900 transition-colors">LinkedIn</a>
                            <a href="#" className="hover:text-neutral-900 transition-colors">GitHub</a>
                        </div>
                    </div>
                </motion.footer>
            </main>
        </div>
    )
}

export default LandingPage
