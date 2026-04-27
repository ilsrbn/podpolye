# Подполье v2 Angular SSG Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Port `design/index.html` dark brutalist redesign into a production Angular 21 SSG app deployable to Vercel, using signals and httpResource.

**Architecture:** Pure static SSG (`outputMode: static`), 4 lazy-loaded routes (`/`, `/gallery`, `/rules`, `/contacts`), shared Nav+Footer in root `app.ts`, gallery reads `httpResource('/assets/gallery/manifest.json')`.

**Tech Stack:** Angular 21, @angular/ssr (prerender only), @fontsource/oswald, @fontsource/ibm-plex-mono, Vercel static hosting.

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `angular.json` | Modify | outputMode static, font assets config |
| `src/index.html` | Modify | lang=ru, title, meta description |
| `src/styles.css` | Replace | CSS vars, reset, @font-face, keyframes, global layout |
| `src/app/app.config.ts` | Modify | provideHttpClient, withViewTransitions |
| `src/app/app.routes.ts` | Replace | 4 lazy routes |
| `src/app/app.routes.server.ts` | Keep | already has RenderMode.Prerender for ** |
| `src/app/app.ts` | Replace | Nav + RouterOutlet + Footer |
| `src/app/app.html` | Replace | minimal shell template |
| `src/app/app.css` | Replace | empty |
| `src/app/shared/nav/nav.component.ts` | Create | fixed nav, signals, mobile menu |
| `src/app/shared/nav/nav.component.html` | Create | nav markup |
| `src/app/shared/nav/nav.component.css` | Create | nav styles |
| `src/app/shared/footer/footer.component.ts` | Create | static footer |
| `src/app/shared/footer/footer.component.html` | Create | footer markup |
| `src/app/shared/footer/footer.component.css` | Create | footer styles |
| `src/app/shared/marquee/marquee.component.ts` | Create | CSS marquee strip |
| `src/app/shared/marquee/marquee.component.html` | Create | marquee markup |
| `src/app/shared/marquee/marquee.component.css` | Create | marquee styles |
| `src/app/pages/home/home.component.ts` | Create | hero, photo-strip, about-strip, manifesto |
| `src/app/pages/home/home.component.html` | Create | home markup |
| `src/app/pages/home/home.component.css` | Create | home styles |
| `src/app/pages/gallery/gallery.component.ts` | Create | httpResource, photo grid |
| `src/app/pages/gallery/gallery.component.html` | Create | gallery markup |
| `src/app/pages/gallery/gallery.component.css` | Create | gallery styles |
| `src/app/pages/rules/rules.component.ts` | Create | static rules grid |
| `src/app/pages/rules/rules.component.html` | Create | rules markup |
| `src/app/pages/rules/rules.component.css` | Create | rules styles |
| `src/app/pages/contacts/contacts.component.ts` | Create | contacts, steps, map, donate |
| `src/app/pages/contacts/contacts.component.html` | Create | contacts markup |
| `src/app/pages/contacts/contacts.component.css` | Create | contacts styles |
| `public/assets/gallery/manifest.json` | Create | empty photo manifest |
| `vercel.json` | Create | build config + SPA rewrites |

---

## Task 1: Install font packages + configure angular.json

**Files:**
- Modify: `angular.json`
- Run: `npm install @fontsource/oswald @fontsource/ibm-plex-mono`

- [ ] **Step 1: Install font packages**

```bash
cd /Users/ilsrbn/Dev/podpolye-v2
npm install @fontsource/oswald @fontsource/ibm-plex-mono
```

Expected: packages added to `node_modules/@fontsource/oswald` and `node_modules/@fontsource/ibm-plex-mono`.

- [ ] **Step 2: Update angular.json — outputMode + assets**

In `angular.json`, under `projects.podpolye-v2.architect.build.options`:

1. Change `"outputMode": "server"` → `"outputMode": "static"`
2. Remove the `"ssr"` block entirely
3. Add font asset globs to `"assets"` array:

```json
"assets": [
  {
    "glob": "**/*",
    "input": "public"
  },
  {
    "glob": "files/oswald-latin-300-normal.woff2",
    "input": "node_modules/@fontsource/oswald",
    "output": "assets/fonts"
  },
  {
    "glob": "files/oswald-latin-400-normal.woff2",
    "input": "node_modules/@fontsource/oswald",
    "output": "assets/fonts"
  },
  {
    "glob": "files/oswald-latin-500-normal.woff2",
    "input": "node_modules/@fontsource/oswald",
    "output": "assets/fonts"
  },
  {
    "glob": "files/oswald-latin-600-normal.woff2",
    "input": "node_modules/@fontsource/oswald",
    "output": "assets/fonts"
  },
  {
    "glob": "files/oswald-latin-700-normal.woff2",
    "input": "node_modules/@fontsource/oswald",
    "output": "assets/fonts"
  },
  {
    "glob": "files/ibm-plex-mono-latin-300-normal.woff2",
    "input": "node_modules/@fontsource/ibm-plex-mono",
    "output": "assets/fonts"
  },
  {
    "glob": "files/ibm-plex-mono-latin-400-normal.woff2",
    "input": "node_modules/@fontsource/ibm-plex-mono",
    "output": "assets/fonts"
  },
  {
    "glob": "files/ibm-plex-mono-latin-500-normal.woff2",
    "input": "node_modules/@fontsource/ibm-plex-mono",
    "output": "assets/fonts"
  },
  {
    "glob": "files/ibm-plex-mono-latin-700-normal.woff2",
    "input": "node_modules/@fontsource/ibm-plex-mono",
    "output": "assets/fonts"
  }
]
```

- [ ] **Step 3: Verify font files exist in node_modules**

```bash
ls node_modules/@fontsource/oswald/files/ | grep woff2 | head -10
ls node_modules/@fontsource/ibm-plex-mono/files/ | grep woff2 | head -10
```

Expected: woff2 files listed. **If filenames differ from the glob patterns above, update angular.json globs to match actual filenames.**

- [ ] **Step 4: Commit**

```bash
git add angular.json package.json package-lock.json
git commit -m "build: switch to static SSG, add self-hosted fonts via fontsource"
```

---

## Task 2: Global styles

**Files:**
- Replace: `src/styles.css`

- [ ] **Step 1: Write global styles**

Replace entire content of `src/styles.css`:

