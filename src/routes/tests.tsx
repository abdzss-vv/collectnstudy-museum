import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { subjectName } from "@/data/sample";
import { useTests, daysUntil, timeRemainingLabel } from "@/lib/tests-store";
import { TestForm } from "@/components/game/TestForm";
import { GameButton, PageHeader, SectionTitle } from "@/components/game/ui";

export const Route = createFileRoute("/tests")({
  head: () => ({
    meta: [
      { title: "Tests — CollectnStudy" },
      { name: "description", content: "Track upcoming tests and deadlines." },
      { property: "og:title", content: "Tests — CollectnStudy" },
      { property: "og:description", content: "Track upcoming tests and deadlines." },
    ],
  }),
  component: Tests,
});

function urgency(deadline: string) {
  const n = daysUntil(deadline);
  if (n < 0) return "border-l-muted-foreground opacity-70";
  if (n <= 3) return "border-l-destructive";
  if (n <= 10) return "border-l-gold";
  return "border-l-sage";
}

function Tests() {
  const { tests, add, update, remove } = useTests();
  const [editing, setEditing] = useState<string | null>(null);

  return (
    <>
      <PageHeader eyebrow="Deadlines" title="Upcoming Tests">
        In future versions, fictional critics will visit your museum to represent each test.
      </PageHeader>

      <section className="panel p-5">
        <h2 className="mb-3 text-2xl">Add a test</h2>
        <TestForm onSubmit={add} />
      </section>

      <section className="mt-10">
        <SectionTitle>Schedule</SectionTitle>
        {tests.length === 0 && <p className="panel p-6 text-center text-muted-foreground">No tests yet. Add one above.</p>}
        <ul className="space-y-3">
          {tests.map((t) => (
            <li key={t.id} className={`panel border-l-4 p-4 ${urgency(t.deadline)}`}>
              {editing === t.id ? (
                <TestForm
                  initial={t}
                  onSubmit={(v) => { update({ ...v, id: t.id }); setEditing(null); }}
                  onCancel={() => setEditing(null)}
                />
              ) : (
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-xl">{t.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {subjectName(t.subjectId)} ·{" "}
                      {new Date(t.deadline + "T00:00:00").toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="mr-2 font-serif text-2xl text-wood">{timeRemainingLabel(t.deadline)}</span>
                    <GameButton variant="outline" onClick={() => setEditing(t.id)} aria-label={`Edit ${t.name}`}>Edit</GameButton>
                    <GameButton variant="danger" onClick={() => remove(t.id)} aria-label={`Remove ${t.name}`}>Remove</GameButton>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
