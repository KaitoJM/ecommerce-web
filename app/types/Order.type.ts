export interface Order {
  id: string;
  customer_id?: string;
  session_id?: string;
  cart_id: string;
  status_id: string;
  email: string;
  subtotal: number;
  discount_total: number;
  tax_total: number;
  total: number;
}
