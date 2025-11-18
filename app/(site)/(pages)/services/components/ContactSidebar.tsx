// app/(site)/services/components/ContactSidebar.tsx
"use client";

export default function ContactSidebar() {
  return (
    <aside aria-labelledby="contact-title" className="relative lg:flex lg:flex-col lg:h-full">
      <div className="relative flex flex-col rounded-md bg-white shadow-sm ring-1 ring-slate-200 lg:h-full">
        {/* Blue top bar */}
        <div className="h-1 w-full bg-[#174b92] rounded-t-md" />

        {/* MOBILE padding only added (kept sm/md exactly the same) */}
        <div className="flex-1 p-4 sm:p-7 md:p-8">{/* add pb-16 sm:pb-0 if a floating CTA overlaps */}
          {/* 24px title to match grid titles */}
          <h3 id="contact-title" className="text-[24px] leading-snug font-extrabold text-[#111]">
            Have any Question?
          </h3>

          <p className="mt-3 text-slate-600 text-[16px]">
            The point of using Lorem Ipsum is that it has more-or-less packages
            normal point of using.
          </p>

          <form className="mt-6 space-y-3">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full rounded-md border border-slate-200 bg-[#F7F7F7] px-4 py-3 text-[16px] placeholder:text-slate-500 outline-none focus:border-[#174b92]"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full rounded-md border border-slate-200 bg-[#F7F7F7] px-4 py-3 text-[16px] placeholder:text-slate-500 outline-none focus:border-[#174b92]"
            />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full rounded-md border border-slate-200 bg-[#F7F7F7] px-4 py-3 text-[16px] placeholder:text-slate-500 outline-none focus:border-[#174b92]"
            />
            <input
              type="text"
              placeholder="Your Place Name"
              className="w-full rounded-md border border-slate-200 bg-[#F7F7F7] px-4 py-3 text-[16px] placeholder:text-slate-500 outline-none focus:border-[#174b92]"
            />

            <div className="relative">
              <textarea
                rows={5}
                placeholder="Message"
                className="w-full rounded-md border border-slate-200 bg-[#F7F7F7] px-4 py-3 text-[16px] placeholder:text-slate-500 outline-none focus:border-[#174b92] resize-y"
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
            </div>

            <button
              type="button"
              className="inline-flex items-center gap-2 bg-[#1760d6] px-6 py-3 font-semibold text-white shadow-sm hover:opacity-95 active:opacity-90"
            >
              Send Message <span aria-hidden>→</span>
            </button>
          </form>
        </div>
      </div>
    </aside>
  );
}
