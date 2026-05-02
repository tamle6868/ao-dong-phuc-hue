export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      categories: {
        Row: {
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          is_featured: boolean
          name: string
          parent_id: string | null
          seo_desc: string | null
          seo_title: string | null
          slug: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_featured?: boolean
          name: string
          parent_id?: string | null
          seo_desc?: string | null
          seo_title?: string | null
          slug: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_featured?: boolean
          name?: string
          parent_id?: string | null
          seo_desc?: string | null
          seo_title?: string | null
          slug?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          company: string | null
          created_at: string
          email: string | null
          full_name: string
          id: string
          ip_hash: string | null
          message: string | null
          phone: string
          qty: string | null
          source: string
          status: string
          updated_at: string
          user_agent: string | null
          utm_campaign: string | null
          utm_content: string | null
          utm_medium: string | null
          utm_source: string | null
          utm_term: string | null
          variant: Database["public"]["Enums"]["lead_variant"]
        }
        Insert: {
          company?: string | null
          created_at?: string
          email?: string | null
          full_name: string
          id?: string
          ip_hash?: string | null
          message?: string | null
          phone: string
          qty?: string | null
          source: string
          status?: string
          updated_at?: string
          user_agent?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
          variant?: Database["public"]["Enums"]["lead_variant"]
        }
        Update: {
          company?: string | null
          created_at?: string
          email?: string | null
          full_name?: string
          id?: string
          ip_hash?: string | null
          message?: string | null
          phone?: string
          qty?: string | null
          source?: string
          status?: string
          updated_at?: string
          user_agent?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
          variant?: Database["public"]["Enums"]["lead_variant"]
        }
        Relationships: []
      }
      order_items: {
        Row: {
          created_at: string
          custom_name: string | null
          custom_number: string | null
          id: string
          order_id: string
          product_id: string
          qty: number
          unit_price: number
          variant_id: string | null
        }
        Insert: {
          created_at?: string
          custom_name?: string | null
          custom_number?: string | null
          id?: string
          order_id: string
          product_id: string
          qty: number
          unit_price: number
          variant_id?: string | null
        }
        Update: {
          created_at?: string
          custom_name?: string | null
          custom_number?: string | null
          id?: string
          order_id?: string
          product_id?: string
          qty?: number
          unit_price?: number
          variant_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_variant_id_fkey"
            columns: ["variant_id"]
            isOneToOne: false
            referencedRelation: "product_variants"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          address_line: string
          city: string | null
          code: string
          created_at: string
          customer_name: string
          district: string | null
          email: string | null
          id: string
          note: string | null
          payment_method: Database["public"]["Enums"]["payment_method"]
          phone: string
          status: Database["public"]["Enums"]["order_status"]
          total: number
          updated_at: string
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
          ward: string | null
        }
        Insert: {
          address_line: string
          city?: string | null
          code: string
          created_at?: string
          customer_name: string
          district?: string | null
          email?: string | null
          id?: string
          note?: string | null
          payment_method?: Database["public"]["Enums"]["payment_method"]
          phone: string
          status?: Database["public"]["Enums"]["order_status"]
          total: number
          updated_at?: string
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          ward?: string | null
        }
        Update: {
          address_line?: string
          city?: string | null
          code?: string
          created_at?: string
          customer_name?: string
          district?: string | null
          email?: string | null
          id?: string
          note?: string | null
          payment_method?: Database["public"]["Enums"]["payment_method"]
          phone?: string
          status?: Database["public"]["Enums"]["order_status"]
          total?: number
          updated_at?: string
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          ward?: string | null
        }
        Relationships: []
      }
      product_variants: {
        Row: {
          color: string
          color_hex: string | null
          created_at: string
          id: string
          product_id: string
          size: string
          sku: string
          stock: number
          updated_at: string
        }
        Insert: {
          color: string
          color_hex?: string | null
          created_at?: string
          id?: string
          product_id: string
          size: string
          sku: string
          stock?: number
          updated_at?: string
        }
        Update: {
          color?: string
          color_hex?: string | null
          created_at?: string
          id?: string
          product_id?: string
          size?: string
          sku?: string
          stock?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_variants_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          badges: string[]
          category_id: string
          compare_price: number | null
          created_at: string
          description: string | null
          fabric: string | null
          id: string
          images: Json
          is_active: boolean
          is_customizable: boolean
          is_featured: boolean
          min_order: number
          name: string
          price: number
          rating: number
          reviews_count: number
          seo_desc: string | null
          seo_image: string | null
          seo_title: string | null
          short_desc: string | null
          slug: string
          updated_at: string
        }
        Insert: {
          badges?: string[]
          category_id: string
          compare_price?: number | null
          created_at?: string
          description?: string | null
          fabric?: string | null
          id?: string
          images?: Json
          is_active?: boolean
          is_customizable?: boolean
          is_featured?: boolean
          min_order?: number
          name: string
          price: number
          rating?: number
          reviews_count?: number
          seo_desc?: string | null
          seo_image?: string | null
          seo_title?: string | null
          short_desc?: string | null
          slug: string
          updated_at?: string
        }
        Update: {
          badges?: string[]
          category_id?: string
          compare_price?: number | null
          created_at?: string
          description?: string | null
          fabric?: string | null
          id?: string
          images?: Json
          is_active?: boolean
          is_customizable?: boolean
          is_featured?: boolean
          min_order?: number
          name?: string
          price?: number
          rating?: number
          reviews_count?: number
          seo_desc?: string | null
          seo_image?: string | null
          seo_title?: string | null
          short_desc?: string | null
          slug?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      lead_variant: "quote" | "mockup3d"
      order_status:
        | "pending"
        | "confirmed"
        | "in_production"
        | "shipping"
        | "delivered"
        | "cancelled"
      payment_method: "cod" | "bank_transfer" | "momo" | "vnpay"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      lead_variant: ["quote", "mockup3d"],
      order_status: [
        "pending",
        "confirmed",
        "in_production",
        "shipping",
        "delivered",
        "cancelled",
      ],
      payment_method: ["cod", "bank_transfer", "momo", "vnpay"],
    },
  },
} as const
