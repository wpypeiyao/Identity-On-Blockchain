var ec = new ellipticjs.ec('secp256k1');

/*cryptography example*/
/*var key1 = generate_ecdh_key();
 var key2 = generate_ecdh_key();

 //derive (half)value of x-axis and y-axis for each public key
 var pubpoint_key1 = getPubpoint(key1);
 var pubpoint_key2 = getPubpoint(key2);

 var x_key1_half1, x_key1_half2, y_key1_half1, y_key1_half2;
 x_key1_half1 = pubpoint_key1[0];
 x_key1_half2 = pubpoint_key1[1];
 y_key1_half1 = pubpoint_key1[2];
 y_key1_half2 = pubpoint_key1[3];

 var x_key2_half1, x_key2_half2, y_key2_half1, y_key2_half2;
 x_key2_half1 = pubpoint_key2[0];
 x_key2_half2 = pubpoint_key2[1];
 y_key2_half1 = pubpoint_key2[2];
 y_key2_half2 = pubpoint_key2[3];

 //derive private key for saving
 var pri_key1=getPrivate(key1);
 var pri_key2=getPrivate(key2);

 //recover public key from split version
 var pubkey_recover_key1 = recoverPubkey(x_key1_half1, x_key1_half2, y_key1_half1, y_key1_half2);
 var pubkey_recover_key2 = recoverPubkey(x_key2_half1, x_key2_half2, y_key2_half1, y_key2_half2);

 //derive shared key
 var shared1 = getShared_key(pri_key1, pubkey_recover_key2);
 var shared2 = getShared_key(pri_key2, pubkey_recover_key1);


 console.log("the shared key is:" + shared1);
 console.log("the shared key is:" + shared2);

 var hash_shared_key = md5(shared1);

 //excrypt and decrypt
 var result;

 var plaintext_padding = padding_16bytes("testmelkjasdoA2");
 result = aes_encrypt(shared1, plaintext_padding);
 console.log("cipher is:" + result);

 result = aes_decrypt(shared2, result);
 var plaintext_recover_unpadding=unpadding(result);
 console.log("plaintext unpadding is:" + plaintext_recover_unpadding);*/

/*key generation example*/
/*var key = generate_ecdh_key();
 var pubpoint_key = getPubpoint(key);
 var pri_key = getPrivate(key);

 var json_data = {};
 json_data.private = pri_key;
 json_data.public_x1 = pubpoint_key[0];
 json_data.public_x2 = pubpoint_key[1];
 json_data.public_y1 = pubpoint_key[2];
 json_data.public_y2 = pubpoint_key[3];
 json_data=JSON.stringify(json_data);
 console.log(json_data);*/

/*Generate identity*/
function generate_identity(manager_pub_x1, manager_pub_x2, manager_pub_y1, manager_pub_y2, pri_key, RegisterID) {
    manager_pub_x1 = web3.toAscii(manager_pub_x1);
    manager_pub_x2 = web3.toAscii(manager_pub_x2);
    manager_pub_y1 = web3.toAscii(manager_pub_y1);
    manager_pub_y2 = web3.toAscii(manager_pub_y2);
    var manager_pubkey_recover = recoverPubkey(manager_pub_x1, manager_pub_x2, manager_pub_y1, manager_pub_y2);
    var shared_key = getShared_key(pri_key, manager_pubkey_recover);
    var identity = aes_encrypt(shared_key, RegisterID);
    identity = md5(identity);
    return identity;
}

/*Generate key pair (object): key should be stored physically*/
function generate_ecdh_key() {
    var key_pair = ec.genKeyPair();
    return key_pair;
}

/*derive private key: must be secure!!!*/
function getPrivate(key) {
    var pri = key.priv;
    return pri;
}

