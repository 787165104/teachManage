$(function () {

    var wrapperHeight = $('body').height();
    if(typeof flag != 'undefined' && flag){
        wrapperHeight = wrapperHeight - 40 - 15;
    }

    $('#employee-manager-wrapper').height(wrapperHeight - 32);
    var height = $('#employee-manager-wrapper').height() - $('.nav-tabs').height() - 2;
    $('.tab-content').css('height', height + 'px');

    $('.widget-body', '#dept-treeview-wrapper').height($('#employee-manager-wrapper').height() - 43);

    $('#employee-manager-wrapper').split({
        orientation: 'vertical',
        limit: 100,
        position: '30%',
        onDragEnd: function () {
            $(window).triggerHandler('resize.jqGrid');
        },
        onDrag: function () {
            $(window).triggerHandler('resize.jqGrid');
        }
    });

});

$(function () {

    initValidate('#addUserForm');
    initValidate('#editUserForm');

    // 初始化编辑模版 appInfo 列表
    // 初始化应用分配控件
    var editAppIds_dualListbox = $('#appIdsEdit').bootstrapDualListbox({
        infoTextFiltered: '<span class="label label-purple label-lg">Filtered</span>',
        nonSelectedListLabel: '<span class="label label-danger arrowed-right">未分配</span>',
        selectedListLabel: '<span class="label label-success arrowed-in">已分配</span>',
        selectorMinimalHeight : 200
    });
    var editAppIds_dualListbox_container = editAppIds_dualListbox.bootstrapDualListbox('getContainer');
    editAppIds_dualListbox_container.find('.btn').addClass('btn-white btn-info btn-bold');

    // 初始化添加模版的 appInfo 列表
    $('select[name="appIds[]"]').html('');
    $.ajax({
        url : ParentUrl + '/userApps/getUserAppInfo',
        type : 'post',
        data : {},
        success : function(rs){
            if(rs && rs.length){
                for(var i = 0; i < rs.length; i++){
                    var item = rs[i];
                    var selected = item.checked ? 'selected="selected"' : '';
                    var option = $('<option value="' + item.appId + '" ' + selected + ' >'+ item.appName +'</option>');

                    $('#appIds').append(option);
                }
            }

            // 初始化应用分配控件
            var appIds_dualListbox = $('#appIds').bootstrapDualListbox({
                infoTextFiltered: '<span class="label label-purple label-lg">Filtered</span>',
                nonSelectedListLabel: '<span class="label label-danger arrowed-right">未分配</span>',
                selectedListLabel: '<span class="label label-success arrowed-in">已分配</span>',
                selectorMinimalHeight : 200
            });
            var appIds_dualListbox_container = appIds_dualListbox.bootstrapDualListbox('getContainer');
            appIds_dualListbox_container.find('.btn').addClass('btn-white btn-info btn-bold');
        }
    });


    $('#btnAddUser').click(function(){

        if($('#addUserForm').valid()){
            addUser();
        }
    });

    $('#btnEditUser').click(function(){
       if($('#editUserForm').valid()){
           editUser();
       }
    });

    $('input[name="departmentName"]').click(function(){

        var $self = $(this);
        var p = $self.closest('.form-group');
        var deptId = $('input[name="department"]', p).val();

        showDeptInfoTree(function(o){

            $self.val(o.deptName);
            $('input[name="department"]', p).val(o.deptId);

        }, deptId);
    });

});

// 设置添加用户时候默认的部门信息
function setAddUserDefaultDeptInfo(o) {
    $('input[name="department"]', '#addUserForm').val(o.deptId);
    $('input[name="departmentName"]', '#addUserForm').val(o.deptName);
}

function addUser(){
    var zeroModal_addUser = zeroModal.loading(4);

    var data = $('#addUserForm').serializeJSON();

    var isOk = true;
    $.ajax({
        url : ParentUrl + '/usermanage/addUserInfo',
        type : 'POST',
        data : data,
        async : false,
        success : function(rs) {
            if(rs.status) {
                successMsg('操作提示',rs.msg, zeroModal_addUser, rs.msgDetail, function(){

                    clearForm('addUserForm');

                    employee_list.reloadUserGrid('', '', '', false);
                });
            } else {
                errorMsg('操作提示', rs.msg, zeroModal_addUser);
                isOk = false;
            }
        },
        error : function(){
            errorMsg('操作提示', '系统异常或网络原因,用户添加失败!', zeroModal_addUser);
            isOk = false;
        }
    });

    return isOk;
};

