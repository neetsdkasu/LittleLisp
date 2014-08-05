///////////////////////////////////////////////////////////////////////////////////////
////// JunLISP                 純LISP
///////////////////////////////////////////////////////////////////////////////////////
//情報
//  LastUpdate      2013/06/27
//  Version         新定義版 2.1.1
//  Autoher         おれおれ (takeiteasy_idontthinkso)
///////////////////////////////////////////////////////////////////////////////////////
//概要
//  参考文献を元に純LISPを作ってみた
//      実装機能
//          関数        CONS CAR CDR EQ
//          特殊形式    COND LAMBDA LABEL(DEFINE) QUOTE
//          定数        T
//          特殊定数    NIL
//          ' によるQUOTEの略記表記
//          ; から始まるコメント行
//          複数行に分割して書かれたLISPコードへの対応
//公開先URL
//  http://www.geocities.jp/takeiteasy_idontthinkso/mysoft/js_minimal_lisp/index.html
//本ファイル
//  http://www.geocities.jp/takeiteasy_idontthinkso/mysoft/js_minimal_lisp/lisp13.js
///////////////////////////////////////////////////////////////////////////////////////
//参考文献
//  [1] LISP - Wikipedia
//          http://ja.wikipedia.org/wiki/LISP 
//  [2] 純LISP - Wikipedia
//          http://ja.wikipedia.org/wiki/%E7%B4%94LISP 
//  [3] RECURSIVE FUNCTIONS OF SYMBOLIC EXPRESSIONS AND THEIR COMPUTATION BY MACHINE (Part I)
//          http://www-formal.stanford.edu/jmc/recursive.html
//  [4] Revised(5) Report on the Algorithmic Language Scheme - Table of Contents
//          http://people.csail.mit.edu/jaffer/r5rsj_toc.html
//  [5] Common Lisp the Language, 2nd Edition
//          http://www.cs.cmu.edu/Groups/AI/html/cltl/cltl2.html
///////////////////////////////////////////////////////////////////////////////////////
//今後の課題・目標
//  ・全コードの整理整頓
//  ・コメントの追加（処理を分かりやすくする）
//  ・徹底デバッグ
///////////////////////////////////////////////////////////////////////////////////////
//バージョンアップ基準
//              メジャーアップ
//                  対外的に前バージョンとの互換性を損なう大幅な変更
//                  対外的に前バージョンには存在しない全く新しい機能の追加
//                  その他、ほぼ全体のコードが変わってしまう大幅改修など
//              マイナーアップ
//                  比較的大きな誤作動(バグ)の修正
//                  メソッド等の動作の改善
//                  各クラスへの機能追加など
//                  下位クラスの大幅改修
//              リヴィジョンアップ
//                  ささやかなバグ等の修正・ささやかなコード整形など
///////////////////////////////////////////////////////////////////////////////////////
//履歴
//  2013/05/10頃    LISPに興味を持ち始め色々と調べ始める
//  2013/06/09      純LISPを作ろうとコードを書き始める（プロトタイプ(lisp3.js)の制作開始）
//  2013/06/12      純LISPプロセッサ部の一応の完成
//  2013/06/13      プロトタイプを公開（あわせてテスト用HTMLを改修）
//  2013/06/13～    LISPコードでevalを組もうと参考文献情報[2]を読むが失敗に終わる
//                  プロトタイプ(lisp3.js)を元に整理版純LISP(lisp8.js)を書き始める
//  2013/06/17      Version 1.0.0
//                  整理版純LISPの一応の完成
//  2013/06/19      Version 1.1.0
//                  変数のスコープの勘違いに気づいて実装ミスが発覚
//                  本格修正のために事前に多少の変更をした
//  2013/06/20      Version 1.2.0
//                  スコープの修正をした、動的・静的どちらのスコープでも実行可能
//  2013/06/21      Version 1.2.1
//                  エラーメッセージの日本語化＆コード整形
//  2013/06/22      Version 1.2.2
//                  ListProcessorクラス内のメソッドをListUtilを使う処理に修正
//                  コード整形
//  2013/06/23      純LISPの実現のための考え方を大きく変える
//                  チューリング完全を証明しやすいように
//                  純LISPの仕様を大きく変更する予定
//                  新仕様の純LISPをlisp13.jsに作ることに決定
//                  これにあたりlisp8.jsは普通のLISPに拡張していくための素体として
//                  ひとまず現段階の状態を完成形に作り上げていく予定
//                  lisp8.jsが完成形に達したら別ファイル(lisp?.js)で普通のLISPを作り始める予定
//                  またこれらのLISPに名前を変更する・設定する予定
//                  lisp8.js   変更前： 純LISP MinimalLISP  変更後：少なLISP SukunaLISP
//                  lisp13.js  新定義版 純LISP JunLISP   lisp?.js 簡素LISP KansoLISP (予定)
//  2013/06/24      Version 1.2.3
//                  ListProcessorクラス内のメソッドをListUtilを使う処理に修正の続き
//  2013/06/24      ～～～新定義版 JunLISP ～～～
//                  Version 2.0.0
//                  新定義版 JunLISPの一応の完成
//  2013/06/26      Version 2.1.0
//                  Lambda関数の引数の仕様を少し変更した(Schemeライクに)
//  2013/06/27      Version 2.1.1
//                  全体にコメントを追加、また動作に変更のないコードの記述位置を移動
//
//※ lisp3.jsやlisp8.jsの通し番号について
//      lisp.txt lisp2.txt～lisp10.txt まであり、これらはLISPを調べた際のメモである
//      そのうちLISPを実装するコードを書いたlisp3.txt list8.txtの拡張子を変更した
//      よって 3 や 8 に特に意味はない
//※ プロトタイプ(lisp3.js)と整理版(lisp8.js)の違いについて
//      いくつかの関数名の変更と、関数をひとまとめにした
//      またLISPコード解析の方法を丸ごと変更した（複数行への分割記述・コメント行(;)に対応）
///////////////////////////////////////////////////////////////////////////////////////

//-------------------------------------------------------------------------------------
////// JunLISP         
//-------------------------------------------------------------------------------------
//  LastUpdate      2013/06/26
//  Version         2.1.0
//  Autoher         おれおれ (takeiteasy_idontthinkso)
//-------------------------------------------------------------------------------------
//履歴  2013/06/17      Version 1.0.0
//      2013/06/19      Version 1.1.0
//                      STKクラスをListAnalyzerクラスからMinimalLISPクラスへ移動
//                      STKクラスの名前をSTKからStackArrayに変更
//      2013/06/20      Version 1.2.0
//                      スコープの考え方の間違いを正したので
//                      VariableManagerクラスとListProcessorクラスを変更した
//                      LispDataクラスのメソッドgc()の動作を変更した
//                      StackArrayクラスのメソッドclear()の動作を変更した
//      2013/06/21      Version 1.2.1
//                      いくつかのコードを整形
//                      一部のエラーメッセージの日本語化
//      2013/06/22      Version 1.2.2
//                      ListUtilクラスを作りListProcessorクラス内のメッソドを修正
//      2013/06/24      Version 1.2.3
//                      ListProcessorクラス内のメソッドをListUtilを使う処理に修正
//                      クラス名をMinimalLISPからSukunaLISPへ変更
//      2013/06/24      ～～～ 新定義版 JunLISP ～～～
//                      Version 2.0.0
//                      ListProcessorクラスの処理を変えて一応の実装完了
//      2013/06/26      Version 2.1.0
//                      ListProcessorクラスの改修(Lambda関数の引数の仕様を少し変更)
//-------------------------------------------------------------------------------------


