var async = require('async')
var wifi = require('node-wifi');
var open = require('open');
var sleep = require('sleep');
var func = require('./redirect');

var ssids_fix = ['7', '12', '13']
//var ssids_fix = ['ntu_peap', 'NTU']
//var freq_fix = [5540, 2412]
var websites = ['google.com.tw', 'www.ntu.edu.tw', 'mrtg.csie.ntu.edu.tw', 'www.youtube.com', 'www.facebook.com', 'www.gmail.com']
var ssid2website = {}
var signal_levels = []
//var sleep_seconds = 1

for (var i = 0; i < ssids_fix.length; i++){
    ssid2website[ssids_fix[i]] = websites[i]
    signal_levels.push([])
}

var sampleN = 11
var array = new Array(sampleN-1)

for (var i = 0; i < array.length; i++){
    array[i] = i+1
}

function median(a){
    a.sort()
    return a[parseInt((sampleN+1)/2)]
}


wifi.init({
    iface : null // network interface, choose a random wifi interface if set to null 
});
 
async.waterfall([
    function(callback){
        wifi.scan(function(err, networks) {
            //console.log(networks)
            var newNetworks = []
            if (err) {
                console.log(err);
            } else {
                for (var i = 0; i < networks.length; i++){
                    for (var j = 0; j < ssids_fix.length; j++){
                        //if((networks[i].ssid == ssids_fix[j]) && (networks[i].frequency == freq_fix[j])){
                        if(networks[i].ssid == ssids_fix[j]){
                            signal_levels[j].push(networks[i].signal_level)
                            newNetworks.push(networks[i])
                        }
                    }
                }
                newNetworks.sort(function(a, b){
                    return parseInt(a.ssid) > parseInt(b.ssid)
                })
            }
            //console.log('init:', newNetworks)
            callback(null, newNetworks);
        })
    },
    function(newNetworks, callback){
        async.everySeries(array, function(c, callback){
            //sleep.sleep(sleep_seconds)      // sleep sleep_seconds seconds
            wifi.scan(function(err, networks) {
                if (err) {
                    console.log(err);
                } else {
                    for (var i = 0; i < networks.length; i++){
                        for (var j = 0; j < ssids_fix.length; j++){
                            //if((networks[i].ssid == ssids_fix[j]) && (networks[i].frequency == freq_fix[j])){
                            if(networks[i].ssid == ssids_fix[j]){
                                signal_levels[j].push(networks[i].signal_level)
                            }
                        }
                    }
                    callback(null, !err);
                }
            })

        }, function (err, result) {
            callback(null, newNetworks)
        });
    },
], function (err, newNetworks) {
    for (var i = 0; i < newNetworks.length; i++){
        newNetworks[i].signal_level = median(signal_levels[i])
    }
	//console.log('Median:', newNetworks);
    var ssid_ret = func.Redirect1(newNetworks)
	console.log('Redirect1:', ssid_ret);
    open(ssid2website[ssid_ret], 'google-chrome');
    var case_num = func.Redirect2(newNetworks, [0.6 * 10, 0.6 * Math.pow(1+16, 0.5), 0.6 * Math.pow(81+16, 0.5)]);
	console.log('Redirect2 return');
	open(websites[case_num], 'google-chrome');
});

