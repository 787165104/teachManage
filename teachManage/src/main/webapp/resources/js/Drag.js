Number.prototype.NaN0 = function () {
    return isNaN(this) ? 0 : this; //如果this为非数字返回0,否则返回数字
}

function getPosition(ele) {
    var x = ele.offsetLeft + (ele.curentStyle ? (parseInt(ele.curentStyle.borderLeftWidth).NaN0()) : 0);
    var y = ele.offsetTop + (ele.curentStyle ? (parentInt(ele.curentStyle.borderTopWidth).NaN0()) : 0);
    while (ele.offsetParent) {
        ele = ele.offsetParent;
        x += ele.offsetLeft + (ele.curentStyle ? (parseInt(ele.curentStyle.borderLeftWidth).NaN0()) : 0);
        y += ele.offsetTop + (ele.curentStyle ? (parentInt(ele.curentStyle.borderTopWidth).NaN0()) : 0);
    }
    return { x: x, y: y };
}

function setHeightOfCenten() {
    // 获取页面可视区域的高度
    var clientHeight = document.documentElement.clientHeight;
    var topHeight = parseInt($('#top').css('height'))||0;
    var footHeight = parseInt($('#foot').css('height'))||0;

    var cententHeight = clientHeight - topHeight - footHeight;
    //var cententHeight = clientHeight - topHeight;
    var centenMinHeight = parseInt($('#centent').css('min-height'));
    cententHeight = cententHeight < centenMinHeight ? centenMinHeight : cententHeight;
    $('#centent').css('height', cententHeight + 'px');
    $('#right-centent').css('height', (clientHeight - topHeight) + 'px');
}

$(function () {

    //磁铁修改完成可以点击屏幕退出编辑
    $("#containment-wrapper").bind("click", function (e) {
        var clickid = e.target.id;
        if (clickid == "containment-wrapper") {
            $(".layermask").fadeTo(800, 0, function () {
                $(this).css('display', 'none');
                setFlag = true;

                settingTarget.removeClass('edit');
                settingTarget.removeClass('del');
            });

            $('#modelSettingPopover').fadeTo(800, 0, function(){
                $(this).css('display', 'none');
            });
            
            $('#modelDelPopover').fadeTo(800, 0, function(){
                $(this).css('display', 'none');
            });
        }
    });
    //    $('#slider').slideBox({
    //        duration: 0.4, //滚动持续时间，单位：秒
    //        easing: 'linear', //swing,linear//滚动特效
    //        delay: 4,//滚动延迟时间，单位：秒
    //        hideBottomBar: true//隐藏底栏
    //    });

    setHeightOfCenten();
    //themeTool.getTheme();
    modelItem.grid.initGrid(); // 初始化看不见的磁贴信息数组信息
    modelItem.initModel(); // 初始化磁贴信息
    modelItem.initScroll(); // 初始化滚动条信息
    modelItem.loadDeskFromServer();
    // modelItem.saveDeskLayout();

    p = getPosition($('#containment-wrapper').get(0));

    $("div[id^='dragaaa']").mousedown(function (event) {
        $("#containment-wrapper").unbind('mousemove');
        modelItem.draggable._targetMousedown(event, this);
        return false;
    });

    $("div[id^='dragaaa']").mouseover(function () {
        if (!modelItem.draggable.oSelf) {
            $(this).removeClass('not');
            $(this).addClass('over');
        }
    });

    $("div[id^='dragaaa']").mouseout(function () {
        $(this).removeClass('over');
    });

    $("div[id^='dragaaa']").mouseup(function (event) {
    	
        modelItem.draggable._clearTarget();
        modelItem.draggable._mouseup(event, this);
        
    });

    $(document).mousemove(function (event) {
        modelItem.draggable.drag(event);
    });

    $(document).mouseup(function () {
    	
    	var isAdd = false;
    	if(modelItem.add.addModel){
    		modelItem.add.addModel(event);
    		modelItem.add.addModel = null;
    		isAdd = true;
    	}
        modelItem.draggable._clearTarget(isAdd);
    });

    // 禁止页面内容选择
    document.onselectstart = function () { return false; };

    $("#containment-wrapper").mousedown(function (event) {
        $(this).addClass('move');
        modelItem.draggable._wrapperMousedown(event, this);
    });

    // 浏览器窗口尺寸改变事件处理
    resizeTimeout = null;
    $(window).resize(function () {

        setHeightOfCenten();
        if (resizeTimeout) {
            clearTimeout(resizeTimeout);
            resizeTimeout = null;
        }

        resizeTimeout = setTimeout(modelItem.resetModelSize, 250);
    });


  
    // 设置->宽度下拉框事件处理
    $("#SelectWidth").change(function () {
        var wScale = parseInt($(this).val());
        var hScale = parseInt($("#SelectHeight").val());
        if (settingTarget) {
            var isCanResize = modelItem.checkCanResize(settingTarget.parent(), wScale, hScale);
            if (isCanResize) {
                $('#selectIconSize-info').hide();
                if (settingDialog) {
                    settingDialog.button(
						{
						    name: '确定',
						    disabled: false
						}
					)
                }


            } else {
                $('#selectIconSize-info').html('尺寸为(' + wScale + '×' + hScale + ')的组合不被允许设置.');
                $('#selectIconSize-info').show();
                if (settingDialog) {
                    settingDialog.button(
						{
						    name: '确定',
						    disabled: true
						}
					)
                }
            }
        }

    });
    // 设置->高度下来框事件处理
    $("#SelectHeight").change(function () {
        var hScale = parseInt($(this).val());
        var wScale = parseInt($("#SelectWidth").val());
        if (settingTarget) {
            var isCanResize = modelItem.checkCanResize(settingTarget.parent(), wScale, hScale);
            if (isCanResize) {
                $('#selectIconSize-info').hide();
                if (settingDialog) {
                    settingDialog.button(
						{
						    name: '确定',
						    disabled: false
						}
					)
                }
            } else {
                $('#selectIconSize-info').html('尺寸为(' + wScale + '×' + hScale + ')的组合不被允许设置.');
                $('#selectIconSize-info').show();
                if (settingDialog) {
                    settingDialog.button(
						{
						    name: '确定',
						    disabled: true
						}
					)
                }
            }
        }

    });

    // 磁贴里的设置按钮->用于阻止事件冒泡，不触发磁贴的mousedown事件
    $(".settingBtn").mousedown(function () { return false; });
    //$(".settingBtn").click(modelItem.settingModel);

    // 磁贴里的删除按钮->用于阻止事件冒泡，不触发磁贴的mousedown事件
    $('.delBtn').mousedown(function () { return false; });
    //$('.delBtn').click(modelItem.deleteModel);

    //磁贴设置按钮点击事件->用于触发是否在每个磁贴里显示编辑和删除按钮
    setFlag = true;
    $("#setBtn").click(function () {
        if (setFlag) {
            $(".layermask").fadeTo(800, 1);
            setFlag = false;
        } else {
            $(".layermask").fadeTo(800, 0, function () {
                $(this).css('display', 'none');
                settingTarget.removeClass('edit');
                settingTarget.removeClass('del');
            });

            $('#modelSettingPopover').fadeTo(800, 0, function(){
                $(this).css('display', 'none');
            });
            $('#modelDelPopover').fadeTo(800, 0, function(){
                $(this).css('display', 'none');
            });
            setFlag = true;
        }
    });
    // 鼠标进入到磁贴布局容器时候显示布局容器下方的滚动状态条
    $('#centent-container').mouseenter(function () {
        modelItem.initScroll();
    });
    // 鼠标移出磁贴布局容器时候隐藏布局容器下方的滚动状态条
    $('#centent-container').mouseleave(function () {
        $('.rollbar-path-horizontal').fadeOut('fast');
    });
});

