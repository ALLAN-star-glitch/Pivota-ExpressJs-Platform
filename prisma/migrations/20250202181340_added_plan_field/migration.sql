-- CreateEnum
CREATE TYPE "Plan" AS ENUM ('free', 'bronze', 'silver', 'gold');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "plan" TEXT NOT NULL DEFAULT 'free';
