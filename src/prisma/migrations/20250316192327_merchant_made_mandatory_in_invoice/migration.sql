/*
  Warnings:

  - Made the column `merchantId` on table `Invoice` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Invoice" DROP CONSTRAINT "Invoice_merchantId_fkey";

-- AlterTable
ALTER TABLE "Invoice" ALTER COLUMN "merchantId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "Merchant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
