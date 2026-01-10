import { prisma } from "../../lib/prisma";
import { CreateEquipmentDTO } from "./equipment.interface";

export const CreateEquipmentService = async (data: CreateEquipmentDTO) => {
  const result = await prisma.equipment.create({
    data: {
      name: data.name,
      serialNumber: data.serialNumber,
      location: data.location,
      status: data.status ?? "AVAILABLE",
      metadata: data.metadata,
      userId: data.userId,
    },
  });

  return result;
};
