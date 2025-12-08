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

const invalidResponse = (message: string, status = 400) =>
  NextResponse.json({ success: false, message }, { status });

const getClientIp = (request: Request) => {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim();
  }

  return request.headers.get("x-real-ip") ?? "unknown";
};

const isRateLimited = (ip: string) => {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);

  if (!entry || entry.expiresAt < now) {
    rateLimitStore.set(ip, { count: 1, expiresAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  entry.count += 1;
  rateLimitStore.set(ip, entry);

  return entry.count > RATE_LIMIT_MAX;
};

export async function POST(request: Request) {
  let body: ContactRequestBody;

  try {
    body = await request.json();
  } catch (error) {
    return invalidResponse("Invalid request body");
  }

  if (!body || typeof body !== "object") {
    return invalidResponse("Request missing data");
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

  if (hasContactFormErrors(errors)) {
    return NextResponse.json({ success: false, errors }, { status: 400 });
  }

  const clientIp = getClientIp(request);
  if (isRateLimited(clientIp)) {
    return invalidResponse("Too many requests. Please try again later.", 429);
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

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://stelzparking.com";

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
  } catch (error) {
    return invalidResponse("Unable to send message right now", 502);
  }
}
