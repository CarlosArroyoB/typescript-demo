import { Request, Response } from "express";
import {
  getUserService,
  createUserService,
  deleteUserService,
} from "../services/usersService";
import IUser from "../interfaces/IUser";

const todoOk = (req: Request, res: Response) => {
  res.send("Todo ok");
};
export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, active } = req.body;
    const newUser: IUser = await createUserService({ name, email, active });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({
      error: "Error interno en el servidor",
    });
  }
};
export const getUser = async (req: Request, res: Response) => {
  const users: IUser[] = await getUserService();
  res.status(200).json(users);
};
export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.body;
  await deleteUserService(id);
  res.status(200).json({ message: "Eliminado correctamente" });
};

export default todoOk;
