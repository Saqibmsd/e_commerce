import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const data = await request.json();

    // Basic validation
    if (!data) {
      return NextResponse.json({ message: 'No data provided' }, { status: 400 });
    }

    // If SMTP env is configured, try to send email via nodemailer
    const smtpHost = process.env.SMTP_HOST;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const notifyTo = process.env.NOTIFY_TO; // email to send notifications to

    const twilioSid = process.env.TWILIO_ACCOUNT_SID;
    const twilioToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioFrom = process.env.TWILIO_FROM; // e.g., +123456789

    const results = { email: null, sms: null, info: null };

    if (smtpHost && smtpUser && smtpPass && notifyTo) {
      try {
        const nodemailer = await import('nodemailer');
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587,
          secure: process.env.SMTP_SECURE === 'true',
          auth: { user: smtpUser, pass: smtpPass },
        });

        const html = `<h3>New delivery request</h3>
          <p><strong>Name:</strong> ${data.name || ''}</p>
          <p><strong>Phone:</strong> ${data.phone || ''}</p>
          <p><strong>Email:</strong> ${data.email || ''}</p>
          <p><strong>Address:</strong> ${data.address || ''} ${data.city || ''} ${data.postalCode || ''}</p>
          <p><strong>Order total:</strong> $${data.total || ''}</p>
          <p><strong>Notes:</strong> ${data.notes || ''}</p>`;

        const info = await transporter.sendMail({
          from: smtpUser,
          to: notifyTo,
          subject: `Delivery request from ${data.name || 'Customer'}`,
          html,
        });

        results.email = { ok: true, info: info.messageId || info }; 
      } catch (err) {
        results.email = { ok: false, error: err.message };
      }
    }

    // If Twilio info provided, attempt SMS/WhatsApp
    if (twilioSid && twilioToken && twilioFrom && data.phone) {
      try {
        const twilio = await import('twilio');
        const client = twilio.default(twilioSid, twilioToken);
        const sms = await client.messages.create({
          body: `Hi ${data.name || ''}, we received your delivery request. Total: $${data.total || ''}`,
          from: twilioFrom,
          to: data.phone,
        });
        results.sms = { ok: true, sid: sms.sid };
      } catch (err) {
        results.sms = { ok: false, error: err.message };
      }
    }

    // If no provider configured, return the data back so developer can test
    if (!results.email && !results.sms) {
      results.info = 'No email/SMS provider configured. Set SMTP_* or TWILIO_* env vars to enable.';
    }

    return NextResponse.json({ message: 'Processed', results });
  } catch (err) {
    return NextResponse.json({ message: err.message || 'Server error' }, { status: 500 });
  }
}
