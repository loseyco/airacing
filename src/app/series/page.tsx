"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Flag, ArrowLeft, Rocket, Calendar, Trophy, Users } from "lucide-react";

const upcoming = [
  { icon: Trophy, label: "GR86 Cup", desc: "Entry-level road series — great for rookies", color: "#00cc66" },
  { icon: Calendar, label: "ARCA Menards Series", desc: "Intermediate oval racing, 12-race season", color: "#ff8800" },
  { icon: Rocket, label: "NASCAR Truck Series", desc: "High-skill oval. Earn your way in.", color: "#ff3e3e" },
  { icon: Users, label: "GT3 Sprint Series", desc: "Elite road racing for the best teams", color: "#8844ff" },
];

export default function SeriesPage() {
  return (
    <div className="min-h-screen">
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
          <Link href="/dashboard" className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Dashboard
          </Link>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-20 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-[#ff880033] bg-[#ff880008]">
            <Rocket className="w-4 h-4 text-[#ff8800]" />
            <span className="text-sm text-[#ff8800] font-medium">Coming Soon — Season 1 Launching Shortly</span>
          </div>

          <h1 className="text-5xl font-black mb-4" style={{ fontFamily: "var(--font-display)" }}>
            Racing{" "}
            <span className="bg-gradient-to-r from-[#ff3e3e] to-[#ff8800] bg-clip-text text-transparent">
              Series
            </span>
          </h1>
          <p className="text-[var(--color-text-secondary)] mb-16 max-w-lg mx-auto">
            Series are being finalized. Create your driver now so you're ready to enter the moment Season 1 opens.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left max-w-2xl mx-auto mb-12">
            {upcoming.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="card p-5 border-l-4 opacity-80"
                style={{ borderLeftColor: s.color }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <s.icon className="w-5 h-5" style={{ color: s.color }} />
                  <span className="font-bold">{s.label}</span>
                  <span className="ml-auto text-[10px] font-bold text-[var(--color-racing-orange)] uppercase tracking-wider border border-[var(--color-racing-orange)] px-1.5 py-0.5 rounded bg-[var(--color-racing-orange)] bg-opacity-10">TBD</span>
                </div>
                <p className="text-xs text-[var(--color-text-secondary)]">{s.desc}</p>
              </motion.div>
            ))}
          </div>

          <Link href="/drivers/create" className="btn-primary inline-flex items-center gap-2">
            Create a Driver Now
          </Link>
        </motion.div>
      </main>
    </div>
  );
}
