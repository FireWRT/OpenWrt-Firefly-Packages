#
# Copyright (C) 2007-2015 OpenWrt.org
#
# This is free software, licensed under the GNU General Public License v2.
# See /LICENSE for more information.
#

include $(TOPDIR)/rules.mk

PKG_NAME:=jq
PKG_VERSION:=1.5
PKG_RELEASE:=1

PKG_SOURCE:=$(PKG_NAME)-$(PKG_VERSION).tar.bz2
PKG_SOURCE_SUBDIR:=$(PKG_NAME)-$(PKG_VERSION)
PKG_SOURCE_URL:=https://github.com/stedolan/jq.git
PKG_SOURCE_PROTO:=git
PKG_SOURCE_VERSION:=ad0090964b5076ac519b0359a2afc543534852f1

PKG_FIXUP:=autoreconf
PKG_BUILD_PARALLEL:=1

include $(INCLUDE_DIR)/package.mk

define Package/jq
  SECTION:=net
  CATEGORY:=Network
  SUBMENU:=File Transfer
  DEPENDS:=+libcurl
  TITLE:= JQ
endef

TARGET_CFLAGS += $(FPIC) -std=gnu99

define Package/jq/install
	$(INSTALL_DIR) $(1)/usr/bin
	$(INSTALL_BIN) $(PKG_BUILD_DIR)/jq $(1)/usr/bin/
endef

$(eval $(call BuildPackage,jq))
