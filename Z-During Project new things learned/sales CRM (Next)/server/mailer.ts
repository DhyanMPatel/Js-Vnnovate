import 'dotenv/config';
import nodemailer from 'nodemailer';

const {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
  SMTP_SECURE,
  FROM_EMAIL,
} = process.env as Record<string, string | undefined>;

export const isMailConfigured = Boolean(SMTP_HOST && SMTP_PORT && FROM_EMAIL && (SMTP_USER ? SMTP_PASS : true));

let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (!isMailConfigured) return null;
  if (transporter) return transporter;

  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT || 587),
    secure: SMTP_SECURE === 'true' || Number(SMTP_PORT) === 465,
    auth: SMTP_USER ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
  } as any);
  return transporter;
}

export async function sendMail(opts: { to: string | string[]; subject: string; html?: string; }) {
  const t = getTransporter();
  if (!t) throw new Error('Email is not configured');

  const to = Array.isArray(opts.to) ? opts.to.filter(Boolean) : [opts.to];
  if (to.length === 0) throw new Error('No recipients');

 const res= await t.sendMail({
    from: FROM_EMAIL,
    to: to.join(', '),
    subject: opts.subject,
    html: opts.html,
  });
}