```css
/* ── FONTS ── */
@font-face {
  font-family: 'Oswald';
  src: url('/assets/fonts/oswald-latin-300-normal.woff2') format('woff2');
  font-weight: 300;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Oswald';
  src: url('/assets/fonts/oswald-latin-400-normal.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Oswald';
  src: url('/assets/fonts/oswald-latin-500-normal.woff2') format('woff2');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Oswald';
  src: url('/assets/fonts/oswald-latin-600-normal.woff2') format('woff2');
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Oswald';
  src: url('/assets/fonts/oswald-latin-700-normal.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'IBM Plex Mono';
  src: url('/assets/fonts/ibm-plex-mono-latin-300-normal.woff2') format('woff2');
  font-weight: 300;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'IBM Plex Mono';
  src: url('/assets/fonts/ibm-plex-mono-latin-400-normal.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'IBM Plex Mono';
  src: url('/assets/fonts/ibm-plex-mono-latin-500-normal.woff2') format('woff2');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'IBM Plex Mono';
  src: url('/assets/fonts/ibm-plex-mono-latin-700-normal.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

/* ── RESET ── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

/* ── VARS ── */
:root {
  --bg: #0c0f14;
  --bg2: #121720;
  --bg3: #1a2030;
  --line: #2a3348;
  --text: #bfcce8;
  --text-dim: #5a6a8a;
  --head: #e8eeff;
  --accent: oklch(0.62 0.10 48);
  --accent2: oklch(0.68 0.10 55);
  --accent-dim: oklch(0.32 0.07 48);
  --mono: 'IBM Plex Mono', monospace;
  --display: 'Oswald', sans-serif;
}

html { scroll-behavior: auto; }

body {
  background: var(--bg);
  color: var(--text);
  font-family: var(--mono);
  font-size: 14px;
  line-height: 1.6;
  min-height: 100vh;
  overflow-x: hidden;
}

/* ── NOISE OVERLAY ── */
body::before {
  content: '';
  position: fixed;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
  opacity: 0.03;
  pointer-events: none;
  z-index: 9999;
}

/* ── SHARED BUTTON ── */
.btn {
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  padding: 12px 24px;
  border: 1px solid var(--accent);
  background: transparent;
  color: var(--accent);
  cursor: pointer;
  text-decoration: none;
  transition: background 0.1s, color 0.1s;
  display: inline-block;
}
.btn:hover { background: var(--accent); color: var(--bg); }
.btn-ghost { border-color: var(--line); color: var(--text-dim); }
.btn-ghost:hover { border-color: var(--text-dim); background: transparent; color: var(--text); }

/* ── PAGE SHELL ── */
.page-content {
  padding-top: 52px;
  min-height: 100vh;
}

/* ── VIEW TRANSITIONS ── */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}

::view-transition-old(root) {
  animation: 150ms ease-out both fade-out;
}
::view-transition-new(root) {
  animation: 200ms ease-in both fadeIn;
}

@keyframes fade-out {
  from { opacity: 1; }
  to   { opacity: 0; }
}

/* ── MARQUEE KEYFRAME ── */
@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
```

- [ ] **Step 2: Update src/index.html**

Replace content of `src/index.html`:

```html
<!doctype html>
<html lang="ru">
<head>
  <meta charset="utf-8">
  <title>ПОДПОЛЬЕ — Одесса</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="Некоммерческое городское пространство для интеллектуального отдыха, развития и работы. Антикафе. Коворкинг. Мероприятия. Одесса, Канатная 79.">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
</head>
<body>
  <app-root></app-root>
</body>
</html>
```

- [ ] **Step 3: Commit**

```bash
git add src/styles.css src/index.html
git commit -m "style: global CSS vars, font-face declarations, shared utilities"
```

---

## Task 3: App config + routes

**Files:**
- Modify: `src/app/app.config.ts`
- Replace: `src/app/app.routes.ts`

- [ ] **Step 1: Update app.config.ts**

```typescript
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding(), withViewTransitions()),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
  ]
};
```

- [ ] **Step 2: Replace app.routes.ts**

```typescript
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
  },
  {
    path: 'gallery',
    loadComponent: () => import('./pages/gallery/gallery.component').then(m => m.GalleryComponent),
  },
  {
    path: 'rules',
    loadComponent: () => import('./pages/rules/rules.component').then(m => m.RulesComponent),
  },
  {
    path: 'contacts',
    loadComponent: () => import('./pages/contacts/contacts.component').then(m => m.ContactsComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
```

- [ ] **Step 3: Commit**

```bash
git add src/app/app.config.ts src/app/app.routes.ts
git commit -m "feat: configure router with lazy routes, httpClient, viewTransitions"
```

---

## Task 4: NavComponent

**Files:**
- Create: `src/app/shared/nav/nav.component.ts`
- Create: `src/app/shared/nav/nav.component.html`
- Create: `src/app/shared/nav/nav.component.css`

- [ ] **Step 1: Create nav.component.ts**

```typescript
import { Component, signal, computed, inject, HostListener } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {
  private router = inject(Router);

  mobileMenuOpen = signal(false);

  readonly navEvents = toSignal(
    this.router.events.pipe(filter(e => e instanceof NavigationEnd))
  );

  toggleMenu() {
    this.mobileMenuOpen.update(v => !v);
    document.body.style.overflow = this.mobileMenuOpen() ? 'hidden' : '';
  }

  closeMenu() {
    this.mobileMenuOpen.set(false);
    document.body.style.overflow = '';
  }
}
```

- [ ] **Step 2: Create nav.component.html**

```html
<nav>
  <a class="nav-logo" routerLink="/" (click)="closeMenu()">
    <img src="https://www.podpolye.org/_nuxt/img/wide2.079a83f.png"
         alt="ПОДПОЛЬЕ"
         width="auto" height="28">
  </a>

  <div class="nav-links">
    <a class="nav-link" routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Главная</a>
    <a class="nav-link" routerLink="/gallery" routerLinkActive="active">Галерея</a>
    <a class="nav-link" routerLink="/rules" routerLinkActive="active">Правила</a>
    <a class="nav-link" routerLink="/contacts" routerLinkActive="active">Контакты</a>
  </div>

  <div class="nav-social">
    <a href="https://t.me/de_profundis_clamavi" target="_blank" rel="noopener">TG</a>
    <a href="https://www.instagram.com/podpolie.odessa/" target="_blank" rel="noopener">IG</a>
  </div>

  <button class="nav-burger"
          [class.open]="mobileMenuOpen()"
          (click)="toggleMenu()"
          aria-label="Меню">
    <span></span><span></span><span></span>
  </button>
</nav>

<div class="mobile-menu" [class.open]="mobileMenuOpen()">
  <a class="mobile-nav-link" routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" (click)="closeMenu()">Главная</a>
  <a class="mobile-nav-link" routerLink="/gallery" routerLinkActive="active" (click)="closeMenu()">Галерея</a>
  <a class="mobile-nav-link" routerLink="/rules" routerLinkActive="active" (click)="closeMenu()">Правила</a>
  <a class="mobile-nav-link" routerLink="/contacts" routerLinkActive="active" (click)="closeMenu()">Контакты</a>
  <div class="mobile-menu-footer">
    <a href="https://t.me/de_profundis_clamavi" target="_blank" rel="noopener">Telegram</a>
    <a href="https://www.instagram.com/podpolie.odessa/" target="_blank" rel="noopener">Instagram</a>
  </div>
</div>
```

