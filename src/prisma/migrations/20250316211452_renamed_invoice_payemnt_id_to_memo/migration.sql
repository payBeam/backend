/*
  Warnings:

  - The primary key for the `InvoicePayment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `InvoicePayment` table. All the data in the column will be lost.
  - The required column `memo` was added to the `InvoicePayment` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "InvoicePayment" DROP CONSTRAINT "InvoicePayment_pkey",
DROP COLUMN "id",
ADD COLUMN     "memo" TEXT NOT NULL,
ADD CONSTRAINT "InvoicePayment_pkey" PRIMARY KEY ("memo");
