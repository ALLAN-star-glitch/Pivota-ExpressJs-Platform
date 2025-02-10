/*
  Warnings:

  - You are about to drop the column `area` on the `HouseAd` table. All the data in the column will be lost.
  - You are about to drop the column `bathrooms` on the `HouseAd` table. All the data in the column will be lost.
  - You are about to drop the column `bedrooms` on the `HouseAd` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `HouseAd` table. All the data in the column will be lost.
  - You are about to drop the column `propertyType` on the `HouseAd` table. All the data in the column will be lost.
  - Added the required column `houseRentalCapacity` to the `HouseAd` table without a default value. This is not possible if the table is not empty.
  - Added the required column `houseType` to the `HouseAd` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "HouseAd" DROP COLUMN "area",
DROP COLUMN "bathrooms",
DROP COLUMN "bedrooms",
DROP COLUMN "imageUrl",
DROP COLUMN "propertyType",
ADD COLUMN     "houseCondition" TEXT,
ADD COLUMN     "houseRentalCapacity" TEXT NOT NULL,
ADD COLUMN     "houseType" TEXT NOT NULL,
ADD COLUMN     "images" TEXT[],
ADD COLUMN     "isAvailable" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "isFurnished" BOOLEAN,
ADD COLUMN     "numberOfBathrooms" INTEGER,
ADD COLUMN     "numberOfBedrooms" INTEGER,
ALTER COLUMN "location" DROP NOT NULL;
