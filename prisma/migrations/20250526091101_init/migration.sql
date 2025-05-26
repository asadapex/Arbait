-- DropIndex
DROP INDEX "Brand_name_key";

-- DropIndex
DROP INDEX "Capacity_name_key";

-- DropIndex
DROP INDEX "Level_name_key";

-- DropIndex
DROP INDEX "Region_name_key";

-- DropIndex
DROP INDEX "Size_name_key";

-- AlterTable
ALTER TABLE "Brand" ADD COLUMN     "name_eng" TEXT,
ADD COLUMN     "name_ru" TEXT;

-- AlterTable
ALTER TABLE "Capacity" ADD COLUMN     "name_eng" TEXT,
ADD COLUMN     "name_ru" TEXT;

-- AlterTable
ALTER TABLE "Level" ADD COLUMN     "name_eng" TEXT,
ADD COLUMN     "name_ru" TEXT;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "name_eng" TEXT,
ADD COLUMN     "name_ru" TEXT;

-- AlterTable
ALTER TABLE "Region" ADD COLUMN     "name_eng" TEXT,
ADD COLUMN     "name_ru" TEXT;

-- AlterTable
ALTER TABLE "Size" ADD COLUMN     "name_eng" TEXT,
ADD COLUMN     "name_ru" TEXT;

-- AlterTable
ALTER TABLE "Tools" ADD COLUMN     "name_eng" TEXT,
ADD COLUMN     "name_ru" TEXT;
