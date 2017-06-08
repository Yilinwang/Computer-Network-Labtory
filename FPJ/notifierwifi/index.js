/**
 * Usage for case 1: node index.js 1
 * Usage for case 2: node index.js 2
 * Usage for case 3: node index.js 3
 * 
 * Before executing:
 *     Please set 
 *     (1) ssids_fix[] and its corresponding freqs_fix[]
 *     (2) websites1[] and websites2[] that you want to direct to
 *     
**/

var async = require('async')
var wifi = require('node-wifi');
var open = require('open');
var sleep = require('sleep');
var func = require('./redirect');

var ssids_fix = ['7', '12', '13']
//var ssids_fix = ['ntu_peap', 'NTU', '13']
var freqs_fix = [5540, 2412, 0]
var websites1 = ['google.com.tw', 'www.ntu.edu.tw', 'mrtg.csie.ntu.edu.tw']
var websites2 = ['www.pcs.csie.ntu.edu.tw/views/courses/cnl/2017/2017_Lab1_Firewall_NAT(concept).pdf',
                'www.pcs.csie.ntu.edu.tw/views/courses/cnl/2017/2017_Lab1_Firewall_NAT(exeriment).pdf',
                'www.pcs.csie.ntu.edu.tw/views/courses/cnl/2017/2017_Lab2_concept.pdf',
                'www.pcs.csie.ntu.edu.tw/views/courses/cnl/2017/2017_Lab2_experiment.pdf',
                'www.pcs.csie.ntu.edu.tw/views/courses/cnl/2017/2017_Lab3_IPv6_Mobility(concept).pdf',
                'www.pcs.csie.ntu.edu.tw/views/courses/cnl/2017/2017_Lab3_IPv6_Mobility(experiment).pdf'];
var ssid2website = {}
var signal_levels = []
//var sleep_seconds = 1

var myArgs = process.argv.slice(2);

if(myArgs.length != 1) {
    console.log('Usage: node index.js [case]\n[case] can be 1,2,3')
    throw new Error('Wrong arguments')
}

console.log('case:', myArgs[0]);

for (var i = 0; i < ssids_fix.length; i++){
    ssid2website[ssids_fix[i]] = websites1[i]
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
                        if((networks[i].ssid == ssids_fix[j]) && (networks[i].frequency == freqs_fix[j])){
                        //if(networks[i].ssid == ssids_fix[j]){
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
                            if((networks[i].ssid == ssids_fix[j]) && (networks[i].frequency == freqs_fix[j])){
                            //if(networks[i].ssid == ssids_fix[j]){
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

    if(myArgs[0] == 1){
        if(newNetworks.length > 0){
            var ssid_ret = func.Redirect1(newNetworks)
            console.log('Redirect1:', ssid_ret, ssid2website[ssid_ret]);
            open(ssid2website[ssid_ret], 'google-chrome');
        }
        else{
            console.log('Cannot detect enough APs (at least 1 for case 1)')
        }
    }
    else if(myArgs[0] == 2 ){
        if(newNetworks.length == 3){
            var ssid_ret2 = func.Redirect2(newNetworks, [4.8, 4.817, 3.94]);
            console.log('Redirect2:', ssid_ret2, websites2[ssid_ret2]);
            open(websites2[ssid_ret2], 'google-chrome');
        }
        else{
            console.log('Cannot detect enough APs (at least 3 for case 2)')
        }
    }
});

