// SAMPLE / DEMONSTRATION DATA — nothing here has been earned by the player.
import type { Collectible, Subject, Test, SubjectId } from "./types";
import carImg from "@/assets/item-car.jpg";
import foxImg from "@/assets/item-fox.jpg";
import amphoraImg from "@/assets/item-amphora.jpg";

export const subjects: Subject[] = [
  { id: "history", name: "History" },
  { id: "biology", name: "Biology" },
  { id: "math", name: "Mathematics" },
  { id: "literature", name: "Literature" },
  { id: "physics", name: "Physics" },
];

export const subjectName = (id: SubjectId) => subjects.find((s) => s.id === id)?.name ?? id;

// Public-domain artworks served from Wikimedia Commons.
const commons = (file: string) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=600`;

export const sampleCollectibles: Collectible[] = [
  {
    id: "starry-night",
    name: "The Starry Night",
    category: "Painting",
    rarity: "Legendary",
    image: commons("Van Gogh - Starry Night - Google Art Project.jpg"),
    value: 1200,
    subjectId: "physics",
    note: "Vincent van Gogh, 1889 · Public domain",
  },
  {
    id: "great-wave",
    name: "The Great Wave off Kanagawa",
    category: "Painting",
    rarity: "Rare",
    image: commons("Tsunami by hokusai 19th century.jpg"),
    value: 800,
    subjectId: "literature",
    note: "Katsushika Hokusai, c. 1831 · Public domain",
  },
  {
    id: "amphora",
    name: "Black-Figure Amphora",
    category: "Artifact",
    rarity: "Uncommon",
    image: amphoraImg,
    value: 350,
    subjectId: "history",
    note: "Illustrated placeholder",
  },
  {
    id: "red-fox",
    name: "Red Fox",
    category: "Animal",
    rarity: "Common",
    image: foxImg,
    value: 120,
    subjectId: "biology",
    note: "Illustrated placeholder",
  },
  {
    id: "touring-car",
    name: "Vintage Touring Car",
    category: "Vehicle",
    rarity: "Rare",
    image: carImg,
    value: 650,
    subjectId: "math",
    note: "Generic, unbranded illustration",
  },
];

const inDays = (n: number) => {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10);
};

export const sampleTests: Test[] = [
  { id: "t1", name: "Cell Biology Quiz", subjectId: "biology", deadline: inDays(3) },
  { id: "t2", name: "World War I Essay", subjectId: "history", deadline: inDays(9) },
  { id: "t3", name: "Calculus Midterm", subjectId: "math", deadline: inDays(17) },
];

export const sampleStats = {
  coins: 0,
  studyMinutes: 0,
  sessions: 0,
  visitorsToday: 0,
};

export const durations = [15, 25, 45, 60];
