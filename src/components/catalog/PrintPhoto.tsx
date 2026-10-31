import Image from "next/image";
import type { MockupKind } from "@/types/catalog";

export const printPhotos: Partial<Record<MockupKind, { file: string; alt: string }>> = {
  "business-cards": { file: "business-cards", alt: "Printed business cards on paper stock" },
  "wedding-card": { file: "wedding-invitations", alt: "Wedding invitations and envelopes" },
  envelope: { file: "wedding-invitations", alt: "Paper invitations with envelopes" },
  "shagun-envelope": { file: "wedding-invitations", alt: "Decorative paper invitations and envelopes" },
  booklet: { file: "books-binding", alt: "Bound books and printed pages" },
  "hard-binding": { file: "books-binding", alt: "Hardbound books" },
  "school-diary": { file: "books-binding", alt: "Bound books illustrating school print materials" },
  diary: { file: "books-binding", alt: "Bound printed books" },
  "paper-bag": { file: "paper-bags", alt: "Paper shopping bags" },
  carton: { file: "packaging-cartons", alt: "Cardboard packaging boxes" },
  "sweet-box": { file: "kraft-packaging", alt: "Decorative kraft packaging" },
  "label-roll": { file: "product-labels", alt: "Printed labels on product bottles" },
  mug: { file: "printed-mug", alt: "Ceramic mug with a printed design" },
  tshirt: { file: "printed-tshirts", alt: "Printed T-shirt" },
  photocopy: { file: "digital-printing", alt: "Digital paper printing equipment" },
  letterhead: { file: "paper-stock", alt: "Paper stock for printed stationery" },
  flyer: { file: "colour-swatches", alt: "Colour samples for print design" },
  trifold: { file: "paper-stock", alt: "Paper stock for brochures" },
  signboard: { file: "shop-signage", alt: "Printed shop sign" },
  "flex-roll": { file: "flex-banner", alt: "Banner mounted on a wall" },
  standee: { file: "event-standee", alt: "Exhibition stands and display boards" },
  poster: { file: "posters", alt: "Printed posters on a wall" },
  dangler: { file: "table-tent", alt: "Menu cards on a cafe table" },
  canvas: { file: "canvas-prints", alt: "Canvas prints" },
  "photo-print": { file: "photo-prints", alt: "Photo prints from a printer" },
  "bill-book": { file: "bill-book", alt: "Receipts and bills on a desk" },
  stamp: { file: "rubber-stamp", alt: "Rubber stamp being pressed on paper" },
  "id-card": { file: "id-cards", alt: "ID cards on lanyards" },
  "menu-card": { file: "event-stationery", alt: "Wedding menu and place cards" },
  "hang-tag": { file: "hang-tags", alt: "Printed clothing hang tags" },
  "report-card": { file: "exam-papers", alt: "School papers on a classroom desk" },
  "question-paper": { file: "exam-papers", alt: "Exam papers and a pencil on a desk" },
  certificate: { file: "certificate", alt: "Printed certificate of achievement" },
  notebook: { file: "notebooks", alt: "Stack of spiral notebooks" },
  calendar: { file: "calendar", alt: "Spiral-bound calendar" },
  keychain: { file: "keychains", alt: "Printed keychains" },
  "photo-frame": { file: "photo-frame", alt: "Framed photos on a table" },
  cushion: { file: "cushions", alt: "Printed cushions on a sofa" },
  "spiral-binding": { file: "spiral-binding", alt: "Spiral binding machine" },
  lamination: { file: "lamination", alt: "Paper sheets for lamination" },
};

/** Stock photography is labelled as illustrative, never as a client's finished order. */
export function PrintPhoto({ kind, className = "", eager = false }: { kind: MockupKind; className?: string; eager?: boolean }) {
  const photo = printPhotos[kind];
  if (!photo) return null;
  return (
    <figure className={`relative w-full overflow-hidden rounded-card ${className}`}>
      <Image
        src={`/images/stock/${photo.file}.webp`}
        alt={`${photo.alt} — illustrative photo`}
        width={900}
        height={675}
        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 92vw"
        loading={eager ? "eager" : "lazy"}
        className="aspect-[4/3] w-full object-cover"
      />
      <figcaption className="absolute right-2 bottom-2 rounded bg-paper/95 px-2 py-1 text-[11px] leading-tight text-ink">
        Illustrative photo · Pexels
      </figcaption>
    </figure>
  );
}
