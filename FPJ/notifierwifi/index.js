var wifi = require('node-wifi');
var func = require('./redirect');
 
// Initialize wifi module 
// Absolutely necessary even to set interface to null 
wifi.init({
    iface : null // network interface, choose a random wifi interface if set to null 
});
 
// Scan networks 
wifi.scan(function(err, networks) {
    if (err) {
        console.log(err);
    } else {
        var websites = []
        for(var i = 0; i < networks.length; i++){
            websites.push(i.toString());
        }

        var web = func.Redirect1(networks, websites)
        console.log(websites.length)
        console.log(web)

        /*
        for (var i = 0; i < networks.length; i++){
            console.log(networks[i].ssid, networks[i].frequency, networks[i].signal_level);
        }

		for (i in networks){
			console.log(i);
			for (key in networks[i]){
				console.log( key + ": " + networks[i][key]);
			}
		}
        */

        // TODO: Filter SSID (only CSIE AP)

        // TODO: Select max 3
        // Problem wifi frequency (has a lot of channels)
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
