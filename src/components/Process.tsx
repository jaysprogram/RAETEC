import { FadeIn } from './FadeIn';
import { processSteps } from '../data/content';
import type { Theme } from '../theme';
import { SectionLabel, SectionTitle, containerStyle } from './Services';

interface ProcessProps {
  theme: Theme;
  accent: string;
}

export function Process({ theme, accent }: ProcessProps) {
  return (
    <section
      id="process"
      style={{
        padding: 'clamp(64px, 10vw, 120px) 24px',
        background: theme.bgAlt,
        transition: 'background 0.4s',
      }}
    >
      <WorkSamples theme={theme} accent={accent} />
      <HowItWorks theme={theme} accent={accent} />
    </section>
  );
}

// ── Work samples row ──────────────────────────────────────────────────────────

const workSamples = [
  { label: 'PROJECT SCREENSHOT / CASE STUDY 1', hint: 'e.g. AI chatbot interface' },
  { label: 'PROJECT SCREENSHOT / CASE STUDY 2', hint: 'e.g. automation dashboard' },
  { label: 'PROJECT SCREENSHOT / CASE STUDY 3', hint: 'e.g. data pipeline visualization' },
];

function WorkSamples({ theme, accent }: { theme: Theme; accent: string }) {
  return (
    <div style={{ ...containerStyle, marginBottom: 80 }}>
      <FadeIn>
        <SectionLabel accent={accent}>Our Work</SectionLabel>
        <SectionTitle theme={theme}>Built for real business impact</SectionTitle>
      </FadeIn>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 20,
          marginTop: 40,
        }}
      >
        {workSamples.map((sample, index) => (
          <FadeIn key={index} delay={index * 0.1}>
            <WorkSamplePlaceholder sample={sample} theme={theme} />
          </FadeIn>
        ))}
      </div>
    </div>
  );
}

function WorkSamplePlaceholder({
  sample,
  theme,
}: {
  sample: (typeof workSamples)[number];
  theme: Theme;
}) {
  return (
    <div
      style={{
        paddingBottom: '66%',
        position: 'relative',
        borderRadius: 12,
        background: `repeating-linear-gradient(
          45deg,
          ${theme.border} 0px,
          ${theme.border} 8px,
          transparent 8px,
          transparent 16px
        )`,
        border: `1px dashed ${theme.border}`,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6,
          padding: 16,
          textAlign: 'center',
        }}
      >
        <span
          style={{
            fontSize: 11,
            fontFamily: 'monospace',
            color: theme.textMuted,
            opacity: 0.7,
          }}
        >
          [ {sample.label} ]
        </span>
        <span
          style={{
            fontSize: 11,
            fontFamily: 'monospace',
            color: theme.textMuted,
            opacity: 0.4,
          }}
        >
          {sample.hint}
        </span>
      </div>
    </div>
  );
}

// ── Process steps ─────────────────────────────────────────────────────────────

function HowItWorks({ theme, accent }: { theme: Theme; accent: string }) {
  return (
    <div style={containerStyle}>
      <FadeIn>
        <SectionLabel accent={accent}>How It Works</SectionLabel>
        <SectionTitle theme={theme}>From idea to production in weeks</SectionTitle>
      </FadeIn>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 32,
          marginTop: 48,
        }}
      >
        {processSteps.map((step, index) => (
          <FadeIn key={step.number} delay={index * 0.12}>
            <ProcessStepCard step={step} theme={theme} accent={accent} />
          </FadeIn>
        ))}
      </div>
    </div>
  );
}

function ProcessStepCard({
  step,
  theme,
  accent,
}: {
  step: (typeof processSteps)[number];
  theme: Theme;
  accent: string;
}) {
  return (
    <div style={{ position: 'relative' }}>
      <div
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 48,
          fontWeight: 700,
          color: accent,
          opacity: 0.2,
          marginBottom: -12,
          lineHeight: 1,
        }}
      >
        {step.number}
      </div>
      <h3
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 20,
          fontWeight: 600,
          marginBottom: 8,
          color: theme.text,
        }}
      >
        {step.title}
      </h3>
      <p style={{ color: theme.textMuted, lineHeight: 1.6, fontSize: 15 }}>
        {step.description}
      </p>
    </div>
  );
}
