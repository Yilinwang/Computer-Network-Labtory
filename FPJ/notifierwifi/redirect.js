// dB, MHz -> meter
function ComputeDistance(signal_level_diff, freq)
{
    return Math.pow(10, 0.05 * signal_level_diff - 4.622) / freq
}

// b11: redirect to the web page of AP with max signal level
function Redirect1(networks, webs)
{
    var min_distance = ComputeDistance(-15-networks[0].signal_level, networks[0].frequency);
    //var min_distance = ComputeDistance(networks[0].signal_level - networks[0].transmit_signal_level, networks[0].frequency);
    var min_i = 0;
    for(var i=1; i<networks.length; i++){
        var distance = ComputeDistance(-15-networks[i].signal_level, networks[i].frequency);
        console.log(networks[i].ssid, networks[i].signal_level, networks[i].frequency, distance)
        //var distance = ComputeDistance(networks[i].signal_level - networks[i].transmit_signal_level, networks[i].frequency);
        if(distance < min_distance){
            min_distance = distance;
            min_i = i;
        }
    }
    return webs[min_i];
}

// AB, AC, BC -> a, b, c
function InitCoordinate(lengths)
{
    var ab2 = Math.pow(lengths[0], 2);
    var ac2 = Math.pow(lengths[1], 2);
    var bc2 = Math.pow(lengths[2], 2);
    var b = (ab2 + bc2 - ac2) / 2 / lengths[0];
    var a = b - lengths[0];
    var c = Math.sqrt(ac2 - Math.pow(a, 2));
    return [a, b, c];
}

// [a, b, c], [d1, d2, d3]
function ComputeCoordinate(points, distances)
{
    var x = (Math.pow(distances[0], 2) - Math.pow(distances[1], 2) + Math.pow(points[1], 2) - Math.pow(points[0], 2)) / 2 / (points[1] - points[0]);
    var y = (Math.pow(distances[0], 2) - Math.pow(distances[2], 2) + 2 * points[0] * x - Math.pow(points[0], 2) + Math.pow(points[2], 2)) / 2 / (points[1] - points[0]);
    return [x, y];
}

// b12: compute current location and redirect to corresponding web page
function Redirect2(networks, webs)
{
    var points = InitCoordinate(lengths);
    var distances = [];
    for(var i=0; i<networks.length; i++){
        distances.push( ComputeDistance(network[i].signal_level - network[i].transmit_signal_level, network[i].frequency));
    }
    var coordinate = ComputeCoordinate(points, distances);
}


exports.Redirect1 = Redirect1
exports.Redirect2 = Redirect2
