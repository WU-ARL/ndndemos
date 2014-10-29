#!/bin/bash


source /project/arl/NDN/jdd/.ec2_access

#EAST REGION
cd /project/arl/NDN/jdd
cd /project/arl/NDN/jdd/EC2_VLC_Proxy_Test

# Start server in E1 region
./ec2Run.py --timeout 500 --type "m1.large" -c 1 -r "us-east-1" -n "Server" >& currentServer.E1
#./ec2Run.py --timeout 500 --type "t1.micro" -c 1 -r "us-east-1" -n "Server" >& currentServer.E1

