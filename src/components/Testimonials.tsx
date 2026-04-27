import { FadeIn } from './FadeIn';
import { testimonials } from '../data/content';
import type { Theme } from '../theme';
import { SectionLabel, SectionTitle, sectionStyle, containerStyle } from './Services';

interface TestimonialsProps {
  theme: Theme;
  accent: string;
}

export function Testimonials({ theme, accent }: TestimonialsProps) {
  return (
    <section id="testimonials" style={sectionStyle(theme)}>
      <div style={containerStyle}>
        <FadeIn>
          <SectionLabel accent={accent}>Testimonials</SectionLabel>
          <SectionTitle theme={theme}>Trusted by teams that move fast</SectionTitle>
        </FadeIn>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 24,
            marginTop: 48,
          }}
        >
          {testimonials.map((testimonial, index) => (
            <FadeIn key={testimonial.name} delay={index * 0.1}>
              <TestimonialCard testimonial={testimonial} theme={theme} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({
  testimonial,
  theme,
}: {
  testimonial: (typeof testimonials)[number];
  theme: Theme;
}) {
  return (
    <div
      style={{
        background: theme.cardBg,
        border: `1px solid ${theme.border}`,
        borderRadius: 12,
        padding: 28,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        transition: 'background 0.4s',
      }}
    >
      <p
        style={{
          fontSize: 16,
          lineHeight: 1.7,
          marginBottom: 24,
          fontStyle: 'italic',
          color: theme.textMuted,
        }}
      >
        "{testimonial.quote}"
      </p>
      <div>
        <p
          style={{
            fontWeight: 600,
            fontFamily: "'Space Grotesk', sans-serif",
            color: theme.text,
          }}
        >
          {testimonial.name}
        </p>
        <p style={{ fontSize: 13, color: theme.textMuted }}>{testimonial.role}</p>
      </div>
    </div>
  );
}
