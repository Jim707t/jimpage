import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './Navbar/Navbar';
import HexBackground from './HexBackground/HexBackground';
import CircuitOverlay from './CircuitOverlay/CircuitOverlay';
import ThoughtSpace from './ThoughtSpace/ThoughtSpace';


export default function Layout({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.3;
      // Load the audio first
      audio.load();
      
      // Try to play when loaded
      const playAudio = () => {
        if (isPlaying) {
          audio.play().catch((error) => {
            console.log('Autoplay prevented:', error);
          });
        }
      };
      
      // Listen for when audio can play
      audio.addEventListener('canplaythrough', playAudio, { once: true });
      
      return () => {
        audio.removeEventListener('canplaythrough', playAudio);
      };
    }
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
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
    <div className="min-h-screen bg-black text-gray-300">
      <Navbar />
      <HexBackground />
      <CircuitOverlay />
      <ThoughtSpace />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-4 right-4 z-50"
      >
        <motion.button
          onClick={togglePlay}
          className="group relative px-4 py-2 font-mono text-sm backdrop-blur-sm bg-black/30 border border-gray-800 rounded-lg hover:bg-black/50 focus:outline-none transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r opacity-10 blur group-hover:opacity-20 transition duration-300 rounded-lg" />
          <span className="relative z-10 flex items-center">
            <span className="mr-2">{isPlaying ? '◼' : '▶'}</span>
            {isPlaying ? 'Pause_' : 'Play_'}
          </span>
        </motion.button>
      </motion.div>
      <audio ref={audioRef} loop preload="auto">
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