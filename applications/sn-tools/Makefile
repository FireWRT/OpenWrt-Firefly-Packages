#
# Copyright (C) 2006-2011 OpenWrt.org
#
# This is free software, licensed under the GNU General Public License v2.
# See /LICENSE for more information.
#

include $(TOPDIR)/rules.mk

PKG_NAME:=sn-tools
PKG_RELEASE:=2015-01-22

include $(INCLUDE_DIR)/package.mk

define Package/sn-tools
  CATEGORY:=Firefly Configuration
  SUBMENU:=Applications
  TITLE:= Read serial number
endef

define Build/Compile
endef

define Package/sn-tools/install
	$(INSTALL_DIR) $(1)/usr/bin/
	$(INSTALL_BIN) ./src/sn $(1)/usr/bin/
endef


$(eval $(call BuildPackage,sn-tools))
