///////////////////////////////////////////////////////////////////////////////////////
//  �V�X�e���萔
///////////////////////////////////////////////////////////////////////////////////////

//-------------------------------------------------------------------------------------
//  LispData�̃^�C�v�萔
//-------------------------------------------------------------------------------------
var DATATYPE_SYMBOL        = "symbol";
var DATATYPE_LIST          = "list";
var DATATYPE_EMPTYLIST     = "empty list";
var DATATYPE_ERROR         = "error";
var DATATYPE_FIXEDFUNCTION = "fixed function";
var DATATYPE_SPECIALFORM   = "special form";
var DATATYPE_LAMBDA        = "lambda";
var DATATYPE_VARIABLE      = "variable";
var DATATYPE_COMMENT       = "comment";
var DATATYPE_PROGRAM       = "program";
var DATATYPE_ENDOFPROGRAM  = "end of program";

//-------------------------------------------------------------------------------------
//  Lisp�萔
//-------------------------------------------------------------------------------------
var SYMBOL_NIL      = "NIL";
var SYMBOL_T        = "T";

//-------------------------------------------------------------------------------------
//  ���ʎ�(Special Form)��
//-------------------------------------------------------------------------------------
var SPECIALFORM_QUOTE   = "QUOTE";
var SPECIALFORM_COND    = "COND";
var SPECIALFORM_LAMBDA  = "LAMBDA";
var SPECIALFORM_DEFINE  = "DEFINE";
var SPECIALFORM_LABEL   = "LABEL";

//-------------------------------------------------------------------------------------
//  �V�X�e���֐�(Fixed Function)��
//-------------------------------------------------------------------------------------
var FIXEDFUNCTION_EQ      = "EQ";
var FIXEDFUNCTION_CONS    = "CONS";
var FIXEDFUNCTION_CAR     = "CAR";
var FIXEDFUNCTION_CDR     = "CDR";
var FIXEDFUNCTION_ATOM    = "ATOM";

///////////////////////////////////////////////////////////////////////////////////////
//  Lisp�����p�Ǘ��f�[�^�֘A
///////////////////////////////////////////////////////////////////////////////////////

//-------------------------------------------------------------------------------------
//  LispData            Lisp�����p�Ǘ��f�[�^�R���e�i
//-------------------------------------------------------------------------------------
function LispData(name, data, type) {
    if (type == DATATYPE_LIST) {
        var n = data.length;
        if ((n != 0) && (n != 2)) {
            type = DATATYPE_ERROR;
        }
    }
    this.getName = function () { return name; };
    this.getData = function () { return data; };
    this.getType = function () { return type; };
    this.isNil            = function () { return (data == SYMBOL_NIL); };
    this.isSymbol         = function () { return ((type == DATATYPE_SYMBOL) || (type == DATATYPE_EMPTYLIST)); };
    this.isList           = function () { return (type == DATATYPE_LIST); };
    this.isEmptyList      = function () { return (type == DATATYPE_EMPTYLIST); };
    this.isUserFunction   = function () { return (type == DATATYPE_LAMBDA); };
    this.isSystemFunction = function () { return ((type == DATATYPE_FIXEDFUNCTION) || (type == DATATYPE_SPECIALFORM)); };
    this.isFunction       = function () { return ((type == DATATYPE_FIXEDFUNCTION) || (type == DATATYPE_SPECIALFORM) || (type == DATATYPE_LAMBDA)); };
    this.isComment        = function () { return (type == DATATYPE_COMMENT); };
    this.isError          = function () { return (type == DATATYPE_ERROR); };
    this.gc = function () { name = null; data = null; type = null; }; //�ė��p���S�s��
}

//-------------------------------------------------------------------------------------
//  getSymbol           �V���{���^�C�v��LispData���擾����
//-------------------------------------------------------------------------------------
var getSymbol = new function () {
    var symbols = new Array();
    return function (symbol) {
        if (symbols[symbol]) {
            return symbols[symbol];
        } else {
            symbols[symbol] = new LispData(symbol, symbol, DATATYPE_SYMBOL);
            return symbols[symbol];
        }
    };
};

//-------------------------------------------------------------------------------------
//  LispData�^�萔
//-------------------------------------------------------------------------------------
var LISPDATA_T         = getSymbol(SYMBOL_T);
var LISPDATA_NIL       = getSymbol(SYMBOL_NIL);
var LISPDATA_EMPTYLIST = new LispData(SYMBOL_NIL, SYMBOL_NIL, DATATYPE_EMPTYLIST);
var LISPDATA_ERROR     = new LispData("Unknown Error", "Cause is unknown.", DATATYPE_ERROR); 

//-------------------------------------------------------------------------------------
//  wrapListInLispData          �z������X�g�f�[�^(LispData)�ɂ���
//-------------------------------------------------------------------------------------
function wrapListInLispData(list) {
    if (list.length == 2) {
        return new LispData(null, list, DATATYPE_LIST);
    } else if (list.length == 0) {
        return LISPDATA_EMPTYLIST;
        //return LISPDATA_NIL;
        //return new LispData(null, list, DATATYPE_LIST);
    } else {
        return LISPDATA_ERROR;
    }
}

