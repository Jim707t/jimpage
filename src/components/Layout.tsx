import React, { ReactNode, useEffect, useRef } from 'react';
import Navbar from './Navbar/Navbar';

export default function Layout({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.3;  // Adjust volume as needed
      audio.play().catch((error) => {
        console.log('Autoplay prevented:', error);
      });
    }
  }, []);

  return (
    <div className="relative min-h-screen">
      <Navbar />
      <audio ref={audioRef} loop>
        <source src="/assets/background-music.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
