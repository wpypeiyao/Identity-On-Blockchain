/*button: login*/
function login() {
    var LoginPW = String($("#login-pane input#LoginPW").val());

    var token_cipher = sessionStorage.getItem("token");
    token_cipher = String(token_cipher);

    var token = aes_decrypt(LoginPW, token_cipher);
    token = JSON.parse(token);
    console.log("token id for testing:" + token[0]);

    var id = String(token.i);
    var pri = String(token.p);

    Nettoken.LoginCheck.call(id, function (error, result) {
        if (!error) {
            Successful = result[0];
            if (Successful == true) {
                sessionStorage.clear();
                sessionStorage.setItem("id", id);
                sessionStorage.setItem("pri", pri);
                window.location.href = "MyAccount.html";
            }
            else
                alert("Identity is incorrect!");
        }
        else
            console.error(error);
    });
}

/*button: register*/
function register() {
    /*get user input*/
    var RegisterID = String($("#register-pane input#RegisterID").val());
    var RegisterPW = String($("#register-pane input#RegisterPW").val());
    var RegisterNickname = String($("#register-pane input#RegisterName").val());

    /*generate key pair*/
    var key = generate_ecdh_key();
    var pubpoint_key = getPubpoint(key);
    var pri_key = getPrivate(key);
    var pub_x1 = pubpoint_key[0];
    var pub_x2 = pubpoint_key[1];
    var pub_y1 = pubpoint_key[2];
    var pub_y2 = pubpoint_key[3];

    /*generate identity, store information and register*/
    Nettoken.getManagerPubkey.call(function (error, result) {
        if (!error) {

            /*create UserAccount contract for new user*/
            var identity = generate_identity(result[0], result[1], result[2], result[3], pri_key, RegisterID);
            var occupied_name = Nettoken.checkNameOccupied.call(RegisterNickname);
            if (!occupied_name) {
                Nettoken.newUserAccount.sendTransaction(identity, RegisterNickname, pub_x1, pub_x2, pub_y1, pub_y2, {
                    from: web3.eth.accounts[0],
                    data: '0x606060405260405160a08062002e1a833981016040528080519060200190919080519060200190919080519060200190919080519060200190919080519060200190919050505b8460008160001916905550836001600060048110151561006257fe5b0160005b508160001916905550826001600160048110151561008057fe5b0160005b508160001916905550816001600260048110151561009e57fe5b0160005b50816000191690555080600160036004811015156100bc57fe5b0160005b5081600019169055505b50505050505b612d3a80620000e06000396000f3006060604052361561013c576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630cba6d271461013e5780631046bc681461016457806312065fe0146101925780631359fc91146101b857806314ff89cd146101fb5780632e3344521461026a5780634259701b146102c557806347ec8d821461031d5780635ac801fe146103535780636fca20231461036f5780637713b431146103955780637a79940d146103bb5780637cd4a8261461041357806387a07adb1461044157806389a7adcc146104c657806391f39f10146104ef5780639994e1121461054f5780639b8eb7b4146105be5780639de315f114610609578063aa27cdf214610693578063b79eb3a4146106c5578063da7e019e14610727578063e1c7f06a14610762578063e35d3590146107b7575bfe5b341561014657fe5b61014e6107ed565b6040518082815260200191505060405180910390f35b610190600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506107fb565b005b341561019a57fe5b6101a2610c72565b6040518082815260200191505060405180910390f35b6101f9600480803560001916906020019091908035600019169060200190919080356000191690602001909190803560001916906020019091905050610c92565b005b341561020357fe5b6102196004808035906020019091905050610d11565b604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182600019166000191681526020019250505060405180910390f35b341561027257fe5b61027a610d89565b60405180856000191660001916815260200184600019166000191681526020018360001916600019168152602001826000191660001916815260200194505050505060405180910390f35b34156102cd57fe5b6102f460048080356000191690602001909190803560001916906020019091905050610df8565b604051808360001916600019168152602001821515151581526020019250505060405180910390f35b6103516004808035600019169060200190919080356000191690602001909190803560001916906020019091905050610eba565b005b61036d60048080356000191690602001909190505061106b565b005b341561037757fe5b61037f61107a565b6040518082815260200191505060405180910390f35b341561039d57fe5b6103a5611088565b6040518082815260200191505060405180910390f35b34156103c357fe5b6103ea60048080356000191690602001909190803560001916906020019091905050611096565b604051808360001916600019168152602001821515151581526020019250505060405180910390f35b341561041b57fe5b610423611158565b60405180826000191660001916815260200191505060405180910390f35b341561044957fe5b61045f600480803590602001909190505061115e565b60405180856000191660001916815260200184600019166000191681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200194505050505060405180910390f35b6104ed6004808035600019169060200190919080356000191690602001909190505061122a565b005b34156104f757fe5b61050d60048080359060200190919050506115b5565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6105bc600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919080356000191690602001909190803560001916906020019091908035600019169060200190919080356000191690602001909190803560001916906020019091905050611604565b005b34156105c657fe5b6105dc6004808035906020019091905050611970565b60405180836000191660001916815260200182600019166000191681526020019250505060405180910390f35b341561061157fe5b61063d600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506119c8565b604051808660001916600019168152602001856000191660001916815260200184600019166000191681526020018360001916600019168152602001821515151581526020019550505050505060405180910390f35b6106c360048080356000191690602001909190803560001916906020019091908035906020019091905050611b0d565b005b610725600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803560001916906020019091908035600019169060200190919080356000191690602001909190803560001916906020019091905050612037565b005b610760600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803560001916906020019091905050612248565b005b6107b5600480803560001916906020019091908035600019169060200190919080356000191690602001909190803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061240e565b005b6107eb6004808035600019169060200190919080356000191690602001909190803560001916906020019091905050612722565b005b600060068054905090505b90565b60006000600960008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160009054906101000a900460ff1615156108e8577fcf34ef537ac33ee1ac626ca1587a0a7e8e51561e5514f8cb36afa1c5102b3bab60405180806020018281038252602b8152602001807f4661696c656421205468657265206973206e6f207375636820636f6e7461637481526020017f20746f2064656c6574652100000000000000000000000000000000000000000081525060400191505060405180910390a1610c6c565b600960008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000154915060088281548110151561093c57fe5b906000526020600020906006020160005b6000820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff0219169055600182016000905560028201600061098c91906129ae565b5050600960008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600060008201600090556001820160006101000a81549060ff021916905550506008600160088054905003815481101515610a0457fe5b906000526020600020906006020160005b50600883815481101515610a2557fe5b906000526020600020906006020160005b506000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600182015481600101906000191690556002820181600201906004610ac49291906129ca565b509050506008600160088054905003815481101515610adf57fe5b906000526020600020906006020160005b5060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081600960008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600001819055506008600160088054905003815481101515610b7557fe5b906000526020600020906006020160005b6000820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556001820160009055600282016000610bc591906129ae565b50506008805480919060019003610bdc9190612a07565b507fcf34ef537ac33ee1ac626ca1587a0a7e8e51561e5514f8cb36afa1c5102b3bab6040518080602001828103825260218152602001807f5375636365737366756c6c792064656c657465642074686520636f6e7461637481526020017f2e0000000000000000000000000000000000000000000000000000000000000081525060400191505060405180910390a15b5b505050565b60003073ffffffffffffffffffffffffffffffffffffffff163190505b90565b8360016000600481101515610ca357fe5b0160005b5081600019169055508260016001600481101515610cc157fe5b0160005b5081600019169055508160016002600481101515610cdf57fe5b0160005b5081600019169055508060016003600481101515610cfd57fe5b0160005b5081600019169055505b50505050565b60006000600883815481101515610d2457fe5b906000526020600020906006020160005b5060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169150600883815481101515610d6b57fe5b906000526020600020906006020160005b506001015490505b915091565b600060006000600060016000600481101515610da157fe5b0160005b5054935060016001600481101515610db957fe5b0160005b5054925060016002600481101515610dd157fe5b0160005b5054915060016003600481101515610de957fe5b0160005b505490505b90919293565b600060006007600085600019166000191681526020019081526020016000206000846000191660001916815260200190815260200160002060010160009054906101000a900460ff1615610ead5760066007600086600019166000191681526020019081526020016000206000856000191660001916815260200190815260200160002060000154815481101515610e8c57fe5b906000526020600020906003020160005b5060020154915060019050610eb2565b600090505b5b9250929050565b6007600084600019166000191681526020019081526020016000206000836000191660001916815260200190815260200160002060010160009054906101000a900460ff161515610f72577fcf34ef537ac33ee1ac626ca1587a0a7e8e51561e5514f8cb36afa1c5102b3bab6040518080602001828103825260208152602001807f4661696c656421205468657265206973206e6f2073756368207265636f72642e81525060200191505060405180910390a1611065565b8060066007600086600019166000191681526020019081526020016000206000856000191660001916815260200190815260200160002060000154815481101515610fb957fe5b906000526020600020906003020160005b5060020181600019169055507fcf34ef537ac33ee1ac626ca1587a0a7e8e51561e5514f8cb36afa1c5102b3bab6040518080602001828103825260238152602001807f5375636365737366756c6c79206d6f646966696564207468652070617373776f81526020017f72642e000000000000000000000000000000000000000000000000000000000081525060400191505060405180910390a15b5b505050565b80600081600019169055505b50565b6000600a8054905090505b90565b600060088054905090505b90565b60006000600b600085600019166000191681526020019081526020016000206000846000191660001916815260200190815260200160002060010160009054906101000a900460ff161561114b57600a600b60008660001916600019168152602001908152602001600020600085600019166000191681526020019081526020016000206000015481548110151561112a57fe5b906000526020600020906005020160005b5060020154915060019050611150565b600090505b5b9250929050565b60005481565b6000600060006000600a8581548110151561117557fe5b906000526020600020906005020160005b50600001549350600a8581548110151561119c57fe5b906000526020600020906005020160005b50600101549250600a858154811015156111c357fe5b906000526020600020906005020160005b5060030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169150600a8581548110151561120a57fe5b906000526020600020906005020160005b506004015490505b9193509193565b6000600060006007600086600019166000191681526020019081526020016000206000856000191660001916815260200190815260200160002060010160009054906101000a900460ff161561154457600760008660001916600019168152602001908152602001600020600085600019166000191681526020019081526020016000206000015492506006838154811015156112c357fe5b906000526020600020906003020160005b600082016000905560018201600090556002820160009055505060076000866000191660001916815260200190815260200160002060008560001916600019168152602001908152602001600020600060008201600090556001820160006101000a81549060ff02191690555050600660016006805490500381548110151561135957fe5b906000526020600020906003020160005b5060068481548110151561137a57fe5b906000526020600020906003020160005b5060008201548160000190600019169055600182015481600101906000191690556002820154816002019060001916905590505060066001600680549050038154811015156113d657fe5b906000526020600020906003020160005b50600001549150600660016006805490500381548110151561140557fe5b906000526020600020906003020160005b50600101549050826007600084600019166000191681526020019081526020016000206000836000191660001916815260200190815260200160002060000181905550600660016006805490500381548110151561147057fe5b906000526020600020906003020160005b600082016000905560018201600090556002820160009055505060068054809190600190036114b09190612a39565b507fcf34ef537ac33ee1ac626ca1587a0a7e8e51561e5514f8cb36afa1c5102b3bab6040518080602001828103825260228152602001807f5375636365737366756c6c792064656c657465642074686174206163636f756e81526020017f742e00000000000000000000000000000000000000000000000000000000000081525060400191505060405180910390a16115ad565b7fcf34ef537ac33ee1ac626ca1587a0a7e8e51561e5514f8cb36afa1c5102b3bab6040518080602001828103825260208152602001807f4661696c656421205468657265206973206e6f2073756368207265636f72642e81525060200191505060405180910390a15b5b5050505050565b60006008828154811015156115c657fe5b906000526020600020906006020160005b5060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690505b919050565b61160c612a6b565b600960008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160009054906101000a900460ff1615156118d7578481600060048110151561167257fe5b602002019060001916908160001916815250508381600160048110151561169557fe5b60200201906000191690816000191681525050828160026004811015156116b857fe5b60200201906000191690816000191681525050818160036004811015156116db57fe5b60200201906000191690816000191681525050600880548060010182816117029190612a97565b916000526020600020906006020160005b6060604051908101604052808b73ffffffffffffffffffffffffffffffffffffffff1681526020018a60001916815260200185815250909190915060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550602082015181600101906000191690556040820151816002019060046117bc929190612ac9565b50505050600160088054905003600960008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600001819055506001600960008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160006101000a81548160ff0219169083151502179055507fcf34ef537ac33ee1ac626ca1587a0a7e8e51561e5514f8cb36afa1c5102b3bab60405180806020018281038252601f8152602001807f5375636365737366756c6c792061646465642074686520636f6e746163742e0081525060200191505060405180910390a1611966565b7fcf34ef537ac33ee1ac626ca1587a0a7e8e51561e5514f8cb36afa1c5102b3bab6040518080602001828103825260248152602001807f4661696c656421205468657265206578697374696e67207375636820636f6e7481526020017f616374210000000000000000000000000000000000000000000000000000000081525060400191505060405180910390a15b5b50505050505050565b6000600060068381548110151561198357fe5b906000526020600020906003020160005b506000015491506006838154811015156119aa57fe5b906000526020600020906003020160005b506001015490505b915091565b6000600060006000600060006000600960008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160009054906101000a900460ff161515611a355760009250611b01565b600960008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600001549150600882815481101515611a8957fe5b906000526020600020906006020160005b506002019050806000600481101515611aaf57fe5b0160005b50549650806001600481101515611ac657fe5b0160005b50549550806002600481101515611add57fe5b0160005b50549450806003600481101515611af457fe5b0160005b50549350600192505b5b505091939590929450565b60006000600060006000600b600089600019166000191681526020019081526020016000206000886000191660001916815260200190815260200160002060010160009054906101000a900460ff1615611fc357600b6000896000191660001916815260200190815260200160002060008860001916600019168152602001908152602001600020600001549450600a85815481101515611baa57fe5b906000526020600020906005020160005b5060040154935042925085848403101515611f2f57600a85815481101515611bdf57fe5b906000526020600020906005020160005b6000820160009055600182016000905560028201600090556003820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff021916905560048201600090555050600b6000896000191660001916815260200190815260200160002060008860001916600019168152602001908152602001600020600060008201600090556001820160006101000a81549060ff02191690555050600a6001600a8054905003815481101515611ca457fe5b906000526020600020906005020160005b50600a86815481101515611cc557fe5b906000526020600020906005020160005b506000820154816000019060001916905560018201548160010190600019169055600282015481600201906000191690556003820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168160030160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060048201548160040155905050600a6001600a8054905003815481101515611d9257fe5b906000526020600020906005020160005b50600001549150600a6001600a8054905003815481101515611dc157fe5b906000526020600020906005020160005b5060010154905084600b600084600019166000191681526020019081526020016000206000836000191660001916815260200190815260200160002060000181905550600a6001600a8054905003815481101515611e2c57fe5b906000526020600020906005020160005b6000820160009055600182016000905560028201600090556003820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff021916905560048201600090555050600a805480919060019003611e9b9190612b0f565b507fcf34ef537ac33ee1ac626ca1587a0a7e8e51561e5514f8cb36afa1c5102b3bab6040518080602001828103825260398152602001807f5468652074617267657420736861726564206163636f756e7420697320696e7681526020017f616c69642073696e6365206974206973206f7665726475652e0000000000000081525060400191505060405180910390a1611fbe565b7fcf34ef537ac33ee1ac626ca1587a0a7e8e51561e5514f8cb36afa1c5102b3bab6040518080602001828103825260388152602001807f5468652074617267657420736861726564206163636f756e742069732076616c81526020017f69642c20746875732069742063616e20626520757365642e000000000000000081525060400191505060405180910390a15b61202c565b7fcf34ef537ac33ee1ac626ca1587a0a7e8e51561e5514f8cb36afa1c5102b3bab6040518080602001828103825260208152602001807f4661696c656421205468657265206973206e6f2073756368207265636f72642e81525060200191505060405180910390a15b5b5050505050505050565b600960008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160009054906101000a900460ff1615156120fa577fcf34ef537ac33ee1ac626ca1587a0a7e8e51561e5514f8cb36afa1c5102b3bab6040518080602001828103825260208152602001807f4661696c656421205468657265206973206e6f2073756368207265636f72642e81525060200191505060405180910390a1612240565b6080604051908101604052808560001916600019168152602001846000191660001916815260200183600019166000191681526020018260001916600019168152506008600960008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000015481548110151561218d57fe5b906000526020600020906006020160005b506002019060046121b0929190612b41565b507fcf34ef537ac33ee1ac626ca1587a0a7e8e51561e5514f8cb36afa1c5102b3bab60405180806020018281038252602d8152602001807f5375636365737366756c6c79206d6f6469666965642074686520636f6e74616381526020017f74207075626c6963206b65792e0000000000000000000000000000000000000081525060400191505060405180910390a15b5b5050505050565b600960008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160009054906101000a900460ff16151561230b577fcf34ef537ac33ee1ac626ca1587a0a7e8e51561e5514f8cb36afa1c5102b3bab6040518080602001828103825260208152602001807f4661696c656421205468657265206973206e6f2073756368207265636f72642e81525060200191505060405180910390a1612409565b806008600960008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000015481548110151561235d57fe5b906000526020600020906006020160005b5060010181600019169055507fcf34ef537ac33ee1ac626ca1587a0a7e8e51561e5514f8cb36afa1c5102b3bab6040518080602001828103825260278152602001807f5375636365737366756c6c79206d6f6469666965642074686520636f6e74616381526020017f74206e616d652e0000000000000000000000000000000000000000000000000081525060400191505060405180910390a15b5b5050565b600b600085600019166000191681526020019081526020016000206000846000191660001916815260200190815260200160002060010160009054906101000a900460ff161561258e57600a600b60008660001916600019168152602001908152602001600020600085600019166000191681526020019081526020016000206000015481548110151561249e57fe5b906000526020600020906005020160005b50600201546000191682600019161415156125295781600a600b60008760001916600019168152602001908152602001600020600086600019166000191681526020019081526020016000206000015481548110151561250b57fe5b906000526020600020906005020160005b5060020181600019169055505b42600a600b60008760001916600019168152602001908152602001600020600086600019166000191681526020019081526020016000206000015481548110151561257057fe5b906000526020600020906005020160005b506004018190555061271b565b600a80548060010182816125a29190612b87565b916000526020600020906005020160005b60a0604051908101604052808860001916815260200187600019168152602001866000191681526020018573ffffffffffffffffffffffffffffffffffffffff16815260200142815250909190915060008201518160000190600019169055602082015181600101906000191690556040820151816002019060001916905560608201518160030160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550608082015181600401555050506001600b600086600019166000191681526020019081526020016000206000856000191660001916815260200190815260200160002060010160006101000a81548160ff0219169083151502179055506001600a8054905003600b6000866000191660001916815260200190815260200160002060008560001916600019168152602001908152602001600020600001819055505b5b50505050565b6007600084600019166000191681526020019081526020016000206000836000191660001916815260200190815260200160002060010160009054906101000a900460ff16151561291957600680548060010182816127819190612bb9565b916000526020600020906003020160005b606060405190810160405280876000191681526020018660001916815260200185600019168152509091909150600082015181600001906000191690556020820151816001019060001916905560408201518160020190600019169055505050600160068054905003600760008560001916600019168152602001908152602001600020600084600019166000191681526020019081526020016000206000018190555060016007600085600019166000191681526020019081526020016000206000846000191660001916815260200190815260200160002060010160006101000a81548160ff0219169083151502179055507fcf34ef537ac33ee1ac626ca1587a0a7e8e51561e5514f8cb36afa1c5102b3bab60405180806020018281038252602e8152602001807f5375636365737366756c6c792061646465642061207265636f7264206f66207381526020017f6f6369616c206163636f756e742e00000000000000000000000000000000000081525060400191505060405180910390a16129a8565b7fcf34ef537ac33ee1ac626ca1587a0a7e8e51561e5514f8cb36afa1c5102b3bab6040518080602001828103825260238152602001807f4661696c656421205468657265206578697374696e672073756368207265636f81526020017f72642e000000000000000000000000000000000000000000000000000000000081525060400191505060405180910390a15b5b505050565b5060008155600101600081556001016000815560010160009055565b82600481019282156129f6579182015b828111156129f55782548255916001019190600101906129da565b5b509050612a039190612beb565b5090565b815481835581811511612a3457600602816006028360005260206000209182019101612a339190612c10565b5b505050565b815481835581811511612a6657600302816003028360005260206000209182019101612a659190612c6f565b5b505050565b6080604051908101604052806004905b600060001916815260200190600190039081612a7b5790505090565b815481835581811511612ac457600602816006028360005260206000209182019101612ac39190612c10565b5b505050565b8260048101928215612afe579160200282015b82811115612afd578251829060001916905591602001919060010190612adc565b5b509050612b0b9190612beb565b5090565b815481835581811511612b3c57600502816005028360005260206000209182019101612b3b9190612ca7565b5b505050565b8260048101928215612b76579160200282015b82811115612b75578251829060001916905591602001919060010190612b54565b5b509050612b839190612beb565b5090565b815481835581811511612bb457600502816005028360005260206000209182019101612bb39190612ca7565b5b505050565b815481835581811511612be657600302816003028360005260206000209182019101612be59190612c6f565b5b505050565b612c0d91905b80821115612c09576000816000905550600101612bf1565b5090565b90565b612c6c91905b80821115612c685760006000820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556001820160009055600282016000612c5f91906129ae565b50600601612c16565b5090565b90565b612ca491905b80821115612ca057600060008201600090556001820160009055600282016000905550600301612c75565b5090565b90565b612d0b91905b80821115612d075760006000820160009055600182016000905560028201600090556003820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff0219169055600482016000905550600501612cad565b5090565b905600a165627a7a72305820d9d8da784f4cc62df1c7ff874c83efaa6b366a5a444c72f65cff564634f2477a0029',
                    gas: '5000000'
                }, function (error, result) {
                    if (error)
                        console.error(error);
                    else {
                        /*store user information*/
                        var json_data = {};
                        json_data.i = identity;
                        json_data.p = pri_key;
                        json_data = JSON.stringify(json_data);
                        console.log("token info:" + json_data);

                        json_data = aes_encrypt(RegisterPW, json_data);
                        console.log("token cipher info:" + json_data);

                        /*store as image*/
                        create("QR-Code-image", json_data, RegisterNickname);
                    }
                    ;
                });
            }
            else
                alert("Failed! This nickname has been occupied. Please use another one.");
        }
        else
            console.error(error);
    });
}

/*button: to register*/
function to_register() {
    document.getElementById("login-pane").style.display = "none";
    document.getElementById("register-pane").style.display = "inline";
    document.getElementById("QR-Code-image").style.display = "inline";
}
/*button: to login*/
function to_login() {
    document.getElementById("register-pane").style.display = "none";
    document.getElementById("QR-Code-image").style.display = "none";
    document.getElementById("login-pane").style.display = "inline";
}

/*set the Timelimited for TokenFunctions contract*/
function setTimeLimited() {
    var newTimeLimited = Number($("input#newTimelimited").val());
    var checkTimeFormat = isNaN(newTimeLimited);
    if (checkTimeFormat) {
        alert("The format is incorrect!");
    }
    else {
        Nettoken.setTimeLimited.sendTransaction(newTimeLimited, {from: web3.eth.accounts[0]});
    }

}


