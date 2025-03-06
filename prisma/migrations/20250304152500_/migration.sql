/*
  Warnings:

  - You are about to drop the column `format` on the `File` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "File" DROP COLUMN "format";

-- AlterTable
ALTER TABLE "Subtitle" ADD COLUMN     "format" "FileFormat" NOT NULL DEFAULT 'audio',
ADD COLUMN     "mediaURL" TEXT;
