#!/bin/bash

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
PKU_FILENAME="currentNDNVIDEO.PKU"
TOKYO_FILENAME="currentNDNVIDEO.TOKYO"
SINGAPORE_FILENAME="currentNDNVIDEO.SINGAPORE"
SYDNEY_FILENAME="currentNDNVIDEO.SYDNEY"
IRELAND_FILENAME="currentNDNVIDEO.IRELAND"
SAOPAULO_FILENAME="currentNDNVIDEO.SAOPAULO"

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
PKU_HOSTNAMES=`grep ec2 currentNDNVIDEO.PKU  | awk '{print $NF}'`
TOKYO_HOSTNAMES=`grep ec2 currentNDNVIDEO.TOKYO  | awk '{print $NF}'`
SINGAPORE_HOSTNAMES=`grep ec2 currentNDNVIDEO.SINGAPORE  | awk '{print $NF}'`
SYDNEY_HOSTNAMES=`grep ec2 currentNDNVIDEO.SYDNEY  | awk '{print $NF}'`
IRELAND_HOSTNAMES=`grep ec2 currentNDNVIDEO.IRELAND  | awk '{print $NF}'`
SAOPAULO_HOSTNAMES=`grep ec2 currentNDNVIDEO.SAOPAULO  | awk '{print $NF}'`

SSH_CMD_east_1="ssh -i /home/jdd/.ssh/AmazonEC2_JDD_east_1.pem"
SSH_CMD_west_1="ssh -i /home/jdd/.ssh/AmazonEC2_JDD_west_1.pem"
SSH_CMD_west_2="ssh -i /home/jdd/.ssh/AmazonEC2_JDD_west_2.pem"
SSH_CMD="ssh -i /home/jdd/.ssh/wu-arl-John"

#EAST REGION
echo "WASHU: Stopping NDNVIDEO clients homed off gateway:"
for h in $WASHU_HOSTNAMES 
do
  echo "$SSH_CMD -o \"UserKnownHostsFile=/dev/null\" -o \"StrictHostKeyChecking=no\" ubuntu@$h \"killall startApp.sh; killall python;\""
  $SSH_CMD -o "UserKnownHostsFile=/dev/null" -o "StrictHostKeyChecking=no" ubuntu@$h "killall startApp.sh; killall python; " &
done

#sleep 10

echo "MEMPHIS: Stopping NDNVIDEO clients homed off gateway:"
for h in $MEMPHIS_HOSTNAMES 
do
  echo "$SSH_CMD -o \"UserKnownHostsFile=/dev/null\" -o \"StrictHostKeyChecking=no\" ubuntu@$h \"killall startApp.sh; killall python\""
  $SSH_CMD -o "UserKnownHostsFile=/dev/null" -o "StrictHostKeyChecking=no" ubuntu@$h "killall startApp.sh; killall python" &
done
#sleep 10
echo "UIUC: Stopping NDNVIDEO clients homed off gateway:"
for h in $UIUC_HOSTNAMES 
do
  echo "$SSH_CMD -o \"UserKnownHostsFile=/dev/null\" -o \"StrictHostKeyChecking=no\" ubuntu@$h \"killall startApp.sh; killall python\""
  $SSH_CMD -o "UserKnownHostsFile=/dev/null" -o "StrictHostKeyChecking=no" ubuntu@$h "killall startApp.sh; killall python" &
done
#sleep 10
echo "NEU: Stopping NDNVIDEO clients homed off gateway:"
for h in $NEU_HOSTNAMES 
do
  echo "$SSH_CMD -o \"UserKnownHostsFile=/dev/null\" -o \"StrictHostKeyChecking=no\" ubuntu@$h \"killall startApp.sh; killall python\""
  $SSH_CMD -o "UserKnownHostsFile=/dev/null" -o "StrictHostKeyChecking=no" ubuntu@$h "killall startApp.sh; killall python" &
done
#sleep 10
#WEST-2 REGION
echo "CSU: Stopping NDNVIDEO clients homed off gateway:"
for h in $CSU_HOSTNAMES 
do
  echo "$SSH_CMD -o \"UserKnownHostsFile=/dev/null\" -o \"StrictHostKeyChecking=no\" ubuntu@$h \"killall startApp.sh; killall python\""
  $SSH_CMD -o "UserKnownHostsFile=/dev/null" -o "StrictHostKeyChecking=no" ubuntu@$h "killall startApp.sh; killall python" &
done
#sleep 10
echo "ARIZONA: Stopping NDNVIDEO clients homed off gateway:"
for h in $ARIZONA_HOSTNAMES 
do
  echo "$SSH_CMD -o \"UserKnownHostsFile=/dev/null\" -o \"StrictHostKeyChecking=no\" ubuntu@$h \"killall startApp.sh; killall python\""
  $SSH_CMD -o "UserKnownHostsFile=/dev/null" -o "StrictHostKeyChecking=no" ubuntu@$h "killall startApp.sh; killall python" &
done
#sleep 10
echo "PARC: Stopping NDNVIDEO clients homed off gateway:"
for h in $PARC_HOSTNAMES 
do
  echo "$SSH_CMD -o \"UserKnownHostsFile=/dev/null\" -o \"StrictHostKeyChecking=no\" ubuntu@$h \"killall startApp.sh; killall python\""
  $SSH_CMD -o "UserKnownHostsFile=/dev/null" -o "StrictHostKeyChecking=no" ubuntu@$h "killall startApp.sh; killall python" &
