import type { Product, ProductSpecification } from "./Product.type";

export interface Cart {
  id: string;
  productId: string;
  product: Product;
  specificationId: string;
  specification: ProductSpecification;
  quantity: number;
}

export interface CartPayload {
  id?: string;
  productId: string;
  product: Product;
  specificationId: string;
  specification: ProductSpecification;
  quantity: number;
}