//-------------------------------------------------------------------------------------
//  makeError                   �C�ӂ̃G���[�f�[�^(LispData)�𐶐�����
//-------------------------------------------------------------------------------------
function makeError(name, description) {
    return new LispData(name, description, DATATYPE_ERROR);
}

///////////////////////////////////////////////////////////////////////////////////////
//  �ϐ��R���e�i
///////////////////////////////////////////////////////////////////////////////////////

//-------------------------------------------------------------------------------------
//  VariableContainer           �W���̕ϐ��R���e�i
//-------------------------------------------------------------------------------------
function VariableContainer(parent) {
    //�ϐ��f�[�^(LispData)���i�[����
    var vars = new Array();
    //�e�R���e�i���擾����
    this.getParent = function () { return parent; };
    //�ϐ����擾����
    this.getVariable = function (key) {
        return vars[key].getData();
    }
    //�ϐ���ݒ肷��
    this.setVariable = function (key, data) {
        if (vars[key]) {
            vars[key].gc();
            vars[key] = null;
        }
        vars[key] = new LispData(key, data, DATATYPE_VARIABLE);
        return vars[key];
    };
    //�ϐ����i�[����R���e�i���擾����
    this.getVariableContainer = function (key) {
        if (vars[key]) {
            return this;
        } else {
            if (parent != null) {
                return parent.getVariableContainer(key);
            } else {
                return null;
            }
        }
    };
    //�ꕔ�ϐ��̉��
    this.release = function () {
        var i, key, c = 0;
        for (i in vars) {
            key = vars[i].getName();
            if (parent.getVariableContainer(key) != null) {
                //lambda�̃N���[�W���ɕߔ�����Ȃ�
                vars[i].gc();
                vars[i] = null;
            } else {
                c++; //�ێ����Ă�ϐ���
            }
        }
        return c;
    };
    //�K�x�[�W�R���N�g
    this.gc = function () {  //�ė��p���S�s��
        var i;
        for (i in vars) {
            vars[i] = null;
        }
        vars = null;
        parent = null;
    };
}

//-------------------------------------------------------------------------------------
//  LambdaVariableContainer     LAMBDA���֐��̉������p�̕ϐ��R���e�i
//-------------------------------------------------------------------------------------
function LambdaVariableContainer(closedvc, currentvc) {
    //�e�R���e�i���擾����
    this.getParent = function () { return currentvc; };
    //�ϐ����擾����
    this.getVariable = function (key) {
        var vc;
        vc = closedvc.getVariableContainer(key);
        if (vc == null) {
            vc = currentvc.getVariableContainer(key);
            if (vc == null) {
                return makeError("Variable Error", "Undefined variable: " + key);
            }
        }
        return vc.getVariable(key);
    };
    //�ϐ���ݒ肷��
    this.setVariable = function (key, data) {
        var vc;
        vc = closedvc.getVariableContainer(key);
        if (vc == null) {
            vc = currentvc.getVariableContainer(key);
            if (vc == null) {
                vc = currentvc;
            }
        }
        vc.setVariable(key, data);
    };
    //�ϐ����i�[���Ă�R���e�i���擾����
    this.getVariableContainer = function (key) {
        var vc;
        vc = closedvc.getVariableContainer(key);
        if (vc != null) {
            return vc
        }
        return currentvc.getVariableContainer(key);
    };
    //�ꕔ�̕ϐ��̉��
    this.release = function () {
        return 0;
    };
    //�K�x�[�W�R���N�g
    this.gc = function () {  //�ė��p���S�s��
        closedvc = null;
        currentvc = null;
    };
}


///////////////////////////////////////////////////////////////////////////////////////
//  �ϐ��̃X�R�[�v�̊Ǘ�
///////////////////////////////////////////////////////////////////////////////////////

//�O���[�o���X�R�[�v�̕ϐ��R���e�i
var GlobalVariableContainer = new VariableContainer(null);

//���݂̃X�R�[�v�̕ϐ��R���e�i
var CurrentVariableContainer = GlobalVariableContainer;

//-------------------------------------------------------------------------------------
//  resetScope                  ���݂̃X�R�[�v���O���[�o���X�R�[�v�ɂ���
//-------------------------------------------------------------------------------------
function resetScope() {
    CurrentVariableContainer = GlobalVariableContainer;
}
//-------------------------------------------------------------------------------------
//  inNewScope                  �V�����X�R�[�v�ɓ���
//-------------------------------------------------------------------------------------
function inNewScope() {
    CurrentVariableContainer = new VariableContainer(CurrentVariableContainer);
}

//-------------------------------------------------------------------------------------
//  inNewLambdaScope            �V����LAMBDA���֐��̃X�R�[�v�ɓ���
//-------------------------------------------------------------------------------------
function inNewLambdaScope(closedvc) {
    CurrentVariableContainer = new VariableContainer(new LambdaVariableContainer(closedvc, CurrentVariableContainer));
}

//-------------------------------------------------------------------------------------
//  outNowScope                 ���݂̃X�R�[�v���甲����
//-------------------------------------------------------------------------------------
function outNowScope() {
    var tmp = CurrentVariableContainer;
    CurrentVariableContainer = tmp.getParent();
    if (CurrentVariableContainer != null) {
        tmp.release();
    } else {
        CurrentVariableContainer = tmp; //GrobalVariableContainer�̂͂�
    }
}

