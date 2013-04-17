#!/bin/bash

# Install ccnx 0.7.1
# using git
sudo apt-get -y --force-yes install git
git clone http://github.com/WU-ARL/ccnx

echo "STARTing generation of ~/.ccnx/keystore"
chmod 755 ./ccnx/csrc/lib/ccn_initkeystore.sh
./ccnx/csrc/lib/ccn_initkeystore.sh
echo "DONE with generation of ~/.ccnx/keystore"


#Install needed packages
sudo apt-get -y update
sudo apt-get -y install make
sudo apt-get -y install gcc
# ccnx does not seem to build properly with openjdk-7?
sudo apt-get -y install openjdk-6-jre
sudo apt-get -y install openjdk-6-jdk
sudo apt-get -y install libssl-dev
sudo apt-get -y install libexpat1-dev
sudo apt-get -y install libpcap-dev
sudo apt-get -y install vlc
sudo apt-get -y install libvlc-dev
sudo apt-get -y install ant
sudo apt-get -y install python-dev
sudo apt-get -y install libtool
sudo apt-get -y install autoconf
sudo apt-get -y install gstreamer-tools
sudo apt-get -y install python-gst0.10
sudo apt-get -y install libgtk2.0-dev
sudo apt-get -y install python-gst0.10
sudo apt-get -y install python-gtk2
sudo apt-get -y install gstreamer0.10-plugins

cd ccnx

./configure
make
sudo make install

cd ..
# git UCLA's ndnvideo
git clone http://github.com/named-data/ndnvideo

# git UCLA's PyCCN for use with ndnvideo
git clone -b bootstrapped http://github.com/named-data/PyCCN

DIR=`pwd`
echo "DIR=$DIR"
#Install PyCCN
cd PyCCN
./bootstrap 
echo "./configure --with-ccn=$DIR/ccnx"
./configure --with-ccn=$DIR/ccnx
make
sudo make install


