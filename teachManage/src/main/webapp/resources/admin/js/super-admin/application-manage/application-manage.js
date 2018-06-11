$(function(){

    var wrapperHeight = $('body').height() - $('#navbar').height();;
    if(typeof flag != 'undefined' && flag){
        wrapperHeight = wrapperHeight - 40 - 15;
    }

    $('#application-manager-wrapper').height(wrapperHeight - 32);
    var height = $('#application-manager-wrapper').height() - $('.nav-tabs').height() - 2;
    $('.tab-content.app').css('height', height + 'px');
    $('.tab-content.store').css('height', (height - 40) + 'px');

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

    // 应用类型选项 change 事件
    $('select[name="appType"]').change(function () {

        var appType = $(this).val();

        var $form = $(this).closest('form');
        var $littelAppId = $('input[name = "littelAppId"]', $form);
        var $parent_littelAppId = $littelAppId.closest('.form-group');
        var $littelUrl = $('input[name = "littelAppUrl"]', $form);
        var $parent_littelUrl = $littelUrl.closest('.form-group');

        if(appType == 0) {
            $littelAppId.attr('disabled', 'disabled');
            $parent_littelAppId.hide();

            $littelUrl.attr('disabled', 'disabled');
            $parent_littelUrl.hide();
        } else if(appType == 1) {
            $littelAppId.removeAttr('disabled');
            $parent_littelAppId.show();

            $littelUrl.removeAttr('disabled');
            $parent_littelUrl.show();
        } else if (appType == 2) {
            $littelAppId.attr('disabled', 'disabled');
            $parent_littelAppId.hide();

            $littelUrl.removeAttr('disabled');
            $parent_littelUrl.show();
        } else if (appType == 3) {
            $littelAppId.removeAttr('disabled');
            $parent_littelAppId.show();

            $littelUrl.removeAttr('disabled');
            $parent_littelUrl.show();
        }
    });

    // 是否 widget change 事件处理
    $('select[name="widget"]').change(function () {

        var widget = $(this).val();

        var $form = $(this).closest('form');

        var $sourceCode = $('input[name = "sourceCode"]', $form);
        var $parent_sourceCode = $sourceCode.closest('.form-group');

        var $widgetWidth = $('select[name = "widgetWidth"]', $form);
        var $parent_widgetWidth = $widgetWidth.closest('.form-group');

        var $widgetHeight = $('select[name = "widgetHeight"]', $form);
        var $parent_widgetHeight = $widgetHeight.closest('.form-group');

        if(widget == 1) {
            $sourceCode.removeAttr('disabled');
            $parent_sourceCode.show();

            $widgetWidth.removeAttr('disabled');
            $parent_widgetWidth.show();

            $widgetHeight.removeAttr('disabled');
            $parent_widgetHeight.show();
        } else {
            $sourceCode.attr('disabled', 'disabled');
            $parent_sourceCode.hide();

            $widgetWidth.attr('disabled', 'disabled');
            $parent_widgetWidth.hide();

            $widgetHeight.attr('disabled', 'disabled');
            $parent_widgetHeight.hide();
        }
    });

    // 是否同步 change 事件处理
    $('select[name="addUser"]').change(function () {

        var addUser = $(this).val();

        var $form = $(this).closest('form');

        var $synchUserUrl = $('input[name = "synchUserUrl"]', $form);
        var $parent_synchUserUrl = $synchUserUrl.closest('.form-group');

        var $synchDelUrl = $('input[name = "synchDelUrl"]', $form);
        var $parent_synchDelUrl = $synchDelUrl.closest('.form-group');

        var $synchDeptUrl = $('input[name = "synchDeptUrl"]', $form);
        var $parent_synchDeptUrl = $synchDeptUrl.closest('.form-group');

        if(addUser == 1) {
            $synchUserUrl.removeAttr('disabled');
            $parent_synchUserUrl.show();

            $synchDelUrl.removeAttr('disabled');
            $parent_synchDelUrl.show();

            $synchDeptUrl.removeAttr('disabled');
            $parent_synchDeptUrl.show();
        } else {
            $synchUserUrl.attr('disabled', 'disabled');
            $parent_synchUserUrl.hide();

            $synchDelUrl.attr('disabled', 'disabled');
            $parent_synchDelUrl.hide();

            $synchDeptUrl.attr('disabled', 'disabled');
            $parent_synchDeptUrl.hide();
        }
    });

    // 添加应用信息
    $('#btnAddApp').click(function () {

        if($('#addAppForm').valid()){

            var zeroModal_addApp = zeroModal.loading(4);
            var data = $('#addAppForm').serializeJSON();
            data.fromSource = 1;
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
            data.fromSource = 1;

            $.ajax({
                url : ParentUrl + '/appinfomanage/edit',
                type : 'POST',
                data : data,
                async : false,
                success : function(rs) {
                    if(rs.status) {
                        successMsg('操作提示',rs.msg, zeroModal_addApp, rs.msgDetail, function(){

                            $('input', '#addAppForm').each(function(){
                                $(this).val('');
                            });
                            application_list.reloadGrid('', 0, 0,true, true);
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
function initAppEditPanel(appId){
    var zeroModal_loadModelId = zeroModal.loading(4);

    var data = {
        appId : appId
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
};