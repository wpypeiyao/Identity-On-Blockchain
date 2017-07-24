var LoginIdentity;
var Successful = new Boolean();
var AccountName, AccountPubKey;
var AllSocialAccounts, Apps, Usernames, SocialAccountslength;
var AllSharedAccounts, SharedApps, SharedUsernames, fromAddresses, timestamps, SharedAccountslength;
var AllContacts, ContactAddresses, ContactNames, Contactslength;

var JSONAllSocialAccounts = [];
var JSONAllSharedAccounts = [];
var JSONAllContacts = [];
var ROWSocialAccount, ROWSharedAccount, ROWContact;
var AppAscii, UsernameAscii, SharedAppAscii, SharedUsernameAscii, ContactNameAscii;

var newMyName, newMyPubKey;

/*Vue Objects that process data*/
var VueNamePubkey = new Vue({
    el: '#NamePubkey',
    data: {
        MyName: '',
        MyPubKey: '',
        isVisible: false
    }
});
var VueSocialAccount = new Vue({
    el: '#SocialAccountOutput',
    data: {
        JSONAllSocialAccounts: []
    }
});
var VueSharedAccount = new Vue({
    el: '#SharedAccountOutput',
    data: {
        JSONAllSharedAccounts: []
    }
});
var VueContact = new Vue({
    el: '#ContactOutput',
    data: {
        JSONAllContacts: []
    }
});


/*Button: Login*/
function Login() {
    LoginIdentity = String($("#Login input#LoginID").val());
    LoginIdentity = web3.toHex(LoginIdentity);
    Nettoken.LoginCheck.call(LoginIdentity, function (error, result) {
        if (!error) {
            Successful = result[0];
            if (Successful == true) {
                /*If it is true, it means that the identity is correct, and it is allowed to get data*/

                /*to interact with contract and store data locally*/
                AccountName = web3.toAscii(Nettoken.getMyName.call(LoginIdentity));
                AccountPubKey = web3.toAscii(Nettoken.getMyPubKey.call(LoginIdentity));
                AllSocialAccounts = Nettoken.getAllSocialAccounts.call(LoginIdentity);
                AllSharedAccounts = Nettoken.getAllSharedAccounts.call(LoginIdentity);
                AllContacts = Nettoken.getAllContact.call(LoginIdentity);

                /*data processing:social accounts*/
                Apps = AllSocialAccounts[0];
                Usernames = AllSocialAccounts[1];
                SocialAccountslength = Apps.length;

                for (var i = 0; i < SocialAccountslength; i++) {
                    AppAscii = web3.toAscii(Apps[i]);
                    UsernameAscii = web3.toAscii(Usernames[i]);
                    ROWSocialAccount = {};
                    ROWSocialAccount.App = AppAscii;
                    ROWSocialAccount.username = UsernameAscii;
                    ROWSocialAccount.inputID = "NewPW" + i;
                    ROWSocialAccount.inputAddressID = "SharedAddress" + i;
                    JSONAllSocialAccounts.push(ROWSocialAccount);
                }

                /*data processing:shared accounts*/
                SharedApps = AllSharedAccounts[0]
                SharedUsernames = AllSharedAccounts[1]
                fromAddresses = AllSharedAccounts[2]
                timestamps = AllSharedAccounts[3]
                SharedAccountslength = SharedApps.length;

                for (var j = 0; j < SharedAccountslength; j++) {
                    SharedAppAscii = web3.toAscii(SharedApps[j]);
                    SharedUsernameAscii = web3.toAscii(SharedUsernames[j]);
                    ROWSharedAccount = {};
                    ROWSharedAccount.SharedApp = SharedAppAscii;
                    ROWSharedAccount.SharedUsername = SharedUsernameAscii;
                    ROWSharedAccount.fromAddress = fromAddresses[j];
                    ROWSharedAccount.timestamp = timestamps[j];
                    JSONAllSharedAccounts.push(ROWSharedAccount);
                }

                /*data processing:contacts*/
                ContactAddresses = AllContacts[0]
                ContactNames = AllContacts[1]
                Contactslength = ContactAddresses.length;

                for (var k = 0; k < Contactslength; k++) {
                    ContactNameAscii = web3.toAscii(ContactNames[k]);

                    ROWContact = {};
                    ROWContact.ContactAddress = ContactAddresses[k];
                    ROWContact.ContactName = ContactNameAscii;
                    ROWContact.inputID = "NewContactName" + k;
                    JSONAllContacts.push(ROWContact);
                }

                /*show data on page*/
                VueNamePubkey.MyName = AccountName;
                VueNamePubkey.MyPubKey = AccountPubKey;
                VueNamePubkey.isVisible = true;
                VueSocialAccount.JSONAllSocialAccounts = JSONAllSocialAccounts;
                VueSharedAccount.JSONAllSharedAccounts = JSONAllSharedAccounts;
                VueContact.JSONAllContacts = JSONAllContacts;

                /*monitor useraccount*/
                var ThisAccount = UserAccountContract.at(result[1]);
                var ThisAccounteventLog = ThisAccount.Log();
                var ThisAccounteventSharedAccountPW = ThisAccount.SharedAccountPW();

                var ThisAccounteventLogs, ThisAccounteventSharedAccountPWs;

                ThisAccounteventLog.watch(function (error, result) {
                    if (!error) {
                        ThisAccounteventLogs = result.args.description;
                        console.log(ThisAccounteventLogs);
                    }
                });

                ThisAccounteventSharedAccountPW.watch(function (error, result) {
                    if (!error) {
                        ThisAccounteventSharedAccountPWs = result.args.PW;
                        console.log(ThisAccounteventSharedAccountPWs);
                    }
                });


            }
            else
                console.log("Identity is incorrect!");

        }
        else
            console.error(error);
    });
};