//-------------------------------------------------------------------------------------
//  outNowLambdaScope           ���݂�LAMBDA���֐��̃X�R�[�v���甲����
//-------------------------------------------------------------------------------------
function outNowLambdaScope() {
    var tmp = CurrentVariableContainer.getParent();
    CurrentVariableContainer = tmp.getParent();
    if (CurrentVariableContainer != null) {
        tmp.release();
    } else {
        CurrentVariableContainer = tmp; //GrobalVariableContainer�̂͂�
    }
}


///////////////////////////////////////////////////////////////////////////////////////
//  �������[�e�B���e�B�֐�
///////////////////////////////////////////////////////////////////////////////////////

//-------------------------------------------------------------------------------------
//  getArgs             �W���֐��E���ʎ��̎��������擾����
//-------------------------------------------------------------------------------------
//����
//  list    LispData                �������̃��X�g
//  n       Integer                 �擾�������������̐�
//  argc    Array                   �]����̎�����(LispData)���i�[�����
//����
//  argc�Ɋi�[�����������̏��Ԃ͋t���ɂȂ�
//  �� �������� 3�̂Ƃ��͈ȉ��̂悤�Ɋi�[�����
//     1�Ԗڂ̎�������argc[2], 2�Ԗڂ̎�������args[1], 3�Ԗڂ̎�������argc[0]
//     (F 'A 'B 'C) => A -> argc[2], B -> argc[1], C -> argc[0] 
//�߂�l
//  Boolean         �������̎擾�ɐ��������� true �A���s������ false
//-------------------------------------------------------------------------------------
function getArgs(list, n, argc) {
    var tmp;
    if (list.isList()) {
        tmp = list.getData();
        if (tmp.length == 2) {
            argc[n - 1] = hoge2(tmp[0]);
            if (n == 1) {
                if (tmp[1].isNil()) {
                    return true;
                }
            } else {
                return getArgs(tmp[1], n - 1, argc);
            }
        }
    }
    return false;
}

//-------------------------------------------------------------------------------------
//  getLambdaArgs       LAMBDA���֐��̎��������擾����
//-------------------------------------------------------------------------------------
//����
//  list    LispData                �������̃��X�g
//�߂�l
//  LispData        �]����̎������̃��X�g
//-------------------------------------------------------------------------------------
function getLambdaArgs(list) {
    var n, s, tmp, tmp2;
    if (list.isList()) {
        tmp = list.getData();
        if (tmp.length == 2) {
            s = hoge2(tmp[0]);
            if (s.isError()) {
                return s;
            }
            tmp2 = new Array();
            tmp2[0] = s;
            s = getLambdaArgs(tmp[1]);
            if (s.isError()) {
                return s;
            }
            tmp2[1] = s;
            return wrapListInLispData(tmp2);
        }
    } else if (list.isNil()) {
        return list;
    }
    return makeError("Argument Error in LAMBDA", "Wrong Argument: " + tenkai2(list, 0));
}

//-------------------------------------------------------------------------------------
//  setLambdaArgs       LAMBDA���֐��̎��������������ɐݒ肷��
//-------------------------------------------------------------------------------------
//����
//  list        LispData        �������̃��X�g
//-------------------------------------------------------------------------------------
function setLambdaArgs(list, arglist) {
    var tmp, tmp2;
    if ((list.isList()) && (arglist.isList())) {
        tmp = list.getData();
        tmp2 = arglist.getData();
        if ((tmp.length == 2) || (tmp2.length == 2)) {
            if (tmp[0].isSymbol()) {
                CurrentVariableContainer.setVariable(tmp[0].getData(), tmp2[0]);
                return setLambdaArgs(tmp[1], tmp2[1]);
            }
        }
    } else if (list.isNil()) {
        if (arglist.isNil()) {
            return true;
        }
    } else if (list.isSymbol()) {
        CurrentVariableContainer.setVariable(list.getData(), arglist);
        return true;
    }
    return false;
}


///////////////////////////////////////////////////////////////////////////////////////
//  LAMBDA���֐��̎��s
///////////////////////////////////////////////////////////////////////////////////////

//-------------------------------------------------------------------------------------
//  doLambdaFunction            LAMBDA���֐������s����
//-------------------------------------------------------------------------------------
function doLambdaFunction(cmd, list) {
    var tmp, arglist;
    arglist = getLambdaArgs(list);
    if (arglist.isError() == false) {
        tmp = cmd.getData();
        if (tmp.length == 3) {
            inNewLambdaScope(tmp[0]);
            if (setLambdaArgs(tmp[1], arglist)) {
                result = hoge2(tmp[2]);
                outNowLambdaScope();
                return result;
            } else {
                outNowLambdaScope();
                return makeError("Argument Error in LAMBDA", "Unmatch number of arguments:" + tenkai2(tmp[1], 0) + " <= " + tenkai2(list, 0));
            }
        }
    }
    return makeError("Lambda Error", "Bad function call");
}


