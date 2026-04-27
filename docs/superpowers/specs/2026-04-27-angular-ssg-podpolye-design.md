# Подполье v2 — Angular 21 SSG Implementation Design

**Date:** 2026-04-27  
**Project:** podpolye-v2  
**Goal:** Port `design/index.html` (dark brutalist redesign) into a production Angular 21 SSG app deployable to Vercel.

---

## 1. Architecture & Routing

- `outputMode: 'static'` in `angular.json` — pure prerendered HTML, no server
- `RenderMode.Prerender` for `**` in `app.routes.server.ts` (already configured)
- `provideHttpClient()` added to `app.config.ts` for `httpResource`
- Router configured with `withComponentInputBinding()` + `withViewTransitions()`

| URL | Component | Prerendered |
|---|---|---|
| `/` | HomeComponent | ✓ |
| `/gallery` | GalleryComponent | ✓ |
| `/rules` | RulesComponent | ✓ |
| `/contacts` | ContactsComponent | ✓ |

All routes lazy-loaded via `loadComponent`.

---

## 2. Component Structure

```
src/app/
├── app.ts                              # NavComponent + RouterOutlet + FooterComponent
├── app.routes.ts                       # lazy route definitions
├── app.config.ts                       # provideRouter, provideHttpClient, provideClientHydration
│
├── shared/
│   ├── nav/nav.component.ts            # fixed nav, mobile menu signal
│   ├── footer/footer.component.ts      # static footer with year signal
│   └── marquee/marquee.component.ts    # CSS infinite scroll strip
│
└── pages/
    ├── home/home.component.ts          # hero + photo-strip + about-strip + manifesto
    ├── gallery/gallery.component.ts    # httpResource → photo grid
    ├── rules/rules.component.ts        # rules grid (8 rules)
    └── contacts/contacts.component.ts  # contacts + steps + map + donate
```

All components standalone. NavComponent and FooterComponent live in `app.ts` root template — nav is `position: fixed`, footer follows `<router-outlet>`. Page components contain only their own content sections.

### Signals per component

- **NavComponent**: `mobileMenuOpen = signal(false)` (burger toggle), `activeRoute = toSignal(router.events)` (active link highlight)
- **GalleryComponent**: `photos = httpResource<GalleryManifest>('/assets/gallery/manifest.json')`
- **FooterComponent**: `currentYear = signal(new Date().getFullYear())`

---

## 3. Gallery Data

Static manifest at `public/assets/gallery/manifest.json`:
```json
{
  "photos": [
    { "src": "/assets/gallery/photo-01.jpg", "caption": "фото пространства" }
  ]
}
```

- `httpResource` fetches manifest on component init
- Loading state: skeleton placeholder cells
- Error/empty state: 6 placeholder cells matching design (no broken UI)
- Photo files live in `public/assets/gallery/` — Angular copies `public/` to dist root

---

## 4. Styling

- **Global `styles.css`**: CSS custom properties (`--bg`, `--accent`, etc.), reset, `@font-face` declarations, `@keyframes marquee`, `@keyframes fadeIn`, responsive breakpoints (`768px`, `480px`), noise overlay (`body::before`)
- **Per-component scoped CSS**: layout and structural styles only; inherits vars from `:root`
- **Encapsulation**: default emulated (no `ViewEncapsulation.None`)
- **Fonts**: self-hosted woff2 via `@fontsource/oswald` and `@fontsource/ibm-plex-mono` npm packages — Angular `assets` config in `angular.json` copies woff2 files from `node_modules/@fontsource/*/files/` → `assets/fonts/` at build time. Referenced via `@font-face` in `styles.css`. Zero Google Fonts CDN requests, no manual copy scripts.
- **Animations**: pure CSS — marquee via `@keyframes`, page transitions via Angular `withViewTransitions()`

Font weights needed:
- Oswald: 300, 400, 500, 600, 700
- IBM Plex Mono: 300, 400, 500, 700

---

## 5. Vercel Config

`vercel.json`:
```json
{
  "buildCommand": "ng build",
  "outputDirectory": "dist/podpolye-v2/browser",
  "rewrites": [{ "source": "/((?!assets/).*)", "destination": "/index.html" }]
}
```

- `angular.json`: `"outputMode": "server"` → `"outputMode": "static"`, remove `"ssr"` block
- `package.json`: no changes needed (`"build": "ng build"`)
- Rewrite excludes `/assets/*` so font/image files are served directly

---

## Out of Scope

- Backend / API — gallery API is dead, no new backend planned
- Search in gallery — removed from v2 design
- Events pages (`/gallery/:slug`) — not in new design
- PWA / service worker — not in v2
- SSR / serverless functions — pure static only
