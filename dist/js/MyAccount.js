/*declaration of global variables*/
var identity;
var shared_key;
var AccountName, AllSocialAccounts, AllSharedAccounts, AllContacts;
var SocialAccountslength, SharedAccountslength, Contactslength;
var Apps, Usernames, SharedApps, SharedUsernames, fromAddresses, timestamps, ContactAddresses, ContactNames;

var JSONAllSocialAccounts = [];
var JSONAllSharedAccounts = [];
var JSONAllContacts = [];
var ROWSocialAccount, ROWSharedAccount, ROWContact;
var AppAscii, UsernameAscii, SharedAppAscii, SharedUsernameAscii, ContactNameAscii;

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
    var newApp = String($("#AddSocialAccount input#newApp").val());
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
function getSharedAccountPw(targetApp, targetUsername) {
    Nettoken.getSharedAccountPw.sendTransaction(identity, targetApp, targetUsername, {
        from: web3.eth.accounts[0],
        gas: '500000'
    });
};

/*monitor the log for shared account password*/
eventSharedAccountPW.watch(function (error, result) {
    if (!error) {
        eventSharedAccountPWs = result.args.PW;
        var SharedAccountPWresult = web3.toAscii(eventSharedAccountPWs);
        alert("The account password is:" + SharedAccountPWresult);
    }
});