///////////////////////////////////////////////////////////////////////////////////////
//  ���ʎ�(Special Form)�̒�`
///////////////////////////////////////////////////////////////////////////////////////

//���ʎ��p�̃f�[�^(LispData)���i�[����
var SpecialForms = new Array();

//-------------------------------------------------------------------------------------
// QUOTE ���ʎ�(Special Form)
//-------------------------------------------------------------------------------------
// ����
//  (QUOTE OBJECT)
// �߂�l
//  OBJECT
// ��
//  (QUOTE A)                -> A
//  (QUOTE (A . B))          -> (A . B)
//  (QUOTE (A B))            -> (A B)
//  (QUOTE (CONS 'A 'B))     -> (CONS (QUOTE A) (QUOTE B))
//-------------------------------------------------------------------------------------
SpecialForms[SPECIALFORM_QUOTE] = new LispData(SPECIALFORM_QUOTE, function (cmd, list) {
        var tmp;
        if (list.isList()) {
            tmp = list.getData();
            if (tmp.length == 2) {
                if (tmp[1].isNil()) {
                    if ((tmp[0].isList()) || (tmp[0].isSymbol())) {
                        return tmp[0];
                    }
                }
            }
        }
        return makeError("Argument Error in " + cmd.getName(), "Wrong argument: " + tenkai2(list, 0));
    }, DATATYPE_SPECIALFORM);

//-------------------------------------------------------------------------------------
// COND ���ʎ�(Special Form)
//-------------------------------------------------------------------------------------
// ����
//  (COND (TEST-1 FORM-1) (TEST-2 FORM-2) �` (TEST-N FORM-N))
//  (COND {(TEST FORM)}+)
//  �Œ�ł��P�΂�TEST��FORM���K�v
//  
// ��
//  (COND ('A 'B) ('C 'D))                  -> B            ;arg is (('A 'B) . (('C 'D) . NIL)), tmp[0] is ('A 'B), tmp[1] is (('C 'D) . NIL)
//  (COND ('C 'D))                          -> D            ;arg is (('C 'D) . NIL), tmp[0] is ('C 'D), tmp[1] is NIL
//  (COND (NIL 'A) ('B (CONS 'C '(D E))))   -> (C D E)
//-------------------------------------------------------------------------------------
SpecialForms[SPECIALFORM_COND] = new LispData(SPECIALFORM_COND, function (cmd, list) {
        var tmp, tmp2, s, func, argc;
        if (list.isList()) {
            tmp = list.getData();
            if (tmp.length == 2) {
                if (tmp[0].isList()) {
                    tmp2 = tmp[0].getData();
                    if (tmp2.length == 2) {
                        s = hoge2(tmp2[0]);
                        if (s.isError()) {
                            return s;
                        }
                        if (s.isNil() == false) {
                            argc = new Array();
                            if (getArgs(tmp2[1], 1, argc)) {
                                return argc[0];
                            }
                        } else {
                            func = cmd.getData();
                            return func(cmd, tmp[1]);
                        }
                    }
                }
            }
        }
        return makeError("Argument Error in " + cmd.getName(), "Wrong Argument: " + tenkai2(list, 0));
    }, DATATYPE_SPECIALFORM);

//-------------------------------------------------------------------------------------
// DEFINE ���ʎ�(Special Form)
//-------------------------------------------------------------------------------------
SpecialForms[SPECIALFORM_DEFINE] = new LispData(SPECIALFORM_DEFINE, function (cmd, list) {
        var tmp, vc, s, argc;
        if (list.isList()) {
            tmp = list.getData();
            if (tmp.length == 2) {
                if (tmp[0].isSymbol()) {
                    s = tmp[0].getData();
                    if ((s == SYMBOL_T) || (s == SYMBOL_NIL) || (FixedFunctions[s]) || (SpecialForms[s])) {
                        return makeError("Argument Error in " + cmd.getName(), "Wrong symbol (Used by System): " + s);
                    }
                    argc = new Array();
                    if (getArgs(tmp[1], 1, argc)) {
                        if (argc[0].isError()) {
                            return argc[0];
                        }
                        vc = CurrentVariableContainer.getParent();
                        if (vc != null) {
                            vc.setVariable(tmp[0].getData(), argc[0]);
                            return tmp[0];
                        }
                    }
                }
            }
        }
        return makeError("Argument Error in " + cmd.getName(), "Wrong argument: " + tenkai2(list, 0));
    }, DATATYPE_SPECIALFORM);

//-------------------------------------------------------------------------------------
// LABEL ���ʎ�(Special Form)
//-------------------------------------------------------------------------------------
// ���ʎ�DEFINE�Ɠ�������
//-------------------------------------------------------------------------------------
SpecialForms[SPECIALFORM_LABEL] = new LispData(SPECIALFORM_LABEL, SpecialForms[SPECIALFORM_DEFINE].getData(), DATATYPE_SPECIALFORM);


