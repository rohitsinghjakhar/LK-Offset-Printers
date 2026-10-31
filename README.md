# L.K. Offset Printers — website

Bilingual (English / हिन्दी) website for L.K. Offset Printers, in front of Panchayat Samiti, Kathumar Road, Laxmangarh, Alwar, Rajasthan 321607 (founder: Mahendra Choudhary).

Developed and designed by [Gyanokar Learning and IT Services](https://www.gyanokar.com).

It is a **fully static website**: no database, no server, no logins. Every page is plain HTML, CSS and JavaScript in the `out/` folder, so it runs on any web host.

## How customers reach the shop

Every form opens WhatsApp (**+91 94149 06100**) with the customer's details already written out. The customer presses **Send**, and the message arrives in the shop's WhatsApp. Nothing is stored on the website.

| Where | What the shop receives on WhatsApp |
| --- | --- |
| **Contact** page form | Name, mobile, city, service, quantity, needed-by date and the requirement |
| **Cart → Place your order** (3 steps) | Order reference (e.g. `LK-7K3QX9`), contact and GSTIN, every item with its options and price, delivery mode and address, artwork choice, notes and the estimated total incl. GST |
| **Instant quote / product pages** → "Order on WhatsApp" | The configured product, its options, the quoted price and a link that reopens the same quote |
| **Track Order** page | The order reference and mobile number, asking for the status |
| **Privacy page** → data-deletion request | Name, mobile, email and details |
| WhatsApp button, mobile bar, header and footer links | A greeting to start a chat |

On phones WhatsApp opens directly; on computers it opens WhatsApp Web in a new tab. Payment is collected by UPI or cash after the customer approves the proof.

## Run it on your computer

Needs Node.js 20.9 or newer.

```bash
npm install
npm run dev        # http://localhost:3000/en/ — live preview while editing
npm run build      # writes the finished website to out/
npm run preview    # serves out/ at http://localhost:3000 to check the build
```

Quality checks: `npm run lint`, `npm run typecheck`, `npm test`.

## Put it online

Run `npm run build`, then upload **everything inside `out/`** (not the folder itself).

- **Hostinger / GoDaddy / any cPanel host:** upload into `public_html/`. The included `.htaccess` sets the 404 page, compression, caching and security headers. Once SSL is active, uncomment the HTTPS block in `public/.htaccess` and rebuild.
- **Netlify / Cloudflare Pages / Vercel:** drag in `out/`, or connect the project with build command `npm run build` and output folder `out`.

Visiting `/` sends people to `/en/`, or to `/hi/` if they chose Hindi before or their phone is set to Hindi.

## Changing things

After any change: `npm run build` and upload `out/` again.

| To change | Edit |
| --- | --- |
| Phone / WhatsApp number, email | `src/config/contact.ts` (email can also be set with `NEXT_PUBLIC_BUSINESS_EMAIL`, see `.env.example`) |
| Address, hours, GSTIN, social links, machines, delivery areas and charges, design fees, express %, bulk discounts | `src/config/site.config.ts` |
| Products, options and prices | `src/data/seed/catalog.ts` |
| Offer strip at the top of every page, festival accent | `src/data/content/site.ts` (set `active: true`) |
| FAQs, testimonials, portfolio, services, industries, city pages, About | `src/data/content/` |
| Privacy, terms, refund and shipping policies | `src/data/content/legal.ts` |
| Button labels and other interface text (both languages) | `messages/en.json` and `messages/hi.json` (keep the same keys in both; `npm test` checks this) |
| Website address used in Google, the sitemap and social previews | `NEXT_PUBLIC_SITE_URL` in `.env.local` (copy `.env.example`) |
| Photos | `public/images/stock/` — keep the file names, or update `src/components/catalog/PrintPhoto.tsx` |

The social preview card shown when the link is shared on WhatsApp/Facebook is generated at build time as `/en/og.png` and `/hi/og.png` from `src/app/[locale]/og.png/route.tsx`.

## Before launch — please confirm

- **Ratings and numbers.** Product cards show star ratings (e.g. 4.9 from 1,284 ratings), and the home page shows 15+ years, 50,000 orders, 3,000 clients and 4.8★, plus named testimonials. These come from the content files. Make sure they reflect real figures and real customers, or edit them (`src/data/seed/catalog.ts`, `siteConfig.stats`, `src/data/content/testimonials.ts`, `reviews.ts`).
- **Photos.** Product, category and hero images are free-licence Pexels photos, labelled "Illustrative photo" on the page. Replace them with photos of the shop's own work when available.
- **GSTIN, email and social links** are empty until filled in `site.config.ts` / `contact.ts`.
- **Domain.** Confirm `NEXT_PUBLIC_SITE_URL` (defaults to `https://www.lkprinters.in`).
- **Policies.** Have `src/data/content/legal.ts` reviewed by your CA or lawyer.

## Project structure

```
src/
  app/[locale]/(site)/   pages: home, catalog, product, quote, cart, checkout, track, services, work,
                         industries, paper-guide, about, contact, faq, printing-in/[city], legal/[doc]
  app/[locale]/og.png/   social preview image
  app/page.tsx           "/" → /en/ or /hi/
  app/not-found.tsx      bilingual 404 page (404.html)
  components/            UI, page sections, animations, product illustrations (mockups)
  config/                site.config.ts, contact.ts, nav.ts
  data/                  catalog and page content (bilingual)
  lib/                   pricing engine, catalog helpers, WhatsApp message helpers, SEO
messages/                en.json / hi.json interface text
public/                  images, .htaccess
```

## Notes

- **SEO / AI search.** Per-page titles and descriptions, canonical and en-IN/hi-IN alternates, `LocalBusiness`, `Organization`, `FAQPage`, `Product`, `Service` and `BreadcrumbList` structured data, a sitemap of every page in both languages, `robots.txt`, and `/llms.txt` for AI answer engines. Star ratings go into structured data only when `siteConfig.seo.publishRatings` is turned on, which should happen only once the numbers come from real reviews.
- **Privacy.** Analytics (GA4 or Clarity, if their IDs are set in `.env.local`) load only after the visitor accepts the cookie banner. The cart lives in the visitor's own browser.
- **Motion.** Animations respect the phone's "reduce motion" setting; heavy effects (3D finish lab, smooth scrolling) load only on capable devices.
"# LK-Offset-Printers" 
