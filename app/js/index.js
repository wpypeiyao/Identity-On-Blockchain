//add log to the bottom of the page.It if for testing
var addToLog = function (id, txt) {
    $(id + " .logs").append("<br>" + txt);
};

// ===========================
// Blockchain example
// ===========================
$(document).ready(function () {
    var accountInstance;
    $("#blockchain button.create").click(function () {
        var MyID = String($("#blockchain input.UserID").val());
        var MyPubkey = String($("#blockchain input.UserPubKey").val());
        accountInstance = newUserAccount(MyID, MyPubkey);
    });
    $("#blockchain button.get").click(function () {
        var testID = web3.toAscii(accountInstance.getUserID.call());
        var testPubkey = web3.toAscii(accountInstance.getPublicKey.call());
        console.log(testID);
        console.log(testPubkey);
        addToLog("#blockchain", "userid:" + testID + "userpublickey:" + testPubkey);
        //$("#blockchain .value").html(testaddress);

    });

});




