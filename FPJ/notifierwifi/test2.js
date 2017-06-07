var async = require('async')
var wifi = require('node-wifi');
var func = require('./redirect');
//var open = require('open');
 
// Initialize wifi module 
// Absolutely necessary even to set interface to null 
wifi.init({
    iface : null // network interface, choose a random wifi interface if set to null 
});
 
// Scan networks 
var websites = {'7': 'google.com.tw', '12': 'www.ntu.edu.tw', '13': 'mrtg.csie.ntu.edu.tw'}
var ssids_fix = ['7', '12', '13']
var signal_levels = [0, 0, 0]
var sampleN = 100

async.waterfall([
    function(callback){
        console.log('Starting init');
        var newNetworks = []
        wifi.scan(function(err, networks) {
            if (err) {
                console.log(err);
            } else {
                for (var i = 0; i < networks.length; i++){
                    if(networks[i].ssid == '7' || networks[i].ssid == '12' || networks[i].ssid == '13'){
                        networks[i].signal_level /= sampleN
                        newNetworks.push(networks[i])
                    }
                }
                newNetworks.sort(function(a, b){
                    return parseInt(a.ssid) > parseInt(b.ssid)
                })
            }
            for (var i = 0; i < newNetworks.length; i++){
                console.log(newNetworks[i].ssid, newNetworks[i].frequency, newNetworks[i].signal_level)
            }
        })
        console.log('Just finshed init');
        console.log(newNetworks)
        callback(null, newNetworks);
    },
    function(newNetworks, callback){
        console.log('Starting after');
        var newNetworks = []
        wifi.scan(function(err, networks) {
            if (err) {
                console.log(err);
            } else {
                for(var i=0; i < sampleN-1; i++){
                    wifi.scan(function(err, networks) {
                        if (err) {
                            console.log(err);
                        } else {
                            for (var i = 0; i < networks.length; i++){
                                for (var j = 0; j < ssids_fix.length; j++){
                                    if(networks[i].ssid == ssids_fix[j]){
                                        newNetworks[j].signal_level += networks[i].signal_level / sampleN 
                                    }
                                }
                            }
                        }
                    })
                }
            }
        })
        console.log('Just finshed after');
        callback(null, newNetworks);
    },
], function (err, newNetworks) {
	console.log('Last');
    console.log(newNetworks)
    var ssid_ret = func.Redirect1(newNetworks)
    console.log(ssid_ret)
    func.Redirect2(newNetworks, [4.8, 4.817, 3.94]);
});
