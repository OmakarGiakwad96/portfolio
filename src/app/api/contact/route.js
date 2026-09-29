import { NextResponse } from 'next/server';
import { validateContact } from '@/lib/validation';

/**
 * POST /api/contact — the backend half of the contact form.
 *
 * - Re-validates input on the server.
 * - Drops obvious bots (honeypot field) and rate-limits by IP.
 * - Sends the message via SMTP when SMTP_* env vars are set (see .env.example).
 * - Otherwise answers 503 + { fallback: 'mailto' } so the client opens the visitor's email app.
 */
export const runtime = 'nodejs';

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
// In-memory limiter: fine for a single instance / portfolio traffic. Use Redis/Upstash if you scale out.
const hits = new Map();

function rateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: 'Invalid request body.' }, { status: 400 });
  }

  // Honeypot filled → pretend success, do nothing.
  if (body?.company) return NextResponse.json({ ok: true });

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local';
  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, message: 'Too many messages in a short time. Please try again later.' },
      { status: 429 },
    );
  }

  const { values, errors } = validateContact(body);
  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    return NextResponse.json(
      { ok: false, fallback: 'mailto', message: 'Email delivery is not configured on the server.' },
      { status: 503 },
    );
  }

  try {
    const { default: nodemailer } = await import('nodemailer');
    const port = Number(SMTP_PORT) || 587;
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port,
      secure: port === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    await transporter.sendMail({
      from: `"Portfolio contact" <${SMTP_USER}>`,
      to: CONTACT_TO || SMTP_USER,
      replyTo: values.email,
      subject: `Portfolio message from ${values.name}`,
      text: `${values.message}\n\n— ${values.name} <${values.email}>`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[contact] send failed:', err);
    return NextResponse.json(
      { ok: false, fallback: 'mailto', message: 'Could not send right now.' },
      { status: 502 },
    );
  }
}
