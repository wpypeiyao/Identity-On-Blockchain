/*declaration of global variables*/
var identity;
var shared_key;
var AccountName, AllSocialAccounts, AllSharedAccounts, AllContacts;
var SocialAccountslength, SharedAccountslength, Contactslength;
var Apps, Usernames, SharedApps, SharedUsernames, fromAddresses, timestamps_year, timestamps_times, ContactAddresses, ContactNames;

var JSONAllSocialAccounts = [];
var JSONAllSharedAccounts = [];
var JSONAllContacts = [];
var ROWSocialAccount, ROWSharedAccount, ROWContact;
var AppAscii, UsernameAscii, SharedAppAscii, SharedUsernameAscii, ContactNameAscii;
var senderPubKeyResult, senderPubKey, sender_pubkey_recover;

/*Vue Objects that process data*/
var VueName = new Vue({
    el: '#Nickname',
    data: {
        MyName: ''
    }
});
var VueSocialAccount = new Vue({
    el: '#SocialAccountOutput',
    data: {
        JSONAllSocialAccounts: [],
        JSONAllContacts: []
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

/*get the data from token card(here json file)*/
var dataroot = "data/user-data.json";
var user_data;
var priv;

/*initialization of page*/
$.getJSON(dataroot, function (data) {
    user_data = data.MainUser;
    priv = user_data.private;
    identity = (location.search).substring(4);
    identity = aes_decrypt(priv, identity);

    /*to interact with contract and store data locally*/
    AccountName = web3.toAscii(Nettoken.getMyName.call(identity));
    AllSocialAccounts = Nettoken.getAllSocialAccounts.call(identity);
    AllSharedAccounts = Nettoken.getAllSharedAccounts.call(identity);
    AllContacts = Nettoken.getAllContact.call(identity);

    Nettoken.getManagerPubkey.call(function (error, result) {
        if (!error) {
            /*calculate shared key*/
            var manager_pub_x1 = result[0];
            var manager_pub_x2 = result[1];
            var manager_pub_y1 = result[2];
            var manager_pub_y2 = result[3];
            manager_pub_x1 = web3.toAscii(manager_pub_x1);
            manager_pub_x2 = web3.toAscii(manager_pub_x2);
            manager_pub_y1 = web3.toAscii(manager_pub_y1);
            manager_pub_y2 = web3.toAscii(manager_pub_y2);
            var manager_pubkey_recover = recoverPubkey(manager_pub_x1, manager_pub_x2, manager_pub_y1, manager_pub_y2);
            shared_key = getShared_key(priv, manager_pubkey_recover);

            /*data processing:social accounts*/
            Apps = AllSocialAccounts[0];
            Usernames = AllSocialAccounts[1];
            SocialAccountslength = Apps.length;

            for (var i = 0; i < SocialAccountslength; i++) {
                AppAscii = web3.toAscii(Apps[i]);
                UsernameAscii = web3.toAscii(Usernames[i]);
                UsernameAscii = aes_decrypt(shared_key, UsernameAscii);
                UsernameAscii = unpadding(UsernameAscii);
                ROWSocialAccount = {};
                ROWSocialAccount.App = AppAscii;
                ROWSocialAccount.username = UsernameAscii;
                ROWSocialAccount.inputID = "NewPW" + i;
                ROWSocialAccount.inputShareID = "SharedAddress" + i;
                JSONAllSocialAccounts.push(ROWSocialAccount);
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


            /*data processing:shared accounts*/
            SharedApps = AllSharedAccounts[0];
            SharedUsernames = AllSharedAccounts[1];
            fromAddresses = AllSharedAccounts[2];
            timestamps_year = AllSharedAccounts[3];
            timestamps_times = AllSharedAccounts[4];

            SharedAccountslength = SharedApps.length;

            for (var j = 0; j < SharedAccountslength; j++) {
                SharedAppAscii = web3.toAscii(SharedApps[j]);
                SharedUsernameAscii = web3.toAscii(SharedUsernames[j]);
                ROWSharedAccount = {};
                ROWSharedAccount.SharedApp = SharedAppAscii;
                ROWSharedAccount.fromAddress = fromAddresses[j];
                ROWSharedAccount.fromName = "not current contact";

                /*show sender name*/
                for (var y in JSONAllContacts) {
                    if (fromAddresses[j] == JSONAllContacts[y].ContactAddress)
                        ROWSharedAccount.fromName = JSONAllContacts[y].ContactName;
                }

                /*get sender public key and calculate shared key*/
                senderPubKeyResult;
                senderPubKeyResult = Nettoken.getTargetContactPubKey.call(identity, fromAddresses[j]);
                if (senderPubKeyResult[4] == true) {
                    senderPubKey = {};
                    senderPubKey.x1 = web3.toAscii(senderPubKeyResult[0]);
                    senderPubKey.x2 = web3.toAscii(senderPubKeyResult[1]);
                    senderPubKey.y1 = web3.toAscii(senderPubKeyResult[2]);
                    senderPubKey.y2 = web3.toAscii(senderPubKeyResult[3]);
                    sender_pubkey_recover = recoverPubkey(senderPubKey.x1, senderPubKey.x2, senderPubKey.y1, senderPubKey.y2);
                    ROWSharedAccount.SharedKey = getShared_key(priv, sender_pubkey_recover);

                    /*decrypt*/
                    SharedUsernameAscii = aes_decrypt(ROWSharedAccount.SharedKey, SharedUsernameAscii);
                    SharedUsernameAscii = unpadding(SharedUsernameAscii);
                    ROWSharedAccount.SharedUsername = SharedUsernameAscii;
                }
                else
                    console.log("The contact information has been deleted. Failed to decrypt.");

                /*convert timestamp to readable type*/
                ROWSharedAccount.timestamp = getReadableTime(timestamps_year[j], timestamps_times[j]);
                JSONAllSharedAccounts.push(ROWSharedAccount);
            }


            /*show data on page*/
            VueName.MyName = AccountName;
            VueSocialAccount.JSONAllSocialAccounts = JSONAllSocialAccounts;
            VueSocialAccount.JSONAllContacts = JSONAllContacts;
            VueSharedAccount.JSONAllSharedAccounts = JSONAllSharedAccounts;
            VueContact.JSONAllContacts = JSONAllContacts;

            /*monitor useraccount*/
            var ThisAccount = UserAccountContract.at(user_data.address);
            var ThisAccounteventLog = ThisAccount.Log();
            var ThisAccounteventLogs;
            ThisAccounteventLog.watch(function (error, result) {
                if (!error) {
                    ThisAccounteventLogs = result.args.description;
                    console.log(ThisAccounteventLogs);
                    alert(ThisAccounteventLogs);
                }
            });
        }
        else
            console.error(error);
    });
});

/*Button: setMyName*/
function setMyName() {
    var newMyName = String($("#Nickname input#setMyName").val());
    Nettoken.setMyName.sendTransaction(identity, newMyName, {from: web3.eth.accounts[0]}, function (error, result) {
        if (!error) {
            AccountName = web3.toAscii(Nettoken.getMyName.call(identity));
            VueName.MyName = AccountName;
        }
    });
};

/*Functions:SocialAccount*/
/*Button: AddSocialAccount*/
function AddSocialAccount() {
    var sel_app = document.getElementById("newApp");
    var app_index = sel_app.selectedIndex;
    var newApp = sel_app.options[app_index].value;
    var newUsername = String($("#AddSocialAccount input#newUsername").val());
    var newPassword = String($("#AddSocialAccount input#newPassword").val());
    newUsername = padding_16bytes(newUsername);
    newPassword = padding_16bytes(newPassword);
    newUsername = aes_encrypt(shared_key, newUsername);
    newPassword = aes_encrypt(shared_key, newPassword);
    Nettoken.AddSocialAccount.sendTransaction(identity, newApp, newUsername, newPassword, {
        from: web3.eth.accounts[0],
        gas: '400000'
    });
};

/*Item Button: DelSocialAccount*/
function DelSocialAccount(delApp, delUsername) {
    delUsername = padding_16bytes(delUsername);
    delUsername = aes_encrypt(shared_key, delUsername);
    Nettoken.DelSocialAccount.sendTransaction(identity, delApp, delUsername, {
        from: web3.eth.accounts[0],
        gas: '200000'
    });
};

/*Item Button: getSocialAccountPW*/
function getSocialAccountPW(targetApp, targetUsername) {
    targetUsername = padding_16bytes(targetUsername);
    targetUsername = aes_encrypt(shared_key, targetUsername);
    var getSocialAccountPWResult;
    getSocialAccountPWResult = Nettoken.getSocialAccountPw.call(identity, targetApp, targetUsername);
    if (getSocialAccountPWResult[1] == true) {
        var result = web3.toAscii(getSocialAccountPWResult[0]);
        result = aes_decrypt(shared_key, result);
        result = unpadding(result);
        console.log("Your password is:" + result);
        alert("Your password is:" + result);
    }
    else
        console.log("The record has been deleted. Failed to get the password.");
};

/*Item Button: AltSocialAccountPw*/
function AltSocialAccountPw(targetApp, targetUsername, Index) {
    var inputID = String("#SocialAccountOutput input#" + Index);
    var NewSocialAccountPW = String($(inputID).val());
    NewSocialAccountPW = padding_16bytes(NewSocialAccountPW);
    NewSocialAccountPW = aes_encrypt(shared_key, NewSocialAccountPW);
    targetUsername = padding_16bytes(targetUsername);
    targetUsername = aes_encrypt(shared_key, targetUsername);
    Nettoken.AltSocialAccountPw.sendTransaction(identity, targetApp, targetUsername, NewSocialAccountPW, {
        from: web3.eth.accounts[0],
        gas: '55000'
    });
}

/*Item Button: recordToShare*/
function ShareAccount(targetApp, targetUsername, id) {
    /*get address from select*/
    var sel_obj = document.getElementById(id);
    var sel_index = sel_obj.selectedIndex;
    var ShareAccountAddress;
    ShareAccountAddress = sel_obj.options[sel_index].value;
    var CheckAddressFormat = web3.isAddress(ShareAccountAddress);
    if (CheckAddressFormat == true) {
        /*get password of the account to share*/
        var Username = padding_16bytes(targetUsername);
        Username = aes_encrypt(shared_key, Username);
        var getSocialAccountPWResult;
        getSocialAccountPWResult = Nettoken.getSocialAccountPw.call(identity, targetApp, Username);
        if (getSocialAccountPWResult[1] == true) {
            /*share*/
            var targetPassword = web3.toAscii(getSocialAccountPWResult[0]);
            targetPassword = aes_decrypt(shared_key, targetPassword);

            /*get target public key and calculate shared key*/
            var TargetPubKeyResult;
            TargetPubKeyResult = Nettoken.getTargetContactPubKey.call(identity, ShareAccountAddress);
            if (TargetPubKeyResult[4] == true) {
                var ContactPubKey = {};
                ContactPubKey.x1 = web3.toAscii(TargetPubKeyResult[0]);
                ContactPubKey.x2 = web3.toAscii(TargetPubKeyResult[1]);
                ContactPubKey.y1 = web3.toAscii(TargetPubKeyResult[2]);
                ContactPubKey.y2 = web3.toAscii(TargetPubKeyResult[3]);
                var target_pubkey_recover = recoverPubkey(ContactPubKey.x1, ContactPubKey.x2, ContactPubKey.y1, ContactPubKey.y2);
                var target_shared_key = getShared_key(priv, target_pubkey_recover);

                /*encrypt*/
                targetUsername = padding_16bytes(targetUsername);
                targetUsername = aes_encrypt(target_shared_key, targetUsername);
                targetPassword = aes_encrypt(target_shared_key, targetPassword);

                /*share*/
                Nettoken.AddSharedAccount.sendTransaction(identity, ShareAccountAddress, targetApp, targetUsername, targetPassword, {
                    from: web3.eth.accounts[0],
                    gas: '450000'
                });
            }
            else
                console.log("The record has been deleted. Failed to get the public key.");
        }
        else
            console.log("The record has been deleted. Failed to share.");
    }
    else
        console.log("Address format is incorrect!");
}

/*Functions:Contact*/
/*Button: AddContact*/
function AddContact() {
    var newContactAddress = String($("#Contacts input#newContactAddress").val());
    var CheckAddressFormat = web3.isAddress(newContactAddress);
    if (CheckAddressFormat == true) {
        Nettoken.AddContact.sendTransaction(identity, newContactAddress, {
            from: web3.eth.accounts[0],
            gas: '550000'
        });
    }
    else
        console.log("Address format is incorrect!");
};

/*Item Button: getTargetContactPubKey*/
function getTargetContactPubKey(targetAddress) {
    var getTargetContactPubKeyResult;
    getTargetContactPubKeyResult = Nettoken.getTargetContactPubKey.call(identity, targetAddress);
    if (getTargetContactPubKeyResult[4] == true) {
        var ContactPubKey = {};
        ContactPubKey.x1 = web3.toAscii(getTargetContactPubKeyResult[0]);
        ContactPubKey.x2 = web3.toAscii(getTargetContactPubKeyResult[1]);
        ContactPubKey.y1 = web3.toAscii(getTargetContactPubKeyResult[2]);
        ContactPubKey.y2 = web3.toAscii(getTargetContactPubKeyResult[3]);

        ContactPubKey = JSON.stringify(ContactPubKey);
        console.log("The public key of your contact is:" + ContactPubKey);
        alert("The public key of your contact is:" + ContactPubKey);
    }
    else
        console.log("The record has been deleted. Failed to get the public key.");
}

/*Item Button: deleteContact*/
function deleteContact(targetAddress) {
    Nettoken.deleteContact.sendTransaction(identity, targetAddress, {
        from: web3.eth.accounts[0],
        gas: '350000'
    });
}

/*Item Button: AlterContactName*/
function AlterContactName(targetAddress, Index) {
    var inputID = String("#ContactOutput input#" + Index);
    var NewContactName = String($(inputID).val());
    NewContactName = web3.toHex(NewContactName);
    Nettoken.AlterContactName.sendTransaction(identity, targetAddress, NewContactName, {
        from: web3.eth.accounts[0],
        gas: '53000'
    });
}

/*Functions:SharedAccount*/
/*Button: getSharedAccountPw*/
function getSharedAccountPw(targetApp, targetUsername, shared_key) {
    targetUsername = padding_16bytes(targetUsername);
    targetUsername = aes_encrypt(shared_key, targetUsername);
    Nettoken.deleteSharedAccount.sendTransaction(identity, targetApp, targetUsername, {
        from: web3.eth.accounts[0],
        gas: '500000'
    }, function (error, result) {
        if (!error) {
            var getSharedAccountPWResult;
            getSharedAccountPWResult = Nettoken.getSharedAccountPw.call(identity, targetApp, targetUsername);
            if (getSharedAccountPWResult[1] == true) {
                var result = web3.toAscii(getSharedAccountPWResult[0]);
                result = aes_decrypt(shared_key, result);
                result = unpadding(result);
                console.log("The shared password is:" + result);
                alert("The shared password is:" + result);
            }
            else
                console.log("The record has been deleted. Failed to get the password.");
        }
        else
            console.error(error);
    });
};

/*Button: link to social media and autofill*/
function goSocial(app, username) {
    /*get password*/
    var targetUsername = padding_16bytes(username);
    targetUsername = aes_encrypt(shared_key, targetUsername);
    var getSocialAccountPWResult;
    getSocialAccountPWResult = Nettoken.getSocialAccountPw.call(identity, app, targetUsername);
    if (getSocialAccountPWResult[1] == true) {
        var targetPassword = web3.toAscii(getSocialAccountPWResult[0]);
        targetPassword = aes_decrypt(shared_key, targetPassword);
        targetPassword = unpadding(targetPassword);
    }
    else
        console.log("The record has been deleted. Failed to get the password.");

    /*build data structure*/
    var result = {};
    result.username = username;
    result.password = targetPassword;
    result = JSON.stringify(result);
    /* console.log("Social account information:"+result);*/

    /*open social media website*/
    var Facebook = new RegExp("Facebook");
    var Twitter = new RegExp("Twitter");
    var domain;
    if (Facebook.test(app)) {
        domain = "https://www.facebook.com/";
        var facebook_window = window.open(domain);
        setTimeout(function () {
            facebook_window.postMessage(result, domain)
        }, 2000);
    }
    if (Twitter.test(app)) {
        domain = "https://twitter.com/login";
        var twitter_window = window.open(domain);
        setTimeout(function () {
            twitter_window.postMessage(result, domain)
        }, 2000);
    }
}

/*Button: link to shared account of social media and autofill*/
function goShared(app, username, shared_key) {
    /*get password*/
    var targetUsername = padding_16bytes(username);
    targetUsername = aes_encrypt(shared_key, targetUsername);
    Nettoken.deleteSharedAccount.sendTransaction(identity, app, targetUsername, {
        from: web3.eth.accounts[0],
        gas: '500000'
    }, function (error, result) {
        if (!error) {
            /*wait for checking*/
            setTimeout(function () {
                var getSharedAccountPWResult;
                getSharedAccountPWResult = Nettoken.getSharedAccountPw.call(identity, app, targetUsername);
                if (getSharedAccountPWResult[1] == true) {
                    var target_password = web3.toAscii(getSharedAccountPWResult[0]);
                    target_password = aes_decrypt(shared_key, target_password);
                    target_password = unpadding(target_password);
                    console.log("The shared password is:" + target_password);

                    /*build data structure*/
                    var result = {};
                    result.username = username;
                    result.password = target_password;
                    result = JSON.stringify(result);
                    console.log("Shared account information:" + result);

                    /*open social media website*/
                    var Facebook = new RegExp("Facebook");
                    var Twitter = new RegExp("Twitter");
                    var domain;
                    if (Facebook.test(app)) {
                        domain = "https://www.facebook.com/";
                        var facebook_window = window.open(domain);
                        setTimeout(function () {
                            facebook_window.postMessage(result, domain)
                        }, 2000);
                    }
                    if (Twitter.test(app)) {
                        domain = "https://twitter.com/login";
                        var twitter_window = window.open(domain);
                        setTimeout(function () {
                            twitter_window.postMessage(result, domain)
                        }, 2000);
                    }
                }
                else
                    console.log("The record has been deleted. Failed to get the password.");
            }, 3000);
        }
        else
            console.error(error);
    });

}

