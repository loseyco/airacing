# 🏁 AI Racing Manager — Game Design Document

> A motorsport management game powered by **real iRacing AI simulations**.

---

## Elevator Pitch

Players create virtual racing drivers with stats that map **1:1 to iRacing's AI driver parameters**. Drivers age every race, forcing roster decisions. Staff upgrades improve pit stops, strategy, and development. Real sponsors offer contracts based on performance. Races run in actual iRacing — real physics, real incidents, real results powering a full game economy.

---

## 🎮 The 6 Driver Stats → iRacing AI

| Game Stat | iRacing Field | Range | Effect |
|---|---|---|---|
| **Pace** | `driverSkill` | 0-100 | Raw lap speed |
| **Aggression** | `driverAggression` | 0-100 | Fighting for position |
| **Confidence** | `driverOptimism` | 0-100 | Risky overtakes |
| **Consistency** | `driverSmoothness` | 0-100 | Fewer mistakes |
| **Pit Crew** | `pitCrewSkill` | 0-100 | Pit stop speed |
| **Strategy** | `strategyRiskiness` | 0-100 | Pit timing gambles |

New drivers: **200 stat points**. Leveling earns more.

---

## 🧓 Driver Aging & Lifecycle

**Every race ages the driver.** This drives roster turnover and economic sustainability.

| Age | Phase | Effect |
|---|---|---|
| 16-20 | Rookie | Low stats, fast learning (+2 XP bonus) |
| 21-28 | Rising | Peak learning, stats grow quickly |
| 29-34 | Prime | Best performance, stable |
| 35-40 | Veteran | Stats decline (-1/race to random stat) |
| 41-45 | Twilight | Faster decline (-2/race) |
| 46+ | Retirement | Forced out |

- **+0.5 years per race** (12-race season = 6 years aged)
- High incidents = career-shortening injuries
- Rest between seasons slows decline (costs credits)

---

## 🎲 The In-Between: Text-Based RPG Mechanics

While races take place in the 3D iRacing world, the heart of the game is the **text-based management RPG** between races. Players spend credits and points to gain temporary advantages, mitigate equipment decay, and accelerate learning.

### 🏋️ Training & Simulator Time
Instead of flat XP gains, training comes in tiers. Better training costs more but yields much higher stat boosts.

| Tier | Activity | Cost | Output |
|---|---|---|---|
| 1 | **Local Sim Rig** (Bedroom setup) | $500 | +1 to random stat |
| 2 | **Regional Academy** | $2,500 | +3 to selected stat |
| 3 | **Private Coaching Session** | $7,500 | +5 to Pace or Consistency |
| 4 | **Factory Simulator (e.g. Honda/Porsche)** | $25,000 | +10 to selected stat (max 1/season) |

### 🛠️ Equipment Wear & Maintenance
Cars aren't static. Equipment degrades across a season, applying **temporary stat penalties** to the driver's underlying base stats when generating `roster.json` for iRacing.

- **Engine Wear:** -1 Pace penalty for every 2 races run on the same engine.
  - *Fix:* Buy a new engine block ($15,000) or hire a top-tier Engine Builder staff member to reduce wear rates.
- **Tire Management:** Purchasing a premium tire allotment for a race weekend gives a +5 Consistency and +3 Confidence boost.
- **Chassis Fatigue:** Taking heavy damage in a race applies a persistent -5 Confidence penalty until the chassis is sent back to the manufacturer for deep repair (misses 1 race, costs $10,000).

### 👥 Staff & Inventory Operations
Staff members are active characters with their own stats, and they degrade or improve.
- **Tire Engineers:** Keep tire pressures perfect. A tired engineer makes a mistake -> `strategyRiskiness` spikes.
- **Inventory Management:** You must buy spare parts (wings, suspension) *before* the race weekend. If a driver crashes in Practice and you have no spares, they take a severe Pace penalty in the Feature race.

---

## 🎓 Driver Development Pipeline

## 🔧 Staff System

Team-wide upgrades affecting ALL drivers. Levels 1-10 with escalating salaries.

| Role | Effect | iRacing Impact |
|---|---|---|
| Pit Crew Chief | Team pit speed | `pitCrewSkill` bonus |
| Race Engineer | Strategy calls | `strategyRiskiness` optimization |
| Driver Coach | 2x XP gains | Faster stat growth |
| Spotter | -20-50% incidents | Fewer `incidents` |
| Data Analyst | Telemetry UI | Better decisions |
| Team Manager | Sponsor bonuses | More income |

---

## 🤝 Sponsor System

