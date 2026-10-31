/** Google Map of the shop. The iframe is lazy, so it only loads when the visitor scrolls near it. */
export function MapEmbed({ src, title }: { src: string; title: string }) {
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-card border border-line bg-paper-2 md:aspect-[16/10]">
      <iframe
        src={src}
        title={title}
        className="absolute inset-0 size-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}
