module("luci.controller.unfsd",package.seeall)

function index()
	require("luci.i18n")
	luci.i18n.loadc("unfsd")
	if not nixio.fs.access("/etc/config/unfsd") then
		return
	end
	
	local page = entry({"admin","services","unfsd"},cbi("unfsd"),_("NFS Service"))
	page.i18n="unfsd"
	page.dependent=true
end

