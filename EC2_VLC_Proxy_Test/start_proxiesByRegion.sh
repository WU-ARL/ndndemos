#!/bin/bash


if [ $# -eq 2 ]
then
   L1_COUNT=$1
   L2_COUNT=$2
else
   echo "Usage: $0 <level1 count> <level2 count>"
   exit
fi

source /project/arl/NDN/jdd/.ec2_access

#EAST REGION
cd /project/arl/NDN/jdd
cd /project/arl/NDN/jdd/EC2_VLC_Proxy_Test

# Start level 1 proxies
./ec2Run.py --timeout 500 --type "m1.large" -c $L1_COUNT -r "us-east-1" -n "Proxy" >& currentProxy.L1.E1
./ec2Run.py --timeout 500 --type "m1.large" -c $L1_COUNT -r "us-west-1" -n "Proxy" >& currentProxy.L1.W1
./ec2Run.py --timeout 500 --type "m1.large" -c $L1_COUNT -r "us-west-2" -n "Proxy" >& currentProxy.L1.W2

# Start level 2 proxies
if [ $L2_COUNT -gt 0 ]
then
./ec2Run.py --timeout 500 --type "m1.large" -c $L2_COUNT -r "us-east-1" -n "Proxy" >& currentProxy.L2.E1
./ec2Run.py --timeout 500 --type "m1.large" -c $L2_COUNT -r "us-west-1" -n "Proxy" >& currentProxy.L2.W1
./ec2Run.py --timeout 500 --type "m1.large" -c $L2_COUNT -r "us-west-2" -n "Proxy" >& currentProxy.L2.W2
fi

