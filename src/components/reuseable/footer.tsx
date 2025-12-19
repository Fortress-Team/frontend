// import React from 'react'
import {motion} from 'framer-motion'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
   <motion.footer
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-8xl mx-auto pb-16 pt-16 border-t border-neutral-200 px-5 w-full"
                >
                    <div className="grid md:grid-cols-2 gap-12 mb-12">
                        <div>
                              <Link to="/" className="text-2xl font-bold tracking-tighter flex items-center gap-2 text-blue-600 z-50 relative">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="w-3 h-3 bg-blue-600 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.5)]"
                        ></motion.div>
                        SPOTLIGHT
                    </Link>
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
  )
}

export default Footer
