#
# Copyright (C) 2006-2014 OpenWrt.org
#
# This is free software, licensed under the GNU General Public License v2.
# See /LICENSE for more information.
#

include $(TOPDIR)/rules.mk

PKG_NAME:=luci-app-xware
PKG_RELEASE:=1

include $(INCLUDE_DIR)/package.mk

define Package/luci-app-xware
  CATEGORY:=Firefly Configuration
  SUBMENU:=Applications
  TITLE:=LuCI support for the xware
endef

define Package/luci-app-xware/description
	LuCI support for the xware,but the xware's LuCI only chinese
endef

define Build/Compile
endef

define Package/luci-app-xware/install
	$(CP) ./files/* $(1)
endef

$(eval $(call BuildPackage,luci-app-xware))
