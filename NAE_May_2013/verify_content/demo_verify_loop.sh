#! /bin/sh

SEQ=$RANDOM
NUM=1
while (true)
do

echo
echo
echo "Sending interest for content signed by verified key"
echo "Press Enter to send an Interest"
read
./verify_content_client.py ccnx:/ndn/wustl.edu/ndndemo/good_key/nae$SEQ/$NUM
echo
echo
echo "Sending interest for content signed by unverified key using verified keyname"
echo "Press Enter to send an Interest"
read
./verify_content_client.py ccnx:/ndn/wustl.edu/ndndemo/bad_key/nae$SEQ/$NUM
echo
echo
echo "Sending interest for content signed by verified key, key was corrupted in key repo"
echo "Press Enter to send an Interest"
read
./verify_content_client.py ccnx:/ndn/wustl.edu/ndndemo/cbad_key/nae$SEQ/$NUM

NUM=$(($NUM + 1))

done
