"use strict";
var qr = new QCodeDecoder();
if (!qr.isCanvasSupported() || !qr.hasGetUserMedia())throw alert("Your browser doesn't match the required specs."), new Error("Canvas and getUserMedia are required");
var elems = [{
    target: document.querySelector("#image img"),
    activator: document.querySelector("#image button"),
    decoder: qr.decodeFromImage
}, {
    target: document.querySelector("#video video"),
    activator: document.querySelector("#video button"),
    decoder: qr.decodeFromVideo
}, {
    target: document.querySelector("#camera video"),
    activator: document.querySelector("#camera button"),
    decoder: qr.decodeFromCamera
}];
elems.forEach(function (e) {
    e.activator.onclick = function (r) {
        r && r.preventDefault(), e.decoder.call(qr, e.target, function (e, r) {
            if (e)throw e;
            alert("Just decoded: " + r)
        }, !0)
    }
});
