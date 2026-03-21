interface PaymentStrategy{
    pay(amount:number):void;
}

class CreditCardPayment implements PaymentStrategy{
    pay(amount:number){
        console.log(`CreditCard Payment of ${amount} processed successfully `)
    }
}

class DebitCardPayment implements PaymentStrategy{
    pay(amount:number){
        console.log(`DebitCard Payment of ${amount} processed successfully `)
    }
}

class UPIPayment implements PaymentStrategy{
    pay(amount:number){
        console.log(`UPI Payment of ${amount} processed successfully `)
    }
}

class PaymentContext{
    constructor(private strategy:PaymentStrategy){}
    
    setStrategy(strategy:PaymentStrategy){
        this.strategy = strategy
    }
    
    pay(amount:number){
        this.strategy.pay(amount)
    }
}

// Client Code

const creditCard = new CreditCardPayment()

const payment = new PaymentContext(creditCard)

// payment.pay(500)

const debitCard = new DebitCardPayment()

payment.setStrategy(debitCard)

payment.pay(1000)
