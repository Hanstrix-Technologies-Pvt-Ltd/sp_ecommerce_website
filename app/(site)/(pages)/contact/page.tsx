// app/(site)/(pages)/contact/page.tsx
import type { Metadata } from "next";
import PageHeader from "@/app/(site)/components/PageHeader";
import ContactDetails from "./components/ContactDetails";
import ContactForm from "./components/ContactForm";
import ContactGlobal from "./components/ContactGlobal";

export const metadata: Metadata = {
  title: "Contact Us | STELZ Multiparking | Get in Touch",
  description:
    "Contact STELZ Multiparking for inquiries about automated parking systems, installations, and services. Reach out to our expert team today.",
  keywords: [
    "contact STELZ",
    "parking inquiries",
    "parking consultation",
    "contact us",
    "parking support",
  ],
  alternates: {
    canonical: "https://stelzparking.com/contact",
  },
  openGraph: {
    title: "Contact Us | STELZ Multiparking",
    description:
      "Contact STELZ Multiparking for inquiries about automated parking systems, installations, and services. Reach out to our expert team today.",
    url: "https://stelzparking.com/contact",
    type: "website",
    images: [
      {
        url: "https://stelzparking.com/assets/home/Logo.webp",
        width: 1200,
        height: 630,
        alt: "STELZ Multiparking Contact",
      },
    ],
    siteName: "STELZ Multiparking",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | STELZ Multiparking",
    description:
      "Contact STELZ Multiparking for inquiries about automated parking systems, installations, and services.",
    images: ["https://stelzparking.com/assets/home/Logo.webp"],
  },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader title="Contact Us" breadcrumbLabel="Contact" />
      <main className="bg-white text-[#616161]">
        <ContactDetails/>
        <ContactForm />
        <ContactGlobal/>
      </main>
    </>
  );
}
