#!/bin/bash

# Files containing the EC2 hostname for the instance running the current Repo:
# currentRepo.ARIZONA
# currentRepo.CSU
# currentRepo.MEMPHIS
# currentRepo.REMAP
# currentRepo.UCLA
# currentRepo.UIUC
# currentRepo.UCI
# currentRepo.WASHU

ARIZONA_FILENAME="currentRepo.ARIZONA"
CAIDA_FILENAME="currentRepo.CAIDA"
CSU_FILENAME="currentRepo.CSU"
MEMPHIS_FILENAME="currentRepo.MEMPHIS"
REMAP_FILENAME="currentRepo.REMAP"
UCLA_FILENAME="currentRepo.UCLA"
UCI_FILENAME="currentRepo.UCI"
UIUC_FILENAME="currentRepo.UIUC"
WASHU_FILENAME="currentRepo.WASHU"

ARIZONA_HOSTNAME=`grep ec2 currentRepo.ARIZONA  | cut -d' ' -f 2`
CSU_HOSTNAME=`grep ec2 currentRepo.CSU  | cut -d' ' -f 2`
CAIDA_HOSTNAME=`grep ec2 currentRepo.CAIDA  | cut -d' ' -f 2`
MEMPHIS_HOSTNAME=`grep ec2 currentRepo.MEMPHIS  | cut -d' ' -f 2`
REMAP_HOSTNAME=`grep ec2 currentRepo.REMAP  | cut -d' ' -f 2`
UCLA_HOSTNAME=`grep ec2 currentRepo.UCLA  | cut -d' ' -f 2`
UIUC_HOSTNAME=`grep ec2 currentRepo.UIUC  | cut -d' ' -f 2`
UCI_HOSTNAME=`grep ec2 currentRepo.UCI  | cut -d' ' -f 2`
WASHU_HOSTNAME=`grep ec2 currentRepo.WASHU  | cut -d' ' -f 2`

echo "ARIZONA_HOSTNAME = $ARIZONA_HOSTNAME"
echo "CSU_HOSTNAME = $CSU_HOSTNAME"
echo "CAIDA_HOSTNAME = $CAIDA_HOSTNAME"
echo "MEMPHIS_HOSTNAME = $MEMPHIS_HOSTNAME"
echo "REMAP_HOSTNAME = $REMAP_HOSTNAME"
echo "UCLA_HOSTNAME = $UCLA_HOSTNAME"
echo "UIUC_HOSTNAME = $UIUC_HOSTNAME"
echo "UCI_HOSTNAME = $UCI_HOSTNAME"
echo "WASHU_HOSTNAME = $WASHU_HOSTNAME"

echo "ARIZONA: Updating GEC Routes on gateway:"
$ARIZONA_SSH_CMD -o "StrictHostKeyChecking no" "~/GECroutes.sh $ARIZONA_HOSTNAME"

echo "CAIDA: Updating GEC Routes on gateway:"
$CAIDA_SSH_CMD -o "StrictHostKeyChecking no" "~/GECroutes.sh $CAIDA_HOSTNAME"

echo "CSU: Updating GEC Routes on gateway:"
$CSU_SSH_CMD -o "StrictHostKeyChecking no" "~/GECroutes.sh $CSU_HOSTNAME"

echo "MEMPHIS: Updating GEC Routes on gateway:"
$MEMPHIS_SSH_CMD -o "StrictHostKeyChecking no" "~/GECroutes.sh $MEMPHIS_HOSTNAME"

echo "REMAP: Updating GEC Routes on gateway:"
$REMAP_SSH_CMD -o "StrictHostKeyChecking no" "~/GECroutes.sh $REMAP_HOSTNAME"

echo "UCLA: Updating GEC Routes on gateway:"
$UCLA_SSH_CMD -o "StrictHostKeyChecking no" "~/WashU/GECroutes.sh $UCLA_HOSTNAME"

echo "UIUC: Updating GEC Routes on gateway:"
$UIUC_SSH_CMD -o "StrictHostKeyChecking no" "~/GECroutes.sh $UIUC_HOSTNAME"

echo "UCI: Updating GEC Routes on gateway:"
$UCI_SSH_CMD -o "StrictHostKeyChecking no" "~/GECroutes.sh $UCI_HOSTNAME"

echo "WASHU: Updating GEC Routes on gateway:"
$WASHU_SSH_CMD -o "StrictHostKeyChecking no" "~/testbed/GECroutes.sh $WASHU_HOSTNAME"
