#!/bin/bash

# Files containing the EC2 hostname for the instance running the current Chat servers:
# currentChatServer1.UCI
# currentChatServer2.WASHU
# currentChatServer3.ARIZONA

SERVER1_FILENAME="currentChatServer1.UCI"
SERVER2_FILENAME="currentChatServer2.WASHU"
SERVER3_FILENAME="currentChatServer3.ARIZONA"

SERVER1_HOSTNAME=`grep ec2 currentChatServer1.UCI  | awk '{print $NF}'`
SERVER2_HOSTNAME=`grep ec2 currentChatServer2.WASHU  | awk '{print $NF}'`
SERVER3_HOSTNAME=`grep ec2 currentChatServer3.ARIZONA  | awk '{print $NF}'`

SSH_CMD_east_1="ssh -i /home/jdd/.ssh/AmazonEC2_JDD_east_1.pem"
SSH_CMD_west_1="ssh -i /home/jdd/.ssh/AmazonEC2_JDD_west_1.pem"
SSH_CMD_west_2="ssh -i /home/jdd/.ssh/AmazonEC2_JDD_west_2.pem"

echo "SERVER1: Stopping Chat Server1 :"
for h in $SERVER1_HOSTNAME 
do
  echo "$SSH_CMD_west_1 -o \"StrictHostKeyChecking no\" ubuntu@$h \"killall startApp.sh; killall ccnchat; killall java\""
  $SSH_CMD_west_1 -o "StrictHostKeyChecking no" ubuntu@$h "killall startApp.sh; killall ccnchat; killall java"
done

echo "SERVER2: Stopping Chat Server2 :"
for h in $SERVER2_HOSTNAME 
do
  echo "$SSH_CMD_east_1 -o \"StrictHostKeyChecking no\" ubuntu@$h \"killall startApp.sh; killall ccnchat; killall java\""
  $SSH_CMD_east_1 -o "StrictHostKeyChecking no" ubuntu@$h "killall startApp.sh; killall ccnchat; killall java"
done

echo "SERVER3: Stopping Chat Server3 :"
for h in $SERVER3_HOSTNAME 
do
  echo "$SSH_CMD_west_2 -o \"StrictHostKeyChecking no\" ubuntu@$h \"killall startApp.sh; killall ccnchat; killall java\""
  $SSH_CMD_west_2 -o "StrictHostKeyChecking no" ubuntu@$h "killall startApp.sh; killall ccnchat; killall java"
done

