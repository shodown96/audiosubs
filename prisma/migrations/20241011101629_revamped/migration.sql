/*
  Warnings:

  - You are about to drop the `Subtitles` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Subtitles";

-- CreateTable
CREATE TABLE "Subtitle" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "transcriptionId" TEXT NOT NULL,

    CONSTRAINT "Subtitle_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Subtitle_transcriptionId_key" ON "Subtitle"("transcriptionId");
