/*
var iwlist = require('wireless-tools/iwlist');

iwlist.scan('wlp1s0', function(err, networks) {
    console.log(networks);
});

iwlist.scan({ iface : 'wlp1s0', show_hidden : true }, function(err, networks) {
    console.log(networks);
});


var ifconfig = require('wireless-tools/ifconfig');
 
ifconfig.status(function(err, status) {
    console.log(status);
});
*/

const scanner = require('node-wifi-scanner');

scanner.scan((err, networks) => {
    if (err) {
        console.error(err);
        return;
    }
      console.log(networks);
});