- [ ] **Step 3: Create nav.component.css**

```css
nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  border-bottom: 1px solid var(--line);
  background: var(--bg);
  display: flex;
  align-items: stretch;
  height: 52px;
}

.nav-logo {
  padding: 0 28px;
  display: flex;
  align-items: center;
  border-right: 1px solid var(--line);
  cursor: pointer;
  text-decoration: none;
  flex-shrink: 0;
}

.nav-links {
  display: flex;
  align-items: stretch;
  flex: 1;
}

.nav-link {
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--text-dim);
  padding: 0 22px;
  display: flex;
  align-items: center;
  cursor: pointer;
  border-right: 1px solid var(--line);
  text-decoration: none;
  transition: color 0.1s, background 0.1s;
  user-select: none;
}

.nav-link:hover { color: var(--head); background: var(--bg2); }

.nav-link.active {
  color: var(--accent);
  border-bottom: 2px solid var(--accent);
  background: var(--bg2);
}

.nav-social {
  margin-left: auto;
  display: flex;
  align-items: stretch;
  border-left: 1px solid var(--line);
}

.nav-social a {
  padding: 0 18px;
  display: flex;
  align-items: center;
  border-left: 1px solid var(--line);
  color: var(--text-dim);
  text-decoration: none;
  font-size: 11px;
  letter-spacing: 0.1em;
  transition: color 0.1s, background 0.1s;
}

.nav-social a:hover { color: var(--accent); background: var(--bg2); }

.nav-burger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  padding: 0 18px;
  cursor: pointer;
  margin-left: auto;
  border: none;
  background: none;
  height: 52px;
}

.nav-burger span {
  display: block;
  width: 22px;
  height: 2px;
  background: var(--text-dim);
  transition: transform 0.15s, opacity 0.15s;
}

.nav-burger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.nav-burger.open span:nth-child(2) { opacity: 0; }
.nav-burger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

.mobile-menu {
  display: none;
  position: fixed;
  top: 52px; left: 0; right: 0; bottom: 0;
  background: var(--bg);
  z-index: 99;
  flex-direction: column;
  border-top: 1px solid var(--line);
  overflow-y: auto;
}

.mobile-menu.open { display: flex; }

.mobile-nav-link {
  font-family: var(--display);
  font-weight: 600;
  font-size: 36px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--text-dim);
  padding: 24px 32px;
  border-bottom: 1px solid var(--line);
  cursor: pointer;
  text-decoration: none;
  display: block;
  transition: color 0.1s, background 0.1s;
}

.mobile-nav-link:hover,
.mobile-nav-link.active { color: var(--accent); background: var(--bg2); }

.mobile-menu-footer {
  padding: 32px;
  margin-top: auto;
  display: flex;
  gap: 16px;
}

.mobile-menu-footer a {
  font-size: 11px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--text-dim);
  text-decoration: none;
  border: 1px solid var(--line);
  padding: 10px 20px;
}

.mobile-menu-footer a:hover { color: var(--accent); border-color: var(--accent); }

@media (max-width: 768px) {
  .nav-links, .nav-social { display: none; }
  .nav-burger { display: flex; }
  .nav-logo { padding: 0 20px; }
}
```

- [ ] **Step 4: Commit**

```bash
git add src/app/shared/nav/
git commit -m "feat: NavComponent with mobile menu signal and RouterLinkActive"
```

---

## Task 5: FooterComponent

**Files:**
- Create: `src/app/shared/footer/footer.component.ts`
- Create: `src/app/shared/footer/footer.component.html`
- Create: `src/app/shared/footer/footer.component.css`

- [ ] **Step 1: Create footer.component.ts**

```typescript
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  readonly currentYear = signal(new Date().getFullYear());
}
```

- [ ] **Step 2: Create footer.component.html**

```html
<footer>
  <div class="footer-left">
    <strong>ПОДПОЛЬЕ — ОДЕССА</strong>
    Некоммерческое городское пространство · {{ currentYear() }}
  </div>
  <div class="footer-right">
    Designed by <a href="https://instagram.com/earl_g6" target="_blank" rel="noopener">EarlG6</a>
    &amp; <a href="https://www.instagram.com/krmisabitchh.photo/" target="_blank" rel="noopener">Krmisabitchh</a><br>
    Coded by <a href="https://t.me/Zhyvny" target="_blank" rel="noopener">Serbin</a>
  </div>
</footer>
```

- [ ] **Step 3: Create footer.component.css**

```css
footer {
  padding: 40px 60px;
  border-top: 1px solid var(--line);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-left {
  font-size: 11px;
  color: var(--text-dim);
  letter-spacing: 0.08em;
}

.footer-left strong {
  font-family: var(--display);
  font-size: 14px;
  font-weight: 600;
  color: var(--head);
  letter-spacing: 0.1em;
  display: block;
  margin-bottom: 4px;
}

.footer-right {
  font-size: 10px;
  color: var(--text-dim);
  letter-spacing: 0.08em;
  text-align: right;
  line-height: 1.8;
}

.footer-right a {
  color: var(--text-dim);
  text-decoration: none;
  border-bottom: 1px solid var(--line);
}

.footer-right a:hover { color: var(--accent); border-color: var(--accent); }

@media (max-width: 768px) {
  footer { flex-direction: column; gap: 20px; padding: 28px 24px; text-align: center; }
  .footer-right { text-align: center; }
}
```

- [ ] **Step 4: Commit**

```bash
git add src/app/shared/footer/
git commit -m "feat: FooterComponent with currentYear signal"
```

---

## Task 6: MarqueeComponent

