#
# Copyright (C) 2006-2011 OpenWrt.org
#
# This is free software, licensed under the GNU General Public License v2.
# See /LICENSE for more information.
#

include $(TOPDIR)/rules.mk

PKG_NAME:=luci-app-unfs3
PKG_RELEASE:=1.00

include $(INCLUDE_DIR)/package.mk

define Package/luci-app-unfs3
  SECTION:=luci
  CATEGORY:=LuCI
  SUBMENU:=3. Applications
  DEPENDS:=+unfs3
  TITLE:= LuCI Support for NFSv3 Server
endef

define Build/Compile
endef

define Package/luci-app-unfs3/install
	$(INSTALL_DIR) $(1)/etc/init.d
	$(INSTALL_BIN) ./unfs3/etc/init.d/unfs3 $(1)/etc/init.d/unfs3
	
	$(INSTALL_DIR) $(1)/etc/config
	$(INSTALL_BIN) ./luci/config/unfsd $(1)/etc/config
	$(INSTALL_DIR) $(1)/usr/lib/lua/luci/controller
	$(INSTALL_BIN) ./luci/controller/unfsd.lua $(1)/usr/lib/lua/luci/controller
	$(INSTALL_DIR) $(1)/usr/lib/lua/luci/model/cbi
	$(INSTALL_BIN) ./luci/model/cbi/unfsd.lua $(1)/usr/lib/lua/luci/model/cbi
endef


$(eval $(call BuildPackage,luci-app-unfs3))
