import  { useState } from 'react'
import {AnimatePresence, motion} from 'framer-motion'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const Header = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false)

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
                    <div className="hidden md:flex gap-6 items-center">
                        <Link to="/login" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">
                            Log In
                        </Link>
                        <Link to="/signup" className="px-6 py-2 bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors rounded-lg">
                            Get Started
                        </Link>
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
                                    className="fixed inset-0 bg-white z-[100] flex flex-col md:hidden"
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
                                      
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
</section>
  )
}

export default Header