**Files:**
- Create: `src/app/shared/marquee/marquee.component.ts`
- Create: `src/app/shared/marquee/marquee.component.html`
- Create: `src/app/shared/marquee/marquee.component.css`

- [ ] **Step 1: Create marquee.component.ts**

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-marquee',
  standalone: true,
  templateUrl: './marquee.component.html',
  styleUrl: './marquee.component.css',
})
export class MarqueeComponent {}
```

- [ ] **Step 2: Create marquee.component.html**

```html
<div class="marquee-wrap">
  <div class="marquee-inner">
    <span>Антикафе</span><span class="accent">///</span>
    <span>Коворкинг</span><span class="accent">///</span>
    <span>Мероприятия</span><span class="accent">///</span>
    <span>Одесса</span><span class="accent">///</span>
    <span>Канатная 79</span><span class="accent">///</span>
    <span>Free Donation</span><span class="accent">///</span>
    <span>Антикафе</span><span class="accent">///</span>
    <span>Коворкинг</span><span class="accent">///</span>
    <span>Мероприятия</span><span class="accent">///</span>
    <span>Одесса</span><span class="accent">///</span>
    <span>Канатная 79</span><span class="accent">///</span>
    <span>Free Donation</span><span class="accent">///</span>
  </div>
</div>
```

- [ ] **Step 3: Create marquee.component.css**

```css
.marquee-wrap {
  overflow: hidden;
  border-bottom: 1px solid var(--line);
  border-top: 1px solid var(--line);
  padding: 14px 0;
  background: var(--bg2);
}

.marquee-inner {
  display: flex;
  gap: 0;
  white-space: nowrap;
  animation: marquee 18s linear infinite;
}

.marquee-inner span {
  font-family: var(--display);
  font-weight: 500;
  font-size: 13px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--text-dim);
  padding: 0 32px;
}

.marquee-inner span.accent { color: var(--accent); }
```

- [ ] **Step 4: Commit**

```bash
git add src/app/shared/marquee/
git commit -m "feat: MarqueeComponent with CSS infinite scroll animation"
```

---

## Task 7: Root App shell

**Files:**
- Replace: `src/app/app.ts`
- Replace: `src/app/app.html`
- Replace: `src/app/app.css`

- [ ] **Step 1: Replace app.ts**

```typescript
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './shared/nav/nav.component';
import { FooterComponent } from './shared/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
```

- [ ] **Step 2: Replace app.html**

```html
<app-nav />
<main class="page-content">
  <router-outlet />
</main>
<app-footer />
```

- [ ] **Step 3: Replace app.css**

```css
```

(empty file — all styles are global or scoped to components)

- [ ] **Step 4: Verify dev server starts**

```bash
ng serve --open
```

Expected: browser opens at `http://localhost:4200`, dark background, nav visible with logo and links, no console errors.

- [ ] **Step 5: Commit**

```bash
git add src/app/app.ts src/app/app.html src/app/app.css
git commit -m "feat: root App shell with Nav, RouterOutlet, Footer"
```

---

## Task 8: HomeComponent

**Files:**
- Create: `src/app/pages/home/home.component.ts`
- Create: `src/app/pages/home/home.component.html`
- Create: `src/app/pages/home/home.component.css`

- [ ] **Step 1: Create home.component.ts**

```typescript
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MarqueeComponent } from '../../shared/marquee/marquee.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, MarqueeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
```

- [ ] **Step 2: Create home.component.html**

```html
<section class="hero">
  <div class="hero-left">
    <div>
      <div class="hero-eyebrow"><span>///</span> Одесса — Канатная, 79</div>
      <h1 class="hero-title">ПОД<em>ПОЛЬЕ</em></h1>
      <p class="hero-sub">Некоммерческое городское пространство для интеллектуального отдыха, развития и работы. Антикафе. Коворкинг. Мероприятия.</p>
      <div class="hero-cta">
        <a class="btn" routerLink="/contacts">Как попасть →</a>
        <a class="btn btn-ghost" routerLink="/rules">Правила</a>
      </div>
    </div>
    <div class="hero-status">
      <span class="status-dot active">○</span>&nbsp; Открыто для всех, кто соблюдает правила<br>
      <span class="status-dot">○</span>&nbsp; Аполитичное · Нерелигиозное · Некоммерческое
    </div>
  </div>

  <div class="hero-right">
    <div class="hero-card" data-num="01">
      <div>
        <div class="card-tag">// Формат 01</div>
        <div class="card-title">Антикафе / Коворкинг</div>
        <p class="card-body">Место, электричество, Wi-Fi, умные книги, настольные игры, чай и кофе. Тихо в будние дни до 17:00 — можно работать или просто отдохнуть.</p>
      </div>
      <div class="card-price">Free donation · 30 грн / час</div>
    </div>
    <div class="hero-card" data-num="02">
      <div>
        <div class="card-tag">// Формат 02</div>
        <div class="card-title">Проведение мероприятий</div>
        <p class="card-body">Образовательные и развлекательные посиделки. Берите помещение в аренду для своего мероприятия — проектор, колонки, столы и стулья.</p>
      </div>
      <div class="card-price">Аренда · 100 грн / час</div>
    </div>
  </div>
</section>

<section class="photo-strip">
  <div class="photo-strip-img">
    <img src="https://www.podpolye.org/_nuxt/img/arc_2.627008c.webp"
         alt="Подполье — интерьер"
         loading="lazy">
    <div class="photo-strip-overlay">
      <div class="photo-strip-tag">// интерьер</div>
      <div class="photo-strip-caption">Канатная, 79 — Одесса</div>
    </div>
  </div>
</section>

<app-marquee />

<section class="about-strip">
  <div class="strip-cell">
    <div class="strip-num">30<span>грн</span></div>
    <div class="strip-label">Желаемая оплата / час</div>
    <div class="strip-desc">Free donation — плати столько, сколько считаешь нужным.</div>
  </div>
  <div class="strip-cell">
    <div class="strip-num">100<span>грн</span></div>
    <div class="strip-label">Аренда для мероприятий</div>
    <div class="strip-desc">Со своим событием? Берём площадку в аренду с оборудованием.</div>
  </div>
  <div class="strip-cell">
    <div class="strip-num">∞</div>
    <div class="strip-label">Открыто для всех</div>
    <div class="strip-desc">Инклюзивное пространство без возрастных, расовых или иных барьеров.</div>
  </div>
</section>

<section class="manifesto">
  <div class="manifesto-label-wrap">
    <div class="manifesto-label">О пространстве</div>
  </div>
  <div>
    <p class="manifesto-text">
      <strong>Некоммерческий</strong> и <strong>аполитичный</strong> проект, созданный силами инициативной группы, волонтёров и меценатов.<br><br>
      Мы всегда рады <strong>помощи</strong> и открыты для общения и сотрудничества.
    </p>
  </div>
</section>
```

