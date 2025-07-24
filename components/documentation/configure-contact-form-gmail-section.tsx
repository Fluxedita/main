"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence, easeOut } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDown, ArrowUp, Mail, KeyRound, FileText } from "lucide-react"

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: easeOut,
    },
  },
}

const introHighlights = [
  {
    icon: Mail,
    title: "Gmail Integration",
    description: "Guide for configuring the contact form to send emails via Gmail.",
    color: "from-red-500 to-pink-600",
  },
  {
    icon: KeyRound,
    title: "App Password Setup",
    description: "Secure your Gmail account with app passwords for SMTP.",
    color: "from-pink-600 to-yellow-400",
  },
  {
    icon: FileText,
    title: "Form & API Configuration",
    description: "Update environment, API route, and frontend for attachments.",
    color: "from-yellow-400 to-orange-500",
  },
]

const fullContent = (
  <>
    <h3 className="text-2xl font-bold text-gray-900 mb-3">Configure Contact Form Component for Gmail</h3>
    <div className="prose max-w-none">
      <h4 id="gmail-app-password">1. Set Up a Gmail App Password</h4>
      <ol className="list-decimal pl-6">
        <li>
          <strong>Enable 2-Step Verification</strong> on your Gmail account: <a href="https://myaccount.google.com/security" target="_blank" rel="noopener noreferrer">Google Account Security</a>
        </li>
        <li>
          <strong>Generate an App Password:</strong>
          <ul>
            <li>Go to "App passwords" in your Google Account Security settings.</li>
            <li>Select "Mail" as the app and "Other" (name it e.g. "Nodemailer").</li>
            <li>Copy the 16-character password Google generates (you’ll use it below).</li>
            <li>Direct link: <a href="https://accounts.google.com/v3/signin/confirmidentifier?authuser=0&continue=https%3A%2F%2Fmyaccount.google.com%2Fapppasswords&followup=https%3A%2F%2Fmyaccount.google.com%2Fapppasswords&ifkv=AdBytiNDFwqPBJGN-Mplb-V6JMHQUSfRXXlWbFt4IzShgrgDRAC_Yx5oD0Ul0Oe70gqdo4J5xdC_eg&osid=1&passive=1209600&rart=ANgoxcdzSMeY0avoxVsjJZchWnlb32Y3bwP9Mx4Hns4JI2csXjmxplmOwqce-x-Fl9NNVX9tEIGlQfeAmGfBSOJgbsX4dZDbwExgUuemnCmpEX9Aij5-6LA&service=accountsettings&flowName=GlifWebSignIn&flowEntry=ServiceLogin&dsh=S1278797679%3A1752137990576369" target="_blank" rel="noopener noreferrer">App Passwords</a></li>
          </ul>
        </li>
      </ol>
      <h4 id="env-vars">2. Update Your Environment Variables</h4>
      <ol className="list-decimal pl-6">
        <li>In your project root, open or create <code>.env.local</code>.</li>
        <li>Add:</li>
      </ol>
      <pre className="bg-gray-100 rounded p-4 overflow-x-auto text-sm mb-4"><code>{`GMAIL_APP_PASSWORD=your_16_character_app_password_here`}</code></pre>
      <p className="text-sm text-red-600">(Do not use your main Gmail password!)</p>
      <h4 id="update-api-email">3. Update the Email Address in the API Route</h4>
      <ol className="list-decimal pl-6">
        <li>Open <code>app/api/contact/route.ts</code>.</li>
        <li>Find:</li>
      </ol>
      <pre className="bg-gray-100 rounded p-4 overflow-x-auto text-sm mb-4"><code>{`const OWNER_EMAIL = 'yourgmail@gmail.com'; // Your Gmail address`}</code></pre>
      <ol className="list-decimal pl-6" start={3}>
        <li>Replace with your own Gmail address.</li>
      </ol>
      <h4 id="install-packages">4. Install Required Packages</h4>
      <pre className="bg-gray-100 rounded p-4 overflow-x-auto text-sm mb-4"><code>{`npm install nodemailer formidable\nnpm install --save-dev @types/formidable`}</code></pre>
      <h4 id="verify-api-route">5. Verify the API Route Code</h4>
      <p>Your <code>app/api/contact/route.ts</code> should look like this (key parts shown):</p>
      <pre className="bg-gray-100 rounded p-4 overflow-x-auto text-xs mb-4"><code>{`import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import formidable from 'formidable';
import fs from 'fs';
import type { Fields, Files } from 'formidable';

export const config = {
  api: { bodyParser: false },
};

const OWNER_EMAIL = 'yourgmail@gmail.com'; // <-- Your Gmail address

async function parseForm(req: Request): Promise<{ fields: Fields; files: Files }> {
  const form = formidable({ multiples: true, keepExtensions: true });
  const buffers = [];
  for await (const chunk of req.body as any) {
    buffers.push(chunk);
  }
  const buffer = Buffer.concat(buffers);
  return await new Promise((resolve, reject) => {
    form.parse(
      // @ts-ignore
      { ...req, headers: req.headers, url: req.url, method: req.method, socket: req.socket, body: buffer },
      (err: any, fields: Fields, files: Files) => {
        if (err) reject(err);
        else resolve({ fields, files });
      }
    );
  });
}

export async function POST(req: Request) {
  try {
    const { fields, files } = await parseForm(req);

    if (!fields.name || !fields.email || !fields.message) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    const attachments = [];
    if (files.profileImage) {
      const file = Array.isArray(files.profileImage) ? files.profileImage[0] : files.profileImage;
      attachments.push({
        filename: file.originalFilename || 'attachment',
        content: fs.createReadStream(file.filepath),
      });
    }
    if (files.profileVideo) {
      const file = Array.isArray(files.profileVideo) ? files.profileVideo[0] : files.profileVideo;
      attachments.push({
        filename: file.originalFilename || 'attachment',
        content: fs.createReadStream(file.filepath),
      });
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: OWNER_EMAIL,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: '"Contact Form" <' + OWNER_EMAIL + '>',
      to: OWNER_EMAIL,
      subject: 'New Contact Form Submission from ' + fields.name,
      html: '<h2>New Contact Form Submission</h2>' +
        '<p><strong>Name:</strong> ' + fields.name + '</p>' +
        '<p><strong>Email:</strong> ' + fields.email + '</p>' +
        '<p><strong>Message:</strong><br/>' + fields.message + '</p>',
      replyTo: fields.email,
      attachments,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('API error:', err);
    return NextResponse.json({ error: 'Server error.' }, { status: 500 });
  }
}`}</code></pre>
      <h4 id="frontend-form">6. Update the Frontend Form Submission</h4>
      <p>In <code>components/contact/ContactForm.tsx</code>, ensure the form submission uses <code>FormData</code> and sends files:</p>
      <pre className="bg-gray-100 rounded p-4 overflow-x-auto text-sm mb-4"><code>{`const formDataToSend = new FormData();
formDataToSend.append('name', formData.name);
formDataToSend.append('email', formData.email);
formDataToSend.append('message', formData.message);

if (profileImage) {
  formDataToSend.append('profileImage', profileImage);
}
if (profileVideo) {
  formDataToSend.append('profileVideo', profileVideo);
}

const response = await fetch('/api/contact', {
  method: 'POST',
  body: formDataToSend,
});`}</code></pre>
      <h4 id="restart-server">7. Restart Your Dev Server</h4>
      <p>After changing <code>.env.local</code> or installing new packages:</p>
      <pre className="bg-gray-100 rounded p-4 overflow-x-auto text-sm mb-4"><code>{`npm run dev`}</code></pre>
      <h4 id="test-form">8. Test the Contact Form</h4>
      <ul>
        <li>Fill out the form and submit.</li>
        <li>Check your Gmail inbox (and spam folder) for the email.</li>
        <li>Try attaching an image and/or video to confirm attachments work.</li>
      </ul>
      <h4 id="troubleshooting">9. Troubleshooting</h4>
      <ul>
        <li><strong>No email received?</strong> Check your server logs for errors.</li>
        <li><strong>Authentication error?</strong> Double-check your app password and Gmail address.</li>
        <li><strong>Attachments missing?</strong> Make sure you’re using <code>FormData</code> and the backend is parsing files with <code>formidable</code>.</li>
      </ul>
      <h4 id="security-note">10. Security Note</h4>
      <ul>
        <li>Never commit your <code>.env.local</code> file or app password to version control (git).</li>
      </ul>
      <hr className="my-6" />
      <h3 className="text-xl font-bold text-green-700">✅ You’re Done!</h3>
      <p>Your contact form is now fully configured to send emails (with attachments) via your Gmail account.</p>
      <h4 id="associated-files">Associated Files</h4>
      <p>Below is a list of all files that are directly involved in the contact form feature. <strong>Files marked with [MUST EDIT] are required to be changed for your Gmail setup.</strong></p>
      <pre className="bg-gray-100 rounded p-4 overflow-x-auto text-xs mb-4"><code>{`app/api/contact/route.ts   [MUST EDIT]
    - The API route that receives form submissions and sends emails (with attachments) via Gmail SMTP. You must set your Gmail address and ensure the logic matches your needs.

components/contact/ContactForm.tsx   [MUST EDIT]
    - The main contact form React component. Handles form UI, validation, and submission (including file uploads). You must ensure the form fields and submission logic match your requirements.

.env.local   [MUST EDIT]
    - Environment variables file. Stores your Gmail app password (GMAIL_APP_PASSWORD). You must add your app password here.

app/custom_contact_section/FluxeditaAdvancedFormSection.tsx
    - Section wrapper for the advanced contact form, used to add the form as a section on the home page or other pages.

app/custom_pages/components/PageControls.tsx
    - The Page Controls sidebar, where you can add the contact form section to a page.

app/custom_pages/types/sections.ts
    - Type definitions for page sections, including the contact form section type.

CONFIGURE_CONTACT_FORM_GMAIL.md
    - This setup and configuration guide.`}</code></pre>
      <p className="text-sm text-gray-500">Tip: If you add new features (e.g., admin dashboard for submissions, custom fields, etc.), you may need to update or add more files. Always restart your dev server after changing <code>.env.local</code> or installing new packages.</p>
    </div>
  </>
)

