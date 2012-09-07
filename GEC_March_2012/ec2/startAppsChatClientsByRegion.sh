#!/bin/bash

# Files containing the EC2 hostname for the instance running the current Chat clients:
# currentChats.ARIZONA
# currentChats.CAIDA
# currentChats.CSU
# currentChats.MEMPHIS
# currentChats.PARC
# currentChats.REMAP
# currentChats.UCLA
# currentChats.UCI
# currentChats.UIUC
# currentChats.WASHU

ARIZONA_FILENAME="currentChats.ARIZONA"
CAIDA_FILENAME="currentChats.CAIDA"
CSU_FILENAME="currentChats.CSU"
MEMPHIS_FILENAME="currentChats.MEMPHIS"
PARC_FILENAME="currentChats.PARC"
REMAP_FILENAME="currentChats.REMAP"
UCLA_FILENAME="currentChats.UCLA"
UCI_FILENAME="currentChats.UCI"
UIUC_FILENAME="currentChats.UIUC"
WASHU_FILENAME="currentChats.WASHU"

ARIZONA_HOSTNAMES=`grep ec2 currentChats.ARIZONA  | awk '{print $NF}'`
CAIDA_HOSTNAMES=`grep ec2 currentChats.CAIDA  | awk '{print $NF}'`
CSU_HOSTNAMES=`grep ec2 currentChats.CSU  | awk '{print $NF}'`
MEMPHIS_HOSTNAMES=`grep ec2 currentChats.MEMPHIS  | awk '{print $NF}'`
PARC_HOSTNAMES=`grep ec2 currentChats.PARC  | awk '{print $NF}'`
REMAP_HOSTNAMES=`grep ec2 currentChats.REMAP  | awk '{print $NF}'`
UCLA_HOSTNAMES=`grep ec2 currentChats.UCLA  | awk '{print $NF}'`
UCI_HOSTNAMES=`grep ec2 currentChats.UCI  | awk '{print $NF}'`
UIUC_HOSTNAMES=`grep ec2 currentChats.UIUC  | awk '{print $NF}'`
WASHU_HOSTNAMES=`grep ec2 currentChats.WASHU  | awk '{print $NF}'`

#echo "ARIZONA_HOSTNAMES = $ARIZONA_HOSTNAMES"
#echo "CAIDA_HOSTNAMES = $CAIDA_HOSTNAMES"
#echo "CSU_HOSTNAMES = $CSU_HOSTNAMES"
#echo "MEMPHIS_HOSTNAMES = $MEMPHIS_HOSTNAMES"
#echo "PARC_HOSTNAMES = $PARC_HOSTNAMES"
#echo "REMAP_HOSTNAMES = $REMAP_HOSTNAMES"
#echo "UCLA_HOSTNAMES = $UCLA_HOSTNAMES"
#echo "UCI_HOSTNAMES = $UCI_HOSTNAMES"
#echo "UIUC_HOSTNAMES = $UIUC_HOSTNAMES"
#echo "WASHU_HOSTNAMES = $WASHU_HOSTNAMES"

SSH_CMD_east_1="ssh -i /home/jdd/.ssh/AmazonEC2_JDD_east_1.pem"
SSH_CMD_west_1="ssh -i /home/jdd/.ssh/AmazonEC2_JDD_west_1.pem"
SSH_CMD_west_2="ssh -i /home/jdd/.ssh/AmazonEC2_JDD_west_2.pem"

TIME=2
#EAST REGION
echo "WASHU: Starting Chat clients homed off gateway:"
for h in $WASHU_HOSTNAMES 
do
  echo "$SSH_CMD_east_1 -o \"StrictHostKeyChecking no\" ubuntu@$h \"~/startApp.sh >& /dev/null\""
  $SSH_CMD_east_1 -o "StrictHostKeyChecking no" ubuntu@$h "~/startApp.sh >& /dev/null" &
  sleep $TIME
done

