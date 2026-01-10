import { EquipmentStatus } from "../../generated/prisma/client";

export type CreateEquipmentDTO = {
  name: string;
  serialNumber: string;
  location: string;
  status?: EquipmentStatus;
  metadata?: Record<string, any>;
  userId: string;
};
