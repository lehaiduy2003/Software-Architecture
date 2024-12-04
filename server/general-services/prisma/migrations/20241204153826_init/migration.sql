/*
  Warnings:

  - You are about to drop the column `restaurantsId` on the `users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_restaurantsId_fkey`;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `restaurantsId`;

-- AddForeignKey
ALTER TABLE `restaurants` ADD CONSTRAINT `restaurants_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
