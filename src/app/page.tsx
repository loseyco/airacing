"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import {
  Flag, Trophy, ChevronRight, Zap, Users,
  Swords, ShieldCheck, Rocket, Wrench, Star, Clock,
  CheckCircle2, Circle, MapPin, Gauge
} from "lucide-react";

const featuresLive = [
  {
    icon: Rocket,
    title: "Origin Story Flow",
    description: "Create your manager profile (background, hometown) and your driver. Lock in your relationship — are they your friend, son, or just someone you discovered?",
    color: "#ff3e3e",
  },
  {
    icon: Gauge,
    title: "Driver Stat System",
    description: "6 real stats (Pace, Aggression, Confidence, Consistency, Pit Crew, Strategy) that will map 1:1 to iRacing AI behavior.",
    color: "#3388ff",
  },
  {
    icon: Wrench,
    title: "RPG Training Options",
    description: "Spend your limited budget to build your driver's stats. Rent simulators, hire coaches, or book private track testing.",
    color: "#00cc66",
  },
];

const roadmapItems = [
  { 
    phase: "Phase 4 (Next)", 
    title: "Simulated Mini Stock Season",
    color: "#ff8800", 
    items: [
      "No iRacing needed — statistical race engine", 
      "8-race short track season", 
      "Local Google Places tracks near your hometown",
      "Manage real costs (fuel, tires, food)"
    ] 
  },
  { 
    phase: "Phase 5", 
    title: "Real iRacing Integration",
    color: "#ff3e3e", 
    items: [
      "Earn enough to qualify for the AI Racing Championship", 
      "Parse real iRacing season schedules", 
      "Daemon sync to execute real iRacing AI sessions",
      "Live results feed back into the web economy"
    ] 
  },
  { 
    phase: "Phase 6", 
    title: "Deep Team Management",
    color: "#8844ff", 
    items: [
      "Hire pit crew & engineers via GridPass", 
      "Sponsor milestone contracts", 
      "Social & drama event feed",
      "Multi-car team progression"
    ] 
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" as const },
  }),
};

export default function LandingPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const handleStart = () => {
    if (!user) {
      router.push("/login"); // Route to standard auth page
    } else {
      router.push("/onboard");
    }
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
            <Link href="/login" className="btn-primary text-sm">
              Sign In
            </Link>
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
                Your driver bought a car off Marketplace.
              </span>
              <span className="block text-[var(--color-text-primary)]">Now they need your</span>
              <span className="block bg-gradient-to-r from-[#ff3e3e] to-[#ff8800] bg-clip-text text-transparent">
                help to run it.
              </span>
            </h1>

            <p className="max-w-2xl mx-auto text-lg md:text-xl text-[var(--color-text-secondary)] mb-4 leading-relaxed">
              You're not the driver. You're the one who loads the trailer, finds the sponsors,
              keeps the car together, and keeps their head right after a bad race.
            </p>
            <p className="max-w-xl mx-auto text-base text-[var(--color-text-muted)] mb-10">
              Start with a broken-down Mini Stock sitting in the driveway. A tight $50K pooled budget. A used truck and trailer.
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
        </section>

        {/* ── LIVE NOW ── */}
        <section className="pb-24">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-[#00cc6615] border border-[#00cc6633]">
              <CheckCircle2 className="w-4 h-4 text-[#00cc66]" />
              <span className="text-sm font-bold text-[#00cc66]">What Works Right Now</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black" style={{ fontFamily: "var(--font-display)" }}>
              Current <span className="bg-gradient-to-r from-[#00cc66] to-[#3388ff] bg-clip-text text-transparent">Features</span>
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

        {/* ── ROADMAP ── */}
        <section className="pb-24">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-[#ff880015] border border-[#ff880033]">
              <Clock className="w-4 h-4 text-[#ff8800]" />
              <span className="text-sm font-bold text-[#ff8800]">In Development</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black" style={{ fontFamily: "var(--font-display)" }}>
              The <span className="bg-gradient-to-r from-[#ff3e3e] to-[#ff8800] bg-clip-text text-transparent">Roadmap</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {roadmapItems.map((phase, i) => (
              <motion.div key={phase.phase} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="card p-8 border-t-4" style={{ borderTopColor: phase.color }}>
                <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: phase.color }}>{phase.phase}</div>
                <h3 className="text-xl font-bold mb-6">{phase.title}</h3>
                <ul className="space-y-4">
                  {phase.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-[var(--color-text-secondary)]">
                      <Circle className="w-3 h-3 flex-shrink-0 mt-1" style={{ color: phase.color }} />
                      <span className="leading-relaxed">{item}</span>
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
                  Free to play. Start your story today and get ready for the simulated short track season launching soon.
                </p>
                <button onClick={handleStart} disabled={loading} className="btn-primary text-base px-10 py-4 inline-flex items-center gap-2">
                  {user ? "Continue Your Story" : "Start Build Your Team"}
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
