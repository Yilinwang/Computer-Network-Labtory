<?php
    session_start();
    echo "uamip = $_SESSION[uamip], uamport = $_SESSION[uamport]<br>";
    $username = $_SESSION['username'];
    echo "username = $username <br>";
    $sql = mysqli_connect('localhost', 'root', 'lplplplp', 'radius') OR die('Fail to connect database.');
    $query = "SELECT acctinputoctets, acctoutputoctets FROM radacct WHERE username = '$username' ORDER BY radacctid DESC";
    $result = mysqli_query($sql, $query);
    $data = mysqli_fetch_assoc($result);
    
    $inputOctets = $data['acctinputoctets'];	
    $outputOctets = $data['acctoutputoctets'];	
    $_SESSION['inputoctets'] = $inputOctets;
    $_SESSION['outputoctets'] = $outputOctets;
    echo "inpt octets = $inputOctets<br> output octets = $outputOctets<br>";
    echo "Total = ".($_SESSION['inputoctets']+$_SESSION['outputoctets'])."<br>";
    echo "Max quota = ".($_SESSION['maxquota']);
    if($_SESSION['inputoctets']+$_SESSION['outputoctets']>$_SESSION['maxquota']){
        print "
            <script>window.location = \"$loginpath?res=exceed&uamip=$_SESSION[uamip]&uamport=$_SESSION[uamport]\"; </script>
	";
    }
    mysqli_close($sql);
?>
 
