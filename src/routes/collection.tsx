import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/game/ui";
import { CollectionContent } from "@/components/game/CollectionContent";

export const Route = createFileRoute("/collection")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Collection — CollectnStudy" },
      { name: "description", content: "Browse collectibles earned through focused study." },
      { property: "og:title", content: "Collection — CollectnStudy" },
      { property: "og:description", content: "Browse collectibles earned through focused study." },
    ],
  }),
  component: Collection,
});

function Collection() { return <><PageHeader title="Your Collection" /><CollectionContent /></>; }
