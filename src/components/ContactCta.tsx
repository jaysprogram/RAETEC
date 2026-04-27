import { FadeIn } from './FadeIn';
import { containerStyle } from './Services';

interface ContactCtaProps {
  accent: string;
}

export function ContactCta({ accent }: ContactCtaProps) {
  return (
    <section
      id="contact"
      style={{
        padding: 'clamp(64px, 10vw, 120px) 24px',
        background: accent,
        color: '#fff',
        textAlign: 'center',
        transition: 'background 0.4s',
      }}
    >
      <div style={containerStyle}>
        <FadeIn>
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(28px, 4vw, 48px)',
              fontWeight: 700,
              marginBottom: 16,
              letterSpacing: '-0.02em',
            }}
          >
            Ready to automate?
          </h2>

          <p
            style={{
              fontSize: 18,
              opacity: 0.85,
              maxWidth: 480,
              margin: '0 auto 32px',
              lineHeight: 1.6,
            }}
          >
            Tell us about your project and we'll get back to you within 24 hours.
          </p>

          <a
            href="mailto:hello@raetec.com"
            style={{
              display: 'inline-block',
              padding: '14px 36px',
              background: '#fff',
              color: accent,
              fontWeight: 600,
              borderRadius: 8,
              textDecoration: 'none',
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 16,
              transition: 'transform 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.04)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            Contact Us
          </a>
        </FadeIn>
      </div>
    </section>
  );
}
