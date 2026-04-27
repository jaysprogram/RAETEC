import { useState } from 'react';
import { FadeIn } from './FadeIn';
import { services } from '../data/content';
import type { Theme } from '../theme';

interface ServicesProps {
  theme: Theme;
  accent: string;
}

export function Services({ theme, accent }: ServicesProps) {
  return (
    <section id="services" style={sectionStyle(theme)}>
      <div style={containerStyle}>
        <FadeIn>
          <SectionLabel accent={accent}>What We Do</SectionLabel>
          <SectionTitle theme={theme}>Solutions that scale with your ambition</SectionTitle>
        </FadeIn>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 24,
            marginTop: 48,
          }}
        >
          {services.map((service, index) => (
            <FadeIn key={service.title} delay={index * 0.1}>
              <ServiceCard service={service} theme={theme} accent={accent} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  service,
  theme,
  accent,
}: {
  service: (typeof services)[number];
  theme: Theme;
  accent: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: theme.cardBg,
        border: `1px solid ${hovered ? accent : theme.border}`,
        borderRadius: 12,
        padding: 28,
        height: '100%',
        transition: 'border-color 0.3s, transform 0.3s, background 0.4s',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
      }}
    >
      <div
        style={{
          fontSize: 28,
          color: accent,
          marginBottom: 16,
          fontFamily: "'Space Grotesk', sans-serif",
        }}
      >
        {service.icon}
      </div>
      <h3
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 20,
          fontWeight: 600,
          marginBottom: 12,
          color: theme.text,
        }}
      >
        {service.title}
      </h3>
      <p style={{ color: theme.textMuted, lineHeight: 1.6, fontSize: 15 }}>
        {service.description}
      </p>
    </div>
  );
}

// ── Shared layout helpers (used across sections) ──────────────────────────────

export function SectionLabel({
  accent,
  children,
}: {
  accent: string;
  children: React.ReactNode;
}) {
  return (
    <p
      style={{
        fontSize: 13,
        fontFamily: "'Space Grotesk', sans-serif",
        letterSpacing: 3,
        textTransform: 'uppercase',
        color: accent,
        marginBottom: 12,
        fontWeight: 600,
      }}
    >
      {children}
    </p>
  );
}

export function SectionTitle({
  theme,
  children,
}: {
  theme: Theme;
  children: React.ReactNode;
}) {
  return (
    <h2
      style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: 'clamp(26px, 3.5vw, 42px)',
        fontWeight: 700,
        letterSpacing: '-0.02em',
        lineHeight: 1.15,
        color: theme.text,
      }}
    >
      {children}
    </h2>
  );
}

export function sectionStyle(theme: Theme): React.CSSProperties {
  return {
    padding: 'clamp(64px, 10vw, 120px) 24px',
    background: theme.bg,
    transition: 'background 0.4s',
  };
}

export const containerStyle: React.CSSProperties = {
  maxWidth: 1120,
  margin: '0 auto',
  width: '100%',
};
