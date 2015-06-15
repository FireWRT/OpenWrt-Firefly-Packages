#
# Copyright (C) 2006-2009 OpenWrt.org
#
# This is free software, licensed under the GNU General Public License v2.
# See /LICENSE for more information.
#

include $(TOPDIR)/rules.mk
include $(INCLUDE_DIR)/kernel.mk

PKG_NAME:=fs-ufsd

PKG_VERSION:=2015-05-16
PKG_RELEASE:=1

PKG_BUILD_DIR:=$(KERNEL_BUILD_DIR)/$(PKG_NAME)-$(PKG_VERSION)

include $(INCLUDE_DIR)/package.mk


define KernelPackage/fs-ufsd
  CATEGORY:=Firefly Configuration
  TITLE:=Paragon ufsd driver
  SUBMENU:=Drivers
  DEPENDS:=@TARGET_ramips
  FILES:=$(PKG_BUILD_DIR)/ufsd.ko
  KCONFIG:= \
	CONFIG_UFSD_FS=m
  AUTOLOAD:=$(call AutoLoad,50,ufsd)
endef

define KernelPackage/fs-ufsd/description
Paragon ufsd is a fs driver for ntfs
endef

#define KernelPackage/raeth/config
#	source "$(SOURCE)/config.in"
#endef

define Build/Prepare
	$(CP) ./src/* $(PKG_BUILD_DIR)/
endef

define Build/Compile
	$(MAKE) -C "$(LINUX_DIR)" \
		CROSS_COMPILE="$(TARGET_CROSS)" \
		ARCH="$(LINUX_KARCH)" \
                CROSS_COMPILE="$(TARGET_CROSS)" \
                M="$(PKG_BUILD_DIR)" \
		modules
endef

define KernelPackage/fs-ufsd/install
endef

$(eval $(call KernelPackage,fs-ufsd))
