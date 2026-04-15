"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Flag, ChevronRight, ChevronLeft, MapPin, ArrowRight, Car } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { db } from "@/lib/firebase";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";

// ── Relationship options ────────────────────────────────────────────────────
const relationships = [
  { id: "best-friend", icon: "🤜", label: "Best Friend", startingBudget: 35000, desc: "You pooled your savings. $35,000 to chase a dream." },
  { id: "son",         icon: "👦", label: "Son", startingBudget: 60000, desc: "You dipped into his college fund. $60,000 to make it happen." },
  { id: "daughter",    icon: "👧", label: "Daughter", startingBudget: 60000, desc: "You promised her mother you wouldn't do this. $60,000 budget." },
  { id: "brother",     icon: "🤝", label: "Brother", startingBudget: 40000, desc: "Two brothers, one truck, and $40,000 to your names." },
  { id: "coworker",    icon: "🔧", label: "Coworker", startingBudget: 25000, desc: "He convinced you at lunch. You scrounged exactly $25,000." },
  { id: "discovery",   icon: "⭐", label: "Someone I Discovered", startingBudget: 80000, desc: "You're acting as an investor. $80,000 to get them going." },
  { id: "father",      icon: "👨", label: "Father", startingBudget: 30000, desc: "He retired. You took out a $30,000 loan to get him back out there." },
  { id: "partner",     icon: "❤️", label: "Partner", startingBudget: 50000, desc: "Your combined household savings. An even $50,000." },
];

// ── Manager background options ─────────────────────────────────────────────
const backgrounds = [
  { id: "mechanic",    icon: "🔧", label: "Mechanic",       perk: "Lower repair costs (−15%)",       desc: "You've got grease under your nails. You've been building cars since you were 12." },
  { id: "ex-driver",  icon: "🏁", label: "Ex-Driver",      perk: "Better coaching (+10% stat gains)", desc: "You know what it feels like in the car. Now you pass that on." },
  { id: "business",   icon: "💼", label: "Business Mind",  perk: "Better sponsor deals (+20%)",      desc: "You see the dollars others miss. Motorsport is a business first." },
  { id: "superfan",   icon: "⚡", label: "Superfan",       perk: "Faster fan growth (+25%)",         desc: "You know every driver's name and lap time. Now you're writing history." },
];

// ── Driver personality traits ──────────────────────────────────────────────
const traits = [
  { id: "overconfident",   icon: "🔥", label: "Overconfident",   desc: "Pushes hard, wrecks early, peaks fast. High ceiling. Rocky road." },
  { id: "methodical",      icon: "🧠", label: "Methodical",      desc: "Never cracks under pressure. Slow to develop, incredibly consistent." },
  { id: "crowd-pleaser",   icon: "🌟", label: "Crowd Pleaser",   desc: "Great with sponsors and fans. Struggles when running behind." },
  { id: "streak-racer",    icon: "🎯", label: "Streak Racer",    desc: "Hot streaks and cold slumps. High variance, high excitement." },
];

type Step = "you" | "driver";

