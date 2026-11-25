import { redirect } from "next/navigation";
import { ADMIN_FEATURES } from "@/lib/admin/features";

// Hidden while the Testimonials section is switched off (see lib/admin/features.ts).
export default function TestimonialsLayout({ children }: { children: React.ReactNode }) {
  if (!ADMIN_FEATURES.testimonials) redirect("/admin");
  return children;
}