/*derive public key point: 4 hex string of x-axis and y-axis (hex string array)*/
function getPubpoint(key) {
    var pubpoint = key.getPublic();
    var Pubpoint_hex = new Array(4);
    var x = (pubpoint.getX()).toString(16);
    var y = (pubpoint.getY()).toString(16);

    Pubpoint_hex[0] = x.substring(0, 32);//x_half1_hex
    Pubpoint_hex[1] = x.substring(32);//x_half2_hex
    Pubpoint_hex[2] = y.substring(0, 32);//y_half1_hex
    Pubpoint_hex[3] = y.substring(32);//y_half2_hex
    return Pubpoint_hex;
}

/*recover public key from key point values (object)*/
function recoverPubkey(x_half1, x_half2, y_half1, y_half2) {
    var x = x_half1 + x_half2;
    var y = y_half1 + y_half2;
    var Pubpoint_recover = {x: x, y: y};
    var key_recover = ec.keyFromPublic(Pubpoint_recover, 'hex');
    var Pubkey_recover = key_recover.getPublic();
    return Pubkey_recover;

}

/*derive shared key (hex string)*/
function getShared_key(prikey1, pubkey2) {
    var shared_key = pubkey2.mul(prikey1).getX();
    shared_key = shared_key.toString(16);
    return shared_key;
}

/*Convert hex string to byte array*/
function StrToBytes(str) {
    var pos = 0;
    var len = str.length;
    if (len % 2 != 0) {
        return null;
    }
    len /= 2;
    var hexArray = [];
    for (var i = 0; i < len; i++) {
        var s = str.substr(pos, 2);
        var v = parseInt(s, 16);
        hexArray.push(v);
        pos += 2;
    }
    return hexArray;
}

/*encryption: return cipher hex string*/
function aes_encrypt(key, plaintext) {
    key = $.trim(key);
    plaintext = $.trim(plaintext);
    var aes_key = md5(key);
    aes_key = StrToBytes(aes_key);
    var textBytes = aesjs.utils.utf8.toBytes(plaintext);
    var aesCtr = new aesjs.ModeOfOperation.ctr(aes_key, new aesjs.Counter(5));
    var encryptedBytes = aesCtr.encrypt(textBytes);
    var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
    encryptedHex=$.trim(encryptedHex);
    return encryptedHex;
}

/*decryption:return plaintext string*/
function aes_decrypt(key, cipher_hex) {
    key = $.trim(key);
    cipher_hex = $.trim(cipher_hex);
    var aes_key = md5(key);
    aes_key = StrToBytes(aes_key);
    var cipherBytes = aesjs.utils.hex.toBytes(cipher_hex);
    var aesCtr = new aesjs.ModeOfOperation.ctr(aes_key, new aesjs.Counter(5));
    var decryptedBytes = aesCtr.decrypt(cipherBytes);
    var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
    decryptedText = $.trim(decryptedText);
    return decryptedText;
}


/*string padding(16bytes)： using "?"*/
function padding_16bytes(str) {
    var padding;
    var result;
    try {
        if (0 <= str.length && str.length <= 16) {
            padding = "????????????????";
            result = str + padding.substring(str.length);
        }
        else {
            throw 'Error!!!Text cannot be longer than 16 bytes. Please try another one.';
        }
    }
    catch (e) {
        console.log(e);
        alert(e);
    }
    finally {
        return result;
    }
}

function unpadding(str_16bytes) {
    var padding_place = str_16bytes.indexOf("?");
    return str_16bytes.substring(0, padding_place);
}

/*formatting time*/
function getReadableTime(years, times) {
    var year = String(years);
    var day = String(times[1]);
    var hour = String(times[2]);
    var minute = String(times[3]);
    var second = String(times[4]);

    var padding = "00";
    day = padding.substring(day.length) + day;
    hour = padding.substring(hour.length) + hour;
    minute = padding.substring(minute.length) + minute;
    second = padding.substring(second.length) + second;

    /*month*/
    var month = Number(times[0]);
    switch (month) {
        case 1:
            month = "January";
            break;
        case 2:
            month = "February";
            break;
        case 3:
            month = "March";
            break;
        case 4:
            month = "April";
            break;
        case 5:
            month = "May";
            break;
        case 6:
            month = "June";
            break;
        case 7:
            month = "July";
            break;
        case 8:
            month = "August";
            break;
        case 9:
            month = "September";
            break;
        case 10:
            month = "October";
            break;
        case 11:
            month = "November";
            break;
        case 12:
            month = "December";
            break;
        default:
            throw "Format error!";
    }

    var output = hour + ":" + minute + ":" + second + " " + " " + day + " " + month + "," + year;
    return output;
}

