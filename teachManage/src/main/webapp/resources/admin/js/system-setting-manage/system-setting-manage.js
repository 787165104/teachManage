$(function () {

    var wrapperHeight = $('body').height();
    if(typeof flag != 'undefined' && flag){
        wrapperHeight = wrapperHeight - 40 - 15;
    }

    $('#system-setting-manager-wrapper').height(wrapperHeight - 32);
    var height = $('#system-setting-manager-wrapper').height() - $('.nav-tabs').height() - 2;
    $('.tab-content').css('height', height + 'px');

    $.ajax({
        url : ParentUrl + '/company/getcompanyInfo',
        type : 'post',
        success : function(rs){
            if(rs){
                $('input[type="text"]','#companyInfoForm').each(function(){
                    var id = $(this).attr('id');
                    $(this).val(rs[id] || '');
                });
                $('#logoImg').attr('src', rs['logoPath']);
            }
        }
    });

    $('#btnSaveCompanyInfo').click(function(){

        var zeroModal_loadId = zeroModal.loading(4);
        var data = $('#companyInfoForm').serializeJSON();

        $.ajax({
            url : ParentUrl + '/company/saveCompanyInfo',
            type : 'post',
            data : data,
            success : function(rs){
                if(rs.status){
                    successMsg('操作提示','公司基本信息更新成功', zeroModal_loadId);
                } else {
                    errorMsg('操作提示', '公司基本信息更新失败', zeroModal_loadId);
                }
            },
            error : function () {
                errorMsg('操作提示', '系统异常或网络原因,用户添加失败!', zeroModal_loadId);
            }
        });
    });

    var v = new Date().getTime();
    $('#logoFile').fileupload({
        url : ParentUrl + '/company/uploadLogo?v=' + v,
        dataType : 'json',
        formData : {isSave : true},
        change : function(e, data){

        },
        done : function(e, data){
            // 更新时间戳～
            v = new Date().getTime();

            var rs = data.result;
            if(rs.status){
                $('#logoImg', '.logo_upload').attr('src', rs.logoPath);

                if(top.loadLogo){
                    top.loadLogo();
                }
            } else {

                errorMsg('操作提示', rs.msg);
            }
        }
    });

    $.ajax({
        url : ParentUrl + '/theme/config/getThemeSelectConfig',
        type : 'post',
        data : {themeType : 1},
        success : function(rs){
            if(rs){
                $('li', '.bgImage').remove();
                for(var i in rs){
                    var themeItem = rs[i];
                    var path = imgPath + '/bg/' + themeItem.themeValue;
                    var strHtml = '<li>' +
                        '<div class="themes-img-containter">' +
                        '<img src="'+ path +'" alt="">' +
                        '<input class="bgImageFile" name="bgImageFile" type="file" data-id="'+ themeItem.id +'"/>' +
                        '</div>' +
                        '</li>';

                    $('.bgImage').append(strHtml);
                }

                $('.bgImageFile').each(function(){
                    var id = $(this).attr('data-id');
                    var o = this;
                    var p = $(o).parent();
                    var img = $('img', p);

                    $(this).fileupload({
                        url : ParentUrl + '/theme/config/saveThemeSelectConfig',
                        formData : {id : id},
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
        url : ParentUrl + '/theme/config/getThemeSelectConfig',
        type : 'post',
        data : {themeType : 0},
        success : function(rs){
            if(rs){
                $('li', '.bgColor').remove();
                for(var i in rs){
                    var themeItem = rs[i];
                    var strHtml = '<li><a class="colorpick-btn" href="#" style="background-color: ' + themeItem.themeValue +
                        '" data-color="' + themeItem.themeValue + '" data-id="' + themeItem.id +'"></a></li>';
                    $('.bgColor').append(strHtml);
                }

                $('.colorpick-btn').colorpicker({
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
                        data : {id : id, themeValue : color},
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