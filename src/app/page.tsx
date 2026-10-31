/* eslint-disable @next/next/no-html-link-for-pages -- these links leave this root layout, which is always a full page load. */
import { siteConfig } from "@/config/site.config";
import { localizedUrl } from "@/lib/seo";

// "/" has no content of its own: send visitors to /hi/ if they chose Hindi before (LocaleToggle) or
// their browser prefers Hindi, otherwise to /en/. The meta refresh covers browsers without JavaScript.
const REDIRECT = `try{var s=localStorage.getItem("lk-locale"),n=navigator.languages||[navigator.language],l=s==="hi"||s==="en"?s:n.some(function(x){return /^hi\\b/i.test(x)})?"hi":"en";location.replace("/"+l+"/"+location.search+location.hash)}catch(e){location.replace("/en/")}`;

export default function RootRedirect() {
  return (
    <html lang="en">
      <head>
        <title>{siteConfig.brandName}</title>
        <link rel="canonical" href={localizedUrl("en", "/")} />
        <link rel="alternate" hrefLang="en-IN" href={localizedUrl("en", "/")} />
        <link rel="alternate" hrefLang="hi-IN" href={localizedUrl("hi", "/")} />
        <script dangerouslySetInnerHTML={{ __html: REDIRECT }} />
        <meta httpEquiv="refresh" content="0; url=/en/" />
      </head>
      <body
        style={{
          margin: 0,
          minHeight: "100dvh",
          display: "grid",
          placeItems: "center",
          background: "#F6F3EC",
          color: "#0E0E10",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <p>
          <a href="/en/">{siteConfig.brandName}</a> · <a href="/hi/">{siteConfig.hindi}</a>
        </p>
      </body>
    </html>
  );
}
