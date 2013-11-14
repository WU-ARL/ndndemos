#!/bin/bash

#rm IP.sh
#wget http://www.cse.wustl.edu/~jdd/EC2_VLC_Proxy_Test/IP.sh
#source ./IP.sh

sudo killall tcpdump
sudo tcpdump -i eth0 -w tcpdump.eth0 &

if [ $# -ne 2 ]
then
  echo "Usage: $0 <ServerIP> <MyIP_for_publishing>"
  sudo killall tcpdump
  exit 0
else
    SERVER_IP="$1"
    MY_IP="$2"
fi


rm default.vcl
wget http://www.cse.wustl.edu/~jdd/EC2_VLC_Proxy_Test/default.vcl
echo "backend default {" >> default.vcl
echo "    .host = \"$SERVER_IP\";" >> default.vcl
echo "    .port = \"8080\";" >> default.vcl
echo "}" >> default.vcl

sudo killall varnishd

varnishd -a ${MY_IP}:8080 -f ~/default.vcl -n ~/varnish &
