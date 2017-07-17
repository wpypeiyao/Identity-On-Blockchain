//add log to the bottom of the page.It if for testing
var addToLog = function (id, txt) {
    $(id + " .logs").append("<br>" + txt);
};

// ===========================
// Blockchain example
// ===========================
$(document).ready(function () {
    var Nettoken=NettokenFunctions();
    //Register
    $("#blockchain button.create").click(function () {

    });

/*    $("#blockchain button.create").click(function () {
        var MyID = String($("#blockchain input.UserID").val());
        var MyPubkey = String($("#blockchain input.UserPubKey").val());
        var NettokenInstance=NewNettokenFunctions();
        var address=NettokenInstance.address;
        console.log(address);
    });*/
/*    $("#blockchain button.get").click(function () {
        var testID = web3.toAscii(accountInstance.getUserID.call());
        var testPubkey = web3.toAscii(accountInstance.getPublicKey.call());
        console.log(testID);
        console.log(testPubkey);
        addToLog("#blockchain", "userid:" + testID + "userpublickey:" + testPubkey);
        //$("#blockchain .value").html(testaddress);

    });*/

});




