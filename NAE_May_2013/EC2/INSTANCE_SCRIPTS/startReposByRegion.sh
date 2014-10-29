#!/bin/bash

TIMEOUT=500

source /project/arl/NDN/jdd/.ec2_access

cd /project/arl/NDN/jdd/MAY_2013_DEMO
echo "WASHU"
./ec2Run.py --timeout $TIMEOUT --type "m1.small" -c 1 -r "us-east-1" -n "ccnx_repository" -g "WASHU" -o "ccnx:/ndn/wustl.edu/EC2_REPO" >& currentRepo.WASHU &

echo "MEMPHIS"
./ec2Run.py --timeout $TIMEOUT --type "m1.small" -c 1 -r "us-east-1" -n "ccnx_repository" -g "MEMPHIS" -o "ccnx:/ndn/memphis.edu/EC2_REPO" >& currentRepo.MEMPHIS &

echo "UIUC"
./ec2Run.py --timeout $TIMEOUT --type "m1.small" -c 1 -r "us-east-1" -n "ccnx_repository" -g "UIUC" -o "ccnx:/ndn/uiuc.edu/EC2_REPO" >& currentRepo.UIUC &



echo "UCLA"
./ec2Run.py --timeout $TIMEOUT --type "m1.small" -c 1 -r "us-west-2" -n "ccnx_repository" -g "UCLA" -o "ccnx:/ndn/ucla.edu/EC2_REPO" >& currentRepo.UCLA&

#echo "REMAP"
#./ec2Run.py --timeout $TIMEOUT --type "m1.small" -c 1 -r "us-west-2" -n "ccnx_repository" -g "REMAP" -o "ccnx:/ndn/remap.ucla.edu/EC2_REPO" >& currentRepo.REMAP &

echo "CSU"
./ec2Run.py --timeout $TIMEOUT --type "m1.small" -c 1 -r "us-west-2" -n "ccnx_repository" -g "CSU" -o "ccnx:/ndn/colostate.edu/netsec/EC2_REPO" >& currentRepo.CSU &



#echo "UCI"
#./ec2Run.py --timeout $TIMEOUT --type "m1.small" -c 1 -r "us-west-1" -n "ccnx_repository" -g "UCI" -o "ccnx:/ndn/uci.edu/EC2_REPO" >& currentRepo.UCI &
#
#echo "ARIZONA"
#./ec2Run.py --timeout $TIMEOUT --type "m1.small" -c 1 -r "us-west-1" -n "ccnx_repository" -g "ARIZONA" -o "ccnx:/ndn/arizona.edu/EC2_REPO" >& currentRepo.ARIZONA  &
#
#echo "CAIDA"
#./ec2Run.py --timeout $TIMEOUT --type "m1.small" -c 1 -r "us-west-1" -n "ccnx_repository" -g "CAIDA" -o "ccnx:/ndn/ucsd.edu/EC2_REPO" >& currentRepo.CAIDA  


