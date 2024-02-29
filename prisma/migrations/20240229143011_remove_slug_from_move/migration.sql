/*
  Warnings:

  - You are about to drop the column `slug` on the `Move` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Move_slug_key";

-- AlterTable
ALTER TABLE "Move" DROP COLUMN "slug";
