import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGithub,
  faXTwitter,
  faTiktok,
  faInstagram,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import Layout from '@/components/Layout';
import SubstackIcon from '@/components/SubstackIcon';

// ─────────────────── data ────────────────────

interface InterestItem {
  title: string;
  sw: string;
  ht: string;
  content?: string;
}

const INTERESTS: Record<string, InterestItem[]> = {
  BUILDER_MINDSET: [
    { title: 'Grand Projects Repository', sw: 'Hifadhi ya Miradi Mikubwa', ht: 'Repozitwa Gwo Pwojè' },
    { title: 'Learning Chronicles', sw: 'Historia za Kujifunza', ht: 'Kronik Aprantisaj' },
    {
      title: 'Reading Philosophy',
      sw: 'Falsafa ya Usomaji',
      ht: 'Filozofi Lekti',
      content: "It's just therapy—reading words we are probably misunderstanding, just living in the moment. It's unfortunate that when we're scared, we rarely stay present, even if it's as simple as focusing on this point (.).",
    },
  ],
  UNIVERSE_MAXXING: [
    { title: 'Physics Deep Dives', sw: 'Uchambuzi wa Kina wa Fizikia', ht: 'Fizyon Pwòfondè Fizik' },
    { title: 'Mathematical Explorations', sw: 'Uchunguzi wa Kihisabati', ht: 'Eksplorasyon Matematik' },
    {
      title: 'Cosmological Thoughts',
      sw: 'Mawazo ya Kikosmolojia',
      ht: 'Panse Kosmolojik',
      content: 'I used to be tormented by the idea of traveling into infinity and never reaching an end. And even if there were an end, what would be beyond it? My relief came when I learned that I might end up in the same place where I began—zero.',
    },
  ],
  PIVOTAL_TURNS: [
    { title: 'African Development Theories', sw: 'Nadharia za Maendeleo ya Afrika', ht: 'Teori Devlopman Afriken' },
    {
      title: 'Civilization Analysis',
      sw: 'Uchambuzi wa Ustaarabu',
      ht: 'Analiz Sivilizasyon',
      content: "We always try to create a framework to fit our data into, even though most of the time only a fraction of historical data is correct—and the rest is a complete fucking lie.",
    },
    { title: 'Power Dynamics Studies', sw: 'Masomo ya Mienendo ya Nguvu', ht: 'Etid Dinamik Pouvwa' },
  ],
  INTELLIGENCE_AUGMENTATION: [
    {
      title: 'AI as Calculator Manifesto',
      sw: 'Tamko la AI kama Kalkuleta',
      ht: 'Manifesto AI kòm Kalkilatris',
      content: "Side by side, as I explored the story with my favorite characters, I had the possibility to experience it from hundreds of different perspectives thanks to generative AI.",
    },
    { title: 'Claude Experiments', sw: 'Majaribio ya Claude', ht: 'Eksperyans ak Claude' },
    { title: 'Productivity Systems', sw: 'Mifumo ya Uzalishaji', ht: 'Sistèm Pwodiktivite' },
  ],
};

interface Project {
  name: string;
  url: string;
  tag: string;
  desc: string;
}

const PROJECTS: Project[] = [
  {
    name: 'mostbased.space',
    url: 'https://mostbased.space',
    tag: 'web',
    desc: 'tracks public figures. users vote on whether a figure is based or not.',
  },
  {
    name: 'csara',
    url: 'https://github.com/Jim707t/csara',
    tag: 'tool',
    desc: 'persistent memory for copilot. stores what you build, retrieves it before the next task.',
  },
];

const SOCIALS = [
  { icon: faXTwitter,   href: 'https://x.com/jimnemorin',               label: 'X',        handle: '@jimnemorin' },
  { icon: faTiktok,     href: 'https://tiktok.com/@jimnemorin',          label: 'TikTok',   handle: '@jimnemorin' },
  { icon: faInstagram,  href: 'https://instagram.com/jimnemorin',        label: 'Instagram',handle: '@jimnemorin' },
  { icon: faGithub,     href: 'https://github.com/jim707t',              label: 'GitHub',   handle: '@jim707t' },
  { icon: faYoutube,    href: 'https://youtube.com/@jimescapes',         label: 'YouTube',  handle: '@jimescapes' },
];

// ─────────────────── sub-components ────────────────────

