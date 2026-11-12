import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGithub,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import Layout from '@/components/Layout';
import SubstackIcon from '@/components/SubstackIcon';

// ─────────────────── data ────────────────────

// Email is stored as reversed base64 and only decoded in the browser after the
// page loads, so it never appears in the HTML or the JS bundle as plain text.
// Stops simple scrapers; a bot that runs JavaScript can still read it.
const EMAIL_ENCODED = '=UWbu42b09mcwBkbpJ3btVmbtlma';

function useEmail() {
  const [email, setEmail] = React.useState<string | null>(null);
  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- decode client-side only
    setEmail(atob(EMAIL_ENCODED.split('').reverse().join('')));
  }, []);
  return email;
}

function EmailLink() {
  const email = useEmail();
  return (
    <PillLink href={email ? `mailto:${email}` : '#contact'} icon={<EnvelopeIcon className="w-4 h-4" />}>
      {email ?? 'email me'}
    </PillLink>
  );
}

function EnvelopeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

// ─────────────────── sub-components ────────────────────

function PillLink({ href, icon, children }: { href: string; icon: React.ReactNode; children: React.ReactNode }) {
  const external = href.startsWith('http');
  return (
    <motion.a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="relative group inline-flex items-center gap-2 font-mono text-sm"
      whileHover={{ scale: 1.03 }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-nebula-primary to-space-accent opacity-0 blur-xl rounded-lg group-hover:opacity-20 transition-all duration-300" />
      <span className="relative backdrop-blur-md bg-space-dark/40 border border-nebula-tertiary/20 rounded-lg px-4 py-2 text-nebula-secondary group-hover:border-nebula-secondary/40 transition-all duration-200 inline-flex items-center gap-2">
        {icon}
        {children}<span className="text-space-accent animate-pulse-slow">_</span>
      </span>
    </motion.a>
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
              i see myself as an agentic coder, and a few other things.
              <br />
              i build things for the web, sometimes small software for personal use.
              <br />
              i also train and set up llm systems.
            </p>

            <div className="mt-6">
              <PillLink href="https://github.com/jim707t" icon={<FontAwesomeIcon icon={faGithub} className="w-4 h-4" />}>
                github.com/jim707t
              </PillLink>
            </div>
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
              style={{ filter: 'drop-shadow(0 0 16px color-mix(in srgb, var(--c-secondary) 50%, transparent))' }}
            />
          </div>
          <div className="flex flex-col md:flex-row-reverse md:items-start md:gap-12">
            <div className="flex-1 min-w-0 relative z-10">
              <p className="font-mono text-space-light/90 text-lg leading-relaxed">
                <span className="text-nebula-primary">&gt;</span>{' '}
                i read about concepts that goes out of the ordinary.
                <br />
                i love watching video edits with great songs that share ideas, small quotations.
                <br />
                even the ones i completely disagree with.
                <br />
                i write about ideas, absorbed from others lowkey.
              </p>

              <div className="mt-6">
                <PillLink href="https://jimnemorin.substack.com" icon={<SubstackIcon className="w-4 h-4" />}>
                  jimnemorin.substack.com
                </PillLink>
              </div>
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
                style={{ filter: 'drop-shadow(0 0 20px color-mix(in srgb, var(--c-secondary) 40%, transparent)) brightness(1.05)' }}
              />
            </motion.div>
          </div>
        </motion.section>

        {/* ── section 3: universe / human ── */}
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
              style={{ filter: 'drop-shadow(0 0 16px color-mix(in srgb, var(--c-secondary) 50%, transparent))' }}
            />
          </div>
          <div className="flex flex-col md:flex-row md:items-center md:gap-12">
            <div className="flex-1 min-w-0 relative z-10">
              <p className="font-mono text-space-light/90 text-lg leading-relaxed">
                <span className="text-nebula-primary">&gt;</span>{' '}
                i believe in interplanetary expansion.
                <br />
                i&apos;m chasing a more elegant way to see and understand the world.
              </p>
              <p className="mt-6 font-mono text-space-light/70 text-base leading-relaxed">
                i&apos;m a human from earth navigating a world inside a immense universe i see, feel, but can&apos;t comprehend.
                <br />
                i&apos;m in the middle of a things i have{' '}
                <span className="text-space-accent/80 italic">not chosen</span>, i&apos;m forced to live in it.
                <br />
                i enjoy it so far, at least some of it.
              </p>

              <div className="mt-6">
                <PillLink href="https://youtube.com/@jimescapes" icon={<FontAwesomeIcon icon={faYoutube} className="w-4 h-4" />}>
                  youtube.com/@jimescapes
                </PillLink>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="hidden md:flex flex-shrink-0 items-end justify-center w-48"
            >
              <Image
                src="/assets/chilling_tobi_nobg.png"
                alt="tobi thumbs up"
                width={200}
                height={340}
                className="object-contain"
                style={{ filter: 'drop-shadow(0 0 20px color-mix(in srgb, var(--c-secondary) 40%, transparent)) brightness(1.05)' }}
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
              style={{ filter: 'drop-shadow(0 0 16px color-mix(in srgb, var(--c-secondary) 50%, transparent))' }}
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
                style={{ filter: 'drop-shadow(0 0 20px color-mix(in srgb, var(--c-secondary) 40%, transparent)) brightness(1.05)' }}
              />
            </motion.div>

            <div className="flex-1 min-w-0 relative z-10">
              <p className="font-mono text-space-light/90 text-lg leading-relaxed">
                <span className="text-nebula-primary">&gt;</span>{' '}
                if you&apos;re building something cool and want feedback, share it with me.
              </p>

              <div className="mt-6">
                <EmailLink />
              </div>
            </div>
          </div>
        </motion.section>

      </div>
    </Layout>
  );
}