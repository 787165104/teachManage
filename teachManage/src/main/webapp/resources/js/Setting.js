$.fn.extend({
	/**
	 * 初始化磁贴设置窗体的尺寸下拉框信息
	 */
	initSettingSize : function(val, maxVal){
		var id = $(this).attr('id');
		if(id == 'SelectWidth' || id == 'SelectHeight'){
			// 设置当前的值
			$('font', this).text(val);

			if(maxVal){
				maxVal = maxVal > 4 ? 4 : maxVal; // 最大允许设置4个尺寸
				// 初始化下拉项
				$('li[role="presentation"]', this).remove();
				for(var i = 0; i < maxVal; i++){
					var html = '<li role="presentation"><a role="menuitem" tabindex="-1" href="#">' + (i+1) + '</a></li>';
					$('ul', this).append(html);
				}	
			}
		} else {
			throw 'Object dose not support "initSettingSize" function.';
		}
	}, 
	/**
	 * 初始化磁贴设置窗体的字体大小下拉框信息
	 */
	initSettingFontSize : function(val) { 
		var id = $(this).attr('id');

		if(id == 'SelectFontSize'){
			$('font', this).text(val);
		} else {
			throw 'Object dose not support "initSettingFontSize" function.';
		}
	},
	/**
	 * 初始化磁贴设置窗体的对齐文本信息
	 */
	initSettingFontAlign : function(val){
		var id = $(this).attr('id');

		if(id == 'h_text' || id == 'v_text'){
			$('button[data="' + val + '"]', this).click();
		} else {
			throw 'Object dose not support "initSettingFontAlign" function.';
		}
	},
	/**
	 * 初始化磁贴设置窗体的文本颜色、背景颜色 信息
	 */
	initSettingColor : function(color, colorName){
		if($(this).hasClass('boxcolor')){
			var o = null;
			
			if(colorName && (o = $('li[class="' + colorName + '"]', this)).length){
				$(this).attr('targetName', colorName);
				o.click();
			} else {
				var p = this;
				$('li', this).each(function(index){
					if($(this).css('background-color') == color){
						$(p).attr('targetName', $(this).attr('class'));
						$(this).click();

						return false;
					}
				});
			}
		} else {
			throw 'Object dose not support "initSettingColor" function.';
		}
	},
	/**
	 * 初始化主题设置面板的主题背景颜色
	 */
	initThemeBgColor : function(color){
		if($(this).hasClass('bgColor')){
			$('.colorpick-btn', this).each(function(){
				if($(this).css('background-color') == color){
					$(this).click();
				}
			});
		}
	},
	/**
	 * 初始化主题设置面板的主题背景图片
	 */
	initThemeBgImg : function(imgPath){
		if($(this).hasClass('themes-background-img')){
			$('.themes-img-containter img', this).each(function(){
				var src = $(this).attr('src');
				if(imgPath == src){
					$(this).click();
					
					return false;
				}
			});
		}
	}
});

