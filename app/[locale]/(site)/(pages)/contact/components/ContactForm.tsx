// app/(site)/(pages)/contact/components/ContactFormSection.tsx
"use client";

import { Space_Grotesk } from "next/font/google";
import { useContactForm } from "@/lib/contact/useContactForm";

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
  const { values, errors, status, feedback, onFieldChange, handleSubmit, honeypotName, setHoneypotValue } =
    useContactForm(copy.title || "Contact");

  const inputBase =
    "h-13 w-full bg-white px-3 text-[17px] text-[#616161] outline-none focus:border-[#006DDB]";

  return (
    <section className="bg-white py-10">
      <div className="mx-0 xl:mx-20">
        <div className={`${spaceGrotesk.className} bg-[#F5F5F5]`}>
          <div className="h-[4px] w-full rounded-t-full bg-[#006DDB]" />

          <div className="mx-auto max-w-5xl px-10 pt-10 pb-10 lg:px-12">
            <h2 className="text-center text-[52px] font-semibold text-[#1F1F1F]">
              {copy.title}
            </h2>

            <form className="mt-8 space-y-8" onSubmit={handleSubmit} noValidate>
              <input
                type="text"
                name={honeypotName}
                defaultValue=""
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden
                onChange={(e) => setHoneypotValue(e.target.value)}
              />

              <div className="grid gap-5 md:grid-cols-3">
                <input
                  type="text"
                  name="name"
                  placeholder={copy.placeholders.name}
                  value={values.name}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "contact-name-error" : undefined}
                  onChange={onFieldChange("name")}
                  className={`${inputBase} border ${errors.name ? "border-red-500 focus:border-red-500" : "border-[#D2D2D2]"}`}
                />
                <input
                  type="email"
                  name="email"
                  placeholder={copy.placeholders.email}
                  value={values.email}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "contact-email-error" : undefined}
                  onChange={onFieldChange("email")}
                  className={`${inputBase} border ${errors.email ? "border-red-500 focus:border-red-500" : "border-[#D2D2D2]"}`}
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder={copy.placeholders.phone}
                  value={values.phone}
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? "contact-phone-error" : undefined}
                  onChange={onFieldChange("phone")}
                  className={`${inputBase} border ${errors.phone ? "border-red-500 focus:border-red-500" : "border-[#D2D2D2]"}`}
                />
              </div>

              {errors.name ? (
                <p id="contact-name-error" className="text-[14px] text-red-600">
                  {errors.name}
                </p>
              ) : null}
              {errors.email ? (
                <p id="contact-email-error" className="text-[14px] text-red-600">
                  {errors.email}
                </p>
              ) : null}
              {errors.phone ? (
                <p id="contact-phone-error" className="text-[14px] text-red-600">
                  {errors.phone}
                </p>
              ) : null}

              <textarea
                name="message"
                placeholder={copy.placeholders.message}
                rows={6}
                value={values.message}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "contact-message-error" : undefined}
                onChange={onFieldChange("message")}
                className={`w-full resize-y border bg-white px-3 py-3 text-[17px] text-[#616161] outline-none ${
                  errors.message ? "border-red-500 focus:border-red-500" : "border-[#D2D2D2] focus:border-[#006DDB]"
                }`}
              />
              {errors.message ? (
                <p id="contact-message-error" className="text-[14px] text-red-600">
                  {errors.message}
                </p>
              ) : null}

              <div className="flex justify-center pt-2">
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="inline-flex items-center justify-center bg-[#006DDB] px-8 py-3 text-[17px] font-medium text-white transition-colors hover:bg-[#0054b0] disabled:opacity-60"
                >
                  {status === "submitting" ? "Sending..." : copy.cta}
                  <span aria-hidden className="ml-2 text-[18px]">
                    →
                  </span>
                </button>
              </div>

              {feedback ? (
                <p
                  className={`text-center text-[15px] ${
                    status === "success" ? "text-green-700" : "text-red-600"
                  }`}
                >
                  {feedback}
                </p>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
