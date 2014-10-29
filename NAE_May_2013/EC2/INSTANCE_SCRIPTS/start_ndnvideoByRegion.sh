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

echo "MEMPHIS"
./ec2Run.py --timeout 500 --type "m1.small" -c $ECOUNT -r "us-east-1" -n "ndnvideo" -g "MEMPHIS" -o "$VIDEO1" >& currentNDNVIDEO.MEMPHIS 

echo "UIUC"
./ec2Run.py --timeout 500 --type "m1.small" -c $ECOUNT -r "us-east-1" -n "ndnvideo" -g "UIUC" -o "$VIDEO1" >& currentNDNVIDEO.UIUC  

echo "NEU"
./ec2Run.py --timeout 500 --type "m1.small" -c $ECOUNT -r "us-east-1" -n "ndnvideo" -g "NEU" -o "$VIDEO1" >& currentNDNVIDEO.NEU  &

#WEST-2 REGION
cd /project/arl/NDN/jdd
cd /project/arl/NDN/jdd/MAY_2013_DEMO

if [ $COUNT -ge 101 ]
then
  W2COUNT=100
else
  W2COUNT=$COUNT
fi
echo "CSU"
./ec2Run.py --timeout 500 --type "m1.small" -c $W2COUNT -r "us-west-2" -n "ndnvideo" -g "CSU" -o "$VIDEO1" >& currentNDNVIDEO.CSU 

echo "ARIZONA"
./ec2Run.py --timeout 500 --type "m1.small" -c $W2COUNT -r "us-west-2" -n "ndnvideo" -g "ARIZONA" -o "$VIDEO1" >& currentNDNVIDEO.ARIZONA 

echo "PARC"
./ec2Run.py --timeout 500 --type "m1.small" -c $W2COUNT -r "us-west-2" -n "ndnvideo" -g "PARC" -o "$VIDEO1" >& currentNDNVIDEO.PARC &

#WEST-1 REGION
cd /project/arl/NDN/jdd
cd /project/arl/NDN/jdd/MAY_2013_DEMO

if [ $COUNT -ge 76 ]
then
  W1COUNT=75
else
  W1COUNT=$COUNT
fi
echo "CAIDA"
./ec2Run.py --timeout 500 --type "m1.small" -c $W1COUNT -r "us-west-1" -n "ndnvideo" -g "CAIDA" -o "$VIDEO1" >& currentNDNVIDEO.CAIDA 

echo "UCI"
./ec2Run.py --timeout 500 --type "m1.small" -c $W1COUNT -r "us-west-1" -n "ndnvideo" -g "UCI" -o "$VIDEO1" >& currentNDNVIDEO.UCI 

echo "UCLA"
./ec2Run.py --timeout 500 --type "m1.small" -c $W1COUNT -r "us-west-1" -n "ndnvideo" -g "UCLA" -o "$VIDEO1" >& currentNDNVIDEO.UCLA 

echo "REMAP"
./ec2Run.py --timeout 500 --type "m1.small" -c $W1COUNT -r "us-west-1" -n "ndnvideo" -g "REMAP" -o "$VIDEO1" >& currentNDNVIDEO.REMAP  &

if [ $COUNT -ge 20 ]
then
  FCOUNT=19
else
  FCOUNT=$COUNT
fi

#APNE1 REGION (TOKYO)
cd /project/arl/NDN/jdd
cd /project/arl/NDN/jdd/MAY_2013_DEMO

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
echo "PKU"
./ec2Run.py --timeout 500 --type "m1.small" -c $PCOUNT -r "ap-northeast-1" -n "ndnvideo" -g "PKU" -o "$VIDEO1" >& currentNDNVIDEO.PKU &

echo "TOKYO"
./ec2Run.py --timeout 500 --type "m1.small" -c $TCOUNT -r "ap-northeast-1" -n "ndnvideo" -g "TOKYO" -o "$VIDEO1" >& currentNDNVIDEO.TOKYO &

#APSE1 REGION (SINGAPORE)
cd /project/arl/NDN/jdd
cd /project/arl/NDN/jdd/MAY_2013_DEMO

echo "SINGAPORE"
./ec2Run.py --timeout 500 --type "m1.small" -c $FCOUNT -r "ap-southeast-1" -n "ndnvideo" -g "SINGAPORE" -o "$VIDEO1" >& currentNDNVIDEO.SINGAPORE &

#APSE2 REGION (SYDNEY)
cd /project/arl/NDN/jdd
cd /project/arl/NDN/jdd/MAY_2013_DEMO

echo "SYDNEY"
./ec2Run.py --timeout 500 --type "m1.small" -c $FCOUNT -r "ap-southeast-2" -n "ndnvideo" -g "SYDNEY" -o "$VIDEO1" >& currentNDNVIDEO.SYDNEY &

#EUW1 REGION (IRELAND)
cd /project/arl/NDN/jdd
cd /project/arl/NDN/jdd/MAY_2013_DEMO

echo "IRELAND"
./ec2Run.py --timeout 500 --type "m1.small" -c $FCOUNT -r "eu-west-1" -n "ndnvideo" -g "IRELAND" -o "$VIDEO1" >& currentNDNVIDEO.IRELAND &

#SAE1 REGION (SAOPAULO)
cd /project/arl/NDN/jdd
cd /project/arl/NDN/jdd/MAY_2013_DEMO

echo "SAOPAULO"
./ec2Run.py --timeout 500 --type "m1.small" -c $FCOUNT -r "sa-east-1" -n "ndnvideo" -g "SAOPAULO" -o "$VIDEO1" >& currentNDNVIDEO.SAOPAULO 


