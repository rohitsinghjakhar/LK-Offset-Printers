/**
 * Inline script that runs during HTML parsing (before first paint). On the client the tag is
 * inert text/plain so React doesn't warn about rendering scripts.
 */
export function InlineScript({ html }: { html: string }) {
  return <script type={typeof window === "undefined" ? "text/javascript" : "text/plain"} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: html }} />;
}

/** Marks the document as JS-capable before first paint so first-view effects start hidden (no flash). */
export const FX_SCRIPT = "document.documentElement.classList.add('js')";
