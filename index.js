function setData() {
    //ボタンが押されたとき実行する
    var wOptions = {
        "enableHighAccuracy": true,                       // true : 高精度
        "timeout": 10000,                                 // タイムアウト : ミリ秒
        "maximumAge": 0,                                  // データをキャッシュ時間 : ミリ秒
    };
    navigator.geolocation.getCurrentPosition(positionsOK, alert("ブラウザが対応していないか、位置情報の取得が許可されていません。\n 次の画面で許可して下さい。"), wOptions);
}
//ボタン押された時の処理
document.getElementById("getPositionButton").onclick = function () {
    setData();
}
function getEscapePlaces(lati,long) {
    //TODO 国土地理院と和解してgeojsonを返す
}
function findNearestPlace(geojson) {
    //TODO geojsonから最も近い場所を見つける
    //object{latitude:緯度 longitude:東経 name:場所名}
}
function setEscapeRoot(PrLat,PrLon,DnLat,DnLon) {
    //TODO GM APIを叩いて最短距離を求め、マップに設定
}
function positionsOK(positions) {
    const presentLatitude = positions.coords.latitude;
    const presentLongitude = positions.coords.longitude;
    //placeには名前、座標が必要
    const placedata = findNearestPlace(getEscapePlaces(presentLatitude, presentLongitude));
    setEscapeRoot(presentLatitude, presentLongitude, placedata.latitude, placedata.longitude);
}