var setting = {
		/**
		 * modelWidth : 磁贴的宽度
		 * modelHeight : 磁贴的高度
		 **/
		setPopoverPosition : function(modelWidth, modelHeight, targetModel, id){
			var modelSettingPopover = id ? $('#' + id) : $('#modelSettingPopover');
			if(targetModel){
				
				var containmentWrapper = targetModel.parent();
				var pTop = containmentWrapper.position().top;
				var pLeft = containmentWrapper.position().left;
				var pWidth = containmentWrapper.width();

				var cententCantainer = containmentWrapper.parent();
				var maxWidth = cententCantainer.width();
				var maxHeight = cententCantainer.height();

				var top = targetModel.position().top;
				var left = targetModel.position().left;
				var width = modelWidth || targetModel.width();

				var popoverHeight = modelSettingPopover.height();
				var popoverWidth = modelSettingPopover.width();
				var popoverTop = top;

				// 如果磁贴的top坐标加上磁贴设置窗体的高度 大于 容器的高度(maxHeight),则需要设置磁贴设置窗体的top
				popoverTop = top + popoverHeight > maxHeight ? maxHeight - popoverHeight : top ;
				// 磁贴设置窗体 左侧箭头的高度计算
				var popoverArrowTop = top - popoverTop + 26;
				
				var popoverLeft = left + width + 2;
				// 计算磁贴设置窗体的水平位置是否已经超过了容器的最大宽度、被隐藏起来
				var diffWidth = popoverLeft + pLeft + popoverWidth + 15;
				if(diffWidth > maxWidth){
					// 磁贴设置的left + 宽度 小于 wrapper 的宽度 只需要向左移动 wrapper
					if(popoverLeft + popoverWidth <= pWidth){
						modelItem.moveContainerOffset(maxWidth - diffWidth);
					} else { // 否则修改 wrapper 的宽度并向左移动
						modelItem.resizeContainerOffset(diffWidth - maxWidth);
						modelItem.moveContainerOffset(maxWidth - diffWidth);
					}
				}

				popoverLeft += 'px';

				modelSettingPopover.animate({left : popoverLeft, top : popoverTop + 'px'}, 'fast', function(){
					$('.arrow', modelSettingPopover).animate({top : popoverArrowTop + 'px'}, 'fast', function(){});
				});

				if(modelSettingPopover.css('display') == 'none'){
					modelSettingPopover.css('display', 'block');
					modelSettingPopover.fadeTo(250, 1, function(){
						if(!id){
							$('.boxcolor').each(function(){
								var itemCls = $(this).attr('targetName');
								$('.' + itemCls, this).click();
								$(this).removeAttr('targetName');
							});
						}
					});
				}
			}
		},

		/**
		 * 设置磁贴里编辑按钮图标的大小，用于在磁贴尺寸改变的时候重新设置编辑按钮的图标尺寸
		 */
		setEditIconSize : function(targetModel, modelWidth, modelHeight){
			modelWidth = modelWidth || targetModel.width();
			modelHeight = modelHeight || targetModel.height();
			var size = 0.4 * modelWidth; // 取40%作为默认宽高
			if(modelWidth != modelHeight){
				if(modelWidth > modelHeight) { // 模块横向扩展
					var marginSize = 0.05 * modelHeight;
					if(modelHeight / modelWidth > 0.7){
						size = 0.5 * modelHeight - marginSize;
					} else {
						size = 0.7 * modelHeight - marginSize;	
					}
				} else { // 模块纵向扩展

				}
			}
			size += 'px';

			$('.dvsetting img', targetModel).animate({width : size, height : size}, 'fast', function(){});
			//$('', targetModel).animate({width : size, height : size}, 'fast', function(){});
		},
		/**
		 * 设置应用图标的大小
		 */
		setIconImgSize : function(targetModel){
			var modelWidth = targetModel.width();
			var modelHeight = targetModel.height();

			var size = modelHeight > modelWidth ? modelWidth : modelHeight;
			//var fontSize = size / 2 - size / 17;
			var fontSize = size / 2;

			$('.iconImg', targetModel).animate({'font-size' : fontSize + 'px'}, 'fast', function(){});

			var iconImgHeight = $('.iconImg', targetModel).height();
			var marginTop = -(modelHeight - iconImgHeight) / 4;
			$('.iconImg', targetModel).animate({'margin-top' : marginTop + 'px'}, 'fast', function(){});			
		},
		/**
		 * 用指定磁贴的信息来初始化设置窗体的设置项的信息
		 */
		initSettingInfo : function(modelInfo){
			var textContent = modelInfo.iconName; // 文本内容
			$('#textContent').val(textContent);

			var cols = modelInfo.iconCols; // 占的列数量
			var maxCols = modelInfo.maxCols; // 可扩展的最大的列数量
			$('#SelectWidth').initSettingSize(cols, maxCols);

			var rows = modelInfo.iconRows; // 占的行数量
			var maxRows = modelInfo.maxRows; // 可扩展的最大的行数量
			$('#SelectHeight').initSettingSize(rows, maxRows);

			var fontSize = modelInfo.fontSize; // 字体大小
			$('#SelectFontSize').initSettingFontSize(fontSize);

			var fontAlign = modelInfo.fontTextAlign; // 文本对齐 left、center、right
			$('#h_text').initSettingFontAlign(fontAlign);

			var fontPosition = modelInfo.fontPosition; // 文本对齐 top、bottom
			$('#v_text').initSettingFontAlign(fontPosition);

			var bgColor = modelInfo.iconColor; // 背景颜色
			var bgColorName = modelInfo.iconColorName; // 背景颜色名称
			$('#settingboxbgcolor').initSettingColor(bgColor, bgColorName);

			var fontColor = modelInfo.fontColor; // 字体颜色
			var fontColorName = modelInfo.fontColorName; // 字体颜色名称
			$('#settingboxfontcolor').initSettingColor(fontColor, fontColorName);

			$('#textContent').focus();
		}
	};

