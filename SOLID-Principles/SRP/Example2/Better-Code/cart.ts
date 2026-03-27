import { ProductRepository } from "./repositories/product-repository";

class Cart {
  constructor(private productRepo: ProductRepository) {}

  async calculateTotal(cartItems: CartItem[]): Promise<number> {
    let total = 0;
    for (const item of cartItems) {
      const product = await this.productRepo.findById(item.productId);
      total += product.price * item.quantity;
    }
    return total;
  }
}

export {Cart};

