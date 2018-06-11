
$(function () {

    setFontMiddle = function (containterDiv, fontDiv) {
        var containterDivHeight = parseInt(containterDiv.css('height'));
        var fontDivHeight = parseInt(fontDiv.css('height'));

        var fontTop = (containterDivHeight - fontDivHeight) / 2;
        fontDiv.css('top', fontTop + 'px');
    };

    setIconLocation = function (containterDiv, fontDiv) {
//        var containterDivWidth = parseInt(containterDiv.css('width'));
//        var fontDivWidth = parseInt(fontDiv.css('width'));

//        var fontleft = containterDivWidth / 2 - fontDivWidth /2;
//        fontDiv.css('left', fontleft + 'px');

        var parentheight = containterDiv.height();
        var parentwidth = containterDiv.width();
        if (fontDiv.find(".settingBtn").size() > 0) {
            var setsize = parentheight > parentwidth ? parentwidth : parentheight;
            var imgheight = setsize / 3;
            var imgwidth = setsize / 3; ;
            var dvsettingtop = parentheight / 2 - imgheight / 2;
            var dvsettingleft = parentwidth / 2 - imgwidth - 3;
            fontDiv.css({ "top": dvsettingtop + "px", "left": dvsettingleft + "px" });
            fontDiv.find("img").css({ "width": imgwidth + "px", "height": imgheight + "px" });
            fontDiv.find(".settingBtn").css({ "margin-right": "6px" });
        } else {
            var setheigth = parentheight > parentwidth ? parentwidth : parentheight;
            var imgheight = setheigth / 3;
            var imgwidth = setheigth / 3; ;
            var dvsettingtop = parentheight / 2 - imgheight / 2;
            var dvsettingleft = parentwidth / 2 - imgwidth / 2;
            fontDiv.css({ "top": dvsettingtop + "px", "left": dvsettingleft + "px" });
            fontDiv.find("img").css({ "width": imgwidth + "px", "height": imgheight + "px" });
        }
    };

    //预览图标颜色
    $("#settingboxbgcolor li").click(function () {
        var iconColorCreate = $(this).css('background-color');
        $("#iconPre").css('background-color', iconColorCreate);
    });

    //预览图标尺寸
    $("#SelectWidth,#SelectHeight").change(function () {
        var total = 280;
        var fontSizeW = $("#SelectWidth option:selected").text() * 50;
        var sizeleft = (total - fontSizeW) / 2 + "px";
        var fontSizeH = $("#SelectHeight option:selected").text() * 50;
        var sizetop = (total - fontSizeH) / 2 + "px";

        $("#iconPre").css('width', fontSizeW + 'px');
        $("#iconPre").css('height', fontSizeH + 'px');
        $("#iconPre").css('left', sizeleft);
        $("#iconPre").css('top', sizetop);

        $("#iconPrefont").css('width', (fontSizeW -10) + 'px');

        var tmpSize = $("#SelectWidth option:selected").text() + $("#SelectHeight option:selected").text();
        $("#tmpSize").val(tmpSize);

        var fontPosition = $('#fontPosition').val();
        if (fontPosition.match(/^fontMiddle/)) {
            setFontMiddle($('#iconPre'), $('#iconPrefont'));
        }
    });

    //预览字体颜色
    $("#settingboxfontcolor li").click(function () {
        var fontColorCreate = $(this).css('background-color');
        $('a',"#iconPrefont").css('color', fontColorCreate);
    });

    //预览字体大小
    $("#FontSize").change(function () {

        $('#iconPrefont').css('height', 'auto');

        var fontSize = $("#FontSize option:selected").text();
        $("#tmpFontSize").val(fontSize);
        $("#iconPrefont").css('font-size', fontSize);
        $('a',"#iconPrefont").css('font-size', fontSize);

        var fontPosition = $('#fontPosition').val();
        if (fontPosition.match(/^fontMiddle/)) {
            setFontMiddle($('#iconPre'), $('#iconPrefont'));
        }
    });

    // 设置预览字体位置
    $('img', '#textalignbody').click(function () {
        $("#textalignbody > img").removeClass("textalignLRbgColor");
        $(this).addClass("textalignLRbgColor");

        var id = $(this).attr('id');
        $('#iconPrefont').css('top', '');

        $('#fontPosition').val(id);
        $('#fontTBPosition').val(id);

        $('#iconPrefont').removeClass();
        $('#iconPrefont').addClass('iconPrefont ' + id);
        $('#iconPrefont').addClass($("#fontLRPosition").val());

        if (id.match(/^fontMiddle/)) {
            setFontMiddle($('#iconPre'), $('#iconPrefont'));
        }

        setFontPostionValue();
    });

    $(".textalignLR > img").click(function () {
        $(".textalignLR > img").removeClass("textalignLRbgColor");
        $(this).addClass("textalignLRbgColor");
        $('#iconPrefont').removeClass($("#fontLRPosition").val());
        $("#fontLRPosition").val($(this).attr('id'));
        $('#iconPrefont').addClass($(this).attr('id'));

        setFontPostionValue();
    });
    // 设置字体位置保存 hidden 隐藏域的值
    setFontPostionValue = function () {
        var fontLRPosition = $("#fontLRPosition").val();
        var fontPosition = $('#fontTBPosition').val();

        if (fontLRPosition == 'fonttoLeft') {
            if (fontPosition == 'fontLeftTop') {
                $('#fontPosition').val('fontLeftTop');
            } else if (fontPosition == 'fontMiddleLeft') {
                $('#fontPosition').val('fontMiddleLeft');
            } else if (fontPosition == 'fontLeftBottom') {
                $('#fontPosition').val('fontLeftBottom');
            }
            $("#iconPrefont").css("left", "10px")
        } else if (fontLRPosition == 'fonttoCenter') {
            if (fontPosition == 'fontLeftTop') {
                $('#fontPosition').val('fontTopCenter');
            } else if (fontPosition == 'fontMiddleLeft') {
                $('#fontPosition').val('fontMiddleCenter');
            } else if (fontPosition == 'fontLeftBottom') {
                $('#fontPosition').val('fontBottomCenter');
            }
            $("#iconPrefont").css("left","5px")
        } else if (fontLRPosition == 'fonttoRight') {
            if (fontPosition == 'fontLeftTop') {
                $('#fontPosition').val('fontRightTop');
            } else if (fontPosition == 'fontMiddleLeft') {
                $('#fontPosition').val('fontMiddleRight');
            } else if (fontPosition == 'fontLeftBottom') {
                $('#fontPosition').val('fontRightBottom');
            }
            $("#iconPrefont").css("right", "10px")
            $("#iconPrefont").css("left", "0px")
        }
    }

    //预览文本内容
    $("#TextContent").blur(function () {
        var textContent = $(this).val();
        $('a',"#iconPrefont").text(textContent);
    });

});

