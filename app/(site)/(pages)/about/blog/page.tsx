import type { Metadata } from "next";
import PageHeader from "@/app/(site)/components/PageHeader";
import { blog } from "@/data/BlogContent";
import { Space_Grotesk } from "next/font/google";

export const metadata: Metadata = {
  title: "Blog | STELZ Multiparking | Parking Innovation Insights",
  description:
    "Read the latest insights, articles, and updates from STELZ Multiparking on smart parking solutions, innovation, and automated parking systems.",
  keywords: [
    "parking blog",
    "parking insights",
    "smart parking",
    "parking innovation",
    "mechanical parking news",
  ],
  alternates: {
    canonical: "https://stelzparking.com/about/blog",
  },
  openGraph: {
    title: "Blog | STELZ Multiparking",
    description:
      "Read the latest insights, articles, and updates from STELZ Multiparking on smart parking solutions, innovation, and automated parking systems.",
    url: "https://stelzparking.com/about/blog",
    type: "website",
    images: [
      {
        url: "https://stelzparking.com/assets/home/Logo.webp",
        width: 1200,
        height: 630,
        alt: "STELZ Multiparking Blog",
      },
    ],
    siteName: "STELZ Multiparking",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | STELZ Multiparking",
    description:
      "Read the latest insights, articles, and updates from STELZ Multiparking on smart parking solutions and automated parking systems.",
    images: ["https://stelzparking.com/assets/home/Logo.webp"],
  },
};

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

/* --- NEW: robust matcher for the question line --- */
const QUESTION_RE = /how can we make parking smarter,\s*safer,\s*and more efficient\??/i;

/* --- helper previously used for blockquote; left unchanged --- */
function renderWithItalics(text: string) {
  if (QUESTION_RE.test(text)) {
    return <em>{text}</em>;
  }
  return <>{text}</>;
}

/* --- ADDED: wrap only the regex matches inline with <em> --- */
function wrapRegexInline(text: string, regex: RegExp) {
  const g = new RegExp(regex.source, regex.flags.includes("g") ? regex.flags : regex.flags + "g");
  const out: React.ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = g.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index));
    out.push(<em key={out.length}>{m[0]}</em>);
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return <>{out}</>;
}

/* --- ADDED: italicize specific words (used only in Technology section) --- */
function italicizeWords(text: string, words: string[]) {
  const pattern = new RegExp(`\\b(${words.join("|")})\\b`, "gi");
  const parts = text.split(pattern);
  return (
    <>
      {parts.map((part, i) =>
        pattern.test(part) ? <em key={i}>{part}</em> : <span key={i}>{part}</span>
      )}
    </>
  );
}
/* --- end helper --- */

export default function BlogPage() {
  return (
    <>
      <PageHeader title="Blog" breadcrumbLabel="Blog" />

      {/* Entire page uses Space Grotesk */}
      <main className={`${spaceGrotesk.className} bg-white`}>
        {/* Page container — base px-10, slightly tighter on 13–14" */}
        <section
          className="
            mx-auto max-w-6xl px-4 md:px-10 pt-40 pb-40
            [@media(min-width:1280px)_and_(max-width:1536px)]:px-0
          "
        >
          {/* SINGLE CARD CONTAINING ALL CONTENT */}
          <figure
            className="
              relative isolate overflow-hidden rounded-2xl bg-[#F7F7F7]
              px-[18px] md:px-10 py-[30px] shadow-sm text-[#616161]
              /* tighten card px only for 13–14” screens */
              [@media(min-width:1280px)_and_(max-width:1536px)]:px-10

              /* left blue rail on ::after */
              after:content-[''] after:absolute after:inset-y-0 after:left-0
              after:w-1.5 after:bg-[#174b92] after:rounded-full after:z-10

              /* decorative OPENING quote (top-right) on ::before */
              before:content-['\201C'] font-extrabold before:absolute before:top-16 before:right-8
              before:text-[260px] md:before:text-[300px] lg:before:text-[320px]
              before:leading-none before:text-zinc-400/20 before:font-serif
              before:pointer-events-none before:select-none before:z-0
            "
          >
            {/* Content sits above the quote background */}
            <div className="relative z-10 pt-5">
              {/* Title inside the card */}
              <figcaption className="mb-4 text-xl text-[18px] md:text-[18px] font-semibold tracking-normal text-zinc-900">
                {blog.title}
              </figcaption>

              {/* Block quote – keep existing styles; only change the text rendering */}
              <blockquote className="pr-3 font-semibold text-[22px] md:text-[20px] leading-[1.6]">
                <p className="mb-2.5">
                  {renderWithItalics(blog.blockquote.lead)}
                </p>

                <div className="space-y-2.5">
                  <p className="font-bold text-[20px] md:text-[18px] text-zinc-800">
                    {blog.blockquote.pillars[0]}
                  </p>
                  <p className="text-[20px]">and</p>
                  <p className="font-bold text-[20px] md:text-[18px] text-zinc-800">
                    {blog.blockquote.pillars[1]}
                  </p>
                </div>

                <p className="mt-[10px]">{blog.blockquote.closing}</p>
              </blockquote>

              {/* Remaining content (still within the same card) */}
              <article className="mt-10 space-y-12">
                {blog.sections.map((s, idx) => (
                  <section key={idx} className="text-[#616161]">
                    {/* section heading */}
                    <h2 className="mb-5 text-[28px] sm:text-[32px] font-extrabold text-zinc-900">
                      {s.h2}
                    </h2>

                    {/* paragraphs — follow blockquote sizing: 22px desktop → 20px md */}
                    <div className="space-y-[10px]">
                      {s.ps.map((p, i) => {
                        const isEmphasis =
                          p === "Rotary Parking System" ||
                          p === "Puzzle Parking Platforms" ||
                          p === "we engineer the future of urban space.";
                        const isConnector = p === "or";

                        // italicize entire question INLINE ONLY for the Product section
                        const isProduct = s.h2 === "Product: The Vision Behind Innovation";
                        const containsQuestion = QUESTION_RE.test(p);

                        // italicize how/what ONLY for the Technology section
                        const italicizeTechWords =
                          s.h2 === "Technology: The Engine of Progress" &&
                          !isEmphasis &&
                          !isConnector;

                        let content: React.ReactNode = p;

                        if (isProduct && containsQuestion) {
                          content = wrapRegexInline(p, QUESTION_RE);
                        } else if (italicizeTechWords) {
                          content = italicizeWords(p, ["how", "what"]);
                        }

                        return (
                          <p
                            key={i}
                            className={[
                              "leading-[1.6]",
                              isEmphasis
                                ? "font-bold text-zinc-800 text-[20px] md:text-[18px]"
                                : isConnector
                                ? "text-[20px] md:text-[18px]"
                                : "text-[22px] md:text-[20px]",
                            ].join(" ")}
                          >
                            {content}
                          </p>
                        );
                      })}
                    </div>
                  </section>
                ))}
              </article>
            </div>
          </figure>
        </section>
      </main>
    </>
  );
}
