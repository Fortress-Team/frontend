import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useTalentStore } from "../../store/talentStore";
import Loader from "../reuseable/loader";
import { ChevronDown, Compass, LogOut, UserIcon } from "lucide-react";
import { useAuthStore } from "../../store/authStore";
import { AnimatePresence, motion } from "framer-motion";
import type { Experience, Project, User } from "../../types";
import type { Skill } from "../../types/skill.type";
import Footer from "../reuseable/footer";



const UserProfileDetails = () => {
  const { id } = useParams<{ id: string }>();

  const { loading, fetchSingleTalent, talent } = useTalentStore();

  useEffect(() => {
    if (!id) return;
    fetchSingleTalent(id);
  }, [id, fetchSingleTalent]);

  if (loading) return <Loader />;

  if (!talent) {
    return (
      <div className="min-h-screen flex items-center justify-center text-neutral-500">
        User not found
      </div>
    );
  }

  console.log('Talent details:', talent)

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans pb-20 gap-20">
      {/* Navbar */}

      {/* i want to pass telent into nav */}
      <Navs talent={talent} />

  

      <div className="max-w-7xl mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT COLUMN */}
        <div className="lg:col-span-1 space-y-8">
          {/* ABOUT */}
          <div className="p-6 rounded-2xl bg-white border-2 border-neutral-200 shadow-sm">
            <h3 className="text-xl font-bold mb-4 text-neutral-900">About</h3>

            <p className="text-neutral-600 leading-relaxed text-sm">
              {talent.bio && talent.bio.length > 0
                ? talent.bio
                : "No bio provided yet."}
            </p>

            {/* LINKS */}
            <div className="mt-6 flex flex-wrap gap-4 text-neutral-600">
              {talent.links && talent.links.length > 0 ? (
                talent.links.map((link, index) => (
                  <div key={index} className="flex gap-4 flex-wrap">
                    {link.github && (
                      <a
                        href={link.github}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-blue-600 transition-colors flex items-center gap-2 text-sm font-medium"
                      >
                        Github
                      </a>
                    )}

                    {link.linkedin && (
                      <a
                        href={link.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-blue-600 transition-colors flex items-center gap-2 text-sm font-medium"
                      >
                        LinkedIn
                      </a>
                    )}

                    {link.X && (
                      <a
                        href={link.X}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-blue-600 transition-colors flex items-center gap-2 text-sm font-medium"
                      >
                        Twitter
                      </a>
                    )}

                    {link.portfolio && (
                      <a
                        href={link.portfolio}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-blue-600 transition-colors flex items-center gap-2 text-sm font-medium"
                      >
                        Portfolio
                      </a>
                    )}
                  </div>
                ))
              ) : (
                <span className="text-sm text-neutral-400">
                  No links added yet
                </span>
              )}
            </div>
          </div>

          {/* SKILLS */}
          <div className="p-6 rounded-2xl bg-white border-2 border-neutral-200 shadow-sm">
            <h3 className="text-xl font-bold mb-4 text-neutral-900">Skills</h3>

            <div className="flex flex-wrap gap-2">
              {Array.isArray(talent.skills) &&
                talent.skills.length > 0 &&
                typeof talent.skills[0] !== "string" ? (
                (talent.skills as Skill[]).map(
                  (skill: Skill

                  ) => (
                    <span
                      key={skill._id}
                      className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg text-xs font-medium text-blue-700 transition-colors cursor-default"
                    >
                      {skill.title ?? ''}
                    </span>
                  ))
              ) : (
                <span className="text-sm text-neutral-400">
                  No skills added yet
                </span>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-2 space-y-8">
          {/* PROJECTS */}
          <div>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-neutral-900">
              Featured Projects
              <span className="text-neutral-400 text-sm font-normal">
                ({talent.projects?.length || 0})
              </span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Array.isArray(talent.projects) &&
                talent.projects.length > 0 &&
                typeof talent.projects[0] !== "string" ? (
                (talent.projects as Project[]).map(
                  (project: Project

                  ) => (
                    <div
                      key={project._id}
                      className="group p-5 rounded-2xl bg-white border-2 border-neutral-200 hover:border-blue-300 transition-all hover:shadow-lg"
                    >
                      <div className="h-40 w-full rounded-xl bg-neutral-100 mb-4 overflow-hidden relative border border-neutral-200">
                        {project.projectImg && (
                          <img
                            src={project.projectImg}
                            alt={project.title}
                            className="h-full w-full object-cover"
                          />
                        )}
                      </div>

                      <h4 className="text-lg font-bold mb-2 text-neutral-900 group-hover:text-blue-600 transition-colors">
                        {project.title}
                      </h4>

                      <p className="text-neutral-600 text-sm mb-4 line-clamp-2">
                        {project.desc}
                      </p>

                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noreferrer"
                          className="text-sm font-medium text-blue-600 hover:underline"
                        >
                          View Project →
                        </a>
                      )}
                    </div>
                  ))
              ) : (
                <div className="text-neutral-400 text-sm">
                  No projects added yet
                </div>
              )}
            </div>
          </div>

          {/* EXPERIENCE */}
          <div>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-neutral-900">
              Experience
              <span className="text-neutral-400 text-sm font-normal">
                ({talent.experiences?.length || 0})
              </span>
            </h3>

            <div className="space-y-6">
              {Array.isArray(talent.experiences) &&
                talent.experiences.length > 0 &&
                typeof talent.experiences[0] !== "string" ? (
                (talent.experiences as Experience[]).map(
                  (exp: Experience) => (
                    <div
                      key={exp._id}
                      className="p-6 rounded-2xl bg-white border-2 border-neutral-200 hover:border-neutral-300 transition-colors shadow-sm"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                        <h4 className="text-lg font-bold text-neutral-900">
                          {exp.position}
                        </h4>
                        <span className="text-sm text-neutral-500 font-medium">
                          {exp.date}
                        </span>
                      </div>

                      <div className="text-neutral-700 text-sm font-medium mb-4">
                        {exp.title}
                      </div>

                      <p className="text-neutral-600 text-sm leading-relaxed">
                        {exp.desc ?? ''}
                      </p>
                    </div>
                  ))
              ) : (
                <div className="text-neutral-400 text-sm">
                  No experience added yet
                </div>
              )}
            </div>

          </div>


        </div>
      </div>

<div className="mt-10">
      <Footer  />
</div>

    </div>
  );
};

