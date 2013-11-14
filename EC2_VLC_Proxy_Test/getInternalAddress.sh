#!/bin/bash

if [ $# != 1 ]
then
  echo "Usage: $0 <hostname>"
  exit 0
else
  INT_IP=`ssh -i ~/.ssh/wu-arl-John ubuntu@$1 " ifconfig eth0 | grep \"inet addr\" | cut -d ':' -f 2 | cut -d ' ' -f 1"`
  echo "INT_IP = $INT_IP"
fi



