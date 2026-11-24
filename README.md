# MAXX SLATER — PHOTOGRAPHY

Brutalist portfolio site. Pure black and white, hard 2px rules, condensed
grotesk display type (Archivo) against machine-set mono labels (JetBrains Mono).

## Run it

```bash
npm run dev      # local dev server
npm run build    # production build → dist/ (single inlined file)
npm run preview  # serve the build
```

## Structure

```
src/
├─ App.tsx                    routes + page transitions
├─ index.css                  theme, type utilities (.display / .mono), patterns
├─ data/portfolio.ts          ← THE IMAGE MANIFEST (edit this one)
├─ components/
│  ├─ Layout.tsx              status bar, header, mobile drawer, footer
│  ├─ BrandLogo.tsx           MAXXSLATER wordmark
│  ├─ FrameSlot.tsx           one photo cell (image or numbered placeholder)
│  ├─ Marquee.tsx             scrolling ticker band
│  ├─ LegalDoc.tsx            shared shell for Terms / Privacy
│  ├─ PageTransition.tsx      hard clip-path wipe between routes
│  └─ ScrollToTop.tsx
└─ pages/                     Home, Portfolio, Blog, About, Contact, Terms, Privacy
```

## Adding photos

Everything on the portfolio grid is driven by `src/data/portfolio.ts`.

1. Drop the file into `public/images/`
2. Point the entry at it:

```ts
{
  src: "/images/rooftop-01.jpg",
  title: "Rooftop, 6am",
  category: "Editorial",
  year: "2025",
  size: "tall",        // tall | wide | square | hero
  featured: true,      // also shows on the home page strip
}
```

Leave `src: ""` and the slot stays as a hatched, numbered placeholder — the
layout still reads correctly while you're filling the index. Order in the array
is order on the page, and `category` values automatically populate the
portfolio filter bar.

## BabyLoveGrowth articles

The Journal at `/blog` syncs BabyLoveGrowth articles during each production
build. The API key is used only by the build script; it is never included in
the browser bundle.

For local builds, add the key to the ignored `.env.local` file:

```env
BABYLOVE_API_KEY=your_api_key
```

For Vercel, add `BABYLOVE_API_KEY` under **Project Settings → Environment
Variables** for each deployment environment. Redeploy after adding or rotating
the key. If the key is missing, the build prints a warning and publishes the
Journal without articles.

## Type system

| Class           | Use                                              |
| --------------- | ------------------------------------------------ |
| `.display`      | Oversized condensed grotesk, weight 900           |
| `.display-thin` | Same width, weight 200 — for contrast pairings    |
| `.display-wide` | Extended grotesk for short stacked statements     |
| `.mono`         | Uppercase tracked mono — nav, labels, captions    |
| `.stroke`       | Outlined headline text                            |
| `.hatch`        | Diagonal hazard fill for empty slots              |
| `.grid-lines`   | Faint blueprint grid background                   |

Interaction rule of thumb: hover inverts (`hover:bg-white hover:text-black`),
transitions are 100–150ms, nothing is rounded, nothing is blurred.
