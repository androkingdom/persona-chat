"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function PageTransitionWrapper({ children }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <div
        className="
    min-h-screen 
    overflow-hidden 
    bg-gradient-to-br from-gray-900 via-gray-800 to-black
    relative
    text-gray-100
  "
      >
        {/* Optional background glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] bg-blue-500/10 rounded-full blur-2xl"></div>
        </div>
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: "100%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="min-h-screen"
        >
          {children}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
