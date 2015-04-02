#
# Copyright (C) 2010-2013 hua.shao@mediatek.com
#
# Ralink Property Software.
#

include $(TOPDIR)/rules.mk

PKG_NAME:=power-management
PKG_RELEASE:=1

PKG_BUILD_DIR:=$(BUILD_DIR)/$(PKG_NAME)

include $(INCLUDE_DIR)/package.mk

define Package/$(PKG_NAME)
  CATEGORY:=Firefly Configuration
  SUBMENU:=Applications
  DEPENDS:= +base-file
  TITLE:=Control the power for firewrt
endef

define Package/$(PKG_NAME)/description
  A tool to control the power for firewrt borad.Remove the ext storage before the power down.
endef

define Build/Compile
endef
define Package/$(PKG_NAME)/install
	$(INSTALL_DIR) $(1)/etc/rc.button
	$(INSTALL_BIN) ./files/power $(1)/etc/rc.button/
	$(INSTALL_DIR) $(1)/sbin
	$(INSTALL_BIN) ./files/mkpowerio.sh $(1)/sbin
	$(INSTALL_DIR) $(1)/etc/init.d/
	$(INSTALL_BIN) ./files/powerbutton $(1)/etc/init.d/

endef

$(eval $(call BuildPackage,$(PKG_NAME)))
