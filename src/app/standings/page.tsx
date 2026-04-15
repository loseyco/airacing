"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Flag, Trophy, TrendingUp, Minus } from "lucide-react";

// Mock standings data
const MOCK_STANDINGS = [
  { pos: 1, name: "James Patrick", carNumber: "8", team: "AI Racing", points: 186, wins: 3, top5: 5, top10: 6, dnf: 0, color: "#ff3e3e" },
  { pos: 2, name: "Brian Simpson", carNumber: "1", team: "AI Racing", points: 172, wins: 2, top5: 4, top10: 7, dnf: 1, color: "#284a94" },
  { pos: 3, name: "PJ Losey", carNumber: "17", team: "Losey Racing", points: 165, wins: 1, top5: 5, top10: 6, dnf: 0, color: "#ff0000" },
  { pos: 4, name: "John Smith", carNumber: "10", team: "Smith Motorsport", points: 158, wins: 1, top5: 3, top10: 7, dnf: 1, color: "#ff00e6" },
  { pos: 5, name: "Chris Murphy", carNumber: "12", team: "Murphy Racing", points: 149, wins: 0, top5: 4, top10: 5, dnf: 2, color: "#0012ff" },
  { pos: 6, name: "Jack Wilson", carNumber: "1", team: "Wilson Motor Co", points: 142, wins: 1, top5: 3, top10: 5, dnf: 1, color: "#ff8a00" },
  { pos: 7, name: "Dale Earnhardt Jr.", carNumber: "3", team: "JR Motorsports", points: 135, wins: 0, top5: 2, top10: 6, dnf: 0, color: "#0ada00" },
  { pos: 8, name: "Lauren Russo", carNumber: "2", team: "Russo Racing", points: 128, wins: 0, top5: 2, top10: 4, dnf: 3, color: "#00aeef" },
];

const positionColors = (pos: number) => {
  if (pos === 1) return "#ffcc00";
  if (pos === 2) return "#c0c0c0";
  if (pos === 3) return "#cd7f32";
  return "var(--color-text-primary)";
};

export default function StandingsPage() {
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
            <Link href="/series" className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">
              Series
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-black mb-2" style={{ fontFamily: "var(--font-display)" }}>
            Championship{" "}
            <span className="bg-gradient-to-r from-[#ffcc00] to-[#ff8800] bg-clip-text text-transparent">
              Standings
            </span>
          </h1>
          <p className="text-[var(--color-text-secondary)]">
            GR86 Cup — Season 1 • 8 Races
          </p>
        </motion.div>

        {/* Top 3 Podium */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {MOCK_STANDINGS.slice(0, 3).map((driver, i) => {
            const order = [1, 0, 2]; // Show 2nd, 1st, 3rd
            const d = MOCK_STANDINGS[order[i]];
            const heights = ["h-36", "h-44", "h-28"];
            return (
              <motion.div
                key={d.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                className="flex flex-col items-center"
              >
                <div className="card p-4 text-center mb-3 w-full">
                  <div
                    className="text-3xl font-black mb-1"
                    style={{ fontFamily: "var(--font-display)", color: positionColors(d.pos) }}
                  >
                    P{d.pos}
                  </div>
                  <div className="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center font-bold text-sm"
                    style={{ background: d.color, fontFamily: "var(--font-display)" }}
                  >
                    {d.carNumber}
                  </div>
                  <div className="font-bold text-sm truncate">{d.name}</div>
                  <div className="text-xs text-[var(--color-text-muted)] truncate">{d.team}</div>
                  <div className="text-2xl font-black mt-2" style={{ fontFamily: "var(--font-mono)", color: positionColors(d.pos) }}>
                    {d.points}
                  </div>
                  <div className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider">Points</div>
                </div>
                <div
                  className={`w-full rounded-t-lg ${heights[i]}`}
                  style={{
                    background: `linear-gradient(180deg, ${positionColors(d.pos)}33, ${positionColors(d.pos)}08)`,
                    borderTop: `2px solid ${positionColors(d.pos)}`,
                  }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Full Standings Table */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card overflow-hidden"
        >
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--color-border)] text-[var(--color-text-muted)] text-xs uppercase tracking-wider">
                <th className="px-4 py-3 text-left w-12">Pos</th>
                <th className="px-4 py-3 text-left">Driver</th>
                <th className="px-4 py-3 text-center">Wins</th>
                <th className="px-4 py-3 text-center">Top 5</th>
                <th className="px-4 py-3 text-center">Top 10</th>
                <th className="px-4 py-3 text-center">DNF</th>
                <th className="px-4 py-3 text-right">Points</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_STANDINGS.map((driver, i) => (
                <motion.tr
                  key={driver.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.05 }}
                  className="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-bg-card-hover)] transition-colors"
                >
                  <td className="px-4 py-3">
                    <span
                      className="font-black text-lg"
                      style={{ fontFamily: "var(--font-display)", color: positionColors(driver.pos) }}
                    >
                      {driver.pos}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
                        style={{ background: driver.color, fontFamily: "var(--font-display)" }}
                      >
                        {driver.carNumber}
                      </div>
                      <div>
                        <div className="font-semibold">{driver.name}</div>
                        <div className="text-xs text-[var(--color-text-muted)]">{driver.team}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center font-bold" style={{ color: driver.wins > 0 ? "#ffcc00" : "var(--color-text-muted)" }}>
                    {driver.wins}
                  </td>
                  <td className="px-4 py-3 text-center text-[var(--color-text-secondary)]">{driver.top5}</td>
                  <td className="px-4 py-3 text-center text-[var(--color-text-secondary)]">{driver.top10}</td>
                  <td className="px-4 py-3 text-center" style={{ color: driver.dnf > 0 ? "#ff3e3e" : "var(--color-text-muted)" }}>
                    {driver.dnf}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="font-black text-lg" style={{ fontFamily: "var(--font-mono)" }}>
                      {driver.points}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </main>
    </div>
  );
}
