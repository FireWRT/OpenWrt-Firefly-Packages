#
# Copyright (C) 2006-2011 OpenWrt.org
#
# This is free software, licensed under the GNU General Public License v2.
# See /LICENSE for more information.
#

include $(TOPDIR)/rules.mk

PKG_NAME:=autorun
PKG_RELEASE:=2014-11-11

include $(INCLUDE_DIR)/package.mk

define Package/$(PKG_NAME)
	CATEGORY:=Firefly Configuration
	SUBMENU:=Applications
	TITLE:= Control app auto run when the device start up
endef

define Build/Compile
endef

define Package/$(PKG_NAME)/install
	$(INSTALL_DIR) $(1)/etc/init.d/
	$(INSTALL_BIN) ./autorun $(1)/etc/init.d/autorun
endef


$(eval $(call BuildPackage,$(PKG_NAME)))

