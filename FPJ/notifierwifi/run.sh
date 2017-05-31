for (( i=0; i <= 10; ++i ))
do
    node index.js | grep csie-5G | grep 5540 >> a.txt
done
awk '{sum+=$2}END{printf "Sum=%d\nCount=%d\nAve=%.2f\n",sum,NR,sum/NR}' a.txt
rm -f a.txt
