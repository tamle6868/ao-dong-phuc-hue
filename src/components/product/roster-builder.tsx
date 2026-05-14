"use client";

import { useState } from "react";
import { Plus, Trash2, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export type RosterRow = {
  id: string;
  name: string;
  number: string;
  size: string;
};

export type RosterSummary = {
  rows: RosterRow[];
  filledCount: number;
  text: string;
};

type Props = {
  sizes: readonly string[];
  minRows?: number;
  maxRows?: number;
  onChange: (summary: RosterSummary) => void;
};

function makeRowId(): string {
  return Math.random().toString(36).slice(2, 9);
}

function blankRow(): RosterRow {
  return { id: makeRowId(), name: "", number: "", size: "" };
}

function summarise(rows: RosterRow[]): RosterSummary {
  const filled = rows.filter((r) => r.name.trim() || r.number.trim());
  const text = filled
    .map((r, i) => {
      const parts = [
        `#${(i + 1).toString().padStart(2, "0")}`,
        r.number ? `số ${r.number}` : null,
        r.name ? r.name : null,
        r.size ? `(${r.size})` : null,
      ].filter(Boolean);
      return parts.join(" ");
    })
    .join(" · ");
  return { rows, filledCount: filled.length, text };
}

export function RosterBuilder({
  sizes,
  minRows = 11,
  maxRows = 30,
  onChange,
}: Props) {
  const [rows, setRows] = useState<RosterRow[]>(() =>
    Array.from({ length: minRows }, blankRow),
  );

  function update(next: RosterRow[]) {
    setRows(next);
    onChange(summarise(next));
  }

  function patch(id: string, field: keyof Omit<RosterRow, "id">, value: string) {
    update(rows.map((r) => (r.id === id ? { ...r, [field]: value } : r)));
  }

  function addRow() {
    if (rows.length >= maxRows) return;
    update([...rows, blankRow()]);
  }

  function removeRow(id: string) {
    if (rows.length <= minRows) return;
    update(rows.filter((r) => r.id !== id));
  }

  const filledCount = rows.filter((r) => r.name.trim() || r.number.trim()).length;

  return (
    <fieldset className="space-y-3 rounded-lg border border-dashed border-primary/40 bg-primary-50 p-4">
      <legend className="px-2 text-xs font-bold uppercase tracking-wider text-primary">
        Danh sách cầu thủ (in tên &amp; số áo miễn phí)
      </legend>
      <div className="flex items-start gap-2 text-xs leading-relaxed text-foreground/80">
        <Users className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
        <p>
          Nhập tên + số áo cho từng cầu thủ. Mặc định 11 dòng cho đội bóng — bấm
          &quot;+ Thêm cầu thủ&quot; nếu đội bạn đông hơn. Bỏ trống dòng nào không
          cần. Designer sẽ phối font + size theo áo gốc miễn phí.
        </p>
      </div>

      <div className="hidden grid-cols-[2rem_1fr_4.5rem_5rem_2rem] gap-2 px-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground sm:grid">
        <span>#</span>
        <span>Tên in (uppercase)</span>
        <span>Số áo</span>
        <span>Size</span>
        <span aria-hidden="true" />
      </div>

      <ul className="space-y-2">
        <AnimatePresence initial={false}>
          {rows.map((r, idx) => (
            <motion.li
              key={r.id}
              initial={{ opacity: 0, y: -4, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.16 }}
              className="grid grid-cols-[2rem_1fr_4.5rem_5rem_2rem] items-center gap-2"
            >
              <span className="text-xs font-bold tabular-nums text-muted-foreground">
                {(idx + 1).toString().padStart(2, "0")}
              </span>
              <Label htmlFor={`roster-name-${r.id}`} className="sr-only">
                Tên cầu thủ {idx + 1}
              </Label>
              <Input
                id={`roster-name-${r.id}`}
                value={r.name}
                onChange={(e) =>
                  patch(r.id, "name", e.target.value.toUpperCase())
                }
                placeholder={idx === 0 ? "VD: NGUYEN A" : ""}
                maxLength={14}
                className="h-10 uppercase"
              />
              <Label htmlFor={`roster-number-${r.id}`} className="sr-only">
                Số áo {idx + 1}
              </Label>
              <Input
                id={`roster-number-${r.id}`}
                value={r.number}
                onChange={(e) => {
                  const cleaned = e.target.value.replace(/[^0-9]/g, "").slice(0, 2);
                  patch(r.id, "number", cleaned);
                }}
                placeholder="10"
                inputMode="numeric"
                maxLength={2}
                className="h-10 text-center"
              />
              <Label htmlFor={`roster-size-${r.id}`} className="sr-only">
                Size cầu thủ {idx + 1}
              </Label>
              <select
                id={`roster-size-${r.id}`}
                value={r.size}
                onChange={(e) => patch(r.id, "size", e.target.value)}
                className="h-10 rounded-md border border-border bg-input px-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="">-</option>
                {sizes.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => removeRow(r.id)}
                disabled={rows.length <= minRows}
                aria-label={`Xoá cầu thủ ${idx + 1}`}
                className="grid h-9 w-9 place-items-center rounded-md text-muted-foreground hover:bg-muted hover:text-destructive disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-muted-foreground"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
        <button
          type="button"
          onClick={addRow}
          disabled={rows.length >= maxRows}
          className="inline-flex h-9 items-center gap-1.5 rounded-md border border-primary/40 bg-background px-3 text-xs font-semibold text-primary hover:bg-primary/5 disabled:opacity-40"
        >
          <Plus className="h-3.5 w-3.5" />
          Thêm cầu thủ ({rows.length}/{maxRows})
        </button>
        <span className="text-xs text-muted-foreground">
          Đã điền:{" "}
          <strong className="text-foreground">
            {filledCount}/{rows.length} dòng
          </strong>
        </span>
      </div>
    </fieldset>
  );
}