export default function OnboardPage() {
  const { user, player } = useAuth();
  const router = useRouter();
  const [step, setStep] = useState<Step>("you");
  const [saving, setSaving] = useState(false);

  // ── Your info ──────────────────────────────────────────────────────────────
  const [managerFirstName, setManagerFirstName] = useState(player?.displayName?.split(" ")[0] || "");
  const [managerLastName, setManagerLastName]   = useState(player?.displayName?.split(" ").slice(1).join(" ") || "");
  const [managerCity, setManagerCity]     = useState("");
  const [relation, setRelation]           = useState("");
  const [managerBg, setManagerBg]         = useState("");

  // ── Driver info ───────────────────────────────────────────────────────────
  const [driverName, setDriverName]   = useState("");
  const [driverAge, setDriverAge]     = useState("19");
  const [driverCity, setDriverCity]   = useState("");
  const [driverTrait, setDriverTrait] = useState("");

  const canProceedYou    = managerFirstName.trim() && managerLastName.trim() && managerCity.trim() && relation && managerBg;
  const canProceedDriver = driverName.trim() && driverCity.trim() && driverTrait;

  const relationLabel = relationships.find(r => r.id === relation)?.label || "your driver";

  const handleFinish = async () => {
    if (!user || !canProceedDriver) return;
    setSaving(true);
    
    // Find the starting economy for this relationship
    const relData = relationships.find(r => r.id === relation);
    const updatedCredits = relData ? relData.startingBudget : 50000;

    try {
      await updateDoc(doc(db, "players", user.uid), {
        managerName: `${managerFirstName.trim()} ${managerLastName.trim()}`,
        managerFirstName: managerFirstName.trim(),
        managerLastName: managerLastName.trim(),
        managerCity,
        managerBackground: managerBg,
        relation,
        credits: updatedCredits,
        onboardingComplete: true,
        updatedAt: serverTimestamp(),
      });
    } catch (e) { console.error(e); }
    sessionStorage.setItem("pendingDriver", JSON.stringify({
      name: driverName, age: parseInt(driverAge), city: driverCity,
      relation, trait: driverTrait, carClass: "mini-stock",
    }));
    router.push("/drivers/create?fromOnboard=true");
  };

  const stepProgress = step === "you" ? 1 : 2;

  return (
    <div className="min-h-screen flex flex-col">
      {/* ── Nav ── */}
      <nav className="border-b border-[var(--color-border)] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#ff3e3e] to-[#ff8800] flex items-center justify-center">
            <Flag className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold" style={{ fontFamily: "var(--font-display)" }}>AI Racing</span>
        </div>
        {/* Progress dots */}
        <div className="flex items-center gap-2">
          {[1, 2].map(n => (
            <div key={n} className={`h-1.5 w-16 rounded-full transition-all duration-300 ${
              n < stepProgress ? "bg-[var(--color-racing-green)]" :
              n === stepProgress ? "bg-[var(--color-racing-red)]" :
              "bg-[var(--color-border)]"
            }`} />
          ))}
        </div>
      </nav>

      <main className="flex-1 flex items-start justify-center px-6 py-12">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait">

            {/* ────────────────── STEP 1: YOU ────────────────── */}
            {step === "you" && (
              <motion.div key="you" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <div className="mb-10">
                  <div className="text-xs text-[var(--color-racing-red)] font-bold uppercase tracking-widest mb-2">Step 1 of 2 · Your Origin</div>
                  <h1 className="text-4xl font-black mb-3" style={{ fontFamily: "var(--font-display)" }}>
                    Who are you?
                  </h1>
                  <p className="text-[var(--color-text-secondary)] leading-relaxed">
                    Every good racing story starts with the person behind the driver.
                    The one who hauls the car, writes the checks, and never gives up before they do.
                  </p>
                </div>

                <div className="space-y-7">
                  {/* Name + Hometown */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] mb-2">First Name</label>
                      <input
                        className="w-full bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-racing-red)] transition-colors"
                        placeholder="e.g. PJ"
                        value={managerFirstName}
                        onChange={e => setManagerFirstName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] mb-2">Last Name / RPG</label>
                      <input
                        className="w-full bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-racing-red)] transition-colors"
                        placeholder="e.g. Losey"
                        value={managerLastName}
                        onChange={e => setManagerLastName(e.target.value)}
                      />
                    </div>
                    <div className="sm:col-span-2 md:col-span-1">
                      <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] mb-2">Your Hometown</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" />
                        <input
                          className="w-full bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-[var(--color-racing-red)] transition-colors"
                          placeholder="e.g. Monmouth, IL"
                          value={managerCity}
                          onChange={e => setManagerCity(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Relationship — the heart of it */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] mb-3">
                      What's your connection to the driver?
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {relationships.map(r => (
                        <button
                          key={r.id}
                          onClick={() => setRelation(r.id)}
                          className={`card p-4 text-left transition-all ${relation === r.id
                            ? "border-[var(--color-racing-red)] bg-[rgba(255,62,62,0.06)]"
                            : "hover:border-[var(--color-text-muted)]"
                          }`}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <span className="text-2xl">{r.icon}</span>
                            <span className="text-[10px] font-bold text-[var(--color-racing-green)] tracking-wider px-2 py-0.5 rounded bg-[var(--color-racing-green)] bg-opacity-10">
                              ${r.startingBudget.toLocaleString()}
                            </span>
                          </div>
                          <div className="font-bold text-sm">{r.label}</div>
                        </button>
                      ))}
                    </div>
                    {relation && (
                      <motion.p initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
                        className="mt-3 text-sm text-[var(--color-text-secondary)] italic pl-1">
                        "{relationships.find(r => r.id === relation)?.desc}"
                      </motion.p>
                    )}
                  </div>

                  {/* Background */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] mb-3">Your Background</label>
                    <div className="grid grid-cols-2 gap-3">
                      {backgrounds.map(bg => (
                        <button
                          key={bg.id}
                          onClick={() => setManagerBg(bg.id)}
                          className={`card p-4 text-left transition-all ${managerBg === bg.id
                            ? "border-[var(--color-racing-red)] bg-[rgba(255,62,62,0.06)]"
                            : "hover:border-[var(--color-text-muted)]"
                          }`}
                        >
                          <div className="text-xl mb-2">{bg.icon}</div>
                          <div className="font-bold text-sm mb-1">{bg.label}</div>
                          <div className="text-[10px] text-[var(--color-racing-green)] font-bold">{bg.perk}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    disabled={!canProceedYou}
                    onClick={() => setStep("driver")}
                    className={`w-full btn-primary py-4 flex items-center justify-center gap-2 ${!canProceedYou ? "opacity-40 cursor-not-allowed" : ""}`}
                  >
                    Now, tell us about {relation ? `your ${relationships.find(r => r.id === relation)?.label.toLowerCase()}` : "your driver"}
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* ────────────────── STEP 2: DRIVER ────────────────── */}
            {step === "driver" && (
              <motion.div key="driver" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                <div className="mb-10">
                  <div className="text-xs text-[var(--color-racing-red)] font-bold uppercase tracking-widest mb-2">Step 2 of 2 · Your Driver</div>
                  <h1 className="text-4xl font-black mb-3" style={{ fontFamily: "var(--font-display)" }}>
                    Your {relationLabel}.
                  </h1>
                  <p className="text-[var(--color-text-secondary)] leading-relaxed">
                    The one with the talent. The one you believe in.
                    Give them a name, a hometown, and tell us what drives them.
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Name + Age */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] mb-2">Driver's Name</label>
                      <input
                        className="w-full bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-racing-red)] transition-colors"
                        placeholder="e.g. Tyler Losey"
                        value={driverName}
                        onChange={e => setDriverName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] mb-2">Age</label>
                      <input
                        type="number" min={16} max={40}
                        className="w-full bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-racing-red)] transition-colors"
                        value={driverAge}
                        onChange={e => setDriverAge(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Hometown */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] mb-2">Their Hometown</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" />
                      <input
                        className="w-full bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-[var(--color-racing-red)] transition-colors"
                        placeholder="e.g. Galesburg, IL"
                        value={driverCity}
                        onChange={e => setDriverCity(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Personality */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] mb-3">How do they race?</label>
                    <div className="grid grid-cols-2 gap-3">
                      {traits.map(t => (
                        <button
                          key={t.id}
                          onClick={() => setDriverTrait(t.id)}
                          className={`card p-4 text-left transition-all ${driverTrait === t.id
                            ? "border-[var(--color-racing-red)] bg-[rgba(255,62,62,0.06)]"
                            : "hover:border-[var(--color-text-muted)]"
                          }`}
                        >
                          <div className="text-xl mb-2">{t.icon}</div>
                          <div className="font-bold text-sm mb-1">{t.label}</div>
                          <div className="text-xs text-[var(--color-text-muted)]">{t.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Starter car — locked in */}
                  <div className="card p-4 border-[var(--color-border)] bg-[var(--color-bg-card-hover)]">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[rgba(255,136,0,0.1)] flex items-center justify-center">
                        <Car className="w-5 h-5 text-[var(--color-racing-orange)]" />
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-sm">Starting Class: iRacing Mini Stock</div>
                        <div className="text-xs text-[var(--color-text-muted)] mt-1">
                          They bought a broken-down Mini Stock off Facebook Marketplace. It's sitting in the driveway. Now they need your help to get it to the track.
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-[var(--color-racing-green)] border border-[var(--color-racing-green)] px-2 py-0.5 rounded">LOCKED IN</span>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button onClick={() => setStep("you")} className="btn-secondary flex items-center gap-2 px-6">
                      <ChevronLeft className="w-4 h-4" /> Back
                    </button>
                    <button
                      disabled={!canProceedDriver || saving}
                      onClick={handleFinish}
                      className={`flex-1 btn-primary py-4 flex items-center justify-center gap-2 ${!canProceedDriver || saving ? "opacity-40 cursor-not-allowed" : ""}`}
                    >
                      {saving ? "Starting your story..." : "Let's Go Racing"}
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
