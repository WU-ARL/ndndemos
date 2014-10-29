#!/bin/bash

sudo apt-get -y update 
sudo apt-get -y install varnish

cd /home/ubuntu
sudo wget http://www.arl.wustl.edu/~jdd/EC2_VLC_Proxy_Test/default.vcl
sudo wget http://www.arl.wustl.edu/~jdd/EC2_VLC_Proxy_Test/runProxy.sh 
sudo wget http://www.arl.wustl.edu/~jdd/EC2_VLC_Proxy_Test/bwMon.sh
sudo chown ubuntu.ubuntu runProxy.sh default.vcl bwMon.sh
sudo chmod 755 runProxy.sh bwMon.sh

sudo mkdir varnish
sudo chown ubuntu.ubuntu varnish

