import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { durations, subjects } from "@/data/sample";
import { GameButton, PageHeader, Select } from "@/components/game/ui";

export const Route = createFileRoute("/study")({
  head: () => ({
    meta: [
      { title: "Study — CollectnStudy" },
      { name: "description", content: "Start a focused study session with a calm timer." },
      { property: "og:title", content: "Study — CollectnStudy" },
      { property: "og:description", content: "Start a focused study session with a calm timer." },
    ],
  }),
  component: Study,
});

type Status = "idle" | "running" | "paused" | "done";

function Study() {
  const [subject, setSubject] = useState("history");
  const [minutes, setMinutes] = useState(25);
  const [remaining, setRemaining] = useState(25 * 60);
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    if (status !== "running") return;
    const id = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          setStatus("done");
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [status]);

  const pickDuration = (m: number) => {
    setMinutes(m);
    setRemaining(m * 60);
    setStatus("idle");
  };
  const reset = () => {
    setRemaining(minutes * 60);
    setStatus("idle");
  };

  const mm = String(Math.floor(remaining / 60)).padStart(2, "0");
  const ss = String(remaining % 60).padStart(2, "0");
  const progress = 1 - remaining / (minutes * 60);
  const locked = status === "running" || status === "paused";

  return (
    <>
      <PageHeader eyebrow="Focus" title="Study session">
        Completed sessions will eventually award a collectible tied to the subject you studied.
        Rewards are not active in this prototype.
      </PageHeader>

      <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
        <div className="panel space-y-5 p-5">
          <Select
            label="Subject"
            value={subject}
            onChange={setSubject}
            options={subjects.map((s) => ({ value: s.id, label: s.name }))}
          />
          <div>
            <p className="mb-1 text-sm font-semibold text-muted-foreground">Duration</p>
            <div className="grid grid-cols-4 gap-2" role="group" aria-label="Duration">
              {durations.map((d) => (
                <button
                  key={d}
                  disabled={locked}
                  aria-pressed={minutes === d}
                  onClick={() => pickDuration(d)}
                  className={`rounded-md border px-2 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 ${
                    minutes === d ? "border-gold bg-gold-soft text-wood" : "border-border bg-card hover:bg-accent"
                  }`}
                >
                  {d}m
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="panel flex flex-col items-center p-8 text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
            {subjects.find((s) => s.id === subject)?.name}
          </p>
          <p className="my-4 font-serif text-7xl tabular-nums text-foreground sm:text-8xl" aria-live="polite">
            {mm}:{ss}
          </p>
          <div className="mb-6 h-2 w-full max-w-md overflow-hidden rounded-full bg-muted">
            <div className="h-full bg-gold transition-[width]" style={{ width: `${progress * 100}%` }} />
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {status === "idle" && <GameButton onClick={() => setStatus("running")}>Start</GameButton>}
            {status === "running" && <GameButton variant="gold" onClick={() => setStatus("paused")}>Pause</GameButton>}
            {status === "paused" && <GameButton onClick={() => setStatus("running")}>Resume</GameButton>}
            <GameButton variant="outline" onClick={reset}>Reset</GameButton>
          </div>
          {status === "done" && (
            <p className="mt-6 text-primary">Session complete — well done! (Rewards coming soon.)</p>
          )}
        </div>
      </div>
    </>
  );
}
