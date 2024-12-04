-- AlterTable
ALTER TABLE `foods` ADD COLUMN `availability` BOOLEAN NULL DEFAULT true;

-- AlterTable
ALTER TABLE `restaurants` ADD COLUMN `image` VARCHAR(191) NULL;
