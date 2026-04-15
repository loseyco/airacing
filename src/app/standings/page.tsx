"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Flag, ArrowLeft, Trophy, Rocket } from "lucide-react";

export default function StandingsPage() {
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
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-[#ffcc0033] bg-[#ffcc0008]">
            <Trophy className="w-4 h-4 text-[#ffcc00]" />
            <span className="text-sm text-[#ffcc00] font-medium">No races completed yet — Season 1 coming soon</span>
          </div>

          <h1 className="text-5xl font-black mb-4" style={{ fontFamily: "var(--font-display)" }}>
            Championship{" "}
            <span className="bg-gradient-to-r from-[#ffcc00] to-[#ff8800] bg-clip-text text-transparent">
              Standings
            </span>
          </h1>
          <p className="text-[var(--color-text-secondary)] mb-12 max-w-lg mx-auto">
            The championship table will populate as races are completed. Build your team now and be ready when Season 1 begins.
          </p>

          <div className="card p-12 max-w-sm mx-auto mb-10 opacity-50 border-dashed">
            <div className="grid grid-cols-3 gap-4 mb-4">
              {["🥈 P2", "🥇 P1", "🥉 P3"].map((p, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl font-black mb-1" style={{ fontFamily: "var(--font-display)" }}>{p}</div>
                  <div className="text-xs text-[var(--color-text-muted)]">—</div>
                </div>
              ))}
            </div>
            <p className="text-xs text-[var(--color-text-muted)]">Podium unlocks after first race</p>
          </div>

          <div className="flex justify-center gap-4">
            <Link href="/drivers/create" className="btn-primary inline-flex items-center gap-2">
              <Rocket className="w-4 h-4" />
              Build Your Driver
            </Link>
            <Link href="/dashboard" className="btn-secondary inline-flex items-center gap-2">
              Back to Garage
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
