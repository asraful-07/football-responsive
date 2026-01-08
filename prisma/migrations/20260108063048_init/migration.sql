-- CreateEnum
CREATE TYPE "EquipmentStatus" AS ENUM ('AVAILABLE', 'IN_USE', 'MAINTENANCE');

-- CreateTable
CREATE TABLE "equipment" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "serialNumber" TEXT NOT NULL,
    "status" "EquipmentStatus" NOT NULL DEFAULT 'AVAILABLE',
    "location" TEXT NOT NULL,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "equipment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usagelog" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "equipmentId" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3),
    "purpose" TEXT NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usagelog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "equipment_serialNumber_key" ON "equipment"("serialNumber");

-- CreateIndex
CREATE INDEX "equipment_userId_idx" ON "equipment"("userId");

-- CreateIndex
CREATE INDEX "usagelog_userId_idx" ON "usagelog"("userId");

-- AddForeignKey
ALTER TABLE "usagelog" ADD CONSTRAINT "usagelog_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "equipment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
