$(function () {

    var wrapperHeight = $('body').height();
    if(typeof flag != 'undefined' && flag){
        wrapperHeight = wrapperHeight - 40 - 15;
    }
    $('#application-store-wrapper').height(wrapperHeight - 24);

    $('#application-store-wrapper').ace_scroll({
        size: $('#application-store-wrapper').height(),
        //styleClass: 'scroll-left scroll-margin scroll-thin scroll-dark scroll-light no-track scroll-visible'
    });


    $('#application-list-wrapper').on('click', '.pricing-span', function () {
        
        var appId = $(this).attr('data-id');
        getAppProdDetail(appId);
    });

    // 初始化类型
    $('.appCategoryList').on('click', 'a', function () {

        var categoryId = $(this).attr('data-id');

        $('li', '.appCategoryList').removeClass('active');
        $(this).closest('li').addClass('active');

        if(categoryId === '0'){
            $('#application-list-wrapper').html('');
            var zeroModal_loading = zeroModal.loading(4);
            initStorePage();
            zeroModal.close(zeroModal_loading);
        } else {
            appStoreList(ParentUrl + '/appStoreView/listByCategory', {categoryId : categoryId, page : 1, rows : 1000});
        }
    });

    $.ajax({
        url : ParentUrl + '/appCategory/list',
        type : 'post',
        data : {},
        success : function (rs) {
            if(rs){
                for(var i = 0; i < rs.length; i++) {

                    var item = rs[i];
                    var categoryId = item.appCategoryId;
                    var categoryName = item.appCategoryName;

                    var activieCls = i == 0 ? 'class="active"' : '';

                    var html = '<li ' + activieCls + '>' +
                                '<a href="javascript:void(0);" data-id="'+ categoryId +'">' +
                                '<i class="menu-icon fa fa-puzzle-piece"></i>' +
                                '<span class="menu-text"> ' + categoryName +' </span>' +
                                '</a>' +
                                '<b class="arrow"></b>' +
                                '</li>';

                    $('.appCategoryList').append(html);
                }
            }
        },
        error : function () {

        }
    });

    initStorePage();

    // 搜索框 事件处理...
    $('#appStore-search-input').keydown(function(e){
        if(e.keyCode == 13){
            $('li', '.appCategoryList').removeClass('active');

            var val = $(this).val();
            if(val){
                appStoreList(ParentUrl + '/appStoreView/search', {key : val, page : 1, rows : 1000})
            } else {
                $('#application-list-wrapper').html('');
                var zeroModal_loading = zeroModal.loading(4);
                initStorePage();
                zeroModal.close(zeroModal_loading);
            }

            return false;
        }
    });
});

function buildModal(item, modalHeight){

        var imageHeight = modalHeight - 15 - 68;

        var html =  '<div class="pricing-span app_product" data-id="'+ item.appId +'">'+
                    '<div class="widget-box pricing-box-small widget-color-red3">'+
                    '<div class="widget-body">'+
                    '<div class="widget-main">'+
                    '<img src="' + item.cover +'" style="height: '+ imageHeight +'px !important;">'+
                    '<ul class="list-unstyled list-striped pricing-table" style="margin: 0px;">'+
                    '<li style="padding: 5px 10px;"> '+ item.appName +' </li>'+
                    '<li style="">'+
                    '<div class="rating inline">'+
                    '<i data-alt="1" class="star-on-png" title="bad"></i>'+
                    '<i data-alt="2" class="star-on-png" title="poor"></i>'+
                    '<i data-alt="3" class="star-on-png" title="regular"></i>'+
                    '<i data-alt="4" class="star-on-png" title="good"></i>'+
                    '<i data-alt="5" class="star-on-png" title="gorgeous"></i>'+
                    '<i class="text-muted">(16000)</i>'+
                    '</div>'+
                    '<div class="price" style="height: 20px;">'+
                    '<span class="label label-sm label-inverse arrowed-in arrowed-in-right" style="float: right;">'+
                    '<small>免费</small>'+
                    '</span>'+
                    '</div>'+
                    '</li>'+
                    '</ul>'+
                    '</div>'+
                    '</div>'+
                    '</div>'+
                    '</div>';

    return $(html);
};

