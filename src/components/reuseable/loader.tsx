import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-[9999]">
      <Link
        to="/"
        className="text-2xl font-bold tracking-tighter flex items-center gap-2 text-blue-600"
      >
        {/* Pulsing dot */}
        <motion.div
          animate={{
            scale: [1, 1.6, 1],
            opacity: [1, 0.6, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-3 h-3 bg-blue-600 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.5)]"
        />

        {/* Brand */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          SPOTLIGHT
        </motion.span>
      </Link>
    </div>
  );
}
