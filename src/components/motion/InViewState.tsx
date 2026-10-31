/** Gets data-state="in" once it enters the viewport (ScrollEffects); CSS does the animating. */
export function InViewState({ className, children }: { className?: string; children?: React.ReactNode }) {
  return (
    <div data-inview="" className={className} aria-hidden={children ? undefined : true}>
      {children}
    </div>
  );
}
