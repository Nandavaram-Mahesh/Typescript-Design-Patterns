"use strict";
class CreditCardPayment {
    pay(amount) {
        console.log(`CreditCard Payment of ${amount} processed successfully `);
    }
}
class DebitCardPayment {
    pay(amount) {
        console.log(`DebitCard Payment of ${amount} processed successfully `);
    }
}
class UPIPayment {
    pay(amount) {
        console.log(`UPI Payment of ${amount} processed successfully `);
    }
}
class PaymentContext {
    constructor(strategy) {
        this.strategy = strategy;
    }
    setStrategy(strategy) {
        this.strategy = strategy;
    }
    pay(amount) {
        this.strategy.pay(amount);
    }
}
// Client Code
const creditCard = new CreditCardPayment();
const payment = new PaymentContext(creditCard);
// payment.pay(500)
const debitCard = new DebitCardPayment();
payment.setStrategy(debitCard);
payment.pay(1000);
