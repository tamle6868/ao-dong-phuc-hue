export type Category = {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  featured?: boolean;
};

export type ProductVariant = {
  size: string;
  color: string;
  colorHex: string;
  stock: number;
  sku: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  categorySlug: string;
  shortDescription: string;
  description: string;
  fabric: string;
  price: number;
  comparePrice?: number;
  images: string[];
  variants: ProductVariant[];
  rating: number;
  reviewsCount: number;
  badges?: string[];
  featured?: boolean;
  customizable?: boolean;
  minOrder?: number;
};

export type Partner = {
  id: string;
  name: string;
  logo: string;
};

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  content: string;
};
