#!/usr/bin/env bash 
#
# Copyright (c) 2011,2012,2013 John Dehart, Shakir James, and Washington University in St. Louis.
# All rights reserved
#
#  Redistribution and use in source and binary forms, with or without
#  modification, are permitted provided that the following conditions
#  are met:
#    1. Redistributions of source code must retain the above copyright
#       notice, this list of conditions and the following disclaimer.
#    2. Redistributions in binary form must reproduce the above copyright
#       notice, this list of conditions and the following disclaimer in the
#       documentation and/or other materials provided with the distribution.
#    3. The name of the author or Washington University may not be used 
#       to endorse or promote products derived from this source code 
#       without specific prior written permission.
#    4. Conditions of any other entities that contributed to this are also
#       met. If a copyright notice is present from another entity, it must
#       be maintained in redistributions of the source code.
#
# THIS INTELLECTUAL PROPERTY (WHICH MAY INCLUDE BUT IS NOT LIMITED TO SOFTWARE,
# FIRMWARE, VHDL, etc) IS PROVIDED BY THE AUTHOR AND WASHINGTON UNIVERSITY 
# ``AS IS'' AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED 
# TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR 
# PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE AUTHOR OR WASHINGTON UNIVERSITY 
# BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR 
# CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF 
# SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS 
# INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN 
# CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) 
# ARISING IN ANY WAY OUT OF THE USE OF THIS INTELLECTUAL PROPERTY, EVEN IF 
# ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
#

PWD=`pwd`
echo "PWD: $PWD"
echo "Usage: $0 $@"
echo $@

################################
APP_NAME=$1
shift 1
APP_PARAMS="$*"

echo "APP_NAME = $APP_NAME"
echo "APP_PARAMS = $APP_PARAMS"

echo "STARTing generation of /root/.ccnx/keystore"
export HOME=/root
cd /root ; /usr/local/bin/ccninitkeystore
echo "DONE with generation of /root/.ccnx/.ccnx_keystore"

#

foundapp=0
case "$APP_NAME" in
"null")
    echo "APP: null"
    foundapp=1
    ;;
"robochat")
    echo "APP: robochat"
    foundapp=1
    #echo "ccnchat -text $APP_PARAMS"
    #/usr/local/bin/ccnchat -text $APP_PARAMS

    echo "#!/bin/sh" > /home/ubuntu/startApp.sh
    echo ""          >> /home/ubuntu/startApp.sh
    echo "export CCNX_USER_NAME=$CCNX_USER_NAME"    >> /home/ubuntu/startApp.sh
    echo "/usr/local/bin/ccnchat -text $APP_PARAMS" >> /home/ubuntu/startApp.sh
    echo ""

    chmod 755 /home/ubuntu/startApp.sh
    chown ubuntu.ubuntu /home/ubuntu/startApp.sh

    ;;
"robochat_server1")
    echo "APP: robochat_server1"
    foundapp=1
    #echo "ccnchat -text $APP_PARAMS"
    #ccnchat -text $APP_PARAMS
    cd /root/NDN_GEC/robochat
    export CCNX_USER_NAME=Declaration
    #./chat_read.sh  Declaration_of_Independence.txt | /usr/local/bin/ccnchat -text $APP_PARAMS

    CHAT_FILE="Declaration_of_Independence.txt"
    echo "#!/bin/sh" > /home/ubuntu/startApp.sh
    echo ""          >> /home/ubuntu/startApp.sh
    echo "export CCNX_USER_NAME=$CCNX_USER_NAME"    >> /home/ubuntu/startApp.sh
    echo "/home/ubuntu/chat_read.sh $CHAT_FILE | /usr/local/bin/ccnchat -text $APP_PARAMS" >> /home/ubuntu/startApp.sh
    echo ""

    cd /root/NDN_GEC/robochat
    cp $CHAT_FILE /home/ubuntu
    cp chat_read.sh /home/ubuntu
    chmod 755 /home/ubuntu/chat_read.sh
    chmod 644 /home/ubuntu/$CHAT_FILE
    chown ubuntu.ubuntu /home/ubuntu/chat_read.sh /home/ubuntu/$CHAT_FILE

    chmod 755 /home/ubuntu/startApp.sh
    chown ubuntu.ubuntu /home/ubuntu/startApp.sh

    ;;
