"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Flag,
  ChevronRight,
  MapPin,
  Users,
  Gauge,
  Wallet,
} from "lucide-react";

// Mock series data (will be parsed from iRacing season JSONs)
const MOCK_SERIES = [
  {
    id: "gr86-cup",
    name: "GR86 Cup",
    category: "road" as const,
    carName: "Toyota GR86",
    difficulty: "Beginner",
    minSkill: 0,
    maxSkill: 50,
    maxDrivers: 30,
    races: 8,
    entryFee: 500,
    events: [
      { trackName: "Lime Rock Park", location: "Lakeville, CT" },
      { trackName: "Summit Point Raceway", location: "Summit Point, WV" },
      { trackName: "Okayama International Circuit", location: "Okayama, Japan" },
    ],
    color: "#00cc66",
  },
  {
    id: "arca-menards",
    name: "ARCA Menards Series",
    category: "oval" as const,
    carName: "ARCA Menards Chevrolet",
    difficulty: "Intermediate",
    minSkill: 25,
    maxSkill: 80,
    maxDrivers: 41,
    races: 12,
    entryFee: 1500,
    events: [
      { trackName: "Atlanta Motor Speedway", location: "Hampton, GA" },
      { trackName: "Daytona International Speedway", location: "Daytona Beach, FL" },
      { trackName: "Kansas Speedway", location: "Kansas City, KS" },
    ],
    color: "#ff8800",
  },
  {
    id: "nascar-trucks",
    name: "NASCAR Truck Series",
    category: "oval" as const,
    carName: "Multiple Trucks",
    difficulty: "Advanced",
    minSkill: 50,
    maxSkill: 100,
    maxDrivers: 36,
    races: 16,
    entryFee: 3000,
    events: [
      { trackName: "Charlotte Motor Speedway", location: "Concord, NC" },
      { trackName: "Bristol Motor Speedway", location: "Bristol, TN" },
      { trackName: "Martinsville Speedway", location: "Ridgeway, VA" },
    ],
    color: "#ff3e3e",
  },
  {
    id: "gt3-sprint",
    name: "GT3 Sprint Series",
    category: "road" as const,
    carName: "Various GT3 Cars",
    difficulty: "Expert",
    minSkill: 60,
    maxSkill: 100,
    maxDrivers: 24,
    races: 10,
    entryFee: 5000,
    events: [
      { trackName: "Spa-Francorchamps", location: "Stavelot, Belgium" },
      { trackName: "Circuit de Barcelona-Catalunya", location: "Barcelona, Spain" },
      { trackName: "Imola", location: "Imola, Italy" },
    ],
    color: "#8844ff",
  },
];

const difficultyColors: Record<string, string> = {
  Beginner: "#00cc66",
  Intermediate: "#ffcc00",
  Advanced: "#ff8800",
  Expert: "#ff3e3e",
};

export default function SeriesPage() {
  return (
    <div className="min-h-screen">
      {/* Top Nav */}
      <nav className="border-b border-[var(--color-border)] px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#ff3e3e] to-[#ff8800] flex items-center justify-center">
              <Flag className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold" style={{ fontFamily: "var(--font-display)" }}>
              AI Racing
            </span>
          </Link>
          <div className="flex items-center gap-6 text-sm">
            <Link href="/dashboard" className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">
              Dashboard
            </Link>
            <Link href="/standings" className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">
              Standings
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-black mb-2" style={{ fontFamily: "var(--font-display)" }}>
            Racing{" "}
            <span className="bg-gradient-to-r from-[#ff3e3e] to-[#ff8800] bg-clip-text text-transparent">
              Series
            </span>
          </h1>
          <p className="text-[var(--color-text-secondary)] mb-8">
            Choose a series, enter a race, and prove yourself on the grid.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MOCK_SERIES.map((series, i) => (
            <motion.div
              key={series.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="card overflow-hidden"
            >
              {/* Color header bar */}
              <div
                className="h-1.5"
                style={{ background: `linear-gradient(90deg, ${series.color}, ${series.color}88)` }}
              />

              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="text-xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
                        {series.name}
                      </h2>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-[var(--color-text-muted)]">
                      <span className="uppercase tracking-wider">{series.category}</span>
                      <span>•</span>
                      <span>{series.carName}</span>
                    </div>
                  </div>
                  <span
                    className="badge"
                    style={{
                      backgroundColor: `${difficultyColors[series.difficulty]}15`,
                      color: difficultyColors[series.difficulty],
                      borderColor: `${difficultyColors[series.difficulty]}33`,
                      borderWidth: 1,
                      borderStyle: "solid",
                    }}
                  >
                    {series.difficulty}
                  </span>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-4 mb-5 py-4 border-t border-b border-[var(--color-border)]">
                  <div className="text-center">
                    <div className="text-lg font-black" style={{ fontFamily: "var(--font-display)", color: series.color }}>
                      {series.races}
                    </div>
                    <div className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider">Races</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-black" style={{ fontFamily: "var(--font-display)" }}>
                      {series.maxDrivers}
                    </div>
                    <div className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider">Grid Size</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-black" style={{ fontFamily: "var(--font-display)", color: "#ff8800" }}>
                      ${series.entryFee.toLocaleString()}
                    </div>
                    <div className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider">Entry Fee</div>
                  </div>
                </div>

                {/* Skill range */}
                <div className="mb-5">
                  <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)] mb-1.5">
                    <span className="flex items-center gap-1">
                      <Gauge className="w-3 h-3" /> AI Skill Range
                    </span>
                    <span>{series.minSkill} — {series.maxSkill}</span>
                  </div>
                  <div className="stat-bar">
                    <div
                      className="stat-bar-fill"
                      style={{
                        marginLeft: `${series.minSkill}%`,
                        width: `${series.maxSkill - series.minSkill}%`,
                        backgroundColor: series.color,
                      }}
                    />
                  </div>
                </div>

                {/* Track list preview */}
                <div className="space-y-2 mb-5">
                  {series.events.slice(0, 3).map((event, j) => (
                    <div key={j} className="flex items-center gap-2 text-sm">
                      <MapPin className="w-3 h-3 text-[var(--color-text-muted)] flex-shrink-0" />
                      <span className="text-[var(--color-text-secondary)] truncate">
                        {event.trackName}
                      </span>
                      <span className="text-xs text-[var(--color-text-muted)] ml-auto flex-shrink-0">
                        {event.location}
                      </span>
                    </div>
                  ))}
                  {series.races > 3 && (
                    <div className="text-xs text-[var(--color-text-muted)] pl-5">
                      +{series.races - 3} more races
                    </div>
                  )}
                </div>

                {/* CTA */}
                <Link
                  href={`/series/${series.id}`}
                  className="btn-primary w-full text-center flex items-center justify-center gap-2 text-sm"
                >
                  View Series
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
