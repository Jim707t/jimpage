import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './Navbar/Navbar';

export default function Layout({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.3;
      if (isPlaying) {
        audio.play().catch((error) => {
          console.log('Autoplay prevented:', error);
        });
      } else {
        audio.pause();
      }
    }
  }, [isPlaying]);

  const togglePlay = () => {
    setIsPlaying(prevIsPlaying => !prevIsPlaying);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#000000] via-[#0a0a0f] to-[#0f0f1a] text-gray-300">
      <Navbar />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-4 right-4 z-50"
      >
        <button
          onClick={togglePlay}
          className="px-4 py-2 bg-transparent border border-gray-800 text-gray-500 rounded-full hover:bg-gray-900/30 focus:outline-none transition-colors"
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>
      </motion.div>
      <audio ref={audioRef} loop>
        <source src="/assets/background-music.mp3" type="audio/mpeg" />
      </audio>
      <AnimatePresence mode="wait">
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 py-8"
        >
          {children}
        </motion.main>
      </AnimatePresence>
    </div>
  );
}