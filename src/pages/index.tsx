import React from 'react';
import { motion } from 'framer-motion';
import Layout from "@/components/Layout";

export default function Home() {
  const timeline = [
    {
      id: 5,
      platform: "Substack",
      name: "jimnemorin.substack.com",
      description: 'pansem (I Write sometimes)',
      icon: '📝'
    },
    {
      id: 4,
      platform: "X.com",
      name: "@jimnemorin",
      description: 'yon post konsa konsa (I post on X sometimes)',
      icon: '🌐'
    },
    {
      id: 3,
      platform: "TikTok",
      name: "@jimnemorin",
      description: 'ra videyo (I post here too but rarely)',
      icon: '📹'
    },
    {
      id: 2,
      platform: "Instagram",
      name: "@jimnemorin",
      description: 'bel app (cool app)',
      icon: '📸'
    },
    {
      id: 1,
      platform: "YouTube",
      name: "@jimescapes",
      description: 'Videos',
      icon: '🎥'
    }
  ];

  return (
    <Layout>
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-4xl mx-auto bg-[#0a0a0f]/80 rounded-2xl p-8 border border-gray-900/30 shadow-2xl"
      >
        <h1 className="text-4xl font-bold text-center mb-10 text-gray-300 tracking-tight">
          Network
        </h1>
        <div className="space-y-6">
          {timeline.map((entry) => (
            <motion.div 
              key={entry.id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: entry.id * 0.1 }}
              whileHover={{ 
                scale: 1.03, 
                transition: { duration: 0.2 },
                backgroundColor: 'rgba(20, 20, 30, 0.7)'
              }}
              className="bg-[#0f0f1a]/50 rounded-xl p-6 border border-gray-900/30 flex items-center space-x-6 hover:shadow-xl transition-all"
            >
              <div className="text-4xl opacity-70">{entry.icon}</div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-300 mb-2">
                  {entry.platform} - {entry.name}
                </h2>
                <p className="text-gray-500 font-mono">{entry.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Layout>
  );
}