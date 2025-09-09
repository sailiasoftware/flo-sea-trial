/*
  Warnings:

  - You are about to drop the column `activityId` on the `Ressource` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Ressource" DROP CONSTRAINT "Ressource_activityId_fkey";

-- AlterTable
ALTER TABLE "public"."Ressource" DROP COLUMN "activityId";
