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

  it('renders a profile image', () => {
    render(<Navbar />);
    expect(screen.getByRole('img', { name: /profile/i })).toBeInTheDocument();
  });

  it('profile image is colored by default and toggles grayscale on click', () => {
    render(<Navbar />);
    // re-query after each click: the mocked motion components remount the subtree on re-render
    const profile = () => screen.getByRole('img', { name: /profile/i });
    expect(profile()).not.toHaveClass('grayscale');
    fireEvent.click(profile());
    expect(profile()).toHaveClass('grayscale');
    fireEvent.click(profile());
    expect(profile()).not.toHaveClass('grayscale');
  });

  it('links to the services page', () => {
    render(<Navbar />);
    const link = screen.getAllByRole('link').find(
      (a) => (a as HTMLAnchorElement).getAttribute('href') === '/services'
    );
    expect(link).toBeDefined();
  });

  it('links to GitHub', () => {
    render(<Navbar />);
    const link = screen.getAllByRole('link').find(
      (a) => (a as HTMLAnchorElement).href.includes('github.com/jim707t')
    );
    expect(link).toBeDefined();
  });

  it('links to X / Twitter', () => {
    render(<Navbar />);
    const link = screen.getAllByRole('link').find(
      (a) => (a as HTMLAnchorElement).href.includes('x.com/jimnemorin')
    );
    expect(link).toBeDefined();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Home page — content
// ─────────────────────────────────────────────────────────────────────────────

describe('Home page — conversational sections', () => {
  beforeEach(() => render(<Home />));

  it('renders the builder section text', () => {
    expect(screen.getByText(/i build things for the web/i)).toBeInTheDocument();
  });

  it('renders the builder llm line', () => {
    expect(screen.getByText(/i also train and set up llm systems/i)).toBeInTheDocument();
  });

  it('renders the reader section text', () => {
    expect(screen.getByText(/topology to underground mythical warfare/i)).toBeInTheDocument();
  });

  it('renders the singularity section text', () => {
    expect(screen.getByText(/more elegant way to see and understand the world/i)).toBeInTheDocument();
  });

  it('renders the singularity graph question and image', () => {
    expect(screen.getByText(/where do you think we are in this graph/i)).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /singularity/i })).toBeInTheDocument();
  });

  it('renders the reach-out section text', () => {
    expect(screen.getByText(/building something cool/i)).toBeInTheDocument();
  });

  it('renders the human-navigating closing lines', () => {
    expect(screen.getByText(/navigating a world i see, feel/i)).toBeInTheDocument();
    expect(screen.getByText(/not chosen/i)).toBeInTheDocument();
  });

  it('says we are near the singularity, not in it', () => {
    expect(screen.getByText(/near the singularity/i)).toBeInTheDocument();
    expect(screen.queryByText(/we're in the singularity/i)).not.toBeInTheDocument();
  });

  it('renders share with me copy', () => {
    expect(screen.getByText(/share it with me/i)).toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Home page — projects
// ─────────────────────────────────────────────────────────────────────────────

describe('Home page — project cards', () => {
  beforeEach(() => render(<Home />));

  it('shows mostbased.space project', () => {
    expect(screen.getByText(/mostbased\.space/i)).toBeInTheDocument();
  });

  it('shows the mostbased description with vote copy', () => {
    expect(screen.getByText(/users vote on whether a figure is based or not/i)).toBeInTheDocument();
  });

  it('shows csara project', () => {
    expect(screen.getByText(/csara/i)).toBeInTheDocument();
  });

  it('mostbased card opens correct URL on click', () => {
    const openSpy = jest.spyOn(window, 'open').mockImplementation(() => null);
    const card = screen.getByText(/mostbased\.space/i).closest('[class]')!;
    // Walk up to the clickable parent
    fireEvent.click(card);
    expect(openSpy).toHaveBeenCalledWith(
      expect.stringContaining('mostbased.space'),
      '_blank'
    );
    openSpy.mockRestore();
  });

  it('csara card opens the GitHub URL on click', () => {
    const openSpy = jest.spyOn(window, 'open').mockImplementation(() => null);
    const card = screen.getByText(/csara/i).closest('[class]')!;
    fireEvent.click(card);
    expect(openSpy).toHaveBeenCalledWith(
      expect.stringContaining('github.com/Jim707t/csara'),
      '_blank'
    );
    openSpy.mockRestore();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Home page — social links
// ─────────────────────────────────────────────────────────────────────────────

describe('Home page — social links', () => {
  beforeEach(() => render(<Home />));

  const socialCases: [string, string][] = [
    ['X', 'x.com/jimnemorin'],
    ['TikTok', 'tiktok.com/@jimnemorin'],
    ['Instagram', 'instagram.com/jimnemorin'],
    ['GitHub', 'github.com/jim707t'],
    ['YouTube', 'youtube.com/@jimescapes'],
  ];

  test.each(socialCases)('%s link present with correct href', (_label, urlFragment) => {
    const link = screen.getAllByRole('link').find(
      (a) => (a as HTMLAnchorElement).href.includes(urlFragment)
    );
    expect(link).toBeDefined();
  });

  it('shows the @jimnemorin handle for X / TikTok / Instagram', () => {
    const handles = screen.getAllByText('@jimnemorin');
    expect(handles.length).toBeGreaterThanOrEqual(3);
  });

  it('links open in a new tab (target=_blank)', () => {
    const socialLinks = screen.getAllByRole('link').filter(
      (a) =>
        (a as HTMLAnchorElement).target === '_blank' &&
        ['x.com', 'tiktok.com', 'instagram.com', 'github.com', 'youtube.com'].some((d) =>
          (a as HTMLAnchorElement).href.includes(d)
        )
    );
    expect(socialLinks.length).toBeGreaterThanOrEqual(5);
    socialLinks.forEach((link) => {
      expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'));
    });
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Home page — expandable interests
// ─────────────────────────────────────────────────────────────────────────────

describe('Home page — expandable topic tags', () => {
  it('BUILDER MINDSET section is collapsed by default', () => {
    render(<Home />);
    expect(screen.queryByText(/Grand Projects Repository/i)).not.toBeInTheDocument();
  });

  it('clicking BUILDER MINDSET expands its items', () => {
    render(<Home />);
    const btn = screen.getByText(/BUILDER MINDSET/i);
    fireEvent.click(btn);
    expect(screen.getByText(/Grand Projects Repository/i)).toBeInTheDocument();
    expect(screen.getByText(/Learning Chronicles/i)).toBeInTheDocument();
  });

  it('clicking again collapses BUILDER MINDSET', () => {
    render(<Home />);
    const btn = screen.getByText(/BUILDER MINDSET/i);
    fireEvent.click(btn);
    expect(screen.getByText(/Grand Projects Repository/i)).toBeInTheDocument();
    fireEvent.click(btn);
    expect(screen.queryByText(/Grand Projects Repository/i)).not.toBeInTheDocument();
  });

  it('expanding an item with content shows full detail on second click', () => {
    render(<Home />);
    fireEvent.click(screen.getByText(/UNIVERSE MAXXING/i));
    const itemBtn = screen.getByText(/Cosmological Thoughts/i);
    fireEvent.click(itemBtn);
    expect(screen.getByText(/traveling into infinity/i)).toBeInTheDocument();
  });

  it('all four interest categories are rendered', () => {
    render(<Home />);
    ['BUILDER MINDSET', 'UNIVERSE MAXXING', 'PIVOTAL TURNS', 'INTELLIGENCE AUGMENTATION'].forEach(
      (label) => expect(screen.getByText(new RegExp(label, 'i'))).toBeInTheDocument()
    );
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
