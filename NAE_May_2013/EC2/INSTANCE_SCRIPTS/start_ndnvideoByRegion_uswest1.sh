#!/bin/bash


if [ $# -eq 1 ]
then
   COUNT=$1
else
   echo "Usage: $0 <count>"
   exit
fi

source /project/arl/NDN/jdd/.ec2_access

UIUC_VIDEO="/ndn/uiuc.edu/apps/video"
MEMPHIS_VIDEO="/ndn/memphis.edu/netlabs/apps/video"
ARIZONA_VIDEO="/ndn/arizona.edu/apps/video"
UCLA_VIDEO="/ndn/ucla.edu/apps/video"
CAIDA_VIDEO="/ndn/caida.org/apps/video"

VIDEO3=$UCLA_VIDEO
VIDEO2=$ARIZONA_VIDEO
VIDEO1=$CAIDA_VIDEO

#WEST-1 REGION
cd /project/arl/NDN/jdd
cd /project/arl/NDN/jdd/MAY_2013_DEMO

if [ $COUNT -ge 76 ]
then
  COUNT=75
fi
echo "CAIDA"
./ec2Run.py --timeout 500 --type "m1.small" -c $COUNT -r "us-west-1" -n "ndnvideo" -g "CAIDA" -o "$VIDEO1" >& currentNDNVIDEO.CAIDA 

echo "UCI"
./ec2Run.py --timeout 500 --type "m1.small" -c $COUNT -r "us-west-1" -n "ndnvideo" -g "UCI" -o "$VIDEO1" >& currentNDNVIDEO.UCI 

echo "UCLA"
./ec2Run.py --timeout 500 --type "m1.small" -c $COUNT -r "us-west-1" -n "ndnvideo" -g "UCLA" -o "$VIDEO1" >& currentNDNVIDEO.UCLA 

echo "REMAP"
./ec2Run.py --timeout 500 --type "m1.small" -c $COUNT -r "us-west-1" -n "ndnvideo" -g "REMAP" -o "$VIDEO1" >& currentNDNVIDEO.REMAP  &