//创建部分预览改动
$(function () {
    //创建部分图标颜色
    $("#iconPreCreate").css('background-color', 'rgb(249, 86, 2)');

    //创建部分图标尺寸
    $(".selectSizeCreate").change(function () {
        var total = 280;
        var fontSizeW = $("#SelectWidthCreate option:selected").text() * 50;
        var sizeleft = (total - fontSizeW) / 2 + "px";
        var fontSizeH = $("#SelectHeightCreate option:selected").text() * 50;
        var sizetop = (total - fontSizeH) / 2 + "px";

        $("#iconPreCreate").css('width', fontSizeW + 'px');
        $("#iconPreCreate").css('height', fontSizeH + 'px');
        $("#iconPreCreate").css('left', sizeleft);
        $("#iconPreCreate").css('top', sizetop);
        $("#iconPrefontCreate").css('width', fontSizeW + 'px');

        var fontPosition = $('#fontPositionCreate').val();
        if (fontPosition.match(/^fontMiddle/)) {
            setFontMiddle($('#iconPreCreate'), $('#iconPrefontCreate'));
        }

        if (seletedLi) {
            var index = seletedLi.attr('id').split('_')[1];
            selectedJson.selected[index].IconSize = $("#SelectHeightCreate option:selected").text() + $("#SelectWidthCreate option:selected").text();
        }

        /****创建人：汤欢 时间：2016年4月18日 11:34:35
        //添加模块图标
        ****/
        var ModelGetSize = 0;
        if (fontSizeH > fontSizeW) { ModelGetSize = fontSizeW; } else { ModelGetSize = fontSizeH; }
        $("#AppiconCreate").css('font-size', (ModelGetSize / 2 - ModelGetSize / 17));
        $("#AppiconCreate").css('top', (ModelGetSize - (ModelGetSize / 2) - 10) / 2);
        $("#AppiconCreate").css('left', (ModelGetSize - (ModelGetSize / 2 - ModelGetSize / 15)) / 2);
        if (fontSizeH > fontSizeW) {
            $("#AppiconCreate").css('top', (fontSizeH - (ModelGetSize / 2) - 10) / 2);
        } else if (fontSizeH < fontSizeW) {
            $("#AppiconCreate").css('left', (fontSizeW - (ModelGetSize / 2)) / 2 - 5);
        }
        /****创建人：汤欢 时间：2016年4月18日 11:34:35
        //添加模块图标
        ****/

    });

    //创建部分字体颜色
    $("#iconPrefontCreate").css('color', 'rgb(0, 0, 0)');


    //创建部分字体大小
    $("#FontSizeCreate").change(function () {
        var fontSize = $("#FontSizeCreate option:selected").text();
        $("#iconPrefontCreate").css('font-size', fontSize);

        if (seletedLi) {
            $('.liFont', seletedLi).css('font-size', fontSize);
            var index = seletedLi.attr('id').split('_')[1];
            selectedJson.selected[index].FontSize = fontSize;
        }

        var fontPosition = $('#fontPositionCreate').val();
        if (fontPosition.match(/^fontMiddle/)) {
            setFontMiddle($('#iconPreCreate'), $('#iconPrefontCreate'));
            if (seletedLi) {
                setFontMiddle(seletedLi, $('.liFont', seletedLi));
            }
        }
    });

    // 创建部分的字体位置
    $('img', '#textalignbodyCreate').click(function () {
        $("#textalignbodyCreate > img").removeClass("textalignLRbgColor");
        $(this).addClass("textalignLRbgColor");

        var id = $(this).attr('id');
        $('#iconPrefontCreate').css('top', 'auto');

        $('#fontPositionCreate').val(id);
        $('#fontTBPositionCreate').val(id);

        $('#iconPrefontCreate').removeClass();
        $('#iconPrefontCreate').addClass('iconPrefont ' + id);
        $('#iconPrefontCreate').addClass($("#fontLRPositionCreate").val());

        if (seletedLi) {
            var liFont = $('.liFont', seletedLi);
            liFont.css('top', 'auto');
            liFont.removeClass();
            liFont.addClass('liFont ' + id);
            liFont.addClass($("#fontLRPositionCreate").val());

            if (id.match(/^fontMiddle/)) {
                setFontMiddle(seletedLi, $('.liFont', seletedLi));
            }
        }

        if (id.match(/^fontMiddle/)) {
            setFontMiddle($('#iconPreCreate'), $('#iconPrefontCreate'));
        }

        setFontPostionValueCreate();

        if (seletedLi) {
            var index = seletedLi.attr('id').split('_')[1];
            id = $('#fontPositionCreate').val();
            selectedJson.selected[index].FontPosition = id.slice(0, -6);
        }
    });

    $(".textalignLRCreate > img").click(function () {
        $(".textalignLRCreate > img").removeClass("textalignLRbgColor");
        $(this).addClass("textalignLRbgColor");
        $('#iconPrefontCreate').removeClass($("#fontLRPositionCreate").val());
        $('#iconPrefontCreate').addClass($(this).attr('id'));

        if (seletedLi) {
            var liFont = $('.liFont', seletedLi);
            // liFont.css('top', 'auto');
            liFont.removeClass($("#fontLRPositionCreate").val());
            liFont.addClass($(this).attr('id'));
        }

        $("#fontLRPositionCreate").val($(this).attr('id'));
        setFontPostionValueCreate();

        if (seletedLi) {
            var index = seletedLi.attr('id').split('_')[1];
            var id = $('#fontPositionCreate').val();
            selectedJson.selected[index].FontPosition = id.slice(0, -6);
        }
    });
    setFontPostionValueCreate = function () {
        var fontLRPosition = $("#fontLRPositionCreate").val();
        var fontPosition = $('#fontTBPositionCreate').val();

        if (fontLRPosition == 'fonttoLeftCreate') {
            if (fontPosition == 'fontLeftTopCreate') {
                $('#fontPositionCreate').val('fontLeftTopCreate');
                $("#iconPrefontCreate").css("top", "5px");
            } else if (fontPosition == 'fontMiddleLeftCreate') {
                $('#fontPositionCreate').val('fontMiddleLeftCreate');
            } else if (fontPosition == 'fontLeftBottomCreate') {
                $('#fontPositionCreate').val('fontLeftBottomCreate');
            }
            $("#iconPrefontCreate").css("left", "10px")
        } else if (fontLRPosition == 'fonttoCenterCreate') {
            if (fontPosition == 'fontLeftTopCreate') {
                $('#fontPositionCreate').val('fontTopCenterCreate');
                $("#iconPrefontCreate").css("top", "5px");
            } else if (fontPosition == 'fontMiddleLeftCreate') {
                $('#fontPositionCreate').val('fontMiddleCenterCreate');
            } else if (fontPosition == 'fontLeftBottomCreate') {
                $('#fontPositionCreate').val('fontBottomCenterCreate');
            }
            $("#iconPrefontCreate").css("left", "0px")
        } else if (fontLRPosition == 'fonttoRightCreate') {
            if (fontPosition == 'fontLeftTopCreate') {
                $('#fontPositionCreate').val('fontRightTopCreate');
                $("#iconPrefontCreate").css("top", "5px");
            } else if (fontPosition == 'fontMiddleLeftCreate') {
                $('#fontPositionCreate').val('fontMiddleRightCreate');
            } else if (fontPosition == 'fontLeftBottomCreate') {
                $('#fontPositionCreate').val('fontRightBottomCreate');
            }
            $("#iconPrefontCreate").css("left", "-10px")
        }
    }

    //创建部分文本内容
    $("#TextContentCreate").blur(function () {
        var textContent = $(this).val();
        $("#iconPrefontCreate").text(textContent);

        if (seletedLi) {
            $('.liFont', seletedLi).html(textContent);
            var index = seletedLi.attr('id').split('_')[1];
            selectedJson.selected[index].TextContent = textContent;
        }
    });

    // 所有程序项点击事件处理
    $('a', '.appSelected').click(function () {
        var isDisplay = $('.imgSel', this).css('display');
        if (isDisplay == 'none') {
            $('.imgNoSel', this).css('display', 'none');
            $('.imgSel', this).css('display', 'block');
            $('input[name="cbx_IconID"]', this).attr('checked', true);
        } else {
            $('.imgSel', this).css('display', 'none');
            $('.imgNoSel', this).css('display', 'block');
            $('input[name="cbx_IconID"]', this).attr('checked', false);
        }
    });
});

