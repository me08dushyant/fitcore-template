# Handoff: Premium Fitness Club Homepage

## Overview
Single-page marketing homepage for a premium fitness club. Goal: drive free gym tour bookings and WhatsApp enquiries. Dark, editorial, athletic aesthetic with orange accent and Framer-style motion.

## About the Design Files
`Fitness Club Homepage.dc.html` is a **design reference built in HTML** — a prototype showing intended look, copy, layout and behavior. It is not production code. Recreate it in the target codebase (recommended per the original brief: **Astro 5 + Tailwind**, or React/Next if the project already uses it) using that stack's normal patterns. Open the HTML file in a browser to see it live. `design-tokens.css` and the original brief docs are included as source material.

## Fidelity
**High-fidelity.** Final colors, typography, spacing, copy structure and motion. Recreate pixel-close. All `[bracketed]` copy (club name, prices, trainer names, address, phone) are placeholders to be replaced with real data. All images are empty drop-zone placeholders — real photography must be supplied.

## Global rules
- **No em dashes, en dashes or arrow glyphs (→ ← ↗) anywhere in copy or UI.** Client explicitly rejected them. Use "/", ".", "to", or plain words ("Prev", "Next", "+").
- Inline layout uses flex/grid with `gap`; max content width 1440px; horizontal page padding `clamp(1.25rem, 4vw, 4.5rem)`.
- Section vertical padding: `clamp(5rem, 10vw, 10rem)`.
- Sections alternate dark (#090909) and cream (#F5F0E8).
- `html, body { overflow-x: clip }` to prevent horizontal scroll on mobile.
- Respect `prefers-reduced-motion`: disable all reveals, parallax, marquee, float; counters jump to final value.

## Design Tokens
**Colors**
- Black (page bg): `#090909`
- Charcoal (dark cards, inputs): `#292522`
- Charcoal hover: `#332d29`
- Cream (light section bg, light text): `#F5F0E8`
- Muted text on dark: `#B8B0A8`
- Body text on cream: `#292522`
- Orange (primary accent, CTAs): `#FF4B12`
- Orange alt (gradient stop): `#F4511E`
- Deep orange (eyebrow text on cream, for contrast): `#C2340A`
- Ember (gradient stop): `#8E1E08`
- White (cards on cream): `#FFFFFF`
- WhatsApp green: `#25D366`
- Hairlines on dark: `rgba(245,240,232,0.1)`; on cream: `rgba(9,9,9,0.08)`

**Typography** (Google Fonts)
- Display: **Anton** 400, uppercase, line-height 0.86–0.9
  - H1: `clamp(4.5rem, 11vw, 10.5rem)`
  - H2: `clamp(3rem, 7vw, 6.5rem)` (Community H2 `clamp(3.5rem,9vw,8rem)`, CTA H2 `clamp(3.75rem,9vw,8.5rem)`)
  - Stats numbers `clamp(2.2rem,3.4vw,3rem)`; card titles `clamp(1.9rem,2.6vw,2.5rem)`; plan names 44px; price 52px
- UI / labels / buttons: **Space Grotesk** 500–600
  - Eyebrows: 13px, 600, letter-spacing 0.22em, uppercase, format `01 / THE EXPERIENCE`
  - Buttons: 15–16px, 600
- Body: **Inter** 400–500, 15–17px, line-height 1.55–1.6; lead paragraphs `clamp(1.05rem,1.4vw,1.25rem)`

**Radii**: cards 16px; inner images 10px; hero image 24px; inputs 12px; buttons/pills 999px.
**Shadows**: floating pill `0 20px 50px rgba(0,0,0,0.45)`; form card `0 40px 80px rgba(0,0,0,0.35)`; WhatsApp FAB `0 16px 40px rgba(0,0,0,0.4)`.
**Buttons**: min-height 52–56px (44px in header), padding 0 26–28px. Primary = orange bg / black text. Secondary = 1px `rgba(245,240,232,0.3)` outline, hover border orange. Hover lift `translateY(-2px)` 180ms.

## Sections (top to bottom)

### Header (sticky)
- Height 76px, bg `rgba(9,9,9,0.82)` + `backdrop-filter: blur(14px)`, bottom hairline.
- Left: 14px orange dot + club name (Anton, `clamp(19px,5vw,24px)`, letter-spacing 0.04em).
- Center (≥900px): nav links About / Training / Trainers / Membership / Contact (Space Grotesk 15px 500, #B8B0A8, gap 36px, hover orange).
- Right: "Join Now" orange pill. <900px: adds 44px circular hamburger (two 18×2 lines) that opens a full-width stacked menu of Anton 40px uppercase links with hairline dividers; clicking a link closes it.
- Auto-hide: slides up (`translate 0 -100%`, 500ms `cubic-bezier(.16,1,.3,1)`) when scrolling down past 240px; returns on scroll up.
- 3px orange scroll-progress bar fixed at very top (scaleX = scroll progress).

### 01 Hero (dark)
- 2-col grid `repeat(auto-fit, minmax(min(100%,460px),1fr))`, stacks on mobile.
- Background: giant outlined word "MORE" (Anton `clamp(9rem,30vw,30rem)`, transparent fill, 1px stroke `rgba(245,240,232,0.09)`), centered, parallax 0.3.
- Left column (gap 28px): eyebrow "PREMIUM FITNESS CLUB" (orange, no leading line); H1 "BUILT / FOR MORE." with "more." in orange; subcopy "Train with purpose. Build strength. Discover what you're capable of." (max 420px); buttons "Explore Membership" (primary → #membership) and "Discover Our Club" (secondary → #about); stats row with top hairline: 500+ Active Members / 15+ Expert Trainers / 100% Commitment (count up from 0 over 1.6s, easeOutCubic, 400ms delay).
- Right column: 4:5 image, max-width 600px, max-height 760px, radius 24px, centered on tablet. Behind it a radial orange glow `radial-gradient(closest-side, rgba(255,75,18,.55), rgba(244,81,30,.18) 55%, transparent)`. Image scales 1.08→1 over 1.8s on load. Parallax 0.08.
- Floating cream pill overlapping image bottom-left (bottom 10%): 40px orange circle with "FREE" + "Free trial session" / "Book a tour this week". Gently floats ±12px, 2.8s alternate.

### Marquee band (orange)
- Orange bg, black hairlines top/bottom, padding 22px 0.
- Infinite horizontal ticker: Strength • Personal Training • Functional Fitness • Conditioning • Community (Anton `clamp(2rem,4vw,3.5rem)`, separated by 14px black dots, gap 40px). Content duplicated; translateX 0 → -50% over 38s loop.
- Scroll-velocity reactive: speeds up to 6× with scroll speed and reverses direction on scroll up; eases back to 1×.

### 02 Experience (#about, cream)
- Header row: eyebrow "01 / THE EXPERIENCE" (#C2340A); H2 "MORE THAN A GYM. / A BETTER WAY TO MOVE." ("A better way" orange); paragraph right "A space designed to challenge your limits, support your progress and make every workout count."
- Below: 2-col (min 520px). Left: large interior image (min-height `clamp(360px,48vw,640px)`, radius 16). Right: 3 stacked white cards (padding `clamp(1.5rem,2.5vw,2.25rem)`), each: orange Anton number 01/02/03 + title (Space Grotesk 600 `clamp(1.3rem,1.8vw,1.6rem)`) + body. Hover: card inverts to black bg / cream text (220ms).
  - Premium Equipment — Modern equipment designed for effective training.
  - Expert Guidance — Professional trainers who understand your goals.
  - A Better Environment — An inclusive atmosphere built around motivation and consistency.

### 03 Training (#training, dark)
- Eyebrow "02 / TRAIN YOUR WAY"; H2 "FIND YOUR / OWN STRENGTH."; side copy "Four ways to train. Each one coached, structured and built around where you want to go."
- 4 cards grid `minmax(min(100%,300px),1fr)`, charcoal bg, padding 12px 12px 28px. Desktop: cards 2 and 4 offset down 64px (staggered rhythm); no offset <900px.
- Card: image (alternating 4:5 and 1:1, radius 10, zooms 1.06 on hover over 700ms) + number, Anton title, body + 44px circular "+" button (hover fills orange).
  - Strength Training — Build strength, power and confidence.
  - Personal Training — Individual coaching tailored to your goals.
  - Functional Fitness — Improve mobility, balance and performance.
  - Cardio & Conditioning — Build endurance and improve fitness.

### 04 Trainers (#trainers, cream)
- Eyebrow "03 / EXPERT COACHING"; H2 "THE RIGHT PEOPLE. / THE RIGHT GUIDANCE." (second line orange); black pill "Meet Our Trainers".
- 4 trainer cards, grid `minmax(min(45%,260px),1fr)` (2-up on phones). Desktop: cards 2 and 4 offset 48px.
- Card: 3:4 portrait radius 16 with cream "[X] YRS" badge top-left; specialty eyebrow (#C2340A); name Anton `clamp(22px,3vw,32px)`; short intro. Only verified qualifications.

### 05 Membership (#membership, dark)
- Centered eyebrow "04 / MEMBERSHIP"; H2 "YOUR GOALS. / YOUR MEMBERSHIP."
- 3 plan cards `minmax(min(100%,320px),1fr)`. Starter and Elite: charcoal bg, cream text. **Plus (featured)**: orange bg, black text, "MOST CHOSEN" black pill badge.
- Card: plan name (Anton 44px), tagline, price "₹[0,000] / month" with bottom rule, bullet list (● in orange, or black on featured), full-width pill CTA "Enquire about {Plan}" (cream on dark cards, black on featured). Hover: border orange + lift 4px.
  - Starter — Essential gym access: Full gym floor access; Locker & changing facilities; Induction session
  - Plus — More personalized training: Everything in Starter; Monthly progress check-in; Personalized training plan; Group conditioning classes
  - Elite — A premium coaching experience: Everything in Plus; 1:1 coaching sessions; Nutrition guidance; Priority booking
- Footnote: "Plan inclusions are indicative. Compare Memberships with our team on a free tour."
- Config flag `showPrices` (if false, price shows "On enquiry").

### 06 Community (cream)
- Eyebrow "05 / OUR COMMUNITY"; H2 "STRONGER / TOGETHER." ("together." orange); right: "Drag to explore" + "Prev" (outline) and "Next" (black) pill buttons.
- Full-bleed horizontal scroller (scroll-snap x mandatory, hidden scrollbar, mouse drag-to-scroll, buttons scroll by min(460px, 80% width)). Height `clamp(380px,38vw,520px)`. Mix of images at varied widths and quote cards (black or orange bg, big Anton opening quote, Space Grotesk 500 quote, attribution). Testimonials must be real and published with consent; no guaranteed-outcome claims.
- Footer line: "Member stories shared with permission." / "Follow us on Instagram".

### 07 Final CTA (#contact)
- Background `linear-gradient(180deg, #FF4B12 0%, #F4511E 30%, #8E1E08 68%, #090909 100%)`.
- Left (black text): H2 "YOUR NEXT CHAPTER STARTS HERE."; "Your strongest days are ahead. Take the first step today."; buttons "Join the Club" (black pill → #enquiry) and "WhatsApp us" (black outline → wa.me link).
- Right: black form card (#enquiry), title "BOOK A FREE GYM TOUR", sub "We'll reply on WhatsApp within one working day."
  - Name (required), Phone / WhatsApp (required, tel), Main goal select (Build strength / Lose weight / Improve fitness / Personal training / Not sure yet), Visit time select (Morning / Afternoon / Evening / Weekend). Inputs: charcoal bg, 52px tall, radius 12, focus border orange. Labels Space Grotesk 13px uppercase #B8B0A8.
  - Submit "Book a Free Gym Tour" (orange pill 56px). Privacy line below.
  - On submit: replace form with success state: orange check circle, "SEE YOU SOON, {first name}.", confirmation copy, "Send another" button. **Prototype does not send data** — wire to real backend/CRM/email/WhatsApp API.

### Footer (dark)
- 4 columns `minmax(min(100%,200px),1fr)`: brand + one-liner; EXPLORE links; VISIT (address, hours "Mon to Sat · [..]" / "Sun · [..]"); CONTACT (phone, WhatsApp, email, Instagram). Column headings Space Grotesk 12px 0.18em orange.
- Giant "BUILT FOR MORE." Anton `min(12.5vw,15rem)` in #292522, nowrap, drifts horizontally with scroll (parallax-x 0.25, scaled by viewport width /1200).
- Bottom bar: © 2026 {brand} / Privacy Policy, Terms.

### Floating WhatsApp button
- Fixed bottom-right `clamp(16px,2.5vw,32px)`. Cream pill, 40px green circle with WhatsApp logo. Desktop shows "WhatsApp" label; <900px icon only. Config flag `showWhatsApp`.

## Interactions & Motion
Easing everywhere: `cubic-bezier(.16,1,.3,1)` (expo-out) unless noted. Implement with Framer Motion / Motion One / GSAP or WAAPI + IntersectionObserver (threshold 0.12, rootMargin bottom -8%, play once).
- **Load (hero left column)**: children reveal staggered 110ms starting at 150ms: opacity 0→1, translateY 48px→0, blur 8px→0, 1100ms. H1 uses text variant (translateY 0.35em, blur 16px).
- **Scroll reveal "up"**: eyebrows, paragraphs, form card — same as above.
- **Headlines (H2)**: translateY 0.35em + blur 16px → crisp, 1100ms.
- **Card groups** (highlights, programs, trainers, plans, footer columns): staggered 90ms per child.
- **Image reveal** (experience interior): clip-path `inset(16% 10% 16% 10% round 32px)` → `inset(0 round 16px)` + scale 1.1→1, 1500ms.
- **Gallery**: slides in from translateX 160px, 1100ms.
- **Parallax**: hero image 0.08, "MORE" 0.3 (×0.4 under 900px).
- **Magnetic buttons** (Join Now, Explore Membership, Join the Club): follow cursor offset ×0.3 x / ×0.4 y, release 450ms.
- Counters, marquee, header auto-hide, progress bar, float — see above.

## Responsive
- Breakpoint for nav/hamburger, offsets, FAB label: **900px**.
- All grids use `auto-fit` + `minmax(min(100%, Npx), 1fr)` to collapse naturally; tested at 390px (mobile) and 820px (tablet).
- No fixed widths on text containers; clamp() type throughout.
- Min tap target 44px.

## State
- `menuOpen` (mobile nav), `viewportWidth` (≥900 desktop), `counterProgress` (0–1), `formSent` + `sentName`.
- Config: `brandName`, `showPrices`, `showWhatsApp`.

## Assets
No real assets supplied yet. Image slots needed:
hero athlete portrait (4:5, orange rim light, black bg); gym interior (wide); 4 program photos; 4 trainer portraits (3:4); 5 community/gallery photos. Use optimized AVIF/WebP with explicit dimensions, lazy-load below the fold. WhatsApp logo is an inline SVG.

## Files
- `Fitness Club Homepage.dc.html` — the full design reference (open in browser; needs `support.js` and `image-slot.js` alongside).
- `support.js`, `image-slot.js` — prototype runtime only, not for production.
- `design-tokens.css`, `design-brief.md`, `homepage-content.md`, `implementation-notes.md` — original brief material.
