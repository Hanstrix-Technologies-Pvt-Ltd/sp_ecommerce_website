// app/(site)/(pages)/portfolios/[category]/[slug]/layout.tsx
import { use } from "react";
import Link from "next/link";
import PageHeader from "@/app/(site)/components/PageHeader";
import { getProduct, type ProductCategory } from "@/data/Products";
import { Linkedin, Facebook, Instagram, Youtube, ArrowRight } from "lucide-react";
import { content } from "@/data/HomeFooterContent";
import { Space_Grotesk } from "next/font/google";

const f = content.footer;

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const socials = [
  { key: "linkedin", href: f.contact.socials.linkedin, label: "LinkedIn", Icon: Linkedin },
  { key: "instagram", href: f.contact.socials.instagram, label: "Instagram", Icon: Instagram },
  { key: "youtube", href: f.contact.socials.youtube, label: "YouTube", Icon: Youtube },
  { key: "facebook", href: f.contact.socials.facebook, label: "Facebook", Icon: Facebook },
].filter((s) => !!s.href);

/** Fixed 8 sidebar buttons (edit labels/hrefs if any slug differs) */
const RIGHT_BUTTONS = [
  { label: "Stack parking", href: "/portfolios/stack/stack-parking" },
  { label: "Puzzle parking", href: "/portfolios/puzzle/puzzle-parking" },
  { label: "Pit Puzzle", href: "/portfolios/puzzle/pit-puzzle" },
  { label: "Car Hoist", href: "/portfolios/automatic/car-hoist" },
  { label: "Slide parking", href: "/portfolios/automatic/slide-parking" },
  { label: "Turn Table", href: "/portfolios/automatic/turn-table" },
  { label: "Cantilever parking", href: "/portfolios/stack/cantilever-parking" },
  { label: "Pit Stacker", href: "/portfolios/stack/pit-stacker" },
] as const;

/** Narrow string to ProductCategory safely */
function asCategory(s: string): ProductCategory | null {
  return s === "stack" || s === "puzzle" || s === "automatic" ? s : null;
}