//ok
function ok(o) {

    var widthScale = $("#SelectWidth option:selected").text();
    var heightScale = $("#SelectHeight option:selected").text();

    var isResize = modelItem.resizeModel(widthScale, heightScale, o.parent());
    //更新图标颜色
    var bgcolor = $("#iconPre").css('background-color');
    $('.bgIcon', o.parent()).css('background-color', bgcolor);

    //更新字体颜色
    var fontcolor = $('a',"#iconPrefont").css('color');
    $(".iconfont>a", o).css('color', fontcolor);

    //更新字体大小
    var fontSize = $("#tmpFontSize").val();
    $(".iconfont", o).css('font-size', fontSize)

    // 更改字体位置
    var fontPosition = $('#fontPosition').val();
    var oIconfont = $('.iconfont', o);
    oIconfont.css('top', '');
    oIconfont.removeClass();
    oIconfont.addClass('iconfont ' + fontPosition);

    if (fontPosition.match(/^fontMiddle/)) {
        setFontMiddle(o, oIconfont);
    }

//    var oSettingIcon = $(".dvsetting", o.parent());
//    alert(oSettingIcon.css('height'));
//    setFontMiddle(o.parent(), oSettingIcon);
    //

    //更改文本内容
    var textContent = $("#TextContent").val();
    $(".iconfont>a", o).text(textContent);

    if (!isResize) {
        modelItem.saveDeskLayout(o.parent());
    }
};

