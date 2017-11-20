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
  
  var descriptor = {blocks: [
      ['R', '天気を取得', 'get_weather']
      ]};
  // 利用する機能名、ブロックの情報、そしてブロックのロジックを含むオブジェクトを登録
  //ScratchExtensions.register('お天気拡張', descriptor, ext);



ext.get_weather = function(callback) {
  $.ajax({
//    url: 'http://mgpn2.sakura.ne.jp/api/sun/position.cgi?jsonp=caller&y=2030&m=12&d=20&h=12&lat=80.0&lon=135.5',
    url: 'http://mgpn2.sakura.ne.jp/api/sun/position.cgi?jsonp=caller&y=2000&m=5&d=5&h=12&lat=35.6544&lon=139.7447',
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
          var main = data.result.sunset;
          if (main == undefined) {
            callback('');
          } else {
            callback(main);
          }
      } else {
        callback('');
      }
// alert(data.result.sunset);
    }
  });
};




  // Scratch に作ったブロックを登録します
  ScratchExtensions.register('お天気拡張', descriptor, ext);


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