var modelItem = {

    targetCurrentLeft: 0, // 被移动模块的左坐标
    targetCurrentTop: 0, // 被移动模块的顶部坐标
    targetWillLeft: 0, // 被移动模块的左坐标
    targetWillTop: 0, // 被移动模块的顶部坐标
    isCanPlace: false, // 标识是否能放置改模块

    draggable: {
        oSelf: null, // 保存当前要移动的对象
        mouseCurrentX: 0, // 保存当前鼠标按下时的鼠标指针的X坐标
        mouseCurrentY: 0, // 保存当前鼠标按下时的鼠标指针的Y坐标
        targetOffsetX: 0, // 保存鼠标指针相对于要移动的对象的X偏移量
        targetOffsetY: 0, // 保存鼠标指针相对于要移动的对象的Y偏移量

        isTopOfButtom: 0, // 标识被移动模块是否已经移动到限制范围的最顶端或最底端; 0 - 没有达到顶端和底端； 1 - 表示达到了顶端；2 - 表示达到了底端
        isTopOfButtomY: 0, // 记录被移动模块移动到限制范围的顶端或底端时候被移动模块能够继续移动的基准，只要当鼠标的坐标在改值范围内才能移动模块
        isLeftOfRight: 0, // 标识被移动模块是否已经移到限制范围的最左端或最右端
        isLeftOfRightX: 0,
        myTimeout: null,
        isRight: false,
        url: '#',

        drag: function () { },

        /**
        * 鼠标在被移动模块被按下时候的处理函数
        */
        _targetMousedown: function (event, oTarget) {

            var config = modelItem.draggable;
            p = getPosition($('#containment-wrapper').get(0));

            config.drag = config._targetMove;

            config.oSelf = oTarget;
            config.mouseCurrentX = event.clientX;
            config.mouseCurrentY = event.clientY;

            var tempLeft = Math.round($(config.oSelf).position().left);
            var tempTop = Math.round($(config.oSelf).position().top);
            var tempWidth = parseInt($(config.oSelf).css('width'));
            var tempHeight = parseInt($(config.oSelf).css('height'));

            modelItem.targetWillLeft = modelItem.targetCurrentLeft = tempLeft;
            modelItem.targetWillTop = modelItem.targetCurrentTop = tempTop;

            config.targetOffsetX = config.mouseCurrentX - p.x - modelItem.targetCurrentLeft;
            config.targetOffsetY = config.mouseCurrentY - p.y - modelItem.targetCurrentTop;

            config.isTopOfButtom = 0;
            config.isLeftOfRight = 0;

            // config.isTopOfButtomY = p.y + config.targetOffsetY;
            modelItem.isCanPlace = false;

            modelItem.grid.setGridValue(tempLeft, tempTop, tempWidth, tempHeight, 0);

        },

        /**
        * 磁贴移动处理
        */
        _targetMove: function (event) {
            var config = modelItem.draggable;

            var tempX = event.clientX;
            var tempY = event.clientY;

            var mouseOffsetX = tempX - config.mouseCurrentX;
            var mouseOffsetY = tempY - config.mouseCurrentY;

            if (config.oSelf) {

                if($('#modelSettingPopover').css('display') != 'none'){
                	$('#modelSettingPopover').css('display', 'none');
                	$('#modelSettingPopover').css('opacity', 0);
                	 if(settingTarget){
                         settingTarget.removeClass('edit');
                     }
                }
                
                if($('#modelDelPopover').css('display') != 'none'){
                	$('#modelDelPopover').css('display', 'none');
                	$('#modelDelPopover').css('opacity', 0);
                	if(settingTarget){
                        settingTarget.removeClass('del');
                    }
                }

                var targetLeft = Math.round($(config.oSelf).position().left);
                var targetTop = Math.round($(config.oSelf).position().top);
                var targetHeight = parseInt($(config.oSelf).css('height')) + (2 * parseInt($(config.oSelf).css('borderLeftWidth')));
                targetHeight = isNaN(targetHeight) ? 0 : targetHeight;
                var targetWidth = parseInt($(config.oSelf).css('width')) + (2 * parseInt($(config.oSelf).css('borderTopWidth')));
                targetWidth = isNaN(targetWidth) ? 0 : targetWidth;
                var containerHeight = parseInt($('#containment-wrapper').css('height'));
                var containerWidth = parseInt($('#containment-wrapper').css('width'));

                var targetNewLeft = tempX - config.targetOffsetX - p.x;
                var targetNewTop = tempY - config.targetOffsetY - p.y;

                if (config.isTopOfButtom == 1 && tempY >= config.isTopOfButtomY) {
                    config.isTopOfButtom = 0;
                } else if (config.isTopOfButtom == 2 && tempY <= config.isTopOfButtomY) {
                    config.isTopOfButtom = 0;
                }

                if (!config.isTopOfButtom) {
                    targetNewTop = targetNewTop <= 0 ? 0 : (targetNewTop + targetHeight) <= containerHeight ? targetNewTop : containerHeight - targetHeight;

                    $(config.oSelf).css('top', targetNewTop);

                    if (targetNewTop == 0) {
                        config.isTopOfButtom = 1;
                        config.isTopOfButtomY = p.y + config.targetOffsetY + targetNewTop;
                    } else if (targetNewTop == containerHeight - targetHeight) {
                        config.isTopOfButtom = 2;
                        config.isTopOfButtomY = p.y + config.targetOffsetY + targetNewTop;
                    }
                }

                if (config.isLeftOfRight == 1 && tempX >= config.isLeftOfRightX) {
                    config.isLeftOfRight = 0;
                } else if (config.isLeftOfRight == 2 && tempX <= config.isLeftOfRightX) {
                    config.isLeftOfRight = 0;
                }

                if (!config.isLeftOfRight) {

                    targetNewLeft = targetNewLeft <= 0 ? 0 : (targetNewLeft + targetWidth) <= containerWidth ? targetNewLeft : containerWidth - targetWidth;

                    $(config.oSelf).css('left', targetNewLeft);

                    if (targetNewLeft == 0) {
                        config.isLeftOfRight = 1;
                        config.isLeftOfRightX = p.x + config.targetOffsetX + targetNewLeft;
                    } else if (targetNewLeft == containerWidth - targetWidth) {
                        config.isLeftOfRight = 2;
                        config.isLeftOfRightX = p.x + config.targetOffsetX + targetNewLeft;
                    }
                }

                if (event.screenX + 10 >= window.screen.width) {
                    if (targetNewLeft + targetWidth >= containerWidth) {
                        if (!config.myTimeout) {
                            config.myTimeout = setInterval(modelItem.resizeContainer, 30);
                        }
                    } else {
                        if (!config.myTimeout) {
                            config.myTimeout = setInterval(modelItem.moveContainerLeft, 5);
                        }
                    }
                } else if (0 <= event.screenX && event.screenX < 10) {
                    if (!config.myTimeout) {
                        config.myTimeout = setInterval(modelItem.moveContainerRight, 5);
                    }
                } else if (event.screenX + 10 < window.screen.width) {
                    if (config.myTimeout) {
                        clearInterval(config.myTimeout);
                        config.myTimeout = null;
                    }

                    if (mouseOffsetX > 0 && (targetNewLeft + targetWidth >= containerWidth)) {
                        modelItem.resizeContainer(mouseOffsetX);
                    }
                }
                // 移除 a 标签的链接
                /*if (targetLeft != targetNewLeft || targetTop != targetNewTop) {
                if ($('a', config.oSelf).attr('href')) {
                config.url = $('a', config.oSelf).attr('href');
                $('#iconfont_ a', config.oSelf).removeAttr('href');
                }
                }*/
                modelItem.checkCanPlace();
            }
            config.mouseCurrentX = tempX;
            config.mouseCurrentY = tempY;
        },

        _mouseup: function (event, oTarget) {
            //$(oTarget).css('left', modelItem.targetCurrentLeft + 'px');
            //$(oTarget).css('top', modelItem.targetCurrentTop + 'px');
        },


        /**
        * 清空被移动的模块对象保存
        */
        _clearTarget: function (isAdd) {
            var config = modelItem.draggable;

            var oTarget = config.oSelf;
            $(oTarget).removeClass('move');
            config.oSelf = null;
            clearInterval(config.myTimeout);
            config.myTimeout = null;

            config.drag = function () { };
            $("#mChat-move").css("display", "none");
            
            if (!modelItem.isCanPlace) {

                $(oTarget).animate({
                    'left': modelItem.targetWillLeft + 'px',
                    'top': modelItem.targetWillTop + 'px'
                }, 'fast', function () {
                    modelItem.isCanPlace = true;
                    $(oTarget).removeClass('not');
                    $(oTarget).removeClass('over');
                    $(oTarget).css('cursor', 'default');

                    var tempWidth = parseInt($(oTarget).css('width'));
                    var tempHeight = parseInt($(oTarget).css('height'));

                    if (modelItem.targetWillLeft != modelItem.targetCurrentLeft ||
										modelItem.targetWillTop != modelItem.targetCurrentTop) {
                        modelItem.grid.setGridValue(modelItem.targetCurrentLeft, modelItem.targetCurrentTop, tempWidth, tempHeight, 0);
                    }

                    modelItem.grid.setGridValue(modelItem.targetWillLeft, modelItem.targetWillTop, tempWidth, tempHeight, 1);

                    $('#modelplaceview').hide();
                    /*if (config.url != '#') {
                    $('#iconfont_ a', oTarget).attr('href', config.url);
                    }*/

                    modelItem.saveDeskLayout(oTarget, isAdd);
                });
            }
        },
        /**
        * 容器鼠标按下事件处理
        */
        _wrapperMousedown: function (event, oTarget) {
            var config = modelItem.draggable;

            config.oSelf = oTarget;
            config.drag = function () { };

            config.mouseCurrentX = event.clientX;

            $("#containment-wrapper").bind('mousemove', function (event) { modelItem.draggable._wrapperMove(event); });

            modelItem.isCanPlace = true;
        },
        /**
        * 容器鼠标移动处理
        */
        _wrapperMove: function (event) {
            var config = modelItem.draggable;

            var tempX = event.clientX;

            var mouseOffsetX = tempX - config.mouseCurrentX;

            if (config.oSelf) {
                var wrapperLeft = Math.round($(config.oSelf).position().left);
                var wrapperNewLeft = wrapperLeft + mouseOffsetX;
                var wrapperWidth = parseInt($(config.oSelf).css('width'));
                var containerWidth = parseInt($('#centent-container').css('width'));

                wrapperNewLeft = wrapperNewLeft >= 0 ? 0 : (wrapperWidth + wrapperNewLeft) <= containerWidth ? (containerWidth - wrapperWidth) : wrapperNewLeft;
                $(config.oSelf).css('left', wrapperNewLeft + 'px');

                p = getPosition($('#containment-wrapper').get(0));

                modelItem.scroll();

            }
            config.mouseCurrentX = tempX;
        }
    },

    /**
    * 改变容器的大小
    **/
    resizeContainer: function (offsetWidth) {
        var config = modelItem.draggable;

        if (offsetWidth) {
            var cWidth = parseInt($('#containment-wrapper').css('width'));
            $('#containment-wrapper').css('width', (cWidth + offsetWidth) + 'px');
            var containterWidth = parseInt($('#centent-container').css('width'));

            modelItem.grid.addGrid();

            if (cWidth >= containterWidth) {
                var left = parseInt($('#containment-wrapper').css('left'));
                $('#containment-wrapper').css('left', (left - offsetWidth) + 'px');

                var targetLeft = parseInt($(config.oSelf).css('left'));
                $(config.oSelf).css('left', (targetLeft + offsetWidth) + 'px');
            }

            modelItem.checkCanPlace();

        } else {
            var cWidth = parseInt($('#containment-wrapper').css('width'));
            $('#containment-wrapper').css('width', (cWidth + 10) + 'px');
            cWidth = parseInt($('#containment-wrapper').css('width'));

            modelItem.grid.addGrid();
            modelItem.checkCanPlace();

            var left = parseInt($('#containment-wrapper').css('left'));
            $('#containment-wrapper').css('left', (left - 10) + 'px');

            var targetWidth = parseInt($(config.oSelf).css('width'));
            $(config.oSelf).css('left', (cWidth - targetWidth) + 'px');
        }

        p = getPosition($('#containment-wrapper').get(0));
        modelItem.initScroll();
        modelItem.scroll();

    },

    /**
     * 将容器的大小扩展指定的偏移量
     */
    resizeContainerOffset : function(offsetW){
        var containmentWrapper = $('#containment-wrapper');
        var cwWidth = containmentWrapper.width();
        cwWidth += offsetW;

        containmentWrapper.animate({width : cwWidth + 'px'}, 'fast', function(){
            modelItem.grid.addGrid();
            modelItem.scroll();
        });
    },

    /**
     * 移动指定的距离
     * @param offsetX : 正数向右移; 负数向左移动
     */
    moveContainerOffset : function(offsetX){
        var containmentWrapper = $('#containment-wrapper');
        var cwLeft = containmentWrapper.position().left;
        cwLeft += offsetX;

        containmentWrapper.animate({left : cwLeft + 'px'}, 'fast', function(){
            modelItem.scroll();
        });
    },

    /**
    * 向左移动容器
    */
    moveContainerLeft: function () {
        var config = modelItem.draggable;

        var cWidth = parseInt($('#containment-wrapper').css('width'));
        var left = parseInt($('#containment-wrapper').css('left'));
        $('#containment-wrapper').css('left', (left - 10) + 'px');

        p = getPosition($('#containment-wrapper').get(0));

        var targetLeft = parseInt($(config.oSelf).css('left'));
        $(config.oSelf).css('left', (targetLeft + 10) + 'px');

        targetLeft = parseInt($(config.oSelf).css('left'));
        var targetWidth = parseInt($(config.oSelf).css('width'));
        if (targetLeft + targetWidth >= cWidth) {

            $(config.oSelf).css('left', (cWidth - targetWidth) + 'px');
            if (config.myTimeout) {
                clearInterval(config.myTimeout);
                config.myTimeout = null;
            }
            config.myTimeout = setInterval(modelItem.resizeContainer, 30);
        }

        modelItem.scroll();

        modelItem.checkCanPlace();
    },
    /**
    * 向右移动容器
    */
    moveContainerRight: function () {
        var config = modelItem.draggable;
        var left = parseInt($('#containment-wrapper').css('left'));
        if (left < 0) {
            $('#containment-wrapper').css('left', (left + 10) + 'px');

            var targetLeft = parseInt($(config.oSelf).css('left'));
            $(config.oSelf).css('left', (targetLeft - 10) + 'px');
            modelItem.scroll();
        } else if (left == 0) {
            $('#containment-wrapper').css('left', '0px');
            $(config.oSelf).css('left', '0px');

            if (config.myTimeout) {
                clearInterval(config.myTimeout);
                config.myTimeout = null;
            }
        }

        p = getPosition($('#containment-wrapper').get(0));

        modelItem.checkCanPlace();
    },

    grid: {

        rows: 12, // 默认8行
        cols: 1, // 默认1列
        size: 0, // 单元格尺寸
        magin: 5, // 模块间距
        modelSize: 0, // 模板大小
        gridArrs: [], // 保存格子的数组
        initGrid: function () {
            var config = modelItem.grid;

            var cHeight = parseInt($('#containment-wrapper').css('height'));
            var cWidth = parseInt($('#containment-wrapper').css('width'));

            config.size = parseInt(cHeight / config.rows);
            config.cols = parseInt(cWidth / config.size);
            config.modelSize = config.size - config.magin;

            for (var i = 0; i < config.rows; i++) {
                config.gridArrs[i] = [];
                for (var j = 0; j < config.cols; j++) {
                    config.gridArrs[i][j] = 0;
                }
            }
        },

        addGrid: function () {
            var config = modelItem.grid;

            var cWidth = parseInt($('#containment-wrapper').css('width'));
            var tempCols = parseInt(cWidth / config.size);

            if (tempCols > config.cols) {
                for (var i = 0; i < config.rows; i++) {
                    for (var j = config.cols; j < tempCols; j++) {
                        config.gridArrs[i][j] = 0;
                    }
                }

                config.cols = tempCols;
            }
        },

        setGridValue: function (tempLeft, tempTop, tempWidth, tempHeight, value) {
            var config = modelItem.grid;

            var tempCols = Math.round((tempWidth - config.modelSize) / config.size) + 1;
            var tempRows = Math.round((tempHeight - config.modelSize) / config.size) + 1;

            var tempRowIndex = Math.round(tempTop / config.size);
            var tempColIndex = Math.round(tempLeft / config.size);

            for (var i = tempRowIndex; i < tempRowIndex + tempRows; i++) {
                for (var j = tempColIndex; j < tempColIndex + tempCols; j++) {
                    if (config.gridArrs[i]) {
                        config.gridArrs[i][j] = value;
                    }
                }
            }
        },

        resizeGrid: function () {
            var config = modelItem.grid;

            var cHeight = parseInt($('#containment-wrapper').css('height'));
            var newSize = parseInt(cHeight / config.rows);
            var offsetSize = config.size - newSize;
            var oldSize = config.size;

            config.size = newSize;
            $('#containment-wrapper').css('width', (newSize * config.cols) + 'px');

            var oldModelSize = config.modelSize;
            config.modelSize = newSize - config.magin;
            return { 'size': newSize, 'offsetSize': offsetSize, 'oldSize': oldSize, 'oldModelSize': oldModelSize };

        }
    },

    resizeModel: function (wScale, hScale, oTarget) {

        var config = modelItem.grid;

        var tempWidth = parseInt($(oTarget).css('width'));
        var tempHeight = parseInt($(oTarget).css('height'));

        var tempCols = Math.round((tempWidth - config.modelSize) / config.size) + 1;
        var tempRows = Math.round((tempHeight - config.modelSize) / config.size) + 1;

        if (tempCols != wScale || tempRows != hScale) {

            var tempLeft = Math.round($(oTarget).position().left);
            var tempTop = Math.round($(oTarget).position().top);

            config.setGridValue(tempLeft, tempTop, tempWidth, tempHeight, 0);

            tempWidth = (wScale - 1) * config.size + config.modelSize;
            tempHeight = (hScale - 1) * config.size + config.modelSize;

            setting.setPopoverPosition(tempWidth-2, tempHeight, oTarget);
            setting.setEditIconSize(oTarget, tempWidth, tempHeight);


            oTarget.animate({ width: tempWidth + 'px', height: tempHeight + 'px' }, "fast", function () {
                config.setGridValue(tempLeft, tempTop, tempWidth, tempHeight, 1);
                setting.setIconImgSize(oTarget);
                
                modelItem.saveDeskLayout(oTarget);
            });

            return true;
        }
    },

    initModel: function () {
        var config = modelItem.grid;

        $("div[id^='dragaaa']").css({ 'width': config.modelSize + 'px', 'height': config.modelSize + 'px' });

        $("div[id^='dragaaa']").each(function (i) {

            var tempColIndex = parseInt(i / config.rows);
            var tempLeft = tempColIndex * config.size;

            var tempRowIndex = i % config.rows;
            var temptop = tempRowIndex * config.size;

            $(this).css({ 'left': tempLeft + 'px', 'top': temptop + 'px' });

            config.gridArrs[tempRowIndex][tempColIndex] = 1;

            setting.setIconImgSize($(this));

        });

        $(".settingBtn").bind('click', modelItem.settingModel);
        $('.delBtn').click(modelItem.showDeleteModel);
    },

    resetModelSize: function () {
        var dragConfig = modelItem.draggable;
        var gridConfig = modelItem.grid;

        var newSizeInfos = gridConfig.resizeGrid();

        $("div[id^='dragaaa']").each(function (i) {
            var tempLeft = 0;
            var tempTop = 0;

            tempLeft = Math.round($(this).position().left);
            tempTop = Math.round($(this).position().top);

            var tempRowIndex = parseInt(tempTop / newSizeInfos.oldSize);
            var tempColIndex = parseInt(tempLeft / newSizeInfos.oldSize);

            var newTempLeft = tempColIndex * newSizeInfos.size;
            var newTempTop = tempRowIndex * newSizeInfos.size;

            var tempWidth = parseInt(this.offsetWidth);
            var tempHeight = parseInt(this.offsetHeight);

            var tempCols = parseInt((tempWidth - newSizeInfos.oldModelSize) / newSizeInfos.oldSize) + 1;
            var tempRows = parseInt((tempHeight - newSizeInfos.oldModelSize) / newSizeInfos.oldSize) + 1;

            tempWidth = (tempCols - 1) * newSizeInfos.size + gridConfig.modelSize;
            tempHeight = (tempRows - 1) * newSizeInfos.size + gridConfig.modelSize;

            var oSelf = this;
            $(this).animate({
                left: newTempLeft + 'px',
                top: newTempTop + 'px',
                width: tempWidth + 'px',
                height: tempHeight + 'px'
            }, function () {
            	setting.setEditIconSize($(this), tempWidth, tempHeight);
                setting.setIconImgSize($(this));
            });
        });



        //p = getPosition($('#containment-wrapper').get(0));
    },

    checkCanPlace: function () {
        var dragConfig = modelItem.draggable;
        var gridConfig = modelItem.grid;

        if (dragConfig.oSelf) {

            modelItem.isCanPlace = false;

            //var tempLeft = $(dragConfig.oSelf).position().left + parseInt($(dragConfig.oSelf).css('width')) / 2;
            //var tempTop = $(dragConfig.oSelf).position().top + parseInt($(dragConfig.oSelf).css('height')) / 2;
            var tempLeft = 0;
            var tempTop = 0;
            tempLeft = Math.round($(dragConfig.oSelf).position().left);
            tempTop = Math.round($(dragConfig.oSelf).position().top);

            var tempRowIndex = parseInt(tempTop / gridConfig.size);
            var tempColIndex = parseInt(tempLeft / gridConfig.size);

            var tempWidth = parseInt($(dragConfig.oSelf).get(0).offsetWidth);
            var tempHeight = parseInt($(dragConfig.oSelf).get(0).offsetHeight);

            var tempCols = parseInt((tempWidth - gridConfig.modelSize) / gridConfig.size) + 1;
            var tempRows = parseInt((tempHeight - gridConfig.modelSize) / gridConfig.size) + 1;

            var isAllOk = true;
            if (gridConfig.gridArrs[tempRowIndex][tempColIndex] == 0) {

                for (var i = tempRowIndex; i < tempRowIndex + tempRows; i++) {
                    for (var j = tempColIndex; j < tempColIndex + tempCols; j++) {
                        if (gridConfig.gridArrs[i]) {
                            if (gridConfig.gridArrs[i][j] && gridConfig.gridArrs[i][j] != 0) {
                                isAllOk = false;
                                break;
                            }
                        }
                    }
                }

                if (isAllOk) {
                    modelItem.targetWillLeft = tempColIndex * gridConfig.size;
                    modelItem.targetWillTop = tempRowIndex * gridConfig.size;

                    $(dragConfig.oSelf).removeClass('not');
                    $(dragConfig.oSelf).addClass('over');
                    $(dragConfig.oSelf).css('cursor', 'default');

                    $('#modelplaceview').css({ left: modelItem.targetWillLeft + 'px',
                        top: modelItem.targetWillTop + 'px',
                        width: tempWidth + 'px',
                        height: tempHeight + 'px'
                    });
                    $('#modelplaceview').show();
                }
            } else {
                isAllOk = false;
            }

            if (!isAllOk) {

                $('#modelplaceview').hide();

                if (modelItem.targetWillLeft != (tempColIndex * gridConfig.size) ||
					modelItem.targetWillTop != (tempRowIndex * gridConfig.size)) {
                    $(dragConfig.oSelf).removeClass('over');
                    $(dragConfig.oSelf).addClass('not');
                    $(dragConfig.oSelf).css('cursor', 'not-allowed');
                } else {
                    $(dragConfig.oSelf).removeClass('not');
                    $(dragConfig.oSelf).css('cursor', 'default');
                }

                modelItem.targetWillLeft = modelItem.targetCurrentLeft;
                modelItem.targetWillTop = modelItem.targetCurrentTop;
            }

        }
    },

    /**
     * 获取磁贴可以扩展的数量
     * @return : wScale :还可以再扩展列数； cols ：当前磁贴已经占用的列数；
     */
    getCanResizeScale: function (oTarget) {
        var dragConfig = modelItem.draggable;
        var gridConfig = modelItem.grid;

        var tempLeft = 0;
        var tempTop = 0;
        tempLeft = Math.round(oTarget.position().left);
        tempTop = Math.round(oTarget.position().top);

        var tempRowIndex = parseInt(tempTop / gridConfig.size);
        var tempColIndex = parseInt(tempLeft / gridConfig.size);

        var tempWidth = parseInt($(oTarget).css('width'));
        var tempHeight = parseInt($(oTarget).css('height'));

        var tempCols = Math.round((tempWidth - gridConfig.modelSize) / gridConfig.size) + 1;
        var tempRows = Math.round((tempHeight - gridConfig.modelSize) / gridConfig.size) + 1;

        var leftIndex = tempColIndex - 1;
        var topIndex = tempRowIndex - 1;
        var bottomIndex = tempRowIndex + tempRows;
        var rightIndex = tempColIndex + tempCols;

        // 计算向左延伸的数量
        /*
        for(; leftIndex >= 0; leftIndex--){
        var i = tempRowIndex;
        for(; i < tempRowIndex + tempRows; i++){
        if(gridConfig.gridArrs[i][leftIndex] != 0){
        break;
        }
        }
			
        if(i != (tempRowIndex + tempRows )){
        break;
        }
        }*/
        // 计算向右延伸的数量
        for (; rightIndex < gridConfig.cols; rightIndex++) {
            var i = tempRowIndex;
            for (; i < tempRowIndex + tempRows; i++) {
                if (gridConfig.gridArrs[i][rightIndex] != 0) {
                    break;
                }
            }

            if (i != (tempRowIndex + tempRows)) {
                break;
            }
        }
        // 计算向上延伸的数量
        /*
        for(; topIndex >= 0; topIndex--){
        var i = tempColIndex;
        for(; i < tempColIndex + tempCols;i++){
        if(gridConfig.gridArrs[topIndex][i] != 0){
        break;
        }
        }
			
        if(i != (tempColIndex + tempCols)){
        break;
        }
        }*/
        // 计算向下延伸的数量
        for (; bottomIndex < gridConfig.rows; bottomIndex++) {
            var i = tempColIndex;
            for (; i < tempColIndex + tempCols; i++) {
                if (gridConfig.gridArrs[bottomIndex][i] != 0) {
                    break;
                }
            }

            if (i != (tempColIndex + tempCols)) {
                break;
            }
        }

        // 总和计算
        //var widthScaleCount = (tempColIndex - leftIndex) + (rightIndex - (tempColIndex + tempCols));
        //var heightScaleCount = (tempRowIndex - topIndex) + (bottomIndex - (tempRowIndex + tempRows));

        var widthScaleCount = (rightIndex - (tempColIndex + tempCols));
        var heightScaleCount = (bottomIndex - (tempRowIndex + tempRows));

        return { 'wScale': widthScaleCount, 'hScale': heightScaleCount, 'rows': tempRows, 'cols': tempCols };
    },

    checkCanResize: function (oTarget, wScale, hScale) {

        var gridConfig = modelItem.grid;
        var tempLeft = 0;
        var tempTop = 0;
        tempLeft = Math.round(oTarget.position().left);
        tempTop = Math.round(oTarget.position().top);

        var tempRowIndex = Math.round(tempTop / gridConfig.size);
        var tempColIndex = Math.round(tempLeft / gridConfig.size);

        var tempWidth = parseInt(oTarget.css('width'));
        var tempHeight = parseInt(oTarget.css('height'));

        var tempCols = Math.round((tempWidth - gridConfig.modelSize) / gridConfig.size) + 1;
        var tempRows = Math.round((tempHeight - gridConfig.modelSize) / gridConfig.size) + 1;

        var currentMaxRowIndex = tempRowIndex + tempRows - 1;
        var currentMaxColIndex = tempColIndex + tempCols - 1;

        if (wScale != tempCols && hScale != tempRows) {
            for (var i = tempRowIndex; i < (tempRowIndex + hScale); i++) {
                for (var j = tempColIndex; j < (tempColIndex + wScale); j++) {
                    if (i >= tempRowIndex && i <= currentMaxRowIndex && j >= tempColIndex && j <= currentMaxColIndex) {
                        continue;
                    }
                    if (gridConfig.gridArrs[i][j] != 0) {
                        return false;
                    }
                }
            }
        }
        /***创建人：汤欢，时间：2016年4月18日 12:30:01
        ***功能：改变宽度图标自适应
        ****/
        var ModelGetSize = 0;
        var ModelHeight = hScale == 2 ? 100 : 200;
        var ModelWidth = wScale == 2 ? 100 : 200;
        if (ModelHeight > ModelWidth) { ModelGetSize = ModelWidth; } else { ModelGetSize = ModelHeight; }
        $('#iconPre').find("#iconPre_icon").css('font-size', (ModelGetSize / 2 - ModelGetSize / 17));
        $('#iconPre').find("#iconPre_icon").css('top', (ModelGetSize - (ModelGetSize / 2) - 10) / 2);
        $('#iconPre').find("#iconPre_icon").css('left', (ModelGetSize - (ModelGetSize / 2 - ModelGetSize / 15)) / 2);
        if (ModelHeight > ModelWidth) {
            $('#iconPre').find("#iconPre_icon").css('top', (ModelHeight - (ModelGetSize / 2) - 10) / 2);
        } else if (ModelHeight < ModelWidth) {
            $('#iconPre').find("#iconPre_icon").css('left', (ModelWidth - (ModelGetSize / 2)) / 2);
        }
        /***创建人：汤欢，时间：2016年4月18日 12:30:01
        ***功能：改变宽度图标自适应
        ****/
        return true;

    },

    getLastModelPosition: function () {
        var gridConfig = modelItem.grid;
        var maxIndex = 0;
        var positionInfo = { maxIndex: 0, rowIndex: 0, colsIndex: 0, cols: 0, rows: 0 };

        $("div[id^='dragaaa']").each(function (i) {


            var tempLeft = 0;
            var tempTop = 0;

            tempLeft = Math.round($(this).position().left);
            tempTop = Math.round($(this).position().top);

            var tempRowIndex = parseInt(tempTop / gridConfig.size);
            var tempColIndex = parseInt(tempLeft / gridConfig.size);

            var tempMaxIndex = tempRowIndex + (tempColIndex * gridConfig.rows) + 1;
            if (tempMaxIndex > positionInfo.maxIndex) {
                positionInfo.maxIndex = tempMaxIndex;

                var tempWidth = parseInt($(this).css('width'));
                var tempHeight = parseInt($(this).css('height'));

                var tempCols = parseInt((tempWidth - gridConfig.modelSize) / gridConfig.size) + 1;
                var tempRows = parseInt((tempHeight - gridConfig.modelSize) / gridConfig.size) + 1;

                positionInfo.rowIndex = tempRowIndex;
                positionInfo.colsIndex = tempColIndex;
                positionInfo.cols = tempCols;
                positionInfo.rows = tempRows;
            }

        });

        positionInfo.maxIndex = positionInfo.maxIndex + positionInfo.rows;
        positionInfo.rowIndex = positionInfo.rowIndex + positionInfo.rows;

        return positionInfo;
    },

    createModel: function (o) {
        var id_index = 18;
        id_index++;

        var tempModel = $(modelItem.modelTemplateHTML);
        if (o.appId) {
            tempModel.attr('id', 'dragaaa_' + o.appId); // 设置id
        } else {
            tempModel.attr('id', 'dragaaa_' + id_index); // 设置id
        }
        
        // 设置高度和宽度
        var gridConfig = modelItem.grid;
        var rows = parseInt(o.iconRows);
        var cols = parseInt(o.iconCols);
        var tempWidth = (cols - 1) * gridConfig.size + gridConfig.modelSize;
        var tempHeight = (rows - 1) * gridConfig.size + gridConfig.modelSize;
        tempModel.animate({ 'width': tempWidth, 'height': tempHeight }, 'fast', function(){});

        $('.bgIcon', tempModel).css('background-color', o.iconColor); // 设置背景色
        /***创建:汤欢 时间：2016年4月15日 14:59:19
        *添加背景图标
        ***/
        if (o.iconImg != "") {
            $('.iconImg', tempModel).addClass(o.iconImg);   //添加背景图标
        }
        /***创建:汤欢 时间：2016年4月15日 14:59:19
        *添加背景图标
        ***/
        if (o.widget == true) { // 如果是挂件的话
            /*var sourceCodeTemp = o.sourceCode.replace(/&lt;/g, "<");
            sourceCodeTemp = sourceCodeTemp.replace(/&gt;/g, ">");
            sourceCodeTemp = sourceCodeTemp.replace(/\\'/g, "'");
            $('.bgIcon', tempModel).html(sourceCodeTemp);*/
        	
        	$('.iconfont>a', tempModel).attr('date-widget-sourceCode', o.sourceCode);
        	
        	$('.settingBtn', tempModel).hide(); // 隐藏设置按钮
        	
        	//if(o.sourceCode && $('.bgIcon', tempModel)[o.sourceCode]){
        		//$('.bgIcon', tempModel)[o.sourceCode]();
        	//}
        }

        $('.iconfont', tempModel).css('font-size', o.fontSize); // 设置字体大小
        if (o.iconName) {
            $('.iconfont>a', tempModel).html(o.iconName || o.appName);    // 设置文本
        }
        $('.iconfont>a', tempModel).css('color', o.fontColor); // 设置字体颜色
        if (o.appUrl) {
        	if(o.openModel !== 3){
        		$('.iconfont>a', tempModel).attr('href', "javascript:void(0);"); // 链接
                $('.iconfont>a', tempModel).attr('date-href', o.appUrl);
        	} else if(o.openModel === 3) {
        		$('.iconfont>a', tempModel).attr('href', o.appUrl);
        		$('.iconfont>a', tempModel).attr('date-href', o.appUrl);
        	}
        }
        $('.iconfont>a', tempModel).attr('date-openModel', o.openModel);
        $('.iconfont>a', tempModel).attr('date-refreshOnOpen', o.refreshOnOpen);
        $('.iconfont>a', tempModel).attr('date-widget', o.widget);
        //字体格式
        $('.iconfont>a', tempModel).css('font-family', '"Microsoft Yahei UI","Microsoft Yahei",Verdana,Simsun,"Segoe UI","Segoe UI Web Regular","Segoe UI Symbol","Helvetica Neue","BBAlpha Sans","S60 Sans",Arial,sans-serif');

        // 设置文本位置
        var oIconfont = $('.iconfont', tempModel);
        var fontTextAlign = o.fontTextAlign
        oIconfont.css('text-align', fontTextAlign);
        
        var fontPosition = o.fontPosition; 
        oIconfont.addClass(fontPosition);
        
        tempModel.mousedown(function (event) {
            $("#containment-wrapper").unbind('mousemove');
            modelItem.draggable._targetMousedown(event, this);
            return false;
        });

        tempModel.mouseover(function () {
            if (!modelItem.draggable.oSelf) {
                $(this).removeClass('not');
                $(this).addClass('over');
            }
        });

        tempModel.mouseout(function () {
            $(this).removeClass('over');
        });

        tempModel.mouseup(function (event) {

            modelItem.draggable._clearTarget();
            modelItem.draggable._mouseup(event, this);
        });
        
        tempModel.dblclick(function(event){
            	var ids = $(this).attr('id');
            	var id = ids.split('_')[1];
            	var isAc = id.split('-');
            	var key;
            	if(isAc.length > 1 && isAc[0] == 'ac'){
            		key = id.substr(3);
            		isAc = true;
            	} else {
            		isAc = false;
            	}
            	
            	if('201708041' == id){
            		//模型工作区
            		return my_activiti.init.workflowModel(id);

            	} else if('201708042' == id){
            		//流程定义及部署管理
            		return my_activiti.init.deployManange(id);
                    
            	} else if(isAc){
            		
            		// 业务流程操作
            		return my_activiti.init.businessActiviti(tempModel, key);
            	}
            	
            	var openModel = parseInt($('.iconfont>a', tempModel).attr('date-openModel'));
            	
            	if(openModel !== 3){
            		
            		var refreshOnOpen = $('.iconfont>a', tempModel).attr('date-refreshOnOpen');
            		
	            	id = 'box_' + id;
	            	
	            	var bgColor = $('.bgIcon', this).css('backgroundColor');
	            	
	            	if($('#' + id).length){
	            		$('#' + id).css('backgroundColor', bgColor);
	            		$('#' + id).addClass('open');
	            		
	            		if(openModel === 2){
	                		$(".m_toolbar").animate({'background-color': bgColor}, 1000, function(){});
	                	}
	            	} else {
		            	
		            	var box = $('<div id=' + id + ' class="box"><span class="close"></span></div>');
		            	box.appendTo('body');
		            	box.attr('data-refreshOnOpen', refreshOnOpen);
		            	
		            	if(openModel === 2){
		            		box.css('top', '51px');
		            		box.height($('body').height() - 51);
		            		box.css('zIndex', 1);
		            		$('.m_toolbar').css('zIndex', 2);
		            	} else {
		            		$('.m_toolbar').css('zIndex', 1);
		            		box.css('zIndex', 2);
		            	}
		            	
		            	$('.close', box).click(function(){
		            		var p = $(this).parent();
		            		p.removeClass('open');
		            		p.css('backgroundColor', 'transparent');
		            		
		            		setTimeout(function(){
		            			var roo = p.attr('data-refreshOnOpen');
		            			if(roo == 'true'){
		            				p.remove();
		            			}
		            		}, 1000);
		            		
		            		$(".m_toolbar").animate({'background-color': 'rgba(255, 255, 255, 0.4)'}, 1000, function(){});
		            	});
		            	
		            	setTimeout(function(){
		            		box.css('backgroundColor', bgColor);
		                	box.addClass('open');
		                	var a = $('.iconfont>a', tempModel).attr('date-href');
		                	
		                	box.append('<iframe src="' + a + '" style="border: none; margin: 0px; padding: 0px; width: 100%; height: 100%;"></iframe>');
		                	if(openModel === 2){
		                		$(".m_toolbar").animate({'background-color': bgColor}, 1000, function(){});
		                	}
		                	
		            	}, 100);
	            	}
            	} else {
            		var url = $('.iconfont>a', tempModel).attr('date-href');
            		window.open(url);
            	}
        });
        
        $('.iconfont>a', tempModel).click(function(){
        	var openModel = $('a', tempModel).attr('date-openModel');
        	
        	if(openModel !== 3){
        		tempModel.dblclick();
        	}
        });
        
        // 设置模块
        $(".settingBtn", tempModel).mousedown(function () { return false; });
        //$(".settingBtn", tempModel).click(modelItem.settingModel);
        $(".settingBtn", tempModel).bind('click', modelItem.settingModel);

        // 删除模块
        $('.delBtn', tempModel).mousedown(function () { return false; });
        $('.delBtn', tempModel).click(modelItem.showDeleteModel);

        return tempModel;
    },

    placeNewModel: function (newModel, beginIndex, rowIndex, colIndex, rows, cols, width, height) {

        var gridConfig = modelItem.grid;

        if (colIndex + cols > gridConfig.cols) {
            var tempWidth = (colIndex + cols) * gridConfig.size;
            $('#containment-wrapper').css('width', tempWidth + 'px');
            gridConfig.addGrid();
        }

        if (rowIndex + rows > gridConfig.rows) {
            return modelItem.placeNewModel(newModel, beginIndex, 0, (colIndex + 1), rows, cols, width, height);
        } else {
            var i = rowIndex;
            for (; i < rowIndex + rows; i++) {
                if (gridConfig.gridArrs[i][colIndex] != 0) {
                    break;
                }
            }

            if (i == rowIndex + rows) {
                var tempLeft = colIndex * gridConfig.size;
                var tempTop = rowIndex * gridConfig.size;

                newModel.css({ 'left': tempLeft, 'top': tempTop });
                //$($.parseHTML(newModel, document, true)).appendTo($('#containment-wrapper'));
                newModel.appendTo($('#containment-wrapper'));
                newModel.fadeIn('slow', function(){
                	setting.setIconImgSize($(this));
                	setting.setEditIconSize($(this), width, height);
                	
                    var isWidget = $('.iconfont>a', newModel).attr('date-widget') == 'false' ? false : true;
                    if(isWidget){
                    	var sourceCode = $('.iconfont>a', newModel).attr('date-widget-sourceCode') || '';
                    	if(sourceCode && $('.bgIcon', newModel)[sourceCode]){
                    		$('.bgIcon', newModel).html('');
                    		$('.bgIcon', newModel)[sourceCode]();
                    		
                    		$('.iconfont>a', newModel).hide();// 隐藏应用名称
                        	$('.iconImg', newModel).hide(); // 隐藏应用图标
                        	
                        	$('.bgIcon', newModel).css('zIndex', 1);
                    	}
                    	
                    }
                });

                gridConfig.setGridValue(tempLeft, tempTop, width, height, 1);

                return { 'colIndex': colIndex, 'rowIndex': rowIndex };
            } else {
                return modelItem.placeNewModel(newModel, beginIndex, (i + 1), colIndex, rows, cols, width, height);
            }
        }
    },

    settingModel: function (e) {
    	
    	$('#modelDelPopover').hide();
    	$('#modelDelPopover').css('opacity', 0);
    	$(this).parent().parent().parent().removeClass('del');
    	if(settingTarget){
            settingTarget.removeClass('del');
        }
    	
        if($(this).parent().parent().parent().hasClass('edit')){

            $('#modelSettingPopover').fadeTo(250, 0, function(){
                $(this).css('display', 'none');
            });
            $(this).parent().parent().parent().removeClass('edit');

        } else {
            if(settingTarget){
                settingTarget.removeClass('edit');
            }

            settingTarget = $(this).parent().parent().parent();

            settingTarget.addClass('edit');

            // 获取磁贴布局、内容、颜色 等等信息
            var modelInfoStr = modelItem.buildLayoutData(settingTarget);
            
            var modelInfoJson = eval( '(' + modelInfoStr + ')');

            setting.initSettingInfo(modelInfoJson);

            setting.setPopoverPosition(null, null, settingTarget);
        }
        
        return false;
    },

    modelTemplateHTML: '<div class="draggable ui-widget-content" style="display:none;" id="dragaaa_">' +
                            '<div class="layermask"><div class="dvsetting"><img src="'+ modelImgSet +'" class="settingBtn" /><img src="'+ modelImgDel +'" class="delBtn" /></div></div>' +
							'<div class="bgIcon"></div>' +
                            '<div class="Icon" id="icon_">' +
								'<input value="11" type="hidden" />' +
                                '<i class="iconImg"></i>' +
								'<div class="iconfont" id="iconfont_"><a href="#" target="_blank" ></a></div>' +
							'</div>' +
						'</div>',
	
	showDeleteModel : function(e){
		
		$('#modelSettingPopover').hide();
		$('#modelSettingPopover').css('opacity', 0);
		$(this).parent().parent().parent().removeClass('edit');
		if(settingTarget){
            settingTarget.removeClass('edit');
        }

		if($(this).parent().parent().parent().hasClass('del')){
			$('#modelDelPopover').fadeTo(250, 0, function(){
                $(this).css('display', 'none');
            });
            $(this).parent().parent().parent().removeClass('del');
		} else {
			if(settingTarget){
                settingTarget.removeClass('del');
            }

            settingTarget = $(this).parent().parent().parent();

            settingTarget.addClass('del');
           
            setting.setPopoverPosition(null, null, settingTarget, 'modelDelPopover');
		}
		
		return false;
	},
    // 删除模块
    deleteModel: function (o) {
        var gridConfig = modelItem.grid;

        //var oTarget = $(this).parent();
        var oTarget = o;
        var id = oTarget.attr('id').split('_')[1];

        $.ajax({
            type: 'POST',
            url: ParentUrl + "/home/deleteModelLayoutInfo",
            data: { 'appId': id },
            success: function (rs) {
                if (rs.status) {
                    var tempLeft = Math.round($(oTarget).position().left);
                    var tempTop = Math.round($(oTarget).position().top);

                    var tempWidth = parseInt($(oTarget).css('width'));
                    var tempHeight = parseInt($(oTarget).css('height'));
                    
                    $('.delBtn', oTarget).click(); // 隐藏删除确认框
                    gridConfig.setGridValue(tempLeft, tempTop, tempWidth, tempHeight, 0);
                    oTarget.fadeTo(100, 0, function(){
                    	oTarget.remove();
                    });
                    
                } else {
                    alert('删除失败');
                }
            }
        });
    },

    initScroll: function () {
        var containWidth = parseInt($('#centent-container').css('width'));
        var wrapWidth = parseInt($('#containment-wrapper').css('width'));

        var scrollContainWidth = parseInt($('.rollbar-path-horizontal').css('width'));

        var widthRate = (containWidth / wrapWidth);

        var scrollWidth = scrollContainWidth * widthRate;
        scrollWidth = scrollWidth > 10 ? scrollWidth : 10;

        $('.rollbar-handle').css('width', scrollWidth + 'px');

        if (widthRate == 1) {
            $('.rollbar-path-horizontal').fadeOut('fast');
        } else {
            $('.rollbar-path-horizontal').fadeIn('fast');
        }
    },

    scroll: function () {
        var containWidth = parseInt($('#centent-container').css('width'));
        var wrapWidth = parseInt($('#containment-wrapper').css('width'));
        var wrapLeft = parseInt($('#containment-wrapper').css('left'));

        var hiddenWidth = wrapWidth - containWidth;
        var scrollRate = (hiddenWidth - Math.abs(wrapLeft)) / hiddenWidth;
        scrollRate = isNaN(scrollRate) ? 0 : scrollRate;

        var scrollContainWidth = parseInt($('.rollbar-path-horizontal').css('width'));
        var scrollWidth = parseInt($('.rollbar-handle').css('width'));

        var scrollRight = scrollRate * (scrollContainWidth - scrollWidth);
        $('.rollbar-handle').css('right', scrollRight + 'px');
    },

    getPositionInfo: function (oTarget) {
        var dragConfig = modelItem.draggable;
        var gridConfig = modelItem.grid;

        var tempLeft = Math.round($(oTarget).position().left);
        var tempTop = Math.round($(oTarget).position().top);

        var tempRowIndex = Math.round(tempTop / gridConfig.size);
        var tempColIndex = Math.round(tempLeft / gridConfig.size);

        var tempWidth = parseInt($(oTarget).css('width'));
        var tempHeight = parseInt($(oTarget).css('height'));

        var tempCols = Math.round((tempWidth - gridConfig.modelSize) / gridConfig.size) + 1;
        var tempRows = Math.round((tempHeight - gridConfig.modelSize) / gridConfig.size) + 1;

        return { 'rowIndex': tempRowIndex, 'colIndex': tempColIndex, 'rows': tempRows, 'cols': tempCols };
    },

    // 构建布局的json数据
    buildLayoutData: function (oTarget) {

        var boxPosition = modelItem.getPositionInfo(oTarget); // 获取尺寸
        var iconSize = boxPosition.rows + '' + boxPosition.cols;

        var iconColor = $('.bgIcon', oTarget).css('background-color'); // 获取背景颜色

        var iconColorName = $('.bgIcon', oTarget).attr('colorName')||''; // 背景颜色名称，对应设置项 li 的 class        

        var fontSize = $('.iconfont', oTarget).css('font-size'); // 获取字体大小

        var fontColor = $('.iconfont>a', oTarget).css('color'); // 获取字体颜色

        var fontColorName = $('.iconfont>a', oTarget).attr('colorName')||''; // 字体颜色名称, 对应设置项 li 的 class

        var textContent = $('.iconfont>a', oTarget).html(); // 获取字体内容

        var appId = oTarget.attr('id').split('_')[1]; // 获取程序id

        var fontTextAlign = $('.iconfont', oTarget).css('text-align'); // 获取文本 left、center、right 位置

        var fontPosition = $('.iconfont', oTarget).attr('class').split(' ')[1]; // 获取文本 top 、 bottom 位置
        fontPosition = fontPosition ? fontPosition : 'bottom';

        var scales = modelItem.getCanResizeScale(oTarget); // 获取磁贴可设置的最大宽、高 的值
        var maxCols = scales.wScale + scales.cols; // 最大的可以扩展的列数
        var maxRows = scales.hScale + scales.rows; // 最大可扩展的行数

        //var sourceCode = $('.bgIcon', oTarget).html();  // 获取源码
        var sourceCode = $('.iconfont>a', oTarget).attr('date-widget-sourceCode') || '';
        /*var isWidget = 0; // 设置是否为挂件
        if (sourceCode) {
            isWidget = 1;
            sourceCode = sourceCode.replace(/</g, "&lt;");
            sourceCode = sourceCode.replace(/>/g, "&gt;");
            sourceCode = sourceCode.replace(/'/g, "\\'");
        }*/

        var isWidget = $('.iconfont>a', oTarget).attr('date-widget') == 'false' ? false : true;
        
        var iconImg = $('.iconImg', oTarget).attr('class');
        iconImg = iconImg.split(' ')[1]||'';
        
        var appUrl = $('.iconfont>a', oTarget).attr('date-href');
        
        var json = '';
        json += "{\"iconColor\":\"" + iconColor +
                 "\",\"iconColorName\":\"" + iconColorName +
                 "\",\"iconSize\":\"" + iconSize +
                 "\",\"iconRowIndex\":" + boxPosition.rowIndex +
                 ",\"iconColIndex\":" + boxPosition.colIndex +
                 ",\"maxCols\":" + maxCols +
                 ",\"maxRows\":" + maxRows +
                 ",\"iconRows\":" + boxPosition.rows +
                 ",\"iconCols\":" + boxPosition.cols +
                 ",\"fontColor\":\"" + fontColor +
                 "\",\"fontColorName\":\"" + fontColorName +
                 "\",\"fontSize\":\"" + fontSize +
                 "\",\"fontTextAlign\":\"" + fontTextAlign +
                 "\",\"fontPosition\":\"" + fontPosition +
                 "\",\"iconName\":\"" + textContent +
                 "\",\"appId\":\"" + appId +
                 "\",\"widget\":" + isWidget +
                 ",\"iconImg\":\"" + iconImg +
                 "\",\"appUrl\":\"" + appUrl +
                 "\",\"sourceCode\":'" + sourceCode +
                "'}";

        return json.replace(/\r\n/ig, "");
    },

    // 保存布局信息
    saveDeskLayout: function (oTarget, isAdd) {
         var jsonData = eval('(' + modelItem.buildLayoutData($(oTarget)) + ')');
         
         if(isAdd){
        	 modelItem.add.addModelLayoutInfo(jsonData); // 保存到数据库
        	 //alert(modelItem.buildLayoutData($(oTarget)));
         } else {
        	 $.ajax({
                 type: 'POST',
                 url: ParentUrl + "/home/saveModelLayoutInfo",
                  //dataType: 'json',
                 data: jsonData,
                 success: function (rs) {
                	 if(!rs.status){
                		 
                	 }
                 }
             });
         }
    },
    /**
     * 构建主题信息
     */
    buildThemeData : function(){
    	var bgColor = $('.m_container').css('background-color');
    	var bgImgPath = $('img.selected', '.themes-background-img').attr('src');
    	
    	return {'bgColor' : bgColor, 'bgImgPath' : bgImgPath};
    },
    /**
     * 保存主题信息
     */
    saveDeskTheme : function(){
    	var themeData = modelItem.buildThemeData();
    	$.ajax({
    		type : 'POST',
    		url : ParentUrl + "/home/saveThemeInfo",
    		data : themeData,
    		success : function(rs){
    			if(!rs.status){
    				
    			}
    		}
    	});
    },
    // 从服务器加载界面布局
    loadDeskFromServer: function () {

        var gridConfig = modelItem.grid;
        var positionInfo = modelItem.getLastModelPosition();

        $.ajax({
            type: 'POST',
            url: ParentUrl + "/home/getThemeAndLayoutInfo",
            dataType: 'json',
            data: {'userId' : 'admin'},
            //beforeSend : function(jqXHR){if(!$.cookie('SSO_COOKIE_TOKEN_NAME')){ window.location.href = ParentUrl + '/login';}},
            success: function (data, textStatus, jqXHR) {
            	
            	var theme = data.themeInfo;
            	$('ul.bgColor').initThemeBgColor(theme.bgColor);
            	
            	var checked = theme['delete'];
            	if(!checked){
            		$('.themes-background-img').initThemeBgImg(theme.bgImgPath);
            		//$('#centent_bg').attr('checked', !checked);
            	} else {
            		$('#bgImgSwich').click();
            	}
            	
            	
                var list = data.layoutInfos;
                var gridConfig = modelItem.grid;
                
                for (var i = 0; i < list.length; i++) {
                    var o = list[i];
                    var rows = parseInt(o.iconRows);
                    var cols = parseInt(o.iconCols);

                    var rowIndex = o.iconRowIndex;
                    var colIndex = o.iconColIndex;

                    var tempWidth = (cols - 1) * gridConfig.size + gridConfig.modelSize;
                    var tempHeight = (rows - 1) * gridConfig.size + gridConfig.modelSize;

                    var tempModel = modelItem.createModel(o);
                    //tempModel.animate({ 'width': tempWidth, 'height': tempHeight }, 'fast', function(){});
                    
                    var tempLeft = colIndex * gridConfig.size;
                    var tempTop = rowIndex * gridConfig.size

                    var oPositionInfo = modelItem.placeNewModel(tempModel, 0, rowIndex, colIndex, rows, cols, tempWidth, tempHeight);
                }

                modelItem.initScroll();
                modelItem.scroll();
                //initWeather();
                // initClock();
                //initCalendar();
                //initNews();
            }
        });
    }
};

var settingDialog = null;

