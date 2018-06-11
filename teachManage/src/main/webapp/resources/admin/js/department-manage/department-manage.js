$(function(){

    var wrapperHeight = $('body').height();
    if(typeof flag != 'undefined' && flag){
        wrapperHeight = wrapperHeight - 40 - 15;
    }

    $('#department-manager-wrapper').height(wrapperHeight - 32);
    var height = $('#department-manager-wrapper').height() - $('.nav-tabs').height() - 2;
    $('.tab-content', '#department-add-wrapper').css('height', height + 'px');
    $('.widget-body', '#department-list-wrapper').height($('#department-manager-wrapper').height() - 43);

    $('#department-manager-wrapper').split({
        orientation: 'vertical',
        limit: 100,
        position: '55%',
        onDragEnd: function () {
            $(window).triggerHandler('resize.jqGrid');
        },
        onDrag: function () {
            $(window).triggerHandler('resize.jqGrid');
        }
    });

    initValidate('#addDeptForm');
    initValidate('#editDeptForm');

    // 初始化编辑面板的 appInfo 列表
    // 初始化应用分配控件
    var editAppIds_dualListbox = $('#appIdsEdit').bootstrapDualListbox({
        infoTextFiltered: '<span class="label label-purple label-lg">Filtered</span>',
        nonSelectedListLabel: '<span class="label label-danger arrowed-right">未分配</span>',
        selectedListLabel: '<span class="label label-success arrowed-in">已分配</span>',
        selectorMinimalHeight : 200
    });
    var editAppIds_dualListbox_container = editAppIds_dualListbox.bootstrapDualListbox('getContainer');
    editAppIds_dualListbox_container.find('.btn').addClass('btn-white btn-info btn-bold');

    // 加载 appInfo 列表
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
                selectedListLabel: '<span class="label label-success arrowed-in">已分配</span>'
            });
            var appIds_dualListbox_container = appIds_dualListbox.bootstrapDualListbox('getContainer');
            appIds_dualListbox_container.find('.btn').addClass('btn-white btn-info btn-bold');
        }
    });
    // 上级部门选择框
    $('input[name="parentDeptName"]').click(function(){

        var $self = $(this);
        var p = $self.closest('form');
        var deptId = $('input[name="parentDeptId"]', p).val();

        showDeptInfoTree(function(o){

            $self.val(o.deptName);
            $('input[name="parentDeptId"]', p).val(o.deptId);
            $('input[name="level"]', p).val(parseInt(o.level) + 1);

        }, deptId);
    });
    // 部门负责人选择框
    $('input[name="deptLeaderName"]').click(function () {
       var $self = $(this);
       var p = $self.closest('.form-group');

       var url = ParentUrl + '/usermanage/userInfoList';
       var postData = {};
        showUserList(url, postData, function (row) {
           var loginId = row.loginId;
           var userName = row.userName;

           $self.val(userName);
           $('input[name="deptLeader"]', p).val(loginId);
        });
    });

    // 保存按钮事件处理
    $('#btnAddDept').click(function () {

        if(!$('#addDeptForm').valid()){
            return false;
        }

        var zeroModal_loadId = zeroModal.loading(4);

        var data = $('#addDeptForm').serializeJSON();

        var isOk = true;
        $.ajax({
            url : ParentUrl + '/deptInfo/addDeptInfo',
            type : 'POST',
            data : data,
            success : function(rs) {
                if(rs.status) {
                    successMsg('操作提示',rs.msg, zeroModal_loadId, rs.msgDetail, function(){

                        clearForm('addDeptForm', false);

                        department_list.reloadGrid('');
                    });
                } else {
                    errorMsg('操作提示', rs.msg, zeroModal_loadId, rs.msgDetail);
                    isOk = false;
                }
            },
            error : function(){
                errorMsg('操作提示', '部门信息添加失败', zeroModal_loadId, '注：系统异常或网络原因');
                isOk = false;
            }
        });

        return isOk;
    });

    // 更新按钮点击事件处理
    var editDeptStatusInfo_timer;
    $('#btnEditDept').click(function () {

        if(!$('#editDeptForm').valid()){
            return false;
        }

        var zeroModal_loadId = zeroModal.loading(4);
        var $span = $('<span style="display: block;text-align: center;font-size: 4em;color: #aaa; position: absolute; top: 50%;"></span>');
        $span.width($(document).width());
        var left = $(document).width() * 0.46;
        $span.css('left', -left);
        $('div[zero-unique-loading="' + zeroModal_loadId +'"]').append($span);

        editDeptStatusInfo_timer = setInterval(function () {

            $.ajax({
                url: ParentUrl + '/deptInfo/getDeptEditStatusInfo',
                type: 'post',
                data: {},
                success: function (rs) {
                    $span.html(rs.deptEditStatus);
                },
                error: function (rs) {

                }
            });

        }, 1);

        var data = $('#editDeptForm').serializeJSON();
        $.ajax({
           url : ParentUrl + '/deptInfo/saveDeptInfo',
           type : 'post',
           data : data,
           success : function (rs) {

               if(editDeptStatusInfo_timer){
                   clearInterval(editDeptStatusInfo_timer);
                   editDeptStatusInfo_timer = null;
                   zeroModal.close(zeroModal_loadId);
               }

               if(rs.status){

                   successMsg('操作提示',rs.msg, zeroModal_loadId, rs.msgDetail, function(){
                       clearForm('editDeptForm', true);
                       department_list.reloadGrid('');

                       $('a[href="#add"]').tab('show');
                   });

               } else {
                   errorMsg('操作提示', rs.msg, zeroModal_loadId, rs.msgDetail);
               }
           },
           error : function () {
               if(editDeptStatusInfo_timer){
                   clearInterval(editDeptStatusInfo_timer);
                   editDeptStatusInfo_timer = null;
                   zeroModal.close(zeroModal_loadId);
               }

               errorMsg('操作提示', '部门信息更新失败', zeroModal_loadId, '注：系统异常或网络原因');
           }
        });
    });
});

