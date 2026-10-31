import type { IndustrySlug } from "@/types/catalog";

type IconProps = { className?: string; title?: string };

function Svg({ className, title, children, viewBox = "0 0 24 24", fill = "none" }: IconProps & { children: React.ReactNode; viewBox?: string; fill?: string }) {
  return (
    <svg
      viewBox={viewBox}
      className={className}
      fill={fill}
      stroke={fill === "none" ? "currentColor" : undefined}
      strokeWidth={fill === "none" ? 1.5 : undefined}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      {children}
    </svg>
  );
}

export function WhatsAppIcon(props: IconProps) {
  return (
    <Svg {...props} fill="currentColor">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.87 9.87 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.21 8.21 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.23 8.23Zm4.51-6.16c-.25-.12-1.47-.72-1.7-.8-.23-.09-.39-.12-.56.12-.16.25-.64.8-.79.97-.14.16-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.16.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48a.92.92 0 0 0-.66.31c-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.16 1.75 2.67 4.24 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.29Z" />
    </Svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </Svg>
  );
}

export function FacebookIcon(props: IconProps) {
  return (
    <Svg {...props} fill="currentColor">
      <path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.87.25-1.46 1.5-1.46h1.6V4.46A21 21 0 0 0 14.3 4.3c-2.3 0-3.8 1.4-3.8 3.96v2.24H8v3h2.5V21h3Z" />
    </Svg>
  );
}

export function YouTubeIcon(props: IconProps) {
  return (
    <Svg {...props} fill="currentColor">
      <path d="M21.6 7.2a2.5 2.5 0 0 0-1.76-1.77C18.29 5 12 5 12 5s-6.29 0-7.84.43A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.76 1.77C5.71 19 12 19 12 19s6.29 0 7.84-.43a2.5 2.5 0 0 0 1.76-1.77A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10 15V9l5.2 3L10 15Z" />
    </Svg>
  );
}

export function GoogleIcon(props: IconProps) {
  return (
    <Svg {...props} fill="currentColor">
      <path d="M21.35 11.1H12v2.98h5.38c-.5 2.44-2.62 3.87-5.38 3.87a6 6 0 1 1 3.9-10.56l2.2-2.2A9.1 9.1 0 0 0 12 2.9a9.1 9.1 0 1 0 0 18.2c4.55 0 8.7-3.3 8.7-9.1 0-.3-.02-.6-.05-.9Z" />
    </Svg>
  );
}

const industryPaths: Record<IndustrySlug, React.ReactNode> = {
  "schools-coaching": (
    <>
      <path d="M2.5 9 12 4.5 21.5 9 12 13.5 2.5 9Z" />
      <path d="M6.5 11v4.5c0 1.4 2.5 3 5.5 3s5.5-1.6 5.5-3V11" />
      <path d="M21.5 9v5" />
    </>
  ),
  "clinics-hospitals": (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="2" />
      <path d="M12 8v8M8 12h8" />
    </>
  ),
  "restaurants-cafes": (
    <>
      <path d="M4 10h12v3a6 6 0 0 1-12 0v-3Z" />
      <path d="M16 11h1.5a2.5 2.5 0 0 1 0 5H15" />
      <path d="M7 3.5c0 1.5 1 1.5 1 3M11 3.5c0 1.5 1 1.5 1 3" />
      <path d="M3 21h14" />
    </>
  ),
  "weddings-events": (
    <>
      <circle cx="9" cy="14" r="5.5" />
      <circle cx="15" cy="14" r="5.5" />
      <path d="m10 5 2-2 2 2-2 2-2-2Z" />
    </>
  ),
  "real-estate": (
    <>
      <path d="M3 20.5h18" />
      <path d="M5 20.5V9l7-5 7 5v11.5" />
      <path d="M10 20.5v-5h4v5" />
      <path d="M9 11h.01M15 11h.01" />
    </>
  ),
  "retail-shops": (
    <>
      <path d="M3.5 8.5 5 4h14l1.5 4.5" />
      <path d="M3.5 8.5c0 1.4 1.1 2.5 2.5 2.5s2.5-1.1 2.5-2.5c0 1.4 1.1 2.5 2.5 2.5h2c1.4 0 2.5-1.1 2.5-2.5 0 1.4 1.1 2.5 2.5 2.5s2.5-1.1 2.5-2.5" />
      <path d="M5 11v9.5h14V11" />
      <path d="M10 20.5v-5h4v5" />
    </>
  ),
  "corporates-startups": (
    <>
      <rect x="3" y="7.5" width="18" height="13" rx="1.5" />
      <path d="M8.5 7.5V5a1.5 1.5 0 0 1 1.5-1.5h4A1.5 1.5 0 0 1 15.5 5v2.5" />
      <path d="M3 13h18" />
      <path d="M11 13v2h2v-2" />
    </>
  ),
};

export function IndustryIcon({ slug, ...props }: IconProps & { slug: IndustrySlug }) {
  return <Svg {...props}>{industryPaths[slug]}</Svg>;
}
