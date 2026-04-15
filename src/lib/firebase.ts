import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCPGGHvDaZ3ymeQ0VE8EvMZLqD8cck48qI",
  authDomain: "gridpass.firebaseapp.com",
  databaseURL: "https://gridpass-default-rtdb.firebaseio.com",
  projectId: "gridpass",
  storageBucket: "gridpass.firebasestorage.app",
  messagingSenderId: "195906971027",
  appId: "1:195906971027:web:472523aa3ecc34a98b3466",
  measurementId: "G-MBP43RQ0JZ",
};

// Initialize Firebase (singleton)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Use the separate 'airacing' Firestore database
const db = getFirestore(app, "airacing");

// Auth
const auth = getAuth(app);

// Storage (airacing bucket)
const storage = getStorage(app, "gs://airacing");

export { app, db, auth, storage };
