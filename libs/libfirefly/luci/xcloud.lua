module("luci.controller.firefly-api.xcloud", package.seeall) 

function index()
	entry({"xcloud", "jqscripts"},call("jqscripts"),nil).dependent=false
	entry({"xcloud", "jsscripts"},call("jsscripts"),nil).dependent=false
	entry({"xcloud", "comcss"},call("comcss"),nil).dependent=false
	entry({"xcloud", "comimg"},call("comimg"),nil).dependent=false
	entry({"xcloud", "customimg"},call("customimg"),nil).dependent=false
	entry({"xcloud", "comskip"},call("comskip"),nil).dependent=false
	entry({"xcloud", "comreturn"},alias("admin", "system", "fireinstall"),nil).dependent=false
	entry({"xcloud", "comcmd"},call("comcmd"),nil).dependent=false
end

function jqscripts()
	require "luci.http"
	local sys = require "luci.sys"
	local fs  = require "luci.fs"

	local path = "/www/luci-static/resources/jquery-1.7.1.js"

	local file = nixio.fs.readfile(path)
	luci.http.write(file)
end


function jsscripts()
	require "luci.http"
	local sys = require "luci.sys"
	local fs  = require "luci.fs"

	local path = "/www/luci-static/resources/xcloud.js"

	local file = nixio.fs.readfile(path)
	luci.http.write(file)	
end

function comcss()
	require "luci.http"

	local getpath = luci.http.formvalue('path')
	local path = "/opt/app/"..getpath

	local file = nixio.fs.readfile(path)
	luci.http.write(file)
end

function comimg()
	require "luci.http"

	local getpath = luci.http.formvalue('path')
	local path = "/www/luci-static/bootstrap/"..getpath

	local file = nixio.fs.readfile(path)
	luci.http.write(file)
end

function customimg()
	require "luci.http"

	local getpath = luci.http.formvalue('path')
	local path = "/opt/app/"..getpath

	local file = nixio.fs.readfile(path)
	luci.http.write(file)
end

function comskip()
	require "luci.http"

	local path = luci.http.formvalue('page')
	local file = nixio.fs.readfile(path)
	luci.http.write(file)
end

function comcmd()
	require  "luci.http"

	local vars = luci.http.formvalue()
	local command = ""
	local comm_para = " "

	for k,v in pairs(vars) do
		if k ~= 'cmd' then
			comm_para = comm_para .. v .. " "
		else
			command = v
		end
	end

	local data = luci.sys.exec(command..comm_para)

	local o = {}
	o['result'] = 'success'
	o['resdata'] = data or 'success'

	luci.http.prepare_content("application/json")
    luci.http.write_json(o)
end




