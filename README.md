# Speedioo web · front-end build

Static, framework-free front end for the Speedioo used two-wheeler marketplace (Pune, Delhi, Bangalore).
Every flow works in the browser today; data is kept in `localStorage` until the backend is connected.

## v0.9.3

- Header is the clean black one from speedioo-web: badge + "speedi" with two tyre O's that spin on hover and roll in once on first visit.
- Inspection scene covers all 12 checkpoints (hotspots on the bike plus a chip row). The engine close-up marks spark plug,
  valves & cam chain, cylinder & piston, fuel/throttle body, connecting rod, crankshaft, clutch, gearbox and oil sump.
  On a bike page, opening a component also shows that bike's own result below.
- Home: "Shop by" (budget, brand, body type) replaces the bike rail; the city section with weekday and weekend rides is back.
- Hero cursor spotlight removed; the video sits under a steady shade.

## v0.9 — minimal

- Home is short: video hero with the Buy/Sell finder, three numbers, inspected bikes, the 28-minute sale video,
  the inspection scene, and one "What would you like to do?" block with a callback form and service links.
- The interactive bike inspection (engine and front end, hover to look inside, click for details) is on the home page
  and inside every bike's Inspection report, above that bike's own checkpoint results.
- Header shows the badge plus the animated SPEEDIOO wordmark. Page changes show the SPEEDIOO logo screen.
- Normal cursor (custom cursor removed). Favicon set: SVG, ICO, PNG and apple-touch icon of the badge.

## v0.8 — studio UI, red / black / white

- Home opens on a framed "studio" scene (`assets/js/studio.js`), adapted from the VEYRA interactive scene
  (github.com/amirmushichge/veyra-interactive-car, MIT, © 2026 Amir Mušić), with a bike instead of a car:
  - four points: Engine & gearbox and Brakes & suspension (hover to see inside, click to zoom into a detail view
    with three annotated checks), Paint (five finishes) and Wheels (alloy, wire-spoke, sport).
  - the bike is SVG, so paint and wheels restyle it live; the piston, crank and gears move in the engine view.
  - Esc or Back returns; keyboard, touch and reduced-motion are supported.
- The old hero's finder, goals and CTAs sit in a "Start here" band right below, so every journey is unchanged.
- Theme is red, black and white only. One typeface, Space Grotesk, at weight 400 for headings; thin lines, 16px frames.

## v0.7 — ivory, crimson and black; interactive layer

- Site logo is the crimson badge with the white S (header, footer, favicon).
- Opening screen is the round-tyre SPEEDIOO animation (no signature line). Once per session; `?intro` replays.
- Palette: ivory `#F6F1E7`, crimson `#C8102E`, deep black `#0B0B0C`. Display face: Barlow Condensed italic.
- `assets/js/fx.js`: custom cursor with labels (View / Drag / Ride / Inspect), magnetic buttons, 3D tilt cards,
  hero spotlight, word-by-word heading reveals, scroll-skewed marquee, crimson page wipe, drag-to-scroll rails.
  Touch devices and reduced-motion users get the calm version.

## v0.6 — brand theme, intro, Delhi
- SPEEDIOO wordmark with tyre O's (from `speedioo-logo.html`) in header, footer, favicon and `assets/img/speedioo-logo*.svg`; drawn by `buildLogo()` in `assets/js/logo.js`. Brand red #DE2227.
- Opening animation (`assets/js/intro.js`), ported from the animated logo: tyres roll in with brake sparks, letters slam in, spark plugs fire. Once per session, skippable, `?intro` replays.
- Less black: white header, red-duotone hero video, light sections, brand-red closing band, deep wine footer.
- Cities are now Pune, Delhi, Bangalore. Each scene shows its ride road (Sinhagad hairpins + Lavasa lake, Delhi highway past India Gate and Qutub Minar, Nandi Hills hairpins); riders stay upright.

## v0.5 (local test build) — what's new
- **Consumer-first homepage:** new hero ("Your next ride. Your next chapter. The Speedioo way.") with Sell / Explore / Discover CTAs and 8 "I want to…" shortcuts; Why Speedioo pillars; ownership benefits; interactive tools; final lead capture with callback form.
- **City experiences** (`assets/js/city.js`): Pune (Sahyadri ghats, hill fort), Delhi (India Gate, Qutub Minar, highway rides), Bangalore (Nandi Hills, Vidhana Soudha, canopy). Hero landscape, texture, greeting, rides, everyday-riding notes and in-stock picks change with the city.
- **Sell in 28 minutes** (`assets/js/journey.js`): 11-step interactive journey grouped as Before / The 28 minutes / After, with the QR step; story animation now shows the Speedioo QR poster and starts the clock at the doorstep.
- **Vehicle checkpoints** (`assets/js/checkpoints.js`): clickable hotspots + paperwork checks with Verified / Good / Attention required / Not inspected; sample on Home, per-bike on the detail page.
- **QR floater:** small QR button on every page; tap to open the QR (`assets/img/speedioo-qr.png`). Replace that file with a higher-resolution export for better scanning.
- **Detail page:** checkpoint report, warranty & insurance section, request-a-callback, compare with similar.
- New analytics events: `city_change`, `intent_select`, `journey_step`, `checkpoint_view`, `qr_open`, `qr_landing`, `quote_start`, `quote_complete`, `otp_verified`, `inspection_booking_start`, `inspection_booking_complete`, `emi_calc_used`, `compare_open`, `resale_estimate`, `callback_request`, `enquiry_submit`, `warranty_view`.

