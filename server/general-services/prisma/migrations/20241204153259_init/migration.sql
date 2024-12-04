/*
  Warnings:

  - The primary key for the `foods` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `availability` on the `foods` table. All the data in the column will be lost.
  - The primary key for the `invoices` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `restaurants` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `image` on the `restaurants` table. All the data in the column will be lost.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `food_images` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `permissions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `roles_permissions` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `image_url` to the `foods` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image_url` to the `restaurants` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `food_images` DROP FOREIGN KEY `food_images_food_id_fkey`;

-- DropForeignKey
ALTER TABLE `foods` DROP FOREIGN KEY `foods_restaurant_id_fkey`;

-- DropForeignKey
ALTER TABLE `roles_permissions` DROP FOREIGN KEY `roles_permissions_permission_id_fkey`;

-- DropForeignKey
ALTER TABLE `roles_permissions` DROP FOREIGN KEY `roles_permissions_role_id_fkey`;

-- AlterTable
ALTER TABLE `foods` DROP PRIMARY KEY,
    DROP COLUMN `availability`,
    ADD COLUMN `available` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `image_url` VARCHAR(191) NOT NULL,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `restaurant_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `invoices` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `restaurants` DROP PRIMARY KEY,
    DROP COLUMN `image`,
    ADD COLUMN `image_url` VARCHAR(191) NOT NULL,
    ADD COLUMN `total_order` INTEGER NOT NULL DEFAULT 0,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `user_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `users` DROP PRIMARY KEY,
    ADD COLUMN `restaurantsId` VARCHAR(191) NULL,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- DropTable
DROP TABLE `food_images`;

-- DropTable
DROP TABLE `permissions`;

-- DropTable
DROP TABLE `roles_permissions`;

-- AddForeignKey
ALTER TABLE `foods` ADD CONSTRAINT `foods_restaurant_id_fkey` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_restaurantsId_fkey` FOREIGN KEY (`restaurantsId`) REFERENCES `restaurants`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