### Tiers
| Tier | Per-Race Pay | Requirement |
|---|---|---|
| Local | $500 | Just race |
| Regional | $2,000 | Top-20 finishes |
| National | $5,000 | Top-10 average |
| Premium | $15,000 | Wins required |
| Title | $25,000+ | Season commitment |

- iRacing `sponsor1`/`sponsor2` fields = actual car decals
- **Trading Paints integration** — premium liveries with real logos
- Performance-based: meet goals or lose the contract

---

## 🏆 League Owner Role

PJ controls as AI Racing league owner:
- Series creation (calendar, rules, cars)
- Entry fees → prize pools
- Real sponsor partnerships for the league
- Real prizes (merch, credits for top players)
- Broadcasting decisions
- Promotion/relegation between tiers

---

## 💰 Economy

### Income
| Source | Credits |
|---|---|
| Race P1 | $4,300 |
| Fastest lap | +$500 |
| Laps led | $100/lap |
| Clean race | +$1,000 |
| Championship | $50,000 |
| Sponsors | $500-25,000/race |
| Paid drivers | $1,000-3,000/race |

### Expenses
| Cost | Credits |
|---|---|
| Entry fee | $500-5,000 |
| Travel | $200-5,000 |
| Repairs | $500/incident |
| Staff salaries | $500-10,000/race |
| Driver contracts | Per stat points + age |
| Training | $2,000/session |

---

## 🎭 Career Mode: From Novice to Legend

Based on Zach's vision: The game features a structured **Single Player Campaign** that acts as the entry point and "Story" of your team.

### 🏁 Level 1: The Novice Leagues (Offline)
- **Gatekeeper:** You cannot join the high-stakes "Real Multi-Player" world until you've proven your merit.
- **The Grind:** Start in local, Saturday-night short track or club road racing.
- **Goal:** Attract your first 500 fans and 1 Regional Sponsor.
- **Sim Mode:** These races are fully simulated by the AI Racing engine but don't require the persistent "Online League" scheduling. They can be triggered "On Demand."

### 🎬 The Narrative Path ("The Movie")
Players can follow a specific narrative arc:
- **Cutscenes/Story Beats:** Text-based or pre-recorded "Pit Wall" interactions with your driver.
- **Key Rivalries:** Specific AI drivers who appear in every series you enter, creating a personal vendetta (e.g., "The House Team" mentioned in AGENTS.md).
- **Milestones:** "The Callup" — when your performance in the Novice Leagues triggers a contract offer from a National Sponsor, unlocking the "Pro" Tier and Online Leagues.

### 🌐 The Bridge to Multiplayer
Once you reach the **"Pro Tier"** in Story Mode:
- Your driver is "certified" for Online League play.
- You can now enter your drivers into the Global Championship against other real players.
- You can still play the Story at any time to train rookies in a "safe" environment before throwing them to the wolves.

---

## 🎭 Drama, Rivalries & Social Mechanics

Beyond the stats and physics, AI Racing Manager simulates the **social and emotional chaos** of professional motorsport.

### 🥊 Impact & Incidents
When a driver is involved in an incident with another team's driver:
- **Pit Lane Fights:** Post-race text events between drivers. 
  - *Conflict Choice:* Does your driver apologize (boosts `Confidence` but lowers `Aggression`) or throw a punch (boosts `Aggression` and Fan interest, but risks a Penalty or Credit fine)?
- **Chat Wars:** Social media "Twitter/X-style" mock feeds during and after races.
  - Fans and sponsors react to your team's "Social Standing."
  - High drama = Higher fan growth = Better Sponsor Tier access.

### 🆔 Virtual GridPass & Staff Management
Staff members (Engineers, Crew) are verified via the **GridPass Ecosystem**.
- Each staff member has a "Virtual GridPass ID."
- Their history, stats, and previous team performance are recorded.
- **Global Staff Market:** You can scout and "poach" high-performing staff from other players using their GridPass records.

### 💬 Social Narrative Tiers
- **Rookie Tier:** Mostly local news coverage, small "chat boards."
- **Pro Tier:** National broadcasts, "Drama Alerts," major sponsor pressure if performance drops.
- **Elite Tier:** Full global media coverage. Every pit road incident is a "Viral Moment."

---

## 🏗️ Architecture

```
GAME SERVER (Firebase: airacing DB)
  → RACE ORCHESTRATOR (generate roster/season + apply staff bonuses)
    → AI RACING DAEMON (launch iRacing, camera automation)
      → RESULTS PROCESSOR (parse → age drivers → pay sponsors → update economy)
```

---

## 🔬 Open Research
- Can we assign custom setups to AI drivers?
- Does `driverAge` affect AI behavior or just cosmetic?
- Can we run races headless?
- Trading Paints API access?
- Max AI grid size?
