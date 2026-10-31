export type WorkCardData = { slug: string; node: React.ReactNode };
/** Projects remain in normal flow and accessible at every screen size. */
export function WorkGallery({ header, cards }: { header: React.ReactNode; cards: WorkCardData[]; labels: { prev: string; next: string } }) {
  return (
    <div className="container-x section-y">
      {header}
      <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <li key={card.slug} className="min-w-0">
            {card.node}
          </li>
        ))}
      </ul>
    </div>
  );
}
