#!/bin/bash

cd /project/arl/NDN/jdd/MAY_2013_DEMO

#./INSTANCE_SCRIPTS/start_ndnvideoByRegion.sh  100
./INSTANCE_SCRIPTS/start_ndnvideoByRegion_foreign.sh   100 
./INSTANCE_SCRIPTS/start_ndnvideoByRegion_uswest1.sh   100
./INSTANCE_SCRIPTS/start_ndnvideoByRegion_useast1.sh   100
./INSTANCE_SCRIPTS/start_ndnvideoByRegion_uswest2.sh   100


exit

./INSTANCE_SCRIPTS/startReposByRegion.sh 

exit

#./INSTANCE_SCRIPTS/startFetchByRegion.sh 1

./INSTANCE_SCRIPTS/startVlcByRegion.sh 1

./INSTANCE_SCRIPTS/startChatServersByRegion.sh

./INSTANCE_SCRIPTS/startChatClientsByRegion.sh 25