- [ ] **Step 3: Create home.component.css**

```css
/* ── HERO ── */
.hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: calc(100vh - 52px);
  border-bottom: 1px solid var(--line);
}

.hero-left {
  padding: 80px 60px;
  border-right: 1px solid var(--line);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.hero-eyebrow {
  font-size: 10px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--text-dim);
  margin-bottom: 40px;
}

.hero-eyebrow span { color: var(--accent); margin-right: 12px; }

.hero-title {
  font-family: var(--display);
  font-weight: 700;
  font-size: clamp(72px, 10vw, 140px);
  line-height: 0.9;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  color: var(--head);
  text-wrap: balance;
}

.hero-title em { font-style: normal; color: var(--accent); display: block; }

.hero-sub {
  margin-top: 48px;
  font-size: 13px;
  color: var(--text-dim);
  line-height: 1.7;
  max-width: 380px;
  border-left: 2px solid var(--accent);
  padding-left: 16px;
}

.hero-cta { margin-top: 60px; display: flex; gap: 12px; flex-wrap: wrap; }

.hero-status {
  font-size: 11px;
  color: var(--text-dim);
  letter-spacing: 0.08em;
  margin-top: 40px;
  line-height: 1.8;
}

.status-dot.active { color: var(--accent); }

.hero-right { display: grid; grid-template-rows: 1fr 1fr; }

.hero-card {
  padding: 50px 48px;
  border-bottom: 1px solid var(--line);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
  transition: background 0.1s;
}

.hero-card:last-child { border-bottom: none; }
.hero-card:hover { background: var(--bg2); }

.hero-card::after {
  content: attr(data-num);
  position: absolute;
  bottom: -20px;
  right: 24px;
  font-family: var(--display);
  font-weight: 700;
  font-size: 120px;
  color: var(--line);
  line-height: 1;
  pointer-events: none;
}

.card-tag {
  font-size: 10px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 16px;
}

.card-title {
  font-family: var(--display);
  font-size: 28px;
  font-weight: 600;
  color: var(--head);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin-bottom: 12px;
}

.card-body { font-size: 13px; color: var(--text-dim); line-height: 1.65; max-width: 340px; }

.card-price {
  margin-top: 20px;
  font-family: var(--display);
  font-size: 22px;
  font-weight: 500;
  color: var(--accent2);
  letter-spacing: 0.05em;
}

/* ── PHOTO STRIP ── */
.photo-strip { border-bottom: 1px solid var(--line); height: 420px; }

.photo-strip-img {
  position: relative;
  overflow: hidden;
  height: 100%;
}

.photo-strip-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
  filter: brightness(0.75) contrast(1.1);
}

.photo-strip-overlay {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  padding: 28px 36px;
  background: linear-gradient(to top, rgba(12,15,20,0.85) 0%, transparent 100%);
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.photo-strip-tag {
  font-size: 10px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--accent);
}

.photo-strip-caption {
  font-family: var(--display);
  font-size: 18px;
  font-weight: 500;
  color: var(--head);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

/* ── ABOUT STRIP ── */
.about-strip {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border-bottom: 1px solid var(--line);
}

.strip-cell {
  padding: 40px 48px;
  border-right: 1px solid var(--line);
}

.strip-cell:last-child { border-right: none; }

.strip-num {
  font-family: var(--display);
  font-weight: 700;
  font-size: 48px;
  color: var(--head);
  line-height: 1;
  margin-bottom: 8px;
}

.strip-num span { color: var(--accent); }
.strip-label { font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--text-dim); margin-bottom: 12px; }
.strip-desc { font-size: 12px; color: var(--text-dim); line-height: 1.6; }

/* ── MANIFESTO ── */
.manifesto {
  padding: 80px 60px;
  border-bottom: 1px solid var(--line);
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 60px;
  align-items: start;
}

.manifesto-label-wrap { display: flex; align-items: flex-start; }

.manifesto-label {
  font-size: 10px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--text-dim);
  writing-mode: vertical-lr;
  transform: rotate(180deg);
  padding-top: 4px;
}

.manifesto-text {
  font-family: var(--display);
  font-weight: 300;
  font-size: clamp(20px, 2.5vw, 36px);
  line-height: 1.4;
  color: var(--head);
  letter-spacing: 0.01em;
}

.manifesto-text strong { color: var(--accent); font-weight: 600; }

/* ── RESPONSIVE ── */
@media (max-width: 768px) {
  .hero { grid-template-columns: 1fr; min-height: auto; }
  .hero-left { padding: 48px 24px 40px; border-right: none; }
  .hero-title { font-size: clamp(56px, 18vw, 100px); }
  .hero-cta { margin-top: 36px; }
  .hero-right { display: block; }
  .hero-card { padding: 32px 24px; }
  .hero-card::after { font-size: 64px; }

  .photo-strip { height: 220px; }

  .about-strip { grid-template-columns: 1fr; }
  .strip-cell { border-right: none; border-bottom: 1px solid var(--line); padding: 32px 24px; }
  .strip-cell:last-child { border-bottom: none; }

  .manifesto { grid-template-columns: 1fr; padding: 48px 24px; gap: 24px; }
  .manifesto-label { writing-mode: horizontal-tb; transform: none; }
}

@media (max-width: 480px) {
  .hero-title { font-size: clamp(48px, 22vw, 80px); }
}
```

- [ ] **Step 4: Commit**

```bash
git add src/app/pages/home/
git commit -m "feat: HomeComponent — hero, photo-strip, about-strip, manifesto"
```

---

## Task 9: GalleryComponent

**Files:**
- Create: `src/app/pages/gallery/gallery.component.ts`
- Create: `src/app/pages/gallery/gallery.component.html`
- Create: `src/app/pages/gallery/gallery.component.css`
- Create: `public/assets/gallery/manifest.json`

- [ ] **Step 1: Create gallery manifest**

```bash
mkdir -p /Users/ilsrbn/Dev/podpolye-v2/public/assets/gallery
```

Create `public/assets/gallery/manifest.json`:

```json
{
  "photos": []
}
```

- [ ] **Step 2: Create gallery.component.ts**

