"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Flag, ArrowLeft, Rocket, Calendar } from "lucide-react";

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

      <main className="max-w-2xl mx-auto px-6 py-24 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {/* #SOON badge */}
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-[#ff880033] bg-[#ff880008]">
            <Calendar className="w-4 h-4 text-[#ff8800]" />
            <span className="text-sm text-[#ff8800] font-bold">#SOON</span>
          </div>

          <h1 className="text-5xl font-black mb-4" style={{ fontFamily: "var(--font-display)" }}>
            Racing{" "}
            <span className="bg-gradient-to-r from-[#ff3e3e] to-[#ff8800] bg-clip-text text-transparent">
              Series
            </span>
          </h1>

          <p className="text-[var(--color-text-secondary)] mb-4 max-w-lg mx-auto text-lg leading-relaxed">
            The Series Browser opens once you've qualified for the{" "}
            <span className="text-[var(--color-text-primary)] font-semibold">AI Racing Championship</span>.
          </p>
          <p className="text-[var(--color-text-muted)] mb-12 text-sm max-w-md mx-auto">
            Finish your Mini Stock season, earn $50K+, hit OVR 45, and lock down a sponsor. <em>Then</em> we talk series.
          </p>

          <div className="card p-8 border-dashed mb-10 text-left max-w-sm mx-auto">
            <div className="text-sm font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-4">Championship Entry Requirements</div>
            <ul className="space-y-3">
              {[
                "✅  Complete the Mini Stock season",
                "💰  $50,000+ in credits",
                "📊  Driver OVR ≥ 45",
                "🤝  1 regional sponsor secured",
                "👥  At least 1 paid crew hire",
              ].map(r => (
                <li key={r} className="text-sm text-[var(--color-text-secondary)]">{r}</li>
              ))}
            </ul>
          </div>

          <div className="flex justify-center gap-4">
            <Link href="/dashboard" className="btn-primary inline-flex items-center gap-2">
              <Rocket className="w-4 h-4" />
              Back to Garage
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
