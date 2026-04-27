interface FooterProps {
  isDark: boolean;
}

export function Footer({ isDark }: FooterProps) {
  return (
    <footer
      style={{
        background: isDark ? '#0A0B10' : '#1a1a2e',
        color: '#8888A0',
        padding: '48px 24px',
        textAlign: 'center',
        fontSize: 14,
      }}
    >
      <div
        role="img"
        aria-label="RAETEC"
        style={{
          width: 140,
          height: 36,
          backgroundImage: "url('/logo-dark.png')",
          backgroundSize: '300% auto',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          margin: '0 auto 16px',
          opacity: 0.7,
        }}
      />
      <p>© 2026 RAETEC. All rights reserved.</p>
    </footer>
  );
}
