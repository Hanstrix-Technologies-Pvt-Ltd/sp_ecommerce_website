import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { z } from 'zod';
import { brochureDownloadTemplate, datasheetDownloadTemplate } from '@/lib/contact/emailTemplates';
import { prisma } from '@/lib/cms/db';

export const runtime = 'nodejs';

const text = (max: number) => z.string().trim().max(max);

const leadSchema = z.object({
  name: text(120).min(1, 'Name is required'),
  contactNumber: text(30)
    .min(1, 'Contact number is required')
    .refine((v) => /^\+?[\d\s-]{10,}$/.test(v.replace(/\s/g, '')), 'Invalid contact number format'),
  projectName: text(200).min(1, 'Project name is required'),
  projectLocation: text(200).min(1, 'Project location is required'),
  // The floating "Download Brochure" button doesn't send a source, so default to brochure.
  source: z.enum(['brochure_download', 'datasheet_download']).catch('brochure_download'),
  product: text(200).optional().catch(''),
  page: text(300).optional().catch(''),
});

/** Email the lead to info@stelzparking.com. Returns whether it was sent. */
async function sendNotification(lead: z.infer<typeof leadSchema>, timestamp: string): Promise<boolean> {
  const smtpUser = process.env.SMTP_USERNAME;
  const smtpPass = process.env.SMTP_PASSWORD;
  if (!smtpUser || !smtpPass) {
    console.warn('[leads] SMTP credentials not configured, skipping email notification');
    return false;
  }
  const smtpPort = Number(process.env.SMTP_PORT || 465);
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: smtpPort,
    secure: smtpPort === 465,
    auth: { user: smtpUser, pass: smtpPass },
  });

  const isDatasheet = lead.source === 'datasheet_download';
  const input = {
    name: lead.name,
    contactNumber: lead.contactNumber,
    projectName: lead.projectName,
    projectLocation: lead.projectLocation,
    timestamp,
    companyEmail: smtpUser,
  };
  const template = isDatasheet ? datasheetDownloadTemplate(input) : brochureDownloadTemplate(input);

  await transporter.sendMail({
    from: smtpUser,
    to: 'info@stelzparking.com',
    subject: isDatasheet
      ? 'New Datasheet Download Request – STELZ Website'
      : 'New Brochure Download Request – STELZ Website',
    text: template.text,
    html: template.html,
  });
  return true;
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, message: 'Invalid request' }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    const message = parsed.error.issues[0]?.message || 'Please check the form';
    return NextResponse.json({ success: false, message }, { status: 400 });
  }
  const lead = parsed.data;
  const timestamp = new Date().toISOString();

  // 1) Save the lead first, so it's never lost even if the email fails.
  let leadId: string | null = null;
  try {
    const saved = await prisma.lead.create({
      data: {
        name: lead.name,
        contactNumber: lead.contactNumber,
        projectName: lead.projectName,
        projectLocation: lead.projectLocation,
        source: lead.source,
        product: lead.product || '',
        page: lead.page || '',
      },
      select: { id: true },
    });
    leadId = saved.id;
  } catch (error) {
    console.error('[leads] failed to save lead to the database:', error);
  }

  // 2) Notify by email, and record whether it went out.
  let emailSent = false;
  try {
    emailSent = await sendNotification(lead, timestamp);
  } catch (error) {
    console.error('[leads] failed to send email notification:', error);
  }
  if (leadId && emailSent) {
    await prisma.lead.update({ where: { id: leadId }, data: { emailSent: true } }).catch(() => undefined);
  }

  if (!leadId && !emailSent) {
    // Neither stored nor emailed: tell the visitor rather than silently losing the lead.
    return NextResponse.json(
      { success: false, message: 'Sorry, we could not submit your details. Please try again.' },
      { status: 503 },
    );
  }

  return NextResponse.json({
    success: true,
    message: 'Lead captured successfully',
    leadId: leadId ?? `email_${Date.now()}`,
  });
}
