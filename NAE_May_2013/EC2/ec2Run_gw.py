#!/usr/bin/env python
#
# Copyright (c) 2011 Shakir James and Washington University in St. Louis.
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

"""This script allows users to manage EC2 instances.

Assumes environment variables are set: 
  AWS_ACCESS_KEY_ID:  AWS Access Key ID
  AWS_SECRET_ACCESS_KEY:  AWS Secret Access Key
"""
__author__ = "Shakir James"

import sys
import logging
from boto import ec2
from time import sleep, time
from os import environ

# URLs to install scripts
#STARTUP_SCRIPT = 'http://bit.ly/ec2ccnx'
#STARTUP_SCRIPT = 'http://www.arl.wustl.edu/~jdd/NDN/restartCCNX.sh'
STARTUP_SCRIPT = 'http://www.arl.wustl.edu/~jdd/NDN/startgateway.sh'
# EC2 keypair
try:
    EC2_KEYPAIR = environ['EC2_KEYPAIR']
except KeyError:
    EC2_KEYPAIR = 'default'
# EC2 security group
EC2_SECURITY_GROUPS=('default', 'ccnx_client')
# Region names (availability zones)
REGION_US_E1 = 'us-east-1' # N. Virginia
REGION_US_W1 = 'us-west-1' # N. California
REGION_US_W2 = 'us-west-2' # Oregon
REGION_APNE1 = 'ap-northeast-1' # Tokyo
REGION_APSE1 = 'ap-southeast-1' # Singapore
REGION_APSE2 = 'ap-southeast-2' # Sydney
REGION_EUW1 = 'eu-west-1' # Ireland
REGION_SAE1 = 'sa-east-1' # Sao Paulo
# Amazon Linux AMI IDs
# from http://aws.amazon.com/amazon-linux-ami/
# AMI_US_E1_32_EBS = 'ami-31814f58'
# AMI_US_E1_64_EBS = 'ami-1b814f72'
# AMI_US_W1_32_EBS = 'ami-11d68a54'
# AMI_US_W1_64_EBS = 'ami-1bd68a5e'
# AMI_US_W2_32_EBS = 'ami-38fe7308'
# AMI_US_W2_64_EBS = 'ami-30fe7300'

# Ubuntu 10.04 LTS Lucid (EBS boot) AMIs
# from http://alestic.com/
AMI_US_E1_32_EBS = 'ami-71dc0b18'
AMI_US_E1_64_EBS = 'ami-55dc0b3c'
AMI_US_W1_32_EBS = 'ami-9991cfdc'
AMI_US_W1_64_EBS = 'ami-a191cfe4'
AMI_US_W2_32_EBS = 'ami-8cb33ebc'
AMI_US_W2_64_EBS = 'ami-8eb33ebe'

JDD_AMI = 'ami-29d40740'
JDD_E1_AMI = 'ami-b8ee33d1'
JDD_W1_AMI = 'ami-c5e7be80'
JDD_W2_AMI = 'ami-4a109d7a'

JDD_E1_AMI_CCNX_071 = 'ami-d0b925b9'  # ndnvideo capable AMI
JDD_W1_AMI_CCNX_071 = 'ami-a883a1ed'  # ndnvideo capable AMI
JDD_W2_AMI_CCNX_071 = 'ami-aa55c09a'
JDD_APNE1_AMI_CCNX_071 = 'ami-5ad7545b'
JDD_APSE1_AMI_CCNX_071 = 'ami-949dd1c6'
JDD_APSE2_AMI_CCNX_071 = 'ami-5c3fae66'
JDD_EUW1_AMI_CCNX_071 = 'ami-3abab04e'
JDD_SAE1_AMI_CCNX_071 = 'ami-176bb00a'

JDD_APNE1_AMI_GW = 'ami-d58101d4'   # Tokyo Gateway AMI
JDD_APSE1_AMI_GW = 'ami-1e511d4c'   # Singapore Gateway AMI
JDD_APSE2_AMI_GW = 'ami-d40190ee'   # Sydney Gateway AMI
JDD_SAE1_AMI_GW = 'ami-67578c7a'   # SaoPaulo Gateway AMI
JDD_EUW1_AMI_GW = 'ami-58767c2c'   # Ireland Gateway AMI

