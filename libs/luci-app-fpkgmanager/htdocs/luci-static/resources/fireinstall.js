
/*标记是否在管理APP的状态*/
var is_manage=false;

function load_application_list(path)
{
	/*   //模板
	<div class="fire-app-list" id="xxx">    
		         
		<div class="fire-app-logo"><img src="" /></div> 
		<div class="fire-app-delete-icon"><img src="/luci-static/resources/delete.png" /></div> 
		<div class="fire-app-title"></div>  
		<div class="fire-app-version"></div>
		<div class="fire-app-author"></div>
	</div>
	*/
    show_loading_icon()
	$.getJSON("/cgi-bin/luci/;stok="+$("#stok").val()+"/firefly-api/all_package?path="+path,
		function(data){
			hide_loading_icon()
            $("#fire-app-context")
			if(data.error == 0)
			{
 				$.each(data.list, function(){   
					  //console.log(this);
					  var list='<div class="fire-app-list" id="'+this.plugin+'" src="'+this.src+'"><div class="fire-app-logo"><img src="'+this.plugin_Largeicon+'" /></div><div class="fire-app-delete-icon"><img src="/luci-static/resources/delete.png" /></div><div class="fire-app-title">'+this.plugin_Name+'</div><div class="fire-app-version">'+this.plugin_VersionName+'</div><div class="fire-app-author">'+this.plugin_Type+'</div></div>'
					  $("#fire-app-context").append(list)
					  bind_item_click_event()
				});
			}
			else if(data.error == 1)
			{
				//没有APP
				show_empty_icon()
			}
		}
	);
}

function show_loading_icon()
{
    var empty_tag = $("#fire_app_empty").html()
    $("#fire-app-context").html("");
    var loading='<div class="fire-app-loading" id="fire-app-loading" style="display: none;"><img src="/luci-static/resources/loading.gif"></div>'
    var empty='<div id="fire_app_empty" class="fire_app_empty fire-app-loading">'+empty_tag+'</div>'
    $("#fire-app-context").append(loading)
    $("#fire-app-context").append(empty)
}

function hide_loading_icon()
{
	$("#fire-app-loading").fadeOut("fast")
}

function show_empty_icon()
{
	$("#fire_app_empty").show();
}

function bind_item_click_event(){
	$(".fire-app-list").unbind("click").click(function(){
		if(is_manage) {
			/*如果是管理状态，点击APP图标可以删除*/
			if(confirm($("#fire-delete-alert").html()))
			{
				var app = $(this)
				$.post("/cgi-bin/luci/;stok="+$("#stok").val()+"/firefly-api/delete_package", { "plugin":$(this).attr("id")},
					function(data){
					if(data.error == 0)
					{
						app.hide("slow");
						//如果没有APP了，显示当前没有APP
						if(parseInt(data.count) == 0)
							show_empty_icon()
					}
					else
						alert("删除失败");
				}, "json");
			}
		}
		else
		{
			/*不是管理状态，打开APP页面*/
			//cgi-bin/luci/admin/xcloud/comskip?page=
			var src=$(this).attr("src");
			if (src != "")
            {
				//window.location.href=src
                $("#firefly_app_view_iframe").attr("src",src);
                $("#firefly_app_view").fadeIn("slow");
            }
		}
	});
}

function set_app_insstall_path_record(name)
{
    $.post("/cgi-bin/luci/;stok="+$("#stok").val()+"/firefly-api/set_app_install_position", {"name":name},
    function(data){
    if(data.error == 0)
	{
        /*刷新APP列表*/
	    load_application_list(name)
    }
    else if(data.error == 403)
        alert($("#error403").html())
    else if(data.error == 100)
        alert($("#error100").html())
    else
        alert(data.error);
    }, "json");
}

function load_app_install_path_record()
{
    $.getJSON("/cgi-bin/luci/;stok="+$("#stok").val()+"/firefly-api/get_app_install_position",
		function(data){
			var default_path=data.list.path.name
			$("#install_path_span").html(default_path) 
            /*刷新APP列表*/
	        load_application_list(default_path)              
            $.each(data.list.data, function(){
                //$("#install_path_select").append('<option>'+this.name+'</option>');     
				if(this.name == default_path)
					$("#install_path_select").append('<option selected=selected>'+this.name+'</option>');
				else
					$("#install_path_select").append('<option>'+this.name+'</option>');     
            });
			$("#install_path_select").unbind("change").change( function() {
				$("#install_path_span").html($(this).val())
                //save app install path
		        set_app_insstall_path_record($(this).val())
			});
		}
	);


}

$(document).ready(function(){

    /*选择安装路径*/
    load_app_install_path_record()

	
	/*管理APP按钮，点击进入管理状态*/
	$("#fire-manage").click(function(){
		//隐藏管理按钮
		$(this).hide();
		//显示安装路径span
		$("#install_path_span").removeClass("hidden");
		//隐藏选择安装路径select
		$("#install_path_select").addClass("hidden");
		//显示完成按钮
		$("#fire-cancel-manage").show();
		//更改标记
		is_manage=true
		//更改样式
		$(".fire-app-delete-icon").show();
	});
	
	/*完成按钮*/
	$("#fire-cancel-manage").click(function(){
		/*隐藏完成按钮*/
		$(this).hide();
        //隐藏安装路径span
		$("#install_path_span").addClass("hidden");
		//显示选择安装路径select
		$("#install_path_select").removeClass("hidden");
		/*显示管理按钮*/
		$("#fire-manage").show();
		//更改标记
		is_manage=false
		//更改样式
		$(".fire-app-delete-icon").hide();
		
	});
	
	
	
	/*如果有错误信息的话，显示错误信息*/
	if($("#app_install_error").html())
	{
		alert($("#app_install_error").html())
	}

    /*close iframe*/
    $("#firefly_app_view_close").click(function(){
        $("#firefly_app_view").fadeOut("slow");
    })
});;
