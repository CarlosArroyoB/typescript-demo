import { Router } from "express";
import {
  getUser,
  deleteUser,
  createUser,
} from "../controllers/usersController";
import auth from "../middlewares/auth";

const router: Router= Router();

router.post("/users", createUser);

router.get("/users",auth, getUser);

router.delete("/:id", deleteUser);

export default router