JDD_APNE1_GW_IP = '54.249.242.209'
JDD_APSE1_GW_IP = '54.251.250.59'
JDD_APSE2_GW_IP = '54.252.98.164'
JDD_SAE1_GW_IP = '54.232.86.91'
JDD_EUW1_GW_IP = '54.246.123.120'

GW_IPS = {
    REGION_APNE1: JDD_APNE1_GW_IP,
    REGION_APSE1: JDD_APSE1_GW_IP,
    REGION_APSE2: JDD_APSE2_GW_IP,
    REGION_SAE1: JDD_SAE1_GW_IP,
    REGION_EUW1: JDD_EUW1_GW_IP,
}

AMI_IDS = {
    REGION_US_E1: { 
        't1.micro': AMI_US_E1_64_EBS, # EBS only (32-bit or 64-bit)
        'm1.small': JDD_E1_AMI_CCNX_071,   # JDD built AMI for CCNX 0.7.1
        'm1.large': AMI_US_E1_64_EBS, # 64-bit
    },
    REGION_US_W1: { 
        't1.micro': AMI_US_W1_64_EBS,
        'm1.small': JDD_W1_AMI_CCNX_071,   # JDD built AMI for CCNX 0.7.1
        'm1.large': AMI_US_W1_64_EBS,
    },
    REGION_US_W2: { 
        't1.micro': AMI_US_W2_64_EBS,
        'm1.small': JDD_W2_AMI_CCNX_071,   # JDD built AMI for CCNX 0.7.1
        'm1.large': AMI_US_W2_64_EBS, 
    },
    REGION_APNE1: { 
        't1.micro': JDD_APNE1_AMI_GW,         # JDD built AMI for Tokyo GW
        'm1.small': JDD_APNE1_AMI_CCNX_071,   # JDD built AMI for CCNX 0.7.1
        'm1.large': AMI_US_W2_64_EBS, 
    },
    REGION_APSE1: { 
        't1.micro': JDD_APSE1_AMI_GW,
        'm1.small': JDD_APSE1_AMI_CCNX_071,   # JDD built AMI for CCNX 0.7.1
        'm1.large': AMI_US_W2_64_EBS, 
    },
    REGION_APSE2: { 
        't1.micro': JDD_APSE2_AMI_GW,
        'm1.small': JDD_APSE2_AMI_CCNX_071,   # JDD built AMI for CCNX 0.7.1
        'm1.large': AMI_US_W2_64_EBS, 
    },
    REGION_EUW1: { 
        't1.micro': JDD_EUW1_AMI_GW,
        'm1.small': JDD_EUW1_AMI_CCNX_071,   # JDD built AMI for CCNX 0.7.1
        'm1.large': AMI_US_W2_64_EBS, 
    },
    REGION_SAE1: { 
        't1.micro': JDD_SAE1_AMI_GW,
        'm1.small': JDD_SAE1_AMI_CCNX_071,   # JDD built AMI for CCNX 0.7.1
        'm1.large': AMI_US_W2_64_EBS, 
    },
}
# Poll for instance updates every POLL seconds
WAIT_POLL=5
# Stop polling for instances after TIMEOUT seconds
WAIT_TIMEOUT=20
# Metadata tag name
TAG_NAME='Name'
TAG_VALUE='none' # default
# User_data script that runs when instance starts
# NOTE: this script runs as root when the instance boots
USER_DATA = """#!/bin/bash
set -e

wget --no-check-certificate -O install {script}
rm -f /root/install.log
#wget -O install {script}
bash install {name} {gateway} {options} >> /root/install.log 2>&1
"""


def _get_user_data(**kwargs):
    """Return startup (user_data) script"""
    return USER_DATA.format(script=STARTUP_SCRIPT,
                            name=kwargs.get('name', ''),
                            gateway=kwargs.get('gateway', ''),
                            options=kwargs.get('options', ''))


