import { Cart } from "./cart";
import { DiscountCalculator } from "./discount-calculator";
import { EmailService } from "./email-service";
import { Payment } from "./payment";
import { ReceiptFormatter } from "./receipt-formatter";
import { OrderRepository } from "./repositories/order-repository";
import { UserRepository } from "./repositories/user-repository";
import { Stock } from "./stock";

class OrderService {
  constructor(
    private stock: Stock,
    private cart: Cart,
    private discount: DiscountCalculator,
    private payment: Payment,
    private orderRepo: OrderRepository,
    private userRepo: UserRepository,
    private email: EmailService,
    private receipt: ReceiptFormatter
  ) {}

  async placeOrder(userId: number, cartItems: CartItem[]): Promise<string> {
    // 1. Validate stock
    await this.stock.validateStock(cartItems);

    // 2. Calculate total with discount
    const rawTotal = await this.cart.calculateTotal(cartItems);
    const total = this.discount.apply(rawTotal);

    // 3. Charge customer
    const chargeId = await this.payment.charge(userId, total);

    // 4. Persist order
    await this.orderRepo.create(userId, total, chargeId);

    // 5. Deduct stock
    await this.stock.deductStock(cartItems);

    // 6. Send confirmation email
    const user = await this.userRepo.findById(userId);
    await this.email.sendOrderConfirmation(user.email, user.username, total);

    // 7. Return receipt
    return this.receipt.format(user, cartItems, total);
  }

  async cancelOrder(orderId: number): Promise<void> {
    // 1. Get order
    const order = await this.orderRepo.findById(orderId);

    if (order.status === "shipped") {
      throw new Error("Cannot cancel a shipped order");
    }

    // 2. Refund payment
    await this.payment.refund(order.chargeId);

    // 3. Restore stock
    const orderItems = await this.orderRepo.getOrderItems(orderId);
    await this.stock.restoreStock(orderItems);

    // 4. Update order status
    await this.orderRepo.updateStatus(orderId, "cancelled");
  }
}

export {OrderService};