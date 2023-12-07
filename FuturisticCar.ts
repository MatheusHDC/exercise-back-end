// ./FuturisticCar.ts
import { IAirPlane, ICar, IVehicle } from './interfaces';

export default class FuturisticCar implements IVehicle {
  drive(): void { console.log('Drive a futuristic car'); }

  fly(): void { console.log('Flying a futuristic car'); }
}


export class Car implements ICar {
  drive(): void { console.log('Drive a car'); }
}

export class AirPlane implements IAirPlane {
  fly(): void { console.log('Flying a air plane'); }
}