#!/bin/bash

echo "#!/bin/bash"

FILES=`ls *8080*.txt*`

for f in $FILES
do
  echo "echo -n \"$f: \""
  echo "awk '{s+=\$1} END {print s}' $f" 
done
#echo -n "E1_L1 from Server:"
#awk '{s+=$1} END {print s}' E1_L1_src_8080_from_Server.txt
