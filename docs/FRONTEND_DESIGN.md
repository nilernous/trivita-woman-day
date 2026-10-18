# FRONTEND_DESIGN.md

# Woman Day 20/10 — Frontend Design Specification

## 1. Overview

This spec covers a responsive Vietnamese Women's Day (20/10) website for **female colleagues**. It is built on the Stitch project **Woman Day** (`projects/786676700097094256`, created 2026-10-17) and its design system **Autumn Solace**.

The visual direction mixes two parts:
- **70% Soft Anime Illustration:** semi-realistic anime characters, detailed hair and clothing, painterly backgrounds, and soft natural light.
- **30% Cinematic Nostalgia:** sunset scenes, warm film-like grading, atmospheric depth, gentle transitions, and a story told through scenes.

The result should look like a frame from a well-illustrated anime film, not a generic pink promotional page. The tone is warm and appreciative, and it must stay professional: it is a gift from the team to colleagues.

### Primary goals

1. Make a memorable, sincere 20/10 greeting for each colleague.
2. Let illustration and storytelling lead the visual hierarchy.
3. Keep Vietnamese text readable and accessible.
4. Deliver a polished experience on mobile first, then desktop.
5. Use motion sparingly, to support the mood rather than distract.

## 2. Stitch Screen Map

| Stitch screen | Use in the build |
| :--- | :--- |
| `Mở đầu - 2` | **Primary layout** for the single landing page: header, hero, Tri ân, Kỷ niệm, Bức thư, footer |
| `Mở đầu` | Alternative layouts only (for example, the three numbered quality cards and the stamp-style letter) |
| `Tri Ân` | Reference for the quote block and quality cards. Its message wall becomes a static team-message list. |
| Illustration prompts | Window portrait (hero) and seaside sunset (memory scene). Do not use the mother-and-daughter scene. |

Build **one page** with anchor sections. Do not build `Tri Ân` as a separate route unless the content grows beyond one section.

## 3. Adapting the Stitch Design for Colleagues

Stitch's sample copy targets a general audience. Keep the layout and components, and replace the content as follows.

| Stitch element | Change for this project |
| :--- | :--- |
| Recipient chips `Mẹ Kính Yêu` · `Người Thương / Vợ` · `Chị Em / Đồng Nghiệp` | Remove. The recipient comes from the colleague's link (`/[recipient]`). |
| Quick presets `Dành tặng Mẹ` · `Dành tặng Người thương` · `Bạn bè & Đồng nghiệp` | Remove, or replace with 2–3 workplace-only messages |
| Letter text `Gửi Mẹ thương mến…` / `Kính gửi Mẹ kính yêu, Người phụ nữ con thương` | Use the colleague's personal greeting from the data file |
| Letter signature `Gia Đình · 20/10` | Team or sender signature, for example `Team … · 20/10/2026` |
| Quote signature `— Gửi những người phụ nữ tôi yêu` | `— Gửi những người đồng nghiệp tuyệt vời` or similar |
| Copy about mothers, sisters, partners (`người mẹ tần tảo`, `bữa cơm`, `mái nhà`, `con trưởng thành`) | Rewrite around work: dedication, care for the team, calm under pressure, the energy she brings |
| `Tri Ân` message wall with form and hashtags `#CảmƠnMẹ`, `#BiếtƠnCô`, `#GửiNgườiThương` | Remove the form. Optionally show a static list of short messages written by the team. |
| Header `person` icon | Remove (no accounts) |
| `Âm điệu` music button | Keep, off by default, opt-in only |
| `Thu 2024`, `© 2024` | `Thu 2026`, `© 2026` |
| `Viết lời chúc`, `Gửi lời tri ân` CTAs | Point to the `#buc-thu` letter section |

Example copy, written for colleagues:
- Hero support line: `Một chút trân trọng gửi đến những đồng nghiệp đã khiến mỗi ngày làm việc trở nên ấm áp hơn.`
- Quality cards: `Sự tận tâm thầm lặng` · `Nụ cười giữa những ngày bận rộn` · `Vững vàng trước mọi deadline`
- Footer: `20 Tháng 10 · Gửi những điều dịu dàng nhất đến các chị em trong team.`

Final copy must be reviewed before release.

## 4. Visual Direction

### Keywords

`soft anime` · `cinematic` · `nostalgic` · `warm sunlight` · `painterly` · `editorial` · `paper texture` · `gentle motion`

