#!/bin/bash

REGION_US_E1='us-east-1' # N. Virginia
REGION_US_W1='us-west-1' # N. California
REGION_US_W2='us-west-2' # Oregon

source /project/arl/NDN/jdd/.ec2_access

echo "us-east-1 (Virginia)"
 ./ec2Run.py -t -n "Client" -r $REGION_US_E1
echo "us-west-1 (N. California)"
 ./ec2Run.py -t -n "Client" -r $REGION_US_W1
echo "us-west-2 (Oregon)"
 ./ec2Run.py -t -n "Client" -r $REGION_US_W2
