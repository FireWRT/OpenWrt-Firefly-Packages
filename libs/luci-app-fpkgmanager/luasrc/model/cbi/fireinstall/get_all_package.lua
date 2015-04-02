require("luci.sys")

m = Map("network", translate("Switch"))
s = m:section(TypedSection, "wan", "")
s.addremove = false
s.anonymous = true
enable = s:option(Flag, "ifname", translate("ifname"))


