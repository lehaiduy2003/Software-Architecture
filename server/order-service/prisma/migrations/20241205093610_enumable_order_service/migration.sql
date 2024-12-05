/*
  Warnings:

  - You are about to alter the column `status` on the `orders` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.
  - You are about to alter the column `payment_method` on the `orders` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(1))`.
  - You are about to alter the column `payment_status` on the `orders` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(2))`.

*/
-- AlterTable
ALTER TABLE `orders` MODIFY `user_id` VARCHAR(191) NOT NULL,
    MODIFY `status` ENUM('PENDING', 'COOKING', 'DELIVERING', 'COMPLETED', 'CANCELLED', 'REFUNDED') NOT NULL DEFAULT 'PENDING',
    MODIFY `payment_method` ENUM('CASH', 'CARD') NOT NULL DEFAULT 'CASH',
    MODIFY `payment_status` ENUM('PENDING', 'PAID') NOT NULL DEFAULT 'PENDING';
