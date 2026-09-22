# Improve frosted surfaces and readability

## What will change
- Create shared frosted-surface styles with one translucency, border, shadow, and text-contrast system.
- Apply the same glass treatment to dashboard cards, side panels, nested tiles, controls, and the login form.
- Increase secondary-text and input contrast while preserving EcoWallet’s dark green palette.
- Add graceful fallbacks for browsers or devices without backdrop blur, plus lighter blur on smaller screens and reduced-transparency preferences.
- Keep the current layout, content, and behavior unchanged.

## Technical details
- Use semantic CSS tokens and standard `backdrop-filter` only, allowing the build to add browser prefixes safely.
- Use `@supports` to provide a more opaque fallback surface when blur is unavailable.
- Use responsive media queries to reduce blur cost on compact screens and an accessibility media query for reduced transparency.
- Verify both `/` and `/auth` at desktop and mobile widths, then confirm a clean build and no browser errors.
