
    //------------------------------------------------------------------------- MinimalLISP
    //  VariableManager                 変数マネージャ
    //-------------------------------------------------------------------------------------
    //  LastUpdate      2013/06/17
    //  Version         1.0
    //  Autoher         おれおれ (takeiteasy_idontthinkso)
    //-------------------------------------------------------------------------------------
    
    var VariableManager = new function () {
        

    
        //--------------------------------------------------------------------- VariableManager
        //  VariableContainer          変数コンテナ
        //-------------------------------------------------------------------------------------
        function VariableContainer(parent) {
            
            //コンテナID
            var id = nextVCID();
            
            //参照カウンタ
            var referCount = 0;
            
            this.increaseReferCount = function () {
                referCount++;
                if (parent != null) {
                    parent.increaseReferCount();
                }
            };
            
            this.getReferCount = function () { return referCount; };
            
            this.NonReference = function () { return (referCount == 0); };
            
            //変数データ(LispData)を格納する
            var vars = new Array();
    
            //コンテナIDの取得
            this.getID = function () { return id; };
            
    
            //親コンテナを取得する
            this.getParent = function () { return parent; };
    
            //変数を取得する
            this.getVariable = function (key) {
                return vars[key].getData();
            }
            //変数を設定する
            this.setVariable = function (key, data) {
                if (vars[key]) {
                    vars[key].gc();
                    vars[key] = null;
                }
                vars[key] = new LispData(key, data, DATATYPE_VARIABLE);
                return vars[key];
            };
            //変数を格納するコンテナを取得する
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
            //一部変数の解放
            this.release = function () {
                if (referCount == 0) {
                    this.gc();
                    return 0;
                }
                var i, key, c = 0;
                for (i in vars) {
                    key = vars[i].getName();
                    if (parent.getVariableContainer(key) != null) {
                        //lambdaのクロージャに捕縛されない
                        vars[i].gc();
                        vars[i] = null;
                    } else {
                        c++; //保持してる変数数
                    }
                }
                if (c == 0) {
                    vars = new Array();
                }
                return c;
            };
            //ガベージコレクト
            this.gc = function () {  //再利用完全不可
                var i;
                for (i in vars) {
                    vars[i].gc();
                    vars[i] = null;
                }
                vars = null;
                parent = null;
            };
        }

        /////////////////////////////////////////////////////////////////////// VariableManager
        //  変数コンテナの管理
        ///////////////////////////////////////////////////////////////////////////////////////


        var Containers = new Array(); //コンテナリスト（捕縛スコープ参照、およびgc用）
        
        var addNewContainer = function (parent) {
            var VC = new VariableContainer(parent);
            Containers[VC.getID()] = VC;
            return VC;
        };
        
        var getContainer = function (id) {
            if (Containers[id]) {
                return Containers[id];
            } else {
                return null;
            }
        };
        
        var releaseContainer = function (VC) {
            VC.release();
            if (VC.NonReference()) {
                Containers[VC.getID()] = null;
            }
        };
        
        //--------------------------------------------------------------------- VariableManager
        //  removeAll               全ての変数を削除する（使用は要注意）
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

        //--------------------------------------------------------------------- VariableManager
        //  変数コンテナのID
        //-------------------------------------------------------------------------------------
        
        var CurrentVCID  = 0;
    
        var nextVCID = function () { return CurrentVCID++; };        
        
        /////////////////////////////////////////////////////////////////////// VariableManager
        //  変数のスコープの管理
        ///////////////////////////////////////////////////////////////////////////////////////

        var SCOPE_LEXICAL = 0;
        var SCOPE_DYNAMIC = 1;
        
        var scope = SCOPE_DYNAMIC;
        
        this.isLexical = function () { return (scope == SCOPE_LEXICAL); };
        this.isDynamic = function () { return (scope == SCOPE_DYNAMIC); };
        this.setLexical = function () { scope = SCOPE_LEXICAL; removeAll(); }; //全ての変数がリセットされるので要注意
        this.setDynamic = function () { scope = SCOPE_DYNAMIC; removeAll(); }; //全ての変数がリセットされるので要注意

        
        //グローバルスコープの変数コンテナ
        var GlobalVariableContainer = addNewContainer(null);
        
        //現在のスコープの変数コンテナ
        var CurrentVariableContainer = GlobalVariableContainer;
        
        //静的スコープ時のLambda関数など別スコープ移動用
        var ContainerStack = new StackArray();
        
        
        //--------------------------------------------------------------------- VariableManager
        //  getCurrentVariableContainerID       現在のコンテナのID取得
        //-------------------------------------------------------------------------------------
        this.getCurrentVariableContainerID = function () {
            CurrentVariableContainer.increaseReferCount();
            return CurrentVariableContainer.getID();
        };
        
        
        //--------------------------------------------------------------------- VariableManager
        //  getVariable             変数の取得
        //-------------------------------------------------------------------------------------
        this.getVariable = function (key) {
            var tmp;
            tmp = CurrentVariableContainer.getVariableContainer(key);
            if (tmp != null) {
                return tmp.getVariable(key);
            } else {
                return null;
            }
        };
        
        //--------------------------------------------------------------------- VariableManager
        //  setCurrentVariable          現在のスコープへの変数の設定
        //-------------------------------------------------------------------------------------
        this.setCurrentVariable = function (key, data) {
            CurrentVariableContainer.setVariable(key, data);
        };
        
        //--------------------------------------------------------------------- VariableManager
        //  setBindVariable             keyがバインドされてる最寄のスコープに上書き
        //-------------------------------------------------------------------------------------
        this.setBindVariable = function (key, data) {
            var tmp;
            tmp = CurrentVariableContainer.getVariableContainer(key);
            if (tmp != null) {
                tmp.setVariable(key, data);
                return true;
            } else {
                return false;
            }
        };
        
        //--------------------------------------------------------------------- VariableManager
        //  setGlobalVariable           グローバルスコープへの変数の設定
        //-------------------------------------------------------------------------------------
        this.setGlobalVariable = function (key, data) {
            GlobalVariableContainer.setVariable(key, data);
        };
    
        //--------------------------------------------------------------------- VariableManager
        //  setScopeGlobal              現在のスコープを強制的にグローバルスコープに戻す
        //-------------------------------------------------------------------------------------
        var setScopeGlobal = function () {
            CurrentVariableContainer = GlobalVariableContainer;
        };
        this.setScopeGlobal = setScopeGlobal;
    
        //--------------------------------------------------------------------- VariableManager
        //  intoNewNest                 新しいスコープのネストに入る
        //-------------------------------------------------------------------------------------
        var intoNewNest = function () {
            CurrentVariableContainer = addNewContainer(CurrentVariableContainer);
        };
        this.intoNewNest = intoNewNest;
    
        //--------------------------------------------------------------------- VariableManager
        //  outNowNest                 現在のスコープから抜ける
        //-------------------------------------------------------------------------------------
        this.outNowScope = function () {
            var tmp = CurrentVariableContainer;
            CurrentVariableContainer = tmp.getParent();
            if (CurrentVariableContainer != null) {
                tmp.release();
                if (tmp.getReferCount() == 0) {
                    Containers[tmp.getID()] = null;
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
        this.jumptoScope = function (closedVCID) {
            if (scope == SCOPE_LEXICAL) {
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
        this.returnScope = function () {
            if (scope == SCOPE_LEXICAL) {
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