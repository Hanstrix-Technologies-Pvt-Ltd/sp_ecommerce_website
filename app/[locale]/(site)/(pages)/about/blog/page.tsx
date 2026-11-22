import type { Metadata } from "next";
import Image from "next/image";
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
      <PageHeader
        title={copy.aboutBlog.header.title}
        breadcrumbLabel={copy.aboutBlog.header.breadcrumb}
        homeLabel={copy.common.homeLabel}
        imageSrc={copy.aboutBlog.header.background}
      />

      <main className={`${spaceGrotesk.className} bg-white`}>
        <section
          className="
            mx-auto max-w-6xl px-4 tablet:px-10 pt-40 pb-40
            [@media(min-width:1280px)_and_(max-width:1536px)]:px-0
          "
        >
          <figure
            className="
              relative isolate overflow-hidden rounded-2xl bg-[#F7F7F7]
              px-[18px] tablet:px-10 py-[30px] shadow-sm text-[#616161]
              [@media(min-width:1280px)_and_(max-width:1536px)]:px-10
              after:content-[''] after:absolute after:inset-y-0 after:left-0
              after:w-1.5 after:bg-[#174b92] after:rounded-full after:z-10
              before:content-['\201C'] before:font-extrabold before:absolute before:top-16 before:right-8
              before:text-[260px] tablet:before:text-[300px] laptop:before:text-[320px]
              before:leading-none before:text-zinc-400/20 before:font-serif
              before:pointer-events-none before:select-none before:z-0
            "
          >
            <div className="relative z-10 pt-5">
              <figcaption className="mb-6 pr-10 text-[26px] tablet:text-[34px] font-bold leading-tight tracking-tight text-zinc-900">
                {blog.title}
              </figcaption>

              <blockquote className="pr-3 font-semibold text-[22px] tablet:text-[20px] leading-[1.6]">
                <p className="mb-2.5">{renderWithItalics(blog.blockquote.lead)}</p>

                <div className="space-y-2.5">
                  <p className="font-bold text-[20px] tablet:text-[18px] text-zinc-800">{blog.blockquote.pillars[0]}</p>
                  <p className="text-[20px]">and</p>
                  <p className="font-bold text-[20px] tablet:text-[18px] text-zinc-800">{blog.blockquote.pillars[1]}</p>
                </div>

                <p className="mt-[10px]">{blog.blockquote.closing}</p>
              </blockquote>

              <article className="mt-10 space-y-12">
                {blog.sections.map((s, idx) => (
                  <section key={idx} className="text-[#616161]">
                    <h2 className="mb-5 text-[28px] sm:text-[32px] font-extrabold text-zinc-900">{s.h2}</h2>

                    {s.image && (
                      // next/image: the source PNGs are 13-16 MB each (~58 MB per visit with a
                      // plain <img>); this serves resized WebP/AVIF at the displayed width instead.
                      <div className="relative mb-6 aspect-[16/9] max-h-[400px] w-full overflow-hidden rounded-lg shadow-sm">
                        <Image
                          src={s.image}
                          alt={s.h2}
                          fill
                          priority={idx === 0}
                          sizes="(max-width: 768px) 100vw, 1100px"
                          className="object-cover"
                        />
                      </div>
                    )}

                    <div className="space-y-[10px]">
                      {groupBlogLines(s.ps).map((block, bi) =>
                        block.kind === "list" ? (
                          <ul key={`l${bi}`} className="list-disc space-y-1.5 pl-6 text-[18px] tablet:text-[18px] leading-[1.6] marker:text-[#174b92]">
                            {block.items.map((item, ii) => (
                              <li key={ii}>{item}</li>
                            ))}
                          </ul>
                        ) : block.kind === "subheading" ? (
                          <h3 key={`h${bi}`} className="pt-4 text-[22px] tablet:text-[22px] font-semibold text-zinc-900">
                            {block.text}
                          </h3>
                        ) : (
                          <BlogParagraph key={`p${bi}`} p={block.text} h2={s.h2} />
                        )
                      )}
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

const EMPHASIS_LINES = ["Rotary Parking System", "Puzzle Parking Platforms", "we engineer the future of urban space."];

type BlogBlock =
  | { kind: "p"; text: string }
  | { kind: "subheading"; text: string }
  | { kind: "list"; items: string[] };

// The blog copy is a flat list of lines. Numbered lines ("1. Parking Feasibility...") are
// sub-headings, and short lines without closing punctuation ("Space optimization studies")
// are list items; consecutive items are grouped into one bulleted list.
function groupBlogLines(lines: string[]): BlogBlock[] {
  const out: BlogBlock[] = [];
  for (const raw of lines) {
    const line = raw.trim();
    if (!line) continue;
    if (/^\d+\.\s/.test(line)) {
      out.push({ kind: "subheading", text: line });
      continue;
    }
    const isItem =
      !EMPHASIS_LINES.includes(line) && line !== "or" && line.length < 120 && !/[.!?:…"'’”)]$/.test(line);
    const last = out[out.length - 1];
    if (isItem) {
      if (last?.kind === "list") last.items.push(line);
      else out.push({ kind: "list", items: [line] });
    } else {
      out.push({ kind: "p", text: line });
    }
  }
  return out;
}

function BlogParagraph({ p, h2 }: { p: string; h2: string }) {
  const isEmphasis = EMPHASIS_LINES.includes(p);
  const isConnector = p === "or";
  const isProduct = h2 === "Product: The Vision Behind Innovation";
  const italicizeTechWords = h2 === "Technology: The Engine of Progress" && !isEmphasis && !isConnector;

  let content: React.ReactNode = p;
  if (isProduct && QUESTION_RE.test(p)) content = wrapRegexInline(p, QUESTION_RE);
  else if (italicizeTechWords) content = italicizeWords(p, ["how", "what"]);

  return (
    <p
      className={[
        "leading-[1.6]",
        isEmphasis
          ? "font-bold text-zinc-800 text-[20px] tablet:text-[18px]"
          : isConnector
          ? "text-[20px] tablet:text-[18px]"
          : "text-[19px] tablet:text-[18px]",
      ].join(" ")}
    >
      {content}
    </p>
  );
}