"robochat_server2")
    echo "APP: robochat_server2"
    foundapp=1
    #echo "ccnchat -text $APP_PARAMS"
    #ccnchat -text $APP_PARAMS
    cd /root/NDN_GEC/robochat
    export CCNX_USER_NAME=Gettysburg
    #./chat_read.sh  Gettysburg_Address.txt | /usr/local/bin/ccnchat -text $APP_PARAMS

    CHAT_FILE="Gettysburg_Address.txt"
    echo "#!/bin/sh" > /home/ubuntu/startApp.sh
    echo ""          >> /home/ubuntu/startApp.sh
    echo "export CCNX_USER_NAME=$CCNX_USER_NAME"    >> /home/ubuntu/startApp.sh
    echo "/home/ubuntu/chat_read.sh $CHAT_FILE | /usr/local/bin/ccnchat -text $APP_PARAMS" >> /home/ubuntu/startApp.sh
    echo ""

    cd /root/NDN_GEC/robochat
    cp $CHAT_FILE /home/ubuntu
    cp chat_read.sh /home/ubuntu
    chmod 755 /home/ubuntu/chat_read.sh
    chmod 644 /home/ubuntu/$CHAT_FILE
    chown ubuntu.ubuntu /home/ubuntu/chat_read.sh /home/ubuntu/$CHAT_FILE
    
    chmod 755 /home/ubuntu/startApp.sh
    chown ubuntu.ubuntu /home/ubuntu/startApp.sh

    ;;
"robochat_server3")
    echo "APP: robochat_server3"
    foundapp=1
    #echo "ccnchat -text $APP_PARAMS"
    #ccnchat -text $APP_PARAMS
    cd /root/NDN_GEC/robochat
    export CCNX_USER_NAME=Preamble
    #./chat_read.sh  Preamble_to_the_Constitution.txt | /usr/local/bin/ccnchat -text $APP_PARAMS

    CHAT_FILE="Preamble_to_the_Constitution.txt"
    echo "#!/bin/sh" > /home/ubuntu/startApp.sh
    echo ""          >> /home/ubuntu/startApp.sh
    echo "export CCNX_USER_NAME=$CCNX_USER_NAME"    >> /home/ubuntu/startApp.sh
    echo "/home/ubuntu/chat_read.sh $CHAT_FILE | /usr/local/bin/ccnchat -text $APP_PARAMS" >> /home/ubuntu/startApp.sh
    echo "" >> /home/ubuntu/startApp.sh

    cd /root/NDN_GEC/robochat
    cp $CHAT_FILE /home/ubuntu
    cp chat_read.sh /home/ubuntu
    chmod 755 /home/ubuntu/chat_read.sh
    chmod 644 /home/ubuntu/$CHAT_FILE
    chown ubuntu.ubuntu /home/ubuntu/chat_read.sh /home/ubuntu/$CHAT_FILE
    
    chmod 755 /home/ubuntu/startApp.sh
    chown ubuntu.ubuntu /home/ubuntu/startApp.sh

    ;;
"fetch")
    echo "APP: fetch"
    foundapp=1

    cp -p /root/NDN_GEC/ccnx/csrc/cmd/ccn_fetch_test /usr/local/bin

    echo "#!/bin/bash" > /home/ubuntu/startApp.sh
    echo ""          >> /home/ubuntu/startApp.sh
    echo 'if [ $# -eq 1 ] ' >> /home/ubuntu/startApp.sh
    echo "then" >> /home/ubuntu/startApp.sh
    echo "  fetchfile=\$1" >> /home/ubuntu/startApp.sh
    echo "else" >> /home/ubuntu/startApp.sh
    echo "  fetchfile=$APP_PARAMS" >> /home/ubuntu/startApp.sh
    echo "fi" >> /home/ubuntu/startApp.sh
    echo '/usr/local/bin/ccn_fetch_test -mb 24 -out /tmp/fetchfile.out $fetchfile >& /home/ubuntu/fetch.log ' >> /home/ubuntu/startApp.sh
    echo "" >> /home/ubuntu/startApp.sh

    chmod 755 /home/ubuntu/startApp.sh
    chown ubuntu.ubuntu /home/ubuntu/startApp.sh
    ;;