echo "MEMPHIS: Starting Chat clients homed off gateway:"
for h in $MEMPHIS_HOSTNAMES 
do
  echo "$SSH_CMD_east_1 -o \"StrictHostKeyChecking no\" ubuntu@$h \"~/startApp.sh >& /dev/null\""
  $SSH_CMD_east_1 -o "StrictHostKeyChecking no" ubuntu@$h "~/startApp.sh >& /dev/null" &
  sleep $TIME
done

echo "UIUC: Starting Chat clients homed off gateway:"
for h in $UIUC_HOSTNAMES 
do
  echo "$SSH_CMD_east_1 -o \"StrictHostKeyChecking no\" ubuntu@$h \"~/startApp.sh >& /dev/null\""
  $SSH_CMD_east_1 -o "StrictHostKeyChecking no" ubuntu@$h "~/startApp.sh >& /dev/null" &
  sleep $TIME
done

#WEST-2 REGION (Oregon)
echo "CSU: Starting Chat clients homed off gateway:"
for h in $CSU_HOSTNAMES 
do
  echo "$SSH_CMD_west_2 -o \"StrictHostKeyChecking no\" ubuntu@$h \"~/startApp.sh >& /dev/null\""
  $SSH_CMD_west_2 -o "StrictHostKeyChecking no" ubuntu@$h "~/startApp.sh >& /dev/null" &
  sleep $TIME
done

echo "ARIZONA: Starting Chat clients homed off gateway:"
for h in $ARIZONA_HOSTNAMES 
do
  echo "$SSH_CMD_west_2 -o \"StrictHostKeyChecking no\" ubuntu@$h \"~/startApp.sh >& /dev/null\""
  $SSH_CMD_west_2 -o "StrictHostKeyChecking no" ubuntu@$h "~/startApp.sh >& /dev/null" &
  sleep $TIME
done

echo "PARC: Starting Chat clients homed off gateway:"
for h in $PARC_HOSTNAMES 
do
  echo "$SSH_CMD_west_2 -o \"StrictHostKeyChecking no\" ubuntu@$h \"~/startApp.sh >& /dev/null\""
  $SSH_CMD_west_2 -o "StrictHostKeyChecking no" ubuntu@$h "~/startApp.sh >& /dev/null" &
  sleep $TIME
done

#WEST-1 REGION (California)
echo "CAIDA: Starting Chat clients homed off gateway:"
for h in $CAIDA_HOSTNAMES 
do
  echo "$SSH_CMD_west_1 -o \"StrictHostKeyChecking no\" ubuntu@$h \"~/startApp.sh >& /dev/null\""
  $SSH_CMD_west_1 -o "StrictHostKeyChecking no" ubuntu@$h "~/startApp.sh >& /dev/null" &
  sleep $TIME
done

echo "UCI: Starting Chat clients homed off gateway:"
for h in $UCI_HOSTNAMES 
do
  echo "$SSH_CMD_west_1 -o \"StrictHostKeyChecking no\" ubuntu@$h \"~/startApp.sh >& /dev/null\""
  $SSH_CMD_west_1 -o "StrictHostKeyChecking no" ubuntu@$h "~/startApp.sh >& /dev/null" &
  sleep $TIME
done

echo "UCLA: Starting Chat clients homed off gateway:"
for h in $UCLA_HOSTNAMES 
do
  echo "$SSH_CMD_west_1 -o \"StrictHostKeyChecking no\" ubuntu@$h \"~/startApp.sh >& /dev/null\""
  $SSH_CMD_west_1 -o "StrictHostKeyChecking no" ubuntu@$h "~/startApp.sh >& /dev/null" &
  sleep $TIME
done

echo "REMAP: Starting Chat clients homed off gateway:"
for h in $REMAP_HOSTNAMES 
do
  echo "$SSH_CMD_west_1 -o \"StrictHostKeyChecking no\" ubuntu@$h \"~/startApp.sh >& /dev/null\""
  $SSH_CMD_west_1 -o "StrictHostKeyChecking no" ubuntu@$h "~/startApp.sh >& /dev/null" &
  sleep $TIME
done

