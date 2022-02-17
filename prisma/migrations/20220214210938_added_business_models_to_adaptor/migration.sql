-- AlterTable
ALTER TABLE `account` ADD COLUMN `createdAt` DATE NULL,
    ADD COLUMN `updatedAt` DATE NULL;

-- CreateTable
CREATE TABLE `Category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `categoryName` VARCHAR(150) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `expertise` INTEGER NULL,
    `createdAt` DATE NULL,
    `updatedAt` DATE NULL,
    `description` VARCHAR(550) NULL,

    INDEX `userId`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Deck` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `deckName` VARCHAR(150) NOT NULL,
    `categoryId` INTEGER NOT NULL,
    `createdAt` DATE NULL,
    `updatedAt` DATE NULL,
    `repetition` INTEGER NULL,
    `expertise` INTEGER NULL,

    INDEX `categoryId`(`categoryId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Card` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `question` VARCHAR(350) NOT NULL,
    `answer` VARCHAR(350) NOT NULL,
    `createdAt` DATE NULL,
    `updatedAt` DATE NULL,
    `repetition` INTEGER NULL,
    `nextOccurrence` DATE NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `KeyWord` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `word` VARCHAR(150) NOT NULL,
    `createdAt` DATE NULL,
    `updatedAt` DATE NULL,
    `cardId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CardToDeck` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CardToDeck_AB_unique`(`A`, `B`),
    INDEX `_CardToDeck_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Category` ADD CONSTRAINT `Category_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Deck` ADD CONSTRAINT `Deck_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KeyWord` ADD CONSTRAINT `KeyWord_cardId_fkey` FOREIGN KEY (`cardId`) REFERENCES `Card`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CardToDeck` ADD FOREIGN KEY (`A`) REFERENCES `Card`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CardToDeck` ADD FOREIGN KEY (`B`) REFERENCES `Deck`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
