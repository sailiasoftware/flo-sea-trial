-- CreateTable
CREATE TABLE "public"."ActivityRessource" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "activityId" INTEGER NOT NULL,
    "ressourceId" INTEGER NOT NULL,

    CONSTRAINT "ActivityRessource_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."ActivityRessource" ADD CONSTRAINT "ActivityRessource_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "public"."Activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ActivityRessource" ADD CONSTRAINT "ActivityRessource_ressourceId_fkey" FOREIGN KEY ("ressourceId") REFERENCES "public"."Ressource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
