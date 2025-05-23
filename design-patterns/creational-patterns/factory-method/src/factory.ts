interface Vehicle {
    drive(): string;
}

class Car implements Vehicle {
    public drive(): string {
        return 'Driving a car';
    }
}

class Motorcycle implements Vehicle {
    public drive(): string {
        return 'Riding a motorcycle';
    }
}

class Helicopter implements Vehicle {
    public drive(): string {
        return 'Flyyyy';
    }
}

abstract class VehicleFactory {
    public abstract createVehicle(): Vehicle;

    public someOperation(): string {
        const vehicle = this.createVehicle();
        return `VehicleFactory: The same factory's code has just worked with ${vehicle.drive()}`;
    }
}

class CarFactory extends VehicleFactory {
    public createVehicle(): Vehicle {
        return new Car();
    }
}

class MotorcycleFactory extends VehicleFactory {
    public createVehicle(): Vehicle {
        return new Motorcycle();
    }
}

class HelicopterFactory extends VehicleFactory {
    public createVehicle(): Vehicle {
        return new Helicopter();
    }
}

export { VehicleFactory, CarFactory, MotorcycleFactory, HelicopterFactory };
