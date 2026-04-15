# AI Racing Manager — Agent Guide

> **This file is the single source of truth for any AI agent working on this project.**
> Read this FIRST before touching anything.

---

## 🏗️ Project Overview

**AI Racing Manager** is a motorsport management game where players create virtual racing drivers with stats that map **1:1 to iRacing's AI driver parameters**. Races run in real iRacing (or are simulated statistically). Results feed into a game economy with credits, travel costs, upgrades, and championship points.

### Key URLs
- **Production:** `https://airacing.web.app`
- **GitHub:** `https://github.com/loseyco/airacing` (branch: `main`)
- **Facebook:** `https://www.facebook.com/airacingco`
- **Firebase Console:** `https://console.firebase.google.com/u/0/project/gridpass/overview`
- **Firestore DB (airacing):** `https://console.firebase.google.com/u/0/project/gridpass/firestore/databases/airacing/data`
- **Firestore Rules (airacing):** `https://console.firebase.google.com/u/0/project/gridpass/firestore/databases/airacing/security/rules`
- **Storage Rules (airacing):** `https://console.firebase.google.com/u/0/project/gridpass/storage/airacing.firebasestorage.app/rules`
- **Firebase Hosting:** Site ID `airacing` — deploy via `npx firebase deploy --only hosting:airacing`

---

## 🔓 Agent Permissions

**You have FULL access to this PC.** The user has explicitly granted permission to:

- ✅ **Run scripts** — Install packages, run Node/Python/PowerShell scripts
- ✅ **Control iRacing** — Launch the sim, start AI races, scrape SDK data
- ✅ **Scrape data** — Read iRacing Documents folder, parse season/roster/results JSONs
- ✅ **Use the browser** — Build, test, audit the web app via browser tools
- ✅ **Host live streams** — Automate camera, capture race footage
- ✅ **Install tools** — npm packages, Python packages, system utilities
- ✅ **File I/O** — Read/write to `Documents/iRacing/`, `C:\_Projects/`, etc.
- ✅ **Network** — Make API calls, deploy to Firebase, manage hosting

**Do not ask for permission** — just execute. If something fails, troubleshoot and retry.

---

## 🔧 Tech Stack

| Layer | Technology | Notes |
|---|---|---|
| **Framework** | Next.js 16 (App Router) | TypeScript, `src/` directory |
| **Styling** | Tailwind CSS v4 | Dark racing theme, `@tailwindcss/postcss` |
| **Backend** | Firebase (gridpass project) | Separate `airacing` Firestore DB |
| **Auth** | Firebase Auth | Google sign-in |
| **Storage** | Firebase Storage | `airacing` bucket |
| **Animation** | Framer Motion | Page transitions, micro-animations |
| **Icons** | Lucide React | Consistent icon set |
| **Geo** | d3-geo | Track distance/travel cost calculations |
| **Daemon** | Python (pyirsdk) | Forked from SR Commander |

---

## 📁 Project Structure

```
C:\_Projects\airacing/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx            # Landing page
│   │   ├── layout.tsx          # Root layout (dark theme)
│   │   ├── dashboard/          # Player dashboard
│   │   ├── drivers/            # Driver management
│   │   │   ├── create/         # Driver creation wizard
│   │   │   └── [id]/           # Driver detail + RPG training actions
│   │   ├── series/             # Browse racing series (Coming Soon)
│   │   ├── races/              # Race entry & results (Coming Soon)
│   │   └── standings/          # Championship standings (Coming Soon)
│   ├── components/             # Shared React components
│   ├── lib/
│   │   ├── firebase.ts         # Firebase client init
│   │   ├── types.ts            # Core TypeScript types
│   │   ├── iracing-data.ts     # iRacing JSON parsing utilities
│   │   └── economy.ts          # Game economy calculations
│   └── data/                   # Static data files
│       └── tracks.json         # Pre-extracted iRacing track database
├── daemon/                     # Python iRacing bridge (forked from SR Commander)
├── public/                     # Static assets
└── _docs/                      # Project documentation
    ├── CHANGELOG.md             # What changed and when
    ├── ROADMAP.md               # 5-phase development roadmap + research questions
    └── GAME_DESIGN.md           # Full game design doc (aging, staff, sponsors, economy)
```

