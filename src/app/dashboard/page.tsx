"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Flag,
  Gauge,
  Trophy,
  Wallet,
  Plus,
  Calendar,
  TrendingUp,
  Clock,
  ChevronRight,
  Users,
} from "lucide-react";
import { STAT_CONFIG } from "@/lib/types";

// Placeholder data until Firebase is wired
const MOCK_PLAYER = {
  displayName: "PJ Losey",
  credits: 50000,
};

const MOCK_DRIVERS = [
  {
    id: "1",
    name: "Brian Simpson",
    carNumber: "1",
    level: 1,
    stats: { pace: 76, aggression: 27, confidence: 71, consistency: 61, pitCrew: 74, strategy: 45 },
    color1: "#284a94",
    color2: "#111111",
  },
];

const MOCK_UPCOMING_RACES = [
  {
    id: "r1",
    trackName: "Atlanta Motor Speedway - Oval",
    series: "GR86 Cup",
    date: "Round 1",
    entryFee: 1000,
    status: "open",
  },
  {
    id: "r2",
    trackName: "Daytona International Speedway",
    series: "ARCA Menards",
    date: "Round 3",
    entryFee: 2000,
    status: "open",
  },
];

const MOCK_RECENT_RESULTS = [
  {
    id: "res1",
    trackName: "Charlotte Motor Speedway",
    position: 3,
    earned: 3200,
    incidents: 2,
  },
];

