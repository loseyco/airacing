"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import {
  Flag,
  Gauge,
  Trophy,
  Wallet,
  ChevronRight,
  Zap,
  Users,
  BarChart3,
  Timer,
  Wrench,
  Handshake,
} from "lucide-react";

const features = [
  {
    icon: Gauge,
    title: "6 Real Driver Stats",
    description:
      "Pace, Aggression, Confidence, Consistency, Pit Crew, Strategy — each maps 1:1 to iRacing AI behavior.",
    color: "#ff3e3e",
  },
  {
    icon: Flag,
    title: "Real iRacing Races",
    description:
      "Your drivers compete in actual iRacing AI simulations. Real physics, real incidents, real results.",
    color: "#ff8800",
  },
  {
    icon: Timer,
    title: "Driver Aging",
    description:
      "Drivers age every race. Peak at 29-34, decline after 35, forced retirement at 46. Manage your roster wisely.",
    color: "#ffcc00",
  },
  {
    icon: Wrench,
    title: "Staff & Upgrades",
    description:
      "Hire pit crew chiefs, race engineers, driver coaches. Level them up. Team-wide performance boosts.",
    color: "#00cc66",
  },
  {
    icon: Handshake,
    title: "Real Sponsors",
    description:
      "Earn sponsor contracts based on performance. Meet goals or lose the deal. Sponsors show on your car.",
    color: "#3388ff",
  },
  {
    icon: Trophy,
    title: "Championships & Prizes",
    description:
      "Chase championship points across full seasons. Real prizes for top performers. Build your legacy.",
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
  const { user, loading, signInWithGoogle } = useAuth();
  const router = useRouter();

  const handleGetStarted = async () => {
    if (user) {
      router.push("/dashboard");
    } else {
      await signInWithGoogle();
      router.push("/dashboard");
    }
  };

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
          {user ? (
            <Link href="/dashboard" className="btn-primary text-sm">
              Dashboard
            </Link>
          ) : (
            <button onClick={handleGetStarted} className="btn-primary text-sm" disabled={loading}>
              {loading ? "Loading..." : "Sign In"}
            </button>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 mx-auto max-w-6xl px-6 pt-16 pb-24 md:pt-24 md:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
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
              Powered by Real iRacing AI Simulations
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
            Create drivers with real stats. Watch them compete in iRacing AI
            races. Manage aging, staff, sponsors, and a full economy.
            Build your motorsport empire.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleGetStarted}
              disabled={loading}
              className="btn-primary text-base px-10 py-4 flex items-center gap-2"
            >
              {user ? "Go to Dashboard" : "Start Racing — It's Free"}
              <ChevronRight className="w-5 h-5" />
            </button>
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
            { value: "50K", label: "Starting Credits" },
            { value: "∞", label: "Race Strategies" },
            { value: "46", label: "Max Driver Age" },
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
                desc: "Name your driver, allocate 200 stat points. Choose livery colors and car number.",
              },
              {
                step: "02",
                title: "Build Your Team",
                desc: "Hire staff, manage aging drivers, run training programs. Attract sponsors.",
              },
              {
                step: "03",
                title: "Race in iRacing",
                desc: "Your AI drivers compete in real iRacing simulations. Real physics, real results.",
              },
              {
                step: "04",
                title: "Grow Your Empire",
                desc: "Earn credits, level up, sign bigger sponsors. Chase the championship.",
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
                Start with 50,000 credits. Create your first driver.
                Build a team. Chase the championship. Your motorsport
                empire starts here.
              </p>
              <button
                onClick={handleGetStarted}
                disabled={loading}
                className="btn-primary text-base px-10 py-4 inline-flex items-center gap-2"
              >
                {user ? "Go to Dashboard" : "Sign Up Free"}
                <ChevronRight className="w-5 h-5" />
              </button>
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
