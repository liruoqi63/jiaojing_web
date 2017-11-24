function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//参数说明：str表示原字符串变量，flg表示要插入的字符串，sn表示要插入的位置
function insert_flg(str, flg, sn) {
  var newstr = "";
  if (str.length < 4) {
    str = '0' + str;
  }
  var tmp = str.substring(0, sn);
  var tmp2 = str.substring(sn);
  newstr = tmp + flg + tmp2;

  return newstr;
}
function join_json(jsonbject1, jsonbject2) {
  var resultJsonObject = {};
  for (var attr in jsonbject1) {
    resultJsonObject[attr] = jsonbject1[attr];
  }
  for (var attr in jsonbject2) {
    resultJsonObject[attr] = jsonbject2[attr];
  }
  return resultJsonObject;
}
function get_sign(appkey, secretKey) {
  var sign = secretKey + appkey + secretKey + new Date().getTime() + secretKey;
  // console.log(new Date().getTime());
  // console.log(sign);
  var signMD5 = md5.hex_md5(sign).toUpperCase();
  return signMD5;
}
function get_sign1(appkey, secretKey,time) {
  var sign = secretKey + appkey + secretKey + time + secretKey;
  // console.log(new Date().getTime());
  // console.log(sign);
  var signMD5 = md5.hex_md5(sign).toUpperCase();
  return signMD5;
}
function get_imei() {
  var part1 = parseInt(10000 + Math.random() * 89999);
  var part2 = parseInt(10000 + Math.random() * 89999);
  var part3 = parseInt(10000 + Math.random() * 89999);
  var imei = part1 + '' + part2 + '' + part3;
  return imei;
}
//GCJ-02 to BD-09

function gcj02_to_bd09(gcjLat, gcjLon) {
  var PI = 3.14159265358979324;
  var x_pi = 3.14159265358979324 * 3000.0 / 180.0;
  console.log(gcjLat);
  console.log(gcjLon);
  var x = gcjLon, y = gcjLat;
  var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * x_pi);
  var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * x_pi);
  var bdLon = z * Math.cos(theta) + 0.0065;
  var bdLat = z * Math.sin(theta) + 0.006;
  console.log(bdLat);
  console.log(bdLon);
  return { 'lat': bdLat, 'lng': bdLon };
}
//BD-09 to GCJ-02
function bd09_to_gcj02(bdLat, bdLon) {
  var PI = 3.14159265358979324;
  var x_pi = 3.14159265358979324 * 3000.0 / 180.0;
  var x = bdLon - 0.0065, y = bdLat - 0.006;
  var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
  var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
  var gcjLon = z * Math.cos(theta);
  var gcjLat = z * Math.sin(theta);
  return { 'lat': gcjLat, 'lng': gcjLon };
}

//强制保留2位小数
function toDecimal2(x) {
  var f = parseFloat(x);
  if (isNaN(f)) {
    return false;
  }
  var f = Math.round(x * 100) / 100;
  var s = f.toString();
  var rs = s.indexOf('.');
  if (rs < 0) {
    rs = s.length;
    s += '.';
  }
  while (s.length <= rs + 2) {
    s += '0';
  }
  return s;
}
function get_data(data){  //封装的ajax
    var time = new Date().getTime();
    // console.log('all_data--',time);
    //添加时间戳
    mainData.mainData.timestamp=time;
    //生成密钥
    mainData.mainData.sign = get_sign1(mainData.mainData.app_key , mainData.secretKey,time);
    //添加参数
    var all_data = join_json(mainData.mainData,data);
    // console.log('all_data--',all_data);
    return all_data;
}
window.util={
	formatTime: formatTime,
	insert_flg: insert_flg,
	join_json: join_json,
	get_sign: get_sign,
	get_imei: get_imei,
	toDecimal2:toDecimal2,
	get_data:get_data,
}
