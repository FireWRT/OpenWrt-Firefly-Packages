function getVersion(version,type){
	var n_url = "";
	$.getJSON("http://r.xcloud.cc/router/index.php?m=Index&a=updateVersion&callback=?",{Ver:version,Ty:type},function(json){
		n_url = json[0].url;
		
		if (n_url != ""){
			$('.updatewords').html('发现新固件，点击');
			$('.prompt').css('display','block');
			$('#getupdate').html('下载');
			$('#getupdate').attr("href",n_url);
			$('.firmware1').css('display','block');
		}
	});
}

function changeVersion(version,type){
	var n_url = "";

	$.getJSON("http://r.xcloud.cc/router/index.php?m=Index&a=updateVersion&callback=?",{Ver:version,Ty:type},function(json){
		n_url = json[0].url;
		
		if (n_url != ""){
			$('.check_firmware span').html('发现新固件'+json[0].version).css('display','block');
			$('.check_firmware a').css('display','block').attr('rel',n_url);
		}else{
			$('.firmware_newast').show();
			$('.check_firmware span').hide();
			$('.check_firmware a').hide()
		}
	});
}

function IsPC() 
{ 
	var userAgentInfo = navigator.userAgent; 

	var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"); 
	var flag = true; 
	for (var v = 0; v < Agents.length; v++) { 
		if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; } 
	} 
	return flag; 
}

function include_css(path){
	var fileref = document.createElement("link");
	fileref.rel = "stylesheet";
	fileref.type = "text/css";
	fileref.href = path;
	var headobj = document.getElementsByTagName('head')[0];
	headobj.appendChild(fileref);

	var fileo = document.createElement("meta");
	fileo.name = "viewport";
	fileo.content = "user-scalable=no,width=device-width";
	headobj.appendChild(fileo);
}

		/**************************************************************/

$('.dhcpserv').live('click',function(){
/*
	var dhcp = $(this).val();

	$('.dhcpserv').attr('disabled','disabled');

	$.ajax({
		url:landhcpurl,
		dataType:'json',
		data:{flag:dhcp},
		method:'post',
		timeOut:30000,
		success:function(r){
			if (r.result == 'success'){
				$('.dhcpserv').removeAttr('disabled');
			}
		},
		error:function(o,i,j,k){
			$('.dhcpserv').removeAttr('disabled');
		}
	})*/
})

function lanedit(){
	$('.addstatic').css('display','block');
	$('.savestatic').css('display','block');
	$('.delete').css('display','block');

	$('.static_name').css({'border':'1px solid #ccc','background':'white'});
	$('.static_name').removeAttr('disabled');

	$('.static_ip').css({'border':'1px solid #ccc','background':'white'});
	$('.static_ip').removeAttr('disabled');

	$('.macusual').hide();
	//$('.macadds').show();	
}

$('.lan_edit').live('click',function(){
	$(this).hide();

	lanedit();
})

function checkRepeat(data){
	var nary = data.sort();
	for(var i = 0; i < nary.length - 1; i++)
	{
	    if (nary[i] == nary[i+1])
	    {
	        return false;
	    }
	}

	return true;
}

function lansetup2mention(word){
	//$('.lansetuppart2_mention').html(word).stop().fadeIn(1000).fadeOut(3000);
	$('.lansetuppart2_mention').html(word).stop().animate({'opacity':1},1000,"",function(){
		$('.lansetuppart2_mention').stop().animate({'opacity':0},1000);
	});
}

// 验证相同网段
function checkSamenet(ipstd,ipdata){
	//alert(ipstd + ' '+ipdata);
	var stdArr = new Array();
	stdArr = ipstd.split(".");

	var ipArr = new Array();
	ipArr = ipdata.split(".");

	if (stdArr[0] == ipArr[0] && stdArr[1] == ipArr[1] && stdArr[2] == ipArr[2]){
		return true;
	}

	return false;
}

function savestaticshow(o){
	o.attr('rel','0');
}

function savelan(allstr,curobj){
	$.ajax({
		url:lanipaddrurl,
		dataType:'json',
		data:{data:allstr},
		method:'post',
		success:function(r){
			savestaticshow(curobj);
			tinyBox_change('已保存', 1);
			tinyBox_hide(2000);
		},
		error:function(){
			savestaticshow(curobj);
			tinyBox_change('已保存', 1);
			tinyBox_hide(2000);
		}
	});
}

