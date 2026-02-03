// app/(site)/(pages)/contact/page.tsx
import type { Metadata } from "next";
import PageHeader from "@/app/[locale]/(site)/components/PageHeader";
import ContactDetails from "./components/ContactDetails";
import ContactForm from "./components/ContactForm";
import ContactGlobal from "./components/ContactGlobal";
import { getRequestLocale } from "@/lib/i18n/locale";
import { getPageCopy } from "@/lib/i18n/pageCopy";
import { buildLocalizedMetadata } from "@/lib/i18n/metadata";

async function loadContactContent(locale: string) {
  if (locale === "de") {
    return import("@/data/locale/de/ContactContent").then((m) => m.CONTACT_CONTENT);
  }
  return import("@/data/locale/en/ContactContent").then((m) => m.CONTACT_CONTENT);
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const copy = await getPageCopy(locale);
  const meta = copy.contact.metadata;
  return buildLocalizedMetadata(locale, {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    images: [meta.ogImage],
    pathname: meta.canonical,
  });
}

export default async function ContactPage() {
  const locale = await getRequestLocale();
  const copy = await getPageCopy(locale);
  const contactContent = await loadContactContent(locale);

  return (
    <>
      <PageHeader
        title={copy.contact.header.title}
        breadcrumbLabel={copy.contact.header.breadcrumb}
        homeLabel={copy.common.homeLabel}
        imageSrc={copy.contact.header.background}
      />
      <main className="bg-white text-[#616161]">
        <ContactDetails content={contactContent} />
        <ContactForm copy={copy.contact.form} />
        <ContactGlobal content={contactContent} />
      </main>
    </>
  );
}
