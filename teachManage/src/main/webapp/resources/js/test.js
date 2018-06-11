var scales = modelItem.getCanResizeScale($(this).parent().parent().parent());
        // 初始化尺寸下拉框
        $('#SelectWidth').empty();
        var wScale = scales.wScale + scales.cols;
        wScale = wScale > 4 ? 4 : wScale;
        for (var i = 1; i <= wScale; i++) {
            if (i % 2 == 1) continue;
            var wOption = $('<option value="' + i + '">' + i + '</option>');
            wOption.appendTo($('#SelectWidth'));
            if (i == scales.cols) {
                wOption.attr('selected', true);
            }
        }
        $('#SelectWidth').change();

        $('#SelectHeight').empty();
        var hScale = scales.hScale + scales.rows;
        hScale = hScale > 4 ? 4 : hScale;
        for (var i = 1; i <= hScale; i++) {
            if (i % 2 == 1) continue;
            var hOption = $('<option value="' + i + '">' + i + '</option>');
            hOption.appendTo($('#SelectHeight'));
            if (i == scales.rows) {
                hOption.attr('selected', true);
            }
        }
        $('#SelectHeight').change();

        //初始化预览图标颜色
        var backgroundColor = $('.bgIcon', $(this).parent().parent().parent()).css('background-color');
        $('#iconPre').css('background-color', backgroundColor);

        /****创建人：汤欢 时间：2016年4月18日 11:34:35
        //修改模块图标
        ****/

        var ModelAppIcon = settingTarget.find('i').attr("class");
        var ModelGetSize = 0;
        var ModelHeight = $("#iconPre").height();
        var ModelWidth = $("#iconPre").width();
        if (ModelHeight > ModelWidth) { ModelGetSize = ModelWidth; } else { ModelGetSize = ModelHeight; }
        $('#iconPre').find("#iconPre_icon").css('font-size', (ModelGetSize / 2 - ModelGetSize / 17));
        $('#iconPre').find("#iconPre_icon").css('top', (ModelGetSize - (ModelGetSize / 2) - 10) / 2);
        $('#iconPre').find("#iconPre_icon").css('left', (ModelGetSize - (ModelGetSize / 2 - ModelGetSize / 15)) / 2);
        if (ModelHeight > ModelWidth) {
            $('#iconPre').find("#iconPre_icon").css('top', (ModelHeight - (ModelGetSize / 2) - 10) / 2);
        } else if (ModelHeight < ModelWidth) {
            $('#iconPre').find("#iconPre_icon").css('left', (ModelWidth - (ModelGetSize / 2)) / 2 - 5);
        }
        $('#iconPre').find("#iconPre_icon").addClass(ModelAppIcon);
        /****创建人：汤欢 时间：2016年4月18日 11:34:35
        //修改模块图标
        ****/


        //初始化预览模块的字体大小
        var fontSize = $('.iconfont', settingTarget).css('font-size');
        $('a', '#iconPrefont').css('font-size', fontSize);
        $('#FontSize option').each(function () {
            if ($(this).val() == parseInt(fontSize)) {
                $(this).attr('selected', true);
            }
        });

        // 初始化预览模块的字体颜色
        var fontColor = $('.iconfont>a', settingTarget).css('color');
        $('a', '#iconPrefont').css('color', fontColor);


        //初始化预览模块的文本内容
        var textContent = $('.iconfont>a', settingTarget).html();
        $('#iconPrefont').css('top', '');
        $('#iconPrefont').removeClass();
        var fontClass = $('.iconfont', settingTarget).attr('class');
        $('#iconPrefont').addClass(fontClass);
        $('#iconPrefont').css('height', $('.iconfont', settingTarget).css('height'));
        $('a', '#iconPrefont').html(textContent);
        $('#TextContent').val(textContent);

        // 初始化预览模块的文本位置
        $('img', '#textalignbody').each(function () {
            $(this).removeClass('textalignLRbgColor');
            var id = $(this).attr('id');
            var reg = new RegExp(id);
            var regs = [new RegExp('Top'), new RegExp('Middle'), new RegExp('Bottom')];

            for (var i = 0; i < regs.length; i++) {
                if (fontClass.search(regs[i]) != -1 && id.search(regs[i]) != -1) {
                    $(this).addClass('textalignLRbgColor');
                    $('#fontPosition').val(fontClass.split(' ')[1]);
                    $('#fontTBPosition').val(id);
                }
            }
        });

        $(".textalignLR > img").each(function () {
            $(this).removeClass('textalignLRbgColor');

            var id = $(this).attr('id');
            var regs = [new RegExp('Left'), new RegExp('Center'), new RegExp('Right')];

            for (var i = 0; i < regs.length; i++) {
                if (fontClass.search(regs[i]) != -1 && id.search(regs[i]) != -1) {
                    $(this).addClass('textalignLRbgColor');
                    $('#fontPosition').val(fontClass.split(' ')[1]);
                    $('#fontLRPosition').val(id);
                }
            }
        });

        // $("#selectIconSize").change();

        settingDialog = art.dialog({
            title: '设置',
            padding: 20,

            button: [{
                name: '确定',
                callback: function () { ok(settingTarget); },
                focus: true
            }],
            display: 'block',
            content: document.getElementById('dialogSetting')
        });

        $('.aui_state_highlight').addClass('btnCreate');

        $('li', '#settingboxfontcolor').each(function () {
            var color = $(this).css('background-color');
            if (fontColor == color) {
                $(this).click();
            }
        });

        $('li', '#settingboxbgcolor').each(function () {
            var color = $(this).css('background-color');
            if (backgroundColor == color) {
                $(this).click();
            }
        });

        $("#FontSize").change();