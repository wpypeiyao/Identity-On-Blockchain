# Identity-On-Blockchain
This is a prototype of my MSC final individual proposal: Identity on the Blockchain.

##Usage
You can run a REAL ethereum node for development purposes:
```
$ embark blockchain
```
</br>

Alternatively, to use an ethereum rpc simulator simply run:
```
$ embark simulator
```
</br>

By default Embark blockchain will mine a minimum amount of ether and will only mine when new transactions come in. This is quite useful to keep a low CPU. The option can be configured at config/blockchain.json. Note that running a real node requires at least 2GB of free ram, please take this into account if running it in a VM.

Then, in another command line:
```
$ embark run
```
</br>
This will automatically deploy the contracts, update their JS bindings and deploy your DApp to a local server at http://localhost:8000
