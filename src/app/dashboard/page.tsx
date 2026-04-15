"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { STAT_CONFIG } from "@/lib/types";
import {
  Flag,
  Gauge,
  Trophy,
  Wallet,
  Plus,
  Calendar,
  TrendingUp,
  Clock,
  ChevronRight,
  Users,
  LogOut,
  Loader2,
} from "lucide-react";

export default function DashboardPage() {
  const { user, player, loading, signOut } = useAuth();
  const router = useRouter();

  const [drivers, setDrivers] = useState<any[]>([]);
  const [loadingDrivers, setLoadingDrivers] = useState(true);

  // Redirect to landing if not logged in
  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [loading, user, router]);

  // Fetch Drivers
  useEffect(() => {
    if (!user) return;
    const fetchDrivers = async () => {
      try {
        const q = query(collection(db, "drivers"), where("playerId", "==", user.uid));
        const snapshot = await getDocs(q);
        const fetched = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDrivers(fetched);
      } catch (err) {
        console.error("Failed to load drivers:", err);
      } finally {
        setLoadingDrivers(false);
      }
    };
    fetchDrivers();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-[var(--color-racing-red)] mx-auto mb-4" />
          <p className="text-[var(--color-text-secondary)]">Loading your garage...</p>
        </div>
      </div>
    );
  }

  if (!user || !player) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen">
      {/* Top Nav */}
      <nav className="border-b border-[var(--color-border)] px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#ff3e3e] to-[#ff8800] flex items-center justify-center">
              <Flag className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold" style={{ fontFamily: "var(--font-display)" }}>
              AI Racing
            </span>
          </Link>
          <div className="flex items-center gap-6 text-sm">
            <Link href="/series" className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">
              Series
            </Link>
            <Link href="/standings" className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">
              Standings
            </Link>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--color-bg-card)] border border-[var(--color-border)]">
              <Wallet className="w-4 h-4 text-[var(--color-racing-green)]" />
              <span className="font-bold text-[var(--color-racing-green)]" style={{ fontFamily: "var(--font-mono)" }}>
                ${player.credits.toLocaleString()}
              </span>
            </div>
            <button
              onClick={signOut}
              className="p-2 rounded-lg border border-[var(--color-border)] hover:border-[var(--color-text-muted)] transition-colors"
              title="Sign out"
            >
              <LogOut className="w-4 h-4 text-[var(--color-text-secondary)]" />
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-black" style={{ fontFamily: "var(--font-display)" }}>
            Welcome back,{" "}
            <span className="bg-gradient-to-r from-[#ff3e3e] to-[#ff8800] bg-clip-text text-transparent">
              {player.displayName}
            </span>
          </h1>
          <p className="text-[var(--color-text-secondary)] mt-1">
            Manage your drivers, enter races, and build your empire.
          </p>
        </motion.div>

        {/* Quick Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Wallet, label: "Credits", value: `$${player.credits.toLocaleString()}`, color: "#00cc66" },
            { icon: Users, label: "Drivers", value: loadingDrivers ? "—" : drivers.length.toString(), color: "#3388ff" },
            { icon: Trophy, label: "Best Finish", value: "—", color: "#ffcc00" },
            { icon: TrendingUp, label: "Season Rank", value: "—", color: "#ff8800" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="card p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <stat.icon className="w-4 h-4" style={{ color: stat.color }} />
                <span className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider">
                  {stat.label}
                </span>
              </div>
              <div className="text-2xl font-black" style={{ fontFamily: "var(--font-display)", color: stat.color }}>
                {stat.value}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* My Drivers */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
                  My Drivers
                </h2>
                <Link href="/drivers/create" className="btn-primary text-xs px-4 py-2 flex items-center gap-1.5">
                  <Plus className="w-3.5 h-3.5" />
                  New Driver
                </Link>
              </div>

              {loadingDrivers ? (
                <div className="card p-12 flex justify-center items-center">
                  <Loader2 className="w-6 h-6 animate-spin text-[var(--color-racing-red)]" />
                </div>
              ) : drivers.length === 0 ? (
                <div className="card p-12 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-[rgba(255,62,62,0.1)] flex items-center justify-center mx-auto mb-4">
                    <Gauge className="w-8 h-8 text-[var(--color-racing-red)]" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">No Drivers Yet</h3>
                  <p className="text-sm text-[var(--color-text-secondary)] mb-6 max-w-sm mx-auto">
                    Create your first driver to start racing. You have 200 stat
                    points to allocate across Pace, Aggression, Confidence,
                    Consistency, Pit Crew, and Strategy.
                  </p>
                  <Link href="/drivers/create" className="btn-primary inline-flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Create Your First Driver
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {drivers.map((driver) => {
                    // Quick stat summary for driver card
                    const topStats = Object.entries(driver.stats as Record<string, number>)
                      .sort((a, b) => b[1] - a[1])
                      .slice(0, 3);

                    return (
                      <div key={driver.id} className="card p-5 group flex flex-col h-full hover:border-[var(--color-text-muted)] transition-colors">
                        <div className="flex justify-between items-start mb-4">
                           <div className="flex items-center gap-3">
                             <div className="w-[50px] h-[50px] rounded-lg overflow-hidden flex" style={{ border: `2px solid ${driver.livery.color2}` }}>
                               <div className="flex-1" style={{ backgroundColor: driver.livery.color1 }} />
                               <div className="flex-1" style={{ backgroundColor: driver.livery.color3 }} />
                               <div className="absolute pl-3 font-black text-xl text-white" style={{ fontFamily: "var(--font-display)", textShadow: "0 1px 3px rgba(0,0,0,0.5)"}}>
                                 {driver.livery.carNumber}
                               </div>
                             </div>
                             <div>
                               <div className="font-bold leading-tight">{driver.name}</div>
                               <div className="text-xs text-[var(--color-text-secondary)] uppercase tracking-wider mt-0.5">
                                 Age {driver.age} • OVR {Math.round(driver.totalStatPoints / 6)}
                               </div>
                             </div>
                           </div>
                        </div>

                        <div className="space-y-2 mt-auto">
                           {topStats.map(([key, val]) => {
                             const config = STAT_CONFIG[key as keyof typeof STAT_CONFIG];
                             return (
                               <div key={key} className="flex items-center justify-between text-xs">
                                 <div className="flex items-center gap-1.5 text-[var(--color-text-secondary)]">
                                   <span>{config.icon}</span>
                                   <span>{config.label}</span>
                                 </div>
                                 <div className="flex items-center gap-2 w-1/2">
                                    <div className="flex-1 h-1.5 rounded-full bg-[var(--color-border)] overflow-hidden">
                                       <div className="h-full rounded-full" style={{ width: `${val}%`, backgroundColor: config.color }} />
                                    </div>
                                    <span className="w-5 text-right font-mono text-[var(--color-text-primary)] font-bold">{val}</span>
                                 </div>
                               </div>
                             )
                           })}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Recent Results — Empty State */}
            <div>
              <h2 className="text-xl font-bold mb-4" style={{ fontFamily: "var(--font-display)" }}>
                Recent Results
              </h2>
              <div className="card p-8 text-center">
                <Trophy className="w-8 h-8 text-[var(--color-text-muted)] mx-auto mb-3" />
                <p className="text-sm text-[var(--color-text-secondary)]">
                  No races completed yet. Create a driver and enter your first race!
                </p>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Player Card */}
            <div className="card p-5">
              <div className="flex items-center gap-3 mb-4">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={player.displayName}
                    className="w-10 h-10 rounded-full border-2 border-[var(--color-border)]"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ff3e3e] to-[#ff8800] flex items-center justify-center text-sm font-bold">
                    {player.displayName.charAt(0)}
                  </div>
                )}
                <div>
                  <div className="font-bold text-sm">{player.displayName}</div>
                  <div className="text-xs text-[var(--color-text-muted)]">{player.email}</div>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[var(--color-text-secondary)]">Credits</span>
                  <span className="font-bold text-[var(--color-racing-green)]" style={{ fontFamily: "var(--font-mono)" }}>
                    ${player.credits.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--color-text-secondary)]">Drivers</span>
                  <span className="font-bold">{loadingDrivers ? "—" : drivers.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--color-text-secondary)]">Races</span>
                  <span className="font-bold">0</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card p-5">
              <h3 className="font-bold mb-3">Quick Actions</h3>
              <div className="space-y-2">
                <Link href="/drivers/create" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[var(--color-bg-card-hover)] transition-colors">
                  <Plus className="w-4 h-4 text-[var(--color-racing-green)]" />
                  <span className="text-sm">New Driver</span>
                </Link>
                <Link href="/series" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[var(--color-bg-card-hover)] transition-colors">
                  <Calendar className="w-4 h-4 text-[var(--color-racing-blue)]" />
                  <span className="text-sm">Browse Series</span>
                </Link>
                <Link href="/standings" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[var(--color-bg-card-hover)] transition-colors">
                  <Trophy className="w-4 h-4 text-[var(--color-racing-yellow)]" />
                  <span className="text-sm">Standings</span>
                </Link>
              </div>
            </div>

            {/* Getting Started Checklist */}
            <div className="card p-5">
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4 text-[var(--color-racing-orange)]" />
                Getting Started
              </h3>
              <div className="space-y-2">
                {[
                  { label: "Create account", done: true },
                  { label: "Create your first driver", done: false },
                  { label: "Enter a race", done: false },
                  { label: "Complete a race", done: false },
                  { label: "Hire your first staff member", done: false },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      item.done
                        ? "border-[var(--color-racing-green)] bg-[var(--color-racing-green)]"
                        : "border-[var(--color-border)]"
                    }`}>
                      {item.done && (
                        <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                        </svg>
                      )}
                    </div>
                    <span className={item.done ? "text-[var(--color-text-muted)] line-through" : "text-[var(--color-text-secondary)]"}>
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
