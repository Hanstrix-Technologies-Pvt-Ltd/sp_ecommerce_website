import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import {
  CONTACT_HONEYPOT_FIELD,
  MIN_FILL_TIME_MS,
  ContactFormValues,
  hasContactFormErrors,
  normalizeFormValues,
  validateContactForm,
} from "@/lib/contact/form";
import { acknowledgementTemplate, enquiryTemplate } from "@/lib/contact/emailTemplates";

export const runtime = "nodejs";

type ContactRequestBody = ContactFormValues & {
  honeypot?: string;
  durationMs?: number;
};

type RateLimitEntry = { count: number; expiresAt: number };

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;
const rateLimitStore = new Map<string, RateLimitEntry>();
const EMAIL_RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour per email
const EMAIL_RATE_LIMIT_MAX = 3;
const emailRateLimitStore = new Map<string, RateLimitEntry>();

const MAX_MESSAGE_LENGTH = 1500;
const MAX_NAME_LENGTH = 120;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://stelzparking.com";
const trustedHosts = new Set(
  [siteUrl, "http://localhost:3000", "http://127.0.0.1:3000"]
    .map((url) => {
      try {
        return new URL(url).host;
      } catch {
        return null;
      }
    })
    .filter(Boolean) as string[]
);

const invalidResponse = (message: string, status = 400) =>
  NextResponse.json({ success: false, message }, { status });

const getClientIp = (request: Request) => {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim();
  }

  return request.headers.get("x-real-ip") ?? "unknown";
};

const applyRateLimit = (key: string, store: Map<string, RateLimitEntry>, max: number, windowMs: number) => {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || entry.expiresAt < now) {
    store.set(key, { count: 1, expiresAt: now + windowMs });
    return false;
  }

  entry.count += 1;
  store.set(key, entry);

  return entry.count > max;
};

export async function POST(request: Request) {
  let body: ContactRequestBody;

  try {
    body = await request.json();
  } catch {
    return invalidResponse("Invalid request body");
  }

  if (!body || typeof body !== "object") {
    return invalidResponse("Request missing data");
  }

  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");
  const isTrustedOrigin = (...values: Array<string | null>) =>
    values.every((value) => {
      if (!value) return true;
      if (!/^https?:\/\//i.test(value)) return true; // allow relative refs
      try {
        return trustedHosts.has(new URL(value).host);
      } catch {
        return false;
      }
    });

  if (!isTrustedOrigin(origin, referer)) {
    return invalidResponse("Unauthorized origin", 403);
  }

  if ((body as Record<string, unknown>)[CONTACT_HONEYPOT_FIELD] || body.honeypot) {
    return invalidResponse("Spam detected", 422);
  }

  if (typeof body.durationMs === "number" && body.durationMs < MIN_FILL_TIME_MS) {
    return invalidResponse("Submission rejected", 422);
  }

  const normalizedValues = normalizeFormValues({
    name: typeof body.name === "string" ? body.name : "",
    email: typeof body.email === "string" ? body.email : "",
    phone: typeof body.phone === "string" ? body.phone : "",
    message: typeof body.message === "string" ? body.message : "",
  });
  const errors = validateContactForm(normalizedValues);

  if (normalizedValues.message.length > MAX_MESSAGE_LENGTH) {
    errors.message = `Message is too long (max ${MAX_MESSAGE_LENGTH} characters).`;
  }

  if (normalizedValues.name.length > MAX_NAME_LENGTH) {
    errors.name = `Name is too long (max ${MAX_NAME_LENGTH} characters).`;
  }

  if (hasContactFormErrors(errors)) {
    return NextResponse.json({ success: false, errors }, { status: 400 });
  }

  const clientIp = getClientIp(request);
  if (applyRateLimit(`ip:${clientIp}`, rateLimitStore, RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_MS)) {
    return invalidResponse("Too many requests. Please try again later.", 429);
  }

  if (applyRateLimit(`email:${normalizedValues.email}`, emailRateLimitStore, EMAIL_RATE_LIMIT_MAX, EMAIL_RATE_LIMIT_WINDOW_MS)) {
    return invalidResponse("Too many requests from this email. Please try again later.", 429);
  }

  const smtpUser = process.env.SMTP_USERNAME;
  const smtpPass = process.env.SMTP_PASSWORD;
  const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
  const smtpPort = Number(process.env.SMTP_PORT || 465);

  if (!smtpUser || !smtpPass) {
    return invalidResponse("Email service not configured", 500);
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  // Use the single company mailbox for sending and receiving.
  const fromEmail = smtpUser;
  const companyRecipient = smtpUser;

  const enquiryTpl = enquiryTemplate({
    name: normalizedValues.name,
    email: normalizedValues.email,
    phone: normalizedValues.phone,
    message: normalizedValues.message,
    companyEmail: fromEmail,
    siteUrl,
  });

  const acknowledgementTpl = acknowledgementTemplate({
    name: normalizedValues.name,
    email: normalizedValues.email,
    phone: normalizedValues.phone,
    message: normalizedValues.message,
    companyEmail: fromEmail,
    siteUrl,
  });

  const companyMail = {
    from: fromEmail,
    to: companyRecipient,
    replyTo: normalizedValues.email, // company can reply directly to the user
    subject: `New enquiry from ${normalizedValues.name}`,
    text: enquiryTpl.text,
    html: enquiryTpl.html,
  };

  const customerMail = {
    from: fromEmail,
    to: normalizedValues.email, // dynamic: send acknowledgement to the user's email
    subject: "We received your request",
    text: acknowledgementTpl.text,
    html: acknowledgementTpl.html,
  };

  try {
    await transporter.sendMail(companyMail);
    await transporter.sendMail(customerMail);
    return NextResponse.json({ success: true, message: "Message sent" });
  } catch {
    return invalidResponse("Unable to send message right now", 502);
  }
}
