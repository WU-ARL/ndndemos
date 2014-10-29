#!/bin/bash

# Files containing the EC2 hostname for the instance running the current Gateway :

TOKYO_FILENAME="currentGATEWAY.TOKYO"
SINGAPORE_FILENAME="currentGATEWAY.SINGAPORE"
SYDNEY_FILENAME="currentGATEWAY.SYDNEY"
IRELAND_FILENAME="currentGATEWAY.IRELAND"
SAOPAULO_FILENAME="currentGATEWAY.SAOPAULO"

TOKYO_HOSTNAMES=`grep ec2 currentGATEWAY.TOKYO  | awk '{print $NF}'`
SINGAPORE_HOSTNAMES=`grep ec2 currentGATEWAY.SINGAPORE  | awk '{print $NF}'`
SYDNEY_HOSTNAMES=`grep ec2 currentGATEWAY.SYDNEY  | awk '{print $NF}'`
IRELAND_HOSTNAMES=`grep ec2 currentGATEWAY.IRELAND  | awk '{print $NF}'`
SAOPAULO_HOSTNAMES=`grep ec2 currentGATEWAY.SAOPAULO  | awk '{print $NF}'`

SSH_CMD="ssh -i /home/jdd/.ssh/wu-arl-John"

echo "TOKYO: Re-starting CCNX on GATEWAY :"
for h in $TOKYO_HOSTNAMES 
do
  echo "$SSH_CMD -o \"UserKnownHostsFile=/dev/null\" -o \"StrictHostKeyChecking no\" ubuntu@$h \"sudo /root/NDN/kill.sh; sudo /root/NDN/start.sh\""
  $SSH_CMD -o "UserKnownHostsFile=/dev/null" -o "StrictHostKeyChecking no" ubuntu@$h "sudo /root/NDN/kill.sh; sudo /root/NDN/start.sh"  &
done

sleep 10


echo "SINGAPORE: Re-starting CCNX on GATEWAY:"
for h in $SINGAPORE_HOSTNAMES 
do
  echo "$SSH_CMD -o \"UserKnownHostsFile=/dev/null\" -o \"StrictHostKeyChecking no\" ubuntu@$h \"sudo /root/NDN/kill.sh; sudo /root/NDN/start.sh\""
  $SSH_CMD -o "UserKnownHostsFile=/dev/null" -o "StrictHostKeyChecking no" ubuntu@$h "sudo /root/NDN/kill.sh; sudo /root/NDN/start.sh"  &
done

sleep 10


echo "SYDNEY: Re-starting CCNX on GATEWAY:"
for h in $SYDNEY_HOSTNAMES 
do
  echo "$SSH_CMD -o \"UserKnownHostsFile=/dev/null\" -o \"StrictHostKeyChecking no\" ubuntu@$h \"sudo /root/NDN/kill.sh; sudo /root/NDN/start.sh\""
  $SSH_CMD -o "UserKnownHostsFile=/dev/null" -o "StrictHostKeyChecking no" ubuntu@$h "sudo /root/NDN/kill.sh; sudo /root/NDN/start.sh"  &
done

sleep 10


echo "IRELAND: Re-starting CCNX on GATEWAY:"
for h in $IRELAND_HOSTNAMES 
do
  echo "$SSH_CMD -o \"UserKnownHostsFile=/dev/null\" -o \"StrictHostKeyChecking no\" ubuntu@$h \"sudo /root/NDN/kill.sh; sudo /root/NDN/start.sh\""
  $SSH_CMD -o "UserKnownHostsFile=/dev/null" -o "StrictHostKeyChecking no" ubuntu@$h "sudo /root/NDN/kill.sh; sudo /root/NDN/start.sh"  &
done

sleep 10


echo "SAOPAULO: Re-starting CCNX on GATEWAY:"
for h in $SAOPAULO_HOSTNAMES 
do
  echo "$SSH_CMD -o \"UserKnownHostsFile=/dev/null\" -o \"StrictHostKeyChecking no\" ubuntu@$h \"sudo /root/NDN/kill.sh; sudo /root/NDN/start.sh\""
  $SSH_CMD -o "UserKnownHostsFile=/dev/null" -o "StrictHostKeyChecking no" ubuntu@$h "sudo /root/NDN/kill.sh; sudo /root/NDN/start.sh"  &
done

