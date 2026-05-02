/**
 * Hand-written subset of the Supabase schema used by Phase 2.
 *
 * Mirrors the type shape that `supabase gen types typescript` emits so we can
 * swap to a generated file later without changing call sites:
 *
 *   pnpm supabase gen types typescript --project-id rwjznqahxdlqbdqavahx \
 *     --schema public > src/types/database.ts
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

type CategoryRow = {
  id: string;
  slug: string;
  name: string;
  parent_id: string | null;
  description: string | null;
  image_url: string | null;
  seo_title: string | null;
  seo_desc: string | null;
  is_featured: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

type ProductRow = {
  id: string;
  slug: string;
  name: string;
  category_id: string;
  short_desc: string | null;
  description: string | null;
  fabric: string | null;
  price: number;
  compare_price: number | null;
  images: string[];
  rating: number;
  reviews_count: number;
  badges: string[];
  is_active: boolean;
  is_featured: boolean;
  is_customizable: boolean;
  min_order: number;
  seo_title: string | null;
  seo_desc: string | null;
  seo_image: string | null;
  created_at: string;
  updated_at: string;
};

type ProductVariantRow = {
  id: string;
  product_id: string;
  size: string;
  color: string;
  color_hex: string | null;
  stock: number;
  sku: string;
  created_at: string;
  updated_at: string;
};

type LeadRow = {
  id: string;
  full_name: string;
  phone: string;
  email: string | null;
  company: string | null;
  qty: string | null;
  message: string | null;
  source: string;
  variant: "quote" | "mockup3d";
  status: "new" | "contacted" | "won" | "lost";
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
  user_agent: string | null;
  ip_hash: string | null;
  created_at: string;
  updated_at: string;
};

type OrderRow = {
  id: string;
  code: string;
  customer_name: string;
  phone: string;
  email: string | null;
  address: string | null;
  total: number;
  status:
    | "pending"
    | "confirmed"
    | "in_production"
    | "shipping"
    | "completed"
    | "cancelled";
  payment_method: "cod" | "bank_transfer" | "momo" | null;
  note: string | null;
  created_at: string;
  updated_at: string;
};

type OrderItemRow = {
  id: string;
  order_id: string;
  product_id: string;
  variant_id: string | null;
  qty: number;
  unit_price: number;
  custom_name: string | null;
  custom_number: string | null;
  created_at: string;
};

export type Database = {
  __InternalSupabase: { PostgrestVersion: "12" };
  public: {
    Tables: {
      categories: {
        Row: CategoryRow;
        Insert: Partial<CategoryRow> & Pick<CategoryRow, "slug" | "name">;
        Update: Partial<CategoryRow>;
        Relationships: [];
      };
      products: {
        Row: ProductRow;
        Insert: Partial<ProductRow> &
          Pick<ProductRow, "slug" | "name" | "category_id" | "price">;
        Update: Partial<ProductRow>;
        Relationships: [];
      };
      product_variants: {
        Row: ProductVariantRow;
        Insert: Partial<ProductVariantRow> &
          Pick<ProductVariantRow, "product_id" | "size" | "color" | "sku">;
        Update: Partial<ProductVariantRow>;
        Relationships: [];
      };
      leads: {
        Row: LeadRow;
        Insert: Partial<LeadRow> &
          Pick<LeadRow, "full_name" | "phone" | "source">;
        Update: Partial<LeadRow>;
        Relationships: [];
      };
      orders: {
        Row: OrderRow;
        Insert: Partial<OrderRow> &
          Pick<OrderRow, "code" | "customer_name" | "phone" | "total">;
        Update: Partial<OrderRow>;
        Relationships: [];
      };
      order_items: {
        Row: OrderItemRow;
        Insert: Partial<OrderItemRow> &
          Pick<OrderItemRow, "order_id" | "product_id" | "qty" | "unit_price">;
        Update: Partial<OrderItemRow>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
  };
};
