# 🏁 AI Racing Manager — Game Design Document

> A motorsport management game powered by **real iRacing AI simulations**.

---

## Elevator Pitch

**You're not the driver. You're the friend who believed in them first.**

Your buddy has the talent but no money, no connections, and no idea how hard this is going to be. You load the trailer. You make the calls. You find the sponsors. You keep them focused when they want to quit — and humble when they think they've made it.

Drivers get the trophy. You get the satisfaction of knowing you built them.

This is **Football Manager for motorsport** — but your star player has an ego, bad habits, a girlfriend who hates race weekends, and a habit of binning it in Turn 3.

---

## 🚀 Onboarding Flow

### Step 1: Who Are You?
Player creates their **Manager Character**:
- Name, hometown, background (former mechanic? ex-karter? racing fan with a dream?)
- Determines starting perks (e.g., Mechanic background → lower repair costs; Ex-Driver → better coaching bonuses)

### Step 2: Who's Your Driver?
Player creates their **Driver** — your friend:
- Name, age, hometown
- Pick a **Personality Trait** (sets behavioral tendencies for the whole career):
  - 🔥 **Overconfident** — pushes hard, wrecks often early on, peaks fast
  - 🧠 **Methodical** — slow to develop but never cracks under pressure
  - 🌟 **Crowd Pleaser** — great with sponsors, struggles when behind
  - 🎯 **Streak Racer** — hot streaks and cold slumps, high variance

### Step 3: The Simulated Mini Stock Season
**No iRacing required.** The game statistically simulates 8 local short-track races.
- Race outcomes are calculated from your driver's stats, car condition, crew performance, and random events
- You make manager decisions each week: train, fix the car, manage money, handle drama
- This serves as the **tutorial AND the soul of the game**

