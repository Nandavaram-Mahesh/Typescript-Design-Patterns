"use strict";
// Concrete Products
class StripePayment {
    processPayment(amount) {
        console.log(`Processing the payment of rupees ${amount} via Stripe`);
    }
}
class PaypalPayment {
    processPayment(amount) {
        console.log(`Processing the payment of rupees ${amount} via Paypal`);
    }
}
// Abstract Factory
class PaymentFactory {
}
// Concrete Factories
class StripeFactory extends PaymentFactory {
    createPaymentProcessor() {
        return new StripePayment();
    }
}
class PaypalFactory extends PaymentFactory {
    createPaymentProcessor() {
        return new PaypalPayment();
    }
}
// Client Code
const stripeFactory = new StripeFactory();
const stripePaymentProcessor = stripeFactory.createPaymentProcessor();
stripePaymentProcessor.processPayment(1000);
