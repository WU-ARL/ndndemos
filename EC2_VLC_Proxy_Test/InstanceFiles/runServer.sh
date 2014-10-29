#!/bin/bash

#rm IP.sh
#wget http://www.cse.wustl.edu/~jdd/EC2_VLC_Proxy_Test/IP.sh
#source ./IP.sh

sudo killall tcpdump
sudo tcpdump -i eth0 -w tcpdump.eth0 &


if [ $# -ne 1 ]
then
  echo "Usage: $0 <MyIP_for_publishing>"
  sudo killall tcpdump
  exit 0
else
    MY_IP="$1"
fi

# start lighttpd HTTP server
sudo killall lighttpd
lighttpd -f ~/lighttpd/lighttpd.conf &

mkdir -p /tmp/Files/streaming
rm /tmp/Files/streaming/*

#vlc -I dummy --loop ~/video.ts --sout '#transcode{vcodec=h264,vb=1024,acodec=mp3,ab=96}:standard{mux=ps,dst=127.0.0.1:8000,access=http}' &
vlc -I dummy --loop ~/AA.mp4 --sout '#transcode{vcodec=h264,vb=1024,acodec=mp3,ab=96}:standard{mux=ps,dst=127.0.0.1:8000,access=http}' &

sleep 3

vlc -I dummy http://127.0.0.1:8000 --sout="#transcode{vcodec=h264,vb=256,venc=x264{aud,profile=baseline,level=30,keyint=30,bframes=0,ref=1,nocabac},acodec=mp3,ab=96}:duplicate{dst=std{access=livehttp{seglen=10,delsegs=false,numsegs=3,index=/tmp/Files/streaming/mystream.m3u8,index-url=http://${MY_IP}:8080/streaming/mystream-########.ts},mux=ts{use-key-frames},dst=/tmp/Files/streaming/mystream-########.ts}}" &

