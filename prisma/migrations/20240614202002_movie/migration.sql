-- CreateTable
CREATE TABLE "movies" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "director" TEXT NOT NULL,
    "releaseDate" TIMESTAMP(3) NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "_createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "movies_pkey" PRIMARY KEY ("id")
);
