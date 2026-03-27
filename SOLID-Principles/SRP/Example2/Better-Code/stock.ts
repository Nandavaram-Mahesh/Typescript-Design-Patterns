import { ProductRepository } from "./repositories/product-repository";

class Stock {
  constructor(private productRepo: ProductRepository) {}

  async validateStock(cartItems: CartItem[]): Promise<void> {
    for (const item of cartItems) {
      const product = await this.productRepo.findById(item.productId);
      if (product.stock < item.quantity) {
        throw new Error(`Product ${product.name} is out of stock`);
      }
    }
  }

  async deductStock(cartItems: CartItem[]): Promise<void> {
    for (const item of cartItems) {
      await this.productRepo.deductStock(item.productId, item.quantity);
    }
  }

  async restoreStock(orderItems: OrderItem[]): Promise<void> {
    for (const item of orderItems) {
      await this.productRepo.restoreStock(item.productId, item.quantity);
    }
  }
}

export {Stock};
