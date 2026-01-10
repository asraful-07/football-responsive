import { RequestHandler } from "express";
import { CreateEquipmentService } from "./equipment.service";

export const CreateEquipmentController: RequestHandler = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized user" });
    }

    const equipment = await CreateEquipmentService({
      ...req.body,
      userId: user?.id,
    });

    res.status(201).json({
      success: true,
      message: "Created successfully equipment",
      data: equipment,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};
