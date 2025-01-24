import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ThoughtSpace = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const sections = {
    UNIVERSE_MAXXING: {
      en: ["Physics Deep Dives", "Mathematical Explorations", "Cosmological Thoughts"],
      sw: ["Uchambuzi wa Kina wa Fizikia", "Uchunguzi wa Kihisabati", "Mawazo ya Kikosmolojia"],
      ht: ["Fizyon Pwòfondè Fizik", "Eksplorasyon Matematik", "Panse Kosmolojik"]
    },
    INTELLIGENCE_AUGMENTATION: {
      en: ["AI as Calculator Manifesto", "Claude Experiments", "Productivity Systems"],
      sw: ["Tamko la AI kama Kalkuleta", "Majaribio ya Claude", "Mifumo ya Uzalishaji"],
      ht: ["Manifesto AI kòm Kalkilatris", "Eksperyans ak Claude", "Sistèm Pwodiktivite"]
    },
    PIVOTAL_TURNS: {
      en: ["African Development Theories", "Civilization Analysis", "Power Dynamics Studies"],
      sw: ["Nadharia za Maendeleo ya Afrika", "Uchambuzi wa Ustaarabu", "Masomo ya Mienendo ya Nguvu"],
      ht: ["Teori Devlopman Afriken", "Analiz Sivilizasyon", "Etid Dinamik Pouvwa"]
    },
    BUILDER_MINDSET: {
      en: ["Grand Projects Repository", "Learning Chronicles", "Reading Philosophy"],
      sw: ["Hifadhi ya Miradi Mikubwa", "Historia za Kujifunza", "Falsafa ya Usomaji"],
      ht: ["Repozitwa Gwo Pwojè", "Kronik Aprantisaj", "Filozofi Lekti"]
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(sections).map(([key, languages]) => (
          <motion.div
            key={key}
            className="relative group"
            whileHover={{ scale: 1.02 }}
            onClick={() => setActiveSection(activeSection === key ? null : key)}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#0066ff] to-[#00ff94] opacity-10 blur-xl rounded-xl group-hover:opacity-20 transition-opacity" />
            <div className="relative backdrop-blur-sm bg-black/30 rounded-xl p-6 border border-gray-900/30">
              <h2 className="text-2xl font-mono font-bold text-[#00ff94] mb-4">
                {key.replace('_', ' ')}<span className="text-[#0066ff]">_</span>
              </h2>
              
              <AnimatePresence>
                {activeSection === key && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-6"
                  >
                    {languages.en.map((item, idx) => (
                      <div key={idx} className="space-y-2 font-mono">
                        <p className="text-[#00ff94]">$ {item}</p>
                        <p className="text-sm text-gray-400">→ {languages.sw[idx]}</p>
                        <p className="text-sm text-gray-400">→ {languages.ht[idx]}</p>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
              
              {activeSection !== key && (
                <div className="h-16 flex items-center text-gray-500 font-mono">
                  <span className="animate-pulse">Click to explore_</span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default ThoughtSpace;