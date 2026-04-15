"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Flag, ChevronRight, ChevronLeft, Wrench, 
  Zap, Users, Star, MapPin, User, ArrowRight 
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { db } from "@/lib/firebase";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";

const backgrounds = [
  { id: "mechanic", label: "Mechanic", icon: "🔧", perk: "Lower repair costs (-15%)", desc: "You've got grease under your nails. Built cars since you were 12." },
  { id: "ex-driver", label: "Ex-Driver", icon: "🏁", perk: "Better coaching (+10% stat gains)", desc: "You know what it feels like. Now you pass it on." },
  { id: "business", label: "Business Mind", icon: "💼", perk: "Better sponsor deals (+20% income)", desc: "You see the dollar signs others miss. Motorsport is a business." },
  { id: "superfan", label: "Superfan", icon: "⚡", perk: "Faster fan growth (+25%)", desc: "You know every driver's history. Now you're writing one." },
];

type Step = "manager" | "driver";

export default function OnboardPage() {
  const { user, player } = useAuth();
  const router = useRouter();
  const [step, setStep] = useState<Step>("manager");

  // Manager fields
  const [managerName, setManagerName] = useState(player?.displayName?.split(" ")[0] || "");
  const [managerCity, setManagerCity] = useState("");
  const [managerBg, setManagerBg] = useState("");

  // Driver fields
  const [driverName, setDriverName] = useState("");
  const [driverAge, setDriverAge] = useState("19");
  const [driverCity, setDriverCity] = useState("");
  const [driverRelation, setDriverRelation] = useState("friend");
  const [driverTrait, setDriverTrait] = useState("");

  const traits = [
    { id: "overconfident", icon: "🔥", label: "Overconfident", desc: "Pushes hard, wrecks early, peaks fast. High ceiling, rocky road." },
    { id: "methodical", icon: "🧠", label: "Methodical", desc: "Never cracks under pressure. Slow to develop, incredibly consistent." },
    { id: "crowd-pleaser", icon: "🌟", label: "Crowd Pleaser", desc: "Great with sponsors and fans. Struggles when running behind." },
    { id: "streak-racer", icon: "🎯", label: "Streak Racer", desc: "Hot streaks and cold slumps. High variance, high excitement." },
  ];

  const canProceedManager = managerName.trim() && managerCity.trim() && managerBg;
  const canProceedDriver = driverName.trim() && driverCity.trim() && driverTrait;

  const handleFinish = async () => {
    if (!user || !canProceedDriver) return;
    // Save manager profile + trigger driver creation via dashboard
    try {
      await updateDoc(doc(db, "players", user.uid), {
        managerName,
        managerCity,
        managerBackground: managerBg,
        onboardingComplete: true,
        updatedAt: serverTimestamp(),
      });
    } catch (e) {
      console.error(e);
    }
    // Store driver info in sessionStorage to prefill create form
    sessionStorage.setItem("pendingDriver", JSON.stringify({
      name: driverName, age: parseInt(driverAge), city: driverCity,
      relation: driverRelation, trait: driverTrait,
    }));
    router.push("/drivers/create?fromOnboard=true");
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <nav className="border-b border-[var(--color-border)] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#ff3e3e] to-[#ff8800] flex items-center justify-center">
            <Flag className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold" style={{ fontFamily: "var(--font-display)" }}>AI Racing</span>
        </div>
        <div className="flex items-center gap-3">
          <div className={`h-1.5 w-16 rounded-full transition-colors ${step === "manager" ? "bg-[var(--color-racing-red)]" : "bg-[var(--color-racing-green)]"}`} />
          <div className={`h-1.5 w-16 rounded-full transition-colors ${step === "driver" ? "bg-[var(--color-racing-red)]" : "bg-[var(--color-border)]"}`} />
        </div>
      </nav>

      <main className="flex-1 flex items-start justify-center px-6 py-12">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait">

            {/* ─── STEP 1: Manager ─── */}
            {step === "manager" && (
              <motion.div key="manager" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <div className="mb-10">
                  <div className="text-sm text-[var(--color-racing-red)] font-bold uppercase tracking-widest mb-2">Step 1 of 2</div>
                  <h1 className="text-4xl font-black mb-3" style={{ fontFamily: "var(--font-display)" }}>
                    Who are you?
                  </h1>
                  <p className="text-[var(--color-text-secondary)]">
                    You're the one behind the scenes. The crew chief. The believer. Tell us about yourself.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] mb-2">Your First Name</label>
                      <input
                        className="w-full bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl px-4 py-3 text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-racing-red)] transition-colors"
                        placeholder="e.g. Jake"
                        value={managerName}
                        onChange={e => setManagerName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] mb-2">Your Hometown</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" />
                        <input
                          className="w-full bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl pl-10 pr-4 py-3 text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-racing-red)] transition-colors"
                          placeholder="e.g. Monmouth, IL"
                          value={managerCity}
                          onChange={e => setManagerCity(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] mb-3">Your Background</label>
                    <div className="grid grid-cols-2 gap-3">
                      {backgrounds.map(bg => (
                        <button
                          key={bg.id}
                          onClick={() => setManagerBg(bg.id)}
                          className={`card p-4 text-left transition-all ${managerBg === bg.id ? "border-[var(--color-racing-red)] bg-[rgba(255,62,62,0.05)]" : "hover:border-[var(--color-text-muted)]"}`}
                        >
                          <div className="text-2xl mb-2">{bg.icon}</div>
                          <div className="font-bold text-sm mb-1">{bg.label}</div>
                          <div className="text-[10px] text-[var(--color-racing-green)] font-bold mb-1">{bg.perk}</div>
                          <div className="text-xs text-[var(--color-text-muted)]">{bg.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    disabled={!canProceedManager}
                    onClick={() => setStep("driver")}
                    className={`w-full btn-primary py-4 flex items-center justify-center gap-2 ${!canProceedManager ? "opacity-40 cursor-not-allowed" : ""}`}
                  >
                    Next: Your Driver
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* ─── STEP 2: Driver ─── */}
            {step === "driver" && (
              <motion.div key="driver" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                <div className="mb-10">
                  <div className="text-sm text-[var(--color-racing-red)] font-bold uppercase tracking-widest mb-2">Step 2 of 2</div>
                  <h1 className="text-4xl font-black mb-3" style={{ fontFamily: "var(--font-display)" }}>
                    Who's your driver?
                  </h1>
                  <p className="text-[var(--color-text-secondary)]">
                    Your friend. Your son. Your cousin. The one with the talent and the nerve —
                    and no idea what they're getting into.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] mb-2">Driver's Name</label>
                      <input
                        className="w-full bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl px-4 py-3 text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-racing-red)] transition-colors"
                        placeholder="e.g. Tyler Losey"
                        value={driverName}
                        onChange={e => setDriverName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] mb-2">Age</label>
                      <input
                        type="number"
                        min={16} max={30}
                        className="w-full bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl px-4 py-3 text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-racing-red)] transition-colors"
                        value={driverAge}
                        onChange={e => setDriverAge(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] mb-2">Their Hometown</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" />
                        <input
                          className="w-full bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl pl-10 pr-4 py-3 text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-racing-red)] transition-colors"
                          placeholder="e.g. Galesburg, IL"
                          value={driverCity}
                          onChange={e => setDriverCity(e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] mb-2">Your Relationship</label>
                      <select
                        className="w-full bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl px-4 py-3 text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-racing-red)] transition-colors"
                        value={driverRelation}
                        onChange={e => setDriverRelation(e.target.value)}
                      >
                        <option value="friend">Best Friend</option>
                        <option value="son">Son</option>
                        <option value="daughter">Daughter</option>
                        <option value="cousin">Cousin</option>
                        <option value="sibling">Brother / Sister</option>
                        <option value="partner">Partner</option>
                        <option value="discovery">Someone I Discovered</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] mb-3">Personality Trait</label>
                    <div className="grid grid-cols-2 gap-3">
                      {traits.map(t => (
                        <button
                          key={t.id}
                          onClick={() => setDriverTrait(t.id)}
                          className={`card p-4 text-left transition-all ${driverTrait === t.id ? "border-[var(--color-racing-red)] bg-[rgba(255,62,62,0.05)]" : "hover:border-[var(--color-text-muted)]"}`}
                        >
                          <div className="text-2xl mb-2">{t.icon}</div>
                          <div className="font-bold text-sm mb-1">{t.label}</div>
                          <div className="text-xs text-[var(--color-text-muted)]">{t.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button onClick={() => setStep("manager")} className="btn-secondary flex items-center gap-2 px-6">
                      <ChevronLeft className="w-4 h-4" /> Back
                    </button>
                    <button
                      disabled={!canProceedDriver}
                      onClick={handleFinish}
                      className={`flex-1 btn-primary py-4 flex items-center justify-center gap-2 ${!canProceedDriver ? "opacity-40 cursor-not-allowed" : ""}`}
                    >
                      Let's Go Racing
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
