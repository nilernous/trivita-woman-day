# ARCHITECTURE.md

## 1. Overview

The project adopts a **Feature-Based Frontend Architecture** powered by Next.js App Router, React, TypeScript, and Tailwind CSS.

This is a personalized Vietnamese Women's Day (October 20) website for **female colleagues only**. The first version is frontend-only. Greeting data lives in typed TypeScript files. No backend or database is needed until the team needs dynamic content management or authenticated access.

The design source is the Stitch project **Woman Day** (`projects/786676700097094256`, created 2026-10-17), using the `Mở đầu - 2` screen as the main layout and the `Autumn Solace` design system for tokens. See [FRONTEND_DESIGN.md](FRONTEND_DESIGN.md) for the screen map and the changes needed to adapt its content for colleagues.

Guiding principle: **Organize code around capabilities, maintain neutrality in shared code, and introduce abstractions only when genuinely needed.**

## 2. Directory Structure

```text
src/
├── app/
│   ├── layout.tsx              # fonts, metadata, MotionProvider
│   ├── page.tsx                # general greeting
│   ├── globals.css             # Tailwind v4 @theme tokens, petal keyframes
│   └── [recipient]/
│       └── page.tsx            # personal greeting
├── features/
│   ├── greeting/
│   │   ├── components/
│   │   │   ├── GreetingExperience.tsx
│   │   │   └── GreetingHero.tsx
│   │   ├── data/
│   │   │   ├── greetings.ts
│   │   │   └── team-messages.ts
│   │   ├── lib/
│   │   │   └── get-greeting.ts
│   │   └── types/
│   │       └── greeting.ts
│   ├── scenes/
│   │   └── components/
│   │       ├── AppreciationScene.tsx
│   │       ├── QuoteCard.tsx
│   │       ├── QualityCard.tsx
│   │       ├── ColleagueGallery.tsx
│   │       ├── TeamMessages.tsx
│   │       ├── MemoryScene.tsx
│   │       └── ParallaxImage.tsx
│   ├── greeting-letter/
│   │   ├── components/
│   │   │   ├── LetterSection.tsx
│   │   │   ├── GreetingEnvelope.tsx
│   │   │   ├── GreetingLetter.tsx
│   │   │   ├── DateStamp.tsx
│   │   │   └── CopyGreetingButton.tsx
│   │   └── hooks/
│   │       └── use-letter-state.ts
│   ├── music/
│   │   └── components/
│   │       └── MusicToggle.tsx
│   └── motion/
│       ├── components/
│       │   ├── MotionProvider.tsx
│       │   ├── MotionReveal.tsx
│       │   ├── PetalLayer.tsx
│       │   └── BloomingRose.tsx
│       └── hooks/
│           └── use-media-query.ts
│
├── components/
│   ├── layouts/
│   │   ├── SiteHeader.tsx
│   │   └── SiteFooter.tsx
│   └── ui/
│       ├── button.tsx
│       ├── icons.tsx
│       └── section-heading.tsx
│
├── config/
│   └── site.ts
└── lib/
    └── cn.ts

public/
└── happy-woman-day/
    ├── scenes/               # hero-window.jpg, scene-sunset.jpg (from Stitch)
    └── colleagues/           # colleague-01.png … colleague-16.png (portraits)
```

Fonts (`EB Garamond`, `Be Vietnam Pro`) are loaded with `next/font` and the Vietnamese subset, so no `public/fonts/` folder is needed. Background music is optional: put a file in `public/audio/` and set `siteConfig.musicSrc`.

Only add files when there is an actual, isolated responsibility. The project does not use barrel files (`index.ts`); import directly via explicit module paths.

## 3. Area Responsibilities

### `app/`

- Declares routes, metadata, root layout, and composes individual features.
- Receives route parameters and invokes appropriate feature helpers.
- Must not contain full UI implementations or lengthy business logic.

### `features/greeting/`

