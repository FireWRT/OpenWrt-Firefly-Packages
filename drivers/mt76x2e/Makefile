# All rights reserved.
#
# This is free software, licensed under the GNU General Public License v2.
# See /LICENSE for more information.

include $(TOPDIR)/rules.mk
include $(INCLUDE_DIR)/kernel.mk

PKG_NAME:=mt76x2e
PKG_RELEASE:=2015-05-06

include $(INCLUDE_DIR)/package.mk

define Package/$(PKG_NAME)
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

define Package/$(PKG_NAME)/install
	$(INSTALL_DIR) $(1)/lib/wifi/
	$(INSTALL_DIR) $(1)/lib/wifi/
	echo ------------------------------------------------------------------- $(CONFIG_RT_SECOND_CARD)
	if [ "$$(CONFIG_MT76X2E_RT_FIRST_CARD)" = "7602" ] || [ "$$(CONFIG_MT76X2E_RT_FIRST_CARD)" = "7602e" ]; then \
		$(INSTALL_DIR) $(1)/etc/wireless/mt7602e/ ; \
		$(INSTALL_BIN) ./files/mt7602e.sh $(1)/lib/wifi/ ; \
		$(INSTALL_BIN) ./files/mt7602e.dat $(1)/etc/wireless/mt7602e/ ; \
		$(INSTALL_BIN) ./files/mt7602e*.bin $(1)/etc/wireless/mt7602e/ ; \
		$(INSTALL_BIN) ./files/SingleSKU.dat $(1)/etc/wireless/mt7602/SingleSKU.dat ; \
		echo p$(P4REV) > $(1)/etc/wireless/mt7602e/version; \
	fi
	if [ "$$(CONFIG_MT76X2E_RT_SECOND_CARD)" = "7612" ] || [ "$$(CONFIG_MT76X2E_RT_SECOND_CARD)" = "7612e" ]; then \
		$(INSTALL_DIR) $(1)/etc/wireless/mt7612e/ ; \
		$(INSTALL_BIN) ./files/mt7612e.sh $(1)/lib/wifi/ ; \
		$(INSTALL_BIN) ./files/mt7612e.dat $(1)/etc/wireless/mt7612e/ ; \
		$(INSTALL_BIN) ./files/mt7612e*.bin $(1)/etc/wireless/mt7612e/ ; \
		$(INSTALL_BIN) ./files/SingleSKU.dat $(1)/etc/wireless/mt7612/SingleSKU.dat ; \
		echo p$(P4REV) > $(1)/etc/wireless/mt7612e/version; \
	fi
	$(INSTALL_BIN) ./files/ralink_common.sh $(1)/lib/wifi/ralink_common.sh
endef


$(eval $(call BuildPackage,$(PKG_NAME)))