### Art direction

Illustrations should have:
- Semi-realistic anime proportions and expressive faces.
- Carefully drawn hair, fabric, flowers, and background details.
- Natural directional light, such as morning window light or golden hour.
- Backgrounds with visual depth.
- Muted, cohesive colors rather than highly saturated anime colors.
- Composition that leaves negative space for headings and CTAs.

### Reference scenes

1. **Warm indoor portrait (hero):** a young woman with long dark hair, white linen blouse, dark vest, pink and cream flowers, a sunlit wooden window with sheer curtains.
2. **Seaside sunset (memory scene):** a woman in a muted red dress looking toward a calm sea, wind in her hair, layered pastel clouds, golden-hour light.

Both scenes are neutral enough for colleagues. Use one illustration set with matching color grading and rendering. The source images are in `public/happy-woman-day/`. Rename them by role (for example `hero-window.png`, `scene-sunset.png`) before use.

## 5. Color System

Use the `Autumn Solace` tokens: warm neutrals as the base, dusty pink and rose for softness, muted red for emphasis, and warm brown for depth.

| Token | Hex | Use |
| :--- | :--- | :--- |
| `--color-ivory` | `#FFF9F2` | Page background (replaces pure white) |
| `--color-cream` | `#F5E8D8` | Cards, panels, letter paper |
| `--color-dusty-pink` | `#D9A6A0` | Soft fills, input borders, hover washes |
| `--color-rose` | `#C98287` | Secondary accents, chips, link underlines, stamp borders |
| `--color-muted-red` | `#A84C4A` | Primary CTA and key emphasis |
| `--color-muted-red-hover` | `#943F3D` | Primary CTA hover |
| `--color-warm-brown` | `#765343` | Frames, secondary text, outlines |
| `--color-dark-brown` | `#382A27` | Main text, dark scene overlays |
| `--color-charcoal` | `#333039` | High-contrast microcopy and fine rules |

### Color rules

- Keep the page mostly ivory, cream, warm brown, and soft rose.
- Use muted red for the primary action only, not for every decoration.
- Use dark brown, not pure black, for body text.
- Keep text over illustrations readable with a gradient or a solid backplate.
- No neon, no oversaturated gradients, no large pure-black areas.

### Depth

- Card shadow: `0 12px 32px -4px rgba(56, 42, 39, 0.06), 0 4px 12px -2px rgba(118, 83, 67, 0.04)`.
- Hairline borders: `1px solid rgba(201, 130, 135, 0.25)` or `1px solid rgba(118, 83, 67, 0.15)`.
- Overlays: `background: rgba(255, 249, 242, 0.85); backdrop-filter: blur(12px)`. Use them only for small overlays, never for whole sections.

## 6. Typography

### Fonts

- **Headings and display:** `EB Garamond`
- **Body and UI:** `Be Vietnam Pro`

Load both with the Vietnamese subset and check diacritics in every weight used. In italic headings, add a little letter spacing so diacritics do not overlap.

### Scale (from Stitch)

| Token | Desktop | Mobile |
| :--- | :--- | :--- |
| `display-hero` | 56px / 64px, weight 400, -0.02em | 36px / 44px, -0.01em |
| `headline-lg` | 40px / 48px, weight 400, -0.015em | 28px / 36px |
| `headline-md` | 28px / 36px, weight 500 | 28px / 36px |
| `headline-sm` | 22px / 30px, weight 500 | 22px / 30px |
| `subhead-serif` | 18px / 26px, 0.02em | 18px / 26px |
| `body-lg` | 17px / 28px, -0.01em | 17px / 28px |
| `body-md` | 15px / 24px | 15px / 24px |
| `body-sm` | 13px / 20px, 0.01em | 13px / 20px |
| `label-md` | 14px / 20px, weight 500, 0.02em | 14px / 20px |
| `label-sm` | 11px / 16px, weight 600, 0.08em, uppercase | 11px / 16px |

### Hierarchy

- Section labels such as `20 THÁNG 10 · NGÀY PHỤ NỮ VIỆT NAM` use uppercase `label-sm` above a large serif heading, like an editorial folio.
- Body copy uses `Be Vietnam Pro` with comfortable line height.
- Buttons and navigation use `Be Vietnam Pro`, medium weight.
- Handwritten-style fonts, if used, are limited to signatures.

## 7. Layout and Spacing

