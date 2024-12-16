import { VehicleFactory, CarFactory, MotorcycleFactory } from './factory';

function clientCode(factory: VehicleFactory) {
    console.log('Client: I\'m not aware of the factory\'s class, but it still works.');
    console.log(factory.someOperation());
}

console.log('App: Launched with the CarFactory.');
clientCode(new CarFactory());

console.log('');

console.log('App: Launched with the MotorcycleFactory.');
clientCode(new MotorcycleFactory());
