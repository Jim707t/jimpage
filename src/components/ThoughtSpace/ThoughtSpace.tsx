import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SectionItem {
  title: string;
  sw: string;
  ht: string;
  content?: string;
}

interface Section {
  items: SectionItem[];
}

const ThoughtSpace = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const sections: Record<string, Section> = {
    UNIVERSE_MAXXING: {
      items: [
        {
          title: "Physics Deep Dives",
          sw: "Uchambuzi wa Kina wa Fizikia",
          ht: "Fizyon Pwòfondè Fizik"
        },
        {
          title: "Mathematical Explorations",
          sw: "Uchunguzi wa Kihisabati",
          ht: "Eksplorasyon Matematik"
        },
        {
          title: "Cosmological Thoughts",
          sw: "Mawazo ya Kikosmolojia",
          ht: "Panse Kosmolojik",
          content: "I used to be tormented by the idea of traveling into infinity and never reaching an end. And even if there were an end, what would be beyond it? My relief came when I learned that I might end up in the same place where I began—zero"
        }
      ]
    },
    INTELLIGENCE_AUGMENTATION: {
      items: [
        {
          title: "AI as Calculator Manifesto",
          sw: "Tamko la AI kama Kalkuleta",
          ht: "Manifesto AI kòm Kalkilatris",
          content: "Side by side, as I explored the story with my favorite characters, I had the possibility to experience it from hundreds of different perspectives thanks to generative AI."
        },
        {
          title: "Claude Experiments",
          sw: "Majaribio ya Claude",
          ht: "Eksperyans ak Claude"
        },
        {
          title: "Productivity Systems",
          sw: "Mifumo ya Uzalishaji",
          ht: "Sistèm Pwodiktivite"
        }
      ]
    },
    PIVOTAL_TURNS: {
      items: [
        {
          title: "African Development Theories",
          sw: "Nadharia za Maendeleo ya Afrika",
          ht: "Teori Devlopman Afriken"
        },
        {
          title: "Civilization Analysis",
          sw: "Uchambuzi wa Ustaarabu",
          ht: "Analiz Sivilizasyon",
          content: "We always try to create a framework to fit our data into, even though most of the time only a fraction of historical data is correct—and the rest is a complete fucking lie."
        },
        {
          title: "Power Dynamics Studies",
          sw: "Masomo ya Mienendo ya Nguvu",
          ht: "Etid Dinamik Pouvwa"
        }
      ]
    },
    BUILDER_MINDSET: {
      items: [
        {
          title: "Grand Projects Repository",
          sw: "Hifadhi ya Miradi Mikubwa",
          ht: "Repozitwa Gwo Pwojè"
        },
        {
          title: "Learning Chronicles",
          sw: "Historia za Kujifunza",
          ht: "Kronik Aprantisaj"
        },
        {
          title: "Reading Philosophy",
          sw: "Falsafa ya Usomaji",
          ht: "Filozofi Lekti",
          content: "It's just therapy—reading words we are probably misunderstanding, just living in the moment. It's unfortunate that when we're scared, we rarely stay present, even if it's as simple as focusing on this point (.)."
        }
      ]
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(sections).map(([key, section]) => (
          <motion.div
            key={key}
            className="relative group"
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
            onClick={() => setActiveSection(activeSection === key ? null : key)}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-nebula-primary to-space-accent opacity-10 blur-xl rounded-xl group-hover:opacity-20 transition-all duration-300" />
            <div className="relative backdrop-blur-md bg-space-dark/40 rounded-xl p-6 border border-nebula-tertiary/20 shadow-lg">
              <h2 className="text-2xl font-mono font-bold mb-4 tracking-tight">
                {key.replace('_', ' ')}<span className="text-space-accent animate-pulse-slow">_</span>
              </h2>
              
              <AnimatePresence mode="wait">
                {activeSection === key && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    {section.items.map((item, idx) => (
                      <div key={idx} className="space-y-2 font-mono">
                        <div 
                          className={`cursor-pointer group/item ${item.content ? 'hover:pl-2 transition-all duration-200' : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (item.content) {
                              setActiveItem(activeItem === `${key}-${idx}` ? null : `${key}-${idx}`);
                            }
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <p className={`text-nebula-secondary transition-colors ${item.content ? 'group-hover/item:text-space-accent' : 'group-hover/item:text-nebula-primary'}`}>
                              $ {item.title}
                            </p>
                            {item.content && (
                              <span className="text-xs text-space-light/40 group-hover/item:text-space-accent/70 transition-all duration-200 ml-2">
                                {activeItem === `${key}-${idx}` ? '[ hide ]' : '[ show more ]'}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-space-light/70 pl-4 border-l border-nebula-primary/30">
                            → {item.sw}
                          </p>
                          <p className="text-sm text-space-light/70 pl-4 border-l border-nebula-primary/30">
                            → {item.ht}
                          </p>
                        </div>
                        
                        <AnimatePresence>
                          {item.content && activeItem === `${key}-${idx}` && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="mt-3 p-4 bg-space-dark/60 rounded-lg border border-nebula-primary/20"
                            >
                              <p className="text-space-light/90 text-sm leading-relaxed">
                                {item.content}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
              
              {activeSection !== key && (
                <div className="h-16 flex items-center font-mono">
                  <span className="animate-glow relative">
                    Click to explore<span className="text-nebula-secondary">_</span>
                  </span>
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