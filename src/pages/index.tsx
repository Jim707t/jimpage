import React from 'react';
import { motion } from 'framer-motion';
import Layout from "@/components/Layout";

interface TimelineEntry {
  id: number;
  platform: string;
  name: string;
  description: string;
  icon: string;
  url: string;
}

export default function Home() {
  const timeline: TimelineEntry[] = [
    {
      id: 5,
      platform: "Substack",
      name: "jimnemorin.substack.com",
      description: 'pansem . I Write sometimes',
      icon: '📝',
      url: 'https://jimnemorin.substack.com'
    },
    {
      id: 4,
      platform: "X.com",
      name: "@jimnemorin",
      description: 'yon post konsa konsa . I post on X sometimes',
      icon: '🌐',
      url: 'https://x.com/jimnemorin'
    },
    {
      id: 3,
      platform: "GitHub",
      name: "@jim707t",
      description: 'Code repositories and projects',
      icon: '💻',
      url: 'https://github.com/jim707t'
    },
    {
      id: 1,
      platform: "YouTube",
      name: "@jimescapes",
      description: 'Videos',
      icon: '🎥',
      url: 'https://youtube.com/@jimescapes'
    }
  ];

  return (
    <Layout>
      <div className="w-full max-w-6xl mx-auto p-4">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-10 tracking-tight font-mono"
        >
          Network<span className="text-space-accent animate-pulse-slow">_</span>
        </motion.h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {timeline.map((entry) => (
            <motion.div
              key={entry.id}
              className="relative group"
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              onClick={() => window.open(entry.url, '_blank')}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-nebula-primary to-space-accent opacity-10 blur-xl rounded-xl group-hover:opacity-20 transition-all duration-300" />
              <div className="relative backdrop-blur-md bg-space-dark/40 rounded-xl p-6 border border-nebula-tertiary/20 shadow-lg cursor-pointer">
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-3xl sm:text-4xl opacity-70 group-hover:opacity-100 transition-opacity">
                    {entry.icon}
                  </div>
                  <h2 className="text-2xl font-mono font-bold tracking-tight">
                    {entry.platform.toUpperCase()}<span className="text-space-accent animate-pulse-slow">_</span>
                  </h2>
                </div>
                
                <div className="space-y-2 font-mono">
                  <p className="text-lg text-nebula-secondary">
                    {entry.name}
                  </p>
                  <p className="text-sm text-space-light/70">
                    {entry.description}
                  </p>
                  <div className="pt-2">
                    <span className="animate-glow relative text-sm">
                      Click to explore<span className="text-nebula-secondary">_</span>
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Layout>
  );
}