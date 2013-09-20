///////////////////////////////////////////////////////////////////////////////////////
////// JunLISP                 ��LISP
///////////////////////////////////////////////////////////////////////////////////////
//���
//  LastUpdate      2013/06/27
//  Version         �V��`�� 2.1.1
//  Autoher         ���ꂨ�� (takeiteasy_idontthinkso)
///////////////////////////////////////////////////////////////////////////////////////
//�T�v
//  �Q�l���������ɏ�LISP������Ă݂�
//      �����@�\
//          �֐�        CONS CAR CDR EQ
//          ����`��    COND LAMBDA LABEL(DEFINE) QUOTE
//          �萔        T
//          ����萔    NIL
//          ' �ɂ��QUOTE�̗��L�\�L
//          ; ����n�܂�R�����g�s
//          �����s�ɕ������ď����ꂽLISP�R�[�h�ւ̑Ή�
//���J��URL
//  http://www.geocities.jp/takeiteasy_idontthinkso/mysoft/js_minimal_lisp/index.html
//�{�t�@�C��
//  http://www.geocities.jp/takeiteasy_idontthinkso/mysoft/js_minimal_lisp/lisp13.js
///////////////////////////////////////////////////////////////////////////////////////
//�Q�l����
//  [1] LISP - Wikipedia
//          http://ja.wikipedia.org/wiki/LISP 
//  [2] ��LISP - Wikipedia
//          http://ja.wikipedia.org/wiki/%E7%B4%94LISP 
//  [3] RECURSIVE FUNCTIONS OF SYMBOLIC EXPRESSIONS AND THEIR COMPUTATION BY MACHINE (Part I)
//          http://www-formal.stanford.edu/jmc/recursive.html
//  [4] Revised(5) Report on the Algorithmic Language Scheme - Table of Contents
//          http://people.csail.mit.edu/jaffer/r5rsj_toc.html
//  [5] Common Lisp the Language, 2nd Edition
//          http://www.cs.cmu.edu/Groups/AI/html/cltl/cltl2.html
///////////////////////////////////////////////////////////////////////////////////////
//����̉ۑ�E�ڕW
//  �E�S�R�[�h�̐�������
//  �E�R�����g�̒ǉ��i�����𕪂���₷������j
//  �E�O��f�o�b�O
///////////////////////////////////////////////////////////////////////////////////////
//�o�[�W�����A�b�v�
//              ���W���[�A�b�v
//                  �ΊO�I�ɑO�o�[�W�����Ƃ̌݊����𑹂Ȃ��啝�ȕύX
//                  �ΊO�I�ɑO�o�[�W�����ɂ͑��݂��Ȃ��S���V�����@�\�̒ǉ�
//                  ���̑��A�قڑS�̂̃R�[�h���ς���Ă��܂��啝���C�Ȃ�
//              �}�C�i�[�A�b�v
//                  ��r�I�傫�Ȍ�쓮(�o�O)�̏C��
//                  ���\�b�h���̓���̉��P
//                  �e�N���X�ւ̋@�\�ǉ��Ȃ�
//                  ���ʃN���X�̑啝���C
//              �����B�W�����A�b�v
//                  �����₩�ȃo�O���̏C���E�����₩�ȃR�[�h���`�Ȃ�
///////////////////////////////////////////////////////////////////////////////////////
//����
//  2013/05/10��    LISP�ɋ����������n�ߐF�X�ƒ��׎n�߂�
//  2013/06/09      ��LISP����낤�ƃR�[�h�������n�߂�i�v���g�^�C�v(lisp3.js)�̐���J�n�j
//  2013/06/12      ��LISP�v���Z�b�T���̈ꉞ�̊���
//  2013/06/13      �v���g�^�C�v�����J�i���킹�ăe�X�g�pHTML�����C�j
//  2013/06/13�`    LISP�R�[�h��eval��g�����ƎQ�l�������[2]��ǂނ����s�ɏI���
//                  �v���g�^�C�v(lisp3.js)�����ɐ����ŏ�LISP(lisp8.js)�������n�߂�
//  2013/06/17      Version 1.0.0
//                  �����ŏ�LISP�̈ꉞ�̊���
//  2013/06/19      Version 1.1.0
//                  �ϐ��̃X�R�[�v�̊��Ⴂ�ɋC�Â��Ď����~�X�����o
//                  �{�i�C���̂��߂Ɏ��O�ɑ����̕ύX������
//  2013/06/20      Version 1.2.0
//                  �X�R�[�v�̏C���������A���I�E�ÓI�ǂ���̃X�R�[�v�ł����s�\
//  2013/06/21      Version 1.2.1
//                  �G���[���b�Z�[�W�̓��{�ꉻ���R�[�h���`
//  2013/06/22      Version 1.2.2
//                  ListProcessor�N���X���̃��\�b�h��ListUtil���g�������ɏC��
//                  �R�[�h���`
//  2013/06/23      ��LISP�̎����̂��߂̍l������傫���ς���
//                  �`���[�����O���S���ؖ����₷���悤��
//                  ��LISP�̎d�l��傫���ύX����\��
//                  �V�d�l�̏�LISP��lisp13.js�ɍ�邱�ƂɌ���
//                  ����ɂ�����lisp8.js�͕��ʂ�LISP�Ɋg�����Ă������߂̑f�̂Ƃ���
//                  �ЂƂ܂����i�K�̏�Ԃ������`�ɍ��グ�Ă����\��
//                  lisp8.js�������`�ɒB������ʃt�@�C��(lisp?.js)�ŕ��ʂ�LISP�����n�߂�\��
//                  �܂�������LISP�ɖ��O��ύX����E�ݒ肷��\��
//                  lisp8.js   �ύX�O�F ��LISP MinimalLISP  �ύX��F����LISP SukunaLISP
//                  lisp13.js  �V��`�� ��LISP JunLISP   lisp?.js �ȑfLISP KansoLISP (�\��)
//  2013/06/24      Version 1.2.3
//                  ListProcessor�N���X���̃��\�b�h��ListUtil���g�������ɏC���̑���
//  2013/06/24      �`�`�`�V��`�� JunLISP �`�`�`
//                  Version 2.0.0
//                  �V��`�� JunLISP�̈ꉞ�̊���
//  2013/06/26      Version 2.1.0
//                  Lambda�֐��̈����̎d�l�������ύX����(Scheme���C�N��)
//  2013/06/27      Version 2.1.1
//                  �S�̂ɃR�����g��ǉ��A�܂�����ɕύX�̂Ȃ��R�[�h�̋L�q�ʒu���ړ�
//
//�� lisp3.js��lisp8.js�̒ʂ��ԍ��ɂ���
//      lisp.txt lisp2.txt�`lisp10.txt �܂ł���A������LISP�𒲂ׂ��ۂ̃����ł���
//      ���̂���LISP����������R�[�h��������lisp3.txt list8.txt�̊g���q��ύX����
//      ����� 3 �� 8 �ɓ��ɈӖ��͂Ȃ�
//�� �v���g�^�C�v(lisp3.js)�Ɛ�����(lisp8.js)�̈Ⴂ�ɂ���
//      �������̊֐����̕ύX�ƁA�֐����ЂƂ܂Ƃ߂ɂ���
//      �܂�LISP�R�[�h��͂̕��@���ۂ��ƕύX�����i�����s�ւ̕����L�q�E�R�����g�s(;)�ɑΉ��j
///////////////////////////////////////////////////////////////////////////////////////

//-------------------------------------------------------------------------------------
////// JunLISP         
//-------------------------------------------------------------------------------------
//  LastUpdate      2013/06/26
//  Version         2.1.0
//  Autoher         ���ꂨ�� (takeiteasy_idontthinkso)
//-------------------------------------------------------------------------------------
//����  2013/06/17      Version 1.0.0
//      2013/06/19      Version 1.1.0
//                      STK�N���X��ListAnalyzer�N���X����MinimalLISP�N���X�ֈړ�
//                      STK�N���X�̖��O��STK����StackArray�ɕύX
//      2013/06/20      Version 1.2.0
//                      �X�R�[�v�̍l�����̊ԈႢ�𐳂����̂�
//                      VariableManager�N���X��ListProcessor�N���X��ύX����
//                      LispData�N���X�̃��\�b�hgc()�̓����ύX����
//                      StackArray�N���X�̃��\�b�hclear()�̓����ύX����
//      2013/06/21      Version 1.2.1
//                      �������̃R�[�h�𐮌`
//                      �ꕔ�̃G���[���b�Z�[�W�̓��{�ꉻ
//      2013/06/22      Version 1.2.2
//                      ListUtil�N���X�����ListProcessor�N���X���̃��b�\�h���C��
//      2013/06/24      Version 1.2.3
//                      ListProcessor�N���X���̃��\�b�h��ListUtil���g�������ɏC��
//                      �N���X����MinimalLISP����SukunaLISP�֕ύX
//      2013/06/24      �`�`�` �V��`�� JunLISP �`�`�`
//                      Version 2.0.0
//                      ListProcessor�N���X�̏�����ς��Ĉꉞ�̎�������
//      2013/06/26      Version 2.1.0
//                      ListProcessor�N���X�̉��C(Lambda�֐��̈����̎d�l�������ύX)
//-------------------------------------------------------------------------------------