var LISP = new function JunLISP () {
    
    //----------------------------------------------------------------------------- JunLISP
    //  内部メンバ
    //-------------------------------------------------------------------------------------
    // LastUpdate   2013/06/24
    // Version      1.1.0
    // Autoher      おれおれ (takeiteasy_idontthinkso)
    //-------------------------------------------------------------------------------------
    //履歴  2013/06/17  Version 1.0.0
    //      2013/06/24  Version 1.1.0
    //                  LISPコード表示の規定値 type_informal の追加
    //-------------------------------------------------------------------------------------
    
    //LISPコードの略式表現表示
    var type_informal = true;
    
    //スクリプトタグの実行状況
    var onceScriptTags      = false;
    
    //スクリプトタグの実行結果保存
    var ScriptTagsResults   = new Array();
    
    //----------------------------------------------------------------------------- JunLISP
    //  execute     ソース（LISPコード）を解釈し実行結果とともに配列として返す
    //-------------------------------------------------------------------------------------
    // LastUpdate   2013/06/24
    // Version      1.1.0
    // Autoher      おれおれ (takeiteasy_idontthinkso)
    //-------------------------------------------------------------------------------------
    //履歴  2013/06/17  Version 1.0.0
    //      2013/06/24  Version 1.1.0
    //                  Lispコードの文字変換の形式を規定値の変換固定に
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
    //  executeScriptTags   HTMLソース内のscriptタグに記述されたLISPコードを解釈実行する
    //-------------------------------------------------------------------------------------
    // LastUpdate   2013/06/24
    // Version      1.1.0
    // Autoher      おれおれ (takeiteasy_idontthinkso)
    //-------------------------------------------------------------------------------------
    //履歴  2013/06/17  Version 1.0.0
    //      2013/06/24  Version 1.1.0
    //                  Lispコードの文字変換の形式を規定値の変換固定に
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
    //  onLoadExecute       指定DOMElementのonload時にexecuteScriptTags()を実行するよう設定する
    //-------------------------------------------------------------------------------------
    // LastUpdate   2013/06/22
    // Version      1.0.0
    // Autoher      おれおれ (takeiteasy_idontthinkso)
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
    //  デバッグ用ユーティリティ
    ///////////////////////////////////////////////////////////////////////////////////////
    
    /* */
    //-------------------------------------------------------------------------  SukunaLISP
    //  デバッグ関連変数
    //-------------------------------------------------------------------------------------
    // LastUpdate   2013/06/17
    // Version      1.0.0
    //-------------------------------------------------------------------------------------
    
    //デバッグメッセージの保持
    var debugmsg ="";
    
    //LISPコードの現在のネストの深さ
    var debugnest = 0;
    
    //ネストの深さの文字列表現 (通常debugnestの数だけの文字数が入る)
    var debugneststr = "";

    //-------------------------------------------------------------------------  SukunaLISP
    //  getDebugText        デバッグメッセージの取得
    //-------------------------------------------------------------------------------------
    // LastUpdate   2013/06/17
    // Version      1.0.0
    // Autoher      おれおれ (takeiteasy_idontthinkso)
    //-------------------------------------------------------------------------------------
    this.getDebugText = function () {
        return debugmsg;
    };


    //-------------------------------------------------------------------------  SukunaLISP
    //  clearDebugText      デバッグメッセージをクリアする
    //-------------------------------------------------------------------------------------
    // LastUpdate   2013/06/17
    // Version      1.0.0
    // Autoher      おれおれ (takeiteasy_idontthinkso)
    //-------------------------------------------------------------------------------------
    this.clearDebugText = function () {
        debugmsg = "";
        debugnest = 0;
    };
    

    //-------------------------------------------------------------------------  SukunaLISP
    //  debug               デバッグメッセージにメッセージを追加する
    //-------------------------------------------------------------------------------------
    // LastUpdate   2013/06/17
    // Version      1.0.0
    // Autoher      おれおれ (takeiteasy_idontthinkso)
    //-------------------------------------------------------------------------------------
    function debug(msg) {
        debugmsg += debugneststr + msg + "\n";
    }

    //-------------------------------------------------------------------------  SukunaLISP
    //  debugInNest         デバッグメッセージにネストに入ったことを設定する
    //-------------------------------------------------------------------------------------
    // LastUpdate   2013/06/17
    // Version      1.0.0
    // Autoher      おれおれ (takeiteasy_idontthinkso)
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
    //  debugOutNest        デバッグメッセージにネストから出たことを設定する
    //-------------------------------------------------------------------------------------
    // LastUpdate   2013/06/17
    // Version      1.0.0
    // Autoher      おれおれ (takeiteasy_idontthinkso)
    //-------------------------------------------------------------------------------------
    function debugOutNest() {
        debugnest--;
        debugneststr = debugneststr.substring(1);
    }
    /* */
    
    /////////////////////////////////////////////////////////////////////////////// JunLISP
    //  LISPとは直接関係ないユーティリティ群
    ///////////////////////////////////////////////////////////////////////////////////////

    //----------------------------------------------------------------------------- JunLISP
    //  StackArray          スタック
    //-------------------------------------------------------------------------------------
    // LastUpdate   2013/06/19
    // Version      1.1.0
    // Autoher      おれおれ (takeiteasy_idontthinkso)
    //-------------------------------------------------------------------------------------
    //履歴  2013/06/17  Version 1.0.0
    //      2013/06/19  Version 1.1.0
    //                  ListAnalyzerクラスから親クラスのMinimalLISPクラスへ配置移動
    //                  クラス名をSTKからStackArrayに変更
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
    //  システム定数
    ///////////////////////////////////////////////////////////////////////////////////////
    
    //----------------------------------------------------------------------------- JunLISP
    //  LispDataのタイプ定数
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
    //  Lisp定数
    //-------------------------------------------------------------------------------------
    //  LastUpdate  2013/06/17
    //  Version     1.0.0
    //-------------------------------------------------------------------------------------
    var SYMBOL_NIL      = "NIL";
    var SYMBOL_T        = "T";
    
    //----------------------------------------------------------------------------- JunLISP
    //  特殊形式(Special Form)名
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
    //  システム関数(Fixed Function)名
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
    //  LispData型用ユーティリティ定数
    ///////////////////////////////////////////////////////////////////////////////////////
    
    //----------------------------------------------------------------------------- JunLISP
    //  LispDataに設定する配列用の定数
    //-------------------------------------------------------------------------------------
    //  LastUpdate  2013/06/23
    //  Version     1.0.0
    //-------------------------------------------------------------------------------------
    
    //リストタイプ
    var LD_LIST_FRONT           = 0; //CARで取り出される要素を配列に格納する位置
    var LD_LIST_END             = 1; //CDRで取り出される要素を配列に格納する位置
    var LD_LIST_ARR_SIZE        = 2; //リストタイプの配列のサイズ
    var LD_LIST_ERROR           = 0; //エラー要素を配列に入れる添え字(ListAnalyzerクラスのparseで利用)
    
    //プログラムタイプ
    var LD_PROGRAM              = 0; //LISPコードを配列に格納する位置
    var LD_NEXT                 = 1; //次のプログラムを配列に格納する位置
    var LD_PROGRAM_ARR_SIZE     = 2; //プログラムタイプの配列のサイズ
    
    //ラムダタイプ
    var LD_LAMBDA_VCID          = 0; //変数コンテナIDを配列に格納する位置
    var LD_LAMBDA_ARG_DEF       = 1; //ラムダリストを配列に格納する位置
    var LD_LAMBDA_PROGRAM       = 2; //ラムダ実行部を配列に格納する位置
    var LD_LAMBDA_ARR_SIZE      = 3; //ラムダタイプの配列のサイズ
    
    //エンプティリストタイプ
    var LD_EMPTYLIST_ARR_SIZE   = 0; //エンプティリストの配列のサイズ
    
    /////////////////////////////////////////////////////////////////////////////// JunLISP
    //  LispDataクラスの定義
    ///////////////////////////////////////////////////////////////////////////////////////

    //----------------------------------------------------------------------------- JunLISP
    //  LispData            Lisp処理用管理データコンテナ
    //-------------------------------------------------------------------------------------
    //  LastUpdate      2013/06/22
    //  Version         1.0.1
    //  Autoher         おれおれ (takeiteasy_idontthinkso)
    //-------------------------------------------------------------------------------------
    //履歴  2013/06/17      Version 1.0.0
    //      2013/06/22      Version 1.1.0
    //                      isNilの判定法の変更
    //-------------------------------------------------------------------------------------
    function LispData(name, data, type) {
        
        //---------------------------------------------------------------------------- LispData
        //  内部メンバ
        //-------------------------------------------------------------------------------------
        //  LastUpdate      2013/06/22
        //  Version         1.0.0
        //-------------------------------------------------------------------------------------
        var nil = ((type === DATATYPE_EMPTYLIST) || ((type === DATATYPE_SYMBOL) && (data == SYMBOL_NIL)));
        
        //---------------------------------------------------------------------------- LispData
        //  ゲッター
        //-------------------------------------------------------------------------------------
        //  LastUpdate      2013/06/17
        //  Version         1.0.0
        //  Autoher         おれおれ (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        this.getName = function () { return name; };
        this.getData = function () { return data; };
        this.getType = function () { return type; };
        
        //---------------------------------------------------------------------------- LispData
        //  タイプ問い合わせ
        //-------------------------------------------------------------------------------------
        //  LastUpdate      2013/06/22
        //  Version         1.1.0
        //  Autoher         おれおれ (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        //履歴  2013/06/17  Version 1.0.0
        //      2013/06/22  Version 1.1.0
        //                  isNilの処理を直接計算から値を返すだけに変更
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
        //  データ取得ユーティリティ (これはLispDataManagerに委託するべきかもしれない)
        //-------------------------------------------------------------------------------------
        //  LastUpdate      2013/06/17
        //  Version         1.0.0
        //  Autoher         おれおれ (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        this.getListFront     = function () { 
            return (type === DATATYPE_LIST) ? data[LD_LIST_FRONT] : LispDataManager.makeError("データエラー！ [getListFront]", "This method (getListFront) can be called with list type:"); };
        this.getListEnd       = function () { 
            return (type === DATATYPE_LIST) ? data[LD_LIST_END] : LispDataManager.makeError("データエラー！ [getListEnd]", "This method (getListEnd) can be called with list type:"); };
        this.getProgram       = function () { 
            return (type === DATATYPE_PROGRAM) ? data[LD_PROGRAM] : LispDataManager.makeError("データエラー！ [getProgram]", "This method (getProgram) can be called with program type:"); };
        this.getNext          = function () { 
            return (type === DATATYPE_PROGRAM) ? data[LD_NEXT] : LispDataManager.makeError("データエラー！ [getNext]", "This method (getNext) can be called with program type:"); };
        this.getLambdaVCID      = function () {
            return (type === DATATYPE_LAMBDA) ? data[LD_LAMBDA_VCID] : LispDataManager.makeError("データエラー！ [getLambdaVCID]", "This method (getLambdaVCID) can be called with lambda type:"); };
        this.getLambdaArgDef    = function () {
            return (type === DATATYPE_LAMBDA) ? data[LD_LAMBDA_ARG_DEF] : LispDataManager.makeError("データエラー！", "This method (getLambdaArgDef) can be called with lambda type:"); };
        this.getLambdaProgram   = function () {
            return (type === DATATYPE_LAMBDA) ? data[LD_LAMBDA_PROGRAM] : LispDataManager.makeError("データエラー！", "This method (getLambdaProgram) can be called with lambda type:"); };
        
        //---------------------------------------------------------------------------- LispData
        //  ガベージコレクト
        //-------------------------------------------------------------------------------------
        //  LastUpdate      2013/06/17
        //  Version         1.0.0
        //  Autoher         おれおれ (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        this.gc = function () {
            if (this.isList() || this.isProgram() || this.isUserFunction()) {
                var i;
                for (i = 0; i < data.length; i++) {
                    data[i] = null;
                }
            }
            name = null; data = null; type = null;  //再利用完全不可
        };
    
    } //LispDataの定義のおわり
    
    /////////////////////////////////////////////////////////////////////////////// JunLISP
    //  LispData型管理ユーティリティ
    ///////////////////////////////////////////////////////////////////////////////////////

    //----------------------------------------------------------------------------- JunLISP
    //  LispDataManager         LispData型管理ユーティリティ
    //-------------------------------------------------------------------------------------
    //  LastUpdate      2013/06/17
    //  Version         1.0.0
    //  Autoher         おれおれ (takeiteasy_idontthinkso)
    //-------------------------------------------------------------------------------------
    //履歴  2013/06/17      Version 1.0.0
    //-------------------------------------------------------------------------------------
    
    var LispDataManager = new function () {
        
        //--------------------------------------------------------------------- LispDataManager
        //  getSymbol           シンボルタイプのLispDataを取得する
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/17
        // Version      1.0.0
        // Autoher      おれおれ (takeiteasy_idontthinkso)
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
        //  wrapList                    配列をリストデータ(LispData)にする
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/17
        // Version      1.0.0
        // Autoher      おれおれ (takeiteasy_idontthinkso)
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
        //  makeList                    引数からリストデータ(LispData)を作る
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/17
        // Version      1.0.0
        // Autoher      おれおれ (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        var makeList = function (frontLD, endLD) {
            return wrapList(new Array(frontLD, endLD));
        };
        this.makeList = makeList;
        
        //--------------------------------------------------------------------- LispDataManager
        //  makeEmptyProgram            新しい空のプログラム(LispData)を作る
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/17
        // Version      1.0.0
        // Autoher      おれおれ (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        this.makeEmptyProgram = function (num) {
            return new LispData(num, new Array(LISPDATA_PROGRAMEND, LISPDATA_PROGRAMEND), DATATYPE_PROGRAM);
        };
        
        //--------------------------------------------------------------------- LispDataManager
        //  makeError                   任意のエラーデータ(LispData)を生成する
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/17
        // Version      1.0.0
        // Autoher      おれおれ (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        var makeError = function (errorname, description) {
            return new LispData(errorname, description, DATATYPE_ERROR);
        };
        this.makeError = makeError;
    
        //--------------------------------------------------------------------- LispDataManager
        // wrapQuote                    LispDataをQUOTEに内包する
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/17
        // Version      1.0.0
        // Autoher      おれおれ (takeiteasy_idontthinkso)
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
        // makeLambda                   現在のスコープでLAMBDA関数を作る
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/17
        // Version      1.0.0
        // Autoher      おれおれ (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        this.makeLambda = function (argdefLD, codeLD) {
            return new LispData(SPECIALFORM_LAMBDA,
                new Array(VariableManager.getCurrentVariableContainerID(), argdefLD, codeLD), 
                DATATYPE_LAMBDA);
        };
        
        //--------------------------------------------------------------------- LispDataManager
        //  setListFront        指定リスト(LispData)の先頭データを設定する
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/17
        // Version      1.0.0
        // Autoher      おれおれ (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        this.setListFront = function (listLD, data) {
            if (listLD.isList()) {
                return listLD.getData()[LD_LIST_FRONT] = data;
            } else {
                return null;
            }
        };
        
        //--------------------------------------------------------------------- LispDataManager
        //  setListEnd          指定リスト(LispData)の末尾データを設定する
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/17
        // Version      1.0.0
        // Autoher      おれおれ (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        this.setListEnd = function (listLD, data) {
            if (listLD.isList()) {
                return listLD.getData()[LD_LIST_END] = data;
            } else {
                return null;
            }
        };
        
        //--------------------------------------------------------------------- LispDataManager
        //  setProgram          指定プログラム(LispData)のプログラムを設定する
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/17
        // Version      1.0.0
        // Autoher      おれおれ (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        this.setProgram = function (programLD, data) {
            if (programLD.isProgram()) {
                return programLD.getData()[LD_PROGRAM] = data;
            } else {
                return null;
            }
        };
        
        //--------------------------------------------------------------------- LispDataManager
        //  setNextProgram      指定プログラム(LispData)の次のプログラムを設定する
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/17
        // Version      1.0.0
        // Autoher      おれおれ (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        this.setNextProgram = function (programLD, data) {
            if (programLD.isProgram() && (data.isProgram() || data.isProgramEnd())) {
                programLD.getData()[LD_NEXT] = data;
            } else {
                return null;
            }
        };
    
    };// LispDataManagerの定義のおわり

    //----------------------------------------------------------------------------- JunLISP
    //  ListUtil        リストタイプのLispData用ユーティリティ
    //-------------------------------------------------------------------------------------
    //  LastUpdate      2013/06/24
    //  Version         1.2.0
    //  Autoher         おれおれ (takeiteasy_idontthinkso)
    //-------------------------------------------------------------------------------------
    //履歴  2013/06/21      Version 1.0.0
    //                      car cdr cons を設置
    //      2013/06/22      Version 1.1.0
    //                      listLength cadr を設置
    //      2013/06/24      ～～～ 新定義版 JunLISP ～～～
    //                      Version 1.2.0
    //                      caddr を設置
    //-------------------------------------------------------------------------------------

    var ListUtil = new function () {
    
        //---------------------------------------------------------------------------- ListUtil
        //  car 
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/21
        // Version      1.0.0
        // Autoher      おれおれ (takeiteasy_idontthinkso)
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
            return LispDataManager.makeError("引数エラー！","引数がリストじゃありません！");
        };
        this.car = car;

        //---------------------------------------------------------------------------- ListUtil
        //  cdr 
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/21
        // Version      1.0.0
        // Autoher      おれおれ (takeiteasy_idontthinkso)
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
            return LispDataManager.makeError("引数エラー！","引数がリストじゃありません！");
        };
        this.cdr = cdr;

        //---------------------------------------------------------------------------- ListUtil
        //  cons        二つのLispDataを持つリスト(LispData)を返す
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/21
        // Version      1.0.0
        // Autoher      おれおれ (takeiteasy_idontthinkso)
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
            return LispDataManager.makeError("引数エラー！","引数にはシンボルかリストを指定してください！");
        };
        this.cons = cons;
        
        var LENGTH_ERROR = -1;
        
        //---------------------------------------------------------------------------- ListUtil
        //  listLength
        //-------------------------------------------------------------------------------------
        //  純リスト(True List, リストの最後がNILで終わるもの) の末尾のNILを除く要素数を返す
        //-------------------------------------------------------------------------------------
        //例
        //  (a b c d) => 4
        //  () => 0
        //  (a . b) => Error
        //  a => Error
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/22
        // Version      1.0.0
        // Autoher      おれおれ (takeiteasy_idontthinkso)
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
        //  cadr        cdrの結果にcarしたものを返す 
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/22
        // Version      1.0.0
        // Autoher      おれおれ (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        var cadr = function (listLD) {
            return car(cdr(listLD));
        };
        this.cadr = cadr;

        //---------------------------------------------------------------------------- ListUtil
        //  caddr        cdr２回の結果にcarしたものを返す 
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/24
        // Version      1.0.0
        // Autoher      おれおれ (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        var caddr = function (listLD) {
            return car(cdr(cdr(listLD)));
        };
        this.caddr = caddr;

    };

    
    /////////////////////////////////////////////////////////////////////////////// JunLISP
    //  LispData定数
    ///////////////////////////////////////////////////////////////////////////////////////

    //----------------------------------------------------------------------------- JunLISP
    //  LispData型定数
    //-------------------------------------------------------------------------------------
    //  LastUpdate      2013/06/17
    //  Version         1.0.0
    //  Autoher         おれおれ (takeiteasy_idontthinkso)
    //-------------------------------------------------------------------------------------
    var LISPDATA_ERROR      = LispDataManager.makeError("不明エラー！", "原因不明のエラーです！");  //一般エラー
    var LISPDATA_T          = LispDataManager.getSymbol(SYMBOL_T);                              //シンボル T
    var LISPDATA_NIL        = LispDataManager.getSymbol(SYMBOL_NIL);                            //シンボル NIL
    var LISPDATA_EMPTYLIST  = new LispData(SYMBOL_NIL, SYMBOL_NIL, DATATYPE_EMPTYLIST);         //空リスト
    var LISPDATA_PROGRAMEND = new LispData(null, null, DATATYPE_PROGRAMEND);                    //プログラム終端
    
    
    /////////////////////////////////////////////////////////////////////////////// JunLISP
    //  Lispコード構文解析処理
    ///////////////////////////////////////////////////////////////////////////////////////
    
    //----------------------------------------------------------------------------- JunLISP
    //  ListAnalyzer        Lispコード群を構文解析しLispData型のプログラムリストに変換する
    //-------------------------------------------------------------------------------------
    //  LastUpdate      2013/06/22
    //  Version         1.1.2
    //  Autoher         おれおれ (takeiteasy_idontthinkso)
    //-------------------------------------------------------------------------------------
    //履歴  2013/06/17      Version 1.0.0
    //      2013/06/19      Version 1.1.0
    //                      STKクラスをListAnalyzerクラスから MinimalLISPクラスへ移動
    //                      STKクラスの名前がStackArrayに変わったので該当箇所を修正
    //      2013/06/21      Version 1.1.1
    //                      エラーメッセージを日本語化
    //      2013/06/22      Version 1.1.2
    //                      名前の付け直し等の整形
    //
    //-------------------------------------------------------------------------------------
    
    var ListAnalyzer = new function () {
    
        
        //------------------------------------------------------------------------ ListAnalyzer
        //  WrodData        scan結果の情報を保存する
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/22
        // Version      1.1.0
        // Autoher      おれおれ (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        //履歴  2013/06/17  Version 1.0.0
        //      2013/06/22  Version 1.1.0
        //                  名前をWORDからWordDataに変更
        //-------------------------------------------------------------------------------------
        function WordData(spacecount, position, size) {
            this.getSpaceCount = function () { return spacecount; };
            this.getPosition   = function () { return position; };
            this.getSize       = function () { return size; };
        }
        
        //------------------------------------------------------------------------ ListAnalyzer
        // TokenData用定数
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
        //  TokenData       tokenizeの結果の情報を保存する
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/22
        // Version      1.1.0
        // Autoher      おれおれ (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        //履歴  2013/06/17  Version 1.0.0
        //      2013/06/22  Version 1.1.0
        //                  名前をTOKENからTokenDataへ変更
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
        //  scan            ソースをスペース・指定文字・それ以外の文字列 に分解する
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/22
        // Version      1.0.2
        // Autoher      おれおれ (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        //履歴  2013/06/17  Version 1.0.0
        //      2013/06/19  Version 1.0.1
        //                  STKクラスの名前変更に伴った修正 (STK → StackArray)
        //      2013/06/22  Version 1.0.2
        //                  WORDクラスの名前変更に伴った修正 (WORD → WordData)
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
        //  tkenize             scan結果をトークンに仕分けする
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/22
        // Version      1.0.2
        // Autoher      おれおれ (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        //履歴  2013/06/17  Version 1.0.0
        //      2013/06/19  Version 1.0.1
        //                  STKクラスの名前変更に伴った修正(STK → StackArray)
        //      2013/06/22  Version 1.0.2
        //                  TOKENクラスの名前変更に伴った修正(TOKEN → TokenData)
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
        //  readList用定数
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/21
        // Version      1.0.1
        //-------------------------------------------------------------------------------------
        //履歴  2013/06/17  Version 1.0.0
        //      2013/06/21  Version 1.0.1
        //                  parseの内部定数からListAnalyzerの内部定数に配置変更
        //-------------------------------------------------------------------------------------
        var READLIST_ERROR  = -1;
        var STATE_WAIT_FOR_FRONT    = 0;
        var STATE_WAIT_FOR_DOT      = 1;
        var STATE_WAIT_FOR_END      = 2;
        var STATE_WAIT_FOR_CLOSE    = 3;

        //------------------------------------------------------------------------ ListAnalyzer
        //  mkPos               TokenDataの場所を文字にする
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/21
        // Version      1.0.1
        //-------------------------------------------------------------------------------------
        //履歴  2013/06/17  Version 1.0.0
        //      2013/06/21  Version 1.0.1
        //                  parseの内部関数からListAnalyzerの内部関数に配置変更
        //-------------------------------------------------------------------------------------
        var mkPos = function (token) { return "(" + token.getRow() + "行目, " + token.getColumn() + "列目) >> [ " + token.getWord() + " ]"; };
    
        //------------------------------------------------------------------------ ListAnalyzer
        //  readList            トークン列から１単位リストを取得する
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/22
        // Version      1.0.2
        // Autoher      おれおれ (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        //履歴  2013/06/17  Version 1.0.0
        //      2013/06/21  Version 1.0.1
        //                  parseの内部関数からListAnalyzerの内部関数に配置変更
        //      2013/06/22  Version 1.0.2
        //                  変数名をいくつか分かりやすい名前に変更
        //-------------------------------------------------------------------------------------
        var readList = function (startpos, tokenlist, listdata) {
            var i, token, arr, cr, quote = 0;
            var state = STATE_WAIT_FOR_FRONT;
            for (i = startpos; i < tokenlist.length; i++) {
                token = tokenlist[i];
                switch (state) {
                case STATE_WAIT_FOR_FRONT: //リストの第一要素
                    if (quote > 0) {
                        if (token.getSpaceCount() > 0) { //QUOTE略字のあとに空白が来てはならない
                            //エラーは常に0番へ
                            listdata[LD_LIST_ERROR] = LispDataManager.makeError("文法エラー！", "略記QUOTE(')の後に空白を入れないでください！ >> " + mkPos(token));
                            return READLIST_ERROR;
                        }
                    }
                    if (token.isOpen()) {
                        //最初の要素はリスト
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
                        //QUOTEが省略されている
                        quote++;
                    } else if (token.isAtom()) {
                        //最初の要素はアトム
                        listdata[LD_LIST_FRONT] = LispDataManager.wrapQuote(quote, LispDataManager.getSymbol(token.getWord().toUpperCase()));
                        quote = 0;
                        state = STATE_WAIT_FOR_DOT;
                    } else if (token.isClose()) { //空リスト
                        if (quote > 0) {
                            listdata[LD_LIST_FRONT] = LispDataManager.makeError("文法エラー！", "略記QUOTE(')の後に閉じ括弧は来るべき文字ではありません！ >> " + mkPos(token));
                            return READLIST_ERROR;
                        } else {
                            return i;
                        }
                    } else {
                         //エラーは常に0番へ
                        listdata[LD_LIST_ERROR] = LispDataManager.makeError("文法エラー！", "リストの先頭にふさわしくない文字です！ >> " + mkPos(token));
                        return READLIST_ERROR;
                    }
                    break;
                    
                case STATE_WAIT_FOR_DOT:
                    if (token.isDot()) { //リストの次の要素へ
                        quote = 0;
                        state = STATE_WAIT_FOR_END;
                    } else if (token.isClose()) { // . NIL の省略 
                        listdata[LD_LIST_END] = LISPDATA_NIL;
                        return i;
                    } else if ((token.isQuote()) || (token.isOpen()) || (token.isAtom())) { // 省略リストの最初の要素
                        arr = new Array();
                        cr = readList(i, tokenlist, arr);
                        if (cr == READLIST_ERROR) {
                            listdata[LD_LIST_ERROR] = arr[LD_LIST_ERROR]; //エラーは常に0番へ
                            return READLIST_ERROR;
                        } else {
                            listdata[LD_LIST_END] = LispDataManager.wrapList(arr);
                            return cr; //省略リストなので閉じ括弧は包括済み
                        }
                    }
                    break;
                    
                case STATE_WAIT_FOR_END: //ドットの次に来る要素
                    if (quote > 0) {
                        if (token.getSpaceCount() > 0) { //QUOTE略字のあとに空白が来てはならない
                            //エラーは常に0番へ
                            listdata[LD_LIST_ERROR] = LispDataManager.makeError("文法エラー！", "略記QUOTE(')の後に空白を入れないでください！ >> " + mkPos(token));
                            return READLIST_ERROR;
                        }
                    }
                    if (token.isAtom()) { //アトム
                        listdata[LD_LIST_END] = LispDataManager.wrapQuote(quote, LispDataManager.getSymbol(token.getWord().toUpperCase()));
                        state = STATE_WAIT_FOR_CLOSE;
                    } else if (token.isOpen()) { //リスト
                        arr = new Array();
                        cr = readList(i + 1, tokenlist, arr);
                        if (cr == READLIST_ERROR) {
                            listdata[LD_LIST_ERROR] = arr[LD_LIST_ERROR]; //エラーは常に0番へ
                            return READLIST_ERROR;
                        } else {
                            listdata[LD_LIST_END] = LispDataManager.wrapQuote(quote, LispDataManager.wrapList(arr));
                            i = cr;
                            state = STATE_WAIT_FOR_CLOSE;
                        }
                    } else if (token.isQuote()) {
                        quote++;
                    } else { 
                        //エラーは常に0番へ
                        listdata[LD_LIST_ERROR] = LispDataManager.makeError("文法エラー！", "CONSリストのドット(.)の後にふさわしくない文字です！ >> " + mkPos(token));
                        return READLIST_ERROR;
                    }
                    break;
                    
                case STATE_WAIT_FOR_CLOSE:
                    if (token.isClose()) {
                        return i;
                    } else {
                        listdata[LD_LIST_ERROR] = LispDataManager.makeError("文法エラー！", "閉じ括弧がありません！ >> " + mkPos(token));
                        return READLIST_ERROR;
                    }
                    break;
                }
            }
            
            switch (state) {
            case STATE_WAIT_FOR_FRONT:
                listdata[LD_LIST_ERROR] = LispDataManager.makeError("文法エラー！", "リストの最初の要素" + (quote == 0 ? "、または閉じ括弧" : "") + "が見つかりません！");
                break;
            case STATE_WAIT_FOR_DOT:
                listdata[LD_LIST_ERROR] = LispDataManager.makeError("文法エラー！", "リストの次の要素、リストの区切りのドット(.)、または閉じ括弧が見つかりません！");
                break;
            case STATE_WAIT_FOR_END:
                listdata[LD_LIST_ERROR] = LispDataManager.makeError("文法エラー", "リストの次の要素が見つかりません！");
                break;
            case STATE_WAIT_FOR_CLOSE:
                listdata[LD_LIST_ERROR] = LispDataManager.makeError("文法エラー！", "閉じ括弧が見つかりません！");
                break;
            }
            return READLIST_ERROR;
        }; //readListの定義おわり
        
        //------------------------------------------------------------------------ ListAnalyzer
        //  parse           トークン列から構文解析をする
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/22
        // Version      1.1.1
        // Autoher      おれおれ (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        //履歴  2013/06/17  Version 1.0.0
        //      2013/06/21  Version 1.1.0
        //                  いくつかの内部定数・内部関数を外に出した
        //      2013/06/22  Version 1.1.1
        //                  変数名をいくつか分かりやすく変更
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
                    if (token.getSpaceCount() > 0) { //QUOTE略字のあとに空白が来てはならない
                        LispDataManager.setProgram(curPG, LispDataManager.makeError("文法エラー！", "略記QUOTE(')の後に空白を入れないでください！ >> " + mkPos(token)));
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
                    LispDataManager.setProgram(curPG, LispDataManager.makeError("文法エラー！", "シンボルかリストを設置してください！ >> " + mkPos(token)));
                    return topPG;
                }
            }

            if (q > 0) {
                LispDataManager.setProgram(curPG, LispDataManager.makeError("文法エラー！", "略記QUOTE(')に続く要素が見つかりません！"));
            }
            
            return topPG;
        }
        
        //------------------------------------------------------------------------ ListAnalyzer
        //  toLispData              ソースを解析しLispData群に変換する
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/17
        // Version      1.0.0
        // Autoher      おれおれ (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        this.toLispData = function (src) {
            return parse(tokenize(src, scan(src)));
        };
    }; // ListAnalyzer の定義のおわり
    
    
    /////////////////////////////////////////////////////////////////////////////// JunLISP
    //  LISPの文字列表現への変換
    ///////////////////////////////////////////////////////////////////////////////////////

    //----------------------------------------------------------------------------- JunLISP
    //  StringConverter         LispData型データの文字列表現に変換する
    //-------------------------------------------------------------------------------------
    //  LastUpdate      2013/06/23
    //  Version         1.1.1
    //  Autoher         おれおれ (takeiteasy_idontthinkso)
    //-------------------------------------------------------------------------------------
    //履歴  2013/06/17      Version 1.0.0
    //      2013/06/20      Version 1.1.0
    //                      toFormalStringとtoInformalStringを中継メソッドにした
    //      2013/06/23      Version 1.1.1
    //                      ListUtilクラスを使った処理に修正
    //-------------------------------------------------------------------------------------
    
    var StringConverter = new function () {
        var ERROR_VALUE = -1;
    
        //--------------------------------------------------------------------- StringConverter
        //  toFormalString          LispData型データを正式リスト表現の文字列に展開する
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/24
        // Version      1.1.0
        // Autoher      おれおれ (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        //履歴  2013/06/17  Version 1.0.0
        //      2013/06/20  Version 1.1.0
        //                  中継メソッドへ変更
        //                  新内部メソッドtoFormalを呼び出す
        //-------------------------------------------------------------------------------------
        var toFormalString = function (LD) {
            var result = toFormal(LD);
            if (result === ERROR_VALUE) {
                return "# 展開エラー！ [toFormalString] >> データ構造に何らかの誤りがあります！ #";
            } else {
                return result;
            }
        };
        this.toFormalString = toFormalString;
        
        //--------------------------------------------------------------------- StringConverter
        //  toFormal            LispData型データを正式リスト表現の文字列に展開する
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/23
        // Version      1.1.0
        // Autoher      おれおれ (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        //履歴  2013/06/20  Version 1.0.0
        //      2013/06/23  Version 1.1.0
        //                  ListUtilを使った処理に変更
        //-------------------------------------------------------------------------------------
        var toFormal = function (LD) {
            if ((LD instanceof LispData) === false) {
                return ERROR_VALUE;
            }
            if (LD.isProgram()) {
                return "# プログラム #";
                
            } else if (LD.isProgramEnd()) {
                return "# プログラムの終わり #";
                
            } else if (LD.isEmptyList()) {
                return "()";

            } else if (LD.isSymbol()) {
                return LD.getData();

            } else if (LD.isSystemFunction()) {
                if (LD.isSpecialForm()) {
                    return " # 特殊形式 >> " + LD.getType() + " >> " + LD.getName() + " #";
                } else {
                    return " # システム関数 >> " + LD.getType() + " >> " + LD.getName() + " #";
                }

            } else if (LD.isUserFunction()) {
                return "# LAMBDA関数 >> [引数] " + toFormalString(LD.getLambdaArgDef()) 
                        + " >> [コード] " + toFormalString(LD.getLambdaProgram()) + " #";

            } else if (LD.isError()) {
                return " # " + LD.getName() + " >> " + LD.getData() + " # ";

            } else if (LD.isComment()) {
                return " # コメント行 # ";

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
        //  Informal処理用の定数
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/23
        // Version      1.0.0
        //-------------------------------------------------------------------------------------
        var BRACKET_NEED = 0;
        var BRACKET_NONE = 1;
        var informal_quote = true;
        
        //--------------------------------------------------------------------- StringConverter
        //  setQuoteFormal setQuoteInformal     QUOTE略記の有無の設定
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/23
        // Version      1.0.0
        // Autoher      おれおれ (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        this.setQuoteInformal = function () { informal_quote = true; }; //QUOTEを略す
        this.setQuoteFormal   = function () { informal_quote = false; }; //QUOTEを略さない
        
        //--------------------------------------------------------------------- StringConverter
        //  toInformalString        LispData型データを略式リスト表現の文字列に展開する
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/20
        // Version      1.1.0
        // Autoher      おれおれ (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        //履歴  2013/06/17  Version 1.0.0
        //      2013/06/20  Version 1.1.0
        //                  中継メソッドへ変更
        //                  新内部メソッドtoInformalを呼び出す
        //-------------------------------------------------------------------------------------
        var toInformalString = function (list) {
            var result = toInformal(list, BRACKET_NEED);
            if (result === ERROR_VALUE) {
                return "# 展開エラー！ [toIformalString] >> データ構造に何らかの誤りがあります！ #";
            } else {
                return result;
            }
        };
        this.toInformalString = toInformalString;

        //--------------------------------------------------------------------- StringConverter
        //  toInformal          LispData型データを略式リスト表現の文字列に展開する
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/23
        // Version      1.1.0
        // Autoher      おれおれ (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        //履歴  2013/06/20  Version 1.0.0
        //      2013/06/23  Version 1.1.0
        //                  ListUtilを使った処理に変更
        //                  処理に定数を導入
        //-------------------------------------------------------------------------------------
        var toInformal = function (LD, bracket) {
            if ((LD instanceof LispData) === false) {
                return ERROR_VALUE;
            }
            if (LD.isProgram()) {
                return "# プログラム #";
                
            } else if (LD.isProgramEnd()) {
                return "# プログラムの終わり #";
                
            } else if (LD.isEmptyList()) {
                return "()";
                
            } else if (LD.isSymbol()) {
                return LD.getData();
                
            } else if (LD.isSystemFunction()) {
                if (LD.isSpecialForm()) {
                    return "# 特殊形式 >> " + LD.getType() + " >> " + LD.getName() + " #";
                } else {
                    return "# システム関数 >> " + LD.getType() + " >> " + LD.getName() + " #";
                }
            } else if (LD.isUserFunction()) {
                return "# LAMBDA関数 >> [引数] " + toInformalString(LD.getLambdaArgDef())
                        + " >> [コード] " + toInformalString(LD.getLambdaProgram()) + " #";
            
            } else if (LD.isError()) {
                return "# " + LD.getName() + " >> " + LD.getData() + " #";
            
            } else if (LD.isComment()) {
                return "# コメント行 #";
            
            } else if (LD.isList()) {
                var frontLD, endLD, strFront, strEnd;
                frontLD = ListUtil.car(LD);
                endLD   = ListUtil.cdr(LD);
                if (informal_quote) {
                    if (frontLD.getData() === SPECIALFORM_QUOTE) { //QUOTEの略記
                        if (ListUtil.listLength(endLD) == 1) {
                            return "'" + toInformal(endLD, BRACKET_NONE);
                        }
                    }
                }
                strFront = toInformal(frontLD, BRACKET_NEED);
                if (strFront !== ERROR_VALUE) {
                    if (endLD.isNil()) {
                        //リスト末尾のNILの省略
                        if (bracket === BRACKET_NONE) {
                            return strFront;
                        } else {
                            return "(" + strFront + ")";
                        }
                    }
                    if (endLD.isSymbol()) {
                        //ドット必須
                        strEnd = toInformal(endLD, BRACKET_NEED);
                        if (strEnd !== ERROR_VALUE) {
                            if (bracket === BRACKET_NONE) {
                                return strFront + " . " + strEnd;
                            } else {
                                 return "(" + strFront + " . " + strEnd + ")";
                           }
                        }
                    } else {
                        //ドット省略
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
    
    }; //StringConverterの終わり
    
    /////////////////////////////////////////////////////////////////////////////// JunLISP
    //  LISP変数管理
    ///////////////////////////////////////////////////////////////////////////////////////

    //----------------------------------------------------------------------------- JunLISP
    //  VariableManager                 変数マネージャ
    //-------------------------------------------------------------------------------------
    //  LastUpdate      2013/06/20
    //  Version         2.0.0
    //  Autoher         おれおれ (takeiteasy_idontthinkso)
    //-------------------------------------------------------------------------------------
    //履歴  2013/06/17      Version 1.0.0
    //      2013/06/20      Version 2.0.0
    //                      スコープの考え方を間違ってたため静的・動的のどちらでもない動き
    //                      それを改善、動的・静的を選べる仕様に
    //                      またそれに合わせてメソッド等を大幅改修
    //                      追加 ・VariableManagerクラスのメソッド
    //                              isLexical() isDynamic() setLexical() setDynamic()
    //                              removeAll() release() jumptoScope() returnScope()
    //                              addNewContainer() getContainer() releaseContainer()
    //                              setCurrentVariable() setGlobalVariable()
    //                              updateBindVariable() inNewNest() outNowNest()
    //                           ・VariableContainerクラスのメソッド
    //                              NonReference()
    //                      廃止 ・VariableManagerクラスのメソッド
    //                              inNewScope() inLambdaScope(), outNowScope()
    //                              outNowLambdaScope() setVariable() setParentVariable()
    //                           ・LambdaVariableContainerクラス
    //-------------------------------------------------------------------------------------
    
    var VariableManager = new function () {
        
        //--------------------------------------------------------------------- VariableManager
        //  変数コンテナのID
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/20
        // Version      1.0.0
        //-------------------------------------------------------------------------------------
        //次に設定される変数コンテナのID
        var CurrentVCID  = 0;
        
        
        //--------------------------------------------------------------------- VariableManager
        // nextVCID     変数コンテナのID
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/20
        // Version      1.0.0
        // Autoher      おれおれ (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        var nextVCID = function () { return CurrentVCID++; };        

        //--------------------------------------------------------------------- VariableManager
        //  VariableContainer          変数コンテナ
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/20
        // Version      1.1.0
        // Autoher      おれおれ (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        //履歴  2013/06/17  Version 1.0.0
        //      2013/06/20  Version 1.1.0
        //                  参照カウンタを設置
        //-------------------------------------------------------------------------------------
        function VariableContainer(parentVC) {
            
            //------------------------------------------------------------------- VariableContainer
            //  privateメンバ
            //-------------------------------------------------------------------------------------
            // LastUpdate   2013/06/17
            // Version      1.0.0
            //-------------------------------------------------------------------------------------
            //コンテナID
            var id = nextVCID();
            
            //参照カウンタ
            var referCount = 0;

            //変数データ(LispData)を格納する
            var variables = new Array();
            
            //------------------------------------------------------------------- VariableContainer
            //  increaseReferCount  参照カウンタをインクリメントする
            //-------------------------------------------------------------------------------------
            // LastUpdate   2013/06/17
            // Version      1.0.0
            // Autoher      おれおれ (takeiteasy_idontthinkso)
            //-------------------------------------------------------------------------------------
            this.increaseReferCount = function () {
                referCount++;
                if (parentVC != null) {
                    parentVC.increaseReferCount();
                }
            };
            
            //------------------------------------------------------------------- VariableContainer
            //   NonReference       参照があるかどうかを確認する
            //-------------------------------------------------------------------------------------
            // LastUpdate   2013/06/17
            // Version      1.0.0
            // Autoher      おれおれ (takeiteasy_idontthinkso)
            //-------------------------------------------------------------------------------------
            var NonReference = function () { return (referCount == 0); };
            this.NonReference = NonReference;

            //------------------------------------------------------------------- VariableContainer
            //  ゲッター
            //-------------------------------------------------------------------------------------
            // LastUpdate   2013/06/17
            // Version      1.0.0
            // Autoher      おれおれ (takeiteasy_idontthinkso)
            //-------------------------------------------------------------------------------------
            
            //参照カウントの取得
            this.getReferCount = function () { return referCount; };
    
            //コンテナIDの取得
            this.getID = function () { return id; };
            
            //親コンテナを取得する
            this.getParent = function () { return parentVC; };
            
            //------------------------------------------------------------------- VariableContainer
            //  getVariable     変数を取得する
            //-------------------------------------------------------------------------------------
            // LastUpdate   2013/06/17
            // Version      1.0.0
            // Autoher      おれおれ (takeiteasy_idontthinkso)
            //-------------------------------------------------------------------------------------
            this.getVariable = function (key) {
                return variables[key].getData();
            }
            
            //------------------------------------------------------------------- VariableContainer
            //  setVariable     変数を設定する
            //-------------------------------------------------------------------------------------
            // LastUpdate   2013/06/17
            // Version      1.0.0
            // Autoher      おれおれ (takeiteasy_idontthinkso)
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
            //  getVariableContainer        keyに対応する変数を保持する変数コンテナを取得
            //-------------------------------------------------------------------------------------
            //  親コンテナを辿って探していく
            //-------------------------------------------------------------------------------------
            // LastUpdate   2013/06/17
            // Version      1.0.0
            // Autoher      おれおれ (takeiteasy_idontthinkso)
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
            //  release     変数の解放
            //-------------------------------------------------------------------------------------
            // LastUpdate   2013/06/17
            // Version      1.0.0
            // Autoher      おれおれ (takeiteasy_idontthinkso)
            //-------------------------------------------------------------------------------------
            //履歴  2013/06/17  Version 1.0.0
            //      2013/06/24  ～～～ 新定義版 JunLISP ～～～
            //      2013/06/27  Version 1.1.0
            //                  静的スコープのさらなる勘違いを修正
            //-------------------------------------------------------------------------------------
            this.release = function () {
                if (NonReference() == false) { //参照がある場合は失敗
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
            //  gc          ガベージコレクト
            //-------------------------------------------------------------------------------------
            // LastUpdate   2013/06/17
            // Version      1.0.0
            // Autoher      おれおれ (takeiteasy_idontthinkso)
            //-------------------------------------------------------------------------------------
            this.gc = function () {  //再利用完全不可
                var i;
                for (i in variables) {
                    variables[i].gc();
                    variables[i] = null;
                }
                referCount = 0;
                variables = null;
                parentVC = null;
            };

        }; // VariableContainer の定義のおわり

        /////////////////////////////////////////////////////////////////////// VariableManager
        //  変数コンテナの管理
        ///////////////////////////////////////////////////////////////////////////////////////

        //--------------------------------------------------------------------- VariableManager
        //  変数コンテナリスト（捕縛スコープ参照、およびgc用）
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/20
        // Version      1.0.0
        //-------------------------------------------------------------------------------------
        var Containers = new Array();
        
        //--------------------------------------------------------------------- VariableManager
        //  addNewContainer         新しい変数コンテナを取得する
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/20
        // Version      1.0.0
        // Autoher      おれおれ (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        var addNewContainer = function (parentVC) {
            var VC = new VariableContainer(parentVC);
            Containers[VC.getID()] = VC;
            return VC;
        };
        
        //--------------------------------------------------------------------- VariableManager
        //  getContainer            指定IDの変数コンテナを取得する
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/20
        // Version      1.0.0
        // Autoher      おれおれ (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        var getContainer = function (id) {
            if (Containers[id]) {
                return Containers[id];
            } else {
                return null;
            }
        };
        
        //--------------------------------------------------------------------- VariableManager
        //  releaseContainer        変数コンテナの解放
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/20
        // Version      1.0.0
        // Autoher      おれおれ (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        var releaseContainer = function (VC) {
            if (VC.NonReference()) {
                Containers[VC.getID()] = null;
            }
        };
        
        //--------------------------------------------------------------------- VariableManager
        //  removeAll               全ての変数を削除する（使用は要注意）
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/20
        // Version      1.0.0
        // Autoher      おれおれ (takeiteasy_idontthinkso)
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
        //  変数のスコープの管理
        ///////////////////////////////////////////////////////////////////////////////////////

        //--------------------------------------------------------------------- VariableManager
        //  スコープ定数
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/20
        // Version      1.0.0
        //-------------------------------------------------------------------------------------
        var SCOPE_LEXICAL = 0;
        var SCOPE_DYNAMIC = 1;
        
        //--------------------------------------------------------------------- VariableManager
        //  内部メンバ
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/20
        // Version      1.0.0
        //-------------------------------------------------------------------------------------
        
        //現在のスコープ
        var scope = SCOPE_DYNAMIC;
        
        //グローバルスコープの変数コンテナ
        var GlobalVariableContainer = addNewContainer(null);
        
        //現在のスコープの変数コンテナ
        var CurrentVariableContainer = GlobalVariableContainer;
        
        //静的スコープ時のLambda関数など別スコープ移動用
        var ContainerStack = new StackArray();


        //--------------------------------------------------------------------- VariableManager
        //  スコープの管理メソッド
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/20
        // Version      1.0.0
        // Autoher      おれおれ (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------

        this.isLexical = function () { return (scope == SCOPE_LEXICAL); };
        this.isDynamic = function () { return (scope == SCOPE_DYNAMIC); };
        this.setLexical = function () { scope = SCOPE_LEXICAL; };
        this.setDynamic = function () { scope = SCOPE_DYNAMIC; };
        
        //--------------------------------------------------------------------- VariableManager
        //  getCurrentVariableContainerID       現在のコンテナのID取得
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/20
        // Version      1.0.0
        // Autoher      おれおれ (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        this.getCurrentVariableContainerID = function () {
            CurrentVariableContainer.increaseReferCount();
            return CurrentVariableContainer.getID();
        };
        
        
        //--------------------------------------------------------------------- VariableManager
        //  getVariable             変数の取得
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/20
        // Version      1.0.0
        // Autoher      おれおれ (takeiteasy_idontthinkso)
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
        //  setCurrentVariable          現在のスコープへの変数の設定
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/20
        // Version      1.0.0
        // Autoher      おれおれ (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        var setCurrentVariable = function (key, data) {
            CurrentVariableContainer.setVariable(key, data);
        };
        this.setCurrentVariable = setCurrentVariable;
        
        //--------------------------------------------------------------------- VariableManager
        //  updateBindVariable          keyがバインドされてる最寄のスコープに上書き
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/20
        // Version      1.0.0
        // Autoher      おれおれ (takeiteasy_idontthinkso)
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
        //  setGlobalVariable           グローバルスコープへの変数の設定
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/20
        // Version      1.0.0
        // Autoher      おれおれ (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        var setGlobalVariable = function (key, data) {
            GlobalVariableContainer.setVariable(key, data);
        };
        this.setGlobalVariable = setGlobalVariable;
    
        //--------------------------------------------------------------------- VariableManager
        //  setScopeGlobal              現在のスコープを強制的にグローバルスコープに戻す
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/20
        // Version      1.0.0
        // Autoher      おれおれ (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        var setScopeGlobal = function () {
            CurrentVariableContainer = GlobalVariableContainer;
        };
        this.setScopeGlobal = setScopeGlobal;
    
        //--------------------------------------------------------------------- VariableManager
        //  intoNewNest                 新しいスコープのネストに入る
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/20
        // Version      1.0.0
        // Autoher      おれおれ (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        var intoNewNest = function () {
            CurrentVariableContainer = addNewContainer(CurrentVariableContainer);
        };
        this.intoNewNest = intoNewNest;
    
        //--------------------------------------------------------------------- VariableManager
        //  outNowNest                 現在のネストのスコープを解放する
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/20
        // Version      1.0.0
        // Autoher      おれおれ (takeiteasy_idontthinkso)
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
                return false; //親スコープが無いのにスコープから抜けるのは異常処理
            }
            return true;
        };
        
        //--------------------------------------------------------------------- VariableManager
        //  jumptoScope                 静的スコープ時ならカレントスコープを捕縛スコープへ移動
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/20
        // Version      1.0.0
        // Autoher      おれおれ (takeiteasy_idontthinkso)
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
                return true; //動的スコープなら処理なし
            }
        };
        
        //--------------------------------------------------------------------- VariableManager
        //  returnScope                 静的スコープ時なら捕縛スコープから元のスコープへ戻る
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/20
        // Version      1.0.0
        // Autoher      おれおれ (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        this.returnScope = function () {
            if (scope === SCOPE_LEXICAL) {
                if (ContainerStack.size() > 0) {
                    //スタックに退避していたスコープを戻す
                    CurrentVariableContainer = ContainerStack.pop();
                } else {
                    //本来異常処理だが、念のためグローバルスコープに戻す
                    setScopeGlobal();
                    return false; //以上処理なのでfalse
                }
            } //動的スコープなら処理なし
            return true;
        };
    
    };//VariableManagerの定義おわり
    
    /////////////////////////////////////////////////////////////////////////////// JunLISP
    //  LISPの実行
    ///////////////////////////////////////////////////////////////////////////////////////

    //----------------------------------------------------------------------------- JunLISP
    //  ListProcessor           LISPを実行する
    //-------------------------------------------------------------------------------------
    //  LastUpdate      2013/06/26
    //  Version         2.1.0
    //  Autoher         おれおれ (takeiteasy_idontthinkso)
    //-------------------------------------------------------------------------------------
    //履歴  2013/06/17      Version 1.0.0
    //      2013/06/20      Version 1.1.0
    //                      スコープの考え方を間違っていたためそれに合わせて修正
    //                      ・スコープの入りをLAMBDA関数実行時だけに設定
    //                      ・LABELの変数設定箇所をカレントスコープ固定に
    //      2013/06/21      Version 1.1.1
    //                      コードをいくつか整形
    //                      エラーメッセージの日本語化
    //      2013/06/23      Version 1.2.0
    //                      ListUtilクラスを使った処理に修正
    //                      その他コード整形
    //      2013/06/24      Version 1.2.1
    //                      同上の作業の続き
    //      2013/06/24      ～～～ 新定義版 JunLISP ～～～
    //                      Version 2.0.0
    //                      新定義の動作に設定変更
    //      2013/06/26      Version 2.1.0
    //                      Lambda関数の引数の仕様を変更した(Schemeライクに)
    //-------------------------------------------------------------------------------------
    
    var ListProcessor = new function () {
    
        //----------------------------------------------------------------------- ListProcessor
        //  executeLisp         LispData群を実行する
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/24
        // Version      2.0.0
        // Autoher      おれおれ (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        //履歴  2013/06/17  Version 1.0.0
        //      2013/06/20  Version 1.1.0
        //                  スコープの勘違いの修正のため
        //                  スコープ変化のメソッドを削除
        //      2013/06/23  Version 1.2.0
        //                  ListUtilを使ったコードに変更
        //                  変数名の変更等
        //      2013/06/24  ～～～ 新定義版 JunLISP ～～～
        //                  Version 2.0.0
        //                  関数や特殊形式の処理を新定義に従って大幅変更
        //-------------------------------------------------------------------------------------
        var executeLisp = function (listLD) {
            if (listLD instanceof LispData) {
                if (listLD.isSymbol()) {
                    var name = listLD.getData();
                    if (listLD.isNil() || (name == SYMBOL_T)) {
                        return listLD;
                    } else if (SpecialForms[name]) { //特殊形式
                        return listLD;
                    } else if (FixedFunctions[name]) { //固有関数(システム関数)
                        return listLD;
                    }
                    var value = VariableManager.getVariable(name);
                    if (value !== null) {
                        return value;
                    }
                    //シンボルから数値や変数や関数名などに変換する、対応するものが無ければエラー
                    return LispDataManager.makeError("変数取得エラー！", "このシンボルには値が設定されていません！ >> " + name);
                
                } else if (ListUtil.listLength(listLD) > 0) {
                    var cmdLD = executeLisp(ListUtil.car(listLD));
                    
                    if (cmdLD.isSymbol()) {
                        var func, name = cmdLD.getData();
                        if (SpecialForms[name]) { //特殊形式
                            func = SpecialForms[name].getData();
                            return func(cmdLD, ListUtil.cdr(listLD));
                        } else if (FixedFunctions[name]) { //固有関数(システム関数)
                            func = FixedFunctions[name].getData();
                            return func(cmdLD, ListUtil.cdr(listLD));
                        }
                    } else if (ListUtil.listLength(cmdLD) == 3) { //LAMBDA関数
                        var symbolLD = ListUtil.car(cmdLD);
                        if (symbolLD.isSymbol() && (symbolLD.getData() == SPECIALFORM_LAMBDA)) {
                            return doLambdaFunction(cmdLD, ListUtil.cdr(listLD));
                        }
                    } else if (cmdLD.isError()) {
                        return cmdLD;
                    }
                        return LispDataManager.makeError("呼び出しエラー！", 
                            "呼び出し可能な値がリストの先頭にありません！ >> " + StringConverter.toInformalString(cmdLD));
                
                } else if (listLD.isError()) {
                    return listLD;
                } else {
                    return LispDataManager.makeError("実行エラー！", "サポートしてないデータです！ >> " + listLD.getType());
                }
            } else {
                return  LispDataManager.makeError("実行エラー！", "不明のデータが渡されました！ ");
            }
      };
        this.executeLisp = executeLisp;
        
        ///////////////////////////////////////////////////////////////////////// ListProcessor
        //  引数ユーティリティ関数
        ///////////////////////////////////////////////////////////////////////////////////////
        
        //----------------------------------------------------------------------- ListProcessor
        //  getArgs             標準関数・特殊形式の実引数を取得する
        //-------------------------------------------------------------------------------------
        //引数
        //  list    LispData                実引数のリスト
        //  n       Integer                 取得したい実引数の数
        //  args    Array                   評価後の実引数(LispData)が格納される
        //注意
        //  argcに格納される実引数の順番は逆順になる
        //  例 実引数が 3つのときは以下のように格納される
        //     1番目の実引数はargc[2], 2番目の実引数はargs[1], 3番目の実引数はargc[0]
        //     (F 'A 'B 'C) => A -> argc[2], B -> argc[1], C -> argc[0] 
        //戻り値
        //  Boolean         実引数の取得に成功したら true 、失敗したら false
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/17
        // Version      1.0.0
        // Autoher      おれおれ (takeiteasy_idontthinkso)
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
        //  makeArgList         標準関数・特殊形式の実引数をリスト(LispData)にして取得する
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/24
        // Version      1.0.0
        // Autoher      おれおれ (takeiteasy_idontthinkso)
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
                return LispDataManager.makeError("引数エラー！","引数がリストで渡されていません！")
            }
        };

        //----------------------------------------------------------------------- ListProcessor
        //  getLambdaArgs       LAMBDA製関数の実引数を取得する
        //-------------------------------------------------------------------------------------
        //引数
        //  list    LispData                実引数のリスト
        //戻り値
        //  LispData        評価後の実引数のリスト
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/24
        // Version      1.1.0
        // Autoher      おれおれ (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        //履歴  2013/06/17  Version 1.0.0
        //      2013/06/24  Version 1.1.0
        //                  ListUtilを使った処理に変更
        //-------------------------------------------------------------------------------------
        var getLambdaArgs = function (listLD) {
            if (ListUtil.listLength(listLD) > 0) {
                var argLD = executeLisp(ListUtil.car(listLD));
                var arglistLD = getLambdaArgs(ListUtil.cdr(listLD));
                return ListUtil.cons(argLD, arglistLD);
            } else if (listLD.isNil()) {
                return listLD;
            }
            return LispDataManager.makeError("引数エラー！ [LAMBDA]", "引数の指定がおかしいです！ >> " + StringConverter.toInformalString(listLD));
        };
        
        //----------------------------------------------------------------------- ListProcessor
        //  setLambdaArgs       LAMBDA製関数の実引数を仮引数に設定する
        //-------------------------------------------------------------------------------------
        //引数
        //  list        LispData        仮引数のリスト
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/24
        // Version      1.1.0
        // Autoher      おれおれ (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        //履歴  2013/06/17  Version 1.0.0
        //      2013/06/24  Version 1.1.0
        //                  ListUtilを使った処理に変更
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
        //  LAMBDA製関数の実行
        ///////////////////////////////////////////////////////////////////////////////////////
        
        //----------------------------------------------------------------------- ListProcessor
        //  doLambdaFunction            LAMBDA製関数を実行する
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/24
        // Version      2.0.0
        // Autoher      おれおれ (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        //履歴  2013/06/17  Version 1.0.0
        //      2013/06/24  Version 1.1.0
        //                  ListUtilを使った処理に変更
        //      2013/06/24  ～～～ 新定義版 JunLISP ～～～
        //                  Version 2.0.0
        //                  新定義に合わせて処理を変更
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
                    return LispDataManager.makeError("引数エラー！ [" + SPECIALFORM_LAMBDA + "]", 
                        "引数の指定がおかしいです！ >> "
                         + StringConverter.toInformalString(cmdLD.getLambdaArgDef()) + " <= " + StringConverter.toInformalString(listLD));
                }
            }
            return LispDataManager.makeError("関数定義エラー！ [" + SPECIALFORM_LAMBDA + "]", 
                "引数リスト(ラムダリスト)の指定がおかしいです！ >> " + StringConverter.toInformalString(argdefLD));
        };
        
        
        ///////////////////////////////////////////////////////////////////////// ListProcessor
        //  特殊形式(Special Form)の定義
        ///////////////////////////////////////////////////////////////////////////////////////
        //登録ルール
        //  SpecialForms["特殊形式名"] = new LispData("特殊形式名", 処理関数への参照, DATATYPE_SPECIALFORM);
        //  処理関数の引数は２つ
        //      第一引数 cmd        関数を呼び出した関数型LispDataが入る(通常は定義自身のLispData)
        ///     第二引数 list       未評価の引数のリスト(LispData)が入る(末尾のNIL付き)
        ///////////////////////////////////////////////////////////////////////////////////////

        //----------------------------------------------------------------------- ListProcessor
        //  特殊形式用のデータ(LispData)を格納する
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/17
        // Version      1.0.0
        //-------------------------------------------------------------------------------------
        var SpecialForms = new Array();
        
        //----------------------------------------------------------------------- ListProcessor
        // QUOTE 特殊形式(Special Form)
        //-------------------------------------------------------------------------------------
        // 書式
        //  (QUOTE OBJECT)
        // 戻り値
        //  OBJECT
        // 例
        //  (QUOTE A)                -> A
        //  (QUOTE (A . B))          -> (A . B)
        //  (QUOTE (A B))            -> (A B)
        //  (QUOTE (CONS A B))       -> (CONS A B)
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/23
        // Version      1.1.0
        // Autoher      おれおれ (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        //履歴  2013/06/17  Version 1.0.0
        //      2013/06/23  Version 1.1.0
        //                  ListUtilを使った処理に変更
        //-------------------------------------------------------------------------------------
        SpecialForms[SPECIALFORM_QUOTE] = new LispData(SPECIALFORM_QUOTE, function (cmdLD, listLD) {
                if (ListUtil.listLength(listLD) == 1) {
                    var argLD = ListUtil.car(listLD);
                    if (argLD.isList() || argLD.isSymbol()) {
                        return argLD;
                    } else {
                        return LispDataManager.makeError("引数エラー！[" + cmdLD.getName() + "]", 
                            "引数にシンボルでもリストでもない値が渡されました！ >> " + StringConverter.toInformalString(argLD));
                    }
                }
                return LispDataManager.makeError("引数エラー！[" + cmdLD.getName() + "]",
                     "引数の数が合いません！ >> " + StringConverter.toInformalString(listLD));
            }, DATATYPE_SPECIALFORM);
        
        //----------------------------------------------------------------------- ListProcessor
        // COND 特殊形式(Special Form)
        //-------------------------------------------------------------------------------------
        // 書式
        //  (COND (TEST-1 FORM-1) (TEST-2 FORM-2) ～ (TEST-N FORM-N))
        //  (COND {(TEST FORM)}+)
        //  最低でも１対のTESTとFORMが必要
        //  
        // 例
        //  (COND ('A 'B) ('C 'D))                  -> B            ;arg is (('A 'B) . (('C 'D) . NIL)), tmp[0] is ('A 'B), tmp[1] is (('C 'D) . NIL)
        //  (COND ('C 'D))                          -> D            ;arg is (('C 'D) . NIL), tmp[0] is ('C 'D), tmp[1] is NIL
        //  (COND (NIL 'A) ('B (CONS 'C '(D E))))   -> (C D E)
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/23
        // Version      1.1.0
        // Autoher      おれおれ (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        //履歴  2013/06/17  Version 1.0.0
        //      2013/06/23  Version 1.1.0
        //                  ListUtilを使った処理に変更
        //-------------------------------------------------------------------------------------
        SpecialForms[SPECIALFORM_COND] = new LispData(SPECIALFORM_COND, function (cmdLD, listLD) {
                if (ListUtil.listLength(listLD) > 0) {
                    //常に第一引数を処理
                    var targetLD = ListUtil.car(listLD);
                    if (ListUtil.listLength(targetLD) == 2) {
                        //リストの先頭のテスト
                        var testLD = executeLisp(ListUtil.car(targetLD));
                        if (testLD.isError()) {
                            return testLD;
                        } else if (testLD.isNil()) {
                            //次のリストへ
                            var func = SpecialForms[SPECIALFORM_COND].getData();
                            return func(cmdLD, ListUtil.cdr(listLD));
                        } else {
                            //対の値を返す
                            return executeLisp(ListUtil.cadr(targetLD));
                        }
                    }
                    return LispDataManager.makeError("引数エラー！[" + cmdLD.getName() + "]",
                        "引数の指定がおかしいです！ >> " + StringConverter.toInformalString(targetLD));
                }
                return LispDataManager.makeError("引数エラー！[" + cmdLD.getName() + "]", 
                    "引数の指定がおかしいです！ >> " + StringConverter.toInformalString(listLD));
            }, DATATYPE_SPECIALFORM);
        
        //----------------------------------------------------------------------- ListProcessor
        // DEFINE 特殊形式(Special Form)
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/24
        // Version      1.2.0
        // Autoher      おれおれ (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        //履歴  2013/06/17  Version 1.0.0
        //      2013/06/22  Version 1.1.0
        //                  戻り値を変数名から設定値に変更
        //      2013/06/24  Version 1.2.0
        //                  ListUtilを使った処理に変更
        //-------------------------------------------------------------------------------------
        SpecialForms[SPECIALFORM_DEFINE] = new LispData(SPECIALFORM_DEFINE, function (cmdLD, listLD) {
                if (ListUtil.listLength(listLD) == 2) {
                    var symbolLD = ListUtil.car(listLD);
                    if (symbolLD.isSymbol()) {
                        var name = symbolLD.getData();
                        if ((name == SYMBOL_T) || (name == SYMBOL_NIL) || (FixedFunctions[name]) || (SpecialForms[name])) {
                            return LispDataManager.makeError("変数定義エラー！ [" + cmdLD.getName() +"]", "予約キーワードは指定できません！ >> " + name);
                        }
                        var valueLD = executeLisp(ListUtil.cadr(listLD));
                        if (valueLD.isError()) {
                            return valueLD;
                        }
                        VariableManager.setCurrentVariable(name, valueLD);
                        return valueLD;
                    } else {
                        return LispDataManager.makeError("変数定義エラー！[" + cmdLD.getName() + "]", 
                            "変数名にシンボルが指定されていません！ >> " + StringConverter.toInformalString(symbolLD));
                    }
                }
                return LispDataManager.makeError("引数エラー！[" + cmdLD.getName() + "]", "引数の指定がおかしいです！ >> " + StringConverter.toInformalString(listLD));
            }, DATATYPE_SPECIALFORM);
        
        //----------------------------------------------------------------------- ListProcessor
        // LABEL 特殊形式(Special Form)
        //-------------------------------------------------------------------------------------
        // 特殊形式DEFINEと同じ動作
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/17
        // Version      1.0.0
        // Autoher      おれおれ (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        SpecialForms[SPECIALFORM_LABEL] = new LispData(SPECIALFORM_LABEL, SpecialForms[SPECIALFORM_DEFINE].getData(), DATATYPE_SPECIALFORM);
        
        
        //----------------------------------------------------------------------- ListProcessor
        // checkLambdaArgDef    ラムダリストのチェック
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/26
        // Version      1.2.0
        // Autoher      おれおれ (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        //履歴  2013/06/17  Version 1.0.0
        //      2013/06/24  Version 1.1.0
        //                  ListUtilを使った処理に変更
        //      2013/06/24  ～～～ 新定義版 JunLISP ～～～
        //      2013/06/26  Version 1.2.0
        //                  Lambdaの引数リストの取り方をSchemeライクに変更
        //                      変更前  (LAMBDA (X Y Z) ～)    純リスト
        //                              (LAMBDA (X Y . Z) ～)  ドットリスト (Zは引数リストの残りを全て取り込む)
        //                      変更後  (LAMBDA (X Y Z) ～)    純リスト
        //                              (LAMBDA (X Y . Z) ～)  ドットリスト
        //                              (LAMBDA X ～)          シンボル (追加機能：Xは引数リスト全てを取り込む)
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
        // LAMBDA 特殊形式(Special Form)
        //-------------------------------------------------------------------------------------
        //  (LAMBDA (V-1 V-2 ～ V-N) FORM)
        //  (LAMBDA (VAR*) FORM)
        // 例
        //  (LAMBDA (X Y Z) (CONS X (CONS Y Z)))
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/26
        // Version      1.2.0
        // Autoher      おれおれ (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        //履歴  2013/06/17  Version 1.0.0
        //      2013/06/24  Version 1.1.0
        //                  ListUtilを使った処理に変更
        //      2013/06/24  ～～～ 新定義版 JunLISP ～～～
        //      2013/06/26  Version 1.2.0
        //                  ラムダリストをSchemeライクへの変更にあたり
        //                  ラムダリストのチェックを全てcheckLambdaArgDefに委託するよう変更
        //-------------------------------------------------------------------------------------
        SpecialForms[SPECIALFORM_LAMBDA] = new LispData(SPECIALFORM_LAMBDA, function (cmdLD, listLD) {
                if (ListUtil.listLength(listLD) == 2) {
                    var argdefLD = ListUtil.car(listLD);
                    var codeLD   = ListUtil.cadr(listLD);
                    if (codeLD.isSymbol() || (ListUtil.listLength(codeLD) > 0)) {
                        if (argdefLD.isNil() || (checkLambdaArgDef(argdefLD))) {
                            return ListUtil.cons(cmdLD, listLD);
                        } else {
                            return LispDataManager.makeError("関数定義エラー！ [" + cmdLD.getName() + "]", 
                                "引数リスト(ラムダリスト)の指定がおかしいです！ >> " + StringConverter.toInformalString(argdefLD));
                        }
                    }
                }
                return LispDataManager.makeError("引数エラー！ [" + cmdLD.getName() + "]", "引数の指定がおかしいです！ >> " + StringConverter.toInformalString(listLD));
            }, DATATYPE_SPECIALFORM);
            
        
        ///////////////////////////////////////////////////////////////////////// ListProcessor
        //  固有関数(システム関数) 定義
        ///////////////////////////////////////////////////////////////////////////////////////
        //登録ルール
        //  FixedFunctions["関数名"] = new LispData("関数名", 処理関数への参照, DATATYPE_FIXEDFUNCTION);
        //  処理関数の引数は２つ
        //      第一引数 cmd        関数を呼び出した関数型LispDataが入る(通常は定義自身のLispData)
        ///     第二引数 list       未評価の引数のリスト(LispData)が入る(末尾のNIL付き))
        ///////////////////////////////////////////////////////////////////////////////////////
        
        //----------------------------------------------------------------------- ListProcessor
        // 固有関数(システム関数)群
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/17
        // Version      1.0.0
        //-------------------------------------------------------------------------------------
        var FixedFunctions = new Array();
        
        //----------------------------------------------------------------------- ListProcessor
        // ATOM 関数(Fixed Function)
        //-------------------------------------------------------------------------------------
        // (ATOM OBJECT)
        // 戻り値
        //  OBJECTがATOMIC SYMBOLならT、LISTならNILを返す。
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/24
        // Version      1.1.0
        // Autoher      おれおれ (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        //履歴  2013/06/17  Version 1.0.0
        //      2013/06/24  Version 1.1.0
        //                  ListUtilを使った処理に変更
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
                        return LispDataManager.makeError("引数エラー！[" + cmdLD.getName() + "]", 
                            "引数にシンボルでもリストでもない値が渡されました！ >> " + StringConverter.toInformalString(argLD));
                    }
                }
                return LispDataManager.makeError("引数エラー！[" + cmdLD.getName() + "]", "引数の数が合いません！ >> " + StringConverter.toInformalString(listLD));
            }, DATATYPE_FIXEDFUNCTION);
        
        //----------------------------------------------------------------------- ListProcessor
        // EQ 関数(Fixed Function)
        //-------------------------------------------------------------------------------------
        // 同じシンボルなら T 、それ以外は NIL 。引数に取れるのはシンボルのみ
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/24
        // Version      1.1.0
        // Autoher      おれおれ (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        //履歴  2013/06/17  Version 1.0.0
        //      2013/06/24  Version 1.1.0
        //                  ListUtilを使った処理に変更
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
                        return LispDataManager.makeError("引数エラー！[" + cmdLD.getName() + "]", "引数にシンボル以外は渡せません！ >> " 
                            + StringConverter.toInformalString(arg1LD.isSymbol() ? arg2LD : arg1LD ));
                    }
                }
                return LispDataManager.makeError("引数エラー！[" + cmdLD.getName() + "]", "引数の数が合いません！ >> " + StringConverter.toInformalString(listLD));
            }, DATATYPE_FIXEDFUNCTION);
        
        //----------------------------------------------------------------------- ListProcessor
        //  CAR 関数(Fixed Function)
        //-------------------------------------------------------------------------------------
        //  第１引数に渡したリストの先頭の値を取り出す
        // 例
        //  (CAR ('A 'B 'C))            -> A
        //  (CAR ('E . 'F))             -> E
        //  (CAR (('X 'Y) 'Z))          -> (X Y)
        //  (CAR ('N))                  -> 'N
        // 例外(エラー)パターン
        //  (CAR 'A)                    ; リスト以外が引数に渡される
        //  (CAR ('A 'B) ('C 'D))       ; 引数が複数ある
        //  (CAR . ('A 'B))
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/24
        // Version      1.1.0
        // Autoher      おれおれ (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        //履歴  2013/06/17  Version 1.0.0
        //      2013/06/24  Version 1.1.0
        //                  ListUtilを使った処理に変更
        //-------------------------------------------------------------------------------------
        FixedFunctions[FIXEDFUNCTION_CAR] = new LispData(FIXEDFUNCTION_CAR, function (cmdLD, listLD) {
                if (ListUtil.listLength(listLD) == 1) {
                    return ListUtil.car(executeLisp(ListUtil.car(listLD)));
                }
                return LispDataManager.makeError("引数エラー！[" + cmdLD.getName() + "]", "引数の数が合いません！ >> " + StringConverter.toInformalString(listLD));
            }, DATATYPE_FIXEDFUNCTION);
        
        //----------------------------------------------------------------------- ListProcessor
        // CDR 関数(Fixed Function)
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/24
        // Version      1.1.0
        // Autoher      おれおれ (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        //履歴  2013/06/17  Version 1.0.0
        //      2013/06/24  Version 1.1.0
        //                  ListUtilを使った処理に変更
        //-------------------------------------------------------------------------------------
        FixedFunctions[FIXEDFUNCTION_CDR] = new LispData(FIXEDFUNCTION_CDR, function (cmdLD, listLD) {
                if (ListUtil.listLength(listLD) == 1) {
                    return ListUtil.cdr(executeLisp(ListUtil.car(listLD)));
                }
                return LispDataManager.makeError("引数エラー！[" + cmdLD.getName() + "]", "引数の数が合いません！ >> " + StringConverter.toInformalString(listLD));
            }, DATATYPE_FIXEDFUNCTION);
        
        //----------------------------------------------------------------------- ListProcessor
        // CONS 関数(Fixed Function)
        //-------------------------------------------------------------------------------------
        // LastUpdate   2013/06/24
        // Version      1.1.0
        // Autoher      おれおれ (takeiteasy_idontthinkso)
        //-------------------------------------------------------------------------------------
        //履歴  2013/06/17  Version 1.0.0
        //      2013/06/24  Version 1.1.0
        //                  ListUtilを使った処理に変更
        //-------------------------------------------------------------------------------------
        FixedFunctions[FIXEDFUNCTION_CONS] = new LispData(FIXEDFUNCTION_CONS, function (cmdLD, listLD) {
                if (ListUtil.listLength(listLD) == 2) {
                    var argsLD = makeArgList(listLD);
                    return ListUtil.cons(ListUtil.car(argsLD), ListUtil.cadr(argsLD));
                }
               return LispDataManager.makeError("引数エラー！[" + cmdLD.getName() + "]", "引数の数が合いません！ >> " + StringConverter.toInformalString(listLD));
            }, DATATYPE_FIXEDFUNCTION);
    
    }; // ListProcessorの定義のおわり

    /////////////////////////////////////////////////////////////////////////////////// JunLISP
    
}// JunLISPの定義の終わり

///////////////////////////////////////////////////////////////////////////////////////
//  このファイルの終わり
///////////////////////////////////////////////////////////////////////////////////////
