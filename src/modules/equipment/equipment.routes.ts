import express from "express";
import { authMiddleware, UserRole } from "../../middleware/authMiddleware";
import { CreateEquipmentController } from "./equipment.controller";

const equipmentRoutes = express.Router();

equipmentRoutes.use(
  "/equipment",
  authMiddleware(UserRole.ADMIN, UserRole.USER),
  CreateEquipmentController
);

export default equipmentRoutes;