export function ConfigureContactFormGmailSection() {
  const ref = useRef(null)
  const [showFullContent, setShowFullContent] = useState(false)

  return (
    <section className="py-20 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Configure Contact Form Gmail</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Guide for configuring the contact form to send emails via Gmail.
          </p>
        </motion.div>
        <AnimatePresence mode="wait">
          {!showFullContent ? (
            <motion.div
              key="highlights"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: easeOut }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
            >
              {introHighlights.map((item, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(0,0,0,0.08)" }}
                >
                  <Card className="h-full flex flex-col items-center text-center p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <CardHeader className="pb-4">
                      <div
                        className={`w-16 h-16 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                      >
                        <item.icon className="h-8 w-8 text-white" />
                      </div>
                      <CardTitle className="text-xl font-bold text-gray-900">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="full-content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: easeOut }}
              className="space-y-12"
            >
              {fullContent}
            </motion.div>
          )}
        </AnimatePresence>
        <div className="text-center mt-8">
          <Button
            variant="outline"
            onClick={() => setShowFullContent(!showFullContent)}
            className="text-red-600 border-red-600 hover:bg-red-50"
          >
            {showFullContent ? (
              <>
                Show Less <ArrowUp className="ml-2 h-4 w-4" />
              </>
            ) : (
              <>
                Show More <ArrowDown className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </section>
  )
} 