/* This file is created by running make-ndn-js.jsm.sh in this directory.
 * It concatenates ndn-js-header.txt with all the ndn-js source files to
 *   make ndn-js.jsm .
 * The file ../../tools/build/ndn-js.js must already be built.
 * author: Jeff Thompson
 * See COPYING for copyright and distribution information.
 */

var EXPORTED_SYMBOLS = ["Closure", "ContentObject", "DataUtils", "Exclude", "ExponentialReExpressClosure",
    "Interest", "MimeTypes", "NDN", "Name", "Sha256", "XpcomTransport"];

Components.utils.import("resource://gre/modules/XPCOMUtils.jsm");
Components.utils.import("resource://gre/modules/NetUtil.jsm");

// jsbn.js needs the navigator object which isn't defined in XPCOM, so make a local hack.
var navigator = {
    appName: "Netscape"
};

// Some code calls console.log without checking LOG>0.  Until this is cleaned up, make a local hack console.
var console = {
    log: function(message) {
        dump(message);
        dump("\n");
    }
};

// The NDN class uses setTimeout and clearTimeout, so define them using XPCOM.
function setTimeout(callback, delay) {
    var timer = Components.classes["@mozilla.org/timer;1"].createInstance(Components.interfaces.nsITimer);
    timer.initWithCallback({notify: callback}, delay, Components.interfaces.nsITimer.TYPE_ONE_SHOT);
    return timer;
}