//设置格子的值
//size 尺寸
//StartIndex 起始位置
//xy 横向格子个数
//arr 标记数组
//value 要设置的值
function setArr(size, StartIndex, xy, arr, value) {
    var sizeX = parseInt(size / 10);
    var sizeY = size % 10;
    for (var i = 0; i < sizeX; i++) {
        for (var j = 0; j < sizeY; j++) {
            var tmpcnt = parseInt(parseInt(StartIndex) + parseInt(j * xy) + parseInt(i));
            arr[tmpcnt] = value;
        }
    }
};

$(function () {
    var labelCnt = 1;
    var lists;
    var json;
    //var btnConfirmFlag = 0;

    $("#addBtn").click(function () {

        $(document).ui_loading({
            overlay: true, //这里个参数是是否使用遮挡效果. 默认为false
            opacity: 0.5, //这个是遮挡布的透明度, 当overlay为false或者opacity为0是遮挡效果失效 默认0.2
            supportIframe: true, //是否支持iframe加载效果,默认是支持.
            message: '主人,我在努力的为您加载...' // 这里是加载提示信息.
        });
        showloading = 1;
        $.ajax({
            type: 'POST',
            url: ParentUrl + "Home/AppList",
            dataType: 'json',
            success: function (data) {

                $('#appListLayout').html('');

                //var dataStr = '[{"AppID":1,"AppName":"ismart1","AppStepId" : 1,"AppStep":"推荐应用","AppURL":"[AppURL]","ImageURl":null,"OrderBy":12,"IsDeleted":false},{"AppID":2,"AppName":"ismart2","AppStepId" : 2,"AppStep":"推荐应用","AppURL":"[AppURL]","ImageURl":null,"OrderBy":11,"IsDeleted":false}]';
                //var data = eval('(' + dataStr + ')');
                var appSteps = [];
                var oUL = $('<ul class="appItem"></ul>');
                //oUL.isAdd = false;
                var oUls = [];
                for (var i in data) {

                    var appStepId = data[i].AppStepID;
                    if (!appSteps[appStepId]) {

                        appSteps[appStepId] = createAppListType(data[i].StepName);
                        appSteps[appStepId].appendTo($('#appListLayout'));
                        oUls[appStepId] = $('<ul class="appItem"></ul>');
                    }

                    var oLi = createAppListItem(data[i].AppID, data[i].AppName, data[i].AppURL, data[i]);

                    oUL = oUls[appStepId];
                    var liSize = $('li', oUL).size();

                    if (liSize < 5) {
                        oLi.appendTo(oUL);
                    } else {
                        oUls[appStepId] = $('<ul class="appItem"></ul>');
                        oUL = oUls[appStepId];
                        oLi.appendTo(oUL);
                    }


                    if (!oUL.isAdd) {
                        oUL.appendTo($('.appItemContainter', appSteps[appStepId]));
                        oUL.isAdd = true;
                    }
                }

                $('a', '.appSelected').click(function () {
                    var isDisplay = $('.imgSel', this).css('display');
                    if (isDisplay == 'none') {
                        $('.imgNoSel', this).css('display', 'none');
                        $('.imgSel', this).css('display', 'block');
                        $('input[name="cbx_IconID"]', this).attr('checked', true);
                    } else {
                        $('.imgSel', this).css('display', 'none');
                        $('.imgNoSel', this).css('display', 'block');
                        $('input[name="cbx_IconID"]', this).attr('checked', false);
                    }
                });

                $('#dialogAppList').fadeIn('fast', function () {

                    var dialogAppListHeight = parseInt($(this).css('height'));
                    var titleContainterHeight = parseInt($('#titleContainter').css('height'));
                    var appContainterToolHeight = parseInt($('#appContainterTool').css('height'));
                    var appListHeight = dialogAppListHeight - titleContainterHeight - appContainterToolHeight - 40;
                    appListHeight = appListHeight < 530 ? 530 : appListHeight;

                    $('#appListContainter').css('height', appListHeight + 'px');

                    /*
                    if ($("#appListContainter").hasClass('mCustomScrollbar')) {
                    $("#appListContainter").mCustomScrollbar("update");
                    } else {
                    $("#appListContainter").mCustomScrollbar({
                    scrollButtons: {
                    enable: true
                    },
                    horizontalScroll: true,
                    advanced: { autoExpandHorizontalScroll: true, updateOnContentResize: false }
                    });
                    }*/

                    $("#appListContainter").mCustomScrollbar("destroy");
                    $("#appListContainter").mCustomScrollbar({
                        scrollButtons: {
                            enable: true
                        },
                        horizontalScroll: true,
                        advanced: { autoExpandHorizontalScroll: true, updateOnContentResize: false }
                    });
                });


                var list = "";
                json = "{\"selected\":[";
                $('a', '.sendToDesk').click(function () {
                    $('#dialogAppList').fadeOut('fast');

                    $('input[name="cbx_IconID"]:checked').each(function (i) {
                        if ($(this).attr("checked")) {
                            var id = $(this).attr("id").split("_")[1];
                            var dataItem = $(this).get(0).data;

                            list += ("," + id);
                            var name = $('#hide_' + id, $(this).parent()).val();
                            var url = $('#url_' + id, $(this).parent()).val();
                            if (i > 0) {
                                json += ",";
                            }

                            var iconSize = '22';
                            var iconColor = 'rgb(249, 86, 2)';

                            if (dataItem.SourceCode) {
                                var sourceCodeTemp = dataItem.SourceCode.replace(/&lt;/g, "<");
                                sourceCodeTemp = sourceCodeTemp.replace(/&gt;/g, ">");

                                var oSourceCode = $(sourceCodeTemp);
                                var widgetInfo = $('input[name="widget_info"]', oSourceCode).val();
                                var widgetValues = widgetInfo.split('||');

                                iconSize = widgetValues[0];
                                iconColor = widgetValues[1];
                            }
                            json += "{\"IconColor\":\"" + iconColor +
                                    "\",\"IconSize\":" + iconSize +
                                    ",\"FontColor\":\"" + "rgb(0, 0, 0)" +
                                    "\",\"FontSize\":\"" + "12px" +
                                    "\",\"FontPosition\":\"" + "fontLeftBottom" +
                                    "\",\"AppID\":\"" + id +
                                    "\",\"IconName\":\"" + name +
                                    "\",\"ImageUrl\":\"" + dataItem.ImageURl +
                                    "\",\"AppURL\":\"" + url +
                                    "\",\"IsWidget\":\"" + dataItem.isWidget +
                                    "\",\"SourceCode\":'" + dataItem.SourceCode +
                                    "',\"TextContent\":\"" + name + "\"}";
                        }
                    });

                    json += "]}";

                    lists = list.split(",");

                    if (lists.length > 1) {
                        selectedJson = eval("(" + json + ")");
                        var seletedItems = selectedJson.selected;
                        $("#selectboxs ul").html('');
                        for (var i = 0; i < seletedItems.length; i++) {
                            if (seletedItems[i].IsWidget != 1) {
                                $("#selectboxs ul").append('<li id="li_' + i + '"><div class="liFont">' + seletedItems[i].TextContent + '<div></li>');
                            }
                        }
                        if ($("#selectboxs ul li").size()) {
                            seletedLi = null;
                            $("#selectboxs li").click(function () {
                                $(".rollbox").show();
                                $(".rollbox").animate({ "left": ($(this).position().left - 3) + "px" }, 500);

                                seletedLi = $(this);
                                resetCreatePre($(this));
                                // storeInfo(selectedJson, labelCnt - 1);
                            });
                            seletedLi = $("#selectboxs li").first();

                            /*
                            $("#TextContentCreate").val($('.liFont', seletedLi).text());
                            $("#iconPrefontCreate").html($('.liFont', seletedLi).text());

                            $('#bgRollColorCreate').css({ display: 'block', top: '240px', left: '93px' });
                            $('#fontRollcolorCreate').css({ display: 'block', top: '290px', left: '243px' });
                            $('.rollbox', '#previewbox').css({ display: 'block', left: '45px' });
                            */
                            createDialog = art.dialog({
                                title: '设置',
                                padding: 20,
                                display: 'block',
                                opacity: 0,
                                content: document.getElementById('dialogCreate')
                            });

                            seletedLi.click();
                        } else {
                            modelItem.addModel(selectedJson);
                            initWeather();
                            //initClock();
                            //initCalendar();
                            initNews();
                        }

                        $("#appListContainter").mCustomScrollbar("update");
                    }

                });
                var applistwidth = 0;
                for (var i = 0; i < $("#appListLayout > .appType").size(); i++) {
                    applistwidth = parseInt($("#appListLayout > .appType").eq(i).width()) + applistwidth;
                }
                $('#appListLayout').width(applistwidth + 50);
                // $("#ui_loading_overlay").remove();
                //$("#ui_loading_progressBar").remove();
            }
        });

    });
    // 确定按钮点击事件处理
    $("input[name='btnConfirm']").click(function () {

        modelItem.addModel(selectedJson);
        createDialog.close();
        initWeather();
        //initClock();
        //initCalendar();
        initNews();
    });
});

