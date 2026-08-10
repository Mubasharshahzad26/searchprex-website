# Searchprex logo update — drop-in files

Unzip and copy the contents **into the root of your `searchprex-website` repo**, preserving the folder structure. Files replace/add:

- `components/Logo.tsx` — new inline-SVG logo component (pillar mark + bold "Searchprex" wordmark)
- `app/layout.tsx` — adds `icons` block to Next metadata so browsers pick up `icon.svg`
- `public/icon.svg` — new SVG favicon
- `public/logo.png` — new 200×200 logo for JSON-LD structured data
- `public/logo/searchprex-logo.{svg,png}` + `-light.svg` — horizontal lockups
- `public/favicon-*.png`, `apple-icon-*.png`, `android-icon-*.png`, `ms-icon-*.png`, `icon-{light,dark}-32x32.png` — regenerated app icons

## To ship

```bash
# from your repo root, after copying the files in
git add components/Logo.tsx app/layout.tsx public/
git commit -m "chore(brand): apply new Searchprex logo + favicons"
git push origin main
```

Vercel (or whatever host) will rebuild automatically. Hard-reload the site (Cmd/Ctrl+Shift+R) once deployed to bypass favicon caching.

## Not included

- `public/favicon.ico` — legacy multi-image format was left untouched. Modern browsers use `icon.svg` first, so this is fine, but regenerate the .ico from any favicon generator if you want the legacy fallback refreshed too.