// 清空表单
function clearForm(formId, clearDept){

    $('input', '#' + formId).each(function(){
        var name = $(this).attr('name');
        if(!clearDept && (name == 'parentDeptId' || name == 'parentDeptName' || name == 'level' || name == 'leaf')){

        } else {

            $(this).val('');
        }
    });

    $('select[name="appIds[]"]', '#' + formId).get(0).selectedIndex = -1;
    $('select[name="appIds[]"]', '#' + formId).bootstrapDualListbox('refresh', true);
};

function initValidate(formId){

    $(formId).validate({
        errorElement: 'div',
        errorClass: 'help-block',
        focusInvalid: false,
        ignore: "",
        rules: {
            deptName: {
                required: true
            }
        },

        messages: {
            deptName : "请输入部门名称"
        },

        highlight: function (e) {
            $(e).closest('.form-group').removeClass('has-info').addClass('has-error');
        },

        success: function (e) {
            $(e).closest('.form-group').removeClass('has-error'); //.addClass('has-info');
            $(e).remove();
        },
        submitHandler: function (form) {},
        invalidHandler: function (form) {}
    });
};

function initDeptEditPanel(deptId){
    var zeroModal_loadId = zeroModal.loading(4);

    $('#appIdsEdit').html('');

    $.ajax({
       url : ParentUrl + '/deptInfo/getDeptInfoDetail',
       type : 'post',
       data : {deptId : deptId},
       success : function (rs) {
            if(!rs.msg){

                var deptInfo = rs.deptInfo;
                for(var i in deptInfo) {
                    var inputSelector = 'input[name="' + i + '"]';
                    var $input = $(inputSelector, '#editDeptForm');
                    if($input.length){
                        $input.val(deptInfo[i]);
                    }
                }

                if(rs.parentDeptName){
                    $('input[name="parentDeptName"]', '#editDeptForm').val(rs.parentDeptName);
                }

                var lstAppInfo = rs.lstAppInfo;
                if(lstAppInfo && lstAppInfo.length){
                    for(var i = 0; i < lstAppInfo.length; i++){
                        var item = lstAppInfo[i];
                        var selected = item.checked ? 'selected="selected"' : '';
                        var option = $('<option value="' + item.appId + '" ' + selected + ' >'+ item.appName +'</option>');

                        $('#appIdsEdit').append(option);
                    }

                    $('select[name="appIds[]"]', '#editDeptForm').bootstrapDualListbox('refresh', true);
                }

                zeroModal.close(zeroModal_loadId);

                setTimeout(function(){$('#edit').scrollTop(0);}, 300);

            } else {
                errorMsg('操作提示', rs.msg, zeroModal_loadId, rs.msgDetail);
            }
       },
       error : function () {
           errorMsg('操作提示', '部门信息加载失败!', zeroModal_loadId, '注：因系统异常或网络原因');
        }
    });
};