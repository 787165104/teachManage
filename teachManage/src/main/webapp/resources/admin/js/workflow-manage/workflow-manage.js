$(function(){

    var wrapperHeight = $('body').height();
    if(typeof flag != 'undefined' && flag){
        wrapperHeight = wrapperHeight - 40 - 15;
    }

    $('#application-manager-wrapper').height(wrapperHeight - 32);
    var height = $('#application-manager-wrapper').height() - $('.nav-tabs').height() - 2;
    $('.tab-content').css('height', height + 'px');

    initValidateForApp('#addAppForm');
    initValidateForApp('#editAppForm');

    // 初始化 icon 数据和控件
    var $appIconName = $('input[name = "appIconName"]');
    $appIconName.click(function () {
        var $self = $(this);
        var p = $self.closest('.form-group');
        var $appIcon = $('input[name="appIcon"]', p);
        var $i = $('.ace-icon', p);

       showIconList(function (iconClass) {
           $self.val(iconClass);
           $appIcon.val(iconClass);

           $i.attr('class', 'ace-icon green ' + iconClass);
       });
    });




    // 添加应用信息
    $('#btnAddApp').click(function () {

        if($('#addAppForm').valid()){

            var zeroModal_addApp = zeroModal.loading(4);
            var data = $('#addAppForm').serializeJSON();

            $.ajax({
                url : ParentUrl + '/appinfomanage/add',
                type : 'POST',
                data : data,
                async : false,
                success : function(rs) {
                    if(rs.status) {
                        successMsg('操作提示',rs.msg, zeroModal_addApp, rs.msgDetail, function(){

                            $('input', '#addAppForm').each(function(){
                                $(this).val('');
                            });

                            application_list.reloadGrid('', 0);
                        });
                    } else {
                        errorMsg('操作提示', rs.msg, zeroModal_addApp, rs.msgDetail);
                    }
                },
                error : function(){
                    errorMsg('操作提示', '系统异常或网络原因,用户添加失败!', zeroModal_addApp);
                }
            });
        }
    });

    // 编辑应用信息
    $('#btnEditApp').click(function () {

        if($('#editAppForm').valid()){

            var zeroModal_addApp = zeroModal.loading(4);
            var data = $('#editAppForm').serializeJSON();

            $.ajax({
                url : ParentUrl + '/ActivitiManageController/setAssignee',
                type : 'POST',
                data : data,
                async : false,
                success : function(rs) {
                    if(rs.status) {
                        successMsg('操作提示',rs.msg, zeroModal_addApp, rs.msgDetail, function(){

                            $('input', '#addAppForm').each(function(){
                                $(this).val('');
                            });

                            application_list.reloadGrid('', 0, true, true);
                        });
                    } else {
                        errorMsg('操作提示', rs.msg, zeroModal_addApp, rs.msgDetail);
                    }
                },
                error : function(){
                    errorMsg('操作提示', '系统异常或网络原因,用户添加失败!', zeroModal_addApp);
                }
            });
        }
    });
    
 // 部门负责人选择框
    $('input[name="taskUser"]').click(function () {
       var $self = $(this);
       var p = $self.closest('.form-group');

       var url = ParentUrl + '/usermanage/userInfoList';
       var postData = {};
        showUserList(url, postData, function (row) {
           var loginId = row.loginId;
           var userName = row.userName;

           $self.val(userName);
           $('input[name="taskAssignee"]', p).val(loginId);
        });
    });
});

function formatState (state) {

    if (!state.id) {
        return state.text;
    }

    var $state = $(
        '<span><i class="' + state.element.value + '" /> ' + state.text + '</span>'
    );
    return $state;
};

function initValidateForApp(formId){

    $(formId).validate({
        errorElement: 'div',
        errorClass: 'help-block',
        focusInvalid: false,
        ignore: "",
        rules: {
            appName: {
                required: true
            }
        },

        messages: {
            appName : "请输入应用程序名称"
        },

        highlight: function (e) {
            $(e).closest('.form-group').removeClass('has-info').addClass('has-error');
        },

        success: function (e) {
            $(e).closest('.form-group').removeClass('has-error'); //.addClass('has-info');
            $(e).remove();
        }
    });
};

// 初始化应用信息编辑面板
function initAppEditPanel(taskId,taskName,taskAssignee){
    var zeroModal_loadModelId = zeroModal.loading(4);
    
    debugger;
    
    var $inputTaskId = $('input[name="taskId"]', '#editAppForm');
    $inputTaskId.val(taskId);
    
    var $inputTaskUser = $('input[name="taskUser"]', '#editAppForm');
    $inputTaskUser.val(taskName);
    
    var $inputTaskAssignee = $('input[name="taskAssignee"]', '#editAppForm');
    $inputTaskAssignee.val(taskAssignee);
    
    
    
    
    
    zeroModal.close(zeroModal_loadModelId);

    setTimeout(function(){$('#edit').scrollTop(0);}, 300);
    
    /*

    var data = {
        appId : taskId
    };

    $.ajax({
        url : ParentUrl + '/appinfomanage/get',
        type : 'post',
        data : data,
        success : function (rs) {
            if(rs){
                for(var i in rs){
                    var inputSelector = 'input[name="' + i + '"]';
                    var $input = $(inputSelector, '#editAppForm');
                    if($input.length) {
                        $input.val(rs[i]);

                        if(i == 'appIcon') {
                            var p = $input.parent();
                            $('input[name="appIconName"]',p).val(rs[i]);
                            $('i.ace-icon', p).attr('class', 'ace-icon green ' + rs[i]);
                        }
                        continue;
                    }

                    var selectSelector = 'select[name="' + i + '"]';
                    var $select = $(selectSelector, '#editAppForm');
                    if($select.length){
                        if((typeof rs[i]) == 'boolean'){
                            if(rs[i]){
                                $select.val(1);
                            } else {
                                $select.val(0);
                            }
                        } else {
                            $select.val(rs[i]);
                        }

                        $select.change();
                    }
                }

                zeroModal.close(zeroModal_loadModelId);

                setTimeout(function(){$('#edit').scrollTop(0);}, 300);
            } else {
                errorMsg('操作提示', '查询不到该应用信息', zeroModal_loadModelId, '', function () {
                    $('a[href="#list"]').tab('show');
                });
            }
        },
        error : function (rs) {
            errorMsg('操作提示', '系统异常或网络原因,用户添加失败!', zeroModal_loadModelId);
        }
    });
    
    */
    
    
};