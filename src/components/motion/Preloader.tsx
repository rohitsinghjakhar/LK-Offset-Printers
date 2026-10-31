/**
 * First-visit preloader, pure CSS (≤1.4s): a registration mark draws itself, C/M/Y/K ink bars fill,
 * a mono counter runs 000→100, then the plates lift away like the page-transition wipe.
 * Shown only when the pre-paint script sets html[data-preload="on"] (first visit, no reduced motion).
 */
export function Preloader({ label }: { label: string }) {
  return (
    <div className="preloader" aria-hidden>
      <div className="preloader__panel preloader__panel--y" />
      <div className="preloader__panel preloader__panel--m" />
      <div className="preloader__panel preloader__panel--c" />
      <div className="preloader__panel preloader__panel--k">
        <div className="flex flex-col items-center gap-7">
          <svg className="preloader__mark" viewBox="0 0 64 64" width={76} height={76} fill="none" stroke="currentColor" strokeWidth={1.4}>
            <circle cx="32" cy="32" r="18" />
            <line x1="32" y1="2" x2="32" y2="62" />
            <line x1="2" y1="32" x2="62" y2="32" />
          </svg>
          <div className="flex h-12 items-end gap-2">
            {[
              { cls: "bg-cyan", dur: "0.62s", delay: "0.1s" },
              { cls: "bg-magenta", dur: "0.7s", delay: "0.16s" },
              { cls: "bg-yellow", dur: "0.58s", delay: "0.22s" },
              { cls: "bg-paper", dur: "0.66s", delay: "0.28s" },
            ].map((bar) => (
              <span key={bar.cls} className="relative block h-full w-1.5 overflow-hidden outline outline-1 outline-paper/25">
                <span className={`preloader__bar absolute inset-0 ${bar.cls}`} style={{ animationDuration: bar.dur, animationDelay: bar.delay }} />
              </span>
            ))}
          </div>
          <p className="flex items-center gap-3 label-mono text-paper/80">
            <span>{label}</span>
            <span className="preloader__counter text-paper tabular" />
          </p>
        </div>
      </div>
    </div>
  );
}
