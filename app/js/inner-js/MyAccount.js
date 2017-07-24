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