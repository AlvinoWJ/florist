"use client";

import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";

interface ConfirmDialogProps {
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isPending?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  title,
  description,
  confirmLabel = "Ya, Hapus",
  cancelLabel = "Batal",
  isPending = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  useLockBodyScroll(true);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/50 backdrop-blur-sm md:items-center">
      <div className="w-full rounded-t-3xl border-2 border-ink bg-card p-7 text-center shadow-brutalist-lg md:max-w-sm md:rounded-3xl">
        <div className="mx-auto mb-5 h-1.5 w-12 rounded-full bg-ink/20 md:hidden" />
        <h3 className="font-heading text-lg font-bold text-foreground">
          {title}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onConfirm}
            disabled={isPending}
            className="flex-1 rounded-full border-2 border-ink bg-destructive py-3.5 font-heading text-sm font-bold text-white shadow-brutalist-sm disabled:opacity-60"
          >
            {isPending ? "Menghapus..." : confirmLabel}
          </button>
          <button
            type="button"
            onClick={onCancel}
            disabled={isPending}
            className="flex-1 rounded-full border-2 border-ink py-3.5 font-heading text-sm font-bold hover:bg-muted disabled:opacity-60"
          >
            {cancelLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