var LISP = new function JunLISP () {
    
    //----------------------------------------------------------------------------- JunLISP
    //  ���������o
    //-------------------------------------------------------------------------------------
    // LastUpdate   2013/06/24
    // Version      1.1.0
    // Autoher      ���ꂨ�� (takeiteasy_idontthinkso)
    //-------------------------------------------------------------------------------------
    //����  2013/06/17  Version 1.0.0
    //      2013/06/24  Version 1.1.0
    //                  LISP�R�[�h�\���̋K��l type_informal �̒ǉ�
    //-------------------------------------------------------------------------------------
    
    //LISP�R�[�h�̗����\���\��
    var type_informal = true;
    
    //�X�N���v�g�^�O�̎��s��
    var onceScriptTags      = false;
    
    //�X�N���v�g�^�O�̎��s���ʕۑ�
    var ScriptTagsResults   = new Array();
    
    //----------------------------------------------------------------------------- JunLISP
    //  execute     �\�[�X�iLISP�R�[�h�j�����߂����s���ʂƂƂ��ɔz��Ƃ��ĕԂ�
    //-------------------------------------------------------------------------------------
    // LastUpdate   2013/06/24
    // Version      1.1.0
    // Autoher      ���ꂨ�� (takeiteasy_idontthinkso)
    //-------------------------------------------------------------------------------------
    //����  2013/06/17  Version 1.0.0
    //      2013/06/24  Version 1.1.0
    //                  Lisp�R�[�h�̕����ϊ��̌`�����K��l�̕ϊ��Œ��
    //-------------------------------------------------------------------------------------
    var execute = function (src) {
        
        var lisplist = ListAnalyzer.toLispData(src);
        var resultlist = new Array(), result;
        var curPG, i, PG, RS;
        
        i = 0;
        for (curPG = lisplist, PG = curPG.getProgram(); (curPG.isProgramEnd() || PG.isProgramEnd()) == false; curPG = curPG.getNext(), PG = curPG.getProgram()) {
            RS = ListProcessor.executeLisp(PG);
            result = resultlist[i++] = new Array();
            result["codeerror"] = PG.isError();
            result["resulterror"] = RS.isError();
            result["code"] = (type_informal ? StringConverter.toInformalString(PG) : StringConverter.toFormalString(PG));
            result["result"] = (type_informal ? StringConverter.toInformalString(RS) : StringConverter.toFormalString(RS));
        }
        
        return resultlist;
    };
    this.execute = execute;

    
    //----------------------------------------------------------------------------- JunLISP
    //  executeScriptTags   HTML�\�[�X����script�^�O�ɋL�q���ꂽLISP�R�[�h�����ߎ��s����
    //-------------------------------------------------------------------------------------
    // LastUpdate   2013/06/24
    // Version      1.1.0
    // Autoher      ���ꂨ�� (takeiteasy_idontthinkso)
    //-------------------------------------------------------------------------------------
    //����  2013/06/17  Version 1.0.0
    //      2013/06/24  Version 1.1.0
    //                  Lisp�R�[�h�̕����ϊ��̌`�����K��l�̕ϊ��Œ��
    //-------------------------------------------------------------------------------------
    var executeScriptTags = function () {
        if (onceScriptTags) { return; }
        var tags = document.getElementsByTagName("script");
        var i, tag, src, RS, PG, curPG, result, lisplist, j=0;
        for (i = 0; i< tags.length; i++) {
            tag = tags[i];
            if ((tag.type == "text/x-jun-lisp") || (tag.language == "jun-lisp")) {
                src = tag.innerHTML;
                lisplist = ListAnalyzer.toLispData(src);
                for (curPG = lisplist, PG = curPG.getProgram(); (curPG.isProgramEnd() || PG.isProgramEnd()) == false; curPG = curPG.getNext(), PG = curPG.getProgram()) {
                    RS = ListProcessor.executeLisp(PG);
                    result = ScriptTagsResults[j++] = new Array();
                    result["code"]   = (type_informal ? StringConverter.toInformalString(PG) : StringConverter.toFormalString(PG));
                    result["result"] =  (type_informal ? StringConverter.toInformalString(RS) : StringConverter.toFormalString(RS));
                    debug(result["code"]);
                    debug(result["result"]);
                }
            }
        }
        onceScriptTags = true;
    };
    this.executeScriptTags = executeScriptTags;
    
    //----------------------------------------------------------------------------- JunLISP
    //  onLoadExecute       �w��DOMElement��onload����executeScriptTags()�����s����悤�ݒ肷��
    //-------------------------------------------------------------------------------------
    // LastUpdate   2013/06/22
    // Version      1.0.0
    // Autoher      ���ꂨ�� (takeiteasy_idontthinkso)
    //-------------------------------------------------------------------------------------
    this.onLoadExecute = function (target) {
        var t = target;
        if (target) ; else { t = window; }
        if (t.attachEvent) {
            debug("attachEvent");
           t.attachEvent("onload", function () { executeScriptTags(); });
        } else if (t.addEventListener) {
            debug("addEventListener");
            t.addEventListener("load", function () { executeScriptTags(); }, true);
        } else {
            debug('No support browser. Can not execute on load.');
        }
    };
    
    /////////////////////////////////////////////////////////////////////////////// JunLISP
    //  �f�o�b�O�p���[�e�B���e�B
    ///////////////////////////////////////////////////////////////////////////////////////
    
    /* */
    //-------------------------------------------------------------------------  SukunaLISP
    //  �f�o�b�O�֘A�ϐ�
    //-------------------------------------------------------------------------------------
    // LastUpdate   2013/06/17
    // Version      1.0.0
    //-------------------------------------------------------------------------------------
    
    //�f�o�b�O���b�Z�[�W�̕ێ�
    var debugmsg ="";
    
    //LISP�R�[�h�̌��݂̃l�X�g�̐[��
    var debugnest = 0;
    
    //�l�X�g�̐[���̕�����\�� (�ʏ�debugnest�̐������̕�����������)
    var debugneststr = "";

    //-------------------------------------------------------------------------  SukunaLISP
    //  getDebugText        �f�o�b�O���b�Z�[�W�̎擾
    //-------------------------------------------------------------------------------------
    // LastUpdate   2013/06/17
    // Version      1.0.0
    // Autoher      ���ꂨ�� (takeiteasy_idontthinkso)
    //-------------------------------------------------------------------------------------
    this.getDebugText = function () {
        return debugmsg;
    };


    //-------------------------------------------------------------------------  SukunaLISP
    //  clearDebugText      �f�o�b�O���b�Z�[�W���N���A����
    //-------------------------------------------------------------------------------------
    // LastUpdate   2013/06/17
    // Version      1.0.0
    // Autoher      ���ꂨ�� (takeiteasy_idontthinkso)
    //-------------------------------------------------------------------------------------
    this.clearDebugText = function () {
        debugmsg = "";
        debugnest = 0;
    };
    

    //-------------------------------------------------------------------------  SukunaLISP
    //  debug               �f�o�b�O���b�Z�[�W�Ƀ��b�Z�[�W��ǉ�����
    //-------------------------------------------------------------------------------------
    // LastUpdate   2013/06/17
    // Version      1.0.0
    // Autoher      ���ꂨ�� (takeiteasy_idontthinkso)
    //-------------------------------------------------------------------------------------
    function debug(msg) {
        debugmsg += debugneststr + msg + "\n";
    }

    //-------------------------------------------------------------------------  SukunaLISP
    //  debugInNest         �f�o�b�O���b�Z�[�W�Ƀl�X�g�ɓ��������Ƃ�ݒ肷��
    //-------------------------------------------------------------------------------------
    // LastUpdate   2013/06/17
    // Version      1.0.0
    // Autoher      ���ꂨ�� (takeiteasy_idontthinkso)
    //-------------------------------------------------------------------------------------
    function debugInNest() {
        debugnest++;
        if (debugnest>0) {
            debugneststr += "_";
        } else {
            debugneststr = "";
        }
    }
    
    //-------------------------------------------------------------------------  SukunaLISP
    //  debugOutNest        �f�o�b�O���b�Z�[�W�Ƀl�X�g����o�����Ƃ�ݒ肷��
    //-------------------------------------------------------------------------------------
    // LastUpdate   2013/06/17
    // Version      1.0.0
    // Autoher      ���ꂨ�� (takeiteasy_idontthinkso)
    //-------------------------------------------------------------------------------------
    function debugOutNest() {
        debugnest--;
        debugneststr = debugneststr.substring(1);
    }
    /* */
    
    /////////////////////////////////////////////////////////////////////////////// JunLISP
    //  LISP�Ƃ͒��ڊ֌W�Ȃ����[�e�B���e�B�Q
    ///////////////////////////////////////////////////////////////////////////////////////

    //----------------------------------------------------------------------------- JunLISP
    //  StackArray          �X�^�b�N
    //-------------------------------------------------------------------------------------
    // LastUpdate   2013/06/19
    // Version      1.1.0
    // Autoher      ���ꂨ�� (takeiteasy_idontthinkso)
    //-------------------------------------------------------------------------------------
    //����  2013/06/17  Version 1.0.0
    //      2013/06/19  Version 1.1.0
    //                  ListAnalyzer�N���X����e�N���X��MinimalLISP�N���X�֔z�u�ړ�
    //                  �N���X����STK����StackArray�ɕύX
    //-------------------------------------------------------------------------------------
    function StackArray() {
        var list = new Array();
        var n = 0;
        this.push   = function (v) { return list[n++] = v; };
        this.peek   = function ()  { return n == 0 ? null : list[n - 1]; };
        this.pop    = function ()  { return n == 0 ? null : list[--n]; };
        this.size   = function ()  { return n; };
        this.item   = function (i) { return ((i >= 0) || (i < n)) ? list[i] : null; };
        this.getList = function () { return list; };
        this.clear  = function ()  { 
            var i;
            for (i = 0; i < list.length; i++) {
                list[i] = null;
            }
            list = new Array();
            n = 0;
            return true;
        };
    }
    
    /////////////////////////////////////////////////////////////////////////////// JunLISP
    //  �V�X�e���萔
    ///////////////////////////////////////////////////////////////////////////////////////
    
    //----------------------------------------------------------------------------- JunLISP
    //  LispData�̃^�C�v�萔
    //-------------------------------------------------------------------------------------
    //  LastUpdate  2013/06/17
    //  Version     1.0.0
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
    var DATATYPE_PROGRAMEND    = "program end";
    
    //----------------------------------------------------------------------------- JunLISP
    //  Lisp�萔
    //-------------------------------------------------------------------------------------
    //  LastUpdate  2013/06/17
    //  Version     1.0.0
    //-------------------------------------------------------------------------------------
    var SYMBOL_NIL      = "NIL";
    var SYMBOL_T        = "T";
    
    //----------------------------------------------------------------------------- JunLISP
    //  ����`��(Special Form)��
    //-------------------------------------------------------------------------------------
    //  LastUpdate  2013/06/17
    //  Version     1.0.0
    //-------------------------------------------------------------------------------------
    var SPECIALFORM_QUOTE   = "QUOTE";
    var SPECIALFORM_COND    = "COND";
    var SPECIALFORM_LAMBDA  = "LAMBDA";
    var SPECIALFORM_DEFINE  = "DEFINE";
    var SPECIALFORM_LABEL   = "LABEL";
    
    //----------------------------------------------------------------------------- JunLISP
    //  �V�X�e���֐�(Fixed Function)��
    //-------------------------------------------------------------------------------------
    //  LastUpdate  2013/06/17
    //  Version     1.0.0
    //-------------------------------------------------------------------------------------
    var FIXEDFUNCTION_EQ      = "EQ";
    var FIXEDFUNCTION_CONS    = "CONS";
    var FIXEDFUNCTION_CAR     = "CAR";
    var FIXEDFUNCTION_CDR     = "CDR";
    var FIXEDFUNCTION_ATOM    = "ATOM";
    
    /////////////////////////////////////////////////////////////////////////////// JunLISP
    //  LispData�^�p���[�e�B���e�B�萔
    ///////////////////////////////////////////////////////////////////////////////////////
    
    //----------------------------------------------------------------------------- JunLISP
    //  LispData�ɐݒ肷��z��p�̒萔
    //-------------------------------------------------------------------------------------
    //  LastUpdate  2013/06/23
    //  Version     1.0.0
    //-------------------------------------------------------------------------------------
    
    //���X�g�^�C�v
    var LD_LIST_FRONT           = 0; //CAR�Ŏ��o�����v�f��z��Ɋi�[����ʒu
    var LD_LIST_END             = 1; //CDR�Ŏ��o�����v�f��z��Ɋi�[����ʒu
    var LD_LIST_ARR_SIZE        = 2; //���X�g�^�C�v�̔z��̃T�C�Y
    var LD_LIST_ERROR           = 0; //�G���[�v�f��z��ɓ����Y����(ListAnalyzer�N���X��parse�ŗ��p)
    
    //�v���O�����^�C�v
    var LD_PROGRAM              = 0; //LISP�R�[�h��z��Ɋi�[����ʒu
    var LD_NEXT                 = 1; //���̃v���O������z��Ɋi�[����ʒu
    var LD_PROGRAM_ARR_SIZE     = 2; //�v���O�����^�C�v�̔z��̃T�C�Y
    
    //�����_�^�C�v
    var LD_LAMBDA_VCID          = 0; //�ϐ��R���e�iID��z��Ɋi�[����ʒu
    var LD_LAMBDA_ARG_DEF       = 1; //�����_���X�g��z��Ɋi�[����ʒu
    var LD_LAMBDA_PROGRAM       = 2; //�����_���s����z��Ɋi�[����ʒu
    var LD_LAMBDA_ARR_SIZE      = 3; //�����_�^�C�v�̔z��̃T�C�Y
    
    //�G���v�e�B���X�g�^�C�v
    var LD_EMPTYLIST_ARR_SIZE   = 0; //�G���v�e�B���X�g�̔z��̃T�C�Y
    
    /////////////////////////////////////////////////////////////////////////////// JunLISP
    //  LispData�N���X�̒�`
    ///////////////////////////////////////////////////////////////////////////////////////

    //----------------------------------------------------------------------------- JunLISP
    //  LispData            Lisp�����p�Ǘ��f�[�^�R���e�i
    //-------------------------------------------------------------------------------------
    //  LastUpdate      2013/06/22
    //  Version         1.0.1
    //  Autoher         ���ꂨ�� (takeiteasy_idontthinkso)
    //-------------------------------------------------------------------------------------
    //����  2013/06/17      Version 1.0.0
    //      2013/06/22      Version 1.1.0
    //                      isNil�̔���@�̕ύX
    //-------------------------------------------------------------------------------------
    function LispData(name, data, type) {
        
        //---------------------------------------------------------------------------- LispData
        //  ���������o
        //-------------------------------------------------------------------------------------
        //  LastUpdate      2013/06/22
        //  Version         1.0.0
        //-------------------------------------------------------------------------------------
        var nil = ((type === DATATYPE_EMPTYLIST) || ((type === DATATYPE_SYMBOL) && (data == SYMBOL_NIL)));
        
        //---------------------------------------------------------------------------- LispData
        //  �Q�b�^�[
        //-------------------------------------------------------------------------------------
        //  LastUpdate      2013/06/17
        //  Version         1.0.0
        //  Autoher         ���ꂨ�� (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        this.getName = function () { return name; };
        this.getData = function () { return data; };
        this.getType = function () { return type; };
        
        //---------------------------------------------------------------------------- LispData
        //  �^�C�v�₢���킹
        //-------------------------------------------------------------------------------------
        //  LastUpdate      2013/06/22
        //  Version         1.1.0
        //  Autoher         ���ꂨ�� (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        //����  2013/06/17  Version 1.0.0
        //      2013/06/22  Version 1.1.0
        //                  isNil�̏����𒼐ڌv�Z����l��Ԃ������ɕύX
        //-------------------------------------------------------------------------------------
        this.isNil            = function () { return nil; };
        this.isSymbol         = function () { return ((type === DATATYPE_SYMBOL) || (type === DATATYPE_EMPTYLIST)); };
        this.isList           = function () { return (type === DATATYPE_LIST); };
        this.isEmptyList      = function () { return (type === DATATYPE_EMPTYLIST); };
        this.isUserFunction   = function () { return (type === DATATYPE_LAMBDA); };
        this.isSystemFunction = function () { return ((type === DATATYPE_FIXEDFUNCTION) || (type === DATATYPE_SPECIALFORM)); };
        this.isSpecialForm    = function () { return (type === DATATYPE_SPECIALFORM); };
        this.isFunction       = function () { return ((type === DATATYPE_FIXEDFUNCTION) || (type === DATATYPE_SPECIALFORM) || (type === DATATYPE_LAMBDA)); };
        this.isComment        = function () { return (type === DATATYPE_COMMENT); };
        this.isError          = function () { return (type === DATATYPE_ERROR); };
        this.isProgram        = function () { return (type === DATATYPE_PROGRAM); };
        this.isProgramEnd     = function () { return (type === DATATYPE_PROGRAMEND); };
        
        //---------------------------------------------------------------------------- LispData
        //  �f�[�^�擾���[�e�B���e�B (�����LispDataManager�Ɉϑ�����ׂ���������Ȃ�)
        //-------------------------------------------------------------------------------------
        //  LastUpdate      2013/06/17
        //  Version         1.0.0
        //  Autoher         ���ꂨ�� (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        this.getListFront     = function () { 
            return (type === DATATYPE_LIST) ? data[LD_LIST_FRONT] : LispDataManager.makeError("�f�[�^�G���[�I [getListFront]", "This method (getListFront) can be called with list type:"); };
        this.getListEnd       = function () { 
            return (type === DATATYPE_LIST) ? data[LD_LIST_END] : LispDataManager.makeError("�f�[�^�G���[�I [getListEnd]", "This method (getListEnd) can be called with list type:"); };
        this.getProgram       = function () { 
            return (type === DATATYPE_PROGRAM) ? data[LD_PROGRAM] : LispDataManager.makeError("�f�[�^�G���[�I [getProgram]", "This method (getProgram) can be called with program type:"); };
        this.getNext          = function () { 
            return (type === DATATYPE_PROGRAM) ? data[LD_NEXT] : LispDataManager.makeError("�f�[�^�G���[�I [getNext]", "This method (getNext) can be called with program type:"); };
        this.getLambdaVCID      = function () {
            return (type === DATATYPE_LAMBDA) ? data[LD_LAMBDA_VCID] : LispDataManager.makeError("�f�[�^�G���[�I [getLambdaVCID]", "This method (getLambdaVCID) can be called with lambda type:"); };
        this.getLambdaArgDef    = function () {
            return (type === DATATYPE_LAMBDA) ? data[LD_LAMBDA_ARG_DEF] : LispDataManager.makeError("�f�[�^�G���[�I", "This method (getLambdaArgDef) can be called with lambda type:"); };
        this.getLambdaProgram   = function () {
            return (type === DATATYPE_LAMBDA) ? data[LD_LAMBDA_PROGRAM] : LispDataManager.makeError("�f�[�^�G���[�I", "This method (getLambdaProgram) can be called with lambda type:"); };
        
        //---------------------------------------------------------------------------- LispData
        //  �K�x�[�W�R���N�g
        //-------------------------------------------------------------------------------------
        //  LastUpdate      2013/06/17
        //  Version         1.0.0
        //  Autoher         ���ꂨ�� (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        this.gc = function () {
            if (this.isList() || this.isProgram() || this.isUserFunction()) {
                var i;
                for (i = 0; i < data.length; i++) {
                    data[i] = null;
                }
            }
            name = null; data = null; type = null;  //�ė��p���S�s��
        };
    
    } //LispData�̒�`�̂����
    
    /////////////////////////////////////////////////////////////////////////////// JunLISP
    //  LispData�^�Ǘ����[�e�B���e�B
    ///////////////////////////////////////////////////////////////////////////////////////

    //----------------------------------------------------------------------------- JunLISP
    //  LispDataManager         LispData�^�Ǘ����[�e�B���e�B
    //-------------------------------------------------------------------------------------
    //  LastUpdate      2013/06/17
    //  Version         1.0.0
    //  Autoher         ���ꂨ�� (takeiteasy_idontthinkso)
    //-------------------------------------------------------------------------------------
    //����  2013/06/17      Version 1.0.0
    //-------------------------------------------------------------------------------------
    
    var LispDataManager = new function () {
        
        //--------------------------------------------------------------------- LispDataManager
        //  getSymbol           �V���{���^�C�v��LispData���擾����
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/17
        // Version      1.0.0
        // Autoher      ���ꂨ�� (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        var symbols = new Array();
        var getSymbol = function (symbol) {
            if (symbols[symbol]) {
                return symbols[symbol];
            } else {
                symbols[symbol] = new LispData(symbol, symbol, DATATYPE_SYMBOL);
                return symbols[symbol];
            }
        };
        this.getSymbol = getSymbol;
        
        
        //--------------------------------------------------------------------- LispDataManager
        //  wrapList                    �z������X�g�f�[�^(LispData)�ɂ���
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/17
        // Version      1.0.0
        // Autoher      ���ꂨ�� (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        var wrapList = function (listdata) {
            if (listdata.length == LD_LIST_ARR_SIZE) {
                return new LispData(null, listdata, DATATYPE_LIST);
            } else if (listdata.length == LD_EMPTYLIST_ARR_SIZE) {
                return LISPDATA_EMPTYLIST;
                //return LISPDATA_NIL;
                //return new LispData(null, list, DATATYPE_LIST);
            } else {
                return makeError("LispData Error", "Wrong data length (wrapList):");
            }
        };
        this.wrapList = wrapList;
        
        //--------------------------------------------------------------------- LispDataManager
        //  makeList                    �������烊�X�g�f�[�^(LispData)�����
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/17
        // Version      1.0.0
        // Autoher      ���ꂨ�� (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        var makeList = function (frontLD, endLD) {
            return wrapList(new Array(frontLD, endLD));
        };
        this.makeList = makeList;
        
        //--------------------------------------------------------------------- LispDataManager
        //  makeEmptyProgram            �V������̃v���O����(LispData)�����
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/17
        // Version      1.0.0
        // Autoher      ���ꂨ�� (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        this.makeEmptyProgram = function (num) {
            return new LispData(num, new Array(LISPDATA_PROGRAMEND, LISPDATA_PROGRAMEND), DATATYPE_PROGRAM);
        };
        
        //--------------------------------------------------------------------- LispDataManager
        //  makeError                   �C�ӂ̃G���[�f�[�^(LispData)�𐶐�����
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/17
        // Version      1.0.0
        // Autoher      ���ꂨ�� (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        var makeError = function (errorname, description) {
            return new LispData(errorname, description, DATATYPE_ERROR);
        };
        this.makeError = makeError;
    
        //--------------------------------------------------------------------- LispDataManager
        // wrapQuote                    LispData��QUOTE�ɓ����
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/17
        // Version      1.0.0
        // Autoher      ���ꂨ�� (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        var wrapQuote = function (quote, LD) {
            if (quote === 0) {
                return LD;
            } else {
                return makeList(
                            getSymbol(SPECIALFORM_QUOTE),
                            makeList(
                                wrapQuote(quote - 1, LD),
                                LISPDATA_NIL
                                )
                            );
            }
        };
        this.wrapQuote = wrapQuote;
        
        //--------------------------------------------------------------------- LispDataManager
        // makeLambda                   ���݂̃X�R�[�v��LAMBDA�֐������
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/17
        // Version      1.0.0
        // Autoher      ���ꂨ�� (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        this.makeLambda = function (argdefLD, codeLD) {
            return new LispData(SPECIALFORM_LAMBDA,
                new Array(VariableManager.getCurrentVariableContainerID(), argdefLD, codeLD), 
                DATATYPE_LAMBDA);
        };
        
        //--------------------------------------------------------------------- LispDataManager
        //  setListFront        �w�胊�X�g(LispData)�̐擪�f�[�^��ݒ肷��
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/17
        // Version      1.0.0
        // Autoher      ���ꂨ�� (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        this.setListFront = function (listLD, data) {
            if (listLD.isList()) {
                return listLD.getData()[LD_LIST_FRONT] = data;
            } else {
                return null;
            }
        };
        
        //--------------------------------------------------------------------- LispDataManager
        //  setListEnd          �w�胊�X�g(LispData)�̖����f�[�^��ݒ肷��
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/17
        // Version      1.0.0
        // Autoher      ���ꂨ�� (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        this.setListEnd = function (listLD, data) {
            if (listLD.isList()) {
                return listLD.getData()[LD_LIST_END] = data;
            } else {
                return null;
            }
        };
        
        //--------------------------------------------------------------------- LispDataManager
        //  setProgram          �w��v���O����(LispData)�̃v���O������ݒ肷��
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/17
        // Version      1.0.0
        // Autoher      ���ꂨ�� (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        this.setProgram = function (programLD, data) {
            if (programLD.isProgram()) {
                return programLD.getData()[LD_PROGRAM] = data;
            } else {
                return null;
            }
        };
        
        //--------------------------------------------------------------------- LispDataManager
        //  setNextProgram      �w��v���O����(LispData)�̎��̃v���O������ݒ肷��
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/17
        // Version      1.0.0
        // Autoher      ���ꂨ�� (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        this.setNextProgram = function (programLD, data) {
            if (programLD.isProgram() && (data.isProgram() || data.isProgramEnd())) {
                programLD.getData()[LD_NEXT] = data;
            } else {
                return null;
            }
        };
    
    };// LispDataManager�̒�`�̂����

    //----------------------------------------------------------------------------- JunLISP
    //  ListUtil        ���X�g�^�C�v��LispData�p���[�e�B���e�B
    //-------------------------------------------------------------------------------------
    //  LastUpdate      2013/06/24
    //  Version         1.2.0
    //  Autoher         ���ꂨ�� (takeiteasy_idontthinkso)
    //-------------------------------------------------------------------------------------
    //����  2013/06/21      Version 1.0.0
    //                      car cdr cons ��ݒu
    //      2013/06/22      Version 1.1.0
    //                      listLength cadr ��ݒu
    //      2013/06/24      �`�`�` �V��`�� JunLISP �`�`�`
    //                      Version 1.2.0
    //                      caddr ��ݒu
    //-------------------------------------------------------------------------------------

    var ListUtil = new function () {
    
        //---------------------------------------------------------------------------- ListUtil
        //  car 
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/21
        // Version      1.0.0
        // Autoher      ���ꂨ�� (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        var car = function (listLD) {
            if (listLD instanceof LispData) {
                if (listLD.isList()) {
                    return listLD.getListFront();
                } else if (listLD.isNil()) {
                    return LISPDATA_EMPTYLIST;
                } else if (listLD.isError()) {
                    return listLD;
                }
            }
            return LispDataManager.makeError("�����G���[�I","���������X�g���Ⴀ��܂���I");
        };
        this.car = car;

        //---------------------------------------------------------------------------- ListUtil
        //  cdr 
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/21
        // Version      1.0.0
        // Autoher      ���ꂨ�� (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        var cdr = function (listLD) {
            if (listLD instanceof LispData) {
                if (listLD.isList()) {
                    return listLD.getListEnd();
                } else if (listLD.isNil()) {
                    return LISPDATA_EMPTYLIST;
                } else if (listLD.isError()) {
                    return listLD;
                }
            }
            return LispDataManager.makeError("�����G���[�I","���������X�g���Ⴀ��܂���I");
        };
        this.cdr = cdr;

        //---------------------------------------------------------------------------- ListUtil
        //  cons        ���LispData�������X�g(LispData)��Ԃ�
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/21
        // Version      1.0.0
        // Autoher      ���ꂨ�� (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        var cons = function (frontLD, endLD) {
            if ((frontLD instanceof LispData) && (endLD instanceof LispData)) {
                if ((frontLD.isSymbol() || frontLD.isList()) && (endLD.isSymbol() || endLD.isList())) {
                    return LispDataManager.makeList(frontLD, endLD);
                } else if (frontLD.isError()) {
                    return frontLD;
                } else if (endLD.isError()) {
                    return endLD;
                }
            }
            return LispDataManager.makeError("�����G���[�I","�����ɂ̓V���{�������X�g���w�肵�Ă��������I");
        };
        this.cons = cons;
        
        var LENGTH_ERROR = -1;
        
        //---------------------------------------------------------------------------- ListUtil
        //  listLength
        //-------------------------------------------------------------------------------------
        //  �����X�g(True List, ���X�g�̍ŌオNIL�ŏI������) �̖�����NIL�������v�f����Ԃ�
        //-------------------------------------------------------------------------------------
        //��
        //  (a b c d) => 4
        //  () => 0
        //  (a . b) => Error
        //  a => Error
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/22
        // Version      1.0.0
        // Autoher      ���ꂨ�� (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        var listLength = function (listLD) {
            if (listLD instanceof LispData) {
                if (listLD.isList()) {
                    var length = listLength(cdr(listLD));
                    if (length == LENGTH_ERROR) {
                        return LENGTH_ERROR;
                    } else {
                        return length + 1;
                    }
                } else if (listLD.isNil()) {
                    return 0;
                }
            }
            return LENGTH_ERROR;
        };
        this.listLength = listLength;
        
        
        //---------------------------------------------------------------------------- ListUtil
        //  cadr        cdr�̌��ʂ�car�������̂�Ԃ� 
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/22
        // Version      1.0.0
        // Autoher      ���ꂨ�� (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        var cadr = function (listLD) {
            return car(cdr(listLD));
        };
        this.cadr = cadr;

        //---------------------------------------------------------------------------- ListUtil
        //  caddr        cdr�Q��̌��ʂ�car�������̂�Ԃ� 
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/24
        // Version      1.0.0
        // Autoher      ���ꂨ�� (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        var caddr = function (listLD) {
            return car(cdr(cdr(listLD)));
        };
        this.caddr = caddr;

    };

    
    /////////////////////////////////////////////////////////////////////////////// JunLISP
    //  LispData�萔
    ///////////////////////////////////////////////////////////////////////////////////////

    //----------------------------------------------------------------------------- JunLISP
    //  LispData�^�萔
    //-------------------------------------------------------------------------------------
    //  LastUpdate      2013/06/17
    //  Version         1.0.0
    //  Autoher         ���ꂨ�� (takeiteasy_idontthinkso)
    //-------------------------------------------------------------------------------------
    var LISPDATA_ERROR      = LispDataManager.makeError("�s���G���[�I", "�����s���̃G���[�ł��I");  //��ʃG���[
    var LISPDATA_T          = LispDataManager.getSymbol(SYMBOL_T);                              //�V���{�� T
    var LISPDATA_NIL        = LispDataManager.getSymbol(SYMBOL_NIL);                            //�V���{�� NIL
    var LISPDATA_EMPTYLIST  = new LispData(SYMBOL_NIL, SYMBOL_NIL, DATATYPE_EMPTYLIST);         //�󃊃X�g
    var LISPDATA_PROGRAMEND = new LispData(null, null, DATATYPE_PROGRAMEND);                    //�v���O�����I�[
    
    
    /////////////////////////////////////////////////////////////////////////////// JunLISP
    //  Lisp�R�[�h�\����͏���
    ///////////////////////////////////////////////////////////////////////////////////////
    
    //----------------------------------------------------------------------------- JunLISP
    //  ListAnalyzer        Lisp�R�[�h�Q���\����͂�LispData�^�̃v���O�������X�g�ɕϊ�����
    //-------------------------------------------------------------------------------------
    //  LastUpdate      2013/06/22
    //  Version         1.1.2
    //  Autoher         ���ꂨ�� (takeiteasy_idontthinkso)
    //-------------------------------------------------------------------------------------
    //����  2013/06/17      Version 1.0.0
    //      2013/06/19      Version 1.1.0
    //                      STK�N���X��ListAnalyzer�N���X���� MinimalLISP�N���X�ֈړ�
    //                      STK�N���X�̖��O��StackArray�ɕς�����̂ŊY���ӏ����C��
    //      2013/06/21      Version 1.1.1
    //                      �G���[���b�Z�[�W����{�ꉻ
    //      2013/06/22      Version 1.1.2
    //                      ���O�̕t���������̐��`
    //
    //-------------------------------------------------------------------------------------
    
    var ListAnalyzer = new function () {
    
        
        //------------------------------------------------------------------------ ListAnalyzer
        //  WrodData        scan���ʂ̏���ۑ�����
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/22
        // Version      1.1.0
        // Autoher      ���ꂨ�� (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        //����  2013/06/17  Version 1.0.0
        //      2013/06/22  Version 1.1.0
        //                  ���O��WORD����WordData�ɕύX
        //-------------------------------------------------------------------------------------
        function WordData(spacecount, position, size) {
            this.getSpaceCount = function () { return spacecount; };
            this.getPosition   = function () { return position; };
            this.getSize       = function () { return size; };
        }
        
        //------------------------------------------------------------------------ ListAnalyzer
        // TokenData�p�萔
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/17
        // Version      1.0.0
        //-------------------------------------------------------------------------------------
        var TOKEN_ATOM  = 0;
        var TOKEN_OPEN  = 1;
        var TOKEN_CLOSE = 2;
        var TOKEN_DOT   = 3;
        var TOKEN_QUOTE = 4;
        
        //------------------------------------------------------------------------ ListAnalyzer
        //  TokenData       tokenize�̌��ʂ̏���ۑ�����
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/22
        // Version      1.1.0
        // Autoher      ���ꂨ�� (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        //����  2013/06/17  Version 1.0.0
        //      2013/06/22  Version 1.1.0
        //                  ���O��TOKEN����TokenData�֕ύX
        //-------------------------------------------------------------------------------------
        function TokenData(word, type, col, row, spacecount) {
            this.getWord       = function () { return word; };
            this.getSpaceCount = function () { return spacecount; };
            this.getColumn     = function () { return col; };
            this.getRow        = function () { return row; };
            this.isAtom     = function () { return (type === TOKEN_ATOM); };
            this.isOpen     = function () { return (type === TOKEN_OPEN); };
            this.isClose    = function () { return (type === TOKEN_CLOSE); };
            this.isDot      = function () { return (type === TOKEN_DOT); };
            this.isQuote    = function () { return (type === TOKEN_QUOTE); };
        }
        
        //------------------------------------------------------------------------ ListAnalyzer
        //  scan            �\�[�X���X�y�[�X�E�w�蕶���E����ȊO�̕����� �ɕ�������
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/22
        // Version      1.0.2
        // Autoher      ���ꂨ�� (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        //����  2013/06/17  Version 1.0.0
        //      2013/06/19  Version 1.0.1
        //                  STK�N���X�̖��O�ύX�ɔ������C�� (STK �� StackArray)
        //      2013/06/22  Version 1.0.2
        //                  WORD�N���X�̖��O�ύX�ɔ������C�� (WORD �� WordData)
        //-------------------------------------------------------------------------------------
        var scan = function (str) {
            var SYMBOLS     = "();";
            var STATE_SPACE = 0;
            var STATE_WORD  = 1;
            var state = STATE_SPACE;
            var list = new StackArray();
            var i, spc = 0, sz = 0, ps = 0;
            for (i = 0; i < str.length; i++) {
                ch = str.charAt(i);
                switch (state) {
                case STATE_SPACE:
                    if ((SYMBOLS.indexOf(ch) >= 0) || (ch == "\n") || (ch == "\r") || (ch == "\t") || (ch == "'")) {
                        list.push(new WordData(spc, i, 1));
                        spc = 0;
                    } else if (ch == " ") {
                        spc++;
                    } else {
                        state = STATE_WORD;
                        ps = i; sz = 1;
                    }
                    break;
                case STATE_WORD:
                    if ((SYMBOLS.indexOf(ch) >= 0) || (ch == "\n") || (ch == "\r") || (ch == "\t")) {
                        list.push(new WordData(spc, ps, sz));
                        spc = 0; state = STATE_SPACE;
                        list.push(new WordData(spc, i, 1));
                    } else if (ch == " ") {
                        list.push(new WordData(spc, ps, sz));
                        spc = 1; sz = 0; state = STATE_SPACE;
                    } else {
                        sz++;
                    }   
                    break;
                }
            }
            if (state === STATE_WORD) {
                list.push(new WordData(spc, ps, sz));
            }
            return list.getList();
        }
        
        //------------------------------------------------------------------------ ListAnalyzer
        //  tkenize             scan���ʂ��g�[�N���Ɏd��������
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/22
        // Version      1.0.2
        // Autoher      ���ꂨ�� (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        //����  2013/06/17  Version 1.0.0
        //      2013/06/19  Version 1.0.1
        //                  STK�N���X�̖��O�ύX�ɔ������C��(STK �� StackArray)
        //      2013/06/22  Version 1.0.2
        //                  TOKEN�N���X�̖��O�ύX�ɔ������C��(TOKEN �� TokenData)
        //-------------------------------------------------------------------------------------
        var tokenize = function (str, words) {
            var STATE_TOKEN     = 0;
            var STATE_COMMENT   = 1;
            var list  = new StackArray();
            var state = STATE_TOKEN;
            var col = 0, row = 1;
            var i, wd, tk, nl = null, spc = 0;
            for (i = 0; i < words.length; i++) {
                wd = words[i];
                col += wd.getSpaceCount();
                spc += wd.getSpaceCount();
                tk = str.substring(wd.getPosition(), wd.getPosition() + wd.getSize());
                switch (state) {
                case STATE_TOKEN:
                    if (tk == ";") {
                        state = STATE_COMMENT; spc += wd.getSize();
                    } else if (tk == ".") {
                        list.push(new TokenData(tk, TOKEN_DOT, col, row, wd.getSpaceCount()));
                        spc = 0;
                    } else if (tk == "'") {
                        list.push(new TokenData(tk, TOKEN_QUOTE, col, row, wd.getSpaceCount() + spc));
                        spc = 0;
                    } else if (tk == "(") {
                        list.push(new TokenData(tk, TOKEN_OPEN, col, row, wd.getSpaceCount() + spc));
                        spc = 0;
                    } else if (tk == ")") {
                        list.push(new TokenData(tk, TOKEN_CLOSE, col, row, wd.getSpaceCount()));
                        spc = 0;
                    } else if ((tk == "\n") || (tk == "\r")) {
                        if (nl == tk) {
                            row++; col = 0; spc += wd.getSize();
                        } else if (nl == null) {
                            row++; col = 0;
                            nl = tk;
                            spc += wd.getSize();
                        }
                        col -= wd.getSize();
                    } else if (tk == "\t") {
                        spc += wd.getSize();
                    } else {
                        list.push(new TokenData(tk, TOKEN_ATOM, col, row, wd.getSpaceCount() + spc));
                        spc = 0;
                    }
                    break;
                case STATE_COMMENT:
                    if ((tk == "\n") || (tk == "\r")) {
                        if (nl == tk) {
                            row++; col = 0; spc += wd.getSize();
                        } else if (nl == null) {
                            row++; col = 0;
                            nl = tk; spc += wd.getSize();
                        }
                        col -= wd.getSize();
                        state = STATE_TOKEN;
                    }
                    break;
                }
                col += wd.getSize();
            }
            return list.getList();
        }
    
        //------------------------------------------------------------------------ ListAnalyzer
        //  readList�p�萔
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/21
        // Version      1.0.1
        //-------------------------------------------------------------------------------------
        //����  2013/06/17  Version 1.0.0
        //      2013/06/21  Version 1.0.1
        //                  parse�̓����萔����ListAnalyzer�̓����萔�ɔz�u�ύX
        //-------------------------------------------------------------------------------------
        var READLIST_ERROR  = -1;
        var STATE_WAIT_FOR_FRONT    = 0;
        var STATE_WAIT_FOR_DOT      = 1;
        var STATE_WAIT_FOR_END      = 2;
        var STATE_WAIT_FOR_CLOSE    = 3;

        //------------------------------------------------------------------------ ListAnalyzer
        //  mkPos               TokenData�̏ꏊ�𕶎��ɂ���
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/21
        // Version      1.0.1
        //-------------------------------------------------------------------------------------
        //����  2013/06/17  Version 1.0.0
        //      2013/06/21  Version 1.0.1
        //                  parse�̓����֐�����ListAnalyzer�̓����֐��ɔz�u�ύX
        //-------------------------------------------------------------------------------------
        var mkPos = function (token) { return "(" + token.getRow() + "�s��, " + token.getColumn() + "���) >> [ " + token.getWord() + " ]"; };
    
        //------------------------------------------------------------------------ ListAnalyzer
        //  readList            �g�[�N���񂩂�P�P�ʃ��X�g���擾����
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/22
        // Version      1.0.2
        // Autoher      ���ꂨ�� (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        //����  2013/06/17  Version 1.0.0
        //      2013/06/21  Version 1.0.1
        //                  parse�̓����֐�����ListAnalyzer�̓����֐��ɔz�u�ύX
        //      2013/06/22  Version 1.0.2
        //                  �ϐ�����������������₷�����O�ɕύX
        //-------------------------------------------------------------------------------------
        var readList = function (startpos, tokenlist, listdata) {
            var i, token, arr, cr, quote = 0;
            var state = STATE_WAIT_FOR_FRONT;
            for (i = startpos; i < tokenlist.length; i++) {
                token = tokenlist[i];
                switch (state) {
                case STATE_WAIT_FOR_FRONT: //���X�g�̑��v�f
                    if (quote > 0) {
                        if (token.getSpaceCount() > 0) { //QUOTE�����̂��Ƃɋ󔒂����Ă͂Ȃ�Ȃ�
                            //�G���[�͏��0�Ԃ�
                            listdata[LD_LIST_ERROR] = LispDataManager.makeError("���@�G���[�I", "���LQUOTE(')�̌�ɋ󔒂����Ȃ��ł��������I >> " + mkPos(token));
                            return READLIST_ERROR;
                        }
                    }
                    if (token.isOpen()) {
                        //�ŏ��̗v�f�̓��X�g
                        arr = new Array();
                        cr = readList(i + 1, tokenlist, arr);
                        if (cr == READLIST_ERROR) {
                            listdata[LD_LIST_ERROR] = arr[LD_LIST_ERROR];
                            return READLIST_ERROR;
                        } else {
                            listdata[LD_LIST_FRONT] = LispDataManager.wrapQuote(quote, LispDataManager.wrapList(arr));
                            i = cr;
                            quote = 0;
                            state = STATE_WAIT_FOR_DOT;
                        }
                    } else if (token.isQuote()) {
                        //QUOTE���ȗ�����Ă���
                        quote++;
                    } else if (token.isAtom()) {
                        //�ŏ��̗v�f�̓A�g��
                        listdata[LD_LIST_FRONT] = LispDataManager.wrapQuote(quote, LispDataManager.getSymbol(token.getWord().toUpperCase()));
                        quote = 0;
                        state = STATE_WAIT_FOR_DOT;
                    } else if (token.isClose()) { //�󃊃X�g
                        if (quote > 0) {
                            listdata[LD_LIST_FRONT] = LispDataManager.makeError("���@�G���[�I", "���LQUOTE(')�̌�ɕ����ʂ͗���ׂ������ł͂���܂���I >> " + mkPos(token));
                            return READLIST_ERROR;
                        } else {
                            return i;
                        }
                    } else {
                         //�G���[�͏��0�Ԃ�
                        listdata[LD_LIST_ERROR] = LispDataManager.makeError("���@�G���[�I", "���X�g�̐擪�ɂӂ��킵���Ȃ������ł��I >> " + mkPos(token));
                        return READLIST_ERROR;
                    }
                    break;
                    
                case STATE_WAIT_FOR_DOT:
                    if (token.isDot()) { //���X�g�̎��̗v�f��
                        quote = 0;
                        state = STATE_WAIT_FOR_END;
                    } else if (token.isClose()) { // . NIL �̏ȗ� 
                        listdata[LD_LIST_END] = LISPDATA_NIL;
                        return i;
                    } else if ((token.isQuote()) || (token.isOpen()) || (token.isAtom())) { // �ȗ����X�g�̍ŏ��̗v�f
                        arr = new Array();
                        cr = readList(i, tokenlist, arr);
                        if (cr == READLIST_ERROR) {
                            listdata[LD_LIST_ERROR] = arr[LD_LIST_ERROR]; //�G���[�͏��0�Ԃ�
                            return READLIST_ERROR;
                        } else {
                            listdata[LD_LIST_END] = LispDataManager.wrapList(arr);
                            return cr; //�ȗ����X�g�Ȃ̂ŕ����ʂ͕�ς�
                        }
                    }
                    break;
                    
                case STATE_WAIT_FOR_END: //�h�b�g�̎��ɗ���v�f
                    if (quote > 0) {
                        if (token.getSpaceCount() > 0) { //QUOTE�����̂��Ƃɋ󔒂����Ă͂Ȃ�Ȃ�
                            //�G���[�͏��0�Ԃ�
                            listdata[LD_LIST_ERROR] = LispDataManager.makeError("���@�G���[�I", "���LQUOTE(')�̌�ɋ󔒂����Ȃ��ł��������I >> " + mkPos(token));
                            return READLIST_ERROR;
                        }
                    }
                    if (token.isAtom()) { //�A�g��
                        listdata[LD_LIST_END] = LispDataManager.wrapQuote(quote, LispDataManager.getSymbol(token.getWord().toUpperCase()));
                        state = STATE_WAIT_FOR_CLOSE;
                    } else if (token.isOpen()) { //���X�g
                        arr = new Array();
                        cr = readList(i + 1, tokenlist, arr);
                        if (cr == READLIST_ERROR) {
                            listdata[LD_LIST_ERROR] = arr[LD_LIST_ERROR]; //�G���[�͏��0�Ԃ�
                            return READLIST_ERROR;
                        } else {
                            listdata[LD_LIST_END] = LispDataManager.wrapQuote(quote, LispDataManager.wrapList(arr));
                            i = cr;
                            state = STATE_WAIT_FOR_CLOSE;
                        }
                    } else if (token.isQuote()) {
                        quote++;
                    } else { 
                        //�G���[�͏��0�Ԃ�
                        listdata[LD_LIST_ERROR] = LispDataManager.makeError("���@�G���[�I", "CONS���X�g�̃h�b�g(.)�̌�ɂӂ��킵���Ȃ������ł��I >> " + mkPos(token));
                        return READLIST_ERROR;
                    }
                    break;
                    
                case STATE_WAIT_FOR_CLOSE:
                    if (token.isClose()) {
                        return i;
                    } else {
                        listdata[LD_LIST_ERROR] = LispDataManager.makeError("���@�G���[�I", "�����ʂ�����܂���I >> " + mkPos(token));
                        return READLIST_ERROR;
                    }
                    break;
                }
            }
            
            switch (state) {
            case STATE_WAIT_FOR_FRONT:
                listdata[LD_LIST_ERROR] = LispDataManager.makeError("���@�G���[�I", "���X�g�̍ŏ��̗v�f" + (quote == 0 ? "�A�܂��͕�����" : "") + "��������܂���I");
                break;
            case STATE_WAIT_FOR_DOT:
                listdata[LD_LIST_ERROR] = LispDataManager.makeError("���@�G���[�I", "���X�g�̎��̗v�f�A���X�g�̋�؂�̃h�b�g(.)�A�܂��͕����ʂ�������܂���I");
                break;
            case STATE_WAIT_FOR_END:
                listdata[LD_LIST_ERROR] = LispDataManager.makeError("���@�G���[", "���X�g�̎��̗v�f��������܂���I");
                break;
            case STATE_WAIT_FOR_CLOSE:
                listdata[LD_LIST_ERROR] = LispDataManager.makeError("���@�G���[�I", "�����ʂ�������܂���I");
                break;
            }
            return READLIST_ERROR;
        }; //readList�̒�`�����
        
        //------------------------------------------------------------------------ ListAnalyzer
        //  parse           �g�[�N���񂩂�\����͂�����
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/22
        // Version      1.1.1
        // Autoher      ���ꂨ�� (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        //����  2013/06/17  Version 1.0.0
        //      2013/06/21  Version 1.1.0
        //                  �������̓����萔�E�����֐����O�ɏo����
        //      2013/06/22  Version 1.1.1
        //                  �ϐ�����������������₷���ύX
        //-------------------------------------------------------------------------------------
        var parse = function (tokenlist) {
            var i;
            var token;
            var cur = null, arr = null, list = null, tmp = null;
            var cr = 0, cnt = 0, q = 0;
            var topPG = LispDataManager.makeEmptyProgram(cnt++);
            var curPG = topPG;
            
            for (q = 0, i = 0; i < tokenlist.length; i++) {
                token = tokenlist[i];
                if (q > 0) {
                    if (token.getSpaceCount() > 0) { //QUOTE�����̂��Ƃɋ󔒂����Ă͂Ȃ�Ȃ�
                        LispDataManager.setProgram(curPG, LispDataManager.makeError("���@�G���[�I", "���LQUOTE(')�̌�ɋ󔒂����Ȃ��ł��������I >> " + mkPos(token)));
                        return topPG;
                    }
                }
                if (token.isOpen()) {
                    arr = new Array();
                    cr = readList(i + 1, tokenlist, arr);
                    if (cr == READLIST_ERROR) {
                        LispDataManager.setProgram(curPG, arr[LD_LIST_ERROR]);
                        return topPG;
                    } else {
                        LispDataManager.setProgram(curPG, LispDataManager.wrapQuote(q, LispDataManager.wrapList(arr)));
                        LispDataManager.setNextProgram(curPG, LispDataManager.makeEmptyProgram(cnt++));
                        curPG = curPG.getNext();
                        i = cr;
                        q = 0;
                    }
                } else if (token.isAtom()) {
                    LispDataManager.setProgram(curPG, LispDataManager.wrapQuote(q, LispDataManager.getSymbol(token.getWord().toUpperCase())));
                    LispDataManager.setNextProgram(curPG, LispDataManager.makeEmptyProgram(cnt++));
                    curPG = curPG.getNext();
                    q = 0;
                } else if (token.isQuote()) {
                    q++;
                } else {
                    LispDataManager.setProgram(curPG, LispDataManager.makeError("���@�G���[�I", "�V���{�������X�g��ݒu���Ă��������I >> " + mkPos(token)));
                    return topPG;
                }
            }

            if (q > 0) {
                LispDataManager.setProgram(curPG, LispDataManager.makeError("���@�G���[�I", "���LQUOTE(')�ɑ����v�f��������܂���I"));
            }
            
            return topPG;
        }
        
        //------------------------------------------------------------------------ ListAnalyzer
        //  toLispData              �\�[�X����͂�LispData�Q�ɕϊ�����
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/17
        // Version      1.0.0
        // Autoher      ���ꂨ�� (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        this.toLispData = function (src) {
            return parse(tokenize(src, scan(src)));
        };
    }; // ListAnalyzer �̒�`�̂����
    
    
    /////////////////////////////////////////////////////////////////////////////// JunLISP
    //  LISP�̕�����\���ւ̕ϊ�
    ///////////////////////////////////////////////////////////////////////////////////////

    //----------------------------------------------------------------------------- JunLISP
    //  StringConverter         LispData�^�f�[�^�̕�����\���ɕϊ�����
    //-------------------------------------------------------------------------------------
    //  LastUpdate      2013/06/23
    //  Version         1.1.1
    //  Autoher         ���ꂨ�� (takeiteasy_idontthinkso)
    //-------------------------------------------------------------------------------------
    //����  2013/06/17      Version 1.0.0
    //      2013/06/20      Version 1.1.0
    //                      toFormalString��toInformalString�𒆌p���\�b�h�ɂ���
    //      2013/06/23      Version 1.1.1
    //                      ListUtil�N���X���g���������ɏC��
    //-------------------------------------------------------------------------------------
    
    var StringConverter = new function () {
        var ERROR_VALUE = -1;
    
        //--------------------------------------------------------------------- StringConverter
        //  toFormalString          LispData�^�f�[�^�𐳎����X�g�\���̕�����ɓW�J����
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/24
        // Version      1.1.0
        // Autoher      ���ꂨ�� (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        //����  2013/06/17  Version 1.0.0
        //      2013/06/20  Version 1.1.0
        //                  ���p���\�b�h�֕ύX
        //                  �V�������\�b�htoFormal���Ăяo��
        //-------------------------------------------------------------------------------------
        var toFormalString = function (LD) {
            var result = toFormal(LD);
            if (result === ERROR_VALUE) {
                return "# �W�J�G���[�I [toFormalString] >> �f�[�^�\���ɉ��炩�̌�肪����܂��I #";
            } else {
                return result;
            }
        };
        this.toFormalString = toFormalString;
        
        //--------------------------------------------------------------------- StringConverter
        //  toFormal            LispData�^�f�[�^�𐳎����X�g�\���̕�����ɓW�J����
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/23
        // Version      1.1.0
        // Autoher      ���ꂨ�� (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        //����  2013/06/20  Version 1.0.0
        //      2013/06/23  Version 1.1.0
        //                  ListUtil���g���������ɕύX
        //-------------------------------------------------------------------------------------
        var toFormal = function (LD) {
            if ((LD instanceof LispData) === false) {
                return ERROR_VALUE;
            }
            if (LD.isProgram()) {
                return "# �v���O���� #";
                
            } else if (LD.isProgramEnd()) {
                return "# �v���O�����̏I��� #";
                
            } else if (LD.isEmptyList()) {
                return "()";

            } else if (LD.isSymbol()) {
                return LD.getData();

            } else if (LD.isSystemFunction()) {
                if (LD.isSpecialForm()) {
                    return " # ����`�� >> " + LD.getType() + " >> " + LD.getName() + " #";
                } else {
                    return " # �V�X�e���֐� >> " + LD.getType() + " >> " + LD.getName() + " #";
                }

            } else if (LD.isUserFunction()) {
                return "# LAMBDA�֐� >> [����] " + toFormalString(LD.getLambdaArgDef()) 
                        + " >> [�R�[�h] " + toFormalString(LD.getLambdaProgram()) + " #";

            } else if (LD.isError()) {
                return " # " + LD.getName() + " >> " + LD.getData() + " # ";

            } else if (LD.isComment()) {
                return " # �R�����g�s # ";

            } else if (LD.isList()) {
                var strFront, strEnd;
                strFront = toFormal(ListUtil.car(LD));
                strEnd = toFormal(ListUtil.cdr(LD));
                if ((strFront !== ERROR_VALUE) && (strEnd !== ERROR_VALUE)) {
                    return "(" + strFront + " . " + strEnd + ")";
                }
            }
            return ERROR_VALUE;
        };
        
        
        //--------------------------------------------------------------------- StringConverter
        //  Informal�����p�̒萔
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/23
        // Version      1.0.0
        //-------------------------------------------------------------------------------------
        var BRACKET_NEED = 0;
        var BRACKET_NONE = 1;
        var informal_quote = true;
        
        //--------------------------------------------------------------------- StringConverter
        //  setQuoteFormal setQuoteInformal     QUOTE���L�̗L���̐ݒ�
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/23
        // Version      1.0.0
        // Autoher      ���ꂨ�� (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        this.setQuoteInformal = function () { informal_quote = true; }; //QUOTE�𗪂�
        this.setQuoteFormal   = function () { informal_quote = false; }; //QUOTE�𗪂��Ȃ�
        
        //--------------------------------------------------------------------- StringConverter
        //  toInformalString        LispData�^�f�[�^�𗪎����X�g�\���̕�����ɓW�J����
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/20
        // Version      1.1.0
        // Autoher      ���ꂨ�� (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        //����  2013/06/17  Version 1.0.0
        //      2013/06/20  Version 1.1.0
        //                  ���p���\�b�h�֕ύX
        //                  �V�������\�b�htoInformal���Ăяo��
        //-------------------------------------------------------------------------------------
        var toInformalString = function (list) {
            var result = toInformal(list, BRACKET_NEED);
            if (result === ERROR_VALUE) {
                return "# �W�J�G���[�I [toIformalString] >> �f�[�^�\���ɉ��炩�̌�肪����܂��I #";
            } else {
                return result;
            }
        };
        this.toInformalString = toInformalString;

        //--------------------------------------------------------------------- StringConverter
        //  toInformal          LispData�^�f�[�^�𗪎����X�g�\���̕�����ɓW�J����
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/23
        // Version      1.1.0
        // Autoher      ���ꂨ�� (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        //����  2013/06/20  Version 1.0.0
        //      2013/06/23  Version 1.1.0
        //                  ListUtil���g���������ɕύX
        //                  �����ɒ萔�𓱓�
        //-------------------------------------------------------------------------------------
        var toInformal = function (LD, bracket) {
            if ((LD instanceof LispData) === false) {
                return ERROR_VALUE;
            }
            if (LD.isProgram()) {
                return "# �v���O���� #";
                
            } else if (LD.isProgramEnd()) {
                return "# �v���O�����̏I��� #";
                
            } else if (LD.isEmptyList()) {
                return "()";
                
            } else if (LD.isSymbol()) {
                return LD.getData();
                
            } else if (LD.isSystemFunction()) {
                if (LD.isSpecialForm()) {
                    return "# ����`�� >> " + LD.getType() + " >> " + LD.getName() + " #";
                } else {
                    return "# �V�X�e���֐� >> " + LD.getType() + " >> " + LD.getName() + " #";
                }
            } else if (LD.isUserFunction()) {
                return "# LAMBDA�֐� >> [����] " + toInformalString(LD.getLambdaArgDef())
                        + " >> [�R�[�h] " + toInformalString(LD.getLambdaProgram()) + " #";
            
            } else if (LD.isError()) {
                return "# " + LD.getName() + " >> " + LD.getData() + " #";
            
            } else if (LD.isComment()) {
                return "# �R�����g�s #";
            
            } else if (LD.isList()) {
                var frontLD, endLD, strFront, strEnd;
                frontLD = ListUtil.car(LD);
                endLD   = ListUtil.cdr(LD);
                if (informal_quote) {
                    if (frontLD.getData() === SPECIALFORM_QUOTE) { //QUOTE�̗��L
                        if (ListUtil.listLength(endLD) == 1) {
                            return "'" + toInformal(endLD, BRACKET_NONE);
                        }
                    }
                }
                strFront = toInformal(frontLD, BRACKET_NEED);
                if (strFront !== ERROR_VALUE) {
                    if (endLD.isNil()) {
                        //���X�g������NIL�̏ȗ�
                        if (bracket === BRACKET_NONE) {
                            return strFront;
                        } else {
                            return "(" + strFront + ")";
                        }
                    }
                    if (endLD.isSymbol()) {
                        //�h�b�g�K�{
                        strEnd = toInformal(endLD, BRACKET_NEED);
                        if (strEnd !== ERROR_VALUE) {
                            if (bracket === BRACKET_NONE) {
                                return strFront + " . " + strEnd;
                            } else {
                                 return "(" + strFront + " . " + strEnd + ")";
                           }
                        }
                    } else {
                        //�h�b�g�ȗ�
                        strEnd = toInformal(endLD, BRACKET_NONE);
                        if (strEnd !== ERROR_VALUE) {
                            if (bracket === BRACKET_NONE) {
                                return strFront + " " + strEnd;
                            } else {
                                 return "(" + strFront + " " + strEnd + ")";
                           }
                        }
                    }
                }
            }
            return ERROR_VALUE;
        };
    
    }; //StringConverter�̏I���
    
    /////////////////////////////////////////////////////////////////////////////// JunLISP
    //  LISP�ϐ��Ǘ�
    ///////////////////////////////////////////////////////////////////////////////////////

    //----------------------------------------------------------------------------- JunLISP
    //  VariableManager                 �ϐ��}�l�[�W��
    //-------------------------------------------------------------------------------------
    //  LastUpdate      2013/06/20
    //  Version         2.0.0
    //  Autoher         ���ꂨ�� (takeiteasy_idontthinkso)
    //-------------------------------------------------------------------------------------
    //����  2013/06/17      Version 1.0.0
    //      2013/06/20      Version 2.0.0
    //                      �X�R�[�v�̍l�������Ԉ���Ă����ߐÓI�E���I�̂ǂ���ł��Ȃ�����
    //                      ��������P�A���I�E�ÓI��I�ׂ�d�l��
    //                      �܂�����ɍ��킹�ă��\�b�h����啝���C
    //                      �ǉ� �EVariableManager�N���X�̃��\�b�h
    //                              isLexical() isDynamic() setLexical() setDynamic()
    //                              removeAll() release() jumptoScope() returnScope()
    //                              addNewContainer() getContainer() releaseContainer()
    //                              setCurrentVariable() setGlobalVariable()
    //                              updateBindVariable() inNewNest() outNowNest()
    //                           �EVariableContainer�N���X�̃��\�b�h
    //                              NonReference()
    //                      �p�~ �EVariableManager�N���X�̃��\�b�h
    //                              inNewScope() inLambdaScope(), outNowScope()
    //                              outNowLambdaScope() setVariable() setParentVariable()
    //                           �ELambdaVariableContainer�N���X
    //-------------------------------------------------------------------------------------
    
    var VariableManager = new function () {
        
        //--------------------------------------------------------------------- VariableManager
        //  �ϐ��R���e�i��ID
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/20
        // Version      1.0.0
        //-------------------------------------------------------------------------------------
        //���ɐݒ肳���ϐ��R���e�i��ID
        var CurrentVCID  = 0;
        
        
        //--------------------------------------------------------------------- VariableManager
        // nextVCID     �ϐ��R���e�i��ID
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/20
        // Version      1.0.0
        // Autoher      ���ꂨ�� (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        var nextVCID = function () { return CurrentVCID++; };        

        //--------------------------------------------------------------------- VariableManager
        //  VariableContainer          �ϐ��R���e�i
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/20
        // Version      1.1.0
        // Autoher      ���ꂨ�� (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        //����  2013/06/17  Version 1.0.0
        //      2013/06/20  Version 1.1.0
        //                  �Q�ƃJ�E���^��ݒu
        //-------------------------------------------------------------------------------------
        function VariableContainer(parentVC) {
            
            //------------------------------------------------------------------- VariableContainer
            //  private�����o
            //-------------------------------------------------------------------------------------
            // LastUpdate   2013/06/17
            // Version      1.0.0
            //-------------------------------------------------------------------------------------
            //�R���e�iID
            var id = nextVCID();
            
            //�Q�ƃJ�E���^
            var referCount = 0;

            //�ϐ��f�[�^(LispData)���i�[����
            var variables = new Array();
            
            //------------------------------------------------------------------- VariableContainer
            //  increaseReferCount  �Q�ƃJ�E���^���C���N�������g����
            //-------------------------------------------------------------------------------------
            // LastUpdate   2013/06/17
            // Version      1.0.0
            // Autoher      ���ꂨ�� (takeiteasy_idontthinkso)
            //-------------------------------------------------------------------------------------
            this.increaseReferCount = function () {
                referCount++;
                if (parentVC != null) {
                    parentVC.increaseReferCount();
                }
            };
            
            //------------------------------------------------------------------- VariableContainer
            //   NonReference       �Q�Ƃ����邩�ǂ������m�F����
            //-------------------------------------------------------------------------------------
            // LastUpdate   2013/06/17
            // Version      1.0.0
            // Autoher      ���ꂨ�� (takeiteasy_idontthinkso)
            //-------------------------------------------------------------------------------------
            var NonReference = function () { return (referCount == 0); };
            this.NonReference = NonReference;

            //------------------------------------------------------------------- VariableContainer
            //  �Q�b�^�[
            //-------------------------------------------------------------------------------------
            // LastUpdate   2013/06/17
            // Version      1.0.0
            // Autoher      ���ꂨ�� (takeiteasy_idontthinkso)
            //-------------------------------------------------------------------------------------
            
            //�Q�ƃJ�E���g�̎擾
            this.getReferCount = function () { return referCount; };
    
            //�R���e�iID�̎擾
            this.getID = function () { return id; };
            
            //�e�R���e�i���擾����
            this.getParent = function () { return parentVC; };
            
            //------------------------------------------------------------------- VariableContainer
            //  getVariable     �ϐ����擾����
            //-------------------------------------------------------------------------------------
            // LastUpdate   2013/06/17
            // Version      1.0.0
            // Autoher      ���ꂨ�� (takeiteasy_idontthinkso)
            //-------------------------------------------------------------------------------------
            this.getVariable = function (key) {
                return variables[key].getData();
            }
            
            //------------------------------------------------------------------- VariableContainer
            //  setVariable     �ϐ���ݒ肷��
            //-------------------------------------------------------------------------------------
            // LastUpdate   2013/06/17
            // Version      1.0.0
            // Autoher      ���ꂨ�� (takeiteasy_idontthinkso)
            //-------------------------------------------------------------------------------------
            this.setVariable = function (key, data) {
                if (variables[key]) {
                    variables[key].gc();
                    variables[key] = null;
                }
                variables[key] = new LispData(key, data, DATATYPE_VARIABLE);
                return variables[key];
            };
            
            //------------------------------------------------------------------- VariableContainer
            //  getVariableContainer        key�ɑΉ�����ϐ���ێ�����ϐ��R���e�i���擾
            //-------------------------------------------------------------------------------------
            //  �e�R���e�i��H���ĒT���Ă���
            //-------------------------------------------------------------------------------------
            // LastUpdate   2013/06/17
            // Version      1.0.0
            // Autoher      ���ꂨ�� (takeiteasy_idontthinkso)
            //-------------------------------------------------------------------------------------
            this.getVariableContainer = function (key) {
                if (variables[key]) {
                    return this;
                } else {
                    if (parentVC != null) {
                        return parentVC.getVariableContainer(key);
                    } else {
                        return null;
                    }
                }
            };
            
            //------------------------------------------------------------------- VariableContainer
            //  release     �ϐ��̉��
            //-------------------------------------------------------------------------------------
            // LastUpdate   2013/06/17
            // Version      1.0.0
            // Autoher      ���ꂨ�� (takeiteasy_idontthinkso)
            //-------------------------------------------------------------------------------------
            //����  2013/06/17  Version 1.0.0
            //      2013/06/24  �`�`�` �V��`�� JunLISP �`�`�`
            //      2013/06/27  Version 1.1.0
            //                  �ÓI�X�R�[�v�̂���Ȃ銨�Ⴂ���C��
            //-------------------------------------------------------------------------------------
            this.release = function () {
                if (NonReference() == false) { //�Q�Ƃ�����ꍇ�͎��s
                    return false;
                }
                for (i in variables) {
                    variables[i].gc();
                    variables[i] = null;
                }
                variables = new Array();
                return true;
            };

            //------------------------------------------------------------------- VariableContainer
            //  gc          �K�x�[�W�R���N�g
            //-------------------------------------------------------------------------------------
            // LastUpdate   2013/06/17
            // Version      1.0.0
            // Autoher      ���ꂨ�� (takeiteasy_idontthinkso)
            //-------------------------------------------------------------------------------------
            this.gc = function () {  //�ė��p���S�s��
                var i;
                for (i in variables) {
                    variables[i].gc();
                    variables[i] = null;
                }
                referCount = 0;
                variables = null;
                parentVC = null;
            };

        }; // VariableContainer �̒�`�̂����

        /////////////////////////////////////////////////////////////////////// VariableManager
        //  �ϐ��R���e�i�̊Ǘ�
        ///////////////////////////////////////////////////////////////////////////////////////

        //--------------------------------------------------------------------- VariableManager
        //  �ϐ��R���e�i���X�g�i�ߔ��X�R�[�v�Q�ƁA�����gc�p�j
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/20
        // Version      1.0.0
        //-------------------------------------------------------------------------------------
        var Containers = new Array();
        
        //--------------------------------------------------------------------- VariableManager
        //  addNewContainer         �V�����ϐ��R���e�i���擾����
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/20
        // Version      1.0.0
        // Autoher      ���ꂨ�� (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        var addNewContainer = function (parentVC) {
            var VC = new VariableContainer(parentVC);
            Containers[VC.getID()] = VC;
            return VC;
        };
        
        //--------------------------------------------------------------------- VariableManager
        //  getContainer            �w��ID�̕ϐ��R���e�i���擾����
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/20
        // Version      1.0.0
        // Autoher      ���ꂨ�� (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        var getContainer = function (id) {
            if (Containers[id]) {
                return Containers[id];
            } else {
                return null;
            }
        };
        
        //--------------------------------------------------------------------- VariableManager
        //  releaseContainer        �ϐ��R���e�i�̉��
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/20
        // Version      1.0.0
        // Autoher      ���ꂨ�� (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        var releaseContainer = function (VC) {
            if (VC.NonReference()) {
                Containers[VC.getID()] = null;
            }
        };
        
        //--------------------------------------------------------------------- VariableManager
        //  removeAll               �S�Ă̕ϐ����폜����i�g�p�͗v���Ӂj
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/20
        // Version      1.0.0
        // Autoher      ���ꂨ�� (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        var removeAll = function () {
            for (i = 0; i < Containers.length; i++) {
                if (Containers[i] != null) {
                    Containers[i].gc();
                    Containers[i] = null;
                }
            }
            ContainerStack.clear();
            Containers = new Array();
            ContainerStack = new StackArray();
            CurrentVCID = 0;
            GlobalVariableContainer = addNewContainer(null);
            setScopeGlobal();
        };
        this.removeAll = removeAll;

        
        /////////////////////////////////////////////////////////////////////// VariableManager
        //  �ϐ��̃X�R�[�v�̊Ǘ�
        ///////////////////////////////////////////////////////////////////////////////////////

        //--------------------------------------------------------------------- VariableManager
        //  �X�R�[�v�萔
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/20
        // Version      1.0.0
        //-------------------------------------------------------------------------------------
        var SCOPE_LEXICAL = 0;
        var SCOPE_DYNAMIC = 1;
        
        //--------------------------------------------------------------------- VariableManager
        //  ���������o
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/20
        // Version      1.0.0
        //-------------------------------------------------------------------------------------
        
        //���݂̃X�R�[�v
        var scope = SCOPE_DYNAMIC;
        
        //�O���[�o���X�R�[�v�̕ϐ��R���e�i
        var GlobalVariableContainer = addNewContainer(null);
        
        //���݂̃X�R�[�v�̕ϐ��R���e�i
        var CurrentVariableContainer = GlobalVariableContainer;
        
        //�ÓI�X�R�[�v����Lambda�֐��ȂǕʃX�R�[�v�ړ��p
        var ContainerStack = new StackArray();


        //--------------------------------------------------------------------- VariableManager
        //  �X�R�[�v�̊Ǘ����\�b�h
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/20
        // Version      1.0.0
        // Autoher      ���ꂨ�� (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------

        this.isLexical = function () { return (scope == SCOPE_LEXICAL); };
        this.isDynamic = function () { return (scope == SCOPE_DYNAMIC); };
        this.setLexical = function () { scope = SCOPE_LEXICAL; };
        this.setDynamic = function () { scope = SCOPE_DYNAMIC; };
        
        //--------------------------------------------------------------------- VariableManager
        //  getCurrentVariableContainerID       ���݂̃R���e�i��ID�擾
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/20
        // Version      1.0.0
        // Autoher      ���ꂨ�� (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        this.getCurrentVariableContainerID = function () {
            CurrentVariableContainer.increaseReferCount();
            return CurrentVariableContainer.getID();
        };
        
        
        //--------------------------------------------------------------------- VariableManager
        //  getVariable             �ϐ��̎擾
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/20
        // Version      1.0.0
        // Autoher      ���ꂨ�� (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        this.getVariable = function (key) {
            var tempVC;
            tempVC = CurrentVariableContainer.getVariableContainer(key);
            if (tempVC != null) {
                return tempVC.getVariable(key);
            } else {
                return null;
            }
        };
        
        //--------------------------------------------------------------------- VariableManager
        //  setCurrentVariable          ���݂̃X�R�[�v�ւ̕ϐ��̐ݒ�
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/20
        // Version      1.0.0
        // Autoher      ���ꂨ�� (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        var setCurrentVariable = function (key, data) {
            CurrentVariableContainer.setVariable(key, data);
        };
        this.setCurrentVariable = setCurrentVariable;
        
        //--------------------------------------------------------------------- VariableManager
        //  updateBindVariable          key���o�C���h����Ă�Ŋ�̃X�R�[�v�ɏ㏑��
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/20
        // Version      1.0.0
        // Autoher      ���ꂨ�� (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        var NO_SET = this.NO_SET = 0;
        var SET_GLOBAL = this.SET_GLOBAL = 1;
        var SET_CURRENT = this.SET_CURRENT = 2;
        
        this.updateBindVariable = function (key, data, ifNoBind) {
            var tempVC = CurrentVariableContainer.getVariableContainer(key);
            if (tempVC != null) {
                tempVC.setVariable(key, data);
                return true;
            } else {
                switch (ifNoBind) {
                case NO_SET:
                    return false;
                case SET_GLOBAL:
                    setGlobalVariable(key, data);
                    return true;
                case SET_CURRENT:
                    setCurrentVariable(key, data);
                    return true;
                }
                return false;
            }
        };
        
        //--------------------------------------------------------------------- VariableManager
        //  setGlobalVariable           �O���[�o���X�R�[�v�ւ̕ϐ��̐ݒ�
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/20
        // Version      1.0.0
        // Autoher      ���ꂨ�� (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        var setGlobalVariable = function (key, data) {
            GlobalVariableContainer.setVariable(key, data);
        };
        this.setGlobalVariable = setGlobalVariable;
    
        //--------------------------------------------------------------------- VariableManager
        //  setScopeGlobal              ���݂̃X�R�[�v�������I�ɃO���[�o���X�R�[�v�ɖ߂�
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/20
        // Version      1.0.0
        // Autoher      ���ꂨ�� (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        var setScopeGlobal = function () {
            CurrentVariableContainer = GlobalVariableContainer;
        };
        this.setScopeGlobal = setScopeGlobal;
    
        //--------------------------------------------------------------------- VariableManager
        //  intoNewNest                 �V�����X�R�[�v�̃l�X�g�ɓ���
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/20
        // Version      1.0.0
        // Autoher      ���ꂨ�� (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        var intoNewNest = function () {
            CurrentVariableContainer = addNewContainer(CurrentVariableContainer);
        };
        this.intoNewNest = intoNewNest;
    
        //--------------------------------------------------------------------- VariableManager
        //  outNowNest                 ���݂̃l�X�g�̃X�R�[�v���������
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/20
        // Version      1.0.0
        // Autoher      ���ꂨ�� (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        this.outNowNest = function () {
            var tempVC = CurrentVariableContainer;
            CurrentVariableContainer = tempVC.getParent();
            if (CurrentVariableContainer != null) {
                tempVC.release();
                if (tempVC.getReferCount() == 0) {
                    Containers[tempVC.getID()] = null;
                }
            } else {
                setScopeGlobal();
                return false; //�e�X�R�[�v�������̂ɃX�R�[�v���甲����ُ͈̂폈��
            }
            return true;
        };
        
        //--------------------------------------------------------------------- VariableManager
        //  jumptoScope                 �ÓI�X�R�[�v���Ȃ�J�����g�X�R�[�v��ߔ��X�R�[�v�ֈړ�
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/20
        // Version      1.0.0
        // Autoher      ���ꂨ�� (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        this.jumptoScope = function (closedVCID) {
            if (scope === SCOPE_LEXICAL) {
                if (Containers[closedVCID]) {
                    ContainerStack.push(CurrentVariableContainer);
                    CurrentVariableContainer = Containers[closedVCID];
                    return true;
                } else {
                    return false;
                }
            } else {
                return true; //���I�X�R�[�v�Ȃ珈���Ȃ�
            }
        };
        
        //--------------------------------------------------------------------- VariableManager
        //  returnScope                 �ÓI�X�R�[�v���Ȃ�ߔ��X�R�[�v���猳�̃X�R�[�v�֖߂�
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/20
        // Version      1.0.0
        // Autoher      ���ꂨ�� (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        this.returnScope = function () {
            if (scope === SCOPE_LEXICAL) {
                if (ContainerStack.size() > 0) {
                    //�X�^�b�N�ɑޔ����Ă����X�R�[�v��߂�
                    CurrentVariableContainer = ContainerStack.pop();
                } else {
                    //�{���ُ폈�������A�O�̂��߃O���[�o���X�R�[�v�ɖ߂�
                    setScopeGlobal();
                    return false; //�ȏ㏈���Ȃ̂�false
                }
            } //���I�X�R�[�v�Ȃ珈���Ȃ�
            return true;
        };
    
    };//VariableManager�̒�`�����
    
    /////////////////////////////////////////////////////////////////////////////// JunLISP
    //  LISP�̎��s
    ///////////////////////////////////////////////////////////////////////////////////////

    //----------------------------------------------------------------------------- JunLISP
    //  ListProcessor           LISP�����s����
    //-------------------------------------------------------------------------------------
    //  LastUpdate      2013/06/26
    //  Version         2.1.0
    //  Autoher         ���ꂨ�� (takeiteasy_idontthinkso)
    //-------------------------------------------------------------------------------------
    //����  2013/06/17      Version 1.0.0
    //      2013/06/20      Version 1.1.0
    //                      �X�R�[�v�̍l�������Ԉ���Ă������߂���ɍ��킹�ďC��
    //                      �E�X�R�[�v�̓����LAMBDA�֐����s�������ɐݒ�
    //                      �ELABEL�̕ϐ��ݒ�ӏ����J�����g�X�R�[�v�Œ��
    //      2013/06/21      Version 1.1.1
    //                      �R�[�h�����������`
    //                      �G���[���b�Z�[�W�̓��{�ꉻ
    //      2013/06/23      Version 1.2.0
    //                      ListUtil�N���X���g���������ɏC��
    //                      ���̑��R�[�h���`
    //      2013/06/24      Version 1.2.1
    //                      ����̍�Ƃ̑���
    //      2013/06/24      �`�`�` �V��`�� JunLISP �`�`�`
    //                      Version 2.0.0
    //                      �V��`�̓���ɐݒ�ύX
    //      2013/06/26      Version 2.1.0
    //                      Lambda�֐��̈����̎d�l��ύX����(Scheme���C�N��)
    //-------------------------------------------------------------------------------------
    
    var ListProcessor = new function () {
    
        //----------------------------------------------------------------------- ListProcessor
        //  executeLisp         LispData�Q�����s����
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/24
        // Version      2.0.0
        // Autoher      ���ꂨ�� (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        //����  2013/06/17  Version 1.0.0
        //      2013/06/20  Version 1.1.0
        //                  �X�R�[�v�̊��Ⴂ�̏C���̂���
        //                  �X�R�[�v�ω��̃��\�b�h���폜
        //      2013/06/23  Version 1.2.0
        //                  ListUtil���g�����R�[�h�ɕύX
        //                  �ϐ����̕ύX��
        //      2013/06/24  �`�`�` �V��`�� JunLISP �`�`�`
        //                  Version 2.0.0
        //                  �֐������`���̏�����V��`�ɏ]���đ啝�ύX
        //-------------------------------------------------------------------------------------
        var executeLisp = function (listLD) {
            if (listLD instanceof LispData) {
                if (listLD.isSymbol()) {
                    var name = listLD.getData();
                    if (listLD.isNil() || (name == SYMBOL_T)) {
                        return listLD;
                    } else if (SpecialForms[name]) { //����`��
                        return listLD;
                    } else if (FixedFunctions[name]) { //�ŗL�֐�(�V�X�e���֐�)
                        return listLD;
                    }
                    var value = VariableManager.getVariable(name);
                    if (value !== null) {
                        return value;
                    }
                    //�V���{�����琔�l��ϐ���֐����Ȃǂɕϊ�����A�Ή�������̂�������΃G���[
                    return LispDataManager.makeError("�ϐ��擾�G���[�I", "���̃V���{���ɂ͒l���ݒ肳��Ă��܂���I >> " + name);
                
                } else if (ListUtil.listLength(listLD) > 0) {
                    var cmdLD = executeLisp(ListUtil.car(listLD));
                    
                    if (cmdLD.isSymbol()) {
                        var func, name = cmdLD.getData();
                        if (SpecialForms[name]) { //����`��
                            func = SpecialForms[name].getData();
                            return func(cmdLD, ListUtil.cdr(listLD));
                        } else if (FixedFunctions[name]) { //�ŗL�֐�(�V�X�e���֐�)
                            func = FixedFunctions[name].getData();
                            return func(cmdLD, ListUtil.cdr(listLD));
                        }
                    } else if (ListUtil.listLength(cmdLD) == 3) { //LAMBDA�֐�
                        var symbolLD = ListUtil.car(cmdLD);
                        if (symbolLD.isSymbol() && (symbolLD.getData() == SPECIALFORM_LAMBDA)) {
                            return doLambdaFunction(cmdLD, ListUtil.cdr(listLD));
                        }
                    } else if (cmdLD.isError()) {
                        return cmdLD;
                    }
                        return LispDataManager.makeError("�Ăяo���G���[�I", 
                            "�Ăяo���\�Ȓl�����X�g�̐擪�ɂ���܂���I >> " + StringConverter.toInformalString(cmdLD));
                
                } else if (listLD.isError()) {
                    return listLD;
                } else {
                    return LispDataManager.makeError("���s�G���[�I", "�T�|�[�g���ĂȂ��f�[�^�ł��I >> " + listLD.getType());
                }
            } else {
                return  LispDataManager.makeError("���s�G���[�I", "�s���̃f�[�^���n����܂����I ");
            }
      };
        this.executeLisp = executeLisp;
        
        ///////////////////////////////////////////////////////////////////////// ListProcessor
        //  �������[�e�B���e�B�֐�
        ///////////////////////////////////////////////////////////////////////////////////////
        
        //----------------------------------------------------------------------- ListProcessor
        //  getArgs             �W���֐��E����`���̎��������擾����
        //-------------------------------------------------------------------------------------
        //����
        //  list    LispData                �������̃��X�g
        //  n       Integer                 �擾�������������̐�
        //  args    Array                   �]����̎�����(LispData)���i�[�����
        //����
        //  argc�Ɋi�[�����������̏��Ԃ͋t���ɂȂ�
        //  �� �������� 3�̂Ƃ��͈ȉ��̂悤�Ɋi�[�����
        //     1�Ԗڂ̎�������argc[2], 2�Ԗڂ̎�������args[1], 3�Ԗڂ̎�������argc[0]
        //     (F 'A 'B 'C) => A -> argc[2], B -> argc[1], C -> argc[0] 
        //�߂�l
        //  Boolean         �������̎擾�ɐ��������� true �A���s������ false
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/17
        // Version      1.0.0
        // Autoher      ���ꂨ�� (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        var getArgs = function (listLD, n, args) {
            if (listLD.isList()) {
                args[n - 1] = executeLisp(listLD.getListFront());
                if (n == 1) {
                    if (listLD.getListEnd().isNil()) {
                        return true;
                    }
                } else {
                    return getArgs(listLD.getListEnd(), n - 1, args);
                }
            }
            return false;
        };
        
        //----------------------------------------------------------------------- ListProcessor
        //  makeArgList         �W���֐��E����`���̎����������X�g(LispData)�ɂ��Ď擾����
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/24
        // Version      1.0.0
        // Autoher      ���ꂨ�� (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        var makeArgList = function (listLD) {
            if (listLD.isList()) {
                var frontLD = executeLisp(ListUtil.car(listLD));
                if (frontLD.isError()) {
                    return frontLD;
                }
                var endLD = makeArgList(ListUtil.cdr(listLD));
                if (endLD.isError()) {
                    return endLD;
                }
                return ListUtil.cons(frontLD, endLD);
            } else if (listLD.isNil()) {
                return listLD;
            } else if (listLD.isError()) {
                return listLD;
            } else {
                return LispDataManager.makeError("�����G���[�I","���������X�g�œn����Ă��܂���I")
            }
        };

        //----------------------------------------------------------------------- ListProcessor
        //  getLambdaArgs       LAMBDA���֐��̎��������擾����
        //-------------------------------------------------------------------------------------
        //����
        //  list    LispData                �������̃��X�g
        //�߂�l
        //  LispData        �]����̎������̃��X�g
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/24
        // Version      1.1.0
        // Autoher      ���ꂨ�� (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        //����  2013/06/17  Version 1.0.0
        //      2013/06/24  Version 1.1.0
        //                  ListUtil���g���������ɕύX
        //-------------------------------------------------------------------------------------
        var getLambdaArgs = function (listLD) {
            if (ListUtil.listLength(listLD) > 0) {
                var argLD = executeLisp(ListUtil.car(listLD));
                var arglistLD = getLambdaArgs(ListUtil.cdr(listLD));
                return ListUtil.cons(argLD, arglistLD);
            } else if (listLD.isNil()) {
                return listLD;
            }
            return LispDataManager.makeError("�����G���[�I [LAMBDA]", "�����̎w�肪���������ł��I >> " + StringConverter.toInformalString(listLD));
        };
        
        //----------------------------------------------------------------------- ListProcessor
        //  setLambdaArgs       LAMBDA���֐��̎��������������ɐݒ肷��
        //-------------------------------------------------------------------------------------
        //����
        //  list        LispData        �������̃��X�g
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/24
        // Version      1.1.0
        // Autoher      ���ꂨ�� (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        //����  2013/06/17  Version 1.0.0
        //      2013/06/24  Version 1.1.0
        //                  ListUtil���g���������ɕύX
        //-------------------------------------------------------------------------------------
        var setLambdaArgs = function (argdefLD, argsLD) {
            if ((argdefLD.isList()) && (argsLD.isList())) {
                var symbolLD = ListUtil.car(argdefLD);
                if (symbolLD.isSymbol()) {
                    VariableManager.setCurrentVariable(symbolLD.getData(),  ListUtil.car(argsLD));
                    return setLambdaArgs(ListUtil.cdr(argdefLD), ListUtil.cdr(argsLD));
                }
            } else if (argdefLD.isNil()) {
                if (argsLD.isNil()) {
                    return true;
                }
            } else if (argdefLD.isSymbol()) {
                VariableManager.setCurrentVariable(argdefLD.getData(), argsLD);
                return true;
            }
            return false;
        };
        
        
        ///////////////////////////////////////////////////////////////////////// ListProcessor
        //  LAMBDA���֐��̎��s
        ///////////////////////////////////////////////////////////////////////////////////////
        
        //----------------------------------------------------------------------- ListProcessor
        //  doLambdaFunction            LAMBDA���֐������s����
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/24
        // Version      2.0.0
        // Autoher      ���ꂨ�� (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        //����  2013/06/17  Version 1.0.0
        //      2013/06/24  Version 1.1.0
        //                  ListUtil���g���������ɕύX
        //      2013/06/24  �`�`�` �V��`�� JunLISP �`�`�`
        //                  Version 2.0.0
        //                  �V��`�ɍ��킹�ď�����ύX
        //-------------------------------------------------------------------------------------
        var doLambdaFunction = function (cmdLD, listLD) {
            var argsLD = getLambdaArgs(listLD);
            if (argsLD.isError()) {
                return argsLD;
            }
            var argdefLD = ListUtil.cadr(cmdLD);
            if (argdefLD.isNil() || checkLambdaArgDef(argdefLD)) {
                VariableManager.intoNewNest();
                if (setLambdaArgs(ListUtil.cadr(cmdLD), argsLD)) {
                    var resultLD = executeLisp(ListUtil.caddr(cmdLD));
                    VariableManager.outNowNest();
                    return resultLD;
                } else {
                    VariableManager.outNowNest();
                    return LispDataManager.makeError("�����G���[�I [" + SPECIALFORM_LAMBDA + "]", 
                        "�����̎w�肪���������ł��I >> "
                         + StringConverter.toInformalString(cmdLD.getLambdaArgDef()) + " <= " + StringConverter.toInformalString(listLD));
                }
            }
            return LispDataManager.makeError("�֐���`�G���[�I [" + SPECIALFORM_LAMBDA + "]", 
                "�������X�g(�����_���X�g)�̎w�肪���������ł��I >> " + StringConverter.toInformalString(argdefLD));
        };
        
        
        ///////////////////////////////////////////////////////////////////////// ListProcessor
        //  ����`��(Special Form)�̒�`
        ///////////////////////////////////////////////////////////////////////////////////////
        //�o�^���[��
        //  SpecialForms["����`����"] = new LispData("����`����", �����֐��ւ̎Q��, DATATYPE_SPECIALFORM);
        //  �����֐��̈����͂Q��
        //      ������ cmd        �֐����Ăяo�����֐��^LispData������(�ʏ�͒�`���g��LispData)
        ///     ������ list       ���]���̈����̃��X�g(LispData)������(������NIL�t��)
        ///////////////////////////////////////////////////////////////////////////////////////

        //----------------------------------------------------------------------- ListProcessor
        //  ����`���p�̃f�[�^(LispData)���i�[����
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/17
        // Version      1.0.0
        //-------------------------------------------------------------------------------------
        var SpecialForms = new Array();
        
        //----------------------------------------------------------------------- ListProcessor
        // QUOTE ����`��(Special Form)
        //-------------------------------------------------------------------------------------
        // ����
        //  (QUOTE OBJECT)
        // �߂�l
        //  OBJECT
        // ��
        //  (QUOTE A)                -> A
        //  (QUOTE (A . B))          -> (A . B)
        //  (QUOTE (A B))            -> (A B)
        //  (QUOTE (CONS A B))       -> (CONS A B)
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/23
        // Version      1.1.0
        // Autoher      ���ꂨ�� (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        //����  2013/06/17  Version 1.0.0
        //      2013/06/23  Version 1.1.0
        //                  ListUtil���g���������ɕύX
        //-------------------------------------------------------------------------------------
        SpecialForms[SPECIALFORM_QUOTE] = new LispData(SPECIALFORM_QUOTE, function (cmdLD, listLD) {
                if (ListUtil.listLength(listLD) == 1) {
                    var argLD = ListUtil.car(listLD);
                    if (argLD.isList() || argLD.isSymbol()) {
                        return argLD;
                    } else {
                        return LispDataManager.makeError("�����G���[�I[" + cmdLD.getName() + "]", 
                            "�����ɃV���{���ł����X�g�ł��Ȃ��l���n����܂����I >> " + StringConverter.toInformalString(argLD));
                    }
                }
                return LispDataManager.makeError("�����G���[�I[" + cmdLD.getName() + "]",
                     "�����̐��������܂���I >> " + StringConverter.toInformalString(listLD));
            }, DATATYPE_SPECIALFORM);
        
        //----------------------------------------------------------------------- ListProcessor
        // COND ����`��(Special Form)
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
        // LastUpdate   2013/06/23
        // Version      1.1.0
        // Autoher      ���ꂨ�� (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        //����  2013/06/17  Version 1.0.0
        //      2013/06/23  Version 1.1.0
        //                  ListUtil���g���������ɕύX
        //-------------------------------------------------------------------------------------
        SpecialForms[SPECIALFORM_COND] = new LispData(SPECIALFORM_COND, function (cmdLD, listLD) {
                if (ListUtil.listLength(listLD) > 0) {
                    //��ɑ�����������
                    var targetLD = ListUtil.car(listLD);
                    if (ListUtil.listLength(targetLD) == 2) {
                        //���X�g�̐擪�̃e�X�g
                        var testLD = executeLisp(ListUtil.car(targetLD));
                        if (testLD.isError()) {
                            return testLD;
                        } else if (testLD.isNil()) {
                            //���̃��X�g��
                            var func = SpecialForms[SPECIALFORM_COND].getData();
                            return func(cmdLD, ListUtil.cdr(listLD));
                        } else {
                            //�΂̒l��Ԃ�
                            return executeLisp(ListUtil.cadr(targetLD));
                        }
                    }
                    return LispDataManager.makeError("�����G���[�I[" + cmdLD.getName() + "]",
                        "�����̎w�肪���������ł��I >> " + StringConverter.toInformalString(targetLD));
                }
                return LispDataManager.makeError("�����G���[�I[" + cmdLD.getName() + "]", 
                    "�����̎w�肪���������ł��I >> " + StringConverter.toInformalString(listLD));
            }, DATATYPE_SPECIALFORM);
        
        //----------------------------------------------------------------------- ListProcessor
        // DEFINE ����`��(Special Form)
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/24
        // Version      1.2.0
        // Autoher      ���ꂨ�� (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        //����  2013/06/17  Version 1.0.0
        //      2013/06/22  Version 1.1.0
        //                  �߂�l��ϐ�������ݒ�l�ɕύX
        //      2013/06/24  Version 1.2.0
        //                  ListUtil���g���������ɕύX
        //-------------------------------------------------------------------------------------
        SpecialForms[SPECIALFORM_DEFINE] = new LispData(SPECIALFORM_DEFINE, function (cmdLD, listLD) {
                if (ListUtil.listLength(listLD) == 2) {
                    var symbolLD = ListUtil.car(listLD);
                    if (symbolLD.isSymbol()) {
                        var name = symbolLD.getData();
                        if ((name == SYMBOL_T) || (name == SYMBOL_NIL) || (FixedFunctions[name]) || (SpecialForms[name])) {
                            return LispDataManager.makeError("�ϐ���`�G���[�I [" + cmdLD.getName() +"]", "�\��L�[���[�h�͎w��ł��܂���I >> " + name);
                        }
                        var valueLD = executeLisp(ListUtil.cadr(listLD));
                        if (valueLD.isError()) {
                            return valueLD;
                        }
                        VariableManager.setCurrentVariable(name, valueLD);
                        return valueLD;
                    } else {
                        return LispDataManager.makeError("�ϐ���`�G���[�I[" + cmdLD.getName() + "]", 
                            "�ϐ����ɃV���{�����w�肳��Ă��܂���I >> " + StringConverter.toInformalString(symbolLD));
                    }
                }
                return LispDataManager.makeError("�����G���[�I[" + cmdLD.getName() + "]", "�����̎w�肪���������ł��I >> " + StringConverter.toInformalString(listLD));
            }, DATATYPE_SPECIALFORM);
        
        //----------------------------------------------------------------------- ListProcessor
        // LABEL ����`��(Special Form)
        //-------------------------------------------------------------------------------------
        // ����`��DEFINE�Ɠ�������
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/17
        // Version      1.0.0
        // Autoher      ���ꂨ�� (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        SpecialForms[SPECIALFORM_LABEL] = new LispData(SPECIALFORM_LABEL, SpecialForms[SPECIALFORM_DEFINE].getData(), DATATYPE_SPECIALFORM);
        
        
        //----------------------------------------------------------------------- ListProcessor
        // checkLambdaArgDef    �����_���X�g�̃`�F�b�N
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/26
        // Version      1.2.0
        // Autoher      ���ꂨ�� (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        //����  2013/06/17  Version 1.0.0
        //      2013/06/24  Version 1.1.0
        //                  ListUtil���g���������ɕύX
        //      2013/06/24  �`�`�` �V��`�� JunLISP �`�`�`
        //      2013/06/26  Version 1.2.0
        //                  Lambda�̈������X�g�̎�����Scheme���C�N�ɕύX
        //                      �ύX�O  (LAMBDA (X Y Z) �`)    �����X�g
        //                              (LAMBDA (X Y . Z) �`)  �h�b�g���X�g (Z�͈������X�g�̎c���S�Ď�荞��)
        //                      �ύX��  (LAMBDA (X Y Z) �`)    �����X�g
        //                              (LAMBDA (X Y . Z) �`)  �h�b�g���X�g
        //                              (LAMBDA X �`)          �V���{�� (�ǉ��@�\�FX�͈������X�g�S�Ă���荞��)
        //-------------------------------------------------------------------------------------
        var checkLambdaArgDef = function (argdefLD) {
            if (argdefLD.isSymbol()) {
                var name = argdefLD.getData();
                if (SpecialForms[name]) {
                    return false;
                }
                if (FixedFunctions[name]) {
                    return false;
                }
                if (name == SYMBOL_T) {
                    return false;
                }
                return true;
            } else if (argdefLD.isList()) {
                var frontLD, name, keys = new Array();
                var endLD = argdefLD;
                do {
                    frontLD = ListUtil.car(endLD);
                    if (frontLD.isSymbol()) {
                        name = frontLD.getData();
                        if (keys[name]) {
                            return false;
                        }
                        if (SpecialForms[name]) {
                            return false;
                        }
                        if (FixedFunctions[name]) {
                            return false;
                        }
                        if ((name == SYMBOL_T) || (name == SYMBOL_NIL)) {
                            return false;
                        }
                        keys[name] = true;
                        endLD = ListUtil.cdr(endLD);
                        if (endLD.isSymbol()) {
                            return true;
                        }
                    } else {
                        return false;
                    }
                } while (endLD.isList());
            }
            return false;
        };

        //----------------------------------------------------------------------- ListProcessor
        // LAMBDA ����`��(Special Form)
        //-------------------------------------------------------------------------------------
        //  (LAMBDA (V-1 V-2 �` V-N) FORM)
        //  (LAMBDA (VAR*) FORM)
        // ��
        //  (LAMBDA (X Y Z) (CONS X (CONS Y Z)))
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/26
        // Version      1.2.0
        // Autoher      ���ꂨ�� (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        //����  2013/06/17  Version 1.0.0
        //      2013/06/24  Version 1.1.0
        //                  ListUtil���g���������ɕύX
        //      2013/06/24  �`�`�` �V��`�� JunLISP �`�`�`
        //      2013/06/26  Version 1.2.0
        //                  �����_���X�g��Scheme���C�N�ւ̕ύX�ɂ�����
        //                  �����_���X�g�̃`�F�b�N��S��checkLambdaArgDef�Ɉϑ�����悤�ύX
        //-------------------------------------------------------------------------------------
        SpecialForms[SPECIALFORM_LAMBDA] = new LispData(SPECIALFORM_LAMBDA, function (cmdLD, listLD) {
                if (ListUtil.listLength(listLD) == 2) {
                    var argdefLD = ListUtil.car(listLD);
                    var codeLD   = ListUtil.cadr(listLD);
                    if (codeLD.isSymbol() || (ListUtil.listLength(codeLD) > 0)) {
                        if (argdefLD.isNil() || (checkLambdaArgDef(argdefLD))) {
                            return ListUtil.cons(cmdLD, listLD);
                        } else {
                            return LispDataManager.makeError("�֐���`�G���[�I [" + cmdLD.getName() + "]", 
                                "�������X�g(�����_���X�g)�̎w�肪���������ł��I >> " + StringConverter.toInformalString(argdefLD));
                        }
                    }
                }
                return LispDataManager.makeError("�����G���[�I [" + cmdLD.getName() + "]", "�����̎w�肪���������ł��I >> " + StringConverter.toInformalString(listLD));
            }, DATATYPE_SPECIALFORM);
            
        
        ///////////////////////////////////////////////////////////////////////// ListProcessor
        //  �ŗL�֐�(�V�X�e���֐�) ��`
        ///////////////////////////////////////////////////////////////////////////////////////
        //�o�^���[��
        //  FixedFunctions["�֐���"] = new LispData("�֐���", �����֐��ւ̎Q��, DATATYPE_FIXEDFUNCTION);
        //  �����֐��̈����͂Q��
        //      ������ cmd        �֐����Ăяo�����֐��^LispData������(�ʏ�͒�`���g��LispData)
        ///     ������ list       ���]���̈����̃��X�g(LispData)������(������NIL�t��))
        ///////////////////////////////////////////////////////////////////////////////////////
        
        //----------------------------------------------------------------------- ListProcessor
        // �ŗL�֐�(�V�X�e���֐�)�Q
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/17
        // Version      1.0.0
        //-------------------------------------------------------------------------------------
        var FixedFunctions = new Array();
        
        //----------------------------------------------------------------------- ListProcessor
        // ATOM �֐�(Fixed Function)
        //-------------------------------------------------------------------------------------
        // (ATOM OBJECT)
        // �߂�l
        //  OBJECT��ATOMIC SYMBOL�Ȃ�T�ALIST�Ȃ�NIL��Ԃ��B
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/24
        // Version      1.1.0
        // Autoher      ���ꂨ�� (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        //����  2013/06/17  Version 1.0.0
        //      2013/06/24  Version 1.1.0
        //                  ListUtil���g���������ɕύX
        //-------------------------------------------------------------------------------------
        FixedFunctions[FIXEDFUNCTION_ATOM] = new LispData(FIXEDFUNCTION_ATOM, function (cmdLD, listLD) {
                if (ListUtil.listLength(listLD) == 1) {
                    var argLD = executeLisp(ListUtil.car(listLD));
                    if (argLD.isError()) {
                        return argLD;
                    } else if (argLD.isList()) {
                        return LISPDATA_NIL;
                    } else if (argLD.isSymbol()) {
                        return LISPDATA_T;
                    } else {
                        return LispDataManager.makeError("�����G���[�I[" + cmdLD.getName() + "]", 
                            "�����ɃV���{���ł����X�g�ł��Ȃ��l���n����܂����I >> " + StringConverter.toInformalString(argLD));
                    }
                }
                return LispDataManager.makeError("�����G���[�I[" + cmdLD.getName() + "]", "�����̐��������܂���I >> " + StringConverter.toInformalString(listLD));
            }, DATATYPE_FIXEDFUNCTION);
        
        //----------------------------------------------------------------------- ListProcessor
        // EQ �֐�(Fixed Function)
        //-------------------------------------------------------------------------------------
        // �����V���{���Ȃ� T �A����ȊO�� NIL �B�����Ɏ���̂̓V���{���̂�
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/24
        // Version      1.1.0
        // Autoher      ���ꂨ�� (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        //����  2013/06/17  Version 1.0.0
        //      2013/06/24  Version 1.1.0
        //                  ListUtil���g���������ɕύX
        //-------------------------------------------------------------------------------------
        FixedFunctions[FIXEDFUNCTION_EQ] = new LispData(FIXEDFUNCTION_EQ, function (cmdLD, listLD) {
                if (ListUtil.listLength(listLD) == 2) {
                    var argsLD = makeArgList(listLD);
                    var arg1LD = ListUtil.car(argsLD);
                    var arg2LD = ListUtil.cadr(argsLD);
                    if (arg1LD.isSymbol() && arg2LD.isSymbol()) {
                        return (arg1LD.getData() == arg2LD.getData() ? LISPDATA_T : LISPDATA_NIL);
                    } else if (arg1LD.isError()) {
                        return arg1LD;
                    } else if (arg2LD.isError()) {
                        return arg2LD;
                    } else {
                        return LispDataManager.makeError("�����G���[�I[" + cmdLD.getName() + "]", "�����ɃV���{���ȊO�͓n���܂���I >> " 
                            + StringConverter.toInformalString(arg1LD.isSymbol() ? arg2LD : arg1LD ));
                    }
                }
                return LispDataManager.makeError("�����G���[�I[" + cmdLD.getName() + "]", "�����̐��������܂���I >> " + StringConverter.toInformalString(listLD));
            }, DATATYPE_FIXEDFUNCTION);
        
        //----------------------------------------------------------------------- ListProcessor
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
        // LastUpdate   2013/06/24
        // Version      1.1.0
        // Autoher      ���ꂨ�� (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        //����  2013/06/17  Version 1.0.0
        //      2013/06/24  Version 1.1.0
        //                  ListUtil���g���������ɕύX
        //-------------------------------------------------------------------------------------
        FixedFunctions[FIXEDFUNCTION_CAR] = new LispData(FIXEDFUNCTION_CAR, function (cmdLD, listLD) {
                if (ListUtil.listLength(listLD) == 1) {
                    return ListUtil.car(executeLisp(ListUtil.car(listLD)));
                }
                return LispDataManager.makeError("�����G���[�I[" + cmdLD.getName() + "]", "�����̐��������܂���I >> " + StringConverter.toInformalString(listLD));
            }, DATATYPE_FIXEDFUNCTION);
        
        //----------------------------------------------------------------------- ListProcessor
        // CDR �֐�(Fixed Function)
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/24
        // Version      1.1.0
        // Autoher      ���ꂨ�� (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        //����  2013/06/17  Version 1.0.0
        //      2013/06/24  Version 1.1.0
        //                  ListUtil���g���������ɕύX
        //-------------------------------------------------------------------------------------
        FixedFunctions[FIXEDFUNCTION_CDR] = new LispData(FIXEDFUNCTION_CDR, function (cmdLD, listLD) {
                if (ListUtil.listLength(listLD) == 1) {
                    return ListUtil.cdr(executeLisp(ListUtil.car(listLD)));
                }
                return LispDataManager.makeError("�����G���[�I[" + cmdLD.getName() + "]", "�����̐��������܂���I >> " + StringConverter.toInformalString(listLD));
            }, DATATYPE_FIXEDFUNCTION);
        
        //----------------------------------------------------------------------- ListProcessor
        // CONS �֐�(Fixed Function)
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/24
        // Version      1.1.0
        // Autoher      ���ꂨ�� (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        //����  2013/06/17  Version 1.0.0
        //      2013/06/24  Version 1.1.0
        //                  ListUtil���g���������ɕύX
        //-------------------------------------------------------------------------------------
        FixedFunctions[FIXEDFUNCTION_CONS] = new LispData(FIXEDFUNCTION_CONS, function (cmdLD, listLD) {
                if (ListUtil.listLength(listLD) == 2) {
                    var argsLD = makeArgList(listLD);
                    return ListUtil.cons(ListUtil.car(argsLD), ListUtil.cadr(argsLD));
                }
               return LispDataManager.makeError("�����G���[�I[" + cmdLD.getName() + "]", "�����̐��������܂���I >> " + StringConverter.toInformalString(listLD));
            }, DATATYPE_FIXEDFUNCTION);
    
    }; // ListProcessor�̒�`�̂����

    /////////////////////////////////////////////////////////////////////////////////// JunLISP
    
}// JunLISP�̒�`�̏I���

///////////////////////////////////////////////////////////////////////////////////////
//  ���̃t�@�C���̏I���
///////////////////////////////////////////////////////////////////////////////////////
