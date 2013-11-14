#!/bin/bash

echo -n "E1_L1 from Server:"
awk '{s+=$1} END {print s}' E1_L1_src_8080_from_Server.txt
echo -n "E1_L1 to Clients:"
awk '{s+=$1} END {print s}' E1_L1_src_8080_from_Proxy.txt
echo -n "W1_L1 from Server:"
awk '{s+=$1} END {print s}' W1_L1_src_8080_from_Server.txt
echo -n "W1_L1 to Clients:"
awk '{s+=$1} END {print s}' W1_L1_src_8080_from_Proxy.txt
echo -n "W2_L1 from Server:"
awk '{s+=$1} END {print s}' W2_L1_src_8080_from_Server.txt
echo -n "W2_L1 to Clients:"
awk '{s+=$1} END {print s}' W2_L1_src_8080_from_Proxy.txt
echo -n "E1 Clients 0:"
awk '{s+=$1} END {print s}' E1_Client0_src_8080_from_Proxy.txt
echo -n "E1 Clients 1:"
awk '{s+=$1} END {print s}' E1_Client1_src_8080_from_Proxy.txt
echo -n "E1 Clients 2:"
awk '{s+=$1} END {print s}' E1_Client2_src_8080_from_Proxy.txt
echo -n "W1 Clients 0:"
awk '{s+=$1} END {print s}' W1_Client0_src_8080_from_Proxy.txt
echo -n "W1 Clients 1:"
awk '{s+=$1} END {print s}' W1_Client1_src_8080_from_Proxy.txt
echo -n "W1 Clients 2:"
awk '{s+=$1} END {print s}' W1_Client2_src_8080_from_Proxy.txt
echo -n "W2 Clients 0:"
awk '{s+=$1} END {print s}' W2_Client0_src_8080_from_Proxy.txt
echo -n "W2 Clients 1:"
awk '{s+=$1} END {print s}' W2_Client1_src_8080_from_Proxy.txt
echo -n "W2 Clients 2:"
awk '{s+=$1} END {print s}' W2_Client2_src_8080_from_Proxy.txt
echo -n "Server src:"
awk '{s+=$1} END {print s}' Server.tcpdump.src.txt
echo -n "Server dst:"
awk '{s+=$1} END {print s}' Server.tcpdump.dst.txt
 

E1_Client0_src_8080_from_Proxy.txt
E1_Client1_src_8080_from_Proxy.txt
E1_Client2_src_8080_from_Proxy.txt
E1_Client3_src_8080_from_Proxy.txt
E1_Client4_src_8080_from_Proxy.txt
E1_Client5_src_8080_from_Proxy.txt
E1_Client6_src_8080_from_Proxy.txt
E1_Client7_src_8080_from_Proxy.txt
E1_Client8_src_8080_from_Proxy.txt
E1_Client9_src_8080_from_Proxy.txt
E1_Client10_src_8080_from_Proxy.txt
E1_Client11_src_8080_from_Proxy.txt
E1_L1_src_8080_from_Proxy.txt
E1_L1_src_8080_from_Server.txt
E1_L2_src_8080_from_L1.txt.ec2-107-21-177-207.compute-1.amazonaws.com
E1_L2_src_8080_from_L1.txt.ec2-174-129-55-241.compute-1.amazonaws.com
E1_L2_src_8080_from_L1.txt.ec2-54-242-213-226.compute-1.amazonaws.com
E1_L2_src_8080_from_Proxy.txt.ec2-107-21-177-207.compute-1.amazonaws.com
E1_L2_src_8080_from_Proxy.txt.ec2-174-129-55-241.compute-1.amazonaws.com
E1_L2_src_8080_from_Proxy.txt.ec2-54-242-213-226.compute-1.amazonaws.com
W1_Client0_src_8080_from_Proxy.txt
W1_Client1_src_8080_from_Proxy.txt
W1_Client2_src_8080_from_Proxy.txt
W1_Client3_src_8080_from_Proxy.txt
W1_Client4_src_8080_from_Proxy.txt
W1_Client5_src_8080_from_Proxy.txt
W1_Client6_src_8080_from_Proxy.txt
W1_Client7_src_8080_from_Proxy.txt
W1_Client8_src_8080_from_Proxy.txt
W1_Client9_src_8080_from_Proxy.txt
W1_Client10_src_8080_from_Proxy.txt
W1_Client11_src_8080_from_Proxy.txt
W1_L1_src_8080_from_Proxy.txt
W1_L1_src_8080_from_Server.txt
W1_L2_src_8080_from_L1.txt.ec2-50-18-93-65.us-west-1.compute.amazonaws.com
W1_L2_src_8080_from_L1.txt.ec2-54-219-67-143.us-west-1.compute.amazonaws.com
W1_L2_src_8080_from_L1.txt.ec2-54-241-62-11.us-west-1.compute.amazonaws.com
W1_L2_src_8080_from_Proxy.txt.ec2-50-18-93-65.us-west-1.compute.amazonaws.com
W1_L2_src_8080_from_Proxy.txt.ec2-54-219-67-143.us-west-1.compute.amazonaws.com
W1_L2_src_8080_from_Proxy.txt.ec2-54-241-62-11.us-west-1.compute.amazonaws.com
W2_Client0_src_8080_from_Proxy.txt
W2_Client1_src_8080_from_Proxy.txt
W2_Client2_src_8080_from_Proxy.txt
W2_Client3_src_8080_from_Proxy.txt
W2_Client4_src_8080_from_Proxy.txt
W2_Client5_src_8080_from_Proxy.txt
W2_Client6_src_8080_from_Proxy.txt
W2_Client7_src_8080_from_Proxy.txt
W2_Client8_src_8080_from_Proxy.txt
W2_Client9_src_8080_from_Proxy.txt
W2_Client10_src_8080_from_Proxy.txt
W2_Client11_src_8080_from_Proxy.txt
W2_L1_src_8080_from_Proxy.txt
W2_L1_src_8080_from_Server.txt
W2_L2_src_8080_from_L1.txt.ec2-50-112-2-4.us-west-2.compute.amazonaws.com
W2_L2_src_8080_from_L1.txt.ec2-54-202-20-91.us-west-2.compute.amazonaws.com
W2_L2_src_8080_from_L1.txt.ec2-54-212-205-3.us-west-2.compute.amazonaws.com
W2_L2_src_8080_from_Proxy.txt.ec2-50-112-2-4.us-west-2.compute.amazonaws.com
W2_L2_src_8080_from_Proxy.txt.ec2-54-202-20-91.us-west-2.compute.amazonaws.com
W2_L2_src_8080_from_Proxy.txt.ec2-54-212-205-3.us-west-2.compute.amazonaws.com