//-------------------------------------------------------------------------------------
// LAMBDA ���ʎ�(Special Form)
//-------------------------------------------------------------------------------------
//  (LAMBDA (V-1 V-2 �` V-N) FORM)
//  (LAMBDA (VAR*) FORM)
// ��
//  (LAMBDA (X Y Z) (CONS X (CONS Y Z)))
//-------------------------------------------------------------------------------------
SpecialForms[SPECIALFORM_LAMBDA] = new LispData(SPECIALFORM_LAMBDA, function (cmd, list) {
        var tmp, tmp2, data;
        var checkarg = function (args, keys) {
            var s; if (keys == null) { keys = new Array(); }
            if (args.isList()) {
                s = args.getData();
                if (checkarg(s[0], keys)) {
                    if (s[1].isNil()) {
                        return true;
                    } else {
                        return checkarg(s[1], keys);
                    }
                }
            } else if (args.isSymbol()) {
                s = args.getData();
                if ((s == SYMBOL_T) || (s == SYMBOL_NIL) || (FixedFunctions[s]) || (SpecialForms[s])) {
                    return false;
                } else {
                    if (keys[s]) {
                        return false;
                    }
                    keys[s] = true;
                    return true;
                }
            }
            return false;
        };
        
        if (list.isList()) {
            tmp = list.getData();
            if (tmp.length == 2) {
                if ((tmp[0].isList()) || (tmp[0].isNil())) {
                    if ((checkarg(tmp[0], null)) || (tmp[0].isNil())) {
                        if (tmp[1].isList()) {
                            tmp2 = tmp[1].getData();
                            if (tmp2[1].isNil()) {
                                data = new Array();
                                data[0] = CurrentVariableContainer;
                                data[1] = tmp[0];
                                data[2] = tmp2[0];
                                return new LispData("LAMBDA", data, DATATYPE_LAMBDA);
                            }
                        }
                    }
                }
            }
        }
        return makeError("Argument Error in " + cmd.getName(), "Wrong argument: " + tenkai2(list, 0));
    }, DATATYPE_SPECIALFORM);
    

///////////////////////////////////////////////////////////////////////////////////////
//  �ŗL�֐� ��`
///////////////////////////////////////////////////////////////////////////////////////
var FixedFunctions = new Array();


//-------------------------------------------------------------------------------------
// ATOM �֐�(Fixed Function)
//-------------------------------------------------------------------------------------
// (ATOM OBJECT)
// �߂�l
//  OBJECT��SYMBOL�Ȃ�T�ALIST�Ȃ�NIL��Ԃ��B
//-------------------------------------------------------------------------------------
FixedFunctions[FIXEDFUNCTION_ATOM] = new LispData(FIXEDFUNCTION_ATOM, function (cmd, list) {
        var argc = new Array();
        if (getArgs(list, 1, argc)) {
            if (argc[0].isSymbol()) {
                return LISPDATA_T;
            } else if (argc[0].isError()) {
                return argc[0];
            } else {
                return LISPDATA_NIL;
            }
        }
        return makeError("Argument Error in " + cmd.getName(), "Wrong argument: " + tenkai2(list, 0));
    }, DATATYPE_FIXEDFUNCTION);

//-------------------------------------------------------------------------------------
// EQ �֐�(Fixed Function)
//-------------------------------------------------------------------------------------
// �����V���{���Ȃ� T �A����ȊO�� NIL
//-------------------------------------------------------------------------------------
FixedFunctions[FIXEDFUNCTION_EQ] = new LispData(FIXEDFUNCTION_EQ, function (cmd, list) {
        var argc = new Array();
        if (getArgs(list, 2, argc)) {
            if ((argc[0].isSymbol()) && (argc[1].isSymbol())) {
                return argc[0].getData() == argc[1].getData() ? LISPDATA_T : LISPDATA_NIL;
            } else if (argc[1].isError()) {
                return argc[1];
            } else if (argc[0].isError()) {
                return argc[0];
            } else {
                return LISPDATA_NIL;
            }
        }
        return makeError("Error in " + cmd.getName(), "Wrong argument: " + tenkai2(list, 0));
    }, DATATYPE_FIXEDFUNCTION);

//-------------------------------------------------------------------------------------
//  CAR �֐�(Fixed Function)
//-------------------------------------------------------------------------------------
//  ��P�����ɓn�������X�g�̐擪�̒l�����o��
// ��
//  (CAR ('A 'B 'C))            -> A
//  (CAR ('E . 'F))             -> E
//  (CAR (('X 'Y) 'Z))          -> (X Y)
//  (CAR ('N))                  -> 'N
// ��O(�G���[)�p�^�[��
//  (CAR 'A)                    ; ���X�g�ȊO�������ɓn�����
//  (CAR ('A 'B) ('C 'D))       ; ��������������
//  (CAR . ('A 'B))
//-------------------------------------------------------------------------------------
FixedFunctions[FIXEDFUNCTION_CAR] = new LispData(FIXEDFUNCTION_CAR, function (cmd, list) {
        var tmp, argc = new Array();
        if (getArgs(list, 1, argc)) {
            if (argc[0].isList()) {
                tmp = argc[0].getData();
                if (tmp.length == 2) {
                    return tmp[0];
                }
            } else if (argc[0].isEmptyList()) {
                return argc[0];
            } else if (argc[0].isError()) {
                return argc[0];
            }
        }
        return makeError("Error in " + cmd.getName(), "Wrong argument: " + tenkai2(list, 0));
    }, DATATYPE_FIXEDFUNCTION);

