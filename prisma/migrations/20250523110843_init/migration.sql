/*
  Warnings:

  - Added the required column `timeUnit` to the `orderProduct` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orderProduct" ADD COLUMN     "timeUnit" "OrderType" NOT NULL;
