"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import type { Player, Driver } from "@/lib/types";
import { Shield, Users, Car, Wallet, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AdminDashboard() {
  const { user, isSuperAdmin, loading: authLoading } = useAuth();
  const router = useRouter();

  const [players, setPlayers] = useState<Player[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !isSuperAdmin) {
      router.push("/");
    }
  }, [authLoading, isSuperAdmin, router]);

  useEffect(() => {
    if (!isSuperAdmin) return;

    const fetchAdminData = async () => {
      try {
        const [playersSnap, driversSnap] = await Promise.all([
          getDocs(query(collection(db, "players"), orderBy("createdAt", "desc"), limit(100))),
          getDocs(query(collection(db, "drivers"), orderBy("createdAt", "desc"), limit(100)))
        ]);

        setPlayers(playersSnap.docs.map(d => ({ id: d.id, ...d.data() } as Player)));
        setDrivers(driversSnap.docs.map(d => ({ id: d.id, ...d.data() } as Driver)));
      } catch (err) {
        console.error("Failed to load admin data:", err);
      } finally {
        setDataLoading(false);
      }
    };

    fetchAdminData();
  }, [isSuperAdmin]);

  if (authLoading || (isSuperAdmin && dataLoading)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
      </div>
    );
  }

  if (!isSuperAdmin) return null;

  const totalEconomy = players.reduce((sum, p) => sum + (p.credits || 0), 0);

  return (
    <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Shield className="w-8 h-8 text-purple-500" />
          <h1 className="text-2xl font-bold font-display tracking-wide">Superadmin Control</h1>
        </div>
        <Link href="/dashboard" className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors">
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5">
          <div className="flex items-center gap-3 text-neutral-400 mb-2 font-mono text-xs tracking-wider uppercase">
            <Users size={16} /> Total Users
          </div>
          <div className="text-3xl font-bold font-display">{players.length}</div>
        </div>
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5">
          <div className="flex items-center gap-3 text-neutral-400 mb-2 font-mono text-xs tracking-wider uppercase">
            <Car size={16} /> Active Drivers
          </div>
          <div className="text-3xl font-bold font-display">{drivers.length}</div>
        </div>
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 border-t-4 border-t-green-500">
          <div className="flex items-center gap-3 text-neutral-400 mb-2 font-mono text-xs tracking-wider uppercase">
            <Wallet size={16} /> Global Economy
          </div>
          <div className="text-3xl font-bold font-display text-green-400">${totalEconomy.toLocaleString()}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Players List */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden flex flex-col">
          <div className="p-4 border-b border-neutral-800 bg-neutral-900/50">
            <h2 className="font-bold tracking-wide font-display">Recent Players</h2>
          </div>
          <div className="flex-1 overflow-y-auto p-2" style={{ maxHeight: '400px' }}>
            <table className="w-full text-sm text-left">
              <thead className="text-[10px] uppercase tracking-wider text-neutral-500">
                <tr>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Role</th>
                  <th className="px-4 py-2 text-right">Wallet</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/50">
                {players.map(p => (
                  <tr key={p.uid} className="hover:bg-neutral-800/30 transition-colors">
                    <td className="px-4 py-3 font-medium">
                      {p.displayName}
                      <div className="text-xs text-neutral-500">{p.email}</div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        p.role === 'superadmin' ? 'bg-purple-500/10 text-purple-400' : 'bg-neutral-800 text-neutral-400'
                      }`}>
                        {p.role}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-green-400 font-mono">
                      ${p.credits?.toLocaleString() || 0}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Drivers List */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden flex flex-col">
          <div className="p-4 border-b border-neutral-800 bg-neutral-900/50">
            <h2 className="font-bold tracking-wide font-display">Recent Drivers</h2>
          </div>
          <div className="flex-1 overflow-y-auto p-2" style={{ maxHeight: '400px' }}>
            <table className="w-full text-sm text-left">
              <thead className="text-[10px] uppercase tracking-wider text-neutral-500">
                <tr>
                  <th className="px-4 py-2">Driver</th>
                  <th className="px-4 py-2">Owner (Player)</th>
                  <th className="px-4 py-2 text-right">OVR</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/50">
                {drivers.map(d => {
                  const owner = players.find(p => p.uid === d.playerId);
                  const ovr = Math.round(
                    ((d.stats.driverSkill || 0) + 
                    (d.stats.driverAggression || 0) + 
                    (d.stats.driverOptimism || 0) + 
                    (d.stats.driverSmoothness || 0) + 
                    (d.stats.pitCrewSkill || 0) + 
                    (d.stats.strategyRiskiness || 0)) / 6
                  );
                  return (
                    <tr key={d.id} className="hover:bg-neutral-800/30 transition-colors">
                      <td className="px-4 py-3 font-medium">
                        {d.name}
                        <div className="text-xs text-neutral-500">{d.age} yo</div>
                      </td>
                      <td className="px-4 py-3 text-xs text-neutral-400">
                        {owner?.displayName || 'Unknown'}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 font-bold font-mono">
                          {ovr}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
