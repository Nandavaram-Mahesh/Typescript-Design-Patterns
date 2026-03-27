class ProductRepository {
  constructor(private db: any) {}

  async findById(productId: number): Promise<Product> {
    return await this.db.query(
      `SELECT * FROM products WHERE id = ${productId}`
    );
  }

  async deductStock(productId: number, quantity: number): Promise<void> {
    await this.db.query(
      `UPDATE products SET stock = stock - ${quantity} WHERE id = ${productId}`
    );
  }

  async restoreStock(productId: number, quantity: number): Promise<void> {
    await this.db.query(
      `UPDATE products SET stock = stock + ${quantity} WHERE id = ${productId}`
    );
  }
}

export {ProductRepository};