- Defines greeting TypeScript types.
- Stores colleague greeting data and the optional static team messages.
- Retrieves greeting records by recipient slug.
- Falls back to a general greeting for all colleagues when the slug is unknown.
- Renders personalized names and messages.

### `features/scenes/`

- Manages the Tri ân and Kỷ niệm sections: quote card, quality cards, colleague portrait gallery, team messages, and the sunset scene with parallax.
- Controls layouts, image crops, and scene transitions.
- Receives content through props and never reads recipient data directly.

### `features/greeting-letter/`

- Manages the envelope open/close state.
- Provides accessible interaction for mouse, touch, and keyboard.
- Provides the copy-greeting action with a fallback when the Clipboard API is unavailable.
- Keeps the message readable when animations are off.

### `features/music/`

- Optional background music toggle (`Âm điệu`).
- Off by default. Loads and plays audio only after the user turns it on.

### `features/motion/`

- Provides reusable animation primitives: `MotionProvider` (`reducedMotion="user"`), `MotionReveal`, `PetalLayer` (CSS-only falling cherry blossoms), and `BloomingRose` (the interactive hero rose).
- Contains no greeting domain logic or recipient data.
- Built with full support for `prefers-reduced-motion`.

### `components/ui/`

- Houses generic, domain-agnostic UI primitives independent of 20/10 logic.
- Must not import from `features/`.

### `components/layouts/`

- `SiteHeader` (brand, anchor navigation `Mở đầu · Tri ân · Kỷ niệm · Bức thư`, slot for the music toggle) and `SiteFooter`.
- No profile or login controls.

### `config/`, `lib/`, `styles/`

- `config/`: Site-wide global configuration.
- `lib/`: Shared utility functions independent of any specific feature.
- `styles/`: Design tokens and global CSS rules.

## 4. Dependency Rules

```text
app/
 ├── composes features
 └── uses generic shared UI

features/
 ├── may use components/ui and lib
 ├── should not import app route modules
 └── should avoid cross-feature internal imports

components/ui/
 └── generic; must not depend on features

lib/ and config/
 └── generic; must not depend on app or features
```

Rules:
- Never introduce circular dependencies between features.
- Do not allow `components/ui` to import from `features`.
- Do not allow `lib` to import from `app` or `features`.
- If part of another feature needs to be shared, expose a small, deliberate public API with explicit justification.
- Keep content and data lookups cleanly separated from UI presentation components.

## 5. Greeting Feature Design

Proposed TypeScript interface:

```ts
export type Greeting = {
  recipientId: string;
  /** How the letter addresses her, e.g. "chị Lan", "em Mai". */
  displayName: string;
  title: string;
  message: string;
  closingMessage?: string;
  /** Sender shown under the letter, e.g. "Team Frontend". */
  signature: string;
};

export type TeamMessage = {
  author: string;
  message: string;
};
```

Sample data:

```ts
export const greetings: Record<string, Greeting> = {
  "chi-lan": {
    recipientId: "chi-lan",
    displayName: "chị Lan",
    title: "Chúc mừng ngày Phụ nữ Việt Nam 20/10",
    message:
      "Cảm ơn chị vì sự tận tâm và những lời động viên đúng lúc trong suốt thời gian qua. Chúc chị luôn vui vẻ, khỏe mạnh và có thật nhiều niềm vui trong công việc lẫn cuộc sống.",
    closingMessage: "Chúc chị một ngày 20/10 thật nhiều niềm vui!",
    signature: "Team · 20/10/2026",
  },
};
```

