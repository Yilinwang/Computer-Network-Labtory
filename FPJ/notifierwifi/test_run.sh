echo '[' > tmp_result
for (( i=0; i < 2; ++i ))
do
    node wifi_scan.js >> tmp_result
    echo ',' >> tmp_result
done
node wifi_scan.js >> tmp_result
echo ']' >> tmp_result
