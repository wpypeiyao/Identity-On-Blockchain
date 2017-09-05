//check the correct connection with web3
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
}
else {
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}
;

//link to contract;TokenFunctions
var TokenFunctionsContract = web3.eth.contract([
    {
        "constant": false,
        "inputs": [
            {
                "name": "Identity",
                "type": "bytes32"
            },
            {
                "name": "newCAddress",
                "type": "address"
            }
        ],
        "name": "AddContact",
        "outputs": [],
        "payable": false,
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "Identity",
                "type": "bytes32"
            },
            {
                "name": "targetApp",
                "type": "bytes32"
            },
            {
                "name": "targetUsername",
                "type": "bytes32"
            },
            {
                "name": "newPassword",
                "type": "bytes32"
            }
        ],
        "name": "AltSocialAccountPw",
        "outputs": [],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "Identity",
                "type": "bytes32"
            }
        ],
        "name": "getAllContact",
        "outputs": [
            {
                "name": "resAddress",
                "type": "address[]"
            },
            {
                "name": "resName",
                "type": "bytes32[]"
            }
        ],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "Identity",
                "type": "bytes32"
            }
        ],
        "name": "LoginCheck",
        "outputs": [
            {
                "name": "valid",
                "type": "bool"
            },
            {
                "name": "AccountAddress",
                "type": "address"
            }
        ],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "Identity",
                "type": "bytes32"
            }
        ],
        "name": "getAddress",
        "outputs": [
            {
                "name": "addr",
                "type": "address"
            }
        ],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "name",
                "type": "bytes32"
            }
        ],
        "name": "getAddressFromName",
        "outputs": [
            {
                "name": "addr",
                "type": "address"
            },
            {
                "name": "found",
                "type": "bool"
            }
        ],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "Identity",
                "type": "bytes32"
            },
            {
                "name": "targetApp",
                "type": "bytes32"
            },
            {
                "name": "targetUsername",
                "type": "bytes32"
            }
        ],
        "name": "getSharedAccountPw",
        "outputs": [
            {
                "name": "Password",
                "type": "bytes32"
            },
            {
                "name": "isFound",
                "type": "bool"
            }
        ],
        "payable": false,
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "Identity",
                "type": "bytes32"
            },
            {
                "name": "receiverAddress",
                "type": "address"
            },
            {
                "name": "targetApp",
                "type": "bytes32"
            },
            {
                "name": "targetUsername",
                "type": "bytes32"
            },
            {
                "name": "targetPassword",
                "type": "bytes32"
            }
        ],
        "name": "AddSharedAccount",
        "outputs": [],
        "payable": false,
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "Identity",
                "type": "bytes32"
            },
            {
                "name": "targetAddress",
                "type": "address"
            },
            {
                "name": "altCName",
                "type": "bytes32"
            }
        ],
        "name": "AlterContactName",
        "outputs": [],
        "payable": false,
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "newTimeLimited",
                "type": "uint256"
            }
        ],
        "name": "setTimeLimited",
        "outputs": [],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "Identity",
                "type": "bytes32"
            }
        ],
        "name": "getAllSocialAccounts",
        "outputs": [
            {
                "name": "Apps",
                "type": "bytes32[]"
            },
            {
                "name": "Usernames",
                "type": "bytes32[]"
            }
        ],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "Identity",
                "type": "bytes32"
            },
            {
                "name": "targetApp",
                "type": "bytes32"
            },
            {
                "name": "targetUsername",
                "type": "bytes32"
            }
        ],
        "name": "getSocialAccountPw",
        "outputs": [
            {
                "name": "Password",
                "type": "bytes32"
            },
            {
                "name": "Successful",
                "type": "bool"
            }
        ],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "Identity",
                "type": "bytes32"
            },
            {
                "name": "targetAddress",
                "type": "address"
            }
        ],
        "name": "getTargetContactPubKey",
        "outputs": [
            {
                "name": "PubKey_x1",
                "type": "bytes32"
            },
            {
                "name": "PubKey_x2",
                "type": "bytes32"
            },
            {
                "name": "PubKey_y1",
                "type": "bytes32"
            },
            {
                "name": "PubKey_y2",
                "type": "bytes32"
            },
            {
                "name": "isFound",
                "type": "bool"
            }
        ],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "Identity",
                "type": "bytes32"
            }
        ],
        "name": "getMyName",
        "outputs": [
            {
                "name": "MyName",
                "type": "bytes32"
            }
        ],
        "payable": false,
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "Identity",
                "type": "bytes32"
            },
            {
                "name": "Name",
                "type": "bytes32"
            },
            {
                "name": "PubKey_x1",
                "type": "bytes32"
            },
            {
                "name": "PubKey_x2",
                "type": "bytes32"
            },
            {
                "name": "PubKey_y1",
                "type": "bytes32"
            },
            {
                "name": "PubKey_y2",
                "type": "bytes32"
            }
        ],
        "name": "newUserAccount",
        "outputs": [],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "Identity",
                "type": "bytes32"
            }
        ],
        "name": "getMyPubKey",
        "outputs": [
            {
                "name": "PubKey_x1",
                "type": "bytes32"
            },
            {
                "name": "PubKey_x2",
                "type": "bytes32"
            },
            {
                "name": "PubKey_y1",
                "type": "bytes32"
            },
            {
                "name": "PubKey_y2",
                "type": "bytes32"
            }
        ],
        "payable": false,
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "Identity",
                "type": "bytes32"
            },
            {
                "name": "delApp",
                "type": "bytes32"
            },
            {
                "name": "delUsername",
                "type": "bytes32"
            }
        ],
        "name": "DelSocialAccount",
        "outputs": [],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "timeLimited",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "Identity",
                "type": "bytes32"
            },
            {
                "name": "targetApp",
                "type": "bytes32"
            },
            {
                "name": "targetUsername",
                "type": "bytes32"
            }
        ],
        "name": "deleteSharedAccount",
        "outputs": [],
        "payable": false,
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "Identity",
                "type": "bytes32"
            },
            {
                "name": "newName",
                "type": "bytes32"
            }
        ],
        "name": "setMyName",
        "outputs": [],
        "payable": false,
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "Identity",
                "type": "bytes32"
            },
            {
                "name": "newApp",
                "type": "bytes32"
            },
            {
                "name": "newUsername",
                "type": "bytes32"
            },
            {
                "name": "newPassword",
                "type": "bytes32"
            }
        ],
        "name": "AddSocialAccount",
        "outputs": [],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "Identity",
                "type": "bytes32"
            }
        ],
        "name": "getAllSharedAccounts",
        "outputs": [
            {
                "name": "SharedApps",
                "type": "bytes32[]"
            },
            {
                "name": "SharedUsernames",
                "type": "bytes32[]"
            },
            {
                "name": "SenderAddresses",
                "type": "address[]"
            },
            {
                "name": "Years",
                "type": "uint16[]"
            },
            {
                "name": "RestTimes",
                "type": "uint8[5][]"
            }
        ],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getManagerPubkey",
        "outputs": [
            {
                "name": "x1",
                "type": "bytes32"
            },
            {
                "name": "x2",
                "type": "bytes32"
            },
            {
                "name": "y1",
                "type": "bytes32"
            },
            {
                "name": "y2",
                "type": "bytes32"
            }
        ],
        "payable": false,
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "Identity",
                "type": "bytes32"
            },
            {
                "name": "PubKey_x1",
                "type": "bytes32"
            },
            {
                "name": "PubKey_x2",
                "type": "bytes32"
            },
            {
                "name": "PubKey_y1",
                "type": "bytes32"
            },
            {
                "name": "PubKey_y2",
                "type": "bytes32"
            }
        ],
        "name": "setMyPubKey",
        "outputs": [],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "name",
                "type": "bytes32"
            }
        ],
        "name": "checkNameOccupied",
        "outputs": [
            {
                "name": "occupied",
                "type": "bool"
            }
        ],
        "payable": false,
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "Identity",
                "type": "bytes32"
            },
            {
                "name": "targetAddress",
                "type": "address"
            }
        ],
        "name": "deleteContact",
        "outputs": [],
        "payable": false,
        "type": "function"
    },
    {
        "inputs": [],
        "payable": true,
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "description",
                "type": "string"
            }
        ],
        "name": "Log",
        "type": "event"
    }
]);
var UserAccountContract = web3.eth.contract([
    {
        "constant": true,
        "inputs": [],
        "name": "getSocialAccountsLength",
        "outputs": [
            {
                "name": "length",
                "type": "uint256"
            }
        ],
        "payable": false,
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "targetAddress",
                "type": "address"
            }
        ],
        "name": "deleteContact",
        "outputs": [],
        "payable": true,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getBalance",
        "outputs": [
            {
                "name": "balance",
                "type": "uint256"
            }
        ],
        "payable": false,
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "PubKey_x1",
                "type": "bytes32"
            },
            {
                "name": "PubKey_x2",
                "type": "bytes32"
            },
            {
                "name": "PubKey_y1",
                "type": "bytes32"
            },
            {
                "name": "PubKey_y2",
                "type": "bytes32"
            }
        ],
        "name": "setPublicKey",
        "outputs": [],
        "payable": true,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "index",
                "type": "uint256"
            }
        ],
        "name": "getContactByIndex",
        "outputs": [
            {
                "name": "resAddress",
                "type": "address"
            },
            {
                "name": "resName",
                "type": "bytes32"
            }
        ],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getPublicKey",
        "outputs": [
            {
                "name": "x1",
                "type": "bytes32"
            },
            {
                "name": "x2",
                "type": "bytes32"
            },
            {
                "name": "y1",
                "type": "bytes32"
            },
            {
                "name": "y2",
                "type": "bytes32"
            }
        ],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "targetApp",
                "type": "bytes32"
            },
            {
                "name": "targetUsername",
                "type": "bytes32"
            }
        ],
        "name": "getSocialAccountPw",
        "outputs": [
            {
                "name": "Password",
                "type": "bytes32"
            },
            {
                "name": "isFound",
                "type": "bool"
            }
        ],
        "payable": false,
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "targetApp",
                "type": "bytes32"
            },
            {
                "name": "targetUsername",
                "type": "bytes32"
            },
            {
                "name": "newPassword",
                "type": "bytes32"
            }
        ],
        "name": "AltSocialAccountPw",
        "outputs": [],
        "payable": true,
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "newName",
                "type": "bytes32"
            }
        ],
        "name": "setName",
        "outputs": [],
        "payable": true,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getSharedAccountsLength",
        "outputs": [
            {
                "name": "length",
                "type": "uint256"
            }
        ],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getContactsLength",
        "outputs": [
            {
                "name": "length",
                "type": "uint256"
            }
        ],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "targetApp",
                "type": "bytes32"
            },
            {
                "name": "targetUsername",
                "type": "bytes32"
            }
        ],
        "name": "getSharedAccountPw",
        "outputs": [
            {
                "name": "Password",
                "type": "bytes32"
            },
            {
                "name": "isFound",
                "type": "bool"
            }
        ],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "MyNickname",
        "outputs": [
            {
                "name": "",
                "type": "bytes32"
            }
        ],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "index",
                "type": "uint256"
            }
        ],
        "name": "getSharedAccounByIndex",
        "outputs": [
            {
                "name": "SharedApp",
                "type": "bytes32"
            },
            {
                "name": "SharedUsername",
                "type": "bytes32"
            },
            {
                "name": "SenderAddress",
                "type": "address"
            },
            {
                "name": "time",
                "type": "uint256"
            }
        ],
        "payable": false,
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "delApp",
                "type": "bytes32"
            },
            {
                "name": "delUsername",
                "type": "bytes32"
            }
        ],
        "name": "DelSocialAccount",
        "outputs": [],
        "payable": true,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "index",
                "type": "uint256"
            }
        ],
        "name": "getContactAddressByIndex",
        "outputs": [
            {
                "name": "resAddress",
                "type": "address"
            }
        ],
        "payable": false,
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "newCAddress",
                "type": "address"
            },
            {
                "name": "newCName",
                "type": "bytes32"
            },
            {
                "name": "PubKey_x1",
                "type": "bytes32"
            },
            {
                "name": "PubKey_x2",
                "type": "bytes32"
            },
            {
                "name": "PubKey_y1",
                "type": "bytes32"
            },
            {
                "name": "PubKey_y2",
                "type": "bytes32"
            }
        ],
        "name": "AddContact",
        "outputs": [],
        "payable": true,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "index",
                "type": "uint256"
            }
        ],
        "name": "getSocialAccountByIndex",
        "outputs": [
            {
                "name": "App",
                "type": "bytes32"
            },
            {
                "name": "Username",
                "type": "bytes32"
            }
        ],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "targetAddress",
                "type": "address"
            }
        ],
        "name": "getTargetContactPubKey",
        "outputs": [
            {
                "name": "PubKey_x1",
                "type": "bytes32"
            },
            {
                "name": "PubKey_x2",
                "type": "bytes32"
            },
            {
                "name": "PubKey_y1",
                "type": "bytes32"
            },
            {
                "name": "PubKey_y2",
                "type": "bytes32"
            },
            {
                "name": "isFound",
                "type": "bool"
            }
        ],
        "payable": false,
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "delApp",
                "type": "bytes32"
            },
            {
                "name": "delUsername",
                "type": "bytes32"
            },
            {
                "name": "timeLimited",
                "type": "uint256"
            }
        ],
        "name": "deleteSharedAccount",
        "outputs": [],
        "payable": true,
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "targetAddress",
                "type": "address"
            },
            {
                "name": "PubKey_x1",
                "type": "bytes32"
            },
            {
                "name": "PubKey_x2",
                "type": "bytes32"
            },
            {
                "name": "PubKey_y1",
                "type": "bytes32"
            },
            {
                "name": "PubKey_y2",
                "type": "bytes32"
            }
        ],
        "name": "AlterContactPubkey",
        "outputs": [],
        "payable": true,
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "targetAddress",
                "type": "address"
            },
            {
                "name": "altCName",
                "type": "bytes32"
            }
        ],
        "name": "AlterContactName",
        "outputs": [],
        "payable": true,
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "newApp",
                "type": "bytes32"
            },
            {
                "name": "newUsername",
                "type": "bytes32"
            },
            {
                "name": "newPassword",
                "type": "bytes32"
            },
            {
                "name": "SenderAddress",
                "type": "address"
            }
        ],
        "name": "AddSharedAccount",
        "outputs": [],
        "payable": true,
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "newApp",
                "type": "bytes32"
            },
            {
                "name": "newUsername",
                "type": "bytes32"
            },
            {
                "name": "newPassword",
                "type": "bytes32"
            }
        ],
        "name": "AddSocialAccount",
        "outputs": [],
        "payable": true,
        "type": "function"
    },
    {
        "inputs": [
            {
                "name": "Name",
                "type": "bytes32"
            },
            {
                "name": "PubKey_x1",
                "type": "bytes32"
            },
            {
                "name": "PubKey_x2",
                "type": "bytes32"
            },
            {
                "name": "PubKey_y1",
                "type": "bytes32"
            },
            {
                "name": "PubKey_y2",
                "type": "bytes32"
            }
        ],
        "payable": true,
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "description",
                "type": "string"
            }
        ],
        "name": "Log",
        "type": "event"
    }
]);

var Nettoken = TokenFunctionsContract.at("0x069d2423f43dc7bd629dd63c8776e631dcc309bd");

var eventLog = Nettoken.Log();
var eventLogs;
eventLog.watch(function (error, result) {
    if (!error) {
        eventLogs = result.args.description;
        console.log(eventLogs);
        alert(eventLogs);
    }
});