function createAppListItem(id, name, url, oData) {
    // var strUlHtml = '<ul class="appItem"></ul>';
    var imageSrc = 'Content/images/mark.png';
    if(oData.ImageURl){
        imageSrc = oData.ImageURl;
    }
    var appNameMargin = 6;
    if (name.length > 8)
        appNameMargin = -4;
    var strLiHtml =     ' <li>' +
                             '<div class="appIcon">' +
    //  '<img src="' + ParentUrl + imageSrc + '" alt="" />' +
                                 '<i class="' + imageSrc + '" style="font-size: 30px;color: white;margin-right:6px"></i>'+
                                '</div>' +
                                '<div class="appName" style="margin-top:' + appNameMargin + 'px">' +
                                    '<label>'+ name +'</label>' +
                                '</div>' +
                                '<div class="appSelected">' +
                                    '<a href="javascript:void(0);">' +
                                        '<img class="imgSel" src="'+ParentUrl+'Content/images/selected.png" style="display:none;" alt="" />' +
                                        '<img class="imgNoSel" src="' + ParentUrl + 'Content/Images/add.png" alt="" />' +
                                        '<input id="cbx_' + id + '" type="checkbox" name="cbx_IconID" style="display:none;" />' +
                                        '<input id="hide_' + id + '" type="hidden" value="' + name + '" />' +
                                        '<input id="url_' + id + '" type="hidden" value="' + url + '" />' +
                                    '</a>' +
                                '</div>' +
                            '</li>';
    if (oData.IsExists) {
        strLiHtml = ' <li>' +
                             '<div class="appIcon">' +
        //  '<img src="' + ParentUrl +imageSrc + '" alt="" />' +
                                  '<i class="' + imageSrc + '" style="font-size: 30px;color: white;margin-right:6px"></i>' +
                                '</div>' +
                                '<div class="appName"style="margin-top:' + appNameMargin + 'px">' +
                                    '<label>' + name + '</label>' +
                                '</div>' +
                                '<div class="appSelected">' +
                                     '<input id="cbx_' + id + '" type="checkbox" name="cbx_IconID" style="display:none;" />' +
                                     '<input id="hide_' + id + '" type="hidden" value="' + name + '" />' +
                                     '<input id="url_' + id + '" type="hidden" value="' + url + '" />' +
                                '</div>' +
                            '</li>';
    }
    var oLiHtml = $(strLiHtml);
    $('#cbx_' + id, oLiHtml).get(0).data = oData;
    return oLiHtml;
};

