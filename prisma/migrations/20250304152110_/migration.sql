-- CreateEnum
CREATE TYPE "FileFormat" AS ENUM ('audio', 'video');

-- AlterTable
ALTER TABLE "File" ADD COLUMN     "format" "FileFormat" NOT NULL DEFAULT 'audio';
