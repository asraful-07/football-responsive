import { Equipment } from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const create = async (
  payload: Omit<Equipment, "id" | "createdAt" | "updatedAt">
) => {
  await prisma.equipment.create({
    payload,
  });
};
