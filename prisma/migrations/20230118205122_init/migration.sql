/*
  Warnings:

  - The `pallet` column on the `Image` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[name]` on the table `Image` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Image" DROP COLUMN "pallet",
ADD COLUMN     "pallet" INTEGER[];

-- CreateIndex
CREATE UNIQUE INDEX "Image_name_key" ON "Image"("name");
