-- CreateTable
CREATE TABLE "Subtitles" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "content" TEXT,
    "userId" TEXT NOT NULL,
    "transcriptionId" TEXT NOT NULL,

    CONSTRAINT "Subtitles_pkey" PRIMARY KEY ("id")
);
