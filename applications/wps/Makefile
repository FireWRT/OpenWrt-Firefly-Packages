#
# Copyright (C) 2014-2015 t-firefly.com
#
# This is free software, licensed under the GNU General Public License v2.
# See /LICENSE for more information.
#

include $(TOPDIR)/rules.mk

PKG_NAME:=wps
PKG_RELEASE:=2015-04-23

include $(INCLUDE_DIR)/package.mk

define Package/$(PKG_NAME)
  CATEGORY:=Firefly Configuration
  SUBMENU:=Applications
  TITLE:= Wi-Fi Protected Setup
endef

define Build/Compile
endef

define Package/$(PKG_NAME)/install
	$(INSTALL_DIR) $(1)/etc/rc.button/
	$(INSTALL_DIR) $(1)/sbin/
	$(INSTALL_BIN) ./wps_button $(1)/etc/rc.button/wps
	$(INSTALL_BIN) ./wps $(1)/sbin/wps
endef


$(eval $(call BuildPackage,$(PKG_NAME)))
