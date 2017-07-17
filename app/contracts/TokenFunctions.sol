pragma solidity ^0.4.0;


import "./UserAccount.sol";


contract TokenFunctions {
    //It records user "Identity" with related "address".
    mapping (bytes32 => address) private UserMappingList;

    mapping (address => bool) private isAddressUsed;


    uint public timeLimited = 100;//This is for SharedAccounts. When the difference between timestamp of target and current time is larger than this "timeLimited", it should be deleted from record.


    function setTimeLimited(uint newTimeLimited){
        timeLimited = newTimeLimited;
    }
    //Hint:It temporarily used Name&PubKey to generate a user.
    //In the further implementation, input parameters should be "Identity" and "Name".
    //The pair of "private key" and "public key" are generated from "Identity".
    //"Name"and"public key" are parameters to new a contract to express a user,constructor may return the related "address"..
    //"private key"&"public key"&"address" are then recorded on physical Token, and "Identity" and "address" are kept in UserMappingList for usage of checking.
    function newUserAccount(bytes32 Identity, bytes32 Name, bytes32 PubKey) returns (address newAddress){
        newAddress = new UserAccount(Name, PubKey);
        UserMappingList[Identity] = newAddress;
        isAddressUsed[newAddress] = true;
    }

    //Functions to interact with attributes of UserAccount:MyName,MyPubKey
    function getMyName(bytes32 Identity) constant returns (bytes32 MyName, bool isFound) {
        address target = UserMappingList[Identity];
        if (isAddressUsed[target]) {
            UserAccount targetAccount = UserAccount(target);
            MyName = targetAccount.MyName();
            isFound = true;}
        //If it is false, it means that Identity is incorrect.
    }

    function getMyPubKey(bytes32 Identity) constant returns (bytes32 MyPubKey, bool isFound) {
        address target = UserMappingList[Identity];
        if (isAddressUsed[target]) {
            UserAccount targetAccount = UserAccount(target);
            MyPubKey = targetAccount.MyPubKey();
            isFound = true;}
        //If it is false, it means that Identity is incorrect.
    }

    function setMyName(bytes32 Identity, bytes32 newName) returns (bool Successful){
        address target = UserMappingList[Identity];
        if (isAddressUsed[target]) {
            UserAccount targetAccount = UserAccount(target);
            targetAccount.setName(newName);
            Successful = true;}
        //If it is false, it means that Identity is incorrect.
    }

    function setMyPubKey(bytes32 Identity, bytes32 newPubKey) returns (bool Successful){
        address target = UserMappingList[Identity];
        if (isAddressUsed[target]) {
            UserAccount targetAccount = UserAccount(target);
            targetAccount.setPublicKey(newPubKey);
            uint ContactLength = targetAccount.getContactsLength();
            address ContactAddresses;
            UserAccount AccountI;
            for (uint i = 0; i < ContactLength; i++) {
                ContactAddresses = targetAccount.getContactAddressByIndex(i);
                if (isAddressUsed[ContactAddresses]) {
                    AccountI = UserAccount(ContactAddresses);
                    AccountI.AlterContactPubkey(target, newPubKey);}
            }
            Successful = true;}
        //If it is false, it means that Identity is incorrect.
    }



    //Functions to interact with mappinglist of SocialAccount.
    function AddSocialAccount(bytes32 Identity, bytes32 newApp, bytes32 newUsername, bytes32 newPassword) returns (bool Successful){
        address target = UserMappingList[Identity];
        if (isAddressUsed[target]) {
            UserAccount targetAccount = UserAccount(target);
            Successful = targetAccount.AddSocialAccount(newApp, newUsername, newPassword);}
        //If it is false, it means that Identity is incorrect, or there existing a record with such app and username.
    }

    function AltSocialAccountPw(bytes32 Identity, bytes32 targetApp, bytes32 targetUsername, bytes32 newPassword) returns (bool Successful){
        address target = UserMappingList[Identity];
        if (isAddressUsed[target]) {
            UserAccount targetAccount = UserAccount(target);
            Successful = targetAccount.AltSocialAccountPw(targetApp, targetUsername, newPassword);}
        //If it is false, it means that Identity is incorrect, or there is no such record to alter.
    }

    function DelSocialAccount(bytes32 Identity, bytes32 delApp, bytes32 delUsername) returns (bool Successful){
        address target = UserMappingList[Identity];
        if (isAddressUsed[target]) {
            UserAccount targetAccount = UserAccount(target);
            Successful = targetAccount.DelSocialAccount(delApp, delUsername);}
        //If it is false, it means that Identity is incorrect, or there is no such record to delete.
    }

    function getSocialAccountPw(bytes32 Identity, bytes32 targetApp, bytes32 targetUsername) constant returns (bytes32 Password, bool Successful){
        address target = UserMappingList[Identity];
        if (isAddressUsed[target]) {
            UserAccount targetAccount = UserAccount(target);
            (Password, Successful) = targetAccount.getSocialAccountPw(targetApp, targetUsername);}
        //If it is false, it means that Identity is incorrect, or there is no such record to get.
    }

    function getAllSocialAccounts(bytes32 Identity) constant returns (bytes32[] Apps, bytes32[] Usernames, bool Successful){
        address target = UserMappingList[Identity];
        if (isAddressUsed[target]) {
            UserAccount targetAccount = UserAccount(target);
            uint length = targetAccount.getSocialAccountsLength();
            Apps = new bytes32[](length);
            Usernames = new bytes32[](length);
            for (uint i = 0; i < length; i++) {
                (Apps[i], Usernames[i]) = targetAccount.getSocialAccountByIndex(i);}
            Successful = true;}
        //If it is false, it means that Identity is incorrect.
    }

    //Functions to interact with mappinglist of Contact.
    function AddContact(bytes32 Identity, address newCAddress) returns (bool Successful1, bool Successful2){
        address target = UserMappingList[Identity];
        if ((isAddressUsed[target]) && (isAddressUsed[newCAddress])) {
            UserAccount AccountOne = UserAccount(target);
            UserAccount AccountTwo = UserAccount(newCAddress);
            bytes32 AccountOneName = AccountOne.MyName();
            bytes32 AccountOnePubKey = AccountOne.MyPubKey();
            bytes32 AccountTwoName = AccountTwo.MyName();
            bytes32 AccountTwoPubkey = AccountTwo.MyPubKey();
            Successful1 = AccountOne.AddContact(newCAddress, AccountTwoName, AccountTwoPubkey);
            if (Successful1) {
                Successful2 = AccountTwo.AddContact(target, AccountOneName, AccountOnePubKey);
            }
        }
        //If it is false, it means that Identity/address is incorrect, or there existing a record.
    }

    function AlterContactName(bytes32 Identity, address targetAddress, bytes32 altCName) returns (bool Successful){
        address target = UserMappingList[Identity];
        if (isAddressUsed[target]) {
            UserAccount targetAccount = UserAccount(target);
            Successful = targetAccount.AlterContactName(targetAddress, altCName);}
        //If it is false, it means that Identity is incorrect, or there is no such record to alter.
    }


    function deleteContact(bytes32 Identity, address targetAddress) returns (bool Successful1, bool Successful2){
        address target = UserMappingList[Identity];
        if ((isAddressUsed[target]) && (isAddressUsed[targetAddress])) {
            UserAccount AccountOne = UserAccount(target);
            UserAccount AccountTwo = UserAccount(targetAddress);
            Successful1 = AccountOne.deleteContact(targetAddress);
            Successful2 = AccountTwo.deleteContact(target);
        }
        //If it is false, it means that Identity is incorrect, or there is no such record to delete.
    }

    function getTargetContactPubKey(bytes32 Identity, address targetAddress) constant returns (bytes32 resPubKey, bool isFound){
        address target = UserMappingList[Identity];
        if (isAddressUsed[target]) {
            UserAccount targetAccount = UserAccount(target);
            (resPubKey, isFound) = targetAccount.getTargetContactPubKey(targetAddress);}
        //If it is false, it means that Identity is incorrect, or there is no such record to get.
    }

    function getAllContact(bytes32 Identity) constant returns (address[] resAddress, bytes32[] resName, bool Successful){
        address target = UserMappingList[Identity];
        if (isAddressUsed[target]) {
            UserAccount targetAccount = UserAccount(target);
            uint length = targetAccount.getContactsLength();
            resAddress =new address[](length);
            resName = new bytes32[](length);
            for (uint i = 0; i < length; i++) {
                (resAddress[i], resName[i]) = targetAccount.getContactByIndex(i);}
            Successful = true;}
        //If it is false, it means that Identity is incorrect.
    }


    //Functions to interact with mappinglist of Shared SocialAccount.
    //Hint:this function is for sender, not receiver(user).
    function AddSharedAccount(bytes32 Identity, address receiverAddress, bytes32 targetApp, bytes32 targetUsername) returns (bool) {
        address sender = UserMappingList[Identity];
        if (isAddressUsed[sender]) {
            UserAccount senderAccount = UserAccount(sender);
            bytes32 targetPassword;
            bool isFound;
            (targetPassword, isFound) = senderAccount.getSocialAccountPw(targetApp, targetUsername);
            if (!isFound) {//If it is false, it means that there is no such record with app and username.
                return isFound;}
            else {
                if (isAddressUsed[receiverAddress]) {//If it is false, it means that there is no such account with receiverAddress.
                    UserAccount receiverAccount = UserAccount(receiverAddress);
                    receiverAccount.AddSharedAccount(targetApp, targetUsername, targetPassword, sender);
                    return true;}
            }
        }
        //If it is false, it means that Identity is incorrect.
    }

    function getSharedAccountPw(bytes32 Identity, bytes32 targetApp, bytes32 targetUsername) returns (bytes32 Password, bool Successful){
        address target = UserMappingList[Identity];
        if (isAddressUsed[target]) {
            UserAccount targetAccount = UserAccount(target);
            bool isContinue = targetAccount.deleteSharedAccount(targetApp, targetUsername, timeLimited);
            if (isContinue) {
                Password = targetAccount.getSharedAccountPw(targetApp, targetUsername);
                Successful = true;}
        }
        //If it is false, it means that Identity is incorrect, or there is no such record to get.
    }

    function getAllSharedAccounts(bytes32 Identity) constant returns (bytes32[] SharedApps, bytes32[] SharedUsernames, address[] SenderAddresses, uint[] times, bool Successful){
        address target = UserMappingList[Identity];
        if (isAddressUsed[target]) {
            UserAccount targetAccount = UserAccount(target);
            uint length = targetAccount.getSharedAccountsLength();
            SharedApps = new bytes32[](length);
            SharedUsernames = new bytes32[](length);
            SenderAddresses =new address[](length);
            times = new uint[](length);
            for (uint i = 0; i < length; i++) {
                (SharedApps[i], SharedUsernames[i], SenderAddresses[i], times[i]) = targetAccount.getSharedAccounByIndex(i);}
            Successful = true;}
        //If it is false, it means that Identity is incorrect.
    }

}