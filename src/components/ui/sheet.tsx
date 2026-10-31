"use client";

import { Dialog } from "radix-ui";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

type SheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: React.ReactNode;
  description?: React.ReactNode;
  side?: "right" | "left";
  closeLabel: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
};

/** Side panel (cart drawer, breakdown) built on Radix Dialog: focus trap, Esc, scroll lock. */
export function Sheet({ open, onOpenChange, title, description, side = "right", closeLabel, children, footer, className }: SheetProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[120] bg-ink/40 backdrop-blur-[2px] data-[state=closed]:animate-[fade-out_.25s_ease-out] data-[state=open]:animate-[fade-in_.3s_ease-out]" />
        <Dialog.Content
          data-lenis-prevent
          className={cn(
            "fixed top-0 z-[130] flex h-dvh w-full max-w-[460px] flex-col bg-paper shadow-lift outline-none",
            side === "right"
              ? "right-0 data-[state=closed]:animate-[sheet-out-right_.3s_var(--ease-press)] data-[state=open]:animate-[sheet-in-right_.45s_var(--ease-out)]"
              : "left-0 data-[state=closed]:animate-[sheet-out-left_.3s_var(--ease-press)] data-[state=open]:animate-[sheet-in-left_.45s_var(--ease-out)]",
            className,
          )}
        >
          <div className="flex items-start justify-between gap-4 border-b border-line px-6 py-5">
            <div>
              <Dialog.Title className="font-display text-h3 font-semibold">{title}</Dialog.Title>
              {description ? (
                <Dialog.Description className="mt-1 text-small text-ink-muted">{description}</Dialog.Description>
              ) : (
                <Dialog.Description className="sr-only">{title}</Dialog.Description>
              )}
            </div>
            <Dialog.Close className="-mr-2 grid size-11 place-items-center rounded-card transition-colors hover:bg-paper-2" aria-label={closeLabel}>
              <X className="size-5" aria-hidden />
            </Dialog.Close>
          </div>
          <div className="flex-1 overflow-y-auto overscroll-contain px-6 py-5">{children}</div>
          {footer ? <div className="border-t border-line bg-paper px-6 py-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">{footer}</div> : null}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
