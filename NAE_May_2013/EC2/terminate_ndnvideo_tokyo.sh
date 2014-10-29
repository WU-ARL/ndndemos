#!/bin/bash

REGION_US_E1='us-east-1' # N. Virginia
REGION_US_W1='us-west-1' # N. California
REGION_US_W2='us-west-2' # Oregon
REGION_EU_W1='eu-west-1' # Ireland
REGION_AP_SE1='ap-southeast-1' # Singapore
REGION_AP_SE2='ap-southeast-2' # Sydney
REGION_AP_NE1='ap-northeast-1' # Tokyo
REGION_SA_E1='sa-east-1' # Sao Paolo

source /project/arl/NDN/jdd/.ec2_access

echo "ap_ne (Tokyo)"
 ./ec2Run.py -t -n "ndnvideo" -r $REGION_AP_NE1