```typescript
import { Component } from '@angular/core';
import { httpResource } from '@angular/common/http';

interface GalleryPhoto {
  src: string;
  caption: string;
}

interface GalleryManifest {
  photos: GalleryPhoto[];
}

const PLACEHOLDERS: GalleryPhoto[] = [
  { src: '', caption: 'фото пространства' },
  { src: '', caption: 'фото мероприятия' },
  { src: '', caption: 'фото атмосферы' },
  { src: '', caption: 'фото людей' },
  { src: '', caption: 'фото библиотеки' },
  { src: '', caption: 'фото игр' },
];

@Component({
  selector: 'app-gallery',
  standalone: true,
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css',
})
export class GalleryComponent {
  photos = httpResource<GalleryManifest>('/assets/gallery/manifest.json');

  get displayPhotos(): GalleryPhoto[] {
    const data = this.photos.value();
    if (!data || data.photos.length === 0) return PLACEHOLDERS;
    return data.photos;
  }

  get isPlaceholder(): boolean {
    const data = this.photos.value();
    return !data || data.photos.length === 0;
  }
}
```

- [ ] **Step 3: Create gallery.component.html**

```html
<section class="gallery-hero">
  <h1 class="page-title">ГА<em>ЛЕ</em>РЕЯ</h1>
  <p class="gallery-note">Визуальная хроника пространства — мероприятия, атмосфера, люди. Фотографии появляются здесь по мере их добавления.</p>
</section>

<div class="gallery-placeholder">
  @if (photos.isLoading()) {
    <div class="gallery-grid">
      @for (p of [1,2,3,4,5,6]; track p) {
        <div class="gallery-cell skeleton"><span>...</span></div>
      }
    </div>
  } @else {
    <div class="gallery-grid">
      @for (photo of displayPhotos; track photo.caption) {
        @if (photo.src) {
          <div class="gallery-cell">
            <img [src]="photo.src" [alt]="photo.caption" loading="lazy">
          </div>
        } @else {
          <div class="gallery-cell placeholder">
            <span>{{ photo.caption }}</span>
          </div>
        }
      }
    </div>
  }
</div>
```

- [ ] **Step 4: Create gallery.component.css**

```css
.gallery-hero {
  padding: 80px 60px 60px;
  border-bottom: 1px solid var(--line);
}

.page-title {
  font-family: var(--display);
  font-weight: 700;
  font-size: clamp(48px, 7vw, 100px);
  line-height: 0.9;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  color: var(--head);
}

.page-title em { font-style: normal; color: var(--accent); }

.gallery-note {
  margin-top: 24px;
  font-size: 12px;
  color: var(--text-dim);
  border-left: 2px solid var(--line);
  padding-left: 16px;
  max-width: 500px;
}

.gallery-placeholder { padding: 60px; }

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: var(--line);
  border: 1px solid var(--line);
  margin-bottom: 1px;
}

.gallery-cell {
  background: var(--bg2);
  aspect-ratio: 4/3;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  letter-spacing: 0.1em;
  color: var(--text-dim);
  text-transform: uppercase;
  font-family: var(--mono);
  position: relative;
  overflow: hidden;
}

.gallery-cell img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.gallery-cell.placeholder::before {
  content: '';
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 8px,
    var(--bg3) 8px,
    var(--bg3) 9px
  );
  opacity: 0.4;
}

.gallery-cell span {
  position: relative;
  z-index: 1;
  text-align: center;
  padding: 16px;
  line-height: 1.8;
}

.gallery-cell.skeleton { animation: pulse 1.5s ease-in-out infinite; }

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

@media (max-width: 768px) {
  .gallery-hero { padding: 48px 24px 36px; }
  .gallery-placeholder { padding: 24px; }
  .gallery-grid { grid-template-columns: 1fr 1fr; }
}

@media (max-width: 480px) {
  .gallery-grid { grid-template-columns: 1fr; }
}
```

- [ ] **Step 5: Commit**

```bash
git add src/app/pages/gallery/ public/assets/gallery/
git commit -m "feat: GalleryComponent with httpResource and manifest-driven photo grid"
```

---

## Task 10: RulesComponent

**Files:**
- Create: `src/app/pages/rules/rules.component.ts`
- Create: `src/app/pages/rules/rules.component.html`
- Create: `src/app/pages/rules/rules.component.css`

- [ ] **Step 1: Create rules.component.ts**

```typescript
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Rule {
  num: string;
  headline: string;
  body: string;
}

@Component({
  selector: 'app-rules',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './rules.component.html',
  styleUrl: './rules.component.css',
})
export class RulesComponent {
  readonly rules: Rule[] = [
    { num: '01', headline: 'Трезвость', body: 'В «Подполье» запрещено курить, употреблять или приносить алкоголь, наркотические или токсические вещества. Приходим трезвыми.' },
    { num: '02', headline: 'Нейтралитет', body: 'Пространство аполитично и нерелигиозно. Обговаривай и дискутируй — но не агитируй. Уважай мнение и выбор других.' },
    { num: '03', headline: 'Инклюзивность', body: 'Тут рады всем, кто соблюдает правила — независимо от возраста, расы, гендера и других индивидуальных особенностей.' },
    { num: '04', headline: 'Чистота', body: 'Заботимся о чистоте пространства и окружающей среды. Убираем за собой мусор.' },
    { num: '05', headline: 'Вещи', body: 'Не оставляем личных вещей без присмотра. Всё оставленное без надзора становится общим.' },
    { num: '06', headline: 'Уважение к волонтёрам', body: 'Ценим труд команды волонтёров. Ставим вещи на свои места и оставляем пространство таким, каким пришли.' },
    { num: '07', headline: 'Компромисс', body: 'Сотрудничаем и ищем взаимопонимание. Любые конфликты выносим за границы пространства.' },
    { num: '08', headline: 'Тишина и атмосфера', body: 'Уважаем посетителей, не мешаем шумом. Приоритет — мероприятиям, которые проходят в «Подполье».' },
  ];
}
```

- [ ] **Step 2: Create rules.component.html**

```html
<section class="rules-hero">
  <h1 class="page-title">ПРА<em>ВИ</em>ЛА</h1>
  <p class="rules-meta">Наше пространство держится на доверии и уважении. Правила — это не ограничения, а основа комфорта для всех.</p>
</section>

<div class="rules-grid">
  @for (rule of rules; track rule.num) {
    <div class="rule-item">
      <div class="rule-num">{{ rule.num }}</div>
      <div class="rule-content">
        <div class="rule-headline">{{ rule.headline }}</div>
        <p class="rule-body">{{ rule.body }}</p>
      </div>
    </div>
  }
</div>

<div class="rules-footer">
  <div class="rules-footer-text">Администрация оставляет за собой право просить покинуть помещение без объяснения причин.</div>
  <a class="btn" routerLink="/contacts">Контакты →</a>
</div>
```

