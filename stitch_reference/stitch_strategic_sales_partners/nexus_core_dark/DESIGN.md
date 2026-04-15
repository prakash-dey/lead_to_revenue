# Design System Specification: Architectural Authority

## 1. Overview & Creative North Star: "The Obsidian Architect"
This design system moves away from the "standard SaaS" aesthetic toward a philosophy of **Architectural Authority**. It is designed to feel like a high-end physical space—think of a glass-walled boardroom overlooking a midnight skyline. 

The Creative North Star is the **"The Obsidian Architect."** We achieve this through structural permanence, intentional asymmetry, and deep tonal layering. We reject the "flat" web; instead, we build interfaces that feel carved from solid matter and illuminated by purposeful light. This system breaks the rigid grid by using overlapping containers and exaggerated vertical rhythm to guide the eye through complex data with ease and prestige.

---

## 2. Colors & Tonal Depth
We do not use color to decorate; we use it to direct. The palette is rooted in a deep navy base (`#0b1326`) with "growth-oriented" accents that pierce through the dark background.

### The "No-Line" Rule
**Explicit Instruction:** 1px solid borders for sectioning are strictly prohibited. Boundaries must be defined solely through background color shifts or subtle tonal transitions. 
- Use `surface-container-low` for large secondary sections.
- Use `surface-container-high` for interactive modules.
- The transition from `surface` (`#0b1326`) to `surface-container` tiers provides enough contrast to define space without the "cheap" look of outlines.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers.
- **Base Layer:** `surface` (#0b1326).
- **Secondary Tier:** `surface-container` (#171f33).
- **Interactive Modules:** `surface-container-highest` (#2d3449).
When nesting, always move "up" or "down" one level in the container scale. An inner card should be `surface-container-lowest` (#060e20) if it needs to feel "recessed" into a `surface-container` background.

### The "Glass & Gradient" Rule
For elements that exist "above" the architecture (modals, floating menus, or critical tooltips), use a **Glassmorphism** effect:
- **Background:** `surface-container-high` at 70% opacity.
- **Effect:** `backdrop-filter: blur(12px)`.
- **Accent:** Apply a subtle linear gradient to main CTAs from `primary` (#4edea3) to `primary-container` (#10b981) at a 135-degree angle. This adds "visual soul" and a sense of forward momentum.

---

## 3. Typography: The Editorial Scale
We use **Inter** not as a utility font, but as a structural element. The hierarchy is exaggerated to create an editorial, high-end feel.

- **Display (Large/Medium):** Used for "Hero" moments or high-level data summaries. Use `-0.02em` letter spacing to feel more compact and authoritative.
- **Headline (Small/Medium):** The "Architectural" anchor. Headlines should often be paired with wide margins to let the content breathe.
- **Title & Body:** `body-lg` (1rem) is our workhorse. For data-dense environments, lean on `body-md` (0.875rem) to maintain clarity.
- **Labels:** `label-sm` (0.6875rem) should always be in `on-surface-variant` (#bbcabf) and can be set to all-caps with `0.05em` tracking for a technical, precise aesthetic.

---

## 4. Elevation & Depth: Tonal Layering
Traditional drop shadows are too "web-native" for this system. We use **Tonal Layering** to convey importance.

- **The Layering Principle:** Place a `surface-container-lowest` card on a `surface-container-low` section. This creates a "carved-in" look that feels more premium than a floating shadow.
- **Ambient Shadows:** If an element must float (e.g., a dropdown), use a shadow color tinted with navy: `rgba(6, 14, 32, 0.6)`. The blur should be high (30px+) and the spread minimal to mimic natural ambient light.
- **The "Ghost Border" Fallback:** If a border is required for accessibility, use `outline-variant` (#3c4a42) at 15% opacity. Never use 100% opaque borders.
- **Glassmorphism:** Use semi-transparent `surface-variant` (#2d3449) with a 10px backdrop blur for floating navigation bars to ensure the background color bleeds through, softening the layout's edges.

---

## 5. Components: Structural Primitives

### Buttons
- **Primary:** Gradient from `primary` (#4edea3) to `primary-container` (#10b981). Text is `on-primary` (#003824). Roundedness: `md` (0.375rem).
- **Secondary:** Surface-only with a "Ghost Border." Use `secondary` (#89ceff) for text.
- **Tertiary:** No background. `on-surface` text with an underline appearing only on hover.

### Cards & Lists
- **Rule:** Forbid divider lines.
- **Implementation:** Use 24px–32px of vertical whitespace to separate list items, or alternating `surface-container-low` and `surface-container` backgrounds for list rows.
- **Cards:** Use `lg` (0.5rem) roundedness and a `surface-container-high` background.

### Input Fields
- **Default:** `surface-container-highest` background with a `sm` (0.125rem) bottom-only accent in `outline` (#86948a).
- **Focus:** The bottom accent transitions to `primary` (#4edea3) with a subtle `primary` glow (4px blur).

### Chips & Badges
- **Growth Chips:** Use `primary-container` (#10b981) background with `on-primary-container` (#00422b) text. Use `full` (9999px) roundedness for a pill shape.

---

## 6. Do’s and Don’ts

### Do:
- **Do** use asymmetrical padding (e.g., 64px top, 40px bottom) to create a sense of dynamic movement.
- **Do** lean heavily on `surface-container` tiers to group related information.
- **Do** use `secondary` (#89ceff) for technical data points or "blue-sky" projections.

### Don’t:
- **Don't** use a pure black (#000000) background. It breaks the architectural depth.
- **Don't** use 1px dividers. If you need a line, use a 4px wide vertical block of `primary` to denote "active" or "important" status.
- **Don't** clutter the screen. If you have more than 5 elements in a view, use "progressive disclosure" (nested surfaces) to hide secondary info.
- **Don't** use high-contrast white text for everything. Reserve `on-surface` (#dae2fd) for headers and use `on-surface-variant` (#bbcabf) for long-form body text to reduce eye strain in the dark theme.