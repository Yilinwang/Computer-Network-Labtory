var wifi = require('node-wifi');
var func = require('./redirect');
 
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

wifi.scan(function(err, networks) {
    if (err) {
        console.log(err);
    } else {
        var websites = []
        for(var i = 0; i < networks.length; i++){
            websites.push(i.toString());
        }

        for (var i = 0; i < networks.length; i++){
            if(networks[i].ssid == '7' || networks[i].ssid == '11' || networks[i].ssid == '12'){
                console.log(networks[i].ssid, networks[i].frequency, networks[i].signal_level);
            }
        }
        var websites_i = func.Redirect1(networks, websites)
        console.log(websites_i)
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
