class ReceiptFormatter {
  format(user: User, cartItems: CartItem[], total: number): string {
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
}

export {ReceiptFormatter};