import { NextResponse } from "next/server";
import { Resend } from "resend";

const FROM =
  process.env.CONTACT_FROM_EMAIL ?? "Proje 01 <forms@proje01.com>";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: unknown, max = 500) {
  return String(value ?? "")
    .trim()
    .slice(0, max);
}

/** First address = To, remaining = Cc. Comma-separated in CONTACT_TO_EMAIL. */
function parseRecipients(raw: string | undefined) {
  const emails = (raw ?? "info@proje01.com")
    .split(",")
    .map((e) => e.trim())
    .filter((e) => EMAIL_RE.test(e));

  if (emails.length === 0) {
    return { to: "info@proje01.com" as const, cc: undefined };
  }

  const [to, ...cc] = emails;
  return { to, cc: cc.length > 0 ? cc : undefined };
}

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "E-posta servisi henüz yapılandırılmamış." },
      { status: 503 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 });
  }

  if (clean(body.website)) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(body.name, 120);
  const email = clean(body.email, 200);
  const phone = clean(body.phone, 40);
  const message = clean(body.message, 4000);

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Ad, e-posta ve mesaj zorunludur." },
      { status: 400 }
    );
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Geçerli bir e-posta adresi girin." },
      { status: 400 }
    );
  }

  const { to, cc } = parseRecipients(process.env.CONTACT_TO_EMAIL);

  const resend = new Resend(apiKey);
  const { error: notifyError } = await resend.emails.send({
    from: FROM,
    to,
    ...(cc ? { cc } : {}),
    replyTo: email,
    subject: `İletişim formu: ${name}`,
    text: [
      `Ad Soyad: ${name}`,
      `E-posta: ${email}`,
      phone ? `Telefon: ${phone}` : null,
      "",
      "Mesaj:",
      message,
    ]
      .filter(Boolean)
      .join("\n"),
  });

  if (notifyError) {
    console.error("[contact] Resend notify error:", notifyError);
    return NextResponse.json(
      { error: "Mesaj gönderilemedi. Lütfen tekrar deneyin." },
      { status: 502 }
    );
  }

  const { error: autoReplyError } = await resend.emails.send({
    from: FROM,
    to: email,
    subject: "Mesajınızı aldık - Proje 01",
    text: [
      `Merhaba ${name},`,
      "",
      "Mesajınızı aldık. En kısa sürede size dönüş yapacağız.",
      "",
      "Gönderdiğiniz mesaj:",
      message,
      "",
      "Proje 01",
    ].join("\n"),
  });

  if (autoReplyError) {
    console.error("[contact] Resend auto-reply error:", autoReplyError);
  }

  return NextResponse.json({ ok: true });
}
