// components/about/TabsContent.tsx
import * as React from "react";
import type { TabContent } from "@/data/AboutContent";
import { AboutSectionBlock } from "./Section";

export function TabsContent({ tab }: { tab: TabContent }) {
  return (
    <div className="space-y-8 md:space-y-10">
      {tab.sections.map((s, i) => (
        <AboutSectionBlock key={i} section={s} />
      ))}
    </div>
  );
}
