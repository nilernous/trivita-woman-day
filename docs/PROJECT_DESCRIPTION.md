# PROJECT_DESCRIPTION.md

## 1. Project Overview

**Woman Day — 20/10** is a small website made to send Vietnamese Women's Day (October 20) greetings to **female colleagues**. It should feel like a small gift prepared by the team: sincere, warm, polite, and right for a workplace.

The audience is limited to colleagues. The site is not a public greeting-card generator for family, partners, or teachers.

**Visual direction:** `Soft Anime Illustration × Cinematic Nostalgia`. This means semi-realistic anime illustration, natural window light and golden-hour tones, warm film-like color grading, and gentle editorial motion.

## 2. Design Source

The visual design comes from the Stitch project below.

| Field | Value |
| :--- | :--- |
| Project name | **Woman Day** |
| Project ID | `projects/786676700097094256` |
| Created | 2026-10-17 |
| Device | Desktop (1280px frames) |
| Visibility | Private (owner only) |
| Design system | `Autumn Solace` |

Screens in the project:

| Screen | Role |
| :--- | :--- |
| `Mở đầu - 2` | **Primary reference** for the landing page: hero, appreciation, memory scene, envelope letter, footer |
| `Mở đầu` | Earlier variant of the landing page; use it only for alternative section layouts |
| `Tri Ân` | Reference for a longer appreciation section (quote, four qualities, message wall) |
| 3 illustration prompts | Hero portrait by a window, seaside sunset, family scene with flowers |

Stitch is the source for **layout, components, and design tokens**. The docs in this repository are the source for **audience, copy, and scope**. Stitch's sample copy is written for a general audience (mother, partner, teacher), so it must be adapted before it is used. See [FRONTEND_DESIGN.md](FRONTEND_DESIGN.md#3-adapting-the-stitch-design-for-colleagues).

## 3. Objectives

- Send 20/10 greetings to each colleague, with her name.
- Express appreciation in a warm, polite, and sincere way.
- Create a pleasant visual experience with anime illustrations and a short visual story.
- Work smoothly on mobile first (most colleagues will open the link on a phone), plus tablet and desktop.
- Keep the system simple, easy to edit, and free of unnecessary infrastructure.

## 4. Audience and Tone of Voice

The only audience is the creator's **female colleagues**.

Content guidelines:
- Use Vietnamese as the display language.
- Keep it warm, positive, respectful, and suitable for the workplace.
- Use colleague-appropriate address forms such as `chị`, `em`, or `bạn`, chosen per person.
- Do not use romantic or overly intimate wording (`người thương`, `người tôi yêu`, `bông hoa nhỏ của anh`, and similar).
- Do not use family-directed copy (`Mẹ`, `con`, `gia đình`) or teacher-directed copy (`cô giáo`, `học sinh`).
- Appreciate colleagues for who they are at work and in the team: dedication, care, resilience, and the energy they bring to the team.
- Sign messages from the team or from the sender, never as an anonymous public voice.
- Never put sensitive personal information in URLs or in data files.

## 5. Core Experience

The flow follows the `Mở đầu - 2` screen. Navigation anchors: **Mở đầu · Tri ân · Kỷ niệm · Bức thư**.

1. **Mở đầu (hero):** Window-light portrait, the label `20 THÁNG 10 · NGÀY PHỤ NỮ VIỆT NAM`, a headline, a short opening message, and two CTAs.
2. **Tri ân (appreciation):** A short message of thanks, one quote card, and three quality cards, rewritten for colleagues.
3. **Kỷ niệm (memory scene):** A wide seaside sunset with one short message.
4. **Bức thư (letter):** An envelope that opens on click, tap, or keyboard to show the personal letter with the colleague's name, plus a copy button.
5. **Footer:** A short closing wish, the date, and the team signature.

Core content must stay readable when animations are reduced or disabled.

## 6. Functional Scope

### In Scope for the First Version

