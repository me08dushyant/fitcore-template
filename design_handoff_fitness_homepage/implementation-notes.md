# Implementation Notes

## Recommended stack

- Astro 5 for a fast, content-focused site.
- Tailwind CSS for utility styling and responsive layout.
- GSAP + ScrollTrigger for carefully controlled motion.
- Lucide icons for consistent interface icons.
- WebP/AVIF images with responsive `srcset` and explicit dimensions.
- Cloudflare Pages or the preferred static hosting platform.

## Suggested component structure

```text
src/
  components/
    SiteHeader.astro
    HeroSection.astro
    ExperienceSection.astro
    TrainingPrograms.astro
    TrainerGrid.astro
    MembershipPlans.astro
    CommunitySection.astro
    FinalCallToAction.astro
    SiteFooter.astro
    Button.astro
  layouts/
    BaseLayout.astro
  pages/
    index.astro
  styles/
    global.css
    tokens.css
```

## Implementation guidance

1. Build the page as semantic Astro components.
2. Keep the main content static unless the gym needs a CMS or booking system.
3. Use real, optimized photography and art-direct separate desktop/mobile crops.
4. Add descriptive alt text to meaningful images; use empty alt text for decorative imagery.
5. Lazy-load below-the-fold images and prioritize the hero image.
6. Use CSS for simple hover states; reserve GSAP for meaningful scroll and reveal motion.
7. Respect `prefers-reduced-motion`.
8. Make every CTA functional: membership enquiry, WhatsApp link, contact form or booking flow.
9. Test keyboard navigation, contrast, mobile layout and page performance.

## Suggested enquiry form fields

- Name
- Phone / WhatsApp number
- Main fitness goal (optional)
- Preferred time to visit (optional)

Keep the form short and explain how the gym will use the submitted contact details.

## Before launch

Replace all placeholder statistics, pricing, membership inclusions, trainer biographies,
testimonials, address and opening hours with verified business information. Obtain consent
for member photographs and testimonials.