/*Button: setMyName*/
function setMyName() {
    Nettoken.LoginCheck.call(LoginIdentity, function (error, result) {
        if (!error) {
            Successful = result[0];
            if (Successful == true) {
                /*If it is true, it means that the identity is correct, and it is allowed to operate*/
                newMyName = String($("#NamePubkey input#setMyName").val());
                newMyName = web3.toHex(newMyName);
                Nettoken.setMyName.sendTransaction(LoginIdentity, newMyName, {from: web3.eth.accounts[0]}, function (error, result) {
                    if (!error) {
                        AccountName = web3.toAscii(Nettoken.getMyName.call(LoginIdentity));
                        VueNamePubkey.MyName = AccountName;
                    }
                });
            }
            else
                console.log("Identity is incorrect!");
        }
        else
            console.error(error);
    });
};

/*Button: setMyPubKey*/
function setMyPubKey() {
    Nettoken.LoginCheck.call(LoginIdentity, function (error, result) {
        if (!error) {
            Successful = result[0];
            if (Successful == true) {
                /*If it is true, it means that the identity is correct, and it is allowed to operate*/
                newMyPubKey = String($("#NamePubkey input#setMyPubKey").val());
                newMyPubKey = web3.toHex(newMyPubKey);
                Nettoken.setMyPubKey.sendTransaction(LoginIdentity, newMyPubKey, {from: web3.eth.accounts[0]}, function (error, result) {
                    if (!error) {
                        AccountPubKey = web3.toAscii(Nettoken.getMyPubKey.call(LoginIdentity));
                        VueNamePubkey.MyPubKey = AccountPubKey;
                    }
                });
            }
            else
                console.log("Identity is incorrect!");
        }
        else
            console.error(error);
    });
};


/*Functions:SocialAccount*/
/*Button: AddSocialAccount*/
function AddSocialAccount() {
    Nettoken.LoginCheck.call(LoginIdentity, function (error, result) {
        if (!error) {
            Successful = result[0];
            if (Successful == true) {
                /*If it is true, it means that the identity is correct, and it is allowed to operate*/
                var newApp = String($("#AddSocialAccount input#newApp").val());
                var newUsername = String($("#AddSocialAccount input#newUsername").val());
                var newPassword = String($("#AddSocialAccount input#newPassword").val());
                newApp = web3.toHex(newApp);
                newUsername = web3.toHex(newUsername);
                newPassword = web3.toHex(newPassword);
                Nettoken.AddSocialAccount.sendTransaction(LoginIdentity, newApp, newUsername, newPassword, {
                    from: web3.eth.accounts[0],
                    gas: '400000'
                }, function (error, result) {
                    if (!error) {
                        /*data updating*/
                        /*                        AllSocialAccounts = Nettoken.getAllSocialAccounts.call(LoginIdentity);
                         Apps = AllSocialAccounts[0];
                         Usernames = AllSocialAccounts[1];
                         SocialAccountslength = Apps.length;
                         for (var i = 0; i < SocialAccountslength; i++) {
                         AppAscii = web3.toAscii(Apps[i]);
                         UsernameAscii = web3.toAscii(Usernames[i]);
                         ROWSocialAccount = {};
                         ROWSocialAccount.App = AppAscii;
                         ROWSocialAccount.username = UsernameAscii;
                         JSONAllSocialAccounts.push(ROWSocialAccount);
                         }
                         VueSocialAccount.JSONAllSocialAccounts = JSONAllSocialAccounts;*/
                    }
                });
            }
            else
                console.log("Identity is incorrect!");
        }
        else
            console.error(error);
    });
};

