import { useState } from 'react';
import type { Theme } from '../theme';

const NAV_LINKS = ['Services', 'Process', 'Testimonials', 'FAQ'] as const;

interface NavProps {
  theme: Theme;
  accent: string;
}

export function Nav({ theme, accent }: NavProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: theme.navBg,
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${theme.navBorder}`,
      }}
    >
      {/* Desktop bar */}
      <div
        style={{
          maxWidth: 1120,
          margin: '0 auto',
          padding: '14px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Logo src={theme.logoSrc} />

        <DesktopLinks theme={theme} accent={accent} />

        <HamburgerButton
          isOpen={menuOpen}
          color={theme.text}
          onClick={() => setMenuOpen((prev) => !prev)}
        />
      </div>

      {/* Mobile dropdown */}
      <MobileMenu
        isOpen={menuOpen}
        theme={theme}
        accent={accent}
        onLinkClick={closeMenu}
      />
    </nav>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function Logo({ src }: { src: string }) {
  return (
    <div
      role="img"
      aria-label="RAETEC"
      style={{
        width: 280,
        height: 40,
        flexShrink: 0,
        backgroundImage: `url('${src}')`,
        backgroundSize: '240% auto',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
      }}
    />
  );
}

function DesktopLinks({ theme, accent }: { theme: Theme; accent: string }) {
  return (
    <div
      className="nav-desktop"
      style={{ display: 'flex', gap: 28, alignItems: 'center' }}
    >
      {NAV_LINKS.map((label) => (
        <a
          key={label}
          href={`#${label.toLowerCase()}`}
          style={{
            textDecoration: 'none',
            color: theme.textMuted,
            fontSize: 14,
            fontWeight: 500,
            transition: 'color 0.2s',
            fontFamily: "'Space Grotesk', sans-serif",
          }}
        >
          {label}
        </a>
      ))}
      <CtaLink href="#contact" accent={accent} style={{ fontSize: 14, padding: '8px 20px' }}>
        Contact Us
      </CtaLink>
    </div>
  );
}

function HamburgerButton({
  isOpen,
  color,
  onClick,
}: {
  isOpen: boolean;
  color: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="nav-hamburger"
      aria-label="Menu"
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: 8,
        display: 'none',
        flexDirection: 'column',
        gap: 5,
      }}
    >
      <span
        style={{
          display: 'block',
          width: 24,
          height: 2,
          background: color,
          transform: isOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
          transition: 'transform 0.3s',
        }}
      />
      <span
        style={{
          display: 'block',
          width: 24,
          height: 2,
          background: color,
          opacity: isOpen ? 0 : 1,
          transition: 'opacity 0.3s',
        }}
      />
      <span
        style={{
          display: 'block',
          width: 24,
          height: 2,
          background: color,
          transform: isOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
          transition: 'transform 0.3s',
        }}
      />
    </button>
  );
}

function MobileMenu({
  isOpen,
  theme,
  accent,
  onLinkClick,
}: {
  isOpen: boolean;
  theme: Theme;
  accent: string;
  onLinkClick: () => void;
}) {
  return (
    <div
      style={{
        maxHeight: isOpen ? 320 : 0,
        overflow: 'hidden',
        transition: 'max-height 0.4s ease',
        background: theme.bg,
        borderTop: isOpen ? `1px solid ${theme.border}` : 'none',
      }}
    >
      <div
        style={{
          padding: '16px 24px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
        }}
      >
        {NAV_LINKS.map((label) => (
          <a
            key={label}
            href={`#${label.toLowerCase()}`}
            onClick={onLinkClick}
            style={{
              textDecoration: 'none',
              color: theme.textMuted,
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 500,
              fontSize: 16,
              padding: '12px 0',
              borderBottom: `1px solid ${theme.border}`,
              display: 'block',
              transition: 'color 0.2s',
            }}
          >
            {label}
          </a>
        ))}
        <CtaLink
          href="#contact"
          accent={accent}
          onClick={onLinkClick}
          style={{ marginTop: 12, textAlign: 'center', display: 'block' }}
        >
          Contact Us
        </CtaLink>
      </div>
    </div>
  );
}

// Reusable CTA anchor styled as a button
export function CtaLink({
  href,
  accent,
  children,
  style = {},
  onClick,
}: {
  href: string;
  accent: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: () => void;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      style={{
        display: 'inline-block',
        padding: '14px 28px',
        background: accent,
        color: '#fff',
        fontWeight: 600,
        borderRadius: 8,
        textDecoration: 'none',
        fontSize: 16,
        fontFamily: "'Space Grotesk', sans-serif",
        transition: 'transform 0.2s, opacity 0.2s',
        ...style,
      }}
      onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.88')}
      onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
    >
      {children}
    </a>
  );
}
