import { createFileRoute } from "@tanstack/react-router";
import museumHall from "@/assets/museum-hall.jpg";
import { sampleCollectibles, sampleStats } from "@/data/sample";
import { PageHeader, StatCard, SectionTitle, SampleBadge, GameButton } from "@/components/game/ui";

export const Route = createFileRoute("/museum")({
  head: () => ({
    meta: [
      { title: "Museum — CollectnStudy" },
      { name: "description", content: "Display your earned collectibles in your own museum." },
      { property: "og:title", content: "Museum — CollectnStudy" },
      { property: "og:description", content: "Display your earned collectibles in your own museum." },
    ],
  }),
  component: Museum,
});

const expansions = [
  { name: "East Wing", detail: "Room for 8 more pieces", cost: 2000 },
  { name: "Sculpture Garden", detail: "Outdoor displays", cost: 3500 },
  { name: "Grand Foyer Renovation", detail: "More daily visitors", cost: 5000 },
];

function Museum() {
  return (
    <>
      <PageHeader eyebrow="Your gallery" title="The Museum">
        Arrange the pieces you earn and welcome visitors. Visitor revenue is not active yet.
      </PageHeader>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard label="Coins" value={`${sampleStats.coins} ✦`} hint="Placeholder" />
        <StatCard label="Visitors today" value={sampleStats.visitorsToday} hint="Placeholder" />
        <StatCard label="Displays filled" value="0 / 6" />
        <StatCard label="Reputation" value="—" hint="Critics arrive later" />
      </div>

      <section className="mt-8">
        <div className="gilded-frame overflow-hidden">
          <img src={museumHall} alt="Illustrated main hall of the museum" width={1600} height={912} className="w-full" />
        </div>
      </section>

      <section className="mt-10">
        <SectionTitle action={<SampleBadge>Display preview</SampleBadge>}>Main hall</SectionTitle>
        <div className="rounded-lg border border-border bg-secondary p-6">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
            {sampleCollectibles.slice(0, 3).map((c) => (
              <figure key={c.id} className="flex flex-col items-center">
                <div className="gilded-frame aspect-[4/5] w-full overflow-hidden">
                  <img src={c.image} alt={c.name} loading="lazy" className="h-full w-full object-cover" />
                </div>
                <figcaption className="mt-3 rounded-sm border border-border bg-card px-3 py-1 text-center font-serif text-sm">
                  {c.name}
                </figcaption>
              </figure>
            ))}
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="flex aspect-[4/5] items-center justify-center rounded-sm border-2 border-dashed border-gold/60 text-center text-sm text-muted-foreground"
              >
                Empty display
              </div>
            ))}
          </div>
          {/* Floor / plinth strip */}
          <div className="mt-6 h-3 rounded-sm bg-wood" />
        </div>
      </section>

      <section className="mt-10">
        <SectionTitle>Expansions & renovations</SectionTitle>
        <div className="grid gap-3 sm:grid-cols-3">
          {expansions.map((e) => (
            <div key={e.name} className="panel flex flex-col gap-2 p-4">
              <h3 className="text-xl">{e.name}</h3>
              <p className="text-sm text-muted-foreground">{e.detail}</p>
              <GameButton variant="outline" disabled className="mt-auto">
                🔒 {e.cost} ✦ · Coming soon
              </GameButton>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
