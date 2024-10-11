/*
  Warnings:

  - Made the column `mediaUrl` on table `Subtitle` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Subtitle" ALTER COLUMN "mediaUrl" SET NOT NULL;
