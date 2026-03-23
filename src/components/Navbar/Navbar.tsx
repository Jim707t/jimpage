import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faXTwitter } from "@fortawesome/free-brands-svg-icons";

export default function Navbar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="backdrop-blur-md bg-space-dark/40 border-b border-nebula-primary/20"
    >
      <div className="container mx-auto px-6 py-6 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        <div className="flex flex-col space-y-3 text-center md:text-left">
          <motion.div
            className="relative inline-block group"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold tracking-tight font-mono">
              Jim Nemorin<span className="text-space-accent animate-pulse-slow">_</span>
            </h1>
            <div className="absolute -inset-0.5 bg-gradient-to-r from-nebula-primary to-space-accent opacity-10 blur group-hover:opacity-20 transition duration-1000 group-hover:duration-200" />
          </motion.div>

          <motion.p
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-sm text-space-light/70 font-mono"
          >
            <span className="text-nebula-primary">&gt;</span> agentic coder, builder
          </motion.p>

          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex space-x-5 justify-center md:justify-start"
          >
            {[
              { icon: faGithub, href: "https://github.com/jim707t", label: "GitHub" },
              { icon: faXTwitter, href: "https://x.com/jimnemorin", label: "X" },
            ].map((social) => (
              <motion.a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="group relative text-white"
                whileHover={{ scale: 1.1 }}
              >
                <FontAwesomeIcon icon={social.icon} size="lg" className="relative z-10" />
                <div className="absolute -inset-2 bg-current opacity-10 blur-sm rounded-full transition-opacity group-hover:opacity-20" />
              </motion.a>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ scale: 0.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="flex justify-center md:justify-end"
        >
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-nebula-primary to-space-accent rounded-full opacity-30 blur-xl transition-all duration-500 group-hover:opacity-50" />
            <div className="relative">
              <Image
                src="/assets/pfr.jpg"
                alt="Profile"
                width={200}
                height={200}
                className="relative z-10 rounded-full border-2 border-nebula-secondary/30 shadow-lg grayscale hover:grayscale-0 transition-all duration-300"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-nebula-primary to-space-accent opacity-20 blur-xl transition-opacity group-hover:opacity-30" />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}