export default function PortfolioLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  // IMPORTANT: Next’s validator expects plain strings here
  params: Promise<{ category: string; slug: string }>;
}) {
  // unwrap params (Server Component)
  const { category, slug } = use(params);
  const cat = asCategory(category);
  const p = cat ? getProduct(cat, slug) : null;
  const headerTitle = p?.title ?? "Product";

  return (
    <>
      <PageHeader title={headerTitle} breadcrumbLabel={headerTitle} />

      <main className="bg-white">
        <section className="mx-auto max-w-[1450px] px-4 md:px-10 py-15 md:py-25">
          {/* sm: stacked; md+: 2 columns with 420px sidebar */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_420px] gap-10">
            {/* LEFT: product body */}
            <div>{children}</div>

            {/* RIGHT: shared sidebar */}
            <aside className="space-y-8">
              {/* ===== Our Parking Systems (centered block) ===== */}
              <div className="mx-auto w-full md:max-w-[300px] py-5">
                <h3 className="mb-6 text-[25px] font-extrabold leading-none tracking-tight text-[#006DDB] text-center">
                  Our Parking Systems
                </h3>

                <ul className="space-y-4">
                  {RIGHT_BUTTONS.map((b) => (
                    <li key={b.href}>
                      <Link
                        href={b.href}
                        aria-label={b.label}
                        className="
                          group relative block w-full overflow-hidden
                          bg-[#006DDB] text-white py-4 px-6 font-semibold text-[18px]
                        "
                      >
                        {/* sweep overlay (darker) that travels L→R on hover */}
                        <span
                          aria-hidden
                          className="
                            pointer-events-none absolute inset-0 -translate-x-full
                            bg-[#2458A4]
                            transition-transform duration-500 ease-out
                            group-hover:translate-x-0
                          "
                        />
                        {/* content above the sweep */}
                        <span className="relative z-[1] flex items-center justify-center gap-3">
                          <span>{b.label}</span>

                          {/* arrow pass-through animation */}
                          <span className="relative inline-block h-5 w-8 overflow-hidden">
                            {/* front arrow */}
                            <ArrowRight
                              className="
                                absolute inset-0
                                transition-all duration-500 ease-out
                                group-hover:translate-x-[14px] group-hover:opacity-0
                              "
                              strokeWidth={2.4}
                            />
                            {/* back arrow */}
                            <ArrowRight
                              className="
                                absolute inset-0 -translate-x-[14px] opacity-0
                                transition-all duration-500 ease-out delay-100
                                group-hover:translate-x-0 group-hover:opacity-100
                              "
                              strokeWidth={2.4}
                            />
                          </span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* ===== Contact Now — narrower card, centered; inner x-padding on form ===== */}
              <div className={`${spaceGrotesk.className} w-full md:max-w-[360px] mx-auto border border-neutral-900`}>
                <div className="px-6 pt-6">
                  <h3 className="text-[30px] font-medium leading-none tracking-tight text-[#0a1a33]">
                    Contact Now
                  </h3>
                </div>

                {/* extra gap under title */}
                <div className="mt-4" />

                <form className="px-8 md:px-10 pb-8 space-y-8">
                  <label className="block">
                    <span className="mb-2 block text-[15px] font-semibold text-neutral-800">
                      Name <span className="text-red-500">*</span>
                    </span>
                    <input
                      type="text"
                      className="w-full border border-neutral-900 bg-white px-4 py-3 text-[15px] outline-none focus:border-[#174b92] font-[inherit]"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-[15px] font-semibold text-neutral-800">
                      Phone Number <span className="text-red-500">*</span>
                    </span>
                    <input
                      type="tel"
                      className="w-full border border-neutral-900 bg-white px-4 py-3 text-[15px] outline-none focus:border-[#174b92] font-[inherit]"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-[15px] font-semibold text-neutral-800">
                      Email <span className="text-red-500">*</span>
                    </span>
                    <input
                      type="email"
                      className="w-full border border-neutral-900 bg-white px-4 py-3 text-[15px] outline-none focus:border-[#174b92] font-[inherit]"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-[15px] font-semibold text-neutral-800">
                      Comment or Message
                    </span>
                    <textarea
                      rows={5}
                      className="w-full border border-neutral-900 bg-white px-4 py-3 text-[15px] outline-none focus:border-[#174b92] resize-y font-[inherit]"
                    />
                  </label>

                  <button
                    type="button"
                    className="inline-flex items-center justify-center gap-2 bg-[#066AAB] px-6 py-2 text-[20px] font-semibold text-white hover:bg-[#0a3a85] transition font-[inherit]"
                  >
                    Submit
                  </button>
                </form>
              </div>

              {/* ===== Brochure — narrower than contact, centered ===== */}
              {p?.brochureUrl ? (
                <div className={`${spaceGrotesk.className} w-full md:max-w-[260px] mx-auto px-0 py-6`}>
                  <a
                    href={p.brochureUrl}
                    download
                    className="block w-full text-center bg-[#006DDB] p-5 text-[17px] text-white hover:bg-[#0a3a85] transition"
                    aria-label={`Download brochure for ${p?.title ?? "Product"}`}
                  >
                    Download S-01 Datasheet
                  </a>
                </div>
              ) : null}

              {/* ===== Socials — match contact width & centering ===== */}
              <div className="w-full md:max-w-[360px] mx-auto bg-[#EBEBEB] p-[40px]">
                <h3 className="text-[30px] font-extrabold leading-none tracking-tight text-[#0a1a33]">
                  Follow Us On
                </h3>

                <div className="mt-6 flex items-center gap-4">
                  {socials.map((s) => (
                    <Link
                      key={s.key}
                      href={s.href!}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      title={s.label}
                      className="inline-flex h-12 w-12 items-center justify-center bg-[#E6E6E9] text-[#0a1a33] ring-1 ring-black/5 hover:bg-[#006DDB] hover:text-white transition"
                    >
                      <s.Icon className="h-6 w-6" />
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>
    </>
  );
}
