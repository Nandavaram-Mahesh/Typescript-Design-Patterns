class DiscountCalculator {
  apply(total: number): number {
    if (total > 500) {
      return total * 0.9; // 10% discount
    }
    return total;
  }
}

export {DiscountCalculator};
