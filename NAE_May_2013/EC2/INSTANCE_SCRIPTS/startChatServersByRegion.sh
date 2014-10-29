#!/bin/bash

cd /project/arl/NDN/jdd
source .ec2_access_west_1
cd /project/arl/NDN/jdd/MAY_2013_DEMO
echo "server1"
./ec2Run.py --timeout 500 --type "m1.small" -c 1 -r "us-west-1" -n "robochat_server1" -g "UCI" -o "ccnx:/ndn/broadcast/GEC_chat" >& currentChatServer1.UCI &

cd /project/arl/NDN/jdd
source .ec2_access_east_1
cd /project/arl/NDN/jdd/MAY_2013_DEMO
echo "server2"
./ec2Run.py --timeout 500 --type "m1.small" -c 1 -r "us-east-1" -n "robochat_server2" -g "WASHU" -o "ccnx:/ndn/broadcast/GEC_chat" >& currentChatServer2.WASHU &

cd /project/arl/NDN/jdd
source .ec2_access_west_2
cd /project/arl/NDN/jdd/MAY_2013_DEMO
echo "server3"
./ec2Run.py --timeout 500 --type "m1.small" -c 1 -r "us-west-2" -n "robochat_server3" -g "ARIZONA" -o "ccnx:/ndn/broadcast/GEC_chat" >& currentChatServer3.ARIZONA 

