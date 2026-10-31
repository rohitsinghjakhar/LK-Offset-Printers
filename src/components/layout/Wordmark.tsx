import { RegMark } from "@/components/marks";
import { contact as siteConfig } from "@/config/contact";
import { cx } from "@/lib/cx";

const [first, ...rest] = siteConfig.brandName.split(" ");

/** Brand wordmark — always set in Bricolage, including on Hindi pages. */
export function Wordmark({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <span className={cx("inline-flex items-center gap-2", className)}>
      <RegMark size={compact ? 16 : 18} strokeWidth={1.5} className="text-magenta" />
      <span className="text-[1.28rem] leading-none font-bold tracking-[-0.035em]" style={{ fontFamily: "var(--font-bricolage), system-ui, sans-serif" }}>
        {first}
        {rest.length ? (
          <span className="ml-1.5 align-middle font-mono text-[0.62rem] font-medium tracking-[0.14em] uppercase opacity-70">{rest.join(" ")}</span>
        ) : null}
      </span>
    </span>
  );
}