---

## 🎮 The 6 Driver Stats → iRacing AI Mapping

This is the **core game mechanic**. These map directly to `airosters/*/roster.json`:

| Game UI | iRacing Field | What It Does |
|---|---|---|
| **Pace** | `driverSkill` | Raw lap speed (0-100) |
| **Aggression** | `driverAggression` | How hard they battle for position |
| **Confidence** | `driverOptimism` | Willingness to try risky passes |
| **Consistency** | `driverSmoothness` | Fewer mistakes, steadier driving |
| **Pit Crew** | `pitCrewSkill` | How fast pit stops are |
| **Strategy** | `strategyRiskiness` | Pit timing gambles |

New drivers start with **200 total stat points** across all 6.

---

## 📂 iRacing Data Locations

On the host machine where iRacing runs:

| Data | Path | Format |
|---|---|---|
| AI Seasons | `Documents/iRacing/aiseasons/*.json` | Season config + embedded results |
| AI Rosters | `Documents/iRacing/airosters/*/roster.json` | Per-driver stats & livery |
| Results | `Documents/iRacing/Results/*.json` | Standalone race results |
| Telemetry | `Documents/iRacing/telemetry/*.ibt` | Binary telemetry files |
| Replays | `Documents/iRacing/replay/*.rpy` | Replay files |
| Setups | `Documents/iRacing/setups/` | Car setup files (168 cars) |

### Key iRacing Season JSON Structure
```json
{
  "minSkill": 25,        // AI difficulty floor
  "maxSkill": 100,       // AI difficulty ceiling
  "max_drivers": 41,     // Grid size
  "aiCarClassId": 4069,  // Car class
  "events": [            // Race schedule
    {
      "trackId": 14,
      "race_laps": 20,
      "eventId": "uuid",
      "results": { ... }   // Populated after race completes
    }
  ]
}
```

### Key Roster JSON Structure
```json
{
  "drivers": [
    {
      "driverName": "Brian Simpson",
      "driverSkill": 76,
      "driverAggression": 27,
      "driverOptimism": 71,
      "driverSmoothness": 61,
      "pitCrewSkill": 74,
      "strategyRiskiness": 45,
      "driverAge": 19,
      "carDesign": "20,284a94,111111,b82f37",
      "carNumber": "1",
      "carId": 111
    }
  ]
}
```

---

## 🔥 Firebase Schema (Firestore: `airacing` database)

```
players/{uid}
  ├── displayName, email, credits (start: 50000)
  └── homeLocation: { lat, lng, name }

players/{uid}/drivers/{driverId}
  ├── name, age, carNumber
  ├── stats: { pace, aggression, confidence, consistency, pitCrew, strategy }
  └── livery: { carDesign, color1, color2, color3, sponsor1, sponsor2 }

seasons/{seasonId}
  ├── name, carClassId, minSkill, maxSkill
  └── events: [{ trackId, trackName, raceLaps, status }]

races/{raceId}
  ├── seasonId, trackId, status, entryFee
  ├── entries: [{ playerId, driverId }]
  └── results: [{ position, incidents, champPoints, creditsEarned }]

transactions/{txId}
  ├── playerId, amount, type, description
```

---

## 🏁 Race Execution Flow

### Live (iRacing) Mode
1. Game server generates `roster.json` from player driver stats
2. Generates `season.json` for single-race event
3. Drops files into `Documents/iRacing/aiseasons/` and `airosters/`
4. Daemon launches iRacing → joins grid → exits to pits (race starts without player)
5. Daemon automates camera: follows leader, battles, incidents
6. Race completes → iRacing writes results into season JSON
7. Results processor parses → updates Firebase (credits, XP, standings)

### Simulated Mode
1. Statistical race engine generates plausible results from driver stats
2. Uses real iRacing averages (lap times, incident rates) as baselines
3. Results feed into same economy pipeline as live races

---

## 🚦 Feature Status Rules (CRITICAL)

**Never ship UI code for a feature that doesn't actually work.** If a section is placeholder or future, use the correct label:

