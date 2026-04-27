# RAETEC Landing Page — Frontend

## Stack

- **React 19** + **TypeScript 6** via **Vite 8**
- No CSS framework — all styles are React inline styles
- No state management library — local `useState` only
- No routing — single-page, anchor-link navigation

## Commands

```bash
npm run dev       # dev server at http://localhost:5173
npm run build     # tsc type-check + vite production build → dist/
npm run preview   # serve dist/ locally
npm run lint      # eslint
```

## Project structure

```
src/
├── theme/index.ts          # Theme tokens (light/dark/mixed) and accent color
├── data/content.ts         # All static copy: services, steps, testimonials, FAQs
├── hooks/useInView.ts      # IntersectionObserver hook → triggers scroll animations
└── components/
    ├── FadeIn.tsx           # Scroll-triggered fade-up wrapper (used everywhere)
    ├── Nav.tsx              # Sticky nav + mobile hamburger + CtaLink export
    ├── Hero.tsx             # Full-height hero with grid overlay + media placeholder
    ├── Services.tsx         # 4-card grid — also exports SectionLabel, SectionTitle,
    │                        #   sectionStyle, containerStyle (shared by other sections)
    ├── Process.tsx          # Work-sample placeholders + 4-step process
    ├── Testimonials.tsx     # 3-col testimonial cards
    ├── Faq.tsx              # Accordion FAQ
    ├── ContactCta.tsx       # Orange full-width CTA + mailto link
    └── Footer.tsx           # Dark footer with logo
public/
├── logo-light.png          # Color logo — used on light backgrounds
└── logo-dark.png           # White logo — used on dark backgrounds
```

## Theme

The active theme and accent color are set as constants at the top of `src/App.tsx`:

```ts
const THEME: ThemeKey = 'light'; // 'light' | 'dark' | 'mixed'
const ACCENT = ACCENT_COLOR;     // '#E87A2A' — defined in src/theme/index.ts
const HERO_CENTERED = true;
const SHOW_HERO_GRID = true;
```

`themes` in `src/theme/index.ts` maps each `ThemeKey` to a full `Theme` object (bg, text, border, card, nav, hero colors, logo path). Every component receives `theme` and `accent` as props — no context.

## Styling conventions

- **Inline styles only.** No CSS classes for layout or theming.
- **CSS classes** are used only where inline styles can't reach: `@media` queries and `:hover` pseudo-classes that need class selectors. These live in the `<GlobalStyles>` component in `App.tsx`.
- **Transitions** are always written as inline `transition:` strings so they animate when theme props change.
- `verbatimModuleSyntax` is enabled — use `import type` for all type-only imports.

## Adding a new section

1. Create `src/components/MySection.tsx`
2. Accept `theme: Theme` and `accent: string` as props
3. Use `SectionLabel`, `SectionTitle`, `sectionStyle`, `containerStyle` from `Services.tsx` for consistent spacing
4. Wrap animating content in `<FadeIn>`
5. Add it to the `<main>` block in `App.tsx`

## Adding / editing copy

All text content lives in `src/data/content.ts` as typed arrays. Edit there — no component changes needed for copy updates.

## TypeScript notes

- `verbatimModuleSyntax` is on — all type imports must use `import type { ... }`
- `noUnusedLocals` and `noUnusedParameters` are on — clean up before building
- Target is `es2023` with `moduleResolution: bundler`
