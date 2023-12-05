import fs from 'fs/promises';
import path from 'path';
import { INewPlant, IOpsInfo, IPlant } from '../services/PlantService';
import { IModel } from './interfaces/IModel';

export default class PlantsModel implements IModel<IPlant, INewPlant> {
  private readonly plantsFile = path.join(__dirname, '..', 'models', 'database', 'plantsData.json');

  private readonly opsFile = path.join(__dirname, '..', 'models', 'database', 'opsInfo.json');

  private async updateOpsInfo(incrementAmount = 1): Promise<number> {
    const dataRaw = await fs.readFile(this.opsFile, { encoding: 'utf8' });
    const opsInfo: IOpsInfo = JSON.parse(dataRaw);
    opsInfo.createdPlants += incrementAmount;

    await fs.writeFile(this.opsFile, JSON.stringify(opsInfo, null, 2));

    return opsInfo.createdPlants;
  }

  public async getAll(): Promise<IPlant[]> {
    const dataRaw = await fs.readFile(this.plantsFile, { encoding: 'utf8' });
    const plants: IPlant[] = JSON.parse(dataRaw);
    return plants;
  }

  async getById(id: string): Promise<IPlant | null> {
    const dataRaw = await fs.readFile(this.plantsFile, { encoding: 'utf8' });
    const plants: IPlant[] = JSON.parse(dataRaw);
    return plants.find((plant) => plant.id === +id) || null;
  }

  public async create(plant: INewPlant): Promise<IPlant> {
    const waterFrequency = plant.needsSun
      ? plant.size * 0.77 + (origin === 'Brazil' ? 8 : 7)
      : (plant.size / 2) * 1.33 + (origin === 'Brazil' ? 8 : 7);

    const dataRaw = await fs.readFile(this.plantsFile, { encoding: 'utf8' });
    const plants: IPlant[] = JSON.parse(dataRaw);

    const newPlantId = await this.updateOpsInfo(1);
    const newPlant = { id: newPlantId, ...plant, waterFrequency };
    plants.push(newPlant);

    await fs.writeFile(this.plantsFile, JSON.stringify(plants, null, 2));
    return newPlant;
  }

  public async update(arg: IPlant): Promise<IPlant> {
    const dataRaw = await fs.readFile(this.plantsFile, { encoding: 'utf8' });
    const plants: IPlant[] = JSON.parse(dataRaw);

    const newPlants = plants.map((plant) => (plant.id === arg.id ? arg : plant));

    await fs.writeFile(this.plantsFile, JSON.stringify(newPlants, null, 2));
    return arg;
  }

  public async removeById(id: string): Promise<boolean> {
    const dataRaw = await fs.readFile(this.plantsFile, { encoding: 'utf8' });
    const plants: IPlant[] = JSON.parse(dataRaw);

    const deletedePlant = plants.find((plant) => plant.id === +id);

    const newPlants = plants.filter((plant) => plant.id !== +id);

    await fs.writeFile(this.plantsFile, JSON.stringify(newPlants, null, 2));
    return !!deletedePlant;
  }
}
