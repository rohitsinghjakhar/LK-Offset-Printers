/* eslint-disable @next/next/no-html-link-for-pages -- these links leave this root layout, which is always a full page load. */
import "./globals.css";
import { ArrowRight } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons";
import { Wordmark } from "@/components/layout/Wordmark";
import { CropMarks } from "@/components/marks";
import { Misprint } from "@/components/sections/Misprint";
import { fontVariables } from "@/lib/fonts";
import { waGreeting, waLink } from "@/lib/whatsapp";

const button = "inline-flex h-14 items-center justify-center gap-2.5 rounded-card px-7 font-medium transition-colors duration-300 ease-out active:scale-[0.97]";

/**
 * The host serves this page (404.html) for every unknown URL, so it can't know the visitor's
 * language: it speaks both.
 */
export default function GlobalNotFound() {
  return (
    <html lang="en" className={fontVariables}>
      <body>
        <title>Misprint — Page Not Found · L.K. Offset Printers</title>
        <meta name="robots" content="noindex" />
        <main id="main" className="relative flex min-h-dvh flex-col overflow-hidden">
          <CropMarks inset={14} className="text-ink/35" />
          <div className="container-x flex h-[var(--header-row-h)] items-center">
            <a href="/en/" className="rounded-card p-1">
              <Wordmark />
            </a>
          </div>
          <div className="container-x flex flex-1 flex-col items-center justify-center py-12 text-center">
            <p className="label-mono text-ink/70">ERROR 404 · MISREGISTERED</p>
            <div className="mt-10 w-full">
              <Misprint />
            </div>
            <h1 className="mt-4 text-h1 font-semibold">Misprint.</h1>
            <p className="mt-4 max-w-[46ch] text-lead text-ink-muted">This page slipped off the press. The plates are out of line.</p>
            <p lang="hi" className="mt-2 max-w-[46ch] text-lead text-ink-muted" style={{ fontFamily: "var(--font-mukta), sans-serif" }}>
              यह पेज प्रेस से फिसल गया।
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <a href="/en/catalog/" className={`${button} bg-ink text-paper hover:bg-magenta hover:text-ink`}>
                Browse catalog <ArrowRight className="size-5" aria-hidden />
              </a>
              <a href="/en/" className={`${button} border border-ink/80 hover:bg-ink hover:text-paper`}>
                Home
              </a>
              <a
                href="/hi/"
                lang="hi"
                className={`${button} border border-ink/80 hover:bg-ink hover:text-paper`}
                style={{ fontFamily: "var(--font-mukta), sans-serif" }}
              >
                हिंदी में देखें
              </a>
            </div>
            <a
              href={waLink(waGreeting("en"))}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex min-h-11 items-center gap-2 text-small font-medium underline underline-offset-4"
            >
              <WhatsAppIcon className="size-4 text-green" /> Ask us on WhatsApp
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
