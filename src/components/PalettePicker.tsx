import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PALETTES,
  DEFAULT_PALETTE,
  STORAGE_KEY,
  SavedPalette,
  applyVars,
  customVars,
} from '@/lib/palettes';

function save(p: SavedPalette | null) {
  try {
    if (p) localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
    else localStorage.removeItem(STORAGE_KEY);
  } catch {
    // storage blocked (private mode etc.) — palette still applies for this visit
  }
}

function load(): SavedPalette | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as SavedPalette) : null;
  } catch {
    return null;
  }
}

export default function PalettePicker() {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState(DEFAULT_PALETTE.id);
  const [customColor, setCustomColor] = useState('#6366F1');

  useEffect(() => {
    const saved = load();
    if (!saved) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- sync UI with storage after hydration
    setActiveId(saved.id);
    if (saved.color) setCustomColor(saved.color);
  }, []);

  const pickPreset = (id: string) => {
    const p = PALETTES.find((x) => x.id === id) ?? DEFAULT_PALETTE;
    applyVars(p.vars);
    setActiveId(p.id);
    save(p.id === DEFAULT_PALETTE.id ? null : { id: p.id, vars: p.vars });
  };

  const pickCustom = (color: string) => {
    const vars = customVars(color);
    applyVars(vars);
    setCustomColor(color);
    setActiveId('custom');
    save({ id: 'custom', color, vars });
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 font-mono text-sm">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-label="Colour palette"
            className="absolute bottom-12 right-0 w-56 p-3 rounded-lg backdrop-blur-md bg-space-dark/80 border border-nebula-tertiary/20 shadow-lg"
          >
            <p className="text-xs text-white/60 tracking-widest uppercase mb-3">
              palette<span className="text-space-accent animate-pulse-slow">_</span>
            </p>
            <div className="grid grid-cols-3 gap-2">
              {PALETTES.map((p) => (
                <button
                  key={p.id}
                  onClick={() => pickPreset(p.id)}
                  aria-label={`${p.name} palette`}
                  aria-pressed={activeId === p.id}
                  className={`flex flex-col items-center gap-1 p-1.5 rounded-md border transition-colors ${
                    activeId === p.id ? 'border-white/60' : 'border-transparent hover:border-white/20'
                  }`}
                >
                  <span className="flex w-full h-5 rounded overflow-hidden">
                    <span className="flex-1" style={{ background: p.vars.dark }} />
                    <span className="flex-1" style={{ background: p.vars.primary }} />
                    <span className="flex-1" style={{ background: p.vars.accent }} />
                    <span className="flex-1" style={{ background: p.vars.tertiary }} />
                  </span>
                  <span className="text-[10px] text-white/70">{p.name}</span>
                </button>
              ))}
            </div>

            <label
              className={`mt-3 flex items-center justify-between gap-2 p-1.5 rounded-md border cursor-pointer transition-colors ${
                activeId === 'custom' ? 'border-white/60' : 'border-transparent hover:border-white/20'
              }`}
            >
              <span className="text-xs text-white/70">custom colour</span>
              <input
                type="color"
                value={customColor}
                onChange={(e) => pickCustom(e.target.value)}
                aria-label="Custom colour"
                className="w-8 h-6 bg-transparent border-0 cursor-pointer"
              />
            </label>

            {activeId !== DEFAULT_PALETTE.id && (
              <button
                onClick={() => pickPreset(DEFAULT_PALETTE.id)}
                className="mt-2 text-xs text-white/50 hover:text-white/80 transition-colors"
              >
                reset
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen((o) => !o)}
        aria-label="Change colour palette"
        aria-expanded={open}
        className="relative px-4 py-2 backdrop-blur-sm bg-black/30 border border-gray-800 rounded-lg hover:bg-black/50 focus:outline-none transition-all duration-300 flex items-center gap-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="flex gap-0.5">
          <span className="w-2 h-2 rounded-full bg-nebula-primary" />
          <span className="w-2 h-2 rounded-full bg-space-accent" />
          <span className="w-2 h-2 rounded-full bg-nebula-tertiary" />
        </span>
        palette_
      </motion.button>
    </div>
  );
}
