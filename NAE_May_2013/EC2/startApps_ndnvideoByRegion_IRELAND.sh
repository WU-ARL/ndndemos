#!/bin/bash

UIUC_VIDEO="/ndn/uiuc.edu/apps/video"
MEMPHIS_VIDEO="/ndn/memphis.edu/netlabs/apps/video"
ARIZONA_VIDEO="/ndn/arizona.edu/apps/video"
UCLA_VIDEO="/ndn/ucla.edu/apps/video"
CAIDA_VIDEO="/ndn/caida.org/apps/video"

VIDEO1=$UCLA_VIDEO
VIDEO2=$ARIZONA_VIDEO
VIDEO3=$CAIDA_VIDEO

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
PKU_FILENAME="currentNDNVIDEO.PKU"
WASHU_FILENAME="currentNDNVIDEO.WASHU"
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
PKU_HOSTNAMES=`grep ec2 currentNDNVIDEO.PKU  | awk '{print $NF}'`
WASHU_HOSTNAMES=`grep ec2 currentNDNVIDEO.WASHU  | awk '{print $NF}'`
TOKYO_HOSTNAMES=`grep ec2 currentNDNVIDEO.TOKYO  | awk '{print $NF}'`
SINGAPORE_HOSTNAMES=`grep ec2 currentNDNVIDEO.SINGAPORE  | awk '{print $NF}'`
SYDNEY_HOSTNAMES=`grep ec2 currentNDNVIDEO.SYDNEY  | awk '{print $NF}'`
IRELAND_HOSTNAMES=`grep ec2 currentNDNVIDEO.IRELAND  | awk '{print $NF}'`
SAOPAULO_HOSTNAMES=`grep ec2 currentNDNVIDEO.SAOPAULO  | awk '{print $NF}'`

SSH_CMD_east_1="ssh -i /home/jdd/.ssh/AmazonEC2_JDD_east_1.pem"
SSH_CMD_west_1="ssh -i /home/jdd/.ssh/AmazonEC2_JDD_west_1.pem"
SSH_CMD_west_2="ssh -i /home/jdd/.ssh/AmazonEC2_JDD_west_2.pem"

VIDEOFILE=$VIDEO1

echo "IRELAND: Starting NDNVIDEO clients homed off gateway:"
for h in $IRELAND_HOSTNAMES 
do
  echo "$SSH_CMD_west_1 -o \"UserKnownHostsFile=/dev/null\" -o \"StrictHostKeyChecking no\" ubuntu@$h \"~/startApp.sh $VIDEOFILE\""
  $SSH_CMD_west_1 -o "UserKnownHostsFile=/dev/null" -o "StrictHostKeyChecking no" ubuntu@$h "~/startApp.sh $VIDEOFILE" &
  if [ "$VIDEOFILE" = "$VIDEO1" ]
  then
    VIDEOFILE=$VIDEO2
  else
    if [ "$VIDEOFILE" = "$VIDEO2" ]
    then
      VIDEOFILE=$VIDEO3
    else
      if [ "$VIDEOFILE" = "$VIDEO3" ]
      then
        VIDEOFILE=$VIDEO1
      fi
    fi
  fi
done


