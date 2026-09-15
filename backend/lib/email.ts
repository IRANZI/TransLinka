import nodemailer, { type Transporter } from "nodemailer";
import { prisma } from "./prisma";

const SUPPORT_EMAIL = process.env.SUPPORT_EMAIL || "iradianah5@gmail.com";

type MailInput = {
  to: string;
  subject: string;
  text: string;
  html?: string;
};

let cachedTransport: Transporter | null = null;

async function getTransport() {
  if (cachedTransport) return cachedTransport;
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    return null;
  }

  cachedTransport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
  return cachedTransport;
}

export async function sendMail(input: MailInput) {
  const html = input.html || `<pre style="font-family:sans-serif">${input.text}</pre>`;
  let previewUrl: string | undefined;
  let status = "logged";

  try {
    const transport = await getTransport();
    if (transport) {
      const info = await transport.sendMail({
        from: `"TransLinka" <${process.env.SMTP_USER || SUPPORT_EMAIL}>`,
        to: input.to,
        subject: input.subject,
        text: input.text,
        html,
      });
      status = "sent";
      previewUrl = nodemailer.getTestMessageUrl(info) || undefined;
    }
  } catch (error) {
    status = "failed";
    console.error("[email] send failed", error);
  }

  try {
    await prisma.emailLog.create({
      data: {
        to: input.to,
        subject: input.subject,
        body: input.text,
        status,
        previewUrl,
      },
    });
  } catch (error) {
    console.error("[email] log failed", error);
  }

  return { status, previewUrl };
}

export function welcomeEmail(name: string) {
  return {
    subject: "Welcome to TransLinka",
    text: `Hi ${name},\n\nYour traveler account is ready. Book a coach, keep your QR ticket, and track your trip from the dashboard.\n\nTransLinka`,
  };
}

export function bookingEmail(input: {
  name: string;
  reference: string;
  origin: string;
  destination: string;
  date: string;
  seats: string;
  amount: number;
}) {
  return {
    subject: `Ticket confirmed ${input.reference}`,
    text: `Hi ${input.name},\n\nYour TransLinka booking is confirmed.\n\nReference: ${input.reference}\nRoute: ${input.origin} → ${input.destination}\nDate: ${input.date}\nSeats: ${input.seats}\nAmount: ${input.amount.toLocaleString()} Rwf\n\nShow the QR ticket at the gate.\n\nTransLinka`,
  };
}

export function companyAdminEmail(input: { name: string; email: string; password: string; company: string }) {
  return {
    subject: `Your ${input.company} admin account`,
    text: `Hi ${input.name},\n\nA company admin account was created for ${input.company}.\n\nEmail: ${input.email}\nTemporary password: ${input.password}\n\nSign in at ${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/signin then open /admin.\n\nTransLinka`,
  };
}

export function contactNotifyEmail(input: {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}) {
  return {
    to: SUPPORT_EMAIL,
    subject: `Contact form: ${input.subject}`,
    text: `New message from ${input.firstName} ${input.lastName} <${input.email}>\n\n${input.message}`,
  };
}

export { SUPPORT_EMAIL };
