# AI Racing Manager — Roadmap

## 🏁 Phase 1: Core Game Loop (IN PROGRESS)
> Get one driver through one race and back.

- [x] Project scaffold (Next.js 16, Firebase, Tailwind v4)
- [x] Landing page deployed to `airacing.web.app`
- [x] Driver creation UI (6 stats, livery, 200-point budget)
- [x] Series browser + standings pages
- [ ] **Firebase Auth** — Google sign-in, player profiles
- [ ] **Firestore wiring** — Save/load drivers, credits, transactions
- [ ] **Race entry flow** — Pick race, pay entry + travel, confirm
- [ ] **Race execution** — Generate roster.json/season.json → daemon runs iRacing
- [ ] **Results processing** — Parse results → update credits, XP, standings

## 🧓 Phase 2: Driver Lifecycle & Team Management
> The depth that makes the game sticky.

- [ ] **Driver aging** — +0.5 years/race, peak window, forced retirement at 46+
- [ ] **Stat decline** — Natural drop after age 35, injury acceleration
- [ ] **Rookie Academy** — Create young (16-18) cheap drivers
- [ ] **Training programs** — Spend credits to boost stats between races
- [ ] **Paid drivers** — Rich rookies who pay YOU to race (poor stats)
- [ ] **Free agent market** — Hire released veteran drivers
- [ ] **Multi-driver teams** — Run 2-4 cars, manage roster

## 🔧 Phase 3: Staff & Infrastructure
> Team-wide upgrades that affect all your drivers.

- [ ] **Pit Crew Chief** — Team pit stop speed bonus
- [ ] **Race Engineer** — Strategy bonus for all drivers
- [ ] **Driver Coach** — 2x XP gains from racing
- [ ] **Spotter** — Reduce incident rates
- [ ] **Data Analyst** — Unlock telemetry insights UI
- [ ] **Team Manager** — Negotiate bigger sponsor deals
- [ ] Staff leveling (1-10) with escalating salaries

## 🤝 Phase 4: Sponsors & Economy
> Real brands, real contracts, real consequences.

- [ ] **Sponsor tiers** — Local → Regional → National → Premium → Title
- [ ] **Performance contracts** — Meet goals or lose the sponsor
- [ ] **iRacing sponsor mapping** — Game sponsors = actual car decals
- [ ] **Trading Paints integration** — Premium liveries with real logos
- [ ] **League owner tools** — PJ controls series creation, prize pools, rules

## 🌐 Phase 5: Multiplayer & Broadcasts
> Multiple players competing in the same races.

- [ ] **Multi-player races** — Different players' AI drivers on same grid
- [ ] **League system** — Promotion/relegation between tiers
- [ ] **Live broadcasts** — Automated camera + commentary
- [ ] **Twitch/YouTube integration** — Race streaming
- [ ] **Real prizes** — Merch, credits, promotions for top players

## 🔬 Research Questions
- [ ] Can we assign custom setups to AI drivers? (roster has `carPath`/`carId` but no setup field — needs testing)
- [ ] Does `driverAge` in roster actually affect AI behavior, or just cosmetic?
- [ ] Can we run races headless (no monitor) for background processing?
- [ ] Trading Paints API access — do they have one?
- [ ] What's the max grid size iRacing supports for AI?