- [ ] **Step 3: Create rules.component.css**

```css
.rules-hero {
  padding: 80px 60px 60px;
  border-bottom: 1px solid var(--line);
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 40px;
}

.page-title {
  font-family: var(--display);
  font-weight: 700;
  font-size: clamp(48px, 7vw, 100px);
  line-height: 0.9;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  color: var(--head);
}

.page-title em { font-style: normal; color: var(--accent); }

.rules-meta {
  font-size: 12px;
  color: var(--text-dim);
  line-height: 1.6;
  max-width: 300px;
  text-align: right;
}

.rules-grid { display: grid; grid-template-columns: 1fr 1fr; }

.rule-item {
  padding: 36px 48px;
  border-right: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  display: flex;
  gap: 24px;
  align-items: flex-start;
}

.rule-item:nth-child(even) { border-right: none; }

.rule-num {
  font-family: var(--display);
  font-weight: 700;
  font-size: 36px;
  color: var(--line);
  line-height: 1;
  flex-shrink: 0;
  width: 48px;
  text-align: right;
  transition: color 0.15s;
}

.rule-item:hover .rule-num { color: var(--accent); }

.rule-headline {
  font-family: var(--display);
  font-size: 16px;
  font-weight: 600;
  color: var(--head);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 8px;
}

.rule-body { font-size: 12px; color: var(--text-dim); line-height: 1.65; }

.rules-footer {
  padding: 40px 48px;
  border-bottom: 1px solid var(--line);
  background: var(--bg2);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.rules-footer-text {
  font-family: var(--display);
  font-size: 18px;
  font-weight: 500;
  color: var(--text-dim);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  max-width: 600px;
}

@media (max-width: 768px) {
  .rules-hero { padding: 48px 24px 36px; flex-direction: column; align-items: flex-start; gap: 16px; }
  .rules-meta { text-align: left; max-width: 100%; }
  .rules-grid { grid-template-columns: 1fr; }
  .rule-item { border-right: none !important; padding: 28px 24px; }
  .rules-footer { flex-direction: column; gap: 16px; padding: 28px 24px; align-items: flex-start; }
}
```

- [ ] **Step 4: Commit**

```bash
git add src/app/pages/rules/
git commit -m "feat: RulesComponent with 8 rules rendered from component data"
```

---

## Task 11: ContactsComponent

**Files:**
- Create: `src/app/pages/contacts/contacts.component.ts`
- Create: `src/app/pages/contacts/contacts.component.html`
- Create: `src/app/pages/contacts/contacts.component.css`

- [ ] **Step 1: Create contacts.component.ts**

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-contacts',
  standalone: true,
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css',
})
export class ContactsComponent {}
```

- [ ] **Step 2: Create contacts.component.html**

```html
<section class="contacts-hero">
  <h1 class="page-title">КОН<em>ТАК</em>ТЫ</h1>
</section>

<div class="contacts-grid">
  <div class="contact-block">
    <div class="contact-label">// Координатор 01</div>
    <div class="contact-name">Кирилл</div>
    <div class="contact-info">
      <a href="tel:+380631327600">+38 063 132-76-00</a>
    </div>
  </div>
  <div class="contact-block">
    <div class="contact-label">// Координатор 02</div>
    <div class="contact-name">Павел</div>
    <div class="contact-info">
      <a href="tel:+380634869957">+38 063 486-99-57</a>
    </div>
  </div>
  <div class="contact-block">
    <div class="contact-label">// Социальные сети</div>
    <div class="contact-name" style="font-size:20px;">Чат &amp; соцсети</div>
    <div class="contact-info">
      <a href="https://t.me/de_profundis_clamavi" target="_blank" rel="noopener">Telegram чат подпольщиков</a><br>
      <a href="https://www.instagram.com/podpolie.odessa/" target="_blank" rel="noopener">Instagram &#64;podpolie.odessa</a>
    </div>
  </div>
</div>

<section class="steps-section">
  <div class="steps-title">// Как попасть в подполье</div>
  <div class="steps">
    <div class="step">
      <div class="step-num">01</div>
      <div class="step-accent-line"></div>
      <div class="step-title">Найти ворота</div>
      <p class="step-body">Идёте по адресу <strong>Канатная, 79</strong>. Ищите ворота во двор.</p>
    </div>
    <div class="step">
      <div class="step-num">02</div>
      <div class="step-accent-line"></div>
      <div class="step-title">Кодовый замок</div>
      <p class="step-body">На воротах кодовый замок. Подсказка написана прямо над воротами — читайте внимательно.</p>
    </div>
    <div class="step">
      <div class="step-num">03</div>
      <div class="step-accent-line"></div>
      <div class="step-title">Домофон</div>
      <p class="step-body">Зашли во двор? Справа есть пристройка с домофоном — звоните, и отворят вам.</p>
    </div>
  </div>
</section>

<div class="map-section">
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2746.8!2d30.7326!3d46.4825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c633b4a0a8a0a1%3A0x0!2z0JrQsNC90LDRgtC90LDRjywgNzksINCe0LTQtdGB0YHQsCwg0KPQutGA0LDQuNC90LA!5e0!3m2!1sru!2sua!4v1714000000000"
    allowfullscreen=""
    loading="lazy"
    referrerpolicy="no-referrer-when-downgrade"
    title="Подполье на карте">
  </iframe>
  <div class="map-label">
    <div class="contact-label">// Адрес</div>
    <div class="contact-name" style="font-size:22px;">Канатная, 79</div>
    <div class="contact-info" style="margin-top:8px;">Одесса, Украина</div>
  </div>
</div>

<div class="donate-strip">
  <div class="donate-label">// Карта для донатов</div>
  <div class="donate-card">4441 1144 5406 1506</div>
  <div class="donate-note">Поддержите некоммерческое пространство — любая сумма важна для нас.</div>
</div>
```

- [ ] **Step 3: Create contacts.component.css**

```css
.contacts-hero {
  padding: 80px 60px 60px;
  border-bottom: 1px solid var(--line);
}

.page-title {
  font-family: var(--display);
  font-weight: 700;
  font-size: clamp(48px, 7vw, 100px);
  line-height: 0.9;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  color: var(--head);
}

