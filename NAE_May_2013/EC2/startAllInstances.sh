#!/bin/bash

cd /project/arl/NDN/jdd/MAY_2013_DEMO

./INSTANCE_SCRIPTS/start_ndnvideoByRegion.sh  100

exit

./INSTANCE_SCRIPTS/startReposByRegion.sh 

exit

#./INSTANCE_SCRIPTS/startFetchByRegion.sh 1

./INSTANCE_SCRIPTS/startVlcByRegion.sh 1

./INSTANCE_SCRIPTS/startChatServersByRegion.sh

./INSTANCE_SCRIPTS/startChatClientsByRegion.sh 25
