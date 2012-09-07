#!/bin/bash

cd /project/arl/NDN/jdd/ndnec2

./INSTANCE_SCRIPTS/startReposByRegion.sh 

#./INSTANCE_SCRIPTS/startFetchByRegion.sh 1

./INSTANCE_SCRIPTS/startVlcByRegion.sh 1

./INSTANCE_SCRIPTS/startChatServersByRegion.sh

./INSTANCE_SCRIPTS/startChatClientsByRegion.sh 25
