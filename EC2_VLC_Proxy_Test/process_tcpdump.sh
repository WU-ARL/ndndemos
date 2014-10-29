#!/bin/bash

RUNCLIENTS=1
RUNPROXIES=1
RUNSERVER=1
RUNCLIENTSL1=1
RUNCLIENTSL2=1

while [ $# -gt 0 ]
do
  if [ $1 = "-c" ]
  then
    RUNCLIENTS=0
    shift
  elif [ $1 = "-1" ]
  then
    RUNCLIENTSL1=0
    shift
  elif [ $1 = "-2" ]
  then
    RUNCLIENTSL2=0
    shift
  elif [ $1 = "-p" ]
  then
    RUNPROXIES=0
    shift
  elif [ $1 = "-s" ]
  then
    RUNSERVER=0
    shift
  else
    echo "Usage: $0 [-c] [-p] [-s] [-1] [-2]"
    exit 0
  fi
done

echo "RUNCLIENTS: $RUNCLIENTS"
echo "RUNPROXIES: $RUNPROXIES"
echo "RUNSERVER: $RUNSERVER"

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



#echo "Server: $SERVER_HOST"
#echo "E1 L1 Proxy: $E1_L1_PROXY_HOST"
#echo "W1 L1 Proxy: $W1_L1_PROXY_HOST"
#echo "W2 L1 Proxy: $W2_L1_PROXY_HOST"
#echo "E1 L2 Proxys: $E1_L2_PROXY_HOSTS"
#echo "W1 L2 Proxys: $W1_L2_PROXY_HOSTS"
#echo "W2 L2 Proxys: $W2_L2_PROXY_HOSTS"
#echo "E1 Clients: ${E1_CLIENT_HOSTS[*]}"
#echo "W1 Clients: ${W1_CLIENT_HOSTS[*]}"
#echo "W2 Clients: ${W2_CLIENT_HOSTS[*]}"

#echo "Getting Server IP info"
SERVER_LOCAL_IP=`$SSH_CMD  -o "UserKnownHostsFile=/dev/null" -o "StrictHostKeyChecking no"  ubuntu@$SERVER_HOST "$GET_LOCAL_IP_CMD"`
SERVER_PUBLIC_IP=`host $SERVER_HOST | awk '{print $4}'`
#echo "Getting E1 L1 Proxy IP info"
E1_L1_PROXY_LOCAL_IP=`$SSH_CMD  -o "UserKnownHostsFile=/dev/null" -o "StrictHostKeyChecking no"  ubuntu@$E1_L1_PROXY_HOST "$GET_LOCAL_IP_CMD"`
E1_L1_PROXY_PUBLIC_IP=`host $E1_L1_PROXY_HOST | awk '{print $4}'`
#echo "Getting W2 L1 Proxy IP info"
W2_L1_PROXY_LOCAL_IP=`$SSH_CMD  -o "UserKnownHostsFile=/dev/null" -o "StrictHostKeyChecking no"  ubuntu@$W2_L1_PROXY_HOST "$GET_LOCAL_IP_CMD"`
W2_L1_PROXY_PUBLIC_IP=`host $W2_L1_PROXY_HOST | awk '{print $4}'`
#echo "Getting W1 L1 Proxy IP info"
W1_L1_PROXY_LOCAL_IP=`$SSH_CMD  -o "UserKnownHostsFile=/dev/null" -o "StrictHostKeyChecking no"  ubuntu@$W1_L1_PROXY_HOST "$GET_LOCAL_IP_CMD"`
W1_L1_PROXY_PUBLIC_IP=`host $W1_L1_PROXY_HOST | awk '{print $4}'`


#echo "Server Local IP: $SERVER_LOCAL_IP"
#echo "Server Public IP: $SERVER_PUBLIC_IP"
#echo "E1 L1 Proxy Local IP: $E1_L1_PROXY_LOCAL_IP"
#echo "E1 L1 Proxy Public IP: $E1_L1_PROXY_PUBLIC_IP"
#echo "W1 L1 Proxy Local IP: $W1_L1_PROXY_LOCAL_IP"
#echo "W1 L1 Proxy Public IP: $W1_L1_PROXY_PUBLIC_IP"
#echo "W2 L1 Proxy Local IP: $W2_L1_PROXY_LOCAL_IP"
#echo "W2 L1 Proxy Public IP: $W2_L1_PROXY_PUBLIC_IP"

#$SSH_CMD  -o "UserKnownHostsFile=/dev/null" -o "StrictHostKeyChecking no"  ubuntu@$SERVER_HOST "sudo tcpdump -ex -i eth0 -r tcpdump.eth0 src port 8080   | grep length " > Server.tcpdump.src.txt
#$SSH_CMD  -o "UserKnownHostsFile=/dev/null" -o "StrictHostKeyChecking no"  ubuntu@$SERVER_HOST "sudo tcpdump -ex -i eth0 -r tcpdump.eth0 dst port 8080   | grep length " > Server.tcpdump.dst.txt

if [ $RUNPROXIES -eq 1 ]
then
  echo ""
  echo "L1 Proxies"
  # start L1 proxies, one in each region
  $SSH_CMD  -o "UserKnownHostsFile=/dev/null" -o "StrictHostKeyChecking no"  ubuntu@$E1_L1_PROXY_HOST "sudo tcpdump -ex -i eth0 -r tcpdump.eth0 src host $SERVER_LOCAL_IP and src port 8080   | grep length | awk '{print \$NF}'" > E1_L1_src_8080_from_Server.txt
  $SSH_CMD  -o "UserKnownHostsFile=/dev/null" -o "StrictHostKeyChecking no"  ubuntu@$E1_L1_PROXY_HOST "sudo tcpdump -ex -i eth0 -r tcpdump.eth0 src host $E1_L1_PROXY_LOCAL_IP and src port 8080   | grep length | awk '{print \$NF}'" > E1_L1_src_8080_from_Proxy.txt

  $SSH_CMD  -o "UserKnownHostsFile=/dev/null" -o "StrictHostKeyChecking no"  ubuntu@$W1_L1_PROXY_HOST "sudo tcpdump -ex -i eth0 -r tcpdump.eth0 src host $SERVER_PUBLIC_IP and src port 8080   | grep length | awk '{print \$NF}'" > W1_L1_src_8080_from_Server.txt
  $SSH_CMD  -o "UserKnownHostsFile=/dev/null" -o "StrictHostKeyChecking no"  ubuntu@$W1_L1_PROXY_HOST "sudo tcpdump -ex -i eth0 -r tcpdump.eth0 src host $W1_L1_PROXY_LOCAL_IP and src port 8080   | grep length | awk '{print \$NF}'" > W1_L1_src_8080_from_Proxy.txt

  $SSH_CMD  -o "UserKnownHostsFile=/dev/null" -o "StrictHostKeyChecking no"  ubuntu@$W2_L1_PROXY_HOST "sudo tcpdump -ex -i eth0 -r tcpdump.eth0 src host $SERVER_PUBLIC_IP and src port 8080   | grep length | awk '{print \$NF}'" > W2_L1_src_8080_from_Server.txt
  $SSH_CMD  -o "UserKnownHostsFile=/dev/null" -o "StrictHostKeyChecking no"  ubuntu@$W2_L1_PROXY_HOST "sudo tcpdump -ex -i eth0 -r tcpdump.eth0 src host $W2_L1_PROXY_LOCAL_IP and src port 8080   | grep length | awk '{print \$NF}'" > W2_L1_src_8080_from_Proxy.txt
  
  echo ""
  echo "L2 Proxies"
  # start L2 proxies in each region
  #E1_L2_PROXY_HOSTS
  #W1_L2_PROXY_HOSTS
  #W2_L2_PROXY_HOSTS
  echo " E1"
  for l2 in $E1_L2_PROXY_HOSTS
  do
    #echo "E1_L2_PROXY_HOST: $l2"
    l2_local_ip=`$SSH_CMD  -o "UserKnownHostsFile=/dev/null" -o "StrictHostKeyChecking no"  ubuntu@$l2 "$GET_LOCAL_IP_CMD"`
    E1_L2_LOCAL_IPS="$E1_L2_LOCAL_IPS $l2_local_ip"
    $SSH_CMD  -o "UserKnownHostsFile=/dev/null" -o "StrictHostKeyChecking no"  ubuntu@$l2 "sudo tcpdump -ex -i eth0 -r tcpdump.eth0 src host $E1_L1_PROXY_LOCAL_IP and src port 8080   | grep length | awk '{print \$NF}'" > E1_L2_src_8080_from_L1.txt.$l2
    $SSH_CMD  -o "UserKnownHostsFile=/dev/null" -o "StrictHostKeyChecking no"  ubuntu@$l2 "sudo tcpdump -ex -i eth0 -r tcpdump.eth0 src host $l2_local_ip and src port 8080   | grep length | awk '{print \$NF}'" > E1_L2_src_8080_from_Proxy.txt.$l2
  done
  
  echo " W1"
  for l2 in $W1_L2_PROXY_HOSTS
  do
    #echo "W1_L2_PROXY_HOST: $l2"
    l2_local_ip=`$SSH_CMD  -o "UserKnownHostsFile=/dev/null" -o "StrictHostKeyChecking no"  ubuntu@$l2 "$GET_LOCAL_IP_CMD"`
    $SSH_CMD  -o "UserKnownHostsFile=/dev/null" -o "StrictHostKeyChecking no"  ubuntu@$l2 "sudo tcpdump -ex -i eth0 -r tcpdump.eth0 src host $W1_L1_PROXY_LOCAL_IP and src port 8080   | grep length | awk '{print \$NF}'" > W1_L2_src_8080_from_L1.txt.$l2
    $SSH_CMD  -o "UserKnownHostsFile=/dev/null" -o "StrictHostKeyChecking no"  ubuntu@$l2 "sudo tcpdump -ex -i eth0 -r tcpdump.eth0 src host $l2_local_ip and src port 8080   | grep length | awk '{print \$NF}'" > W1_L2_src_8080_from_Proxy.txt.$l2
    W1_L2_LOCAL_IPS="$W1_L2_LOCAL_IPS $l2_local_ip"
  done
  
  echo " W2"
  for l2 in $W2_L2_PROXY_HOSTS
  do
    #echo "W2_L2_PROXY_HOST: $l2"
    l2_local_ip=`$SSH_CMD  -o "UserKnownHostsFile=/dev/null" -o "StrictHostKeyChecking no"  ubuntu@$l2 "$GET_LOCAL_IP_CMD"`
    $SSH_CMD  -o "UserKnownHostsFile=/dev/null" -o "StrictHostKeyChecking no"  ubuntu@$l2 "sudo tcpdump -ex -i eth0 -r tcpdump.eth0 src host $W2_L1_PROXY_LOCAL_IP and src port 8080   | grep length | awk '{print \$NF}'" > W2_L2_src_8080_from_L1.txt.$l2
    $SSH_CMD  -o "UserKnownHostsFile=/dev/null" -o "StrictHostKeyChecking no"  ubuntu@$l2 "sudo tcpdump -ex -i eth0 -r tcpdump.eth0 src host $l2_local_ip and src port 8080   | grep length | awk '{print \$NF}'" > W2_L2_src_8080_from_Proxy.txt.$l2
    W2_L2_LOCAL_IPS="$W2_L2_LOCAL_IPS $l2_local_ip"
  done
fi
  

if [ $RUNCLIENTS -eq 1 ]
then
  echo ""
  echo "Clients"
  # start the clients
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
  if [ $RUNCLIENTSL1 -eq 1 ]
  then
    echo "  L1"
    j=0
    while [ $j -lt $COUNT_CLIENTS_PER_PROXY ]
    do
      #echo "client[$i] = ${E1_CLIENT_HOSTS[$i]}"
      #client_local_ip=`$SSH_CMD  -o "UserKnownHostsFile=/dev/null" -o "StrictHostKeyChecking no"  ubuntu@${E1_CLIENT_HOSTS[$i]} "$GET_LOCAL_IP_CMD"`
      $SSH_CMD  -o "UserKnownHostsFile=/dev/null" -o "StrictHostKeyChecking no"  ubuntu@${E1_CLIENT_HOSTS[$i]} "sudo tcpdump -ex -i eth0 -r tcpdump.eth0 src host $E1_L1_PROXY_LOCAL_IP and src port 8080   | grep length | awk '{print \$NF}'" > E1_Client${i}_src_8080_from_Proxy.txt.${E1_CLIENT_HOSTS[$i]} &
      i=$(($i+1))
      j=$(($j+1))
    done
  fi
  wait
  
  if [ $RUNCLIENTSL2 -eq 1 ]
  then
    for l2 in $E1_L2_LOCAL_IPS
    do
      echo "  L2"
      j=0
      while [ $j -lt $COUNT_CLIENTS_PER_PROXY ]
      do
        #echo "client[$i] = ${E1_CLIENT_HOSTS[$i]}"
        #client_local_ip=`$SSH_CMD  -o "UserKnownHostsFile=/dev/null" -o "StrictHostKeyChecking no"  ubuntu@${E1_CLIENT_HOSTS[$i]} "$GET_LOCAL_IP_CMD"`
      $SSH_CMD  -o "UserKnownHostsFile=/dev/null" -o "StrictHostKeyChecking no"  ubuntu@${E1_CLIENT_HOSTS[$i]} "sudo tcpdump -ex -i eth0 -r tcpdump.eth0 src host $l2 and src port 8080   | grep length | awk '{print \$NF}'" > E1_Client${i}_src_8080_from_Proxy.txt.${E1_CLIENT_HOSTS[$i]} &
        i=$(($i+1))
        j=$(($j+1))
      done
    done
  fi
  wait

  i=0
  echo " W1"
  if [ $RUNCLIENTSL1 -eq 1 ]
  then
    echo "  L1"
    j=0
    while [ $j -lt $COUNT_CLIENTS_PER_PROXY ]
    do
      #echo "client[$i] = ${W1_CLIENT_HOSTS[$i]}"
      #client_local_ip=`$SSH_CMD  -o "UserKnownHostsFile=/dev/null" -o "StrictHostKeyChecking no"  ubuntu@${W1_CLIENT_HOSTS[$i]} "$GET_LOCAL_IP_CMD"`
      $SSH_CMD  -o "UserKnownHostsFile=/dev/null" -o "StrictHostKeyChecking no"  ubuntu@${W1_CLIENT_HOSTS[$i]} "sudo tcpdump -ex -i eth0 -r tcpdump.eth0 src host $W1_L1_PROXY_LOCAL_IP and src port 8080   | grep length | awk '{print \$NF}'" > W1_Client${i}_src_8080_from_Proxy.txt.${W1_CLIENT_HOSTS[$i]} &
      i=$(($i+1))
      j=$(($j+1))
    done
  fi
  wait
  
  if [ $RUNCLIENTSL2 -eq 1 ]
  then
    for l2 in $W1_L2_LOCAL_IPS
    do
      echo "  L2"
      j=0
      while [ $j -lt $COUNT_CLIENTS_PER_PROXY ]
      do
        #echo "client[$i] = ${W1_CLIENT_HOSTS[$i]}"
        #client_local_ip=`$SSH_CMD  -o "UserKnownHostsFile=/dev/null" -o "StrictHostKeyChecking no"  ubuntu@${W1_CLIENT_HOSTS[$i]} "$GET_LOCAL_IP_CMD"`
        $SSH_CMD  -o "UserKnownHostsFile=/dev/null" -o "StrictHostKeyChecking no"  ubuntu@${W1_CLIENT_HOSTS[$i]} "sudo tcpdump -ex -i eth0 -r tcpdump.eth0 src host $l2 and src port 8080   | grep length | awk '{print \$NF}'" > W1_Client${i}_src_8080_from_Proxy.txt.${W1_CLIENT_HOSTS[$i]} &
        i=$(($i+1))
        j=$(($j+1))
      done
    done
  fi
  wait

  i=0
  echo " W2"
  if [ $RUNCLIENTSL1 -eq 1 ]
  then
    echo "  L1"
    j=0
    while [ $j -lt $COUNT_CLIENTS_PER_PROXY ]
    do
      #echo "client[$i] = ${W2_CLIENT_HOSTS[$i]}"
      #client_local_ip=`$SSH_CMD  -o "UserKnownHostsFile=/dev/null" -o "StrictHostKeyChecking no"  ubuntu@${W2_CLIENT_HOSTS[$i]} "$GET_LOCAL_IP_CMD"`
      $SSH_CMD  -o "UserKnownHostsFile=/dev/null" -o "StrictHostKeyChecking no"  ubuntu@${W2_CLIENT_HOSTS[$i]} "sudo tcpdump -ex -i eth0 -r tcpdump.eth0 src host $W2_L1_PROXY_LOCAL_IP and src port 8080   | grep length | awk '{print \$NF}'" > W2_Client${i}_src_8080_from_Proxy.txt.${W2_CLIENT_HOSTS[$i]} &
      i=$(($i+1))
      j=$(($j+1))
    done
  fi
  wait
  
  if [ $RUNCLIENTSL2 -eq 1 ]
  then
    for l2 in $W2_L2_LOCAL_IPS
    do
      echo "  L2"
      j=0
      while [ $j -lt $COUNT_CLIENTS_PER_PROXY ]
      do
        #echo "client[$i] = ${W2_CLIENT_HOSTS[$i]}"
        #client_local_ip=`$SSH_CMD  -o "UserKnownHostsFile=/dev/null" -o "StrictHostKeyChecking no"  ubuntu@${W2_CLIENT_HOSTS[$i]} "$GET_LOCAL_IP_CMD"`
        $SSH_CMD  -o "UserKnownHostsFile=/dev/null" -o "StrictHostKeyChecking no"  ubuntu@${W2_CLIENT_HOSTS[$i]} "sudo tcpdump -ex -i eth0 -r tcpdump.eth0 src host $l2 and src port 8080   | grep length | awk '{print \$NF}'" > W2_Client${i}_src_8080_from_Proxy.txt.${W2_CLIENT_HOSTS[$i]} &
        i=$(($i+1))
        j=$(($j+1))
      done
    done
  fi
  wait
  
fi

if [ $RUNSERVER -eq 1 ]
then
  echo "Server"
  # Start the server
  $SSH_CMD  -o "UserKnownHostsFile=/dev/null" -o "StrictHostKeyChecking no"  ubuntu@$SERVER_HOST "sudo tcpdump -ex -i eth0 -r tcpdump.eth0 src port 8080   | grep length | awk '{print \$NF}'" > Server.tcpdump.8080.src.txt
  $SSH_CMD  -o "UserKnownHostsFile=/dev/null" -o "StrictHostKeyChecking no"  ubuntu@$SERVER_HOST "sudo tcpdump -ex -i eth0 -r tcpdump.eth0 dst port 8080   | grep length | awk '{print \$NF}'" > Server.tcpdump.8080.dst.txt

fi

wait
