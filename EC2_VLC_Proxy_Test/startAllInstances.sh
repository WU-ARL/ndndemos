#!/bin/bash


#COUNT_L2_PROXY=3
##COUNT_CLIENTS_PER_PROXY=10
#COUNT_CLIENTS_PER_PROXY=2
#COUNT_CLIENTS_PER_REGION=$(($COUNT_CLIENTS_PER_PROXY * (1 + $COUNT_L2_PROXY)))
#
#cd /project/arl/NDN/jdd/EC2_VLC_Proxy_Test


source ./counts.sh


#export COUNT_L2_PROXY=3
#export COUNT_CLIENTS_PER_PROXY=2
#export COUNT_CLIENTS_PER_REGION=$(($COUNT_CLIENTS_PER_PROXY * (1 + $COUNT_L2_PROXY)))

./start_server.sh

./start_proxiesByRegion.sh  1 $COUNT_L2_PROXY

#start clietns, 10 for each proxy
./start_clientsByRegion.sh  $COUNT_CLIENTS_PER_REGION

