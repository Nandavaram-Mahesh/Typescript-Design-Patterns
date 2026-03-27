import  {fetch} from "node-fetch";

class Payment {
  constructor(private stripeSecretKey: string) {}

  async charge(userId: number, total: number): Promise<string> {
    const response = await fetch("https://api.stripe.com/v1/charges", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.stripeSecretKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `amount=${total * 100}&currency=usd&customer=${userId}`,
    });

    const charge = await response.json();

    if (charge.status !== "succeeded") {
      throw new Error("Payment failed");
    }

    return charge.id; // return chargeId for record keeping
  }

  async refund(chargeId: string): Promise<void> {

    const response = await fetch("https://api.stripe.com/v1/refunds", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.stripeSecretKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `charge=${chargeId}`,
    });

    const refund = await response.json();
    if (refund.status !== "succeeded") {
      throw new Error("Refund failed");
    }
  }
}

export {Payment};