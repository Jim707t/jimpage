import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';

// ─────────────────── data ────────────────────

interface Engagement {
  name: string;
  tag: string;
  desc: string;
}

const ENGAGEMENTS: Engagement[] = [
  {
    name: 'audit / rescue',
    tag: 'fixed-scope',
    desc: 'i help with live llm systems — costs creeping, agents looping, outputs drifting. i find the failure modes, the cost leaks, and the safety holes.',
  },
  {
    name: 'hands-on building',
    tag: 'embedded',
    desc: 'i design: agent harnesses, rag pipelines, eval suites, observability. production code.',
  },
  {
    name: 'consulting / advisory',
    tag: 'ongoing',
    desc: 'i advise on caching strategy, model routing, quantization, evals.',
  },
];

const EMAIL = ['jimnemorin', 'proton.me'].join('@');

// ─────────────────── sub-components ────────────────────

function EngagementCard({ engagement }: { engagement: Engagement }) {
  return (
    <motion.div className="relative group" whileHover={{ scale: 1.02 }}>
      <div className="absolute inset-0 bg-gradient-to-r from-nebula-primary to-space-accent opacity-10 blur-xl rounded-xl group-hover:opacity-20 transition-all duration-300" />
      <div className="relative backdrop-blur-md bg-space-dark/40 rounded-xl p-5 border border-nebula-tertiary/20 shadow-lg h-full">
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono font-bold text-nebula-secondary">
            {engagement.name}<span className="text-space-accent animate-pulse-slow">_</span>
          </span>
          <span className="text-xs font-mono text-space-light/40 border border-space-light/20 rounded px-2 py-0.5 whitespace-nowrap ml-2">
            {engagement.tag}
          </span>
        </div>
        <p className="text-sm font-mono text-space-light/70 leading-relaxed">{engagement.desc}</p>
      </div>
    </motion.div>
  );
}

// ─────────────────── page ────────────────────

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Services() {
  return (
    <Layout>
      <Head>
        <title>Services — Jim Nemorin</title>
        <meta name="description" content="i help teams build llm systems that work gracefully in production — harnesses, caches, evals, and the failure modes." />
        <meta property="og:title" content="Services — Jim Nemorin" />
        <meta property="og:description" content="llm systems that work gracefully in production: audits, hands-on building, and advisory." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@jimnemorin" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </Head>

      <div className="w-full max-w-3xl mx-auto px-4 py-10 space-y-20">

        {/* ── intro ── */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <p className="font-mono text-space-light/90 text-lg leading-relaxed">
            <span className="text-nebula-primary">&gt;</span>{' '}
            i help teams build llm systems that work gracefully in production.
            <br />
            i help with harnesses, caches, evals, and the failure modes.
          </p>
          <Link
            href="/"
            className="inline-block mt-4 font-mono text-xs text-space-light/40 hover:text-nebula-secondary transition-colors"
          >
            ← back home
          </Link>
        </motion.section>

        {/* ── engagements ── */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <p className="font-mono text-xs text-space-light/60 mb-4 tracking-widest uppercase">
            here is what i do<span className="text-space-accent animate-pulse-slow">_</span>
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {ENGAGEMENTS.map((e) => (
              <EngagementCard key={e.name} engagement={e} />
            ))}
          </div>
        </motion.section>

        {/* ── contact ── */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="pb-16"
        >
          <p className="font-mono text-space-light/90 text-lg leading-relaxed">
            <span className="text-nebula-primary">&gt;</span>{' '}
            tell me about what you&apos;re building.
          </p>
          <div className="mt-6">
            <motion.a
              href={`mailto:${EMAIL}`}
              className="relative group inline-flex items-center gap-2 font-mono text-sm"
              whileHover={{ scale: 1.03 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-nebula-primary to-space-accent opacity-0 blur-xl rounded-lg group-hover:opacity-20 transition-all duration-300" />
              <span className="relative backdrop-blur-md bg-space-dark/40 border border-nebula-tertiary/20 rounded-lg px-4 py-2 text-nebula-secondary group-hover:border-nebula-secondary/40 transition-all duration-200">
                ✉ {EMAIL}<span className="text-space-accent animate-pulse-slow">_</span>
              </span>
            </motion.a>
          </div>
        </motion.section>

      </div>
    </Layout>
  );
}
