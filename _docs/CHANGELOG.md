# AI Racing Manager — Changelog

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

### 📋 Known Issues
- All pages use mock data (Firebase Auth + Firestore not yet wired)
- No race execution pipeline yet
- Driver aging/staff/sponsors not yet implemented (designed, not built)
