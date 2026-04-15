"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import {
  Flag, Gauge, Trophy, ChevronRight, Zap, Users,
  Swords, ShieldCheck, Rocket, Wrench, Star, Clock,
  CheckCircle2, Circle
} from "lucide-react";

const featuresLive = [
  {
    icon: Gauge,
    title: "Driver Stat System",
    description: "6 real stats (Pace, Aggression, Confidence, Consistency, Pit Crew, Strategy) mapped 1:1 to iRacing AI behavior.",
    color: "#ff3e3e",
  },
  {
    icon: Rocket,
    title: "Origin Story Mode",
    description: "Start broke. Build your friend into a pro. Simulated short-track seasons before the big leagues.",
    color: "#3388ff",
  },
  {
    icon: Wrench,
    title: "RPG Training Actions",
    description: "Spend credits on simulators, coaching sessions, and private testing. Every dollar shapes your driver.",
    color: "#00cc66",
  },
];

const featuresComing = [
  { icon: Flag, title: "Real iRacing Races", desc: "Your drivers compete in actual iRacing AI simulations when they qualify.", color: "#ff8800" },
  { icon: Swords, title: "Drama & Rivalries", desc: "Pit lane fights, chat wars, post-race beefs. High drama = bigger fanbase.", color: "#ffcc00" },
  { icon: ShieldCheck, title: "GridPass Staff IDs", desc: "Hire engineers with verified histories. Poach staff from rival teams.", color: "#8844ff" },
  { icon: Users, title: "Crew Management", desc: "Volunteer crew to start. Keep morale up or they no-show race day.", color: "#00cc66" },
  { icon: Trophy, title: "Sponsor Contracts", desc: "From local decals to title sponsors. Hit milestones or lose the deal.", color: "#ff3e3e" },
  { icon: Star, title: "Championship Season", desc: "Earn your way into the global AI Racing Championship against real players.", color: "#3388ff" },
];

const roadmap = [
  { phase: "Now", color: "#00cc66", items: ["Manager + Driver creation", "Simulated Mini Stock season", "Training & stat progression", "Driver profile pages"] },
  { phase: "Q2 2026", color: "#ff8800", items: ["Real iRacing race integration", "Volunteer crew system", "Entry fees + travel costs", "Local sponsor tiers"] },
  { phase: "Q3 2026", color: "#ff3e3e", items: ["AI Racing Championship season", "GridPass staff market", "Drama & rivalry system", "Global leaderboards"] },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" as const },
  }),
};

