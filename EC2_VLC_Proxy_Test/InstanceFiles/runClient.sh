#!/bin/bash


#rm IP.sh
#wget http://www.cse.wustl.edu/~jdd/EC2_VLC_Proxy_Test/IP.sh
#source ./IP.sh

sudo killall tcpdump
sudo tcpdump -i eth0 -w tcpdump.eth0 &

if [ $# -eq 2 ]
then
  SERVER_IP="$1"
  PROXY_IP="$2"
  vlc --play-and-exit -I dummy --no-video --no-audio --http-proxy=${PROXY_IP}:8080 http://${SERVER_IP}:8080/streaming/mystream.m3u8  &
elif [ $# -eq 1 ]
then
  SERVER_IP="$1"
  vlc --play-and-exit -I dummy --no-video --no-audio http://${SERVER_IP}:8080/streaming/mystream.m3u8  &
else
  echo "Usage: $0 <ServerIP> <ProxyIP>"
  sudo killall tcpdump
  exit 0
fi

