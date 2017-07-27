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

/*generate random hex string*/
function randomString(len) {
    len = len || 32;
    var $chars = '0123456789abcdef';
    var maxPos = $chars.length;
    var pwd = '';
    for (i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
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
function aes_encrypt(key_hex, plaintext_16bytes) {
    var aes_key = StrToBytes(key_hex);
    var iv = StrToBytes(key_hex.substring(0, 32));
    var textBytes = aesjs.utils.utf8.toBytes(plaintext_16bytes);
    var aesCbc = new aesjs.ModeOfOperation.cbc(aes_key, iv);
    var encryptedBytes = aesCbc.encrypt(textBytes);
    var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
    return encryptedHex;
}

/*decryption:return plaintext string*/
function aes_decrypt(key_hex, cipher_hex) {
    var aes_key = StrToBytes(key_hex);
    var iv = StrToBytes(key_hex.substring(0, 32));
    var cipherBytes = aesjs.utils.hex.toBytes(cipher_hex);
    var aesCbc = new aesjs.ModeOfOperation.cbc(aes_key, iv);
    var decryptedBytes = aesCbc.decrypt(cipherBytes);
    var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
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

/*string padding(16/32/48bytes)： using "?"*/
function padding_for_id(str) {
    var padding;
    var result;
    try {
        if (0 <= str.length && str.length <= 16) {
            padding = "????????????????";
            result = str + padding.substring(str.length);
        }
        if (16 < str.length && str.length <= 32) {
            padding = "????????????????????????????????";
            result = str + padding.substring(str.length);
        }
        if (32 < str.length && str.length <= 48) {
            padding = "????????????????????????????????????????????????";
            result = str + padding.substring(str.length);
        }
        if (str.length > 48) {
            throw 'Error!!!ID cannot be longer than 48 bytes.';
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

/*string unpadding: deleting "?"*/
function unpadding(str_16bytes) {
    var padding_place = str_16bytes.indexOf("?");
    return str_16bytes.substring(0, padding_place);
}