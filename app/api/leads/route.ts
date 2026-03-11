import { NextRequest, NextResponse } from 'next/server';
import { LeadData, LeadCaptureResponse } from '@/lib/leadCapture';
import { brochureDownloadTemplate } from '@/lib/contact/emailTemplates';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const leadData: LeadData = await request.json();

    // Validate required fields
    const requiredFields = ['name', 'contactNumber', 'projectName', 'projectLocation'];
    const missingFields = requiredFields.filter(field => !leadData[field as keyof LeadData]?.trim());

    if (missingFields.length > 0) {
      return NextResponse.json(
        { 
          success: false, 
          message: `Missing required fields: ${missingFields.join(', ')}` 
        },
        { status: 400 }
      );
    }

    // Validate contact number format
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    const cleanPhone = leadData.contactNumber.replace(/\s/g, '');
    if (!phoneRegex.test(cleanPhone)) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid contact number format' 
        },
        { status: 400 }
      );
    }

    // Generate unique lead ID
    const leadId = `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Store lead data (in production, this would go to CRM)
    console.log('Storing lead data:', { ...leadData, leadId, timestamp: new Date().toISOString() });

    // Send email notification to info@stelzparking.com
    try {
      const smtpUser = process.env.SMTP_USERNAME;
      const smtpPass = process.env.SMTP_PASSWORD;
      const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
      const smtpPort = Number(process.env.SMTP_PORT || 465);

      if (smtpUser && smtpPass) {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpPort === 465,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        const emailTemplate = brochureDownloadTemplate({
          name: leadData.name,
          contactNumber: leadData.contactNumber,
          projectName: leadData.projectName,
          projectLocation: leadData.projectLocation,
          timestamp: new Date().toISOString(),
          companyEmail: smtpUser,
        });

        const mailOptions = {
          from: smtpUser,
          to: 'info@stelzparking.com',
          subject: 'New Brochure Download Request – STELZ Website',
          text: emailTemplate.text,
          html: emailTemplate.html,
        };

        await transporter.sendMail(mailOptions);
        console.log('Email notification sent to info@stelzparking.com');
      } else {
        console.warn('SMTP credentials not configured, skipping email notification');
      }
    } catch (emailError) {
      console.error('Failed to send email notification:', emailError);
      // Continue with lead capture even if email fails
    }

    // TODO: Integrate with actual CRM/Database
    // For now, we'll store in memory or send to email/webhook
    
    return NextResponse.json({
      success: true,
      message: 'Lead captured successfully',
      leadId,
    });
  } catch (error) {
    console.error('Lead capture API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error' 
      },
      { status: 500 }
    );
  }
}
