class OrderRepository {
  constructor(private db: any) {}

  async findById(orderId: number): Promise<Order> {
    return await this.db.query(
      `SELECT * FROM orders WHERE id = ${orderId}`
    );
  }

  async getOrderItems(orderId: number): Promise<OrderItem[]> {
    return await this.db.query(
      `SELECT * FROM order_items WHERE order_id = ${orderId}`
    );
  }

  async create(userId: number, total: number, chargeId: string): Promise<void> {
    await this.db.query(
      `INSERT INTO orders (user_id, total, status, charge_id) VALUES (${userId}, ${total}, 'confirmed', '${chargeId}')`
    );
  }

  async updateStatus(orderId: number, status: Order["status"]): Promise<void> {
    await this.db.query(
      `UPDATE orders SET status = '${status}' WHERE id = ${orderId}`
    );
  }
}

export {OrderRepository};