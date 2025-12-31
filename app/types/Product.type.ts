import type { Attribute } from "./Attribute.type";
import type { Brand } from "./Brand.type";
import type { Category } from "./Category.type";

export interface Combination {
  product_attribute_id: string;
  attribute_id: string;
  value: string;
}
export interface ProductSpecification {
  id: string;
  combination: string;
  product_id: string;
  price: number;
  stock: number;
  default: boolean;
  sale: boolean;
  sale_price?: number;
  images: string;
  created_at: string;
}

export interface Product {
  id: string;
  name: string;
  summary: string;
  description: string;
  published: string;
  thumbnail?: string;
  categories: Category[];
  brand?: Brand;
  brand_id: string;
  specification?: ProductSpecification;
  created_at: string;
}

export interface ProductImage {
  id: string;
  product_id: string;
  source: string;
  cover: boolean;
}

export interface ProductAttribute {
  id: string;
  product_id: string;
  attribute_id: string;
  value: string;
  color_value: string;
  attribute?: Attribute;
}
