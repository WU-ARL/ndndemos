#!/bin/bash


if [ $# -eq 1 ]
then
   COUNT=$1
else
   echo "Usage: $0 <count> "
   exit
fi

source /project/arl/NDN/jdd/.ec2_access

#EAST REGION
cd /project/arl/NDN/jdd
cd /project/arl/NDN/jdd/EC2_VLC_Proxy_Test

# Start clients
./ec2Run.py --timeout 500 --type "t1.micro" -c $COUNT -r "us-east-1" -n "Client" >& currentClient.E1
./ec2Run.py --timeout 500 --type "t1.micro" -c $COUNT -r "us-west-1" -n "Client" >& currentClient.W1
./ec2Run.py --timeout 500 --type "t1.micro" -c $COUNT -r "us-west-2" -n "Client" >& currentClient.W2


