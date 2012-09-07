#!/bin/bash

FETCHFILE=""
if [ $# -eq 1 ]
then
FETCHFILE="$1"
else
FETCHFILE=""
fi
# Files containing the EC2 hostname for the instance running the current Fetch clients:
# currentFetch.ARIZONA
# currentFetch.CAIDA
# currentFetch.CSU
# currentFetch.MEMPHIS
# currentFetch.PARC
# currentFetch.REMAP
# currentFetch.UCLA
# currentFetch.UCI
# currentFetch.UIUC
# currentFetch.WASHU

ARIZONA_FILENAME="currentFetch.ARIZONA"
CAIDA_FILENAME="currentFetch.CAIDA"
CSU_FILENAME="currentFetch.CSU"
MEMPHIS_FILENAME="currentFetch.MEMPHIS"
PARC_FILENAME="currentFetch.PARC"
REMAP_FILENAME="currentFetch.REMAP"
UCLA_FILENAME="currentFetch.UCLA"
UCI_FILENAME="currentFetch.UCI"
UIUC_FILENAME="currentFetch.UIUC"
WASHU_FILENAME="currentFetch.WASHU"

ARIZONA_HOSTNAMES=`grep ec2 currentFetch.ARIZONA  | awk '{print $NF}'`
CAIDA_HOSTNAMES=`grep ec2 currentFetch.CAIDA  | awk '{print $NF}'`
CSU_HOSTNAMES=`grep ec2 currentFetch.CSU  | awk '{print $NF}'`
MEMPHIS_HOSTNAMES=`grep ec2 currentFetch.MEMPHIS  | awk '{print $NF}'`
PARC_HOSTNAMES=`grep ec2 currentFetch.PARC  | awk '{print $NF}'`
REMAP_HOSTNAMES=`grep ec2 currentFetch.REMAP  | awk '{print $NF}'`
UCLA_HOSTNAMES=`grep ec2 currentFetch.UCLA  | awk '{print $NF}'`
UCI_HOSTNAMES=`grep ec2 currentFetch.UCI  | awk '{print $NF}'`
UIUC_HOSTNAMES=`grep ec2 currentFetch.UIUC  | awk '{print $NF}'`
WASHU_HOSTNAMES=`grep ec2 currentFetch.WASHU  | awk '{print $NF}'`

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

echo "WASHU: Starting Fetch clients homed off gateway:"
for h in $WASHU_HOSTNAMES 
do
  echo "$SSH_CMD_east_1 -o \"StrictHostKeyChecking no\" ubuntu@$h \"~/startApp.sh $FETCHFILE \""
  $SSH_CMD_east_1 -o "StrictHostKeyChecking no" ubuntu@$h "~/startApp.sh $FETCHFILE " &
done

echo "MEMPHIS: Starting Fetch clients homed off gateway:"
for h in $MEMPHIS_HOSTNAMES 
do
  echo "$SSH_CMD_east_1 -o \"StrictHostKeyChecking no\" ubuntu@$h \"~/startApp.sh $FETCHFILE \""
  $SSH_CMD_east_1 -o "StrictHostKeyChecking no" ubuntu@$h "~/startApp.sh $FETCHFILE " &
done

echo "UIUC: Starting Fetch clients homed off gateway:"
for h in $UIUC_HOSTNAMES 
do
  echo "$SSH_CMD_east_1 -o \"StrictHostKeyChecking no\" ubuntu@$h \"~/startApp.sh $FETCHFILE\""
  $SSH_CMD_east_1 -o "StrictHostKeyChecking no" ubuntu@$h "~/startApp.sh $FETCHFILE" &
done




echo "ARIZONA: Starting Fetch clients homed off gateway:"
for h in $ARIZONA_HOSTNAMES 
do
  echo "$SSH_CMD_west_2 -o \"StrictHostKeyChecking no\" ubuntu@$h \"~/startApp.sh $FETCHFILE \""
  $SSH_CMD_west_2 -o "StrictHostKeyChecking no" ubuntu@$h "~/startApp.sh $FETCHFILE " &
done

echo "CSU: Starting Fetch clients homed off gateway:"
for h in $CSU_HOSTNAMES 
do
  echo "$SSH_CMD_west_2 -o \"StrictHostKeyChecking no\" ubuntu@$h \"~/startApp.sh $FETCHFILE\""
  $SSH_CMD_west_2 -o "StrictHostKeyChecking no" ubuntu@$h "~/startApp.sh $FETCHFILE" &
done

echo "PARC: Starting Fetch clients homed off gateway:"
for h in $PARC_HOSTNAMES 
do
  echo "$SSH_CMD_west_2 -o \"StrictHostKeyChecking no\" ubuntu@$h \"~/startApp.sh $FETCHFILE\""
  $SSH_CMD_west_2 -o "StrictHostKeyChecking no" ubuntu@$h "~/startApp.sh $FETCHFILE" &
done




echo "REMAP: Starting Fetch clients homed off gateway:"
for h in $REMAP_HOSTNAMES 
do
  echo "$SSH_CMD_west_1 -o \"StrictHostKeyChecking no\" ubuntu@$h \"~/startApp.sh $FETCHFILE\""
  $SSH_CMD_west_1 -o "StrictHostKeyChecking no" ubuntu@$h "~/startApp.sh $FETCHFILE" &
done

echo "UCLA: Starting Fetch clients homed off gateway:"
for h in $UCLA_HOSTNAMES 
do
  echo "$SSH_CMD_west_1 -o \"StrictHostKeyChecking no\" ubuntu@$h \"~/startApp.sh $FETCHFILE\""
  $SSH_CMD_west_1 -o "StrictHostKeyChecking no" ubuntu@$h "~/startApp.sh $FETCHFILE" &
done

echo "UCI: Starting Fetch clients homed off gateway:"
for h in $UCI_HOSTNAMES 
do
  echo "$SSH_CMD_west_1 -o \"StrictHostKeyChecking no\" ubuntu@$h \"~/startApp.sh $FETCHFILE\""
  $SSH_CMD_west_1 -o "StrictHostKeyChecking no" ubuntu@$h "~/startApp.sh $FETCHFILE" &
done

echo "CAIDA: Starting Fetch clients homed off gateway:"
for h in $CAIDA_HOSTNAMES 
do
  echo "$SSH_CMD_west_1 -o \"StrictHostKeyChecking no\" ubuntu@$h \"~/startApp.sh $FETCHFILE\""
  $SSH_CMD_west_1 -o "StrictHostKeyChecking no" ubuntu@$h "~/startApp.sh $FETCHFILE" &
done

