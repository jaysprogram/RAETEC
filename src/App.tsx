import { themes, ACCENT_COLOR } from './theme';
import type { ThemeKey } from './theme';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Process } from './components/Process';
import { Testimonials } from './components/Testimonials';
import { Faq } from './components/Faq';
import { ContactCta } from './components/ContactCta';
import { Footer } from './components/Footer';

// The design prototype supports light / dark / mixed themes and a
// centered vs left-aligned hero. These defaults match the design handoff.
const THEME: ThemeKey = 'light';
const HERO_CENTERED = true;
const SHOW_HERO_GRID = true;
const ACCENT = ACCENT_COLOR;

export function App() {
  const theme = themes[THEME];

  return (
    <>
      <GlobalStyles />

      <div
        style={{
          background: theme.bg,
          color: theme.text,
          minHeight: '100vh',
          transition: 'background 0.4s, color 0.4s',
        }}
      >
        <Nav theme={theme} accent={ACCENT} />

        <main>
          <Hero
            theme={theme}
            accent={ACCENT}
            showGrid={SHOW_HERO_GRID}
            centered={HERO_CENTERED}
          />
          <Services theme={theme} accent={ACCENT} />
          <Process theme={theme} accent={ACCENT} />
          <Testimonials theme={theme} accent={ACCENT} />
          <Faq theme={theme} accent={ACCENT} />
          <ContactCta accent={ACCENT} />
        </main>

        <Footer isDark={THEME === 'dark'} />
      </div>
    </>
  );
}

// Inlined global reset + responsive rules.
// Media queries can't be expressed as inline styles, so they live here.
function GlobalStyles() {
  return (
    <style>{`
      *, *::before, *::after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      html {
        scroll-behavior: smooth;
      }

      body {
        font-family: 'DM Sans', sans-serif;
        overflow-x: hidden;
      }

      @media (max-width: 768px) {
        .nav-desktop  { display: none !important; }
        .nav-hamburger { display: flex !important; }
      }

      @media (max-width: 600px) {
        .hero-section  { padding: 100px 20px 60px !important; }
        .services-grid { grid-template-columns: 1fr !important; }
      }
    `}</style>
  );
}

export default App;
