# All rights reserved.
#
# This is free software, licensed under the GNU General Public License v2.
# See /LICENSE for more information.

include $(TOPDIR)/rules.mk
include $(INCLUDE_DIR)/kernel.mk

PKG_NAME:=mt76x2e
PKG_RELEASE:=2015-05-06

include $(INCLUDE_DIR)/package.mk

define KernelPackage/$(PKG_NAME)
  CATEGORY:=Firefly Configuration
  SUBMENU:=Drivers
  TITLE:=Ralink mt76x2e wifi AP driver
  FILES:=$(PKG_BUILD_DIR)/mt76x2e.ko
  DEPENDS:=+kmod-cfg80211 +uci2dat +wps
  CONFLICTS:=kmod-mt76 kmod-mac80211
  AUTOLOAD:=$(call AutoLoad,91,mt76x2e)
  MENU:=1
endef

define Build/Compile
	cp ./files/mt76x2e.ko $(PKG_BUILD_DIR)/
endef

define KernelPackage/$(PKG_NAME)/install
	$(INSTALL_DIR) $(1)/lib/wifi/
	$(INSTALL_DIR) $(1)/lib/modules/$(strip $(LINUX_VERSION))/
	$(INSTALL_BIN) ./files/mt76x2e.ko $(1)/lib/modules/$(strip $(LINUX_VERSION))/
	
	$(INSTALL_DIR) $(1)/etc/wireless/mt7602e/ 
	$(INSTALL_BIN) ./files/mt7602e.sh $(1)/lib/wifi/ 
	$(INSTALL_BIN) ./files/mt7602e.dat $(1)/etc/wireless/mt7602e/ 
	
	$(INSTALL_DIR) $(1)/etc/wireless/mt7612e/ 
	$(INSTALL_BIN) ./files/mt7612e.sh $(1)/lib/wifi/ 
	$(INSTALL_BIN) ./files/mt7612e.dat $(1)/etc/wireless/mt7612e/ 

	$(INSTALL_BIN) ./files/ralink_common.sh $(1)/lib/wifi/ralink_common.sh
endef


$(eval $(call KernelPackage,$(PKG_NAME)))