export default UserProfileDetails;








type NavsProps = {
  talent: User;
};

const Navs = ({ talent }: NavsProps) => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuthStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     navigate("/login");
  //   }
  // }, [isAuthenticated, navigate]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!talent) {
    return (
      <div className="min-h-screen bg-white text-neutral-900 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <>
      {/* NAVBAR */}
      <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-sm border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link
            to="/"
            className="text-2xl font-bold flex items-center gap-2 text-blue-600"
          >
            <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
            SpotLight
          </Link>

          <div className="flex items-center gap-8">
            <Link
              to="/explore"
              className="hidden md:block text-sm font-medium text-neutral-500 hover:text-blue-600 transition-colors"
            >
              Home
            </Link>

            <Link
              to="/explore"
              className="hidden md:block text-sm font-medium text-neutral-500 hover:text-blue-600 transition-colors"
            >
              Explore
            </Link>

            {/* PROFILE DROPDOWN */}
            {!user ? (
              <Link
                to="/login"
                className="px-5 py-2.5 bg-neutral-900 text-white rounded-xl hover:bg-neutral-800 transition-colors"
              >
                Log In
              </Link>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 hover:bg-neutral-50 rounded-xl transition-colors group"
                >
                  <div className="h-9 w-9 rounded-full bg-blue-600 border-2 border-blue-100 flex items-center justify-center text-sm font-bold text-white shadow-sm">
                    {user.fullName.charAt(0).toUpperCase()}
                  </div>
                  <ChevronDown
                    size={18}
                    className={`text-neutral-400 group-hover:text-neutral-600 transition-transform duration-200 ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="absolute right-0 mt-2 w-56 bg-white border border-neutral-200 rounded-2xl shadow-xl py-2 z-50"
                    >
                      <div className="px-4 py-3 border-b border-neutral-100 mb-2">
                        <p className="text-sm font-bold text-neutral-900 truncate">
                          {user.fullName}
                        </p>
                        <p className="text-xs text-neutral-500 truncate">
                          {user.email}
                        </p>
                      </div>

                           <Link
                                            to="/profile"
                                            onClick={() => setIsDropdownOpen(false)}
                                            className="flex items-center gap-3 px-4 py-2 
                                            text-sm text-neutral-700 hover:bg-neutral-50
                                             hover:text-blue-600 transition-colors "
                                        >
                                            <UserIcon size={18} />
                                            Profile
                                        </Link>

                      <Link
                        to="/explore"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-blue-600 transition-colors md:hidden"
                      >
                        <Compass size={18} />
                        Explore
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors mt-2 border-t border-neutral-100 pt-3"
                      >
                        <LogOut size={18} />
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* PROFILE HEADER */}
      <div className="pt-20">
        <div className="h-60 w-full bg-linear-to-br from-blue-50 to-white border-b border-neutral-200 relative overflow-hidden">
          {talent.avatar ? (
            <img src={talent.avatar} alt="" className="w-full max-w-full" />
          ) : (
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(37,99,235,0.1),transparent_50%)]"></div>
          )}
        </div>

        <div className="max-w-7xl mx-auto px-6 -mt-20 relative z-10">
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-end">
            <div className="h-40 w-40 rounded-full bg-white border-4 border-white shadow-xl">
              <div className="h-full w-full rounded-full bg-blue-100 flex items-center justify-center text-5xl overflow-hidden border-2 border-blue-200">
                <span className="text-blue-600 font-bold">
                  {talent.fullName.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>

            <div className="mb-4 flex-1 text-center md:text-left">
              <h1 className="text-4xl font-bold text-neutral-900 mb-1">
                {talent.fullName}
              </h1>
              <p className="text-neutral-700 font-medium text-lg">
                {talent.profRole || ""}
              </p>
              <p className="text-neutral-500 text-sm">
                {talent.email} • Joined{" "}
                {talent.createdAt
                  ? new Date(talent.createdAt).toLocaleDateString("en", {
                      month: "short",
                      year: "numeric",
                    })
                  : ""}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};




