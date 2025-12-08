import Link from "next/link";
import { Linkedin, Facebook, Instagram, Youtube, Phone, MessageCircle } from "lucide-react";

type FooterContent = typeof import("@/data/locale/en/HomeFooterContent").content;

type FooterProps = {
  content: FooterContent;
};

export default function Footer({ content }: FooterProps) {
  const f = content.footer;

  const socials = [
    { key: "linkedin", href: f.contact.socials.linkedin, label: "LinkedIn", Icon: Linkedin },
    { key: "instagram", href: f.contact.socials.instagram, label: "Instagram", Icon: Instagram },
    { key: "youtube", href: f.contact.socials.youtube, label: "YouTube", Icon: Youtube },
    { key: "facebook", href: f.contact.socials.facebook, label: "Facebook", Icon: Facebook },
  ].filter((s) => !!s.href);

  return (
    <footer className="bg-linear-to-b from-[#0C41AA] to-[#0a0a1a] text-white">
      {/* ADDED horizontal padding so md doesn't hug the edge */}
      <div className="mx-auto grid max-w-7xl gap-8 py-4 px-4 sm:px-6 tablet:px-8 laptop:px-10 tablet:grid-cols-3 laptop:gap-15">
        {/* Office */}
        <section aria-labelledby="footer-office">
          <h3 id="footer-office" className="mb-3 text-lg font-bold tablet:text-2xl">
            {f.office.title}
          </h3>
          <address className="not-italic text-gray-400 text-sm leading-relaxed tablet:text-[16px]">
            {f.office.address}
          </address>
        </section>

        {/* Factory */}
        <section aria-labelledby="footer-factory">
          <h3 id="footer-factory" className="mb-3 text-lg font-bold tablet:text-2xl">
            {f.factory.title}
          </h3>
          <address className="not-italic text-gray-400 text-sm leading-relaxed tablet:text-[16px]">
            {f.factory.address}
          </address>
        </section>

        {/* Contact */}
        <section aria-labelledby="footer-contact">
          <h3 id="footer-contact" className="mb-1 text-lg font-bold tablet:text-2xl">
            {f.contact.phoneLabel || "Phone Number"}
          </h3>
          <ul className="mb-2 space-y-1 text-sm tablet:text-base">
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0" />
              <a className="hover:underline transition-colors text-gray-400" href={`tel:${f.contact.phone}`}>
                {f.contact.phone}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4 shrink-0" />
              <a className="hover:underline transition-colors text-gray-400" href={`tel:${f.contact.mobile}`}>
                {f.contact.mobile}
              </a>
            </li>
          </ul>

          <h3 className="mb-1 text-lg font-bold tablet:text-2xl">
            {f.contact.emailLabel || "Email Address"}
          </h3>
          <a
            className="mb-2 block text-sm hover:underline transition-colors tablet:text-base text-gray-400"
            href={`mailto:${f.contact.email}`}
          >
            {f.contact.email}
          </a>

          {/* Socials */}
          <div>
            <h4 className="mb-1 text-base font-bold tablet:text-2xl">
              {f.contact.followUs || "Follow Us"}
            </h4>
            <div className="flex items-center gap-3">
              {socials.map((s) => (
                <Link
                  key={s.key}
                  href={s.href!}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  title={s.label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/20 transition-all hover:bg-white/30 hover:scale-110"
                >
                  <s.Icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Keep bottom bar padding consistent at md and up */}
      <div className="border-t border-white/20 px-4 sm:px-6 tablet:px-8 laptop:px-10 py-4 text-center text-sm tablet:text-base">
        {f.copyright}
      </div>
    </footer>
  );
}
