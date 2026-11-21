import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import {
  ContactFormValues,
  hasContactFormErrors,
  normalizeFormValues,
  validateContactForm,
} from "@/lib/contact/form";
import { acknowledgementTemplate, enquiryTemplate } from "@/lib/contact/emailTemplates";
import { prisma } from "@/lib/cms/db";
import { clientIp, findRecentDuplicate, isRateLimited, safeGreetingName } from "@/lib/publicForms";

export const runtime = "nodejs";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://stelzparking.com";

// Generous limits for real enquiries; anything longer is rejected (stops huge spam payloads).
const MAX = { name: 120, email: 200, phone: 30, message: 5000 };

const invalidResponse = (message: string, status = 400) =>
  NextResponse.json({ success: false, message }, { status });

export async function POST(request: Request) {
  let body: ContactFormValues;

  try {
    body = await request.json();
  } catch {
    return invalidResponse("Invalid request body");
  }

  if (!body || typeof body !== "object") {
    return invalidResponse("Request missing data");
  }

  // Honeypot: the form has a hidden "company_website" field real visitors never see or fill.
  // If it has a value, it's a bot: report success (so it doesn't retry) but save/send nothing.
  const honeypot = (body as { honeypot?: unknown }).honeypot;
  if (typeof honeypot === "string" && honeypot.trim()) {
    return NextResponse.json({ success: true, message: "Message sent" });
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
  for (const [field, max] of Object.entries(MAX) as [keyof typeof MAX, number][]) {
    if (normalizedValues[field].length > max) {
      return NextResponse.json(
        { success: false, errors: { [field]: `Please keep this under ${max} characters.` } },
        { status: 400 },
      );
    }
  }

  if (isRateLimited("contact", clientIp(request))) {
    return invalidResponse("Too many messages from your connection. Please try again in a few minutes.", 429);
  }

  // A double-submit of the same enquiry: report success without saving or emailing it twice.
  const duplicate = await findRecentDuplicate({
    source: "contact",
    contactNumber: normalizedValues.phone,
    email: normalizedValues.email,
    message: normalizedValues.message,
  });
  if (duplicate) {
    return NextResponse.json({ success: true, message: "Message sent" });
  }

  // 1) Save the enquiry first, so it's never lost even if email isn't working.
  let leadId: string | null = null;
  try {
    const saved = await prisma.lead.create({
      data: {
        name: normalizedValues.name,
        contactNumber: normalizedValues.phone,
        email: normalizedValues.email,
        message: normalizedValues.message,
        projectName: "",
        projectLocation: "",
        source: "contact",
        page: "/contact",
      },
      select: { id: true },
    });
    leadId = saved.id;
  } catch (error) {
    console.error("[contact] failed to save enquiry to the database:", error);
  }

  // 2) Email the company, then acknowledge the visitor.
  const smtpUser = process.env.SMTP_USERNAME;
  const smtpPass = process.env.SMTP_PASSWORD;
  let companyEmailSent = false;

  if (smtpUser && smtpPass) {
    const smtpPort = Number(process.env.SMTP_PORT || 465);
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: smtpPort,
      secure: smtpPort === 465,
      auth: { user: smtpUser, pass: smtpPass },
    });

    const enquiryTpl = enquiryTemplate({
      name: normalizedValues.name,
      email: normalizedValues.email,
      phone: normalizedValues.phone,
      message: normalizedValues.message,
      companyEmail: smtpUser,
      siteUrl,
    });

    try {
      await transporter.sendMail({
        from: smtpUser,
        to: smtpUser,
        replyTo: normalizedValues.email,
        subject: `New enquiry from ${normalizedValues.name.slice(0, 80)}`,
        text: enquiryTpl.text,
        html: enquiryTpl.html,
      });
      companyEmailSent = true;
    } catch (error) {
      console.error("[contact] failed to send enquiry email:", error);
    }

    // The acknowledgement goes to whatever address was typed in, so it only ever greets by a
    // plausible name and never repeats the visitor's message. A failure here (e.g. a mistyped
    // address) must not make the visitor think their enquiry failed.
    if (companyEmailSent || leadId) {
      const acknowledgementTpl = acknowledgementTemplate({
        name: safeGreetingName(normalizedValues.name),
        email: normalizedValues.email,
        phone: "",
        message: "",
        companyEmail: smtpUser,
        siteUrl,
      });
      await transporter
        .sendMail({
          from: smtpUser,
          to: normalizedValues.email,
          subject: "We received your request",
          text: acknowledgementTpl.text,
          html: acknowledgementTpl.html,
        })
        .catch((error) => console.error("[contact] failed to send acknowledgement:", error));
    }
  } else {
    console.warn("[contact] SMTP credentials not configured, enquiry saved without email");
  }

  if (leadId && companyEmailSent) {
    await prisma.lead.update({ where: { id: leadId }, data: { emailSent: true } }).catch(() => undefined);
  }

  if (!leadId && !companyEmailSent) {
    return invalidResponse("Unable to send message right now. Please call us on 080 500 57071.", 503);
  }
  return NextResponse.json({ success: true, message: "Message sent" });
}
