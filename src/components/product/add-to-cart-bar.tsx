"use client";

import { useMemo, useState } from "react";
import { Box, FileText, Minus, Phone, Plus, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import type { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { VariantPicker } from "./variant-picker";
import { NameNumberInput } from "./name-number-input";
import { RosterBuilder, type RosterSummary } from "./roster-builder";
import {
  B2bCompanyFields,
  type B2bCompanyInfo,
} from "./b2b-company-fields";
import { QuoteSheet, type QuoteSubmissionVariant } from "./quote-sheet";
import { formatPriceVND } from "@/lib/utils";
import { BUSINESS_INFO } from "@/lib/constants";

type Selection = { size: string; color: string; colorHex: string };

type Persona = "football" | "b2b" | "generic";

function getPersona(categorySlug: string): Persona {
  if (categorySlug === "ao-bong-da") return "football";
  if (
    categorySlug === "dong-phuc-doanh-nghiep" ||
    categorySlug === "dong-phuc-lop"
  ) {
    return "b2b";
  }
  return "generic";
}

type SheetConfig = {
  title: string;
  subtitle: string;
  submissionVariant: QuoteSubmissionVariant;
  detailSummary?: string;
  messagePrefix?: string;
  ctaLabel?: string;
};

export function AddToCartBar({ product }: { product: Product }) {
  const persona = getPersona(product.categorySlug);
  const [qty, setQty] = useState(product.minOrder ?? 1);
  const [selection, setSelection] = useState<Selection | null>(null);
  const [printing, setPrinting] = useState({ name: "", number: "" });
  const [roster, setRoster] = useState<RosterSummary>({
    rows: [],
    filledCount: 0,
    text: "",
  });
  const [company, setCompany] = useState<B2bCompanyInfo>({
    company: "",
    taxId: "",
    needVat: true,
    needNet30: false,
    logoName: "",
    text: "",
  });
  const [sheetConfig, setSheetConfig] = useState<SheetConfig | null>(null);

  const sizesForRoster = useMemo(() => {
    const set = new Set(product.variants.map((v) => v.size));
    return Array.from(set);
  }, [product.variants]);

  // Football: qty derives from filled roster rows when ≥ MOQ, otherwise stays
  // at user-controlled value. For B2B and generic, qty is fully manual.
  const min = product.minOrder ?? 1;
  const effectiveQty =
    persona === "football" && roster.filledCount >= min
      ? roster.filledCount
      : qty;
  const total = product.price * effectiveQty;

  function openQuote() {
    if (persona === "football") {
      setSheetConfig({
        title: "BÁO GIÁ ÁO CHO ĐỘI",
        subtitle: `Đội ${roster.filledCount || qty} người · gọi lại trong 15 phút`,
        submissionVariant: "quote",
        detailSummary: roster.text
          ? `Roster (${roster.filledCount} người): ${roster.text}`
          : "Roster chưa nhập — sẽ thu thập sau qua Zalo + Excel template",
      });
    } else if (persona === "b2b") {
      setSheetConfig({
        title: "BÁO GIÁ DOANH NGHIỆP",
        subtitle: "Tư vấn brand + mock 3D miễn phí trong 30 phút",
        submissionVariant: "quote",
        detailSummary: company.text || undefined,
      });
    } else {
      const printingSummary = [
        printing.name ? `Tên in: ${printing.name}` : null,
        printing.number ? `Số áo: ${printing.number}` : null,
      ]
        .filter(Boolean)
        .join(" | ");
      setSheetConfig({
        title: "YÊU CẦU ĐẶT ÁO",
        subtitle: "Tư vấn viên gọi lại trong 15 phút (giờ hành chính)",
        submissionVariant: "quote",
        detailSummary: printingSummary || undefined,
      });
    }
  }

  function openMockup3d() {
    setSheetConfig({
      title: "XEM MOCKUP 3D TRƯỚC",
      subtitle: "Designer phối logo + tên số rồi gửi file 3D trong 30 phút",
      submissionVariant: "mockup3d",
      detailSummary: roster.text
        ? `Roster (${roster.filledCount} người): ${roster.text}`
        : undefined,
      messagePrefix: "[MOCKUP3D]",
      ctaLabel: "Gửi yêu cầu mockup 3D",
    });
  }

  function openSampleRequest() {
    setSheetConfig({
      title: "YÊU CẦU ÁO MẪU (SAMPLE)",
      subtitle: "Đội sale gửi 1 áo mẫu để kiểm vải + form trước khi sản xuất",
      submissionVariant: "quote",
      detailSummary: company.text || undefined,
      messagePrefix: "[YÊU CẦU MẪU]",
      ctaLabel: "Gửi yêu cầu áo mẫu",
    });
  }

  const primaryLabel =
    persona === "football"
      ? selection
        ? "Báo giá cho đội"
        : "Báo giá theo đội"
      : persona === "b2b"
        ? "Báo giá B2B"
        : selection
          ? "Đặt ngay"
          : "Báo giá nhanh";

  return (
    <div className="space-y-6">
      <VariantPicker variants={product.variants} onChange={setSelection} />

      {persona === "football" && (
        <RosterBuilder
          sizes={sizesForRoster}
          minRows={Math.max(11, product.minOrder ?? 11)}
          onChange={setRoster}
        />
      )}

      {persona === "b2b" && <B2bCompanyFields onChange={setCompany} />}

      {persona === "generic" && product.customizable && (
        <NameNumberInput
          name={printing.name}
          number={printing.number}
          onChange={setPrinting}
        />
      )}

      <div className="flex items-center justify-between gap-4 rounded-md border border-border bg-muted/40 p-3">
        <span className="text-sm font-medium">Số lượng</span>
        <div className="flex items-center gap-1.5">
          <motion.button
            type="button"
            whileTap={{ scale: 0.9 }}
            onClick={() => setQty((q) => Math.max(min, q - 1))}
            disabled={qty <= min}
            className="grid h-10 w-10 place-items-center rounded-md border border-border bg-background disabled:opacity-40"
            aria-label="Giảm"
          >
            <Minus className="h-4 w-4" />
          </motion.button>
          <label htmlFor="qty-input" className="sr-only">
            Số lượng
          </label>
          <input
            id="qty-input"
            type="number"
            value={qty}
            min={min}
            onChange={(e) =>
              setQty(Math.max(min, Number.parseInt(e.target.value || "0", 10)))
            }
            className="h-10 w-14 rounded-md border border-border bg-background text-center text-sm font-semibold"
          />
          <motion.button
            type="button"
            whileTap={{ scale: 0.9 }}
            onClick={() => setQty((q) => q + 1)}
            className="grid h-10 w-10 place-items-center rounded-md border border-border bg-background"
            aria-label="Tăng"
          >
            <Plus className="h-4 w-4" />
          </motion.button>
        </div>
      </div>

      {persona === "football" && roster.filledCount >= min && (
        <p className="-mt-3 text-xs text-muted-foreground">
          Số lượng = {roster.filledCount} cầu thủ đã nhập ở roster phía trên.
        </p>
      )}

      {min > 1 && persona !== "football" && (
        <p className="text-xs text-muted-foreground">
          {persona === "b2b"
            ? `MOQ ${min} áo cho đơn doanh nghiệp.`
            : `Sản phẩm đặt theo lô, số lượng tối thiểu ${min} áo.`}
        </p>
      )}

      {/* Sticky CTA on mobile */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 px-3 py-2.5 pb-safe backdrop-blur md:static md:border-0 md:bg-transparent md:p-0">
        <div className="mx-auto flex max-w-7xl items-center gap-3">
          <div className="flex flex-col leading-tight">
            <span className="text-[11px] uppercase tracking-wide text-muted-foreground">
              Tổng tạm tính
            </span>
            <span className="text-lg font-bold text-primary md:text-xl">
              {formatPriceVND(total)}
            </span>
          </div>
          <a
            href={`tel:${BUSINESS_INFO.phoneE164}`}
            aria-label="Gọi báo giá"
            className="grid h-12 w-12 place-items-center rounded-md border border-border bg-background tap-shrink md:h-14 md:w-14"
          >
            <Phone className="h-5 w-5" />
          </a>
          <Button
            type="button"
            size="lg"
            block
            onClick={openQuote}
            className="h-12 flex-1 md:h-14"
          >
            <ShoppingBag className="h-4 w-4" />
            {primaryLabel}
          </Button>
        </div>
      </div>

      {persona === "football" && (
        <button
          type="button"
          onClick={openMockup3d}
          className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-primary/40 bg-background px-4 py-3 text-sm font-semibold text-primary hover:bg-primary/5"
        >
          <Box className="h-4 w-4" />
          Xem mockup 3D trước khi chốt
        </button>
      )}

      {persona === "b2b" && (
        <button
          type="button"
          onClick={openSampleRequest}
          className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-primary/40 bg-background px-4 py-3 text-sm font-semibold text-primary hover:bg-primary/5"
        >
          <FileText className="h-4 w-4" />
          Yêu cầu áo mẫu (sample) trước khi sản xuất lô
        </button>
      )}

      {sheetConfig && (
        <QuoteSheet
          open={Boolean(sheetConfig)}
          onClose={() => setSheetConfig(null)}
          product={product}
          selection={selection}
          qty={effectiveQty}
          title={sheetConfig.title}
          subtitle={sheetConfig.subtitle}
          submissionVariant={sheetConfig.submissionVariant}
          detailSummary={sheetConfig.detailSummary}
          messagePrefix={sheetConfig.messagePrefix}
          ctaLabel={sheetConfig.ctaLabel}
        />
      )}
    </div>
  );
}
