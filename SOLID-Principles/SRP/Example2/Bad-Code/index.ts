// E-commerce Order Processing System

class OrderService {
  private db: any;
  private stripeSecretKey: string = "sk_live_abc123";

  constructor(db: any) {
    this.db = db;
  }

  async placeOrder(userId: number, cartItems: { productId: number; quantity: number }[]) {
    // 1. Check stock for each item
    for (const item of cartItems) {
      const product = await this.db.query(
        `SELECT * FROM products WHERE id = ${item.productId}`
      );
      if (product.stock < item.quantity) {
        throw new Error(`Product ${product.name} is out of stock`);
      }
    }

    // 2. Calculate total
    let total = 0;
    for (const item of cartItems) {
      const product = await this.db.query(
        `SELECT * FROM products WHERE id = ${item.productId}`
      );
      total += product.price * item.quantity;
    }

    // Apply discount if total > 500
    if (total > 500) {
      total = total * 0.9; // 10% discount
    }

    // 3. Charge the customer via Stripe
    const fetch = require("node-fetch");
    const stripeResponse = await fetch("https://api.stripe.com/v1/charges", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.stripeSecretKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `amount=${total * 100}&currency=usd&customer=${userId}`,
    });

    const charge = await stripeResponse.json();

    if (charge.status !== "succeeded") {
      throw new Error("Payment failed");
    }

    // 4. Create order record in DB
    await this.db.query(
      `INSERT INTO orders (user_id, total, status) VALUES (${userId}, ${total}, 'confirmed')`
    );

    // 5. Deduct stock
    for (const item of cartItems) {
      await this.db.query(
        `UPDATE products SET stock = stock - ${item.quantity} WHERE id = ${item.productId}`
      );
    }

    // 6. Send confirmation email
    const nodemailer = require("nodemailer");
    const user = await this.db.query(`SELECT * FROM users WHERE id = ${userId}`);
    const transporter = nodemailer.createTransport({
      host: "smtp.company.com",
      port: 587,
    });
    await transporter.sendMail({
      from: "orders@company.com",
      to: user.email,
      subject: "Order Confirmed!",
      text: `Hi ${user.username}, your order of $${total} has been placed successfully.`,
    });

    // 7. Format and return receipt
    return `
      ========== ORDER RECEIPT ==========
      User     : ${user.username}
      Items    : ${cartItems.length}
      Total    : $${total}
      Status   : Confirmed
      Date     : ${new Date().toISOString()}
      ===================================
    `;
  }

  async cancelOrder(orderId: number) {
    const order = await this.db.query(
      `SELECT * FROM orders WHERE id = ${orderId}`
    );

    if (order.status === "shipped") {
      throw new Error("Cannot cancel a shipped order");
    }

    // Refund via Stripe
    const fetch = require("node-fetch");
    await fetch(`https://api.stripe.com/v1/refunds`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.stripeSecretKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `charge=${order.chargeId}`,
    });

    // Restore stock
    const orderItems = await this.db.query(
      `SELECT * FROM order_items WHERE order_id = ${orderId}`
    );
    for (const item of orderItems) {
      await this.db.query(
        `UPDATE products SET stock = stock + ${item.quantity} WHERE id = ${item.productId}`
      );
    }

    await this.db.query(
      `UPDATE orders SET status = 'cancelled' WHERE id = ${orderId}`
    );
  }
}