### Step 4: Qualifying for the AI Racing Championship
To enter the **real** championship (powered by actual iRacing AI races), your team must:
- ✅ Finish the Mini Stock season (don't go broke)
- ✅ Raise **$50,000+** in credits (entry fee + travel fund)
- ✅ Driver overall rating **≥ 45** across all 6 stats
- ✅ At least **1 regional sponsor** secured
- ✅ A minimum **reliable crew** (at least 1 staff hire beyond volunteers)

Once qualified, you're in. The real races begin.

---

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

## 🎭 Career Mode: From Zero to Legend

> **You are both the driver and the team owner.** There is no budget to hire anyone. You are broke, passionate, and have everything to prove.

This is the true soul of the game. Not a fantasy manager with a fat wallet — a **real racer clawing their way up from nothing**.

---

### 🏠 Chapter 1 — "The Mini Stock Grind"
*Season: Local Short Track. Car: Mini Stock. Budget: Almost None.*

**You** start with:
- **One friend with a dream**: Your driver. They've raced go-karts, mowed lawns to save up. Talented, raw, completely unprepared for what's coming.
- **A beat-up Mini Stock**: Half-painted. You helped build it in the driveway.
- **Zero paid staff**: It's you and whoever shows up. Your driver's girlfriend. Your cousin.
- **A truck and trailer**: The most expensive part. Every weekend costs money just to show up.
- **$15,000 in starting credits**: Enough for a full Mini Stock season if nobody crashes big.

#### 🧠 Your Driver Has a Personality
Your driver isn't a spreadsheet. They have traits that create real problems:
- **Overconfident**: Will push too hard in practice, wreck the car before feature night
- **Streak racer**: Brilliant when on a roll, prone to tilting after a bad finish
- **People pleaser**: Talks to sponsors great, but caves under pressure from the wrong people
- **Grinder**: Slow to develop but never cracks. Safe choice for long seasons.

You manage them. You push them when they're soft, pull them back when they're ego-driving into walls.

#### 💸 Real Weekend Costs (Your Problem, Not Theirs)
| Expense | Cost |
|---|---|
| Entry fee | $150–$500 |
| Truck + trailer fuel (100 miles) | $120 |
| Food for crew (2 people, 2 days) | $80 |
| Tire set | $400 |
| Crash repair parts (if needed) | $200–$1,500 |
| **Total risk per weekend** | **$950–$2,600** |

#### 👥 The Volunteer Crew
The driver's girlfriend came out once. Your cousin helps if there's not a game on. A local mechanic shows up for free because he likes the smell of race fuel.
- Volunteers have **Reliability** and **Skill** stats
- Happy volunteers = fewer pit mistakes. Burnt-out volunteers = no-shows race day.
- If your driver is a diva to the crew, people stop showing up.

#### 🏁 Season Goals (Yours as the Manager)
- Keep the car on track all season (don't run out of money)
- Finish Top-5 to earn your driver their first **Regional Sponsor** ($500/race next season)
- Land local media coverage → 50 fans → unlock **GridPass Driver Profile**
- Don't let your driver's head get too big. Manage the ego.


---

### 🚐 Chapter 2 — "The Regional Push"
*Season: Regional Series. Car: Street Stock or Late Model. Budget: Thin.*

Now you can hire 1 paid person. Do you:
- Hire a **Tire Guy** (faster stops, $800/race) — or
- Hire a **Crew Chief** (smarter strategy, $1,200/race)?

The girlfriend might still come. Or she might be done with this lifestyle. That's your call, and it matters.

---

### 🌎 Chapter 3 — "The Callup"
A major sponsor notices your results. A National Series team reaches out with a **paid ride** offer:
- Accept: You're a hired driver now. Less control, more money.
- Decline: Stay indie. Your brand, your terms, slower growth.
- Counter: Negotiate. Maybe a partial team ownership stake.

---

### 🏆 Chapter 4 — Pro & Elite
- Build a two-car team
- Hire real engineers via the **GridPass Staff Market**
- Manage team drama, contract negotiations, sponsor obligations
- Enter the **Online Global Championship** against other real players

---

### 🔑 Core Narrative Pillars
1. **You earned everything** — no pay-to-win, no shortcuts
2. **Relationships matter** — crew morale, rival respect, sponsor trust
3. **The truck and trailer are real** — travel costs money every single race
4. **Start small, dream big** — the Mini Stock season is the tutorial *and* the heart of the game

---

## 🎬 Career Mode: The Narrative Path ("The Movie")

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
- **Local tracks API** — use Google Places API or a motorsport DB to pull real short tracks near the player's hometown for an immersive Mini Stock schedule

---

## 🚛 Vehicle & Fleet Progression

Your operation grows as you succeed. What you haul the car in tells everyone where you stand.

| Stage | Fleet | Description |
|---|---|---|
| 1 | **Pickup truck + open trailer** | Handle that yourself. Pray it doesn't rain. |
| 2 | **Enclosed trailer** | One enclosed. Big upgrade. Looks legit at the track. |
| 3 | **Box truck** | Full team can ride together. Sleeping in the back, eating gas station food. |
| 4 | **Semi + enclosed hauler** | You've made it regionally. Two cars max. |
| 5 | **Full fleet (3–5 cars)** | Sponsor decals on the side. TV coverage. |
| 6 | **International shipping** | Air freight for F1. Your name is on the pit wall. |

- Each vehicle has **fuel costs, maintenance cost, and capacity** (how many cars fit)
- **Multiple cars** unlock once you can afford a second driver + vehicle
- The truck is a character too — it breaks down, needs tires, needs insurance
- Hauler upgrades = prestige signal to sponsors

---

## 🏁 Multi-Car Team Progression

- **Season 1**: One car, one driver, you and whoever shows up
- **Season 2**: Hire first paid crew member. Possibly second car if flush
- **Season 3+**: Two→three car team. Each car needs its own driver, crew, sponsor
- **Pro Tier**: Run different series simultaneously with different cars/drivers
- **Elite**: Full factory-backed operation. Multiple countries, multiple series

