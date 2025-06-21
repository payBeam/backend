-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "TokenType" ADD VALUE 'USDT';
ALTER TYPE "TokenType" ADD VALUE 'ZETA';
ALTER TYPE "TokenType" ADD VALUE 'ETH';
ALTER TYPE "TokenType" ADD VALUE 'BASE';
ALTER TYPE "TokenType" ADD VALUE 'BNB';
ALTER TYPE "TokenType" ADD VALUE 'SOL';
ALTER TYPE "TokenType" ADD VALUE 'TON';
ALTER TYPE "TokenType" ADD VALUE 'TRX';
