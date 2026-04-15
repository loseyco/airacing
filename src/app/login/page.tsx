"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Flag, ArrowLeft, User as UserIcon } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";

export default function LoginPage() {
  const { user, signInWithGoogle, signInWithEmail } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // If already logged in, redirect to dashboard
  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await signInWithEmail(email, password);
      // Wait for useEffect redirect
    } catch (err: any) {
      setError(err.message || "An error occurred during authentication.");
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setIsLoading(true);
    try {
      await signInWithGoogle();
      // Wait for useEffect redirect
    } catch (err: any) {
      setError("Failed to sign in with Google.");
      setIsLoading(false);
    }
  };

  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-[var(--color-text-muted)] animate-pulse">Redirecting...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col pt-12">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse,rgba(255,62,62,0.1),transparent_60%)]" />
      </div>

      <div className="relative z-10 w-full max-w-md mx-auto px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        {/* Logo */}
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ff3e3e] to-[#ff8800] flex items-center justify-center mb-4 shadow-lg shadow-red-900/20">
            <Flag className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-black" style={{ fontFamily: "var(--font-display)" }}>
            AI Racing
          </h1>
          <p className="text-[var(--color-text-secondary)] text-center mt-2">
            Sign in or register an account instantly.
          </p>
        </div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-8 shadow-2xl relative"
        >
          <button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full bg-white text-black hover:bg-neutral-200 py-3 rounded-xl font-bold flex items-center justify-center gap-3 transition-colors disabled:opacity-50"
          >
            <UserIcon className="w-5 h-5" />
            Sign in with Google
          </button>

          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-[var(--color-border)]" />
            <span className="px-4 text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)]">
              or
            </span>
            <div className="flex-1 h-px bg-[var(--color-border)]" />
          </div>

          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
                className="w-full bg-[var(--color-bg-card-hover)] border border-[var(--color-border)] rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-racing-red)] transition-colors"
                placeholder="racer@example.com"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                className="w-full bg-[var(--color-bg-card-hover)] border border-[var(--color-border)] rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-racing-red)] transition-colors"
                placeholder="••••••••"
              />
              <p className="text-[10px] text-[var(--color-text-muted)] mt-2 italic px-1">
                If the email isn't registered yet, we'll create an account for you with this password.
              </p>
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-[rgba(255,62,62,0.1)] border border-[#ff3e3e33] text-[var(--color-racing-red)] text-sm text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={!email || !password || isLoading}
              className="w-full btn-primary py-3 flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
            >
              {isLoading ? "Signing in..." : "Continue with Email"}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
