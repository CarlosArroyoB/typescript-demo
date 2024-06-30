import { Request, Response } from "express";
import {
  createVehicleService,
  getVehicleService,
} from "../services/vehiclesService";

export const createVehicle = async (req: Request, res: Response) => {
  const { brand, color, age, userId } = req.body;
  try {
    const newVehicle = await createVehicleService({
      brand,
      color,
      age,
      userId,
    });
    res.status(200).json(newVehicle);
  } catch (error: any) {
    res.status(400).json({ error:''});
  }
};

export const getVehicles = async (req: Request, res: Response) => {
  const vehicle = await getVehicleService();
  res.status(200).json(vehicle);
};
