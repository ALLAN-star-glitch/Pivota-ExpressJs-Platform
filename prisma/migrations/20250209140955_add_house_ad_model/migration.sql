-- CreateEnum
CREATE TYPE "HouseType" AS ENUM ('rental', 'sale');

-- CreateTable
CREATE TABLE "HouseAd" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "houseType" "HouseType" NOT NULL,
    "houseRentalCapacity" INTEGER NOT NULL,
    "isFurnished" BOOLEAN NOT NULL,
    "houseCondition" TEXT NOT NULL,
    "landSize" TEXT NOT NULL,
    "ownershipDocuments" TEXT NOT NULL,
    "images" TEXT[],
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HouseAd_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "HouseAd" ADD CONSTRAINT "HouseAd_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
