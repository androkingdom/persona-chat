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
          initial={{ opacity: 0, y: 80 }}     // start further down
          animate={{ opacity: 1, y: 0 }}      // slide up to normal position
          exit={{ opacity: 0, y: -80 }}       // slide up & fade when leaving
          transition={{
            duration: 0.5,                    // a bit longer for smoothness
            ease: [0.25, 0.8, 0.25, 1],       // smooth bezier curve
          }}
          className="min-h-screen"
        >
          {children}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
