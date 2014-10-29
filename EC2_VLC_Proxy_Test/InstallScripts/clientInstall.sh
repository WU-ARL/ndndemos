#!/bin/bash

sudo apt-get -y update 
sudo apt-get -y install vlc ffmpeg


cd /home/ubuntu
wget http://www.arl.wustl.edu/~jdd/EC2_VLC_Proxy_Test/runClient.sh 
wget http://www.arl.wustl.edu/~jdd/EC2_VLC_Proxy_Test/bwMon.sh 
chown ubuntu.ubuntu runClient.sh bwMon.sh
chmod 755 runClient.sh bwMon.sh