//-------------------------------------------------------------------------------------
// CDR �֐�(Fixed Function)
//-------------------------------------------------------------------------------------
FixedFunctions[FIXEDFUNCTION_CDR] = new LispData(FIXEDFUNCTION_CDR, function (cmd, list) {
        var tmp, argc = new Array();
        if (getArgs(list, 1, argc)) {
            if (argc[0].isList()) {
                tmp = argc[0].getData();
                if (tmp.length == 2) {
                    return tmp[1];
                }
            } else if (argc[0].isEmptyList()) {
                return argc[0];
            } else if (argc[0].isError()) {
                return argc[0];
            }
        }
        return makeError("Error in " + cmd.getName(), "Wrong argument: " + tenkai2(list, 0));
    }, DATATYPE_FIXEDFUNCTION);

//-------------------------------------------------------------------------------------
// CONS �֐�(Fixed Function)
//-------------------------------------------------------------------------------------
FixedFunctions[FIXEDFUNCTION_CONS] = new LispData(FIXEDFUNCTION_CONS, function (cmd, list) {
        var argc = new Array();
        if (getArgs(list, 2, argc)) {
            if (argc[1].isError()) {
                return argc[1];
            }
            if (argc[0].isError()) {
                return argc[0];
            }
            return wrapListInLispData(argc.reverse());
        }
        return makeError("Error in " + cmd.getName(), "Wrong argument: " + tenkai2(list, 0));
    }, DATATYPE_FIXEDFUNCTION);




///////////////////////////////////////////////////////////////////////////////////////
//  �\�� ��� �� ����
///////////////////////////////////////////////////////////////////////////////////////
function hoge(str, p, list){
	var i, c, s, newlist, tmp, t = 0, e = 0, q = 0;
	var makeLispData = function (data, n) {
	    if (n == 0) {
	        if (typeof(data) == "string") {
                return getSymbol(data); //�ł���Γ��ꖼ�V���{���͍ė��p�������Ƃ���
            } else {
                return wrapListInLispData(data);
            }
	    }
	    var tmp, list = new Array();
	    list[0] = getSymbol(SPECIALFORM_QUOTE);
	    tmp = new Array();
	    tmp[0] = makeLispData(data, n - 1);
	    tmp[1] = LISPDATA_NIL;
	    list[1] = wrapListInLispData(tmp);
	    return wrapListInLispData(list);
	};
	/** t (��ԑJ��/�L���I�[�g�}�g��)
	 * 	0 ��ڂ̗v�f�̓ǂݎ��J�n�O�i�K
	 * 	1 ��ڂ̗v�f�̓V���{���œǂݎ�蒆
	 * 	2 ��ڂ̗v�f�̓��X�g
	 * 	3 ��ڂ̗v�f��o�^����
	 * 	4 ��ڂ̗v�f�Ɠ�ڂ̗v�f���q��'.'�ǂݎ��O�i�K
	 * 	5 ��ڂ̗v�f�̓ǂݎ��J�n�O�i�K
	 * 	6 ��ڂ̗v�f�̓V���{���œǂݎ�蒆
	 * 	7 ��ڂ̗v�f�̓��X�g
	 **/
	for (i = p; i < str.length; i++) {
		c = str.charAt(i);
		if (c == '(') {
			if (t == 0) { //��ڂ̗v�f�̓��X�g
				newlist = new Array();
				i = hoge(str, i + 1, newlist);
				t = 2;
			} else if (t == 3) { // . �̏ȗ��A��ڂ̗v�f�̓��X�g�i���̃��X�g�̈�ڂ̗v�f�����X�g�j
				newlist = new Array();
				i = hoge(str, i, newlist) - 1;
				t = 7;
			} else if (t == 5) { //��ڂ̗v�f�̓��X�g
			    newlist = new Array();
			    i = hoge(str, i + 1, newlist);
			    t = 7;
			} else {
			    debug("error char '(' t=" + t);
				return str.length + 10;
			}
		
		} else if (c == ')') {
			if (t == 1) { //�v�f��������Ȃ��i�v�f�̓V���{���j
			    list[0] = makeLispData(s.toUpperCase(), q);
				list[1] = LISPDATA_NIL;
			} else if (t == 2) { //�v�f��������Ȃ��i�v�f�̓��X�g�j
			    list[0] = makeLispData(newlist, q);
			    list[1] = LISPDATA_NIL;
			} else if (t == 6) { //��ڂ̗v�f�i�V���{���j�̓o�^
			    list[1] = makeLispData(s.toUpperCase(), q);
			} else if (t == 7) { //��ڂ̗v�f�i���X�g�j�̓o�^
			    list[1] = makeLispData(newlist, q);
			} else if ((t != 0) || (q != 0)) { // t==0 �͋�̃��X�g�ɂȂ�
			    debug("error char ')' t=" + t);
				return str.length + 10;
			}
			return i;
		
		} else if (c == ' ') {
			if (t == 1) { //��ڂ̗v�f
			    list[0] = makeLispData(s.toUpperCase(), q);
				t = 3;
			} else if (t == 2) { //��ڂ̗v�f�̓��X�g
			    list[0] = makeLispData(newlist, q);
				t = 3;
			} else if (t == 4) { //���ɂ���̂͂Q�ڂ̗v�f
				t = 5;
			} else {
			    debug("error char ' ' t=" + t);
				return str.length + 10;
			}
			q = 0; //quote�ȗ��t���O�̉���
			
		} else if (c == '.') {
			if (t == 3) { //���̃��X�g�͗����łȂ�
				t = 4;
			} else {
			    debug("error char '.' t=" + t);
				return str.length + 10;
			}
			
		} else {
			if (t == 0) { //��ڂ̗v�f�̃V���{���J�n
			    if ((p == 0) && (c == ";") && (q == 0)) {
			        list[0] = new LispData(null, str.substring(i), DATATYPE_COMMENT);
			        debug("[Comment] "+list[0].getData());
			        return str.length - i;
			    }
			    if (c == "'") {
			        //quote�̏ȗ�
			        q++;
			    } else {
    				s = c;
    				t = 1;
			    }
			} else if ((t == 1) || (t == 6)) { //�V���{������������
				s += c;
			} else if (t == 3) { // . ���ȗ�����Ă�̂œ�ڂ̗v�f�̓��X�g�i���̃��X�g�̈�ڂ̗v�f���V���{���j
				newlist = new Array();
				i = hoge(str, i, newlist) - 1;
				t = 7;
			} else if (t == 5) { //��ڂ̗v�f�̃V���{���J�n
				s = c;
				t = 6;
			} else {
			    debug("error char '"+c+"' t=" + t);
				return str.length + 10;
			}
		}
	}
	if (p != 0) { //�ċA�Ăяo���ŕ������ǂݎ��I����Ă��܂��Ă���
		return -1;
	}
	if (i > str.length + 1) {
		return -1;
	}
	if (t == 1) {
	    list[0] = makeLispData(s.toUpperCase(), q);
	} else if (t == 2) {
	    list[0] = makeLispData(newlist, q);
	} else {
		return -1;
	}
	return i;
}