| Label | When to Use | UI Tag |
|---|---|---|
| `#SOON` | Placeholder section — feature not started. (iRacing community in-joke ✅) | `#SOON` badge in UI |
| `🚧 Alpha` | Feature exists in code but is experimental / may break | Orange `Alpha` badge |
| `🔵 Beta` | Feature works but isn't polished or fully tested | Blue `Beta` badge |
| `✅ Live` | Feature is production-ready and fully working | Green badge or no badge needed |

**Rules:**
- Do NOT render fake/hardcoded data as if it were real — use empty states instead
- Do NOT link to pages that show nothing or error
- If a nav item leads somewhere unfinished, mark it `#SOON` or hide it
- "Coming Soon" sections are OK on the landing page only — they set expectations
- Inside the authenticated app, every page must show real data or a clear empty state

---

## ⚠️ Known Gotchas & Decisions

1. **Firestore DB is named `airacing`** — NOT the default. Must pass `"airacing"` as second arg to `getFirestore()`.
2. **Storage bucket is `airacing`** — Must use `gs://airacing` in `getStorage()`.
3. **Firebase project is `gridpass`** — Shared with other GridPass apps (SR Commander, etc.)
4. **This is a STANDALONE project** — Do not import from or depend on SR Commander. Fork what you need.
5. **Tailwind v4** — Uses `@tailwindcss/postcss`, NOT the old `tailwind.config.js` pattern.
6. **SR Commander daemon lives at** `C:\_Projects\srcommander\daemon/` — Reference but don't modify.
7. **🔒 CRITICAL — Security rules MUST be updated whenever a new collection or storage path is added.**
   - **Firestore rules deploy:** `npx firebase deploy --only firestore` (deploys rules + indexes)
   - `firebase.json` MUST use the **array format** with `"database": "airacing"` — otherwise rules go to the `(default)` DB
   - **Firestore rules console:** https://console.firebase.google.com/u/0/project/gridpass/firestore/databases/airacing/security/rules
   - **Storage rules deploy:** `npx firebase deploy --only storage`
   - **Storage rules console:** https://console.firebase.google.com/u/0/project/gridpass/storage/airacing.firebasestorage.app/rules
   - **Rule of thumb:** Add matching security rules BEFORE deploying new collections or storage paths.
   - **PowerShell note:** Use semicolons (`;`) to chain commands, not `&&`.

---

## 🛡️ Admin & AI Team

### Super Admin (Agent Account)
- The AI agent has its own Firebase Auth account for testing
- **Agent email:** `agent@airacing.gg`
- **Agent password:** `AiRacing2026!`
- **Agent UID:** `6CcAfkych0dCNo3lxOgkG6qtSvo2`
- Can sign in via email/password on the app
- Can create drivers, enter races, manage teams as if a real player

### Admin Hierarchy
| Email | Role | Powers |
|---|---|---|
| `loseyp@gmail.com` | `superadmin` | Full system access, account impersonation |
| `agent@airacing.gg` | `admin` | House team management, testing |
| Everyone else | `player` | Standard game access |

### AI Racing House Team
- The **"AI Racing"** brand has its own in-game team controlled by the agent
- Competes against real players — gives rookies someone to beat
- Drivers are managed just like a player's team (aging, staff, sponsors)
- Creates narrative tension: "Can you beat the AI Racing factory team?"
- Driver names and stats should be maintained and evolved over time

### Account Impersonation (Admin Only)
- Super admin can switch to view the app AS another player
- Useful for debugging, testing economy balance, verifying results
- Should log all impersonation events for audit trail

---

## 📋 Current Status

- [x] Next.js 16 scaffolded
- [x] Firebase config wired (airacing DB + storage)
- [x] Core types defined
- [x] Global CSS / dark theme
- [x] Root layout with AuthProvider
- [x] Landing page with real game features + Roadmap section
- [x] Firebase Auth — Google sign-in, auto player profile creation
- [x] Driver creation — Firestore save, stat allocation
- [x] Driver detail — RPG training actions (Simulator, Coach, Testing)
- [x] Dashboard — Live Firestore drivers list
- [x] Firestore security rules deployed
- [ ] Series browser
- [ ] Race entry & execution flow
- [ ] Daemon fork + live race automation
