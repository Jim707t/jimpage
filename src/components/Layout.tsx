import React, { ReactNode, useEffect, useRef, useState } from 'react';
import Navbar from './Navbar/Navbar';

export default function Layout({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.3;  // Adjust volume as needed
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
    <div className="relative min-h-screen">
      <Navbar />
      <div className="absolute top-0 right-0 m-4">
        <button
          onClick={togglePlay}
          className="px-4 py-2 bg-transparent text-gray-200 rounded-md border border-gray-800 hover:bg-gray-200 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>
      </div>
      <audio ref={audioRef} loop>
        <source src="/assets/background-music.mp3" type="audio/mpeg" />
        @@@
      </audio>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
