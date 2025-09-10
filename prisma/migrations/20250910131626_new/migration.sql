/*
  Warnings:

  - You are about to drop the column `date` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `days` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `ends` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `repeat` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `starts` on the `Activity` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Activity" DROP COLUMN "date",
DROP COLUMN "days",
DROP COLUMN "ends",
DROP COLUMN "repeat",
DROP COLUMN "starts";
