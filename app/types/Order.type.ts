export interface Order {
  id: string;
  customer_id?: string;
  is_guest: boolean;
  status_id: string;
  email: string;
  subtotal: number;
  discount_total: number;
  tax_total: number;
  total: number;
}
