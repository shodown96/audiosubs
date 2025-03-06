/*
  Warnings:

  - You are about to drop the column `mediaUrl` on the `Subtitle` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[fileId]` on the table `Subtitle` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Subtitle" DROP COLUMN "mediaUrl",
ADD COLUMN     "fileId" TEXT;

-- CreateTable
CREATE TABLE "File" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Subtitle_fileId_key" ON "Subtitle"("fileId");

-- AddForeignKey
ALTER TABLE "Subtitle" ADD CONSTRAINT "Subtitle_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File"("id") ON DELETE SET NULL ON UPDATE CASCADE;
