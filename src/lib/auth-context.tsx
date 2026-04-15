"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  User,
  onAuthStateChanged,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
} from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { STARTING_CREDITS } from "@/lib/types";
import { getRoleForEmail } from "@/lib/admin";
import type { Player } from "@/lib/types";

interface AuthContextType {
  user: User | null;
  player: Player | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isAdmin: boolean;
  isSuperAdmin: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  player: null,
  loading: true,
  signInWithGoogle: async () => {},
  signInWithEmail: async () => {},
  signOut: async () => {},
  isAdmin: false,
  isSuperAdmin: false,
});

async function ensurePlayerProfile(firebaseUser: User): Promise<Player> {
  const playerRef = doc(db, "players", firebaseUser.uid);
  const playerSnap = await getDoc(playerRef);

  if (playerSnap.exists()) {
    return { uid: firebaseUser.uid, ...playerSnap.data() } as Player;
  }

  // First-time signup — create player profile
  const role = getRoleForEmail(firebaseUser.email || "");
  const newPlayer = {
    uid: firebaseUser.uid,
    displayName: firebaseUser.displayName || firebaseUser.email?.split("@")[0] || "Racer",
    email: firebaseUser.email || "",
    credits: STARTING_CREDITS,
    role,
    homeLocation: { lat: 0, lng: 0, name: "" },
    createdAt: serverTimestamp(),
  };
  await setDoc(playerRef, newPlayer);
  return { ...newPlayer, createdAt: new Date() } as Player;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [player, setPlayer] = useState<Player | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);

      if (firebaseUser) {
        try {
          const profile = await ensurePlayerProfile(firebaseUser);
          setPlayer(profile);
        } catch (err) {
          console.error("Failed to load player profile:", err);
          setPlayer(null);
        }
      } else {
        setPlayer(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const signInWithEmail = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch {
      // If account doesn't exist, create it
      await createUserWithEmailAndPassword(auth, email, password);
    }
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
    setPlayer(null);
  };

  const isAdmin = player?.role === "admin" || player?.role === "superadmin";
  const isSuperAdmin = player?.role === "superadmin";

  return (
    <AuthContext.Provider
      value={{ user, player, loading, signInWithGoogle, signInWithEmail, signOut, isAdmin, isSuperAdmin }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
