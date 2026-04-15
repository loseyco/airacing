# AI Racing Manager — Roadmap

## 🏁 Phase 1 - 3: Project Up & Live (COMPLETED)
> Establish the initial platform, authentication, identity, and the pure Origin Story.

- [x] Project scaffold (Next.js 16, Firebase, Tailwind v4, Static Export)
- [x] Firebase Auth (Google) & Firestore DB persistence
- [x] Landing Page — "Marketplace Mistake" origin narrative
- [x] Manager Creation — Relationship definition (Son, Friend, Partner)
- [x] Driver Creation UI — 6-stat point allocator (200 budget), persistent traits
- [x] Dashboard — Dynamic Journey checklist, persistent wallet calculation ($50,000 start)
- [x] RPG Actions — Train drivers (Simulator, Coaches) for stat boosts
- [x] Deployed live to `airacing.web.app` (10 clean static pages)

## 🏎️ Phase 4: Simulated Mini Stock Season (NEXT)
> The tutorial. Manage your money, survive local short tracks, and qualify for the big time.

- [ ] **Simulated Race Engine:** Statistical results (no iRacing execution needed yet).
- [ ] **Local Tracks API:** Query Google Places for 8 real short/dirt tracks near the Manager's hometown.
- [ ] **Starting Economy Core:** Buying the used truck, trailer, and base car prep before Race 1.
- [ ] **Race Costs:** Fuel, tires, entry fees, and random repair events.
- [ ] **Qualification Rules:** Finish the season with OVR > 45, > $50,000 cash, and at least 1 staff/sponsor to jump to Phase 5.

## 🏆 Phase 5: AI Racing Championship 
> The real game. Hardcore competition via actual iRacing AI simulation.

- [ ] **Series Browser:** Parse real iRacing season `JSON` data for tracks and parameters.
- [ ] **Race Entry Flow:** Pay heavy entry fees, travel costs, and commit.
- [ ] **Real Execution Sync:** Web app generates `roster.json` → daemon runs headless iRacing → updates results.
- [ ] **Results Processing:** Parse final standings to award XP, credits, and driver fatigue/morale.

## 🧓 Phase 6: Deep Team Management & Depth
> Real lifecycle features that make the manager stick around for 10 in-game years.

- [ ] **Staff & Crew:** Volunteer crew vs paid engineers via GridPass hiring pools.
- [ ] **Sponsors & Brands:** Performance milestones. iRacing setups dynamically receive branded Trading Paints liveries based on game-state contracts.
- [ ] **Driver Lifecycle:** Aging drops stats. Retirement. Rookie scouting academies. Multi-driver teams and semi/hauler fleet growth.
- [ ] **Drama System:** In-game social feeds. Driver behavioral actions based on their selected traits (e.g. Overconfident wrecks on lap 1).

## 🌐 Phase 7: Multiplayer Expansion
> The final frontier. Competing against other players' AI drivers.

- [ ] **Grid Population:** Push your driver to a shared Cloud grid.
- [ ] **League System:** Promotion/relegation between tiered online splits.