$('.savestatic').live('click',function(){
	var curname = "";
	var curselectmac = "";
	var curinputmac = "";
	var curmac	= "";
	var curip	= "";

	var cansave = 0;

	var allstr = "";

	var tmpmac	= new Array();
	var tmpip	= new Array();

	var ipstd = netipaddr;

	// 获取点击状态
	var clickstus = $(this).attr('rel');

	var curobj = $(this);
	if (clickstus == '1'){
		lansetup2mention('请不要重复点击');
		return false;
	}

	// 查找所有数据
	$('.lan_static_dev .lan_data').each(function(idx,o){
		curname = $(o).children("td:eq(0)").children('input').val();
		curselectobj = $(o).children("td:eq(1)").children("select");
		curselectmac = $(o).children("td:eq(1)").children("select").val();
		curinputobj	= $(o).children("td:eq(1)").children('.ads_default').children("input");
		curinputmac = $(o).children("td:eq(1)").children('.ads_default').children("input").val();
		
		// 获取当前名字
		if (curname == ""){
			cansave = -5;
			lansetup2mention('请输入主机名');
			return false;
		}

		// 获取当前mac
		if (curinputmac == "" && curselectmac == ""){
			cansave = -1;
			lansetup2mention('请填写完整信息');
			return false;
		}

		if (curselectobj.css('display') != 'block'){
			curmac = curinputmac;
		}else{
			curmac = curselectmac;
		}

		$(o).children("td:eq(1)").children("select").children('option:eq(0)').val(curmac).html(curmac);

		$(o).children("td:eq(1)").children('.macusual').html(curmac);

		var temp = /^[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}$/;
		if (!temp.test(curmac)){
			cansave = -1;
			lansetup2mention('请填写完整信息');
			return false;
		}

		// 获取当前ip
		curip = $(o).children("td:eq(2)").children('input').val();

		if (curip == ""){
			cansave = -1;
			lansetup2mention('请填写完整信息');
			return false;
		}

		var exp=/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
		var reg = curip.match(exp);

		if(reg==null){
			cansave = -4;
			lansetup2mention('IP地址格式不正确');
			return false;
		}else if (!checkSamenet(ipstd,curip)){
			cansave = -3;
			lansetup2mention(curname + '与路由器IP需在同一IP网段');
			return false;
		}

		allstr += curname+"||"+curmac+"||"+curip+"|||";

		tmpmac.push(curmac);
		tmpip.push(curip);
	});

	// 验证重复
	if(!checkRepeat(tmpmac) || !checkRepeat(tmpip)){
		cansave = -2;
	}

	if(cansave != 0){
		return false;
	}else if(cansave == -2){
		lansetup2mention('部分信息重复');
		return false;
	}

	$(this).attr('rel','1');

	var dhcp1 = $('#startdhcp').attr('checked');
	var dhcp2 = $('#stopdhcp').attr('checked');

	var dhcp = '';
	if (dhcp1)
		dhcp = 'start';
	else
		dhcp = 'stop';

	tinyBox_init('正在保存...');

	$.ajax({
		url:landhcpurl,
		dataType:'json',
		data:{flag:dhcp},
		method:'post',
		timeOut:30000,
		success:function(r){
			savelan(allstr,curobj);
		},
		error:function(o,i,j,k){
			savelan(allstr,curobj);
		}
	});
});

$('.delete').live('click',function(){
	var node = $(this).parent();
	node.remove();
})

$('.addword').live('click',function(){
	var nod = $('.addnode').children('tbody').html();
	$('.lan_static_dev').append(nod);
	lanedit();
})

$('.macadds').live('change',function(){
	var flag = $(this).val();

	if (flag == 'custom'){
		var par = $(this).parent();
		$(this).val('');
		$(this).hide();
		par.children('.ads_default').children('.ads_default_mac').val('');
		par.children('.ads_default').show();
	}
})

//转换为进制
function _checkIput_fomartIP(ip){
    return (ip+256).toString(2).substring(1); //格式化输出(补零)
}

//有效性判断
function validateMask(MaskStr){ 
    var IPArray = MaskStr.split(".");
    var ip1 = parseInt(IPArray[0]);
    var ip2 = parseInt(IPArray[1]);
    var ip3 = parseInt(IPArray[2]);
    var ip4 = parseInt(IPArray[3]);

    if ((ip1 < 0 || ip1 > 255) || (ip2 < 0 || ip2 > 255) || (ip3 < 0 || ip3 > 255) || (ip4 < 0 || ip4 > 255)){ 
    	return false;
    }

    var ip_binary = _checkIput_fomartIP(ip1) + _checkIput_fomartIP(ip2) + _checkIput_fomartIP(ip3) + _checkIput_fomartIP(ip4);

    if(-1 != ip_binary.indexOf("01")){
        return false;
    }

    return true;
}

//蒙版公用函数
function tinyBox_init(show_content){
	TINY.box.show({html:'<div class="iso_box"><div class="iso_box_rate"></div><div class="iso_box_text">' + show_content + '</div></div>',fixed:true,animate:false,close:false,boxid:'error',width:400,height:0});
}

//stauts参数：显示成功或者失败
function tinyBox_change(change_content, status){
	if(status == 0){
		$('.iso_box_rate').attr('class', 'iso_box_fail');
	}else if(status == 1){
		$('.iso_box_rate').attr('class', 'iso_box_success');
	}

	$('.iso_box_text').html(change_content);
}

//TIMEOUT参数：是否延迟关闭
function tinyBox_hide(timeout){
	if(timeout){
		window.setTimeout("TINY.box.hide()", timeout);
	}else{
		TINY.box.hide();
	}
}

/*
	文字信息提示公用函数
	param: message 显示的文字
	param: timeout 多少秒后消失
*/
function messageAlert(message, timeout){
	if(timeout){
		$('#messageAlert').html(message);
		window.setTimeout(function(){
			$('#messageAlert').html('');
		}, timeout);
	}else{
		$('#messageAlert').html(message);
	}

	//操作
	var obj = $('.installplug');
	if(obj){
		obj.replaceWith(obj.clone());
	}
}

function showUploadName(){
	var val = $('.installplug').val();
	var tmp = val.split("\\");
	var idx = parseInt(tmp.length) - 1;
	var filename = tmp[idx];
	
	if(filename.length > 66){
		filename = cutFileName(filename);
	}

	$('#messageAlert').html(filename);
}

//截取文件名
function cutFileName(str){
	var tmp = '';
	var tmp_str = '';

	for(var i = 0;i < str.length;i++){
		if(i >= 40 && i <= 60){
			tmp_str += str[i];
		}
	}

	tmp = str.replace(tmp_str, '...');

	return tmp;
}

//获取文件名后缀
function getExt(str){
	str = str.split(".");
	var idx = parseInt(str.length) - 1;
	var ext = str[idx];

	return ext;
}

$('#upload_plugins a').live('click', function(){
	$('.installplug').click();
});