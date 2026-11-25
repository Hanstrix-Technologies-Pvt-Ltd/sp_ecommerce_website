// lib/admin/features.ts
// On/off switches for admin panel sections. Set a value to true and redeploy to bring it back.
//
// - leads:      "Leads" menu item, the Leads card on the Dashboard, and the /admin/leads page.
// - brochures:  "Brochures" menu item and the /admin/brochures page.
// - testimonials: "Testimonials" menu item, its Dashboard card, and the /admin/testimonials page.
//
// Switching these off only hides the admin screens. The public website is not affected:
// visitors can still download brochures/datasheets, their enquiries are still saved, and the
// Clients page keeps showing the testimonial videos already saved.
export const ADMIN_FEATURES = {
  leads: false,
  brochures: false,
  testimonials: false,
} as const;
