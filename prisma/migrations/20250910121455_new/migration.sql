/*
  Warnings:

  - You are about to drop the column `slot` on the `Booking` table. All the data in the column will be lost.
  - Added the required column `ends` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `starts` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Booking" DROP COLUMN "slot",
ADD COLUMN     "ends" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "starts" TIMESTAMP(3) NOT NULL;
