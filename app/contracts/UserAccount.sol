pragma solidity ^0.4.0;


//An instantiation of UserAccount which stands for a user.
contract UserAccount {
    bytes32 public MyName;

    bytes32 public MyPubKey;

    //mapping structure: to store a list of social accounts. It is a recursive mapping structure:the external bytes stands for application names; the internal bytes stands for username of accounts.
    mapping (bytes32 => mapping (bytes32 => SocialAccount)) private SocialAccounts;

    //mapping structure: to store a list of shared accounts. It is a recursive mapping structure:the external bytes stands for application names; the internal bytes stands for username of accounts.
    mapping (bytes32 => mapping (bytes32 => SharedAccount)) private SharedAccounts;

    //mapping structure: to store a list of contacts according to contact's address.
    mapping (address => Contact) private Contacts;




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


    //here are the definition and functions about application accounts.
    //the unit struct to store basic information about one application account.
    struct SocialAccount {
    bytes32 AppName;
    bytes32 AppUsername;
    bytes32 AppPassword;
    bool initialized;
    }

    //function: to add a social account to the mapping list of SocialAccounts.
    function AddSocialAccount(bytes32 Name, bytes32 Username, bytes32 Password){
        if (SocialAccounts[Name][Username].initialized) {
            SocialAccounts[Name][Username].AppPassword = Password;
        }
        else {
            SocialAccounts[Name][Username].AppName = Name;
            SocialAccounts[Name][Username].AppUsername = Username;
            SocialAccounts[Name][Username].AppPassword = Password;
            SocialAccounts[Name][Username].initialized = true;}
    }


    //function: to delete the struct of a specific social account from mapping list. If it is false, it means that there is no such account recorded, and there is nothing to delete.
    function deleteSocialAccount(bytes32 Name, bytes32 Username) returns (bool isSuccessful){
        if (SocialAccounts[Name][Username].initialized) {
            delete SocialAccounts[Name][Username];
            isSuccessful = true;}
        else
        isSuccessful = false;
    }

    //function:to get the information of a specific social account. If it is false, it means that there is no such account recorded.
    function getSocialAccount(bytes32 AName, bytes32 AUsername) returns (bytes32 Password, bool isFound){
        if (SocialAccounts[AName][AUsername].initialized) {
            Password = SocialAccounts[AName][AUsername].AppPassword;
            isFound = true;}
        else
        isFound = false;
    }

    //problem:how to get all accounts information?

    //here are the definition and functions about contacts.
    //the unit struct to store basic information about one contact.
    struct Contact {
    bytes32 ConName;
    bytes32 ConPubKey;
    address ConAddress;
    bool initialized;
    }

    //function: to add a contact to the mapping list of Contacts.
    function AddContact(bytes32 CName, bytes32 CPubkey, address CAddress){
        Contacts[CAddress].ConName = CName;
        Contacts[CAddress].ConPubKey = CPubkey;
        Contacts[CAddress].ConAddress = CAddress;
        Contacts[CAddress].initialized = true;
    }

    //function: to modify the contact name of a specific contact. If it is false, it means that there is no such contact recorded, and there is no need to modify contact name.
    function AlterContactName(address CAddress, bytes32 newName) returns (bool isSuccessful){
        if (Contacts[CAddress].initialized) {
            Contacts[CAddress].ConName = newName;
            isSuccessful = true;}
        else
        isSuccessful = false;
    }

    //function: to modify the public key of a specific contact. If it is false, it means that there is no such contact recorded, and there is no need to modify public key.
    function AlterContactPubkey(address CAddress, bytes32 newPubkey) returns (bool isSuccessful){
        if (Contacts[CAddress].initialized) {
            Contacts[CAddress].ConPubKey = newPubkey;
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
    function getContact(address CAddress) returns (bytes32 CName, bytes32 CPubKey, bool isFound){
        if (Contacts[CAddress].initialized) {
            CName = Contacts[CAddress].ConName;
            CPubKey = Contacts[CAddress].ConPubKey;
            isFound = true;}
        else
        isFound = false;
    }


    //here are the definition and functions about shared accounts from contacts.
    //the unit struct to store basic information about one shared account.
    struct SharedAccount {

    address SenderAddress;
    //time is for time limitation
    uint time;
    bytes32 SharedApp;
    bytes32 SharedUsername;
    bytes32 SharedPassword;
    bool initialized;
    }

    //function: to add a shared account to the mapping list of SharedAccounts.
    function AddSharedAccount(address newAddress, bytes32 newApp, bytes32 newUsername, bytes32 newPassword){
        if (SharedAccounts[newApp][newUsername].initialized) {
            SharedAccounts[newApp][newUsername].time = now;
            SharedAccounts[newApp][newUsername].SharedPassword = newPassword;
        }
        else {
            SharedAccounts[newApp][newUsername].SenderAddress = newAddress;
            SharedAccounts[newApp][newUsername].time = now;
            SharedAccounts[newApp][newUsername].SharedApp = newApp;
            SharedAccounts[newApp][newUsername].SharedUsername = newUsername;
            SharedAccounts[newApp][newUsername].SharedPassword = newPassword;
            SharedAccounts[newApp][newUsername].initialized = true;}
    }


    //function: to delete the struct of a specific shared account from mapping list. If it is false, it means that there is no such account recorded, and there is nothing to delete.
    function deleteSharedAccount(bytes32 SharedApp, bytes32 SharedUsername) returns (bool isSuccessful){
        if (SharedAccounts[SharedApp][SharedUsername].initialized) {
            delete SharedAccounts[SharedApp][SharedUsername];
            isSuccessful = true;}
        else
        isSuccessful = false;
    }

    //Hint:it is required to output all shared accounts.
    //function:to get the information of a specific shared account. If it is false, it means that there is no such account recorded.
    function getSharedAccount(bytes32 AName, bytes32 AUsername) returns (address SAddress, uint Stime, bytes32 SApp, bytes32 SUsername, bytes32 SPassword, bool isFound){
        if (SharedAccounts[AName][AUsername].initialized) {
            SAddress = SharedAccounts[AName][AUsername].SenderAddress;
            Stime = SharedAccounts[AName][AUsername].time;
            SApp = SharedAccounts[AName][AUsername].SharedApp;
            SUsername = SharedAccounts[AName][AUsername].SharedUsername;
            SPassword = SharedAccounts[AName][AUsername].SharedPassword;
            isFound = true;}
        else
        isFound = false;
    }
}