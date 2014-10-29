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

#WEST-2 REGION
cd /project/arl/NDN/jdd
cd /project/arl/NDN/jdd/MAY_2013_DEMO

if [ $COUNT -ge 101 ]
then
  COUNT=100
fi

echo "CSU"
./ec2Run.py --timeout 500 --type "m1.small" -c $COUNT -r "us-west-2" -n "ndnvideo" -g "CSU" -o "$VIDEO1" >& currentNDNVIDEO.CSU 

echo "ARIZONA"
./ec2Run.py --timeout 500 --type "m1.small" -c $COUNT -r "us-west-2" -n "ndnvideo" -g "ARIZONA" -o "$VIDEO1" >& currentNDNVIDEO.ARIZONA 

echo "PARC"
./ec2Run.py --timeout 500 --type "m1.small" -c $COUNT -r "us-west-2" -n "ndnvideo" -g "PARC" -o "$VIDEO1" >& currentNDNVIDEO.PARC &

