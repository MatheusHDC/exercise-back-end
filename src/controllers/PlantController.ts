import { Request, Response, NextFunction } from 'express';
import PlantService from '../services/PlantService';
import HttpException from '../exceptions/HttpException';

class PlantController {
  constructor(public service: PlantService) {}

  public async getAll(_req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const plants = await this.service.getAll();
      return res.status(200).json(plants);
    } catch (error) {
      next(error);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const plant = await this.service.getById(req.params.id);
      return res.status(200).json(plant);
    } catch (error) {
      next(error);
    }
  }

  public async create(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const plant = await this.service.create(req.body);
      return res.status(201).json(plant);
    } catch (error) {
      next(error);
    }
  }

  public async update(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const plant = await this.service.update({ ...req.body, id: +req.params.id });
      return res.status(200).json(plant);
    } catch (error) {
      next(error);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const deleted = await this.service.removeById(req.params.id);

      if (!deleted) throw new HttpException(404, 'NOT FOUND!');

      return res.status(200).end();
    } catch (error) {
      next(error);
    }
  }
}

export default PlantController;
