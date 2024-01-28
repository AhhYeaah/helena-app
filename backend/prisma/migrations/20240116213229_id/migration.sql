/*
  Warnings:

  - The primary key for the `Consulta` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `Consulta` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Consulta" DROP CONSTRAINT "Consulta_pkey",
DROP COLUMN "userId",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Consulta_pkey" PRIMARY KEY ("id");

-- DropEnum
DROP TYPE "Roles";
