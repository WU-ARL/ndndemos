#!/bin/bash


source /project/arl/NDN/jdd/.ec2_access

cd /project/arl/NDN/jdd/MAY_2013_DEMO
echo "TOKYO"
./ec2Run_gw.py --timeout 500 --type "t1.micro" -c 1 -r "ap-northeast-1" -n "gateway" -g "TOKYO"  -o "1" >& currentGATEWAY.TOKYO 
echo "SINGAPORE"
./ec2Run_gw.py --timeout 500 --type "t1.micro" -c 1 -r "ap-southeast-1" -n "gateway" -g "SINGAPORE"  -o "1" >& currentGATEWAY.SINGAPORE 
echo "SYDNEY"
./ec2Run_gw.py --timeout 500 --type "t1.micro" -c 1 -r "ap-southeast-2" -n "gateway" -g "SYDNEY"  -o "1" >& currentGATEWAY.SYDNEY 
echo "SAOPAULO"
./ec2Run_gw.py --timeout 500 --type "t1.micro" -c 1 -r "sa-east-1" -n "gateway" -g "SAOPAULO"  -o "1" >& currentGATEWAY.SAOPAULO 
echo "IRELAND"
./ec2Run_gw.py --timeout 500 --type "t1.micro" -c 1 -r "eu-west-1" -n "gateway" -g "IRELAND"  -o "1" >& currentGATEWAY.IRELAND 

