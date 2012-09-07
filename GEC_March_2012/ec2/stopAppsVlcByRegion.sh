#!/bin/bash

# Files containing the EC2 hostname for the instance running the current VLC clients:
# currentVLC.ARIZONA
# currentVLC.CAIDA
# currentVLC.CSU
# currentVLC.MEMPHIS
# currentVLC.PARC
# currentVLC.REMAP
# currentVLC.UCLA
# currentVLC.UCI
# currentVLC.UIUC
# currentVLC.WASHU

ARIZONA_FILENAME="currentVLC.ARIZONA"
CAIDA_FILENAME="currentVLC.CAIDA"
CSU_FILENAME="currentVLC.CSU"
MEMPHIS_FILENAME="currentVLC.MEMPHIS"
PARC_FILENAME="currentVLC.PARC"
REMAP_FILENAME="currentVLC.REMAP"
UCLA_FILENAME="currentVLC.UCLA"
UCI_FILENAME="currentVLC.UCI"
UIUC_FILENAME="currentVLC.UIUC"
WASHU_FILENAME="currentVLC.WASHU"

ARIZONA_HOSTNAMES=`grep ec2 currentVLC.ARIZONA  | awk '{print $NF}'`
CAIDA_HOSTNAMES=`grep ec2 currentVLC.CAIDA  | awk '{print $NF}'`
CSU_HOSTNAMES=`grep ec2 currentVLC.CSU  | awk '{print $NF}'`
MEMPHIS_HOSTNAMES=`grep ec2 currentVLC.MEMPHIS  | awk '{print $NF}'`
PARC_HOSTNAMES=`grep ec2 currentVLC.PARC  | awk '{print $NF}'`
REMAP_HOSTNAMES=`grep ec2 currentVLC.REMAP  | awk '{print $NF}'`
UCLA_HOSTNAMES=`grep ec2 currentVLC.UCLA  | awk '{print $NF}'`
UCI_HOSTNAMES=`grep ec2 currentVLC.UCI  | awk '{print $NF}'`
UIUC_HOSTNAMES=`grep ec2 currentVLC.UIUC  | awk '{print $NF}'`
WASHU_HOSTNAMES=`grep ec2 currentVLC.WASHU  | awk '{print $NF}'`

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

#EAST REGION
echo "WASHU: Stopping VLC clients homed off gateway:"
for h in $WASHU_HOSTNAMES 
do
  echo "$SSH_CMD_east_1 -o \"StrictHostKeyChecking no\" ubuntu@$h \"killall startApp.sh; killall -s 9 /usr/local/bin/ccn_fetch_test; killall vlc; sleep 3; killall vlc\""
  $SSH_CMD_east_1 -o "StrictHostKeyChecking no" ubuntu@$h "killall startApp.sh; killall -s 9 /usr/local/bin/ccn_fetch_test; killall vlc; sleep 3; killall vlc"
done

echo "MEMPHIS: Stopping VLC clients homed off gateway:"
for h in $MEMPHIS_HOSTNAMES 
do
  echo "$SSH_CMD_east_1 -o \"StrictHostKeyChecking no\" ubuntu@$h \"killall startApp.sh; killall -s 9 /usr/local/bin/ccn_fetch_test; killall vlc; sleep 3; killall vlc\""
  $SSH_CMD_east_1 -o "StrictHostKeyChecking no" ubuntu@$h "killall startApp.sh; killall -s 9 /usr/local/bin/ccn_fetch_test; killall vlc; sleep 3; killall vlc"
done

echo "UIUC: Stopping VLC clients homed off gateway:"
for h in $UIUC_HOSTNAMES 
do
  echo "$SSH_CMD_east_1 -o \"StrictHostKeyChecking no\" ubuntu@$h \"killall startApp.sh; killall -s 9 /usr/local/bin/ccn_fetch_test; killall vlc; sleep 3; killall vlc\""
  $SSH_CMD_east_1 -o "StrictHostKeyChecking no" ubuntu@$h "killall startApp.sh; killall -s 9 /usr/local/bin/ccn_fetch_test; killall vlc; sleep 3; killall vlc"
done

