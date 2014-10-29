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
E1_CLIENT_HOSTS=(`grep ec2 currentClient.E1  | awk '{print $2}'`)
W1_CLIENT_HOSTS=(`grep ec2 currentClient.W1  | awk '{print $2}'`)
W2_CLIENT_HOSTS=(`grep ec2 currentClient.W2  | awk '{print $2}'`)
E1_CLIENT_HOST_LIST=`grep ec2 currentClient.E1  | awk '{print $2}'`
W1_CLIENT_HOST_LIST=`grep ec2 currentClient.W1  | awk '{print $2}'`
W2_CLIENT_HOST_LIST=`grep ec2 currentClient.W2  | awk '{print $2}'`


echo ""
echo "Clients"
# kill the clients
source ./counts.sh
# COUNT_L2_PROXY=3
# COUNT_CLIENTS_PER_PROXY=2
# COUNT_CLIENTS_PER_REGION=$(($COUNT_CLIENTS_PER_PROXY * (1 + $COUNT_L2_PROXY)))
#E1_CLIENT_HOSTS=`grep ec2 currentClient.E1  | awk '{print $2}'`
#W1_CLIENT_HOSTS=`grep ec2 currentClient.W1  | awk '{print $2}'`
#W2_CLIENT_HOSTS=`grep ec2 currentClient.W2  | awk '{print $2}'`
#start E1 clients
i=0
echo " E1"
for l2 in $E1_CLIENT_HOST_LIST
do
  echo "  $SSH_CMD  -o \"UserKnownHostsFile=/dev/null\" -o \"StrictHostKeyChecking no\"  ubuntu@$l2 \"sudo killall vlc tcpdump\" "
  $SSH_CMD  -o "UserKnownHostsFile=/dev/null" -o "StrictHostKeyChecking no"  ubuntu@$l2 "sudo killall vlc tcpdump" &
done

echo " W1"
for l2 in $W1_CLIENT_HOST_LIST
do
  echo "  $SSH_CMD  -o \"UserKnownHostsFile=/dev/null\" -o \"StrictHostKeyChecking no\"  ubuntu@$l2 \"sudo killall vlc tcpdump\" "
  $SSH_CMD  -o "UserKnownHostsFile=/dev/null" -o "StrictHostKeyChecking no"  ubuntu@$l2 "sudo killall vlc tcpdump" &
done

echo " W2"
for l2 in $W2_CLIENT_HOST_LIST
do
  echo "  $SSH_CMD  -o \"UserKnownHostsFile=/dev/null\" -o \"StrictHostKeyChecking no\"  ubuntu@$l2 \"sudo killall vlc tcpdump\" "
  $SSH_CMD  -o "UserKnownHostsFile=/dev/null" -o "StrictHostKeyChecking no"  ubuntu@$l2 "sudo killall vlc tcpdump" &
done



echo ""
echo "L1 Proxies"
# kill L1 proxies, one in each region
echo " $SSH_CMD  -o \"UserKnownHostsFile=/dev/null\" -o \"StrictHostKeyChecking no\"  ubuntu@$E1_L1_PROXY_HOST \"sudo killall varnishd tcpdump\" "
$SSH_CMD  -o "UserKnownHostsFile=/dev/null" -o "StrictHostKeyChecking no"  ubuntu@$E1_L1_PROXY_HOST "sudo killall varnishd tcpdump" &

echo " $SSH_CMD  -o \"UserKnownHostsFile=/dev/null\" -o \"StrictHostKeyChecking no\"  ubuntu@$W1_L1_PROXY_HOST \"sudo killall varnishd  tcpdump\" "
$SSH_CMD  -o "UserKnownHostsFile=/dev/null" -o "StrictHostKeyChecking no"  ubuntu@$W1_L1_PROXY_HOST "sudo killall varnishd tcpdump" &

echo " $SSH_CMD  -o \"UserKnownHostsFile=/dev/null\" -o \"StrictHostKeyChecking no\"  ubuntu@$W2_L1_PROXY_HOST \"sudo killall varnishd  tcpdump\" "
$SSH_CMD  -o "UserKnownHostsFile=/dev/null" -o "StrictHostKeyChecking no"  ubuntu@$W2_L1_PROXY_HOST "sudo killall varnishd tcpdump" &

echo ""
echo "L2 Proxies"
# start L2 proxies in each region
#E1_L2_PROXY_HOSTS
#W1_L2_PROXY_HOSTS
#W2_L2_PROXY_HOSTS
echo " E1"
for l2 in $E1_L2_PROXY_HOSTS
do
  echo "  $SSH_CMD  -o \"UserKnownHostsFile=/dev/null\" -o \"StrictHostKeyChecking no\"  ubuntu@$l2 \"sudo killall varnishd tcpdump\" "
  $SSH_CMD  -o "UserKnownHostsFile=/dev/null" -o "StrictHostKeyChecking no"  ubuntu@$l2 "sudo killall varnishd tcpdump" &
done

echo " W1"
for l2 in $W1_L2_PROXY_HOSTS
do
  echo "  $SSH_CMD  -o \"UserKnownHostsFile=/dev/null\" -o \"StrictHostKeyChecking no\"  ubuntu@$l2 \"sudo killall varnishd tcpdump\" "
  $SSH_CMD  -o "UserKnownHostsFile=/dev/null" -o "StrictHostKeyChecking no"  ubuntu@$l2 "sudo killall varnishd tcpdump" &
done

echo " W2"
for l2 in $W2_L2_PROXY_HOSTS
do
  echo "  $SSH_CMD  -o \"UserKnownHostsFile=/dev/null\" -o \"StrictHostKeyChecking no\"  ubuntu@$l2 \"sudo killall varnishd tcpdump\" "
  $SSH_CMD  -o "UserKnownHostsFile=/dev/null" -o "StrictHostKeyChecking no"  ubuntu@$l2 "sudo killall varnishd tcpdump" &
done

echo ""
echo "Server"
# kill the server
echo " $SSH_CMD  -o \"UserKnownHostsFile=/dev/null\" -o \"StrictHostKeyChecking no\"  ubuntu@$SERVER_HOST \"sudo killall vlc lighttpd tcpdump\" "
$SSH_CMD  -o "UserKnownHostsFile=/dev/null" -o "StrictHostKeyChecking no"  ubuntu@$SERVER_HOST "sudo killall vlc lighttpd tcpdump" &
#echo " $SSH_CMD  -o \"UserKnownHostsFile=/dev/null\" -o \"StrictHostKeyChecking no\"  ubuntu@$SERVER_HOST \"sudo killall lighttpd\" "
#$SSH_CMD  -o "UserKnownHostsFile=/dev/null" -o "StrictHostKeyChecking no"  ubuntu@$SERVER_HOST "sudo killall lighttpd" &

