require("luci.sys")
require("luci.util")

local running=(luci.sys.call("pidof unfsd > /dev/null") == 0)

m = Map("unfsd",translate("NFS Service") )
s=m:section(TypedSection, "unfsd", translate("Unfsd"))
s.addremove=false
s.anonymous=true
enable=s:option(Flag, "enabled", translate("Enabled:"))
enable.rmempty=false
function enable.cfgvalue(self,section)
	return luci.sys.init.enabled("unfs3") and self.enabled or self.disabled
end
function enable.write(self,section,value)
	if value == "1" then
	  if running then
		luci.sys.call("/etc/init.d/unfs3 stop >/dev/null")
	  end
		luci.sys.call("/etc/init.d/unfs3 enable >/dev/null")
		luci.sys.call("/etc/init.d/unfs3 start >/dev/null")
	else
		luci.sys.call("/etc/init.d/unfs3 stop >/dev/null")
		luci.sys.call("/etc/init.d/unfs3 disable >/dev/null")
	end
end

config_dir=s:option(Value, "anon_root", translate("Share Directory:"))
config_dir.placeholder="/mnt"

write_enable=s:option(Flag, "write_enable", translate("Write Enable:"), translate("Allow NFS commands that change the filesystem."))
write_enable.rmempty=false

return m

