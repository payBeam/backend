/*
  Warnings:

  - The values [USDT] on the enum `TokenType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `paymentMode` on the `Invoice` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TokenType_new" AS ENUM ('USDC', 'XLM');
ALTER TABLE "Invoice" ALTER COLUMN "token" DROP DEFAULT;
ALTER TABLE "Invoice" ALTER COLUMN "token" TYPE "TokenType_new" USING ("token"::text::"TokenType_new");
ALTER TABLE "InvoicePayment" ALTER COLUMN "token" TYPE "TokenType_new" USING ("token"::text::"TokenType_new");
ALTER TYPE "TokenType" RENAME TO "TokenType_old";
ALTER TYPE "TokenType_new" RENAME TO "TokenType";
DROP TYPE "TokenType_old";
ALTER TABLE "Invoice" ALTER COLUMN "token" SET DEFAULT 'USDC';
COMMIT;

-- AlterTable
ALTER TABLE "Invoice" DROP COLUMN "paymentMode";