/*save QR-Code as file*/
function exportCanvasAsPNG(canvas, fileName) {
    var MIME_TYPE = "image/png";
    var dlLink = document.createElement('a');
    dlLink.download = fileName;
    dlLink.href = canvas.toDataURL("image/png");
    dlLink.dataset.downloadurl = [MIME_TYPE, dlLink.href].join(':');
    document.body.appendChild(dlLink);
    dlLink.click();
    document.body.removeChild(dlLink);
}

/*generate qr code*/
function create(container_id_string, data_json, myname) {
    myname = myname + " QR-Code";
    document.getElementById("QR-Code-name").innerHTML = myname;
    document.getElementById("qrcode").innerHTML = "<img src='https://chart.googleapis.com/chart?chs=250x250&cht=qr&chl=" + encodeURIComponent(data_json) + "'/>";
    html2canvas(document.getElementById(container_id_string)).then(function (canvas) {
        exportCanvasAsPNG(canvas, "qrcode.png");
    });
}

function normalize(value){

}

/*function createQRDiv(container_id_string) {
 var my = document.createElement("qrcode");
 document.getElementById(container_id_string).appendChild(my);
 my.style.position = "relative";
 my.style.padding = "3px";
 my.id = "qrcode";
 }

 function deleteQRDiv() {
 var my = document.getElementById("qrcode");
 if (my != null)
 my.parentNode.removeChild(my);
 }

 /!*generate qrcode for new user*!/
 function generate_qrcode(container_id_string, data_json, myname) {
 /!*delete last qrcode node*!/
 deleteQRDiv();
 /!*create div for qrcode*!/
 myname = myname + " QR-Code";
 document.getElementById("QR-Code-name").innerHTML = myname;
 createQRDiv(container_id_string);

 /!*generate qrcode and save as image*!/
 var binaryString = pako.deflate(data_json, {to: 'string'});
 $('#qrcode').qrcode(binaryString);
 html2canvas(document.getElementById(container_id_string)).then(function (canvas) {
 exportCanvasAsPNG(canvas, "qrcode.png");
 });

 //扫描出的结果经过以下表达式则会还原原来的字符串
 //var restored = JSON.parse(pako.inflate(binaryString, {to: 'string'}));//字符串解压缩处理
 }*/
/*function aes_encrypt_token(password, plaintext, callback) {
    generate_aes_key(password, function (aes_key) {
        var textBytes = aesjs.utils.utf8.toBytes(plaintext);
        var aesCtr = new aesjs.ModeOfOperation.ctr(aes_key, new aesjs.Counter(5));
        var encryptedBytes = aesCtr.encrypt(textBytes);
        var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
        callback(encryptedHex);
    });
}*/
/*decryption:return plaintext string*/
/*function aes_decrypt_token(password, cipher_hex, callback) {
    generate_aes_key(password, function (aes_key) {
        var cipherBytes = aesjs.utils.hex.toBytes(cipher_hex);
        var aesCtr = new aesjs.ModeOfOperation.ctr(aes_key, new aesjs.Counter(5));
        var decryptedBytes = aesCtr.decrypt(cipherBytes);
        var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
        callback(decryptedText);
    });
}*/
/*generation: key from password-salt*/
/*
function generate_aes_key(password_string, callback) {
    var pw = new String(password_string);
    var password = new buffer.SlowBuffer(pw.normalize('NFKC'));
    var salt = new buffer.SlowBuffer("Nettoken".normalize('NFKC'));
    var N = 1024, r = 8, p = 1;
    var dkLen = 16;
    scrypt(password, salt, N, r, p, dkLen, function (error, progress, key) {
        if (error) {
            console.error("Error: " + error);

        } else if (key) {
            callback(key);
        }
    });
}*/
