"use client";

import { useId } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
  name: string;
  number: string;
  onChange: (next: { name: string; number: string }) => void;
};

export function NameNumberInput({ name, number, onChange }: Props) {
  const nameId = useId();
  const numberId = useId();

  return (
    <fieldset className="space-y-3 rounded-lg border border-dashed border-primary/40 bg-primary-50 p-4">
      <legend className="px-2 text-xs font-bold uppercase tracking-wider text-primary">
        In tên &amp; số áo (miễn phí)
      </legend>
      <p className="text-xs leading-relaxed text-foreground/80">
        Đội trưởng có thể ghi mẫu cho áo đại diện (VD: tên/số của bạn). Danh
        sách đầy đủ tên-số cho cả đội sẽ được gửi qua Zalo sau khi chốt báo
        giá — có template Excel sẵn.
      </p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor={nameId}>Tên in mẫu (tuỳ chọn)</Label>
          <Input
            id={nameId}
            value={name}
            onChange={(e) =>
              onChange({ name: e.target.value.toUpperCase(), number })
            }
            placeholder="VD: NGUYEN A"
            maxLength={14}
            className="uppercase"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor={numberId}>Số áo</Label>
          <Input
            id={numberId}
            value={number}
            onChange={(e) => {
              const cleaned = e.target.value.replace(/[^0-9]/g, "").slice(0, 2);
              onChange({ name, number: cleaned });
            }}
            placeholder="VD: 10"
            inputMode="numeric"
            maxLength={2}
          />
        </div>
      </div>
    </fieldset>
  );
}
