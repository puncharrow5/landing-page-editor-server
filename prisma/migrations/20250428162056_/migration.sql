-- CreateTable
CREATE TABLE `MobileFooter` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `footerType` INTEGER NOT NULL,
    `logo` VARCHAR(191) NULL,
    `logoSize` VARCHAR(191) NULL,
    `contentTop` VARCHAR(191) NULL,
    `helpCenter` VARCHAR(191) NULL,
    `terms` TEXT NULL,
    `contentBottom` VARCHAR(191) NULL,
    `backgroundColor` VARCHAR(191) NULL,
    `paddingTop` VARCHAR(191) NULL,
    `paddingBottom` VARCHAR(191) NULL,
    `textSize` VARCHAR(191) NULL,
    `textColor` VARCHAR(191) NULL,
    `lineHeight` DOUBLE NULL,
    `siteId` INTEGER NULL,

    UNIQUE INDEX `MobileFooter_siteId_key`(`siteId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `MobileFooter` ADD CONSTRAINT `MobileFooter_siteId_fkey` FOREIGN KEY (`siteId`) REFERENCES `Site`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
