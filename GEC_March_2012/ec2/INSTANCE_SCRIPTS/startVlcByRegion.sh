#!/bin/bash

VIDEO=NASA005.mpg

if [ $# -eq 1 ]
then
   COUNT=$1
else
   echo "Usage: $0 <count>"
   exit
fi

#EAST REGION
cd /project/arl/NDN/jdd
source .ec2_access_east_1
cd /project/arl/NDN/jdd/ndnec2
echo "WASHU"
./ec2Run.py --timeout 500 --type "m1.small" -c $COUNT -r "us-east-1" -n "vlc" -g "WASHU" -o "ccnx:///GEC/ndn/colostate.edu/GECREPO/$VIDEO" >& currentVLC.WASHU &

echo "MEMPHIS"
./ec2Run.py --timeout 500 --type "m1.small" -c $COUNT -r "us-east-1" -n "vlc" -g "MEMPHIS" -o "ccnx:///GEC/ndn/colostate.edu/GECREPO/$VIDEO" >& currentVLC.MEMPHIS &

echo "UIUC"
./ec2Run.py --timeout 500 --type "m1.small" -c $COUNT -r "us-east-1" -n "vlc" -g "UIUC" -o "ccnx:///GEC/ndn/colostate.edu/GECREPO/$VIDEO" >& currentVLC.UIUC &


#WEST-2 REGION
cd /project/arl/NDN/jdd
source .ec2_access_west_2
cd /project/arl/NDN/jdd/ndnec2

echo "CSU"
./ec2Run.py --timeout 500 --type "m1.small" -c $COUNT -r "us-west-2" -n "vlc" -g "CSU" -o "ccnx:///GEC/ndn/colostate.edu/GECREPO/$VIDEO" >& currentVLC.CSU &

echo "ARIZONA"
./ec2Run.py --timeout 500 --type "m1.small" -c $COUNT -r "us-west-2" -n "vlc" -g "ARIZONA" -o "ccnx:///GEC/ndn/colostate.edu/GECREPO/$VIDEO" >& currentVLC.ARIZONA &

echo "PARC"
./ec2Run.py --timeout 500 --type "m1.small" -c $COUNT -r "us-west-2" -n "vlc" -g "PARC" -o "ccnx:///GEC/ndn/colostate.edu/GECREPO/$VIDEO" >& currentVLC.PARC &


#WEST-1 REGION
cd /project/arl/NDN/jdd
source .ec2_access_west_1
cd /project/arl/NDN/jdd/ndnec2

echo "CAIDA"
./ec2Run.py --timeout 500 --type "m1.small" -c $COUNT -r "us-west-1" -n "vlc" -g "CAIDA" -o "ccnx:///GEC/ndn/colostate.edu/GECREPO/$VIDEO" >& currentVLC.CAIDA &

echo "UCI"
./ec2Run.py --timeout 500 --type "m1.small" -c $COUNT -r "us-west-1" -n "vlc" -g "UCI" -o "ccnx:///GEC/ndn/colostate.edu/GECREPO/$VIDEO" >& currentVLC.UCI &

echo "UCLA"
./ec2Run.py --timeout 500 --type "m1.small" -c $COUNT -r "us-west-1" -n "vlc" -g "UCLA" -o "ccnx:///GEC/ndn/colostate.edu/GECREPO/$VIDEO" >& currentVLC.UCLA &

echo "REMAP"
./ec2Run.py --timeout 500 --type "m1.small" -c $COUNT -r "us-west-1" -n "vlc" -g "REMAP" -o "ccnx:///GEC/ndn/colostate.edu/GECREPO/$VIDEO" >& currentVLC.REMAP 

