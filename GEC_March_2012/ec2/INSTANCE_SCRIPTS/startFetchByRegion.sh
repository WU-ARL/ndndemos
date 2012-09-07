#!/bin/bash

FETCHFILE=ArrangingThe2.mpeg

if [ $# -eq 1 ]
then
   COUNT=$1
else
   echo "Usage: $0 <count>"
   exit
fi

cd /project/arl/NDN/jdd
source .ec2_access_east_1
cd /project/arl/NDN/jdd/ndnec2
echo "WASHU"
./ec2Run.py --timeout 500 --type "m1.small" -c $COUNT -r "us-east-1" -n "fetch" -g "WASHU" -o "ccnx:/GEC/ndn/colostate.edu/GECREPO/$FETCHFILE" >& currentFetch.WASHU &

echo "MEMPHIS"
./ec2Run.py --timeout 500 --type "m1.small" -c $COUNT -r "us-east-1" -n "fetch" -g "MEMPHIS" -o "ccnx:/GEC/ndn/colostate.edu/GECREPO/$FETCHFILE" >& currentFetch.MEMPHIS &

echo "UIUC"
./ec2Run.py --timeout 500 --type "m1.small" -c $COUNT -r "us-east-1" -n "fetch" -g "UIUC" -o "ccnx:/GEC/ndn/colostate.edu/GECREPO/$FETCHFILE" >& currentFetch.UIUC &


cd /project/arl/NDN/jdd
source .ec2_access_west_2
cd /project/arl/NDN/jdd/ndnec2

echo "CSU"
./ec2Run.py --timeout 500 --type "m1.small" -c $COUNT -r "us-west-2" -n "fetch" -g "CSU" -o "ccnx:/GEC/ndn/colostate.edu/GECREPO/$FETCHFILE" >& currentFetch.CSU &

echo "ARIZONA"
./ec2Run.py --timeout 500 --type "m1.small" -c $COUNT -r "us-west-2" -n "fetch" -g "ARIZONA" -o "ccnx:/GEC/ndn/colostate.edu/GECREPO/$FETCHFILE" >& currentFetch.ARIZONA &

echo "PARC"
./ec2Run.py --timeout 500 --type "m1.small" -c $COUNT -r "us-west-2" -n "fetch" -g "PARC" -o "ccnx:/GEC/ndn/colostate.edu/GECREPO/$FETCHFILE" >& currentFetch.PARC &


cd /project/arl/NDN/jdd
source .ec2_access_west_1
cd /project/arl/NDN/jdd/ndnec2

echo "CAIDA"
./ec2Run.py --timeout 500 --type "m1.small" -c $COUNT -r "us-west-1" -n "fetch" -g "CAIDA" -o "ccnx:/GEC/ndn/colostate.edu/GECREPO/$FETCHFILE" >& currentFetch.CAIDA &

echo "UCI"
./ec2Run.py --timeout 500 --type "m1.small" -c $COUNT -r "us-west-1" -n "fetch" -g "UCI" -o "ccnx:/GEC/ndn/colostate.edu/GECREPO/$FETCHFILE" >& currentFetch.UCI &

echo "UCLA"
./ec2Run.py --timeout 500 --type "m1.small" -c $COUNT -r "us-west-1" -n "fetch" -g "UCLA" -o "ccnx:/GEC/ndn/colostate.edu/GECREPO/$FETCHFILE" >& currentFetch.UCLA &

echo "REMAP"
./ec2Run.py --timeout 500 --type "m1.small" -c $COUNT -r "us-west-1" -n "fetch" -g "REMAP" -o "ccnx:/GEC/ndn/colostate.edu/GECREPO/$FETCHFILE" >& currentFetch.REMAP 

