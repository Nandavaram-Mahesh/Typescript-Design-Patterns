"use strict";
// Concrete Products
class Truck {
    delivery() {
        return "Delivering by land 🚚";
    }
}
class Ship {
    delivery() {
        return "Delivering by sea 🚢";
    }
}
// Factory Interface
class Logistics {
    planDelivery() {
        const transport = this.createTransport();
        return transport.delivery();
    }
}
// Concrete Factories
class RoadLogistics extends Logistics {
    createTransport() {
        return new Truck;
    }
}
class SeaLogistics extends Logistics {
    createTransport() {
        return new Ship();
    }
}
// Client Code
const roadLosgistics = new RoadLogistics();
// const result = roadLosgistics.planDelivery()
const seaLogistics = new SeaLogistics();
const result = seaLogistics.planDelivery();
console.log(result);
