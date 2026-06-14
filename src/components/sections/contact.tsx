"use client";

import { useState, type FormEvent } from "react";
import { CmsImage } from "@/components/site/cms-image";
import { Button } from "@/components/ui/button";
import type { LandingData } from "@cms/lib/types";

export function Contact({
  data,
}: {
  data: LandingData["contact"];
}) {
  return (
    <section id="iletisim" className="bg-[var(--color-bg)]">
      <div className="flex flex-col lg:flex-row">
        <div className="relative min-h-[280px] w-full lg:min-h-[640px] lg:w-1/2">
          <CmsImage
            image={data.image}
            alt={data.image?.alt || "Proje 01 iç mekan çalışması"}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        <div className="flex w-full flex-col justify-center px-6 py-16 md:px-12 md:py-20 lg:w-1/2 lg:px-16 lg:py-24">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-meta)]">
            {data.eyebrow}
          </p>
          <h2 className="mt-4 max-w-lg font-display text-3xl font-medium leading-tight text-[var(--color-ink)] md:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
            {data.title}
          </h2>

          <ContactForm />
        </div>
      </div>
    </section>
  );
}

/** Contact form — posts to /api/contact (Resend). */
export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          message: data.get("message"),
          website: data.get("website"),
        }),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok) {
        setErrorMsg(json.error || "Mesaj gönderilemedi.");
        setStatus("error");
        return;
      }
      setStatus("success");
      form.reset();
    } catch {
      setErrorMsg("Bağlantı hatası. Lütfen tekrar deneyin.");
      setStatus("error");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-10 max-w-xl"
      aria-label="İletişim formu"
    >
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden
      />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Ad Soyad" name="name" placeholder="Adınız" required />
        <Field
          label="E-posta"
          name="email"
          type="email"
          placeholder="ornek@eposta.com"
          required
        />
      </div>
      <div className="mt-5">
        <Field label="Telefon" name="phone" placeholder="+90 ___ ___ __ __" />
      </div>
      <div className="mt-5">
        <label
          htmlFor="message"
          className="mb-2 block text-sm font-medium text-[var(--color-ink)]"
        >
          Mesajınız
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder="Projenizden kısaca bahsedin"
          className="w-full resize-none rounded-md border border-[var(--color-border-warm)] bg-[var(--color-bg)] px-4 py-3 text-[var(--color-ink)] outline-none transition-colors placeholder:text-[var(--color-meta)] focus:border-[var(--color-clay)] focus:ring-2 focus:ring-[var(--color-clay)]/20"
        />
      </div>

      {status === "success" && (
        <p
          role="status"
          className="mt-4 text-sm text-[var(--color-ink)]"
        >
          Mesajınız alındı. En kısa sürede size dönüş yapacağız.
        </p>
      )}
      {status === "error" && errorMsg && (
        <p role="alert" className="mt-4 text-sm text-[var(--color-clay)]">
          {errorMsg}
        </p>
      )}

      <Button
        type="submit"
        size="lg"
        className="mt-6 w-full sm:w-auto"
        disabled={status === "loading"}
      >
        {status === "loading" ? "Gönderiliyor…" : "Gönder"}
      </Button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-medium text-[var(--color-ink)]"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-md border border-[var(--color-border-warm)] bg-[var(--color-bg)] px-4 py-3 text-[var(--color-ink)] outline-none transition-colors placeholder:text-[var(--color-meta)] focus:border-[var(--color-clay)] focus:ring-2 focus:ring-[var(--color-clay)]/20"
      />
    </div>
  );
}
