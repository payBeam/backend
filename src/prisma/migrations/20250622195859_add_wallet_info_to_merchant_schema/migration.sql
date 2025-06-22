-- AlterTable
ALTER TABLE "Merchant" ADD COLUMN     "network" TEXT,
ADD COLUMN     "payoutToken" "TokenType" NOT NULL DEFAULT 'USDC',
ADD COLUMN     "walletAddress" TEXT;