function buildDetailModal(item) {

    var appStoreInfo = item.appStoreInfo;
    var lstAppImageInfo = item.lstAppImageInfo;

    var contentHtml =  '<div class="app_pro_detail_head">' +
        '<div class="pro_icon">' +
        '<i class="'+ appStoreInfo.appIcon +'"></i>' +
        '</div>' +
        '<div class="app_pro_basic" style="">' +
        '<h3 style="margin-top: 10px;">'+ appStoreInfo.appName +'</h3>' +
        '<div class="text-muted">由 <a href="#">'+ appStoreInfo.appVendor +'</a> 提供</div>' +
        '<div>' +
        '<span>' +
        '&nbsp;<i data-alt="1" class="star-on-png" title="bad"></i>' +
        '<i data-alt="2" class="star-on-png" title="poor"></i>' +
        '<i data-alt="3" class="star-on-png" title="regular"></i>' +
        '<i data-alt="4" class="star-on-png" title="good"></i>' +
        '<i data-alt="5" class="star-on-png" title="gorgeous"></i>' +
        '<i class="text-muted">(16000)</i>' +
        '</span>' +
        '<span class="vr"></span>' +
        '<span><a href="#">'+ appStoreInfo.appCategoryName +'</a></span>' +
        '<span class="vr"></span>' +
        '<span><i>4,362,018 位用户</i></span>' +
        '</div>' +
        '</div>';

        if(appStoreInfo.add) {
            contentHtml += '<div class="btnAddAppToCompany"><button disabled="disabled" class="btn btn-sm btn-success">&nbsp;&nbsp;已添加至公司应用</button></div>';
        } else {
            contentHtml += '<div class="btnAddAppToCompany"><button class="btn btn-sm btn-info" data-id="'+ appStoreInfo.appId +'"><i class="fa fa-plus"></i>&nbsp;&nbsp;添加至公司应用</button></div>';
        }

        contentHtml += '</div>' +
        '<div class="app_pro_detail_body" style="">' +
        '<div class="tabbable" style="height: 100%;">' +
        '<ul class="nav nav-tabs" id="myTab">' +
        '<li class="active">' +
        '<a data-toggle="tab" href="#list">' +
        '概要' +
        '</a>' +
        '</li>' +
        '</ul>' +
        '<div class="tab-content">' +
        '<div id="list" class="tab-pane fade in active">' +
        '<div class="app_pro_image">';
        
        if(lstAppImageInfo.length) {

            if(lstAppImageInfo.length > 2){
                contentHtml += '<div class="slide_image_loading"><i class="fa-spinner fa-spin fa fa-spinner"></i></div>';
                contentHtml += '<div id="slides">';

                for(var i = 0; i < lstAppImageInfo.length; i++){
                    var imageItem = lstAppImageInfo[i];
                    if(imageItem.imgIndex){
                        var imageSrc = imageItem.appImage;
                        contentHtml += '<img src="' + imageSrc + '">';
                    }
                }
                contentHtml +=
                    '<a href="#" class="slidesjs-previous slidesjs-navigation"><i class="icon-chevron-left icon-large"></i></a>' +
                    '<a href="#" class="slidesjs-next slidesjs-navigation"><i class="icon-chevron-right icon-large"></i></a>' +
                    '</div>';
            } else {
                if(lstAppImageInfo[1]){
                    var imageSrc = lstAppImageInfo[1].appImage;
                    contentHtml += '<img src="' + imageSrc + '" style="width: 100%; height: 100%;">';
                }
            }
        }

        contentHtml +=
        '</div>' +
        '<div class="app_pro_info">' +
        '<div class="app_pro_desc">' +
        '<pre class="scrollable" data-size="300">' +
        appStoreInfo.appDescribe + 
        '</pre>' +
        '</div>' +
        '<hr/>' +
        '<div class="app_pro_other">' +
        '<ul>' +
        '<li class="text-muted">版本：'+ appStoreInfo.appVersion +'</li>' +
        '<li class="text-muted">最后更新日期：'+ appStoreInfo.appUpdateTime +'</li>' +
        '<li class="text-muted">语言：'+ appStoreInfo.appLanguage +'</li>' +
        '<li class="text-muted">开发者：<a href="#">'+ appStoreInfo.appDeveloper +'</a></li>' +
        '</ul>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';


    return contentHtml;
};

