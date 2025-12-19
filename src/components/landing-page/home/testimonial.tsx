// import React from 'react'
import {motion} from 'framer-motion'
import { fadeInUp, staggerContainer } from '../../../lib/motion'

const Testimonial = () => {
  return (
    <section className='w-full'>
          <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={staggerContainer}
                    className="max-w-8xl mx-auto mb-32 px-5"
                >
                    <motion.h2
                        variants={fadeInUp}
                        transition={{ duration: 0.6 }}
                        className="text-3xl md:text-6xl font-bold mb-10 md:mb-16 text-neutral-900"
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
                                <div className="font-medium text-neutral-900">Flourence</div>
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
                                <div className="font-medium text-neutral-900">Teitei Wisdom</div>
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
                                <div className="font-medium text-neutral-900">Big Anny</div>
                                <div className="text-neutral-500">Content Writer</div>
                            </div>
                        </motion.div>
                    </motion.div>
                </motion.div>
                </section>
  )
}

export default Testimonial
