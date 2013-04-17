#!/bin/sh

export CCND_LOG=/var/log/ccnd.log
export CCND_DEBUG=1
export CCNR_GLOBAL_PREFIX=/

sudo -E /usr/local/bin/ccndstop
sudo -E /usr/local/bin/ccndstart
sleep 2
#sudo -E /usr/local/bin/ccndhcpnode -f ccn_dhcp_client.conf.WASHU
ccndc add ccnx:/ tcp 162.105.146.26 9695