def _get_conn(region):
    """Return EC2 connection
    Args:
        region: region to connect to
    """
    try:
        aws_access_key_id = environ['AWS_ACCESS_KEY_ID']
        aws_secret_access_key = environ['AWS_SECRET_ACCESS_KEY']
    except KeyError:
        raise ValueError('Please set your environment variables: '
                        'AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY')
    if region not in _get_conn.connections:
        _get_conn.connections[region] = ec2.connect_to_region(
                                region,
                                aws_access_key_id=AWS_ACCESS_KEY_ID,
                                aws_secret_access_key=AWS_SECRET_ACCESS_KEY)
    return _get_conn.connections[region]
_get_conn.connections = {} # connection cache ('static' variable)


def _get_conn(region):
    """Return EC2 connection
    Args:
        region: the name of region to connect to
    """
    ### TODO: cache connection
    try:
        aws_access_key_id = environ['AWS_ACCESS_KEY_ID']
        aws_secret_access_key = environ['AWS_SECRET_ACCESS_KEY']
    except KeyError:
        raise ValueError('Please set your environment variables: '
                        'AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY')
    return ec2.connect_to_region(region,
                aws_access_key_id=aws_access_key_id,
                aws_secret_access_key=aws_secret_access_key)


def _get_instances(region, **kwargs):
    """Return list of instance objects
    Args:
        name: return instances with TAG_NAME=name (optional)
    """
    filters=None
    if kwargs.get('name', ''):
        filters = {'tag:{0}'.format(TAG_NAME): kwargs['name']}
    conn = _get_conn(region)
    # instances may temporarily include recently terminated instances  
    rs = conn.get_all_instances(filters=filters)
    return [i for r in rs for i in r.instances if i.state != u'terminated']


def _wait_for_instances(instances, state=u'running', **kwargs):
    """Wait for instances' state to change to change state
    Args:
        instances: list of instance objects
        state: instance state to wait for
        poll: poll instances every poll seconds
        timeout: stop polling after timeout seconds
    """
    poll = kwargs.get('poll', WAIT_POLL)
    timeout = kwargs.get('timeout', WAIT_TIMEOUT)
    start_time = time()
    n = len(instances)
    m = 0
    while True:
        if (time() - start_time) > timeout:
            logging.error('Timeout occurred, {0}/{1} done'.format(m, n))
            break
        sys.stdout.write('.')
        sys.stdout.flush()
        sleep(poll)
        for ins in instances:
            ins.update()
        m = len([ins for ins in instances if ins.state == state])
        if n == m:
            break
    print('\n')

def link_instance_and_ip(conn, instance_id, ip):
        success = conn.associate_address(instance_id=instance_id,
                                              public_ip=ip)
        #if success:
        #        print "Sleeping for 60 seconds to let IP attach"
        #        time.sleep(60)

        return success


#success = self.link_instance_and_ip(instance.id, address)
#instance.update() # Since there is a  new IP

def run(region=REGION_US_E1, count=1, type='t1.micro', **kwargs):
    """Run EC2 instance 
    Args:
      region: EC2 region
      count: number of instances to start
      type:  instance type
    """
    try:
        ami_id = AMI_IDS[region][type]
    except KeyError:
        raise ValueError('No AMI for {0} in {1}'.format(type, region))
    conn = _get_conn(region)
    # start instances
    print('Launching {0} {1} in {2} ...'.format(count, type, region))    
    res = conn.run_instances(ami_id, 
            min_count=count,
            max_count=count,
            key_name=EC2_KEYPAIR,
            security_groups=EC2_SECURITY_GROUPS,
            user_data=_get_user_data(**kwargs), 
            instance_type=type)
    instances = res.instances
    # wait for 'running' state
    _wait_for_instances(instances, **kwargs)
    # tag instances  
    if kwargs.get('name', ''):
        ids = [inst.id for inst in instances]
        conn.create_tags( ids, {TAG_NAME: kwargs['name']})
        for inst in instances:
            inst.update() # to print with new tags
    # apply elastic IP to gateways
    # should be only one instance
    address = GW_IPS[region]
    for inst in instances:
        success = link_instance_and_ip(conn, inst.id, address)
        if success:
            print "Linked %s to %s" % (inst.id, address)
        else:
            print "Failed to link %s to %s" % (inst.id, address)
        inst.update()

    print_hosts(region, instances=instances, **kwargs)