/*Item Button: DelSocialAccount*/
function DelSocialAccount(delApp, delUsername) {
    Nettoken.LoginCheck.call(LoginIdentity, function (error, result) {
        if (!error) {
            Successful = result[0];
            if (Successful == true) {
                /*If it is true, it means that the identity is correct, and it is allowed to operate*/
                Nettoken.DelSocialAccount.sendTransaction(LoginIdentity, delApp, delUsername, {
                    from: web3.eth.accounts[0],
                    gas: '200000'
                }, function (error, result) {
                    if (!error) {
                        /*data updating*/
                        /*                        AllSocialAccounts = Nettoken.getAllSocialAccounts.call(LoginIdentity);
                         Apps = AllSocialAccounts[0];
                         Usernames = AllSocialAccounts[1];
                         SocialAccountslength = Apps.length;
                         for (var i = 0; i < SocialAccountslength; i++) {
                         AppAscii = web3.toAscii(Apps[i]);
                         UsernameAscii = web3.toAscii(Usernames[i]);
                         ROWSocialAccount = {};
                         ROWSocialAccount.App = AppAscii;
                         ROWSocialAccount.username = UsernameAscii;
                         JSONAllSocialAccounts.push(ROWSocialAccount);
                         }
                         VueSocialAccount.JSONAllSocialAccounts = JSONAllSocialAccounts;*/
                    }
                });
            }
            else
                console.log("Identity is incorrect!");
        }
        else
            console.error(error);
    });
};

/*Item Button: getSocialAccountPW*/
function getSocialAccountPW(targetApp, targetUsername) {
    Nettoken.LoginCheck.call(LoginIdentity, function (error, result) {
        if (!error) {
            Successful = result[0];
            if (Successful == true) {
                /*If it is true, it means that the identity is correct, and it is allowed to operate*/
                var getSocialAccountPWResult;
                getSocialAccountPWResult = Nettoken.getSocialAccountPw.call(LoginIdentity, targetApp, targetUsername);
                if (getSocialAccountPWResult[1] == true) {
                    var result = web3.toAscii(getSocialAccountPWResult[0]);
                    console.log("Your password is:" + result);
                    alert("Your password is:" + result);
                }
                else
                    console.log("The record has been deleted. Failed to get the password.");
            }
            else
                console.log("Identity is incorrect!");
        }
        else
            console.error(error);
    });
};

/*Item Button: AltSocialAccountPw*/
function AltSocialAccountPw(targetApp, targetUsername, Index) {
    Nettoken.LoginCheck.call(LoginIdentity, function (error, result) {
        if (!error) {
            Successful = result[0];
            if (Successful == true) {
                /*If it is true, it means that the identity is correct, and it is allowed to operate*/
                var inputID = String("#SocialAccountOutput input#" + Index);
                var NewSocialAccountPW = String($(inputID).val());
                NewSocialAccountPW = web3.toHex(NewSocialAccountPW);
                Nettoken.AltSocialAccountPw.sendTransaction(LoginIdentity, targetApp, targetUsername, NewSocialAccountPW, {
                    from: web3.eth.accounts[0],
                    gas: '55000'
                });
            }
            else
                console.log("Identity is incorrect!");
        }
        else
            console.error(error);
    });
}

/*Item Button: recordToShare*/
function ShareAccount(targetApp, targetUsername, index) {
    Nettoken.LoginCheck.call(LoginIdentity, function (error, result) {
        if (!error) {
            Successful = result[0];
            if (Successful == true) {
                /*If it is true, it means that the identity is correct, and it is allowed to operate*/
                var inputID = String("#SocialAccountOutput input#" + index);
                var ShareAccountAddress;
                ShareAccountAddress = String($(inputID).val());
                var CheckAddressFormat = web3.isAddress(ShareAccountAddress);
                if (CheckAddressFormat == true) {
                    Nettoken.AddSharedAccount.sendTransaction(LoginIdentity, ShareAccountAddress, targetApp, targetUsername, {
                        from: web3.eth.accounts[0],
                        gas: '430000'
                    });
                }
                else
                    console.log("Address format is incorrect!");
            }
            else
                console.log("Identity is incorrect!");
        }
        else
            console.error(error);
    });
}


