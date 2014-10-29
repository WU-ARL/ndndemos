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

if [ $COUNT -ge 20 ]
then
  COUNT=19
fi

#APNE1 REGION (TOKYO)
cd /project/arl/NDN/jdd
cd /project/arl/NDN/jdd/MAY_2013_DEMO

echo "TOKYO"
./ec2Run.py --timeout 500 --type "m1.small" -c $COUNT -r "ap-northeast-1" -n "ndnvideo" -g "TOKYO" -o "$VIDEO1" >& currentNDNVIDEO.TOKYO &

#APSE1 REGION (SINGAPORE)
cd /project/arl/NDN/jdd
cd /project/arl/NDN/jdd/MAY_2013_DEMO

echo "SINGAPORE"
./ec2Run.py --timeout 500 --type "m1.small" -c $COUNT -r "ap-southeast-1" -n "ndnvideo" -g "SINGAPORE" -o "$VIDEO1" >& currentNDNVIDEO.SINGAPORE &

#APSE2 REGION (SYDNEY)
cd /project/arl/NDN/jdd
cd /project/arl/NDN/jdd/MAY_2013_DEMO

echo "SYDNEY"
./ec2Run.py --timeout 500 --type "m1.small" -c $COUNT -r "ap-southeast-2" -n "ndnvideo" -g "SYDNEY" -o "$VIDEO1" >& currentNDNVIDEO.SYDNEY &

#EUW1 REGION (IRELAND)
cd /project/arl/NDN/jdd
cd /project/arl/NDN/jdd/MAY_2013_DEMO

echo "IRELAND"
./ec2Run.py --timeout 500 --type "m1.small" -c $COUNT -r "eu-west-1" -n "ndnvideo" -g "IRELAND" -o "$VIDEO1" >& currentNDNVIDEO.IRELAND &

#SAE1 REGION (SAOPAULO)
cd /project/arl/NDN/jdd
cd /project/arl/NDN/jdd/MAY_2013_DEMO

echo "SAOPAULO"
./ec2Run.py --timeout 500 --type "m1.small" -c $COUNT -r "sa-east-1" -n "ndnvideo" -g "SAOPAULO" -o "$VIDEO1" >& currentNDNVIDEO.SAOPAULO 


