pragma solidity ^0.4.0;


//An instantiation of UserAccount which stands for a user.
contract UserAccount {
    //maybe there is no need to record userID here?
    string private userID;

    string public MyPubKey;

    address public MyAddress;

    //mapping structure: to store a list of social accounts. It is a recursive mapping structure:the external string stands for application names; the internal string stands for username of accounts.
    mapping (string => mapping (string => SocialAccount)) private SocialAccounts;

    //mapping structure: to store a list of contacts according to contact's address.
    mapping (address => Contact) private Contacts;


    //constructor
    function UserAccount(string ID, string PubKey){
        userID = ID;
        MyPubKey = PubKey;
        MyAddress = msg.sender;
    }

    function getUserID() returns (string ID){
        ID = userID;
    }

    function getPublicKey() returns (string myPublickey){
        myPublickey = MyPubKey;
    }

    function getAddress() returns (address myAddress){
        myAddress = MyAddress;
    }

    function setPublicKey(string newPubKey) {
        MyPubKey = newPubKey;
    }

    //here are the definition and functions about application accounts.
    //the unit struct to store basic information about one application account.
    struct SocialAccount {
    string AppName;
    string AppUsername;
    string AppPassword;
    bool initialized;
    }

    //function: to add a social account to the mapping list of SocialAccounts.
    function AddSocialAccount(string Name, string Username, string Password){
        SocialAccounts[Name][Username].AppName = Name;
        SocialAccounts[Name][Username].AppUsername = Username;
        SocialAccounts[Name][Username].AppPassword = Password;
        SocialAccounts[Name][Username].initialized = true;
    }

    //function: to modify the password of a specific social account. If it is false, it means that there is no such account recorded, and there is no need to modify password.
    function AlterSocialAccountPassword(string Name, string Username, string NewPassword) returns (bool isSuccessful){
        if (SocialAccounts[Name][Username].initialized) {
            SocialAccounts[Name][Username].AppPassword = NewPassword;
            isSuccessful = true;}
        else
        isSuccessful = false;
    }

    //function: to delete the struct of a specific social account from mapping list. If it is false, it means that there is no such account recorded, and there is nothing to delete.
    function deleteSocialAccount(string Name, string Username) returns (bool isSuccessful){
        if (SocialAccounts[Name][Username].initialized) {
            delete SocialAccounts[Name][Username];
            isSuccessful = true;}
        else
        isSuccessful = false;
    }

    //function:to get the information of a specific social account. If it is false, it means that there is no such account recorded.
    function getSocialAccount(string AName, string AUsername) returns (string Name, string Username, string Password, bool isFound){
        if (SocialAccounts[AName][AUsername].initialized) {
            Name = SocialAccounts[AName][AUsername].AppName;
            Username = SocialAccounts[AName][AUsername].AppUsername;
            Password = SocialAccounts[AName][AUsername].AppPassword;
            isFound = true;}
        else
        isFound = false;
    }

    //problem:how to get all accounts information?

    //here are the definition and functions about contacts.
    //the unit struct to store basic information about one contact.
    struct Contact {
    string ContactName;
    string ConPubKey;
    address ConAddress;
    bool initialized;
    }

    //function: to add a contact to the mapping list of Contacts.
    function AddContact(string CName, string CPubkey, address CAddress){
        Contacts[CAddress].ContactName=CName;
        Contacts[CAddress].ConPubKey=CPubkey;
        Contacts[CAddress].ConAddress=CAddress;
        Contacts[CAddress].initialized=true;
    }

    //function: to modify the contact name of a specific contact. If it is false, it means that there is no such contact recorded, and there is no need to modify contact name.
    function AlterContactName(address CAddress,string CName) returns (bool isSuccessful){
        if (Contacts[CAddress].initialized) {
            Contacts[CAddress].ContactName=CName;
            isSuccessful = true;}
        else
        isSuccessful = false;
    }

    //function: to modify the public key of a specific contact. If it is false, it means that there is no such contact recorded, and there is no need to modify public key.
    function AlterContactPubkey(address CAddress,string CPubkey) returns (bool isSuccessful){
        if (Contacts[CAddress].initialized) {
            Contacts[CAddress].ConPubKey=CPubkey;
            isSuccessful = true;}
        else
        isSuccessful = false;
    }

    //function: to delete the struct of a specific contact from mapping list. If it is false, it means that there is no such contact recorded, and there is nothing to delete.
    function deleteContact(address CAddress) returns (bool isSuccessful){
        if (Contacts[CAddress].initialized) {
            delete Contacts[CAddress];
            isSuccessful = true;}
        else
        isSuccessful = false;
    }
    //function:to get the information of a specific contact. If it is false, it means that there is no such contact recorded.
    function getContact(address CAddress) returns (string CName,string CPubKey,address ConAddress, bool isFound){
        if (Contacts[CAddress].initialized) {
            CName = Contacts[CAddress].ContactName;
            CPubKey = Contacts[CAddress].ConPubKey;
            ConAddress = Contacts[CAddress].ConAddress;
            isFound = true;}
        else
        isFound = false;
    }
}