function  buildWidgetBox(title, url, param) {
    var boxHtml = '<div class="widget-box transparent">' +
        '<div class="widget-header">' +
        '<h4 class="widget-title lighter"> '+ title +' </h4>' +
        '<div class="widget-toolbar no-border">' +
        '<a href="#" class="toMore">' +
        '<i class="ace-icon fa fa-ellipsis-h"></i>' +
        '</a>' +
        '</div>' +
        '</div>' +
        '<div class="widget-body" style="padding: 5px 10px; padding-left: 55px;">' +
        '<div>' +
        '</div>' +
        '</div>' +
        '</div>';


    var $box = $(boxHtml);
    if(url){
        $('.toMore', $box).click(function () {
            appStoreList(url, param);
        });
    } else {
        $('.toMore', $box).hide();
    }

    return $box;
};

function buildSelection(items) {

    var selectionHtml =
                            '<div id="selection-carousel">' +
                            '<div id="carousel-selection-generic" class="carousel slide" data-ride="carousel">' +
                            '<ol class="carousel-indicators">' ;

                            for(var i = 0; i < items.length; i++){
                                if(i === 0){
                                    selectionHtml += '<li data-target="#carousel-selection-generic" data-slide-to="0" class="active"></li>';
                                } else {
                                    selectionHtml += '<li data-target="#carousel-selection-generic" data-slide-to="'+ i +'"></li>'
                                }
                            }


    selectionHtml += '</ol><div class="carousel-inner" role="listbox">';
                            for(var i = 0; i < items.length; i++){
                                var item = items[i];
                                var appId = item.appId;
                                var imagePath = item.selectionImage;
                                if(i === 0){
                                    selectionHtml += '<div data-id="'+ appId + '" class="item active"><img src="' + imagePath +'" data-holder-rendered="true" style="width: 100%; height: 250px;"></div>'
                                } else {
                                    selectionHtml += '<div data-id="'+ appId + '" class="item"><img src="' + imagePath +'" data-holder-rendered="true" style="width: 100%; height: 250px;"></div>';
                                }
                            }

    selectionHtml +=
                            '</div>' +
                            '<a class="left carousel-control" href="#carousel-selection-generic" role="button"' +
                            'data-slide="prev">' +
                            '<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>' +
                            '<span class="sr-only">Previous</span>' +
                            '</a>' +
                            '<a class="right carousel-control" href="#carousel-selection-generic" role="button"' +
                            'data-slide="next">' +
                            '<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>' +
                            '<span class="sr-only">Next</span>' +
                            '</a>' +
                            '</div>' +
                            '</div>';

    var $selectionHtml = $(selectionHtml);
    $('div.item', $selectionHtml).click(function () {
       var appId = $(this).attr('data-id');
        getAppProdDetail(appId);
    });

    return $selectionHtml;
};

function getAppProdDetail(appId) {

    var zeroModal_loading = zeroModal.loading(4);

    $.ajax({
        url : ParentUrl + '/appStore/get',
        type : 'post',
        data : {appId : appId},
        success : function (rs) {
            zeroModal.close(zeroModal_loading);

            if(rs.appStoreInfo){
                var contentHtml = buildDetailModal(rs);

                bootbox.dialog({
                    message: contentHtml,
                    size : 'large',
                    className : 'modal-app_prod'
                });

                setTimeout(function () {
                    $('#slides').slidesjs({
                        width: 620,
                        height: 390,
                        navigation: false,
                        play: {
                            active: false,
                            auto: true,
                            interval: 4000,
                            swap: true,
                            pauseOnHover: false,
                            restartDelay: 2500
                        }
                    });
                    $('.slidesjs-container', '#slides').css('boxShadow','0 4px 6px rgba(0,0,0,.2)');

                    $('.slide_image_loading').hide();

                    $('button', '.btnAddAppToCompany').click(function () {
                       var appId = $(this).attr('data-id');
                        $btn = $(this);
                       $.ajax({
                          url : ParentUrl + '/companyApps/addCompanyApps',
                           type : 'post',
                           data : {appId : appId},
                           success : function (rs) {
                               if(rs.status){
                                   $btn.parent().html('<button disabled="disabled" class="btn btn-sm btn-success">&nbsp;&nbsp;已添加至公司应用</button>');
                               } else {
                                   errorMsg('操作提示', rs.msg, null, rs.msgDetail);
                               }
                           },
                           error : function () {
                               errorMsg('操作提示', '网络异常!', null);
                           }
                       });
                    });
                }, 1000);

                $('.scrollable').each(function () {
                    var $this = $(this);
                    $(this).ace_scroll({
                        size: $this.attr('data-size') || 100
                    });
                });
            } else {
                errorMsg('操作提示', '查询不到该应用详细', zeroModal_loading);
            }
        },
        error : function () {
            errorMsg('操作提示', '网络异常!', zeroModal_loading);
        }
    });
};

