export type ThemeKey = 'light' | 'dark' | 'mixed';

export interface Theme {
  bg: string;
  bgAlt: string;
  text: string;
  textMuted: string;
  cardBg: string;
  border: string;
  heroBg: string;
  heroText: string;
  heroTextMuted: string;
  navBg: string;
  navBorder: string;
  logoSrc: string;
}

export const themes: Record<ThemeKey, Theme> = {
  light: {
    bg: '#FAFAF8',
    bgAlt: '#F0EFEB',
    text: '#1a1a2e',
    textMuted: '#6b6b80',
    cardBg: '#fff',
    border: '#e5e5e0',
    heroBg: '#FAFAF8',
    heroText: '#1a1a2e',
    heroTextMuted: '#6b6b80',
    navBg: 'rgba(250,250,248,0.9)',
    navBorder: '#e5e5e0',
    logoSrc: '/logo-light.png',
  },
  dark: {
    bg: '#0F1117',
    bgAlt: '#181A24',
    text: '#E8E8EC',
    textMuted: '#8888A0',
    cardBg: '#1C1E2A',
    border: '#2A2C3A',
    heroBg: '#0F1117',
    heroText: '#E8E8EC',
    heroTextMuted: '#8888A0',
    navBg: 'rgba(15,17,23,0.92)',
    navBorder: '#2A2C3A',
    logoSrc: '/logo-dark.png',
  },
  mixed: {
    bg: '#FAFAF8',
    bgAlt: '#F0EFEB',
    text: '#1a1a2e',
    textMuted: '#6b6b80',
    cardBg: '#fff',
    border: '#e5e5e0',
    // Hero uses dark background in mixed mode
    heroBg: '#0F1117',
    heroText: '#E8E8EC',
    heroTextMuted: '#8888A0',
    navBg: 'rgba(15,17,23,0.92)',
    navBorder: '#2A2C3A',
    logoSrc: '/logo-dark.png',
  },
};

export const ACCENT_COLOR = '#E87A2A';
