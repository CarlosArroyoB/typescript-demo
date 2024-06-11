import { Request, Response } from "express";
import {
  createVehicleService,
  getVehicleService,
} from "../services/vehiclesService";

export const createVehicle = async (req: Request, res: Response) => {
  try {
    const { brand, color, age, userId } = req.body;
    const newVehicle = await createVehicleService({
      brand,
      color,
      age,
      userId,
    });
    res.status(200).json(newVehicle);
  } catch (error: any) {}
};

export const getVehicles = async (req: Request, res: Response) => {
  const vehicle = await getVehicleService();
  res.status(200).json(vehicle);
};
