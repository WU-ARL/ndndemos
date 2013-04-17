#! /opt/local/bin/python


try:
    import verify
except:
    print "ERROR: verify is not found"
    print "   You can download and install it from here https://github.com/named-data/PyCCN"
    print "   If you're using OSX and macports, you can follow instructions http://irl.cs.ucla.edu/autoconf/client.html"
    exit(1)

try:
    import pyccn
except:
    print "ERROR: pyccn is not found"
    print "   You can download and install it from here https://github.com/named-data/PyCCN"
    print "   If you're using OSX and macports, you can follow instructions http://irl.cs.ucla.edu/autoconf/client.html"
    exit(1)

import argparse



aparser = argparse.ArgumentParser(description="send interest to a certain name, receive signed content and verify the sender and content")
aparser.add_argument("c", help="name of content to retrieve")
aparser.add_argument('namespace', metavar='NDN-prefix', type=str, nargs='?',
                    help='''Key namespace or key name (e.g., /ndn/keys)''')
aparser.add_argument('-q', '--quiet', dest='verbose', action='store_false', default=True,
                    help='''Quiet mode (verify keys without printing out certification chains)''')
aparser.add_argument('-n', '--no-verify', dest='verify', action='store_false', default=True,
                    help='''Disable key verification (only enumerate)''')
aparser.add_argument('-s', '--scope', dest='scope', action='store', type=int, default=None,
                    help='''Set scope for enumeration and verification (default no scope)''')
aparser.add_argument('-t', '--timeout', dest='timeout', action='store', type=float, default=1.0,
                    help='''Maximum timeout for each fetching operation/Interest lifetime (default: 1.0s)''')
aparser.add_argument('-M', '--no-meta', dest='check_meta', action='store_false', default=True,
                    help='''Disable checking meta data (e.g., certificate expiration)''')

args = aparser.parse_args()

seq_num = 1
kv = verify.key_verifier(args)
ccn = pyccn.CCN()

while (seq_num > 0):
    #raw_input("Press Enter to send an Interest")
    
    #interestName = pyccn.Name (args.c + "/" + repr(seq_num))
    interestName = pyccn.Name(args.c)
    interest_tmpl = pyccn.Interest (exclude=None, interestLifetime = 4.0, minSuffixComponents=1, maxSuffixComponents=100, scope=args.scope)
    
    class Slurp(pyccn.Closure):
        def __init__(self):
            self.finished = False
            self.done = False
            self.co = None
            self.seq_num = 1
            
        def upcall(self, kind, upcallInfo):
            if kind == pyccn.UPCALL_CONTENT or kind == pyccn.UPCALL_CONTENT_UNVERIFIED:
                co = upcallInfo.ContentObject
                self.name = co.name
                print co.name
                #if co.name.startswith(args.c):
                self.done = True
                self.co = upcallInfo.ContentObject
                #self.seq_num = seq_num + 1
                self.finished = True
            elif kind == pyccn.UPCALL_INTEREST_TIMED_OUT:
                print "interest timed out"
                if not self.done:
                    self.done = True
                    return pyccn.RESULT_REEXPRESS
                else:
                    self.finished = True           
            return pyccn.RESULT_OK

    slurp = Slurp ()
    ccn.expressInterest(interestName, slurp, interest_tmpl)
    #print "express interest " + args.c + "/" + repr(seq_num)
    print "express interest " + args.c
    while not slurp.finished:
        ccn.run (1)
    #seq_num = seq_num + 1
    seq_num = 0

    if slurp.done:
        # print "Done with %s" % interestName
        if slurp.co:
            #get the verified key
            keyLocator = slurp.co.signedInfo.keyLocator
            if keyLocator.keyName:
                #print "VERIFYING key " + str(keyLocator.keyName)
                keyBase = str(keyLocator.keyName[:-1])
                keyEnd = str(pyccn.Name ().append (keyLocator.keyName[-1]))
                print "[%sVERIFYING%s] key name %s%s%s%s" % (verify.bcolors.OKBLUE, verify.bcolors.ENDC, verify.bcolors.OKGREEN, keyBase, verify.bcolors.ENDC, keyEnd)
                vkeyobj = kv.getVerifiedKey(keyLocator.keyName, spaces = "    ")
                if not vkeyobj:
                    print "%sUNSAFE CONTENT: key name%s %s%s%s%s %snot verified!!%s" % (verify.bcolors.FAIL, verify.bcolors.ENDC, verify.bcolors.OKGREEN, keyBase, verify.bcolors.ENDC, keyEnd, verify.bcolors.FAIL, verify.bcolors.ENDC)
                else:
                    vkey = pyccn.Key()
                    vkey.fromDER(public = vkeyobj.content)
                    if slurp.co.verify_signature(vkey):
                        text = unicode(slurp.co.content, "utf-8", "replace")
                        print("\n\n%s"% (text))
                    else:
                        print  "%sUNSAFE CONTENT: returned verified key for key name%s  %s%s%s%s %sdoes not match signing key!!%s" % (verify.bcolors.FAIL, verify.bcolors.ENDC, verify.bcolors.OKGREEN, keyBase, verify.bcolors.ENDC, keyEnd, verify.bcolors.FAIL, verify.bcolors.ENDC)
            else:
                print "no key locator key name"
            
