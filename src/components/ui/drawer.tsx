"use client";

import { Drawer as Vaul } from "vaul";
import { cn } from "@/lib/utils";

type DrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

/** Mobile bottom sheet (vaul): drag to dismiss, paper surface with a torn-edge handle. */
export function Drawer({ open, onOpenChange, title, description, children, className }: DrawerProps) {
  return (
    <Vaul.Root open={open} onOpenChange={onOpenChange}>
      <Vaul.Portal>
        <Vaul.Overlay className="fixed inset-0 z-[120] bg-ink/40" />
        <Vaul.Content
          data-lenis-prevent
          className={cn("fixed inset-x-0 bottom-0 z-[130] flex max-h-[92dvh] flex-col rounded-t-[10px] bg-paper outline-none", className)}
        >
          <div aria-hidden className="mx-auto mt-3 h-1 w-12 rounded-full bg-ink/20" />
          <div className="px-5 pt-4 pb-2">
            <Vaul.Title className="font-display text-h3 font-semibold">{title}</Vaul.Title>
            {description ? (
              <Vaul.Description className="mt-1 text-small text-ink-muted">{description}</Vaul.Description>
            ) : (
              <Vaul.Description className="sr-only">{title}</Vaul.Description>
            )}
          </div>
          <div className="overflow-y-auto overscroll-contain px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))]">{children}</div>
        </Vaul.Content>
      </Vaul.Portal>
    </Vaul.Root>
  );
}
