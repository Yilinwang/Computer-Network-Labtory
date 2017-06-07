var wifi = require('node-wifi');
var func = require('./redirect');
var open = require('open');
 
// Initialize wifi module 
// Absolutely necessary even to set interface to null 
wifi.init({
    iface : null // network interface, choose a random wifi interface if set to null 
});
 
// Scan networks 
/*
var signal_levels1 = 0
var signal_levels2 = 0
for(var i=0; i < 10; i++){
    wifi.scan(function(err, networks) {
        if (err) {
            console.log(err);
        } else {
            for (var i = 0; i < networks.length; i++){
                if(networks[i].ssid == '7'){
                    signal_levels1 += networks[i].signal_level
                }
                if(networks[i].ssid == '13'){
                    signal_levels2 += networks[i].signal_level
                }
            }
            console.log('7', signal_levels1 / 10)
            console.log('13', signal_levels2 / 10)
        }
    })
}
*/

var websites = {'7': 'google.com.tw', '12': 'www.ntu.edu.tw', '13': 'mrtg.csie.ntu.edu.tw'}

wifi.scan(function(err, networks) {
    if (err) {
        console.log(err);
    } else {
        newNetworks = []
        for (var i = 0; i < networks.length; i++){
            if(networks[i].ssid == '7' || networks[i].ssid == '12' || networks[i].ssid == '13'){
                newNetworks.push(networks[i])
            }
        }
        newNetworks.sort(function(a, b){
            return parseInt(a.ssid) > parseInt(b.ssid)
        })
        for (var i = 0; i < newNetworks.length; i++){
            console.log(newNetworks[i].ssid, newNetworks[i].frequency, newNetworks[i].signal_level)
        }

        var ssid_ret = func.Redirect1(newNetworks)
        console.log(ssid_ret)
        open(websites[ssid_ret], 'google-chrome', function (err) {
            if ( err ) throw err;    
        });

        /*

		for (i in networks){
			console.log(i);
			for (key in networks[i]){
				console.log( key + ": " + networks[i][key]);
			}
		}
        */

    }
});




/*
RETURNING DATA STRUCTURE:
networks = [
    {
        ssid: '...',
        mac: '...',
        frequency: <number>, // in MHz
        signal_level: <number>, // in dB
        security: '...' // unfortunately the format still depends of the OS
    },
    ...
];
*/
