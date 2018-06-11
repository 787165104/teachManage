$(function () {

    var wrapperHeight = $('body').height() - $('#navbar').height();
    if(typeof flag != 'undefined' && flag){
        wrapperHeight = wrapperHeight - 40 - 15;
    }

    $('#system-setting-manager-wrapper').height(wrapperHeight - 32);
    var height = $('#system-setting-manager-wrapper').height() - $('.nav-tabs').height() - 2;
    $('.tab-content').css('height', height + 'px');

    initValidateForCompanyInfo('#companyInfoForm');
    initValidateForCompanyInfo('#edit_companyInfoForm');

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
        url : ParentUrl + '/companyApps/getAppInfoForSelected',
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

    $('#btnAddCompanyInfo').click(function () {

        if(!$('#companyInfoForm').valid()){
            return false;
        }

        var zeroModal_loadId = zeroModal.loading(4);
        var data = $('#companyInfoForm').serializeJSON();

        $.ajax({
            url : ParentUrl + '/company/addCompanyInfo',
            type : 'post',
            data : data,
            success : function(rs){
                if(rs.status){
                    successMsg('操作提示',rs.msg, zeroModal_loadId, rs.msgDetail, function () {
                        company_list.reloadGrid('', true);

                        $('input', '#companyInfoForm').each(function () {
                           $(this).val('');
                        });
                    });
                } else {
                    errorMsg('操作提示', rs.msg, zeroModal_loadId, rs.msgDetail);
                }
            },
            error : function () {
                errorMsg('操作提示', '系统异常或网络原因,公司添加失败!', zeroModal_loadId);
            }
        });
    });

    $('#btnSaveCompanyInfo').click(function(){

        if(!$('#edit_companyInfoForm').valid()){
            return false;
        }

        var zeroModal_loadId = zeroModal.loading(4);
        var data = $('#edit_companyInfoForm').serializeJSON();

        $.ajax({
            url : ParentUrl + '/company/saveCompanyInfo',
            type : 'post',
            data : data,
            success : function(rs){
                if(rs.status){
                    successMsg('操作提示','公司基本信息更新成功', zeroModal_loadId, '', function () {
                        company_list.reloadGrid('', true, true);
                    });
                } else {
                    errorMsg('操作提示', '公司基本信息更新失败', zeroModal_loadId);
                }
            },
            error : function () {
                errorMsg('操作提示', '系统异常或网络原因,公司信息更新失败!', zeroModal_loadId);
            }
        });
    });

    var v = new Date().getTime();
    $('#logoFile').fileupload({
        url : ParentUrl + '/company/uploadLogo?v=' + v,
        dataType : 'json',
        formData : {isSave : false},
        change : function(e, data){

        },
        done : function(e, data){
            // 更新时间戳～
            v = new Date().getTime();

            var rs = data.result;
            if(rs.status){
                //$('#logoImg').attr('src', imgPath + '/logo/' + rs.logoPath);
                $('#logoImg').attr('src', rs.logoPath);
            } else {
                errorMsg('操作提示', rs.msg);
            }
        }
    });


    $.ajax({
        url : ParentUrl + '/theme/config/getThemeConfigForCreate',
        type : 'post',
        data : {themeType : 1},
        success : function(rs){
            if(rs){
                $('li', '.bgImage.add').remove();
                for(var i in rs){
                    var themeItem = rs[i];
                    var path = imgPath + '/bg/' + themeItem.themeValue;
                    var strHtml = '<li>' +
                        '<div class="themes-img-containter">' +
                        '<img src="'+ path +'" alt="">' +
                        '<input class="bgImageFile" name="bgImageFile" type="file" data-themeIndex="'+ themeItem.themeIndex +'"/>' +
                        '</div>' +
                        '</li>';

                    $('.bgImage.add').append(strHtml);
                }

                $('.bgImageFile','.bgImage.add').each(function(){
                    var themeIndex = $(this).attr('data-themeIndex');
                    var o = this;
                    var p = $(o).parent();
                    var img = $('img', p);

                    $(this).fileupload({
                        url : ParentUrl + '/theme/config/changeThemeConfig',
                        formData : {themeIndex : themeIndex},
                        dataType : 'json',
                        change : function(e, data){
                        },
                        done : function(e, data){
                            var rs = data.result;
                            if(rs.status){
                                var imgUrl = imgPath + '/bg/' + rs.themeValue;
                                img.attr('src', imgUrl);
                            } else {
                                errorMsg('操作提示', rs.msg);
                            }
                        }
                    });
                });
            }
        }
    });


    $.ajax({
        url : ParentUrl + '/theme/config/getThemeConfigForCreate',
        type : 'post',
        data : {themeType : 0},
        success : function(rs){
            if(rs){
                $('li', '.bgColor.add').remove();
                for(var i in rs){
                    var themeItem = rs[i];
                    var strHtml = '<li><a class="colorpick-btn" href="#" style="background-color: ' + themeItem.themeValue +
                        '" data-color="' + themeItem.themeValue + '" data-themeIndex="' + themeItem.id +'"></a></li>';
                    $('.bgColor.add').append(strHtml);
                }

                $('.colorpick-btn','.bgColor.add').colorpicker({
                    color : $(this).attr('data-color'),
                    align : 'left',
                    customClass : 'my_color_picker',
                    format : 'rgb'
                }).on('changeColor', function(e) {
                    var color = e.color.toString('rgba');
                    $(this).css('background-color', color);
                    $(this).attr('data-color', color);

                    var themeIndex = $(this).attr('data-themeIndex');

                    $.ajax({
                        url : ParentUrl + '/theme/config/changeThemeConfig',
                        type : 'post',
                        data : {themeIndex : themeIndex, themeColor : color},
                        success : function(rs){
                            if(rs.status){

                            } else {
                                if(rs.msg){
                                    errorMsg('操作提示', rs.msg);
                                }
                            }
                        }
                    });
                });
            }
        }
    });
});


