$(function () {
    // 版本
    $.mask.definitions['~']='[+-]';
    $('#store_appVersion').mask('9.9.9.99');

    // 最后更新时间
    $('#store_appUpdateTime').val(new Date().Format("yyyy-MM-dd"));
    $('#store_appUpdateTime').datepicker({
        autoclose: true,
        todayHighlight: true,
        format: "yyyy-mm-dd",
        language: "zh-CN"
    });

    // 分类选择
    $('#store_appCategoryName').click(function () {
        var url = ParentUrl + '/appCategory/grid';
        showCategoryList(url,{}, function (row) {

            if(row){
                var categoryId = row.appCategoryId || '';
                var categoryName = row.appCategoryName || '';

                $('#store_appCategoryId').val(categoryId);
                $('#store_appCategoryName').val(categoryName);
            }

        });
    });

    // 初始化app商城图片上传控件
    $('input[name="appImage"]').each(function () {

       var index = parseInt($(this).attr('data-index'));
       var p = $(this).parent();

        var img = $('img', p);

        $(this).fileupload({
            url : ParentUrl + '/appStore/uploadStoreImage',
            formData : {index : index},
            dataType : 'json',
            change : function(e, data){
            },
            done : function(e, data){
                var rs = data.result;
                if(rs.status){
                    var imgUrl = rs.fileName;
                    img.attr('src', imgUrl);
                } else {
                    errorMsg('操作提示', rs.msg);
                }
            }
        });
    });

    // 保存app的商城信息
    $('#btnStoreApp').click(function () {

        var zeroModal_loadModelId = zeroModal.loading(4);
        var data = $('#storeAppForm').serializeJSON();

        $.ajax({
            url : ParentUrl + '/appStore/save',
            type : 'post',
            data : data,
            success : function (rs) {
                if(rs.status) {
                    successMsg('操作提示',rs.msg, zeroModal_loadModelId, rs.msgDetail, function(){

                        // application_list.reloadGrid('', 0, true, true);
                    });
                } else {
                    errorMsg('操作提示', rs.msg, zeroModal_loadModelId, rs.msgDetail);
                }
            },
            error : function () {
                errorMsg('操作提示', 'app商城信息保存失败', zeroModal_loadModelId, '注：系统异常或网络原因!');
            }
        });
    });

    $('a[href="#store"]').on('hidden.bs.tab', function(){
        $(this).parent().hide();
    });

    // 精选推荐
    $('#store_selection').change(function () {
       var val = $(this).val();

       if(val === '0') {
           $('a[href="#app_store_img_cover"]').tab('show');
           $('a[href="#app_store_img_selection"]').closest('li').hide();

       } else {
           $('a[href="#app_store_img_selection"]').closest('li').show();
       }
    });
});

function initStorePanel(appId) {

    var zeroModal_loadModelId = zeroModal.loading(4);

    $('#store_appId','#storeAppForm').val('');
    $('#store_appName','#storeAppForm').val('');
    $('#store_appCategoryId','#storeAppForm').val('');
    $('#store_appCategoryName','#storeAppForm').val('');
    $('#store_appDescribe','#storeAppForm').val('');
    $('#store_appVersion','#storeAppForm').val('1.0.0.00');
    $('#store_appUpdateTime','#storeAppForm').val(new Date().Format("yyyy-MM-dd"));
    $('#store_appDeveloper','#storeAppForm').val('dgt@dgtis.com');
    $('#store_appVendor','#storeAppForm').val('神州通誉');
    $('input[name="appImage"]').each(function () {

        var p = $(this).parent();
        var img = $('img', p);
        img.removeAttr('src');
    });

    $.ajax({
        url : ParentUrl + '/appStore/get',
        type : 'post',
        data : {appId : appId},
        success : function(rs){
            zeroModal.close(zeroModal_loadModelId);

            if(rs.appStoreInfo) {

                $('input', '#storeAppForm').each(function () {
                    var name = $(this).attr('name');
                    if(rs.appStoreInfo[name]){
                        $(this).val(rs.appStoreInfo[name]);
                    }
                });

                $('textarea[name="appDescribe"]', '#storeAppForm').val(rs.appStoreInfo.appDescribe);

                $('select', '#storeAppForm').each(function () {
                   var name = $(this).attr('name');
                   $('option[selected="selected"]', this).removeAttr('selected');

                   if( typeof rs.appStoreInfo[name] == 'boolean' ) {
                       var val = 0
                       if(rs.appStoreInfo[name]){
                           val = 1;
                       }
                       $(this).val(val);
                   } else {
                       if(rs.appStoreInfo[name]){
                           $(this).val(rs.appStoreInfo[name]);
                       }
                   }

                    $(this).change();
                });

                if(rs.lstAppImageInfo) {
                    for(var i = 0; i < rs.lstAppImageInfo.length; i++) {
                        var appImageInfo = rs.lstAppImageInfo[i];

                        var index = appImageInfo.imgIndex;
                        var p = $('input[data-index="' + index + '"]').parent();
                        var imgUrl = appImageInfo.appImage;
                        $('img', p).attr('src', imgUrl);
                    }
                }
            } else {
                zeroModal.alert({
                    content : '该应用尚未添加商城信息!',
                    contentDetail: '请在以下的界面中录入应用的商城信息并保存',
                    okFn : function () {
                        var appId = rs.appId;
                        var appName = rs.appName;

                        $('#store_appId').val(appId);
                        $('#store_appName').val(appName);
                    }
                });
            }


        },
        error : function () {
            errorMsg('操作提示', '获取商城信息失败!', zeroModal_loadModelId,"注：因网络原因或系统异常");
        }
    });
}