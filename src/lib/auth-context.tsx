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
  GoogleAuthProvider,
  signOut as firebaseSignOut,
} from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { STARTING_CREDITS } from "@/lib/types";
import type { Player } from "@/lib/types";

interface AuthContextType {
  user: User | null;
  player: Player | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  player: null,
  loading: true,
  signInWithGoogle: async () => {},
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [player, setPlayer] = useState<Player | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);

      if (firebaseUser) {
        // Check/create player profile in Firestore
        const playerRef = doc(db, "players", firebaseUser.uid);
        const playerSnap = await getDoc(playerRef);

        if (playerSnap.exists()) {
          setPlayer({
            uid: firebaseUser.uid,
            ...playerSnap.data(),
          } as Player);
        } else {
          // First-time signup — create player profile
          const newPlayer: Omit<Player, "createdAt"> & { createdAt: ReturnType<typeof serverTimestamp> } = {
            uid: firebaseUser.uid,
            displayName: firebaseUser.displayName || "Racer",
            email: firebaseUser.email || "",
            credits: STARTING_CREDITS,
            homeLocation: { lat: 0, lng: 0, name: "" },
            createdAt: serverTimestamp(),
          };
          await setDoc(playerRef, newPlayer);
          setPlayer({
            ...newPlayer,
            createdAt: new Date(),
          } as Player);
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

  const signOut = async () => {
    await firebaseSignOut(auth);
    setPlayer(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, player, loading, signInWithGoogle, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
