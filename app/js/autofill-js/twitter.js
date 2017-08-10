// ==UserScript==
// @name         twitter - Autofill
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Autofill account information.
// @author       Peiyao Wu
// @match        https://twitter.com/login
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var result;
    var auto_user;
    var auto_pass;
    window.addEventListener('message',function  (e) {
        if(e.origin=='http://localhost:8000'){
            console.log(e.origin,e.data);
            result=e.data;
            result=JSON.parse(result);
            auto_user=document.getElementsByName("session[username_or_email]");
            auto_pass=document.getElementsByName("session[password]");
            auto_user[1].value=result.username;
            auto_pass[1].value=result.password;
        }
    });
})();