This is placeholder data. Replace it with reviewed copy before release. All messages must be colleague-appropriate (see [PROJECT_DESCRIPTION.md](PROJECT_DESCRIPTION.md#4-audience-and-tone-of-voice)). Store only names and messages, never emails, phone numbers, or other personal data.

## 6. Routing and Personalization

Both routes render the same single page (sections `#mo-dau`, `#tri-an`, `#ky-niem`, `#buc-thu`). Only the letter content changes.

### `/` — General Greeting

The shared version for all female colleagues, with a general letter signed by the team. It also serves as the fallback.

### `/[recipient]` — Personal Greeting

For example: `/chi-lan`. The route reads the slug from params, calls the lookup helper in the `greeting` feature, and renders that colleague's letter. Each colleague receives her own link.

Architecture Flow:

```text
Recipient route
      ↓
Greeting lookup
      ↓
Typed local greeting data
      ↓
Page composition
      ↓
Scenes + greeting letter
      ↓
Rendered experience
```

If a recipient is not found, show the general greeting from `/`. Slugs exist only for convenience and **are not a security mechanism**: anyone with the link can read the letter. If letters must be private, add authentication and access control.

Never place email addresses, private personal messages, or sensitive data in URLs.

## 7. Rendering and State

### Server Components by Default

Used for:
- Root layouts, page metadata, and static editorial content.
- Greeting data lookups from local configuration files.
- Visual storytelling scenes that do not require browser APIs.

### Client Components When Needed

Used for:
- Interactive envelope open/close toggle.
- Animations requiring component state or viewport intersection observers.
- Copy-greeting clipboard interaction.
- Music toggle (audio playback).
- Direct browser API access.

Never place `"use client"` at the root page level solely because a child component requires animation.

### State Management

- Letter open/close state: local React `useState`.
- Music on/off state: local state inside `MusicToggle`.
- Greeting content and team messages: typed local static data.
- Animation state: encapsulated directly within motion components.
- No Redux, Zustand, or server-state libraries required for the initial scope.

## 8. Animation and Styling

- Native CSS transitions for hover, focus, and lightweight micro-interactions.
- `motion` (`motion/react`) for the rose, scroll reveals, the envelope, and parallax. CSS keyframes for the hero copy entrance and the falling petals, so they need no JavaScript.
- Reveal-on-scroll elements carry `data-reveal`; a `<noscript>` rule in the root layout keeps them visible when JavaScript is off.
- Strict compliance with `prefers-reduced-motion`.
- Do not implement scroll-jacking or force users to wait for animation playback.
- Follow the `Soft Anime Illustration × Cinematic Nostalgia` direction and the Stitch `Autumn Solace` design system.
- Use ivory as the page base, cream for cards and the letter, dusty pink and rose for gentle accents, and muted red only for primary CTAs.
- Use `next/image` with explicit dimensions and responsive crops.

Design tokens (from Stitch `Autumn Solace`), declared in Tailwind v4 `@theme`:

```css
@theme {
  --color-ivory: #fff9f2;
  --color-cream: #f5e8d8;
  --color-dusty-pink: #d9a6a0;
  --color-rose: #c98287;
  --color-muted-red: #a84c4a;
  --color-muted-red-hover: #943f3d;
  --color-warm-brown: #765343;
  --color-dark-brown: #382a27;
  --color-charcoal: #333039;

  --font-display: "EB Garamond", serif;
  --font-body: "Be Vietnam Pro", sans-serif;

  --radius-sm: 0.125rem;
  --radius: 0.25rem;
  --radius-lg: 0.5rem;

  --shadow-paper: 0 12px 32px -4px rgb(56 42 39 / 0.06), 0 4px 12px -2px rgb(118 83 67 / 0.04);
}

:root {
  --content-max-width: 1280px;
  --reading-max-width: 760px;
}
```

Body text uses `--color-dark-brown`, not pure black. The full type scale is in [FRONTEND_DESIGN.md](FRONTEND_DESIGN.md#6-typography).

## 9. Performance and Accessibility

### Performance

- Optimize illustrations using AVIF or WebP where supported.
- Prioritize loading the hero image; lazy-load below-the-fold assets.
- Specify explicit dimensions or aspect ratios to eliminate layout shifts (CLS).
- Limit particle counts and avoid continuous background loops.
- Minimize client-side JavaScript bundle footprint.

### Accessibility

- Use semantic HTML landmarks and maintain an accurate heading hierarchy.
- Ensure all interactive elements are fully navigable and operable via keyboard.
- Provide clear, high-visibility focus indicators.
- Meaningful images require descriptive alt text; decorative images must use empty alt attributes (`alt=""`).
- Respect `prefers-reduced-motion` across all animated components.
- Never make critical content dependent on animation completion to become visible.
- Avoid autoplay audio; any background audio must feature intuitive controls and require explicit user opt-in.

## 10. Fallbacks and Error Handling

- Unknown recipient slug: show the general greeting for all colleagues.
- Missing optional illustration: keep the layout proportions with a cream color placeholder.
- Reduced motion enabled: render full content immediately without motion delays.
- Clipboard API unavailable: select the letter text so the user can copy it manually.
- Audio fails to load: keep the toggle off and the page fully usable.
- Missing closing message: skip the closing line without breaking the layout.
- No team messages: hide the `TeamMessages` block.

Never allow optional asset failures or missing fields to result in a blank screen or unreadable greeting.

## 11. Testing Strategy

Verify core behaviors:
- Greeting lookup returns the right data for each slug.
- Unknown slugs fall back to the general greeting.
- Envelope open/close works by keyboard, mouse, and touch.
- Names, Vietnamese diacritics, and messages render correctly.
- No copy addresses family, partners, or teachers.
- Reduced motion does not hide or clip content.
- Music never starts without a user action.
- Layouts and image crops work on mobile, tablet, and desktop.
- CTA anchors and the copy button do what they should.

Prioritize existing project testing tools; avoid adding large test frameworks solely for a small landing page.

## 12. Implementation Sequence

1. Set up fonts, Stitch design tokens, and page metadata.
2. Rename and optimize the illustrations in `public/happy-woman-day/`.
3. Build the header, the static hero, and the page skeleton from `Mở đầu - 2`.
4. Implement the `greeting` feature module and its data types.
5. Build the Tri ân and Kỷ niệm sections with colleague-oriented copy.
6. Build the accessible envelope, letter, and copy button.
7. Add the optional music toggle (opt-in).
8. Add restrained motion and reduced-motion fallbacks.
9. Check responsive crops and performance, mobile first.
10. Test routing fallbacks, diacritics, keyboard use, and copy on real phones.

## 13. Architecture Decisions

| Area | Decision |
| :--- | :--- |
| Audience | Female colleagues only |
| Design source | Stitch project **Woman Day** (2026-10-17), screen `Mở đầu - 2`, design system `Autumn Solace` |
| Architecture | Feature-based frontend architecture |
| Framework | Next.js 16 App Router |
| Language | TypeScript |
| Styling | Tailwind CSS v4 + Stitch design tokens |
| Fonts | EB Garamond (headings), Be Vietnam Pro (body) |
| Animation | `motion` for interactive and scroll animation; CSS for petals, hover, and focus |
| Data source | Typed local configuration |
| Backend / Database | Not needed in the initial release |
| Message wall | Not built; optional static team messages instead |
| Music | Optional, opt-in, off by default |
| State | Local React state (`useState`) |
| Rendering | Server Components by default |
| Routing | General `/` and personal `/[recipient]` (prerendered with `generateStaticParams`, `instant = false`) |
| Tooling | Bun, Biome |
| Visual direction | Soft Anime Illustration × Cinematic Nostalgia |

## 14. Final Principles

Organize code cleanly around capabilities: greeting, scenes, letter interaction, music, and motion primitives. Keep shared UI components domain-neutral, begin with local typed data, and introduce architectural layers only when justified by concrete product needs. Illustration craftsmanship, narrative flow, readability, and performance must take precedence over library count or conceptual abstraction.
