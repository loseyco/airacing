"use client";

import { useState, useCallback, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { db } from "@/lib/firebase";
import { useAuth } from "@/lib/auth-context";
import {
  ArrowLeft,
  ChevronRight,
  RotateCcw,
  Minus,
  Plus,
  Check,
} from "lucide-react";
import {
  DriverStats,
  STAT_KEYS,
  STAT_CONFIG,
  NEW_DRIVER_STAT_BUDGET,
} from "@/lib/types";

const DEFAULT_STATS: DriverStats = {
  pace: 33,
  aggression: 33,
  confidence: 33,
  consistency: 34,
  pitCrew: 33,
  strategy: 34,
};

function CreateDriverInner() {
  const { user, player } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const fromOnboard = searchParams.get("fromOnboard") === "true";

  const [name, setName] = useState("");
  const [age, setAge] = useState(21);
  const [carNumber, setCarNumber] = useState("");
  const [relation, setRelation] = useState("");
  const [trait, setTrait] = useState("");
  const [stats, setStats] = useState<DriverStats>({ ...DEFAULT_STATS });
  const [colors, setColors] = useState({
    color1: "#ff3e3e",
    color2: "#1a1a28",
    color3: "#ffffff",
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Pre-fill from onboarding sessionStorage
  useEffect(() => {
    if (fromOnboard) {
      try {
        const pending = JSON.parse(sessionStorage.getItem("pendingDriver") || "{}");
        if (pending.name) setName(pending.name);
        if (pending.age) setAge(pending.age);
        if (pending.relation) setRelation(pending.relation);
        if (pending.trait) setTrait(pending.trait);
        sessionStorage.removeItem("pendingDriver");
      } catch {}
    }
  }, [fromOnboard]);

  const totalPoints = STAT_KEYS.reduce((sum, key) => sum + stats[key], 0);
  const remaining = NEW_DRIVER_STAT_BUDGET - totalPoints;

  const updateStat = useCallback(
    (key: keyof DriverStats, delta: number) => {
      setStats((prev) => {
        const newVal = prev[key] + delta;
        if (newVal < 1 || newVal > 99) return prev;
        const newTotal =
          STAT_KEYS.reduce((sum, k) => sum + (k === key ? newVal : prev[k]), 0);
        if (newTotal > NEW_DRIVER_STAT_BUDGET) return prev;
        return { ...prev, [key]: newVal };
      });
    },
    []
  );

  const resetStats = () => setStats({ ...DEFAULT_STATS });

  const handleSave = async () => {
    if (!name.trim() || !carNumber.trim() || !user || !player) return;
    setSaving(true);
    
    try {
      const newDriver = {
        playerId: user.uid,
        playerName: player.displayName,
        name: name.trim(),
        age,
        relation: relation || null,
        trait: trait || null,
        stats,
        totalStatPoints: totalPoints,
        level: 1,
        xp: 0,
        races: 0,
        livery: {
          carDesign: "0,0,0,0",
          suitDesign: "0,0,0,0",
          helmetDesign: "0,0,0,0",
          sponsor1: 0,
          sponsor2: 0,
          carNumber: carNumber,
          color1: colors.color1,
          color2: colors.color2,
          color3: colors.color3,
        },
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, "drivers"), newDriver);
      setSaved(true);
      // Redirect to dashboard after short delay
      setTimeout(() => router.push("/dashboard"), 1500);
    } catch (err) {
      console.error("Failed to create driver:", err);
      alert("Failed to save driver. Check console.");
    } finally {
      setSaving(false);
    }
  };

  const isValid = name.trim().length > 0 && carNumber.trim().length > 0 && remaining >= 0;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-[var(--color-border)] px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back</span>
          </Link>
          <h1
            className="text-xl font-bold"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Create Driver
          </h1>
          <div className="w-20" />
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          {saved ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <div className="w-20 h-20 rounded-full bg-[var(--color-racing-green)] bg-opacity-20 flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-[var(--color-racing-green)]" />
              </div>
              <h2
                className="text-3xl font-black mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Driver Created!
              </h2>
              <p className="text-[var(--color-text-secondary)] mb-8">
                {name} #{carNumber} is ready to race.
              </p>
              <div className="flex items-center justify-center gap-4">
                <Link href="/series" className="btn-primary">
                  Enter a Race
                </Link>
                <Link href="/dashboard" className="btn-secondary">
                  Go to Dashboard
                </Link>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              {/* Left Column: Identity */}
              <div className="space-y-6">
                <div className="card p-6">
                  <h2 className="text-lg font-bold mb-4">Driver Identity</h2>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-[var(--color-text-secondary)] mb-1.5">
                        Full Name
                      </label>
                      <input
                        type="text"
                        className="input"
                        placeholder="Max Verstappen Jr."
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-[var(--color-text-secondary)] mb-1.5">
                          Age
                        </label>
                        <input
                          type="number"
                          className="input"
                          min={16}
                          max={65}
                          value={age}
                          onChange={(e) =>
                            setAge(Math.max(16, Math.min(65, parseInt(e.target.value) || 16)))
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-[var(--color-text-secondary)] mb-1.5">
                          Car #
                        </label>
                        <input
                          type="text"
                          className="input"
                          placeholder="17"
                          maxLength={3}
                          value={carNumber}
                          onChange={(e) =>
                            setCarNumber(e.target.value.replace(/\D/g, ""))
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Livery Colors */}
                <div className="card p-6">
                  <h2 className="text-lg font-bold mb-4">Livery Colors</h2>
                  <div className="space-y-3">
                    {(["color1", "color2", "color3"] as const).map((key, i) => (
                      <div key={key} className="flex items-center gap-3">
                        <input
                          type="color"
                          value={colors[key]}
                          onChange={(e) =>
                            setColors((c) => ({ ...c, [key]: e.target.value }))
                          }
                          className="w-10 h-10 rounded-lg border border-[var(--color-border)] cursor-pointer bg-transparent"
                        />
                        <span className="text-sm text-[var(--color-text-secondary)]">
                          {["Primary", "Secondary", "Accent"][i]}
                        </span>
                        <span className="text-xs text-[var(--color-text-muted)] ml-auto font-mono">
                          {colors[key].toUpperCase()}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Mini livery preview */}
                  <div className="mt-4 h-16 rounded-lg overflow-hidden flex">
                    <div
                      className="flex-1"
                      style={{ backgroundColor: colors.color1 }}
                    />
                    <div
                      className="flex-1"
                      style={{ backgroundColor: colors.color2 }}
                    />
                    <div
                      className="w-16 flex items-center justify-center font-black text-lg"
                      style={{
                        backgroundColor: colors.color3,
                        color: colors.color2,
                        fontFamily: "var(--font-display)",
                      }}
                    >
                      {carNumber || "?"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Center Column: Stats */}
              <div className="lg:col-span-2 space-y-6">
                <div className="card p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-lg font-bold">Driver Stats</h2>
                      <p className="text-sm text-[var(--color-text-secondary)]">
                        Allocate {NEW_DRIVER_STAT_BUDGET} points across 6
                        categories
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={resetStats}
                        className="p-2 rounded-lg border border-[var(--color-border)] hover:border-[var(--color-text-muted)] transition-colors"
                        title="Reset stats"
                      >
                        <RotateCcw className="w-4 h-4 text-[var(--color-text-secondary)]" />
                      </button>
                      <div
                        className={`px-4 py-2 rounded-lg font-bold text-sm ${
                          remaining === 0
                            ? "bg-[rgba(0,204,102,0.15)] text-[var(--color-racing-green)]"
                            : remaining < 0
                            ? "bg-[rgba(255,62,62,0.15)] text-[var(--color-racing-red)]"
                            : "bg-[rgba(255,136,0,0.15)] text-[var(--color-racing-orange)]"
                        }`}
                        style={{ fontFamily: "var(--font-mono)" }}
                      >
                        {remaining} pts left
                      </div>
                    </div>
                  </div>

                  <div className="space-y-5">
                    {STAT_KEYS.map((key) => {
                      const config = STAT_CONFIG[key];
                      return (
                        <div key={key}>
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="text-lg">{config.icon}</span>
                              <span className="font-semibold text-sm">
                                {config.label}
                              </span>
                              <span className="text-xs text-[var(--color-text-muted)]">
                                — {config.description}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => updateStat(key, -5)}
                                className="w-7 h-7 rounded-md border border-[var(--color-border)] flex items-center justify-center hover:border-[var(--color-text-muted)] transition-colors"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span
                                className="w-10 text-center font-bold text-lg"
                                style={{
                                  color: config.color,
                                  fontFamily: "var(--font-mono)",
                                }}
                              >
                                {stats[key]}
                              </span>
                              <button
                                onClick={() => updateStat(key, 5)}
                                className="w-7 h-7 rounded-md border border-[var(--color-border)] flex items-center justify-center hover:border-[var(--color-text-muted)] transition-colors"
                                disabled={remaining <= 0}
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                          <div className="stat-bar">
                            <motion.div
                              className="stat-bar-fill"
                              style={{ backgroundColor: config.color }}
                              animate={{ width: `${stats[key]}%` }}
                              transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Save button */}
                <div className="flex justify-end gap-4">
                  <Link href="/dashboard" className="btn-secondary">
                    Cancel
                  </Link>
                  <button
                    onClick={handleSave}
                    disabled={!isValid || saving}
                    className={`btn-primary flex items-center gap-2 ${
                      !isValid || saving ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {saving ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Creating...
                      </>
                    ) : (
                      <>
                        Create Driver
                        <ChevronRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default function CreateDriverPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="text-[var(--color-text-muted)]">Loading...</div></div>}>
      <CreateDriverInner />
    </Suspense>
  );
}