function initCompanyEditPanel(companyId){

    // 加载 appInfo 列表
    $('select[name="appIds[]"]', '#edit_companyInfoForm').html('');
    $.ajax({
        url : ParentUrl + '/companyApps/getAppInfoForSelected',
        type : 'post',
        data : {companyId : companyId},
        success : function(rs){
            if(rs && rs.length){
                for(var i = 0; i < rs.length; i++){
                    var item = rs[i];
                    var selected = item.checked ? 'selected="selected"' : '';
                    var option = $('<option value="' + item.appId + '" ' + selected + ' >'+ item.appName +'</option>');

                    $('#appIdsEdit').append(option);
                }
            }

            // 初始化应用分配控件
            // var appIds_dualListbox = $('#appIdsEdit').bootstrapDualListbox({
            //     infoTextFiltered: '<span class="label label-purple label-lg">Filtered</span>',
            //     nonSelectedListLabel: '<span class="label label-danger arrowed-right">未分配</span>',
            //     selectedListLabel: '<span class="label label-success arrowed-in">已分配</span>',
            //     selectorMinimalHeight : 200
            // });
            // var appIds_dualListbox_container = appIds_dualListbox.bootstrapDualListbox('getContainer');
            // appIds_dualListbox_container.find('.btn').addClass('btn-white btn-info btn-bold');

            $('select[name="appIds[]"]', '#edit_companyInfoForm').bootstrapDualListbox('refresh', true);
        }
    });

    // 获取公司信息
    $.ajax({
        url : ParentUrl + '/company/getcompanyInfo',
        type : 'post',
        data : {companyId : companyId},
        success : function(rs){
            if(rs){
                $('input','#edit_companyInfoForm').each(function(){
                    var name = $(this).attr('name');
                    $(this).val(rs[name] || '');
                });
                $('#edit_logoImg').attr('src', rs['logoPath']);
            }
        }
    });

    // 获取公司的主题背景图片
    $.ajax({
        url : ParentUrl + '/theme/config/getThemeSelectConfig',
        type : 'post',
        data : {companyId : companyId, themeType : 1},
        success : function(rs){
            if(rs){
                $('li', '.bgImage.edit').remove();
                for(var i in rs){
                    var themeItem = rs[i];
                    var path = imgPath + '/bg/' + themeItem.themeValue;
                    var strHtml = '<li>' +
                        '<div class="themes-img-containter">' +
                        '<img src="'+ path +'" alt="">' +
                        '<input class="bgImageFile" name="bgImageFile" type="file" data-id="'+ themeItem.id +'"/>' +
                        '</div>' +
                        '</li>';

                    $('.bgImage.edit').append(strHtml);
                }

                $('.bgImageFile', '.bgImage.edit').each(function(){
                    var id = $(this).attr('data-id');
                    var o = this;
                    var p = $(o).parent();
                    var img = $('img', p);

                    $(this).fileupload({
                        url : ParentUrl + '/theme/config/saveThemeSelectConfig',
                        formData : {id : id, companyId : companyId},
                        dataType : 'json',
                        change : function(e, data){
                        },
                        done : function(e, data){
                            var rs = data.result;
                            if(rs.status){
                                var imgUrl = imgPath + '/bg/' + rs.themeValue;
                                img.attr('src', imgUrl);
                            } else {
                                errorMsg('操作提示', rs.msg);
                            }
                        }
                    });
                });
            }
        }
    });

    // 获取公司的主题背景颜色
    $.ajax({
        url : ParentUrl + '/theme/config/getThemeSelectConfig',
        type : 'post',
        data : {companyId : companyId, themeType : 0},
        success : function(rs){
            if(rs){
                $('li', '.bgColor.edit').remove();
                for(var i in rs){
                    var themeItem = rs[i];
                    var strHtml = '<li><a class="colorpick-btn" href="#" style="background-color: ' + themeItem.themeValue +
                        '" data-color="' + themeItem.themeValue + '" data-id="' + themeItem.id +'"></a></li>';
                    $('.bgColor.edit').append(strHtml);
                }

                $('.colorpick-btn', '.bgColor.edit').colorpicker({
                    color : $(this).attr('data-color'),
                    align : 'left',
                    customClass : 'my_color_picker',
                    format : 'rgb'
                }).on('changeColor', function(e) {
                    var color = e.color.toString('rgba');
                    $(this).css('background-color', color);
                    $(this).attr('data-color', color);

                    var id = $(this).attr('data-id');

                    $.ajax({
                        url : ParentUrl + '/theme/config/saveThemeSelectConfig',
                        type : 'post',
                        data : {id : id, themeValue : color, companyId : companyId},
                        success : function(rs){
                            if(rs.status){

                            } else {
                                if(rs.msg){
                                    errorMsg('操作提示', rs.msg);
                                }
                            }
                        }
                    });
                });
            }
        }
    });

    // 更新logo
    var v = new Date().getTime();
    $('#edit_logoFile').fileupload({
        url : ParentUrl + '/company/uploadLogo?v=' + v,
        dataType : 'json',
        formData : {isSave : true, companyId : companyId},
        change : function(e, data){

        },
        done : function(e, data){
            // 更新时间戳～
            v = new Date().getTime();

            var rs = data.result;
            if(rs.status){
                $('#edit_logoImg').attr('src', rs.logoPath);
            } else {
                errorMsg('操作提示', rs.msg);
            }
        }
    });
}

function initValidateForCompanyInfo(formId){

    $.mask.definitions['~']='[+-]';
    $('#adminUser').mask('99999999999');

    jQuery.validator.addMethod("adminUser", function (value, element) {
        return this.optional(element) || /^\d{11}$/.test(value);
    }, "输入有效手机号");

    $(formId).validate({
        errorElement: 'div',
        errorClass: 'help-block',
        focusInvalid: false,
        ignore: "",
        rules: {
            companyFullName: {
                required: true
            },
            companyName: {
                required: true
            },
            adminUser: {
                required: true,
                adminUser : 'required'
            }
        },

        messages: {
            companyFullName : "请输入公司全称",
            companyName : "请输入显示名称"
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