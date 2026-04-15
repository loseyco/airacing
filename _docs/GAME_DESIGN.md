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

## 🎓 Driver Development

| Program | Cost | Output |
|---|---|---|
| Rookie Academy | $5,000 | Create young (16-18) driver |
| Training Camp | $2,000/session | +3-5 to one stat |
| Paid Drivers | They pay you! | Roster filler + income |
| Free Agent Market | High salary | Instant mid-tier talent |

---

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
