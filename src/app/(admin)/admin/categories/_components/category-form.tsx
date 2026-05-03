"use client";

import * as React from "react";
import { useActionState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  createCategory,
  updateCategory,
  type ActionState,
} from "@/lib/admin/categories.actions";

import { FormField } from "../../_components/form-field";
import { ImageUploader } from "../../_components/image-uploader";

type Initial = {
  id?: string;
  name?: string;
  slug?: string;
  description?: string | null;
  parent_id?: string | null;
  sort_order?: number;
  is_featured?: boolean;
  image_url?: string | null;
  seo_title?: string | null;
  seo_desc?: string | null;
};

type ParentOption = { id: string; name: string };

type Props = {
  mode: "create" | "edit";
  initial?: Initial;
  parents: ParentOption[];
};

export function CategoryForm({ mode, initial, parents }: Props) {
  const action =
    mode === "create"
      ? createCategory
      : (updateCategory.bind(null, initial?.id ?? "") as (
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
        <FormField label="Tên danh mục" name="name" required errors={fieldErrors.name}>
          <Input
            id="name"
            name="name"
            defaultValue={initial?.name ?? ""}
            placeholder="VD: Áo bóng đá thiết kế"
            required
          />
        </FormField>

        <FormField
          label="Slug"
          name="slug"
          required
          hint="Chỉ chữ thường, số, dấu '-'. VD: ao-bong-da-thiet-ke"
          errors={fieldErrors.slug}
        >
          <Input
            id="slug"
            name="slug"
            defaultValue={initial?.slug ?? ""}
            placeholder="ao-bong-da-thiet-ke"
            required
          />
        </FormField>
      </div>

      <FormField
        label="Mô tả"
        name="description"
        hint="Mô tả ngắn hiển thị ở trang danh mục."
        errors={fieldErrors.description}
      >
        <Textarea
          id="description"
          name="description"
          defaultValue={initial?.description ?? ""}
          rows={3}
          maxLength={500}
        />
      </FormField>

      <div className="grid gap-6 md:grid-cols-3">
        <FormField label="Danh mục cha" name="parent_id" errors={fieldErrors.parent_id}>
          <select
            id="parent_id"
            name="parent_id"
            defaultValue={initial?.parent_id ?? ""}
            className="flex h-12 w-full rounded-md border border-border bg-input px-3.5 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
          >
            <option value="">— Không có (cấp 1) —</option>
            {parents
              .filter((p) => p.id !== initial?.id)
              .map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
          </select>
        </FormField>

        <FormField
          label="Thứ tự"
          name="sort_order"
          hint="Số nhỏ hiện trước."
          errors={fieldErrors.sort_order}
        >
          <Input
            id="sort_order"
            name="sort_order"
            type="number"
            min={0}
            max={9999}
            defaultValue={initial?.sort_order ?? 0}
          />
        </FormField>

        <FormField label="Featured" name="is_featured">
          <label className="flex h-12 items-center gap-2 rounded-md border border-border bg-input px-3.5 text-sm">
            <input
              id="is_featured"
              name="is_featured"
              type="checkbox"
              defaultChecked={initial?.is_featured ?? false}
              className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
            />
            <span>Hiện ở trang chủ</span>
          </label>
        </FormField>
      </div>

      <FormField label="Ảnh đại diện" name="image_file">
        <ImageUploader
          name="image_file"
          keepFieldName="image_url"
          initial={initial?.image_url ? [initial.image_url] : []}
          multiple={false}
        />
      </FormField>

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
          {isPending ? "Đang lưu…" : mode === "create" ? "Tạo danh mục" : "Cập nhật"}
        </Button>
        <Link
          href="/admin/categories"
          className="text-sm text-muted-foreground hover:underline"
        >
          Huỷ
        </Link>
      </div>
    </form>
  );
}
