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
function getEscapePlaces(lati, long) {
    console.log(lati);
    console.log(long);
    //座標をいい感じに変換する
    z = 10 //ズームレベル10固定(国土地理院APIの関係)
    L = 85.05112878;
    x = Math.floor((long / 180 + 1) * Math.pow(2, (z + 7)));
    y = Math.floor((Math.pow(2, (z + 7)) / Math.PI) * (-1 * (Math.atanh(Math.sin(Math.PI * lati / 180))) + Math.atanh(Math.sin(Math.PI * L / 180))));
    const url = 'http://cyberjapandata.gsi.go.jp/xyz/skhb04/' + z + '/' + Math.floor(x / 256) + '/' + Math.floor(y / 256) + '.geojson';
    var distance = 99999999999999999999 //どう考えても距離より遠い値入れただけ
    var siteName = '';
    fetch(url).then(function (responce) {
        return responce.json();
    }).then(function (geojson) {
        geojson.features.forEach(element => {
            tmpX = element.geometry.coordinates[1];
            tmpY = element.geometry.coordinates[0];
            tmpSiteName = element.properties.name;
            tmpDistance = Math.sqrt(Math.pow(lati - tmpX, 2) + Math.pow(long - tmpY, 2));
            if (distance > tmpDistance) {
                siteName = tmpSiteName;
                distance = tmpDistance;
            }
        })
    }).then(() => {
        console.log(distance);
        console.log(siteName);
    });
    //TODO 国土地理院と和解してgeojsonを返す
}
function findNearestPlace(geojson) {
    //TODO geojsonから最も近い場所を見つける
    //object{latitude:緯度 longitude:東経 name:場所名}
}
function setEscapeRoot(PrLat, PrLon, DnLat, DnLon) {
    //TODO GM APIを叩いて最短距離を求め、マップに設定
}
function positionsOK(positions) {
    const presentLatitude = positions.coords.latitude;
    const presentLongitude = positions.coords.longitude;
    //placeには名前、座標が必要
    const placedata = findNearestPlace(getEscapePlaces(presentLatitude, presentLongitude));
    setEscapeRoot(presentLatitude, presentLongitude, placedata.latitude, placedata.longitude);
}
