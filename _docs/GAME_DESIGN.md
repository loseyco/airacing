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

## 🎭 Career Mode: From Zero to Legend

> **You are both the driver and the team owner.** There is no budget to hire anyone. You are broke, passionate, and have everything to prove.

This is the true soul of the game. Not a fantasy manager with a fat wallet — a **real racer clawing their way up from nothing**.

---

### 🏠 Chapter 1 — "The Mini Stock Grind"
*Season: Local Short Track. Car: Mini Stock. Budget: Almost None.*

You start with:
- **One car**: A hand-built Mini Stock, half-painted and duct-taped together
- **Zero paid staff**: Your girlfriend/buddy helps for free — but you still owe them gas money, food, and a thank-you
- **A truck and trailer**: Every race weekend costs money just to show up — fuel, food, wear on the rig
- **$15,000 in starting credits**: Enough to get through a season if you're careful

#### 💸 Real Starting Costs Per Race Weekend
| Expense | Cost |
|---|---|
| Entry fee | $150–$500 |
| Truck + trailer fuel (100 miles) | $120 |
| Food for crew (2 people, 2 days) | $80 |
| Tire set | $400 |
| Crash repair parts (if needed) | $200–$1,500 |
| **Total risk per weekend** | **$950–$2,600** |

#### 👥 The "Free" Crew
Your girlfriend/buddy helps out for love, not money. But:
- You still pay for their meals, fuel, lodging at away races
- They have a **Morale stat** — skip their birthday weekend for a race and Morale drops → they quit mid-season
- Their skill level affects your pit stops (unpaid ≠ trained)
- If you're a jerk to them, they leave. Drama ensues in the **social feed**.

#### 🏁 Winning the Season
- Finish Top-5 overall → earn your first **Regional Sponsor** ($500/race next season)
- Win the Championship → unlock **Season 2: Regional Series** and your first *paid* crew hire
- Get coverage in the local paper → 50 fans. First 500 fans unlock the **GridPass Profile** (real world integration)

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