.page-title em { font-style: normal; color: var(--accent); }

.contacts-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  border-bottom: 1px solid var(--line);
}

.contact-block {
  padding: 48px;
  border-right: 1px solid var(--line);
}

.contact-block:last-child { border-right: none; }

.contact-label {
  font-size: 10px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 24px;
}

.contact-name {
  font-family: var(--display);
  font-size: 28px;
  font-weight: 600;
  color: var(--head);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin-bottom: 8px;
}

.contact-info { font-size: 13px; color: var(--text); line-height: 1.8; }

.contact-info a {
  color: var(--accent);
  text-decoration: none;
  border-bottom: 1px solid var(--accent-dim);
  transition: border-color 0.1s;
}

.contact-info a:hover { border-color: var(--accent); }

/* ── STEPS ── */
.steps-section { padding: 60px; border-bottom: 1px solid var(--line); }

.steps-title {
  font-family: var(--display);
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--text-dim);
  margin-bottom: 48px;
}

.steps {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: var(--line);
  border: 1px solid var(--line);
}

.step { background: var(--bg); padding: 40px 36px; }

.step-num {
  font-family: var(--display);
  font-weight: 700;
  font-size: 64px;
  color: var(--bg3);
  line-height: 1;
  margin-bottom: 16px;
}

.step-accent-line { width: 32px; height: 2px; background: var(--accent); margin-bottom: 20px; }

.step-title {
  font-family: var(--display);
  font-size: 18px;
  font-weight: 600;
  color: var(--head);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 12px;
}

.step-body { font-size: 12px; color: var(--text-dim); line-height: 1.65; }
.step-body strong { color: var(--head); }

/* ── MAP ── */
.map-section {
  display: grid;
  grid-template-columns: 1fr 280px;
  border-bottom: 1px solid var(--line);
  height: 380px;
}

.map-section iframe {
  width: 100%;
  height: 100%;
  border: none;
  display: block;
  filter: invert(0.9) hue-rotate(180deg) saturate(0.6) brightness(0.85);
}

.map-label {
  padding: 48px 36px;
  border-left: 1px solid var(--line);
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: var(--bg2);
}

/* ── DONATE ── */
.donate-strip {
  padding: 40px 60px;
  border-bottom: 1px solid var(--line);
  display: flex;
  align-items: center;
  gap: 40px;
  background: var(--bg2);
}

.donate-label {
  font-size: 10px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--text-dim);
  flex-shrink: 0;
}

.donate-card {
  font-family: var(--display);
  font-size: 28px;
  font-weight: 600;
  color: var(--head);
  letter-spacing: 0.1em;
}

.donate-note {
  font-size: 12px;
  color: var(--text-dim);
  margin-left: auto;
  max-width: 300px;
  text-align: right;
}

/* ── RESPONSIVE ── */
@media (max-width: 768px) {
  .contacts-hero { padding: 48px 24px 36px; }
  .contacts-grid { grid-template-columns: 1fr; }
  .contact-block { border-right: none; border-bottom: 1px solid var(--line); padding: 32px 24px; }
  .steps-section { padding: 40px 24px; }
  .steps { grid-template-columns: 1fr; }
  .step { padding: 32px 24px; }
  .map-section { grid-template-columns: 1fr; height: auto; }
  .map-section iframe { height: 240px; }
  .map-label { border-left: none; border-top: 1px solid var(--line); padding: 28px 24px; }
  .donate-strip { padding: 28px 24px; flex-direction: column; align-items: flex-start; gap: 12px; }
  .donate-note { margin-left: 0; text-align: left; }
  .donate-card { font-size: 20px; }
}

@media (max-width: 480px) {
  .step-num { font-size: 48px; }
}
```

- [ ] **Step 4: Commit**

```bash
git add src/app/pages/contacts/
git commit -m "feat: ContactsComponent — contacts, how-to steps, map, donate strip"
```

---

## Task 12: Vercel config + build verification

**Files:**
- Create: `vercel.json`

- [ ] **Step 1: Create vercel.json**

```json
{
  "buildCommand": "ng build",
  "outputDirectory": "dist/podpolye-v2/browser",
  "rewrites": [
    { "source": "/((?!assets/).*)", "destination": "/index.html" }
  ]
}
```

- [ ] **Step 2: Run production build**

```bash
ng build
```

Expected: `dist/podpolye-v2/browser/` directory created with `index.html`, `gallery/index.html`, `rules/index.html`, `contacts/index.html`, font woff2 files at `dist/podpolye-v2/browser/assets/fonts/`.

If build fails with font glob errors, verify actual woff2 filenames:
```bash
ls node_modules/@fontsource/oswald/files/ | grep latin | grep woff2
ls node_modules/@fontsource/ibm-plex-mono/files/ | grep latin | grep woff2
```
Then update angular.json asset globs to match.

- [ ] **Step 3: Verify prerendered HTML**

```bash
ls dist/podpolye-v2/browser/
ls dist/podpolye-v2/browser/gallery/
ls dist/podpolye-v2/browser/assets/fonts/ | head -5
```

Expected: `index.html` at root, `gallery/index.html`, `rules/index.html`, `contacts/index.html`, font woff2 files present.

- [ ] **Step 4: Commit**

```bash
git add vercel.json
git commit -m "build: add vercel.json for static SSG deployment"
```

---

## Task 13: Final smoke test

- [ ] **Step 1: Serve built output locally**

```bash
npx serve dist/podpolye-v2/browser -p 4201
```

Open `http://localhost:4201` in browser.

- [ ] **Step 2: Check all 4 routes load**

Navigate to:
- `http://localhost:4201/` — hero, marquee, manifesto visible
- `http://localhost:4201/gallery` — gallery placeholder grid visible
- `http://localhost:4201/rules` — 8 rules visible
- `http://localhost:4201/contacts` — contacts, steps, map, donate visible

- [ ] **Step 3: Check nav active state**

Active nav link should be highlighted in `var(--accent)` color with bottom border on each page.

- [ ] **Step 4: Check mobile menu (resize to 375px)**

Burger icon appears, clicking it opens full-screen mobile menu, clicking a link closes menu and navigates.

- [ ] **Step 5: Verify no external font requests**

Open DevTools → Network → filter by Font. Confirm all font requests go to `/assets/fonts/` (no fonts.googleapis.com).

- [ ] **Step 6: Final commit**

```bash
git add -A
git commit -m "feat: complete Подполье v2 Angular 21 SSG — all pages, fonts, Vercel config"
```
