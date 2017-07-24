pragma solidity ^0.4.0;


import "./UserAccount.sol";


contract TokenFunctions {
    //It records user "Identity" with related "address".
    mapping (bytes32 => address) private UserMappingList;

    mapping (address => bool) private isAddressUsed;

    event Log(string description);

    event LogAddress(address outputAddress);

    event SharedAccountPW(bytes32 PW);

    uint public timeLimited;//This is for SharedAccounts. When the difference between timestamp of target and current time is larger than this "timeLimited", it should be deleted from record.

    function TokenFunctions() payable {
        timeLimited = 100;
    }

    function setTimeLimited(uint newTimeLimited){
        timeLimited = newTimeLimited;
        Log("Successfully set timeLimited.");
    }
    //Hint:It temporarily used Name&PubKey to generate a user.
    //In the further implementation, input parameters should be "Identity" and "Name".
    //The pair of "private key" and "public key" are generated from "Identity".
    //"Name"and"public key" are parameters to new a contract to express a user,constructor may return the related "address"..
    //"private key"&"public key"&"address" are then recorded on physical Token, and "Identity" and "address" are kept in UserMappingList for usage of checking.
    function newUserAccount(bytes32 Identity, bytes32 Name, bytes32 PubKey){
        address target = UserMappingList[Identity];
        if (!isAddressUsed[target]) {
            UserAccount newAccount = new UserAccount(Name, PubKey);
            address newAddress = newAccount;
            UserMappingList[Identity] = newAddress;
            isAddressUsed[newAddress] = true;
            Log("Successfully added a UserAccount!");
            LogAddress(newAddress);}
        else {
            Log("Failed! Identity is occupied!");}
    }

    function LoginCheck(bytes32 Identity) constant returns (bool valid, address AccountAddress){
        address target = UserMappingList[Identity];
        if (isAddressUsed[target]) {
            valid = true;
            AccountAddress = target;}
    }

    //Functions to interact with attributes of UserAccount:MyName,MyPubKey
    function getMyName(bytes32 Identity) constant returns (bytes32 MyName) {
        MyName = UserAccount(UserMappingList[Identity]).MyName();
    }

    function getMyPubKey(bytes32 Identity) constant returns (bytes32 MyPubKey) {
        MyPubKey = UserAccount(UserMappingList[Identity]).MyPubKey();
    }

    function setMyName(bytes32 Identity, bytes32 newName){
        UserAccount(UserMappingList[Identity]).setName(newName);
        Log("Successfully modified MyName.");
    }

    function setMyPubKey(bytes32 Identity, bytes32 newPubKey){
        address target = UserMappingList[Identity];
        UserAccount targetAccount = UserAccount(target);
        targetAccount.setPublicKey(newPubKey);
        Log("Successfully modified My PublicKey.");
        uint ContactLength = targetAccount.getContactsLength();
        address ContactAddresses;
        UserAccount AccountI;
        for (uint i = 0; i < ContactLength; i++) {
            ContactAddresses = targetAccount.getContactAddressByIndex(i);
            if (isAddressUsed[ContactAddresses]) {
                AccountI = UserAccount(ContactAddresses);
                AccountI.AlterContactPubkey(target, newPubKey);}
        }
        Log("Successfully update the value of public key in contacts' lists.");
    }

    //Functions to interact with mappinglist of SocialAccount.
    function AddSocialAccount(bytes32 Identity, bytes32 newApp, bytes32 newUsername, bytes32 newPassword){
        address target = UserMappingList[Identity];
        UserAccount targetAccount = UserAccount(target);
        targetAccount.AddSocialAccount(newApp, newUsername, newPassword);
    }

    function AltSocialAccountPw(bytes32 Identity, bytes32 targetApp, bytes32 targetUsername, bytes32 newPassword) {
        address target = UserMappingList[Identity];
        UserAccount targetAccount = UserAccount(target);
        targetAccount.AltSocialAccountPw(targetApp, targetUsername, newPassword);
    }

    function DelSocialAccount(bytes32 Identity, bytes32 delApp, bytes32 delUsername){
        address target = UserMappingList[Identity];
        UserAccount targetAccount = UserAccount(target);
        targetAccount.DelSocialAccount(delApp, delUsername);
    }

    function getSocialAccountPw(bytes32 Identity, bytes32 targetApp, bytes32 targetUsername) constant returns (bytes32 Password, bool Successful){
        address target = UserMappingList[Identity];
        UserAccount targetAccount = UserAccount(target);
        (Password, Successful) = targetAccount.getSocialAccountPw(targetApp, targetUsername);}//If it is false, it means that there is no such record to get.

    function getAllSocialAccounts(bytes32 Identity) constant returns (bytes32[] Apps, bytes32[] Usernames){
        address target = UserMappingList[Identity];
        UserAccount targetAccount = UserAccount(target);
        uint length = targetAccount.getSocialAccountsLength();
        Apps = new bytes32[](length);
        Usernames = new bytes32[](length);
        for (uint i = 0; i < length; i++) {
            (Apps[i], Usernames[i]) = targetAccount.getSocialAccountByIndex(i);}
    }

    //Functions to interact with mappinglist of Contact.
    function AddContact(bytes32 Identity, address newCAddress){
        address target = UserMappingList[Identity];
        if (isAddressUsed[newCAddress]) {
            UserAccount AccountOne = UserAccount(target);
            UserAccount AccountTwo = UserAccount(newCAddress);
            bytes32 AccountOneName = AccountOne.MyName();
            bytes32 AccountOnePubKey = AccountOne.MyPubKey();
            bytes32 AccountTwoName = AccountTwo.MyName();
            bytes32 AccountTwoPubkey = AccountTwo.MyPubKey();
            AccountOne.AddContact(newCAddress, AccountTwoName, AccountTwoPubkey);
            AccountTwo.AddContact(target, AccountOneName, AccountOnePubKey);}
        else {
            Log("Failed! Address of contact is incorrect!");}
    }

    function AlterContactName(bytes32 Identity, address targetAddress, bytes32 altCName) {
        address target = UserMappingList[Identity];
        UserAccount targetAccount = UserAccount(target);
        targetAccount.AlterContactName(targetAddress, altCName);
    }


    function deleteContact(bytes32 Identity, address targetAddress){
        address target = UserMappingList[Identity];
        if (isAddressUsed[targetAddress]) {
            UserAccount AccountOne = UserAccount(target);
            UserAccount AccountTwo = UserAccount(targetAddress);
            AccountOne.deleteContact(targetAddress);
            AccountTwo.deleteContact(target);}
        else {
            Log("Failed! Address of contact is incorrect!");}
    }

    function getTargetContactPubKey(bytes32 Identity, address targetAddress) constant returns (bytes32 resPubKey, bool isFound){
        address target = UserMappingList[Identity];
        UserAccount targetAccount = UserAccount(target);
        (resPubKey, isFound) = targetAccount.getTargetContactPubKey(targetAddress);
        //If it is false, it means that there is no such record to get.
    }

    function getAllContact(bytes32 Identity) constant returns (address[] resAddress, bytes32[] resName){
        address target = UserMappingList[Identity];
        UserAccount targetAccount = UserAccount(target);
        uint length = targetAccount.getContactsLength();
        resAddress =new address[](length);
        resName = new bytes32[](length);
        for (uint i = 0; i < length; i++) {
            (resAddress[i], resName[i]) = targetAccount.getContactByIndex(i);}
    }


    //Functions to interact with mappinglist of Shared SocialAccount.
    //Hint:this function is for sender, not receiver(user).
    function AddSharedAccount(bytes32 Identity, address receiverAddress, bytes32 targetApp, bytes32 targetUsername) {
        address sender = UserMappingList[Identity];
        UserAccount senderAccount = UserAccount(UserMappingList[Identity]);
        bytes32 targetPassword;
        bool isFound;
        (targetPassword, isFound) = senderAccount.getSocialAccountPw(targetApp, targetUsername);
        if (!isFound) {
            Log("Failed! There is no such record with app and username to share.");}
        else {
            if (isAddressUsed[receiverAddress]) {
                UserAccount receiverAccount = UserAccount(receiverAddress);
                receiverAccount.AddSharedAccount(targetApp, targetUsername, targetPassword, sender);
                Log("Successfully added a record for receiver as a shared account.");}
            else {
                Log("Failed! There is no such account with receiverAddress.");}
        }
    }

    function getSharedAccountPw(bytes32 Identity, bytes32 targetApp, bytes32 targetUsername){
        address target = UserMappingList[Identity];
        UserAccount targetAccount = UserAccount(target);
        targetAccount.deleteSharedAccount(targetApp, targetUsername, timeLimited);
        bytes32 Password;
        bool isFound;
        (Password, isFound) = targetAccount.getSharedAccountPw(targetApp, targetUsername);
        if (isFound) {
            SharedAccountPW(Password);
            Log("Successfully get the shared account password.");}
        else {
            Log("Failed! There is no such account.");}
    }

    function getAllSharedAccounts(bytes32 Identity) constant returns (bytes32[] SharedApps, bytes32[] SharedUsernames, address[] SenderAddresses, uint[] times){
        address target = UserMappingList[Identity];
        UserAccount targetAccount = UserAccount(target);
        uint length = targetAccount.getSharedAccountsLength();
        SharedApps = new bytes32[](length);
        SharedUsernames = new bytes32[](length);
        SenderAddresses =new address[](length);
        times = new uint[](length);
        for (uint i = 0; i < length; i++) {
            (SharedApps[i], SharedUsernames[i], SenderAddresses[i], times[i]) = targetAccount.getSharedAccounByIndex(i);}
    }

}