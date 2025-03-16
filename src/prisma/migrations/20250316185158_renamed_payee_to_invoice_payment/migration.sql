/*
  Warnings:

  - You are about to drop the `Payee` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Payee" DROP CONSTRAINT "Payee_invoiceId_fkey";

-- DropTable
DROP TABLE "Payee";

-- CreateTable
CREATE TABLE "InvoicePayment" (
    "id" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "token" "TokenType" NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'Pending',
    "invoiceId" TEXT NOT NULL,

    CONSTRAINT "InvoicePayment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "InvoicePayment" ADD CONSTRAINT "InvoicePayment_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
