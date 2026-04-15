"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Flag,
  Gauge,
  Trophy,
  Wallet,
  ChevronRight,
  Zap,
  Users,
  BarChart3,
} from "lucide-react";

const features = [
  {
    icon: Gauge,
    title: "6 Driver Stats",
    description:
      "Pace, Aggression, Confidence, Consistency, Pit Crew, Strategy — each maps directly to iRacing AI behavior.",
    color: "#ff3e3e",
  },
  {
    icon: Flag,
    title: "Real Races",
    description:
      "Your drivers compete in actual iRacing AI simulations. Real physics, real incidents, real results.",
    color: "#ff8800",
  },
  {
    icon: Wallet,
    title: "Game Economy",
    description:
      "Earn credits from wins, spend on travel, repairs, and upgrades. Build your racing empire.",
    color: "#ffcc00",
  },
  {
    icon: Trophy,
    title: "Championships",
    description:
      "Compete across full seasons. Chase championship points and fight for the title.",
    color: "#00cc66",
  },
  {
    icon: Users,
    title: "Build Your Team",
    description:
      "Start with one driver, grow into a multi-car team. Hire staff, attract sponsors.",
    color: "#3388ff",
  },
  {
    icon: BarChart3,
    title: "Deep Analytics",
    description:
      "Track lap times, compare rivals, study race data. Every detail feeds into your strategy.",
    color: "#8844ff",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" as const },
  }),
};

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Hero glow effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse,rgba(255,62,62,0.12),transparent_70%)]" />
        <div className="absolute right-0 top-1/3 w-[400px] h-[400px] bg-[radial-gradient(ellipse,rgba(255,136,0,0.08),transparent_70%)]" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-5 md:px-12">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#ff3e3e] to-[#ff8800] flex items-center justify-center">
            <Flag className="w-5 h-5 text-white" />
          </div>
          <span
            className="text-xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            AI Racing
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="btn-secondary text-sm hidden sm:inline-flex"
          >
            Dashboard
          </Link>
          <Link href="/dashboard" className="btn-primary text-sm">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 mx-auto max-w-6xl px-6 pt-16 pb-24 md:pt-24 md:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-[#ff3e3e33] bg-[#ff3e3e08]"
          >
            <Zap className="w-4 h-4 text-[#ff3e3e]" />
            <span className="text-sm text-[#ff3e3e] font-medium">
              Powered by Real iRacing Simulations
            </span>
          </motion.div>

          {/* Heading */}
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.9] mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <span className="block text-[var(--color-text-primary)]">BUILD.</span>
            <span className="block bg-gradient-to-r from-[#ff3e3e] to-[#ff8800] bg-clip-text text-transparent">
              RACE.
            </span>
            <span className="block text-[var(--color-text-primary)]">DOMINATE.</span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-[var(--color-text-secondary)] mb-10 leading-relaxed">
            Create racing drivers with real stats. Compete in iRacing AI
            simulations. Build your motorsport empire from the ground up.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/drivers/create"
              className="btn-primary text-base px-10 py-4 flex items-center gap-2"
            >
              Create Your Driver
              <ChevronRight className="w-5 h-5" />
            </Link>
            <Link
              href="/series"
              className="btn-secondary text-base px-10 py-4"
            >
              Browse Series
            </Link>
          </div>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
        >
          {[
            { value: "6", label: "Driver Stats" },
            { value: "200+", label: "Tracks" },
            { value: "∞", label: "Race Combinations" },
            { value: "50K", label: "Starting Credits" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div
                className="text-3xl md:text-4xl font-black text-[var(--color-text-primary)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {stat.value}
              </div>
              <div className="text-sm text-[var(--color-text-muted)] uppercase tracking-wider mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Features Grid */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeUp}
              className="card p-6"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: `${feature.color}15` }}
              >
                <feature.icon
                  className="w-6 h-6"
                  style={{ color: feature.color }}
                />
              </div>
              <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
              <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-32 text-center"
        >
          <h2
            className="text-3xl md:text-4xl font-black mb-16"
            style={{ fontFamily: "var(--font-display)" }}
          >
            How It{" "}
            <span className="bg-gradient-to-r from-[#ff3e3e] to-[#ff8800] bg-clip-text text-transparent">
              Works
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: "01",
                title: "Create Driver",
                desc: "Name your driver, allocate 200 stat points across 6 categories",
              },
              {
                step: "02",
                title: "Enter Race",
                desc: "Browse series, pick a race, pay entry fees and travel costs",
              },
              {
                step: "03",
                title: "Watch & Wait",
                desc: "Your AI driver competes in a real iRacing simulation",
              },
              {
                step: "04",
                title: "Collect Rewards",
                desc: "Earn credits, XP, and championship points from results",
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="relative"
              >
                <div
                  className="text-5xl font-black text-[var(--color-racing-red)] opacity-20 mb-3"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {item.step}
                </div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 text-center"
        >
          <div className="card p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#ff3e3e08] to-[#ff880008]" />
            <div className="relative">
              <h2
                className="text-3xl md:text-4xl font-black mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Ready to Race?
              </h2>
              <p className="text-[var(--color-text-secondary)] mb-8 max-w-lg mx-auto">
                Start with 50,000 credits and 200 stat points. Build your
                driver, enter your first race, and begin your championship
                journey.
              </p>
              <Link
                href="/drivers/create"
                className="btn-primary text-base px-10 py-4 inline-flex items-center gap-2"
              >
                Start Racing Now
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </motion.div>
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
