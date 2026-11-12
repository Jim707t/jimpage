/**
 * Unit tests for the jimpage personal website.
 * Tests cover: page render, project cards, social links,
 * expandable interests, and navbar.
 */

import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';

// ── helpers ──────────────────────────────────────────────────────────────────

// Next/image is a server component — mock it with a plain <img>
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement> & { src: string; alt: string }) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={props.src} alt={props.alt} className={props.className} onClick={props.onClick} />;
  },
}));

// next/head is a no-op in jsdom
jest.mock('next/head', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// framer-motion: keep motion.* as plain wrappers, disable animations
jest.mock('framer-motion', () => {
  const actual = jest.requireActual('framer-motion');

  function makeMotionComponent(tag: string) {
    function MotionEl(
      { children, ...rest }: React.HTMLAttributes<HTMLElement>,
      ref: React.Ref<HTMLElement>
    ) {
      return React.createElement(tag, { ...rest, ref }, children);
    }
    MotionEl.displayName = `motion.${tag}`;
    return React.forwardRef(MotionEl);
  }

  const handler = {
    get(_target: typeof actual.motion, prop: string) {
      return makeMotionComponent(prop);
    },
  };

  return {
    ...actual,
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    motion: new Proxy(actual.motion, handler),
  };
});

// FontAwesome SVGs blow up in jsdom — mock with simple spans
jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: ({ 'aria-label': label }: { 'aria-label'?: string }) => (
    <span aria-label={label ?? 'icon'} />
  ),
}));

// Layout renders children straight through
jest.mock('@/components/Layout', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <main>{children}</main>,
}));

// ── import pages ─────────────────────────────────────────────────────────────

import Home from '@/pages/index';
import PalettePicker from '@/components/PalettePicker';
import Navbar from '@/components/Navbar/Navbar';

// ─────────────────────────────────────────────────────────────────────────────
// Navbar
// ─────────────────────────────────────────────────────────────────────────────

