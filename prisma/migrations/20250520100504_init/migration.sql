/*
  Warnings:

  - You are about to drop the `PrdLevel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_LevelToProduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PrdLevel" DROP CONSTRAINT "PrdLevel_levelId_fkey";

-- DropForeignKey
ALTER TABLE "PrdLevel" DROP CONSTRAINT "PrdLevel_productId_fkey";

-- DropForeignKey
ALTER TABLE "_LevelToProduct" DROP CONSTRAINT "_LevelToProduct_A_fkey";

-- DropForeignKey
ALTER TABLE "_LevelToProduct" DROP CONSTRAINT "_LevelToProduct_B_fkey";

-- DropTable
DROP TABLE "PrdLevel";

-- DropTable
DROP TABLE "_LevelToProduct";

-- CreateTable
CREATE TABLE "_PrdLevel" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_PrdLevel_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_PrdLevel_B_index" ON "_PrdLevel"("B");

-- AddForeignKey
ALTER TABLE "_PrdLevel" ADD CONSTRAINT "_PrdLevel_A_fkey" FOREIGN KEY ("A") REFERENCES "Level"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PrdLevel" ADD CONSTRAINT "_PrdLevel_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
