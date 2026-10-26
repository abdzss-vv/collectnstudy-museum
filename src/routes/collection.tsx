import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { sampleCollectibles, subjects } from "@/data/sample";
import type { Category, Rarity } from "@/data/types";
import { CollectibleCard } from "@/components/game/CollectibleCard";
import { GameButton, PageHeader, SampleBadge, Select, SectionTitle } from "@/components/game/ui";

export const Route = createFileRoute("/collection")({
  head: () => ({
    meta: [
      { title: "Collection — CollectnStudy" },
      { name: "description", content: "Browse collectibles earned through focused study." },
      { property: "og:title", content: "Collection — CollectnStudy" },
      { property: "og:description", content: "Browse collectibles earned through focused study." },
    ],
  }),
  component: Collection,
});

const categories: Category[] = ["Painting", "Sculpture", "Artifact", "Animal", "Vehicle"];
const rarities: Rarity[] = ["Common", "Uncommon", "Rare", "Legendary"];
const all = { value: "all", label: "All" };

function Collection() {
  const [category, setCategory] = useState("all");
  const [rarity, setRarity] = useState("all");
  const [subject, setSubject] = useState("all");

  const items = sampleCollectibles.filter(
    (c) =>
      (category === "all" || c.category === category) &&
      (rarity === "all" || c.rarity === rarity) &&
      (subject === "all" || c.subjectId === subject),
  );

  return (
    <>
      <PageHeader eyebrow="Archive" title="Your Collection">
        Each piece remembers the subject you studied to earn it.
      </PageHeader>

      <section className="panel flex flex-col items-center p-8 text-center">
        <div className="gilded-frame mb-4 flex h-24 w-20 items-center justify-center font-serif text-3xl text-gold">?</div>
        <h2 className="text-2xl">Your collection is empty</h2>
        <p className="mt-1 max-w-md text-sm text-muted-foreground">
          Complete a study session to earn your first piece. Below are demonstration items showing how it will look.
        </p>
      </section>

      <section className="mt-10">
        <SectionTitle action={<SampleBadge>Demonstration items</SampleBadge>}>Catalogue preview</SectionTitle>
        <div className="mb-6 grid gap-3 sm:grid-cols-4 sm:items-end">
          <Select label="Category" value={category} onChange={setCategory} options={[all, ...categories.map((c) => ({ value: c, label: c }))]} />
          <Select label="Rarity" value={rarity} onChange={setRarity} options={[all, ...rarities.map((r) => ({ value: r, label: r }))]} />
          <Select label="Subject" value={subject} onChange={setSubject} options={[all, ...subjects.map((s) => ({ value: s.id, label: s.name }))]} />
          <GameButton variant="outline" onClick={() => { setCategory("all"); setRarity("all"); setSubject("all"); }}>
            Clear filters
          </GameButton>
        </div>
        {items.length ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((c) => <CollectibleCard key={c.id} item={c} />)}
          </div>
        ) : (
          <p className="panel p-6 text-center text-muted-foreground">No items match these filters.</p>
        )}
      </section>
    </>
  );
}
