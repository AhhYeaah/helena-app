/*
  Warnings:

  - You are about to drop the column `date` on the `Consulta` table. All the data in the column will be lost.
  - Added the required column `endDate` to the `Consulta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Consulta` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Consulta" DROP COLUMN "date",
ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL;
