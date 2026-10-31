// The real root layout lives in app/[locale]/layout.tsx. This passthrough exists so the
// top-level not-found page can render its own <html>.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
