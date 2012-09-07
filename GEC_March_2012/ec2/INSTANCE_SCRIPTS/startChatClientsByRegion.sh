#!/bin/bash

if [ $# -eq 1 ]
then
   COUNT=$1
else
   echo "Usage: $0 <eastcount> <westcount>"
   exit
fi

TIMEOUT=1200

cd /project/arl/NDN/jdd
source .ec2_access_east_1
cd /project/arl/NDN/jdd/ndnec2
echo "WASHU"
./ec2Run.py --timeout $TIMEOUT --type "m1.small" -c $COUNT -r "us-east-1" -n "robochat" -g "WASHU" -o "ccnx:/ndn/broadcast/GEC_chat"  >& currentChats.WASHU  &

echo "MEMPHIS"
./ec2Run.py --timeout $TIMEOUT --type "m1.small" -c $COUNT -r "us-east-1" -n "robochat" -g "MEMPHIS" -o "ccnx:/ndn/broadcast/GEC_chat"  >& currentChats.MEMPHIS  &

echo "UIUC"
./ec2Run.py --timeout $TIMEOUT --type "m1.small" -c $COUNT -r "us-east-1" -n "robochat" -g "UIUC" -o "ccnx:/ndn/broadcast/GEC_chat"  >& currentChats.UIUC  &


cd /project/arl/NDN/jdd
source .ec2_access_west_2
cd /project/arl/NDN/jdd/ndnec2

echo "CSU"
./ec2Run.py --timeout $TIMEOUT --type "m1.small" -c $COUNT -r "us-west-2" -n "robochat" -g "CSU" -o "ccnx:/ndn/broadcast/GEC_chat"  >& currentChats.CSU  &

echo "ARIZONA"
./ec2Run.py --timeout $TIMEOUT --type "m1.small" -c $COUNT -r "us-west-2" -n "robochat" -g "ARIZONA" -o "ccnx:/ndn/broadcast/GEC_chat"  >& currentChats.ARIZONA  &

echo "PARC"
./ec2Run.py --timeout $TIMEOUT --type "m1.small" -c $COUNT -r "us-west-2" -n "robochat" -g "PARC" -o "ccnx:/ndn/broadcast/GEC_chat"  >& currentChats.PARC  &


cd /project/arl/NDN/jdd
source .ec2_access_west_1
cd /project/arl/NDN/jdd/ndnec2

echo "CAIDA"
./ec2Run.py --timeout $TIMEOUT --type "m1.small" -c $COUNT -r "us-west-1" -n "robochat" -g "CAIDA" -o "ccnx:/ndn/broadcast/GEC_chat"  >& currentChats.CAIDA  &

echo "UCI"
./ec2Run.py --timeout $TIMEOUT --type "m1.small" -c $COUNT -r "us-west-1" -n "robochat" -g "UCI" -o "ccnx:/ndn/broadcast/GEC_chat"  >& currentChats.UCI  &

echo "UCLA"
./ec2Run.py --timeout $TIMEOUT --type "m1.small" -c $COUNT -r "us-west-1" -n "robochat" -g "UCLA" -o "ccnx:/ndn/broadcast/GEC_chat"  >& currentChats.UCLA  &

echo "REMAP"
./ec2Run.py --timeout $TIMEOUT --type "m1.small" -c $COUNT -r "us-west-1" -n "robochat" -g "REMAP" -o "ccnx:/ndn/broadcast/GEC_chat"  >& currentChats.REMAP  &

