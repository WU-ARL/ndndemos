#!/bin/bash

sudo apt-get -y update 
sudo apt-get -y install vlc ffmpeg lighttpd

cd /home/ubuntu
wget http://www.arl.wustl.edu/~jdd/EC2_VLC_Proxy_Test/AA.mp4
wget http://www.arl.wustl.edu/~jdd/EC2_VLC_Proxy_Test/runServer.sh
wget http://www.arl.wustl.edu/~jdd/EC2_VLC_Proxy_Test/bwMon.sh
chown ubuntu.ubuntu runServer.sh bwMon.sh AA.mp4
chmod 755 runServer.sh bwMon.sh

mkdir /home/ubuntu/lighttpd
cd lighttpd
wget http://www.arl.wustl.edu/~jdd/EC2_VLC_Proxy_Test/lighttpd.conf
chown -R ubuntu.ubuntu /home/ubuntu/lighttpd

