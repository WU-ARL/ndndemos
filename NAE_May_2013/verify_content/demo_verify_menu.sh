#! /bin/sh

SEQ=$RANDOM
NUM=1
TIMEOUT=3
while (true)
do

  echo "0: Quit"
  echo "1: for content signed by verified key"
  echo "2: for content signed by unverified key using vefified key name"
  echo "3: for content signed by corrupted key"
  echo "9: repeat last request"


  read x
  if [ $x -eq 0 ]
  then
    exit
  fi
  if [ $x -eq 1 ]
  then
    echo "Sending interest for content signed by verified key"
    PREFIX="ccnx:/ndn/wustl.edu/ndndemo/good_key/nae$SEQ/$NUM"
    ./verify_content_client.py -t $TIMEOUT ccnx:/ndn/wustl.edu/ndndemo/good_key/nae$SEQ/$NUM
    echo ""
  fi
  if [ $x -eq 2 ]
  then
    echo "Sending interest for content signed by unverified key using verified keyname"
    PREFIX="ccnx:/ndn/wustl.edu/ndndemo/bad_key/nae$SEQ/$NUM"
    ./verify_content_client.py -t $TIMEOUT ccnx:/ndn/wustl.edu/ndndemo/bad_key/nae$SEQ/$NUM
  fi
  if [ $x -eq 3 ]
  then
    echo "Sending interest for content signed by verified key, key was corrupted in key repo"
    PREFIX="ccnx:/ndn/wustl.edu/ndndemo/cbad_key/nae$SEQ/$NUM"
    ./verify_content_client.py -t $TIMEOUT ccnx:/ndn/wustl.edu/ndndemo/cbad_key/nae$SEQ/$NUM
  fi
  if [ $x -eq 9 ]
  then
    echo "Re-sending last interest "
    ./verify_content_client.py -t $TIMEOUT $PREFIX
  fi

  NUM=$(($NUM + 1))

done
