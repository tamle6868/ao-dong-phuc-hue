"use client";

import * as React from "react";
import Image from "next/image";
import { ImagePlus, X } from "lucide-react";

import { cn } from "@/lib/utils";

type Props = {
  /** Field name for new file uploads (multiple files when `multiple=true`). */
  name: string;
  /** Field name for existing image URLs preserved through edits. */
  keepFieldName?: string;
  /** Initial image URLs (from existing record). */
  initial?: string[];
  /** Allow multiple selection. */
  multiple?: boolean;
  /** Hide the keep-field hidden inputs (use only for create-flow with single image). */
  className?: string;
};

type Item = { id: string; preview: string; existingUrl?: string };

export function ImageUploader({
  name,
  keepFieldName = "existing_images",
  initial = [],
  multiple = true,
  className,
}: Props) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [items, setItems] = React.useState<Item[]>(() =>
    initial.map((url) => ({ id: url, preview: url, existingUrl: url })),
  );
  const [files, setFiles] = React.useState<File[]>([]);

  // Keep a hidden file input synced with `files` so the form posts them.
  React.useEffect(() => {
    if (!inputRef.current) return;
    const dt = new DataTransfer();
    for (const f of files) dt.items.add(f);
    inputRef.current.files = dt.files;
  }, [files]);

  function onPickFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const list = e.target.files;
    if (!list || list.length === 0) return;
    const incoming = Array.from(list);
    const newItems = incoming.map((f) => ({
      id: `${f.name}-${f.size}-${f.lastModified}`,
      preview: URL.createObjectURL(f),
    }));
    setItems((prev) => (multiple ? [...prev, ...newItems] : newItems));
    setFiles((prev) => (multiple ? [...prev, ...incoming] : incoming));
    e.target.value = "";
  }

  function removeAt(idx: number) {
    const removed = items[idx];
    setItems((prev) => prev.filter((_, i) => i !== idx));
    if (!removed.existingUrl) {
      setFiles((prev) => {
        const fileIdx = prev.findIndex(
          (f) => `${f.name}-${f.size}-${f.lastModified}` === removed.id,
        );
        if (fileIdx === -1) return prev;
        return prev.filter((_, i) => i !== fileIdx);
      });
      URL.revokeObjectURL(removed.preview);
    }
  }

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex flex-wrap gap-3">
        {items.map((it, idx) => (
          <div
            key={it.id}
            className="group relative h-28 w-28 overflow-hidden rounded-md border border-border bg-muted"
          >
            <Image
              src={it.preview}
              alt="ảnh sản phẩm"
              fill
              sizes="112px"
              className="object-cover"
              unoptimized={it.preview.startsWith("blob:")}
            />
            <button
              type="button"
              onClick={() => removeAt(idx)}
              className="absolute right-1 top-1 rounded-full bg-black/70 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
              aria-label="Xoá ảnh"
            >
              <X className="h-3.5 w-3.5" />
            </button>
            {it.existingUrl && (
              <input type="hidden" name={keepFieldName} value={it.existingUrl} />
            )}
          </div>
        ))}

        <label className="flex h-28 w-28 cursor-pointer flex-col items-center justify-center gap-1 rounded-md border-2 border-dashed border-border bg-muted/30 text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground">
          <ImagePlus className="h-5 w-5" />
          <span>Thêm ảnh</span>
          <input
            ref={inputRef}
            name={name}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif"
            multiple={multiple}
            className="hidden"
            onChange={onPickFiles}
          />
        </label>
      </div>
      <p className="text-xs text-muted-foreground">
        JPG/PNG/WebP/AVIF, tối đa 5MB mỗi ảnh. Ảnh đầu tiên là ảnh đại diện.
      </p>
    </div>
  );
}
