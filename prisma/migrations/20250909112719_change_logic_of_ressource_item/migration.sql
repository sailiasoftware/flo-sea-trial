-- AlterTable
ALTER TABLE "public"."RessourceItem" ALTER COLUMN "bookedAt" DROP NOT NULL,
ALTER COLUMN "bookedAt" DROP DEFAULT;