function clearTimeout(timer) {
    timer.cancel();
}
var Closure=function(){this.ndn_data=null;this.ndn_data_dirty=!1};Closure.RESULT_ERR=-1;Closure.RESULT_OK=0;Closure.RESULT_REEXPRESS=1;Closure.RESULT_INTEREST_CONSUMED=2;Closure.RESULT_VERIFY=3;Closure.RESULT_FETCHKEY=4;Closure.UPCALL_FINAL=0;Closure.UPCALL_INTEREST=1;Closure.UPCALL_CONSUMED_INTEREST=2;Closure.UPCALL_CONTENT=3;Closure.UPCALL_INTEREST_TIMED_OUT=4;Closure.UPCALL_CONTENT_UNVERIFIED=5;Closure.UPCALL_CONTENT_BAD=6;Closure.prototype.upcall=function(){return Closure.RESULT_OK};
var UpcallInfo=function(a,b,c,d){this.ndn=a;this.interest=b;this.matchedComps=c;this.contentObject=d};UpcallInfo.prototype.toString=function(){var a="ndn = "+this.ndn,a=a+("\nInterest = "+this.interest),a=a+("\nmatchedComps = "+this.matchedComps);return a+="\nContentObject: "+this.contentObject};
var WebSocketTransport=function(){if(!WebSocket)throw Error("WebSocket support is not available on this platform.");this.elementReader=this.connectedPort=this.connectedHost=this.ws=null;this.defaultGetHostAndPort=NDN.makeShuffledGetHostAndPort(["A.ws.ndn.ucla.edu","B.ws.ndn.ucla.edu","C.ws.ndn.ucla.edu","D.ws.ndn.ucla.edu","E.ws.ndn.ucla.edu"],9696)};
WebSocketTransport.prototype.connect=function(a,b){null!=this.ws&&delete this.ws;this.ws=new WebSocket("ws://"+a.host+":"+a.port);0<LOG&&console.log("ws connection created.");this.connectedHost=a.host;this.connectedPort=a.port;this.ws.binaryType="arraybuffer";this.elementReader=new BinaryXmlElementReader(a);var c=this;this.ws.onmessage=function(a){a=a.data;if(null==a||void 0==a||""==a)console.log("INVALID ANSWER");else if(a instanceof ArrayBuffer){a=new Uint8Array(a);3<LOG&&console.log("BINARY RESPONSE IS "+
DataUtils.toHex(a));try{c.elementReader.onReceivedData(a)}catch(b){console.log("NDN.ws.onmessage exception: "+b)}}};this.ws.onopen=function(a){3<LOG&&console.log(a);3<LOG&&console.log("ws.onopen: WebSocket connection opened.");3<LOG&&console.log("ws.onopen: ReadyState: "+this.readyState);b()};this.ws.onerror=function(a){console.log("ws.onerror: ReadyState: "+this.readyState);console.log(a);console.log("ws.onerror: WebSocket error: "+a.data)};this.ws.onclose=function(){console.log("ws.onclose: WebSocket connection closed.");
c.ws=null;a.readyStatus=NDN.CLOSED;a.onclose()}};WebSocketTransport.prototype.send=function(a){if(null!=this.ws){var b=new Uint8Array(a.length);b.set(a);this.ws.send(b.buffer);3<LOG&&console.log("ws.send() returned.")}else console.log("WebSocket connection is not established.")};
var CCNProtocolDTags={Any:13,Name:14,Component:15,Certificate:16,Collection:17,CompleteName:18,Content:19,SignedInfo:20,ContentDigest:21,ContentHash:22,Count:24,Header:25,Interest:26,Key:27,KeyLocator:28,KeyName:29,Length:30,Link:31,LinkAuthenticator:32,NameComponentCount:33,RootDigest:36,Signature:37,Start:38,Timestamp:39,Type:40,Nonce:41,Scope:42,Exclude:43,Bloom:44,BloomSeed:45,AnswerOriginKind:47,InterestLifetime:48,Witness:53,SignatureBits:54,DigestAlgorithm:55,BlockSize:56,FreshnessSeconds:58,
FinalBlockID:59,PublisherPublicKeyDigest:60,PublisherCertificateDigest:61,PublisherIssuerKeyDigest:62,PublisherIssuerCertificateDigest:63,ContentObject:64,WrappedKey:65,WrappingKeyIdentifier:66,WrapAlgorithm:67,KeyAlgorithm:68,Label:69,EncryptedKey:70,EncryptedNonceKey:71,WrappingKeyName:72,Action:73,FaceID:74,IPProto:75,Host:76,Port:77,MulticastInterface:78,ForwardingFlags:79,FaceInstance:80,ForwardingEntry:81,MulticastTTL:82,MinSuffixComponents:83,MaxSuffixComponents:84,ChildSelector:85,RepositoryInfo:86,
Version:87,RepositoryVersion:88,GlobalPrefix:89,LocalName:90,Policy:91,Namespace:92,GlobalPrefixName:93,PolicyVersion:94,KeyValueSet:95,KeyValuePair:96,IntegerValue:97,DecimalValue:98,StringValue:99,BinaryValue:100,NameValue:101,Entry:102,ACL:103,ParameterizedName:104,Prefix:105,Suffix:106,Root:107,ProfileName:108,Parameters:109,InfoString:110,StatusResponse:112,StatusCode:113,StatusText:114,SyncNode:115,SyncNodeKind:116,SyncNodeElement:117,SyncVersion:118,SyncNodeElements:119,SyncContentHash:120,
SyncLeafCount:121,SyncTreeDepth:122,SyncByteCount:123,ConfigSlice:124,ConfigSliceList:125,ConfigSliceOp:126,CCNProtocolDataUnit:17702112,CCNPROTOCOL_DATA_UNIT:"CCNProtocolDataUnit"},CCNProtocolDTagsStrings=[null,null,null,null,null,null,null,null,null,null,null,null,null,"Any","Name","Component","Certificate","Collection","CompleteName","Content","SignedInfo","ContentDigest","ContentHash",null,"Count","Header","Interest","Key","KeyLocator","KeyName","Length","Link","LinkAuthenticator","NameComponentCount",
null,null,"RootDigest","Signature","Start","Timestamp","Type","Nonce","Scope","Exclude","Bloom","BloomSeed",null,"AnswerOriginKind","InterestLifetime",null,null,null,null,"Witness","SignatureBits","DigestAlgorithm","BlockSize",null,"FreshnessSeconds","FinalBlockID","PublisherPublicKeyDigest","PublisherCertificateDigest","PublisherIssuerKeyDigest","PublisherIssuerCertificateDigest","ContentObject","WrappedKey","WrappingKeyIdentifier","WrapAlgorithm","KeyAlgorithm","Label","EncryptedKey","EncryptedNonceKey",
"WrappingKeyName","Action","FaceID","IPProto","Host","Port","MulticastInterface","ForwardingFlags","FaceInstance","ForwardingEntry","MulticastTTL","MinSuffixComponents","MaxSuffixComponents","ChildSelector","RepositoryInfo","Version","RepositoryVersion","GlobalPrefix","LocalName","Policy","Namespace","GlobalPrefixName","PolicyVersion","KeyValueSet","KeyValuePair","IntegerValue","DecimalValue","StringValue","BinaryValue","NameValue","Entry","ACL","ParameterizedName","Prefix","Suffix","Root","ProfileName",
"Parameters","InfoString",null,"StatusResponse","StatusCode","StatusText","SyncNode","SyncNodeKind","SyncNodeElement","SyncVersion","SyncNodeElements","SyncContentHash","SyncLeafCount","SyncTreeDepth","SyncByteCount","ConfigSlice","ConfigSliceList","ConfigSliceOp"],CCNTime=function(a){this.NANOS_MAX=999877929;"number"==typeof a?this.msec=a:1<LOG&&console.log("UNRECOGNIZED TYPE FOR TIME")};CCNTime.prototype.getJavascriptDate=function(){var a=new Date;a.setTime(this.msec);return a};
var ExponentialReExpressClosure=function(a,b){Closure.call(this);this.callerClosure=a;b=b||{};this.maxInterestLifetime=b.maxInterestLifetime||16E3};
ExponentialReExpressClosure.prototype.upcall=function(a,b){try{if(a==Closure.UPCALL_INTEREST_TIMED_OUT){var c=b.interest.interestLifetime;if(null==c)return this.callerClosure.upcall(Closure.UPCALL_INTEREST_TIMED_OUT,b);c*=2;if(c>this.maxInterestLifetime)return this.callerClosure.upcall(Closure.UPCALL_INTEREST_TIMED_OUT,b);var d=b.interest.clone();d.interestLifetime=c;b.ndn.expressInterest(d.name,this,d);return Closure.RESULT_OK}return this.callerClosure.upcall(a,b)}catch(e){return console.log("ExponentialReExpressClosure.upcall exception: "+
e),Closure.RESULT_ERR}};var Name=function Name(b){if("string"==typeof b)3<LOG&&console.log("Content Name String "+b),this.components=Name.createNameArray(b);else if("object"===typeof b)if(this.components=[],b instanceof Name)this.add(b);else for(var c=0;c<b.length;++c)this.add(b[c]);else null==b?this.components=[]:1<LOG&&console.log("NO CONTENT NAME GIVEN")};Name.prototype.getName=function(){return this.to_uri()};
Name.createNameArray=function(a){a=a.trim();if(0>=a.length)return[];var b=a.indexOf(":");if(0<=b){var c=a.indexOf("/");if(0>c||b<c)a=a.substr(b+1,a.length-b-1).trim()}if("/"==a[0])if(2<=a.length&&"/"==a[1]){b=a.indexOf("/",2);if(0>b)return[];a=a.substr(b+1,a.length-b-1).trim()}else a=a.substr(1,a.length-1).trim();a=a.split("/");for(b=0;b<a.length;++b)c=Name.fromEscapedString(a[b]),null==c?(a.splice(b,1),--b):a[b]=c;return a};
Name.prototype.from_ccnb=function(a){a.readStartElement(this.getElementLabel());for(this.components=[];a.peekStartElement(CCNProtocolDTags.Component);)this.add(a.readBinaryElement(CCNProtocolDTags.Component));a.readEndElement()};Name.prototype.to_ccnb=function(a){if(null==this.components)throw Error("CANNOT ENCODE EMPTY CONTENT NAME");a.writeStartElement(this.getElementLabel());for(var b=this.components.length,c=0;c<b;c++)a.writeElement(CCNProtocolDTags.Component,this.components[c]);a.writeEndElement()};
Name.prototype.getElementLabel=function(){return CCNProtocolDTags.Name};
Name.prototype.add=function(a){var b;if("string"==typeof a)b=DataUtils.stringToUtf8Array(a);else if("object"==typeof a&&a instanceof Uint8Array)b=new Uint8Array(a);else if("object"==typeof a&&a instanceof ArrayBuffer)b=new Uint8Array(new ArrayBuffer(a.byteLength)),b.set(new Uint8Array(a));else{if("object"==typeof a&&a instanceof Name){a=a==this?this.components.slice(0,this.components.length):a.components;for(b=0;b<a.length;++b)this.components.push(new Uint8Array(a[b]));return this}if("object"==typeof a)b=
new Uint8Array(a);else throw Error("Cannot add Name element at index "+this.components.length+": Invalid type");}this.components.push(b);return this};Name.prototype.addSegment=function(a){for(var b=1,c=a;0<c;)b++,c>>=8;b=new Uint8Array(b);c=0;b[c]=0;for(c++;0<a;)b[c]=a&255,a>>=8,c++;this.components.push(b);return this};Name.prototype.to_uri=function(){if(0==this.components.length)return"/";for(var a="",b=0;b<this.components.length;++b)a+="/"+Name.toEscapedString(this.components[b]);return a};
Name.prototype.addSegment=function(a){a=DataUtils.nonNegativeIntToBigEndian(a);var b=new Uint8Array(a.length+1);b.set(a,1);this.components.push(b);return this};Name.prototype.getPrefix=function(a){return new Name(this.components.slice(0,a))};Name.prototype.cut=function(){return new Name(this.components.slice(0,this.components.length-1))};Name.prototype.getComponent=function(a){var b=new ArrayBuffer(this.components[a].length);(new Uint8Array(b)).set(this.components[a]);return b};
Name.prototype.indexOfFileName=function(){for(var a=this.components.length-1;0<=a;--a){var b=this.components[a];if(!(0>=b.length)&&!(0==b[0]||192==b[0]||193==b[0]||245<=b[0]&&255>=b[0]))return a}return-1};Name.prototype.equalsName=function(a){if(this.components.length!=a.components.length)return!1;for(var b=this.components.length-1;0<=b;--b)if(!DataUtils.arraysEqual(this.components[b],a.components[b]))return!1;return!0};
Name.prototype.getContentDigestValue=function(){for(var a=this.components.length-1;0<=a;--a){var b=Name.getComponentContentDigestValue(this.components[a]);if(null!=b)return b}return null};
Name.getComponentContentDigestValue=function(a){return a.length==Name.ContentDigestPrefix.length+32+Name.ContentDigestSuffix.length&&DataUtils.arraysEqual(a.subarray(0,Name.ContentDigestPrefix.length),Name.ContentDigestPrefix)&&DataUtils.arraysEqual(a.subarray(a.length-Name.ContentDigestSuffix.length,a.length),Name.ContentDigestSuffix)?a.subarray(Name.ContentDigestPrefix.length,Name.ContentDigestPrefix.length+32):null};Name.ContentDigestPrefix=new Uint8Array([193,46,77,46,71,193,1,170,2,133]);
Name.ContentDigestSuffix=new Uint8Array([0]);Name.toEscapedString=function(a){for(var b="",c=!1,d=0;d<a.length;++d)if(46!=a[d]){c=!0;break}if(c)for(d=0;d<a.length;++d)c=a[d],b=48<=c&&57>=c||65<=c&&90>=c||97<=c&&122>=c||43==c||45==c||46==c||95==c?b+String.fromCharCode(c):b+("%"+(16>c?"0":"")+c.toString(16).toUpperCase());else{b="...";for(d=0;d<a.length;++d)b+="."}return b};
Name.fromEscapedString=function(a){a=unescape(a.trim());return null==a.match(/[^.]/)?2>=a.length?null:DataUtils.toNumbersFromString(a.substr(3,a.length-3)):DataUtils.toNumbersFromString(a)};Name.prototype.match=function(a){var b=this.components;a=a.components;if(b.length>a.length)return!1;for(var c=0;c<b.length;++c)if(!DataUtils.arraysEqual(b[c],a[c]))return!1;return!0};
var ContentObject=function(a,b,c,d){this.name="string"==typeof a?new Name(a):a;this.signedInfo=b;this.content="string"==typeof c?DataUtils.toNumbersFromString(c):c;this.signature=d;this.rawSignatureData=this.endContent=this.endSIG=this.startSIG=null};
ContentObject.prototype.sign=function(){var a=this.encodeObject(this.name),b=this.encodeObject(this.signedInfo),c=this.encodeContent(),d=new ArrayBuffer(a.length+b.length+c.length),d=new Uint8Array(d);d.set(a,0);d.set(b,a.length);d.set(c,a.length+b.length);4<LOG&&console.log("Signature Data is (binary) "+d);4<LOG&&console.log("Signature Data is (RawString)");4<LOG&&console.log(DataUtils.toString(d));a=new RSAKey;a.readPrivateKeyFromPEMString(globalKeyManager.privateKey);a=a.signByteArrayWithSHA256(d);
4<LOG&&console.log("SIGNATURE SAVED IS");4<LOG&&console.log(a);4<LOG&&console.log(DataUtils.toNumbers(a.trim()));this.signature.signature=DataUtils.toNumbers(a.trim())};ContentObject.prototype.encodeObject=function(a){var b=new BinaryXMLEncoder;a.to_ccnb(b);return b.getReducedOstream()};ContentObject.prototype.encodeContent=function(){var a=new BinaryXMLEncoder;a.writeElement(CCNProtocolDTags.Content,this.content);return a.getReducedOstream()};
ContentObject.prototype.saveRawData=function(a){this.rawSignatureData=a.subarray(this.startSIG,this.endSIG)};
ContentObject.prototype.from_ccnb=function(a){a.readStartElement(this.getElementLabel());a.peekStartElement(CCNProtocolDTags.Signature)&&(this.signature=new Signature,this.signature.from_ccnb(a));this.startSIG=a.offset;this.name=new Name;this.name.from_ccnb(a);a.peekStartElement(CCNProtocolDTags.SignedInfo)&&(this.signedInfo=new SignedInfo,this.signedInfo.from_ccnb(a));this.content=a.readBinaryElement(CCNProtocolDTags.Content,null,!0);this.endSIG=a.offset;a.readEndElement();this.saveRawData(a.istream)};
ContentObject.prototype.to_ccnb=function(a){a.writeStartElement(this.getElementLabel());null!=this.signature&&this.signature.to_ccnb(a);this.startSIG=a.offset;null!=this.name&&this.name.to_ccnb(a);null!=this.signedInfo&&this.signedInfo.to_ccnb(a);a.writeElement(CCNProtocolDTags.Content,this.content);this.endSIG=a.offset;a.writeEndElement();this.saveRawData(a.ostream)};ContentObject.prototype.getElementLabel=function(){return CCNProtocolDTags.ContentObject};
var Signature=function(a,b,c){this.Witness=a;this.signature=b;this.digestAlgorithm=c};
Signature.prototype.from_ccnb=function(a){a.readStartElement(this.getElementLabel());4<LOG&&console.log("STARTED DECODING SIGNATURE");a.peekStartElement(CCNProtocolDTags.DigestAlgorithm)&&(4<LOG&&console.log("DIGIEST ALGORITHM FOUND"),this.digestAlgorithm=a.readUTF8Element(CCNProtocolDTags.DigestAlgorithm));a.peekStartElement(CCNProtocolDTags.Witness)&&(4<LOG&&console.log("WITNESS FOUND"),this.Witness=a.readBinaryElement(CCNProtocolDTags.Witness));4<LOG&&console.log("SIGNATURE FOUND");this.signature=
a.readBinaryElement(CCNProtocolDTags.SignatureBits);a.readEndElement()};
Signature.prototype.to_ccnb=function(a){if(!this.validate())throw Error("Cannot encode: field values missing.");a.writeStartElement(this.getElementLabel());null!=this.digestAlgorithm&&!this.digestAlgorithm.equals(CCNDigestHelper.DEFAULT_DIGEST_ALGORITHM)&&a.writeElement(CCNProtocolDTags.DigestAlgorithm,OIDLookup.getDigestOID(this.DigestAlgorithm));null!=this.Witness&&a.writeElement(CCNProtocolDTags.Witness,this.Witness);a.writeElement(CCNProtocolDTags.SignatureBits,this.signature);a.writeEndElement()};
Signature.prototype.getElementLabel=function(){return CCNProtocolDTags.Signature};Signature.prototype.validate=function(){return null!=this.signature};
var ContentType={DATA:0,ENCR:1,GONE:2,KEY:3,LINK:4,NACK:5},ContentTypeValue={"0":787648,1:1101969,2:1631044,3:2639423,4:2917194,5:3408010},ContentTypeValueReverse={787648:0,1101969:1,1631044:2,2639423:3,2917194:4,3408010:5},SignedInfo=function(a,b,c,d,e,f){this.publisher=a;this.timestamp=b;this.type=c;this.locator=d;this.freshnessSeconds=e;this.finalBlockID=f;this.setFields()};
SignedInfo.prototype.setFields=function(){var a=globalKeyManager.publicKey;4<LOG&&console.log("PUBLIC KEY TO WRITE TO CONTENT OBJECT IS ");4<LOG&&console.log(a);var a=DataUtils.toNumbers(globalKeyManager.publicKey),b=hex_sha256_from_bytes(a);this.publisher=new PublisherPublicKeyDigest(DataUtils.toNumbers(b));b=(new Date).getTime();this.timestamp=new CCNTime(b);4<LOG&&console.log("TIME msec is");4<LOG&&console.log(this.timestamp.msec);this.type=0;4<LOG&&console.log("PUBLIC KEY TO WRITE TO CONTENT OBJECT IS ");
4<LOG&&console.log(a);this.locator=new KeyLocator(a,KeyLocatorType.KEY)};
SignedInfo.prototype.from_ccnb=function(a){a.readStartElement(this.getElementLabel());a.peekStartElement(CCNProtocolDTags.PublisherPublicKeyDigest)&&(4<LOG&&console.log("DECODING PUBLISHER KEY"),this.publisher=new PublisherPublicKeyDigest,this.publisher.from_ccnb(a));a.peekStartElement(CCNProtocolDTags.Timestamp)&&(4<LOG&&console.log("DECODING TIMESTAMP"),this.timestamp=a.readDateTime(CCNProtocolDTags.Timestamp));if(a.peekStartElement(CCNProtocolDTags.Type)){var b=a.readBinaryElement(CCNProtocolDTags.Type);
4<LOG&&console.log("Binary Type of of Signed Info is "+b);this.type=b;if(null==this.type)throw Error("Cannot parse signedInfo type: bytes.");}else this.type=ContentType.DATA;a.peekStartElement(CCNProtocolDTags.FreshnessSeconds)&&(this.freshnessSeconds=a.readIntegerElement(CCNProtocolDTags.FreshnessSeconds),4<LOG&&console.log("FRESHNESS IN SECONDS IS "+this.freshnessSeconds));a.peekStartElement(CCNProtocolDTags.FinalBlockID)&&(4<LOG&&console.log("DECODING FINAL BLOCKID"),this.finalBlockID=a.readBinaryElement(CCNProtocolDTags.FinalBlockID));
a.peekStartElement(CCNProtocolDTags.KeyLocator)&&(4<LOG&&console.log("DECODING KEY LOCATOR"),this.locator=new KeyLocator,this.locator.from_ccnb(a));a.readEndElement()};
SignedInfo.prototype.to_ccnb=function(a){if(!this.validate())throw Error("Cannot encode : field values missing.");a.writeStartElement(this.getElementLabel());null!=this.publisher&&(3<LOG&&console.log("ENCODING PUBLISHER KEY"+this.publisher.publisherPublicKeyDigest),this.publisher.to_ccnb(a));null!=this.timestamp&&a.writeDateTime(CCNProtocolDTags.Timestamp,this.timestamp);null!=this.type&&0!=this.type&&a.writeElement(CCNProtocolDTags.type,this.type);null!=this.freshnessSeconds&&a.writeElement(CCNProtocolDTags.FreshnessSeconds,
this.freshnessSeconds);null!=this.finalBlockID&&a.writeElement(CCNProtocolDTags.FinalBlockID,this.finalBlockID);null!=this.locator&&this.locator.to_ccnb(a);a.writeEndElement()};SignedInfo.prototype.valueToType=function(){return null};SignedInfo.prototype.getElementLabel=function(){return CCNProtocolDTags.SignedInfo};SignedInfo.prototype.validate=function(){return null==this.publisher||null==this.timestamp||null==this.locator?!1:!0};
var DateFormat=function(){var a=/d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,b=/\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,c=/[^-+\dA-Z]/g,d=function(a,b){a=String(a);for(b=b||2;a.length<b;)a="0"+a;return a};return function(e,f,g){var h=dateFormat;1==arguments.length&&("[object String]"==Object.prototype.toString.call(e)&&!/\d/.test(e))&&(f=e,e=void 0);e=e?new Date(e):new Date;if(isNaN(e))throw SyntaxError("invalid date");
f=String(h.masks[f]||f||h.masks["default"]);"UTC:"==f.slice(0,4)&&(f=f.slice(4),g=!0);var j=g?"getUTC":"get",l=e[j+"Date"](),n=e[j+"Day"](),m=e[j+"Month"](),p=e[j+"FullYear"](),k=e[j+"Hours"](),q=e[j+"Minutes"](),s=e[j+"Seconds"](),j=e[j+"Milliseconds"](),r=g?0:e.getTimezoneOffset(),t={d:l,dd:d(l),ddd:h.i18n.dayNames[n],dddd:h.i18n.dayNames[n+7],m:m+1,mm:d(m+1),mmm:h.i18n.monthNames[m],mmmm:h.i18n.monthNames[m+12],yy:String(p).slice(2),yyyy:p,h:k%12||12,hh:d(k%12||12),H:k,HH:d(k),M:q,MM:d(q),s:s,
ss:d(s),l:d(j,3),L:d(99<j?Math.round(j/10):j),t:12>k?"a":"p",tt:12>k?"am":"pm",T:12>k?"A":"P",TT:12>k?"AM":"PM",Z:g?"UTC":(String(e).match(b)||[""]).pop().replace(c,""),o:(0<r?"-":"+")+d(100*Math.floor(Math.abs(r)/60)+Math.abs(r)%60,4),S:["th","st","nd","rd"][3<l%10?0:(10!=l%100-l%10)*l%10]};return f.replace(a,function(a){return a in t?t[a]:a.slice(1,a.length-1)})}}();
DateFormat.masks={"default":"ddd mmm dd yyyy HH:MM:ss",shortDate:"m/d/yy",mediumDate:"mmm d, yyyy",longDate:"mmmm d, yyyy",fullDate:"dddd, mmmm d, yyyy",shortTime:"h:MM TT",mediumTime:"h:MM:ss TT",longTime:"h:MM:ss TT Z",isoDate:"yyyy-mm-dd",isoTime:"HH:MM:ss",isoDateTime:"yyyy-mm-dd'T'HH:MM:ss",isoUtcDateTime:"UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"};DateFormat.i18n={dayNames:"Sun Mon Tue Wed Thu Fri Sat Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),monthNames:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec January February March April May June July August September October November December".split(" ")};
Date.prototype.format=function(a,b){return dateFormat(this,a,b)};var Interest=function(a,b,c,d,e,f,g,h,j,l,n){this.name=a;this.faceInstance=b;this.maxSuffixComponents=d;this.minSuffixComponents=c;this.publisherPublicKeyDigest=e;this.exclude=f;this.childSelector=g;this.answerOriginKind=h;this.scope=j;this.interestLifetime=l;this.nonce=n};Interest.RECURSIVE_POSTFIX="*";Interest.CHILD_SELECTOR_LEFT=0;Interest.CHILD_SELECTOR_RIGHT=1;Interest.ANSWER_CONTENT_STORE=1;Interest.ANSWER_GENERATED=2;
Interest.ANSWER_STALE=4;Interest.MARK_STALE=16;Interest.DEFAULT_ANSWER_ORIGIN_KIND=Interest.ANSWER_CONTENT_STORE|Interest.ANSWER_GENERATED;
Interest.prototype.from_ccnb=function(a){a.readStartElement(CCNProtocolDTags.Interest);this.name=new Name;this.name.from_ccnb(a);a.peekStartElement(CCNProtocolDTags.MinSuffixComponents)&&(this.minSuffixComponents=a.readIntegerElement(CCNProtocolDTags.MinSuffixComponents));a.peekStartElement(CCNProtocolDTags.MaxSuffixComponents)&&(this.maxSuffixComponents=a.readIntegerElement(CCNProtocolDTags.MaxSuffixComponents));a.peekStartElement(CCNProtocolDTags.PublisherPublicKeyDigest)&&(this.publisherPublicKeyDigest=
new PublisherPublicKeyDigest,this.publisherPublicKeyDigest.from_ccnb(a));a.peekStartElement(CCNProtocolDTags.Exclude)&&(this.exclude=new Exclude,this.exclude.from_ccnb(a));a.peekStartElement(CCNProtocolDTags.ChildSelector)&&(this.childSelector=a.readIntegerElement(CCNProtocolDTags.ChildSelector));a.peekStartElement(CCNProtocolDTags.AnswerOriginKind)&&(this.answerOriginKind=a.readIntegerElement(CCNProtocolDTags.AnswerOriginKind));a.peekStartElement(CCNProtocolDTags.Scope)&&(this.scope=a.readIntegerElement(CCNProtocolDTags.Scope));
a.peekStartElement(CCNProtocolDTags.InterestLifetime)&&(this.interestLifetime=1E3*DataUtils.bigEndianToUnsignedInt(a.readBinaryElement(CCNProtocolDTags.InterestLifetime))/4096);a.peekStartElement(CCNProtocolDTags.Nonce)&&(this.nonce=a.readBinaryElement(CCNProtocolDTags.Nonce));a.readEndElement()};
Interest.prototype.to_ccnb=function(a){a.writeStartElement(CCNProtocolDTags.Interest);this.name.to_ccnb(a);null!=this.minSuffixComponents&&a.writeElement(CCNProtocolDTags.MinSuffixComponents,this.minSuffixComponents);null!=this.maxSuffixComponents&&a.writeElement(CCNProtocolDTags.MaxSuffixComponents,this.maxSuffixComponents);null!=this.publisherPublicKeyDigest&&this.publisherPublicKeyDigest.to_ccnb(a);null!=this.exclude&&this.exclude.to_ccnb(a);null!=this.childSelector&&a.writeElement(CCNProtocolDTags.ChildSelector,
this.childSelector);this.DEFAULT_ANSWER_ORIGIN_KIND!=this.answerOriginKind&&null!=this.answerOriginKind&&a.writeElement(CCNProtocolDTags.AnswerOriginKind,this.answerOriginKind);null!=this.scope&&a.writeElement(CCNProtocolDTags.Scope,this.scope);null!=this.interestLifetime&&a.writeElement(CCNProtocolDTags.InterestLifetime,DataUtils.nonNegativeIntToBigEndian(4096*(this.interestLifetime/1E3)));null!=this.nonce&&a.writeElement(CCNProtocolDTags.Nonce,this.nonce);a.writeEndElement()};
Interest.prototype.matches_name=function(a){return!this.name.match(a)||null!=this.minSuffixComponents&&!(a.components.length+1-this.name.components.length>=this.minSuffixComponents)||null!=this.maxSuffixComponents&&!(a.components.length+1-this.name.components.length<=this.maxSuffixComponents)||null!=this.exclude&&a.components.length>this.name.components.length&&this.exclude.matches(a.components[this.name.components.length])?!1:!0};
Interest.prototype.clone=function(){return new Interest(this.name,this.faceInstance,this.minSuffixComponents,this.maxSuffixComponents,this.publisherPublicKeyDigest,this.exclude,this.childSelector,this.answerOriginKind,this.scope,this.interestLifetime,this.nonce)};var Exclude=function(a){this.values=a||[]};Exclude.ANY="*";
Exclude.prototype.from_ccnb=function(a){for(a.readStartElement(CCNProtocolDTags.Exclude);;)if(a.peekStartElement(CCNProtocolDTags.Component))this.values.push(a.readBinaryElement(CCNProtocolDTags.Component));else if(a.peekStartElement(CCNProtocolDTags.Any))a.readStartElement(CCNProtocolDTags.Any),a.readEndElement(),this.values.push(Exclude.ANY);else if(a.peekStartElement(CCNProtocolDTags.Bloom))a.readBinaryElement(CCNProtocolDTags.Bloom),this.values.push(Exclude.ANY);else break;a.readEndElement()};
Exclude.prototype.to_ccnb=function(a){if(!(null==this.values||0==this.values.length)){a.writeStartElement(CCNProtocolDTags.Exclude);for(var b=0;b<this.values.length;++b)this.values[b]==Exclude.ANY?(a.writeStartElement(CCNProtocolDTags.Any),a.writeEndElement()):a.writeElement(CCNProtocolDTags.Component,this.values[b]);a.writeEndElement()}};
Exclude.prototype.to_uri=function(){if(null==this.values||0==this.values.length)return"";for(var a="",b=0;b<this.values.length;++b)0<b&&(a+=","),a=this.values[b]==Exclude.ANY?a+"*":a+Name.toEscapedString(this.values[b]);return a};
Exclude.prototype.matches=function(a){for(var b=0;b<this.values.length;++b)if(this.values[b]==Exclude.ANY){var c=null;0<b&&(c=this.values[b-1]);var d,e=null;for(d=b+1;d<this.values.length;++d)if(this.values[d]!=Exclude.ANY){e=this.values[d];break}if(null!=e){if(null!=c){if(0<Exclude.compareComponents(a,c)&&0>Exclude.compareComponents(a,e))return!0}else if(0>Exclude.compareComponents(a,e))return!0;b=d-1}else if(null!=c){if(0<Exclude.compareComponents(a,c))return!0}else return!0}else if(DataUtils.arraysEqual(a,
this.values[b]))return!0;return!1};Exclude.compareComponents=function(a,b){if(a.length<b.length)return-1;if(a.length>b.length)return 1;for(var c=0;c<a.length;++c){if(a[c]<b[c])return-1;if(a[c]>b[c])return 1}return 0};
var Key=function(){},KeyLocatorType={KEY:1,CERTIFICATE:2,KEYNAME:3},KeyLocator=function(a,b){this.type=b;b==KeyLocatorType.KEYNAME?(3<LOG&&console.log("KeyLocator: SET KEYNAME"),this.keyName=a):b==KeyLocatorType.KEY?(3<LOG&&console.log("KeyLocator: SET KEY"),this.publicKey=a):b==KeyLocatorType.CERTIFICATE&&(3<LOG&&console.log("KeyLocator: SET CERTIFICATE"),this.certificate=a)};
KeyLocator.prototype.from_ccnb=function(a){a.readStartElement(this.getElementLabel());if(a.peekStartElement(CCNProtocolDTags.Key)){try{this.publicKey=a.readBinaryElement(CCNProtocolDTags.Key),this.type=KeyLocatorType.KEY,4<LOG&&console.log("PUBLIC KEY FOUND: "+this.publicKey)}catch(b){throw Error("Cannot parse key: ",b);}if(null==this.publicKey)throw Error("Cannot parse key: ");}else if(a.peekStartElement(CCNProtocolDTags.Certificate)){try{this.certificate=a.readBinaryElement(CCNProtocolDTags.Certificate),
this.type=KeyLocatorType.CERTIFICATE,4<LOG&&console.log("CERTIFICATE FOUND: "+this.certificate)}catch(c){throw Error("Cannot decode certificate: "+c);}if(null==this.certificate)throw Error("Cannot parse certificate! ");}else this.type=KeyLocatorType.KEYNAME,this.keyName=new KeyName,this.keyName.from_ccnb(a);a.readEndElement()};
KeyLocator.prototype.to_ccnb=function(a){4<LOG&&console.log("type is is "+this.type);if(!this.validate())throw new ContentEncodingException("Cannot encode "+this.getClass().getName()+": field values missing.");a.writeStartElement(this.getElementLabel());if(this.type==KeyLocatorType.KEY)5<LOG&&console.log("About to encode a public key"+this.publicKey),a.writeElement(CCNProtocolDTags.Key,this.publicKey);else if(this.type==KeyLocatorType.CERTIFICATE)try{a.writeElement(CCNProtocolDTags.Certificate,this.certificate)}catch(b){throw Error("CertificateEncodingException attempting to write key locator: "+
b);}else this.type==KeyLocatorType.KEYNAME&&this.keyName.to_ccnb(a);a.writeEndElement()};KeyLocator.prototype.getElementLabel=function(){return CCNProtocolDTags.KeyLocator};KeyLocator.prototype.validate=function(){return null!=this.keyName||null!=this.publicKey||null!=this.certificate};var KeyName=function(){this.contentName=this.contentName;this.publisherID=this.publisherID};
KeyName.prototype.from_ccnb=function(a){a.readStartElement(this.getElementLabel());this.contentName=new Name;this.contentName.from_ccnb(a);4<LOG&&console.log("KEY NAME FOUND: ");PublisherID.peek(a)&&(this.publisherID=new PublisherID,this.publisherID.from_ccnb(a));a.readEndElement()};
KeyName.prototype.to_ccnb=function(a){if(!this.validate())throw Error("Cannot encode : field values missing.");a.writeStartElement(this.getElementLabel());this.contentName.to_ccnb(a);null!=this.publisherID&&this.publisherID.to_ccnb(a);a.writeEndElement()};KeyName.prototype.getElementLabel=function(){return CCNProtocolDTags.KeyName};KeyName.prototype.validate=function(){return null!=this.contentName};
var PublisherType=function(a){this.KEY=CCNProtocolDTags.PublisherPublicKeyDigest;this.CERTIFICATE=CCNProtocolDTags.PublisherCertificateDigest;this.ISSUER_KEY=CCNProtocolDTags.PublisherIssuerKeyDigest;this.ISSUER_CERTIFICATE=CCNProtocolDTags.PublisherIssuerCertificateDigest;this.Tag=a},isTypeTagVal=function(a){return a==CCNProtocolDTags.PublisherPublicKeyDigest||a==CCNProtocolDTags.PublisherCertificateDigest||a==CCNProtocolDTags.PublisherIssuerKeyDigest||a==CCNProtocolDTags.PublisherIssuerCertificateDigest?
!0:!1},PublisherID=function(){this.PUBLISHER_ID_DIGEST_ALGORITHM="SHA-256";this.PUBLISHER_ID_LEN=32;this.publisherType=this.publisherID=null};
PublisherID.prototype.from_ccnb=function(a){var b=a.peekStartElementAsLong();if(null==b)throw Error("Cannot parse publisher ID.");this.publisherType=new PublisherType(b);if(!isTypeTagVal(b))throw Error("Invalid publisher ID, got unexpected type: "+b);this.publisherID=a.readBinaryElement(b);if(null==this.publisherID)throw new ContentDecodingException(Error("Cannot parse publisher ID of type : "+b+"."));};
PublisherID.prototype.to_ccnb=function(a){if(!this.validate())throw Error("Cannot encode "+this.getClass().getName()+": field values missing.");a.writeElement(this.getElementLabel(),this.publisherID)};PublisherID.peek=function(a){a=a.peekStartElementAsLong();return null==a?!1:isTypeTagVal(a)};PublisherID.prototype.getElementLabel=function(){return this.publisherType.Tag};PublisherID.prototype.validate=function(){return null!=id()&&null!=type()};
var PublisherPublicKeyDigest=function(a){this.PUBLISHER_ID_LEN=64;this.publisherPublicKeyDigest=a};
PublisherPublicKeyDigest.prototype.from_ccnb=function(a){this.publisherPublicKeyDigest=a.readBinaryElement(this.getElementLabel());4<LOG&&console.log("Publisher public key digest is "+this.publisherPublicKeyDigest);if(null==this.publisherPublicKeyDigest)throw Error("Cannot parse publisher key digest.");this.publisherPublicKeyDigest.length!=this.PUBLISHER_ID_LEN&&0<LOG&&console.log("LENGTH OF PUBLISHER ID IS WRONG! Expected "+this.PUBLISHER_ID_LEN+", got "+this.publisherPublicKeyDigest.length)};
PublisherPublicKeyDigest.prototype.to_ccnb=function(a){if(!this.validate())throw Error("Cannot encode : field values missing.");3<LOG&&console.log("PUBLISHER KEY DIGEST IS"+this.publisherPublicKeyDigest);a.writeElement(this.getElementLabel(),this.publisherPublicKeyDigest)};PublisherPublicKeyDigest.prototype.getElementLabel=function(){return CCNProtocolDTags.PublisherPublicKeyDigest};PublisherPublicKeyDigest.prototype.validate=function(){return null!=this.publisherPublicKeyDigest};
var NetworkProtocol={TCP:6,UDP:17},FaceInstance=function(a,b,c,d,e,f,g,h,j){this.action=a;this.publisherPublicKeyDigest=b;this.faceID=c;this.ipProto=d;this.host=e;this.Port=f;this.multicastInterface=g;this.multicastTTL=h;this.freshnessSeconds=j};
FaceInstance.prototype.from_ccnb=function(a){a.readStartElement(this.getElementLabel());a.peekStartElement(CCNProtocolDTags.Action)&&(this.action=a.readUTF8Element(CCNProtocolDTags.Action));a.peekStartElement(CCNProtocolDTags.PublisherPublicKeyDigest)&&(this.publisherPublicKeyDigest=new PublisherPublicKeyDigest,this.publisherPublicKeyDigest.from_ccnb(a));a.peekStartElement(CCNProtocolDTags.FaceID)&&(this.faceID=a.readIntegerElement(CCNProtocolDTags.FaceID));if(a.peekStartElement(CCNProtocolDTags.IPProto)){var b=
a.readIntegerElement(CCNProtocolDTags.IPProto);this.ipProto=null;if(NetworkProtocol.TCP==b)this.ipProto=NetworkProtocol.TCP;else if(NetworkProtocol.UDP==b)this.ipProto=NetworkProtocol.UDP;else throw Error("FaceInstance.decoder.  Invalid "+CCNProtocolDTags.tagToString(CCNProtocolDTags.IPProto)+" field: "+b);}a.peekStartElement(CCNProtocolDTags.Host)&&(this.host=a.readUTF8Element(CCNProtocolDTags.Host));a.peekStartElement(CCNProtocolDTags.Port)&&(this.Port=a.readIntegerElement(CCNProtocolDTags.Port));
a.peekStartElement(CCNProtocolDTags.MulticastInterface)&&(this.multicastInterface=a.readUTF8Element(CCNProtocolDTags.MulticastInterface));a.peekStartElement(CCNProtocolDTags.MulticastTTL)&&(this.multicastTTL=a.readIntegerElement(CCNProtocolDTags.MulticastTTL));a.peekStartElement(CCNProtocolDTags.FreshnessSeconds)&&(this.freshnessSeconds=a.readIntegerElement(CCNProtocolDTags.FreshnessSeconds));a.readEndElement()};
FaceInstance.prototype.to_ccnb=function(a){a.writeStartElement(this.getElementLabel());null!=this.action&&0!=this.action.length&&a.writeElement(CCNProtocolDTags.Action,this.action);null!=this.publisherPublicKeyDigest&&this.publisherPublicKeyDigest.to_ccnb(a);null!=this.faceID&&a.writeElement(CCNProtocolDTags.FaceID,this.faceID);null!=this.ipProto&&a.writeElement(CCNProtocolDTags.IPProto,this.ipProto);null!=this.host&&0!=this.host.length&&a.writeElement(CCNProtocolDTags.Host,this.host);null!=this.Port&&
a.writeElement(CCNProtocolDTags.Port,this.Port);null!=this.multicastInterface&&0!=this.multicastInterface.length&&a.writeElement(CCNProtocolDTags.MulticastInterface,this.multicastInterface);null!=this.multicastTTL&&a.writeElement(CCNProtocolDTags.MulticastTTL,this.multicastTTL);null!=this.freshnessSeconds&&a.writeElement(CCNProtocolDTags.FreshnessSeconds,this.freshnessSeconds);a.writeEndElement()};FaceInstance.prototype.getElementLabel=function(){return CCNProtocolDTags.FaceInstance};
var ForwardingEntry=function(a,b,c,d,e,f){this.action=a;this.prefixName=b;this.ccndID=c;this.faceID=d;this.flags=e;this.lifetime=f};
ForwardingEntry.prototype.from_ccnb=function(a){a.readStartElement(this.getElementLabel());a.peekStartElement(CCNProtocolDTags.Action)&&(this.action=a.readUTF8Element(CCNProtocolDTags.Action));a.peekStartElement(CCNProtocolDTags.Name)&&(this.prefixName=new Name,this.prefixName.from_ccnb(a));a.peekStartElement(CCNProtocolDTags.PublisherPublicKeyDigest)&&(this.CcndId=new PublisherPublicKeyDigest,this.CcndId.from_ccnb(a));a.peekStartElement(CCNProtocolDTags.FaceID)&&(this.faceID=a.readIntegerElement(CCNProtocolDTags.FaceID));
a.peekStartElement(CCNProtocolDTags.ForwardingFlags)&&(this.flags=a.readIntegerElement(CCNProtocolDTags.ForwardingFlags));a.peekStartElement(CCNProtocolDTags.FreshnessSeconds)&&(this.lifetime=a.readIntegerElement(CCNProtocolDTags.FreshnessSeconds));a.readEndElement()};
ForwardingEntry.prototype.to_ccnb=function(a){a.writeStartElement(this.getElementLabel());null!=this.action&&0!=this.action.length&&a.writeElement(CCNProtocolDTags.Action,this.action);null!=this.prefixName&&this.prefixName.to_ccnb(a);null!=this.CcndId&&this.CcndId.to_ccnb(a);null!=this.faceID&&a.writeElement(CCNProtocolDTags.FaceID,this.faceID);null!=this.flags&&a.writeElement(CCNProtocolDTags.ForwardingFlags,this.flags);null!=this.lifetime&&a.writeElement(CCNProtocolDTags.FreshnessSeconds,this.lifetime);
a.writeEndElement()};ForwardingEntry.prototype.getElementLabel=function(){return CCNProtocolDTags.ForwardingEntry};var DynamicUint8Array=function(a){a||(a=16);this.array=new Uint8Array(a);this.length=a};DynamicUint8Array.prototype.ensureLength=function(a){if(!(this.array.length>=a)){var b=2*this.array.length;a>b&&(b=a);a=new Uint8Array(b);a.set(this.array);this.array=a;this.length=b}};DynamicUint8Array.prototype.set=function(a,b){this.ensureLength(a.length+b);this.array.set(a,b)};
DynamicUint8Array.prototype.subarray=function(a,b){return this.array.subarray(a,b)};
var XML_EXT=0,XML_TAG=1,XML_DTAG=2,XML_ATTR=3,XML_DATTR=4,XML_BLOB=5,XML_UDATA=6,XML_CLOSE=0,XML_SUBTYPE_PROCESSING_INSTRUCTIONS=16,XML_TT_BITS=3,XML_TT_MASK=(1<<XML_TT_BITS)-1,XML_TT_VAL_BITS=XML_TT_BITS+1,XML_TT_VAL_MASK=(1<<XML_TT_VAL_BITS)-1,XML_REG_VAL_BITS=7,XML_REG_VAL_MASK=(1<<XML_REG_VAL_BITS)-1,XML_TT_NO_MORE=1<<XML_REG_VAL_BITS,BYTE_MASK=255,LONG_BYTES=8,LONG_BITS=64,bits_11=2047,bits_18=262143,bits_32=4294967295,BinaryXMLEncoder=function(){this.ostream=new DynamicUint8Array(100);this.offset=
0;this.CODEC_NAME="Binary"};BinaryXMLEncoder.prototype.writeUString=function(a){this.encodeUString(a,XML_UDATA)};BinaryXMLEncoder.prototype.writeBlob=function(a){3<LOG&&console.log(a);this.encodeBlob(a,a.length)};BinaryXMLEncoder.prototype.writeStartElement=function(a,b){null==a?this.encodeUString(a,XML_TAG):this.encodeTypeAndVal(XML_DTAG,a);null!=b&&this.writeAttributes(b)};
BinaryXMLEncoder.prototype.writeEndElement=function(){this.ostream.ensureLength(this.offset+1);this.ostream.array[this.offset]=XML_CLOSE;this.offset+=1};BinaryXMLEncoder.prototype.writeAttributes=function(a){if(null!=a)for(var b=0;b<a.length;b++){var c=a[b].k,d=a[b].v,e=stringToTag(c);null==e?this.encodeUString(c,XML_ATTR):this.encodeTypeAndVal(XML_DATTR,e);this.encodeUString(d)}};
stringToTag=function(a){return 0<=a&&a<CCNProtocolDTagsStrings.length?CCNProtocolDTagsStrings[a]:a==CCNProtocolDTags.CCNProtocolDataUnit?CCNProtocolDTags.CCNPROTOCOL_DATA_UNIT:null};tagToString=function(a){for(var b=0;b<CCNProtocolDTagsStrings.length;++b)if(null!=CCNProtocolDTagsStrings[b]&&CCNProtocolDTagsStrings[b]==a)return b;return CCNProtocolDTags.CCNPROTOCOL_DATA_UNIT==a?CCNProtocolDTags.CCNProtocolDataUnit:null};
BinaryXMLEncoder.prototype.writeElement=function(a,b,c){this.writeStartElement(a,c);"number"===typeof b?(4<LOG&&console.log("GOING TO WRITE THE NUMBER .charCodeAt(0) "+b.toString().charCodeAt(0)),4<LOG&&console.log("GOING TO WRITE THE NUMBER "+b.toString()),4<LOG&&console.log("type of number is "+typeof b.toString()),this.writeUString(b.toString())):"string"===typeof b?(4<LOG&&console.log("GOING TO WRITE THE STRING  "+b),4<LOG&&console.log("type of STRING is "+typeof b),this.writeUString(b)):(4<LOG&&
console.log("GOING TO WRITE A BLOB  "+b),this.writeBlob(b));this.writeEndElement()};var TypeAndVal=function(a,b){this.type=a;this.val=b};
BinaryXMLEncoder.prototype.encodeTypeAndVal=function(a,b){4<LOG&&console.log("Encoding type "+a+" and value "+b);4<LOG&&console.log("OFFSET IS "+this.offset);if(a>XML_UDATA||0>a||0>b)throw Error("Tag and value must be positive, and tag valid.");var c=this.numEncodingBytes(b);this.ostream.ensureLength(this.offset+c);this.ostream.array[this.offset+c-1]=BYTE_MASK&(XML_TT_MASK&a|(XML_TT_VAL_MASK&b)<<XML_TT_BITS)|XML_TT_NO_MORE;b>>>=XML_TT_VAL_BITS;for(var d=this.offset+c-2;0!=b&&d>=this.offset;)this.ostream.array[d]=
BYTE_MASK&b&XML_REG_VAL_MASK,b>>>=XML_REG_VAL_BITS,--d;if(0!=b)throw Error("This should not happen: miscalculated encoding");this.offset+=c;return c};
BinaryXMLEncoder.prototype.encodeUString=function(a,b){if(null!=a&&!(b==XML_TAG||b==XML_ATTR&&0==a.length)){3<LOG&&console.log("The string to write is ");3<LOG&&console.log(a);var c=DataUtils.stringToUtf8Array(a);this.encodeTypeAndVal(b,b==XML_TAG||b==XML_ATTR?c.length-1:c.length);3<LOG&&console.log("THE string to write is ");3<LOG&&console.log(c);this.writeString(c);this.offset+=c.length}};
BinaryXMLEncoder.prototype.encodeBlob=function(a,b){null!=a&&(4<LOG&&console.log("LENGTH OF XML_BLOB IS "+b),this.encodeTypeAndVal(XML_BLOB,b),this.writeBlobArray(a),this.offset+=b)};var ENCODING_LIMIT_1_BYTE=(1<<XML_TT_VAL_BITS)-1,ENCODING_LIMIT_2_BYTES=(1<<XML_TT_VAL_BITS+XML_REG_VAL_BITS)-1,ENCODING_LIMIT_3_BYTES=(1<<XML_TT_VAL_BITS+2*XML_REG_VAL_BITS)-1;
BinaryXMLEncoder.prototype.numEncodingBytes=function(a){if(a<=ENCODING_LIMIT_1_BYTE)return 1;if(a<=ENCODING_LIMIT_2_BYTES)return 2;if(a<=ENCODING_LIMIT_3_BYTES)return 3;var b=1;for(a>>>=XML_TT_VAL_BITS;0!=a;)b++,a>>>=XML_REG_VAL_BITS;return b};
BinaryXMLEncoder.prototype.writeDateTime=function(a,b){4<LOG&&console.log("ENCODING DATE with LONG VALUE");4<LOG&&console.log(b.msec);var c=Math.round(4096*(b.msec/1E3)).toString(16),c=DataUtils.toNumbers("0".concat(c,"0"));4<LOG&&console.log("ENCODING DATE with BINARY VALUE");4<LOG&&console.log(c);4<LOG&&console.log("ENCODING DATE with BINARY VALUE(HEX)");4<LOG&&console.log(DataUtils.toHex(c));this.writeElement(a,c)};
BinaryXMLEncoder.prototype.writeString=function(a){if("string"===typeof a){4<LOG&&console.log("GOING TO WRITE A STRING");4<LOG&&console.log(a);this.ostream.ensureLength(this.offset+a.length);for(var b=0;b<a.length;b++)4<LOG&&console.log("input.charCodeAt(i)="+a.charCodeAt(b)),this.ostream.array[this.offset+b]=a.charCodeAt(b)}else 4<LOG&&console.log("GOING TO WRITE A STRING IN BINARY FORM"),4<LOG&&console.log(a),this.writeBlobArray(a)};
BinaryXMLEncoder.prototype.writeBlobArray=function(a){4<LOG&&console.log("GOING TO WRITE A BLOB");this.ostream.set(a,this.offset)};BinaryXMLEncoder.prototype.getReducedOstream=function(){return this.ostream.subarray(0,this.offset)};XML_EXT=0;XML_TAG=1;XML_DTAG=2;XML_ATTR=3;XML_DATTR=4;XML_BLOB=5;XML_UDATA=6;XML_CLOSE=0;XML_SUBTYPE_PROCESSING_INSTRUCTIONS=16;XML_TT_BITS=3;XML_TT_MASK=(1<<XML_TT_BITS)-1;XML_TT_VAL_BITS=XML_TT_BITS+1;XML_TT_VAL_MASK=(1<<XML_TT_VAL_BITS)-1;XML_REG_VAL_BITS=7;
XML_REG_VAL_MASK=(1<<XML_REG_VAL_BITS)-1;XML_TT_NO_MORE=1<<XML_REG_VAL_BITS;BYTE_MASK=255;LONG_BYTES=8;LONG_BITS=64;bits_11=2047;bits_18=262143;bits_32=4294967295;tagToString=function(a){return 0<=a&&a<CCNProtocolDTagsStrings.length?CCNProtocolDTagsStrings[a]:a==CCNProtocolDTags.CCNProtocolDataUnit?CCNProtocolDTags.CCNPROTOCOL_DATA_UNIT:null};
stringToTag=function(a){for(var b=0;b<CCNProtocolDTagsStrings.length;++b)if(null!=CCNProtocolDTagsStrings[b]&&CCNProtocolDTagsStrings[b]==a)return b;return CCNProtocolDTags.CCNPROTOCOL_DATA_UNIT==a?CCNProtocolDTags.CCNProtocolDataUnit:null};var BinaryXMLDecoder=function(a){this.istream=a;this.offset=0};BinaryXMLDecoder.prototype.initializeDecoding=function(){};BinaryXMLDecoder.prototype.readStartDocument=function(){};BinaryXMLDecoder.prototype.readEndDocument=function(){};
BinaryXMLDecoder.prototype.readStartElement=function(a,b){var c=this.decodeTypeAndVal();if(null==c)throw new ContentDecodingException(Error("Expected start element: "+a+" got something not a tag."));var d=null;c.type()==XML_TAG?(d="string"==typeof c.val()?parseInt(c.val())+1:c.val()+1,d=this.decodeUString(d)):c.type()==XML_DTAG&&(d=c.val());if(null==d||d!=a)throw console.log("expecting "+a+" but got "+d),new ContentDecodingException(Error("Expected start element: "+a+" got: "+d+"("+c.val()+")"));
null!=b&&readAttributes(b)};
BinaryXMLDecoder.prototype.readAttributes=function(a){if(null!=a)try{for(var b=this.peekTypeAndVal();null!=b&&(XML_ATTR==b.type()||XML_DATTR==b.type());){var c=this.decodeTypeAndVal(),d=null;if(XML_ATTR==c.type()){var e;e="string"==typeof c.val()?parseInt(c.val())+1:c.val()+1;d=this.decodeUString(e)}else if(XML_DATTR==c.type()&&(d=tagToString(c.val()),null==d))throw new ContentDecodingException(Error("Unknown DATTR value"+c.val()));var f=this.decodeUString();a.push([d,f]);b=this.peekTypeAndVal()}}catch(g){throw new ContentDecodingException(Error("readStartElement",
g));}};BinaryXMLDecoder.prototype.peekStartElementAsString=function(){var a=null,b=this.offset;try{var c=this.decodeTypeAndVal();if(null!=c)if(c.type()==XML_TAG){var d;d="string"==typeof c.val()?parseInt(c.val())+1:c.val()+1;a=this.decodeUString(d)}else c.type()==XML_DTAG&&(a=tagToString(c.val()))}catch(e){}finally{try{this.offset=b}catch(f){throw Log.logStackTrace(Log.FAC_ENCODING,Level.WARNING,f),new ContentDecodingException(Error("Cannot reset stream! "+f.getMessage(),f));}}return a};
BinaryXMLDecoder.prototype.peekStartElement=function(a){if("string"==typeof a){var b=this.peekStartElementAsString();return null!=b&&b==a?!0:!1}if("number"==typeof a)return b=this.peekStartElementAsLong(),null!=b&&b==a?!0:!1;throw new ContentDecodingException(Error("SHOULD BE STRING OR NUMBER"));};
BinaryXMLDecoder.prototype.peekStartElementAsLong=function(){var a=null,b=this.offset;try{var c=this.decodeTypeAndVal();if(null!=c)if(c.type()==XML_TAG){if(c.val()+1>DEBUG_MAX_LEN)throw new ContentDecodingException(Error("Decoding error: length "+c.val()+1+" longer than expected maximum length!"));var d;d="string"==typeof c.val()?parseInt(c.val())+1:c.val()+1;var e=this.decodeUString(d),a=stringToTag(e)}else c.type()==XML_DTAG&&(a=c.val())}catch(f){}finally{try{this.offset=b}catch(g){throw Log.logStackTrace(Log.FAC_ENCODING,
Level.WARNING,g),Error("Cannot reset stream! "+g.getMessage(),g);}}return a};BinaryXMLDecoder.prototype.readBinaryElement=function(a,b,c){this.readStartElement(a,b);return this.readBlob(c)};
BinaryXMLDecoder.prototype.readEndElement=function(){4<LOG&&console.log("this.offset is "+this.offset);var a=this.istream[this.offset];this.offset++;4<LOG&&console.log("XML_CLOSE IS "+XML_CLOSE);4<LOG&&console.log("next is "+a);if(a!=XML_CLOSE)throw console.log("Expected end element, got: "+a),new ContentDecodingException(Error("Expected end element, got: "+a));};BinaryXMLDecoder.prototype.readUString=function(){var a=this.decodeUString();this.readEndElement();return a};
BinaryXMLDecoder.prototype.readBlob=function(a){if(this.istream[this.offset]==XML_CLOSE&&a)return this.readEndElement(),null;a=this.decodeBlob();this.readEndElement();return a};
BinaryXMLDecoder.prototype.readDateTime=function(a){a=this.readBinaryElement(a);a=DataUtils.toHex(a);a=parseInt(a,16);var b=1E3*(a/4096);4<LOG&&console.log("DECODED DATE WITH VALUE");4<LOG&&console.log(b);b=new CCNTime(b);if(null==b)throw new ContentDecodingException(Error("Cannot parse timestamp: "+DataUtils.printHexBytes(a)));return b};
BinaryXMLDecoder.prototype.decodeTypeAndVal=function(){var a=-1,b=0,c=!0;do{var d=this.istream[this.offset];if(0>d||0==d&&0==b)return null;(c=0==(d&XML_TT_NO_MORE))?(b<<=XML_REG_VAL_BITS,b|=d&XML_REG_VAL_MASK):(a=d&XML_TT_MASK,b<<=XML_TT_VAL_BITS,b|=d>>>XML_TT_BITS&XML_TT_VAL_MASK);this.offset++}while(c);4<LOG&&console.log("TYPE is "+a+" VAL is "+b);return new TypeAndVal(a,b)};
BinaryXMLDecoder.prototype.peekTypeAndVal=function(){var a=null,b=this.offset;try{a=this.decodeTypeAndVal()}finally{this.offset=b}return a};BinaryXMLDecoder.prototype.decodeBlob=function(a){if(null==a)return a=this.decodeTypeAndVal(),a="string"==typeof a.val()?parseInt(a.val()):a.val(),this.decodeBlob(a);var b=this.istream.subarray(this.offset,this.offset+a);this.offset+=a;return b};
BinaryXMLDecoder.prototype.decodeUString=function(a){if(null==a){a=this.offset;var b=this.decodeTypeAndVal();4<LOG&&console.log("TV is "+b);4<LOG&&console.log(b);4<LOG&&console.log("Type of TV is "+typeof b);return null==b||XML_UDATA!=b.type()?(this.offset=a,""):this.decodeUString(b.val())}a=this.decodeBlob(a);return DataUtils.toString(a)};TypeAndVal=function(a,b){this.t=a;this.v=b};TypeAndVal.prototype.type=function(){return this.t};TypeAndVal.prototype.val=function(){return this.v};
BinaryXMLDecoder.prototype.readIntegerElement=function(a){4<LOG&&console.log("READING INTEGER "+a);4<LOG&&console.log("TYPE OF "+typeof a);a=this.readUTF8Element(a);return parseInt(a)};BinaryXMLDecoder.prototype.readUTF8Element=function(a,b){this.readStartElement(a,b);return this.readUString()};BinaryXMLDecoder.prototype.seek=function(a){this.offset=a};function ContentDecodingException(a){this.message=a.message;for(var b in a)this[b]=a[b]}ContentDecodingException.prototype=Error();
ContentDecodingException.prototype.name="ContentDecodingException";var BinaryXMLStructureDecoder=function(){this.gotElementEnd=!1;this.level=this.offset=0;this.state=BinaryXMLStructureDecoder.READ_HEADER_OR_CLOSE;this.headerLength=0;this.useHeaderBuffer=!1;this.headerBuffer=new DynamicUint8Array(5);this.nBytesToRead=0};BinaryXMLStructureDecoder.READ_HEADER_OR_CLOSE=0;BinaryXMLStructureDecoder.READ_BYTES=1;
BinaryXMLStructureDecoder.prototype.findElementEnd=function(a){if(this.gotElementEnd)return!0;for(var b=new BinaryXMLDecoder(a);;){if(this.offset>=a.length)return!1;switch(this.state){case BinaryXMLStructureDecoder.READ_HEADER_OR_CLOSE:if(0==this.headerLength&&a[this.offset]==XML_CLOSE){++this.offset;--this.level;if(0==this.level)return!0;if(0>this.level)throw Error("BinaryXMLStructureDecoder: Unexepected close tag at offset "+(this.offset-1));this.startHeader();break}for(var c=this.headerLength;;){if(this.offset>=
a.length){this.useHeaderBuffer=!0;var d=this.headerLength-c;this.headerBuffer.set(a.subarray(this.offset-d,d),c);return!1}d=a[this.offset++];++this.headerLength;if(d&XML_TT_NO_MORE)break}this.useHeaderBuffer?(d=this.headerLength-c,this.headerBuffer.set(a.subarray(this.offset-d,d),c),c=(new BinaryXMLDecoder(this.headerBuffer.array)).decodeTypeAndVal()):(b.seek(this.offset-this.headerLength),c=b.decodeTypeAndVal());if(null==c)throw Error("BinaryXMLStructureDecoder: Can't read header starting at offset "+
(this.offset-this.headerLength));d=c.t;if(d==XML_DATTR)this.startHeader();else if(d==XML_DTAG||d==XML_EXT)++this.level,this.startHeader();else if(d==XML_TAG||d==XML_ATTR)d==XML_TAG&&++this.level,this.nBytesToRead=c.v+1,this.state=BinaryXMLStructureDecoder.READ_BYTES;else if(d==XML_BLOB||d==XML_UDATA)this.nBytesToRead=c.v,this.state=BinaryXMLStructureDecoder.READ_BYTES;else throw Error("BinaryXMLStructureDecoder: Unrecognized header type "+d);break;case BinaryXMLStructureDecoder.READ_BYTES:c=a.length-
this.offset;if(c<this.nBytesToRead)return this.offset+=c,this.nBytesToRead-=c,!1;this.offset+=this.nBytesToRead;this.startHeader();break;default:throw Error("BinaryXMLStructureDecoder: Unrecognized state "+this.state);}}};BinaryXMLStructureDecoder.prototype.startHeader=function(){this.headerLength=0;this.useHeaderBuffer=!1;this.state=BinaryXMLStructureDecoder.READ_HEADER_OR_CLOSE};BinaryXMLStructureDecoder.prototype.seek=function(a){this.offset=a};var DataUtils=function(){};DataUtils.keyStr="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
DataUtils.stringtoBase64=function(a){a=escape(a);var b="",c,d,e="",f,g,h="",j=0;do c=a.charCodeAt(j++),d=a.charCodeAt(j++),e=a.charCodeAt(j++),f=c>>2,c=(c&3)<<4|d>>4,g=(d&15)<<2|e>>6,h=e&63,isNaN(d)?g=h=64:isNaN(e)&&(h=64),b=b+DataUtils.keyStr.charAt(f)+DataUtils.keyStr.charAt(c)+DataUtils.keyStr.charAt(g)+DataUtils.keyStr.charAt(h);while(j<a.length);return b};
DataUtils.base64toString=function(a){var b="",c,d,e="",f,g="",h=0;/[^A-Za-z0-9\+\/\=]/g.exec(a)&&alert("There were invalid base64 characters in the input text.\nValid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\nExpect errors in decoding.");a=a.replace(/[^A-Za-z0-9\+\/\=]/g,"");do c=DataUtils.keyStr.indexOf(a.charAt(h++)),d=DataUtils.keyStr.indexOf(a.charAt(h++)),f=DataUtils.keyStr.indexOf(a.charAt(h++)),g=DataUtils.keyStr.indexOf(a.charAt(h++)),c=c<<2|d>>4,d=(d&15)<<4|f>>2,e=(f&3)<<6|g,
b+=String.fromCharCode(c),64!=f&&(b+=String.fromCharCode(d)),64!=g&&(b+=String.fromCharCode(e));while(h<a.length);return unescape(b)};DataUtils.toHex=function(a){4<LOG&&console.log("ABOUT TO CONVERT "+a);for(var b="",c=0;c<a.length;c++)b+=(16>a[c]?"0":"")+a[c].toString(16);4<LOG&&console.log("Converted to: "+b);return b};DataUtils.stringToHex=function(a){for(var b="",c=0;c<a.length;++c)var d=a.charCodeAt(c),b=b+((16>d?"0":"")+d.toString(16));return b};
DataUtils.toString=function(a){for(var b="",c=0;c<a.length;c++)b+=String.fromCharCode(a[c]);return b};DataUtils.toNumbers=function(a){if("string"==typeof a){var b=new Uint8Array(Math.floor(a.length/2)),c=0;a.replace(/(..)/g,function(a){b[c++]=parseInt(a,16)});return b}};DataUtils.hexToRawString=function(a){if("string"==typeof a){var b="";a.replace(/(..)/g,function(a){b+=String.fromCharCode(parseInt(a,16))});return b}};
DataUtils.toNumbersFromString=function(a){for(var b=new Uint8Array(a.length),c=0;c<a.length;c++)b[c]=a.charCodeAt(c);return b};DataUtils.stringToUtf8Array=function(a){return DataUtils.toNumbersFromString(str2rstr_utf8(a))};DataUtils.concatArrays=function(a){for(var b=0,c=0;c<a.length;++c)b+=a[c].length;for(var b=new Uint8Array(b),d=0,c=0;c<a.length;++c)b.set(a[c],d),d+=a[c].length;return b};
DataUtils.decodeUtf8=function(a){for(var b="",c=0,d=0,e=0;c<a.length;)if(d=a.charCodeAt(c),128>d)b+=String.fromCharCode(d),c++;else if(191<d&&224>d)e=a.charCodeAt(c+1),b+=String.fromCharCode((d&31)<<6|e&63),c+=2;else var e=a.charCodeAt(c+1),f=a.charCodeAt(c+2),b=b+String.fromCharCode((d&15)<<12|(e&63)<<6|f&63),c=c+3;return b};DataUtils.arraysEqual=function(a,b){if(a.length!=b.length)return!1;for(var c=0;c<a.length;++c)if(a[c]!=b[c])return!1;return!0};
DataUtils.bigEndianToUnsignedInt=function(a){for(var b=0,c=0;c<a.length;++c)b<<=8,b+=a[c];return b};DataUtils.nonNegativeIntToBigEndian=function(a){a=Math.round(a);if(0>=a)return new Uint8Array(0);for(var b=new Uint8Array(8),c=0;0!=a;)++c,b[8-c]=a&255,a>>=8;return b.subarray(8-c,8)};DataUtils.shuffle=function(a){for(var b=a.length-1;1<=b;--b){var c=Math.floor(Math.random()*(b+1)),d=a[b];a[b]=a[c];a[c]=d}};function encodeToHexInterest(a){return DataUtils.toHex(encodeToBinaryInterest(a))}
function encodeToBinaryInterest(a){var b=new BinaryXMLEncoder;a.to_ccnb(b);return b.getReducedOstream()}function encodeToHexContentObject(a){return DataUtils.toHex(encodeToBinaryContentObject(a))}function encodeToBinaryContentObject(a){var b=new BinaryXMLEncoder;a.to_ccnb(b);return b.getReducedOstream()}function encodeForwardingEntry(a){var b=new BinaryXMLEncoder;a.to_ccnb(b);return b.getReducedOstream()}
function decodeHexFaceInstance(a){var b=DataUtils.toNumbers(a);a=new BinaryXMLDecoder(b);3<LOG&&console.log("DECODING HEX FACE INSTANCE  \n"+b);b=new FaceInstance;b.from_ccnb(a);return b}function decodeHexInterest(a){var b=DataUtils.toNumbers(a);a=new BinaryXMLDecoder(b);3<LOG&&console.log("DECODING HEX INTERST  \n"+b);b=new Interest;b.from_ccnb(a);return b}
function decodeHexContentObject(a){var b=DataUtils.toNumbers(a);a=new BinaryXMLDecoder(b);3<LOG&&console.log("DECODED HEX CONTENT OBJECT \n"+b);b=new ContentObject;b.from_ccnb(a);return b}function decodeHexForwardingEntry(a){var b=DataUtils.toNumbers(a);a=new BinaryXMLDecoder(b);3<LOG&&console.log("DECODED HEX FORWARDING ENTRY \n"+b);b=new ForwardingEntry;b.from_ccnb(a);return b}
function decodeSubjectPublicKeyInfo(a){a=DataUtils.toHex(a).toLowerCase();a=_x509_getPublicKeyHexArrayFromCertHex(a,_x509_getSubjectPublicKeyPosFromCertHex(a,0));var b=new RSAKey;b.setPublic(a[0],a[1]);return b}
function contentObjectToHtml(a){var b="";if(-1==a)b+="NO CONTENT FOUND";else if(-2==a)b+="CONTENT NAME IS EMPTY";else{null!=a.name&&null!=a.name.components&&(b+="NAME: "+a.name.to_uri(),b+="<br /><br />");null!=a.content&&(b+="CONTENT(ASCII): "+DataUtils.toString(a.content),b+="<br />",b+="<br />");null!=a.content&&(b+="CONTENT(hex): "+DataUtils.toHex(a.content),b+="<br />",b+="<br />");null!=a.signature&&null!=a.signature.signature&&(b+="SIGNATURE(hex): "+DataUtils.toHex(a.signature.signature),b+=
"<br />",b+="<br />");null!=a.signedInfo&&(null!=a.signedInfo.publisher&&null!=a.signedInfo.publisher.publisherPublicKeyDigest)&&(b+="Publisher Public Key Digest(hex): "+DataUtils.toHex(a.signedInfo.publisher.publisherPublicKeyDigest),b+="<br />",b+="<br />");if(null!=a.signedInfo&&null!=a.signedInfo.timestamp){var c=new Date;c.setTime(a.signedInfo.timestamp.msec);b+="TimeStamp: "+c;b+="<br />";b+="TimeStamp(number): "+a.signedInfo.timestamp.msec;b+="<br />"}null!=a.signedInfo&&null!=a.signedInfo.finalBlockID&&
(b+="FinalBlockID: "+DataUtils.toHex(a.signedInfo.finalBlockID),b+="<br />");if(null!=a.signedInfo&&null!=a.signedInfo.locator&&null!=a.signedInfo.locator.certificate){var d=DataUtils.toHex(a.signedInfo.locator.certificate).toLowerCase(),c=DataUtils.toHex(a.signature.signature).toLowerCase(),e=DataUtils.toString(a.rawSignatureData),b=b+("Hex Certificate: "+d),b=b+"<br />",b=b+"<br />",e=new X509;e.readCertHex(d);b+="Public key (hex) modulus: "+e.subjectPublicKeyRSA.n.toString(16)+"<br/>";b+="exponent: "+
e.subjectPublicKeyRSA.e.toString(16)+"<br/>";b+="<br/>";c=e.subjectPublicKeyRSA.verifyByteArray(a.rawSignatureData,null,c);2<LOG&&console.log("result is "+c);d=e.subjectPublicKeyRSA.n;e=e.subjectPublicKeyRSA.e;2<LOG&&console.log("PUBLIC KEY n after is ");2<LOG&&console.log(d);2<LOG&&console.log("EXPONENT e after is ");2<LOG&&console.log(e);b=c?b+"SIGNATURE VALID":b+"SIGNATURE INVALID";b+="<br />";b+="<br />"}if(null!=a.signedInfo&&null!=a.signedInfo.locator&&null!=a.signedInfo.locator.publicKey){var f=
DataUtils.toHex(a.signedInfo.locator.publicKey).toLowerCase(),g=DataUtils.toString(a.signedInfo.locator.publicKey),c=DataUtils.toHex(a.signature.signature).toLowerCase(),e=DataUtils.toString(a.rawSignatureData),d=null,h="";null!=a.signature.Witness&&(d=new Witness,d.decode(a.signature.Witness),h=DataUtils.toHex(a.signature.Witness));b+="Public key: "+f;b+="<br />";b+="<br />";2<LOG&&console.log(" ContentName + SignedInfo + Content = "+e);2<LOG&&console.log(" PublicKeyHex = "+f);2<LOG&&console.log(" PublicKeyString = "+
g);2<LOG&&console.log(" Signature "+c);2<LOG&&console.log(" Witness "+h);2<LOG&&console.log(" Signature NOW IS");2<LOG&&console.log(a.signature.signature);e=decodeSubjectPublicKeyInfo(a.signedInfo.locator.publicKey);b+="Public key (hex) modulus: "+e.n.toString(16)+"<br/>";b+="exponent: "+e.e.toString(16)+"<br/>";b+="<br/>";c=e.verifyByteArray(a.rawSignatureData,d,c);2<LOG&&console.log("PUBLIC KEY n after is ");2<LOG&&console.log(e.n);2<LOG&&console.log("EXPONENT e after is ");2<LOG&&console.log(e.e);
b=c?b+"SIGNATURE VALID":b+"SIGNATURE INVALID";b+="<br />";b+="<br />"}}return b}
var KeyManager=function(){this.certificate="MIIBmzCCAQQCCQC32FyQa61S7jANBgkqhkiG9w0BAQUFADASMRAwDgYDVQQDEwdheGVsY2R2MB4XDTEyMDQyODIzNDQzN1oXDTEyMDUyODIzNDQzN1owEjEQMA4GA1UEAxMHYXhlbGNkdjCBnzANBgkqhkiG9w0BAQEFAAOBjQAwgYkCgYEA4X0wp9goqxuECxdULcr2IHr9Ih4Iaypg0Wy39URIup8/CLzQmdsh3RYqd55hqonu5VTTpH3iMLx6xZDVJAZ8OJi7pvXcQ2C4Re2kjL2c8SanI0RfDhlS1zJadfr1VhRPmpivcYawJ4aFuOLAi+qHFxtN7lhcGCgpW1OV60oXd58CAwEAATANBgkqhkiG9w0BAQUFAAOBgQDLOrA1fXzSrpftUB5Ro6DigX1Bjkf7F5Bkd69hSVp+jYeJFBBlsILQAfSxUZPQtD+2Yc3iCmSYNyxqu9PcufDRJlnvB7PG29+L3y9lR37tetzUV9eTscJ7rdp8Wt6AzpW32IJ/54yKNfP7S6ZIoIG+LP6EIxq6s8K1MXRt8uBJKw==";this.publicKey=
"30819F300D06092A864886F70D010101050003818D0030818902818100E17D30A7D828AB1B840B17542DCAF6207AFD221E086B2A60D16CB7F54448BA9F3F08BCD099DB21DD162A779E61AA89EEE554D3A47DE230BC7AC590D524067C3898BBA6F5DC4360B845EDA48CBD9CF126A723445F0E1952D7325A75FAF556144F9A98AF7186B0278685B8E2C08BEA87171B4DEE585C1828295B5395EB4A17779F0203010001";this.privateKey="MIICXQIBAAKBgQDhfTCn2CirG4QLF1QtyvYgev0iHghrKmDRbLf1REi6nz8IvNCZ2yHdFip3nmGqie7lVNOkfeIwvHrFkNUkBnw4mLum9dxDYLhF7aSMvZzxJqcjRF8OGVLXMlp1+vVWFE+amK9xhrAnhoW44sCL6ocXG03uWFwYKClbU5XrShd3nwIDAQABAoGAGkv6T6jC3WmhFZYL6CdCWvlc6gysmKrhjarrLTxgavtFY6R5g2ft5BXAsCCVbUkWxkIFSKqxpVNl0gKZCNGEzPDN6mHJOQI/h0rlxNIHAuGfoAbCzALnqmyZivhJAPGijAyKuU9tczsst5+Kpn+bn7ehzHQuj7iwJonS5WbojqECQQD851K8TpW2GrRizNgG4dx6orZxAaon/Jnl8lS7soXhllQty7qG+oDfzznmdMsiznCqEABzHUUKOVGE9RWPN3aRAkEA5D/w9N55d0ibnChFJlc8cUAoaqH+w+U3oQP2Lb6AZHJpLptN4y4b/uf5d4wYU5/i/gC7SSBH3wFhh9bjRLUDLwJAVOx8vN0Kqt7myfKNbCo19jxjVSlA8TKCn1Oznl/BU1I+rC4oUaEW25DjmX6IpAR8kq7S59ThVSCQPjxqY/A08QJBAIRaF2zGPITQk3r/VumemCvLWiRK/yG0noc9dtibqHOWbCtcXtOm/xDWjq+lis2i3ssOvYrvrv0/HcDY+Dv1An0CQQCLJtMsfSg4kvG/FRY5UMhtMuwo8ovYcMXt4Xv/LWaMhndD67b2UGawQCRqr5ghRTABWdDD/HuuMBjrkPsX0861"};
KeyManager.prototype.verify=function(a,b){var c=this.certificate,d=new X509;d.readCertPEM(c);return d.subjectPublicKeyRSA.verifyString(a,b)};KeyManager.prototype.sign=function(a){var b=this.privateKey,c=new RSAKey;c.readPrivateKeyFromPEMString(b);return c.signString(a,"sha256")};var globalKeyManager=new KeyManager,MerklePath=function(){this.index=null;this.digestList=[]},Witness=function(){this.oid=null;this.path=new MerklePath};
function parseOID(a,b,c){for(var d,e=0,f=0;b<c;++b){var g=a[b],e=e<<7|g&127,f=f+7;g&128||(d=void 0==d?parseInt(e/40)+"."+e%40:d+("."+(31<=f?"bigint":e)),e=f=0);d+=String.fromCharCode()}return d}function parseInteger(a,b,c){for(var d=0;b<c;++b)d=d<<8|a[b];return d}
Witness.prototype.decode=function(a){for(var b=0,c=0;b<a.length;){var d=0;if(48==a[b])0!=(a[b+1]&128)&&(d=a[b+1]&127),c++;else if(6==a[b])d=a[b+1],this.oid=parseOID(a,b+2,b+2+d);else if(2==a[b])d=a[b+1],this.path.index=parseInteger(a,b+2,b+2+d);else if(4==a[b]&&(0!=(a[b+1]&128)&&(d=a[b+1]&127),4==c)){var d=a[b+1],e=DataUtils.toHex(a.subarray(b+2,b+2+d));this.path.digestList.push(e)}b=b+2+d}};var hexcase=0,b64pad="";
function hex_sha256_from_bytes(a){return rstr2hex(binb2rstr(binb_sha256(byteArray2binb(a),8*a.length)))}function hex_sha256(a){return rstr2hex(rstr_sha256(str2rstr_utf8(a)))}function b64_sha256(a){return rstr2b64(rstr_sha256(str2rstr_utf8(a)))}function any_sha256(a,b){return rstr2any(rstr_sha256(str2rstr_utf8(a)),b)}function hex_hmac_sha256(a,b){return rstr2hex(rstr_hmac_sha256(str2rstr_utf8(a),str2rstr_utf8(b)))}
function b64_hmac_sha256(a,b){return rstr2b64(rstr_hmac_sha256(str2rstr_utf8(a),str2rstr_utf8(b)))}function any_hmac_sha256(a,b,c){return rstr2any(rstr_hmac_sha256(str2rstr_utf8(a),str2rstr_utf8(b)),c)}function sha256_vm_test(){return"ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad"==hex_sha256("abc").toLowerCase()}function rstr_sha256(a){return binb2rstr(binb_sha256(rstr2binb(a),8*a.length))}
function rstr_hmac_sha256(a,b){var c=rstr2binb(a);16<c.length&&(c=binb_sha256(c,8*a.length));for(var d=Array(16),e=Array(16),f=0;16>f;f++)d[f]=c[f]^909522486,e[f]=c[f]^1549556828;c=binb_sha256(d.concat(rstr2binb(b)),512+8*b.length);return binb2rstr(binb_sha256(e.concat(c),768))}function rstr2hex(a){try{hexcase}catch(b){hexcase=0}for(var c=hexcase?"0123456789ABCDEF":"0123456789abcdef",d="",e,f=0;f<a.length;f++)e=a.charCodeAt(f),d+=c.charAt(e>>>4&15)+c.charAt(e&15);return d}
function rstr2b64(a){try{b64pad}catch(b){b64pad=""}for(var c="",d=a.length,e=0;e<d;e+=3)for(var f=a.charCodeAt(e)<<16|(e+1<d?a.charCodeAt(e+1)<<8:0)|(e+2<d?a.charCodeAt(e+2):0),g=0;4>g;g++)c=8*e+6*g>8*a.length?c+b64pad:c+"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(f>>>6*(3-g)&63);return c}
function rstr2any(a,b){var c=b.length,d=[],e,f,g,h,j=Array(Math.ceil(a.length/2));for(e=0;e<j.length;e++)j[e]=a.charCodeAt(2*e)<<8|a.charCodeAt(2*e+1);for(;0<j.length;){h=[];for(e=g=0;e<j.length;e++)if(g=(g<<16)+j[e],f=Math.floor(g/c),g-=f*c,0<h.length||0<f)h[h.length]=f;d[d.length]=g;j=h}c="";for(e=d.length-1;0<=e;e--)c+=b.charAt(d[e]);d=Math.ceil(8*a.length/(Math.log(b.length)/Math.log(2)));for(e=c.length;e<d;e++)c=b[0]+c;return c}
function str2rstr_utf8(a){for(var b="",c=-1,d,e;++c<a.length;)d=a.charCodeAt(c),e=c+1<a.length?a.charCodeAt(c+1):0,55296<=d&&(56319>=d&&56320<=e&&57343>=e)&&(d=65536+((d&1023)<<10)+(e&1023),c++),127>=d?b+=String.fromCharCode(d):2047>=d?b+=String.fromCharCode(192|d>>>6&31,128|d&63):65535>=d?b+=String.fromCharCode(224|d>>>12&15,128|d>>>6&63,128|d&63):2097151>=d&&(b+=String.fromCharCode(240|d>>>18&7,128|d>>>12&63,128|d>>>6&63,128|d&63));return b}
function str2rstr_utf16le(a){for(var b="",c=0;c<a.length;c++)b+=String.fromCharCode(a.charCodeAt(c)&255,a.charCodeAt(c)>>>8&255);return b}function str2rstr_utf16be(a){for(var b="",c=0;c<a.length;c++)b+=String.fromCharCode(a.charCodeAt(c)>>>8&255,a.charCodeAt(c)&255);return b}function rstr2binb(a){for(var b=Array(a.length>>2),c=0;c<8*a.length;c+=8)b[c>>5]|=(a.charCodeAt(c/8)&255)<<24-c%32;return b}
function byteArray2binb(a){for(var b=Array(a.length>>2),c=0;c<8*a.length;c+=8)b[c>>5]|=(a[c/8]&255)<<24-c%32;return b}function binb2rstr(a){for(var b="",c=0;c<32*a.length;c+=8)b+=String.fromCharCode(a[c>>5]>>>24-c%32&255);return b}function sha256_S(a,b){return a>>>b|a<<32-b}function sha256_R(a,b){return a>>>b}function sha256_Ch(a,b,c){return a&b^~a&c}function sha256_Maj(a,b,c){return a&b^a&c^b&c}function sha256_Sigma0256(a){return sha256_S(a,2)^sha256_S(a,13)^sha256_S(a,22)}
function sha256_Sigma1256(a){return sha256_S(a,6)^sha256_S(a,11)^sha256_S(a,25)}function sha256_Gamma0256(a){return sha256_S(a,7)^sha256_S(a,18)^sha256_R(a,3)}function sha256_Gamma1256(a){return sha256_S(a,17)^sha256_S(a,19)^sha256_R(a,10)}function sha256_Sigma0512(a){return sha256_S(a,28)^sha256_S(a,34)^sha256_S(a,39)}function sha256_Sigma1512(a){return sha256_S(a,14)^sha256_S(a,18)^sha256_S(a,41)}function sha256_Gamma0512(a){return sha256_S(a,1)^sha256_S(a,8)^sha256_R(a,7)}
function sha256_Gamma1512(a){return sha256_S(a,19)^sha256_S(a,61)^sha256_R(a,6)}
var sha256_K=[1116352408,1899447441,-1245643825,-373957723,961987163,1508970993,-1841331548,-1424204075,-670586216,310598401,607225278,1426881987,1925078388,-2132889090,-1680079193,-1046744716,-459576895,-272742522,264347078,604807628,770255983,1249150122,1555081692,1996064986,-1740746414,-1473132947,-1341970488,-1084653625,-958395405,-710438585,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,-2117940946,-1838011259,-1564481375,-1474664885,-1035236496,-949202525,
-778901479,-694614492,-200395387,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,-2067236844,-1933114872,-1866530822,-1538233109,-1090935817,-965641998];function binb_sha256(a,b){var c=[1779033703,-1150833019,1013904242,-1521486534,1359893119,-1694144372,528734635,1541459225],d=Array(64);a[b>>5]|=128<<24-b%32;a[(b+64>>9<<4)+15]=b;for(var e=0;e<a.length;e+=16)processBlock_sha256(a,e,c,d);return c}
function processBlock_sha256(a,b,c,d){var e,f,g,h,j,l,n,m,p,k,q;e=c[0];f=c[1];g=c[2];h=c[3];j=c[4];l=c[5];n=c[6];m=c[7];for(p=0;64>p;p++)d[p]=16>p?a[p+b]:safe_add(safe_add(safe_add(sha256_Gamma1256(d[p-2]),d[p-7]),sha256_Gamma0256(d[p-15])),d[p-16]),k=safe_add(safe_add(safe_add(safe_add(m,sha256_Sigma1256(j)),sha256_Ch(j,l,n)),sha256_K[p]),d[p]),q=safe_add(sha256_Sigma0256(e),sha256_Maj(e,f,g)),m=n,n=l,l=j,j=safe_add(h,k),h=g,g=f,f=e,e=safe_add(k,q);c[0]=safe_add(e,c[0]);c[1]=safe_add(f,c[1]);c[2]=
safe_add(g,c[2]);c[3]=safe_add(h,c[3]);c[4]=safe_add(j,c[4]);c[5]=safe_add(l,c[5]);c[6]=safe_add(n,c[6]);c[7]=safe_add(m,c[7])}function safe_add(a,b){var c=(a&65535)+(b&65535);return(a>>16)+(b>>16)+(c>>16)<<16|c&65535}var Sha256=function(){this.W=Array(64);this.hash=[1779033703,-1150833019,1013904242,-1521486534,1359893119,-1694144372,528734635,1541459225];this.nTotalBytes=0;this.buffer=new Uint8Array(64);this.nBufferBytes=0};
Sha256.prototype.update=function(a){this.nTotalBytes+=a.length;if(0<this.nBufferBytes){var b=this.buffer.length-this.nBufferBytes;if(a.length<b){this.buffer.set(a,this.nBufferBytes);this.nBufferBytes+=a.length;return}this.buffer.set(a.subarray(0,b),this.nBufferBytes);processBlock_sha256(byteArray2binb(this.buffer),0,this.hash,this.W);this.nBufferBytes=0;a=a.subarray(b,a.length);if(0==a.length)return}b=a.length>>6;if(0<b){for(var b=64*b,c=byteArray2binb(a.subarray(0,b)),d=0;d<c.length;d+=16)processBlock_sha256(c,
d,this.hash,this.W);a=a.subarray(b,a.length)}0<a.length&&(this.buffer.set(a),this.nBufferBytes=a.length)};Sha256.prototype.finalize=function(){var a=byteArray2binb(this.buffer.subarray(0,this.nBufferBytes)),b=8*this.nBufferBytes;a[b>>5]|=128<<24-b%32;a[(b+64>>9<<4)+15]=8*this.nTotalBytes;for(b=0;b<a.length;b+=16)processBlock_sha256(a,b,this.hash,this.W);return Sha256.binb2Uint8Array(this.hash)};
Sha256.binb2Uint8Array=function(a){for(var b=new Uint8Array(4*a.length),c=0,d=0;d<32*a.length;d+=8)b[c++]=a[d>>5]>>>24-d%32&255;return b};var b64map="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",b64pad="=";
function hex2b64(a){var b,c,d="";for(b=0;b+3<=a.length;b+=3)c=parseInt(a.substring(b,b+3),16),d+=b64map.charAt(c>>6)+b64map.charAt(c&63);b+1==a.length?(c=parseInt(a.substring(b,b+1),16),d+=b64map.charAt(c<<2)):b+2==a.length&&(c=parseInt(a.substring(b,b+2),16),d+=b64map.charAt(c>>2)+b64map.charAt((c&3)<<4));for(;0<(d.length&3);)d+=b64pad;return d}
function b64tohex(a){var b="",c,d=0,e;for(c=0;c<a.length&&a.charAt(c)!=b64pad;++c){var f=b64map.indexOf(a.charAt(c));0>f||(0==d?(b+=int2char(f>>2),e=f&3,d=1):1==d?(b+=int2char(e<<2|f>>4),e=f&15,d=2):2==d?(b+=int2char(e),b+=int2char(f>>2),e=f&3,d=3):(b+=int2char(e<<2|f>>4),b+=int2char(f&15),d=0))}1==d&&(b+=int2char(e<<2));return b}function b64toBA(a){a=b64tohex(a);var b,c=[];for(b=0;2*b<a.length;++b)c[b]=parseInt(a.substring(2*b,2*b+2),16);return c}
function parseBigInt(a,b){return new BigInteger(a,b)}function linebrk(a,b){for(var c="",d=0;d+b<a.length;)c+=a.substring(d,d+b)+"\n",d+=b;return c+a.substring(d,a.length)}function byte2Hex(a){return 16>a?"0"+a.toString(16):a.toString(16)}
function pkcs1pad2(a,b){if(b<a.length+11)return alert("Message too long for RSA"),null;for(var c=[],d=a.length-1;0<=d&&0<b;){var e=a.charCodeAt(d--);128>e?c[--b]=e:127<e&&2048>e?(c[--b]=e&63|128,c[--b]=e>>6|192):(c[--b]=e&63|128,c[--b]=e>>6&63|128,c[--b]=e>>12|224)}c[--b]=0;d=new SecureRandom;for(e=[];2<b;){for(e[0]=0;0==e[0];)d.nextBytes(e);c[--b]=e[0]}c[--b]=2;c[--b]=0;return new BigInteger(c)}function RSAKey(){this.n=null;this.e=0;this.coeff=this.dmq1=this.dmp1=this.q=this.p=this.d=null}
function RSASetPublic(a,b){null!=a&&null!=b&&0<a.length&&0<b.length?(this.n=parseBigInt(a,16),this.e=parseInt(b,16)):alert("Invalid RSA public key")}function RSADoPublic(a){return a.modPowInt(this.e,this.n)}function RSAEncrypt(a){a=pkcs1pad2(a,this.n.bitLength()+7>>3);if(null==a)return null;a=this.doPublic(a);if(null==a)return null;a=a.toString(16);return 0==(a.length&1)?a:"0"+a}RSAKey.prototype.doPublic=RSADoPublic;RSAKey.prototype.setPublic=RSASetPublic;RSAKey.prototype.encrypt=RSAEncrypt;
function pkcs1unpad2(a,b){for(var c=a.toByteArray(),d=0;d<c.length&&0==c[d];)++d;if(c.length-d!=b-1||2!=c[d])return null;for(++d;0!=c[d];)if(++d>=c.length)return null;for(var e="";++d<c.length;){var f=c[d]&255;128>f?e+=String.fromCharCode(f):191<f&&224>f?(e+=String.fromCharCode((f&31)<<6|c[d+1]&63),++d):(e+=String.fromCharCode((f&15)<<12|(c[d+1]&63)<<6|c[d+2]&63),d+=2)}return e}
function RSASetPrivate(a,b,c){null!=a&&null!=b&&0<a.length&&0<b.length?(this.n=parseBigInt(a,16),this.e=parseInt(b,16),this.d=parseBigInt(c,16)):alert("Invalid RSA private key")}
function RSASetPrivateEx(a,b,c,d,e,f,g,h){null!=a&&null!=b&&0<a.length&&0<b.length?(this.n=parseBigInt(a,16),this.e=parseInt(b,16),this.d=parseBigInt(c,16),this.p=parseBigInt(d,16),this.q=parseBigInt(e,16),this.dmp1=parseBigInt(f,16),this.dmq1=parseBigInt(g,16),this.coeff=parseBigInt(h,16)):alert("Invalid RSA private key")}
function RSAGenerate(a,b){var c=new SecureRandom,d=a>>1;this.e=parseInt(b,16);for(var e=new BigInteger(b,16);;){for(;!(this.p=new BigInteger(a-d,1,c),0==this.p.subtract(BigInteger.ONE).gcd(e).compareTo(BigInteger.ONE)&&this.p.isProbablePrime(10)););for(;!(this.q=new BigInteger(d,1,c),0==this.q.subtract(BigInteger.ONE).gcd(e).compareTo(BigInteger.ONE)&&this.q.isProbablePrime(10)););if(0>=this.p.compareTo(this.q)){var f=this.p;this.p=this.q;this.q=f}var f=this.p.subtract(BigInteger.ONE),g=this.q.subtract(BigInteger.ONE),
h=f.multiply(g);if(0==h.gcd(e).compareTo(BigInteger.ONE)){this.n=this.p.multiply(this.q);this.d=e.modInverse(h);this.dmp1=this.d.mod(f);this.dmq1=this.d.mod(g);this.coeff=this.q.modInverse(this.p);break}}}function RSADoPrivate(a){if(null==this.p||null==this.q)return a.modPow(this.d,this.n);var b=a.mod(this.p).modPow(this.dmp1,this.p);for(a=a.mod(this.q).modPow(this.dmq1,this.q);0>b.compareTo(a);)b=b.add(this.p);return b.subtract(a).multiply(this.coeff).mod(this.p).multiply(this.q).add(a)}
function RSADecrypt(a){a=parseBigInt(a,16);a=this.doPrivate(a);return null==a?null:pkcs1unpad2(a,this.n.bitLength()+7>>3)}RSAKey.prototype.doPrivate=RSADoPrivate;RSAKey.prototype.setPrivate=RSASetPrivate;RSAKey.prototype.setPrivateEx=RSASetPrivateEx;RSAKey.prototype.generate=RSAGenerate;RSAKey.prototype.decrypt=RSADecrypt;function _rsapem_pemToBase64(a){a=a.replace("-----BEGIN RSA PRIVATE KEY-----","");a=a.replace("-----END RSA PRIVATE KEY-----","");return a=a.replace(/[ \n]+/g,"")}
function _rsapem_getPosArrayOfChildrenFromHex(a){var b=[],c=ASN1HEX.getStartPosOfV_AtObj(a,0),d=ASN1HEX.getPosOfNextSibling_AtObj(a,c),e=ASN1HEX.getPosOfNextSibling_AtObj(a,d),f=ASN1HEX.getPosOfNextSibling_AtObj(a,e),g=ASN1HEX.getPosOfNextSibling_AtObj(a,f),h=ASN1HEX.getPosOfNextSibling_AtObj(a,g),j=ASN1HEX.getPosOfNextSibling_AtObj(a,h),l=ASN1HEX.getPosOfNextSibling_AtObj(a,j);a=ASN1HEX.getPosOfNextSibling_AtObj(a,l);b.push(c,d,e,f,g,h,j,l,a);return b}
function _rsapem_getHexValueArrayOfChildrenFromHex(a){var b=_rsapem_getPosArrayOfChildrenFromHex(a),c=ASN1HEX.getHexOfV_AtObj(a,b[0]),d=ASN1HEX.getHexOfV_AtObj(a,b[1]),e=ASN1HEX.getHexOfV_AtObj(a,b[2]),f=ASN1HEX.getHexOfV_AtObj(a,b[3]),g=ASN1HEX.getHexOfV_AtObj(a,b[4]),h=ASN1HEX.getHexOfV_AtObj(a,b[5]),j=ASN1HEX.getHexOfV_AtObj(a,b[6]),l=ASN1HEX.getHexOfV_AtObj(a,b[7]);a=ASN1HEX.getHexOfV_AtObj(a,b[8]);b=[];b.push(c,d,e,f,g,h,j,l,a);return b}
function _rsapem_readPrivateKeyFromPEMString(a){a=_rsapem_pemToBase64(a);a=b64tohex(a);a=_rsapem_getHexValueArrayOfChildrenFromHex(a);this.setPrivateEx(a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8])}RSAKey.prototype.readPrivateKeyFromPEMString=_rsapem_readPrivateKeyFromPEMString;var _RSASIGN_DIHEAD=[];_RSASIGN_DIHEAD.sha1="3021300906052b0e03021a05000414";_RSASIGN_DIHEAD.sha256="3031300d060960864801650304020105000420";_RSASIGN_DIHEAD.sha384="3041300d060960864801650304020205000430";
_RSASIGN_DIHEAD.sha512="3051300d060960864801650304020305000440";_RSASIGN_DIHEAD.md2="3020300c06082a864886f70d020205000410";_RSASIGN_DIHEAD.md5="3020300c06082a864886f70d020505000410";_RSASIGN_DIHEAD.ripemd160="3021300906052b2403020105000414";var _RSASIGN_HASHHEXFUNC=[];_RSASIGN_HASHHEXFUNC.sha1=function(a){return hex_sha1(a)};_RSASIGN_HASHHEXFUNC.sha256=function(a){return hex_sha256(a)};_RSASIGN_HASHHEXFUNC.sha512=function(a){return hex_sha512(a)};_RSASIGN_HASHHEXFUNC.md5=function(a){return hex_md5(a)};
_RSASIGN_HASHHEXFUNC.ripemd160=function(a){return hex_rmd160(a)};var _RSASIGN_HASHBYTEFUNC=[];_RSASIGN_HASHBYTEFUNC.sha256=function(a){return hex_sha256_from_bytes(a)};var _RE_HEXDECONLY=RegExp("");_RE_HEXDECONLY.compile("[^0-9a-f]","gi");function _rsasign_getHexPaddedDigestInfoForString(a,b,c){b/=4;a=(0,_RSASIGN_HASHHEXFUNC[c])(a);c="00"+_RSASIGN_DIHEAD[c]+a;a="";b=b-4-c.length;for(var d=0;d<b;d+=2)a+="ff";return sPaddedMessageHex="0001"+a+c}
function _rsasign_getHexPaddedDigestInfoForStringHEX(a,b,c){b/=4;a=(0,_RSASIGN_HASHHEXFUNC[c])(a);c="00"+_RSASIGN_DIHEAD[c]+a;a="";b=b-4-c.length;for(var d=0;d<b;d+=2)a+="ff";return sPaddedMessageHex="0001"+a+c}function _rsasign_getHexPaddedDigestInfoForByteArray(a,b,c){b/=4;a=(0,_RSASIGN_HASHBYTEFUNC[c])(a);c="00"+_RSASIGN_DIHEAD[c]+a;a="";b=b-4-c.length;for(var d=0;d<b;d+=2)a+="ff";return sPaddedMessageHex="0001"+a+c}
function _zeroPaddingOfSignature(a,b){for(var c="",d=b/4-a.length,e=0;e<d;e++)c+="0";return c+a}function _rsasign_signString(a,b){var c=_rsasign_getHexPaddedDigestInfoForString(a,this.n.bitLength(),b),c=parseBigInt(c,16),c=this.doPrivate(c).toString(16);return _zeroPaddingOfSignature(c,this.n.bitLength())}
function _rsasign_signStringHEX(a,b){var c=_rsasign_getHexPaddedDigestInfoForString(a,this.n.bitLength(),b),c=parseBigInt(c,16),c=this.doPrivate(c).toString(16);return _zeroPaddingOfSignature(c,this.n.bitLength())}function _rsasign_signByteArray(a,b,c){a=_rsasign_getHexPaddedDigestInfoForByteArray(a,c.n.bitLength(),b);a=parseBigInt(a,16);a=c.doPrivate(a).toString(16);return _zeroPaddingOfSignature(a,c.n.bitLength())}
function _rsasign_signByteArrayWithSHA256(a){return _rsasign_signByteArray(a,"sha256",this)}function _rsasign_signStringWithSHA1(a){return _rsasign_signString(a,"sha1")}function _rsasign_signStringWithSHA256(a){return _rsasign_signString(a,"sha256")}function _rsasign_getDecryptSignatureBI(a,b,c){var d=new RSAKey;d.setPublic(b,c);return d.doPublic(a)}function _rsasign_getHexDigestInfoFromSig(a,b,c){return _rsasign_getDecryptSignatureBI(a,b,c).toString(16).replace(/^1f+00/,"")}
function _rsasign_getAlgNameAndHashFromHexDisgestInfo(a){for(var b in _RSASIGN_DIHEAD){var c=_RSASIGN_DIHEAD[b],d=c.length;if(a.substring(0,d)==c)return[b,a.substring(d)]}return[]}function _rsasign_verifySignatureWithArgs(a,b,c,d){b=_rsasign_getHexDigestInfoFromSig(b,c,d);c=_rsasign_getAlgNameAndHashFromHexDisgestInfo(b);if(0==c.length)return!1;b=c[1];a=(0,_RSASIGN_HASHHEXFUNC[c[0]])(a);return b==a}
function _rsasign_verifyHexSignatureForMessage(a,b){var c=parseBigInt(a,16);return _rsasign_verifySignatureWithArgs(b,c,this.n.toString(16),this.e.toString(16))}
function _rsasign_verifyString(a,b){b=b.replace(_RE_HEXDECONLY,"");3<LOG&&console.log("n is "+this.n);3<LOG&&console.log("e is "+this.e);if(b.length!=this.n.bitLength()/4)return 0;b=b.replace(/[ \n]+/g,"");var c=parseBigInt(b,16),c=this.doPublic(c).toString(16).replace(/^1f+00/,""),d=_rsasign_getAlgNameAndHashFromHexDisgestInfo(c);if(0==d.length)return!1;c=d[1];d=(0,_RSASIGN_HASHHEXFUNC[d[0]])(a);return c==d}
function _rsasign_verifyByteArray(a,b,c){c=c.replace(_RE_HEXDECONLY,"");3<LOG&&console.log("n is "+this.n);3<LOG&&console.log("e is "+this.e);if(c.length!=this.n.bitLength()/4)return 0;c=c.replace(/[ \n]+/g,"");c=parseBigInt(c,16);c=this.doPublic(c).toString(16).replace(/^1f+00/,"");c=_rsasign_getAlgNameAndHashFromHexDisgestInfo(c);if(0==c.length)return!1;var d=c[0];c=c[1];var e=null;if(null==b)e=(0,_RSASIGN_HASHBYTEFUNC[d])(a);else{a=hex_sha256_from_bytes(a);d=b.path.index;for(e=b.path.digestList.length-
1;0<=e;e--){var f="",f=0==d%2?a+b.path.digestList[e]:b.path.digestList[e]+a;a=hex_sha256_from_bytes(DataUtils.toNumbers(f));d=Math.floor(d/2)}e=hex_sha256_from_bytes(DataUtils.toNumbers(a))}return c==e}RSAKey.prototype.signString=_rsasign_signString;RSAKey.prototype.signByteArray=_rsasign_signByteArray;RSAKey.prototype.signByteArrayWithSHA256=_rsasign_signByteArrayWithSHA256;RSAKey.prototype.signStringWithSHA1=_rsasign_signStringWithSHA1;RSAKey.prototype.signStringWithSHA256=_rsasign_signStringWithSHA256;
RSAKey.prototype.sign=_rsasign_signString;RSAKey.prototype.signWithSHA1=_rsasign_signStringWithSHA1;RSAKey.prototype.signWithSHA256=_rsasign_signStringWithSHA256;RSAKey.prototype.verifyByteArray=_rsasign_verifyByteArray;RSAKey.prototype.verifyString=_rsasign_verifyString;RSAKey.prototype.verifyHexSignatureForMessage=_rsasign_verifyHexSignatureForMessage;RSAKey.prototype.verify=_rsasign_verifyString;RSAKey.prototype.verifyHexSignatureForByteArrayMessage=_rsasign_verifyHexSignatureForMessage;
function _asnhex_getByteLengthOfL_AtObj(a,b){if("8"!=a.substring(b+2,b+3))return 1;var c=parseInt(a.substring(b+3,b+4));return 0==c?-1:0<c&&10>c?c+1:-2}function _asnhex_getHexOfL_AtObj(a,b){var c=_asnhex_getByteLengthOfL_AtObj(a,b);return 1>c?"":a.substring(b+2,b+2+2*c)}function _asnhex_getIntOfL_AtObj(a,b){var c=_asnhex_getHexOfL_AtObj(a,b);return""==c?-1:(8>parseInt(c.substring(0,1))?parseBigInt(c,16):parseBigInt(c.substring(2),16)).intValue()}
function _asnhex_getStartPosOfV_AtObj(a,b){var c=_asnhex_getByteLengthOfL_AtObj(a,b);return 0>c?c:b+2*(c+1)}function _asnhex_getHexOfV_AtObj(a,b){var c=_asnhex_getStartPosOfV_AtObj(a,b),d=_asnhex_getIntOfL_AtObj(a,b);return a.substring(c,c+2*d)}function _asnhex_getHexOfTLV_AtObj(a,b){var c=a.substr(b,2),d=_asnhex_getHexOfL_AtObj(a,b),e=_asnhex_getHexOfV_AtObj(a,b);return c+d+e}
function _asnhex_getPosOfNextSibling_AtObj(a,b){var c=_asnhex_getStartPosOfV_AtObj(a,b),d=_asnhex_getIntOfL_AtObj(a,b);return c+2*d}function _asnhex_getPosArrayOfChildren_AtObj(a,b){var c=[],d=_asnhex_getStartPosOfV_AtObj(a,b);c.push(d);for(var e=_asnhex_getIntOfL_AtObj(a,b),f=d,g=0;;){f=_asnhex_getPosOfNextSibling_AtObj(a,f);if(null==f||f-d>=2*e)break;if(200<=g)break;c.push(f);g++}return c}function _asnhex_getNthChildIndex_AtObj(a,b,c){return _asnhex_getPosArrayOfChildren_AtObj(a,b)[c]}
function _asnhex_getDecendantIndexByNthList(a,b,c){if(0==c.length)return b;var d=c.shift();b=_asnhex_getPosArrayOfChildren_AtObj(a,b);return _asnhex_getDecendantIndexByNthList(a,b[d],c)}function _asnhex_getDecendantHexTLVByNthList(a,b,c){b=_asnhex_getDecendantIndexByNthList(a,b,c);return _asnhex_getHexOfTLV_AtObj(a,b)}function _asnhex_getDecendantHexVByNthList(a,b,c){b=_asnhex_getDecendantIndexByNthList(a,b,c);return _asnhex_getHexOfV_AtObj(a,b)}function ASN1HEX(){return ASN1HEX}
ASN1HEX.getByteLengthOfL_AtObj=_asnhex_getByteLengthOfL_AtObj;ASN1HEX.getHexOfL_AtObj=_asnhex_getHexOfL_AtObj;ASN1HEX.getIntOfL_AtObj=_asnhex_getIntOfL_AtObj;ASN1HEX.getStartPosOfV_AtObj=_asnhex_getStartPosOfV_AtObj;ASN1HEX.getHexOfV_AtObj=_asnhex_getHexOfV_AtObj;ASN1HEX.getHexOfTLV_AtObj=_asnhex_getHexOfTLV_AtObj;ASN1HEX.getPosOfNextSibling_AtObj=_asnhex_getPosOfNextSibling_AtObj;ASN1HEX.getPosArrayOfChildren_AtObj=_asnhex_getPosArrayOfChildren_AtObj;ASN1HEX.getNthChildIndex_AtObj=_asnhex_getNthChildIndex_AtObj;
ASN1HEX.getDecendantIndexByNthList=_asnhex_getDecendantIndexByNthList;ASN1HEX.getDecendantHexVByNthList=_asnhex_getDecendantHexVByNthList;ASN1HEX.getDecendantHexTLVByNthList=_asnhex_getDecendantHexTLVByNthList;function _x509_pemToBase64(a){a=a.replace("-----BEGIN CERTIFICATE-----","");a=a.replace("-----END CERTIFICATE-----","");return a=a.replace(/[ \n]+/g,"")}function _x509_pemToHex(a){a=_x509_pemToBase64(a);return b64tohex(a)}
function _x509_getHexTbsCertificateFromCert(a){return ASN1HEX.getStartPosOfV_AtObj(a,0)}function _x509_getSubjectPublicKeyInfoPosFromCertHex(a){var b=ASN1HEX.getStartPosOfV_AtObj(a,0),b=ASN1HEX.getPosArrayOfChildren_AtObj(a,b);return 1>b.length?-1:"a003020102"==a.substring(b[0],b[0]+10)?6>b.length?-1:b[6]:5>b.length?-1:b[5]}
function _x509_getSubjectPublicKeyPosFromCertHex(a,b){null==b&&(b=_x509_getSubjectPublicKeyInfoPosFromCertHex(a));if(-1==b)return-1;var c=ASN1HEX.getPosArrayOfChildren_AtObj(a,b);if(2!=c.length)return-1;c=c[1];if("03"!=a.substring(c,c+2))return-1;c=ASN1HEX.getStartPosOfV_AtObj(a,c);return"00"!=a.substring(c,c+2)?-1:c+2}
function _x509_getPublicKeyHexArrayFromCertHex(a,b){null==b&&(b=_x509_getSubjectPublicKeyPosFromCertHex(a));var c=ASN1HEX.getPosArrayOfChildren_AtObj(a,b);4<LOG&&(console.log("a is now"),console.log(c));if(2>c.length)return[];var d=ASN1HEX.getHexOfV_AtObj(a,c[0]),c=ASN1HEX.getHexOfV_AtObj(a,c[1]);return null!=d&&null!=c?[d,c]:[]}function _x509_getPublicKeyHexArrayFromCertPEM(a){a=_x509_pemToHex(a);return _x509_getPublicKeyHexArrayFromCertHex(a)}
function _x509_getSerialNumberHex(){return ASN1HEX.getDecendantHexVByNthList(this.hex,0,[0,1])}function _x509_getIssuerHex(){return ASN1HEX.getDecendantHexTLVByNthList(this.hex,0,[0,3])}function _x509_getIssuerString(){return _x509_hex2dn(ASN1HEX.getDecendantHexTLVByNthList(this.hex,0,[0,3]))}function _x509_getSubjectHex(){return ASN1HEX.getDecendantHexTLVByNthList(this.hex,0,[0,5])}function _x509_getSubjectString(){return _x509_hex2dn(ASN1HEX.getDecendantHexTLVByNthList(this.hex,0,[0,5]))}
function _x509_getNotBefore(){var a=ASN1HEX.getDecendantHexVByNthList(this.hex,0,[0,4,0]),a=a.replace(/(..)/g,"%$1");return a=decodeURIComponent(a)}function _x509_getNotAfter(){var a=ASN1HEX.getDecendantHexVByNthList(this.hex,0,[0,4,1]),a=a.replace(/(..)/g,"%$1");return a=decodeURIComponent(a)}_x509_DN_ATTRHEX={"0603550406":"C","060355040a":"O","060355040b":"OU","0603550403":"CN","0603550405":"SN","0603550408":"ST","0603550407":"L"};
function _x509_hex2dn(a){for(var b="",c=ASN1HEX.getPosArrayOfChildren_AtObj(a,0),d=0;d<c.length;d++)var e=ASN1HEX.getHexOfTLV_AtObj(a,c[d]),b=b+"/"+_x509_hex2rdn(e);return b}function _x509_hex2rdn(a){var b=ASN1HEX.getDecendantHexTLVByNthList(a,0,[0,0]),c=ASN1HEX.getDecendantHexVByNthList(a,0,[0,1]);a="";try{a=_x509_DN_ATTRHEX[b]}catch(d){a=b}c=c.replace(/(..)/g,"%$1");b=decodeURIComponent(c);return a+"="+b}
function _x509_readCertPEM(a){a=_x509_pemToHex(a);var b=_x509_getPublicKeyHexArrayFromCertHex(a);4<LOG&&(console.log("HEX VALUE IS "+a),console.log("type of a"+typeof b),console.log("a VALUE IS "),console.log(b),console.log("a[0] VALUE IS "+b[0]),console.log("a[1] VALUE IS "+b[1]));var c=new RSAKey;c.setPublic(b[0],b[1]);this.subjectPublicKeyRSA=c;this.subjectPublicKeyRSA_hN=b[0];this.subjectPublicKeyRSA_hE=b[1];this.hex=a}
function _x509_readCertHex(a){a=a.toLowerCase();var b=_x509_getPublicKeyHexArrayFromCertHex(a),c=new RSAKey;c.setPublic(b[0],b[1]);this.subjectPublicKeyRSA=c;this.subjectPublicKeyRSA_hN=b[0];this.subjectPublicKeyRSA_hE=b[1];this.hex=a}function _x509_readCertPEMWithoutRSAInit(a){a=_x509_pemToHex(a);var b=_x509_getPublicKeyHexArrayFromCertHex(a);this.subjectPublicKeyRSA.setPublic(b[0],b[1]);this.subjectPublicKeyRSA_hN=b[0];this.subjectPublicKeyRSA_hE=b[1];this.hex=a}
function X509(){this.hex=this.subjectPublicKeyRSA_hE=this.subjectPublicKeyRSA_hN=this.subjectPublicKeyRSA=null}X509.prototype.readCertPEM=_x509_readCertPEM;X509.prototype.readCertHex=_x509_readCertHex;X509.prototype.readCertPEMWithoutRSAInit=_x509_readCertPEMWithoutRSAInit;X509.prototype.getSerialNumberHex=_x509_getSerialNumberHex;X509.prototype.getIssuerHex=_x509_getIssuerHex;X509.prototype.getSubjectHex=_x509_getSubjectHex;X509.prototype.getIssuerString=_x509_getIssuerString;
X509.prototype.getSubjectString=_x509_getSubjectString;X509.prototype.getNotBefore=_x509_getNotBefore;X509.prototype.getNotAfter=_x509_getNotAfter;var dbits,canary=0xdeadbeefcafe,j_lm=15715070==(canary&16777215);function BigInteger(a,b,c){null!=a&&("number"==typeof a?this.fromNumber(a,b,c):null==b&&"string"!=typeof a?this.fromString(a,256):this.fromString(a,b))}function nbi(){return new BigInteger(null)}
function am1(a,b,c,d,e,f){for(;0<=--f;){var g=b*this[a++]+c[d]+e;e=Math.floor(g/67108864);c[d++]=g&67108863}return e}function am2(a,b,c,d,e,f){var g=b&32767;for(b>>=15;0<=--f;){var h=this[a]&32767,j=this[a++]>>15,l=b*h+j*g,h=g*h+((l&32767)<<15)+c[d]+(e&1073741823);e=(h>>>30)+(l>>>15)+b*j+(e>>>30);c[d++]=h&1073741823}return e}
function am3(a,b,c,d,e,f){var g=b&16383;for(b>>=14;0<=--f;){var h=this[a]&16383,j=this[a++]>>14,l=b*h+j*g,h=g*h+((l&16383)<<14)+c[d]+e;e=(h>>28)+(l>>14)+b*j;c[d++]=h&268435455}return e}j_lm&&"Microsoft Internet Explorer"==navigator.appName?(BigInteger.prototype.am=am2,dbits=30):j_lm&&"Netscape"!=navigator.appName?(BigInteger.prototype.am=am1,dbits=26):(BigInteger.prototype.am=am3,dbits=28);BigInteger.prototype.DB=dbits;BigInteger.prototype.DM=(1<<dbits)-1;BigInteger.prototype.DV=1<<dbits;
var BI_FP=52;BigInteger.prototype.FV=Math.pow(2,BI_FP);BigInteger.prototype.F1=BI_FP-dbits;BigInteger.prototype.F2=2*dbits-BI_FP;var BI_RM="0123456789abcdefghijklmnopqrstuvwxyz",BI_RC=[],rr,vv;rr=48;for(vv=0;9>=vv;++vv)BI_RC[rr++]=vv;rr=97;for(vv=10;36>vv;++vv)BI_RC[rr++]=vv;rr=65;for(vv=10;36>vv;++vv)BI_RC[rr++]=vv;function int2char(a){return BI_RM.charAt(a)}function intAt(a,b){var c=BI_RC[a.charCodeAt(b)];return null==c?-1:c}
function bnpCopyTo(a){for(var b=this.t-1;0<=b;--b)a[b]=this[b];a.t=this.t;a.s=this.s}function bnpFromInt(a){this.t=1;this.s=0>a?-1:0;0<a?this[0]=a:-1>a?this[0]=a+DV:this.t=0}function nbv(a){var b=nbi();b.fromInt(a);return b}
function bnpFromString(a,b){var c;if(16==b)c=4;else if(8==b)c=3;else if(256==b)c=8;else if(2==b)c=1;else if(32==b)c=5;else if(4==b)c=2;else{this.fromRadix(a,b);return}this.s=this.t=0;for(var d=a.length,e=!1,f=0;0<=--d;){var g=8==c?a[d]&255:intAt(a,d);0>g?"-"==a.charAt(d)&&(e=!0):(e=!1,0==f?this[this.t++]=g:f+c>this.DB?(this[this.t-1]|=(g&(1<<this.DB-f)-1)<<f,this[this.t++]=g>>this.DB-f):this[this.t-1]|=g<<f,f+=c,f>=this.DB&&(f-=this.DB))}8==c&&0!=(a[0]&128)&&(this.s=-1,0<f&&(this[this.t-1]|=(1<<this.DB-
f)-1<<f));this.clamp();e&&BigInteger.ZERO.subTo(this,this)}function bnpClamp(){for(var a=this.s&this.DM;0<this.t&&this[this.t-1]==a;)--this.t}
function bnToString(a){if(0>this.s)return"-"+this.negate().toString(a);if(16==a)a=4;else if(8==a)a=3;else if(2==a)a=1;else if(32==a)a=5;else if(4==a)a=2;else return this.toRadix(a);var b=(1<<a)-1,c,d=!1,e="",f=this.t,g=this.DB-f*this.DB%a;if(0<f--){if(g<this.DB&&0<(c=this[f]>>g))d=!0,e=int2char(c);for(;0<=f;)g<a?(c=(this[f]&(1<<g)-1)<<a-g,c|=this[--f]>>(g+=this.DB-a)):(c=this[f]>>(g-=a)&b,0>=g&&(g+=this.DB,--f)),0<c&&(d=!0),d&&(e+=int2char(c))}return d?e:"0"}
function bnNegate(){var a=nbi();BigInteger.ZERO.subTo(this,a);return a}function bnAbs(){return 0>this.s?this.negate():this}function bnCompareTo(a){var b=this.s-a.s;if(0!=b)return b;var c=this.t,b=c-a.t;if(0!=b)return b;for(;0<=--c;)if(0!=(b=this[c]-a[c]))return b;return 0}function nbits(a){var b=1,c;if(0!=(c=a>>>16))a=c,b+=16;if(0!=(c=a>>8))a=c,b+=8;if(0!=(c=a>>4))a=c,b+=4;if(0!=(c=a>>2))a=c,b+=2;0!=a>>1&&(b+=1);return b}
function bnBitLength(){return 0>=this.t?0:this.DB*(this.t-1)+nbits(this[this.t-1]^this.s&this.DM)}function bnpDLShiftTo(a,b){var c;for(c=this.t-1;0<=c;--c)b[c+a]=this[c];for(c=a-1;0<=c;--c)b[c]=0;b.t=this.t+a;b.s=this.s}function bnpDRShiftTo(a,b){for(var c=a;c<this.t;++c)b[c-a]=this[c];b.t=Math.max(this.t-a,0);b.s=this.s}
function bnpLShiftTo(a,b){var c=a%this.DB,d=this.DB-c,e=(1<<d)-1,f=Math.floor(a/this.DB),g=this.s<<c&this.DM,h;for(h=this.t-1;0<=h;--h)b[h+f+1]=this[h]>>d|g,g=(this[h]&e)<<c;for(h=f-1;0<=h;--h)b[h]=0;b[f]=g;b.t=this.t+f+1;b.s=this.s;b.clamp()}
function bnpRShiftTo(a,b){b.s=this.s;var c=Math.floor(a/this.DB);if(c>=this.t)b.t=0;else{var d=a%this.DB,e=this.DB-d,f=(1<<d)-1;b[0]=this[c]>>d;for(var g=c+1;g<this.t;++g)b[g-c-1]|=(this[g]&f)<<e,b[g-c]=this[g]>>d;0<d&&(b[this.t-c-1]|=(this.s&f)<<e);b.t=this.t-c;b.clamp()}}
function bnpSubTo(a,b){for(var c=0,d=0,e=Math.min(a.t,this.t);c<e;)d+=this[c]-a[c],b[c++]=d&this.DM,d>>=this.DB;if(a.t<this.t){for(d-=a.s;c<this.t;)d+=this[c],b[c++]=d&this.DM,d>>=this.DB;d+=this.s}else{for(d+=this.s;c<a.t;)d-=a[c],b[c++]=d&this.DM,d>>=this.DB;d-=a.s}b.s=0>d?-1:0;-1>d?b[c++]=this.DV+d:0<d&&(b[c++]=d);b.t=c;b.clamp()}
function bnpMultiplyTo(a,b){var c=this.abs(),d=a.abs(),e=c.t;for(b.t=e+d.t;0<=--e;)b[e]=0;for(e=0;e<d.t;++e)b[e+c.t]=c.am(0,d[e],b,e,0,c.t);b.s=0;b.clamp();this.s!=a.s&&BigInteger.ZERO.subTo(b,b)}function bnpSquareTo(a){for(var b=this.abs(),c=a.t=2*b.t;0<=--c;)a[c]=0;for(c=0;c<b.t-1;++c){var d=b.am(c,b[c],a,2*c,0,1);if((a[c+b.t]+=b.am(c+1,2*b[c],a,2*c+1,d,b.t-c-1))>=b.DV)a[c+b.t]-=b.DV,a[c+b.t+1]=1}0<a.t&&(a[a.t-1]+=b.am(c,b[c],a,2*c,0,1));a.s=0;a.clamp()}
function bnpDivRemTo(a,b,c){var d=a.abs();if(!(0>=d.t)){var e=this.abs();if(e.t<d.t)null!=b&&b.fromInt(0),null!=c&&this.copyTo(c);else{null==c&&(c=nbi());var f=nbi(),g=this.s;a=a.s;var h=this.DB-nbits(d[d.t-1]);0<h?(d.lShiftTo(h,f),e.lShiftTo(h,c)):(d.copyTo(f),e.copyTo(c));d=f.t;e=f[d-1];if(0!=e){var j=e*(1<<this.F1)+(1<d?f[d-2]>>this.F2:0),l=this.FV/j,j=(1<<this.F1)/j,n=1<<this.F2,m=c.t,p=m-d,k=null==b?nbi():b;f.dlShiftTo(p,k);0<=c.compareTo(k)&&(c[c.t++]=1,c.subTo(k,c));BigInteger.ONE.dlShiftTo(d,
k);for(k.subTo(f,f);f.t<d;)f[f.t++]=0;for(;0<=--p;){var q=c[--m]==e?this.DM:Math.floor(c[m]*l+(c[m-1]+n)*j);if((c[m]+=f.am(0,q,c,p,0,d))<q){f.dlShiftTo(p,k);for(c.subTo(k,c);c[m]<--q;)c.subTo(k,c)}}null!=b&&(c.drShiftTo(d,b),g!=a&&BigInteger.ZERO.subTo(b,b));c.t=d;c.clamp();0<h&&c.rShiftTo(h,c);0>g&&BigInteger.ZERO.subTo(c,c)}}}}function bnMod(a){var b=nbi();this.abs().divRemTo(a,null,b);0>this.s&&0<b.compareTo(BigInteger.ZERO)&&a.subTo(b,b);return b}function Classic(a){this.m=a}
function cConvert(a){return 0>a.s||0<=a.compareTo(this.m)?a.mod(this.m):a}function cRevert(a){return a}function cReduce(a){a.divRemTo(this.m,null,a)}function cMulTo(a,b,c){a.multiplyTo(b,c);this.reduce(c)}function cSqrTo(a,b){a.squareTo(b);this.reduce(b)}Classic.prototype.convert=cConvert;Classic.prototype.revert=cRevert;Classic.prototype.reduce=cReduce;Classic.prototype.mulTo=cMulTo;Classic.prototype.sqrTo=cSqrTo;
function bnpInvDigit(){if(1>this.t)return 0;var a=this[0];if(0==(a&1))return 0;var b=a&3,b=b*(2-(a&15)*b)&15,b=b*(2-(a&255)*b)&255,b=b*(2-((a&65535)*b&65535))&65535,b=b*(2-a*b%this.DV)%this.DV;return 0<b?this.DV-b:-b}function Montgomery(a){this.m=a;this.mp=a.invDigit();this.mpl=this.mp&32767;this.mph=this.mp>>15;this.um=(1<<a.DB-15)-1;this.mt2=2*a.t}
function montConvert(a){var b=nbi();a.abs().dlShiftTo(this.m.t,b);b.divRemTo(this.m,null,b);0>a.s&&0<b.compareTo(BigInteger.ZERO)&&this.m.subTo(b,b);return b}function montRevert(a){var b=nbi();a.copyTo(b);this.reduce(b);return b}
function montReduce(a){for(;a.t<=this.mt2;)a[a.t++]=0;for(var b=0;b<this.m.t;++b){var c=a[b]&32767,d=c*this.mpl+((c*this.mph+(a[b]>>15)*this.mpl&this.um)<<15)&a.DM,c=b+this.m.t;for(a[c]+=this.m.am(0,d,a,b,0,this.m.t);a[c]>=a.DV;)a[c]-=a.DV,a[++c]++}a.clamp();a.drShiftTo(this.m.t,a);0<=a.compareTo(this.m)&&a.subTo(this.m,a)}function montSqrTo(a,b){a.squareTo(b);this.reduce(b)}function montMulTo(a,b,c){a.multiplyTo(b,c);this.reduce(c)}Montgomery.prototype.convert=montConvert;
Montgomery.prototype.revert=montRevert;Montgomery.prototype.reduce=montReduce;Montgomery.prototype.mulTo=montMulTo;Montgomery.prototype.sqrTo=montSqrTo;function bnpIsEven(){return 0==(0<this.t?this[0]&1:this.s)}function bnpExp(a,b){if(4294967295<a||1>a)return BigInteger.ONE;var c=nbi(),d=nbi(),e=b.convert(this),f=nbits(a)-1;for(e.copyTo(c);0<=--f;)if(b.sqrTo(c,d),0<(a&1<<f))b.mulTo(d,e,c);else var g=c,c=d,d=g;return b.revert(c)}
function bnModPowInt(a,b){var c;c=256>a||b.isEven()?new Classic(b):new Montgomery(b);return this.exp(a,c)}BigInteger.prototype.copyTo=bnpCopyTo;BigInteger.prototype.fromInt=bnpFromInt;BigInteger.prototype.fromString=bnpFromString;BigInteger.prototype.clamp=bnpClamp;BigInteger.prototype.dlShiftTo=bnpDLShiftTo;BigInteger.prototype.drShiftTo=bnpDRShiftTo;BigInteger.prototype.lShiftTo=bnpLShiftTo;BigInteger.prototype.rShiftTo=bnpRShiftTo;BigInteger.prototype.subTo=bnpSubTo;
BigInteger.prototype.multiplyTo=bnpMultiplyTo;BigInteger.prototype.squareTo=bnpSquareTo;BigInteger.prototype.divRemTo=bnpDivRemTo;BigInteger.prototype.invDigit=bnpInvDigit;BigInteger.prototype.isEven=bnpIsEven;BigInteger.prototype.exp=bnpExp;BigInteger.prototype.toString=bnToString;BigInteger.prototype.negate=bnNegate;BigInteger.prototype.abs=bnAbs;BigInteger.prototype.compareTo=bnCompareTo;BigInteger.prototype.bitLength=bnBitLength;BigInteger.prototype.mod=bnMod;BigInteger.prototype.modPowInt=bnModPowInt;
BigInteger.ZERO=nbv(0);BigInteger.ONE=nbv(1);function bnClone(){var a=nbi();this.copyTo(a);return a}function bnIntValue(){if(0>this.s){if(1==this.t)return this[0]-this.DV;if(0==this.t)return-1}else{if(1==this.t)return this[0];if(0==this.t)return 0}return(this[1]&(1<<32-this.DB)-1)<<this.DB|this[0]}function bnByteValue(){return 0==this.t?this.s:this[0]<<24>>24}function bnShortValue(){return 0==this.t?this.s:this[0]<<16>>16}function bnpChunkSize(a){return Math.floor(Math.LN2*this.DB/Math.log(a))}
function bnSigNum(){return 0>this.s?-1:0>=this.t||1==this.t&&0>=this[0]?0:1}function bnpToRadix(a){null==a&&(a=10);if(0==this.signum()||2>a||36<a)return"0";var b=this.chunkSize(a),b=Math.pow(a,b),c=nbv(b),d=nbi(),e=nbi(),f="";for(this.divRemTo(c,d,e);0<d.signum();)f=(b+e.intValue()).toString(a).substr(1)+f,d.divRemTo(c,d,e);return e.intValue().toString(a)+f}
function bnpFromRadix(a,b){this.fromInt(0);null==b&&(b=10);for(var c=this.chunkSize(b),d=Math.pow(b,c),e=!1,f=0,g=0,h=0;h<a.length;++h){var j=intAt(a,h);0>j?"-"==a.charAt(h)&&0==this.signum()&&(e=!0):(g=b*g+j,++f>=c&&(this.dMultiply(d),this.dAddOffset(g,0),g=f=0))}0<f&&(this.dMultiply(Math.pow(b,f)),this.dAddOffset(g,0));e&&BigInteger.ZERO.subTo(this,this)}
function bnpFromNumber(a,b,c){if("number"==typeof b)if(2>a)this.fromInt(1);else{this.fromNumber(a,c);this.testBit(a-1)||this.bitwiseTo(BigInteger.ONE.shiftLeft(a-1),op_or,this);for(this.isEven()&&this.dAddOffset(1,0);!this.isProbablePrime(b);)this.dAddOffset(2,0),this.bitLength()>a&&this.subTo(BigInteger.ONE.shiftLeft(a-1),this)}else{c=[];var d=a&7;c.length=(a>>3)+1;b.nextBytes(c);c[0]=0<d?c[0]&(1<<d)-1:0;this.fromString(c,256)}}
function bnToByteArray(){var a=this.t,b=[];b[0]=this.s;var c=this.DB-a*this.DB%8,d,e=0;if(0<a--){if(c<this.DB&&(d=this[a]>>c)!=(this.s&this.DM)>>c)b[e++]=d|this.s<<this.DB-c;for(;0<=a;)if(8>c?(d=(this[a]&(1<<c)-1)<<8-c,d|=this[--a]>>(c+=this.DB-8)):(d=this[a]>>(c-=8)&255,0>=c&&(c+=this.DB,--a)),0!=(d&128)&&(d|=-256),0==e&&(this.s&128)!=(d&128)&&++e,0<e||d!=this.s)b[e++]=d}return b}function bnEquals(a){return 0==this.compareTo(a)}function bnMin(a){return 0>this.compareTo(a)?this:a}
function bnMax(a){return 0<this.compareTo(a)?this:a}function bnpBitwiseTo(a,b,c){var d,e,f=Math.min(a.t,this.t);for(d=0;d<f;++d)c[d]=b(this[d],a[d]);if(a.t<this.t){e=a.s&this.DM;for(d=f;d<this.t;++d)c[d]=b(this[d],e);c.t=this.t}else{e=this.s&this.DM;for(d=f;d<a.t;++d)c[d]=b(e,a[d]);c.t=a.t}c.s=b(this.s,a.s);c.clamp()}function op_and(a,b){return a&b}function bnAnd(a){var b=nbi();this.bitwiseTo(a,op_and,b);return b}function op_or(a,b){return a|b}
function bnOr(a){var b=nbi();this.bitwiseTo(a,op_or,b);return b}function op_xor(a,b){return a^b}function bnXor(a){var b=nbi();this.bitwiseTo(a,op_xor,b);return b}function op_andnot(a,b){return a&~b}function bnAndNot(a){var b=nbi();this.bitwiseTo(a,op_andnot,b);return b}function bnNot(){for(var a=nbi(),b=0;b<this.t;++b)a[b]=this.DM&~this[b];a.t=this.t;a.s=~this.s;return a}function bnShiftLeft(a){var b=nbi();0>a?this.rShiftTo(-a,b):this.lShiftTo(a,b);return b}
function bnShiftRight(a){var b=nbi();0>a?this.lShiftTo(-a,b):this.rShiftTo(a,b);return b}function lbit(a){if(0==a)return-1;var b=0;0==(a&65535)&&(a>>=16,b+=16);0==(a&255)&&(a>>=8,b+=8);0==(a&15)&&(a>>=4,b+=4);0==(a&3)&&(a>>=2,b+=2);0==(a&1)&&++b;return b}function bnGetLowestSetBit(){for(var a=0;a<this.t;++a)if(0!=this[a])return a*this.DB+lbit(this[a]);return 0>this.s?this.t*this.DB:-1}function cbit(a){for(var b=0;0!=a;)a&=a-1,++b;return b}
function bnBitCount(){for(var a=0,b=this.s&this.DM,c=0;c<this.t;++c)a+=cbit(this[c]^b);return a}function bnTestBit(a){var b=Math.floor(a/this.DB);return b>=this.t?0!=this.s:0!=(this[b]&1<<a%this.DB)}function bnpChangeBit(a,b){var c=BigInteger.ONE.shiftLeft(a);this.bitwiseTo(c,b,c);return c}function bnSetBit(a){return this.changeBit(a,op_or)}function bnClearBit(a){return this.changeBit(a,op_andnot)}function bnFlipBit(a){return this.changeBit(a,op_xor)}
function bnpAddTo(a,b){for(var c=0,d=0,e=Math.min(a.t,this.t);c<e;)d+=this[c]+a[c],b[c++]=d&this.DM,d>>=this.DB;if(a.t<this.t){for(d+=a.s;c<this.t;)d+=this[c],b[c++]=d&this.DM,d>>=this.DB;d+=this.s}else{for(d+=this.s;c<a.t;)d+=a[c],b[c++]=d&this.DM,d>>=this.DB;d+=a.s}b.s=0>d?-1:0;0<d?b[c++]=d:-1>d&&(b[c++]=this.DV+d);b.t=c;b.clamp()}function bnAdd(a){var b=nbi();this.addTo(a,b);return b}function bnSubtract(a){var b=nbi();this.subTo(a,b);return b}
function bnMultiply(a){var b=nbi();this.multiplyTo(a,b);return b}function bnDivide(a){var b=nbi();this.divRemTo(a,b,null);return b}function bnRemainder(a){var b=nbi();this.divRemTo(a,null,b);return b}function bnDivideAndRemainder(a){var b=nbi(),c=nbi();this.divRemTo(a,b,c);return[b,c]}function bnpDMultiply(a){this[this.t]=this.am(0,a-1,this,0,0,this.t);++this.t;this.clamp()}
function bnpDAddOffset(a,b){if(0!=a){for(;this.t<=b;)this[this.t++]=0;for(this[b]+=a;this[b]>=this.DV;)this[b]-=this.DV,++b>=this.t&&(this[this.t++]=0),++this[b]}}function NullExp(){}function nNop(a){return a}function nMulTo(a,b,c){a.multiplyTo(b,c)}function nSqrTo(a,b){a.squareTo(b)}NullExp.prototype.convert=nNop;NullExp.prototype.revert=nNop;NullExp.prototype.mulTo=nMulTo;NullExp.prototype.sqrTo=nSqrTo;function bnPow(a){return this.exp(a,new NullExp)}
function bnpMultiplyLowerTo(a,b,c){var d=Math.min(this.t+a.t,b);c.s=0;for(c.t=d;0<d;)c[--d]=0;var e;for(e=c.t-this.t;d<e;++d)c[d+this.t]=this.am(0,a[d],c,d,0,this.t);for(e=Math.min(a.t,b);d<e;++d)this.am(0,a[d],c,d,0,b-d);c.clamp()}function bnpMultiplyUpperTo(a,b,c){--b;var d=c.t=this.t+a.t-b;for(c.s=0;0<=--d;)c[d]=0;for(d=Math.max(b-this.t,0);d<a.t;++d)c[this.t+d-b]=this.am(b-d,a[d],c,0,0,this.t+d-b);c.clamp();c.drShiftTo(1,c)}
function Barrett(a){this.r2=nbi();this.q3=nbi();BigInteger.ONE.dlShiftTo(2*a.t,this.r2);this.mu=this.r2.divide(a);this.m=a}function barrettConvert(a){if(0>a.s||a.t>2*this.m.t)return a.mod(this.m);if(0>a.compareTo(this.m))return a;var b=nbi();a.copyTo(b);this.reduce(b);return b}function barrettRevert(a){return a}
function barrettReduce(a){a.drShiftTo(this.m.t-1,this.r2);a.t>this.m.t+1&&(a.t=this.m.t+1,a.clamp());this.mu.multiplyUpperTo(this.r2,this.m.t+1,this.q3);for(this.m.multiplyLowerTo(this.q3,this.m.t+1,this.r2);0>a.compareTo(this.r2);)a.dAddOffset(1,this.m.t+1);for(a.subTo(this.r2,a);0<=a.compareTo(this.m);)a.subTo(this.m,a)}function barrettSqrTo(a,b){a.squareTo(b);this.reduce(b)}function barrettMulTo(a,b,c){a.multiplyTo(b,c);this.reduce(c)}Barrett.prototype.convert=barrettConvert;
Barrett.prototype.revert=barrettRevert;Barrett.prototype.reduce=barrettReduce;Barrett.prototype.mulTo=barrettMulTo;Barrett.prototype.sqrTo=barrettSqrTo;
function bnModPow(a,b){var c=a.bitLength(),d,e=nbv(1),f;if(0>=c)return e;d=18>c?1:48>c?3:144>c?4:768>c?5:6;f=8>c?new Classic(b):b.isEven()?new Barrett(b):new Montgomery(b);var g=[],h=3,j=d-1,l=(1<<d)-1;g[1]=f.convert(this);if(1<d){c=nbi();for(f.sqrTo(g[1],c);h<=l;)g[h]=nbi(),f.mulTo(c,g[h-2],g[h]),h+=2}for(var n=a.t-1,m,p=!0,k=nbi(),c=nbits(a[n])-1;0<=n;){c>=j?m=a[n]>>c-j&l:(m=(a[n]&(1<<c+1)-1)<<j-c,0<n&&(m|=a[n-1]>>this.DB+c-j));for(h=d;0==(m&1);)m>>=1,--h;if(0>(c-=h))c+=this.DB,--n;if(p)g[m].copyTo(e),
p=!1;else{for(;1<h;)f.sqrTo(e,k),f.sqrTo(k,e),h-=2;0<h?f.sqrTo(e,k):(h=e,e=k,k=h);f.mulTo(k,g[m],e)}for(;0<=n&&0==(a[n]&1<<c);)f.sqrTo(e,k),h=e,e=k,k=h,0>--c&&(c=this.DB-1,--n)}return f.revert(e)}
function bnGCD(a){var b=0>this.s?this.negate():this.clone();a=0>a.s?a.negate():a.clone();if(0>b.compareTo(a)){var c=b,b=a;a=c}var c=b.getLowestSetBit(),d=a.getLowestSetBit();if(0>d)return b;c<d&&(d=c);0<d&&(b.rShiftTo(d,b),a.rShiftTo(d,a));for(;0<b.signum();)0<(c=b.getLowestSetBit())&&b.rShiftTo(c,b),0<(c=a.getLowestSetBit())&&a.rShiftTo(c,a),0<=b.compareTo(a)?(b.subTo(a,b),b.rShiftTo(1,b)):(a.subTo(b,a),a.rShiftTo(1,a));0<d&&a.lShiftTo(d,a);return a}
function bnpModInt(a){if(0>=a)return 0;var b=this.DV%a,c=0>this.s?a-1:0;if(0<this.t)if(0==b)c=this[0]%a;else for(var d=this.t-1;0<=d;--d)c=(b*c+this[d])%a;return c}
function bnModInverse(a){var b=a.isEven();if(this.isEven()&&b||0==a.signum())return BigInteger.ZERO;for(var c=a.clone(),d=this.clone(),e=nbv(1),f=nbv(0),g=nbv(0),h=nbv(1);0!=c.signum();){for(;c.isEven();){c.rShiftTo(1,c);if(b){if(!e.isEven()||!f.isEven())e.addTo(this,e),f.subTo(a,f);e.rShiftTo(1,e)}else f.isEven()||f.subTo(a,f);f.rShiftTo(1,f)}for(;d.isEven();){d.rShiftTo(1,d);if(b){if(!g.isEven()||!h.isEven())g.addTo(this,g),h.subTo(a,h);g.rShiftTo(1,g)}else h.isEven()||h.subTo(a,h);h.rShiftTo(1,
h)}0<=c.compareTo(d)?(c.subTo(d,c),b&&e.subTo(g,e),f.subTo(h,f)):(d.subTo(c,d),b&&g.subTo(e,g),h.subTo(f,h))}if(0!=d.compareTo(BigInteger.ONE))return BigInteger.ZERO;if(0<=h.compareTo(a))return h.subtract(a);if(0>h.signum())h.addTo(a,h);else return h;return 0>h.signum()?h.add(a):h}
var lowprimes=[2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,101,103,107,109,113,127,131,137,139,149,151,157,163,167,173,179,181,191,193,197,199,211,223,227,229,233,239,241,251,257,263,269,271,277,281,283,293,307,311,313,317,331,337,347,349,353,359,367,373,379,383,389,397,401,409,419,421,431,433,439,443,449,457,461,463,467,479,487,491,499,503,509],lplim=67108864/lowprimes[lowprimes.length-1];
function bnIsProbablePrime(a){var b,c=this.abs();if(1==c.t&&c[0]<=lowprimes[lowprimes.length-1]){for(b=0;b<lowprimes.length;++b)if(c[0]==lowprimes[b])return!0;return!1}if(c.isEven())return!1;for(b=1;b<lowprimes.length;){for(var d=lowprimes[b],e=b+1;e<lowprimes.length&&d<lplim;)d*=lowprimes[e++];for(d=c.modInt(d);b<e;)if(0==d%lowprimes[b++])return!1}return c.millerRabin(a)}
function bnpMillerRabin(a){var b=this.subtract(BigInteger.ONE),c=b.getLowestSetBit();if(0>=c)return!1;var d=b.shiftRight(c);a=a+1>>1;a>lowprimes.length&&(a=lowprimes.length);for(var e=nbi(),f=0;f<a;++f){e.fromInt(lowprimes[f]);var g=e.modPow(d,this);if(0!=g.compareTo(BigInteger.ONE)&&0!=g.compareTo(b)){for(var h=1;h++<c&&0!=g.compareTo(b);)if(g=g.modPowInt(2,this),0==g.compareTo(BigInteger.ONE))return!1;if(0!=g.compareTo(b))return!1}}return!0}BigInteger.prototype.chunkSize=bnpChunkSize;
BigInteger.prototype.toRadix=bnpToRadix;BigInteger.prototype.fromRadix=bnpFromRadix;BigInteger.prototype.fromNumber=bnpFromNumber;BigInteger.prototype.bitwiseTo=bnpBitwiseTo;BigInteger.prototype.changeBit=bnpChangeBit;BigInteger.prototype.addTo=bnpAddTo;BigInteger.prototype.dMultiply=bnpDMultiply;BigInteger.prototype.dAddOffset=bnpDAddOffset;BigInteger.prototype.multiplyLowerTo=bnpMultiplyLowerTo;BigInteger.prototype.multiplyUpperTo=bnpMultiplyUpperTo;BigInteger.prototype.modInt=bnpModInt;
BigInteger.prototype.millerRabin=bnpMillerRabin;BigInteger.prototype.clone=bnClone;BigInteger.prototype.intValue=bnIntValue;BigInteger.prototype.byteValue=bnByteValue;BigInteger.prototype.shortValue=bnShortValue;BigInteger.prototype.signum=bnSigNum;BigInteger.prototype.toByteArray=bnToByteArray;BigInteger.prototype.equals=bnEquals;BigInteger.prototype.min=bnMin;BigInteger.prototype.max=bnMax;BigInteger.prototype.and=bnAnd;BigInteger.prototype.or=bnOr;BigInteger.prototype.xor=bnXor;
BigInteger.prototype.andNot=bnAndNot;BigInteger.prototype.not=bnNot;BigInteger.prototype.shiftLeft=bnShiftLeft;BigInteger.prototype.shiftRight=bnShiftRight;BigInteger.prototype.getLowestSetBit=bnGetLowestSetBit;BigInteger.prototype.bitCount=bnBitCount;BigInteger.prototype.testBit=bnTestBit;BigInteger.prototype.setBit=bnSetBit;BigInteger.prototype.clearBit=bnClearBit;BigInteger.prototype.flipBit=bnFlipBit;BigInteger.prototype.add=bnAdd;BigInteger.prototype.subtract=bnSubtract;
BigInteger.prototype.multiply=bnMultiply;BigInteger.prototype.divide=bnDivide;BigInteger.prototype.remainder=bnRemainder;BigInteger.prototype.divideAndRemainder=bnDivideAndRemainder;BigInteger.prototype.modPow=bnModPow;BigInteger.prototype.modInverse=bnModInverse;BigInteger.prototype.pow=bnPow;BigInteger.prototype.gcd=bnGCD;BigInteger.prototype.isProbablePrime=bnIsProbablePrime;
var LOG=0,NDN=function NDN(b){if(!NDN.supported)throw Error("The necessary JavaScript support is not available on this platform.");b=b||{};this.transport=(b.getTransport||function(){return new WebSocketTransport})();this.getHostAndPort=b.getHostAndPort||this.transport.defaultGetHostAndPort;this.host=void 0!==b.host?b.host:null;this.port=b.port||9696;this.readyStatus=NDN.UNOPEN;this.verify=void 0!==b.verify?b.verify:!0;this.onopen=b.onopen||function(){3<LOG&&console.log("NDN connection established.")};
this.onclose=b.onclose||function(){3<LOG&&console.log("NDN connection closed.")};this.ccndid=null};NDN.UNOPEN=0;NDN.OPENED=1;NDN.CLOSED=2;NDN.getSupported=function(){try{(new Uint8Array(1)).subarray(0,1)}catch(a){return console.log("NDN not available: Uint8Array not supported. "+a),!1}return!0};NDN.supported=NDN.getSupported();NDN.ccndIdFetcher=new Name("/%C1.M.S.localhost/%C1.M.SRV/ccnd/KEY");NDN.prototype.createRoute=function(a,b){this.host=a;this.port=b};NDN.KeyStore=[];
var KeyStoreEntry=function(a,b,c){this.keyName=a;this.rsaKey=b;this.timeStamp=c};NDN.addKeyEntry=function(a){null==NDN.getKeyByName(a.keyName)&&NDN.KeyStore.push(a)};NDN.getKeyByName=function(a){for(var b=null,c=0;c<NDN.KeyStore.length;c++)if(NDN.KeyStore[c].keyName.contentName.match(a.contentName)&&(null==b||NDN.KeyStore[c].keyName.contentName.components.length>b.keyName.contentName.components.length))b=NDN.KeyStore[c];return b};NDN.PITTable=[];
var PITEntry=function(a,b){this.interest=a;this.closure=b;this.timerID=-1};NDN.getEntryForExpressedInterest=function(a){for(var b=null,c=0;c<NDN.PITTable.length;c++)if(NDN.PITTable[c].interest.matches_name(a)&&(null==b||NDN.PITTable[c].interest.name.components.length>b.interest.name.components.length))b=NDN.PITTable[c];return b};NDN.CSTable=[];var CSEntry=function(a,b){this.name=a;this.closure=b};
function getEntryForRegisteredPrefix(a){for(var b=0;b<NDN.CSTable.length;b++)if(null!=NDN.CSTable[b].name.match(a))return NDN.CSTable[b];return null}NDN.makeShuffledGetHostAndPort=function(a,b){a=a.slice(0,a.length);DataUtils.shuffle(a);return function(){return 0==a.length?null:{host:a.splice(0,1)[0],port:b}}};
NDN.prototype.expressInterest=function(a,b,c){var d=new Interest(a);null!=c?(d.minSuffixComponents=c.minSuffixComponents,d.maxSuffixComponents=c.maxSuffixComponents,d.publisherPublicKeyDigest=c.publisherPublicKeyDigest,d.exclude=c.exclude,d.childSelector=c.childSelector,d.answerOriginKind=c.answerOriginKind,d.scope=c.scope,d.interestLifetime=c.interestLifetime):d.interestLifetime=4E3;if(null==this.host||null==this.port)if(null==this.getHostAndPort)console.log("ERROR: host OR port NOT SET");else{var e=
this;this.connectAndExecute(function(){e.reconnectAndExpressInterest(d,b)})}else this.reconnectAndExpressInterest(d,b)};NDN.prototype.reconnectAndExpressInterest=function(a,b){if(this.transport.connectedHost!=this.host||this.transport.connectedPort!=this.port){var c=this;this.transport.connect(c,function(){c.expressInterestHelper(a,b)})}else this.expressInterestHelper(a,b)};
NDN.prototype.expressInterestHelper=function(a,b){var c=encodeToBinaryInterest(a),d=this;if(null!=b){var e=new PITEntry(a,b);NDN.PITTable.push(e);b.pitEntry=e;var f=a.interestLifetime||4E3,g=function(){1<LOG&&console.log("Interest time out: "+a.name.to_uri());var h=NDN.PITTable.indexOf(e);0<=h&&NDN.PITTable.splice(h,1);b.upcall(Closure.UPCALL_INTEREST_TIMED_OUT,new UpcallInfo(d,a,0,null))==Closure.RESULT_REEXPRESS&&(1<LOG&&console.log("Re-express interest: "+a.name.to_uri()),e.timerID=setTimeout(g,
f),NDN.PITTable.push(e),d.transport.send(c))};e.timerID=setTimeout(g,f)}this.transport.send(c)};
NDN.prototype.registerPrefix=function(a,b,c){var d=this,e=function(){if(null==d.ccndid){var e=new Interest(NDN.ccndIdFetcher);e.interestLifetime=4E3;3<LOG&&console.log("Expressing interest for ccndid from ccnd.");d.reconnectAndExpressInterest(e,new NDN.FetchCcndidClosure(d,a,b,c))}else d.registerPrefixHelper(a,b,c)};null==this.host||null==this.port?null==this.getHostAndPort?console.log("ERROR: host OR port NOT SET"):this.connectAndExecute(e):e()};
NDN.FetchCcndidClosure=function(a,b,c,d){Closure.call(this);this.ndn=a;this.name=b;this.callerClosure=c;this.flag=d};
NDN.FetchCcndidClosure.prototype.upcall=function(a,b){if(a==Closure.UPCALL_INTEREST_TIMED_OUT)return console.log("Timeout while requesting the ccndid.  Cannot registerPrefix for "+this.name.to_uri()+" ."),Closure.RESULT_OK;if(!(a==Closure.UPCALL_CONTENT||a==Closure.UPCALL_CONTENT_UNVERIFIED))return Closure.RESULT_ERR;var c=b.contentObject;!c.signedInfo||!c.signedInfo.publisher||!c.signedInfo.publisher.publisherPublicKeyDigest?console.log("ContentObject doesn't have a publisherPublicKeyDigest. Cannot set ccndid and registerPrefix for "+
this.name.to_uri()+" ."):(3<LOG&&console.log("Got ccndid from ccnd."),this.ndn.ccndid=c.signedInfo.publisher.publisherPublicKeyDigest,3<LOG&&console.log(this.ndn.ccndid),this.ndn.registerPrefixHelper(this.name,this.callerClosure,this.flag));return Closure.RESULT_OK};
NDN.prototype.registerPrefixHelper=function(a,b){var c=new ForwardingEntry("selfreg",a,null,null,3,2147483647),c=encodeForwardingEntry(c),d=new SignedInfo;d.setFields();c=new ContentObject(new Name,d,c,new Signature);c.sign();c=encodeToBinaryContentObject(c);c=new Name(["ccnx",this.ccndid,"selfreg",c]);c=new Interest(c);c.scope=1;3<LOG&&console.log("Send Interest registration packet.");d=new CSEntry(a.getName(),b);NDN.CSTable.push(d);this.transport.send(encodeToBinaryInterest(c))};
NDN.prototype.onReceivedElement=function(a){3<LOG&&console.log("Complete element received. Length "+a.length+". Start decoding.");var b=new BinaryXMLDecoder(a);if(b.peekStartElement(CCNProtocolDTags.Interest))3<LOG&&console.log("Interest packet received."),a=new Interest,a.from_ccnb(b),3<LOG&&console.log(a),b=escape(a.name.getName()),3<LOG&&console.log(b),b=getEntryForRegisteredPrefix(b),null!=b&&(a=new UpcallInfo(this,a,0,null),b.closure.upcall(Closure.UPCALL_INTEREST,a)==Closure.RESULT_INTEREST_CONSUMED&&
null!=a.contentObject&&this.transport.send(encodeToBinaryContentObject(a.contentObject)));else if(b.peekStartElement(CCNProtocolDTags.ContentObject)){if(3<LOG&&console.log("ContentObject packet received."),a=new ContentObject,a.from_ccnb(b),b=NDN.getEntryForExpressedInterest(a.name),null!=b){clearTimeout(b.timerID);var c=NDN.PITTable.indexOf(b);0<=c&&NDN.PITTable.splice(c,1);c=b.closure;if(!1==this.verify)c.upcall(Closure.UPCALL_CONTENT_UNVERIFIED,new UpcallInfo(this,b.interest,0,a));else{var d=function(a,
b,c,d,e){this.contentObject=a;this.closure=b;this.keyName=c;this.sigHex=d;this.witness=e;Closure.call(this)},e=this;d.prototype.upcall=function(a,b){if(a==Closure.UPCALL_INTEREST_TIMED_OUT)console.log("In KeyFetchClosure.upcall: interest time out."),console.log(this.keyName.contentName.getName());else if(a==Closure.UPCALL_CONTENT){var c=decodeSubjectPublicKeyInfo(b.contentObject.content),d=!0==c.verifyByteArray(this.contentObject.rawSignatureData,this.witness,this.sigHex)?Closure.UPCALL_CONTENT:Closure.UPCALL_CONTENT_BAD;
this.closure.upcall(d,new UpcallInfo(e,null,0,this.contentObject));c=new KeyStoreEntry(h.keyName,c,(new Date).getTime());NDN.addKeyEntry(c)}else a==Closure.UPCALL_CONTENT_BAD&&console.log("In KeyFetchClosure.upcall: signature verification failed")};if(a.signedInfo&&a.signedInfo.locator&&a.signature){3<LOG&&console.log("Key verification...");var f=DataUtils.toHex(a.signature.signature).toLowerCase(),g=null;null!=a.signature.Witness&&(g=new Witness,g.decode(a.signature.Witness));var h=a.signedInfo.locator;
if(h.type==KeyLocatorType.KEYNAME)if(3<LOG&&console.log("KeyLocator contains KEYNAME"),h.keyName.contentName.match(a.name))3<LOG&&console.log("Content is key itself"),d=decodeSubjectPublicKeyInfo(a.content),f=d.verifyByteArray(a.rawSignatureData,g,f),f=!0==f?Closure.UPCALL_CONTENT:Closure.UPCALL_CONTENT_BAD,c.upcall(f,new UpcallInfo(this,b.interest,0,a));else{var j=NDN.getKeyByName(h.keyName);j?(3<LOG&&console.log("Local key cache hit"),d=j.rsaKey,f=d.verifyByteArray(a.rawSignatureData,g,f),f=!0==
f?Closure.UPCALL_CONTENT:Closure.UPCALL_CONTENT_BAD,c.upcall(f,new UpcallInfo(this,b.interest,0,a))):(3<LOG&&console.log("Fetch key according to keylocator"),a=new d(a,c,h.keyName,f,g),this.expressInterest(h.keyName.contentName.getPrefix(4),a))}else h.type==KeyLocatorType.KEY?(3<LOG&&console.log("Keylocator contains KEY"),d=decodeSubjectPublicKeyInfo(a.signedInfo.locator.publicKey),f=d.verifyByteArray(a.rawSignatureData,g,f),f=!0==f?Closure.UPCALL_CONTENT:Closure.UPCALL_CONTENT_BAD,c.upcall(Closure.UPCALL_CONTENT,
new UpcallInfo(this,b.interest,0,a))):(a=h.certificate,console.log("KeyLocator contains CERT"),console.log(a))}}}}else console.log("Incoming packet is not Interest or ContentObject. Discard now.")};
NDN.prototype.connectAndExecute=function(a){var b=this.getHostAndPort();if(null==b)console.log("ERROR: No more hosts from getHostAndPort"),this.host=null;else if(b.host==this.host&&b.port==this.port)console.log("ERROR: The host returned by getHostAndPort is not alive: "+this.host+":"+this.port);else{this.host=b.host;this.port=b.port;0<LOG&&console.log("connectAndExecute: trying host from getHostAndPort: "+this.host);b=new Interest(new Name("/"));b.interestLifetime=4E3;var c=this,d=setTimeout(function(){0<
LOG&&console.log("connectAndExecute: timeout waiting for host "+c.host);c.connectAndExecute(a)},3E3);this.reconnectAndExpressInterest(b,new NDN.ConnectClosure(this,a,d))}};NDN.ConnectClosure=function(a,b,c){Closure.call(this);this.ndn=a;this.onConnected=b;this.timerID=c};
NDN.ConnectClosure.prototype.upcall=function(a){if(!(a==Closure.UPCALL_CONTENT||a==Closure.UPCALL_CONTENT_UNVERIFIED))return Closure.RESULT_ERR;clearTimeout(this.timerID);this.ndn.readyStatus=NDN.OPENED;this.ndn.onopen();0<LOG&&console.log("connectAndExecute: connected to host "+this.ndn.host);this.onConnected();return Closure.RESULT_OK};var BinaryXmlElementReader=function(a){this.elementListener=a;this.dataParts=[];this.structureDecoder=new BinaryXMLStructureDecoder};
BinaryXmlElementReader.prototype.onReceivedData=function(a){for(;;)if(this.structureDecoder.seek(0),this.structureDecoder.findElementEnd(a)){this.dataParts.push(a.subarray(0,this.structureDecoder.offset));var b=DataUtils.concatArrays(this.dataParts);this.dataParts=[];try{this.elementListener.onReceivedElement(b)}catch(c){console.log("BinaryXmlElementReader: ignoring exception from onReceivedElement: "+c)}a=a.subarray(this.structureDecoder.offset,a.length);this.structureDecoder=new BinaryXMLStructureDecoder;
if(0==a.length)break}else{this.dataParts.push(a);3<LOG&&console.log("Incomplete packet received. Length "+a.length+". Wait for more input.");break}};
/** 
 * @author: Jeff Thompson
 * See COPYING for copyright and distribution information.
 * Implement getAsync and putAsync used by NDN using nsISocketTransportService.
 * This is used inside Firefox XPCOM modules.
 */

