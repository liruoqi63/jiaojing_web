/**
 * Created by Administrator on 2017/11/21 0021.
 */
var baseURL='http://112.253.11.114:8002/'
var tools={}

tools.ajaxPost = function(url,params,callback){
	jQuery.support.cors=true;
	$.ajax({
		type: 'POST',
		dataType:"json",
		url: baseURL+url,
		data: util.get_data(params),
		// transformRequest: [function (data) {
		// 	var ret = '';
		// 	for (let it in data) {
		// 		ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
		// 	}
		// 	ret+='&token='+localStorage.verifyToken;
		// 	return ret;
		// }],
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		success: callback,
		error:function (err) {
			console.log(JSON.stringify(err))
		}
	});
}
tools.ajaxGet = function (url,params,callback){
	var newParams=util.get_data(params);
	var data='';
	$.each(newParams,function(name,value) {
		data+=name+'='+value+'&'
	});
	data = data.substring(0,data.length-1);
	data = data+'&token='+localStorage.verifyToken;
	var urls=data ? (url+'?'+data):url;
	jQuery.support.cors=true;
	$.ajax({
		type: 'get',
		url: baseURL+urls,
		data: util.get_data(params),
		dataType:"json",
		success: callback,
		error:function (err) {
			console.log(JSON.stringify(err))
		}
	});
}
tools.tip = function (msg,color) {
	var str = '<div class="tip-message"><p class="success"></p></div>';
	$("body").append(str);
	var ele = $(".tip-message p");
	color ? ele.css("background", color) : "";
	ele.text(msg);
	ele.fadeIn();
	setTimeout(function () {
		ele.fadeOut().parent().remove();
	}, 3000);
}
window.tools=tools;