export default function LandingPage() {
  const { user, loading, signInWithGoogle } = useAuth();
  const router = useRouter();

  const handleStart = async () => {
    if (!user) {
      await signInWithGoogle();
    }
    router.push("/onboard");
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[900px] h-[600px] bg-[radial-gradient(ellipse,rgba(255,62,62,0.10),transparent_70%)]" />
        <div className="absolute right-0 top-1/3 w-[400px] h-[400px] bg-[radial-gradient(ellipse,rgba(51,136,255,0.06),transparent_70%)]" />
      </div>

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-5 md:px-12">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#ff3e3e] to-[#ff8800] flex items-center justify-center">
            <Flag className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
            AI Racing
          </span>
        </div>
        <div className="flex items-center gap-4">
          {user ? (
            <Link href="/dashboard" className="btn-primary text-sm">Dashboard</Link>
          ) : (
            <button onClick={handleStart} className="btn-primary text-sm" disabled={loading}>
              {loading ? "Loading..." : "Start Your Story"}
            </button>
          )}
        </div>
      </nav>

      <main className="relative z-10 mx-auto max-w-6xl px-6">

        {/* ── HERO: The Story ── */}
        <section className="pt-16 pb-24 md:pt-24 md:pb-32 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-[#ff3e3e33] bg-[#ff3e3e08]"
            >
              <Zap className="w-4 h-4 text-[#ff3e3e]" />
              <span className="text-sm text-[#ff3e3e] font-medium">Your Origin Story Starts Here</span>
            </motion.div>

            {/* Narrative headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] mb-8" style={{ fontFamily: "var(--font-display)" }}>
              <span className="block text-[var(--color-text-secondary)] text-2xl md:text-3xl font-bold mb-3 tracking-normal">
                Your friend has the talent.
              </span>
              <span className="block text-[var(--color-text-primary)]">You have the</span>
              <span className="block bg-gradient-to-r from-[#ff3e3e] to-[#ff8800] bg-clip-text text-transparent">
                belief.
              </span>
            </h1>

            <p className="max-w-2xl mx-auto text-lg md:text-xl text-[var(--color-text-secondary)] mb-4 leading-relaxed">
              You're not the driver. You're the one who loads the trailer, finds the sponsors,
              keeps the car together, and keeps their head right after a bad race.
            </p>
            <p className="max-w-xl mx-auto text-base text-[var(--color-text-muted)] mb-10">
              Start with a Mini Stock at a local short track. A beat-up truck. A borrowed trailer.
              And a dream that's bigger than both of you.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={handleStart}
                disabled={loading}
                className="btn-primary text-base px-10 py-4 flex items-center gap-2"
              >
                {user ? "Continue Your Story" : "Start Your Origin Story — Free"}
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>

          {/* Journey steps */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
          >
            {[
              { value: "Mini Stock", label: "Where It Starts" },
              { value: "$15K", label: "Starting Budget" },
              { value: "8 Races", label: "First Season" },
              { value: "iRacing", label: "Where It Ends Up" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl md:text-3xl font-black text-[var(--color-text-primary)]" style={{ fontFamily: "var(--font-display)" }}>
                  {stat.value}
                </div>
                <div className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </section>

        {/* ── LIVE NOW ── */}
        <section className="pb-24">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-[#00cc6615] border border-[#00cc6633]">
              <CheckCircle2 className="w-4 h-4 text-[#00cc66]" />
              <span className="text-sm font-bold text-[#00cc66]">Live Now</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black" style={{ fontFamily: "var(--font-display)" }}>
              What You Can Do <span className="bg-gradient-to-r from-[#00cc66] to-[#3388ff] bg-clip-text text-transparent">Today</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuresLive.map((f, i) => (
              <motion.div key={f.title} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp} className="card p-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${f.color}15` }}>
                  <f.icon className="w-6 h-6" style={{ color: f.color }} />
                </div>
                <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── COMING SOON ── */}
        <section className="pb-24">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-[#ff880015] border border-[#ff880033]">
              <Clock className="w-4 h-4 text-[#ff8800]" />
              <span className="text-sm font-bold text-[#ff8800]">Coming Soon</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black" style={{ fontFamily: "var(--font-display)" }}>
              What's <span className="bg-gradient-to-r from-[#ff8800] to-[#ff3e3e] bg-clip-text text-transparent">Coming</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuresComing.map((f, i) => (
              <motion.div key={f.title} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}
                className="card p-5 border-dashed opacity-80 flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: `${f.color}15` }}>
                  <f.icon className="w-5 h-5" style={{ color: f.color }} />
                </div>
                <div>
                  <h3 className="font-bold mb-1 text-sm">{f.title}</h3>
                  <p className="text-[var(--color-text-secondary)] text-xs leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── ROADMAP ── */}
        <section className="pb-24">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black" style={{ fontFamily: "var(--font-display)" }}>
              The <span className="bg-gradient-to-r from-[#ff3e3e] to-[#ff8800] bg-clip-text text-transparent">Roadmap</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {roadmap.map((phase, i) => (
              <motion.div key={phase.phase} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="card p-8 border-t-4" style={{ borderTopColor: phase.color }}>
                <div className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: phase.color }}>{phase.phase}</div>
                <ul className="space-y-3">
                  {phase.items.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-[var(--color-text-secondary)]">
                      <Circle className="w-3 h-3 flex-shrink-0" style={{ color: phase.color }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── BOTTOM CTA ── */}
        <section className="pb-32">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="card p-12 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-[#ff3e3e08] to-[#3388ff08]" />
              <div className="relative">
                <h2 className="text-3xl md:text-4xl font-black mb-4" style={{ fontFamily: "var(--font-display)" }}>
                  The trailer's loaded.<br />
                  <span className="bg-gradient-to-r from-[#ff3e3e] to-[#ff8800] bg-clip-text text-transparent">
                    Time to go racing.
                  </span>
                </h2>
                <p className="text-[var(--color-text-secondary)] mb-8 max-w-lg mx-auto">
                  Free to play. No iRacing required to start. Build your team from nothing
                  and earn your way to the big leagues.
                </p>
                <button onClick={handleStart} disabled={loading} className="btn-primary text-base px-10 py-4 inline-flex items-center gap-2">
                  {user ? "Continue Your Story" : "Start for Free"}
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[var(--color-border)] py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-[var(--color-text-muted)]">
            <Flag className="w-4 h-4" />
            <span className="text-sm">AI Racing Manager</span>
          </div>
          <div className="text-sm text-[var(--color-text-muted)]">
            Powered by iRacing • A GridPass Product
          </div>
        </div>
      </footer>
    </div>
  );
}
