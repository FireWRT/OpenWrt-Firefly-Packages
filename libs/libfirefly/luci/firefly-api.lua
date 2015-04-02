module("luci.controller.firefly-api.firefly-api", package.seeall)

function index()
    local function authenticator(validator, accs)
    local auth = luci.http.formvalue("auth", true)
	local rv={} 
        if auth then 
            local sdat = luci.sauth.read(auth)
            if sdat then 
                 if sdat.user and luci.util.contains(accs, sdat.user) then
                       return sdat.user, auth
                 end
             end
         end
         --luci.http.status(403,"Forbidden")
         rv["error"]=403
         luci.http.prepare_content("application/json")
         luci.http.write_json(rv) 
    end

    local firefly_api = node("firefly-api")
    firefly_api.sysauth = "root"
    firefly_api.sysauth_authenticator = authenticator
    firefly_api.notemplate = true

    --get all plugin
    entry({"firefly-api", "all_package"}, call("read_install_package_list"))
    --delete a plugin
    entry({"firefly-api", "delete_package"}, call("delete_package"))
    --get the app install position
    entry({"firefly-api", "get_app_install_position"}, call("get_app_install_position"))
    --set the app install position
    entry({"firefly-api", "set_app_install_position"}, call("set_app_install_position"))
    --cmd
    entry({"firefly-api", "cmd"},call("cmd"),nil).dependent=false
end

-- check the file is exist
function isfile()
	local fs = require "nixio.fs"
	return fs.stat(filename, "type") == "reg"
end

--read all plugin 
function read_install_package_list()
        local uci = luci.model.uci.cursor()
        local rv={}
        local list={}
        local i=0
        local path = luci.http.formvalue("path")
        if not path then
            path = "Internal Storage"
        end
        rv["path"]=path
	
        rv["error"]=1
        uci:foreach("fpkg", "globals",
            function(section)
                if section.plugin_Position == path then
                    local index = ""
                    --xcloud
                    if section.plugin_Type == "xcloud" then
                        local install_path = luci.sys.exec("/usr/local/firefly-api/get_app_install_path "..section[".name"])
                        if isfile(install_path.."/html/index.htm") then
                            index="/cgi-bin/luci/xcloud/comskip?page="..install_path.."/html/index.htm"
		                end
		            end
                    rv["error"]=0
                    list[section[".name"]]={
		                plugin=section[".name"],
		                src=index,
                        plugin_Name=section.plugin_Name,
                        plugin_VersionName=section.plugin_VersionName,
                        plugin_Largeicon=section.plugin_Largeicon,
                        plugin_Smallicon=section.plugin_Smallicon,
                        plugin_Type=section.plugin_Type,
                    }
                    i=i+1
                end
            end
        )
        rv["list"]=list
        luci.http.prepare_content("application/json")
        luci.http.write_json(rv)
end


--delete plugin
function delete_package()
	local plugin = luci.http.formvalue("plugin")
        local rv={}                                     
        local uci = luci.model.uci.cursor()                     
        local i=0     
        local list={}                                                        
        rv["error"]=1                                                         
        rv["error"]=luci.sys.call("fpkg remove " .. plugin .. " >/dev/null")  
        uci:foreach("fpkg", "globals",                                        
                function(section)                                         
                        i=i+1                                             
                end                                             
        )                    
        rv["count"]=i                           
        luci.http.prepare_content("application/json")
        luci.http.write_json(rv) 
end


-- split string
function lua_string_split(str, split_char)
    local sub_str_tab = {};
    while (true) do
        local pos = string.find(str, split_char);
        if (not pos) then
            sub_str_tab[#sub_str_tab + 1] = str;
            break;
        end
        local sub_str = string.sub(str, 1, pos - 1);
        sub_str_tab[#sub_str_tab + 1] = sub_str;
        str = string.sub(str, pos + 1, #str);
    end

    return sub_str_tab;
end

--get app_install_position
function get_app_install_position()                                               
    local uci = luci.model.uci.cursor()                                       
    local path_name = uci:get("fpkg", "install_path", "name")
    local path = uci:get("fpkg", "install_path", "path")     
    local rv={}                                              
    local list={}    
    local list_empty={}                                         
    rv["error"]=1                                                         
    list["path"]={                                           
        name=path_name,                                      
        path=path,                                           
    }         
    list_empty["path"]={                                           
        name="Internal Storage",                                      
        path="",                                           
    }                                               
                                                             
    local pp   = io.open("/tmp/usbmounted", "a+") 
    local line = ""                                                           
    local data = {}                                                           
                                                                              
    while true do                                                             
        line = pp:read()                                                      
        if (line == nil) then break end                                       
        local tmp = lua_string_split(line,"//")                               
        data[#data+1] = {                                                     
            name=string.sub(tmp[2], 2, #tmp[2]),                     
            path=tmp[1],                                                    
        }    
        --用户设置的路径存在
        if string.sub(tmp[2], 2, #tmp[2]) == path_name then
        	rv["error"]=0
   	end                                                       
    end                                                                         
    pp:close()                                           
    list["data"]=data     
    list_empty["data"]=data 

    --if mount point not exit , use default storage
    if rv["error"] == 0 then                              
        rv["list"]=list         
    else
        rv["list"]=list_empty
    end                             
                                                         
    luci.http.prepare_content("application/json")        
    luci.http.write_json(rv)                             
end

-- get udisk direction
function get_udisk_direction(name)
    local pp   = io.open("/tmp/usbmounted", "a+") 
    local line = ""
    local path = nil
    if name then
        while true do                                                             
            line = pp:read()                                                      
            if (line == nil) then break end                                       
            local tmp = lua_string_split(line,"//")                                                                     
            if string.sub(tmp[2], 2, #tmp[2]) == name then                 
                path=tmp[1]
            end
        end 
    end
    return path
end

--set app_install_position
function set_app_install_position()
    local name = luci.http.formvalue("name")
    local path = get_udisk_direction(name)
    local rv={}  
    rv["error"]=1
    if name then 
	    rv["error"]=luci.sys.call("uci set fpkg.install_path.name='"..name.."'")
	    luci.sys.call("uci commit")
	else
	    rv["error"]=2
    end

--[[ -- old function, we dont need that anymore
    -- set install path success , mount the /opt direction to new path
    if rv["error"] == 0 then
        luci.sys.call("umount /opt")
        if name ~= "Internal Storage" then
            if path then
                rv["error"]=luci.sys.call("mount /mnt/"..path.." /opt && cp /rom/opt/app /opt -rf")
            else
                rv["error"]=100
            end
        end
    end
]]
    luci.http.prepare_content("application/json")        
    luci.http.write_json(rv)  
end

function cmd()
	require  "luci.http"

	local vars = luci.http.formvalue()
	local command = ""
	local comm_para = " "

	for k,v in pairs(vars) do
		if k ~= 'auth' then
			if k ~= 'cmd' then
				comm_para = comm_para .. v .. " "
			else
				command = v
			end
		end
	end

	local data = luci.sys.exec(command..comm_para)

	local o = {}
	o['result'] = 'success'
	o['resdata'] = data or 'success'
	o['cmd'] = command..comm_para

	luci.http.prepare_content("application/json")
    luci.http.write_json(o)
end

