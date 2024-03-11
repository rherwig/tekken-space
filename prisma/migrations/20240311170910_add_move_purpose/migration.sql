-- DropForeignKey
ALTER TABLE "Move" DROP CONSTRAINT "Move_movesListId_fkey";

-- AlterTable
ALTER TABLE "Character" ADD COLUMN     "isHidden" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Move" ADD COLUMN     "purpose" TEXT,
ADD COLUMN     "purposeDetails" TEXT;

-- AddForeignKey
ALTER TABLE "Move" ADD CONSTRAINT "Move_movesListId_fkey" FOREIGN KEY ("movesListId") REFERENCES "MoveList"("id") ON DELETE CASCADE ON UPDATE CASCADE;