/*Functions:Contact*/
/*Button: AddContact*/
function AddContact() {
    Nettoken.LoginCheck.call(LoginIdentity, function (error, result) {
        if (!error) {
            Successful = result[0];
            if (Successful == true) {
                /*If it is true, it means that the identity is correct, and it is allowed to operate*/
                var newContactAddress = String($("#Contacts input#newContactAddress").val());
                var CheckAddressFormat = web3.isAddress(newContactAddress);
                if (CheckAddressFormat == true) {
                    Nettoken.AddContact.sendTransaction(LoginIdentity, newContactAddress, {
                        from: web3.eth.accounts[0],
                        gas: '550000'
                    }, function (error, result) {
                        if (!error) {
                            /*data updating*/
                            /* AllContacts = Nettoken.getAllContact.call(LoginIdentity);
                             ContactAddresses = AllContacts[0]
                             ContactNames = AllContacts[1]
                             Contactslength = ContactAddresses.length;
                             for (var k = 0; k < Contactslength; k++) {
                             ContactNameAscii = web3.toAscii(ContactNames[k]);
                             ROWContact = {};
                             ROWContact.ContactAddress = ContactAddresses[k];
                             ROWContact.ContactName = ContactNameAscii;
                             ROWContact.inputID = "NewContactName" + k;
                             JSONAllContacts.push(ROWContact);
                             }
                             VueContact.JSONAllContacts = JSONAllContacts;*/
                        }
                    });
                }
                else
                    console.log("Address format is incorrect!");
            }
            else
                console.log("Identity is incorrect!");
        }
        else
            console.error(error);
    });
};

/*Item Button: getTargetContactPubKey*/
function getTargetContactPubKey(targetAddress) {
    Nettoken.LoginCheck.call(LoginIdentity, function (error, result) {
        if (!error) {
            Successful = result[0];
            if (Successful == true) {
                /*If it is true, it means that the identity is correct, and it is allowed to operate*/
                var getTargetContactPubKeyResult;
                getTargetContactPubKeyResult = Nettoken.getTargetContactPubKey.call(LoginIdentity, targetAddress);
                if (getTargetContactPubKeyResult[1] == true) {
                    var result = web3.toAscii(getTargetContactPubKeyResult[0]);
                    console.log("The public key of your contact is:" + result);
                    alert("The public key of your contact is:" + result);
                }
                else
                    console.log("The record has been deleted. Failed to get the public key.");
            }
            else
                console.log("Identity is incorrect!");
        }
        else
            console.error(error);
    });
}

/*Item Button: deleteContact*/
function deleteContact(targetAddress) {
    Nettoken.LoginCheck.call(LoginIdentity, function (error, result) {
        if (!error) {
            Successful = result[0];
            if (Successful == true) {
                /*If it is true, it means that the identity is correct, and it is allowed to operate*/
                Nettoken.deleteContact.sendTransaction(LoginIdentity, targetAddress, {
                    from: web3.eth.accounts[0],
                    gas: '350000'
                }, function (error, result) {
                    if (!error) {
                        /*data updating*/
                        /* AllContacts = Nettoken.getAllContact.call(LoginIdentity);
                         ContactAddresses = AllContacts[0]
                         ContactNames = AllContacts[1]
                         Contactslength = ContactAddresses.length;
                         for (var k = 0; k < Contactslength; k++) {
                         ContactNameAscii = web3.toAscii(ContactNames[k]);
                         ROWContact = {};
                         ROWContact.ContactAddress = ContactAddresses[k];
                         ROWContact.ContactName = ContactNameAscii;
                         ROWContact.inputID = "NewContactName" + k;
                         JSONAllContacts.push(ROWContact);
                         }
                         VueContact.JSONAllContacts = JSONAllContacts;*/
                    }
                });
            }
            else
                console.log("Identity is incorrect!");
        }
        else
            console.error(error);
    });
}

/*Item Button: AlterContactName*/
function AlterContactName(targetAddress, Index) {
    Nettoken.LoginCheck.call(LoginIdentity, function (error, result) {
        if (!error) {
            Successful = result[0];
            if (Successful == true) {
                /*If it is true, it means that the identity is correct, and it is allowed to operate*/
                var inputID = String("#ContactOutput input#" + Index);
                var NewContactName = String($(inputID).val());
                NewContactName = web3.toHex(NewContactName);
                Nettoken.AlterContactName.sendTransaction(LoginIdentity, targetAddress, NewContactName, {
                    from: web3.eth.accounts[0],
                    gas: '53000'
                });
            }
            else
                console.log("Identity is incorrect!");
        }
        else
            console.error(error);
    });
}

/*Functions:SharedAccount*/
/*Button: getSharedAccountPw*/
function getSharedAccountPw(targetApp, targetUsername) {
    Nettoken.LoginCheck.call(LoginIdentity, function (error, result) {
        if (!error) {
            Successful = result[0];
            if (Successful == true) {
                /*If it is true, it means that the identity is correct, and it is allowed to operate*/
                Nettoken.getSharedAccountPw.sendTransaction(LoginIdentity, targetApp, targetUsername, {
                    from: web3.eth.accounts[0],
                    gas: '500000'
                });
            }
            else
                console.log("Identity is incorrect!");
        }
        else
            console.error(error);
    });
}