export default function DashboardPage() {
  const player = MOCK_PLAYER;

  return (
    <div className="min-h-screen">
      {/* Top Nav */}
      <nav className="border-b border-[var(--color-border)] px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#ff3e3e] to-[#ff8800] flex items-center justify-center">
              <Flag className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold" style={{ fontFamily: "var(--font-display)" }}>
              AI Racing
            </span>
          </Link>
          <div className="flex items-center gap-6 text-sm">
            <Link href="/series" className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">
              Series
            </Link>
            <Link href="/standings" className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">
              Standings
            </Link>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--color-bg-card)] border border-[var(--color-border)]">
              <Wallet className="w-4 h-4 text-[var(--color-racing-green)]" />
              <span className="font-bold text-[var(--color-racing-green)]" style={{ fontFamily: "var(--font-mono)" }}>
                ${player.credits.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-black" style={{ fontFamily: "var(--font-display)" }}>
            Welcome back, <span className="bg-gradient-to-r from-[#ff3e3e] to-[#ff8800] bg-clip-text text-transparent">{player.displayName}</span>
          </h1>
          <p className="text-[var(--color-text-secondary)] mt-1">
            Manage your drivers, enter races, and build your empire.
          </p>
        </motion.div>

        {/* Quick Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Wallet, label: "Credits", value: `$${player.credits.toLocaleString()}`, color: "#00cc66" },
            { icon: Users, label: "Drivers", value: MOCK_DRIVERS.length.toString(), color: "#3388ff" },
            { icon: Trophy, label: "Best Finish", value: "P3", color: "#ffcc00" },
            { icon: TrendingUp, label: "Season Rank", value: "#12", color: "#ff8800" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="card p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <stat.icon className="w-4 h-4" style={{ color: stat.color }} />
                <span className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider">
                  {stat.label}
                </span>
              </div>
              <div className="text-2xl font-black" style={{ fontFamily: "var(--font-display)", color: stat.color }}>
                {stat.value}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Drivers Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* My Drivers */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
                  My Drivers
                </h2>
                <Link href="/drivers/create" className="btn-primary text-xs px-4 py-2 flex items-center gap-1.5">
                  <Plus className="w-3.5 h-3.5" />
                  New Driver
                </Link>
              </div>

              {MOCK_DRIVERS.length === 0 ? (
                <div className="card p-12 text-center">
                  <Gauge className="w-12 h-12 text-[var(--color-text-muted)] mx-auto mb-4" />
                  <h3 className="text-lg font-bold mb-2">No Drivers Yet</h3>
                  <p className="text-sm text-[var(--color-text-secondary)] mb-6">
                    Create your first driver to start racing.
                  </p>
                  <Link href="/drivers/create" className="btn-primary inline-flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Create Driver
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {MOCK_DRIVERS.map((driver) => (
                    <motion.div
                      key={driver.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="card p-5 flex items-center gap-5"
                    >
                      {/* Driver color strip */}
                      <div className="w-14 h-14 rounded-xl flex items-center justify-center font-black text-xl"
                        style={{
                          background: `linear-gradient(135deg, ${driver.color1}, ${driver.color2})`,
                          fontFamily: "var(--font-display)",
                        }}
                      >
                        {driver.carNumber}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold truncate">{driver.name}</h3>
                          <span className="badge badge-blue">Lv.{driver.level}</span>
                        </div>
                        {/* Mini stat bars */}
                        <div className="flex gap-1 mt-2">
                          {Object.entries(driver.stats).map(([key, val]) => (
                            <div key={key} className="flex-1 h-1.5 bg-[var(--color-bg-secondary)] rounded-full overflow-hidden">
                              <div
                                className="h-full rounded-full"
                                style={{
                                  width: `${val}%`,
                                  backgroundColor: (STAT_CONFIG as Record<string, { color: string }>)[key]?.color || "#888",
                                }}
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      <Link href="/series" className="btn-secondary text-xs px-3 py-1.5 flex items-center gap-1">
                        Race <ChevronRight className="w-3 h-3" />
                      </Link>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Recent Results */}
            <div>
              <h2 className="text-xl font-bold mb-4" style={{ fontFamily: "var(--font-display)" }}>
                Recent Results
              </h2>
              {MOCK_RECENT_RESULTS.length === 0 ? (
                <div className="card p-8 text-center">
                  <p className="text-sm text-[var(--color-text-secondary)]">
                    No races completed yet. Enter your first race!
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {MOCK_RECENT_RESULTS.map((result) => (
                    <div key={result.id} className="card p-4 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="race-position text-2xl font-black" style={{
                          color: result.position <= 3 ? "#ffcc00" : "var(--color-text-primary)",
                          fontFamily: "var(--font-display)",
                        }}>
                          P{result.position}
                        </div>
                        <div>
                          <div className="font-semibold text-sm">{result.trackName}</div>
                          <div className="text-xs text-[var(--color-text-muted)]">
                            {result.incidents}x incidents
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-[var(--color-racing-green)]" style={{ fontFamily: "var(--font-mono)" }}>
                          +${result.earned.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Races */}
            <div>
              <h2 className="text-xl font-bold mb-4" style={{ fontFamily: "var(--font-display)" }}>
                Upcoming Races
              </h2>
              <div className="space-y-3">
                {MOCK_UPCOMING_RACES.map((race) => (
                  <div key={race.id} className="card p-4 racing-stripe pl-6">
                    <div className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-1">
                      {race.series} • {race.date}
                    </div>
                    <div className="font-semibold text-sm mb-2">{race.trackName}</div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[var(--color-text-secondary)]">
                        Entry: <span className="text-[var(--color-racing-orange)] font-bold">${race.entryFee.toLocaleString()}</span>
                      </span>
                      <Link href={`/races/${race.id}`} className="text-xs text-[var(--color-racing-red)] font-semibold hover:underline flex items-center gap-1">
                        Enter <ChevronRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card p-5">
              <h3 className="font-bold mb-3">Quick Actions</h3>
              <div className="space-y-2">
                <Link href="/drivers/create" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[var(--color-bg-card-hover)] transition-colors">
                  <Plus className="w-4 h-4 text-[var(--color-racing-green)]" />
                  <span className="text-sm">New Driver</span>
                </Link>
                <Link href="/series" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[var(--color-bg-card-hover)] transition-colors">
                  <Calendar className="w-4 h-4 text-[var(--color-racing-blue)]" />
                  <span className="text-sm">Browse Series</span>
                </Link>
                <Link href="/standings" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[var(--color-bg-card-hover)] transition-colors">
                  <Trophy className="w-4 h-4 text-[var(--color-racing-yellow)]" />
                  <span className="text-sm">Standings</span>
                </Link>
              </div>
            </div>

            {/* Season Progress Placeholder */}
            <div className="card p-5">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-4 h-4 text-[var(--color-text-muted)]" />
                <h3 className="font-bold text-sm">Season Progress</h3>
              </div>
              <div className="stat-bar mb-2">
                <div className="stat-bar-fill bg-gradient-to-r from-[#ff3e3e] to-[#ff8800]" style={{ width: "15%" }} />
              </div>
              <div className="flex justify-between text-xs text-[var(--color-text-muted)]">
                <span>Race 1 of 12</span>
                <span>15%</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