- **Desktop (≥ 1024px):** 12-column grid, max width `1280px`, page margin `3rem`, gutter `1.5rem`. Asymmetric pairs such as 7 columns of illustration + 5 columns of text are encouraged.
- **Tablet (768–1023px):** 8 columns, `1.25rem` gutter, `2rem` margin. Side-by-side blocks become vertical pairs.
- **Mobile (< 768px):** 4 columns, `1rem` gutter, `1.25rem` margin. Full-bleed hero image, then stacked content with `1rem` gaps.
- Reading width for paragraphs and the letter: `680px–760px`.
- Spacing scale: `0.25rem`, `0.5rem`, `1rem`, `1.75rem`, `3rem`.

Principles:
- Use an editorial grid. Do not put every element in a centered card.
- Let illustrations take large parts of the viewport.
- Alternate image-led sections with quieter text sections.
- Keep text and controls away from faces and detailed parts of the illustrations.

### Shapes

- Cards and containers: `0.25rem–0.5rem` radius, like cut paper or postcards.
- Portrait frames may use an arched top: `border-radius: 9999px 9999px 0.25rem 0.25rem`.
- Avoid pill-shaped containers, except for small chips.

## 8. Page Structure

The page follows `Mở đầu - 2`. Section anchors: `#mo-dau`, `#tri-an`, `#ky-niem`, `#buc-thu`.

### 8.1 Header

- Brand text `Dịu Dàng 20 Tháng 10` on the left.
- Anchor navigation: `Mở đầu · Tri ân · Kỷ niệm · Bức thư`.
- `Âm điệu` music toggle, off by default, with an accessible label and a clear on/off state.
- No profile or login icon.
- On mobile, collapse navigation or keep only the brand and the music toggle.

### 8.2 Mở đầu (Hero) — "Dành cho những điều dịu dàng nhất."

**Purpose:** Set the mood right away.

**Layout**
- Full-screen or near full-screen window-light portrait.
- Headline in a low-detail part of the image, or on a subtle gradient.
- Short supporting line and two CTAs.

**Copy**
- Label: `20 THÁNG 10 · NGÀY PHỤ NỮ VIỆT NAM`
- Heading: `Dành cho những điều dịu dàng nhất.`
- Supporting text: a colleague-oriented line (see section 3).
- Primary CTA: `Bắt đầu hành trình` (scrolls to `#tri-an`).
- Secondary CTA: `Mở bức thư gửi riêng` (scrolls to `#buc-thu`).

**Behavior**
- Fade in the label, heading, text, and CTAs with a small stagger (CSS only).
- Show the illustration immediately. No long intro animation.
- **Falling cherry blossoms** (`PetalLayer`): 26 petals on desktop, 10 on mobile, CSS keyframes only, hidden with reduced motion.
- **Blooming rose** (`BloomingRose`), placed between the copy and the portrait:
  1. The line-art rose draws itself stroke by stroke (`pathLength`).
  2. Color washes into the bloom and leaves; a soft halo appears as it "lifts" off the page.
  3. It floats gently, with a ground shadow that shrinks as it rises.
  4. It tilts toward the mouse, can be dragged on desktop (springs back), and scatters petals on click, tap, Enter, or Space.
  5. With reduced motion it appears fully drawn, without float, tilt, or petal bursts.

### 8.3 Tri ân — "Những điều đáng trân trọng"

**Purpose:** Thank colleagues with short copy and one illustration.

**Layout**
- Ivory or cream background.
- Section label (for example `Phần I · Tri Ân & Thấu Hiểu`), heading, and a short paragraph.
- One quote card with a thin left accent line, `EB Garamond` italic text, and a team signature.
- Three numbered quality cards (`01 · 02 · 03`) with an icon, a title, and 1–2 sentences each.
- Two columns on desktop, stacked on mobile.

**Những bông hoa của team.** A gallery of every colleague's anime portrait (`public/happy-woman-day/colleagues/`) in arched frames, 2 / 3 / 4 columns by breakpoint. On a personal page, her own portrait is highlighted with a muted red ring.

**Optional: team messages.** In place of the Stitch message wall, show 3–6 short messages written by team members, stored in a data file. No form, no user submissions.

**Behavior**
- Reveal content as it enters the viewport.
- Keep motion subtle and respect reduced motion.

### 8.4 Kỷ niệm — "Một khoảnh khắc để nhớ."

