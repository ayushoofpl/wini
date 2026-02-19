# Vast Enhancement Plan - WINI Replication

## 1. Critical Fixes & Foundation

- **Header**: Fix "Expression expected" error in `Header.tsx` (potential invisible char or trailing syntax).
- **Navigation**: Ensure Mega Menu works flawlessly across all pages.
- **Footer**: Refine layout to match official site (logo placement, social links).

## 2. Visual "Vastness" & Premium Feel

- **Hero Section Overhaul (`Hero.tsx`)**:
  - Implement a `variant="cinema"` with 85-90vh height.
  - Add **Parallax Background**: The image should move slightly slower than scroll.
  - **Animated Entry**: Text should stagger in (fade up + clip path reveal).
  - **Video Background Support**: Allow `.mp4` backgrounds for the "living office" feel.
- **Typography & Spacing**:
  - Increase base font sizes for "lead" paragraphs (20px -> 24px).
  - Double the whitespace between sections (`py-24` -> `py-32`).

## 3. Page-Specific Enhancements

### Home (`/`)

- **New Section**: "The WINI World" - A full-width video/image slider showcasing different office atmospheres (Agile, Executive, Open Space).
- **Refined Masonry**: Ensure the project showcase uses high-res, diverse images.

### Products (`/products`)

- **Grid Layout**: Move from simple cards to a "Masonry" or "Bento Box" style grid for categories.
- **Product Detail Template**:
  - Create a reusable `ProductLayout` with:
    - Sticky sidebar for navigation anchors (Features, Gallery, Downloads).
    - Large, immersive imagery (full width).
    - "Technical Details" accordion.

### Solutions (`/solutions`)

- **Storytelling**: Implement alternating "Zig-Zag" layout (Text Left/Image Right -> Image Left/Text Right) for "Analysis", "Planning", "Implementation".
- **Visuals**: Use abstract/architectural shots mixed with people working.

## 4. Configurator Evolution (`/configurator`)

- **Pseudo-3D Engine**:
  - Implement CSS `transform: rotateX(...) rotateY(...) perspective(1000px)`.
  - Allow user to "drag" to rotate the view (mapping mouse X/Y to CSS rotation).
  - Create "Layers" for the desk: Legs (static/base), Tabletop (moves slightly differently or is a separate 3D plane), Accessories.
  - **Interactivity**: Real-time color changing with smooth transitions.

## 5. Content Population

- Replace generic "Lorem Ipsum" or short placeholders with professional, industry-standard copy inspired by the official site (focus on "Ergonomics", "Sustainability", "Made in Germany").

## Execution Order

1. **Backup**: Run `robocopy` excluding `node_modules`. (Done)
2. **Update Plan**: Incorporate "Zig-Zag" and "Product Detail" features. (Done)
3. **Enhance Solutions Page (`app/solutions/page.tsx`)**:
    - Build `ContentBlock` component for zig-zag layout (support alternating left/right image).
    - Replace `ProcessSection` with a more narrative flow using these blocks.
    - Add real world imagery for each step (Analysis, Planning, Realization).
4. **Create Product Detail (`app/products/[slug]/page.tsx`)**:
    - Create dynamic route `[slug]`.
    - Implement `ProductHero` with full-screen image.
    - Build sticky sidebar navigation ("Features", "Benefits", "Downloads").
    - Add "Technical Details" accordion.
    - Add "Related Products" slider.
5. **Verify**: Check new pages for responsiveness and visual coherence.