// Assume already imported the following:
// Components.utils.import("resource://gre/modules/XPCOMUtils.jsm");
// Components.utils.import("resource://gre/modules/NetUtil.jsm");

var XpcomTransport = function XpcomTransport() {
    this.elementListener = null;
    this.socket = null; // nsISocketTransport
    this.outStream = null;
    this.connectedHost = null; // Read by NDN.
    this.connectedPort = null; // Read by NDN.
    
    this.defaultGetHostAndPort = NDN.makeShuffledGetHostAndPort
        (["A.hub.ndn.ucla.edu", "B.hub.ndn.ucla.edu", "C.hub.ndn.ucla.edu", "D.hub.ndn.ucla.edu", 
          "E.hub.ndn.ucla.edu", "F.hub.ndn.ucla.edu", "G.hub.ndn.ucla.edu", "H.hub.ndn.ucla.edu"],
         9695);
};

/*
 * Connect to the host and port in ndn.  This replaces a previous connection and sets connectedHost
 *   and connectedPort.  Once connected, call onopenCallback().
 * Listen on the port to read an entire binary XML encoded element and call
 *    ndn.onReceivedElement(element).
 */
XpcomTransport.prototype.connect = function(ndn, onopenCallback) {
    this.elementListener = ndn;
    this.connectHelper(ndn.host, ndn.port, ndn);
    
    onopenCallback();
};

