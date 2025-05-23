-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('PENDING', 'ACTIVE');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "PaymentType" AS ENUM ('CLICK', 'PAYME');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'FINISHED');

-- CreateEnum
CREATE TYPE "OrderType" AS ENUM ('HOUR', 'DAY');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "status" "UserStatus" NOT NULL,
    "role" "UserRole" NOT NULL,
    "regionId" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Region" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Region_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" SERIAL NOT NULL,
    "ip" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Level" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Level_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "orderId" INTEGER NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MasterStar" (
    "id" SERIAL NOT NULL,
    "commentId" INTEGER NOT NULL,
    "star" DOUBLE PRECISION NOT NULL,
    "masterId" INTEGER NOT NULL,

    CONSTRAINT "MasterStar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Brand" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Brand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Capacity" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Capacity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Size" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Size_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Master" (
    "id" SERIAL NOT NULL,
    "fullname" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "image" TEXT,
    "star" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "about" TEXT NOT NULL,

    CONSTRAINT "Master_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MasterProduct" (
    "id" SERIAL NOT NULL,
    "minWorkingHours" INTEGER,
    "productId" INTEGER NOT NULL,
    "levelId" INTEGER NOT NULL,
    "price_hour" DOUBLE PRECISION,
    "price_day" DOUBLE PRECISION,
    "experience" INTEGER NOT NULL,
    "masterId" INTEGER NOT NULL,

    CONSTRAINT "MasterProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductLevel" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "levelId" INTEGER NOT NULL,
    "minWorkingHour" INTEGER NOT NULL,
    "price_hour" INTEGER NOT NULL,
    "price_day" INTEGER NOT NULL,

    CONSTRAINT "ProductLevel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT,
    "isActive" BOOLEAN NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tools" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "code" TEXT NOT NULL,
    "brandId" INTEGER,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "capacityId" INTEGER,
    "sizeId" INTEGER,
    "image" TEXT,

    CONSTRAINT "Tools_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "location" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "paymentType" "PaymentType" NOT NULL,
    "withDelivery" BOOLEAN NOT NULL,
    "status" "OrderStatus" NOT NULL,
    "extraComment" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orderProduct" (
    "id" SERIAL NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "workingTime" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "count" INTEGER NOT NULL,
    "toolId" INTEGER,
    "levelId" INTEGER,
    "orderId" INTEGER NOT NULL,
    "productId" INTEGER,

    CONSTRAINT "orderProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Basket" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "productId" INTEGER,
    "timeUnit" "OrderType" NOT NULL,
    "toolsId" INTEGER,
    "levelId" INTEGER,
    "totalPrice" INTEGER NOT NULL,
    "workTime" INTEGER NOT NULL,

    CONSTRAINT "Basket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FAQ" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,

    CONSTRAINT "FAQ_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contact" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "message" TEXT NOT NULL,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "generalInfo" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "phone" TEXT NOT NULL,

    CONSTRAINT "generalInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MasterToOrder" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_MasterToOrder_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_ProductToTools" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ProductToTools_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Region_name_key" ON "Region"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Level_name_key" ON "Level"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Brand_name_key" ON "Brand"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Capacity_name_key" ON "Capacity"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Size_name_key" ON "Size"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Master_phone_key" ON "Master"("phone");

-- CreateIndex
CREATE INDEX "_MasterToOrder_B_index" ON "_MasterToOrder"("B");

-- CreateIndex
CREATE INDEX "_ProductToTools_B_index" ON "_ProductToTools"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "Region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MasterStar" ADD CONSTRAINT "MasterStar_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MasterStar" ADD CONSTRAINT "MasterStar_masterId_fkey" FOREIGN KEY ("masterId") REFERENCES "Master"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MasterProduct" ADD CONSTRAINT "MasterProduct_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "Level"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MasterProduct" ADD CONSTRAINT "MasterProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MasterProduct" ADD CONSTRAINT "MasterProduct_masterId_fkey" FOREIGN KEY ("masterId") REFERENCES "Master"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductLevel" ADD CONSTRAINT "ProductLevel_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductLevel" ADD CONSTRAINT "ProductLevel_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "Level"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tools" ADD CONSTRAINT "Tools_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tools" ADD CONSTRAINT "Tools_capacityId_fkey" FOREIGN KEY ("capacityId") REFERENCES "Capacity"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tools" ADD CONSTRAINT "Tools_sizeId_fkey" FOREIGN KEY ("sizeId") REFERENCES "Size"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orderProduct" ADD CONSTRAINT "orderProduct_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orderProduct" ADD CONSTRAINT "orderProduct_toolId_fkey" FOREIGN KEY ("toolId") REFERENCES "Tools"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orderProduct" ADD CONSTRAINT "orderProduct_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "Level"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orderProduct" ADD CONSTRAINT "orderProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Basket" ADD CONSTRAINT "Basket_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Basket" ADD CONSTRAINT "Basket_toolsId_fkey" FOREIGN KEY ("toolsId") REFERENCES "Tools"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Basket" ADD CONSTRAINT "Basket_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "Level"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MasterToOrder" ADD CONSTRAINT "_MasterToOrder_A_fkey" FOREIGN KEY ("A") REFERENCES "Master"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MasterToOrder" ADD CONSTRAINT "_MasterToOrder_B_fkey" FOREIGN KEY ("B") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToTools" ADD CONSTRAINT "_ProductToTools_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToTools" ADD CONSTRAINT "_ProductToTools_B_fkey" FOREIGN KEY ("B") REFERENCES "Tools"("id") ON DELETE CASCADE ON UPDATE CASCADE;
