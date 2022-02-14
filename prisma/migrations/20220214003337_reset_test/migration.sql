/*
  Warnings:

  - You are about to drop the column `createdAt` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `belongstodeck` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `card` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `cardkeyword` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `deck` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `keyword` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `belongstodeck` DROP FOREIGN KEY `Belongstodeck_cardId_fkey`;

-- DropForeignKey
ALTER TABLE `belongstodeck` DROP FOREIGN KEY `Belongstodeck_deckId_fkey`;

-- DropForeignKey
ALTER TABLE `card` DROP FOREIGN KEY `Card_deckId_fkey`;

-- DropForeignKey
ALTER TABLE `cardkeyword` DROP FOREIGN KEY `CardKeyWord_cardId_fkey`;

-- DropForeignKey
ALTER TABLE `cardkeyword` DROP FOREIGN KEY `CardKeyWord_keyWordId_fkey`;

-- DropForeignKey
ALTER TABLE `category` DROP FOREIGN KEY `Category_accountId_fkey`;

-- DropForeignKey
ALTER TABLE `deck` DROP FOREIGN KEY `Deck_categoryId_fkey`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `createdAt`;

-- DropTable
DROP TABLE `belongstodeck`;

-- DropTable
DROP TABLE `card`;

-- DropTable
DROP TABLE `cardkeyword`;

-- DropTable
DROP TABLE `category`;

-- DropTable
DROP TABLE `deck`;

-- DropTable
DROP TABLE `keyword`;

-- CreateTable
CREATE TABLE `VerificationToken` (
    `identifier` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `VerificationToken_token_key`(`token`),
    UNIQUE INDEX `VerificationToken_identifier_token_key`(`identifier`, `token`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
