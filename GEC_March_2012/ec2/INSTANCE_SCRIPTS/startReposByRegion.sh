#!/bin/bash

TIMEOUT=500

cd /project/arl/NDN/jdd/ndnec2
source /project/arl/NDN/jdd/.ec2_access_east_1
echo "WASHU"
./ec2Run.py --timeout $TIMEOUT --type "m1.small" -c 1 -r "us-east-1" -n "ccnx_repository" -g "WASHU" -o "ccnx:/GEC/ndn/wustl.edu/GECREPO" >& currentRepo.WASHU &

echo "MEMPHIS"
./ec2Run.py --timeout $TIMEOUT --type "m1.small" -c 1 -r "us-east-1" -n "ccnx_repository" -g "MEMPHIS" -o "ccnx:/GEC/ndn/memphis.edu/GECREPO" >& currentRepo.MEMPHIS &

echo "UIUC"
./ec2Run.py --timeout $TIMEOUT --type "m1.small" -c 1 -r "us-east-1" -n "ccnx_repository" -g "UIUC" -o "ccnx:/GEC/ndn/uiuc.edu/GECREPO" >& currentRepo.UIUC &



source /project/arl/NDN/jdd/.ec2_access_west_2
echo "UCLA"
./ec2Run.py --timeout $TIMEOUT --type "m1.small" -c 1 -r "us-west-2" -n "ccnx_repository" -g "UCLA" -o "ccnx:/GEC/ndn/ucla.edu/GECREPO" >& currentRepo.UCLA&

echo "REMAP"
./ec2Run.py --timeout $TIMEOUT --type "m1.small" -c 1 -r "us-west-2" -n "ccnx_repository" -g "REMAP" -o "ccnx:/GEC/ndn/remap.ucla.edu/GECREPO" >& currentRepo.REMAP &

echo "CSU"
./ec2Run.py --timeout $TIMEOUT --type "m1.small" -c 1 -r "us-west-2" -n "ccnx_repository" -g "CSU" -o "ccnx:/GEC/ndn/colostate.edu/GECREPO" >& currentRepo.CSU &



source /project/arl/NDN/jdd/.ec2_access_west_1
echo "UCI"
./ec2Run.py --timeout $TIMEOUT --type "m1.small" -c 1 -r "us-west-1" -n "ccnx_repository" -g "UCI" -o "ccnx:/GEC/ndn/uci.edu/GECREPO" >& currentRepo.UCI &

echo "ARIZONA"
./ec2Run.py --timeout $TIMEOUT --type "m1.small" -c 1 -r "us-west-1" -n "ccnx_repository" -g "ARIZONA" -o "ccnx:/GEC/ndn/arizona.edu/GECREPO" >& currentRepo.ARIZONA  &

echo "CAIDA"
./ec2Run.py --timeout $TIMEOUT --type "m1.small" -c 1 -r "us-west-1" -n "ccnx_repository" -g "CAIDA" -o "ccnx:/GEC/ndn/ucsd.edu/GECREPO" >& currentRepo.CAIDA  


