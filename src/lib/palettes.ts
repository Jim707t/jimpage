// Site colour palettes. Each value becomes a CSS variable (--c-<key>) on <html>,
// which tailwind.config.ts maps onto the space-* / nebula-* colour names.

export type PaletteVars = {
  dark: string;
  light: string;
  accent: string;
  glow: string;
  primary: string;
  secondary: string;
  tertiary: string;
};

export interface Palette {
  id: string;
  name: string;
  vars: PaletteVars;
}

export const PALETTES: Palette[] = [
  {
    id: 'nebula',
    name: 'nebula',
    vars: { dark: '#0F172A', light: '#334155', accent: '#6366F1', glow: '#818CF8', primary: '#4F46E5', secondary: '#6366F1', tertiary: '#A5B4FC' },
  },
  {
    id: 'aurora',
    name: 'aurora',
    vars: { dark: '#04201D', light: '#3F5F5A', accent: '#10B981', glow: '#34D399', primary: '#059669', secondary: '#10B981', tertiary: '#6EE7B7' },
  },
  {
    id: 'ocean',
    name: 'ocean',
    vars: { dark: '#071A26', light: '#34505E', accent: '#06B6D4', glow: '#22D3EE', primary: '#0891B2', secondary: '#06B6D4', tertiary: '#67E8F9' },
  },
  {
    id: 'ember',
    name: 'ember',
    vars: { dark: '#1C1009', light: '#57443A', accent: '#F97316', glow: '#FB923C', primary: '#EA580C', secondary: '#F97316', tertiary: '#FDBA74' },
  },
  {
    id: 'rose',
    name: 'rose',
    vars: { dark: '#1F0A14', light: '#5B3A48', accent: '#F43F5E', glow: '#FB7185', primary: '#E11D48', secondary: '#F43F5E', tertiary: '#FDA4AF' },
  },
  {
    id: 'mono',
    name: 'mono',
    vars: { dark: '#0A0A0A', light: '#525252', accent: '#A3A3A3', glow: '#D4D4D4', primary: '#737373', secondary: '#A3A3A3', tertiary: '#E5E5E5' },
  },
];

export const DEFAULT_PALETTE = PALETTES[0];

/** Build a full palette from a single colour the visitor picks. */
export function customVars(color: string): PaletteVars {
  const mix = (other: string, pct: number) => `color-mix(in srgb, ${color} ${pct}%, ${other})`;
  return {
    dark: mix('#050505', 12),
    light: mix('#64748B', 30),
    accent: color,
    glow: mix('#ffffff', 75),
    primary: mix('#000000', 80),
    secondary: color,
    tertiary: mix('#ffffff', 45),
  };
}

export const STORAGE_KEY = 'jimpage-palette';

export interface SavedPalette {
  id: string;
  color?: string;
  vars: PaletteVars;
}

export function applyVars(vars: PaletteVars) {
  const root = document.documentElement;
  (Object.keys(vars) as (keyof PaletteVars)[]).forEach((k) => {
    root.style.setProperty(`--c-${k}`, vars[k]);
  });
}

/** Default palette as CSS, used for :root so the site renders correctly with no JS. */
export function defaultCss(): string {
  const v = DEFAULT_PALETTE.vars;
  return `:root{${(Object.keys(v) as (keyof PaletteVars)[]).map((k) => `--c-${k}:${v[k]}`).join(';')}}`;
}

/**
 * Runs before first paint (inlined in _document) so a saved palette
 * doesn't flash the default colours on load.
 */
export const preloadScript = `try{var s=JSON.parse(localStorage.getItem('${STORAGE_KEY}')||'null');if(s&&s.vars){for(var k in s.vars){document.documentElement.style.setProperty('--c-'+k,s.vars[k]);}}}catch(e){}`;
