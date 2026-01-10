import express from "express";
import equipmentRoutes from "../modules/equipment/equipment.routes";

const router = express.Router();

router.use("/equipment", equipmentRoutes);

export default router;
