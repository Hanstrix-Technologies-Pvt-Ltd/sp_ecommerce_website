import { redirect } from "next/navigation";
import { ADMIN_FEATURES } from "@/lib/admin/features";

// Hidden while the Leads section is switched off (see lib/admin/features.ts).
export default function LeadsLayout({ children }: { children: React.ReactNode }) {
  if (!ADMIN_FEATURES.leads) redirect("/admin");
  return children;
}
