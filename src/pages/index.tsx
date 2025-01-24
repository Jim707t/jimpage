import React from 'react';
import { motion } from 'framer-motion';
import Layout from "@/components/Layout";

export default function Home() {
  const timeline = [
    {
      id: 5,
      platform: "Substack",
      name: "jimnemorin.substack.com",
      description: 'pansem . I Write sometimes',
      icon: '📝',
      color: '#00ff94'
    },
    {
      id: 4,
      platform: "X.com",
      name: "@jimnemorin",
      description: 'yon post konsa konsa . I post on X sometimes',
      icon: '🌐',
      color: '#0066ff'
    },
    {
      id: 3,
      platform: "TikTok",
      name: "@jimnemorin",
      description: 'ra videyo . I post here too but rarely',
      icon: '📹',
      color: '#00ff94'
    },
    {
      id: 2,
      platform: "Instagram",
      name: "@jimnemorin",
      description: 'bel app . cool app',
      icon: '📸',
      color: '#0066ff'
    },
    {
      id: 1,
      platform: "YouTube",
      name: "@jimescapes",
      description: 'Videos',
      icon: '🎥',
      color: '#00ff94'
    }
  ];

  return (
    <Layout>
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 backdrop-blur-sm bg-black/30 rounded-2xl py-8 border border-gray-900/30"
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-10 text-gray-300 tracking-tight font-mono">
          Network<span className="text-blue-500">_</span>
        </h1>
        <div className="space-y-4 sm:space-y-6">
          {timeline.map((entry) => (
            <motion.div 
              key={entry.id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: entry.id * 0.1 }}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              className="group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--hover-color)] to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                style={{"--hover-color": entry.color} as React.CSSProperties} />
              
              <div className="relative bg-black/50 rounded-xl p-4 sm:p-6 border border-gray-900/30 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 backdrop-blur-sm transition-all group-hover:border-opacity-50"
                style={{borderImage: `linear-gradient(to right, transparent, ${entry.color}, transparent) 1`}}>
                <div className="text-3xl sm:text-4xl opacity-70 self-center group-hover:opacity-100 transition-opacity">
                  {entry.icon}
                </div>
                <div className="text-center sm:text-left w-full">
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-300 mb-2 font-mono">
                    {entry.platform} <span className="text-sm opacity-50">&#47;&#47;</span> {entry.name}
                  </h2>
                  <p className="text-sm sm:text-base text-gray-500 font-mono">{entry.description}</p>
                </div>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[var(--hover-color)]">→</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Layout>
  );
}