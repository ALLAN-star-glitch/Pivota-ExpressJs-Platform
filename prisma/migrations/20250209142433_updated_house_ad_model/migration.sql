/*
  Warnings:

  - You are about to drop the column `houseCondition` on the `HouseAd` table. All the data in the column will be lost.
  - You are about to drop the column `houseRentalCapacity` on the `HouseAd` table. All the data in the column will be lost.
  - You are about to drop the column `houseType` on the `HouseAd` table. All the data in the column will be lost.
  - You are about to drop the column `images` on the `HouseAd` table. All the data in the column will be lost.
  - You are about to drop the column `isFurnished` on the `HouseAd` table. All the data in the column will be lost.
  - You are about to drop the column `landSize` on the `HouseAd` table. All the data in the column will be lost.
  - You are about to drop the column `ownershipDocuments` on the `HouseAd` table. All the data in the column will be lost.
  - The `plan` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `area` to the `HouseAd` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bathrooms` to the `HouseAd` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bedrooms` to the `HouseAd` table without a default value. This is not possible if the table is not empty.
  - Added the required column `propertyType` to the `HouseAd` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "HouseAd" DROP COLUMN "houseCondition",
DROP COLUMN "houseRentalCapacity",
DROP COLUMN "houseType",
DROP COLUMN "images",
DROP COLUMN "isFurnished",
DROP COLUMN "landSize",
DROP COLUMN "ownershipDocuments",
ADD COLUMN     "area" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "bathrooms" INTEGER NOT NULL,
ADD COLUMN     "bedrooms" INTEGER NOT NULL,
ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "propertyType" TEXT NOT NULL,
ALTER COLUMN "price" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "plan",
ADD COLUMN     "plan" "Plan" NOT NULL DEFAULT 'free';

-- DropEnum
DROP TYPE "HouseType";
