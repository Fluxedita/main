import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Check if we're in production
const isProduction = process.env.NODE_ENV === 'production';

export async function POST(request: Request) {
  try {
    const formData = await request.json();
    
    // Create a transporter object using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Send mail with defined transport object
    const info = await transporter.sendMail({
      from: `"${formData.name}" <${formData.email}>`,
      to: 'jamescroanin@gmail.com',
      subject: `New Contact Form Submission from ${formData.name}`,
      text: formData.message,
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Message:</strong></p>
        <p>${formData.message.replace(/\n/g, '<br>')}</p>
      `,
    });

    console.log('Message sent: %s', info.messageId);

    return NextResponse.json({ 
      success: true, 
      message: 'Message sent successfully!',
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send message' },
      { status: 500 }
    );
  }
}
