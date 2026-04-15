# AI Racing Manager — Agent Guide

> **This file is the single source of truth for any AI agent working on this project.**
> Read this FIRST before touching anything.

---

## 🏗️ Project Overview

**AI Racing Manager** is a motorsport management game where players create virtual racing drivers with stats that map **1:1 to iRacing's AI driver parameters**. Races run in real iRacing (or are simulated statistically). Results feed into a game economy with credits, travel costs, upgrades, and championship points.

### Key URLs
- **Production:** `airacing.web.app`
- **Firebase Console:** `https://console.firebase.google.com/u/0/project/gridpass`
- **Firestore DB:** Named `airacing` (NOT the default DB — use `getFirestore(app, "airacing")`)
- **Storage Bucket:** `airacing` (use `getStorage(app, "gs://airacing")`)
- **GitHub:** `loseyco` org (TBD repo)

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
│   │   │   └── create/         # Driver creation wizard
│   │   ├── series/             # Browse racing series
│   │   ├── races/              # Race entry & results
│   │   └── standings/          # Championship standings
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
    └── CHANGELOG.md            # What changed and when
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

## ⚠️ Known Gotchas & Decisions

1. **Firestore DB is named `airacing`** — NOT the default. Must pass `"airacing"` as second arg to `getFirestore()`.
2. **Storage bucket is `airacing`** — Must use `gs://airacing` in `getStorage()`.
3. **Firebase project is `gridpass`** — Shared with other GridPass apps (SR Commander, etc.)
4. **This is a STANDALONE project** — Do not import from or depend on SR Commander. Fork what you need.
5. **Tailwind v4** — Uses `@tailwindcss/postcss`, NOT the old `tailwind.config.js` pattern.
6. **SR Commander daemon lives at** `C:\_Projects\srcommander\daemon/` — Reference but don't modify.

---

## 📋 Current Status

- [x] Next.js 16 scaffolded
- [x] Firebase config wired (airacing DB + storage)
- [x] Core types defined
- [ ] Global CSS / dark theme
- [ ] Root layout
- [ ] Landing page
- [ ] Driver creation
- [ ] Series browser
- [ ] Race flow
- [ ] Daemon fork
