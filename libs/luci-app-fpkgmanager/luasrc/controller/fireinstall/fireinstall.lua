module("luci.controller.fireinstall.fireinstall", package.seeall)

function index()

    entry({"admin", "system", "fireinstall"}, call("main_page"), translate("FireFly App Manager"), 10).dependent=false

end


function main_page()
	local path = "/tmp/"                                                  
        local fp
	local stok = luci.http.formvalue("stok", true)
	local dsp = require "luci.dispatcher"
        luci.http.setfilehandler(                                             
                function(meta, chunk, eof)      
			-- if meta not empty                              
                        if meta then                                          
		                if not fp then                                        
		                        fp = io.open(path .. meta.file, "w")          
		                end                                               
		                if chunk then                                     
		                        fp:write(chunk)                           
		                end                                               
		                if eof then                                       
		                        fp:close()      
					install_plugin(path .. meta.file)                          
		                end                                         
                        end                                               
                end                                                 
        )                                                                 
                                                                    
        local flag = luci.http.formvalue("upload")                                                  
        luci.template.render("app-fireinstall/index", {reset_avail = reset_avail , stok = dsp.context.urltoken.stok})
end

function install_plugin(plugin_name)
	local install=luci.sys.exec("fpkg install " .. plugin_name .. " | grep 'Install Error'")
	if install~="" then
		luci.http.write("<div id='app_install_error' style='display:none;' >"..translate("Install Error").."</div>")
	end
	luci.sys.call("rm " .. plugin_name .. " >/dev/null")
end


