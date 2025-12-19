// import React from 'react'
import {motion} from 'framer-motion'
import { scaleIn } from '../../../lib/motion'
import { Link } from 'react-router-dom'

const Cta = () => {
  return (
<section className='px-5'>
         <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={scaleIn}
                    transition={{ duration: 0.6 }}
                    className="max-w-8xl mx-auto mb-32"
                >
                    <div className="bg-blue-600 p-6 md:p-16 lg:p-24 rounded-2xl shadow-2xl">
                        <div className="max-w-3xl">
                <h2 className="text-3xl md:text-6xl font-bold mb-4 md:mb-6 text-white text-center md:text-left">Ready to get started?</h2>
                            <p className="text-lg md:text-xl text-blue-100 mb-8 md:mb-10 text-center md:text-left">
                                Join professionals who are already using Spotlight to grow their careers.
                            </p>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex justify-center md:justify-start">
                                <Link to="/signup" className="inline-block px-8 py-3.5 md:px-10 md:py-4 bg-white text-blue-600 font-medium hover:bg-neutral-100 transition-colors rounded-lg shadow-lg">
                                    Create Your Profile
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
</section>
  )
}

export default Cta