**Purpose:** The emotional peak of the page.

**Layout**
- Wide seaside sunset illustration.
- Small label (`Khung hình ký ức · 20/10`), heading, and one short paragraph.
- Optional slow parallax on desktop, static on mobile and with reduced motion.

**Behavior**
- No scroll-jacking or forced animation.
- Keep text readable over every part of the image.

### 8.5 Bức thư — "Một lời chúc dành riêng cho bạn"

**Purpose:** The personal ending for each colleague.

**Layout**
- Envelope on a warm neutral background, with a `20.10` date stamp (dashed rose border, vintage seal look).
- Clear hint that the envelope can be opened: `Nhấp vào phong thư để mở`.
- After opening, show the letter on cream paper:
  - Greeting line with her name, for example `Gửi chị Lan,`.
  - Personal message from the data file.
  - Closing line and team signature.
- `Sao chép lời chúc` button with a short confirmation (`Đã sao chép`).

**Behavior**
- The envelope is a real `<button>`. It opens on click, tap, Enter, or Space.
- Allow closing or reopening the letter.
- With reduced motion, show the open letter without animation.
- If the recipient is unknown, show a general greeting for all colleagues.

### 8.6 Footer

- Short closing wish, the date `20/10/2026`, and the team signature.
- Same color and type system.
- `© 2026`. No unrelated social links.

## 9. Components

Suggested components:

- `SiteHeader`
- `MusicToggle`
- `HeroScene`
- `SectionHeading`
- `AppreciationSection`
- `QuoteCard`
- `QualityCard`
- `ColleagueGallery`
- `TeamMessages` (optional)
- `BloomingRose`
- `MemoryScene`
- `DateStamp`
- `GreetingEnvelope`
- `GreetingLetter`
- `CopyGreetingButton`
- `PetalLayer`
- `MotionReveal`
- `SiteFooter`

### Buttons and controls (from Stitch)

- **Primary:** muted red `#A84C4A` fill, ivory `#FFF9F2` text, `0.25rem` radius, inset highlight `inset 0 1px 0 rgba(255, 255, 255, 0.2)`. Hover: `#943F3D`.
- **Secondary / ghost:** transparent, `1px solid rgba(118, 83, 67, 0.35)` outline, dark brown text. Hover: cream fill at 50% opacity.
- **Text link:** serif text with a thin `→` arrow and an animated rose underline.
- **Chips:** `0.25rem` radius, dusty pink wash `rgba(217, 166, 160, 0.2)`, muted red `label-sm` text.
- **Focus:** muted red border with `0 0 0 3px rgba(217, 166, 160, 0.25)` glow. Always visible on keyboard focus.

### Component rules

- Each component has one visual or interaction responsibility.
- Keep content out of components. Pass it in as props from data files.
- Use semantic elements for navigation, sections, headings, and buttons.
- Every button has a clear label and a visible focus state.
- Do not make every section a generic card. Vary the scene layouts on purpose.

## 10. Motion and Interaction

| Effect | Approach | Limits |
| :--- | :--- | :--- |
| Scene entrance | Opacity + small vertical move | Short and non-blocking |
| Text reveal | Per-block stagger | No slow typewriter effect for long text |
| Background parallax | Small scroll-linked offset | Off on mobile and with reduced motion |
| Floating petals | Few petals, slow, varied movement | Decorative only, never over text or controls |
| Scene transition | Crossfade or short opacity change | Never hide important content |
| Envelope opening | State change on click, tap, or key | Must work by keyboard |
| Button feedback | Color or small transform | Keep focus and active states clear |
| Music | Opt-in toggle | Never autoplay |

### Motion rules

- Use smooth easing and small movements.
- No constant fast motion, aggressive zoom, flashing, or heavy particles.
- Never make users wait for an animation before they can interact.
- Respect `prefers-reduced-motion`.
- Decorative motion must not interfere with reading, scrolling, or clicking.

## 11. Responsive Behavior

Most colleagues will open the link on a phone, so design and test mobile first.

### Mobile

- Crop images to keep the subject's face and key details.
- Stack content in a clear reading order.
- Keep buttons at least 44px tall.
- Turn off parallax and reduce petals.
- Do not place text over a busy image without an opaque overlay.
- Test portrait and landscape.

### Tablet

- Simplify image crops and reduce heading sizes.
- Keep the relationship between text and illustration.
- Do not squeeze desktop two-column layouts into narrow columns.

