// dB, MHz -> meter
function ComputeDistance(signal_level_diff, freq)
{
    return Math.pow(10, 0.05 * signal_level_diff - 4.622) / freq
}

// @corridor
function MyComputeDistance(signal_level_diff, freq)
{
    return Math.pow(10, 0.05 * signal_level_diff + 2.447) / freq
}

// b11: redirect to the web page of AP with max signal level
// return ssid of closest AP
function Redirect1(networks)
{
	var min_distance = MyComputeDistance(-15-networks[0].signal_level, networks[0].frequency);
    //var min_distance = ComputeDistance(networks[0].signal_level - networks[0].transmit_signal_level, networks[0].frequency);
    var min_j = 0;
    for(var j=1; j<networks.length; j++){
        var distance = MyComputeDistance(-15-networks[j].signal_level, networks[j].frequency);
        //console.log(networks[index[j]].ssid, networks[index[j]].signal_level, networks[index[j]].frequency, distance)
        //var distance = ComputeDistance(networks[i].signal_level - networks[i].transmit_signal_level, networks[i].frequency);
        if(distance < min_distance){
            min_distance = distance;
            min_j = j;
        }
    }
    return networks[min_j].ssid;
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

/* Scenario:
Put AP 7 to the rightmost seat on team 14
Put AP 12 to the leftmost seat on team 4
Put AP 13 to the leftmost seat on team 6
*/

/* Cases:
at the front on the right  => case 0  => Redirect to CNL Lab1 Concept
at the back  on the right  => case 1  => Redirect to CNL Lab1 Experiment
at the front in the middle => case 2  => Redirect to CNL Lab2 Concept
at the back  in the middle => case 3  => Redirect to CNL Lab2 Experiment
at the front on the left   => case 4  => Redirect to CNL Lab3 Concept
at the back  on the left   => case 5  => Redirect to CNL Lab3 Experiment
*/

function Cases(coordinate)
{
    var x = coordinate[0];
    var y = coordinate[1];
    if(isNaN(x) || isNaN(y)){
    	throw 'coordinate error';
    }
    if(x >= 0.6 * 10){
        // on the right
        if (y >= 0.6 * 1)
            return 0;
        else
            return 1;
    }
    else if(x >= 0.6 * 1){
        // in the middle
        if (y >= 0.6 * 1)
            return 2;
        else
            return 3;
    }
    else{
        // on the left
        if (y >= 0.6 * 1)
            return 4;
        else
            return 5;
    }
}

// b12: compute current location and redirect to corresponding web page
function Redirect2(networks, lengths)
{
    var points = InitCoordinate(lengths);
    var distances = [];
    for(var i=0; i<networks.length; i++){
        distances.push( MyComputeDistance(-15-networks[i].signal_level, networks[i].frequency));
    }
    var coordinate = ComputeCoordinate(points, distances);
    console.log(coordinate[0], coordinate[1]);
    return Cases(coordinate);
}


exports.Redirect1 = Redirect1
exports.Redirect2 = Redirect2
