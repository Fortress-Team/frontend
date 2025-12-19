// import React from 'react'
import { motion } from "framer-motion";
import {
  fadeIn,
  fadeInUp,
  scaleIn,
  staggerContainer,
} from "../../../lib/motion";
// import CountUp from "react-countup";

const Features = () => {
  return (
    <section className="max-w-8xl mx-auto mt-20 md:mt-40 mb-32">
      <div className="space-y-24 px-5">
        {/* Feature 1  */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid lg:grid-cols-2 gap-12 lg:gap-16"
        >
          <motion.div
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <div
              className="inline-block px-3 py-1 bg-blue-600/10 uppercase
                                 border-blue-600/20 text-blue-600 text-xs font-medium mb-6 
                                  tracking-wider rounded max-w-24"
            >
              Portfolio
            </div>
            <h3 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 leading-tight text-neutral-900">
              Showcase your best work
            </h3>
            <p className="text-base md:text-lg text-neutral-600 leading-relaxed mb-6 md:mb-8">
              Create a stunning portfolio with your projects, case studies, and
              achievements. Add images, links, and detailed descriptions that
              tell your story.
            </p>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                <span className="text-neutral-700">
                  Rich media support for images and videos
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                <span className="text-neutral-700">
                  Direct links to live projects and repositories
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                <span className="text-neutral-700">
                  Highlight your tech stack and achievements
                </span>
              </div>
            </div>
          </motion.div>
          <motion.div
            variants={scaleIn}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-neutral-50 border-2 border-neutral-200 p-6 md:p-8 rounded-2xl shadow-lg"
          >
            <div className="space-y-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white border-2 border-neutral-200 p-4 md:p-6 h-auto md:h-48 flex flex-col justify-between relative overflow-hidden group rounded-xl hover:border-blue-300 transition-colors cursor-pointer"
              >
                <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10 mb-4">
                  <div className="text-[10px] md:text-xs text-neutral-500 mb-2 font-bold uppercase tracking-wider">
                    Featured Project
                  </div>
                  <div className="text-2xl md:text-2xl font-bold mb-2 text-neutral-900">
                    E-Commerce Platform
                  </div>
                  <div className="text-sm md:text-base text-neutral-600">
                    Full-stack marketplace with real-time inventory
                  </div>
                </div>
                <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-auto">
                  <div className="text-xs md:text-xs text-neutral-500 font-medium whitespace-nowrap overflow-hidden text-ellipsis">
                    React • Node.js • PostgreSQL
                  </div>
                  <div className="flex items-center gap-3 text-sm text-neutral-600">
                    <span className="flex items-center gap-1">⭐ 234</span>
                    <span className="text-neutral-400">•</span>
                    <span className="flex items-center gap-1">🔱 45</span>
                  </div>
                </div>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white border-2 border-neutral-200 p-5 h-auto md:h-32 flex flex-col justify-between hover:border-blue-300 transition-colors rounded-xl cursor-pointer"
                >
                  <div className="mb-4">
                    <div className="text-[10px] md:text-xs text-neutral-500 mb-1 font-bold uppercase tracking-wider">
                      Project
                    </div>
                    <div className="font-bold text-base md:text-sm text-neutral-900">
                      Dashboard UI
                    </div>
                  </div>
                  <div className="text-sm md:text-xs text-neutral-500 font-medium">
                    ⭐ 142
                  </div>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white border-2 border-neutral-200 p-5 h-auto md:h-32 flex flex-col justify-between hover:border-blue-300 transition-colors rounded-xl cursor-pointer"
                >
                  <div className="mb-4">
                    <div className="text-[10px] md:text-xs text-neutral-500 mb-1 font-bold uppercase tracking-wider">
                      Project
                    </div>
                    <div className="font-bold text-base md:text-sm text-neutral-900">
                      Mobile App
                    </div>
                  </div>
                  <div className="text-sm md:text-xs text-neutral-500 font-medium">
                    ⭐ 89
                  </div>
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
            <div className=" p-6 md:p-12">
              <div className="mb-8 pb-8 border-b border-neutral-200">
                <div className="text-sm text-blue-600 font-medium mb-2 uppercase tracking-wider">
                  Your Reach
                </div>
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
                  <div className="text-2xl text-neutral-600 mb-2">
                    views this month
                  </div>
                </div>
              </div>

              <motion.div
                variants={staggerContainer}
                className="grid grid-cols-2 gap-6"
              >
                <motion.div variants={fadeIn}>
                  <div className="text-3xl font-bold mb-1 text-neutral-900">
                    89
                  </div>
                  <div className="text-sm text-neutral-600">
                    Connection Requests
                  </div>
                </motion.div>
                <motion.div variants={fadeIn}>
                  <div className="text-3xl font-bold mb-1 text-neutral-900">
                    23
                  </div>
                  <div className="text-sm text-neutral-600">
                    Job Opportunities
                  </div>
                </motion.div>
                <motion.div variants={fadeIn}>
                  <div className="text-3xl font-bold mb-1 text-neutral-900">
                    156
                  </div>
                  <div className="text-sm text-neutral-600">Profile Shares</div>
                </motion.div>
                <motion.div variants={fadeIn}>
                  <div className="text-3xl font-bold mb-1 text-neutral-900">
                    12
                  </div>
                  <div className="text-sm text-neutral-600">
                    Active Conversations
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
          <motion.div
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 order-1 lg:order-2"
          >
            <div
              className="inline-block px-3 py-1 bg-blue-600/10 uppercase
                                 border-blue-600/20 text-blue-600 text-xs font-medium mb-6 
                                  tracking-wider rounded max-w-24"
            >
              Career
            </div>
            <h3 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-neutral-900">
              Get discovered
            </h3>
            <p className="text-base md:text-lg text-neutral-600 leading-relaxed">
              Make your profile visible to recruiters and clients. Share your
              unique URL and let opportunities find you.
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
          className="bg-neutral-50 border-2 border-neutral-200 p-6 md:p-12 lg:p-16 
                            rounded-2xl shadow-lg"
        >
          <div className="max-w-3xl">
            <div className="text-blue-600 text-sm font-medium mb-4 uppercase tracking-wider">
              Simple Setup
            </div>
            <h3 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-neutral-900">
              Start in minutes
            </h3>
            <p className="text-base md:text-lg text-neutral-600 leading-relaxed mb-6 md:mb-8">
              No complex setup. Just sign up, add your information, and you're
              live. Update anytime, anywhere.
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
    </section>
  );
};

export default Features;
