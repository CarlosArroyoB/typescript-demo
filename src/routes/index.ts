import { Router } from "express";
import {
  getUser,
  deleteUser,
  createUser,
  getUsersById
} from "../controllers/usersController";
import auth from "../middlewares/auth";
import { createVehicle, getVehicles } from "../controllers/vehicleControllers";

const router: Router= Router();

router.post("/users", createUser);
router.post("/vehicles",createVehicle)

router.get("/users",auth, getUser);
router.get("/vehicles",getVehicles)

router.get("/users/:id", getUsersById);
router.delete("/:id", deleteUser);

export default router
