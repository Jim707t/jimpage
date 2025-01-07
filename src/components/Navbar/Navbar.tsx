import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faXTwitter, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";

export default function Navbar() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="bg-[#0a0a0f] border-b border-gray-900/30 shadow-lg"
    >
      <div className="container mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="flex flex-col space-y-4 text-center md:text-left">
          <motion.h1 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-4xl font-bold text-gray-300 tracking-tight"
          >
            Jim Nemorin
          </motion.h1>
          <motion.p 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-lg text-gray-500 font-mono"
          >
            {"Pi gro batay m fe se avek tet mwen>"}
          </motion.p>
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex space-x-4 justify-center md:justify-start"
          >
            <a href="https://github.com/jim707t" target="_blank" className="text-gray-600 hover:text-gray-400 transition-colors">
              <FontAwesomeIcon icon={faGithub} size="2x" />
            </a>
            <a href="https://twitter.com/jimnemorin" target="_blank" className="text-gray-600 hover:text-gray-400 transition-colors">
              <FontAwesomeIcon icon={faXTwitter} size="2x" />
            </a>
            <a href="https://www.linkedin.com/in/jim-quincy-nemorin-7106b2280" target="_blank" className="text-gray-600 hover:text-gray-400 transition-colors">
              <FontAwesomeIcon icon={faLinkedinIn} size="2x" />
            </a>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ scale: 0.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="flex justify-center md:justify-end"
        >
          <div className="relative">
            <div className="absolute -inset-1 bg-gray-900/50 rounded-full blur-xl"></div>
            <Image
              src="/assets/pfr.jpg"
              alt="Profile"
              width={250}
              height={250}
              className="relative z-10 rounded-full border-4 border-gray-900/50 shadow-lg grayscale-3 hover:grayscale-0 transition-all duration-300"
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}