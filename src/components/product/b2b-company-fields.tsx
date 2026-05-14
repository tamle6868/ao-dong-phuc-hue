"use client";

import { useRef, useState } from "react";
import { Building2, FileCheck2, Upload, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export type B2bCompanyInfo = {
  company: string;
  taxId: string;
  needVat: boolean;
  needNet30: boolean;
  logoName: string;
  text: string;
};

type Props = {
  onChange: (info: B2bCompanyInfo) => void;
};

function summarise(values: Omit<B2bCompanyInfo, "text">): B2bCompanyInfo {
  const parts = [
    values.company ? `Công ty: ${values.company}` : null,
    values.taxId ? `MST: ${values.taxId}` : null,
    values.needVat ? "Xuất VAT" : null,
    values.needNet30 ? "Công nợ 30 ngày" : null,
    values.logoName ? `Logo: ${values.logoName} (gửi qua Zalo)` : null,
  ].filter(Boolean);
  return { ...values, text: parts.join(" | ") };
}

export function B2bCompanyFields({ onChange }: Props) {
  const [company, setCompany] = useState("");
  const [taxId, setTaxId] = useState("");
  const [needVat, setNeedVat] = useState(true);
  const [needNet30, setNeedNet30] = useState(false);
  const [logoName, setLogoName] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  function emit(next: Partial<Omit<B2bCompanyInfo, "text">>) {
    const merged = {
      company,
      taxId,
      needVat,
      needNet30,
      logoName,
      ...next,
    };
    onChange(summarise(merged));
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    const name = f ? `${f.name} (${(f.size / 1024).toFixed(0)}kb)` : "";
    setLogoName(name);
    emit({ logoName: name });
  }

  function clearFile() {
    setLogoName("");
    if (fileRef.current) fileRef.current.value = "";
    emit({ logoName: "" });
  }

  return (
    <fieldset className="space-y-4 rounded-lg border border-dashed border-primary/40 bg-primary-50 p-4">
      <legend className="px-2 text-xs font-bold uppercase tracking-wider text-primary">
        Thông tin doanh nghiệp (để xuất VAT &amp; thêu logo)
      </legend>
      <div className="flex items-start gap-2 text-xs leading-relaxed text-foreground/80">
        <Building2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
        <p>
          Tên công ty + logo giúp designer phối mock 3D đúng brand guideline ngay
          từ vòng tư vấn. Chính sách công nợ 30 ngày áp dụng cho đơn từ 50 áo.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="b2b-company">Tên công ty *</Label>
          <Input
            id="b2b-company"
            value={company}
            onChange={(e) => {
              setCompany(e.target.value);
              emit({ company: e.target.value });
            }}
            placeholder="VD: Công ty TNHH ABC"
            autoComplete="organization"
            required
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="b2b-tax">Mã số thuế (tuỳ chọn)</Label>
          <Input
            id="b2b-tax"
            value={taxId}
            onChange={(e) => {
              const cleaned = e.target.value.replace(/[^0-9-]/g, "");
              setTaxId(cleaned);
              emit({ taxId: cleaned });
            }}
            inputMode="numeric"
            placeholder="VD: 3300000000"
          />
        </div>
      </div>

      <div className="space-y-2 rounded-md border border-border bg-background/60 p-3">
        <label className="flex items-start gap-2 text-sm">
          <input
            type="checkbox"
            checked={needVat}
            onChange={(e) => {
              setNeedVat(e.target.checked);
              emit({ needVat: e.target.checked });
            }}
            className="mt-0.5 h-4 w-4 rounded border-border accent-primary"
          />
          <span>
            <strong>Cần xuất hoá đơn VAT</strong>
            <span className="ml-1 text-xs text-muted-foreground">
              — không thêm phí, gửi kèm file PDF qua email.
            </span>
          </span>
        </label>
        <label className="flex items-start gap-2 text-sm">
          <input
            type="checkbox"
            checked={needNet30}
            onChange={(e) => {
              setNeedNet30(e.target.checked);
              emit({ needNet30: e.target.checked });
            }}
            className="mt-0.5 h-4 w-4 rounded border-border accent-primary"
          />
          <span>
            <strong>Yêu cầu công nợ 30 ngày</strong>
            <span className="ml-1 text-xs text-muted-foreground">
              — áp dụng cho đơn từ 50 áo, có hợp đồng kinh tế.
            </span>
          </span>
        </label>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="b2b-logo">Logo công ty (tuỳ chọn)</Label>
        {logoName ? (
          <div className="flex items-center justify-between gap-2 rounded-md border border-border bg-background p-2.5 text-sm">
            <span className="flex items-center gap-2 truncate">
              <FileCheck2 className="h-4 w-4 shrink-0 text-success" />
              <span className="truncate">{logoName}</span>
            </span>
            <button
              type="button"
              onClick={clearFile}
              aria-label="Xoá logo"
              className="grid h-8 w-8 place-items-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ) : (
          <label
            htmlFor="b2b-logo"
            className="flex h-20 cursor-pointer items-center justify-center gap-2 rounded-md border-2 border-dashed border-border bg-background/60 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <Upload className="h-4 w-4" />
            Chọn file logo (PNG/JPG/PDF)
          </label>
        )}
        <input
          ref={fileRef}
          id="b2b-logo"
          type="file"
          accept="image/png,image/jpeg,image/svg+xml,application/pdf"
          className="sr-only"
          onChange={handleFile}
        />
        <p className="text-[11px] text-muted-foreground">
          File logo sẽ gửi qua Zalo sau khi báo giá để đảm bảo chất lượng cao
          nhất. Ô này chỉ ghi nhận tên file để đội sale biết bạn có sẵn brand
          asset.
        </p>
      </div>
    </fieldset>
  );
}
