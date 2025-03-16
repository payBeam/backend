/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Merchant` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Merchant_id_key" ON "Merchant"("id");
