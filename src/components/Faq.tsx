import { useState } from 'react';
import { FadeIn } from './FadeIn';
import { faqs } from '../data/content';
import type { Theme } from '../theme';
import { SectionLabel, SectionTitle, containerStyle } from './Services';

interface FaqProps {
  theme: Theme;
  accent: string;
}

export function Faq({ theme, accent }: FaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      id="faq"
      style={{
        padding: 'clamp(64px, 10vw, 120px) 24px',
        background: theme.bgAlt,
        transition: 'background 0.4s',
      }}
    >
      <div style={{ ...containerStyle, maxWidth: 720 }}>
        <FadeIn>
          <SectionLabel accent={accent}>FAQ</SectionLabel>
          <SectionTitle theme={theme}>Common questions</SectionTitle>
        </FadeIn>

        <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {faqs.map((faq, index) => (
            <FadeIn key={index} delay={index * 0.08}>
              <FaqItem
                faq={faq}
                isOpen={openIndex === index}
                onToggle={() => toggle(index)}
                theme={theme}
                accent={accent}
              />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqItem({
  faq,
  isOpen,
  onToggle,
  theme,
  accent,
}: {
  faq: (typeof faqs)[number];
  isOpen: boolean;
  onToggle: () => void;
  theme: Theme;
  accent: string;
}) {
  return (
    <div
      onClick={onToggle}
      style={{
        background: theme.cardBg,
        border: `1px solid ${theme.border}`,
        borderRadius: 12,
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'border-color 0.3s, background 0.4s',
      }}
    >
      {/* Question row */}
      <div
        style={{
          padding: '18px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 500,
          fontSize: 16,
          color: theme.text,
        }}
      >
        {faq.question}
        <span
          style={{
            transform: isOpen ? 'rotate(45deg)' : 'rotate(0)',
            transition: 'transform 0.3s',
            fontSize: 22,
            color: accent,
            flexShrink: 0,
            marginLeft: 16,
          }}
        >
          +
        </span>
      </div>

      {/* Answer — collapses via max-height */}
      <div
        style={{
          maxHeight: isOpen ? 200 : 0,
          overflow: 'hidden',
          transition: 'max-height 0.4s ease',
          padding: isOpen ? '0 24px 18px' : '0 24px',
          color: theme.textMuted,
          fontSize: 15,
          lineHeight: 1.6,
        }}
      >
        {faq.answer}
      </div>
    </div>
  );
}