function ExpandableTopics({ keys }: { keys: string[] }) {
  const [open, setOpen] = useState<string | null>(null);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  return (
    <div className="mt-6 space-y-2 font-mono">
      {keys.map((key) => (
        <div key={key}>
          <button
            onClick={() => setOpen(open === key ? null : key)}
            className="flex items-center gap-2 text-xs text-space-light/50 hover:text-nebula-secondary transition-colors group"
          >
            <span className="text-nebula-primary/60 group-hover:text-nebula-primary transition-colors">
              {open === key ? '▾' : '▸'}
            </span>
            <span className="tracking-widest uppercase">{key.replace(/_/g, ' ')}</span>
            <span className="text-space-accent animate-pulse-slow">_</span>
          </button>

          <AnimatePresence>
            {open === key && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="ml-4 mt-2 space-y-3 border-l border-nebula-primary/20 pl-4"
              >
                {INTERESTS[key].map((item, idx) => {
                  const itemKey = `${key}-${idx}`;
                  return (
                    <div key={idx}>
                      <div
                        className={`${item.content ? 'cursor-pointer' : ''}`}
                        onClick={() =>
                          item.content &&
                          setExpandedItem(expandedItem === itemKey ? null : itemKey)
                        }
                      >
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-nebula-secondary">$ {item.title}</p>
                          {item.content && (
                            <span className="text-xs text-space-light/30 ml-2">
                              {expandedItem === itemKey ? '[ hide ]' : '[ + ]'}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-space-light/50">→ {item.sw}</p>
                        <p className="text-xs text-space-light/50">→ {item.ht}</p>
                      </div>
                      <AnimatePresence>
                        {item.content && expandedItem === itemKey && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-2 p-3 bg-space-dark/60 rounded-lg border border-nebula-primary/20 text-xs text-space-light/80 leading-relaxed"
                          >
                            {item.content}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      className="relative group cursor-pointer"
      whileHover={{ scale: 1.02 }}
      onClick={() => window.open(project.url, '_blank')}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-nebula-primary to-space-accent opacity-10 blur-xl rounded-xl group-hover:opacity-20 transition-all duration-300" />
      <div className="relative backdrop-blur-md bg-space-dark/40 rounded-xl p-5 border border-nebula-tertiary/20 shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono font-bold text-nebula-secondary">
            {project.name}<span className="text-space-accent animate-pulse-slow">_</span>
          </span>
          <span className="text-xs font-mono text-space-light/40 border border-space-light/20 rounded px-2 py-0.5">
            {project.tag}
          </span>
        </div>
        <p className="text-sm font-mono text-space-light/70 leading-relaxed">{project.desc}</p>
        <p className="mt-3 text-xs font-mono text-space-accent/60 animate-glow">
          open<span className="text-nebula-secondary">_</span>
        </p>
      </div>
    </motion.div>
  );
}

function SingularityGraph() {
  return (
    <div className="mt-4 relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-nebula-primary to-space-accent opacity-10 blur-xl rounded-xl group-hover:opacity-20 transition-all duration-300" />
      <div className="relative backdrop-blur-md bg-space-dark/40 rounded-xl p-4 border border-nebula-tertiary/20 shadow-lg font-mono">
        <svg
          viewBox="0 0 320 190"
          className="w-full h-auto"
          role="img"
          aria-label="exponential curve of capability over time, with a marker asking where we are on the way to the singularity"
        >
          <defs>
            <linearGradient id="singularity-curve" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="#4F46E5" />
              <stop offset="100%" stopColor="#818CF8" />
            </linearGradient>
          </defs>

          {/* axes */}
          <line x1="32" y1="160" x2="306" y2="160" stroke="#334155" strokeWidth="1" />
          <line x1="32" y1="160" x2="32" y2="14" stroke="#334155" strokeWidth="1" />
          <text x="306" y="176" fontSize="9" fill="#64748B" textAnchor="end">time →</text>
          <text x="22" y="90" fontSize="9" fill="#64748B" textAnchor="middle" transform="rotate(-90 22 90)">capability →</text>

          {/* exponential curve */}
          <path
            d="M 32 158 C 110 156 192 146 238 112 C 270 88 292 50 300 16"
            fill="none"
            stroke="url(#singularity-curve)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* singularity label at the top of the curve */}
          <text x="296" y="12" fontSize="9" fill="#A5B4FC" textAnchor="end">singularity</text>

          {/* "we are here?" marker */}
          <line x1="238" y1="112" x2="238" y2="160" stroke="#6366F1" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
          <circle cx="238" cy="112" r="4" fill="#818CF8" className="animate-pulse-slow" />
          <text x="226" y="106" fontSize="10" fill="#A5B4FC" textAnchor="end">we&apos;re.. maybe here? →</text>
        </svg>
      </div>
    </div>
  );
}

// ─────────────────── page ────────────────────

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Jim Nemorin</title>
        <meta name="description" content="dev. builder. reader. always chasing a more elegant way to understand the world." />
        <meta property="og:title" content="Jim Nemorin" />
        <meta property="og:description" content="dev. builder. reader." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@jimnemorin" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </Head>

      <div className="w-full max-w-3xl mx-auto px-4 py-10 space-y-28">

        {/* ── section 1: builder ── */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="relative"
        >
          <div className="relative z-10">
            <p className="font-mono text-space-light/90 text-lg leading-relaxed">
              <span className="text-nebula-primary">&gt;</span>{' '}
              i&apos;m an agentic coder, and a few other things.
              <br />
              i build things for the web.
              <br />
              sometimes small software for personal use.
              <br />
              i also train and set up llm systems.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PROJECTS.map((p) => (
                <ProjectCard key={p.name} project={p} />
              ))}
            </div>

            <ExpandableTopics keys={['BUILDER_MINDSET']} />
          </div>
        </motion.section>

        {/* ── section 2: reader / writer ── */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="relative"
        >
          {/* mobile bg image */}
          <div className="absolute inset-y-0 right-0 w-56 md:hidden pointer-events-none select-none overflow-hidden">
            <Image
              src="/assets/awake_tobi_nobg.png"
              alt=""
              width={224}
              height={300}
              className="object-contain object-bottom h-full w-full opacity-25 brightness-110"
              style={{ filter: 'drop-shadow(0 0 16px rgba(99,102,241,0.5))' }}
            />
          </div>
          <div className="flex flex-col md:flex-row-reverse md:items-start md:gap-12">
            <div className="flex-1 min-w-0 relative z-10">
              <p className="font-mono text-space-light/90 text-lg leading-relaxed">
                <span className="text-nebula-primary">&gt;</span>{' '}
                i read about concepts yet to be understood by you.
                <br />
                everything from topology to underground mythical warfare.
                <br />
                i write about the ideas that won&apos;t let me sleep.
              </p>

              <div className="mt-6">
                <motion.a
                  href="https://jimnemorin.substack.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group inline-flex items-center gap-2 font-mono text-sm"
                  whileHover={{ scale: 1.03 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-nebula-primary to-space-accent opacity-0 blur-xl rounded-lg group-hover:opacity-20 transition-all duration-300" />
                  <span className="relative backdrop-blur-md bg-space-dark/40 border border-nebula-tertiary/20 rounded-lg px-4 py-2 text-nebula-secondary group-hover:border-nebula-secondary/40 transition-all duration-200 inline-flex items-center gap-2">
                    <SubstackIcon className="w-4 h-4" />
                    jimnemorin.substack.com<span className="text-space-accent animate-pulse-slow">_</span>
                  </span>
                </motion.a>
              </div>

              <ExpandableTopics keys={['UNIVERSE_MAXXING', 'PIVOTAL_TURNS']} />
            </div>

            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="hidden md:flex flex-shrink-0 items-end justify-center w-48 self-start mt-4"
            >
              <Image
                src="/assets/awake_tobi_nobg.png"
                alt="tobi awake again"
                width={200}
                height={300}
                className="object-contain"
                style={{ filter: 'drop-shadow(0 0 20px rgba(99,102,241,0.4)) brightness(1.05)' }}
              />
            </motion.div>
          </div>
        </motion.section>

        {/* ── section 3: singularity ── */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="relative"
        >
          {/* mobile bg image */}
          <div className="absolute inset-y-0 right-0 w-56 md:hidden pointer-events-none select-none overflow-hidden">
            <Image
              src="/assets/chilling_tobi_nobg.png"
              alt=""
              width={224}
              height={340}
              className="object-contain object-bottom h-full w-full opacity-25 brightness-110"
              style={{ filter: 'drop-shadow(0 0 16px rgba(99,102,241,0.5))' }}
            />
          </div>
          <div className="flex flex-col md:flex-row md:items-start md:gap-12">
            <div className="flex-1 min-w-0 relative z-10">
              <p className="font-mono text-space-light/90 text-lg leading-relaxed">
                <span className="text-nebula-primary">&gt;</span>{' '}
                i&apos;m always chasing a more elegant way to see and understand the world.
              </p>
              <p className="mt-4 font-mono text-space-light/70 text-base leading-relaxed">
                now that we&apos;re near the singularity i&apos;m just trying to figure out how to live in there as a human.
              </p>
              <p className="mt-6 font-mono text-space-light/90 text-base leading-relaxed">
                <span className="text-nebula-primary">&gt;</span>{' '}
                where do you think we are in this graph toward the singularity?
              </p>
              <SingularityGraph />
              <p className="mt-6 font-mono text-space-light/70 text-base leading-relaxed">
                now that i can prompt the agent:{' '}
                <span className="text-nebula-secondary">&quot;figure out how to do x by any means possible&quot;</span>
                {' '}what else do i need?
                <br /><br />
                i&apos;m just a human navigating a world i see, feel, but can&apos;t comprehend.
                <br />
                we are in the middle of a thing we may have{' '}
                <span className="text-space-accent/80 italic">not chosen</span>.
              </p>

              <ExpandableTopics keys={['INTELLIGENCE_AUGMENTATION']} />
            </div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="hidden md:flex flex-shrink-0 items-end justify-center w-48 self-start mt-4"
            >
              <Image
                src="/assets/chilling_tobi_nobg.png"
                alt="tobi thumbs up"
                width={200}
                height={340}
                className="object-contain"
                style={{ filter: 'drop-shadow(0 0 20px rgba(99,102,241,0.4)) brightness(1.05)' }}
              />
            </motion.div>
          </div>
        </motion.section>

        {/* ── section 4: reach out ── */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="pb-16 relative"
        >
          {/* mobile bg image */}
          <div className="absolute inset-y-0 right-0 w-56 md:hidden pointer-events-none select-none overflow-hidden">
            <Image
              src="/assets/tobi_mybad_nobg.png"
              alt=""
              width={224}
              height={280}
              className="object-contain object-bottom h-full w-full opacity-25 brightness-110"
              style={{ filter: 'drop-shadow(0 0 16px rgba(99,102,241,0.5))' }}
            />
          </div>
          <div className="flex flex-col md:flex-row-reverse md:items-start md:gap-12">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="hidden md:flex flex-shrink-0 items-end justify-center w-44 self-start"
            >
              <Image
                src="/assets/tobi_mybad_nobg.png"
                alt="tobi my bad"
                width={180}
                height={280}
                className="object-contain"
                style={{ filter: 'drop-shadow(0 0 20px rgba(99,102,241,0.4)) brightness(1.05)' }}
              />
            </motion.div>

            <div className="flex-1 min-w-0 relative z-10">
              <p className="font-mono text-space-light/90 text-lg leading-relaxed">
                <span className="text-nebula-primary">&gt;</span>{' '}
                if you&apos;re building something cool, please share it with me for feedback.
              </p>

              <div className="mt-8">
                <p className="font-mono text-xs text-space-light/60 mb-3 tracking-widest uppercase">
                  you can find me here<span className="text-space-accent animate-pulse-slow">_</span>
                </p>
                <div className="flex flex-wrap gap-x-6 gap-y-4 items-center">
                  {SOCIALS.map((s) => (
                    <motion.a
                      key={s.href}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="group flex items-center gap-2 font-mono text-sm text-white/75 hover:text-nebula-secondary transition-colors duration-200"
                      whileHover={{ scale: 1.05 }}
                    >
                      <FontAwesomeIcon icon={s.icon} className="w-4 h-4 text-space-light/70 group-hover:text-nebula-secondary transition-colors" />
                      <span>{s.handle}</span>
                    </motion.a>
                  ))}
                  <motion.a
                    href="https://jimnemorin.substack.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Substack"
                    className="group flex items-center gap-2 font-mono text-sm text-white/75 hover:text-nebula-secondary transition-colors duration-200"
                    whileHover={{ scale: 1.05 }}
                  >
                    <SubstackIcon className="w-4 h-4 text-space-light/70 group-hover:text-nebula-secondary transition-colors" />
                    <span>substack</span>
                  </motion.a>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

      </div>
    </Layout>
  );
}