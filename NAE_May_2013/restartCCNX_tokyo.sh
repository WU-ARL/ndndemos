#!/bin/sh

export CCND_LOG=/var/log/ccnd.log
export CCND_DEBUG=1
export CCNR_GLOBAL_PREFIX=/

sudo -E /usr/local/bin/ccndstop
sudo -E /usr/local/bin/ccndstart
sleep 2
ccndc add ccnx:/ tcp 54.249.242.209 9695

