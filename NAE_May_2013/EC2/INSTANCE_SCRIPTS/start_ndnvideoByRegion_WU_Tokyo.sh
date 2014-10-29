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

VIDEO1=$UCLA_VIDEO
VIDEO2=$ARIZONA_VIDEO
VIDEO3=$CAIDA_VIDEO

#EAST REGION
cd /project/arl/NDN/jdd
cd /project/arl/NDN/jdd/MAY_2013_DEMO
if [ $COUNT -ge 76 ]
then
  ECOUNT=75
else
  ECOUNT=$COUNT
fi
echo "WASHU"
./ec2Run.py --timeout 500 --type "m1.small" -c $ECOUNT -r "us-east-1" -n "ndnvideo" -g "WASHU" -o "$VIDEO1" >& currentNDNVIDEO.WASHU 

#APNE1 REGION (TOKYO)
cd /project/arl/NDN/jdd
cd /project/arl/NDN/jdd/MAY_2013_DEMO

if [ $COUNT -ge 20 ]
then
  FCOUNT=19
else
  FCOUNT=$COUNT
fi


if [ $FCOUNT -ge 10 ]
then
  TCOUNT=9
else
  TCOUNT=$COUNT
fi
if [ $FCOUNT -ge 10 ]
then
  PCOUNT=10
else
  PCOUNT=$COUNT
fi
echo "TOKYO"
./ec2Run.py --timeout 500 --type "m1.small" -c $TCOUNT -r "ap-northeast-1" -n "ndnvideo" -g "TOKYO" -o "$VIDEO1" >& currentNDNVIDEO.TOKYO &


