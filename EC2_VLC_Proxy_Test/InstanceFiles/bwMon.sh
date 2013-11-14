#!/bin/bash

if [ $# != 1 ]
then
  echo "Usage: $0 <interface> "
  echo "Example: $0 eth1"
  exit 0
fi

IFACE=$1

CURRENT_TIME=`date +%s.%N`
IFACE_BYTES_LINE=`ifconfig $IFACE | grep "bytes" `

rxBytes=`echo "$IFACE_BYTES_LINE" | cut -d':' -f 2 | cut -d ' ' -f 1`
txBytes=`echo "$IFACE_BYTES_LINE" | cut -d':' -f 3 | cut -d ' ' -f 1`

START_TIME=$CURRENT_TIME

#echo "Interface $IFACE Start($CURRENT_TIME): Rx Bytes: $rxBytes Tx Bytes: $txBytes"

echo "$START_TIME"

while true
do
  prevTime=$CURRENT_TIME
  prevRxBytes=$rxBytes
  prevTxBytes=$txBytes


  sleep 10.0

  CURRENT_TIME=`date +%s.%N`
  IFACE_BYTES_LINE=`ifconfig $IFACE | grep "bytes" `
  
  rxBytes=`echo "$IFACE_BYTES_LINE" | cut -d':' -f 2 | cut -d ' ' -f 1`
  txBytes=`echo "$IFACE_BYTES_LINE" | cut -d':' -f 3 | cut -d ' ' -f 1`

  rxBytesDiff=$(($rxBytes - $prevRxBytes))
  txBytesDiff=$(($txBytes - $prevTxBytes))
  timeDiff=`echo "$CURRENT_TIME - $prevTime" | bc`


  rxBitRate=`echo "(($rxBytes - $prevRxBytes) * 8) / ($CURRENT_TIME - $prevTime)" | bc `
  txBitRate=`echo "(($txBytes - $prevTxBytes) * 8) / ($CURRENT_TIME - $prevTime)" | bc `

  #echo "$CURRENT_TIME $prevTime $timeDiff $rxBytes $prevRxBytes $rxBytesDiff $txBytes $prevTxBytes $txBytesDiff $rxBitRate $txBitRate"
  elapsedTime=`echo "$CURRENT_TIME - $START_TIME" | bc`
  echo "$elapsedTime $rxBitRate $txBitRate"
  
done

