#
# Copyright (C) 2006-2011 OpenWrt.org
#
# This is free software, licensed under the GNU General Public License v2.
# See /LICENSE for more information.
#

include $(TOPDIR)/rules.mk

PKG_NAME:=mount-tools
PKG_RELEASE:=2015-03-13

include $(INCLUDE_DIR)/package.mk

define Package/$(PKG_NAME)
  CATEGORY:=Firefly Configuration
  SUBMENU:=Applications
  DEPENDS:=+blkid +losetup +ntfs-3g +fdisk +kmod-usb-core +kmod-usb3 +kmod-usb-storage +@BUSYBOX_DEFAULT_FUSER +kmod-fs-vfat +kmod-fs-ext4 +kmod-fs-ntfs +kmod-nls-base +kmod-nls-utf8 +kmod-nls-cp437 +kmod-nls-cp850 +kmod-nls-iso8859-1 +kmod-nls-iso8859-15 +kmod-ata-core +kmod-ata-ahci
  TITLE:= Auto mount the usb disk,SD card and hard disk
endef

define Build/Compile
endef

define Package/$(PKG_NAME)/install
	$(INSTALL_DIR) $(1)/etc/hotplug.d/block
	$(INSTALL_BIN) ./automount $(1)/etc/hotplug.d/block/30-mount
endef


$(eval $(call BuildPackage,$(PKG_NAME)))
