pragma solidity ^0.4.0;


//An instantiation of UserAccount which stands for a user.
contract UserAccount {
    bytes32 public MyName;

    bytes32 public MyPubKey;

    SocialAccount[] private SocialAccounts;//This is a dynamic arraylist of struct SocialAccount.
    mapping (bytes32 => mapping (bytes32 => Index)) private SocialAccountIndex;

    Contact[] private Contacts;//This is a dynamic arraylist of struct Contact.
    mapping (address => Index) private ContactIndex;

    SharedAccount[] private SharedAccounts;//This is a dynamic arraylist of struct SharedAccount.
    mapping (bytes32 => mapping (bytes32 => Index)) private SharedAccountIndex;

    struct Index {
    uint index;
    bool initialized;
    }

    struct Contact {
    address ConAddress;
    bytes32 ConName;
    bytes32 ConPubKey;
    }

    struct SocialAccount {
    bytes32 App;
    bytes32 Username;
    bytes32 Password;
    }

    struct SharedAccount {
    bytes32 SharedApp;
    bytes32 SharedUsername;
    bytes32 SharedPassword;
    address SenderAddress;
    uint time;//time is for time limitation
    }


    //constructor
    function UserAccount(bytes32 Name, bytes32 PubKey){
        MyName = Name;
        MyPubKey = PubKey;
    }

    function setName(bytes32 newName){
        MyName = newName;
    }

    function setPublicKey(bytes32 newPubKey) {
        MyPubKey = newPubKey;
    }

    //Functions about SocialAccount.
    function AddSocialAccount(bytes32 newApp, bytes32 newUsername, bytes32 newPassword) returns (bool Successful){
        if (!SocialAccountIndex[newApp][newUsername].initialized) {//There is no existing record. This function will add a new record.
            SocialAccounts.push(SocialAccount(newApp, newUsername, newPassword));
            SocialAccountIndex[newApp][newUsername].index = SocialAccounts.length - 1;
            SocialAccountIndex[newApp][newUsername].initialized = true;
            Successful = true;}
        else {//There existing a record.
            Successful = false;}
    }

    function AltSocialAccountPw(bytes32 targetApp, bytes32 targetUsername, bytes32 newPassword) returns (bool Successful){
        if (!SocialAccountIndex[targetApp][targetUsername].initialized) {//There is no existing record.
            Successful = false;}
        else {//There existing target record.
            SocialAccounts[SocialAccountIndex[targetApp][targetUsername].index].Password = newPassword;
            Successful = true;}
    }

    function DelSocialAccount(bytes32 delApp, bytes32 delUsername) returns (bool isFound){
        if (SocialAccountIndex[delApp][delUsername].initialized) {//There existing a record.
            uint targetIndex = SocialAccountIndex[delApp][delUsername].index;
            delete SocialAccounts[targetIndex];
            delete SocialAccountIndex[delApp][delUsername];
            SocialAccounts[targetIndex] = SocialAccounts[SocialAccounts.length - 1];
            bytes32 lastApp = SocialAccounts[SocialAccounts.length - 1].App;
            bytes32 lastUsername = SocialAccounts[SocialAccounts.length - 1].Username;
            SocialAccountIndex[lastApp][lastUsername].index = targetIndex;
            delete SocialAccounts[SocialAccounts.length - 1];
            SocialAccounts.length--;
            isFound = true;}
        else {//There is no such record.
            isFound = false;}
    }

    function getSocialAccountPw(bytes32 targetApp, bytes32 targetUsername) constant returns (bytes32 Password, bool isFound){
        if (SocialAccountIndex[targetApp][targetUsername].initialized) {//There existing a record.
            Password = SocialAccounts[SocialAccountIndex[targetApp][targetUsername].index].Password;
            isFound = true;}
        else {//There is no such record.
            isFound = false;}
    }

    function getSocialAccountByIndex(uint index) constant returns (bytes32 App, bytes32 Username){
        App = SocialAccounts[index].App;
        Username = SocialAccounts[index].Username;
    }

    function getSocialAccountsLength() constant returns (uint length){
        length = SocialAccounts.length;
    }



    //Functions about Contacts.
    function AddContact(address newCAddress, bytes32 newCName, bytes32 newCPubkey) returns (bool Successful){
        if (!ContactIndex[newCAddress].initialized) {//There is no existing record. This function will add a new record.
            Contacts.push(Contact(newCAddress, newCName, newCPubkey));
            ContactIndex[newCAddress].index = Contacts.length - 1;
            ContactIndex[newCAddress].initialized = true;
            Successful = true;}
        else {
            Successful = false;}
    }

    function AlterContactName(address targetAddress, bytes32 altCName) returns (bool Successful){
        if (!ContactIndex[targetAddress].initialized) {//There is no existing record.
            Successful = false;}
        else {//There existing target record.
            Contacts[ContactIndex[targetAddress].index].ConName = altCName;
            Successful = true;}
    }

    function AlterContactPubkey(address targetAddress, bytes32 altCPubkey) returns (bool Successful){
        if (!ContactIndex[targetAddress].initialized) {//There is no existing record.
            Successful = false;}
        else {//There existing target record.
            Contacts[ContactIndex[targetAddress].index].ConPubKey = altCPubkey;
            Successful = true;}
    }

    function deleteContact(address targetAddress) returns (bool Successful){
        if (!ContactIndex[targetAddress].initialized) {//There is no existing record.
            Successful = false;}
        else {//There existing target record.
            uint targetIndex = ContactIndex[targetAddress].index;
            delete Contacts[targetIndex];
            delete ContactIndex[targetAddress];
            Contacts[targetIndex] = Contacts[Contacts.length - 1];
            address lastAddress = Contacts[Contacts.length - 1].ConAddress;
            ContactIndex[lastAddress].index = targetIndex;
            delete Contacts[Contacts.length - 1];
            Contacts.length--;
            Successful = true;}
    }

    function getTargetContactPubKey(address targetAddress) constant returns (bytes32 resPubKey, bool isFound){
        if (!ContactIndex[targetAddress].initialized) {//There is no existing record.
            isFound = false;}
        else {//There existing target record.
            uint targetIndex = ContactIndex[targetAddress].index;
            resPubKey = Contacts[targetIndex].ConPubKey;
            isFound = true;}
    }

    function getContactByIndex(uint index) constant returns (address resAddress, bytes32 resName){
        resAddress = Contacts[index].ConAddress;
        resName = Contacts[index].ConName;
    }

    function getContactAddressByIndex(uint index) constant returns (address resAddress){
        resAddress = Contacts[index].ConAddress;
    }

    function getContactsLength() constant returns (uint length){
        length = Contacts.length;
    }



    //Functions about SharedAccounts.

    function AddSharedAccount(bytes32 newApp, bytes32 newUsername, bytes32 newPassword, address SenderAddress) {
        if (SharedAccountIndex[newApp][newUsername].initialized) {//There existing a record. This function will update password as well as time.
            if (!(newPassword == SharedAccounts[SharedAccountIndex[newApp][newUsername].index].SharedPassword)) {
                SharedAccounts[SharedAccountIndex[newApp][newUsername].index].SharedPassword = newPassword;}
            SharedAccounts[SharedAccountIndex[newApp][newUsername].index].time = now;
        }
        else {
            SharedAccounts.push(SharedAccount(newApp, newUsername, newPassword, SenderAddress, now));
            SharedAccountIndex[newApp][newUsername].initialized = true;
            SharedAccountIndex[newApp][newUsername].index = SharedAccounts.length - 1;
        }
    }


    function deleteSharedAccount(bytes32 delApp, bytes32 delUsername, uint timeLimited) returns (bool){//only when it is true, it is allowed to continue.
        if (SharedAccountIndex[delApp][delUsername].initialized) {//There existing a record.
            uint targetIndex = SharedAccountIndex[delApp][delUsername].index;
            uint targetTime = SharedAccounts[targetIndex].time;
            uint currentTime = now;
            if ((currentTime - targetTime) >= timeLimited) {//This record is not valid according to the timestamp.
                delete SharedAccounts[targetIndex];
                delete SharedAccountIndex[delApp][delUsername];
                SharedAccounts[targetIndex] = SharedAccounts[SharedAccounts.length - 1];
                bytes32 lastApp = SharedAccounts[SharedAccounts.length - 1].SharedApp;
                bytes32 lastUsername = SharedAccounts[SharedAccounts.length - 1].SharedUsername;
                SharedAccountIndex[lastApp][lastUsername].index = targetIndex;
                delete SharedAccounts[SharedAccounts.length - 1];
                SharedAccounts.length--;}
            else {//else, this record is still valid, and there is no need to delete. It is allowed to continue.
                return true;}
        }
    }


    function getSharedAccountPw(bytes32 targetApp, bytes32 targetUsername) constant returns (bytes32 Password){
        Password = SharedAccounts[SharedAccountIndex[targetApp][targetUsername].index].SharedPassword;
    }

    function getSharedAccounByIndex(uint index) constant returns (bytes32 SharedApp, bytes32 SharedUsername, address SenderAddress, uint time){
        SharedApp = SharedAccounts[index].SharedApp;
        SharedUsername = SharedAccounts[index].SharedUsername;
        SenderAddress = SharedAccounts[index].SenderAddress;
        time = SharedAccounts[index].time;
    }

    function getSharedAccountsLength() constant returns (uint length){
        length = SharedAccounts.length;
    }

}