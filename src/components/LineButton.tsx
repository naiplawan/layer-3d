"use client";

import { motion } from "motion/react";

export function LineIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 3C6.48 3 2 6.6 2 11.03c0 3.97 3.55 7.3 8.35 7.93.33.07.77.22.88.5.1.25.07.65.03.9l-.14.85c-.04.25-.2.98.86.53 1.06-.44 5.72-3.37 7.8-5.77C21.24 14.4 22 12.8 22 11.03 22 6.6 17.52 3 12 3Zm-3.6 10.3H6.4a.53.53 0 0 1-.53-.53V8.8a.53.53 0 0 1 1.06 0v3.44H8.4a.53.53 0 0 1 0 1.06Zm2.07-.53a.53.53 0 0 1-1.06 0V8.8a.53.53 0 0 1 1.06 0v3.97Zm4.8 0a.53.53 0 0 1-.95.32l-2.04-2.78v2.46a.53.53 0 0 1-1.06 0V8.8a.53.53 0 0 1 .95-.32l2.04 2.78V8.8a.53.53 0 0 1 1.06 0v3.97Zm3.23-2.51a.53.53 0 0 1 0 1.06h-1.47v.92h1.47a.53.53 0 0 1 0 1.06h-2a.53.53 0 0 1-.53-.53V8.8c0-.29.24-.53.53-.53h2a.53.53 0 0 1 0 1.06h-1.47v.93h1.47Z" />
    </svg>
  );
}

// Floating "add us on LINE" button, a staple of Thai SME sites
export default function LineButton() {
  return (
    <motion.a
      href="#quote"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.2, type: "spring", stiffness: 260, damping: 18 }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.95 }}
      className="fixed right-4 bottom-4 z-50 flex items-center gap-2 rounded-full bg-line-green py-3 pr-5 pl-4 font-semibold text-white shadow-lg shadow-black/15 md:right-6 md:bottom-6"
    >
      <LineIcon className="size-6" />
      แอดไลน์
    </motion.a>
  );
}
