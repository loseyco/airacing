# AI Racing Manager — Changelog

## v0.3.0 — 2026-04-15 — "The Marketplace Mistake"

### 📖 Origin Story Redesign
- **New Narrative Framing:** Your driver bought an iRacing Mini Stock off Facebook Marketplace. They need your help to run it.
- **Onboarding Overhaul:** Step 1 now centers around your *relationship* to the driver (Friend, Son, Daughter, Brother, Coworker, etc.).
- **Starter Class Lock:** The iRacing Mini Stock is now hard-locked as the starter class in Step 2.
- **Starting Economy Overhaul:** You start with $50,000, but the documents (and soon gameplay) factor in the cost of buying a truck, trailer, and prep, effectively leaving ~$14K for the starting season. 

### 🧹 The Clean Slate Initiative
- **"No Mock Data" Rule Enforced:** All mock/fake text removed from the site.
- Dashboard quick-actions simplified. "Series" and "Standings" placeholder modules updated to show dynamic `#SOON` and clean empty states until Phase 4/5 integration.
- Driver Detail page rebuilt to check real `driver.races` counts and display a "No Races Yet" state instead of hardcoded results.
- Dashboard "Your Journey" section now correctly pulls boolean flags from the Firebase Player object.

### 🏗️ Build & Deployment Fixes
- Removed dynamic fallback `/drivers/[id]` folder which was blocking Turbopack Static Export.
- Converted all targeted parameter pages (`/driver`, `/drivers/create`) to use `?id=` query params.
- Wrapped all `useSearchParams()` calls in explicit `Suspense` outer boundaries.
- **Build Clean:** Validated static generation for 10/10 pages. Deploy successful to `airacing.web.app`.

---

## v0.2.0 — 2026-04-14 — "The RPG Core"

### 🛡️ Auth & Identity
- Integrated **Firebase Auth** with Google Sign-in.
- Automatic creation of **Firestore Player Profiles** (50,000 starting credits).
- Protected routes for Dashboard and Driver pages.

### 🏁 Driver Management & RPG
- **Driver Detail Pages:** Live profile for every driver in your garage.
- **Training Actions:** Spending credits on Simulator sessions, Coaches, and Testing now boosts live stats.
- Firestore persistence for all training activities and stat gains.
- Updated Dashboard with **Live Drivers list** and stat visualization.

### 🎨 Branding & Vision
- Updated Landing Page with **Drama, Chat Wars, and GridPass Staff** concepts.
- Added formal **Project Roadmap** to the public site.
- Integrated **Zach's Story Mode** concept into core game design.

---

## v0.1.0 — 2026-04-14 — "First Light"

### 🏗️ Project Foundation
- Scaffolded Next.js 16 + Tailwind v4 + TypeScript project at `C:\_Projects\airacing`
- Installed: `firebase`, `framer-motion`, `lucide-react`, `d3-geo`
- Created Firebase config (`gridpass` project, `airacing` Firestore DB + Storage bucket)
- Created comprehensive `AGENTS.md` with iRacing data format docs + full PC permissions
- Created full type system in `lib/types.ts` (6 driver stats → iRacing AI mapping)

### 🎨 UI Pages Built
- **Landing page** (`/`) — "BUILD. RACE. DOMINATE." hero, feature grid, how-it-works, CTAs
- **Dashboard** (`/dashboard`) — Wallet, driver cards with mini stat bars, upcoming races
- **Driver creation** (`/drivers/create`) — 6-stat point allocator (200 budget), livery colors
- **Series browser** (`/series`) — GR86, ARCA, Trucks, GT3 with difficulty badges + skill ranges
- **Standings** (`/standings`) — Animated podium (top 3) + full championship table

### 🚀 Deployment
- Configured static export (`output: "export"`)
- Set up Firebase Hosting (`firebase.json`, site: `airacing`)
- Deployed to **airacing.web.app**
- Pushed to **github.com/loseyco/airacing** (branch: `main`)
