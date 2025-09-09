-- AlterTable
ALTER TABLE "public"."RessourceItem" ALTER COLUMN "bookedUntil" DROP NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'AVAILABLE';