function initValidate(formId){

    $(formId).validate({
        errorElement: 'div',
        errorClass: 'help-block',
        focusInvalid: false,
        ignore: "",
        rules: {
            userEmail: {
                email:true
            },
            loginPwd: {
                required: '#editUserForm' == formId ? false : true,
                minlength: 5
            },
            userName: {
                required: true
            },
            loginId : {
                required: true
            },
            userPhone : {
                digits : true
            }
        },

        messages: {
            userEmail: {
                email: "请输入有效的邮箱."
            },
            loginPwd: {
                required: "请输入密码.",
                minlength: "密码长度不短于5位."
            },
            userPhone : {
                digits : "必须为整数"
            },
            loginId: "请输入登录名",
            userName : "请输入用户名"
        },


        highlight: function (e) {
            $(e).closest('.form-group').removeClass('has-info').addClass('has-error');
        },

        success: function (e) {
            $(e).closest('.form-group').removeClass('has-error'); //.addClass('has-info');
            $(e).remove();
        },
        submitHandler: function (form) {
        },
        invalidHandler: function (form) {
        }
    });
};

function clearForm(formId){
    $('input', '#' + formId).each(function(){
       $(this).val('');
    });

    $('select[name="appIds[]"]', '#' + formId).get(0).selectedIndex = -1;
    $('select[name="appIds[]"]', '#' + formId).bootstrapDualListbox('refresh', true);
};

// 初始化编辑面板
function initEditPanel(loginId) {
    var zeroModal_loadModelId = zeroModal.loading(4);
    
    var data = {
        loginId : loginId
    };

    $('#appIdsEdit').html('');

    $.ajax({
        url : ParentUrl + '/usermanage/getUserInfoDetail',
        type : 'post',
        data :  data,
        success : function (rs) {
            if(!rs.msg) {

                var userItem = rs.userInfo;

                for(var i in userItem) {
                    var inputSelector = 'input[name="' + i + '"]';
                    var $input = $(inputSelector, '#editUserForm');
                    if($input.length){
                        $input.val(userItem[i]);
                    }
                }
               
                $('select[name="admin"]','#editUserForm').val(String(userItem.admin));

                var deptInfo = rs.deptInfo;
                if(deptInfo) {
                    $('input[name="departmentName"]', '#editUserForm').val(deptInfo.deptName);
                }

                var lstAppInfo = rs.lstAppInfo;

                if(lstAppInfo && lstAppInfo.length){
                    for(var i = 0; i < lstAppInfo.length; i++){
                        var item = lstAppInfo[i];
                        var selected = item.checked ? 'selected="selected"' : '';
                        var option = $('<option value="' + item.appId + '" ' + selected + ' >'+ item.appName +'</option>');

                        $('#appIdsEdit').append(option);
                    }

                    $('select[name="appIds[]"]', '#editUserForm').bootstrapDualListbox('refresh', true);
                }

                zeroModal.close(zeroModal_loadModelId);

                setTimeout(function(){$('#edit').scrollTop(0);}, 300);

            } else {
                errorMsg('操作提示', rs.msg, zeroModal_loadModelId, rs.msgDetail);
            }
        },
        error : function (rs) {
            errorMsg('操作提示', '系统异常或网络原因,用户信息加载失败!', zeroModal_loadModelId);
        }
    });
};

var editUserStatusInfo_timer;
function editUser() {

    var zeroModal_editUser = zeroModal.loading(4);
    var $span = $('<span style="display: block;width: 250px;text-align: center;font-size: 9em;color: #aaa;margin-top: -120px;"></span>');
    $('div[zero-unique-loading="' + zeroModal_editUser +'"]').append($span);

    editUserStatusInfo_timer = setInterval(function () {

        $.ajax({
            url: ParentUrl + '/usermanage/getEditUserStatusInfo',
            type: 'post',
            data: {},
            success: function (rs) {
                $span.html(rs.editUserStatusInfo);
            },
            error: function (rs) {

            }
        });

    }, 1);

    var data = $('#editUserForm').serializeJSON();

    var isOk = true;
    $.ajax({
        url : ParentUrl + '/usermanage/editUserInfo',
        type : 'POST',
        data : data,
        async : false,
        success : function(rs) {

            if(editUserStatusInfo_timer){
                clearInterval(editUserStatusInfo_timer);
                editUserStatusInfo_timer = null;
                zeroModal.close(zeroModal_editUser);
            }

            if(rs.status) {
                successMsg('操作提示',rs.msg, zeroModal_editUser, rs.msgDetail, function(){

                    clearForm('editUserForm');
                    employee_list.reloadUserGrid('', '', '', true, true);
                });
            } else {
                errorMsg('操作提示', rs.msg, zeroModal_editUser);
                isOk = false;
            }
        },
        error : function(){

            if(editUserStatusInfo_timer){
                clearInterval(editUserStatusInfo_timer);
                editUserStatusInfo_timer = null;
                zeroModal.close(zeroModal_editUser);
            }

            errorMsg('操作提示', '系统异常或网络原因,用户添加失败!', zeroModal_editUser);
            isOk = false;
        }
    });

    return isOk;
}