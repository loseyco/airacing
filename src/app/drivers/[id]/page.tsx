"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  ArrowLeft, 
  Zap, 
  Timer, 
  TrendingUp, 
  User as UserIcon,
  Sword,
  Shield,
  Dumbbell,
  Target,
  Trophy,
  History,
  MessageSquare,
  ChevronRight,
  Loader2,
  Wallet,
  Users,
  Handshake,
  BarChart3
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc, increment, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { STAT_CONFIG, STAT_KEYS } from "@/lib/types";

export default function DriverDetailPage() {
  const { id } = useParams();
  const { user, player } = useAuth();
  const router = useRouter();
  const [driver, setDriver] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [performingAction, setPerformingAction] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchDriver = async () => {
      const docRef = doc(db, "drivers", id as string);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        setDriver({ id: snap.id, ...snap.data() });
      }
      setLoading(false);
    };
    fetchDriver();
  }, [id]);

  const handleAction = async (actionId: string, cost: number, statImpact: Record<string, number>, label: string) => {
    if (!player || player.credits < cost) {
      alert("Not enough credits!");
      return;
    }
    
    setPerformingAction(actionId);
    try {
      // 1. Deduct credits
      const playerRef = doc(db, "players", user!.uid);
      await updateDoc(playerRef, {
        credits: increment(-cost)
      });

      // 2. Update driver stats
      const driverRef = doc(db, "drivers", id as string);
      const updates: any = {};
      Object.entries(statImpact).forEach(([stat, val]) => {
        updates[`stats.${stat}`] = increment(val);
      });
      await updateDoc(driverRef, updates);

      // 3. Log the activity
      await addDoc(collection(db, "activities"), {
        driverId: id,
        playerId: user!.uid,
        type: "training",
        label,
        cost,
        impact: statImpact,
        timestamp: serverTimestamp()
      });

      // Refresh local state
      const snap = await getDoc(driverRef);
      setDriver({ id: snap.id, ...snap.data() });
      
      // Note: Player credits will auto-refresh via auth-context listener
    } catch (err) {
      console.error("Action failed:", err);
      alert("Something went wrong.");
    } finally {
      setPerformingAction(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[var(--color-racing-red)]" />
      </div>
    );
  }

  if (!driver) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Driver not found</h1>
        <Link href="/dashboard" className="btn-secondary">Back to Dashboard</Link>
      </div>
    );
  }

  const activities: {
    id: string;
    label: string;
    desc: string;
    cost: number;
    icon: any;
    impact: Record<string, number>;
    color: string;
  }[] = [
    {
      id: "sim-honda",
      label: "Honda Pro Simulator",
      desc: "Top-tier pro sim. High gains in Pace and Strategy.",
      cost: 5000,
      icon: Target,
      impact: { pace: 2, strategy: 1 },
      color: "#ff3e3e"
    },
    {
      id: "coach",
      label: "Hire Driving Coach",
      desc: "One-on-one session. Boosts Confidence and Consistency.",
      cost: 3000,
      icon: Dumbbell,
      impact: { confidence: 2, consistency: 1 },
      color: "#3388ff"
    },
    {
      id: "private-test",
      label: "Private Testing",
      desc: "Rent the track. Best for Aggression and Confidence.",
      cost: 8000,
      icon: Zap,
      impact: { aggression: 2, confidence: 1 },
      color: "#ff8800"
    }
  ];

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="border-b border-[var(--color-border)] px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to Garage</span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--color-bg-card)] border border-[var(--color-border)]">
              <Wallet className="w-4 h-4 text-[var(--color-racing-green)]" />
              <span className="font-bold text-[var(--color-racing-green)]" style={{ fontFamily: "var(--font-mono)" }}>
                ${player?.credits.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Info Card */}
          <div className="space-y-6">
            <div className="card p-6 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[var(--color-racing-red)] to-transparent opacity-5 -mr-16 -mt-16 rounded-full" />
              
              <div className="flex items-center gap-4 mb-6 relative">
                 <div className="w-16 h-16 rounded-2xl overflow-hidden flex" style={{ border: `2px solid ${driver.livery.color2}` }}>
                    <div className="flex-1" style={{ backgroundColor: driver.livery.color1 }} />
                    <div className="flex-1" style={{ backgroundColor: driver.livery.color3 }} />
                 </div>
                 <div>
                    <h1 className="text-2xl font-black" style={{ fontFamily: "var(--font-display)" }}>
                      {driver.name}
                    </h1>
                    <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)] font-mono">
                      <span className="text-[var(--color-racing-red)] font-bold">#{driver.livery.carNumber}</span>
                      <span>•</span>
                      <span>Level {driver.level || 1}</span>
                      <span>•</span>
                      <span>Age {driver.age}</span>
                    </div>
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div className="bg-[var(--color-bg-card-hover)] p-3 rounded-xl border border-[var(--color-border)]">
                    <div className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-widest mb-1">Overall</div>
                    <div className="text-2xl font-black text-[var(--color-text-primary)] font-mono">
                      {Math.round(Object.values(driver.stats).reduce((a: any, b: any) => a + b, 0) as number / 6)}
                    </div>
                 </div>
                 <div className="bg-[var(--color-bg-card-hover)] p-3 rounded-xl border border-[var(--color-border)]">
                    <div className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-widest mb-1">Races</div>
                    <div className="text-2xl font-black text-[var(--color-text-primary)] font-mono">0</div>
                 </div>
              </div>
            </div>

            {/* Stats List */}
            <div className="card p-6">
               <h2 className="text-sm font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-6">Current Stats</h2>
               <div className="space-y-5">
                  {STAT_KEYS.map((key) => {
                    const val = driver.stats[key];
                    const config = STAT_CONFIG[key];
                    return (
                      <div key={key}>
                        <div className="flex justify-between items-center mb-1.5">
                           <div className="flex items-center gap-2">
                              <span className="text-sm">{config.icon}</span>
                              <span className="text-xs font-bold">{config.label}</span>
                           </div>
                           <span className="text-sm font-bold font-mono" style={{ color: config.color }}>{val}</span>
                        </div>
                        <div className="h-1.5 bg-[var(--color-border)] rounded-full overflow-hidden">
                           <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${val}%` }}
                              className="h-full rounded-full"
                              style={{ backgroundColor: config.color }}
                           />
                        </div>
                      </div>
                    )
                  })}
               </div>
            </div>
          </div>

          {/* Center: RPG Actions */}
          <div className="lg:col-span-2 space-y-8">
             <section>
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2" style={{ fontFamily: "var(--font-display)" }}>
                  <Zap className="w-5 h-5 text-[var(--color-racing-orange)]" />
                  Development & Training
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   {activities.map((act) => (
                      <button
                        key={act.id}
                        disabled={!!performingAction || (player?.credits || 0) < act.cost}
                        onClick={() => handleAction(act.id, act.cost, act.impact, act.label)}
                        className={`card p-5 text-left transition-all relative group ${
                          (player?.credits || 0) < act.cost ? "opacity-50 grayscale" : "hover:border-[var(--color-text-muted)]"
                        }`}
                      >
                         <div className="flex items-center justify-between mb-4">
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${act.color}15` }}>
                               <act.icon className="w-5 h-5" style={{ color: act.color }} />
                            </div>
                            <div className="text-sm font-bold font-mono text-[var(--color-racing-green)]">
                               ${act.cost.toLocaleString()}
                            </div>
                         </div>
                         <h3 className="font-bold mb-1">{act.label}</h3>
                         <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed mb-4">
                            {act.desc}
                         </p>
                         <div className="flex items-center gap-2">
                            {Object.entries(act.impact).map(([stat, val]) => (
                               <span key={stat} className="text-[10px] px-2 py-0.5 rounded-md bg-[var(--color-border)] text-[var(--color-text-primary)] font-bold uppercase">
                                 {STAT_CONFIG[stat as keyof typeof STAT_CONFIG].label} +{val}
                               </span>
                            ))}
                         </div>
                         {performingAction === act.id && (
                            <div className="absolute inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center rounded-2xl">
                               <Loader2 className="w-6 h-6 animate-spin text-white" />
                            </div>
                         )}
                      </button>
                   ))}
                </div>
             </section>

             {/* Drama/Activity Feed */}
             <section>
                <div className="flex items-center justify-between mb-6">
                   <h2 className="text-xl font-bold flex items-center gap-2" style={{ fontFamily: "var(--font-display)" }}>
                     <MessageSquare className="w-5 h-5 text-[var(--color-racing-blue)]" />
                     Social & Drama Feed
                   </h2>
                </div>
                <div className="space-y-4">
                   <div className="card p-4 bg-[rgba(51,136,255,0.03)] border-dashed border-[var(--color-border)]">
                      <div className="flex gap-3">
                         <div className="w-10 h-10 rounded-full bg-[var(--color-border)] flex items-center justify-center text-lg">🏁</div>
                         <div>
                            <div className="flex items-center gap-2 mb-1">
                               <span className="font-bold text-sm">League News</span>
                               <span className="text-[10px] text-[var(--color-text-muted)]">JUST NOW</span>
                            </div>
                            <p className="text-sm text-[var(--color-text-secondary)]">
                               {driver.name} has just been registered for the seasonal scout program. 
                               Fans are starting to notice the rookie from #{driver.livery.carNumber}.
                            </p>
                         </div>
                      </div>
                   </div>
                </div>
             </section>

             {/* Expanded RPG Tabs (Coming Soon) */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div className="card p-6 border-dashed opacity-75">
                   <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold flex items-center gap-2">
                         <Users className="w-4 h-4 text-[var(--color-racing-green)]" />
                         Staff & Crew
                      </h3>
                      <span className="text-[10px] font-bold text-[var(--color-racing-orange)] uppercase tracking-wider border border-[var(--color-racing-orange)] px-1.5 py-0.5 rounded bg-[var(--color-racing-orange)] bg-opacity-10">Coming Soon</span>
                   </div>
                   <p className="text-xs text-[var(--color-text-secondary)]">
                      Hire pit crew chiefs and race engineers via GridPass to boost team-wide performance.
                   </p>
                </div>
                <div className="card p-6 border-dashed opacity-75">
                   <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold flex items-center gap-2">
                         <Handshake className="w-4 h-4 text-[var(--color-racing-blue)]" />
                         Sponsorships
                      </h3>
                      <span className="text-[10px] font-bold text-[var(--color-racing-orange)] uppercase tracking-wider border border-[var(--color-racing-orange)] px-1.5 py-0.5 rounded bg-[var(--color-racing-orange)] bg-opacity-10">Coming Soon</span>
                   </div>
                   <p className="text-xs text-[var(--color-text-secondary)]">
                      Sign real-world brands to fund your team. Milestone-based contracts required.
                   </p>
                </div>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
}