$(function(){
	settingTarget = $('#dragaaa_1'); // 该对象初始化在 modelItem.settingModel 方法里，只想当前编辑的磁贴div对象

	// 文本内容键盘输入处理
	$('#textContent').keyup(function(){
		$(".iconfont>a", settingTarget).text($(this).val());
		
		modelItem.saveDeskLayout(settingTarget);
	});

	// 宽度设置 点击事件处理
	$('#SelectWidth').on('click', 'li>a', function(){
		
		var val = $(this).text();
		$('font','#SelectWidthVal').text(val);

		var widthScale = parseInt(val);
		var heightScale = parseInt($('font', '#SelectHeightVal').text());

		var isResize = modelItem.resizeModel(widthScale, heightScale, settingTarget);
	});

	// 高度设置 点击事件处理
	$('#SelectHeight').on('click', 'li>a', function(){
		var val = $(this).text();
		$('font', '#SelectHeightVal').text(val);

		var widthScale = parseInt($('font','#SelectWidthVal').text());
		var heightScale = parseInt(val);

		var isResize = modelItem.resizeModel(widthScale, heightScale, settingTarget);
	});

	// 字体大小设置 点击事件处理
	$('#SelectFontSize').on('click', 'li>a', function(){
		var val = $(this).text();
		$('font', '#SelectFontSizeVal').text(val);

		$(".iconfont", settingTarget).animate({'font-size' : val}, 'fast', function(){
			modelItem.saveDeskLayout(settingTarget);
			});
	});

	// 字体 左 中 右 对齐 点击事件处理
	$('button', '.h_text').click(function(){
		if(!$(this).hasClass('active')){
			var val = $(this).attr('data');
			$(".iconfont", settingTarget).css('text-align', val);
			//alert($('.active','.h_text').length);
			$('.active','.h_text').removeClass('active');
			$('.active','.h_text').blur();
			$(this).addClass('active');
			
			modelItem.saveDeskLayout(settingTarget);
		}
	});

	// 字体 上 下 对齐 点击事件处理
	$('button', '.v_text').click(function(){
		if(!$(this).hasClass('active')){
			var val = $(this).attr('data');
			var o = $('.iconfont', settingTarget);
			o.removeClass();
			o.addClass('iconfont')
			o.addClass(val);
			
			$('.active','.v_text').removeClass('active');
			$('.active','.v_text').blur();
			$(this).addClass('active');
			
			modelItem.saveDeskLayout(settingTarget);
		}
	});

	// 背景／字体 颜色点击事件处理 该事件处理用于标识被选中的颜色
	$('.boxcolor li').click(function(){
		
		var p = $(this).parent().parent();
		$('.rollcolor', p).show();
		var left = $(this).position().left - 1;
		
		$('.rollcolor', p).animate({'left' : left + 'px'}, 250, function(){});
	});

	// 背景颜色 设置点击事件处理 触发设置磁贴的背景颜色
	$("#settingboxbgcolor li").click(function () {
		
        var iconColorCreate = $(this).css('background-color');
        $(".bgIcon", settingTarget).animate({'background-color': iconColorCreate}, 1000, function(){
        	modelItem.saveDeskLayout(settingTarget);
        });

        var cls = $(this).attr('class');
        $('.bgIcon', settingTarget).attr('colorName', cls); // 用颜色设置项 li 的 class 作为颜色的名称,用于初始化设置窗体
    });

	// 字体颜色 设置点击事件处理 触发设置磁贴的字体颜色
	$("#settingboxfontcolor li").click(function () {
		
        var fontColorCreate = $(this).css('background-color');
        $('.Icon a', settingTarget).animate({'color': fontColorCreate}, 1000, function(){
        	modelItem.saveDeskLayout(settingTarget);
        });

        var cls = $(this).attr('class');
        $('.Icon a', settingTarget).attr('colorName', cls); // 用颜色设置项 li 的 class 作为颜色的名称,用于初始化设置窗体
    });

	// 主题背景颜色 设置点击事件处理
    $('.colorpick-btn', '.bgColor').click(function(){
    	if(!$(this).hasClass('glyphicon')) { 
    		var themeBgColor = $('a.glyphicon', '.bgColor');
    		themeBgColor.removeClass('glyphicon');
    		themeBgColor.removeClass('glyphicon-ok');

    		$(this).addClass('glyphicon glyphicon-ok');
    		var themeBgColorVal = $(this).css('background-color');
    		$('.m_container').animate({'background-color' : themeBgColorVal}, 1000, function(){
    			modelItem.saveDeskTheme();
    		});
    	}
    });
    // 主题背景图片 设置点击事件处理
    $('.themes-img-containter').on('click','img', function(){

    	if(!$(this).hasClass('selected')){
    		$('img.selected', '.themes-img-containter').removeClass('selected');
    		var src = $(this).attr('src');
    		src = 'url(' + src + ')';
    		$(this).addClass('selected');

    		$('#centent_bg').fadeTo(500, 0, function(){
    			$('#centent_bg').css('background-image', src);	

    			var opacity = 0.5;
    			if(!$('#bgImgSwich').get(0).checked){
    				opacity = 0;
    			}
    			if(src.lastIndexOf('login_bg.jpg') != -1) { 
    				//opacity = 0.5;
    				//$('#centent_bg').css('background-size', 'cover');
    			} else {
    				//$('#centent_bg').css('background-size', 'auto');
    			}
    			$('#centent_bg').css('background-size', 'cover');
    			$('#centent_bg').fadeTo(500, opacity);
    			
    			modelItem.saveDeskTheme();
    		});
    	}
    });
    // 删除磁贴确认对话框-取消按钮点击事件处理
    $('#btnDelCancel').click(function(){
    	if(settingTarget){
    		$('.delBtn', settingTarget).click();
    	}
    });
    // 删除磁贴确认对话框-确认按钮点击事件处理
    $('#btnDelSure').click(function(){
    	if(settingTarget){
    		modelItem.deleteModel(settingTarget);
    	}
    });
    
    // 背景图片开关
    $('#bgImgSwich').click(function(e){
    	
    	var checked = this.checked;
    	
    	$.ajax({
	    	type : 'POST',
	    	url : ParentUrl + "/home/saveThemeInfo",
	    	data : {'delete' : !checked},
	    	success : function(rs){
	    		if(!rs.status){
	    				
	    		}
	    	}
	    });

    	if(checked){
    		$('#centent_bg').fadeTo(500, 0.5, function(){
    		});
    	} else {
    		$('#centent_bg').fadeTo(500, 0, function(){
    		});
    	}
    	e.stopPropagation();
    });
});