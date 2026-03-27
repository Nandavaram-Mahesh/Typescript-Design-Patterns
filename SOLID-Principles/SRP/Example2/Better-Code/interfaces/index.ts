interface User {
  id: number;
  username: string;
  email: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

interface Order {
  id: number;
  userId: number;
  total: number;
  status: "confirmed" | "shipped" | "cancelled";
  chargeId: string;
}

interface OrderItem {
  productId: number;
  quantity: number;
}

interface CartItem {
  productId: number;
  quantity: number;
}