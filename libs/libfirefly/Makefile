#
# Copyright (C) 2006-2011 OpenWrt.org
#
# This is free software, licensed under the GNU General Public License v2.
# See /LICENSE for more information.
#

include $(TOPDIR)/rules.mk

PKG_NAME:=libfirefly
PKG_RELEASE:=2014-10-18

include $(INCLUDE_DIR)/package.mk

define Package/$(PKG_NAME)
    SUBMENU:=Libraries
    CATEGORY:=Firefly Configuration
    TITLE:= Some tools,scripts and libraries for app development
    DEPENDS:=+openssh-sftp-server +libstdcpp +luci-mod-rpc +mount-tools
endef

define Build/Compile
endef

define Package/$(PKG_NAME)/install
	$(INSTALL_DIR) $(1)/usr/bin
	$(INSTALL_DIR) $(1)/etc/config
	$(INSTALL_DIR) $(1)/opt/app/
	$(INSTALL_DIR) $(1)/opt/app/icon/
	$(INSTALL_DIR) $(1)/usr/local
	$(INSTALL_DIR) $(1)/etc/config
	$(INSTALL_DIR) $(1)/usr/lib/lua/luci/controller/
	cp ./res/logo.png $(1)/opt/app/icon/large.png
	cp ./res/logo.png $(1)/opt/app/icon/small.png
	$(INSTALL_DIR) $(1)/www/opt/
	cp ./app $(1)/www/opt/app -a
	cp ./localshell $(1)/usr/local/ -rf
	cp ./api $(1)/usr/local/firefly-api -rf
	cp ./fpkg $(1)/usr/bin/fpkg -a
	$(INSTALL_BIN) ./config/fpkg $(1)/etc/config/fpkg
	cp ./luci $(1)/usr/lib/lua/luci/controller/firefly-api -rf
endef


$(eval $(call BuildPackage,$(PKG_NAME)))