///////////////////////////////////////////////////////////////////////////////////////
//  ���X�g�̐����\��
///////////////////////////////////////////////////////////////////////////////////////
function tenkai(list) {
    var s1, s2, tmp;
    if (list.isEmptyList()) {
        return "()";
    } else if (list.isSymbol()) {
        return list.getData();
    } else if (list.isSystemFunction()) {
        return " # System Function >> " + list.getType() + " " + list.getName() + " #";
    } else if (list.isUserFunction()) {
        tmp = list.getData();
        return "# Lambda Function >> " + tenkai(tmp[1]) + " " + tenkai(tmp[2]) + " #";
    } else if (list.isError()) {
        return " # " + list.getName() + " >> " + list.getData() + " # ";
    } else if (list.getType() == DATATYPE_COMMENT) {
        return " # Comment # ";
    } else if (list.isList() == false) {
        return -1;
    }
    tmp = list.getData();
    if (tmp.length == 2) {
        s1 = tenkai(tmp[0]);
        s2 = tenkai(tmp[1]);
        if ((typeof(s1) == "string") && (typeof(s2) == "string")) {
            return "(" + s1 + " . " + s2 + ")";
        }
    }
    return -1;
}

///////////////////////////////////////////////////////////////////////////////////////
//  ���X�g�̗����\��
///////////////////////////////////////////////////////////////////////////////////////
function tenkai2(list, n) {
    var s1, s2, tmp;
    if (list.isEmptyList()) {
        return "()";
    } else if (list.isSymbol()) {
        return list.getData();
    } else if (list.isSystemFunction()) {
        return " # System Function >> " + list.getType() + " " + list.getName() + " #";
    } else if (list.isUserFunction()) {
        tmp = list.getData();
        return " # Lambda Function >> " + tenkai2(tmp[1], 0) + " " + tenkai2(tmp[2], 0) + " #";
    } else if (list.isError()) {
        return " # " + list.getName() + " >> " + list.getData() + " # ";
    } else if (list.getType() == DATATYPE_COMMENT) {
        return " # Comment # ";
    } else if (list.isList() == false) {
        return -1;
    }
    tmp = list.getData();
    if (tmp.length == 2) {
        if (tmp[0].getData() == SPECIALFORM_QUOTE) {
            return "'" + tenkai2(tmp[1], 1);
        }
        s1 = tenkai2(tmp[0], 0);
        if (tmp[1].getData() == SYMBOL_NIL) {
            if (typeof(s1) == "string") {
                if (n == 1) {
                    return s1;
                } else {
                    return "(" + s1 + ")";
                }
            }
        }
        if (tmp[1].isSymbol()) {
            s2 = tenkai2(tmp[1], 0);
            if ((typeof(s1) == "string") && (typeof(s2) == "string")) {
                if (n == 1) {
                    return s1 + " . " + s2;
                } else {
                     return "(" + s1 + " . " + s2 + ")";
               }
            }
        } else {
            s2 = tenkai2(tmp[1], 1);
            if ((typeof(s1) == "string") && (typeof(s2) == "string")) {
                if (n == 1) {
                    return s1 + " " + s2;
                } else {
                    return "(" + s1 + " " + s2 + ")";
                }
            }
        }
    }
    return -1;
}

