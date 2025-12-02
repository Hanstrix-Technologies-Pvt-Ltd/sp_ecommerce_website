// app/(site)/(pages)/contact/components/ContactFormSection.tsx
"use client";

import { Space_Grotesk } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

type FormCopy = {
  title: string;
  placeholders: {
    name: string;
    email: string;
    phone: string;
    message: string;
  };
  cta: string;
};

export default function ContactForm({ copy }: { copy: FormCopy }) {
  return (
    <section className="bg-white py-10">
      <div className="mx-0 xl:mx-20">
        <div className={`${spaceGrotesk.className} bg-[#F5F5F5]`}>
          <div className="h-[4px] w-full rounded-t-full bg-[#006DDB]" />

          <div className="mx-auto max-w-5xl px-10 pt-10 pb-10 lg:px-12">
            <h2 className="text-center text-[52px] font-semibold text-[#1F1F1F]">
              {copy.title}
            </h2>

            <form className="mt-8 space-y-8" onSubmit={(e) => e.preventDefault()}>
              <div className="grid gap-5 md:grid-cols-3">
                <input
                  type="text"
                  name="name"
                  placeholder={copy.placeholders.name}
                  className="h-13 w-full border border-[#D2D2D2] bg-white px-3 text-[17px] text-[#616161] outline-none focus:border-[#006DDB]"
                />
                <input
                  type="email"
                  name="email"
                  placeholder={copy.placeholders.email}
                  className="h-13 w-full border border-[#D2D2D2] bg-white px-3 text-[17px] text-[#616161] outline-none focus:border-[#006DDB]"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder={copy.placeholders.phone}
                  className="h-13 w-full border border-[#D2D2D2] bg-white px-3 text-[17px] text-[#616161] outline-none focus:border-[#006DDB]"
                />
              </div>

              <textarea
                name="message"
                placeholder={copy.placeholders.message}
                rows={6}
                className="w-full resize-y border border-[#D2D2D2] bg-white px-3 py-3 text-[17px] text-[#616161] outline-none focus:border-[#006DDB]"
              />

              <div className="flex justify-center pt-2">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center bg-[#006DDB] px-8 py-3 text-[17px] font-medium text-white transition-colors hover:bg-[#0054b0]"
                >
                  {copy.cta}
                  <span className="ml-2 text-[20px]" aria-hidden>
                    →
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
