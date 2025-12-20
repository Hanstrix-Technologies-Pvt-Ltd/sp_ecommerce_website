// Client-side contact form used in the product sidebar
"use client";

import { useContactForm } from "@/lib/contact/useContactForm";

type ContactCopy = {
  title?: string;
  placeholders: {
    name?: string;
    phone?: string;
    email?: string;
    message?: string;
  };
  cta?: string;
};

export default function ContactFormCard({ copy }: { copy: ContactCopy }) {
  const { values, errors, status, feedback, onFieldChange, handleSubmit, honeypotName, setHoneypotValue } =
    useContactForm();

  const labelClass = "mb-2 block text-[15px] font-semibold text-neutral-800";
  const inputClass = "w-full border bg-white px-4 py-3 text-[15px] font-[inherit] outline-none";

  return (
    <form className="space-y-8 px-8 pb-8 tablet:px-10" onSubmit={handleSubmit} noValidate>
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

      <label className="block">
        <span className={labelClass}>
          {copy.placeholders.name || "Name"} <span className="text-red-500">*</span>
        </span>
        <input
          type="text"
          value={values.name}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "portfolio-name-error" : undefined}
          onChange={onFieldChange("name")}
          className={`${inputClass} ${errors.name ? "border-red-500 focus:border-red-500" : "border-neutral-900 focus:border-[#174b92]"}`}
        />
        {errors.name ? (
          <span id="portfolio-name-error" className="mt-2 block text-[14px] text-red-600">
            {errors.name}
          </span>
        ) : null}
      </label>

      <label className="block">
        <span className={labelClass}>
          {copy.placeholders.phone || "Phone Number"} <span className="text-red-500">*</span>
        </span>
        <input
          type="tel"
          value={values.phone}
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? "portfolio-phone-error" : undefined}
          onChange={onFieldChange("phone")}
          className={`${inputClass} ${errors.phone ? "border-red-500 focus:border-red-500" : "border-neutral-900 focus:border-[#174b92]"}`}
        />
        {errors.phone ? (
          <span id="portfolio-phone-error" className="mt-2 block text-[14px] text-red-600">
            {errors.phone}
          </span>
        ) : null}
      </label>

      <label className="block">
        <span className={labelClass}>
          {copy.placeholders.email || "Email"} <span className="text-red-500">*</span>
        </span>
        <input
          type="email"
          value={values.email}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "portfolio-email-error" : undefined}
          onChange={onFieldChange("email")}
          className={`${inputClass} ${errors.email ? "border-red-500 focus:border-red-500" : "border-neutral-900 focus:border-[#174b92]"}`}
        />
        {errors.email ? (
          <span id="portfolio-email-error" className="mt-2 block text-[14px] text-red-600">
            {errors.email}
          </span>
        ) : null}
      </label>

      <label className="block">
        <span className={labelClass}>{copy.placeholders.message || "Comment or Message"}</span>
        <textarea
          rows={5}
          value={values.message}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "portfolio-message-error" : undefined}
          onChange={onFieldChange("message")}
          className={`${inputClass} resize-y ${
            errors.message ? "border-red-500 focus:border-red-500" : "border-neutral-900 focus:border-[#174b92]"
          }`}
        />
        {errors.message ? (
          <span id="portfolio-message-error" className="mt-2 block text-[14px] text-red-600">
            {errors.message}
          </span>
        ) : null}
      </label>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center justify-center gap-2 bg-[#066AAB] px-6 py-2 text-[20px] font-semibold text-white transition hover:bg-[#0a3a85] disabled:opacity-60"
      >
        {status === "submitting" ? "Sending..." : copy.cta || "Submit"}
        <span aria-hidden className="text-[18px]">→</span>
      </button>

      {feedback ? (
        <p
          className={`text-[14px] ${status === "success" ? "text-green-700" : "text-red-600"}`}
        >
          {feedback}
        </p>
      ) : null}
    </form>
  );
}
