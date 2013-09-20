var VC = new function () {
    function CNT(p) {
        var a = new Array()
        this.getP = function () { return p; };
        this.setVar = function (k, v) {
            a[k] = v;
        };
        this.getVar = function (k) {
            if (a[k]) {
                return a[k];
            } else if (p != null) {
                return p.getVar(k);
            } else {
                return null;
            }
        };
        this.release = function () {
            if (p == null) {
                a = new Array();
            } else {
                var k;
                for (k in a) {
                    if (p.getVar(k) != null) {
                        a[k] = null;
                    }
                }
            }
        };
    }
    var glbCNT = new CNT(null);
    var curCNT = glbCNT;
    this.inNewScope = function () {
        curCNT = new CNT(curCNT);
    };
    this.outNowScope = function () {
        var tmp = curCNT;
        curCNT = tmp.getP();
        if (curCNT == null) {
            curCNT = tmp;
        } else {
            tmp.release();
        }
    };
    this.setVar = function (k, v) {
        if (curCNT.getP() != null) {
            curCNT.getP().setVar(k, v);
        } else {
            curCNT.setVar(k, v);
        }
    };
    this.getVar = function (k) { return curCNT.getVar(k); };
}

function STK() {
    var list = new Array();
    var n    = 0;
    this.pop = function () {
        return n == 0 ? null : list[--n];
    };
    this.peek = function () {
        return n == 0 ? null : list[n - 1];
    };
    this.push = function (v) {
        return list[n++] = v;
    };
    this.item = function (p) {
        if (list[p]) {
            return list[p];
        } else {
            return null;
        }
    };
    this.size = function () {
        return n;
    };
    this.clear = function () {
        n = 0;
    };
};
var TSTK = new STK();
var ASTK = new STK();
var FSTK = new STK();
var PSTK = new STK();
var RSTK = new STK();

function dv(s) {
    s = s.toUpperCase()
        .replace(/\r\n/g, "\n")
        .replace(/\r/g, "\n")
        .replace(/;[^\n]*\n/g, " ")
        .replace(/\n+/g, " ")
        .replace(/(\(|\)|\.)/g, " $1 ")
        .replace(/'/g, " ' ");
/*        .replace(/(^| |\n)('+)/g, "$1 $2 ");
    var s1 = s;
    do {
        s = s1;
        s1 = s.replace(/ ''/g, " ' ' ");
    } while (s1 != s); */
    s = s.replace(/ +/g, " ").replace(/^ /, "").replace(/ $/, "");
    return s.split(" ");
}

var T_ERROR     = -1;
var T_PGBEGIN   = 1;
var T_RQFUNC    = 2;
var T_GETARGS   = 3;
var T_QUOTE     = 4;
var T_QTLIST    = 5;

var pgcnt       = 0;
var pglist      = new Array();

function run(str) {
    var term = T_PGBEGIN;
    pgcnt = 0;
    pglist = dv(str);
    term = task(term);
}

function task(term) {
    var c;
    do {
        c = pglist[pgcnt];
        if (c == "(") {
            term = fOB(c, term);
        } else if (c == ")") {
            term = fCB(c, term);
        } else if (c == "'") {
            term = fQT(c, term);
        } else if (c == ".") {
            term = fDT(c, term);
        } else if (c != "") {
            term = fSB(c, term);
        } else {
            term = T_ERROR;
        }
        pgcnt++;
    } while ((pgcnt < pglist.length) && (term != T_ERROR));
    return term;
}

function fOB(term) {
    switch (term) {
        case T_PGBEGIN:
            TSTK.push(term);
            VC.inNewNest();
            return T_RQFUNC;
        case T_RQFUNC:
            TSTK.push(term);
            VC.inNewNest();
            return T_RQFUNC;
        case T_QUOTE:
        case T_QTLIST:
        default:
            return T_ERROR;
    }
}

function fCB(term) {
    switch (term) {
    case T_QTLIST:
    case T_GETARGS:
    default:
        return T_ERROR;
    }
}

function fQT(c, term) {
    switch (term) {
    case T_GETARGS:
    case T_QUOTE:
    case T_QTLIST:
    default:
        return T_ERROR;
    }
}

function fDT(c, term) {
    switch (term) {
    case T_QTLIST:
    default:
        return T_ERROR;
    }
}

function fSB(c, term) {
    var tmp;
    switch (term) {
    case T_PGBEGIN:
        tmp = VC.getVar(c);
        if (tmp != null) {
            RSTK.push(tmp);
            return T_PGBEGIN;
        } else {
            return T_ERROR;
        }
    case T_RQFUNC:
        
    case T_GETARGS:
    case T_QUOTE:
    case T_QTLIST:
    default:
        return T_ERROR;
    }
}