def terminate(region=REGION_US_E1, **kwargs):
    """Terminate instances"""
    print('Terminating instances ...')
    instances = _get_instances(region, **kwargs)
    if not instances:
        return
    conn = _get_conn(region)
    instance_ids = [inst.id for inst in instances]
    conn.terminate_instances(instance_ids)
    _wait_for_instances(instances, state=u'terminated', **kwargs)


def print_status(region=REGION_US_E1, requests=False, **kwargs):
    """Print the state of instances"""
    instances = _get_instances(region, **kwargs)    
    print(region)
    if not instances:
        print('\tNone.')
        return
    states = {}
    for inst in instances:
        states[inst.state] = states.setdefault(inst.state, 0) + 1
    for state, count in states.iteritems(): 
        print('\t{0} {1}'.format(state, count))


def print_hosts(region=REGION_US_E1, instances=None, **kwargs):
    """Print hostnames of running instances
    Args:
        region: EC2 region (optional if instances is not None)
        instances: list of instance objects
    """
    if instances is None:
        instances = _get_instances(region, **kwargs)
    if not instances:
        print('No running instances.')
        return
    for inst in instances:
        tag_value = inst.tags.get(TAG_NAME, TAG_VALUE)
        print('\t{0:<15} {1}'.format(tag_value, inst.public_dns_name))


def main():
    import optparse
    usage = 'usage: %prog [options]'
    parser = optparse.OptionParser(usage)  
    parser.add_option('-c', '--count',
                        dest='count',
                        type='int',
                        metavar='N',
                        default=1,
                        help='number of instances N [default: %default]')
    parser.add_option('-l', '--list',
                        dest='list',
                        default=False,
                        action='store_true',
                        help='print hostnames of running instances')  
    parser.add_option('-r', '--region',
                        dest='region',
                        type='string',
                        metavar='REGION',
                        default=REGION_US_E1,
                        help='EC2 region')                        
    parser.add_option('-s', '--status',
                        dest='status',
                        default=False,
                        action='store_true',
                        help='print instant states')
    parser.add_option('-t', '--terminate',
                        dest='terminate',
                        default=False,
                        action='store_true',
                        help='terminate instances')                        
    parser.add_option('--type',
                        dest='type',
                        type='string',
                        metavar='TYPE',
                        default='t1.micro',
                        help='instance type TYPE [default: %default]')
    parser.add_option('--timeout',
                        dest='timeout',
                        type='int',
                        metavar='TIMEOUT',
                        default=WAIT_TIMEOUT,
                        help='wait TIMEOUT seconds for instances')
    parser.add_option('--poll',
                        dest='poll',
                        type='int',
                        metavar='POLL',
                        default=WAIT_POLL,
                        help='poll instances for updates every POLL seconds')
    ss_group = optparse.OptionGroup(parser, 'Startup script options')
    ss_group.add_option('-n', '--name',
                        dest='name',
                        type='string',
                        default='',
                        help='application type')
    ss_group.add_option('-g','--gateway',
                        dest='gateway',
                        type='string',
                        default='',
                        help='gateway ccnx router')
    ss_group.add_option('-o', '--options',
                        dest='options',
                        type='string',
                        default='',
                        help='commandline options')
    parser.add_option_group(ss_group)
    (options, args) = parser.parse_args()
    opts_dict = vars(options)
    if options.terminate:
        terminate(**opts_dict)
    elif options.list:
        print_hosts(**opts_dict)
    elif options.status:
        print_status(**opts_dict)
    else:
        try:
            run(**opts_dict)
        except ValueError as msg:
            print('Error: {0}'.format(msg))


if __name__ == '__main__':
    main()
