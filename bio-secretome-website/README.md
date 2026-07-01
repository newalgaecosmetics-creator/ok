# Bio Secretome SL — Website

Premium, modern, single-page website for **Bio Secretome SL**, a biotechnology R&D
startup in Madrid, Spain, developing a proprietary *Chlorella* suspension for future
cosmetic applications.

## Stack

Pure static site — no build step, no dependencies.

- `index.html` — all content and sections
- `css/styles.css` — design system, layout, animations, responsive rules
- `js/main.js` — sticky nav, mobile menu, scroll-reveal, contact form, smooth scroll
- `assets/favicon.svg` — brand mark
- `robots.txt`, `sitemap.xml` — SEO

## Run locally

Just open `index.html` in a browser, or serve the folder:

```bash
# Python
python -m http.server 8080
# then open http://localhost:8080
```

## Sections

Hero · About · Technology · R&D · Sustainability · Future Applications ·
Why Bio Secretome · Contact · Footer

## Design

- White background, soft green / emerald accents (`--green-*`, `--emerald-*` tokens)
- Fraunces (headings) + Inter (body) via Google Fonts
- Microalgae-inspired SVG graphics, lab illustration, animated cell
- Scroll-triggered reveals via `IntersectionObserver`
- Fully responsive; respects `prefers-reduced-motion`

## Contact form

No backend is configured. On submit, the form validates client-side and opens the
visitor's mail client pre-filled to **newalgaecosmetics@gmail.com**. To capture
submissions server-side, wire the form to a service such as Formspree, Netlify
Forms, or your own endpoint in `js/main.js`.

## Customization notes

- Colors: edit CSS variables in `:root` at the top of `css/styles.css`.
- Domain: the site uses `https://www.biosecretome.com/` in the canonical URL, Open
  Graph tags, `robots.txt`, and `sitemap.xml`. Update these together if it changes.
- Google Maps: a Maps embed was intentionally omitted (the current brief lists only
  the contact form). To add one, drop an `<iframe>` from Google Maps into the
  `#contact` section centered on Madrid.
