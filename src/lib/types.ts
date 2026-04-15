// ==========================================
// AI Racing Manager — Core Types
// ==========================================

/** Driver stats that map 1:1 to iRacing AI parameters */
export interface DriverStats {
  pace: number;         // iRacing: driverSkill (0-100)
  aggression: number;   // iRacing: driverAggression (0-100)
  confidence: number;   // iRacing: driverOptimism (0-100)
  consistency: number;  // iRacing: driverSmoothness (0-100)
  pitCrew: number;      // iRacing: pitCrewSkill (0-100)
  strategy: number;     // iRacing: strategyRiskiness (0-100)
}

/** Driver livery configuration */
export interface DriverLivery {
  carDesign: string;      // "pattern,color1,color2,color3"
  suitDesign: string;
  helmetDesign: string;
  sponsor1: number;
  sponsor2: number;
  carNumber: string;
  color1: string;
  color2: string;
  color3: string;
}

/** A player's racing driver */
export interface Driver {
  id: string;
  playerId: string;
  name: string;
  age: number;
  stats: DriverStats;
  totalStatPoints: number;
  level: number;
  xp: number;
  livery: DriverLivery;
  createdAt: Date;
}

/** Player profile */
export interface Player {
  uid: string;
  displayName: string;
  email: string;
  credits: number;
  role: "player" | "admin" | "superadmin";
  homeLocation: {
    lat: number;
    lng: number;
    name: string;
  };
  createdAt: Date;
}

/** Track information (extracted from iRacing) */
export interface Track {
  trackId: number;
  name: string;
  configName: string;
  location: string;
  lat: number;
  lng: number;
  category: "oval" | "road" | "dirt_oval" | "dirt_road" | "rallycross";
  lengthMiles: number;
  corners: number;
  banking: string;
  isOval: boolean;
  isDirt: boolean;
  maxCars: number;
}

/** A race event within a season */
export interface RaceEvent {
  eventId: string;
  trackId: number;
  trackName: string;
  raceLaps: number;
  status: "upcoming" | "in_progress" | "completed";
  results?: RaceResult[];
}

/** Season / series */
export interface Season {
  id: string;
  name: string;
  carClassId: number;
  carId: number;
  minSkill: number;
  maxSkill: number;
  maxDrivers: number;
  events: RaceEvent[];
  pointsSystemId: number;
  status: "upcoming" | "active" | "completed";
  coverImage?: string;
}

/** Individual race entry */
export interface RaceEntry {
  playerId: string;
  driverId: string;
  driverName: string;
  entryFee: number;
  travelCost: number;
}

/** Post-race result for a single driver */
export interface RaceResult {
  driverId: string;
  driverName: string;
  carNumber: string;
  position: number;
  startingPosition: number;
  incidents: number;
  bestLapTime: number;
  lapsComplete: number;
  lapsDriven: number;
  lapsLed: number;
  interval: number;
  champPoints: number;
  reasonOut: string;
  creditsEarned: number;
  creditsPenalty: number;
  xpEarned: number;
}

/** Race record in Firestore */
export interface Race {
  id: string;
  seasonId: string;
  eventIndex: number;
  trackId: number;
  trackName: string;
  status: "scheduled" | "in_progress" | "completed" | "simulated";
  entryFee: number;
  entries: RaceEntry[];
  results: RaceResult[];
  raceLaps: number;
  createdAt: Date;
  completedAt?: Date;
}

/** Credit transaction */
export interface Transaction {
  id: string;
  playerId: string;
  amount: number;
  type: "race_entry" | "travel" | "prize" | "bonus" | "repair" | "salary" | "sponsor";
  description: string;
  raceId?: string;
  createdAt: Date;
}

/** Stat keys for iteration */
export const STAT_KEYS: (keyof DriverStats)[] = [
  "pace", "aggression", "confidence", "consistency", "pitCrew", "strategy"
];

/** Stat display config */
export const STAT_CONFIG: Record<keyof DriverStats, { label: string; icon: string; color: string; description: string }> = {
  pace:        { label: "Pace",        icon: "⚡", color: "#ff4444", description: "Raw lap speed" },
  aggression:  { label: "Aggression",  icon: "🔥", color: "#ff8800", description: "Fighting for position" },
  confidence:  { label: "Confidence",  icon: "🎯", color: "#ffcc00", description: "Risky overtakes" },
  consistency: { label: "Consistency", icon: "🎢", color: "#44bb44", description: "Fewer mistakes" },
  pitCrew:     { label: "Pit Crew",    icon: "🔧", color: "#4488ff", description: "Pit stop speed" },
  strategy:    { label: "Strategy",    icon: "🧠", color: "#aa44ff", description: "Pit strategy gambles" },
};

/** Starting stat budget for new drivers */
export const NEW_DRIVER_STAT_BUDGET = 200;

/** Starting credits for new players */
export const STARTING_CREDITS = 50000;
