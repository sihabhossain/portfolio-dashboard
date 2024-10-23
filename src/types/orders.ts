// types.ts
export interface OrderProduct {
  id: number;
  product_name: string;
  product_image: string;
  quantity: number;
  unit: string;
  total_amount: number;
}

export interface Order {
  id: number;
  user: string;
  delivery_address: string;
  total_amount: number;
  status: string;
  created_at: string;
  zone: string;
  order_products?: OrderProduct[] | undefined;
}

export interface TodaysOrdersResponse {
  zone: string;
  zone_operator: string;
  total_orders: number;
  orders: Order[];
}