/*
 * Do the work to connect to host and port.  This replaces a previous connection and sets connectedHost
 *   and connectedPort.
 * Listen on the port to read an entire binary XML encoded element and call
 *    elementListener.onReceivedElement(element).
 */
XpcomTransport.prototype.connectHelper = function(host, port, elementListener) {
    if (this.socket != null) {
        try {
            this.socket.close(0);
        } catch (ex) {
			console.log("XpcomTransport socket.close exception: " + ex);
		}
        this.socket = null;
    }

	var transportService = Components.classes["@mozilla.org/network/socket-transport-service;1"].getService
        (Components.interfaces.nsISocketTransportService);
	var pump = Components.classes["@mozilla.org/network/input-stream-pump;1"].createInstance
        (Components.interfaces.nsIInputStreamPump);
	this.socket = transportService.createTransport(null, 0, host, port, null);
    if (LOG > 0) console.log('XpcomTransport: Connected to ' + host + ":" + port);
    this.connectedHost = host;
    this.connectedPort = port;
    this.outStream = this.socket.openOutputStream(1, 0, 0);

    var inStream = this.socket.openInputStream(0, 0, 0);
	var dataListener = {
        elementReader: new BinaryXmlElementReader(elementListener),
		
		onStartRequest: function (request, context) {
		},
		onStopRequest: function (request, context, status) {
		},
		onDataAvailable: function (request, context, _inputStream, offset, count) {
			try {
				// Use readInputStreamToString to handle binary data.
                // TODO: Can we go directly from the stream to Uint8Array?
                this.elementReader.onReceivedData(DataUtils.toNumbersFromString
                    (NetUtil.readInputStreamToString(inStream, count)));
			} catch (ex) {
				console.log("XpcomTransport.onDataAvailable exception: " + ex + "\n" + ex.stack);
			}
		}
    };
	
	pump.init(inStream, -1, -1, 0, 0, true);
    pump.asyncRead(dataListener, null);
};

