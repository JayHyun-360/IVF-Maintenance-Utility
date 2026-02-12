"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface BackButtonProps {
  className?: string;
  fallback?: string;
  label?: string;
}

export default function BackButton({
  className = "",
  fallback = "/",
  label = "Back",
}: BackButtonProps) {
  const router = useRouter();

  const handleBack = () => {
    // Check if we came from the same domain and have history
    if (typeof window !== "undefined" && window.history.length > 2) {
      router.back();
    } else {
      // Fallback to provided route
      router.push(fallback);
    }
  };

  return (
    <motion.button
      onClick={handleBack}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:text-gray-100 hover:bg-white/10 transition-all duration-300 ${className}`}
      whileHover={{ scale: 1.02, x: -2 }}
      whileTap={{ scale: 0.95 }}
      title="Go back"
    >
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 19l-7-7 7-7"
        />
      </svg>
      <span className="text-sm font-medium">{label}</span>
    </motion.button>
  );
}
