import { redirect } from "next/navigation";
import { ADMIN_FEATURES } from "@/lib/admin/features";

// Hidden while the Brochures section is switched off (see lib/admin/features.ts).
export default function BrochuresLayout({ children }: { children: React.ReactNode }) {
  if (!ADMIN_FEATURES.brochures) redirect("/admin");
  return children;
}