/*
 * Send the data over the connection created by connect.
 */
XpcomTransport.prototype.send = function(/* Uint8Array */ data) {
    if (this.socket == null || this.connectedHost == null || this.connectedPort == null) {
        console.log("XpcomTransport connection is not established.");
        return;
    }
    
    var rawDataString = DataUtils.toString(data);
    try {
        this.outStream.write(rawDataString, rawDataString.length);
        this.outStream.flush();
    } catch (ex) {
        if (this.socket.isAlive())
            // The socket is still alive. Assume there could still be incoming data. Just throw the exception.
            throw ex;
        
        console.log("XpcomTransport.send: Trying to reconnect to " + this.connectedHost + ":" + 
            this.connectedPort + " and resend after exception: " + ex);
        
        this.connectHelper(this.connectedHost, this.connectedPort, this.elementListener);
        this.outStream.write(rawDataString, rawDataString.length);
        this.outStream.flush();
    }
};
/*
 * This class defines MOME types based on the filename extension.
 * author: Jeff Thompson
 * See COPYING for copyright and distribution information.
 */
 
var MimeTypes = {
  /*
   * Based on filename, return an object with properties contentType and charset.
   */
  getContentTypeAndCharset: function(filename) {      
      var iDot = filename.lastIndexOf('.');
      if (iDot >= 0) {
          var extension = filename.substr(iDot + 1, filename.length - iDot - 1);
          var contentType = MimeTypes[extension];
          if (contentType != null) {
              var charset = "ISO-8859-1";
              if (contentType.split('/')[0] == "text")
                  charset = "utf-8";
              return { contentType: contentType, charset: charset };
          }
      }
      
      // Use a default.
      return { contentType: "text/html", charset: "utf-8" };
  },
  
  /* For each file extension, define the MIME type.
   */
  "323": "text/h323",
  "%": "application/x-trash",
  "~": "application/x-trash",
  "3gp": "video/3gpp",
  "7z": "application/x-7z-compressed",
  "abw": "application/x-abiword",
  "ai": "application/postscript",
  "aif": "audio/x-aiff",
  "aifc": "audio/x-aiff",
  "aiff": "audio/x-aiff",
  "alc": "chemical/x-alchemy",
  "amr": "audio/amr",
  "anx": "application/annodex",
  "apk": "application/vnd.android.package-archive",
  "art": "image/x-jg",
  "asc": "text/plain",
  "asf": "video/x-ms-asf",
  "asx": "video/x-ms-asf",
  "asn": "chemical/x-ncbi-asn1",
  "atom": "application/atom+xml",
  "atomcat": "application/atomcat+xml",
  "atomsrv": "application/atomserv+xml",
  "au": "audio/basic",
  "snd": "audio/basic",
  "avi": "video/x-msvideo",
  "awb": "audio/amr-wb",
  "axa": "audio/annodex",
  "axv": "video/annodex",
  "b": "chemical/x-molconn-Z",
  "bak": "application/x-trash",
  "bat": "application/x-msdos-program",
  "bcpio": "application/x-bcpio",
  "bib": "text/x-bibtex",
  "bin": "application/octet-stream",
  "bmp": "image/x-ms-bmp",
  "boo": "text/x-boo",
  "book": "application/x-maker",
  "brf": "text/plain",
  "bsd": "chemical/x-crossfire",
  "c": "text/x-csrc",
  "c++": "text/x-c++src",
  "c3d": "chemical/x-chem3d",
  "cab": "application/x-cab",
  "cac": "chemical/x-cache",
  "cache": "chemical/x-cache",
  "cap": "application/cap",
  "cascii": "chemical/x-cactvs-binary",
  "cat": "application/vnd.ms-pki.seccat",
  "cbin": "chemical/x-cactvs-binary",
  "cbr": "application/x-cbr",
  "cbz": "application/x-cbz",
  "cc": "text/x-c++src",
  "cda": "application/x-cdf",
  "cdf": "application/x-cdf",
  "cdr": "image/x-coreldraw",
  "cdt": "image/x-coreldrawtemplate",
  "cdx": "chemical/x-cdx",
  "cdy": "application/vnd.cinderella",
  "cer": "chemical/x-cerius",
  "chm": "chemical/x-chemdraw",
  "chrt": "application/x-kchart",
  "cif": "chemical/x-cif",
  "class": "application/java-vm",
  "cls": "text/x-tex",
  "cmdf": "chemical/x-cmdf",
  "cml": "chemical/x-cml",
  "cod": "application/vnd.rim.cod",
  "com": "application/x-msdos-program",
  "cpa": "chemical/x-compass",
  "cpio": "application/x-cpio",
  "cpp": "text/x-c++src",
  "cpt": "image/x-corelphotopaint",
  "cr2": "image/x-canon-cr2",
  "crl": "application/x-pkcs7-crl",
  "crt": "application/x-x509-ca-cert",
  "crw": "image/x-canon-crw",
  "csd": "audio/csound",
  "csf": "chemical/x-cache-csf",
  "csh": "application/x-csh",
  "csml": "chemical/x-csml",
  "csm": "chemical/x-csml",
  "css": "text/css",
  "csv": "text/csv",
  "ctab": "chemical/x-cactvs-binary",
  "ctx": "chemical/x-ctx",
  "cu": "application/cu-seeme",
  "cub": "chemical/x-gaussian-cube",
  "cxf": "chemical/x-cxf",
  "cef": "chemical/x-cxf",
  "cxx": "text/x-c++src",
  "d": "text/x-dsrc",
  "dat": "application/x-ns-proxy-autoconfig",
  "davmount": "application/davmount+xml",
  "dcr": "application/x-director",
  "deb": "application/x-debian-package",
  "dif": "video/dv",
  "dv": "video/dv",
  "diff": "text/x-diff",
  "patch": "text/x-diff",
  "dir": "application/x-director",
  "djvu": "image/vnd.djvu",
  "djv": "image/vnd.djvu",
  "dl": "video/dl",
  "dll": "application/x-msdos-program",
  "dmg": "application/x-apple-diskimage",
  "dms": "application/x-dms",
  "doc": "application/msword",
  "docm": "application/vnd.ms-word.document.macroEnabled.12",
  "docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "dot": "application/msword",
  "dotm": "application/vnd.ms-word.template.macroEnabled.12",
  "dotx": "application/vnd.openxmlformats-officedocument.wordprocessingml.template",
  "dvi": "application/x-dvi",
  "dxr": "application/x-director",
  "emb": "chemical/x-embl-dl-nucleotide",
  "embl": "chemical/x-embl-dl-nucleotide",
  "eml": "message/rfc822",
  "eps": "application/postscript",
  "eps2": "application/postscript",
  "eps3": "application/postscript",
  "epsf": "application/postscript",
  "epsi": "application/postscript",
  "erf": "image/x-epson-erf",
  "es": "application/ecmascript",
  "etx": "text/x-setext",
  "exe": "application/x-msdos-program",
  "ez": "application/andrew-inset",
  "fb": "application/x-maker",
  "fbdoc": "application/x-maker",
  "fch": "chemical/x-gaussian-checkpoint",
  "fchk": "chemical/x-gaussian-checkpoint",
  "fig": "application/x-xfig",
  "flac": "audio/flac",
  "fli": "video/fli",
  "flv": "video/x-flv",
  "fm": "application/x-maker",
  "frame": "application/x-maker",
  "frm": "application/x-maker",
  "gal": "chemical/x-gaussian-log",
  "gam": "chemical/x-gamess-input",
  "gamin": "chemical/x-gamess-input",
  "gan": "application/x-ganttproject",
  "gau": "chemical/x-gaussian-input",
  "gcd": "text/x-pcs-gcd",
  "gcf": "application/x-graphing-calculator",
  "gcg": "chemical/x-gcg8-sequence",
  "gen": "chemical/x-genbank",
  "gf": "application/x-tex-gf",
  "gif": "image/gif",
  "gjc": "chemical/x-gaussian-input",
  "gjf": "chemical/x-gaussian-input",
  "gl": "video/gl",
  "gnumeric": "application/x-gnumeric",
  "gpt": "chemical/x-mopac-graph",
  "gsf": "application/x-font",
  "gsm": "audio/x-gsm",
  "gtar": "application/x-gtar",
  "h": "text/x-chdr",
  "h++": "text/x-c++hdr",
  "hdf": "application/x-hdf",
  "hh": "text/x-c++hdr",
  "hin": "chemical/x-hin",
  "hpp": "text/x-c++hdr",
  "hqx": "application/mac-binhex40",
  "hs": "text/x-haskell",
  "hta": "application/hta",
  "htc": "text/x-component",
  "htm": "text/html",
  "html": "text/html",
  "hxx": "text/x-c++hdr",
  "ica": "application/x-ica",
  "ice": "x-conference/x-cooltalk",
  "ico": "image/x-icon",
  "ics": "text/calendar",
  "icz": "text/calendar",
  "ief": "image/ief",
  "igs": "model/iges",
  "iges": "model/iges",
  "iii": "application/x-iphone",
  "info": "application/x-info",
  "inp": "chemical/x-gamess-input",
  "ins": "application/x-internet-signup",
  "iso": "application/x-iso9660-image",
  "isp": "application/x-internet-signup",
  "istr": "chemical/x-isostar",
  "ist": "chemical/x-isostar",
  "jad": "text/vnd.sun.j2me.app-descriptor",
  "jam": "application/x-jam",
  "jar": "application/java-archive",
  "java": "text/x-java",
  "jdx": "chemical/x-jcamp-dx",
  "dx": "chemical/x-jcamp-dx",
  "jmz": "application/x-jmol",
  "jng": "image/x-jng",
  "jnlp": "application/x-java-jnlp-file",
  "jpe": "image/jpeg",
  "jpeg": "image/jpeg",
  "jpg": "image/jpeg",
  "js": "application/javascript",
  "json": "application/json",
  "kar": "audio/midi",
  "key": "application/pgp-keys",
  "kil": "application/x-killustrator",
  "kin": "chemical/x-kinemage",
  "kml": "application/vnd.google-earth.kml+xml",
  "kmz": "application/vnd.google-earth.kmz",
  "kpr": "application/x-kpresenter",
  "kpt": "application/x-kpresenter",
  "ksp": "application/x-kspread",
  "kwd": "application/x-kword",
  "kwt": "application/x-kword",
  "latex": "application/x-latex",
  "lha": "application/x-lha",
  "lhs": "text/x-literate-haskell",
  "lin": "application/bbolin",
  "lsf": "video/x-la-asf",
  "lsx": "video/x-la-asf",
  "ltx": "text/x-tex",
  "lyx": "application/x-lyx",
  "lzh": "application/x-lzh",
  "lzx": "application/x-lzx",
  "m3g": "application/m3g",
  "m3u": "audio/mpegurl",
  "m3u8": "application/x-mpegURL",
  "m4a": "audio/mpeg",
  "maker": "application/x-maker",
  "man": "application/x-troff-man",
  "manifest": "text/cache-manifest",
  "mcif": "chemical/x-mmcif",
  "mcm": "chemical/x-macmolecule",
  "mdb": "application/msaccess",
  "me": "application/x-troff-me",
  "mesh": "model/mesh",
  "mid": "audio/midi",
  "midi": "audio/midi",
  "mif": "application/x-mif",
  "mm": "application/x-freemind",
  "mmd": "chemical/x-macromodel-input",
  "mmod": "chemical/x-macromodel-input",
  "mmf": "application/vnd.smaf",
  "mml": "text/mathml",
  "mng": "video/x-mng",
  "moc": "text/x-moc",
  "mol": "chemical/x-mdl-molfile",
  "mol2": "chemical/x-mol2",
  "moo": "chemical/x-mopac-out",
  "mop": "chemical/x-mopac-input",
  "mopcrt": "chemical/x-mopac-input",
  "movie": "video/x-sgi-movie",
  "mp2": "audio/mpeg",
  "mp3": "audio/mpeg",
  "mp4": "video/mp4",
  "mpc": "chemical/x-mopac-input",
  "mpe": "video/mpeg",
  "mpeg": "video/mpeg",
  "mpega": "audio/mpeg",
  "mpg": "video/mpeg",
  "mpga": "audio/mpeg",
  "mph": "application/x-comsol",
  "mpv": "video/x-matroska",
  "mkv": "video/x-matroska",
  "ms": "application/x-troff-ms",
  "msh": "model/mesh",
  "msi": "application/x-msi",
  "mvb": "chemical/x-mopac-vib",
  "mxf": "application/mxf",
  "mxu": "video/vnd.mpegurl",
  "nb": "application/mathematica",
  "nbp": "application/mathematica",
  "nc": "application/x-netcdf",
  "nef": "image/x-nikon-nef",
  "nwc": "application/x-nwc",
  "o": "application/x-object",
  "oda": "application/oda",
  "odb": "application/vnd.oasis.opendocument.database",
  "odc": "application/vnd.oasis.opendocument.chart",
  "odf": "application/vnd.oasis.opendocument.formula",
  "odg": "application/vnd.oasis.opendocument.graphics",
  "odi": "application/vnd.oasis.opendocument.image",
  "odm": "application/vnd.oasis.opendocument.text-master",
  "odp": "application/vnd.oasis.opendocument.presentation",
  "ods": "application/vnd.oasis.opendocument.spreadsheet",
  "odt": "application/vnd.oasis.opendocument.text",
  "oga": "audio/ogg",
  "ogg": "audio/ogg",
  "ogv": "video/ogg",
  "ogx": "application/ogg",
  "old": "application/x-trash",
  "one": "application/onenote",
  "onepkg": "application/onenote",
  "onetmp": "application/onenote",
  "onetoc2": "application/onenote",
  "orc": "audio/csound",
  "orf": "image/x-olympus-orf",
  "otg": "application/vnd.oasis.opendocument.graphics-template",
  "oth": "application/vnd.oasis.opendocument.text-web",
  "otp": "application/vnd.oasis.opendocument.presentation-template",
  "ots": "application/vnd.oasis.opendocument.spreadsheet-template",
  "ott": "application/vnd.oasis.opendocument.text-template",
  "oza": "application/x-oz-application",
  "p": "text/x-pascal",
  "pas": "text/x-pascal",
  "p7r": "application/x-pkcs7-certreqresp",
  "pac": "application/x-ns-proxy-autoconfig",
  "pat": "image/x-coreldrawpattern",
  "pbm": "image/x-portable-bitmap",
  "pcap": "application/cap",
  "pcf": "application/x-font",
  "pcx": "image/pcx",
  "pdb": "chemical/x-pdb",
  "ent": "chemical/x-pdb",
  "pdf": "application/pdf",
  "pfa": "application/x-font",
  "pfb": "application/x-font",
  "pgm": "image/x-portable-graymap",
  "pgn": "application/x-chess-pgn",
  "pgp": "application/pgp-signature",
  "php": "application/x-httpd-php",
  "php3": "application/x-httpd-php3",
  "php3p": "application/x-httpd-php3-preprocessed",
  "php4": "application/x-httpd-php4",
  "php5": "application/x-httpd-php5",
  "phps": "application/x-httpd-php-source",
  "pht": "application/x-httpd-php",
  "phtml": "application/x-httpd-php",
  "pk": "application/x-tex-pk",
  "pl": "text/x-perl",
  "pm": "text/x-perl",
  "pls": "audio/x-scpls",
  "png": "image/png",
  "pnm": "image/x-portable-anymap",
  "pot": "text/plain",
  "potm": "application/vnd.ms-powerpoint.template.macroEnabled.12",
  "potx": "application/vnd.openxmlformats-officedocument.presentationml.template",
  "ppam": "application/vnd.ms-powerpoint.addin.macroEnabled.12",
  "ppm": "image/x-portable-pixmap",
  "pps": "application/vnd.ms-powerpoint",
  "ppsm": "application/vnd.ms-powerpoint.slideshow.macroEnabled.12",
  "ppsx": "application/vnd.openxmlformats-officedocument.presentationml.slideshow",
  "ppt": "application/vnd.ms-powerpoint",
  "pptm": "application/vnd.ms-powerpoint.presentation.macroEnabled.12",
  "pptx": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "prf": "application/pics-rules",
  "prt": "chemical/x-ncbi-asn1-ascii",
  "ps": "application/postscript",
  "psd": "image/x-photoshop",
  "py": "text/x-python",
  "pyc": "application/x-python-code",
  "pyo": "application/x-python-code",
  "qgs": "application/x-qgis",
  "qt": "video/quicktime",
  "mov": "video/quicktime",
  "qtl": "application/x-quicktimeplayer",
  "ra": "audio/x-realaudio",
  "ram": "audio/x-pn-realaudio",
  "rar": "application/rar",
  "ras": "image/x-cmu-raster",
  "rb": "application/x-ruby",
  "rd": "chemical/x-mdl-rdfile",
  "rdf": "application/rdf+xml",
  "rdp": "application/x-rdp",
  "rgb": "image/x-rgb",
  "rhtml": "application/x-httpd-eruby",
  "rm": "audio/x-pn-realaudio",
  "roff": "application/x-troff",
  "ros": "chemical/x-rosdal",
  "rpm": "application/x-redhat-package-manager",
  "rss": "application/rss+xml",
  "rtf": "application/rtf",
  "rtx": "text/richtext",
  "rxn": "chemical/x-mdl-rxnfile",
  "scala": "text/x-scala",
  "sci": "application/x-scilab",
  "sce": "application/x-scilab",
  "sco": "audio/csound",
  "scr": "application/x-silverlight",
  "sct": "text/scriptlet",
  "wsc": "text/scriptlet",
  "sd": "chemical/x-mdl-sdfile",
  "sdf": "chemical/x-mdl-sdfile",
  "sd2": "audio/x-sd2",
  "sda": "application/vnd.stardivision.draw",
  "sdc": "application/vnd.stardivision.calc",
  "sdd": "application/vnd.stardivision.impress",
  "sds": "application/vnd.stardivision.chart",
  "sdw": "application/vnd.stardivision.writer",
  "ser": "application/java-serialized-object",
  "sfv": "text/x-sfv",
  "sgf": "application/x-go-sgf",
  "sgl": "application/vnd.stardivision.writer-global",
  "sh": "application/x-sh",
  "shar": "application/x-shar",
  "shp": "application/x-qgis",
  "shtml": "text/html",
  "shx": "application/x-qgis",
  "sid": "audio/prs.sid",
  "sik": "application/x-trash",
  "silo": "model/mesh",
  "sis": "application/vnd.symbian.install",
  "sisx": "x-epoc/x-sisx-app",
  "sit": "application/x-stuffit",
  "sitx": "application/x-stuffit",
  "skd": "application/x-koan",
  "skm": "application/x-koan",
  "skp": "application/x-koan",
  "skt": "application/x-koan",
  "sldm": "application/vnd.ms-powerpoint.slide.macroEnabled.12",
  "sldx": "application/vnd.openxmlformats-officedocument.presentationml.slide",
  "smi": "application/smil",
  "smil": "application/smil",
  "spc": "chemical/x-galactic-spc",
  "spl": "application/futuresplash",
  "spx": "audio/ogg",
  "sql": "application/x-sql",
  "src": "application/x-wais-source",
  "stc": "application/vnd.sun.xml.calc.template",
  "std": "application/vnd.sun.xml.draw.template",
  "sti": "application/vnd.sun.xml.impress.template",
  "stl": "application/sla",
  "stw": "application/vnd.sun.xml.writer.template",
  "sty": "text/x-tex",
  "sv4cpio": "application/x-sv4cpio",
  "sv4crc": "application/x-sv4crc",
  "svg": "image/svg+xml",
  "svgz": "image/svg+xml",
  "sw": "chemical/x-swissprot",
  "swf": "application/x-shockwave-flash",
  "swfl": "application/x-shockwave-flash",
  "sxc": "application/vnd.sun.xml.calc",
  "sxd": "application/vnd.sun.xml.draw",
  "sxg": "application/vnd.sun.xml.writer.global",
  "sxi": "application/vnd.sun.xml.impress",
  "sxm": "application/vnd.sun.xml.math",
  "sxw": "application/vnd.sun.xml.writer",
  "t": "application/x-troff",
  "tar": "application/x-tar",
  "taz": "application/x-gtar-compressed",
  "tcl": "application/x-tcl",
  "tk": "text/x-tcl",
  "tex": "text/x-tex",
  "texinfo": "application/x-texinfo",
  "texi": "application/x-texinfo",
  "text": "text/plain",
  "tgf": "chemical/x-mdl-tgf",
  "tgz": "application/x-gtar-compressed",
  "thmx": "application/vnd.ms-officetheme",
  "tiff": "image/tiff",
  "tif": "image/tiff",
  "tm": "text/texmacs",
  "torrent": "application/x-bittorrent",
  "tr": "application/x-troff",
  "ts": "video/MP2T",
  "tsp": "application/dsptype",
  "tsv": "text/tab-separated-values",
  "txt": "text/plain",
  "udeb": "application/x-debian-package",
  "uls": "text/iuls",
  "ustar": "application/x-ustar",
  "val": "chemical/x-ncbi-asn1-binary",
  "aso": "chemical/x-ncbi-asn1-binary",
  "vcd": "application/x-cdlink",
  "vcf": "text/x-vcard",
  "vcs": "text/x-vcalendar",
  "vmd": "chemical/x-vmd",
  "vms": "chemical/x-vamas-iso14976",
  "vrm": "x-world/x-vrml",
  "vsd": "application/vnd.visio",
  "wad": "application/x-doom",
  "wav": "audio/x-wav",
  "wax": "audio/x-ms-wax",
  "wbmp": "image/vnd.wap.wbmp",
  "wbxml": "application/vnd.wap.wbxml",
  "webm": "video/webm",
  "wk": "application/x-123",
  "wm": "video/x-ms-wm",
  "wma": "audio/x-ms-wma",
  "wmd": "application/x-ms-wmd",
  "wml": "text/vnd.wap.wml",
  "wmlc": "application/vnd.wap.wmlc",
  "wmls": "text/vnd.wap.wmlscript",
  "wmlsc": "application/vnd.wap.wmlscriptc",
  "wmv": "video/x-ms-wmv",
  "wmx": "video/x-ms-wmx",
  "wmz": "application/x-ms-wmz",
  "wp5": "application/vnd.wordperfect5.1",
  "wpd": "application/vnd.wordperfect",
  "wrl": "model/vrml",
  "vrml": "model/vrml",
  "wvx": "video/x-ms-wvx",
  "wz": "application/x-wingz",
  "x3d": "model/x3d+xml",
  "x3db": "model/x3d+binary",
  "x3dv": "model/x3d+vrml",
  "xbm": "image/x-xbitmap",
  "xcf": "application/x-xcf",
  "xht": "application/xhtml+xml",
  "xhtml": "application/xhtml+xml",
  "xlam": "application/vnd.ms-excel.addin.macroEnabled.12",
  "xlb": "application/vnd.ms-excel",
  "xls": "application/vnd.ms-excel",
  "xlsb": "application/vnd.ms-excel.sheet.binary.macroEnabled.12",
  "xlsm": "application/vnd.ms-excel.sheet.macroEnabled.12",
  "xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "xlt": "application/vnd.ms-excel",
  "xltm": "application/vnd.ms-excel.template.macroEnabled.12",
  "xltx": "application/vnd.openxmlformats-officedocument.spreadsheetml.template",
  "xml": "application/xml",
  "xpi": "application/x-xpinstall",
  "xpm": "image/x-xpixmap",
  "xsd": "application/xml",
  "xsl": "application/xml",
  "xspf": "application/xspf+xml",
  "xtel": "chemical/x-xtel",
  "xul": "application/vnd.mozilla.xul+xml",
  "xwd": "image/x-xwindowdump",
  "xyz": "chemical/x-xyz",
  "zip": "application/zip",
  "zmt": "chemical/x-mopac-input"
};
