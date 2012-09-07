#!/bin/bash

REGION_US_E1='us-east-1' # N. Virginia
REGION_US_W1='us-west-1' # N. California
REGION_US_W2='us-west-2' # Oregon


cd /project/arl/NDN/jdd/ndnec2

echo "us-east-1"
source /project/arl/NDN/jdd/.ec2_access_east_1 
 ./ec2Run.py -t --timeout 300 -r $REGION_US_E1 -n "robochat"
echo "us-west-1"
source /project/arl/NDN/jdd/.ec2_access_west_1 
 ./ec2Run.py -t --timeout 300 -r $REGION_US_W1 -n "robochat"
echo "us-west-2"
source /project/arl/NDN/jdd/.ec2_access_west_2 
 ./ec2Run.py -t --timeout 300 -r $REGION_US_W2 -n "robochat"

