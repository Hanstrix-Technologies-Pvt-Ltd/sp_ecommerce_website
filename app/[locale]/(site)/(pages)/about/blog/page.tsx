import type { Metadata } from "next";
import PageHeader from "@/app/[locale]/(site)/components/PageHeader";
import { Space_Grotesk } from "next/font/google";
import { getRequestLocale } from "@/lib/i18n/locale";
import { buildLocalizedMetadata } from "@/lib/i18n/metadata";
import { getPageCopy } from "@/lib/i18n/pageCopy";
import type { blog as BlogContent } from "@/data/locale/en/BlogContent";

async function loadBlogContent(locale: string): Promise<typeof BlogContent> {
  if (locale === "de") {
    return import("@/data/locale/de/BlogContent").then((m) => m.blog);
  }
  return import("@/data/locale/en/BlogContent").then((m) => m.blog);
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const copy = await getPageCopy(locale);
  const meta = copy.aboutBlog.metadata;
  return buildLocalizedMetadata(locale, {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    images: [meta.ogImage],
    pathname: meta.canonical,
  });
}

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const QUESTION_RE = /how can we make parking smarter,\s*safer,\s*and more efficient\??/i;

function renderWithItalics(text: string) {
  if (QUESTION_RE.test(text)) {
    return <em>{text}</em>;
  }
  return <>{text}</>;
}

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

export default async function BlogPage() {
  const locale = await getRequestLocale();
  const [copy, blog] = await Promise.all([getPageCopy(locale), loadBlogContent(locale)]);

  return (
    <>
      <PageHeader title={copy.aboutBlog.header.title} breadcrumbLabel={copy.aboutBlog.header.breadcrumb} homeLabel={copy.common.homeLabel} />

      <main className={`${spaceGrotesk.className} bg-white`}>
        <section
          className="
            mx-auto max-w-6xl px-4 md:px-10 pt-40 pb-40
            [@media(min-width:1280px)_and_(max-width:1536px)]:px-0
          "
        >
          <figure
            className="
              relative isolate overflow-hidden rounded-2xl bg-[#F7F7F7]
              px-[18px] md:px-10 py-[30px] shadow-sm text-[#616161]
              [@media(min-width:1280px)_and_(max-width:1536px)]:px-10
              after:content-[''] after:absolute after:inset-y-0 after:left-0
              after:w-1.5 after:bg-[#174b92] after:rounded-full after:z-10
              before:content-['\201C'] font-extrabold before:absolute before:top-16 before:right-8
              before:text-[260px] md:before:text-[300px] lg:before:text-[320px]
              before:leading-none before:text-zinc-400/20 before:font-serif
              before:pointer-events-none before:select-none before:z-0
            "
          >
            <div className="relative z-10 pt-5">
              <figcaption className="mb-4 text-xl text-[18px] md:text-[18px] font-semibold tracking-normal text-zinc-900">
                {blog.title}
              </figcaption>

              <blockquote className="pr-3 font-semibold text-[22px] md:text-[20px] leading-[1.6]">
                <p className="mb-2.5">{renderWithItalics(blog.blockquote.lead)}</p>

                <div className="space-y-2.5">
                  <p className="font-bold text-[20px] md:text-[18px] text-zinc-800">{blog.blockquote.pillars[0]}</p>
                  <p className="text-[20px]">and</p>
                  <p className="font-bold text-[20px] md:text-[18px] text-zinc-800">{blog.blockquote.pillars[1]}</p>
                </div>

                <p className="mt-[10px]">{blog.blockquote.closing}</p>
              </blockquote>

              <article className="mt-10 space-y-12">
                {blog.sections.map((s, idx) => (
                  <section key={idx} className="text-[#616161]">
                    <h2 className="mb-5 text-[28px] sm:text-[32px] font-extrabold text-zinc-900">{s.h2}</h2>

                    <div className="space-y-[10px]">
                      {s.ps.map((p, i) => {
                        const isEmphasis =
                          p === "Rotary Parking System" ||
                          p === "Puzzle Parking Platforms" ||
                          p === "we engineer the future of urban space.";
                        const isConnector = p === "or";

                        const isProduct = s.h2 === "Product: The Vision Behind Innovation";
                        const containsQuestion = QUESTION_RE.test(p);
                        const italicizeTechWords = s.h2 === "Technology: The Engine of Progress" && !isEmphasis && !isConnector;

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
