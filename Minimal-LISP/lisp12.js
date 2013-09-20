
    //------------------------------------------------------------------------- MinimalLISP
    //  VariableManager                 �ϐ��}�l�[�W��
    //-------------------------------------------------------------------------------------
    //  LastUpdate      2013/06/17
    //  Version         1.0
    //  Autoher         ���ꂨ�� (takeiteasy_idontthinkso)
    //-------------------------------------------------------------------------------------
    
    var VariableManager = new function () {
        

    
        //--------------------------------------------------------------------- VariableManager
        //  VariableContainer          �ϐ��R���e�i
        //-------------------------------------------------------------------------------------
        function VariableContainer(parent) {
            
            //�R���e�iID
            var id = nextVCID();
            
            //�Q�ƃJ�E���^
            var referCount = 0;
            
            this.increaseReferCount = function () {
                referCount++;
                if (parent != null) {
                    parent.increaseReferCount();
                }
            };
            
            this.getReferCount = function () { return referCount; };
            
            this.NonReference = function () { return (referCount == 0); };
            
            //�ϐ��f�[�^(LispData)���i�[����
            var vars = new Array();
    
            //�R���e�iID�̎擾
            this.getID = function () { return id; };
            
    
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
                if (referCount == 0) {
                    this.gc();
                    return 0;
                }
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
                if (c == 0) {
                    vars = new Array();
                }
                return c;
            };
            //�K�x�[�W�R���N�g
            this.gc = function () {  //�ė��p���S�s��
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
        //  �ϐ��R���e�i�̊Ǘ�
        ///////////////////////////////////////////////////////////////////////////////////////


        var Containers = new Array(); //�R���e�i���X�g�i�ߔ��X�R�[�v�Q�ƁA�����gc�p�j
        
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
        //  removeAll               �S�Ă̕ϐ����폜����i�g�p�͗v���Ӂj
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
        //  �ϐ��R���e�i��ID
        //-------------------------------------------------------------------------------------
        
        var CurrentVCID  = 0;
    
        var nextVCID = function () { return CurrentVCID++; };        
        
        /////////////////////////////////////////////////////////////////////// VariableManager
        //  �ϐ��̃X�R�[�v�̊Ǘ�
        ///////////////////////////////////////////////////////////////////////////////////////

        var SCOPE_LEXICAL = 0;
        var SCOPE_DYNAMIC = 1;
        
        var scope = SCOPE_DYNAMIC;
        
        this.isLexical = function () { return (scope == SCOPE_LEXICAL); };
        this.isDynamic = function () { return (scope == SCOPE_DYNAMIC); };
        this.setLexical = function () { scope = SCOPE_LEXICAL; removeAll(); }; //�S�Ă̕ϐ������Z�b�g�����̂ŗv����
        this.setDynamic = function () { scope = SCOPE_DYNAMIC; removeAll(); }; //�S�Ă̕ϐ������Z�b�g�����̂ŗv����

        
        //�O���[�o���X�R�[�v�̕ϐ��R���e�i
        var GlobalVariableContainer = addNewContainer(null);
        
        //���݂̃X�R�[�v�̕ϐ��R���e�i
        var CurrentVariableContainer = GlobalVariableContainer;
        
        //�ÓI�X�R�[�v����Lambda�֐��ȂǕʃX�R�[�v�ړ��p
        var ContainerStack = new StackArray();
        
        
        //--------------------------------------------------------------------- VariableManager
        //  getCurrentVariableContainerID       ���݂̃R���e�i��ID�擾
        //-------------------------------------------------------------------------------------
        this.getCurrentVariableContainerID = function () {
            CurrentVariableContainer.increaseReferCount();
            return CurrentVariableContainer.getID();
        };
        
        
        //--------------------------------------------------------------------- VariableManager
        //  getVariable             �ϐ��̎擾
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
        //  setCurrentVariable          ���݂̃X�R�[�v�ւ̕ϐ��̐ݒ�
        //-------------------------------------------------------------------------------------
        this.setCurrentVariable = function (key, data) {
            CurrentVariableContainer.setVariable(key, data);
        };
        
        //--------------------------------------------------------------------- VariableManager
        //  setBindVariable             key���o�C���h����Ă�Ŋ�̃X�R�[�v�ɏ㏑��
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
        //  setGlobalVariable           �O���[�o���X�R�[�v�ւ̕ϐ��̐ݒ�
        //-------------------------------------------------------------------------------------
        this.setGlobalVariable = function (key, data) {
            GlobalVariableContainer.setVariable(key, data);
        };
    
        //--------------------------------------------------------------------- VariableManager
        //  setScopeGlobal              ���݂̃X�R�[�v�������I�ɃO���[�o���X�R�[�v�ɖ߂�
        //-------------------------------------------------------------------------------------
        var setScopeGlobal = function () {
            CurrentVariableContainer = GlobalVariableContainer;
        };
        this.setScopeGlobal = setScopeGlobal;
    
        //--------------------------------------------------------------------- VariableManager
        //  intoNewNest                 �V�����X�R�[�v�̃l�X�g�ɓ���
        //-------------------------------------------------------------------------------------
        var intoNewNest = function () {
            CurrentVariableContainer = addNewContainer(CurrentVariableContainer);
        };
        this.intoNewNest = intoNewNest;
    
        //--------------------------------------------------------------------- VariableManager
        //  outNowNest                 ���݂̃X�R�[�v���甲����
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
                return false; //�e�X�R�[�v�������̂ɃX�R�[�v���甲����ُ͈̂폈��
            }
            return true;
        };
        
        //--------------------------------------------------------------------- VariableManager
        //  jumptoScope                 �ÓI�X�R�[�v���Ȃ�J�����g�X�R�[�v��ߔ��X�R�[�v�ֈړ�
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
                return true; //���I�X�R�[�v�Ȃ珈���Ȃ�
            }
        };
        
        //--------------------------------------------------------------------- VariableManager
        //  returnScope                 �ÓI�X�R�[�v���Ȃ�ߔ��X�R�[�v���猳�̃X�R�[�v�֖߂�
        //-------------------------------------------------------------------------------------
        this.returnScope = function () {
            if (scope == SCOPE_LEXICAL) {
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