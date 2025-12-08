// lib/contact/emailTemplates.ts

export type TemplateInput = {
  name: string;
  email: string;
  phone: string;
  message: string;
  companyEmail: string;
  siteUrl?: string; // e.g. https://stelzparking.com
};

const FALLBACK_SITE = "https://stelzparking.com";

const normalizeBaseUrl = (base?: string) => {
  const b = (base || "").trim();
  if (!b) return FALLBACK_SITE;
  if (/^https?:\/\//i.test(b)) return b;
  return `https://${b.replace(/^\/+/, "")}`;
};

const safeUrl = (path: string, base?: string) => {
  const baseUrl = normalizeBaseUrl(base);
  try {
    return new URL(path, baseUrl).toString();
  } catch {
    return `${baseUrl}${path.startsWith("/") ? "" : "/"}${path}`;
  }
};

const baseStyles = {
  pageBg: "#faf6ee",
  cardBg: "#fefbf5",
  primary: "#2458a4",
  accent: "#0f4ca3",
  text: "#0f172a",
  subtext: "#374151",
  border: "#d1d5db",
  softBorder: "#e5e7eb",
};

const defaultSocials: Record<string, string> = {
  linkedin: "https://www.linkedin.com/company/stlezparking/?viewAsMember=true",
  instagram:
    "https://www.instagram.com/stelz_multiparking/?igsh=MXM2YmV3YWFmeTVoaw%3D%3D#",
  youtube: "https://www.youtube.com/@stelzparking",
  facebook: "https://www.facebook.com/people/STELZ-Parking/61553166070631/",
};

type SocialKey = "linkedin" | "instagram" | "youtube" | "facebook";

const logoSrc = (siteUrl?: string) =>
  safeUrl("/assets/email/LogoTransparent.png", siteUrl);

const socialIconSrc = (key: SocialKey, siteUrl?: string) =>
  safeUrl(`/assets/email/${key}.png`, siteUrl);

const escapeHtml = (s: string) =>
  s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const escapeAndPreserveNewlines = (s: string) =>
  escapeHtml(s).replaceAll("\n", "<br/>");

const containerOpen = (title: string) => `
<!DOCTYPE html>
<html lang="en">
<body style="margin:0;padding:0;background:${baseStyles.pageBg};">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center"
    style="width:100%;background:${baseStyles.pageBg};padding:16px 0;">
    <tr>
      <td align="center">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0"
          style="width:100%;max-width:640px;background:${baseStyles.cardBg};
          font-family:'Times New Roman', Times, serif;color:${baseStyles.text};">
          <tr>
            <td style="background:${baseStyles.primary};padding:18px 24px;text-align:center;">
              <span style="color:#fff;font-size:22px;font-weight:700;letter-spacing:0.6px;">
                ${title}
              </span>
            </td>
          </tr>`;

const containerClose = `
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

const footer = (siteUrl?: string) => {
  const homeUrl = safeUrl("/", siteUrl);
  const logo = logoSrc(siteUrl);

  const socials: [SocialKey, string][] = [
    ["linkedin", defaultSocials.linkedin],
    ["instagram", defaultSocials.instagram],
    ["youtube", defaultSocials.youtube],
    ["facebook", defaultSocials.facebook],
  ].filter(([, href]) => !!href) as [SocialKey, string][];

  const icons = socials
    .map(
      ([key, href]) => `
        <td style="padding:0 6px;">
          <a href="${href}" target="_blank" rel="noopener noreferrer" style="display:inline-block;">
            <img src="${socialIconSrc(key, siteUrl)}" alt="${key}" width="22" height="22"
              style="width:22px;height:22px;display:block;border:0;outline:0;text-decoration:none;" />
          </a>
        </td>`,
    )
    .join("");

  return `
    <tr>
      <td style="padding:22px 18px 6px;text-align:center;background:${baseStyles.cardBg};">
        <a href="${homeUrl}" style="display:inline-block;text-decoration:none;">
          <img src="${logo}" alt="STELZ Multiparking" width="170"
            style="max-width:170px;height:auto;display:block;margin:0 auto;border:0;outline:0;text-decoration:none;" />
        </a>
      </td>
    </tr>
    <tr>
      <td style="padding:0 18px 4px;text-align:center;background:${baseStyles.cardBg};">
        <div style="font-size:12px;line-height:1.6;color:${baseStyles.subtext};">
          2nd Floor, No. 1595, Opp. Rajsri Apartments, BEML Layout, Rajarajeshwari Nagar, Bengaluru, Karnataka 560098
        </div>
      </td>
    </tr>
    <tr>
      <td style="padding:4px 18px 10px;text-align:center;background:${baseStyles.cardBg};">
        <a href="${homeUrl}" style="font-size:12px;color:${baseStyles.subtext};text-decoration:none;">
          www.stelzparking.com
        </a>
      </td>
    </tr>
    <tr>
      <td style="padding:10px 18px 0;text-align:center;background:${baseStyles.cardBg};">
        <div style="font-size:12px;color:${baseStyles.subtext};margin-bottom:8px;">Follow us on</div>
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
          <tr>${icons}</tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding:10px 18px 18px;background:${baseStyles.cardBg};"></td>
    </tr>`;
};

/* ---------------- Customer Acknowledgement (rich like screenshot) ---------------- */
export function acknowledgementTemplate(input: TemplateInput) {
  const replyMailto = `mailto:${encodeURIComponent(input.companyEmail)}`;

  const text = [
    "Acknowledgement",
    "",
    "Thank you for contacting STELZ MULTIPARKING",
    "",
    `Dear ${input.name || "Sir/Madam"},`,
    "",
    "We have received your enquiry and forwarded it to the concerned department. Our team will review the details and get back to you shortly with the required information.",
    "",
    "If your request is urgent, please call us on 080 500 57071 or email info@stelzparking.com.",
  ].join("\n");

  const html = `${containerOpen("Acknowledgement")}
          <tr>
            <td style="padding:26px 28px 12px 28px;">
              <div style="font-size:18px;font-weight:700;margin-bottom:14px;">
                Thank you for contacting STELZ MULTIPARKING
              </div>

              <div style="font-size:15px;line-height:1.7;margin-bottom:14px;">
                Dear ${escapeHtml(input.name || "Sir/Madam")},
              </div>

              <div style="font-size:15px;line-height:1.7;margin-bottom:14px;">
                We have received your enquiry and forwarded it to the concerned department.
                Our team will review the details and get back to you shortly with the required information.
              </div>

              <div style="font-size:15px;line-height:1.7;margin-bottom:16px;">
                If your request is urgent, please call us on
                <a href="tel:+918050057071" style="color:${baseStyles.primary};text-decoration:underline;">080 500 57071</a>
                or email
                <a href="mailto:info@stelzparking.com" style="color:${baseStyles.primary};text-decoration:underline;">info@stelzparking.com</a>.
              </div>

              <div style="border-bottom:2px solid ${baseStyles.border};margin:10px 0 22px 0;"></div>

              <div style="text-align:center;margin:0 0 22px 0;">
                <a href="${replyMailto}"
                  style="display:inline-block;background:${baseStyles.primary};color:#fff;text-decoration:none;
                  padding:14px 44px;border-radius:999px;font-weight:700;font-size:18px;">
                  Contact Support
                </a>
              </div>

              <table role="presentation" cellspacing="0" cellpadding="0" border="0"
                style="width:100%;background:#ffffff;border-radius:16px;border:1px solid ${baseStyles.softBorder};">
                <tr>
                  <td style="padding:18px 18px 16px;">
                    <div style="color:${baseStyles.primary};font-weight:700;font-size:14px;margin-bottom:8px;">
                      STELZ MULTIPARKING
                    </div>
                    <div style="color:${baseStyles.text};font-size:13px;line-height:1.6;margin-bottom:10px;">
                      Premier experts in mechanical multilevel car parking systems
                    </div>
                    <div style="color:${baseStyles.text};font-size:12px;line-height:1.6;margin-bottom:12px;">
                      Bengaluru | Pune | Kerala | Chennai | Hyderabad | Delhi | Mumbai.
                    </div>
                    <div style="color:#6b7280;font-size:12px;line-height:1.6;">
                      This is an automated acknowledgement. Your enquiry has been recorded and will be handled by the relevant team.
                      If you think this was sent in error, please reply to this email or contact us at info@stelzparking.com.
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          ${footer(input.siteUrl)}
${containerClose}`;

  return { html, text };
}

/* ---------------- Company Notification (compact internal) ---------------- */
export function enquiryTemplate(input: TemplateInput) {
  const replyToUser = `mailto:${encodeURIComponent(
    input.email,
  )}?subject=Re:%20Your%20Enquiry`;

  const text = [
    "New enquiry received",
    "",
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    `Phone: ${input.phone}`,
    `Message: ${input.message}`,
  ].join("\n");

  const html = `
<!DOCTYPE html>
<html lang="en">
<body style="margin:0;padding:0;background:#ffffff;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="width:100%;background:#ffffff;">
    <tr>
      <td align="center" style="padding:16px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0"
          style="width:100%;max-width:640px;font-family:'Times New Roman', Times, serif;color:${baseStyles.text};">
          <tr>
            <td style="padding:0 0 10px 0;">
              <div style="font-size:18px;font-weight:700;">New enquiry received</div>
            </td>
          </tr>

          <tr>
            <td>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0"
                style="width:100%;background:#ffffff;border-radius:12px;border:1px solid ${baseStyles.softBorder};">
                <tr>
                  <td style="padding:14px 16px;">
                    <div style="color:${baseStyles.primary};font-weight:700;font-size:14px;margin-bottom:10px;">
                      Details
                    </div>

                    <div style="font-size:14px;line-height:1.6;margin-bottom:6px;">
                      <strong>Name:</strong> ${escapeHtml(input.name)}
                    </div>

                    <div style="font-size:14px;line-height:1.6;margin-bottom:6px;">
                      <strong>Email:</strong>
                      <a href="mailto:${escapeHtml(input.email)}" style="color:${baseStyles.primary};text-decoration:underline;">
                        ${escapeHtml(input.email)}
                      </a>
                    </div>

                    <div style="font-size:14px;line-height:1.6;margin-bottom:6px;">
                      <strong>Phone:</strong> ${escapeHtml(input.phone)}
                    </div>

                    <div style="font-size:14px;line-height:1.6;margin-bottom:12px;">
                      <strong>Message:</strong><br/>
                      ${escapeAndPreserveNewlines(input.message)}
                    </div>

                    <div style="text-align:left;">
                      <a href="${replyToUser}"
                        style="display:inline-block;background:${baseStyles.primary};color:#fff;text-decoration:none;
                        padding:10px 18px;border-radius:999px;font-weight:700;font-size:14px;">
                        Reply to customer
                      </a>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return { html, text };
}
