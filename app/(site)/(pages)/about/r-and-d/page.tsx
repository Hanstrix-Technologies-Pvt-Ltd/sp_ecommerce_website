import type { Metadata } from "next";
import PageHeader from "@/app/(site)/components/PageHeader";

export const metadata: Metadata = {
  title: "Research & Development | STELZ Multiparking | Innovation Lab",
  description:
    "Explore STELZ Multiparking's research and development initiatives driving innovation in automated, mechanical parking systems and smart urban parking solutions.",
  keywords: [
    "R&D parking",
    "parking innovation",
    "research development",
    "automatic parking",
    "parking technology",
  ],
  alternates: {
    canonical: "https://stelzparking.com/about/r-and-d",
  },
  openGraph: {
    title: "Research & Development | STELZ Multiparking",
    description:
      "Explore STELZ Multiparking's research and development initiatives driving innovation in automated, mechanical parking systems.",
    url: "https://stelzparking.com/about/r-and-d",
    type: "website",
    images: [
      {
        url: "https://stelzparking.com/assets/home/Logo.webp",
        width: 1200,
        height: 630,
        alt: "STELZ Research & Development",
      },
    ],
    siteName: "STELZ Multiparking",
  },
  twitter: {
    card: "summary_large_image",
    title: "Research & Development | STELZ Multiparking",
    description:
      "Explore STELZ Multiparking's research and development initiatives driving innovation in automated, mechanical parking systems.",
    images: ["https://stelzparking.com/assets/home/Logo.webp"],
  },
};

export default function RAndDPage() {
  return (
    <>
      <PageHeader title="Research & Development" breadcrumbLabel="R & D" />
      <div className="min-h-screen bg-white pt-20">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <h1 className="text-4xl font-bold text-gray-900">R & D</h1>
          <p className="mt-4 text-gray-600">Coming Soon...</p>
        </div>
      </div>
    </>
  );
}
