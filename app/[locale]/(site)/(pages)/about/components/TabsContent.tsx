// components/about/TabsContent.tsx
import * as React from "react";
import type { TabContent } from "@/data/locale/en/AboutContent";
import { AboutSectionBlock } from "./Section";

export function TabsContent({ tab }: { tab: TabContent }) {
  return (
    <div className="space-y-8 tablet:space-y-10">
      {tab.sections.map((s, i) => (
        <AboutSectionBlock key={i} section={s} />
      ))}
    </div>
  );
}

export default TabsContent;
