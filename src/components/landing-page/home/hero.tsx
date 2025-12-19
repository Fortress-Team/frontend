// import React from 'react'
import {motion} from 'framer-motion'
import { fadeInUp, staggerContainer } from '../../../lib/motion'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
     <section className="max-w-8xl mx-auto min-h-[60vh] md:mt-[150px] mt-[150px] w-full">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 
                    items-center px-5  ">
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={staggerContainer}
                        >
                            <motion.div
                                variants={fadeInUp}
                                transition={{ duration: 0.6 }}
                                className="inline-block px-3 py-1 bg-blue-600/10 
                                 border-blue-600/20 text-blue-600 text-xs font-medium mb-6 
                                  tracking-wider rounded"
                            >
                                For Professionals
                            </motion.div>
                            <motion.h1
                                variants={fadeInUp}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="text-4xl sm:text-5xl md:text-8xl font-bold leading-tight md:leading-none mb-6 md:mb-8 text-neutral-900"
                            >
                                Your work <br className='hidden md:block' />
                                <span className="text-blue-600">deserves</span><br />
                                the spotlight
                            </motion.h1>
                            <motion.p
                                variants={fadeInUp}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="text-lg md:text-xl text-neutral-600 mb-8 md:mb-10 max-w-lg leading-relaxed"
                            >
                                Whether you're a designer, developer, writer, or visionary. Spotlight is the stage to showcase your work and connect with opportunities.
                            </motion.p>
                            <motion.div
                                variants={fadeInUp}
                                transition={{ duration: 0.6, delay: 0.6 }}
                                className="flex flex-col sm:flex-row gap-4"
                            >
                                <Link to="/signup" className="px-6 py-3.5 md:px-8 md:py-4 bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors rounded-lg shadow-lg shadow-blue-600/30 text-center">
                                    Create Profile
                                </Link>
                                <Link to="/profile" className="px-6 py-3.5 md:px-8 md:py-4 border-2 border-neutral-200 text-neutral-900 font-medium hover:border-neutral-300 transition-colors rounded-lg text-center">
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
                                            <div className="font-bold text-lg text-neutral-900">Adewale Ramadan</div>
                                            <div className="text-sm text-neutral-600">Junior Frontend Developer</div>
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
                </section>
  )
}

export default Hero
