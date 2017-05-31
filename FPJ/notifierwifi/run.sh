for (( i=0; i <= 10; ++i ))
do
    node index.js | grep ^7\ >> a.txt
    node index.js | grep ^13\ >> b.txt
done
awk '{sum+=$2}END{printf "Sum=%d\nCount=%d\nAve=%.2f\n",sum,NR,sum/NR}' a.txt
awk '{sum+=$2}END{printf "Sum=%d\nCount=%d\nAve=%.2f\n",sum,NR,sum/NR}' b.txt
rm -f a.txt
rm -f b.txt
