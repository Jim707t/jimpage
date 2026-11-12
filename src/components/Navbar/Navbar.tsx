import React from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="backdrop-blur-md bg-space-dark/40 border-b border-nebula-primary/20"
    >
      <div className="container mx-auto px-6 py-8 flex flex-col items-center space-y-3 text-center">
        <motion.div
          className="relative inline-block group"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold tracking-tight font-mono">
            Jim Nemorin<span className="text-space-accent animate-pulse-slow">_</span>
          </h1>
          <div className="absolute -inset-0.5 bg-gradient-to-r from-nebula-primary to-space-accent opacity-10 blur group-hover:opacity-20 transition duration-1000 group-hover:duration-200" />
        </motion.div>

        <motion.p
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-sm text-space-light/70 font-mono"
        >
          <span className="text-nebula-primary">&gt;</span> agentic coder, builder
        </motion.p>
      </div>
    </motion.div>
  );
}
