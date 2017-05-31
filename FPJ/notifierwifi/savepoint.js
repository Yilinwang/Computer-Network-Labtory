
var MAX_WIFI = 10;
var ssid = [100, 130, 200, 300, 404, 999, 870, 940, 987, 900];
var wifiAmpMax = [100, 100, 100, 100, 100, 100, 100, 100, 100, 100];
var website = ["", "", "", "", "", "", "", "", "", ""];

var savePoints = {};
/*
var WifiInfo = function(){
	var self = this;
	self.size = 0;
	self.ssid = [];
	self.wifiAmpMax = [];
	self.website = [];
}
*/
//class SavePoint
var SavePoint = function(wifiAmps){
	var self = this;
	self.wifiAmps = [];
	self.website = "";
	for(var i=0;i<MAX_WIFI;i++){
		self.wifiAmps.push(wifiAmps[i])
	}
	self.bind = function(website){
		self.website = website;
	}
}
//inner product
SavePoint.compare = function(sp1, sp2){
	var dot = 0;
	for(var i=0;i<MAX_WIFI;i++){
		dot += (sp1.wifiAmps[i] - sp2.wifiAmps[i]) * (sp1.wifiAmps[i] - sp2.wifiAmps[i]);
	}
	return dot;
}

function newWifiAmps(ssid1, wifiAmp1, ssid2, wifiAmp2, ssid3, wifiAmp3){
	var wifiAmps = [];
	var i1 = ssid.indexOf(ssid1);
	var i2 = ssid.indexOf(ssid2);
	var i3 = ssid.indexOf(ssid3);
	for(var i=0;i<MAX_WIFI;i++){
		wifiAmps[i] = 0;
	}
	wifiAmps[i1] = wifiAmp1;
	wifiAmps[i2] = wifiAmp2;
	wifiAmps[i3] = wifiAmp3;
	return wifiAmps;
}

function getWebsiteByWifi(ssid1, wifiAmp1, ssid2, wifiAmp2, ssid3, wifiAmp3){
	var wifiAmps = newWifiAmps(ssid1, wifiAmp1, ssid2, wifiAmp2, ssid3, wifiAmp3);
	var wifiRelativeAmp = [];
	var max = 0;
	var maxId = -1;
	for(var i=0;i<MAX_WIFI;i++){
		wifiRelativeAmps[i] = wifiAmps[i]/wifiAmpMax[i];
		if(wifiRelativeAmps[i] > max){
			max = wifiRelativeAmps[i];
			maxId = i;
		}
	}
	return website[maxId];
}

function getWebsiteBySavePoint(ssid1, wifiAmp1, ssid2, wifiAmp2, ssid3, wifiAmp3){
	var wifiAmps = newWifiAmps(ssid1, wifiAmp1, ssid2, wifiAmp2, ssid3, wifiAmp3);
	var savePoint = new SavePoint(wifiAmps);
	//find the one that matches
	var min = 1000000;
	var minSavePoint = "";
	for(var name in savePoints){
		var dot = SavePoint.compare(savePoints[name], savePoint);
		if(dot < min){
			min = dot;
			minSavePoint = name;
		}
	}
	return savePoints[minSavePoint].website;
}

function saveCookies(){
	var data = JSON.stringify(savePoints);
	var expires = new Date();
	expires.setTime(expires.getTime() + 10*365*24*60*60*1000);
	document.cookie = "savePointData=" + data + "; expires="+expires.toUTCString()+";";
}

function loadCookies(){
	var sp = {};
	var cookies = document.cookie.split(";");
	for(var key in cookies){
		var cookie = cookies[key].split("=");
		if(cookie[0]=="savePointData"){
			try{
				sp = JSON.parse(unescape(cookie[1]));
			}
			catch(e){
				alert(e);
			}
		}
	}
	return sp;
}