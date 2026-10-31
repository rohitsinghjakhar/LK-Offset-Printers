import Image from "next/image";
import { cn } from "@/lib/utils";

/** Illustrative Pexels photo per machine type (public/images/stock, credits in sources.json). */
const machinePhotos: Record<string, { file: string; alt: string }> = {
  heidelberg: { file: "machine-offset", alt: "Sheet-fed offset printing machine" },
  accurio: { file: "machine-digital", alt: "Digital production printer" },
  "eco-solvent": { file: "machine-large-format", alt: "Large-format printer printing a wide poster" },
  laser: { file: "machine-laser", alt: "Laser cutting and engraving machine" },
  sublimation: { file: "machine-heat-press", alt: "Heat press printing a T-shirt" },
};

/** Photo of the kind of machine we run, labelled illustrative (it is not our own machine). */
export function MachinePhoto({
  id,
  className,
  sizes = "(min-width: 1024px) 20vw, (min-width: 640px) 46vw, 92vw",
}: {
  id: string;
  className?: string;
  sizes?: string;
}) {
  const photo = machinePhotos[id];
  if (!photo) return null;
  return (
    <figure className={cn("relative aspect-[4/3] w-full overflow-hidden rounded-card bg-ink-2", className)}>
      <Image src={`/images/stock/${photo.file}.webp`} alt={`${photo.alt} — illustrative photo`} fill sizes={sizes} className="object-cover" />
      <figcaption className="absolute right-2 bottom-2 rounded bg-paper/95 px-2 py-0.5 text-[10px] leading-tight text-ink">Illustrative · Pexels</figcaption>
    </figure>
  );
}
