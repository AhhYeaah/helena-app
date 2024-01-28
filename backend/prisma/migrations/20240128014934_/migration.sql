/*
  Warnings:

  - You are about to drop the column `description` on the `Consulta` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[segundaConsultaId]` on the table `Consulta` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Consulta" DROP COLUMN "description",
ADD COLUMN     "segundaConsultaId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Consulta_segundaConsultaId_key" ON "Consulta"("segundaConsultaId");

-- AddForeignKey
ALTER TABLE "Consulta" ADD CONSTRAINT "Consulta_segundaConsultaId_fkey" FOREIGN KEY ("segundaConsultaId") REFERENCES "Consulta"("id") ON DELETE SET NULL ON UPDATE CASCADE;
