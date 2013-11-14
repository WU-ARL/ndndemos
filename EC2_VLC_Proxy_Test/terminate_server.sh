#!/bin/bash

REGION_US_E1='us-east-1' # N. Virginia
REGION_US_W1='us-west-1' # N. California
REGION_US_W2='us-west-2' # Oregon

source /project/arl/NDN/jdd/.ec2_access

echo "us-east-1 (Virginia)"
 ./ec2Run.py -t -n "Server" -r $REGION_US_E1