"vlc")
    echo "APP: vlc"
    foundapp=1

    cd /root/NDN_GEC/ccnx/apps/vlc
    wget http://www.arl.wustl.edu/~jdd/NDN/ccn.c.with_fetch .
    mv ccn.c ccn.c.ORIG
    cp ccn.c.with_fetch ccn.c
    cp -p Makefile.Linux Makefile
    make
    make install

    cd /root/NDN_GEC/ccnx/csrc/cmd
    cp -p ccn_fetch_test /usr/local/bin

    #vlc -I dummy --play-and-exit --no-video $APP_PARAMS

    echo "#!/bin/bash" > /home/ubuntu/startApp.sh
    echo ""          >> /home/ubuntu/startApp.sh
    echo 'if [ $# -eq 1 ] ' >> /home/ubuntu/startApp.sh
    echo "then" >> /home/ubuntu/startApp.sh
    echo '  videofile=$1' >> /home/ubuntu/startApp.sh
    echo "else" >> /home/ubuntu/startApp.sh
    echo "  videofile=$APP_PARAMS" >> /home/ubuntu/startApp.sh
    echo "fi" >> /home/ubuntu/startApp.sh
    echo "while true" >> /home/ubuntu/startApp.sh
    echo "do" >> /home/ubuntu/startApp.sh
    echo 'vlc -I dummy --play-and-exit --no-video $videofile >& /home/ubuntu/vlc.log ' >> /home/ubuntu/startApp.sh
    echo "done" >> /home/ubuntu/startApp.sh
    echo "" >> /home/ubuntu/startApp.sh

    chmod 755 /home/ubuntu/startApp.sh
    chown ubuntu.ubuntu /home/ubuntu/startApp.sh
    ;;
"ccnx_repository")
    echo "APP: ccnx_repository"
    export CCNR_LOG=/var/log/ccnr.log
    export CCNR_DEBUG=7
    export CCNR_DIRECTORY=/usr/local/NDN/REPO

    mkdir -p /usr/local/NDN/REPO
    if [ "$CCNR_LOG" = "" ]
    then
      echo "Starting ccnr with no log file"
      /usr/local/bin/ccnr  &
    else
      echo "Starting ccnr with log file: $CCNR_LOG"
      : >"$CCNR_LOG" || exit 1
      /usr/local/bin/ccnr  2> $CCNR_LOG &
    fi

    cd /root
    #mkdir VIDEOS
    cd VIDEOS
    #wget http://www.arl.wustl.edu/~jdd/NDN/videos.tgz
    #tar -zxf videos.tgz

    FILES=`ls *.mpeg *.mpg`

    # APP_PARAMS should contain prefix or prefixes for the Repository
    #   for example: ccnx:/GEC/WASHU/REPO or ccnx:/ndn/memphis.edu/netlab/GECREPO ...
    for a in $APP_PARAMS
    do
      for f in $FILES
      do
        echo "FILE: $f"
        ccnputfile $a/$f $f
      done
    done

    echo "done putting files in repositories"

    echo "#!/bin/sh" > /home/ubuntu/startApp.sh
    echo ""          >> /home/ubuntu/startApp.sh
    echo "# This file intentionally left blank. No App to run for a repository instance"          >> /home/ubuntu/startApp.sh
    chmod 755 /home/ubuntu/startApp.sh
    chown ubuntu.ubuntu /home/ubuntu/startApp.sh

    foundapp=1
    ;;
esac

if [ $foundapp -eq 0 ]
then
    echo "NO APP Name found"
fi

echo ""
echo "DONE"
