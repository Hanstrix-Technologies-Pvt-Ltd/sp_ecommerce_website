import type { Metadata } from "next";
import PageHeader from "@/app/(site)/components/PageHeader";

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
      <PageHeader title="Contact Us" breadcrumbLabel="Contact Us" />
      <div className="min-h-screen bg-white pt-20">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <h1 className="text-4xl font-bold text-gray-900">Contact Us</h1>
          <p className="mt-4 text-gray-600">Coming Soon...</p>
        </div>
      </div>
    </>
  );
}