#WEST-2 REGION
echo "CSU: Stopping VLC clients homed off gateway:"
for h in $CSU_HOSTNAMES 
do
  echo "$SSH_CMD_west_2 -o \"StrictHostKeyChecking no\" ubuntu@$h \"killall startApp.sh; killall -s 9 /usr/local/bin/ccn_fetch_test; killall vlc; sleep 3; killall vlc\""
  $SSH_CMD_west_2 -o "StrictHostKeyChecking no" ubuntu@$h "killall startApp.sh; killall -s 9 /usr/local/bin/ccn_fetch_test; killall vlc; sleep 3; killall vlc"
done

echo "ARIZONA: Stopping VLC clients homed off gateway:"
for h in $ARIZONA_HOSTNAMES 
do
  echo "$SSH_CMD_west_2 -o \"StrictHostKeyChecking no\" ubuntu@$h \"killall startApp.sh; killall -s 9 /usr/local/bin/ccn_fetch_test; killall vlc; sleep 3; killall vlc\""
  $SSH_CMD_west_2 -o "StrictHostKeyChecking no" ubuntu@$h "killall startApp.sh; killall -s 9 /usr/local/bin/ccn_fetch_test; killall vlc; sleep 3; killall vlc"
done

echo "PARC: Stopping VLC clients homed off gateway:"
for h in $PARC_HOSTNAMES 
do
  echo "$SSH_CMD_west_2 -o \"StrictHostKeyChecking no\" ubuntu@$h \"killall startApp.sh; killall -s 9 /usr/local/bin/ccn_fetch_test; killall vlc; sleep 3; killall vlc\""
  $SSH_CMD_west_2 -o "StrictHostKeyChecking no" ubuntu@$h "killall startApp.sh; killall -s 9 /usr/local/bin/ccn_fetch_test; killall vlc; sleep 3; killall vlc"
done

#WEST-1 REGION
echo "CAIDA: Stopping VLC clients homed off gateway:"
for h in $CAIDA_HOSTNAMES 
do
  echo "$SSH_CMD_west_1 -o \"StrictHostKeyChecking no\" ubuntu@$h \"killall startApp.sh; killall -s 9 /usr/local/bin/ccn_fetch_test; killall vlc; sleep 3; killall vlc\""
  $SSH_CMD_west_1 -o "StrictHostKeyChecking no" ubuntu@$h "killall startApp.sh; killall -s 9 /usr/local/bin/ccn_fetch_test; killall vlc; sleep 3; killall vlc"
done

echo "UCI: Stopping VLC clients homed off gateway:"
for h in $UCI_HOSTNAMES 
do
  echo "$SSH_CMD_west_1 -o \"StrictHostKeyChecking no\" ubuntu@$h \"killall startApp.sh; killall -s 9 /usr/local/bin/ccn_fetch_test; killall vlc; sleep 3; killall vlc\""
  $SSH_CMD_west_1 -o "StrictHostKeyChecking no" ubuntu@$h "killall startApp.sh; killall -s 9 /usr/local/bin/ccn_fetch_test; killall vlc; sleep 3; killall vlc"
done

echo "UCLA: Stopping VLC clients homed off gateway:"
for h in $UCLA_HOSTNAMES 
do
  echo "$SSH_CMD_west_1 -o \"StrictHostKeyChecking no\" ubuntu@$h \"killall startApp.sh; killall -s 9 /usr/local/bin/ccn_fetch_test; killall vlc; sleep 3; killall vlc\""
  $SSH_CMD_west_1 -o "StrictHostKeyChecking no" ubuntu@$h "killall startApp.sh; killall -s 9 /usr/local/bin/ccn_fetch_test; killall vlc; sleep 3; killall vlc"
done

echo "REMAP: Stopping VLC clients homed off gateway:"
for h in $REMAP_HOSTNAMES 
do
  echo "$SSH_CMD_west_1 -o \"StrictHostKeyChecking no\" ubuntu@$h \"killall startApp.sh; killall -s 9 /usr/local/bin/ccn_fetch_test; killall vlc; sleep 3; killall vlc\""
  $SSH_CMD_west_1 -o "StrictHostKeyChecking no" ubuntu@$h "killall startApp.sh; killall -s 9 /usr/local/bin/ccn_fetch_test; killall vlc; sleep 3; killall vlc"
done

