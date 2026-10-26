import { createFileRoute, Link } from "@tanstack/react-router";
import museumHall from "@/assets/museum-hall.jpg";
import { sampleCollectibles, sampleStats, subjectName } from "@/data/sample";
import { useTests, timeRemainingLabel } from "@/lib/tests-store";
import { PageHeader, StatCard, SectionTitle, SampleBadge } from "@/components/game/ui";
import { CollectibleCard } from "@/components/game/CollectibleCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CollectnStudy — Study, collect, curate" },
      { name: "description", content: "Turn focused study sessions into collectible art and build your own museum." },
      { property: "og:title", content: "CollectnStudy — Study, collect, curate" },
      { property: "og:description", content: "Turn focused study sessions into collectible art and build your own museum." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const { tests } = useTests();
  const hours = (sampleStats.studyMinutes / 60).toFixed(1);
  return (
    <>
      <PageHeader eyebrow="Welcome, curator" title="Your study hall">
        Every collectible here is earned by studying. Your museum is waiting for its first piece.
      </PageHeader>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard label="Coins" value={`${sampleStats.coins} ✦`} hint="Placeholder" />
        <StatCard label="Study time" value={`${hours} h`} />
        <StatCard label="Sessions" value={sampleStats.sessions} />
        <StatCard label="Upcoming tests" value={tests.length} />
      </div>

      <section className="panel mt-8 flex flex-col items-start gap-3 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl">Ready for your next session?</h2>
          <p className="text-sm text-muted-foreground">Pick a subject, set a timer, and focus.</p>
        </div>
        <Link to="/study" className="rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
          Start studying
        </Link>
      </section>

      <div className="mt-10 grid gap-8 lg:grid-cols-[3fr_2fr]">
        <section>
          <SectionTitle action={<Link to="/museum" className="text-sm font-semibold text-primary hover:underline">Visit museum →</Link>}>
            Museum preview
          </SectionTitle>
          <div className="gilded-frame overflow-hidden">
            <img src={museumHall} alt="Illustrated museum gallery" width={1600} height={912} className="w-full" />
          </div>
        </section>
        <section>
          <SectionTitle action={<Link to="/tests" className="text-sm font-semibold text-primary hover:underline">All tests →</Link>}>
            Upcoming tests
          </SectionTitle>
          <ul className="space-y-2">
            {tests.slice(0, 3).map((t) => (
              <li key={t.id} className="panel flex items-center justify-between p-3">
                <div>
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{subjectName(t.subjectId)}</p>
                </div>
                <span className="text-sm font-semibold text-wood">{timeRemainingLabel(t.deadline)}</span>
              </li>
            ))}
            {tests.length === 0 && <p className="text-sm text-muted-foreground">No tests scheduled.</p>}
          </ul>
        </section>
      </div>

      <section className="mt-10">
        <SectionTitle action={<SampleBadge>Demo items</SampleBadge>}>Collection preview</SectionTitle>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {sampleCollectibles.slice(0, 3).map((c) => (
            <CollectibleCard key={c.id} item={c} compact />
          ))}
        </div>
      </section>
    </>
  );
}