///////////////////////////////////////////////////////////////////////////////////////
//  �e�X�g�p�֐�
///////////////////////////////////////////////////////////////////////////////////////
var debugmsg ="";
var debugnest = 0;
var debugneststr = "";
function debug(msg) {
    debugmsg += "<div>"+debugneststr+msg+"</div>";
}
function debugInNest() {
    debugnest++;
    if (debugnest>0) {
        debugneststr += "_";
    } else {
        debugneststr = "";
    }
}
function debugOutNest() {
    debugnest--;
    debugneststr = debugneststr.substring(1);
}

function test() {
    var str = document.all.f.t.value;
    var list = new Array();
    var s, i, tmp, rs = "";
    var lines = str.replace(/\r\n/g,"\n").replace(/\r/g,"\n").replace(/\n+/g,"\n").replace(/\n$/,"").replace(/^\n/,"").split("\n");
    debugmsg = "";
    for (i = 0; i < lines.length; i++) {
        tmp = lines[i].replace(/\./g," . ").replace(/ +/g," ").replace(/\( /g,"(").replace(/ \)/g,")").replace(/ $/,"");
        list = new Array();
        debugnest = 0;
        if (hoge(tmp, 0, list) >= 0) {
            if (list.length == 0) {
                alert('Hoge');
                break;
            }
            rs += "<br><div><b>EVAL&gt;</b> " + tmp;
            list = list[0];
            s = tenkai2(list, 0);
            rs += ' <div><font color="blue">' + (typeof(s) == "number" ? "Syntax Error" : s) + "</font><br>";
            s = tenkai(list);
            rs += ' <font color="green">' + (typeof(s) == "number" ? "Syntax Error" : s) + "</font></div></div>";
            resetScope();
            list = hoge2(list);
            if (list.isError()) {
                s = tenkai2(list, 0);
                rs += '<div><div style="color:red;">' + (typeof(s) == "number" ? "Syntax Error" : s) + "</div></div>";
            } else if (list.isFunction()) {
                s = tenkai2(list, 0);
                rs += '<div><div style="color:magenta;">' + (typeof(s) == "number" ? "Syntax Error" : s) + "</div></div>";
            } else {
                s = tenkai2(list, 0);
                rs += "<div><b>RESULT&gt;</b> " + (typeof(s) == "number" ? "Syntax Error" : s) + "<br>";
                s = tenkai(list);
                rs += ' <font color="green">' + (typeof(s) == "number" ? "Syntax Error" : s) + "</font></div>";
            }
       } else {
            rs += '<div><font color="red">' + tmp + "</font></div>"
                + '<div><font color="red">Syntax Error</font></div>';
            break;
        }
    }
    document.getElementById('abc').innerHTML = rs;
    document.getElementById('efg').innerHTML = debugmsg;
}



///////////////////////////////////////////////////////////////////////////////////////
//  ���X�g�̎��s
///////////////////////////////////////////////////////////////////////////////////////
function hoge2(list) {
    var s, tmp, temp, result, func;
    if (list.isSymbol()) {
        s = list.getData();
        if ((list.isNil()) || (list.getData() == SYMBOL_T)) {
            return list;
        } else if (SpecialForms[s]) {
            return SpecialForms[s];
        }
        if (FixedFunctions[s]) { //�f�t�H���g�̊֐�����ʎ�
            return FixedFunctions[s];
        }
        tmp = CurrentVariableContainer.getVariableContainer(s);
        if (tmp != null) {
            return tmp.getVariable(s);
        }
        //�V���{�����琔�l��ϐ���֐����Ȃǂɕϊ�����A�Ή�������̂�������΃G���[
        return makeError("Variable Error in hoge2", "Undefined by symbol: " + s);
    } else if (list.isFunction()) {
        return makeError("Reference Error in hoge2","This is Function: " + list.getName()); //list�͊֐��̎��̂Ȃ̂ŃG���[
    } else if (list.isError()) {
        return list;
    } else if (list.getType() == DATATYPE_COMMENT) {
        return list;
    } else if (list.isList() == false) {
        return makeError("Reference Error in hoge2", "Non-support type:" + list.getType());
    }
    tmp = list.getData();
    if (tmp.length == 2) {
        inNewScope();
        s = hoge2(tmp[0]);
        if (s.isSystemFunction()) {
            func = s.getData();
            result = func(s, tmp[1]);
            outNowScope();
            return result;
        } else if (s.isUserFunction()) {
            //���[�U�֐�
            result = doLambdaFunction(s, tmp[1]);
            outNowScope();
            return result;
        } else if (s.isError()) {
            outNowScope();
            return s;
        } else {
            outNowScope();
            return makeError("Function Error in hoge2", "Not function: " + tenkai2(s, 0));
        }
        outNowScope();
    } else {
        return LISPDATA_NIL;
    }
    return LISPDATA_ERROR;
}

///////////////////////////////////////////////////////////////////////////////////////
//  ���̃t�@�C���̏I���
///////////////////////////////////////////////////////////////////////////////////////
