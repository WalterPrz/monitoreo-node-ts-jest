/*
  Warnings:

  - Added the required column `level` to the `LogModel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `origin` to the `LogModel` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SeverityLevel" AS ENUM ('LOW', 'MEDIUM', 'HIHG');

-- AlterTable
ALTER TABLE "LogModel" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "level" "SeverityLevel" NOT NULL,
ADD COLUMN     "origin" TEXT NOT NULL;
