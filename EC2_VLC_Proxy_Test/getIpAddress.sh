#!/bin/bash

# Files with EC2 public DNS hostnames in them
#currentClient.E1
#currentClient.W1
#currentClient.W2
#currentProxy.L1.E1
#currentProxy.L1.W1
#currentProxy.L1.W2
#currentProxy.L2.E1
#currentProxy.L2.W1
#currentProxy.L2.W2
#currentServer.E1

SSH_CMD="ssh -i /home/jdd/.ssh/wu-arl-John"

GET_LOCAL_IP_CMD="ifconfig eth0 | grep \"inet addr\" | cut -d ':' -f 2 | cut -d ' ' -f 1"

SERVER_HOST=`grep ec2 currentServer.E1  | awk '{print $2}'`
E1_L1_PROXY_HOST=`grep ec2 currentProxy.L1.E1  | awk '{print $2}'`
W1_L1_PROXY_HOST=`grep ec2 currentProxy.L1.W1  | awk '{print $2}'`
W2_L1_PROXY_HOST=`grep ec2 currentProxy.L1.W2  | awk '{print $2}'`
E1_L2_PROXY_HOSTS=`grep ec2 currentProxy.L2.E1  | awk '{print $2}'`
W1_L2_PROXY_HOSTS=`grep ec2 currentProxy.L2.W1  | awk '{print $2}'`
W2_L2_PROXY_HOSTS=`grep ec2 currentProxy.L2.W2  | awk '{print $2}'`
E1_CLIENT_HOSTS=`grep ec2 currentClient.E1  | awk '{print $2}'`
W1_CLIENT_HOSTS=`grep ec2 currentClient.W1  | awk '{print $2}'`
W2_CLIENT_HOSTS=`grep ec2 currentClient.W2  | awk '{print $2}'`

echo "Server: $SERVER_HOST"
echo "E1 L1 Proxy: $E1_L1_PROXY_HOST"
echo "W1 L1 Proxy: $W1_L1_PROXY_HOST"
echo "W2 L1 Proxy: $W2_L1_PROXY_HOST"
echo "E1 L2 Proxys: $E1_L2_PROXY_HOSTS"
echo "W1 L2 Proxys: $W1_L2_PROXY_HOSTS"
echo "W2 L2 Proxys: $W2_L2_PROXY_HOSTS"
echo "E1 Clients: $E1_CLIENT_HOSTS"
echo "W1 Clients: $W1_CLIENT_HOSTS"
echo "W2 Clients: $W2_CLIENT_HOSTS"

echo "Getting Server IP info"
SERVER_LOCAL_IP=`$SSH_CMD  -o "UserKnownHostsFile=/dev/null" -o "StrictHostKeyChecking no"  ubuntu@$SERVER_HOST "$GET_LOCAL_IP_CMD"`
SERVER_PUBLIC_IP=`host $SERVER_HOST | awk '{print $4}'`
echo "Getting E1 L1 Proxy IP info"
E1_L1_PROXY_LOCAL_IP=`$SSH_CMD  -o "UserKnownHostsFile=/dev/null" -o "StrictHostKeyChecking no"  ubuntu@$E1_L1_PROXY_HOST "$GET_LOCAL_IP_CMD"`
E1_L1_PROXY_PUBLIC_IP=`host $E1_L1_PROXY_HOST | awk '{print $4}'`
echo "Getting W2 L1 Proxy IP info"
W2_L1_PROXY_LOCAL_IP=`$SSH_CMD  -o "UserKnownHostsFile=/dev/null" -o "StrictHostKeyChecking no"  ubuntu@$W2_L1_PROXY_HOST "$GET_LOCAL_IP_CMD"`
W2_L1_PROXY_PUBLIC_IP=`host $W2_L1_PROXY_HOST | awk '{print $4}'`
#echo "Getting W1 L1 Proxy IP info"
#W1_L1_PROXY_LOCAL_IP=`$SSH_CMD  -o "UserKnownHostsFile=/dev/null" -o "StrictHostKeyChecking no"  ubuntu@$W1_L1_PROXY_HOST "$GET_LOCAL_IP_CMD"`
#W1_L1_PROXY_PUBLIC_IP=`host $W1_L1_PROXY_HOST | awk '{print $4}'`


echo "Server Local IP: $SERVER_LOCAL_IP"
echo "Server Public IP: $SERVER_PUBLIC_IP"
echo "E1 L1 Proxy Local IP: $E1_L1_PROXY_LOCAL_IP"
echo "E1 L1 Proxy Public IP: $E1_L1_PROXY_PUBLIC_IP"
echo "W1 L1 Proxy Local IP: $W1_L1_PROXY_LOCAL_IP"
echo "W1 L1 Proxy Public IP: $W1_L1_PROXY_PUBLIC_IP"
echo "W2 L1 Proxy Local IP: $W2_L1_PROXY_LOCAL_IP"
echo "W2 L1 Proxy Public IP: $W2_L1_PROXY_PUBLIC_IP"

source ./counts.sh



# COUNT_L2_PROXY=3
# COUNT_CLIENTS_PER_PROXY=2
# COUNT_CLIENTS_PER_REGION=$(($COUNT_CLIENTS_PER_PROXY * (1 + $COUNT_L2_PROXY)))



exit 0

if [ $# != 1 ]
then
  echo "Usage: $0 <hostname>"
  exit 0
else
  INT_IP=`ssh -i ~/.ssh/wu-arl-John ubuntu@$1 " ifconfig eth0 | grep \"inet addr\" | cut -d ':' -f 2 | cut -d ' ' -f 1"`
  echo "INT_IP = $INT_IP"
fi



