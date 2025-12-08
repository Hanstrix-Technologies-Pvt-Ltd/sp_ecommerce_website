// app/(site)/services/components/ContactSidebar.tsx
"use client";

import { useContactForm } from "@/lib/contact/useContactForm";

type ContactCopy = {
  title: string;
  body: string;
  placeholders: {
    name: string;
    phone: string;
    email: string;
    message: string;
  };
  cta: string;
};

export default function ContactSidebar({ copy }: { copy: ContactCopy }) {
  const { values, errors, status, feedback, onFieldChange, handleSubmit, honeypotName, setHoneypotValue } =
    useContactForm(copy.title || "Services Contact");

  const inputBase =
    "w-full rounded-md border bg-[#F7F7F7] px-4 py-3 text-[16px] placeholder:text-slate-500 outline-none focus:border-[#174b92]";

  return (
    <aside aria-labelledby="contact-title" className="relative lg:flex lg:flex-col lg:h-full">
      <div className="relative flex flex-col rounded-md bg-white shadow-sm ring-1 ring-slate-200 lg:h-full">
        {/* Blue top bar */}
        <div className="h-1 w-full bg-[#174b92] rounded-t-md" />

        {/* MOBILE padding only added (kept sm/md exactly the same) */}
        <div className="flex-1 p-4 sm:p-7 md:p-8">
          {/* add pb-16 sm:pb-0 if a floating CTA overlaps */}
          {/* 24px title to match grid titles */}
          <h3 id="contact-title" className="text-[24px] leading-snug font-extrabold text-[#111]">
            {copy.title}
          </h3>

          <p className="mt-3 text-slate-600 text-[16px]">{copy.body}</p>

          <form className="mt-6 space-y-3" onSubmit={handleSubmit} noValidate>
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

            <div className="space-y-3">
              <div>
                <input
                  type="text"
                  placeholder={copy.placeholders.name}
                  value={values.name}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "services-name-error" : undefined}
                  onChange={onFieldChange("name")}
                  className={`${inputBase} ${errors.name ? "border-red-500 focus:border-red-500" : "border-slate-200"}`}
                />
                {errors.name ? (
                  <p id="services-name-error" className="mt-1 text-[14px] text-red-600">
                    {errors.name}
                  </p>
                ) : null}
              </div>

              <div>
                <input
                  type="tel"
                  placeholder={copy.placeholders.phone}
                  value={values.phone}
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? "services-phone-error" : undefined}
                  onChange={onFieldChange("phone")}
                  className={`${inputBase} ${errors.phone ? "border-red-500 focus:border-red-500" : "border-slate-200"}`}
                />
                {errors.phone ? (
                  <p id="services-phone-error" className="mt-1 text-[14px] text-red-600">
                    {errors.phone}
                  </p>
                ) : null}
              </div>

              <div>
                <input
                  type="email"
                  placeholder={copy.placeholders.email}
                  value={values.email}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "services-email-error" : undefined}
                  onChange={onFieldChange("email")}
                  className={`${inputBase} ${errors.email ? "border-red-500 focus:border-red-500" : "border-slate-200"}`}
                />
                {errors.email ? (
                  <p id="services-email-error" className="mt-1 text-[14px] text-red-600">
                    {errors.email}
                  </p>
                ) : null}
              </div>

              <div className="relative">
                <textarea
                  rows={5}
                  placeholder={copy.placeholders.message}
                  value={values.message}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "services-message-error" : undefined}
                  onChange={onFieldChange("message")}
                  className={`${inputBase} resize-y ${errors.message ? "border-red-500 focus:border-red-500" : "border-slate-200"}`}
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute bottom-2 left-2 h-4 w-4 opacity-50"
                  style={{
                    background: "currentColor",
                    color: "#9CA3AF",
                    WebkitMaskImage:
                      "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M3 21h6v-6\"/><path d=\"M3 15v6h6\"/></svg>')",
                    maskImage:
                      "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M3 21h6v-6\"/><path d=\"M3 15v6h6\"/></svg>')",
                    WebkitMaskRepeat: "no-repeat",
                    maskRepeat: "no-repeat",
                    WebkitMaskSize: "contain",
                    maskSize: "contain",
                  }}
                />
                {errors.message ? (
                  <p id="services-message-error" className="mt-1 text-[14px] text-red-600">
                    {errors.message}
                  </p>
                ) : null}
              </div>
            </div>

            <button
              type="submit"
              disabled={status === "submitting"}
              className="inline-flex items-center gap-2 bg-[#1760d6] px-6 py-3 font-semibold text-white shadow-sm hover:opacity-95 active:opacity-90 disabled:opacity-60"
            >
              {status === "submitting" ? "Sending..." : copy.cta}
              <span aria-hidden className="text-[18px]">→</span>
            </button>

            {feedback ? (
              <p
                className={`text-[14px] ${
                  status === "success" ? "text-green-700" : "text-red-600"
                }`}
              >
                {feedback}
              </p>
            ) : null}
          </form>
        </div>
      </div>
    </aside>
  );
}
