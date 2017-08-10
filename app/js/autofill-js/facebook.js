// ==UserScript==
// @name         facebook - Autofill
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Autofill account information.
// @author       Peiyao Wu
// @match        https://www.facebook.com/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var result;
    window.addEventListener('message',function  (e) {
        if(e.origin=='http://localhost:8000'){
            console.log(e.origin,e.data);
            result=e.data;
            result=JSON.parse(result);
            login_form.email.value=result.username;
            login_form.pass.value=result.password;
        }
    });
})();