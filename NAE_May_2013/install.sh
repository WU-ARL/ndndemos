#!/bin/bash

# Install ccnx 0.7.1
# using git
apt-get -y --force-yes install git
git clone http://github.com/WU-ARL/ccnx

echo "STARTing generation of ~/.ccnx/keystore"
chmod 755 ./ccnx/csrc/lib/ccn_initkeystore.sh
./ccnx/csrc/lib/ccn_initkeystore.sh
echo "DONE with generation of ~/.ccnx/keystore"


#Install needed packages
apt-get -y update
apt-get -y install make
apt-get -y install gcc
# ccnx does not seem to build properly with openjdk-7?
apt-get -y install openjdk-6-jre
apt-get -y install openjdk-6-jdk
apt-get -y install libssl-dev
apt-get -y install libexpat1-dev
apt-get -y install libpcap-dev
apt-get -y install vlc
apt-get -y install libvlc-dev
apt-get -y install ant
apt-get -y install python-dev
apt-get -y install libtool
apt-get -y install autoconf
apt-get -y install gstreamer-tools
apt-get -y install python-gst0.10
apt-get -y install libgtk2.0-dev
apt-get -y install python-gst0.10
apt-get -y install python-gtk2
apt-get -y install gstreamer0.10-plugins

cd ccnx

./configure
make
make install

cd ..
# git UCLA's ndnvideo
git clone http://github.com/named-data/ndnvideo

# git UCLA's PyCCN for use with ndnvideo
git clone -b bootstrapped http://github.com/named-data/PyCCN

#Install PyCCN
cd PyCCN
./bootstrap 
./configure --with-ccn=/root/ccnx/
make
make install