- Responsive landing page, mobile first.
- Vietnamese copy written for colleagues.
- Personalized recipient name and greeting per colleague.
- Illustrated sections with one consistent art direction.
- Scroll-triggered and interaction-based entrance animations.
- Envelope/letter opened by click, tap, or keyboard.
- "Copy greeting" button (`Sao chép lời chúc`).
- Optional background music, **off by default**, played only after the user turns it on (`Âm điệu` toggle).
- Keyboard navigation and `prefers-reduced-motion` support.
- Optimized images with responsive crops.

### Out of Scope by Default

- Recipient presets for non-colleagues (`Mẹ Kính Yêu`, `Người Thương / Vợ`, `#CảmƠnMẹ`, `#BiếtƠnCô`, `#GửiNgườiThương`).
- Public message wall with a submission form (the `Bức tường ngàn lời tri ân` block in the `Tri Ân` screen). It needs a backend, storage, and moderation. A static list of messages written by the team is allowed instead.
- User registration, login, profile icon, and access control.
- Recipient management dashboard, CMS, backend API, or database.
- Analytics that identify users.

For a project this small, typed TypeScript data is enough. Add a backend only if the team needs to manage recipients dynamically, edit content without redeploying, or protect private data.

## 7. Visual Identity

Tokens come from the Stitch design system `Autumn Solace`.

### Style

- Semi-realistic anime with detailed hair, fabric, flowers, and environments.
- Window light, golden-hour glow, and nostalgic film color grading.
- Editorial layout with generous whitespace, built around a visual story.
- Paper-like layering: soft tinted shadows and thin borders instead of heavy drop shadows.
- Gentle motion that never distracts from reading.
- No harsh neon, oversaturated gradients, or heavy glassmorphism.

### Color Palette

| Token | Hex | Role |
| :--- | :--- | :--- |
| Ivory | `#FFF9F2` | Page background (used instead of pure white) |
| Cream | `#F5E8D8` | Cards, panels, letter surfaces |
| Dusty Pink | `#D9A6A0` | Soft fills, borders, hover states |
| Rose | `#C98287` | Secondary accents, chips, link underline |
| Muted Red | `#A84C4A` | Primary CTA and key highlights |
| Warm Brown | `#765343` | UI frames, secondary text |
| Dark Brown | `#382A27` | Main text color, dark cinematic scenes |
| Charcoal | `#333039` | High-contrast microcopy and fine rules |

### Typography

- Headings: `EB Garamond`
- Body and UI: `Be Vietnam Pro`

Both fonts must support Vietnamese diacritics. Keep text contrast high and readable at every breakpoint.

## 8. Tech Stack

- Next.js App Router (`next@16`)
- React 19 + TypeScript
- Tailwind CSS v4
- Biome for linting and formatting
- Bun as the package manager
- `next/image` for images
- [Motion](https://motion.dev) (`motion`, imported from `motion/react`) for the blooming rose, scroll reveals, the envelope, and parallax; CSS keyframes for the falling petals

Follow the project's existing package manager, lint, format, and component conventions. Do not add a library when plain CSS or an existing dependency does the job.

## 9. Quality Requirements

- **Responsive:** Good experience on mobile, tablet, and desktop, with mobile as the priority.
- **Performance:** Optimized images with set dimensions and little client-side JavaScript.
- **Accessibility:** Semantic HTML, keyboard navigation, visible focus states, strong contrast, and reduced-motion support.
- **Maintainability:** Code organized by feature, with content kept apart from presentation.
- **Personalization:** Recipient data kept separate from display components.
- **Reliability:** Core content stays usable when animations are off.
- **Privacy:** Store only the data needed to show a greeting (name and message).

## 10. Acceptance Criteria

- A colleague can open and read the site easily on her phone.
- Her name and greeting display correctly, with correct Vietnamese diacritics.
- No copy is addressed to family, partners, or teachers, and none of it is romantic.
- All illustrations share one artistic style and color grading.
- Interactive elements work with mouse, touch, and keyboard.
- Animations never hide or block important content.
- Music never plays without the user's action.
- Images load without unexpected layout shift (CLS).
- A new colleague can be added by editing one data file.

## 11. Product Principle

> Make it feel like a small, thoughtful gift from the team, not a commercial landing page.

Put sincerity, illustration quality, storytelling, readability, and performance ahead of decorative effects.
