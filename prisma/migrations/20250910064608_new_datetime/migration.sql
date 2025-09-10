-- CreateEnum
CREATE TYPE "public"."Day" AS ENUM ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday');

-- AlterTable
ALTER TABLE "public"."Activity" ADD COLUMN     "date" TIMESTAMP(3),
ADD COLUMN     "days" "public"."Day"[],
ALTER COLUMN "ends" DROP DEFAULT,
ALTER COLUMN "ends" SET DATA TYPE TIME(0),
ALTER COLUMN "starts" DROP DEFAULT,
ALTER COLUMN "starts" SET DATA TYPE TIME(0);