function initStorePage() {

    // 初始化[精选推荐]模块
    $.ajax({
        url : ParentUrl + '/appStoreView/selectionList',
        type : 'post',
        async : false,
        data : {page : 1, rows : 6, isNotIn : true},
        success : function (rs) {
            if(rs.lstAppStoreInfo && rs.lstAppStoreInfo.length) {
                var $selectionBox = buildWidgetBox(rs.appCategoryName);
                $('#application-list-wrapper').append($selectionBox);
                var $widgetBox = $('.widget-body', $selectionBox);
                $widgetBox.append(buildSelection(rs.lstAppStoreInfo));
            }
        },
        error : function () {

        }
    });

    // 初始化[模块一]
    $.ajax({
        url : ParentUrl + '/appStoreView/viewModalList',
        type : 'post',
        async : false,
        data : {},
        success : function (rs) {

            if(rs && rs.length){
                for(var k = 0; k < rs.length; k++){
                    var modalItem = rs[k];

                    if(modalItem.lstAppStoreInfo && modalItem.lstAppStoreInfo.length) {

                        var url = modalItem.url;
                        var param = modalItem.param;

                        var $box = buildWidgetBox(modalItem.appCategoryName, ParentUrl + '/appStoreView/' + url, param);
                        $('#application-list-wrapper').append($box);

                        var widgetBox = $('.widget-body', $box);
                        var modalHeight = (widgetBox.width() - 65) * 0.19;
                        var rows = Math.ceil(modalItem.lstAppStoreInfo.length / 5);
                        for(var i = 0; i < rows; i++){
                            var $row = $('<div></div>');
                            if(i != 0){
                                $row.css('marginTop', '-7px');
                            }

                            for(var j = (i * 5); j < (i * 5) + 5; j++) {
                                var item = modalItem.lstAppStoreInfo[j];
                                if(item){
                                    var $item = buildModal(item, modalHeight);
                                    $row.append($item);
                                } else {
                                    break;
                                }
                            }

                            widgetBox.append($row);
                        }
                    }
                }
            }

        },
        error : function () {

        }
    });
};

function appStoreList(url, data) {

    $('#application-list-wrapper').html('');
    var zeroModal_loading = zeroModal.loading(4);

    $.ajax({
        url : url,
        type : 'post',
        async : true,
        data : data,
        success : function (rs) {

            zeroModal.close(zeroModal_loading);
            if(rs && rs.appCategoryName) {
                var $box = buildWidgetBox(rs.appCategoryName);
                $('#application-list-wrapper').append($box);

                if(rs.lstAppStoreInfo && rs.lstAppStoreInfo.length) {

                    var widgetBox = $('.widget-body', $box);
                    var modalHeight = (widgetBox.width() - 65) * 0.19;
                    var rows = Math.ceil(rs.lstAppStoreInfo.length / 5);
                    for(var i = 0; i < rows; i++){
                        var $row = $('<div></div>');
                        if(i != 0){
                            $row.css('marginTop', '-7px');
                        }

                        for(var j = (i * 5); j < (i * 5) + 5; j++) {
                            var item = rs.lstAppStoreInfo[j];
                            if(item){
                                var $item = buildModal(item, modalHeight);
                                $row.append($item);
                            } else {
                                break;
                            }
                        }

                        widgetBox.append($row);
                    }
                }
            } else if(rs && rs.length) {
                for(var k = 0; k < rs.length; k++){
                    var modalItem = rs[k];
                    var $box = buildWidgetBox(modalItem.appCategoryName);
                    $('#application-list-wrapper').append($box);

                    if(modalItem.lstAppStoreInfo && modalItem.lstAppStoreInfo.length) {

                        var widgetBox = $('.widget-body', $box);
                        var modalHeight = (widgetBox.width() - 65) * 0.19;
                        var rows = Math.ceil(modalItem.lstAppStoreInfo.length / 5);
                        for(var i = 0; i < rows; i++){
                            var $row = $('<div></div>');
                            if(i != 0){
                                $row.css('marginTop', '-7px');
                            }

                            for(var j = (i * 5); j < (i * 5) + 5; j++) {
                                var item = modalItem.lstAppStoreInfo[j];
                                if(item){
                                    var $item = buildModal(item, modalHeight);
                                    $row.append($item);
                                } else {
                                    break;
                                }
                            }

                            widgetBox.append($row);
                        }
                    }
                }
            }

        },
        error : function () {

        }
    });
}
