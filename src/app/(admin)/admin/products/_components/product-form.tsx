"use client";

import * as React from "react";
import { useActionState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  createProduct,
  updateProduct,
  type ActionState,
} from "@/lib/admin/products.actions";

import { FormField } from "../../_components/form-field";
import { ImageUploader } from "../../_components/image-uploader";

type Initial = {
  id?: string;
  category_id?: string;
  slug?: string;
  name?: string;
  short_desc?: string | null;
  description?: string | null;
  fabric?: string | null;
  price?: number;
  compare_price?: number | null;
  min_order?: number;
  badges?: string[];
  is_active?: boolean;
  is_featured?: boolean;
  is_customizable?: boolean;
  images?: string[];
  seo_title?: string | null;
  seo_desc?: string | null;
};

type CategoryOption = { id: string; name: string };

type Props = {
  mode: "create" | "edit";
  initial?: Initial;
  categories: CategoryOption[];
};

export function ProductForm({ mode, initial, categories }: Props) {
  const action =
    mode === "create"
      ? createProduct
      : (updateProduct.bind(null, initial?.id ?? "") as (
          prev: ActionState,
          fd: FormData,
        ) => Promise<ActionState>);

  const [state, formAction, isPending] = useActionState<ActionState, FormData>(
    action,
    null,
  );
  const fieldErrors =
    state && !state.ok ? (state.fieldErrors ?? {}) : {};

  return (
    <form action={formAction} className="space-y-6">
      {state && !state.ok && (
        <div
          role="alert"
          className="rounded-md border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive"
        >
          {state.error}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <FormField label="Tên sản phẩm" name="name" required errors={fieldErrors.name}>
          <Input
            id="name"
            name="name"
            defaultValue={initial?.name ?? ""}
            placeholder="VD: Áo bóng đá Pro Elite"
            required
          />
        </FormField>

        <FormField
          label="Slug"
          name="slug"
          required
          hint="VD: ao-bong-da-pro-elite"
          errors={fieldErrors.slug}
        >
          <Input
            id="slug"
            name="slug"
            defaultValue={initial?.slug ?? ""}
            required
          />
        </FormField>
      </div>

      <FormField label="Danh mục" name="category_id" required errors={fieldErrors.category_id}>
        <select
          id="category_id"
          name="category_id"
          defaultValue={initial?.category_id ?? ""}
          required
          className="flex h-12 w-full rounded-md border border-border bg-input px-3.5 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
        >
          <option value="" disabled>
            — Chọn danh mục —
          </option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </FormField>

      <FormField label="Mô tả ngắn" name="short_desc" errors={fieldErrors.short_desc}>
        <Input
          id="short_desc"
          name="short_desc"
          defaultValue={initial?.short_desc ?? ""}
          maxLength={280}
        />
      </FormField>

      <FormField
        label="Mô tả chi tiết"
        name="description"
        hint="Hỗ trợ xuống dòng. Hiển thị ở tab mô tả PDP."
        errors={fieldErrors.description}
      >
        <Textarea
          id="description"
          name="description"
          defaultValue={initial?.description ?? ""}
          rows={6}
          maxLength={5000}
        />
      </FormField>

      <FormField
        label="Chất liệu"
        name="fabric"
        hint="VD: Vải mè 4 chiều — Polyester 95% + Spandex 5%"
        errors={fieldErrors.fabric}
      >
        <Input
          id="fabric"
          name="fabric"
          defaultValue={initial?.fabric ?? ""}
          maxLength={160}
        />
      </FormField>

      <div className="grid gap-6 md:grid-cols-3">
        <FormField label="Giá (VND)" name="price" required errors={fieldErrors.price}>
          <Input
            id="price"
            name="price"
            type="number"
            min={0}
            step={1000}
            defaultValue={initial?.price ?? 0}
            required
          />
        </FormField>
        <FormField
          label="Giá so sánh"
          name="compare_price"
          hint="Để hiển thị giá gạch ngang."
          errors={fieldErrors.compare_price}
        >
          <Input
            id="compare_price"
            name="compare_price"
            type="number"
            min={0}
            step={1000}
            defaultValue={initial?.compare_price ?? ""}
          />
        </FormField>
        <FormField
          label="SL tối thiểu"
          name="min_order"
          errors={fieldErrors.min_order}
        >
          <Input
            id="min_order"
            name="min_order"
            type="number"
            min={1}
            defaultValue={initial?.min_order ?? 1}
          />
        </FormField>
      </div>

      <FormField
        label="Badges (cách nhau bởi dấu phẩy)"
        name="badges"
        hint="VD: Bán chạy, Mới, Giảm giá"
        errors={fieldErrors.badges}
      >
        <Input
          id="badges"
          name="badges"
          defaultValue={(initial?.badges ?? []).join(", ")}
          placeholder="Bán chạy, Mới"
        />
      </FormField>

      <FormField label="Ảnh sản phẩm" name="image_files">
        <ImageUploader
          name="image_files"
          keepFieldName="existing_images"
          initial={initial?.images ?? []}
          multiple
        />
      </FormField>

      <div className="grid gap-3 md:grid-cols-3">
        <label className="flex h-12 items-center gap-2 rounded-md border border-border bg-input px-3.5 text-sm">
          <input
            name="is_active"
            type="checkbox"
            defaultChecked={initial?.is_active ?? true}
            className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
          />
          <span>Đang bán</span>
        </label>
        <label className="flex h-12 items-center gap-2 rounded-md border border-border bg-input px-3.5 text-sm">
          <input
            name="is_featured"
            type="checkbox"
            defaultChecked={initial?.is_featured ?? false}
            className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
          />
          <span>Featured (trang chủ)</span>
        </label>
        <label className="flex h-12 items-center gap-2 rounded-md border border-border bg-input px-3.5 text-sm">
          <input
            name="is_customizable"
            type="checkbox"
            defaultChecked={initial?.is_customizable ?? false}
            className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
          />
          <span>Cho phép in tên + số</span>
        </label>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <FormField label="SEO Title" name="seo_title" errors={fieldErrors.seo_title}>
          <Input
            id="seo_title"
            name="seo_title"
            defaultValue={initial?.seo_title ?? ""}
            maxLength={120}
          />
        </FormField>
        <FormField label="SEO Description" name="seo_desc" errors={fieldErrors.seo_desc}>
          <Input
            id="seo_desc"
            name="seo_desc"
            defaultValue={initial?.seo_desc ?? ""}
            maxLength={300}
          />
        </FormField>
      </div>

      <div className="flex items-center gap-3 border-t border-border pt-6">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Đang lưu…" : mode === "create" ? "Tạo sản phẩm" : "Cập nhật"}
        </Button>
        <Link
          href="/admin/products"
          className="text-sm text-muted-foreground hover:underline"
        >
          Huỷ
        </Link>
      </div>
    </form>
  );
}
