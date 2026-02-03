// import React from "react";

import { motion } from "framer-motion";
import { MapPin, Star, Briefcase, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { Project } from "../../../types";
import type { Skill } from "../../../types/skill.type";



// Define props interface
interface CardProps {
  talent: {
    _id: string;
    fullName: string;
    role?: string;
    profRole?: string;
    desc?: string;
    skills?: Skill[] | string[];
    projects?: Project[];
  };
  index: number;
  getInitials: (name: string) => string;
}

const Card = ({ talent, index, getInitials }: CardProps) => {


const formatTitle = (text?: string) => {
  if (!text) return "Developer";

  return text
    .split(" ")
    .filter(Boolean) 
    .map(word => word[0].toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};



  return (
    <motion.div
      key={talent._id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group bg-white border-2 border-neutral-200 rounded-3xl p-6 hover:border-blue-300 transition-all hover:shadow-xl hover:shadow-blue-600/5 relative overflow-hidden"
    >
      <div className="flex items-start gap-4 mb-6">
        <div className="h-20 w-20 rounded-2xl bg-blue-100 border-2 border-blue-200 flex items-center justify-center text-2xl font-bold text-blue-600 shadow-inner group-hover:scale-110 transition-transform">
          {getInitials(talent.fullName)}
        </div>
        <div>
          <h3 className="text-xl font-bold text-neutral-900 mb-1 group-hover:text-blue-600 transition-colors">
            {formatTitle(talent.fullName)}
          </h3>
          <p className="text-blue-600 text-sm font-semibold">  {formatTitle(talent.profRole)}</p>
        </div>
      </div>

      <div className="space-y-4 mb-8">
        <div className="flex items-center gap-2 text-neutral-500 text-xs">
          <MapPin size={14} />
          Remote
        </div>
        <p className="text-sm text-neutral-600 line-clamp-2 leading-relaxed">
          {talent.desc || "No bio provided yet."}
        </p>
      </div>


{/* skills */}
 <div className="flex flex-wrap gap-2 mb-8">
  {talent.skills?.length ? (
    talent.skills.map((skill) => {
      if (typeof skill === 'string') {
        return (
          <span
            key={skill}
            className="px-3 py-1 bg-neutral-50 border border-neutral-200 rounded-lg text-[10px] font-bold text-neutral-500 transition-colors group-hover:bg-blue-50 group-hover:border-blue-100 group-hover:text-blue-700"
          >
            {skill}
          </span>
        )
      } else {
        return (
          <span
            key={skill._id}
            className="px-3 py-1 bg-neutral-50 border border-neutral-200 rounded-lg text-[10px] font-bold text-neutral-500 transition-colors group-hover:bg-blue-50 group-hover:border-blue-100 group-hover:text-blue-700"
          >
            {skill.title}
          </span>
        )
      }
    })
  ) : (
    <span className="text-xs text-neutral-400">No skills added</span>
  )}
</div>


      <div className="flex items-center justify-between pt-6 border-t border-neutral-100">
        <div className="flex gap-3">
          <div className="flex items-center gap-1 text-xs font-bold text-neutral-400">
            <Star size={14} className="text-yellow-400 fill-yellow-400" />
            <span className="text-neutral-900">0</span>
          </div>
          <div className="flex items-center gap-1 text-xs font-bold text-neutral-400">
            <Briefcase size={14} />
            <span className="text-neutral-900">
              {talent.projects?.length || 0} Projects
            </span>
          </div>
        </div>

        <Link
          to={`/profile/${talent._id}`}
          className="flex items-center gap-1 text-sm font-bold text-blue-600 hover:gap-2 transition-all"
        >
          Profile <ArrowRight size={16} />
        </Link>
      </div>
    </motion.div>
  );
};

export default Card;
