/*
  Warnings:

  - You are about to drop the column `available` on the `foods` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `foods` DROP COLUMN `available`,
    ADD COLUMN `quantity` INTEGER NOT NULL DEFAULT 1;
