/*
  Warnings:

  - Added the required column `slot` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Booking" ADD COLUMN     "slot" TIMESTAMP(3) NOT NULL;
