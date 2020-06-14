download the ENS JavaScript utility library from here: http://mng.bz/vN9r. Place this JavaScript file in a folder, for example, C:\ethereum\ens.

import the ENS utility library on the interactive geth console you’ve attached:

>loadScript('c:/ethereum/ens/ensutils-testnet.js');

Checking Domain Ownership
>var domainHash = web3.sha3('manning');
> 
>var domainExpiryEpoch = testRegistrar.expiryTimes(domainHash)
.toNumber() * 1000;
>var domainExpiryDate = new Date(domainExpiryEpoch);

Registering Domain Ownership
>personal.unlockAccount(eth.accounts[0], 'PASSWORD_OF_YOUR_ACCOUNT_0');
>var tx1 = testRegistrar.register(domainHash,
eth.accounts[0], {from: eth.accounts[0]});

Registering the domain name
>tx2 = ens.setResolver(namehash('manning.test'),
publicResolver.address, {from: eth.accounts[0]});

>publicResolver.setAddr(namehash('manning.test'),
eth.accounts[1], {from: eth.accounts[0]});

Registering the Subdomain
>ens.setSubnodeOwner(namehash('manning.test'),
web3.sha3('roberto'), eth.accounts[2], {from: eth.accounts[0]});

>ens.setResolver(namehash('roberto.manning.test'),
publicResolver.address, {from: eth.accounts[2]});

>publicResolver.setAddr(namehash('manning.test'),
eth.accounts[3], {from: eth.accounts[2]});

Resolving a domain name
>var domainName = 'manning.test';
>var domainNamehash = namehash(domainName);
>var resolverAddress = ens.resolver(domainNamehash);
>resolverContract.at(resolverAddress).addr(namehash(domainNamehash));


> eth.accounts[1]
This is a shortcut to resolve the domain name:

>getAddr(domainName);
0x4e6c30154768b6bc3da693b1b28c6bd14302b578