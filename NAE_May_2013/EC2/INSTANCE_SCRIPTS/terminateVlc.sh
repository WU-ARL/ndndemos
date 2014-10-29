#!/bin/bash

REGION_US_E1='us-east-1' # N. Virginia
REGION_US_W1='us-west-1' # N. California
REGION_US_W2='us-west-2' # Oregon

cd /project/arl/NDN/jdd/MAY_2013_DEMO

echo "us-east-1"
source /project/arl/NDN/jdd/.ec2_access_east_1 
 ./ec2Run.py -t --timeout 300 -r $REGION_US_E1 -n "vlc"
echo "us-west-1"
source /project/arl/NDN/jdd/.ec2_access_west_1 
 ./ec2Run.py -t --timeout 300 -r $REGION_US_W1 -n "vlc"
echo "us-west-2"
source /project/arl/NDN/jdd/.ec2_access_west_2 
 ./ec2Run.py -t --timeout 300 -r $REGION_US_W2 -n "vlc"

