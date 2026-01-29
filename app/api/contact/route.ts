import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import {
  ContactFormValues,
  hasContactFormErrors,
  normalizeFormValues,
  validateContactForm,
} from "@/lib/contact/form";
import { acknowledgementTemplate, enquiryTemplate } from "@/lib/contact/emailTemplates";

export const runtime = "nodejs";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://stelzparking.com";

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
    replyTo: normalizedValues.email,
    subject: `New enquiry from ${normalizedValues.name}`,
    text: enquiryTpl.text,
    html: enquiryTpl.html,
  };

  const customerMail = {
    from: fromEmail,
    to: normalizedValues.email,
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
