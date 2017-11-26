(function(ext) {

  // コメントは補足の説明なので書かなくてもいいです

  // Extension が終了するときに呼ばれる
  // 今は特に何もしない
  ext._shutdown = function() {};

  // Extension の状態を返す
  // デバイスが繋がっていないときにはエラーを返したりする
  // ---
  // 返す値, 表示される色, 意味
  //      0,          red, error
  //      1,       yellow, not ready
  //      2,        green, ready
  // ---
  // 今回はデバイスなどは使用しないので常に準備完了
  // ということで 2 を返します。
  ext._getStatus = function() {
    return {status: 2, msg: 'Ready'};
  };
  
var sunset='';
var sanrise='';
var azimuth='';
var altitude='';

var year = '2017';
var month = '6';
var day = '21';
var house = '12';
var minute = '0';
var lat = '35.4378';
var lon = '136.7520';

var descriptor = {blocks: [
      ['R', '日時を %n 年 %n 月 %n 日 %n 時 %n 分にする', 'set_daytime',2017,6,21,12,0],
      ['R', '場所を %m.point に変更する','set_point','岐阜']
      ],
      menus: {
      point : ['岐阜','納沙布岬','与那国島','ストックホルム','シドニー','シンガポール']
      },
    };
  // 利用する機能名、ブロックの情報、そしてブロックのロジックを含むオブジェクトを登録
  //ScratchExtensions.register('太陽の位置拡張', descriptor, ext);


//'岐阜','納沙布岬'43.3853 145.8169,'与那国島 24.4498 122.9342','ストックホルム 59.3268 18.0717','シドニー -33.8731 151.2060','シンガポール 1.4043 103.7930'
ext.set_point = function(p,callback){
    switch (p){
      var cf='1';
      case '岐阜':
        lat = '35.4378';
        lon = '136.7520';
        cf='0';
        break;
      case '納沙布岬':
        lat = '43.3853';
        lon = '145.8169';
        cf='0';
        break;
      case '与那国島':
        lat = '24.4498';
        lon = '122.9342';
        cf='0';
        break;
      case 'ストックホルム':
        lat = '59.3268';
        lon = '18.0717';
        cf='0';
        break;
      case 'シドニー':
        lat = '-33.8731';
        lon = '151.2060';
        cf='0';
        break;
      case 'シンガポール':
        lat = '1.4043';
        lon = '103.7930';
        cf='0';
        break;
    }
      callback(cf); 
}

ext.set_daytime = function(y,mo,d,h,mi,callback) {
	var cf='1';
	if (y<1900 || y>3000) {
	  cf='2';
	}else{
	var di = new Date(y,mo-1,d);
	 if(di.getFullYear() == y && di.getMonth() == mo-1 && di.getDate() == d){
	 	if (h<0 || h>23 || mi<0 || mi>59 ) {
	 	  cf='4';
	 	}else{
	 	  year = y;
	 	  month = mo;
	 	  day = d;
	 	  house = h;
	 	  minute = mi;
	 	  cf='0';
	 	}
	 }else{
	 	cf='3'; 
	 }
	}
	callback(cf);

};

  var descriptor = {blocks: [
      ['R', '太陽の取得', 'get_weather']
      ]};
  // 利用する機能名、ブロックの情報、そしてブロックのロジックを含むオブジェクトを登録
  //ScratchExtensions.register('太陽の位置拡張', descriptor, ext);


ext.get_weather = function(callback) {
  $.ajax({
//    url: 'http://mgpn2.sakura.ne.jp/api/sun/position.cgi?jsonp=caller&y=2000&m=5&d=5&h=12&lat=35.6544&lon=139.7447',
    url: 'http://mgpn2.sakura.ne.jp/api/sun/position.cgi?jsonp=caller&y='+year+'&m='+month+'&d='+day+'&h='+house+'&min='+minute+'&lat='+lat+'&lon='+lon,
    type: 'GET',
    dataType: 'jsonp',
    jsonpCallback: 'caller',
//    jsonp : "callbackChange",
    error: function(XMLHttpRequest, textStatus, errorThrown) {
    alert("XMLHttpRequest : " + XMLHttpRequest.status);
    alert("textStatus : " + textStatus);
    alert("errorThrown : " + errorThrown);
    callback('');
    },
    success: function(data) {
      if (data.status == 200) {
//        console.log(data);
//          var main = data.result.sunset+data.result.sunrise;
          sunset = data.result.sunset;
          sunrise = data.result.sunrise;
          azimuth = data.result.azimuth;
          altitude = data.result.altitude;
//          var Array = [data.result.sunset,data.result.sunrise];
//          if (main == undefined) {
//            callback('');
//          } else {
            callback('OK');
//          }
      } else {
        callback('');
      }
// alert(data.result.sunset);
    }
  });
};


ext.get_sunset = function(callback) {
	if (sunset=='') {
	  callback('0');
	}else{
	  callback(sunset);
	}

};


ext.get_sunrise = function(callback) {
	if (sunrise=='') {
	  callback('0');
	}else{
	  callback(sunrise);
	}

};

ext.get_azimuth = function(callback) {
	if (azimuth=='') {
	  callback('0');
	}else{
	  callback(azimuth);
	}

};


ext.get_altitude = function(callback) {
	if (altitude=='') {
	  callback('0');
	}else{
	  callback(altitude);
	}

};


  // Scratch に作ったブロックを登録します
  ScratchExtensions.register('お天気拡張', descriptor, ext);

  var descriptor = {blocks: [
      ['R', '日の出', 'get_sunset'],
      ['R', '日の入', 'get_sunrise'],
      ['R', '方位角', 'get_azimuth'],
      ['R', '高度', 'get_altitude']
      ]};
  // 利用する機能名、ブロックの情報、そしてブロックのロジックを含むオブジェクトを登録
  //ScratchExtensions.register('太陽の位置拡張', descriptor, ext);



  // Scratch に作ったブロックを登録します
  ScratchExtensions.register('お天気拡張2', descriptor, ext);








  // この関数がブロック処理になります。
  ext.log = function(str) {
    // ログを出力するだけ
    alert(str);
  };

  // ブロックをどういう風に表示するかを書きます
  // ここの書き方は結構難しいので今は説明しません
  var descriptor = {
    blocks: [
      [' ', 'log %s', 'log', 'sample log']
    ]
  };

  // Scratch に作ったブロックを登録します
  ScratchExtensions.register('Log Extension', descriptor, ext);
})({});
