-- CreateTable
CREATE TABLE `Admin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `profileImage` VARCHAR(191) NULL,
    `refreshToken` VARCHAR(191) NULL,
    `roleId` INTEGER NOT NULL,

    UNIQUE INDEX `Admin_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Role_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `History` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `adminId` INTEGER NOT NULL,
    `siteId` INTEGER NOT NULL,
    `componentId` INTEGER NULL,
    `childId` INTEGER NULL,
    `mobileChildId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Child` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NULL,
    `content` VARCHAR(191) NULL,
    `isDelete` BOOLEAN NOT NULL DEFAULT false,
    `componentId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MobileChild` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NULL,
    `content` VARCHAR(191) NULL,
    `isDelete` BOOLEAN NOT NULL DEFAULT false,
    `componentId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Component` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `componentType` ENUM('SECTION', 'INQUIRY') NOT NULL,
    `title` VARCHAR(191) NULL,
    `mobileTitle` VARCHAR(191) NULL,
    `content` VARCHAR(191) NULL,
    `mobileContent` VARCHAR(191) NULL,
    `isDelete` BOOLEAN NOT NULL DEFAULT false,
    `siteId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Footer` (
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

    UNIQUE INDEX `Footer_siteId_key`(`siteId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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

-- CreateTable
CREATE TABLE `Header` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `logo` VARCHAR(191) NULL,
    `logoSize` VARCHAR(191) NULL,
    `height` VARCHAR(191) NULL,
    `padding` VARCHAR(191) NULL,
    `gap` VARCHAR(191) NULL,
    `backgroundColor` VARCHAR(191) NULL,
    `textSize` VARCHAR(191) NULL,
    `textColor` VARCHAR(191) NULL,
    `siteId` INTEGER NULL,

    UNIQUE INDEX `Header_siteId_key`(`siteId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MobileHeader` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `logo` VARCHAR(191) NULL,
    `logoSize` VARCHAR(191) NULL,
    `button` VARCHAR(191) NULL,
    `buttonSize` VARCHAR(191) NULL,
    `height` VARCHAR(191) NULL,
    `padding` VARCHAR(191) NULL,
    `menuPadding` VARCHAR(191) NULL,
    `backgroundColor` VARCHAR(191) NULL,
    `menuBackgroundColor` VARCHAR(191) NULL,
    `textSize` VARCHAR(191) NULL,
    `textColor` VARCHAR(191) NULL,
    `siteId` INTEGER NULL,

    UNIQUE INDEX `MobileHeader_siteId_key`(`siteId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Site` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `domain` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Site_domain_key`(`domain`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ComponentStyle` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `height` VARCHAR(191) NULL,
    `padding` VARCHAR(191) NULL,
    `grid` INTEGER NULL,
    `gap` VARCHAR(191) NULL,
    `background` VARCHAR(191) NULL,
    `backgroundType` ENUM('COLOR', 'IMAGE') NOT NULL DEFAULT 'COLOR',
    `componentId` INTEGER NOT NULL,

    UNIQUE INDEX `ComponentStyle_componentId_key`(`componentId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ComponentMobileStyle` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `height` VARCHAR(191) NULL,
    `padding` VARCHAR(191) NULL,
    `grid` INTEGER NULL,
    `gap` VARCHAR(191) NULL,
    `background` VARCHAR(191) NULL,
    `backgroundType` ENUM('COLOR', 'IMAGE') NOT NULL DEFAULT 'COLOR',
    `componentId` INTEGER NOT NULL,

    UNIQUE INDEX `ComponentMobileStyle_componentId_key`(`componentId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TitleStyle` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `margin` VARCHAR(191) NULL,
    `mobileMargin` VARCHAR(191) NULL,
    `size` VARCHAR(191) NULL,
    `mobileSize` VARCHAR(191) NULL,
    `lineHeight` DOUBLE NULL,
    `mobileLineHeight` DOUBLE NULL,
    `color` VARCHAR(191) NULL,
    `mobileColor` VARCHAR(191) NULL,
    `componentId` INTEGER NOT NULL,

    UNIQUE INDEX `TitleStyle_componentId_key`(`componentId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ContentStyle` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `margin` VARCHAR(191) NULL,
    `mobileMargin` VARCHAR(191) NULL,
    `size` VARCHAR(191) NULL,
    `mobileSize` VARCHAR(191) NULL,
    `lineHeight` DOUBLE NULL,
    `mobileLineHeight` DOUBLE NULL,
    `color` VARCHAR(191) NULL,
    `mobileColor` VARCHAR(191) NULL,
    `componentId` INTEGER NOT NULL,

    UNIQUE INDEX `ContentStyle_componentId_key`(`componentId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ChildStyle` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `width` VARCHAR(191) NULL,
    `height` VARCHAR(191) NULL,
    `margin` VARCHAR(191) NULL,
    `padding` VARCHAR(191) NULL,
    `background` VARCHAR(191) NULL,
    `backgroundType` ENUM('COLOR', 'IMAGE') NOT NULL DEFAULT 'COLOR',
    `border` VARCHAR(191) NULL,
    `borderRadius` VARCHAR(191) NULL,
    `titleSize` VARCHAR(191) NULL,
    `titleColor` VARCHAR(191) NULL,
    `titleLineHeight` DOUBLE NULL,
    `titleMargin` VARCHAR(191) NULL,
    `contentSize` VARCHAR(191) NULL,
    `contentColor` VARCHAR(191) NULL,
    `contentLineHeight` DOUBLE NULL,
    `contentMargin` VARCHAR(191) NULL,
    `childId` INTEGER NOT NULL,

    UNIQUE INDEX `ChildStyle_childId_key`(`childId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MobileChildStyle` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `width` VARCHAR(191) NULL,
    `height` VARCHAR(191) NULL,
    `margin` VARCHAR(191) NULL,
    `padding` VARCHAR(191) NULL,
    `background` VARCHAR(191) NULL,
    `backgroundType` ENUM('COLOR', 'IMAGE') NOT NULL DEFAULT 'COLOR',
    `border` VARCHAR(191) NULL,
    `borderRadius` VARCHAR(191) NULL,
    `titleSize` VARCHAR(191) NULL,
    `titleColor` VARCHAR(191) NULL,
    `titleLineHeight` DOUBLE NULL,
    `titleMargin` VARCHAR(191) NULL,
    `contentSize` VARCHAR(191) NULL,
    `contentColor` VARCHAR(191) NULL,
    `contentLineHeight` DOUBLE NULL,
    `contentMargin` VARCHAR(191) NULL,
    `mobileChildId` INTEGER NOT NULL,

    UNIQUE INDEX `MobileChildStyle_mobileChildId_key`(`mobileChildId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `InquiryStyle` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `padding` VARCHAR(191) NULL,
    `gap` VARCHAR(191) NULL,
    `textSize` VARCHAR(191) NULL,
    `textColor` VARCHAR(191) NULL,
    `lineHeight` DOUBLE NULL,
    `backgroundColor` VARCHAR(191) NULL,
    `buttonWidth` VARCHAR(191) NULL,
    `buttonHeight` VARCHAR(191) NULL,
    `buttonTextSize` VARCHAR(191) NULL,
    `buttonTextColor` VARCHAR(191) NULL,
    `buttonColor` VARCHAR(191) NULL,
    `buttonRadius` VARCHAR(191) NULL,
    `componentId` INTEGER NOT NULL,

    UNIQUE INDEX `InquiryStyle_componentId_key`(`componentId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MobileInquiryStyle` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `padding` VARCHAR(191) NULL,
    `gap` VARCHAR(191) NULL,
    `textSize` VARCHAR(191) NULL,
    `textColor` VARCHAR(191) NULL,
    `lineHeight` DOUBLE NULL,
    `backgroundColor` VARCHAR(191) NULL,
    `buttonWidth` VARCHAR(191) NULL,
    `buttonHeight` VARCHAR(191) NULL,
    `buttonTextSize` VARCHAR(191) NULL,
    `buttonTextColor` VARCHAR(191) NULL,
    `buttonColor` VARCHAR(191) NULL,
    `buttonRadius` VARCHAR(191) NULL,
    `componentId` INTEGER NOT NULL,

    UNIQUE INDEX `MobileInquiryStyle_componentId_key`(`componentId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_AdminToSite` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_AdminToSite_AB_unique`(`A`, `B`),
    INDEX `_AdminToSite_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Admin` ADD CONSTRAINT `Admin_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `History` ADD CONSTRAINT `History_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `Admin`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `History` ADD CONSTRAINT `History_siteId_fkey` FOREIGN KEY (`siteId`) REFERENCES `Site`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `History` ADD CONSTRAINT `History_componentId_fkey` FOREIGN KEY (`componentId`) REFERENCES `Component`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `History` ADD CONSTRAINT `History_childId_fkey` FOREIGN KEY (`childId`) REFERENCES `Child`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `History` ADD CONSTRAINT `History_mobileChildId_fkey` FOREIGN KEY (`mobileChildId`) REFERENCES `MobileChild`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Child` ADD CONSTRAINT `Child_componentId_fkey` FOREIGN KEY (`componentId`) REFERENCES `Component`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MobileChild` ADD CONSTRAINT `MobileChild_componentId_fkey` FOREIGN KEY (`componentId`) REFERENCES `Component`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Component` ADD CONSTRAINT `Component_siteId_fkey` FOREIGN KEY (`siteId`) REFERENCES `Site`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Footer` ADD CONSTRAINT `Footer_siteId_fkey` FOREIGN KEY (`siteId`) REFERENCES `Site`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MobileFooter` ADD CONSTRAINT `MobileFooter_siteId_fkey` FOREIGN KEY (`siteId`) REFERENCES `Site`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Header` ADD CONSTRAINT `Header_siteId_fkey` FOREIGN KEY (`siteId`) REFERENCES `Site`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MobileHeader` ADD CONSTRAINT `MobileHeader_siteId_fkey` FOREIGN KEY (`siteId`) REFERENCES `Site`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ComponentStyle` ADD CONSTRAINT `ComponentStyle_componentId_fkey` FOREIGN KEY (`componentId`) REFERENCES `Component`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ComponentMobileStyle` ADD CONSTRAINT `ComponentMobileStyle_componentId_fkey` FOREIGN KEY (`componentId`) REFERENCES `Component`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TitleStyle` ADD CONSTRAINT `TitleStyle_componentId_fkey` FOREIGN KEY (`componentId`) REFERENCES `Component`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContentStyle` ADD CONSTRAINT `ContentStyle_componentId_fkey` FOREIGN KEY (`componentId`) REFERENCES `Component`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChildStyle` ADD CONSTRAINT `ChildStyle_childId_fkey` FOREIGN KEY (`childId`) REFERENCES `Child`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MobileChildStyle` ADD CONSTRAINT `MobileChildStyle_mobileChildId_fkey` FOREIGN KEY (`mobileChildId`) REFERENCES `MobileChild`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InquiryStyle` ADD CONSTRAINT `InquiryStyle_componentId_fkey` FOREIGN KEY (`componentId`) REFERENCES `Component`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MobileInquiryStyle` ADD CONSTRAINT `MobileInquiryStyle_componentId_fkey` FOREIGN KEY (`componentId`) REFERENCES `Component`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AdminToSite` ADD CONSTRAINT `_AdminToSite_A_fkey` FOREIGN KEY (`A`) REFERENCES `Admin`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AdminToSite` ADD CONSTRAINT `_AdminToSite_B_fkey` FOREIGN KEY (`B`) REFERENCES `Site`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
