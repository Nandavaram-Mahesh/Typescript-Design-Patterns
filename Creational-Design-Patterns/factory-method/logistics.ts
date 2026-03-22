// Abstract Product
interface Transport{
    delivery():string;
}

// Concrete Products

class Truck implements Transport{
    delivery(): string {
        return "Delivering by land 🚚";
    }
}

class Ship implements Transport{
    delivery():string{
        return "Delivering by sea 🚢";
    }
}

// Factory Interface

abstract class Logistics{
    abstract createTransport():Transport;

    planDelivery():string{
        const transport = this.createTransport()
        return transport.delivery()
    }
}

// Concrete Factories

class RoadLogistics extends Logistics{
    createTransport(): Transport {
        return new Truck
    }
}

class SeaLogistics extends Logistics{
    createTransport(): Transport {
        return new Ship()
    }
}



// Client Code
const roadLosgistics = new RoadLogistics()
// const result = roadLosgistics.planDelivery()

const seaLogistics = new SeaLogistics()
const result = seaLogistics.planDelivery()

console.log(result)