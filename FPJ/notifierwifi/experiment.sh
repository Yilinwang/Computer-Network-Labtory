#! /bin/bash

for i in {1..10};
do
	node index.js 2 $1 $2 >> ./data
done