done
#sleep 10
#WEST-1 REGION
echo "CAIDA: Stopping NDNVIDEO clients homed off gateway:"
for h in $CAIDA_HOSTNAMES 
do
  echo "$SSH_CMD -o \"UserKnownHostsFile=/dev/null\" -o \"StrictHostKeyChecking=no\" ubuntu@$h \"killall startApp.sh; killall python\""
  $SSH_CMD -o "UserKnownHostsFile=/dev/null" -o "StrictHostKeyChecking=no" ubuntu@$h "killall startApp.sh; killall python" &
done
#sleep 10
echo "UCI: Stopping NDNVIDEO clients homed off gateway:"
for h in $UCI_HOSTNAMES 
do
  echo "$SSH_CMD -o \"UserKnownHostsFile=/dev/null\" -o \"StrictHostKeyChecking=no\" ubuntu@$h \"killall startApp.sh; killall python\""
  $SSH_CMD -o "UserKnownHostsFile=/dev/null" -o "StrictHostKeyChecking=no" ubuntu@$h "killall startApp.sh; killall python" &
done
#sleep 10
echo "UCLA: Stopping NDNVIDEO clients homed off gateway:"
for h in $UCLA_HOSTNAMES 
do
  echo "$SSH_CMD -o \"UserKnownHostsFile=/dev/null\" -o \"StrictHostKeyChecking=no\" ubuntu@$h \"killall startApp.sh; killall python\""
  $SSH_CMD -o "UserKnownHostsFile=/dev/null" -o "StrictHostKeyChecking=no" ubuntu@$h "killall startApp.sh; killall python" &
done
#sleep 10
echo "REMAP: Stopping NDNVIDEO clients homed off gateway:"
for h in $REMAP_HOSTNAMES 
do
  echo "$SSH_CMD -o \"UserKnownHostsFile=/dev/null\" -o \"StrictHostKeyChecking=no\" ubuntu@$h \"killall startApp.sh; killall python\""
  $SSH_CMD -o "UserKnownHostsFile=/dev/null" -o "StrictHostKeyChecking=no" ubuntu@$h "killall startApp.sh; killall python" &
done
#sleep 10
echo "PKU: Stopping NDNVIDEO clients homed off gateway:"
for h in $PKU_HOSTNAMES 
do
  echo "$SSH_CMD -o \"UserKnownHostsFile=/dev/null\" -o \"StrictHostKeyChecking=no\" ubuntu@$h \"killall startApp.sh; killall python\""
  $SSH_CMD -o "UserKnownHostsFile=/dev/null" -o "StrictHostKeyChecking=no" ubuntu@$h "killall startApp.sh; killall python" &
done
#sleep 10
echo "TOKYO: Stopping NDNVIDEO clients homed off gateway:"
for h in $TOKYO_HOSTNAMES 
do
  echo "$SSH_CMD -o \"UserKnownHostsFile=/dev/null\" -o \"StrictHostKeyChecking=no\" ubuntu@$h \"killall startApp.sh; killall python\""
  $SSH_CMD -o "UserKnownHostsFile=/dev/null" -o "StrictHostKeyChecking=no" ubuntu@$h "killall startApp.sh; killall python" &
done
#sleep 10
echo "SINGAPORE: Stopping NDNVIDEO clients homed off gateway:"
for h in $SINGAPORE_HOSTNAMES 
do
  echo "$SSH_CMD -o \"UserKnownHostsFile=/dev/null\" -o \"StrictHostKeyChecking=no\" ubuntu@$h \"killall startApp.sh; killall python\""
  $SSH_CMD -o "UserKnownHostsFile=/dev/null" -o "StrictHostKeyChecking=no" ubuntu@$h "killall startApp.sh; killall python" &
done
#sleep 10
echo "SYDNEY: Stopping NDNVIDEO clients homed off gateway:"
for h in $SYDNEY_HOSTNAMES 
do
  echo "$SSH_CMD -o \"UserKnownHostsFile=/dev/null\" -o \"StrictHostKeyChecking=no\" ubuntu@$h \"killall startApp.sh; killall python\""
  $SSH_CMD -o "UserKnownHostsFile=/dev/null" -o "StrictHostKeyChecking=no" ubuntu@$h "killall startApp.sh; killall python" &
done
#sleep 10
echo "IRELAND: Stopping NDNVIDEO clients homed off gateway:"
for h in $IRELAND_HOSTNAMES 
do
  echo "$SSH_CMD -o \"UserKnownHostsFile=/dev/null\" -o \"StrictHostKeyChecking=no\" ubuntu@$h \"killall startApp.sh; killall python\""
  $SSH_CMD -o "UserKnownHostsFile=/dev/null" -o "StrictHostKeyChecking=no" ubuntu@$h "killall startApp.sh; killall python" &
done
#sleep 10
echo "SAOPAULO: Stopping NDNVIDEO clients homed off gateway:"
for h in $SAOPAULO_HOSTNAMES 
do
  echo "$SSH_CMD -o \"UserKnownHostsFile=/dev/null\" -o \"StrictHostKeyChecking=no\" ubuntu@$h \"killall startApp.sh; killall python\""
  $SSH_CMD -o "UserKnownHostsFile=/dev/null" -o "StrictHostKeyChecking=no" ubuntu@$h "killall startApp.sh; killall python" &
done
