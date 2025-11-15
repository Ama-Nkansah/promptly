"use client";

import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import { useState } from "react";
import Link from "next/link";

//type SplashProps = { userId?: string };

export const metadata = {
   title: "splash screen",
    description: "splash screen for promptly",
}

export default function SplashScreen() {
  const [showSlogan, setShowSlogan] = useState(false);

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-white text-gray-900">
      {/* Typewriter animation for "Promptly" */}
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-6xl md:text-7xl font-bold tracking-tight"
      >
        <Typewriter
          options={{
            delay: 80,
            cursor: "_",
          }}
          onInit={(typewriter) => {
            typewriter
              .typeString("Promptly")
              .pauseFor(400)
              .callFunction(() => setShowSlogan(true))
              .start();
          }}
        />
      </motion.h1>

      {/* Fade-in slogan */}
      {showSlogan && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="mt-6 text-lg md:text-xl text-gray-700 text-center max-w-md"
        >
          Generate ready-to-publish blog posts in seconds.
        </motion.p>
      )}

      {/* Fade-in button */}
      {showSlogan && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <Link href="/generate">
            <button className="mt-10 px-6 py-3 text-white rounded-full bg-gray-900 hover:bg-gray-700 transition-all duration-200 text-lg font-medium shadow-lg">
              Generate a Blog
            </button>
          </Link>
        </motion.div>
      )}
    </main>
  );
}
