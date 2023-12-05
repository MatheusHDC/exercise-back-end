import { IModel } from '../models/interfaces/IModel';
import HttpException from '../exceptions/HttpException';

export interface IPlant {
  id: number,
  breed: string,
  needsSun: boolean,
  origin: string,
  size: number,
  waterFrequency: number,
}

export type INewPlant = Omit<IPlant, 'id' | 'waterFrequency'>;

export interface IOpsInfo {
  createdPlants: number
}

class PlantService {
  constructor(private PlantsModel: IModel<IPlant, INewPlant>) {}

  public async getAll(): Promise<IPlant[]> {
    const plants = await this.PlantsModel.getAll();
    return plants;
  }

  async getById(id: string): Promise<IPlant | null> {
    const plant = await this.PlantsModel.getById(id);
    return plant;
  }

  public async create(plant: INewPlant): Promise<IPlant> {
    const {
      breed,
      needsSun,
      origin,
      size,
    } = plant;

    if (typeof breed !== 'string') {
      throw new HttpException(400, 'Attribute "breed" must be string.');
    }

    if (typeof needsSun !== 'boolean') {
      throw new HttpException(400, 'Attribute "needsSun" must be boolean.');
    }

    if (typeof origin !== 'string') {
      throw new HttpException(400, 'Attribute "origin" must be string.');
    }

    if (typeof size !== 'number') {
      throw new HttpException(400, 'Attribute "size" must be number.');
    }
    const newPlant = await this.PlantsModel.create(plant);
    return newPlant;
  }

  public async update(arg: IPlant): Promise<IPlant> {
    const {
      breed,
      needsSun,
      origin,
      size,
      waterFrequency,
    } = arg;

    if (typeof breed !== 'string') {
      throw new HttpException(400, 'Attribute "breed" must be string.');
    }

    if (typeof needsSun !== 'boolean') {
      throw new HttpException(400, 'Attribute "needsSun" must be boolean.');
    }

    if (typeof origin !== 'string') {
      throw new HttpException(400, 'Attribute "origin" must be string.');
    }

    if (typeof size !== 'number') {
      throw new HttpException(400, 'Attribute "size" must be number.');
    }

    if (typeof waterFrequency !== 'number') {
      throw new HttpException(400, 'Attribute "waterFrequency" must be number');
    }
    const plant = await this.PlantsModel.update(arg);

    return plant;
  }

  public async removeById(id: string): Promise<boolean> {
    const removed = await this.PlantsModel.removeById(id);

    return removed;
  }
}

export default PlantService;
