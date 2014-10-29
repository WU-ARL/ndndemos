#!/bin/bash

VIDEOFILE=""
if [ $# -eq 1 ]
then
VIDEOFILE="$1"
else
VIDEOFILE=""
fi
# Files containing the EC2 hostname for the instance running the current NDNVIDEO clients:

ARIZONA_FILENAME="currentNDNVIDEO.ARIZONA"
CAIDA_FILENAME="currentNDNVIDEO.CAIDA"
CSU_FILENAME="currentNDNVIDEO.CSU"
MEMPHIS_FILENAME="currentNDNVIDEO.MEMPHIS"
PARC_FILENAME="currentNDNVIDEO.PARC"
REMAP_FILENAME="currentNDNVIDEO.REMAP"
UCLA_FILENAME="currentNDNVIDEO.UCLA"
UCI_FILENAME="currentNDNVIDEO.UCI"
UIUC_FILENAME="currentNDNVIDEO.UIUC"
NEU_FILENAME="currentNDNVIDEO.NEU"
WASHU_FILENAME="currentNDNVIDEO.WASHU"

ARIZONA_HOSTNAMES=`grep ec2 currentNDNVIDEO.ARIZONA  | awk '{print $NF}'`
CAIDA_HOSTNAMES=`grep ec2 currentNDNVIDEO.CAIDA  | awk '{print $NF}'`
CSU_HOSTNAMES=`grep ec2 currentNDNVIDEO.CSU  | awk '{print $NF}'`
MEMPHIS_HOSTNAMES=`grep ec2 currentNDNVIDEO.MEMPHIS  | awk '{print $NF}'`
PARC_HOSTNAMES=`grep ec2 currentNDNVIDEO.PARC  | awk '{print $NF}'`
REMAP_HOSTNAMES=`grep ec2 currentNDNVIDEO.REMAP  | awk '{print $NF}'`
UCLA_HOSTNAMES=`grep ec2 currentNDNVIDEO.UCLA  | awk '{print $NF}'`
UCI_HOSTNAMES=`grep ec2 currentNDNVIDEO.UCI  | awk '{print $NF}'`
UIUC_HOSTNAMES=`grep ec2 currentNDNVIDEO.UIUC  | awk '{print $NF}'`
NEU_HOSTNAMES=`grep ec2 currentNDNVIDEO.NEU  | awk '{print $NF}'`
WASHU_HOSTNAMES=`grep ec2 currentNDNVIDEO.WASHU  | awk '{print $NF}'`

SSH_CMD_east_1="ssh -i /home/jdd/.ssh/AmazonEC2_JDD_east_1.pem"
SSH_CMD_west_1="ssh -i /home/jdd/.ssh/AmazonEC2_JDD_west_1.pem"
SSH_CMD_west_2="ssh -i /home/jdd/.ssh/AmazonEC2_JDD_west_2.pem"

#EAST REGION
echo "WASHU: Starting NDNVIDEO clients homed off gateway:"
for h in $WASHU_HOSTNAMES 
do
  echo "$SSH_CMD_east_1 -o \"StrictHostKeyChecking no\" ubuntu@$h \"head -5  ~/ndnvideo.log \""
  $SSH_CMD_east_1 -o "StrictHostKeyChecking no" ubuntu@$h "head -5  ~/ndnvideo.log " 
done

echo "MEMPHIS: Starting NDNVIDEO clients homed off gateway:"
for h in $MEMPHIS_HOSTNAMES 
do
  echo "$SSH_CMD_east_1 -o \"StrictHostKeyChecking no\" ubuntu@$h \"head -5  ~/ndnvideo.log \""
  $SSH_CMD_east_1 -o "StrictHostKeyChecking no" ubuntu@$h "head -5  ~/ndnvideo.log "
done

echo "UIUC: Starting NDNVIDEO clients homed off gateway:"
for h in $UIUC_HOSTNAMES 
do
  echo "$SSH_CMD_east_1 -o \"StrictHostKeyChecking no\" ubuntu@$h \"head -5  ~/ndnvideo.log\""
  $SSH_CMD_east_1 -o "StrictHostKeyChecking no" ubuntu@$h "head -5  ~/ndnvideo.log"
done

echo "NEU: Starting NDNVIDEO clients homed off gateway:"
for h in $NEU_HOSTNAMES 
do
  echo "$SSH_CMD_east_1 -o \"StrictHostKeyChecking no\" ubuntu@$h \"head -5  ~/ndnvideo.log\""
  $SSH_CMD_east_1 -o "StrictHostKeyChecking no" ubuntu@$h "head -5  ~/ndnvideo.log"
done


#WEST-2 REGION
echo "ARIZONA: Starting NDNVIDEO clients homed off gateway:"
for h in $ARIZONA_HOSTNAMES 
do
  echo "$SSH_CMD_west_2 -o \"StrictHostKeyChecking no\" ubuntu@$h \"head -5  ~/ndnvideo.log \""
  $SSH_CMD_west_2 -o "StrictHostKeyChecking no" ubuntu@$h "head -5  ~/ndnvideo.log "
done

echo "CSU: Starting NDNVIDEO clients homed off gateway:"
for h in $CSU_HOSTNAMES 
do
  echo "$SSH_CMD_west_2 -o \"StrictHostKeyChecking no\" ubuntu@$h \"head -5  ~/ndnvideo.log\""
  $SSH_CMD_west_2 -o "StrictHostKeyChecking no" ubuntu@$h "head -5  ~/ndnvideo.log"
done

echo "PARC: Starting NDNVIDEO clients homed off gateway:"
for h in $PARC_HOSTNAMES 
do
  echo "$SSH_CMD_west_2 -o \"StrictHostKeyChecking no\" ubuntu@$h \"head -5  ~/ndnvideo.log\""
  $SSH_CMD_west_2 -o "StrictHostKeyChecking no" ubuntu@$h "head -5  ~/ndnvideo.log" 
done

#WEST-1 REGION
echo "CAIDA: Starting NDNVIDEO clients homed off gateway:"
for h in $CAIDA_HOSTNAMES 
do
  echo "$SSH_CMD_west_1 -o \"StrictHostKeyChecking no\" ubuntu@$h \"head -5  ~/ndnvideo.log\""
  $SSH_CMD_west_1 -o "StrictHostKeyChecking no" ubuntu@$h "head -5  ~/ndnvideo.log"
done

echo "UCI: Starting NDNVIDEO clients homed off gateway:"
for h in $UCI_HOSTNAMES 
do
  echo "$SSH_CMD_west_1 -o \"StrictHostKeyChecking no\" ubuntu@$h \"head -5  ~/ndnvideo.log\""
  $SSH_CMD_west_1 -o "StrictHostKeyChecking no" ubuntu@$h "head -5  ~/ndnvideo.log"
done

echo "UCLA: Starting NDNVIDEO clients homed off gateway:"
for h in $UCLA_HOSTNAMES 
do
  echo "$SSH_CMD_west_1 -o \"StrictHostKeyChecking no\" ubuntu@$h \"head -5  ~/ndnvideo.log\""
  $SSH_CMD_west_1 -o "StrictHostKeyChecking no" ubuntu@$h "head -5  ~/ndnvideo.log" 
done

echo "REMAP: Starting NDNVIDEO clients homed off gateway:"
for h in $REMAP_HOSTNAMES 
do
  echo "$SSH_CMD_west_1 -o \"StrictHostKeyChecking no\" ubuntu@$h \"head -5  ~/ndnvideo.log\""
  $SSH_CMD_west_1 -o "StrictHostKeyChecking no" ubuntu@$h "head -5  ~/ndnvideo.log" 
done

