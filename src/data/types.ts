// Shared data shapes used across the app.

export type SubjectId = "history" | "biology" | "math" | "literature" | "physics";

export interface Subject {
  id: SubjectId;
  name: string;
}

export type Category = "Painting" | "Sculpture" | "Artifact" | "Animal" | "Vehicle";
export type Rarity = "Common" | "Uncommon" | "Rare" | "Legendary";

export interface Collectible {
  id: string;
  name: string;
  category: Category;
  rarity: Rarity;
  image: string;
  value: number; // estimated in-game value (coins)
  subjectId: SubjectId;
  note?: string; // credit / description
  earnedSessionId?: string;
  earnedAt?: string;
}

export interface Test {
  id: string;
  name: string;
  subjectId: SubjectId;
  deadline: string; // ISO date "YYYY-MM-DD"
}
