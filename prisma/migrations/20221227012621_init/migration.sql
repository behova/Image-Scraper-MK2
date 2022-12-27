-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "thumbURL" TEXT NOT NULL,
    "fullURL" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "pallet" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Image_thumbURL_key" ON "Image"("thumbURL");

-- CreateIndex
CREATE UNIQUE INDEX "Image_fullURL_key" ON "Image"("fullURL");
