-- AlterTable
ALTER TABLE "MoveList" ADD COLUMN     "characterId" TEXT;

-- AddForeignKey
ALTER TABLE "MoveList" ADD CONSTRAINT "MoveList_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE SET NULL ON UPDATE CASCADE;
