var _aa = {};
_aa._ab = function (f, e) {
    var d = qrcode.width;
    var b = qrcode.height;
    var c = true;
    for (var g = 0; g < e.length && c; g += 2) {
        var a = Math.floor(e[g]);
        var h = Math.floor(e[g + 1]);
        if (a < -1 || a > d || h < -1 || h > b) {
            throw"Error._ab "
        }
        c = false;
        if (a == -1) {
            e[g] = 0;
            c = true
        } else {
            if (a == d) {
                e[g] = d - 1;
                c = true
            }
        }
        if (h == -1) {
            e[g + 1] = 0;
            c = true
        } else {
            if (h == b) {
                e[g + 1] = b - 1;
                c = true
            }
        }
    }
    c = true;
    for (var g = e.length - 2; g >= 0 && c; g -= 2) {
        var a = Math.floor(e[g]);
        var h = Math.floor(e[g + 1]);
        if (a < -1 || a > d || h < -1 || h > b) {
            throw"Error._ab "
        }
        c = false;
        if (a == -1) {
            e[g] = 0;
            c = true
        } else {
            if (a == d) {
                e[g] = d - 1;
                c = true
            }
        }
        if (h == -1) {
            e[g + 1] = 0;
            c = true
        } else {
            if (h == b) {
                e[g + 1] = b - 1;
                c = true
            }
        }
    }
};
_aa._af = function (b, d, a) {
    var k = new _ac(d);
    var j = new Array(d << 1);
    for (var f = 0; f < d; f++) {
        var g = j.length;
        var i = f + 0.5;
        for (var h = 0; h < g; h += 2) {
            j[h] = (h >> 1) + 0.5;
            j[h + 1] = i
        }
        a._ad(j);
        _aa._ab(b, j);
        try {
            for (var h = 0; h < g; h += 2) {
                var e = b[Math.floor(j[h]) + qrcode.width * Math.floor(j[h + 1])];
                if (e) {
                    k._dq(h >> 1, f)
                }
            }
        } catch (c) {
            throw"Error._ab"
        }
    }
    return k
};
_aa._ah = function (h, o, l, k, q, p, b, a, f, e, n, m, s, r, d, c, j, i) {
    var g = _ae._ag(l, k, q, p, b, a, f, e, n, m, s, r, d, c, j, i);
    return _aa._af(h, o, g)
};
function _a1(b, a) {
    this.count = b;
    this._fc = a;
    this.__defineGetter__("Count", function () {
        return this.count
    });
    this.__defineGetter__("_dm", function () {
        return this._fc
    })
}
function _a2(a, c, b) {
    this._bm = a;
    if (b) {
        this._do = new Array(c, b)
    } else {
        this._do = new Array(c)
    }
    this.__defineGetter__("_bo", function () {
        return this._bm
    });
    this.__defineGetter__("_dn", function () {
        return this._bm * this._fo
    });
    this.__defineGetter__("_fo", function () {
        var e = 0;
        for (var d = 0; d < this._do.length; d++) {
            e += this._do[d].length
        }
        return e
    });
    this._fb = function () {
        return this._do
    }
}
function _a3(k, l, h, g, f, e) {
    this._bs = k;
    this._ar = l;
    this._do = new Array(h, g, f, e);
    var j = 0;
    var b = h._bo;
    var a = h._fb();
    for (var d = 0; d < a.length; d++) {
        var c = a[d];
        j += c.Count * (c._dm + b)
    }
    this._br = j;
    this.__defineGetter__("_fd", function () {
        return this._bs
    });
    this.__defineGetter__("_as", function () {
        return this._ar
    });
    this.__defineGetter__("_dp", function () {
        return this._br
    });
    this.__defineGetter__("_cr", function () {
        return 17 + 4 * this._bs
    });
    this._aq = function () {
        var q = this._cr;
        var o = new _ac(q);
        o._bq(0, 0, 9, 9);
        o._bq(q - 8, 0, 8, 9);
        o._bq(0, q - 8, 9, 8);
        var n = this._ar.length;
        for (var m = 0; m < n; m++) {
            var p = this._ar[m] - 2;
            for (var r = 0; r < n; r++) {
                if ((m == 0 && (r == 0 || r == n - 1)) || (m == n - 1 && r == 0)) {
                    continue
                }
                o._bq(this._ar[r] - 2, p, 5, 5)
            }
        }
        o._bq(6, 9, 1, q - 17);
        o._bq(9, 6, q - 17, 1);
        if (this._bs > 6) {
            o._bq(q - 11, 0, 3, 6);
            o._bq(0, q - 11, 6, 3)
        }
        return o
    };
    this._bu = function (i) {
        return this._do[i.ordinal()]
    }
}
_a3._bv = new Array(31892, 34236, 39577, 42195, 48118, 51042, 55367, 58893, 63784, 68472, 70749, 76311, 79154, 84390, 87683, 92361, 96236, 102084, 102881, 110507, 110734, 117786, 119615, 126325, 127568, 133589, 136944, 141498, 145311, 150283, 152622, 158308, 161089, 167017);
_a3.VERSIONS = _ay();
_a3._av = function (a) {
    if (a < 1 || a > 40) {
        throw"bad arguments"
    }
    return _a3.VERSIONS[a - 1]
};
_a3._at = function (b) {
    if (b % 4 != 1) {
        throw"Error _at"
    }
    try {
        return _a3._av((b - 17) >> 2)
    } catch (a) {
        throw"Error _av"
    }
};
_a3._aw = function (d) {
    var b = 4294967295;
    var f = 0;
    for (var c = 0; c < _a3._bv.length; c++) {
        var a = _a3._bv[c];
        if (a == d) {
            return this._av(c + 7)
        }
        var e = _ax._gj(d, a);
        if (e < b) {
            f = c + 7;
            b = e
        }
    }
    if (b <= 3) {
        return this._av(f)
    }
    return null
};
function _ay() {
    return new Array(new _a3(1, new Array(), new _a2(7, new _a1(1, 19)), new _a2(10, new _a1(1, 16)), new _a2(13, new _a1(1, 13)), new _a2(17, new _a1(1, 9))), new _a3(2, new Array(6, 18), new _a2(10, new _a1(1, 34)), new _a2(16, new _a1(1, 28)), new _a2(22, new _a1(1, 22)), new _a2(28, new _a1(1, 16))), new _a3(3, new Array(6, 22), new _a2(15, new _a1(1, 55)), new _a2(26, new _a1(1, 44)), new _a2(18, new _a1(2, 17)), new _a2(22, new _a1(2, 13))), new _a3(4, new Array(6, 26), new _a2(20, new _a1(1, 80)), new _a2(18, new _a1(2, 32)), new _a2(26, new _a1(2, 24)), new _a2(16, new _a1(4, 9))), new _a3(5, new Array(6, 30), new _a2(26, new _a1(1, 108)), new _a2(24, new _a1(2, 43)), new _a2(18, new _a1(2, 15), new _a1(2, 16)), new _a2(22, new _a1(2, 11), new _a1(2, 12))), new _a3(6, new Array(6, 34), new _a2(18, new _a1(2, 68)), new _a2(16, new _a1(4, 27)), new _a2(24, new _a1(4, 19)), new _a2(28, new _a1(4, 15))), new _a3(7, new Array(6, 22, 38), new _a2(20, new _a1(2, 78)), new _a2(18, new _a1(4, 31)), new _a2(18, new _a1(2, 14), new _a1(4, 15)), new _a2(26, new _a1(4, 13), new _a1(1, 14))), new _a3(8, new Array(6, 24, 42), new _a2(24, new _a1(2, 97)), new _a2(22, new _a1(2, 38), new _a1(2, 39)), new _a2(22, new _a1(4, 18), new _a1(2, 19)), new _a2(26, new _a1(4, 14), new _a1(2, 15))), new _a3(9, new Array(6, 26, 46), new _a2(30, new _a1(2, 116)), new _a2(22, new _a1(3, 36), new _a1(2, 37)), new _a2(20, new _a1(4, 16), new _a1(4, 17)), new _a2(24, new _a1(4, 12), new _a1(4, 13))), new _a3(10, new Array(6, 28, 50), new _a2(18, new _a1(2, 68), new _a1(2, 69)), new _a2(26, new _a1(4, 43), new _a1(1, 44)), new _a2(24, new _a1(6, 19), new _a1(2, 20)), new _a2(28, new _a1(6, 15), new _a1(2, 16))), new _a3(11, new Array(6, 30, 54), new _a2(20, new _a1(4, 81)), new _a2(30, new _a1(1, 50), new _a1(4, 51)), new _a2(28, new _a1(4, 22), new _a1(4, 23)), new _a2(24, new _a1(3, 12), new _a1(8, 13))), new _a3(12, new Array(6, 32, 58), new _a2(24, new _a1(2, 92), new _a1(2, 93)), new _a2(22, new _a1(6, 36), new _a1(2, 37)), new _a2(26, new _a1(4, 20), new _a1(6, 21)), new _a2(28, new _a1(7, 14), new _a1(4, 15))), new _a3(13, new Array(6, 34, 62), new _a2(26, new _a1(4, 107)), new _a2(22, new _a1(8, 37), new _a1(1, 38)), new _a2(24, new _a1(8, 20), new _a1(4, 21)), new _a2(22, new _a1(12, 11), new _a1(4, 12))), new _a3(14, new Array(6, 26, 46, 66), new _a2(30, new _a1(3, 115), new _a1(1, 116)), new _a2(24, new _a1(4, 40), new _a1(5, 41)), new _a2(20, new _a1(11, 16), new _a1(5, 17)), new _a2(24, new _a1(11, 12), new _a1(5, 13))), new _a3(15, new Array(6, 26, 48, 70), new _a2(22, new _a1(5, 87), new _a1(1, 88)), new _a2(24, new _a1(5, 41), new _a1(5, 42)), new _a2(30, new _a1(5, 24), new _a1(7, 25)), new _a2(24, new _a1(11, 12), new _a1(7, 13))), new _a3(16, new Array(6, 26, 50, 74), new _a2(24, new _a1(5, 98), new _a1(1, 99)), new _a2(28, new _a1(7, 45), new _a1(3, 46)), new _a2(24, new _a1(15, 19), new _a1(2, 20)), new _a2(30, new _a1(3, 15), new _a1(13, 16))), new _a3(17, new Array(6, 30, 54, 78), new _a2(28, new _a1(1, 107), new _a1(5, 108)), new _a2(28, new _a1(10, 46), new _a1(1, 47)), new _a2(28, new _a1(1, 22), new _a1(15, 23)), new _a2(28, new _a1(2, 14), new _a1(17, 15))), new _a3(18, new Array(6, 30, 56, 82), new _a2(30, new _a1(5, 120), new _a1(1, 121)), new _a2(26, new _a1(9, 43), new _a1(4, 44)), new _a2(28, new _a1(17, 22), new _a1(1, 23)), new _a2(28, new _a1(2, 14), new _a1(19, 15))), new _a3(19, new Array(6, 30, 58, 86), new _a2(28, new _a1(3, 113), new _a1(4, 114)), new _a2(26, new _a1(3, 44), new _a1(11, 45)), new _a2(26, new _a1(17, 21), new _a1(4, 22)), new _a2(26, new _a1(9, 13), new _a1(16, 14))), new _a3(20, new Array(6, 34, 62, 90), new _a2(28, new _a1(3, 107), new _a1(5, 108)), new _a2(26, new _a1(3, 41), new _a1(13, 42)), new _a2(30, new _a1(15, 24), new _a1(5, 25)), new _a2(28, new _a1(15, 15), new _a1(10, 16))), new _a3(21, new Array(6, 28, 50, 72, 94), new _a2(28, new _a1(4, 116), new _a1(4, 117)), new _a2(26, new _a1(17, 42)), new _a2(28, new _a1(17, 22), new _a1(6, 23)), new _a2(30, new _a1(19, 16), new _a1(6, 17))), new _a3(22, new Array(6, 26, 50, 74, 98), new _a2(28, new _a1(2, 111), new _a1(7, 112)), new _a2(28, new _a1(17, 46)), new _a2(30, new _a1(7, 24), new _a1(16, 25)), new _a2(24, new _a1(34, 13))), new _a3(23, new Array(6, 30, 54, 74, 102), new _a2(30, new _a1(4, 121), new _a1(5, 122)), new _a2(28, new _a1(4, 47), new _a1(14, 48)), new _a2(30, new _a1(11, 24), new _a1(14, 25)), new _a2(30, new _a1(16, 15), new _a1(14, 16))), new _a3(24, new Array(6, 28, 54, 80, 106), new _a2(30, new _a1(6, 117), new _a1(4, 118)), new _a2(28, new _a1(6, 45), new _a1(14, 46)), new _a2(30, new _a1(11, 24), new _a1(16, 25)), new _a2(30, new _a1(30, 16), new _a1(2, 17))), new _a3(25, new Array(6, 32, 58, 84, 110), new _a2(26, new _a1(8, 106), new _a1(4, 107)), new _a2(28, new _a1(8, 47), new _a1(13, 48)), new _a2(30, new _a1(7, 24), new _a1(22, 25)), new _a2(30, new _a1(22, 15), new _a1(13, 16))), new _a3(26, new Array(6, 30, 58, 86, 114), new _a2(28, new _a1(10, 114), new _a1(2, 115)), new _a2(28, new _a1(19, 46), new _a1(4, 47)), new _a2(28, new _a1(28, 22), new _a1(6, 23)), new _a2(30, new _a1(33, 16), new _a1(4, 17))), new _a3(27, new Array(6, 34, 62, 90, 118), new _a2(30, new _a1(8, 122), new _a1(4, 123)), new _a2(28, new _a1(22, 45), new _a1(3, 46)), new _a2(30, new _a1(8, 23), new _a1(26, 24)), new _a2(30, new _a1(12, 15), new _a1(28, 16))), new _a3(28, new Array(6, 26, 50, 74, 98, 122), new _a2(30, new _a1(3, 117), new _a1(10, 118)), new _a2(28, new _a1(3, 45), new _a1(23, 46)), new _a2(30, new _a1(4, 24), new _a1(31, 25)), new _a2(30, new _a1(11, 15), new _a1(31, 16))), new _a3(29, new Array(6, 30, 54, 78, 102, 126), new _a2(30, new _a1(7, 116), new _a1(7, 117)), new _a2(28, new _a1(21, 45), new _a1(7, 46)), new _a2(30, new _a1(1, 23), new _a1(37, 24)), new _a2(30, new _a1(19, 15), new _a1(26, 16))), new _a3(30, new Array(6, 26, 52, 78, 104, 130), new _a2(30, new _a1(5, 115), new _a1(10, 116)), new _a2(28, new _a1(19, 47), new _a1(10, 48)), new _a2(30, new _a1(15, 24), new _a1(25, 25)), new _a2(30, new _a1(23, 15), new _a1(25, 16))), new _a3(31, new Array(6, 30, 56, 82, 108, 134), new _a2(30, new _a1(13, 115), new _a1(3, 116)), new _a2(28, new _a1(2, 46), new _a1(29, 47)), new _a2(30, new _a1(42, 24), new _a1(1, 25)), new _a2(30, new _a1(23, 15), new _a1(28, 16))), new _a3(32, new Array(6, 34, 60, 86, 112, 138), new _a2(30, new _a1(17, 115)), new _a2(28, new _a1(10, 46), new _a1(23, 47)), new _a2(30, new _a1(10, 24), new _a1(35, 25)), new _a2(30, new _a1(19, 15), new _a1(35, 16))), new _a3(33, new Array(6, 30, 58, 86, 114, 142), new _a2(30, new _a1(17, 115), new _a1(1, 116)), new _a2(28, new _a1(14, 46), new _a1(21, 47)), new _a2(30, new _a1(29, 24), new _a1(19, 25)), new _a2(30, new _a1(11, 15), new _a1(46, 16))), new _a3(34, new Array(6, 34, 62, 90, 118, 146), new _a2(30, new _a1(13, 115), new _a1(6, 116)), new _a2(28, new _a1(14, 46), new _a1(23, 47)), new _a2(30, new _a1(44, 24), new _a1(7, 25)), new _a2(30, new _a1(59, 16), new _a1(1, 17))), new _a3(35, new Array(6, 30, 54, 78, 102, 126, 150), new _a2(30, new _a1(12, 121), new _a1(7, 122)), new _a2(28, new _a1(12, 47), new _a1(26, 48)), new _a2(30, new _a1(39, 24), new _a1(14, 25)), new _a2(30, new _a1(22, 15), new _a1(41, 16))), new _a3(36, new Array(6, 24, 50, 76, 102, 128, 154), new _a2(30, new _a1(6, 121), new _a1(14, 122)), new _a2(28, new _a1(6, 47), new _a1(34, 48)), new _a2(30, new _a1(46, 24), new _a1(10, 25)), new _a2(30, new _a1(2, 15), new _a1(64, 16))), new _a3(37, new Array(6, 28, 54, 80, 106, 132, 158), new _a2(30, new _a1(17, 122), new _a1(4, 123)), new _a2(28, new _a1(29, 46), new _a1(14, 47)), new _a2(30, new _a1(49, 24), new _a1(10, 25)), new _a2(30, new _a1(24, 15), new _a1(46, 16))), new _a3(38, new Array(6, 32, 58, 84, 110, 136, 162), new _a2(30, new _a1(4, 122), new _a1(18, 123)), new _a2(28, new _a1(13, 46), new _a1(32, 47)), new _a2(30, new _a1(48, 24), new _a1(14, 25)), new _a2(30, new _a1(42, 15), new _a1(32, 16))), new _a3(39, new Array(6, 26, 54, 82, 110, 138, 166), new _a2(30, new _a1(20, 117), new _a1(4, 118)), new _a2(28, new _a1(40, 47), new _a1(7, 48)), new _a2(30, new _a1(43, 24), new _a1(22, 25)), new _a2(30, new _a1(10, 15), new _a1(67, 16))), new _a3(40, new Array(6, 30, 58, 86, 114, 142, 170), new _a2(30, new _a1(19, 118), new _a1(6, 119)), new _a2(28, new _a1(18, 47), new _a1(31, 48)), new _a2(30, new _a1(34, 24), new _a1(34, 25)), new _a2(30, new _a1(20, 15), new _a1(61, 16))))
}
function _ae(i, f, c, h, e, b, g, d, a) {
    this.a11 = i;
    this.a12 = h;
    this.a13 = g;
    this.a21 = f;
    this.a22 = e;
    this.a23 = d;
    this.a31 = c;
    this.a32 = b;
    this.a33 = a;
    this._ad = function (v) {
        var s = v.length;
        var z = this.a11;
        var w = this.a12;
        var u = this.a13;
        var q = this.a21;
        var p = this.a22;
        var o = this.a23;
        var m = this.a31;
        var k = this.a32;
        var j = this.a33;
        for (var n = 0; n < s; n += 2) {
            var t = v[n];
            var r = v[n + 1];
            var l = u * t + o * r + j;
            v[n] = (z * t + q * r + m) / l;
            v[n + 1] = (w * t + p * r + k) / l
        }
    };
    this._fp = function (m, k) {
        var q = m.length;
        for (var l = 0; l < q; l++) {
            var j = m[l];
            var p = k[l];
            var o = this.a13 * j + this.a23 * p + this.a33;
            m[l] = (this.a11 * j + this.a21 * p + this.a31) / o;
            k[l] = (this.a12 * j + this.a22 * p + this.a32) / o
        }
    };
    this._fr = function () {
        return new _ae(this.a22 * this.a33 - this.a23 * this.a32, this.a23 * this.a31 - this.a21 * this.a33, this.a21 * this.a32 - this.a22 * this.a31, this.a13 * this.a32 - this.a12 * this.a33, this.a11 * this.a33 - this.a13 * this.a31, this.a12 * this.a31 - this.a11 * this.a32, this.a12 * this.a23 - this.a13 * this.a22, this.a13 * this.a21 - this.a11 * this.a23, this.a11 * this.a22 - this.a12 * this.a21)
    };
    this.times = function (j) {
        return new _ae(this.a11 * j.a11 + this.a21 * j.a12 + this.a31 * j.a13, this.a11 * j.a21 + this.a21 * j.a22 + this.a31 * j.a23, this.a11 * j.a31 + this.a21 * j.a32 + this.a31 * j.a33, this.a12 * j.a11 + this.a22 * j.a12 + this.a32 * j.a13, this.a12 * j.a21 + this.a22 * j.a22 + this.a32 * j.a23, this.a12 * j.a31 + this.a22 * j.a32 + this.a32 * j.a33, this.a13 * j.a11 + this.a23 * j.a12 + this.a33 * j.a13, this.a13 * j.a21 + this.a23 * j.a22 + this.a33 * j.a23, this.a13 * j.a31 + this.a23 * j.a32 + this.a33 * j.a33)
    }
}
_ae._ag = function (p, e, o, d, n, c, m, b, h, q, l, f, a, j, i, r) {
    var g = this._be(p, e, o, d, n, c, m, b);
    var k = this._bf(h, q, l, f, a, j, i, r);
    return k.times(g)
};
_ae._bf = function (d, p, c, m, b, k, a, j) {
    var h = j - k;
    var f = p - m + k - j;
    if (h == 0 && f == 0) {
        return new _ae(c - d, b - c, d, m - p, k - m, p, 0, 0, 1)
    } else {
        var q = c - b;
        var o = a - b;
        var l = d - c + b - a;
        var i = m - k;
        var e = q * h - o * i;
        var n = (l * h - o * f) / e;
        var g = (q * f - l * i) / e;
        return new _ae(c - d + n * c, a - d + g * a, d, m - p + n * m, j - p + g * j, p, n, g, 1)
    }
};
_ae._be = function (f, h, d, g, b, e, a, c) {
    return this._bf(f, h, d, g, b, e, a, c)._fr()
};
function _bg(b, a) {
    this.bits = b;
    this.points = a
}
function Detector(a) {
    this.image = a;
    this._am = null;
    this._bi = function (m, l, c, b) {
        var d = Math.abs(b - l) > Math.abs(c - m);
        if (d) {
            var r = m;
            m = l;
            l = r;
            r = c;
            c = b;
            b = r
        }
        var j = Math.abs(c - m);
        var i = Math.abs(b - l);
        var p = -j >> 1;
        var u = l < b ? 1 : -1;
        var f = m < c ? 1 : -1;
        var e = 0;
        for (var h = m, g = l; h != c; h += f) {
            var t = d ? g : h;
            var s = d ? h : g;
            if (e == 1) {
                if (this.image[t + s * qrcode.width]) {
                    e++
                }
            } else {
                if (!this.image[t + s * qrcode.width]) {
                    e++
                }
            }
            if (e == 3) {
                var o = h - m;
                var n = g - l;
                return Math.sqrt((o * o + n * n))
            }
            p += i;
            if (p > 0) {
                if (g == b) {
                    break
                }
                g += u;
                p -= j
            }
        }
        var k = c - m;
        var q = b - l;
        return Math.sqrt((k * k + q * q))
    };
    this._bh = function (i, g, h, f) {
        var b = this._bi(i, g, h, f);
        var e = 1;
        var d = i - (h - i);
        if (d < 0) {
            e = i / (i - d);
            d = 0
        } else {
            if (d >= qrcode.width) {
                e = (qrcode.width - 1 - i) / (d - i);
                d = qrcode.width - 1
            }
        }
        var c = Math.floor(g - (f - g) * e);
        e = 1;
        if (c < 0) {
            e = g / (g - c);
            c = 0
        } else {
            if (c >= qrcode.height) {
                e = (qrcode.height - 1 - g) / (c - g);
                c = qrcode.height - 1
            }
        }
        d = Math.floor(i + (d - i) * e);
        b += this._bi(i, g, d, c);
        return b - 1
    };
    this._bj = function (c, d) {
        var b = this._bh(Math.floor(c.X), Math.floor(c.Y), Math.floor(d.X), Math.floor(d.Y));
        var e = this._bh(Math.floor(d.X), Math.floor(d.Y), Math.floor(c.X), Math.floor(c.Y));
        if (isNaN(b)) {
            return e / 7
        }
        if (isNaN(e)) {
            return b / 7
        }
        return (b + e) / 14
    };
    this._bk = function (d, c, b) {
        return (this._bj(d, c) + this._bj(d, b)) / 2
    };
    this.distance = function (d, b) {
        var e = d.X - b.X;
        var c = d.Y - b.Y;
        return Math.sqrt((e * e + c * c))
    };
    this._bx = function (g, f, d, e) {
        var b = Math.round(this.distance(g, f) / e);
        var c = Math.round(this.distance(g, d) / e);
        var h = ((b + c) >> 1) + 7;
        switch (h & 3) {
            case 0:
                h++;
                break;
            case 2:
                h--;
                break;
            case 3:
                throw"Error"
        }
        return h
    };
    this._bl = function (g, f, d, j) {
        var k = Math.floor(j * g);
        var h = Math.max(0, f - k);
        var i = Math.min(qrcode.width - 1, f + k);
        if (i - h < g * 3) {
            throw"Error"
        }
        var b = Math.max(0, d - k);
        var c = Math.min(qrcode.height - 1, d + k);
        var e = new _ak(this.image, h, b, i - h, c - b, g, this._am);
        return e.find()
    };
    this.createTransform = function (l, h, k, b, g) {
        var j = g - 3.5;
        var i;
        var f;
        var e;
        var c;
        if (b != null) {
            i = b.X;
            f = b.Y;
            e = c = j - 3
        } else {
            i = (h.X - l.X) + k.X;
            f = (h.Y - l.Y) + k.Y;
            e = c = j
        }
        var d = _ae._ag(3.5, 3.5, j, 3.5, e, c, 3.5, j, l.X, l.Y, h.X, h.Y, i, f, k.X, k.Y);
        return d
    };
    this._bz = function (e, b, d) {
        var c = _aa;
        return c._af(e, d, b)
    };
    this._cd = function (q) {
        var j = q._gq;
        var h = q._gs;
        var n = q._gp;
        var d = this._bk(j, h, n);
        if (d < 1) {
            throw"Error"
        }
        var r = this._bx(j, h, n, d);
        var b = _a3._at(r);
        var k = b._cr - 7;
        var l = null;
        if (b._as.length > 0) {
            var f = h.X - j.X + n.X;
            var e = h.Y - j.Y + n.Y;
            var c = 1 - 3 / k;
            var t = Math.floor(j.X + c * (f - j.X));
            var s = Math.floor(j.Y + c * (e - j.Y));
            for (var p = 4; p <= 16; p <<= 1) {
                l = this._bl(d, t, s, p);
                break
            }
        }
        var g = this.createTransform(j, h, n, l, r);
        var m = this._bz(this.image, g, r);
        var o;
        if (l == null) {
            o = new Array(n, j, h)
        } else {
            o = new Array(n, j, h, l)
        }
        return new _bg(m, o)
    };
    this.detect = function () {
        var b = new _cc()._ce(this.image);
        return this._cd(b)
    }
}
var _ca = 21522;
var _cb = new Array(new Array(21522, 0), new Array(20773, 1), new Array(24188, 2), new Array(23371, 3), new Array(17913, 4), new Array(16590, 5), new Array(20375, 6), new Array(19104, 7), new Array(30660, 8), new Array(29427, 9), new Array(32170, 10), new Array(30877, 11), new Array(26159, 12), new Array(25368, 13), new Array(27713, 14), new Array(26998, 15), new Array(5769, 16), new Array(5054, 17), new Array(7399, 18), new Array(6608, 19), new Array(1890, 20), new Array(597, 21), new Array(3340, 22), new Array(2107, 23), new Array(13663, 24), new Array(12392, 25), new Array(16177, 26), new Array(14854, 27), new Array(9396, 28), new Array(8579, 29), new Array(11994, 30), new Array(11245, 31));
var _ch = new Array(0, 1, 1, 2, 1, 2, 2, 3, 1, 2, 2, 3, 2, 3, 3, 4);
function _ax(a) {
    this._cf = _cg.forBits((a >> 3) & 3);
    this._fe = (a & 7);
    this.__defineGetter__("_cg", function () {
        return this._cf
    });
    this.__defineGetter__("_dx", function () {
        return this._fe
    });
    this.GetHashCode = function () {
        return (this._cf.ordinal() << 3) | this._fe
    };
    this.Equals = function (c) {
        var b = c;
        return this._cf == b._cf && this._fe == b._fe
    }
}
_ax._gj = function (d, c) {
    d ^= c;
    return _ch[d & 15] + _ch[(_ew(d, 4) & 15)] + _ch[(_ew(d, 8) & 15)] + _ch[(_ew(d, 12) & 15)] + _ch[(_ew(d, 16) & 15)] + _ch[(_ew(d, 20) & 15)] + _ch[(_ew(d, 24) & 15)] + _ch[(_ew(d, 28) & 15)]
};
_ax._ci = function (a) {
    var b = _ax._cj(a);
    if (b != null) {
        return b
    }
    return _ax._cj(a ^ _ca)
};
_ax._cj = function (d) {
    var b = 4294967295;
    var a = 0;
    for (var c = 0; c < _cb.length; c++) {
        var g = _cb[c];
        var f = g[0];
        if (f == d) {
            return new _ax(g[1])
        }
        var e = this._gj(d, f);
        if (e < b) {
            a = g[1];
            b = e
        }
    }
    if (b <= 3) {
        return new _ax(a)
    }
    return null
};
function _cg(a, c, b) {
    this._ff = a;
    this.bits = c;
    this.name = b;
    this.__defineGetter__("Bits", function () {
        return this.bits
    });
    this.__defineGetter__("Name", function () {
        return this.name
    });
    this.ordinal = function () {
        return this._ff
    }
}
_cg.forBits = function (a) {
    if (a < 0 || a >= FOR_BITS.length) {
        throw"bad arguments"
    }
    return FOR_BITS[a]
};
var L = new _cg(0, 1, "L");
var M = new _cg(1, 0, "M");
var Q = new _cg(2, 3, "Q");
var H = new _cg(3, 2, "H");
var FOR_BITS = new Array(M, L, H, Q);
function _ac(d, a) {
    if (!a) {
        a = d
    }
    if (d < 1 || a < 1) {
        throw"Both dimensions must be greater than 0"
    }
    this.width = d;
    this.height = a;
    var c = d >> 5;
    if ((d & 31) != 0) {
        c++
    }
    this.rowSize = c;
    this.bits = new Array(c * a);
    for (var b = 0; b < this.bits.length; b++) {
        this.bits[b] = 0
    }
    this.__defineGetter__("Width", function () {
        return this.width
    });
    this.__defineGetter__("Height", function () {
        return this.height
    });
    this.__defineGetter__("Dimension", function () {
        if (this.width != this.height) {
            throw"Can't call getDimension() on a non-square matrix"
        }
        return this.width
    });
    this._ds = function (e, g) {
        var f = g * this.rowSize + (e >> 5);
        return ((_ew(this.bits[f], (e & 31))) & 1) != 0
    };
    this._dq = function (e, g) {
        var f = g * this.rowSize + (e >> 5);
        this.bits[f] |= 1 << (e & 31)
    };
    this.flip = function (e, g) {
        var f = g * this.rowSize + (e >> 5);
        this.bits[f] ^= 1 << (e & 31)
    };
    this.clear = function () {
        var e = this.bits.length;
        for (var f = 0; f < e; f++) {
            this.bits[f] = 0
        }
    };
    this._bq = function (g, j, f, m) {
        if (j < 0 || g < 0) {
            throw"Left and top must be nonnegative"
        }
        if (m < 1 || f < 1) {
            throw"Height and width must be at least 1"
        }
        var l = g + f;
        var e = j + m;
        if (e > this.height || l > this.width) {
            throw"The region must fit inside the matrix"
        }
        for (var i = j; i < e; i++) {
            var h = i * this.rowSize;
            for (var k = g; k < l; k++) {
                this.bits[h + (k >> 5)] |= 1 << (k & 31)
            }
        }
    }
}
function _dl(a, b) {
    this._dv = a;
    this._dw = b;
    this.__defineGetter__("_du", function () {
        return this._dv
    });
    this.__defineGetter__("Codewords", function () {
        return this._dw
    })
}
_dl._gn = function (c, h, r) {
    if (c.length != h._dp) {
        throw"bad arguments"
    }
    var k = h._bu(r);
    var e = 0;
    var d = k._fb();
    for (var q = 0; q < d.length; q++) {
        e += d[q].Count
    }
    var l = new Array(e);
    var n = 0;
    for (var o = 0; o < d.length; o++) {
        var f = d[o];
        for (var q = 0; q < f.Count; q++) {
            var m = f._dm;
            var s = k._bo + m;
            l[n++] = new _dl(m, new Array(s))
        }
    }
    var t = l[0]._dw.length;
    var b = l.length - 1;
    while (b >= 0) {
        var v = l[b]._dw.length;
        if (v == t) {
            break
        }
        b--
    }
    b++;
    var g = t - k._bo;
    var a = 0;
    for (var q = 0; q < g; q++) {
        for (var o = 0; o < n; o++) {
            l[o]._dw[q] = c[a++]
        }
    }
    for (var o = b; o < n; o++) {
        l[o]._dw[g] = c[a++]
    }
    var p = l[0]._dw.length;
    for (var q = g; q < p; q++) {
        for (var o = 0; o < n; o++) {
            var u = o < b ? q : q + 1;
            l[o]._dw[u] = c[a++]
        }
    }
    return l
};
function _cl(a) {
    var b = a.Dimension;
    if (b < 21 || (b & 3) != 1) {
        throw"Error _cl"
    }
    this._au = a;
    this._cp = null;
    this._co = null;
    this._dk = function (d, c, e) {
        return this._au._ds(d, c) ? (e << 1) | 1 : e << 1
    };
    this._cm = function () {
        if (this._co != null) {
            return this._co
        }
        var g = 0;
        for (var e = 0; e < 6; e++) {
            g = this._dk(e, 8, g)
        }
        g = this._dk(7, 8, g);
        g = this._dk(8, 8, g);
        g = this._dk(8, 7, g);
        for (var c = 5; c >= 0; c--) {
            g = this._dk(8, c, g)
        }
        this._co = _ax._ci(g);
        if (this._co != null) {
            return this._co
        }
        var f = this._au.Dimension;
        g = 0;
        var d = f - 8;
        for (var e = f - 1; e >= d; e--) {
            g = this._dk(e, 8, g)
        }
        for (var c = f - 7; c < f; c++) {
            g = this._dk(8, c, g)
        }
        this._co = _ax._ci(g);
        if (this._co != null) {
            return this._co
        }
        throw"Error _cm"
    };
    this._cq = function () {
        if (this._cp != null) {
            return this._cp
        }
        var h = this._au.Dimension;
        var f = (h - 17) >> 2;
        if (f <= 6) {
            return _a3._av(f)
        }
        var g = 0;
        var e = h - 11;
        for (var c = 5; c >= 0; c--) {
            for (var d = h - 9; d >= e; d--) {
                g = this._dk(d, c, g)
            }
        }
        this._cp = _a3._aw(g);
        if (this._cp != null && this._cp._cr == h) {
            return this._cp
        }
        g = 0;
        for (var d = 5; d >= 0; d--) {
            for (var c = h - 9; c >= e; c--) {
                g = this._dk(d, c, g)
            }
        }
        this._cp = _a3._aw(g);
        if (this._cp != null && this._cp._cr == h) {
            return this._cp
        }
        throw"Error _cq"
    };
    this._gk = function () {
        var q = this._cm();
        var o = this._cq();
        var c = _dx._gl(q._dx);
        var f = this._au.Dimension;
        c._dj(this._au, f);
        var k = o._aq();
        var n = true;
        var r = new Array(o._dp);
        var m = 0;
        var p = 0;
        var h = 0;
        for (var e = f - 1; e > 0; e -= 2) {
            if (e == 6) {
                e--
            }
            for (var l = 0; l < f; l++) {
                var g = n ? f - 1 - l : l;
                for (var d = 0; d < 2; d++) {
                    if (!k._ds(e - d, g)) {
                        h++;
                        p <<= 1;
                        if (this._au._ds(e - d, g)) {
                            p |= 1
                        }
                        if (h == 8) {
                            r[m++] = p;
                            h = 0;
                            p = 0
                        }
                    }
                }
            }
            n ^= true
        }
        if (m != o._dp) {
            throw"Error _gk"
        }
        return r
    }
}
var _dx = {};
_dx._gl = function (a) {
    if (a < 0 || a > 7) {
        throw"bad arguments"
    }
    return _dx._dy[a]
};
function _fg() {
    this._dj = function (c, d) {
        for (var b = 0; b < d; b++) {
            for (var a = 0; a < d; a++) {
                if (this._fw(b, a)) {
                    c.flip(a, b)
                }
            }
        }
    };
    this._fw = function (b, a) {
        return ((b + a) & 1) == 0
    }
}
function _fh() {
    this._dj = function (c, d) {
        for (var b = 0; b < d; b++) {
            for (var a = 0; a < d; a++) {
                if (this._fw(b, a)) {
                    c.flip(a, b)
                }
            }
        }
    };
    this._fw = function (b, a) {
        return (b & 1) == 0
    }
}
function _fi() {
    this._dj = function (c, d) {
        for (var b = 0; b < d; b++) {
            for (var a = 0; a < d; a++) {
                if (this._fw(b, a)) {
                    c.flip(a, b)
                }
            }
        }
    };
    this._fw = function (b, a) {
        return a % 3 == 0
    }
}
function _fj() {
    this._dj = function (c, d) {
        for (var b = 0; b < d; b++) {
            for (var a = 0; a < d; a++) {
                if (this._fw(b, a)) {
                    c.flip(a, b)
                }
            }
        }
    };
    this._fw = function (b, a) {
        return (b + a) % 3 == 0
    }
}
function _fk() {
    this._dj = function (c, d) {
        for (var b = 0; b < d; b++) {
            for (var a = 0; a < d; a++) {
                if (this._fw(b, a)) {
                    c.flip(a, b)
                }
            }
        }
    };
    this._fw = function (b, a) {
        return (((_ew(b, 1)) + (a / 3)) & 1) == 0
    }
}
function _fl() {
    this._dj = function (c, d) {
        for (var b = 0; b < d; b++) {
            for (var a = 0; a < d; a++) {
                if (this._fw(b, a)) {
                    c.flip(a, b)
                }
            }
        }
    };
    this._fw = function (c, b) {
        var a = c * b;
        return (a & 1) + (a % 3) == 0
    }
}
function _fm() {
    this._dj = function (c, d) {
        for (var b = 0; b < d; b++) {
            for (var a = 0; a < d; a++) {
                if (this._fw(b, a)) {
                    c.flip(a, b)
                }
            }
        }
    };
    this._fw = function (c, b) {
        var a = c * b;
        return (((a & 1) + (a % 3)) & 1) == 0
    }
}
function _fn() {
    this._dj = function (c, d) {
        for (var b = 0; b < d; b++) {
            for (var a = 0; a < d; a++) {
                if (this._fw(b, a)) {
                    c.flip(a, b)
                }
            }
        }
    };
    this._fw = function (b, a) {
        return ((((b + a) & 1) + ((b * a) % 3)) & 1) == 0
    }
}
_dx._dy = new Array(new _fg(), new _fh(), new _fi(), new _fj(), new _fk(), new _fl(), new _fm(), new _fn());
function _db(a) {
    this._fa = a;
    this.decode = function (j, f) {
        var c = new _bp(this._fa, j);
        var p = new Array(f);
        for (var g = 0; g < p.length; g++) {
            p[g] = 0
        }
        var m = false;
        var d = true;
        for (var g = 0; g < f; g++) {
            var q = c.evaluateAt(this._fa.exp(m ? g + 1 : g));
            p[p.length - 1 - g] = q;
            if (q != 0) {
                d = false
            }
        }
        if (d) {
            return
        }
        var b = new _bp(this._fa, p);
        var l = this._eb(this._fa._ba(f, 1), b, f);
        var o = l[0];
        var n = l[1];
        var k = this._ey(o);
        var e = this._di(n, k, m);
        for (var g = 0; g < k.length; g++) {
            var h = j.length - 1 - this._fa.log(k[g]);
            if (h < 0) {
                throw"ReedSolomonException Bad error location"
            }
            j[h] = _az._bd(j[h], e[g])
        }
    };
    this._eb = function (z, y, f) {
        if (z._ec < y._ec) {
            var w = z;
            z = y;
            y = w
        }
        var B = z;
        var k = y;
        var o = this._fa.One;
        var j = this._fa.Zero;
        var e = this._fa.Zero;
        var i = this._fa.One;
        while (k._ec >= Math.floor(f / 2)) {
            var x = B;
            var g = o;
            var v = e;
            B = k;
            o = j;
            e = i;
            if (B.Zero) {
                throw"r_{i-1} was zero"
            }
            k = x;
            var m = this._fa.Zero;
            var p = B._ex(B._ec);
            var h = this._fa.inverse(p);
            while (k._ec >= B._ec && !k.Zero) {
                var c = k._ec - B._ec;
                var A = this._fa.multiply(k._ex(k._ec), h);
                m = m._bd(this._fa._ba(c, A));
                k = k._bd(B._dc(c, A))
            }
            j = m.multiply1(o)._bd(g);
            i = m.multiply1(e)._bd(v)
        }
        var u = i._ex(0);
        if (u == 0) {
            throw"ReedSolomonException sigmaTilde(0) was zero"
        }
        var d = this._fa.inverse(u);
        var n = i.multiply2(d);
        var l = k.multiply2(d);
        return new Array(n, l)
    };
    this._ey = function (f) {
        var g = f._ec;
        if (g == 1) {
            return new Array(f._ex(1))
        }
        var b = new Array(g);
        var d = 0;
        for (var c = 1; c < 256 && d < g; c++) {
            if (f.evaluateAt(c) == 0) {
                b[d] = this._fa.inverse(c);
                d++
            }
        }
        if (d != g) {
            throw"Error locator degree does not match number of roots"
        }
        return b
    };
    this._di = function (f, h, g) {
        var k = h.length;
        var l = new Array(k);
        for (var e = 0; e < k; e++) {
            var b = this._fa.inverse(h[e]);
            var c = 1;
            for (var d = 0; d < k; d++) {
                if (e != d) {
                    c = this._fa.multiply(c, _az._bd(1, this._fa.multiply(h[d], b)))
                }
            }
            l[e] = this._fa.multiply(f.evaluateAt(b), this._fa.inverse(c));
            if (g) {
                l[e] = this._fa.multiply(l[e], b)
            }
        }
        return l
    }
}
function _bp(f, e) {
    if (e == null || e.length == 0) {
        throw"bad arguments"
    }
    this._fa = f;
    var c = e.length;
    if (c > 1 && e[0] == 0) {
        var d = 1;
        while (d < c && e[d] == 0) {
            d++
        }
        if (d == c) {
            this._dd = f.Zero._dd
        } else {
            this._dd = new Array(c - d);
            for (var b = 0; b < this._dd.length; b++) {
                this._dd[b] = 0
            }
            for (var a = 0; a < this._dd.length; a++) {
                this._dd[a] = e[d + a]
            }
        }
    } else {
        this._dd = e
    }
    this.__defineGetter__("Zero", function () {
        return this._dd[0] == 0
    });
    this.__defineGetter__("_ec", function () {
        return this._dd.length - 1
    });
    this.__defineGetter__("Coefficients", function () {
        return this._dd
    });
    this._ex = function (g) {
        return this._dd[this._dd.length - 1 - g]
    };
    this.evaluateAt = function (h) {
        if (h == 0) {
            return this._ex(0)
        }
        var l = this._dd.length;
        if (h == 1) {
            var g = 0;
            for (var k = 0; k < l; k++) {
                g = _az._bd(g, this._dd[k])
            }
            return g
        }
        var j = this._dd[0];
        for (var k = 1; k < l; k++) {
            j = _az._bd(this._fa.multiply(h, j), this._dd[k])
        }
        return j
    };
    this._bd = function (g) {
        if (this._fa != g._fa) {
            throw"GF256Polys do not have same _az _fa"
        }
        if (this.Zero) {
            return g
        }
        if (g.Zero) {
            return this
        }
        var o = this._dd;
        var n = g._dd;
        if (o.length > n.length) {
            var j = o;
            o = n;
            n = j
        }
        var h = new Array(n.length);
        var k = n.length - o.length;
        for (var m = 0; m < k; m++) {
            h[m] = n[m]
        }
        for (var l = k; l < n.length; l++) {
            h[l] = _az._bd(o[l - k], n[l])
        }
        return new _bp(f, h)
    };
    this.multiply1 = function (o) {
        if (this._fa != o._fa) {
            throw"GF256Polys do not have same _az _fa"
        }
        if (this.Zero || o.Zero) {
            return this._fa.Zero
        }
        var q = this._dd;
        var g = q.length;
        var l = o._dd;
        var n = l.length;
        var p = new Array(g + n - 1);
        for (var m = 0; m < g; m++) {
            var h = q[m];
            for (var k = 0; k < n; k++) {
                p[m + k] = _az._bd(p[m + k], this._fa.multiply(h, l[k]))
            }
        }
        return new _bp(this._fa, p)
    };
    this.multiply2 = function (g) {
        if (g == 0) {
            return this._fa.Zero
        }
        if (g == 1) {
            return this
        }
        var j = this._dd.length;
        var k = new Array(j);
        for (var h = 0; h < j; h++) {
            k[h] = this._fa.multiply(this._dd[h], g)
        }
        return new _bp(this._fa, k)
    };
    this._dc = function (l, g) {
        if (l < 0) {
            throw"bad arguments"
        }
        if (g == 0) {
            return this._fa.Zero
        }
        var j = this._dd.length;
        var k = new Array(j + l);
        for (var h = 0; h < k.length; h++) {
            k[h] = 0
        }
        for (var h = 0; h < j; h++) {
            k[h] = this._fa.multiply(this._dd[h], g)
        }
        return new _bp(this._fa, k)
    };
    this.divide = function (l) {
        if (this._fa != l._fa) {
            throw"GF256Polys do not have same _az _fa"
        }
        if (l.Zero) {
            throw"Divide by 0"
        }
        var j = this._fa.Zero;
        var o = this;
        var g = l._ex(l._ec);
        var n = this._fa.inverse(g);
        while (o._ec >= l._ec && !o.Zero) {
            var m = o._ec - l._ec;
            var h = this._fa.multiply(o._ex(o._ec), n);
            var i = l._dc(m, h);
            var k = this._fa._ba(m, h);
            j = j._bd(k);
            o = o._bd(i)
        }
        return new Array(j, o)
    }
}
function _az(b) {
    this._gh = new Array(256);
    this._gi = new Array(256);
    var a = 1;
    for (var e = 0; e < 256; e++) {
        this._gh[e] = a;
        a <<= 1;
        if (a >= 256) {
            a ^= b
        }
    }
    for (var e = 0; e < 255; e++) {
        this._gi[this._gh[e]] = e
    }
    var d = new Array(1);
    d[0] = 0;
    this.zero = new _bp(this, new Array(d));
    var c = new Array(1);
    c[0] = 1;
    this.one = new _bp(this, new Array(c));
    this.__defineGetter__("Zero", function () {
        return this.zero
    });
    this.__defineGetter__("One", function () {
        return this.one
    });
    this._ba = function (j, f) {
        if (j < 0) {
            throw"bad arguments"
        }
        if (f == 0) {
            return this.zero
        }
        var h = new Array(j + 1);
        for (var g = 0; g < h.length; g++) {
            h[g] = 0
        }
        h[0] = f;
        return new _bp(this, h)
    };
    this.exp = function (f) {
        return this._gh[f]
    };
    this.log = function (f) {
        if (f == 0) {
            throw"bad arguments"
        }
        return this._gi[f]
    };
    this.inverse = function (f) {
        if (f == 0) {
            throw"System.ArithmeticException"
        }
        return this._gh[255 - this._gi[f]]
    };
    this.multiply = function (g, f) {
        if (g == 0 || f == 0) {
            return 0
        }
        if (g == 1) {
            return f
        }
        if (f == 1) {
            return g
        }
        return this._gh[(this._gi[g] + this._gi[f]) % 255]
    }
}
_az._bb = new _az(285);
_az._bc = new _az(301);
_az._bd = function (d, c) {
    return d ^ c
};
var Decoder = {};
Decoder.rsDecoder = new _db(_az._bb);
Decoder.correctErrors = function (g, b) {
    var d = g.length;
    var f = new Array(d);
    for (var e = 0; e < d; e++) {
        f[e] = g[e] & 255
    }
    var a = g.length - b;
    try {
        Decoder.rsDecoder.decode(f, a)
    } catch (c) {
        throw c
    }
    for (var e = 0; e < b; e++) {
        g[e] = f[e]
    }
};
Decoder.decode = function (q) {
    var b = new _cl(q);
    var o = b._cq();
    var c = b._cm()._cg;
    var p = b._gk();
    var a = _dl._gn(p, o, c);
    var f = 0;
    for (var k = 0; k < a.length; k++) {
        f += a[k]._du
    }
    var e = new Array(f);
    var n = 0;
    for (var h = 0; h < a.length; h++) {
        var m = a[h];
        var d = m.Codewords;
        var g = m._du;
        Decoder.correctErrors(d, g);
        for (var k = 0; k < g; k++) {
            e[n++] = d[k]
        }
    }
    var l = new QRCodeDataBlockReader(e, o._fd, c.Bits);
    return l
};
var qrcode = {};
qrcode.imagedata = null;
qrcode.width = 0;
qrcode.height = 0;
qrcode.qrCodeSymbol = null;
qrcode.debug = false;
qrcode.maxImgSize = 1024 * 1024;
qrcode._eo = [[10, 9, 8, 8], [12, 11, 16, 10], [14, 13, 16, 12]];
qrcode.callback = null;
qrcode.vidSuccess = function (a) {
    qrcode.localstream = a;
    if (qrcode.webkit) {
        qrcode.video.src = window.webkitURL.createObjectURL(a)
    } else {
        if (qrcode.moz) {
            qrcode.video.mozSrcObject = a;
            qrcode.video.play()
        } else {
            qrcode.video.src = a
        }
    }
    qrcode.gUM = true;
    qrcode.canvas_qr2 = document.createElement("canvas");
    qrcode.canvas_qr2.id = "qr-canvas";
    qrcode.qrcontext2 = qrcode.canvas_qr2.getContext("2d");
    qrcode.canvas_qr2.width = qrcode.video.videoWidth;
    qrcode.canvas_qr2.height = qrcode.video.videoHeight;
    setTimeout(qrcode.captureToCanvas, 500)
};
qrcode.vidError = function (a) {
    qrcode.gUM = false;
    return
};
qrcode.captureToCanvas = function () {
    if (qrcode.gUM) {
        try {
            if (qrcode.video.videoWidth == 0) {
                setTimeout(qrcode.captureToCanvas, 500);
                return
            } else {
                qrcode.canvas_qr2.width = qrcode.video.videoWidth;
                qrcode.canvas_qr2.height = qrcode.video.videoHeight
            }
            qrcode.qrcontext2.drawImage(qrcode.video, 0, 0);
            try {
                qrcode.decode()
            } catch (a) {
                console.log(a);
                setTimeout(qrcode.captureToCanvas, 500)
            }
        } catch (a) {
            console.log(a);
            setTimeout(qrcode.captureToCanvas, 500)
        }
    }
};
qrcode.setWebcam = function (c) {
    var d = navigator;
    qrcode.video = document.getElementById(c);
    var a = true;
    if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
        try {
            navigator.mediaDevices.enumerateDevices().then(function (e) {
                e.forEach(function (f) {
                    console.log("deb1");
                    if (f.kind === "videoinput") {
                        if (f.label.toLowerCase().search("back") > -1) {
                            a = [{sourceId: f.deviceId}]
                        }
                    }
                    console.log(f.kind + ": " + f.label + " id = " + f.deviceId)
                })
            })
        } catch (b) {
            console.log(b)
        }
    } else {
        console.log("no navigator.mediaDevices.enumerateDevices")
    }
    if (d.getUserMedia) {
        d.getUserMedia({video: a, audio: false}, qrcode.vidSuccess, qrcode.vidError)
    } else {
        if (d.webkitGetUserMedia) {
            qrcode.webkit = true;
            d.webkitGetUserMedia({video: a, audio: false}, qrcode.vidSuccess, qrcode.vidError)
        } else {
            if (d.mozGetUserMedia) {
                qrcode.moz = true;
                d.mozGetUserMedia({video: a, audio: false}, qrcode.vidSuccess, qrcode.vidError)
            }
        }
    }
};
qrcode.decode = function (d) {
    if (arguments.length == 0) {
        if (qrcode.canvas_qr2) {
            var b = qrcode.canvas_qr2;
            var a = qrcode.qrcontext2
        } else {
            var b = document.getElementById("qr-canvas");
            var a = b.getContext("2d")
        }
        qrcode.width = b.width;
        qrcode.height = b.height;
        qrcode.imagedata = a.getImageData(0, 0, qrcode.width, qrcode.height);
        qrcode.result = qrcode.process(a);
        if (qrcode.callback != null) {
            qrcode.callback(qrcode.result)
        }
        return qrcode.result
    } else {
        var c = new Image();
        c.crossOrigin = "Anonymous";
        c.onload = function () {
            var g = document.getElementById("out-canvas");
            if (g != null) {
                var j = g.getContext("2d");
                j.clearRect(0, 0, 320, 240);
                j.drawImage(c, 0, 0, 320, 240)
            }
            var i = document.createElement("canvas");
            var h = i.getContext("2d");
            var f = c.height;
            var l = c.width;
            if (c.width * c.height > qrcode.maxImgSize) {
                var k = c.width / c.height;
                f = Math.sqrt(qrcode.maxImgSize / k);
                l = k * f
            }
            i.width = l;
            i.height = f;
            h.drawImage(c, 0, 0, i.width, i.height);
            qrcode.width = i.width;
            qrcode.height = i.height;
            try {
                qrcode.imagedata = h.getImageData(0, 0, i.width, i.height)
            } catch (m) {
                qrcode.result = "Cross domain image reading not supported in your browser! Save it to your computer then drag and drop the file!";
                if (qrcode.callback != null) {
                    qrcode.callback(qrcode.result)
                }
                return
            }
            try {
                qrcode.result = qrcode.process(h)
            } catch (m) {
                console.log(m);
                qrcode.result = "error decoding QR Code"
            }
            if (qrcode.callback != null) {
                qrcode.callback(qrcode.result)
            }
        };
        c.onerror = function () {
            if (qrcode.callback != null) {
                qrcode.callback("Failed to load the image")
            }
        };
        c.src = d
    }
};
qrcode.isUrl = function (a) {
    var b = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    return b.test(a)
};
qrcode.decode_url = function (b) {
    var d = "";
    try {
        d = escape(b)
    } catch (c) {
        console.log(c);
        d = b
    }
    var a = "";
    try {
        a = decodeURIComponent(d)
    } catch (c) {
        console.log(c);
        a = d
    }
    return a
};
qrcode.decode_utf8 = function (a) {
    if (qrcode.isUrl(a)) {
        return qrcode.decode_url(a)
    } else {
        return a
    }
};
qrcode.process = function (q) {
    var a = new Date().getTime();
    var c = qrcode.grayScaleToBitmap(qrcode.grayscale());
    if (qrcode.debug) {
        for (var m = 0; m < qrcode.height; m++) {
            for (var n = 0; n < qrcode.width; n++) {
                var o = (n * 4) + (m * qrcode.width * 4);
                qrcode.imagedata.data[o] = c[n + m * qrcode.width] ? 0 : 0;
                qrcode.imagedata.data[o + 1] = c[n + m * qrcode.width] ? 0 : 0;
                qrcode.imagedata.data[o + 2] = c[n + m * qrcode.width] ? 255 : 0
            }
        }
        q.putImageData(qrcode.imagedata, 0, 0)
    }
    var h = new Detector(c);
    var p = h.detect();
    if (qrcode.debug) {
        for (var m = 0; m < p.bits.Height; m++) {
            for (var n = 0; n < p.bits.Width; n++) {
                var o = (n * 4 * 2) + (m * 2 * qrcode.width * 4);
                qrcode.imagedata.data[o] = p.bits._ds(n, m) ? 0 : 0;
                qrcode.imagedata.data[o + 1] = p.bits._ds(n, m) ? 0 : 0;
                qrcode.imagedata.data[o + 2] = p.bits._ds(n, m) ? 255 : 0
            }
        }
        q.putImageData(qrcode.imagedata, 0, 0)
    }
    var k = Decoder.decode(p.bits);
    var g = k.DataByte;
    var l = "";
    for (var f = 0; f < g.length; f++) {
        for (var e = 0; e < g[f].length; e++) {
            l += String.fromCharCode(g[f][e])
        }
    }
    var d = new Date().getTime();
    var b = d - a;
    console.log(b);
    return qrcode.decode_utf8(l)
};
qrcode.getPixel = function (b, d) {
    if (qrcode.width < b) {
        throw"point error"
    }
    if (qrcode.height < d) {
        throw"point error"
    }
    var a = (b * 4) + (d * qrcode.width * 4);
    var c = (qrcode.imagedata.data[a] * 33 + qrcode.imagedata.data[a + 1] * 34 + qrcode.imagedata.data[a + 2] * 33) / 100;
    return c
};
qrcode.binarize = function (d) {
    var c = new Array(qrcode.width * qrcode.height);
    for (var e = 0; e < qrcode.height; e++) {
        for (var b = 0; b < qrcode.width; b++) {
            var a = qrcode.getPixel(b, e);
            c[b + e * qrcode.width] = a <= d ? true : false
        }
    }
    return c
};
qrcode._em = function (d) {
    var c = 4;
    var k = Math.floor(qrcode.width / c);
    var j = Math.floor(qrcode.height / c);
    var f = new Array(c);
    for (var g = 0; g < c; g++) {
        f[g] = new Array(c);
        for (var e = 0; e < c; e++) {
            f[g][e] = new Array(0, 0)
        }
    }
    for (var o = 0; o < c; o++) {
        for (var a = 0; a < c; a++) {
            f[a][o][0] = 255;
            for (var l = 0; l < j; l++) {
                for (var n = 0; n < k; n++) {
                    var h = d[k * a + n + (j * o + l) * qrcode.width];
                    if (h < f[a][o][0]) {
                        f[a][o][0] = h
                    }
                    if (h > f[a][o][1]) {
                        f[a][o][1] = h
                    }
                }
            }
        }
    }
    var m = new Array(c);
    for (var b = 0; b < c; b++) {
        m[b] = new Array(c)
    }
    for (var o = 0; o < c; o++) {
        for (var a = 0; a < c; a++) {
            m[a][o] = Math.floor((f[a][o][0] + f[a][o][1]) / 2)
        }
    }
    return m
};
qrcode.grayScaleToBitmap = function (f) {
    var k = qrcode._em(f);
    var b = k.length;
    var e = Math.floor(qrcode.width / b);
    var d = Math.floor(qrcode.height / b);
    var h = new ArrayBuffer(qrcode.width * qrcode.height);
    var c = new Uint8Array(h);
    for (var j = 0; j < b; j++) {
        for (var a = 0; a < b; a++) {
            for (var g = 0; g < d; g++) {
                for (var i = 0; i < e; i++) {
                    c[e * a + i + (d * j + g) * qrcode.width] = (f[e * a + i + (d * j + g) * qrcode.width] < k[a][j]) ? true : false
                }
            }
        }
    }
    return c
};
qrcode.grayscale = function () {
    var e = new ArrayBuffer(qrcode.width * qrcode.height);
    var c = new Uint8Array(e);
    for (var d = 0; d < qrcode.height; d++) {
        for (var b = 0; b < qrcode.width; b++) {
            var a = qrcode.getPixel(b, d);
            c[b + d * qrcode.width] = a
        }
    }
    return c
};
function _ew(a, b) {
    if (a >= 0) {
        return a >> b
    } else {
        return (a >> b) + (2 << ~b)
    }
}
var _gf = 3;
var _eh = 57;
var _el = 8;
var _eg = 2;
qrcode._er = function (c) {
    function b(m, k) {
        var n = m.X - k.X;
        var l = m.Y - k.Y;
        return Math.sqrt((n * n + l * l))
    }

    function d(k, o, n) {
        var m = o.x;
        var l = o.y;
        return ((n.x - m) * (k.y - l)) - ((n.y - l) * (k.x - m))
    }

    var i = b(c[0], c[1]);
    var f = b(c[1], c[2]);
    var e = b(c[0], c[2]);
    var a, j, h;
    if (f >= i && f >= e) {
        j = c[0];
        a = c[1];
        h = c[2]
    } else {
        if (e >= f && e >= i) {
            j = c[1];
            a = c[0];
            h = c[2]
        } else {
            j = c[2];
            a = c[0];
            h = c[1]
        }
    }
    if (d(a, j, h) < 0) {
        var g = a;
        a = h;
        h = g
    }
    c[0] = a;
    c[1] = j;
    c[2] = h
};
function _cz(c, a, b) {
    this.x = c;
    this.y = a;
    this.count = 1;
    this._aj = b;
    this.__defineGetter__("_ei", function () {
        return this._aj
    });
    this.__defineGetter__("Count", function () {
        return this.count
    });
    this.__defineGetter__("X", function () {
        return this.x
    });
    this.__defineGetter__("Y", function () {
        return this.y
    });
    this._ek = function () {
        this.count++
    };
    this._ev = function (f, e, d) {
        if (Math.abs(e - this.y) <= f && Math.abs(d - this.x) <= f) {
            var g = Math.abs(f - this._aj);
            return g <= 1 || g / this._aj <= 1
        }
        return false
    }
}
function _es(a) {
    this._go = a[0];
    this._gu = a[1];
    this._gr = a[2];
    this.__defineGetter__("_gp", function () {
        return this._go
    });
    this.__defineGetter__("_gq", function () {
        return this._gu
    });
    this.__defineGetter__("_gs", function () {
        return this._gr
    })
}
function _cc() {
    this.image = null;
    this._cv = [];
    this._ge = false;
    this._al = new Array(0, 0, 0, 0, 0);
    this._am = null;
    this.__defineGetter__("_da", function () {
        this._al[0] = 0;
        this._al[1] = 0;
        this._al[2] = 0;
        this._al[3] = 0;
        this._al[4] = 0;
        return this._al
    });
    this._ao = function (f) {
        var b = 0;
        for (var d = 0; d < 5; d++) {
            var e = f[d];
            if (e == 0) {
                return false
            }
            b += e
        }
        if (b < 7) {
            return false
        }
        var c = Math.floor((b << _el) / 7);
        var a = Math.floor(c / 2);
        return Math.abs(c - (f[0] << _el)) < a && Math.abs(c - (f[1] << _el)) < a && Math.abs(3 * c - (f[2] << _el)) < 3 * a && Math.abs(c - (f[3] << _el)) < a && Math.abs(c - (f[4] << _el)) < a
    };
    this._an = function (b, a) {
        return (a - b[4] - b[3]) - b[2] / 2
    };
    this._ap = function (a, j, d, g) {
        var c = this.image;
        var h = qrcode.height;
        var b = this._da;
        var f = a;
        while (f >= 0 && c[j + f * qrcode.width]) {
            b[2]++;
            f--
        }
        if (f < 0) {
            return NaN
        }
        while (f >= 0 && !c[j + f * qrcode.width] && b[1] <= d) {
            b[1]++;
            f--
        }
        if (f < 0 || b[1] > d) {
            return NaN
        }
        while (f >= 0 && c[j + f * qrcode.width] && b[0] <= d) {
            b[0]++;
            f--
        }
        if (b[0] > d) {
            return NaN
        }
        f = a + 1;
        while (f < h && c[j + f * qrcode.width]) {
            b[2]++;
            f++
        }
        if (f == h) {
            return NaN
        }
        while (f < h && !c[j + f * qrcode.width] && b[3] < d) {
            b[3]++;
            f++
        }
        if (f == h || b[3] >= d) {
            return NaN
        }
        while (f < h && c[j + f * qrcode.width] && b[4] < d) {
            b[4]++;
            f++
        }
        if (b[4] >= d) {
            return NaN
        }
        var e = b[0] + b[1] + b[2] + b[3] + b[4];
        if (5 * Math.abs(e - g) >= 2 * g) {
            return NaN
        }
        return this._ao(b) ? this._an(b, f) : NaN
    };
    this._ej = function (b, a, e, h) {
        var d = this.image;
        var i = qrcode.width;
        var c = this._da;
        var g = b;
        while (g >= 0 && d[g + a * qrcode.width]) {
            c[2]++;
            g--
        }
        if (g < 0) {
            return NaN
        }
        while (g >= 0 && !d[g + a * qrcode.width] && c[1] <= e) {
            c[1]++;
            g--
        }
        if (g < 0 || c[1] > e) {
            return NaN
        }
        while (g >= 0 && d[g + a * qrcode.width] && c[0] <= e) {
            c[0]++;
            g--
        }
        if (c[0] > e) {
            return NaN
        }
        g = b + 1;
        while (g < i && d[g + a * qrcode.width]) {
            c[2]++;
            g++
        }
        if (g == i) {
            return NaN
        }
        while (g < i && !d[g + a * qrcode.width] && c[3] < e) {
            c[3]++;
            g++
        }
        if (g == i || c[3] >= e) {
            return NaN
        }
        while (g < i && d[g + a * qrcode.width] && c[4] < e) {
            c[4]++;
            g++
        }
        if (c[4] >= e) {
            return NaN
        }
        var f = c[0] + c[1] + c[2] + c[3] + c[4];
        if (5 * Math.abs(f - h) >= h) {
            return NaN
        }
        return this._ao(c) ? this._an(c, g) : NaN
    };
    this._cu = function (c, f, e) {
        var d = c[0] + c[1] + c[2] + c[3] + c[4];
        var n = this._an(c, e);
        var b = this._ap(f, Math.floor(n), c[2], d);
        if (!isNaN(b)) {
            n = this._ej(Math.floor(n), Math.floor(b), c[2], d);
            if (!isNaN(n)) {
                var l = d / 7;
                var m = false;
                var h = this._cv.length;
                for (var g = 0; g < h; g++) {
                    var a = this._cv[g];
                    if (a._ev(l, b, n)) {
                        a._ek();
                        m = true;
                        break
                    }
                }
                if (!m) {
                    var k = new _cz(n, b, l);
                    this._cv.push(k);
                    if (this._am != null) {
                        this._am._ep(k)
                    }
                }
                return true
            }
        }
        return false
    };
    this._ee = function () {
        var h = this._cv.length;
        if (h < 3) {
            throw"Couldn't find enough finder patterns (found " + h + ")"
        }
        if (h > 3) {
            var b = 0;
            var j = 0;
            for (var d = 0; d < h; d++) {
                var g = this._cv[d]._ei;
                b += g;
                j += (g * g)
            }
            var a = b / h;
            this._cv.sort(function (m, l) {
                var k = Math.abs(l._ei - a);
                var i = Math.abs(m._ei - a);
                if (k < i) {
                    return (-1)
                } else {
                    if (k == i) {
                        return 0
                    } else {
                        return 1
                    }
                }
            });
            var e = Math.sqrt(j / h - a * a);
            var c = Math.max(0.2 * a, e);
            for (var d = this._cv.length - 1; d >= 0; d--) {
                var f = this._cv[d];
                if (Math.abs(f._ei - a) > c) {
                    this._cv.splice(d, 1)
                }
            }
        }
        if (this._cv.length > 3) {
            this._cv.sort(function (k, i) {
                if (k.count > i.count) {
                    return -1
                }
                if (k.count < i.count) {
                    return 1
                }
                return 0
            })
        }
        return new Array(this._cv[0], this._cv[1], this._cv[2])
    };
    this._eq = function () {
        var b = this._cv.length;
        if (b <= 1) {
            return 0
        }
        var c = null;
        for (var d = 0; d < b; d++) {
            var a = this._cv[d];
            if (a.Count >= _eg) {
                if (c == null) {
                    c = a
                } else {
                    this._ge = true;
                    return Math.floor((Math.abs(c.X - a.X) - Math.abs(c.Y - a.Y)) / 2)
                }
            }
        }
        return 0
    };
    this._cx = function () {
        var g = 0;
        var c = 0;
        var a = this._cv.length;
        for (var d = 0; d < a; d++) {
            var f = this._cv[d];
            if (f.Count >= _eg) {
                g++;
                c += f._ei
            }
        }
        if (g < 3) {
            return false
        }
        var e = c / a;
        var b = 0;
        for (var d = 0; d < a; d++) {
            f = this._cv[d];
            b += Math.abs(f._ei - e)
        }
        return b <= 0.05 * c
    };
    this._ce = function (e) {
        var o = false;
        this.image = e;
        var n = qrcode.height;
        var k = qrcode.width;
        var a = Math.floor((3 * n) / (4 * _eh));
        if (a < _gf || o) {
            a = _gf
        }
        var g = false;
        var d = new Array(5);
        for (var h = a - 1; h < n && !g; h += a) {
            d[0] = 0;
            d[1] = 0;
            d[2] = 0;
            d[3] = 0;
            d[4] = 0;
            var b = 0;
            for (var f = 0; f < k; f++) {
                if (e[f + h * qrcode.width]) {
                    if ((b & 1) == 1) {
                        b++
                    }
                    d[b]++
                } else {
                    if ((b & 1) == 0) {
                        if (b == 4) {
                            if (this._ao(d)) {
                                var c = this._cu(d, h, f);
                                if (c) {
                                    a = 2;
                                    if (this._ge) {
                                        g = this._cx()
                                    } else {
                                        var m = this._eq();
                                        if (m > d[2]) {
                                            h += m - d[2] - a;
                                            f = k - 1
                                        }
                                    }
                                } else {
                                    do {
                                        f++
                                    } while (f < k && !e[f + h * qrcode.width]);
                                    f--
                                }
                                b = 0;
                                d[0] = 0;
                                d[1] = 0;
                                d[2] = 0;
                                d[3] = 0;
                                d[4] = 0
                            } else {
                                d[0] = d[2];
                                d[1] = d[3];
                                d[2] = d[4];
                                d[3] = 1;
                                d[4] = 0;
                                b = 3
                            }
                        } else {
                            d[++b]++
                        }
                    } else {
                        d[b]++
                    }
                }
            }
            if (this._ao(d)) {
                var c = this._cu(d, h, k);
                if (c) {
                    a = d[0];
                    if (this._ge) {
                        g = this._cx()
                    }
                }
            }
        }
        var l = this._ee();
        qrcode._er(l);
        return new _es(l)
    }
}
function _ai(c, a, b) {
    this.x = c;
    this.y = a;
    this.count = 1;
    this._aj = b;
    this.__defineGetter__("_ei", function () {
        return this._aj
    });
    this.__defineGetter__("Count", function () {
        return this.count
    });
    this.__defineGetter__("X", function () {
        return Math.floor(this.x)
    });
    this.__defineGetter__("Y", function () {
        return Math.floor(this.y)
    });
    this._ek = function () {
        this.count++
    };
    this._ev = function (f, e, d) {
        if (Math.abs(e - this.y) <= f && Math.abs(d - this.x) <= f) {
            var g = Math.abs(f - this._aj);
            return g <= 1 || g / this._aj <= 1
        }
        return false
    }
}
function _ak(g, c, b, f, a, e, d) {
    this.image = g;
    this._cv = new Array();
    this.startX = c;
    this.startY = b;
    this.width = f;
    this.height = a;
    this._ef = e;
    this._al = new Array(0, 0, 0);
    this._am = d;
    this._an = function (i, h) {
        return (h - i[2]) - i[1] / 2
    };
    this._ao = function (l) {
        var k = this._ef;
        var h = k / 2;
        for (var j = 0; j < 3; j++) {
            if (Math.abs(k - l[j]) >= h) {
                return false
            }
        }
        return true
    };
    this._ap = function (h, q, l, o) {
        var k = this.image;
        var p = qrcode.height;
        var j = this._al;
        j[0] = 0;
        j[1] = 0;
        j[2] = 0;
        var n = h;
        while (n >= 0 && k[q + n * qrcode.width] && j[1] <= l) {
            j[1]++;
            n--
        }
        if (n < 0 || j[1] > l) {
            return NaN
        }
        while (n >= 0 && !k[q + n * qrcode.width] && j[0] <= l) {
            j[0]++;
            n--
        }
        if (j[0] > l) {
            return NaN
        }
        n = h + 1;
        while (n < p && k[q + n * qrcode.width] && j[1] <= l) {
            j[1]++;
            n++
        }
        if (n == p || j[1] > l) {
            return NaN
        }
        while (n < p && !k[q + n * qrcode.width] && j[2] <= l) {
            j[2]++;
            n++
        }
        if (j[2] > l) {
            return NaN
        }
        var m = j[0] + j[1] + j[2];
        if (5 * Math.abs(m - o) >= 2 * o) {
            return NaN
        }
        return this._ao(j) ? this._an(j, n) : NaN
    };
    this._cu = function (l, o, n) {
        var m = l[0] + l[1] + l[2];
        var t = this._an(l, n);
        var k = this._ap(o, Math.floor(t), 2 * l[1], m);
        if (!isNaN(k)) {
            var s = (l[0] + l[1] + l[2]) / 3;
            var q = this._cv.length;
            for (var p = 0; p < q; p++) {
                var h = this._cv[p];
                if (h._ev(s, k, t)) {
                    return new _ai(t, k, s)
                }
            }
            var r = new _ai(t, k, s);
            this._cv.push(r);
            if (this._am != null) {
                this._am._ep(r)
            }
        }
        return null
    };
    this.find = function () {
        var p = this.startX;
        var s = this.height;
        var q = p + f;
        var r = b + (s >> 1);
        var m = new Array(0, 0, 0);
        for (var k = 0; k < s; k++) {
            var o = r + ((k & 1) == 0 ? ((k + 1) >> 1) : -((k + 1) >> 1));
            m[0] = 0;
            m[1] = 0;
            m[2] = 0;
            var n = p;
            while (n < q && !g[n + qrcode.width * o]) {
                n++
            }
            var h = 0;
            while (n < q) {
                if (g[n + o * qrcode.width]) {
                    if (h == 1) {
                        m[h]++
                    } else {
                        if (h == 2) {
                            if (this._ao(m)) {
                                var l = this._cu(m, o, n);
                                if (l != null) {
                                    return l
                                }
                            }
                            m[0] = m[2];
                            m[1] = 1;
                            m[2] = 0;
                            h = 1
                        } else {
                            m[++h]++
                        }
                    }
                } else {
                    if (h == 1) {
                        h++
                    }
                    m[h]++
                }
                n++
            }
            if (this._ao(m)) {
                var l = this._cu(m, o, q);
                if (l != null) {
                    return l
                }
            }
        }
        if (!(this._cv.length == 0)) {
            return this._cv[0]
        }
        throw"Couldn't find enough alignment patterns"
    }
}
function QRCodeDataBlockReader(c, a, b) {
    this._ed = 0;
    this._cw = 7;
    this.dataLength = 0;
    this.blocks = c;
    this._en = b;
    if (a <= 9) {
        this.dataLengthMode = 0
    } else {
        if (a >= 10 && a <= 26) {
            this.dataLengthMode = 1
        } else {
            if (a >= 27 && a <= 40) {
                this.dataLengthMode = 2
            }
        }
    }
    this._gd = function (f) {
        var k = 0;
        if (f < this._cw + 1) {
            var m = 0;
            for (var e = 0; e < f; e++) {
                m += (1 << e)
            }
            m <<= (this._cw - f + 1);
            k = (this.blocks[this._ed] & m) >> (this._cw - f + 1);
            this._cw -= f;
            return k
        } else {
            if (f < this._cw + 1 + 8) {
                var j = 0;
                for (var e = 0; e < this._cw + 1; e++) {
                    j += (1 << e)
                }
                k = (this.blocks[this._ed] & j) << (f - (this._cw + 1));
                this._ed++;
                k += ((this.blocks[this._ed]) >> (8 - (f - (this._cw + 1))));
                this._cw = this._cw - f % 8;
                if (this._cw < 0) {
                    this._cw = 8 + this._cw
                }
                return k
            } else {
                if (f < this._cw + 1 + 16) {
                    var j = 0;
                    var h = 0;
                    for (var e = 0; e < this._cw + 1; e++) {
                        j += (1 << e)
                    }
                    var g = (this.blocks[this._ed] & j) << (f - (this._cw + 1));
                    this._ed++;
                    var d = this.blocks[this._ed] << (f - (this._cw + 1 + 8));
                    this._ed++;
                    for (var e = 0; e < f - (this._cw + 1 + 8); e++) {
                        h += (1 << e)
                    }
                    h <<= 8 - (f - (this._cw + 1 + 8));
                    var l = (this.blocks[this._ed] & h) >> (8 - (f - (this._cw + 1 + 8)));
                    k = g + d + l;
                    this._cw = this._cw - (f - 8) % 8;
                    if (this._cw < 0) {
                        this._cw = 8 + this._cw
                    }
                    return k
                } else {
                    return 0
                }
            }
        }
    };
    this.NextMode = function () {
        if ((this._ed > this.blocks.length - this._en - 2)) {
            return 0
        } else {
            return this._gd(4)
        }
    };
    this.getDataLength = function (d) {
        var e = 0;
        while (true) {
            if ((d >> e) == 1) {
                break
            }
            e++
        }
        return this._gd(qrcode._eo[this.dataLengthMode][e])
    };
    this.getRomanAndFigureString = function (h) {
        var f = h;
        var g = 0;
        var j = "";
        var d = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", " ", "$", "%", "*", "+", "-", ".", "/", ":");
        do {
            if (f > 1) {
                g = this._gd(11);
                var i = Math.floor(g / 45);
                var e = g % 45;
                j += d[i];
                j += d[e];
                f -= 2
            } else {
                if (f == 1) {
                    g = this._gd(6);
                    j += d[g];
                    f -= 1
                }
            }
        } while (f > 0);
        return j
    };
    this.getFigureString = function (f) {
        var d = f;
        var e = 0;
        var g = "";
        do {
            if (d >= 3) {
                e = this._gd(10);
                if (e < 100) {
                    g += "0"
                }
                if (e < 10) {
                    g += "0"
                }
                d -= 3
            } else {
                if (d == 2) {
                    e = this._gd(7);
                    if (e < 10) {
                        g += "0"
                    }
                    d -= 2
                } else {
                    if (d == 1) {
                        e = this._gd(4);
                        d -= 1
                    }
                }
            }
            g += e
        } while (d > 0);
        return g
    };
    this.get8bitByteArray = function (g) {
        var e = g;
        var f = 0;
        var d = new Array();
        do {
            f = this._gd(8);
            d.push(f);
            e--
        } while (e > 0);
        return d
    };
    this.getKanjiString = function (j) {
        var g = j;
        var i = 0;
        var h = "";
        do {
            i = this._gd(13);
            var e = i % 192;
            var f = i / 192;
            var k = (f << 8) + e;
            var d = 0;
            if (k + 33088 <= 40956) {
                d = k + 33088
            } else {
                d = k + 49472
            }
            h += String.fromCharCode(d);
            g--
        } while (g > 0);
        return h
    };
    this.parseECIValue = function () {
        var f = 0;
        var e = this._gd(8);
        if ((e & 128) == 0) {
            f = e & 127
        }
        if ((e & 192) == 128) {
            var d = this._gd(8);
            f = ((e & 63) << 8) | d
        }
        if ((e & 224) == 192) {
            var g = this._gd(8);
            f = ((e & 31) << 16) | g
        }
        return f
    };
    this.__defineGetter__("DataByte", function () {
        var h = new Array();
        var e = 1;
        var f = 2;
        var d = 4;
        var n = 7;
        var p = 8;
        do {
            var l = this.NextMode();
            if (l == 0) {
                if (h.length > 0) {
                    break
                } else {
                    throw"Empty data block"
                }
            }
            if (l != e && l != f && l != d && l != p && l != n) {
                throw"Invalid mode: " + l + " in (block:" + this._ed + " bit:" + this._cw + ")"
            }
            if (l == n) {
                var o = this.parseECIValue()
            } else {
                var g = this.getDataLength(l);
                if (g < 1) {
                    throw"Invalid data length: " + g
                }
                switch (l) {
                    case e:
                        var m = this.getFigureString(g);
                        var k = new Array(m.length);
                        for (var i = 0; i < m.length; i++) {
                            k[i] = m.charCodeAt(i)
                        }
                        h.push(k);
                        break;
                    case f:
                        var m = this.getRomanAndFigureString(g);
                        var k = new Array(m.length);
                        for (var i = 0; i < m.length; i++) {
                            k[i] = m.charCodeAt(i)
                        }
                        h.push(k);
                        break;
                    case d:
                        var o = this.get8bitByteArray(g);
                        h.push(o);
                        break;
                    case p:
                        var m = this.getKanjiString(g);
                        h.push(m);
                        break
                }
            }
        } while (true);
        return h
    })
};
var gapi = window.gapi = window.gapi || {};
gapi._bs = new Date().getTime();
(function () {
    var aa = this, ba = function (a, b, c) {
        return a.call.apply(a.bind, arguments)
    }, ca = function (a, b, c) {
        if (!a)throw Error();
        if (2 < arguments.length) {
            var d = Array.prototype.slice.call(arguments, 2);
            return function () {
                var c = Array.prototype.slice.call(arguments);
                Array.prototype.unshift.apply(c, d);
                return a.apply(b, c)
            }
        }
        return function () {
            return a.apply(b, arguments)
        }
    }, da = function (a, b, c) {
        da = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? ba : ca;
        return da.apply(null, arguments)
    };
    var ea = String.prototype.trim ? function (a) {
        return a.trim()
    } : function (a) {
        return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "")
    }, fa = function (a, b) {
        return a < b ? -1 : a > b ? 1 : 0
    };
    var m;
    a:{
        var ha = aa.navigator;
        if (ha) {
            var ia = ha.userAgent;
            if (ia) {
                m = ia;
                break a
            }
        }
        m = ""
    }
    ;
    var ka = function (a, b) {
        var c = ja;
        Object.prototype.hasOwnProperty.call(c, a) || (c[a] = b(a))
    };
    var la = -1 != m.indexOf("Opera"), p = -1 != m.indexOf("Trident") || -1 != m.indexOf("MSIE"), ma = -1 != m.indexOf("Edge"), na = -1 != m.indexOf("Gecko") && !(-1 != m.toLowerCase().indexOf("webkit") && -1 == m.indexOf("Edge")) && !(-1 != m.indexOf("Trident") || -1 != m.indexOf("MSIE")) && -1 == m.indexOf("Edge"), oa = -1 != m.toLowerCase().indexOf("webkit") && -1 == m.indexOf("Edge"), pa = function () {
        var a = aa.document;
        return a ? a.documentMode : void 0
    }, qa;
    a:{
        var ra = "", sa = function () {
            var a = m;
            if (na)return /rv\:([^\);]+)(\)|;)/.exec(a);
            if (ma)return /Edge\/([\d\.]+)/.exec(a);
            if (p)return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);
            if (oa)return /WebKit\/(\S+)/.exec(a);
            if (la)return /(?:Version)[ \/]?(\S+)/.exec(a)
        }();
        sa && (ra = sa ? sa[1] : "");
        if (p) {
            var ta = pa();
            if (null != ta && ta > parseFloat(ra)) {
                qa = String(ta);
                break a
            }
        }
        qa = ra
    }
    var ua = qa, ja = {}, va = function (a) {
        ka(a, function () {
            for (var b = 0, c = ea(String(ua)).split("."), d = ea(String(a)).split("."), e = Math.max(c.length, d.length), f = 0; 0 == b && f < e; f++) {
                var g = c[f] || "", h = d[f] || "";
                do {
                    g = /(\d*)(\D*)(.*)/.exec(g) || ["", "", "", ""];
                    h = /(\d*)(\D*)(.*)/.exec(h) || ["", "", "", ""];
                    if (0 == g[0].length && 0 == h[0].length)break;
                    b = fa(0 == g[1].length ? 0 : parseInt(g[1], 10), 0 == h[1].length ? 0 : parseInt(h[1], 10)) || fa(0 == g[2].length, 0 == h[2].length) || fa(g[2], h[2]);
                    g = g[3];
                    h = h[3]
                } while (0 == b)
            }
            return 0 <= b
        })
    }, wa;
    var xa = aa.document;
    wa = xa && p ? pa() || ("CSS1Compat" == xa.compatMode ? parseInt(ua, 10) : 5) : void 0;
    var ya;
    if (!(ya = !na && !p)) {
        var za;
        if (za = p)za = 9 <= Number(wa);
        ya = za
    }
    ya || na && va("1.9.1");
    p && va("9");
    /*
     gapi.loader.OBJECT_CREATE_TEST_OVERRIDE &&*/
    var t = window, v = document, Aa = t.location, Ba = function () {
    }, Ca = /\[native code\]/, w = function (a, b, c) {
        return a[b] = a[b] || c
    }, Da = function (a) {
        for (var b = 0; b < this.length; b++)if (this[b] === a)return b;
        return -1
    }, Ea = function (a) {
        a = a.sort();
        for (var b = [], c = void 0, d = 0; d < a.length; d++) {
            var e = a[d];
            e != c && b.push(e);
            c = e
        }
        return b
    }, Ga = /&/g, Ha = /</g, Ia = />/g, Ja = /"/g, Ka = /'/g, La = function (a) {
        return String(a).replace(Ga, "&amp;").replace(Ha, "&lt;").replace(Ia, "&gt;").replace(Ja, "&quot;").replace(Ka, "&#39;")
    }, x = function () {
        var a;
        if ((a = Object.create) &&
            Ca.test(a))a = a(null); else {
            a = {};
            for (var b in a)a[b] = void 0
        }
        return a
    }, y = function (a, b) {
        return Object.prototype.hasOwnProperty.call(a, b)
    }, Ma = function (a) {
        if (Ca.test(Object.keys))return Object.keys(a);
        var b = [], c;
        for (c in a)y(a, c) && b.push(c);
        return b
    }, z = function (a, b) {
        a = a || {};
        for (var c in a)y(a, c) && (b[c] = a[c])
    }, Na = function (a) {
        return function () {
            t.setTimeout(a, 0)
        }
    }, B = function (a, b) {
        if (!a)throw Error(b || "");
    }, C = w(t, "gapi", {});
    var D = function (a, b, c) {
        var d = new RegExp("([#].*&|[#])" + b + "=([^&#]*)", "g");
        b = new RegExp("([?#].*&|[?#])" + b + "=([^&#]*)", "g");
        if (a = a && (d.exec(a) || b.exec(a)))try {
            c = decodeURIComponent(a[2])
        } catch (e) {
        }
        return c
    }, Oa = new RegExp(/^/.source + /([a-zA-Z][-+.a-zA-Z0-9]*:)?/.source + /(\/\/[^\/?#]*)?/.source + /([^?#]*)?/.source + /(\?([^#]*))?/.source + /(#((#|[^#])*))?/.source + /$/.source), Pa = /[\ud800-\udbff][\udc00-\udfff]|[^!-~]/g, Qa = new RegExp(/(%([^0-9a-fA-F%]|[0-9a-fA-F]([^0-9a-fA-F%])?)?)*/.source + /%($|[^0-9a-fA-F]|[0-9a-fA-F]($|[^0-9a-fA-F]))/.source,
        "g"), Ra = /%([a-f]|[0-9a-fA-F][a-f])/g, Sa = /^(https?|ftp|file|chrome-extension):$/i, E = function (a) {
        a = String(a);
        a = a.replace(Pa, function (a) {
            try {
                return encodeURIComponent(a)
            } catch (f) {
                return encodeURIComponent(a.replace(/^[^%]+$/g, "\ufffd"))
            }
        }).replace(Qa, function (a) {
            return a.replace(/%/g, "%25")
        }).replace(Ra, function (a) {
            return a.toUpperCase()
        });
        a = a.match(Oa) || [];
        var b = x(), c = function (a) {
            return a.replace(/\\/g, "%5C").replace(/\^/g, "%5E").replace(/`/g, "%60").replace(/\{/g, "%7B").replace(/\|/g, "%7C").replace(/\}/g,
                "%7D")
        }, d = !!(a[1] || "").match(Sa);
        b.v = c((a[1] || "") + (a[2] || "") + (a[3] || (a[2] && d ? "/" : "")));
        d = function (a) {
            return c(a.replace(/\?/g, "%3F").replace(/\#/g, "%23"))
        };
        b.query = a[5] ? [d(a[5])] : [];
        b.c = a[7] ? [d(a[7])] : [];
        return b
    }, Ta = function (a) {
        return a.v + (0 < a.query.length ? "?" + a.query.join("&") : "") + (0 < a.c.length ? "#" + a.c.join("&") : "")
    }, Ua = function (a, b) {
        var c = [];
        if (a)for (var d in a)if (y(a, d) && null != a[d]) {
            var e = b ? b(a[d]) : a[d];
            c.push(encodeURIComponent(d) + "=" + encodeURIComponent(e))
        }
        return c
    }, Va = function (a, b, c, d) {
        a = E(a);
        a.query.push.apply(a.query, Ua(b, d));
        a.c.push.apply(a.c, Ua(c, d));
        return Ta(a)
    }, Wa = new RegExp(/\/?\??#?/.source + "(" + /[\/?#]/i.source + "|" + /[\uD800-\uDBFF]/i.source + "|" + /%[c-f][0-9a-f](%[89ab][0-9a-f]){0,2}(%[89ab]?)?/i.source + "|" + /%[0-9a-f]?/i.source + ")$", "i"), Xa = function (a, b) {
        var c = E(b);
        b = c.v;
        c.query.length && (b += "?" + c.query.join(""));
        c.c.length && (b += "#" + c.c.join(""));
        var d = "";
        2E3 < b.length && (c = b, b = b.substr(0, 2E3), b = b.replace(Wa, ""), d = c.substr(b.length));
        var e = a.createElement("div");
        a = a.createElement("a");
        c = E(b);
        b = c.v;
        c.query.length && (b += "?" + c.query.join(""));
        c.c.length && (b += "#" + c.c.join(""));
        a.href = b;
        e.appendChild(a);
        e.innerHTML = e.innerHTML;
        b = String(e.firstChild.href);
        e.parentNode && e.parentNode.removeChild(e);
        c = E(b + d);
        b = c.v;
        c.query.length && (b += "?" + c.query.join(""));
        c.c.length && (b += "#" + c.c.join(""));
        return b
    }, Ya = /^https?:\/\/[^\/%\\?#\s]+\/[^\s]*$/i;
    var Za = function (a, b, c, d) {
        if (t[c + "EventListener"])t[c + "EventListener"](a, b, !1); else if (t[d + "tachEvent"])t[d + "tachEvent"]("on" + a, b)
    }, $a = function () {
        var a = v.readyState;
        return "complete" === a || "interactive" === a && -1 == navigator.userAgent.indexOf("MSIE")
    }, cb = function (a) {
        var b = ab;
        if (!$a())try {
            b()
        } catch (c) {
        }
        bb(a)
    }, bb = function (a) {
        if ($a())a(); else {
            var b = !1, c = function () {
                if (!b)return b = !0, a.apply(this, arguments)
            };
            t.addEventListener ? (t.addEventListener("load", c, !1), t.addEventListener("DOMContentLoaded", c, !1)) : t.attachEvent &&
            (t.attachEvent("onreadystatechange", function () {
                $a() && c.apply(this, arguments)
            }), t.attachEvent("onload", c))
        }
    }, db = function (a) {
        for (; a.firstChild;)a.removeChild(a.firstChild)
    }, eb = {button: !0, div: !0, span: !0};
    var F;
    F = w(t, "___jsl", x());
    w(F, "I", 0);
    w(F, "hel", 10);
    var fb = function (a) {
        return F.dpo ? F.h : D(a, "jsh", F.h)
    }, gb = function (a) {
        var b = w(F, "sws", []);
        b.push.apply(b, a)
    }, hb = function (a) {
        return w(F, "watt", x())[a]
    }, ib = function (a) {
        var b = w(F, "PQ", []);
        F.PQ = [];
        var c = b.length;
        if (0 === c)a(); else for (var d = 0, e = function () {
            ++d === c && a()
        }, f = 0; f < c; f++)b[f](e)
    }, jb = function (a) {
        return w(w(F, "H", x()), a, x())
    };
    var kb = w(F, "perf", x()), lb = w(kb, "g", x()), mb = w(kb, "i", x());
    w(kb, "r", []);
    x();
    x();
    var nb = function (a, b, c) {
        var d = kb.r;
        "function" === typeof d ? d(a, b, c) : d.push([a, b, c])
    }, G = function (a, b, c) {
        lb[a] = !b && lb[a] || c || (new Date).getTime();
        nb(a)
    }, pb = function (a, b, c) {
        b && 0 < b.length && (b = ob(b), c && 0 < c.length && (b += "___" + ob(c)), 28 < b.length && (b = b.substr(0, 28) + (b.length - 28)), c = b, b = w(mb, "_p", x()), w(b, c, x())[a] = (new Date).getTime(), nb(a, "_p", c))
    }, ob = function (a) {
        return a.join("__").replace(/\./g, "_").replace(/\-/g, "_").replace(/\,/g, "_")
    };
    var qb = x(), J = [], K = function (a) {
        throw Error("Bad hint" + (a ? ": " + a : ""));
    };
    J.push(["jsl", function (a) {
        for (var b in a)if (y(a, b)) {
            var c = a[b];
            "object" == typeof c ? F[b] = w(F, b, []).concat(c) : w(F, b, c)
        }
        if (b = a.u)a = w(F, "us", []), a.push(b), (b = /^https:(.*)$/.exec(b)) && a.push("http:" + b[1])
    }]);
    var rb = /^(\/[a-zA-Z0-9_\-]+)+$/, sb = [/\/amp\//, /\/amp$/, /^\/amp$/], tb = /^[a-zA-Z0-9\-_\.,!]+$/, ub = /^gapi\.loaded_[0-9]+$/, vb = /^[a-zA-Z0-9,._-]+$/, zb = function (a, b, c, d) {
            var e = a.split(";"), f = e.shift(), g = qb[f], h = null;
            g ? h = g(e, b, c, d) : K("no hint processor for: " + f);
            h || K("failed to generate load url");
            b = h;
            c = b.match(wb);
            (d = b.match(xb)) && 1 === d.length && yb.test(b) && c && 1 === c.length || K("failed sanity: " + a);
            return h
        }, Cb = function (a, b, c, d) {
            a = Ab(a);
            ub.test(c) || K("invalid_callback");
            b = Bb(b);
            d = d && d.length ? Bb(d) : null;
            var e =
                function (a) {
                    return encodeURIComponent(a).replace(/%2C/g, ",")
                };
            return [encodeURIComponent(a.Y).replace(/%2C/g, ",").replace(/%2F/g, "/"), "/k=", e(a.version), "/m=", e(b), d ? "/exm=" + e(d) : "", "/rt=j/sv=1/d=1/ed=1", a.K ? "/am=" + e(a.K) : "", a.S ? "/rs=" + e(a.S) : "", a.U ? "/t=" + e(a.U) : "", "/cb=", e(c)].join("")
        }, Ab = function (a) {
            "/" !== a.charAt(0) && K("relative path");
            for (var b = a.substring(1).split("/"), c = []; b.length;) {
                a = b.shift();
                if (!a.length || 0 == a.indexOf("."))K("empty/relative directory"); else if (0 < a.indexOf("=")) {
                    b.unshift(a);
                    break
                }
                c.push(a)
            }
            a = {};
            for (var d = 0, e = b.length; d < e; ++d) {
                var f = b[d].split("="), g = decodeURIComponent(f[0]), h = decodeURIComponent(f[1]);
                2 == f.length && g && h && (a[g] = a[g] || h)
            }
            b = "/" + c.join("/");
            rb.test(b) || K("invalid_prefix");
            c = 0;
            for (d = sb.length; c < d; ++c)sb[c].test(b) && K("invalid_prefix");
            c = Db(a, "k", !0);
            d = Db(a, "am");
            e = Db(a, "rs");
            a = Db(a, "t");
            return {Y: b, version: c, K: d, S: e, U: a}
        }, Bb = function (a) {
            for (var b = [], c = 0, d = a.length; c < d; ++c) {
                var e = a[c].replace(/\./g, "_").replace(/-/g, "_");
                vb.test(e) && b.push(e)
            }
            return b.join(",")
        },
        Db = function (a, b, c) {
            a = a[b];
            !a && c && K("missing: " + b);
            if (a) {
                if (tb.test(a))return a;
                K("invalid: " + b)
            }
            return null
        }, yb = /^https?:\/\/[a-z0-9_.-]+\.google(rs)?\.com(:\d+)?\/[a-zA-Z0-9_.,!=\-\/]+$/, xb = /\/cb=/g, wb = /\/\//g, Eb = function () {
            var a = fb(Aa.href);
            if (!a)throw Error("Bad hint");
            return a
        };
    qb.m = function (a, b, c, d) {
        (a = a[0]) || K("missing_hint");
        return "https://apis.google.com" + Cb(a, b, c, d)
    };
    var L = decodeURI("%73cript"), Fb = /^[-+_0-9\/A-Za-z]+={0,2}$/, Gb = function (a, b) {
        for (var c = [], d = 0; d < a.length; ++d) {
            var e = a[d];
            e && 0 > Da.call(b, e) && c.push(e)
        }
        return c
    }, Hb = function () {
        var a = F.nonce;
        if (void 0 !== a)return a && a === String(a) && a.match(Fb) ? a : F.nonce = null;
        var b = w(F, "us", []);
        if (!b || !b.length)return F.nonce = null;
        for (var c = v.getElementsByTagName(L), d = 0, e = c.length; d < e; ++d) {
            var f = c[d];
            if (f.src && (a = String(f.nonce || f.getAttribute("nonce") || "") || null)) {
                for (var g = 0, h = b.length; g < h && b[g] !== f.src; ++g);
                if (g !== h &&
                    a && a === String(a) && a.match(Fb))return F.nonce = a
            }
        }
        return null
    }, Jb = function (a) {
        if ("loading" != v.readyState)Ib(a); else {
            var b = Hb(), c = "";
            null !== b && (c = ' nonce="' + b + '"');
            v.write("<" + L + ' src="' + encodeURI(a) + '"' + c + "></" + L + ">")
        }
    }, Ib = function (a) {
        var b = v.createElement(L);
        b.setAttribute("src", a);
        a = Hb();
        null !== a && b.setAttribute("nonce", a);
        b.async = "true";
        (a = v.getElementsByTagName(L)[0]) ? a.parentNode.insertBefore(b, a) : (v.head || v.body || v.documentElement).appendChild(b)
    }, Kb = function (a, b) {
        var c = b && b._c;
        if (c)for (var d =
            0; d < J.length; d++) {
            var e = J[d][0], f = J[d][1];
            f && y(c, e) && f(c[e], a, b)
        }
    }, Mb = function (a, b, c) {
        Lb(function () {
            var c = b === fb(Aa.href) ? w(C, "_", x()) : x();
            c = w(jb(b), "_", c);
            a(c)
        }, c)
    }, M = function (a, b) {
        var c = b || {};
        "function" == typeof b && (c = {}, c.callback = b);
        Kb(a, c);
        b = a ? a.split(":") : [];
        var d = c.h || Eb(), e = w(F, "ah", x());
        if (e["::"] && b.length) {
            a = [];
            for (var f = null; f = b.shift();) {
                var g = f.split(".");
                g = e[f] || e[g[1] && "ns:" + g[0] || ""] || d;
                var h = a.length && a[a.length - 1] || null, k = h;
                h && h.hint == g || (k = {hint: g, N: []}, a.push(k));
                k.N.push(f)
            }
            var l =
                a.length;
            if (1 < l) {
                var q = c.callback;
                q && (c.callback = function () {
                    0 == --l && q()
                })
            }
            for (; b = a.shift();)Nb(b.N, c, b.hint)
        } else Nb(b || [], c, d)
    }, Nb = function (a, b, c) {
        a = Ea(a) || [];
        var d = b.callback, e = b.config, f = b.timeout, g = b.ontimeout, h = b.onerror, k = void 0;
        "function" == typeof h && (k = h);
        var l = null, q = !1;
        if (f && !g || !f && g)throw"Timeout requires both the timeout parameter and ontimeout parameter to be set";
        h = w(jb(c), "r", []).sort();
        var r = w(jb(c), "L", []).sort(), n = [].concat(h), u = function (a, b) {
            if (q)return 0;
            t.clearTimeout(l);
            r.push.apply(r,
                A);
            var d = ((C || {}).config || {}).update;
            d ? d(e) : e && w(F, "cu", []).push(e);
            if (b) {
                pb("me0", a, n);
                try {
                    Mb(b, c, k)
                } finally {
                    pb("me1", a, n)
                }
            }
            return 1
        };
        0 < f && (l = t.setTimeout(function () {
            q = !0;
            g()
        }, f));
        var A = Gb(a, r);
        if (A.length) {
            A = Gb(a, h);
            var H = w(F, "CP", []), I = H.length;
            H[I] = function (a) {
                if (!a)return 0;
                pb("ml1", A, n);
                var b = function (b) {
                    H[I] = null;
                    u(A, a) && ib(function () {
                        d && d();
                        b()
                    })
                }, c = function () {
                    var a = H[I + 1];
                    a && a()
                };
                0 < I && H[I - 1] ? H[I] = function () {
                    b(c)
                } : b(c)
            };
            if (A.length) {
                var Fa = "loaded_" + F.I++;
                C[Fa] = function (a) {
                    H[I](a);
                    C[Fa] = null
                };
                a = zb(c, A, "gapi." + Fa, h);
                h.push.apply(h, A);
                pb("ml0", A, n);
                b.sync || t.___gapisync ? Jb(a) : Ib(a)
            } else H[I](Ba)
        } else u(A) && d && d()
    };
    var Lb = function (a, b) {
        if (F.hee && 0 < F.hel)try {
            return a()
        } catch (c) {
            b && b(c), F.hel--, M("debug_error", function () {
                try {
                    window.___jsl.hefn(c)
                } catch (d) {
                    throw c;
                }
            })
        } else try {
            return a()
        } catch (c) {
            throw b && b(c), c;
        }
    };
    C.load = function (a, b) {
        return Lb(function () {
            return M(a, b)
        })
    };
    var N = function (a) {
        var b = window.___jsl = window.___jsl || {};
        b[a] = b[a] || [];
        return b[a]
    }, O = function (a) {
        var b = window.___jsl = window.___jsl || {};
        b.cfg = !a && b.cfg || {};
        return b.cfg
    }, Ob = function (a) {
        return "object" === typeof a && /\[native code\]/.test(a.push)
    }, P = function (a, b, c) {
        if (b && "object" === typeof b)for (var d in b)!Object.prototype.hasOwnProperty.call(b, d) || c && "___goc" === d && "undefined" === typeof b[d] || (a[d] && b[d] && "object" === typeof a[d] && "object" === typeof b[d] && !Ob(a[d]) && !Ob(b[d]) ? P(a[d], b[d]) : b[d] && "object" === typeof b[d] ? (a[d] = Ob(b[d]) ? [] : {}, P(a[d], b[d])) : a[d] = b[d])
    }, Pb = function (a) {
        if (a && !/^\s+$/.test(a)) {
            for (; 0 == a.charCodeAt(a.length - 1);)a = a.substring(0, a.length - 1);
            try {
                var b = window.JSON.parse(a)
            } catch (c) {
            }
            if ("object" === typeof b)return b;
            try {
                b = (new Function("return (" + a + "\n)"))()
            } catch (c) {
            }
            if ("object" === typeof b)return b;
            try {
                b = (new Function("return ({" + a + "\n})"))()
            } catch (c) {
            }
            return "object" === typeof b ? b : {}
        }
    }, Qb = function (a, b) {
        var c = {___goc: void 0};
        a.length && a[a.length - 1] && Object.hasOwnProperty.call(a[a.length -
        1], "___goc") && "undefined" === typeof a[a.length - 1].___goc && (c = a.pop());
        P(c, b);
        a.push(c)
    }, Rb = function (a) {
        O(!0);
        var b = window.___gcfg, c = N("cu"), d = window.___gu;
        b && b !== d && (Qb(c, b), window.___gu = b);
        b = N("cu");
        var e = document.scripts || document.getElementsByTagName("script") || [];
        d = [];
        var f = [];
        f.push.apply(f, N("us"));
        for (var g = 0; g < e.length; ++g)for (var h = e[g], k = 0; k < f.length; ++k)h.src && 0 == h.src.indexOf(f[k]) && d.push(h);
        0 == d.length && 0 < e.length && e[e.length - 1].src && d.push(e[e.length - 1]);
        for (e = 0; e < d.length; ++e)d[e].getAttribute("gapi_processed") ||
        (d[e].setAttribute("gapi_processed", !0), (f = d[e]) ? (g = f.nodeType, f = 3 == g || 4 == g ? f.nodeValue : f.textContent || f.innerText || f.innerHTML || "") : f = void 0, (f = Pb(f)) && b.push(f));
        a && Qb(c, a);
        d = N("cd");
        a = 0;
        for (b = d.length; a < b; ++a)P(O(), d[a], !0);
        d = N("ci");
        a = 0;
        for (b = d.length; a < b; ++a)P(O(), d[a], !0);
        a = 0;
        for (b = c.length; a < b; ++a)P(O(), c[a], !0)
    }, Q = function (a) {
        var b = O();
        if (!a)return b;
        a = a.split("/");
        for (var c = 0, d = a.length; b && "object" === typeof b && c < d; ++c)b = b[a[c]];
        return c === a.length && void 0 !== b ? b : void 0
    }, Sb = function (a, b) {
        var c;
        if ("string" === typeof a) {
            var d = c = {};
            a = a.split("/");
            for (var e = 0, f = a.length; e < f - 1; ++e) {
                var g = {};
                d = d[a[e]] = g
            }
            d[a[e]] = b
        } else c = a;
        Rb(c)
    };
    var Tb = function () {
        var a = window.__GOOGLEAPIS;
        a && (a.googleapis && !a["googleapis.config"] && (a["googleapis.config"] = a.googleapis), w(F, "ci", []).push(a), window.__GOOGLEAPIS = void 0)
    };
    var Ub = {
            apppackagename: 1,
            callback: 1,
            clientid: 1,
            cookiepolicy: 1,
            openidrealm: -1,
            includegrantedscopes: -1,
            requestvisibleactions: 1,
            scope: 1
        }, Vb = !1, Wb = x(), Xb = function () {
            if (!Vb) {
                for (var a = document.getElementsByTagName("meta"), b = 0; b < a.length; ++b) {
                    var c = a[b].name.toLowerCase();
                    if (0 == c.lastIndexOf("google-signin-", 0)) {
                        c = c.substring(14);
                        var d = a[b].content;
                        Ub[c] && d && (Wb[c] = d)
                    }
                }
                if (window.self !== window.top) {
                    a = document.location.toString();
                    for (var e in Ub)0 < Ub[e] && (b = D(a, e, "")) && (Wb[e] = b)
                }
                Vb = !0
            }
            e = x();
            z(Wb, e);
            return e
        },
        Yb = function (a) {
            return !!(a.clientid && a.scope && a.callback)
        };
    var Zb = window.console, $b = function (a) {
        Zb && Zb.log && Zb.log(a)
    };
    var ac = function () {
        return !!F.oa
    }, bc = function () {
    };
    var R = w(F, "rw", x()), cc = function (a) {
        for (var b in R)a(R[b])
    }, dc = function (a, b) {
        (a = R[a]) && a.state < b && (a.state = b)
    };
    var ec;
    var fc = /^https?:\/\/(?:\w|[\-\.])+\.google\.(?:\w|[\-:\.])+(?:\/[^\?\#]*)?\/u\/(\d)\//, gc = /^https?:\/\/(?:\w|[\-\.])+\.google\.(?:\w|[\-:\.])+(?:\/[^\?\#]*)?\/b\/(\d{10,21})\//, hc = function (a) {
        var b = Q("googleapis.config/sessionIndex");
        "string" === typeof b && 254 < b.length && (b = null);
        null == b && (b = window.__X_GOOG_AUTHUSER);
        "string" === typeof b && 254 < b.length && (b = null);
        if (null == b) {
            var c = window.google;
            c && (b = c.authuser)
        }
        "string" === typeof b && 254 < b.length && (b = null);
        null == b && (a = a || window.location.href, b = D(a, "authuser") ||
            null, null == b && (b = (b = a.match(fc)) ? b[1] : null));
        if (null == b)return null;
        b = String(b);
        254 < b.length && (b = null);
        return b
    }, ic = function (a) {
        var b = Q("googleapis.config/sessionDelegate");
        "string" === typeof b && 21 < b.length && (b = null);
        null == b && (b = (a = (a || window.location.href).match(gc)) ? a[1] : null);
        if (null == b)return null;
        b = String(b);
        21 < b.length && (b = null);
        return b
    };
    var S = function (a) {
        return 10 > a ? "0" + a : a
    }, jc = {
        "\b": "\\b",
        "\t": "\\t",
        "\n": "\\n",
        "\f": "\\f",
        "\r": "\\r",
        '"': '\\"',
        "\\": "\\\\"
    }, kc = function (a) {
        var b;
        var c = /[\"\\\x00-\x1f\x7f-\x9f]/g;
        if (void 0 !== a) {
            switch (typeof a) {
                case "string":
                    return c.test(a) ? '"' + a.replace(c, function (a) {
                        var b = jc[a];
                        if (b)return b;
                        b = a.charCodeAt();
                        return "\\u00" + Math.floor(b / 16).toString(16) + (b % 16).toString(16)
                    }) + '"' : '"' + a + '"';
                case "number":
                    return isFinite(a) ? String(a) : "null";
                case "boolean":
                case "null":
                    return String(a);
                case "object":
                    if (!a)return "null";
                    c = [];
                    if ("number" === typeof a.length && !a.propertyIsEnumerable("length")) {
                        var d = a.length;
                        for (b = 0; b < d; b += 1)c.push(kc(a[b]) || "null");
                        return "[" + c.join(",") + "]"
                    }
                    for (b in a)!/___$/.test(b) && y(a, b) && "string" === typeof b && (d = kc(a[b])) && c.push(kc(b) + ":" + d);
                    return "{" + c.join(",") + "}"
            }
            return ""
        }
    }, lc = function (a) {
        if (!a)return !1;
        if (/^[\],:{}\s]*$/.test(a.replace(/\\["\\\/b-u]/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, "")))try {
            return eval("(" +
                a + ")")
        } catch (b) {
        }
        return !1
    }, mc = !1;
    try {
        mc = !!window.JSON && '["a"]' === window.JSON.stringify(["a"]) && "a" === window.JSON.parse('["a"]')[0]
    } catch (a) {
    }
    var nc = function (a) {
        try {
            return window.JSON.parse(a)
        } catch (b) {
            return !1
        }
    }, oc = mc ? window.JSON.stringify : kc, pc = mc ? nc : lc;
    nc || (Date.prototype.toJSON = function () {
        return [this.getUTCFullYear(), "-", S(this.getUTCMonth() + 1), "-", S(this.getUTCDate()), "T", S(this.getUTCHours()), ":", S(this.getUTCMinutes()), ":", S(this.getUTCSeconds()), "Z"].join("")
    });
    var qc = function () {
        this.i = -1
    };
    var T = function () {
        this.i = 64;
        this.b = [];
        this.D = [];
        this.V = [];
        this.A = [];
        this.A[0] = 128;
        for (var a = 1; a < this.i; ++a)this.A[a] = 0;
        this.B = this.l = 0;
        this.reset()
    };
    (function () {
        function a() {
        }

        a.prototype = qc.prototype;
        T.ea = qc.prototype;
        T.prototype = new a;
        T.prototype.constructor = T;
        T.v = function (a, c, d) {
            for (var b = Array(arguments.length - 2), f = 2; f < arguments.length; f++)b[f - 2] = arguments[f];
            return qc.prototype[c].apply(a, b)
        }
    })();
    T.prototype.reset = function () {
        this.b[0] = 1732584193;
        this.b[1] = 4023233417;
        this.b[2] = 2562383102;
        this.b[3] = 271733878;
        this.b[4] = 3285377520;
        this.B = this.l = 0
    };
    var rc = function (a, b, c) {
        c || (c = 0);
        var d = a.V;
        if ("string" == typeof b)for (var e = 0; 16 > e; e++)d[e] = b.charCodeAt(c) << 24 | b.charCodeAt(c + 1) << 16 | b.charCodeAt(c + 2) << 8 | b.charCodeAt(c + 3), c += 4; else for (e = 0; 16 > e; e++)d[e] = b[c] << 24 | b[c + 1] << 16 | b[c + 2] << 8 | b[c + 3], c += 4;
        for (e = 16; 80 > e; e++) {
            var f = d[e - 3] ^ d[e - 8] ^ d[e - 14] ^ d[e - 16];
            d[e] = (f << 1 | f >>> 31) & 4294967295
        }
        b = a.b[0];
        c = a.b[1];
        var g = a.b[2], h = a.b[3], k = a.b[4];
        for (e = 0; 80 > e; e++) {
            if (40 > e)if (20 > e) {
                f = h ^ c & (g ^ h);
                var l = 1518500249
            } else f = c ^ g ^ h, l = 1859775393; else 60 > e ? (f = c & g | h & (c | g), l = 2400959708) :
                (f = c ^ g ^ h, l = 3395469782);
            f = (b << 5 | b >>> 27) + f + k + l + d[e] & 4294967295;
            k = h;
            h = g;
            g = (c << 30 | c >>> 2) & 4294967295;
            c = b;
            b = f
        }
        a.b[0] = a.b[0] + b & 4294967295;
        a.b[1] = a.b[1] + c & 4294967295;
        a.b[2] = a.b[2] + g & 4294967295;
        a.b[3] = a.b[3] + h & 4294967295;
        a.b[4] = a.b[4] + k & 4294967295
    };
    T.prototype.update = function (a, b) {
        if (null != a) {
            void 0 === b && (b = a.length);
            for (var c = b - this.i, d = 0, e = this.D, f = this.l; d < b;) {
                if (0 == f)for (; d <= c;)rc(this, a, d), d += this.i;
                if ("string" == typeof a)for (; d < b;) {
                    if (e[f] = a.charCodeAt(d), ++f, ++d, f == this.i) {
                        rc(this, e);
                        f = 0;
                        break
                    }
                } else for (; d < b;)if (e[f] = a[d], ++f, ++d, f == this.i) {
                    rc(this, e);
                    f = 0;
                    break
                }
            }
            this.l = f;
            this.B += b
        }
    };
    T.prototype.digest = function () {
        var a = [], b = 8 * this.B;
        56 > this.l ? this.update(this.A, 56 - this.l) : this.update(this.A, this.i - (this.l - 56));
        for (var c = this.i - 1; 56 <= c; c--)this.D[c] = b & 255, b /= 256;
        rc(this, this.D);
        for (c = b = 0; 5 > c; c++)for (var d = 24; 0 <= d; d -= 8)a[b] = this.b[c] >> d & 255, ++b;
        return a
    };
    var sc = function () {
        this.H = new T
    };
    sc.prototype.reset = function () {
        this.H.reset()
    };
    var tc = t.crypto, uc = !1, vc = 0, wc = 0, xc = 1, yc = 0, zc = "", Ac = function (a) {
        a = a || t.event;
        var b = a.screenX + a.clientX << 16;
        b += a.screenY + a.clientY;
        b *= (new Date).getTime() % 1E6;
        xc = xc * b % yc;
        0 < vc && ++wc == vc && Za("mousemove", Ac, "remove", "de")
    }, Bc = function (a) {
        var b = new sc;
        a = unescape(encodeURIComponent(a));
        for (var c = [], d = 0, e = a.length; d < e; ++d)c.push(a.charCodeAt(d));
        b.H.update(c);
        b = b.H.digest();
        a = "";
        for (c = 0; c < b.length; c++)a += "0123456789ABCDEF".charAt(Math.floor(b[c] / 16)) + "0123456789ABCDEF".charAt(b[c] % 16);
        return a
    };
    uc = !!tc && "function" == typeof tc.getRandomValues;
    uc || (yc = 1E6 * (screen.width * screen.width + screen.height), zc = Bc(v.cookie + "|" + v.location + "|" + (new Date).getTime() + "|" + Math.random()), vc = Q("random/maxObserveMousemove") || 0, 0 != vc && Za("mousemove", Ac, "add", "at"));
    var Cc = function () {
        var a = xc;
        a += parseInt(zc.substr(0, 20), 16);
        zc = Bc(zc);
        return a / (yc + Math.pow(16, 20))
    }, Dc = function () {
        var a = new t.Uint32Array(1);
        tc.getRandomValues(a);
        return Number("0." + a[0])
    };
    var Ec = function () {
        var a = F.onl;
        if (!a) {
            a = x();
            F.onl = a;
            var b = x();
            a.e = function (a) {
                var c = b[a];
                c && (delete b[a], c())
            };
            a.a = function (a, d) {
                b[a] = d
            };
            a.r = function (a) {
                delete b[a]
            }
        }
        return a
    }, Fc = function (a, b) {
        b = b.onload;
        return "function" === typeof b ? (Ec().a(a, b), b) : null
    }, Gc = function (a) {
        B(/^\w+$/.test(a), "Unsupported id - " + a);
        Ec();
        return 'onload="window.___jsl.onl.e(&#34;' + a + '&#34;)"'
    }, Hc = function (a) {
        Ec().r(a)
    };
    var Ic = {
        allowtransparency: "true",
        frameborder: "0",
        hspace: "0",
        marginheight: "0",
        marginwidth: "0",
        scrolling: "no",
        style: "",
        tabindex: "0",
        vspace: "0",
        width: "100%"
    }, Jc = {allowtransparency: !0, onload: !0}, Kc = 0, Lc = function (a) {
        B(!a || Ya.test(a), "Illegal url for new iframe - " + a)
    }, Mc = function (a, b, c, d, e) {
        Lc(c.src);
        var f, g = Fc(d, c), h = g ? Gc(d) : "";
        try {
            document.all && (f = a.createElement('<iframe frameborder="' + La(String(c.frameborder)) + '" scrolling="' + La(String(c.scrolling)) + '" ' + h + ' name="' + La(String(c.name)) + '"/>'))
        } catch (l) {
        } finally {
            f ||
            (f = a.createElement("iframe"), g && (f.onload = function () {
                f.onload = null;
                g.call(this)
            }, Hc(d)))
        }
        f.setAttribute("ng-non-bindable", "");
        for (var k in c)a = c[k], "style" === k && "object" === typeof a ? z(a, f.style) : Jc[k] || f.setAttribute(k, String(a));
        (k = e && e.beforeNode || null) || e && e.dontclear || db(b);
        b.insertBefore(f, k);
        f = k ? k.previousSibling : b.lastChild;
        c.allowtransparency && (f.allowTransparency = !0);
        return f
    };
    var Nc = /^:[\w]+$/, Oc = /:([a-zA-Z_]+):/g, Pc = function () {
        var a = hc() || "0", b = ic();
        var c = hc(void 0) || a;
        var d = ic(void 0), e = "";
        c && (e += "u/" + encodeURIComponent(String(c)) + "/");
        d && (e += "b/" + encodeURIComponent(String(d)) + "/");
        c = e || null;
        (e = (d = !1 === Q("isLoggedIn")) ? "_/im/" : "") && (c = "");
        var f = Q("iframes/:socialhost:"), g = Q("iframes/:im_socialhost:");
        return ec = {
            socialhost: f,
            ctx_socialhost: d ? g : f,
            session_index: a,
            session_delegate: b,
            session_prefix: c,
            im_prefix: e
        }
    }, Qc = function (a, b) {
        return Pc()[b] || ""
    }, Rc = function (a) {
        return function (b,
                         c) {
            return a ? Pc()[c] || a[c] || "" : Pc()[c] || ""
        }
    };
    var Sc = function (a) {
        var b;
        a.match(/^https?%3A/i) && (b = decodeURIComponent(a));
        return Xa(document, b ? b : a)
    }, Tc = function (a) {
        a = a || "canonical";
        for (var b = document.getElementsByTagName("link"), c = 0, d = b.length; c < d; c++) {
            var e = b[c], f = e.getAttribute("rel");
            if (f && f.toLowerCase() == a && (e = e.getAttribute("href")) && (e = Sc(e)) && null != e.match(/^https?:\/\/[\w\-\_\.]+/i))return e
        }
        return window.location.href
    };
    var Uc = {se: "0"}, Vc = {post: !0}, Wc = {style: "position:absolute;top:-10000px;width:450px;margin:0px;border-style:none"}, Xc = "onPlusOne _ready _close _open _resizeMe _renderstart oncircled drefresh erefresh".split(" "), Yc = w(F, "WI", x()), Zc = function (a, b, c) {
        var d;
        var e = {};
        var f = d = a;
        "plus" == a && b.action && (d = a + "_" + b.action, f = a + "/" + b.action);
        (d = Q("iframes/" + d + "/url")) || (d = ":im_socialhost:/:session_prefix::im_prefix:_/widget/render/" + f + "?usegapi=1");
        for (var g in Uc)e[g] = g + "/" + (b[g] || Uc[g]) + "/";
        e = Xa(v, d.replace(Oc,
            Rc(e)));
        g = "iframes/" + a + "/params/";
        f = {};
        z(b, f);
        (d = Q("lang") || Q("gwidget/lang")) && (f.hl = d);
        Vc[a] || (f.origin = window.location.origin || window.location.protocol + "//" + window.location.host);
        f.exp = Q(g + "exp");
        if (g = Q(g + "location"))for (d = 0; d < g.length; d++) {
            var h = g[d];
            f[h] = t.location[h]
        }
        switch (a) {
            case "plus":
            case "follow":
                g = f.href;
                d = b.action ? void 0 : "publisher";
                g = (g = "string" == typeof g ? g : void 0) ? Sc(g) : Tc(d);
                f.url = g;
                delete f.href;
                break;
            case "plusone":
                g = (g = b.href) ? Sc(g) : Tc();
                f.url = g;
                g = b.db;
                d = Q();
                null == g && d && (g = d.db,
                null == g && (g = d.gwidget && d.gwidget.db));
                f.db = g || void 0;
                g = b.ecp;
                d = Q();
                null == g && d && (g = d.ecp, null == g && (g = d.gwidget && d.gwidget.ecp));
                f.ecp = g || void 0;
                delete f.href;
                break;
            case "signin":
                f.url = Tc()
        }
        F.ILI && (f.iloader = "1");
        delete f["data-onload"];
        delete f.rd;
        for (var k in Uc)f[k] && delete f[k];
        f.gsrc = Q("iframes/:source:");
        k = Q("inline/css");
        "undefined" !== typeof k && 0 < c && k >= c && (f.ic = "1");
        k = /^#|^fr-/;
        c = {};
        for (var l in f)y(f, l) && k.test(l) && (c[l.replace(k, "")] = f[l], delete f[l]);
        l = "q" == Q("iframes/" + a + "/params/si") ? f :
            c;
        k = Xb();
        for (var q in k)!y(k, q) || y(f, q) || y(c, q) || (l[q] = k[q]);
        q = [].concat(Xc);
        (l = Q("iframes/" + a + "/methods")) && "object" === typeof l && Ca.test(l.push) && (q = q.concat(l));
        for (var r in b)y(b, r) && /^on/.test(r) && ("plus" != a || "onconnect" != r) && (q.push(r), delete f[r]);
        delete f.callback;
        c._methods = q.join(",");
        return Va(e, f, c)
    }, $c = ["style", "data-gapiscan"], bd = function (a) {
        for (var b = x(), c = 0 != a.nodeName.toLowerCase().indexOf("g:"), d = 0, e = a.attributes.length; d < e; d++) {
            var f = a.attributes[d], g = f.name, h = f.value;
            0 <= Da.call($c,
                g) || c && 0 != g.indexOf("data-") || "null" === h || "specified" in f && !f.specified || (c && (g = g.substr(5)), b[g.toLowerCase()] = h)
        }
        a = a.style;
        (c = ad(a && a.height)) && (b.height = String(c));
        (a = ad(a && a.width)) && (b.width = String(a));
        return b
    }, ad = function (a) {
        var b = void 0;
        "number" === typeof a ? b = a : "string" === typeof a && (b = parseInt(a, 10));
        return b
    }, dd = function () {
        var a = F.drw;
        cc(function (b) {
            if (a !== b.id && 4 != b.state && "share" != b.type) {
                var c = b.id, d = b.type, e = b.url;
                b = b.userParams;
                var f = v.getElementById(c);
                if (f) {
                    var g = Zc(d, b, 0);
                    g ? (f = f.parentNode,
                    e.replace(/\#.*/, "").replace(/(\?|&)ic=1/, "") !== g.replace(/\#.*/, "").replace(/(\?|&)ic=1/, "") && (b.dontclear = !0, b.rd = !0, b.ri = !0, b.type = d, cd(f, b), (d = R[f.lastChild.id]) && (d.oid = c), dc(c, 4))) : delete R[c]
                } else delete R[c]
            }
        })
    };
    var U, V, W, ed, fd, gd = /(?:^|\s)g-((\S)*)(?:$|\s)/, hd = {
        plusone: !0,
        autocomplete: !0,
        profile: !0,
        signin: !0,
        signin2: !0
    };
    U = w(F, "SW", x());
    V = w(F, "SA", x());
    W = w(F, "SM", x());
    ed = w(F, "FW", []);
    fd = null;
    var jd = function (a, b) {
        id(void 0, !1, a, b)
    }, id = function (a, b, c, d) {
        G("ps0", !0);
        c = ("string" === typeof c ? document.getElementById(c) : c) || v;
        var e = v.documentMode;
        if (c.querySelectorAll && (!e || 8 < e)) {
            e = d ? [d] : Ma(U).concat(Ma(V)).concat(Ma(W));
            for (var f = [], g = 0; g < e.length; g++) {
                var h = e[g];
                f.push(".g-" + h, "g\\:" + h)
            }
            e = c.querySelectorAll(f.join(","))
        } else e = c.getElementsByTagName("*");
        c = x();
        for (f = 0; f < e.length; f++) {
            g = e[f];
            var k = g;
            h = d;
            var l = k.nodeName.toLowerCase(), q = void 0;
            k.getAttribute("data-gapiscan") ? h = null : (0 == l.indexOf("g:") ?
                q = l.substr(2) : (k = (k = String(k.className || k.getAttribute("class"))) && gd.exec(k)) && (q = k[1]), h = !q || !(U[q] || V[q] || W[q]) || h && q !== h ? null : q);
            h && (hd[h] || 0 == g.nodeName.toLowerCase().indexOf("g:") || 0 != Ma(bd(g)).length) && (g.setAttribute("data-gapiscan", !0), w(c, h, []).push(g))
        }
        if (b)for (var r in c)for (b = c[r], d = 0; d < b.length; d++)b[d].setAttribute("data-onload", !0);
        for (var n in c)ed.push(n);
        G("ps1", !0);
        if ((r = ed.join(":")) || a)try {
            C.load(r, a)
        } catch (A) {
            $b(A);
            return
        }
        if (kd(fd || {}))for (var u in c) {
            a = c[u];
            n = 0;
            for (b = a.length; n <
            b; n++)a[n].removeAttribute("data-gapiscan");
            ld(u)
        } else {
            d = [];
            for (u in c)for (a = c[u], n = 0, b = a.length; n < b; n++)e = a[n], md(u, e, bd(e), d, b);
            nd(r, d)
        }
    }, od = function (a) {
        var b = w(C, a, {});
        b.go || (b.go = function (b) {
            return jd(b, a)
        }, b.render = function (b, d) {
            d = d || {};
            d.type = a;
            return cd(b, d)
        })
    }, pd = function (a) {
        U[a] = !0
    }, qd = function (a) {
        V[a] = !0
    }, rd = function (a) {
        W[a] = !0
    };
    var ld = function (a, b) {
        var c = hb(a);
        b && c ? (c(b), (c = b.iframeNode) && c.setAttribute("data-gapiattached", !0)) : C.load(a, function () {
            var c = hb(a), e = b && b.iframeNode, f = b && b.userParams;
            e && c ? (c(b), e.setAttribute("data-gapiattached", !0)) : (c = C[a].go, "signin2" == a ? c(e, f) : c(e && e.parentNode, f))
        })
    }, kd = function () {
        return !1
    }, nd = function () {
    }, md = function (a, b, c, d, e, f, g) {
        switch (sd(b, a, f)) {
            case 0:
                a = W[a] ? a + "_annotation" : a;
                d = {};
                d.iframeNode = b;
                d.userParams = c;
                ld(a, d);
                break;
            case 1:
                if (b.parentNode) {
                    for (var h in c) {
                        if (f = y(c, h))f = c[h],
                            f = !!f && "object" === typeof f && (!f.toString || f.toString === Object.prototype.toString || f.toString === Array.prototype.toString);
                        if (f)try {
                            c[h] = oc(c[h])
                        } catch (A) {
                            delete c[h]
                        }
                    }
                    f = !0;
                    c.dontclear && (f = !1);
                    delete c.dontclear;
                    bc();
                    h = Zc(a, c, e);
                    e = g || {};
                    e.allowPost = 1;
                    e.attributes = Wc;
                    e.dontclear = !f;
                    g = {};
                    g.userParams = c;
                    g.url = h;
                    g.type = a;
                    if (c.rd)var k = b; else k = document.createElement("div"), b.setAttribute("data-gapistub", !0), k.style.cssText = "position:absolute;width:450px;left:-10000px;", b.parentNode.insertBefore(k, b);
                    g.siteElement =
                        k;
                    k.id || (b = k, w(Yc, a, 0), f = "___" + a + "_" + Yc[a]++, b.id = f);
                    b = x();
                    b[">type"] = a;
                    z(c, b);
                    f = h;
                    c = k;
                    h = e || {};
                    b = h.attributes || {};
                    B(!(h.allowPost || h.forcePost) || !b.onload, "onload is not supported by post iframe (allowPost or forcePost)");
                    e = b = f;
                    Nc.test(b) && (e = Q("iframes/" + e.substring(1) + "/url"), B(!!e, "Unknown iframe url config for - " + b));
                    f = Xa(v, e.replace(Oc, Qc));
                    b = c.ownerDocument || v;
                    k = 0;
                    do e = h.id || ["I", Kc++, "_", (new Date).getTime()].join(""); while (b.getElementById(e) && 5 > ++k);
                    B(5 > k, "Error creating iframe id");
                    k = {};
                    var l = {};
                    b.documentMode && 9 > b.documentMode && (k.hostiemode = b.documentMode);
                    z(h.queryParams || {}, k);
                    z(h.fragmentParams || {}, l);
                    var q = h.pfname;
                    var r = x();
                    r.id = e;
                    r.parent = b.location.protocol + "//" + b.location.host;
                    var n = D(b.location.href, "parent");
                    q = q || "";
                    !q && n && (n = D(b.location.href, "id", ""), q = D(b.location.href, "pfname", ""), q = n ? q + "/" + n : "");
                    q || (n = pc(D(b.location.href, "jcp", ""))) && "object" == typeof n && (q = (q = n.id) ? n.pfname + "/" + q : "");
                    r.pfname = q;
                    h.connectWithJsonParam && (n = {}, n.jcp = oc(r), r = n);
                    n = D(f, "rpctoken") || k.rpctoken ||
                        l.rpctoken;
                    n || (n = h.rpctoken || String(Math.round(1E8 * (uc ? Dc() : Cc()))), r.rpctoken = n);
                    h.rpctoken = n;
                    z(r, h.connectWithQueryParams ? k : l);
                    n = b.location.href;
                    r = x();
                    (q = D(n, "_bsh", F.bsh)) && (r._bsh = q);
                    (n = fb(n)) && (r.jsh = n);
                    h.hintInFragment ? z(r, l) : z(r, k);
                    f = Va(f, k, l, h.paramsSerializer);
                    l = x();
                    z(Ic, l);
                    z(h.attributes, l);
                    l.name = l.id = e;
                    l.src = f;
                    h.eurl = f;
                    k = h || {};
                    r = !!k.allowPost;
                    if (k.forcePost || r && 2E3 < f.length) {
                        k = E(f);
                        l.src = "";
                        l["data-postorigin"] = f;
                        f = Mc(b, c, l, e);
                        if (-1 != navigator.userAgent.indexOf("WebKit")) {
                            var u = f.contentWindow.document;
                            u.open();
                            l = u.createElement("div");
                            r = {};
                            n = e + "_inner";
                            r.name = n;
                            r.src = "";
                            r.style = "display:none";
                            Mc(b, l, r, n, h)
                        }
                        l = (h = k.query[0]) ? h.split("&") : [];
                        h = [];
                        for (r = 0; r < l.length; r++)n = l[r].split("=", 2), h.push([decodeURIComponent(n[0]), decodeURIComponent(n[1])]);
                        k.query = [];
                        l = Ta(k);
                        B(Ya.test(l), "Invalid URL: " + l);
                        k = b.createElement("form");
                        k.action = l;
                        k.method = "POST";
                        k.target = e;
                        k.style.display = "none";
                        for (e = 0; e < h.length; e++)l = b.createElement("input"), l.type = "hidden", l.name = h[e][0], l.value = h[e][1], k.appendChild(l);
                        c.appendChild(k);
                        k.submit();
                        k.parentNode.removeChild(k);
                        u && u.close();
                        u = f
                    } else u = Mc(b, c, l, e, h);
                    g.iframeNode = u;
                    g.id = u.getAttribute("id");
                    u = g.id;
                    c = x();
                    c.id = u;
                    c.userParams = g.userParams;
                    c.url = g.url;
                    c.type = g.type;
                    c.state = 1;
                    R[u] = c;
                    u = g
                } else u = null;
                u && ((g = u.id) && d.push(g), ld(a, u))
        }
    }, sd = function (a, b, c) {
        if (a && 1 === a.nodeType && b) {
            if (c)return 1;
            if (W[b]) {
                if (eb[a.nodeName.toLowerCase()])return (a = a.innerHTML) && a.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "") ? 0 : 1
            } else {
                if (V[b])return 0;
                if (U[b])return 1
            }
        }
        return null
    }, cd = function (a, b) {
        var c = b.type;
        delete b.type;
        var d = ("string" === typeof a ? document.getElementById(a) : a) || void 0;
        if (d) {
            a = {};
            for (var e in b)y(b, e) && (a[e.toLowerCase()] = b[e]);
            a.rd = 1;
            (b = !!a.ri) && delete a.ri;
            e = [];
            md(c, d, a, e, 0, b, void 0);
            nd(c, e)
        } else $b("string" === "gapi." + c + ".render: missing element " + typeof a ? a : "")
    };
    w(C, "platform", {}).go = jd;
    kd = function (a) {
        for (var b = ["_c", "jsl", "h"], c = 0; c < b.length && a; c++)a = a[b[c]];
        b = fb(Aa.href);
        return !a || 0 != a.indexOf("n;") && 0 != b.indexOf("n;") && a !== b
    };
    nd = function (a, b) {
        td(a, b)
    };
    var ab = function (a) {
        id(a, !0)
    }, ud = function (a, b) {
        b = b || [];
        for (var c = 0; c < b.length; ++c)a(b[c]);
        for (a = 0; a < b.length; a++)od(b[a])
    };
    J.push(["platform", function (a, b, c) {
        fd = c;
        b && ed.push(b);
        ud(pd, a);
        ud(qd, c._c.annotation);
        ud(rd, c._c.bimodal);
        Tb();
        Rb();
        if ("explicit" != Q("parsetags")) {
            gb(a);
            Yb(Xb()) && !Q("disableRealtimeCallback") && bc();
            if (c && (a = c.callback)) {
                var d = Na(a);
                delete c.callback
            }
            cb(function () {
                ab(d)
            })
        }
    }]);
    C._pl = !0;
    var vd = function (a) {
        a = (a = R[a]) ? a.oid : void 0;
        if (a) {
            var b = v.getElementById(a);
            b && b.parentNode.removeChild(b);
            delete R[a];
            vd(a)
        }
    };
    var wd = /^\{h\:'/, xd = /^!_/, yd = "", td = function (a, b) {
        function c() {
            Za("message", d, "remove", "de")
        }

        function d(d) {
            var f = d.data, h = d.origin;
            if (zd(f, b)) {
                var k = e;
                e = !1;
                k && G("rqe");
                Ad(a, function () {
                    k && G("rqd");
                    c();
                    for (var a = w(F, "RPMQ", []), b = 0; b < a.length; b++)a[b]({data: f, origin: h})
                })
            }
        }

        if (0 !== b.length) {
            yd = D(Aa.href, "pfname", "");
            var e = !0;
            Za("message", d, "add", "at");
            M(a, c)
        }
    }, zd = function (a, b) {
        a = String(a);
        if (wd.test(a))return !0;
        var c = !1;
        xd.test(a) && (c = !0, a = a.substr(2));
        if (!/^\{/.test(a))return !1;
        var d = pc(a);
        if (!d)return !1;
        a = d.f;
        if (d.s && a && -1 != Da.call(b, a)) {
            if ("_renderstart" === d.s || d.s === yd + "/" + a + "::_renderstart")if (d = d.a && d.a[c ? 0 : 1], b = v.getElementById(a), dc(a, 2), d && b && d.width && d.height) {
                a:{
                    c = b.parentNode;
                    a = d || {};
                    if (ac()) {
                        var e = b.id;
                        if (e) {
                            d = (d = R[e]) ? d.state : void 0;
                            if (1 === d || 4 === d)break a;
                            vd(e)
                        }
                    }
                    (d = c.nextSibling) && d.getAttribute && d.getAttribute("data-gapistub") && (c.parentNode.removeChild(d), c.style.cssText = "");
                    d = a.width;
                    var f = a.height, g = c.style;
                    g.textIndent = "0";
                    g.margin = "0";
                    g.padding = "0";
                    g.background = "transparent";
                    g.borderStyle =
                        "none";
                    g.cssFloat = "none";
                    g.styleFloat = "none";
                    g.lineHeight = "normal";
                    g.fontSize = "1px";
                    g.verticalAlign = "baseline";
                    c = c.style;
                    c.display = "inline-block";
                    g = b.style;
                    g.position = "static";
                    g.left = "0";
                    g.top = "0";
                    g.visibility = "visible";
                    d && (c.width = g.width = d + "px");
                    f && (c.height = g.height = f + "px");
                    a.verticalAlign && (c.verticalAlign = a.verticalAlign);
                    e && dc(e, 3)
                }
                b["data-csi-wdt"] = (new Date).getTime()
            }
            return !0
        }
        return !1
    }, Ad = function (a, b) {
        M(a, b)
    };
    var X = function (a, b) {
        this.G = a;
        a = b || {};
        this.X = Number(a.maxAge) || 0;
        this.M = a.domain;
        this.P = a.path;
        this.Z = !!a.secure
    }, Bd = /^[-+/_=.:|%&a-zA-Z0-9@]*$/, Cd = /^[A-Z_][A-Z0-9_]{0,63}$/;
    X.prototype.read = function () {
        for (var a = this.G + "=", b = document.cookie.split(/;\s*/), c = 0; c < b.length; ++c) {
            var d = b[c];
            if (0 == d.indexOf(a))return d.substr(a.length)
        }
    };
    X.prototype.write = function (a, b) {
        if (!Cd.test(this.G))throw"Invalid cookie name";
        if (!Bd.test(a))throw"Invalid cookie value";
        a = this.G + "=" + a;
        this.M && (a += ";domain=" + this.M);
        this.P && (a += ";path=" + this.P);
        b = "number" === typeof b ? b : this.X;
        if (0 <= b) {
            var c = new Date;
            c.setSeconds(c.getSeconds() + b);
            a += ";expires=" + c.toUTCString()
        }
        this.Z && (a += ";secure");
        document.cookie = a;
        return !0
    };
    X.prototype.clear = function () {
        this.write("", 0)
    };
    X.iterate = function (a) {
        for (var b = document.cookie.split(/;\s*/), c = 0; c < b.length; ++c) {
            var d = b[c].split("="), e = d.shift();
            a(e, d.join("="))
        }
    };
    var Dd = function (a) {
        this.w = a
    }, Y = {};
    Dd.prototype.read = function () {
        if (Y.hasOwnProperty(this.w))return Y[this.w]
    };
    Dd.prototype.write = function (a) {
        Y[this.w] = a;
        return !0
    };
    Dd.prototype.clear = function () {
        delete Y[this.w]
    };
    Dd.iterate = function (a) {
        for (var b in Y)Y.hasOwnProperty(b) && a(b, Y[b])
    };
    var Ed = "https:" === window.location.protocol, Fd = Ed || "http:" === window.location.protocol ? X : Dd, Gd = function (a) {
        var b = a.substr(1), c = "", d = window.location.hostname;
        if ("" !== b) {
            c = parseInt(b, 10);
            if (isNaN(c))return null;
            b = d.split(".");
            if (b.length < c - 1)return null;
            b.length == c - 1 && (d = "." + d)
        } else d = "";
        return {g: "S" == a.charAt(0), domain: d, j: c}
    }, Hd = function () {
        var a, b = null;
        Fd.iterate(function (c, d) {
            0 === c.indexOf("G_AUTHUSER_") && (c = Gd(c.substring(11)), !a || c.g && !a.g || c.g == a.g && c.j > a.j) && (a = c, b = d)
        });
        return {W: a, C: b}
    };
    var Id = function (a) {
        if (0 !== a.indexOf("GCSC"))return null;
        var b = {O: !1};
        a = a.substr(4);
        if (!a)return b;
        var c = a.charAt(0);
        a = a.substr(1);
        var d = a.lastIndexOf("_");
        if (-1 == d)return b;
        var e = Gd(a.substr(d + 1));
        if (null == e)return b;
        a = a.substring(0, d);
        if ("_" !== a.charAt(0))return b;
        d = "E" === c && e.g;
        return !d && ("U" !== c || e.g) || d && !Ed ? b : {O: !0, g: d, ba: a.substr(1), domain: e.domain, j: e.j}
    }, Jd = function (a) {
        if (!a)return [];
        a = a.split("=");
        return a[1] ? a[1].split("|") : []
    }, Kd = function (a) {
        a = a.split(":");
        return {
            clientId: a[0].split("=")[1],
            aa: Jd(a[1]), da: Jd(a[2]), ca: Jd(a[3])
        }
    }, Ld = function () {
        var a = Hd(), b = a.W;
        a = a.C;
        if (null !== a) {
            var c;
            Fd.iterate(function (a, d) {
                (a = Id(a)) && a.O && a.g == b.g && a.j == b.j && (c = d)
            });
            if (c) {
                var d = Kd(c), e = d && d.aa[Number(a)];
                d = d && d.clientId;
                if (e)return {C: a, $: e, clientId: d}
            }
        }
        return null
    };
    var Z = function (a) {
        this.L = a
    };
    Z.prototype.o = 0;
    Z.prototype.J = 2;
    Z.prototype.L = null;
    Z.prototype.F = !1;
    Z.prototype.T = function () {
        this.F || (this.o = 0, this.F = !0, this.R())
    };
    Z.prototype.R = function () {
        this.F && (this.L() ? this.o = this.J : this.o = Math.min(2 * (this.o || this.J), 120), window.setTimeout(da(this.R, this), 1E3 * this.o))
    };
    for (var Md = 0; 64 > Md; ++Md);
    var Nd = null;
    ac = function () {
        return F.oa = !0
    };
    bc = function () {
        F.oa = !0;
        var a = Ld();
        (a = a && a.C) && Sb("googleapis.config/sessionIndex", a);
        Nd || (Nd = w(F, "ss", new Z(Od)));
        a = Nd;
        a.T && a.T()
    };
    var Od = function () {
        var a = Ld(), b = a && a.$ || null, c = a && a.clientId;
        M("auth", {
            callback: function () {
                var a = t.gapi.auth, e = {client_id: c, session_state: b};
                a.checkSessionState(e, function (b) {
                    var c = e.session_state, d = Q("isLoggedIn");
                    b = Q("debug/forceIm") ? !1 : c && b || !c && !b;
                    if (d = d != b)Sb("isLoggedIn", b), bc(), dd(), b || ((b = a.signOut) ? b() : (b = a.setToken) && b(null));
                    b = Xb();
                    var f = Q("savedUserState");
                    c = a._guss(b.cookiepolicy);
                    f = f != c && "undefined" != typeof f;
                    Sb("savedUserState", c);
                    (d || f) && Yb(b) && !Q("disableRealtimeCallback") && a._pimf(b,
                        !0)
                })
            }
        });
        return !0
    };
    G("bs0", !0, window.gapi._bs);
    G("bs1", !0);
    delete window.gapi._bs;
}).call(this);
gapi.load("plusone", {
    callback: window["gapi_onload"],
    _c: {
        "jsl": {
            "ci": {
                "deviceType": "desktop",
                "oauth-flow": {
                    "authUrl": "https://accounts.google.com/o/oauth2/auth",
                    "proxyUrl": "https://accounts.google.com/o/oauth2/postmessageRelay",
                    "disableOpt": true,
                    "idpIframeUrl": "https://accounts.google.com/o/oauth2/iframe",
                    "usegapi": false
                },
                "debug": {
                    "reportExceptionRate": 0.05,
                    "forceIm": false,
                    "rethrowException": false,
                    "host": "https://apis.google.com"
                },
                "enableMultilogin": true,
                "googleapis.config": {"auth": {"useFirstPartyAuthV2": false}},
                "isPlusUser": false,
                "inline": {"css": 1},
                "disableRealtimeCallback": false,
                "drive_share": {"skipInitCommand": true},
                "csi": {"rate": 0.01},
                "client": {"cors": false, "batchPath": {"translate": "batch/translate"}, "perApiBatch": true},
                "isLoggedIn": false,
                "signInDeprecation": {"rate": 0.0},
                "include_granted_scopes": true,
                "llang": "zh",
                "iframes": {
                    "ytsubscribe": {"url": "https://www.youtube.com/subscribe_embed?usegapi\u003d1"},
                    "plus_share": {
                        "params": {"url": ""},
                        "url": ":socialhost:/:session_prefix::se:_/+1/sharebutton?plusShare\u003dtrue\u0026usegapi\u003d1"
                    },
                    ":source:": "3p",
                    "playemm": {"url": "https://play.google.com/work/embedded/search?usegapi\u003d1\u0026usegapi\u003d1"},
                    "partnersbadge": {"url": "https://www.gstatic.com/partners/badge/templates/badge.html?usegapi\u003d1"},
                    "dataconnector": {"url": "https://dataconnector.corp.google.com/:session_prefix:ui/widgetview?usegapi\u003d1"},
                    "shortlists": {"url": ""},
                    "plus_followers": {
                        "params": {"url": ""},
                        "url": ":socialhost:/_/im/_/widget/render/plus/followers?usegapi\u003d1"
                    },
                    "post": {
                        "params": {"url": ""},
                        "url": ":socialhost:/:session_prefix::im_prefix:_/widget/render/post?usegapi\u003d1"
                    },
                    "signin": {
                        "params": {"url": ""},
                        "url": ":socialhost:/:session_prefix:_/widget/render/signin?usegapi\u003d1",
                        "methods": ["onauth"]
                    },
                    "donation": {"url": "https://onetoday.google.com/home/donationWidget?usegapi\u003d1"},
                    "plusone": {
                        "params": {"count": "", "size": "", "url": ""},
                        "url": ":socialhost:/:session_prefix::se:_/+1/fastbutton?usegapi\u003d1"
                    },
                    ":im_socialhost:": "https://plus.googleapis.com",
                    "backdrop": {"url": "https://clients3.google.com/cast/chromecast/home/widget/backdrop?usegapi\u003d1"},
                    "visibility": {
                        "params": {"url": ""},
                        "url": ":socialhost:/:session_prefix:_/widget/render/visibility?usegapi\u003d1"
                    },
                    "additnow": {
                        "url": "https://apis.google.com/additnow/additnow.html?usegapi\u003d1",
                        "methods": ["launchurl"]
                    },
                    ":signuphost:": "https://plus.google.com",
                    "community": {"url": ":ctx_socialhost:/:session_prefix::im_prefix:_/widget/render/community?usegapi\u003d1"},
                    "plus": {"url": ":socialhost:/:session_prefix:_/widget/render/badge?usegapi\u003d1"},
                    "commentcount": {"url": ":socialhost:/:session_prefix:_/widget/render/commentcount?usegapi\u003d1"},
                    "zoomableimage": {"url": "https://ssl.gstatic.com/microscope/embed/"},
                    "appfinder": {"url": "https://gsuite.google.com/:session_prefix:marketplace/appfinder?usegapi\u003d1"},
                    "person": {"url": ":socialhost:/:session_prefix:_/widget/render/person?usegapi\u003d1"},
                    "savetodrive": {
                        "url": "https://drive.google.com/savetodrivebutton?usegapi\u003d1",
                        "methods": ["save"]
                    },
                    "page": {"url": ":socialhost:/:session_prefix:_/widget/render/page?usegapi\u003d1"},
                    "card": {"url": ":socialhost:/:session_prefix:_/hovercard/card"},
                    "youtube": {
                        "params": {"location": ["search", "hash"]},
                        "url": ":socialhost:/:session_prefix:_/widget/render/youtube?usegapi\u003d1",
                        "methods": ["scroll", "openwindow"]
                    },
                    "plus_circle": {
                        "params": {"url": ""},
                        "url": ":socialhost:/:session_prefix::se:_/widget/plus/circle?usegapi\u003d1"
                    },
                    "rbr_s": {
                        "params": {"url": ""},
                        "url": ":socialhost:/:session_prefix::se:_/widget/render/recobarsimplescroller"
                    },
                    "udc_webconsentflow": {
                        "params": {"url": ""},
                        "url": "https://myaccount.google.com/webconsent?usegapi\u003d1"
                    },
                    "savetoandroidpay": {"url": "https://androidpay.google.com/a/widget/save"},
                    "blogger": {
                        "params": {"location": ["search", "hash"]},
                        "url": ":socialhost:/:session_prefix:_/widget/render/blogger?usegapi\u003d1",
                        "methods": ["scroll", "openwindow"]
                    },
                    "evwidget": {
                        "params": {"url": ""},
                        "url": ":socialhost:/:session_prefix:_/events/widget?usegapi\u003d1"
                    },
                    "surveyoptin": {"url": "https://www.google.com/shopping/customerreviews/optin?usegapi\u003d1"},
                    ":socialhost:": "https://apis.google.com",
                    "hangout": {"url": "https://talkgadget.google.com/:session_prefix:talkgadget/_/widget"},
                    ":gplus_url:": "https://plus.google.com",
                    "rbr_i": {
                        "params": {"url": ""},
                        "url": ":socialhost:/:session_prefix::se:_/widget/render/recobarinvitation"
                    },
                    "share": {"url": ":socialhost:/:session_prefix::im_prefix:_/widget/render/share?usegapi\u003d1"},
                    "comments": {
                        "params": {"location": ["search", "hash"]},
                        "url": ":socialhost:/:session_prefix:_/widget/render/comments?usegapi\u003d1",
                        "methods": ["scroll", "openwindow"]
                    },
                    "autocomplete": {
                        "params": {"url": ""},
                        "url": ":socialhost:/:session_prefix:_/widget/render/autocomplete"
                    },
                    "ratingbadge": {"url": "https://www.google.com/shopping/customerreviews/badge?usegapi\u003d1"},
                    "appcirclepicker": {"url": ":socialhost:/:session_prefix:_/widget/render/appcirclepicker"},
                    "follow": {"url": ":socialhost:/:session_prefix:_/widget/render/follow?usegapi\u003d1"},
                    "sharetoclassroom": {"url": "https://www.gstatic.com/classroom/sharewidget/widget_stable.html?usegapi\u003d1"},
                    "ytshare": {
                        "params": {"url": ""},
                        "url": ":socialhost:/:session_prefix:_/widget/render/ytshare?usegapi\u003d1"
                    },
                    "family_creation": {
                        "params": {"url": ""},
                        "url": "https://families.google.com/webcreation?usegapi\u003d1\u0026usegapi\u003d1"
                    },
                    "configurator": {"url": ":socialhost:/:session_prefix:_/plusbuttonconfigurator?usegapi\u003d1"},
                    "savetowallet": {"url": "https://androidpay.google.com/a/widget/save"}
                }
            },
            "h": "m;/_/scs/apps-static/_/js/k\u003doz.gapi.zh_CN.MyLj-AHiKxc.O/m\u003d__features__/am\u003dAQ/rt\u003dj/d\u003d1/rs\u003dAGLTcCMOeRoMUfDV0R9rrCZ1WdwnQcKtLQ",
            "u": "https://apis.google.com/js/plusone.js",
            "hee": true,
            "fp": "5cab64ae4eb029a46d17bbb5a06e9138018b88ca",
            "dpo": false
        },
        "platform": ["additnow", "backdrop", "blogger", "comments", "commentcount", "community", "family_creation", "follow", "hangout", "page", "partnersbadge", "person", "playemm", "playreview", "plus", "plusone", "post", "savetoandroidpay", "savetodrive", "savetowallet", "shortlists", "signin2", "udc_webconsentflow", "visibility", "youtube", "ytsubscribe", "zoomableimage", "sharetoclassroom", "donation", "ratingbadge", "surveyoptin"],
        "fp": "5cab64ae4eb029a46d17bbb5a06e9138018b88ca",
        "annotation": ["interactivepost", "recobar", "signin2", "autocomplete", "profile"],
        "bimodal": ["signin", "share"]
    }
});