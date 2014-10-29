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

if [ $COUNT -ge 76 ]
then
  COUNT=75
fi

#EAST REGION
cd /project/arl/NDN/jdd
cd /project/arl/NDN/jdd/MAY_2013_DEMO
echo "WASHU"
./ec2Run.py --timeout 500 --type "m1.small" -c $COUNT -r "us-east-1" -n "ndnvideo" -g "WASHU" -o "$VIDEO1" >& currentNDNVIDEO.WASHU 

echo "MEMPHIS"
./ec2Run.py --timeout 500 --type "m1.small" -c $COUNT -r "us-east-1" -n "ndnvideo" -g "MEMPHIS" -o "$VIDEO1" >& currentNDNVIDEO.MEMPHIS 

echo "UIUC"
./ec2Run.py --timeout 500 --type "m1.small" -c $COUNT -r "us-east-1" -n "ndnvideo" -g "UIUC" -o "$VIDEO1" >& currentNDNVIDEO.UIUC  &

echo "NEU"
./ec2Run.py --timeout 500 --type "m1.small" -c $COUNT -r "us-east-1" -n "ndnvideo" -g "NEU" -o "$VIDEO1" >& currentNDNVIDEO.NEU  &