### Desktop

- Use large cinematic images and asymmetric editorial layouts.
- Use two-column compositions where text and illustration support each other.
- Keep content on the 12-column grid.

Use responsive image variants or `object-position` when one crop does not work on every screen.

## 12. Images and Assets

### Consistency

- Use one illustration set with the same rendering, lighting, grading, and detail level.
- Use original or properly licensed assets.
- Do not mix photos, flat vector art, 3D renders, or different anime styles.
- No stretched or low-resolution images.
- Do not use scenes aimed at family or couples.

### Performance

- Convert to AVIF or WebP through `next/image`. The current PNGs are around 2MB each.
- Set width and height or an aspect ratio to avoid layout shift.
- Lazy-load images below the fold.
- Prioritize the hero image.
- Use meaningful alt text for informative images and `alt=""` for decorative ones.
- Keep all text in HTML, never baked into images.

### Prompt guide for new images

Use the same style keywords as the Stitch prompts:
- `soft semi-realistic anime illustration`
- `cinematic nostalgia film still`
- `soft natural directional lighting`
- `warm ivory, cream, dusty pink and warm brown color grading`
- `detailed painterly background`
- `golden hour atmosphere`
- `negative space for typography`
- `no text`

Render all headings and labels in the frontend for correct Vietnamese typography and accessibility.

## 13. Accessibility

- Use semantic landmarks and a logical heading order.
- Keep text contrast sufficient, especially over images.
- Make every interactive element keyboard accessible.
- Show visible focus indicators.
- Give icon-only controls (music toggle, copy) accessible names.
- Do not convey information by color alone.
- Respect `prefers-reduced-motion`.
- Hide decorative layers (petals, ornaments) from assistive technology and make them non-interactive.
- No autoplay audio. Music is opt-in with a visible control.
- The envelope button has an accessible name and announces its open or closed state (`aria-expanded`).

## 14. Implementation Notes

This spec does not require every possible library.

- Next.js App Router, React, TypeScript, Tailwind CSS v4.
- `next/image` for images.
- CSS transitions for hover and focus. `motion` (`motion/react`) for the rose, reveals, the envelope, and parallax. No other animation library.
- Follow the project's package manager (Bun), linting and formatting (Biome), and component conventions.
- Keep decorative effects isolated so they can be turned off on small screens or with reduced motion.
- Use client components only where interaction needs them.
- Reserve space for images and media to prevent layout shift.
- Content and controls must work even if animations fail.

## 15. Quality Checklist

### Content

- [ ] All copy is addressed to colleagues. Nothing targets family, partners, or teachers.
- [ ] No romantic or overly intimate wording.
- [ ] Every colleague's name and Vietnamese diacritics are correct.
- [ ] Years show 2026, not the Stitch placeholder 2024.

### Visual

- [ ] The page follows the `Mở đầu - 2` layout and `Autumn Solace` tokens.
- [ ] It feels like soft anime cinema, not a generic pink template.
- [ ] Illustration style, lighting, and grading are consistent.
- [ ] Text never covers faces or key visual details.

### Interaction

- [ ] Every CTA has a clear, working action.
- [ ] The envelope works with mouse, touch, and keyboard.
- [ ] The copy button works and confirms the action.
- [ ] Music is off by default and only plays after the user turns it on.
- [ ] Animations do not block content, and reduced motion is respected.

### Responsive and performance

- [ ] Layout is checked on mobile, tablet, and desktop.
- [ ] Image crops keep the subject at every breakpoint.
- [ ] Below-the-fold images are lazy-loaded.
- [ ] The hero image is optimized and causes no layout shift.
- [ ] Decorative effects do not cause frame drops on mobile.

### Accessibility

- [ ] Semantic HTML and heading order are correct.
- [ ] Keyboard focus is visible.
- [ ] Text contrast is sufficient.
- [ ] Informative images have meaningful alt text.
- [ ] Decorative images and motion layers are hidden from assistive technology.

## 16. Final Design Decision

> **Soft Anime Illustration × Cinematic Nostalgia**, based on the Stitch project **Woman Day** (2026-10-17).
>
> A warm 20/10 greeting for colleagues, built around art-directed anime illustrations, editorial typography, soft autumn colors, and restrained cinematic motion.

Put illustration quality, composition, readable content, and storytelling before decorative effects. The page must stay beautiful and usable when motion is reduced or turned off.