### Test it locally
1. Unzip the folder.
2. In the folder run `npx serve` (or `python3 -m http.server 3000`) and open the address it prints. Opening `index.html` directly also works.
3. To test on your phone without touching the GitHub repo: go to vercel.com/new and drag this folder onto "deploy without Git" (or run `npx vercel` in the folder). That creates a separate preview URL.

## Run locally
```bash
npm run dev          # serves the folder on http://localhost:3000 (needs Node 18+)
# or: python3 -m http.server 3000
```
Opening `index.html` directly from disk also works.

## Deploy to Vercel
1. Push this folder to a GitHub repo.
2. In Vercel: **Add New → Project → Import** the repo.
3. Framework preset: **Other**. Build command: *(empty)*. Output directory: `.` (root).
4. Deploy. `vercel.json` adds security headers and tells browsers to re-check files on every visit, so a new deploy shows up immediately.

**Releasing a change:** bump the `?v=` number on the CSS/JS links in `index.html` (and `version` in `package.json`) so phones never mix old and new files.

CLI alternative: `npm i -g vercel && vercel` (then `vercel --prod`).

## What's in here
| Path | Purpose |
|---|---|
| `index.html` | Page shell: header, footer, SEO meta, JSON-LD, script tags |
| `assets/css/styles.css` | Design tokens (red / white / black), components, motion |
| `assets/js/data.js` | Sample inventory, media URLs, FAQs, reviews, contact details |
| `assets/js/api.js` | **API layer.** Promise-based mocks for every backend call + GA4 `dataLayer` events |
| `assets/js/app.js` | Hash router, pages, interactions, chatbot v1 |
| `assets/js/story.js` | 20-second animated story "Sold in 28 minutes" (SVG, scrubbable, used on Home and Sell) |
| `assets/video/speedioo-sold-in-28-minutes.mp4` | The same story exported as a 1280×720 MP4 for WhatsApp / ads |
| `#leads` route | Team demo inbox of everything the forms captured in this browser, with CSV export |

## Pages and flows that work now
Home (video hero, Buy/Sell finder, brand marquee, shop-by, fresh arrivals, speedometer "how it works", services, rider-story video, reviews, FAQ, WhatsApp opt-in) · Buy listing (filters, sort, quick view, compare, request a bike) · Bike detail (gallery + lightbox, inspection report, specs, test ride, reserve, EMI) · Sell (3-step quote, OTP, photo upload, estimate, slot booking, tracker, referral) · About / reviews / team / contact · Blog · Search (typo-tolerant, "under 1 lakh", voice placeholder) · OTP login + account (shortlist, test rides, sell requests) · Hindi / Marathi switch · Chat assistant (scripted v1).

Demo OTP: any 4 digits.

Logo intro: first-time visitors see the two tyre "oo"s roll in from the right. Add `?intro` to the URL to replay it.

## Connecting the backend (ERPNext)
Set `API_BASE` in `assets/js/api.js` and replace each mock body with a `fetch()`; function names map 1:1 to endpoints
(`listBikes`, `getBike`, `lookupReg`, `sendOtp`, `verifyOtp`, `createLead`, `estimate`, `bookInspection`, `bookTestRide`, `reserve`, `rcStatus`, `saveShortlist`).
Leads carry `utm_*` and `gclid` captured from the landing URL for Google Ads attribution.

Analytics: paste the GTM / GA4 snippet in `index.html`; events already pushed include `page_view`, `view_item_list`, `view_item`, `select_item`, `add_to_wishlist`, `search`, `generate_lead`, `valuation_shown`, `book_inspection`, `book_test_ride`, `begin_checkout`, `chat_open`.

## Before launch
- **Font:** the site uses Inter (Spinny-style clean UI sans) via the `--font` token at the top of `styles.css`. To use a different family, change that one token and the Google Fonts link in `index.html`.
- **New on-road prices:** each bike's `onRoad` value in `assets/js/data.js` is the current new on-road price in the listing's city (Oct 2026, from BikeWale, Autocar India, Shriram Finance and CarHP). The detail page and quick view show it with "You save". Update it when prices change or when the backend provides it.
- **Media:** photos and videos are hot-linked from Pexels (free licence, pexels.com/license) and are stand-ins. Replace with Speedioo's own inspection photos and customer videos (store on a CDN such as Cloudinary or Vercel Blob). If a photo fails to load, a drawn illustration is shown.
- **Placeholders:** everything in red `[brackets]` needs a real value or must be removed (ratings, counts, warranty, token amount, lender names).
- **SEO:** hash routes are fine for a front-end build. For indexable city/brand/model pages, move to Next.js (SSR/SSG) when the API is live.

## Media credits
Hero video: Pexels #4606791. Rider story: Anastasia Shuraeva (Pexels #9606662). Walk-around sample: Pavel Danilyuk (Pexels #5052415). Bike and scene photos: Pexels photo IDs listed in `assets/js/data.js`.