eventSharedAccountPW.watch(function (error, result) {
    if (!error) {
        eventSharedAccountPWs = result.args.PW;
        var SharedAccountPWresult = web3.toAscii(eventSharedAccountPWs);
        alert("The account password is:"+SharedAccountPWresult);
    }
});


var RegisterLogin = new Vue({
    el: '#Register-and-Login',
    data: {
        MyName: '',
        MyPubKey: '',
        isRegister: true
    }
});
    //Register
    $("#Register button.Register").click(function () {
        var RegisterID = String($("#Register input#RegisterID").val());
        var RegisterName = String($("#Register input#RegisterName").val());
        var RegisterPubkey = String($("#Register input#RegisterPubkey").val());
        Nettoken.newUserAccount.sendTransaction(RegisterID, RegisterName, RegisterPubkey, {
            from: web3.eth.accounts[0],
            data: '0x60606040526040516040806128f0833981016040528080519060200190919080519060200190919050505b816000816000191690555080600181600019169055505b50505b61289d806100536000396000f30060606040523615610131576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630cba6d27146101335780631046bc68146101595780631371cd1d1461018757806314ff89cd146101a3578063283f6502146102125780634259701b1461024057806347ec8d82146102985780635ac801fe146102ce5780636fca2023146102ea5780637713b431146103105780637a79940d14610336578063851605701461038e57806387a07adb146103bc57806389a7adcc1461044157806391f39f101461046a5780639b8eb7b4146104ca5780639de315f114610515578063a85a896014610572578063aa27cdf2146105ad578063d2bad803146105df578063da7e019e14610627578063e1c7f06a14610662578063e35d3590146106b7575bfe5b341561013b57fe5b6101436106ed565b6040518082815260200191505060405180910390f35b610185600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506106fb565b005b6101a1600480803560001916906020019091905050610b5b565b005b34156101ab57fe5b6101c16004808035906020019091905050610b6a565b604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182600019166000191681526020019250505060405180910390f35b341561021a57fe5b610222610be2565b60405180826000191660001916815260200191505060405180910390f35b341561024857fe5b61026f60048080356000191690602001909190803560001916906020019091905050610be8565b604051808360001916600019168152602001821515151581526020019250505060405180910390f35b6102cc6004808035600019169060200190919080356000191690602001909190803560001916906020019091905050610caa565b005b6102e8600480803560001916906020019091905050610e5b565b005b34156102f257fe5b6102fa610e6a565b6040518082815260200191505060405180910390f35b341561031857fe5b610320610e78565b6040518082815260200191505060405180910390f35b341561033e57fe5b61036560048080356000191690602001909190803560001916906020019091905050610e86565b604051808360001916600019168152602001821515151581526020019250505060405180910390f35b341561039657fe5b61039e610f48565b60405180826000191660001916815260200191505060405180910390f35b34156103c457fe5b6103da6004808035906020019091905050610f4e565b60405180856000191660001916815260200184600019166000191681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200194505050505060405180910390f35b6104686004808035600019169060200190919080356000191690602001909190505061101a565b005b341561047257fe5b61048860048080359060200190919050506113a5565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156104d257fe5b6104e860048080359060200190919050506113f4565b60405180836000191660001916815260200182600019166000191681526020019250505060405180910390f35b341561051d57fe5b610549600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061144c565b604051808360001916600019168152602001821515151581526020019250505060405180910390f35b6105ab600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803560001916906020019091905050611529565b005b6105dd600480803560001916906020019091908035600019169060200190919080359060200190919050506116ef565b005b610625600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919080356000191690602001909190803560001916906020019091905050611c19565b005b610660600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803560001916906020019091905050611ee9565b005b6106b5600480803560001916906020019091908035600019169060200190919080356000191690602001909190803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506120af565b005b6106eb60048080356000191690602001909190803560001916906020019091908035600019169060200190919050506123c3565b005b600060028054905090505b90565b60006000600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160009054906101000a900460ff1615156107e8577fcf34ef537ac33ee1ac626ca1587a0a7e8e51561e5514f8cb36afa1c5102b3bab60405180806020018281038252602b8152602001807f4661696c656421205468657265206973206e6f207375636820636f6e7461637481526020017f20746f2064656c6574652100000000000000000000000000000000000000000081525060400191505060405180910390a1610b55565b600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000154915060048281548110151561083c57fe5b906000526020600020906003020160005b6000820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff0219169055600182016000905560028201600090555050600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600060008201600090556001820160006101000a81549060ff0219169055505060046001600480549050038154811015156108fc57fe5b906000526020600020906003020160005b5060048381548110151561091d57fe5b906000526020600020906003020160005b506000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600182015481600101906000191690556002820154816002019060001916905590505060046001600480549050038154811015156109d057fe5b906000526020600020906003020160005b5060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081600560008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600001819055506004600160048054905003815481101515610a6657fe5b906000526020600020906003020160005b6000820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556001820160009055600282016000905550506004805480919060019003610ac5919061264f565b507fcf34ef537ac33ee1ac626ca1587a0a7e8e51561e5514f8cb36afa1c5102b3bab6040518080602001828103825260218152602001807f5375636365737366756c6c792064656c657465642074686520636f6e7461637481526020017f2e0000000000000000000000000000000000000000000000000000000000000081525060400191505060405180910390a15b5b505050565b80600181600019169055505b50565b60006000600483815481101515610b7d57fe5b906000526020600020906003020160005b5060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169150600483815481101515610bc457fe5b906000526020600020906003020160005b506001015490505b915091565b60005481565b600060006003600085600019166000191681526020019081526020016000206000846000191660001916815260200190815260200160002060010160009054906101000a900460ff1615610c9d5760026003600086600019166000191681526020019081526020016000206000856000191660001916815260200190815260200160002060000154815481101515610c7c57fe5b906000526020600020906003020160005b5060020154915060019050610ca2565b600090505b5b9250929050565b6003600084600019166000191681526020019081526020016000206000836000191660001916815260200190815260200160002060010160009054906101000a900460ff161515610d62577fcf34ef537ac33ee1ac626ca1587a0a7e8e51561e5514f8cb36afa1c5102b3bab6040518080602001828103825260208152602001807f4661696c656421205468657265206973206e6f2073756368207265636f72642e81525060200191505060405180910390a1610e55565b8060026003600086600019166000191681526020019081526020016000206000856000191660001916815260200190815260200160002060000154815481101515610da957fe5b906000526020600020906003020160005b5060020181600019169055507fcf34ef537ac33ee1ac626ca1587a0a7e8e51561e5514f8cb36afa1c5102b3bab6040518080602001828103825260238152602001807f5375636365737366756c6c79206d6f646966696564207468652070617373776f81526020017f72642e000000000000000000000000000000000000000000000000000000000081525060400191505060405180910390a15b5b505050565b80600081600019169055505b50565b600060068054905090505b90565b600060048054905090505b90565b600060006007600085600019166000191681526020019081526020016000206000846000191660001916815260200190815260200160002060010160009054906101000a900460ff1615610f3b5760066007600086600019166000191681526020019081526020016000206000856000191660001916815260200190815260200160002060000154815481101515610f1a57fe5b906000526020600020906005020160005b5060020154915060019050610f40565b600090505b5b9250929050565b60015481565b6000600060006000600685815481101515610f6557fe5b906000526020600020906005020160005b50600001549350600685815481101515610f8c57fe5b906000526020600020906005020160005b50600101549250600685815481101515610fb357fe5b906000526020600020906005020160005b5060030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169150600685815481101515610ffa57fe5b906000526020600020906005020160005b506004015490505b9193509193565b6000600060006003600086600019166000191681526020019081526020016000206000856000191660001916815260200190815260200160002060010160009054906101000a900460ff161561133457600360008660001916600019168152602001908152602001600020600085600019166000191681526020019081526020016000206000015492506002838154811015156110b357fe5b906000526020600020906003020160005b600082016000905560018201600090556002820160009055505060036000866000191660001916815260200190815260200160002060008560001916600019168152602001908152602001600020600060008201600090556001820160006101000a81549060ff02191690555050600260016002805490500381548110151561114957fe5b906000526020600020906003020160005b5060028481548110151561116a57fe5b906000526020600020906003020160005b5060008201548160000190600019169055600182015481600101906000191690556002820154816002019060001916905590505060026001600280549050038154811015156111c657fe5b906000526020600020906003020160005b5060000154915060026001600280549050038154811015156111f557fe5b906000526020600020906003020160005b50600101549050826003600084600019166000191681526020019081526020016000206000836000191660001916815260200190815260200160002060000181905550600260016002805490500381548110151561126057fe5b906000526020600020906003020160005b600082016000905560018201600090556002820160009055505060028054809190600190036112a09190612681565b507fcf34ef537ac33ee1ac626ca1587a0a7e8e51561e5514f8cb36afa1c5102b3bab6040518080602001828103825260228152602001807f5375636365737366756c6c792064656c657465642074686174206163636f756e81526020017f742e00000000000000000000000000000000000000000000000000000000000081525060400191505060405180910390a161139d565b7fcf34ef537ac33ee1ac626ca1587a0a7e8e51561e5514f8cb36afa1c5102b3bab6040518080602001828103825260208152602001807f4661696c656421205468657265206973206e6f2073756368207265636f72642e81525060200191505060405180910390a15b5b5050505050565b60006004828154811015156113b657fe5b906000526020600020906003020160005b5060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690505b919050565b6000600060028381548110151561140757fe5b906000526020600020906003020160005b5060000154915060028381548110151561142e57fe5b906000526020600020906003020160005b506001015490505b915091565b600060006000600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160009054906101000a900460ff1615156114b15760009150611522565b600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000154905060048181548110151561150557fe5b906000526020600020906003020160005b50600201549250600191505b5b50915091565b600560008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160009054906101000a900460ff1615156115ec577fcf34ef537ac33ee1ac626ca1587a0a7e8e51561e5514f8cb36afa1c5102b3bab6040518080602001828103825260208152602001807f4661696c656421205468657265206973206e6f2073756368207265636f72642e81525060200191505060405180910390a16116ea565b806004600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000015481548110151561163e57fe5b906000526020600020906003020160005b5060020181600019169055507fcf34ef537ac33ee1ac626ca1587a0a7e8e51561e5514f8cb36afa1c5102b3bab60405180806020018281038252602d8152602001807f5375636365737366756c6c79206d6f6469666965642074686520636f6e74616381526020017f74207075626c6963206b65792e0000000000000000000000000000000000000081525060400191505060405180910390a15b5b5050565b600060006000600060006007600089600019166000191681526020019081526020016000206000886000191660001916815260200190815260200160002060010160009054906101000a900460ff1615611ba5576007600089600019166000191681526020019081526020016000206000886000191660001916815260200190815260200160002060000154945060068581548110151561178c57fe5b906000526020600020906005020160005b5060040154935042925085848403101515611b11576006858154811015156117c157fe5b906000526020600020906005020160005b6000820160009055600182016000905560028201600090556003820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556004820160009055505060076000896000191660001916815260200190815260200160002060008860001916600019168152602001908152602001600020600060008201600090556001820160006101000a81549060ff02191690555050600660016006805490500381548110151561188657fe5b906000526020600020906005020160005b506006868154811015156118a757fe5b906000526020600020906005020160005b506000820154816000019060001916905560018201548160010190600019169055600282015481600201906000191690556003820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168160030160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060048201548160040155905050600660016006805490500381548110151561197457fe5b906000526020600020906005020160005b5060000154915060066001600680549050038154811015156119a357fe5b906000526020600020906005020160005b506001015490508460076000846000191660001916815260200190815260200160002060008360001916600019168152602001908152602001600020600001819055506006600160068054905003815481101515611a0e57fe5b906000526020600020906005020160005b6000820160009055600182016000905560028201600090556003820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff0219169055600482016000905550506006805480919060019003611a7d91906126b3565b507fcf34ef537ac33ee1ac626ca1587a0a7e8e51561e5514f8cb36afa1c5102b3bab6040518080602001828103825260398152602001807f5468652074617267657420736861726564206163636f756e7420697320696e7681526020017f616c69642073696e6365206974206973206f7665726475652e0000000000000081525060400191505060405180910390a1611ba0565b7fcf34ef537ac33ee1ac626ca1587a0a7e8e51561e5514f8cb36afa1c5102b3bab6040518080602001828103825260388152602001807f5468652074617267657420736861726564206163636f756e742069732076616c81526020017f69642c20746875732069742063616e20626520757365642e000000000000000081525060400191505060405180910390a15b611c0e565b7fcf34ef537ac33ee1ac626ca1587a0a7e8e51561e5514f8cb36afa1c5102b3bab6040518080602001828103825260208152602001807f4661696c656421205468657265206973206e6f2073756368207265636f72642e81525060200191505060405180910390a15b5b5050505050505050565b600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160009054906101000a900460ff161515611e545760048054806001018281611c8391906126e5565b916000526020600020906003020160005b6060604051908101604052808773ffffffffffffffffffffffffffffffffffffffff168152602001866000191681526020018560001916815250909190915060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506020820151816001019060001916905560408201518160020190600019169055505050600160048054905003600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600001819055506001600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160006101000a81548160ff0219169083151502179055507fcf34ef537ac33ee1ac626ca1587a0a7e8e51561e5514f8cb36afa1c5102b3bab60405180806020018281038252601f8152602001807f5375636365737366756c6c792061646465642074686520636f6e746163742e0081525060200191505060405180910390a1611ee3565b7fcf34ef537ac33ee1ac626ca1587a0a7e8e51561e5514f8cb36afa1c5102b3bab6040518080602001828103825260248152602001807f4661696c656421205468657265206578697374696e67207375636820636f6e7481526020017f616374210000000000000000000000000000000000000000000000000000000081525060400191505060405180910390a15b5b505050565b600560008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160009054906101000a900460ff161515611fac577fcf34ef537ac33ee1ac626ca1587a0a7e8e51561e5514f8cb36afa1c5102b3bab6040518080602001828103825260208152602001807f4661696c656421205468657265206973206e6f2073756368207265636f72642e81525060200191505060405180910390a16120aa565b806004600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000154815481101515611ffe57fe5b906000526020600020906003020160005b5060010181600019169055507fcf34ef537ac33ee1ac626ca1587a0a7e8e51561e5514f8cb36afa1c5102b3bab6040518080602001828103825260278152602001807f5375636365737366756c6c79206d6f6469666965642074686520636f6e74616381526020017f74206e616d652e0000000000000000000000000000000000000000000000000081525060400191505060405180910390a15b5b5050565b6007600085600019166000191681526020019081526020016000206000846000191660001916815260200190815260200160002060010160009054906101000a900460ff161561222f576006600760008660001916600019168152602001908152602001600020600085600019166000191681526020019081526020016000206000015481548110151561213f57fe5b906000526020600020906005020160005b50600201546000191682600019161415156121ca5781600660076000876000191660001916815260200190815260200160002060008660001916600019168152602001908152602001600020600001548154811015156121ac57fe5b906000526020600020906005020160005b5060020181600019169055505b426006600760008760001916600019168152602001908152602001600020600086600019166000191681526020019081526020016000206000015481548110151561221157fe5b906000526020600020906005020160005b50600401819055506123bc565b600680548060010182816122439190612717565b916000526020600020906005020160005b60a0604051908101604052808860001916815260200187600019168152602001866000191681526020018573ffffffffffffffffffffffffffffffffffffffff16815260200142815250909190915060008201518160000190600019169055602082015181600101906000191690556040820151816002019060001916905560608201518160030160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506080820151816004015550505060016007600086600019166000191681526020019081526020016000206000856000191660001916815260200190815260200160002060010160006101000a81548160ff02191690831515021790555060016006805490500360076000866000191660001916815260200190815260200160002060008560001916600019168152602001908152602001600020600001819055505b5b50505050565b6003600084600019166000191681526020019081526020016000206000836000191660001916815260200190815260200160002060010160009054906101000a900460ff1615156125ba57600280548060010182816124229190612749565b916000526020600020906003020160005b606060405190810160405280876000191681526020018660001916815260200185600019168152509091909150600082015181600001906000191690556020820151816001019060001916905560408201518160020190600019169055505050600160028054905003600360008560001916600019168152602001908152602001600020600084600019166000191681526020019081526020016000206000018190555060016003600085600019166000191681526020019081526020016000206000846000191660001916815260200190815260200160002060010160006101000a81548160ff0219169083151502179055507fcf34ef537ac33ee1ac626ca1587a0a7e8e51561e5514f8cb36afa1c5102b3bab60405180806020018281038252602e8152602001807f5375636365737366756c6c792061646465642061207265636f7264206f66207381526020017f6f6369616c206163636f756e742e00000000000000000000000000000000000081525060400191505060405180910390a1612649565b7fcf34ef537ac33ee1ac626ca1587a0a7e8e51561e5514f8cb36afa1c5102b3bab6040518080602001828103825260238152602001807f4661696c656421205468657265206578697374696e672073756368207265636f81526020017f72642e000000000000000000000000000000000000000000000000000000000081525060400191505060405180910390a15b5b505050565b81548183558181151161267c5760030281600302836000526020600020918201910161267b919061277b565b5b505050565b8154818355818115116126ae576003028160030283600052602060002091820191016126ad91906127d2565b5b505050565b8154818355818115116126e0576005028160050283600052602060002091820191016126df919061280a565b5b505050565b81548183558181151161271257600302816003028360005260206000209182019101612711919061277b565b5b505050565b81548183558181151161274457600502816005028360005260206000209182019101612743919061280a565b5b505050565b8154818355818115116127765760030281600302836000526020600020918201910161277591906127d2565b5b505050565b6127cf91905b808211156127cb5760006000820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556001820160009055600282016000905550600301612781565b5090565b90565b61280791905b80821115612803576000600082016000905560018201600090556002820160009055506003016127d8565b5090565b90565b61286e91905b8082111561286a5760006000820160009055600182016000905560028201600090556003820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff0219169055600482016000905550600501612810565b5090565b905600a165627a7a723058203ce3e28a481a29963f23947df36d15690d5880cde844a5b47d6f4c6b6b2e8cff0029',
            gas: '5000000'
        }, function (error, result) {
            if (error)
                console.error(error);});
    });

function setTimeLimited(){
    var newTimeLimited = Number($("input#newTimelimited").val());
    var checkTimeFormat=isNaN(newTimeLimited);
    if(checkTimeFormat){
        alert("The format is incorrect!");
    }
    else {
        Nettoken.setTimeLimited.sendTransaction(newTimeLimited, {from: web3.eth.accounts[0]});
    }

}



