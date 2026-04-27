import { FadeIn } from './FadeIn';
import { CtaLink } from './Nav';
import { HeroVideo } from './HeroVideo';
import type { Theme } from '../theme';

interface HeroProps {
  theme: Theme;
  accent: string;
  showGrid: boolean;
  centered: boolean;
}

export function Hero({ theme, accent, showGrid, centered }: HeroProps) {
  const textAlign = centered ? 'center' : 'left';
  const margin = centered ? '0 auto' : undefined;
  const justifyButtons = centered ? 'center' : 'flex-start';

  return (
    <section
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '120px 24px 100px',
        position: 'relative',
        overflow: 'hidden',
        background: theme.heroBg,
        color: theme.heroText,
        transition: 'background 0.4s, color 0.4s',
      }}
    >
      {showGrid && <GridOverlay accent={accent} />}

      {/* Headline + CTA */}
      <FadeIn
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: 800,
          textAlign,
          margin,
        }}
      >
        <p
          style={{
            fontSize: 13,
            fontFamily: "'Space Grotesk', sans-serif",
            letterSpacing: 3,
            textTransform: 'uppercase',
            color: accent,
            marginBottom: 24,
            fontWeight: 600,
          }}
        >
          AI Automation & Custom Software
        </p>

        <h1
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(36px, 5.5vw, 72px)',
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            marginBottom: 24,
          }}
        >
          We build intelligent systems that work while you sleep
        </h1>

        <p
          style={{
            fontSize: 'clamp(16px, 1.6vw, 20px)',
            lineHeight: 1.6,
            color: theme.heroTextMuted,
            maxWidth: 560,
            margin: centered ? '0 auto 40px' : '0 0 40px',
          }}
        >
          From AI chatbots to full-stack automation — RAETEC turns complex
          workflows into effortless operations.
        </p>

        <div
          style={{
            display: 'flex',
            gap: 16,
            flexWrap: 'wrap',
            justifyContent: justifyButtons,
            marginTop: 40,
          }}
        >
          <CtaLink href="#contact" accent={accent}>
            Get in Touch
          </CtaLink>
          <a
            href="#services"
            style={{
              display: 'inline-block',
              padding: '14px 28px',
              background: 'transparent',
              color: theme.heroText,
              fontWeight: 600,
              borderRadius: 8,
              textDecoration: 'none',
              fontSize: 16,
              fontFamily: "'Space Grotesk', sans-serif",
              border: `1px solid ${theme.navBorder}`,
              transition: 'opacity 0.2s',
            }}
          >
            Our Services
          </a>
        </div>
      </FadeIn>

      {/* Hero video — plays once on scroll into view */}
      <FadeIn
        delay={0.2}
        style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          maxWidth: 900,
          margin: '64px auto 0',
        }}
      >
        <HeroVideo />
      </FadeIn>
    </section>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function GridOverlay({ accent }: { accent: string }) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.04,
        backgroundImage: `
          linear-gradient(${accent} 1px, transparent 1px),
          linear-gradient(90deg, ${accent} 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
        pointerEvents: 'none',
      }}
    />
  );
}