function createAppListType(name) {
    var strHtml = '<div class="appType">' +
                    '<div class="appTypeName">'+ name +'</div>' +
                        '<div class="appItemContainter">' +
                        '</div>' +
                   '</div>';
    return $(strHtml);
};

//为动态创建写入json
function storeInfo(selectedJson, labelCnt) {
    var bgcolor = $("#iconPreCreate").css('background-color');
    selectedJson.selected[labelCnt].IconColor = bgcolor;

    var fontcolor = $("#iconPrefontCreate").css('color');
    selectedJson.selected[labelCnt].FontColor = fontcolor;

    var tmpSize = $("#SelectWidthCreate option:selected").text() + $("#SelectHeightCreate option:selected").text();
    selectedJson.selected[labelCnt].IconSize = tmpSize;

    var fontSize = $("#iconPrefontCreate").css('font-size');
    selectedJson.selected[labelCnt].FontSize = fontSize;

    var textContent = $("#TextContentCreate").val();
    selectedJson.selected[labelCnt].TextContent = textContent;
};

function resetCreatePre(o) {
     var index = o.attr('id').split('_')[1];
     var createItem = selectedJson.selected[index];

     var rows = String(createItem.IconSize).charAt(0);
     var cols = String(createItem.IconSize).charAt(1);

     

     // 设置高
     $('option', '#SelectHeightCreate').each(function(){
        if($(this).text() == rows){
            $(this).attr('selected', true);
        }
     });
     // 设置宽
     $('option', '#SelectWidthCreate').each(function(){
        if($(this).text() == cols){
            $(this).attr('selected', true);
        }
     });
     // 设置字体大小
     $('option', '#FontSizeCreate').each(function () {
         if ($(this).text() == createItem.FontSize) {
             $(this).attr('selected', true);
         }
     });
     $('#FontSizeCreate').change();

     // 设置字体颜色 和 背景颜色
     $(".boxcolor li").each(function () {
         var color = $(this).css('background-color');
         var id = $(this).parent().attr('id');
         if (id == "boxbgcolor") {
             if (color == createItem.IconColor) {
                 $(this).click();
             }
         } else if (id == "boxfontcolor") {
             if (color == createItem.FontColor) {
                 $(this).click();
             }
         }
     });

     //图标的ICON
     $("#AppiconCreate").addClass(createItem.ImageUrl);

    // 设置内容
    $("#TextContentCreate").val(createItem.TextContent);
    $("#iconPrefontCreate").text(createItem.TextContent);

    // 设置文本位置
    var classNames = $('.liFont', o).attr('class').split(' ');
    var positionLiId = classNames[1];
    positionLiId = positionLiId ? positionLiId : 'fontLeftBottomCreate';
    $('#fontPositionCreate').val(positionLiId);
    $('#' + positionLiId).click();
    var lrPositionLiId = classNames[2];
    lrPositionLiId = lrPositionLiId ? lrPositionLiId : 'fonttoLeftCreate';
    $('#' + lrPositionLiId).click();

    $('.selectSizeCreate').change();

   //alert(rows + ',' + cols + ',' + createItem.TextContent + ',' + createItem.IconColor + ',' + createItem.FontColor + ',' + positionLiId + ',' + createItem.FontPosition);
};

/*
$(function () {
    $('#themeBtn').click(function () {
        var themes_display = $('#themes-setting').css('display');

        if (themes_display == 'none') {
            $('#themes-setting').fadeIn('fast');
        } else {
            $('#themes-setting').fadeOut('fast');
        }
        
    });
});
*/