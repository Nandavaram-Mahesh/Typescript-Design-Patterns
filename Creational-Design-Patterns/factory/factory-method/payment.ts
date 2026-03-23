// Abstract Product
interface PaymentProcessor{
    processPayment(amount:number):void
}

// Concrete Products
class StripePayment implements PaymentProcessor{

    processPayment(amount: number): void {
        console.log(`Processing the payment of rupees ${amount} via Stripe`)
    }
}

class PaypalPayment implements PaymentProcessor{

    processPayment(amount: number): void {
        console.log(`Processing the payment of rupees ${amount} via Paypal`)
    }
}


// Abstract Factory

abstract class PaymentFactory{
    abstract createPaymentProcessor():PaymentProcessor
}


// Concrete Factories
class StripeFactory extends PaymentFactory{
    createPaymentProcessor(): PaymentProcessor {
        return new StripePayment()
    }
}

class PaypalFactory extends PaymentFactory{
    createPaymentProcessor(): PaymentProcessor {
        return new PaypalPayment()
    }
}



// Client Code
const stripeFactory = new StripeFactory()
const stripePaymentProcessor = stripeFactory.createPaymentProcessor()
stripePaymentProcessor.processPayment(1000)