describe('Navbar', () => {
  it('renders the site owner name', () => {
    render(<Navbar />);
    expect(screen.getByText(/Jim Nemorin/i)).toBeInTheDocument();
  });

  it('renders the tagline', () => {
    render(<Navbar />);
    expect(screen.getByText(/agentic coder, builder/i)).toBeInTheDocument();
  });

  it('has no profile image', () => {
    render(<Navbar />);
    expect(screen.queryByRole('img', { name: /profile/i })).not.toBeInTheDocument();
  });

  it('has no links (github, services, projects removed)', () => {
    render(<Navbar />);
    expect(screen.queryAllByRole('link')).toHaveLength(0);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Home page — content
// ─────────────────────────────────────────────────────────────────────────────

describe('Home page — conversational sections', () => {
  beforeEach(() => render(<Home />));

  it('renders the builder section text', () => {
    expect(screen.getByText(/i see myself as an agentic coder/i)).toBeInTheDocument();
  });

  it('renders the builder llm line', () => {
    expect(screen.getByText(/i also train and set up llm systems/i)).toBeInTheDocument();
  });

  it('renders the reader section text', () => {
    expect(screen.getByText(/concepts that go out of the ordinary/i)).toBeInTheDocument();
    expect(screen.getByText(/edits that share ideas/i)).toBeInTheDocument();
  });

  it('renders the interplanetary / elegant-world text', () => {
    expect(screen.getByText(/interplanetary expansion/i)).toBeInTheDocument();
    expect(screen.getByText(/more elegant way to see and understand the world/i)).toBeInTheDocument();
  });

  it('renders the human-from-earth closing lines', () => {
    expect(screen.getByText(/human from earth navigating/i)).toBeInTheDocument();
    expect(screen.getByText(/not chosen/i)).toBeInTheDocument();
  });

  it('no longer renders the singularity graph', () => {
    expect(screen.queryByRole('img', { name: /singularity/i })).not.toBeInTheDocument();
    expect(screen.queryByText(/where do you think we are in this graph/i)).not.toBeInTheDocument();
  });

  it('renders the reach-out section text', () => {
    expect(screen.getByText(/building something cool and want feedback/i)).toBeInTheDocument();
  });

  it('does not render project cards on the landing page', () => {
    expect(screen.queryByText(/mostbased\.space/i)).not.toBeInTheDocument();
  });

  it('shows the github link in the builder section', () => {
    expect(screen.getByText('github.com/jim707t')).toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Home page — social links
// ─────────────────────────────────────────────────────────────────────────────

describe('Home page — social links', () => {
  beforeEach(() => render(<Home />));

  const socialCases: [string, string][] = [
    ['GitHub', 'github.com/jim707t'],
    ['YouTube', 'youtube.com/@jimescapes'],
  ];

  test.each(socialCases)('%s link present with correct href', (_label, urlFragment) => {
    const link = screen.getAllByRole('link').find(
      (a) => (a as HTMLAnchorElement).href.includes(urlFragment)
    );
    expect(link).toBeDefined();
  });

  it('has a mailto link with the contact email', () => {
    const link = screen.getAllByRole('link').find(
      (a) => (a as HTMLAnchorElement).getAttribute('href') === 'mailto:jimnemorin@proton.me'
    );
    expect(link).toBeDefined();
    expect(screen.getByText('jimnemorin@proton.me')).toBeInTheDocument();
  });

  it('no longer shows the "you can find me here" heading', () => {
    expect(screen.queryByText(/you can find me here/i)).not.toBeInTheDocument();
  });

  it('has no X / TikTok / Instagram links', () => {
    const removed = screen.getAllByRole('link').filter((a) =>
      ['x.com/', 'tiktok.com', 'instagram.com'].some((d) =>
        (a as HTMLAnchorElement).href.includes(d)
      )
    );
    expect(removed).toHaveLength(0);
  });

  it('links open in a new tab (target=_blank)', () => {
    const socialLinks = screen.getAllByRole('link').filter(
      (a) =>
        (a as HTMLAnchorElement).target === '_blank' &&
        ['github.com', 'youtube.com'].some((d) =>
          (a as HTMLAnchorElement).href.includes(d)
        )
    );
    expect(socialLinks.length).toBeGreaterThanOrEqual(2);
    socialLinks.forEach((link) => {
      expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'));
    });
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Home page — expandable interests
// ─────────────────────────────────────────────────────────────────────────────

describe('Home page — topic tags removed', () => {
  it('no longer renders the expandable topic lists', () => {
    render(<Home />);
    ['BUILDER MINDSET', 'UNIVERSE MAXXING', 'PIVOTAL TURNS', 'INTELLIGENCE AUGMENTATION'].forEach((t) => {
      expect(screen.queryByText(t)).not.toBeInTheDocument();
    });
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Home page — images
// ─────────────────────────────────────────────────────────────────────────────

describe('Home page — tobi illustrations', () => {
  it('renders the three remaining illustration images', () => {
    render(<Home />);
    // getAttribute: the role=img list also includes the SVG graph, which has no .src
    const srcs = screen.getAllByRole('img').map((img) => img.getAttribute('src') ?? '');
    ['awake_tobi_nobg', 'chilling_tobi_nobg', 'tobi_mybad_nobg'].forEach((name) => {
      expect(srcs.some((src) => src.includes(name))).toBe(true);
    });
  });

  it('does not render the removed first-section image', () => {
    render(<Home />);
    const srcs = screen.getAllByRole('img').map((img) => img.getAttribute('src') ?? '');
    expect(srcs.some((src) => src.includes('tobi_s1_nobg'))).toBe(false);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Home page — Substack link
// ─────────────────────────────────────────────────────────────────────────────

describe('Home page — Substack', () => {
  it('renders at least one substack link', () => {
    render(<Home />);
    const links = screen.getAllByRole('link').filter((a) =>
      (a as HTMLAnchorElement).href.includes('jimnemorin.substack.com')
    );
    expect(links.length).toBeGreaterThanOrEqual(1);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Palette picker
// ─────────────────────────────────────────────────────────────────────────────

describe('PalettePicker', () => {
  afterEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('style');
  });

  it('is closed by default and opens on click', () => {
    render(<PalettePicker />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /change colour palette/i }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('applies and saves a preset palette', () => {
    render(<PalettePicker />);
    fireEvent.click(screen.getByRole('button', { name: /change colour palette/i }));
    fireEvent.click(screen.getByRole('button', { name: /ember palette/i }));
    expect(document.documentElement.style.getPropertyValue('--c-accent')).toBe('#F97316');
    expect(JSON.parse(localStorage.getItem('jimpage-palette')!).id).toBe('ember');
  });

  it('reset returns to the default and clears storage', () => {
    render(<PalettePicker />);
    fireEvent.click(screen.getByRole('button', { name: /change colour palette/i }));
    fireEvent.click(screen.getByRole('button', { name: /rose palette/i }));
    fireEvent.click(screen.getByRole('button', { name: /reset/i }));
    expect(document.documentElement.style.getPropertyValue('--c-accent')).toBe('#6366F1');
    expect(localStorage.getItem('jimpage-palette')).toBeNull();
  });

  it('applies a custom colour', () => {
    render(<PalettePicker />);
    fireEvent.click(screen.getByRole('button', { name: /change colour palette/i }));
    fireEvent.change(screen.getByLabelText(/custom colour/i, { selector: 'input' }), { target: { value: '#ff00aa' } });
    expect(document.documentElement.style.getPropertyValue('--c-accent')).toBe('#ff00aa');
    expect(JSON.parse(localStorage.getItem('jimpage-palette')!).id).toBe('custom');
  });
});
