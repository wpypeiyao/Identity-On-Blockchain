pragma solidity ^0.4.0;


import "UserAccount.sol";


contract TokenFunctions {
    //It records user "Identity" with related "address".
    mapping (bytes32 => address) private UserMappingList;

    //Hint:It temporarily used Name&PubKey to generate a user.
    /*In the further implementation, input parameters should be "Identity" and "Name".The pair of "private key" and "public key" are generated from "Identity"."Name"and"public key" are parameters to new a contract to express a user,constructor may return the related "address"."private key"&"public key"&"address" are then recorded on physical Token, and "Identity" and "address" are kept in UserMappingList for usage of checking.*/
    function newUserAccount(bytes32 Identity, bytes32 Name, bytes32 PubKey) returns (address newAddress){
        newAddress = new UserAccount(Name, PubKey);
        UserMappingList[Identity] = newAddress;
    }

    function AddSocialAccount(address target, bytes32 Name, bytes32 Username, bytes32 Password){
        UserAccount(target).AddSocialAccount(Name, Username, Password);
    }

    function AddContact(address target, bytes32 CName, bytes32 CPubkey, address CAddress){
        UserAccount(target).AddContact(CName, CPubkey, CAddress);
    }

    function AddSharedAccount(address sender, address receiver, bytes32 newApp, bytes32 newUsername){
        UserAccount senderAccount = UserAccount(sender);
        UserAccount receiverAccount = UserAccount(receiver);
        var (pw, isFound) = senderAccount.getSocialAccount(newApp, newUsername);
        receiverAccount.AddSharedAccount(sender, newApp, newUsername, pw);

    }

    function getSharedAccount(address target, bytes32 AName, bytes32 AUsername) returns (address SAddress, uint Stime, bytes32 SApp, bytes32 SUsername, bytes32 SPassword, bool isFound){
        return UserAccount(target).getSharedAccount(AName, AUsername);

    }


}